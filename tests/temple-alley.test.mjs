import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { project, nearestOnSegment, pointInPolygon, roadWidth } from '../src/geo.mjs';
import { authoredSiteFrame, shanYuanTang } from '../src/authored-sites.mjs';
import { templeAlley, alleyRoutes, alleyReviews, alleyBins, alleyEntranceEnclosure } from '../src/temple-alley-layout.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const attrs = text => Object.fromEntries([...text.matchAll(/([\w:]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const nodes = new Map([...source.matchAll(/<node\b[^>]*>/g)].map(([text]) => {
  const a = attrs(text); return [a.id, [+a.lon, +a.lat]];
}));
const way = id => source.match(new RegExp(`<way id="${id}"[\\s\\S]*?<\\/way>`))[0];
const coordinates = id => [...way(id).matchAll(/<nd ref="(\d+)"/g)].map(m => nodes.get(m[1]));
const outlines = [...map.buildings.map(b => b.coordinates.slice(0, -1).map(c => project(c, map.origin))), authoredSiteFrame(shanYuanTang, map.origin).outline, alleyEntranceEnclosure(map).outline];
const clearance = (p, poly) => pointInPolygon(p, poly) ? 0 : Math.min(...poly.map((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance));

test('alley import keeps source geometry and the overlooked Lorong 11 footway', () => {
  assert.deepEqual(map.paths.map(p => p.id).sort(), [templeAlley.serviceId, templeAlley.footwayId].sort());
  assert.deepEqual(map.contextRoads.map(r => r.id), [templeAlley.accessId]);
  for (const item of [...map.paths, ...map.contextRoads]) assert.deepEqual(item.coordinates, coordinates(item.id));
  assert.equal(map.paths.find(p => p.id === templeAlley.serviceId).highway, 'service');
  assert.equal(map.paths.find(p => p.id === templeAlley.footwayId).highway, 'footway');
  // Protect every previously retained footprint, not just the adjacent buildings.
  for (const b of map.buildings) assert.deepEqual(b.coordinates, coordinates(b.id), b.id);
  assert.equal(map.buildings.length, 154);
  assert.equal(map.roads.length, 34, 'access context must not change existing frontage selection');
  const [service, footway] = alleyRoutes(map);
  assert.deepEqual(service.b, footway.a);
  assert.ok(Math.abs(service.length - 53.2426) < .001);
  assert.ok(Math.abs(footway.length - 16.2475) < .001);
  assert.ok(map.contextRoads[0].coordinates.some(c => Math.hypot(...project(c, map.origin).map((v, i) => v - service.a[i])) < 1e-8));
  assert.ok(map.roads.filter(r => r.name === 'Lorong 11 Geylang').some(r => r.coordinates.some(c => Math.hypot(...project(c, map.origin).map((v, i) => v - footway.b[i])) < 1e-8)));
});

test('the entire alley, bend and pedestrian continuation clear unchanged building collisions', () => {
  const bins = alleyBins(map).map(b => b.outline);
  for (const route of alleyRoutes(map)) {
    // Samples closer than the 0.28 m collision margin, including both endpoints.
    const steps = Math.ceil(route.length / .1);
    for (let i = 0; i <= steps; i++) for (const lateral of [-.45, 0, .45]) {
      const p = route.point(route.length * i / steps, lateral);
      for (const outline of [...outlines, ...bins]) assert.ok(clearance(p, outline) >= .28, `${route.id}: blocked at ${i}/${steps}, offset ${lateral}`);
    }
    // Rendered paving stays outside all building interiors. Width does not use lane tags.
    assert.ok(route.width <= (route.id === templeAlley.serviceId ? 3.5 : 1.4));
    for (let i = 0; i <= 200; i++) for (const lateral of [-route.widthAt(route.length * i / 200) / 2, route.widthAt(route.length * i / 200) / 2]) {
      const p = route.point(route.length * i / 200, lateral);
      for (const outline of outlines) assert.equal(pointInPolygon(p, outline), false);
    }
  }
});

test('review starts and illustrative bins do not obstruct the mapped walking route', () => {
  for (const review of alleyReviews(map)) {
    for (const outline of [...outlines, ...alleyBins(map).map(b => b.outline)]) assert.ok(clearance(review.p, outline) >= .28, review.id);
    assert.ok(Number.isFinite(review.yaw));
  }
  for (const bin of alleyBins(map)) for (const p of bin.outline) {
    for (const outline of outlines) assert.equal(pointInPolygon(p, outline), false);
    for (const route of alleyRoutes(map)) assert.ok(nearestOnSegment(p, route.a, route.b).distance > route.width / 2 + .28);
  }
});

test('the corrected entrance is enclosed at pedestrian scale without moving source geometry', () => {
  const original = JSON.stringify(map), enclosure = alleyEntranceEnclosure(map), footway = alleyRoutes(map)[1];
  assert.equal(enclosure.geometrySource, 'authored-estimate');
  assert.equal(JSON.stringify(map), original);
  const temple = authoredSiteFrame(shanYuanTang, map.origin).outline;
  // Measure between the actual facing walls, not just the width of the paving.
  for (let s = 3; s <= 11.5; s += .25) {
    const p = enclosure.wall.point(s);
    const gap = nearestOnSegment(p, temple[3], temple[4]).distance;
    assert.ok(gap >= 1.8 && gap <= 2.6, `wall-to-wall gap ${gap}`);
    assert.ok(nearestOnSegment(p, footway.a, footway.b).distance > .85);
  }
  for (const road of map.roads) for (let i = 1; i < road.coordinates.length; i++) {
    const a = project(road.coordinates[i - 1], map.origin), b = project(road.coordinates[i], map.origin);
    for (const p of enclosure.outline) assert.ok(nearestOnSegment(p, a, b).distance > roadWidth(road) / 2 + .5);
  }
  // The extension joins only its source neighbour. It must not invade other premises.
  for (let t = 0; t <= 1; t += .01) for (const outline of outlines.slice(0, -1)) {
    assert.equal(pointInPolygon(enclosure.wall.point(12 * t), outline), false);
  }
});
