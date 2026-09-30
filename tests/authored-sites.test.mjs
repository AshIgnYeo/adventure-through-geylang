import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { authoredLandmarks, landmarkFor } from '../src/landmarks.mjs';
import { authoredSiteFrame, shanYuanTang as site } from '../src/authored-sites.mjs';
import { project, nearestOnSegment, pointInPolygon, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const frame = authoredSiteFrame(site, map.origin);
const edges = poly => poly.map((a, i) => [a, poly[(i + 1) % poly.length]]);
const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const segmentDistance = (a, b, c, d) => {
  if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0) return 0;
  return Math.min(nearestOnSegment(a, c, d).distance, nearestOnSegment(b, c, d).distance,
    nearestOnSegment(c, a, b).distance, nearestOnSegment(d, a, b).distance);
};

test('Shan Yuan Tang is an explicit estimate, separate from the neighbouring mosque and source ways', () => {
  assert.ok(authoredLandmarks.includes(site));
  assert.equal(site.geometrySource, 'authored-estimate');
  assert.equal(site.address, '249 Geylang Road');
  assert.equal(site.buildingIds, undefined);
  assert.equal(map.buildings.some(b => b.id === site.id), false);
  const mosque = map.buildings.find(b => b.id === '454254204');
  assert.equal(mosque.number, '245');
  assert.notEqual(landmarkFor(mosque.id), site);
  // Corroborating place pin falls within the estimate, never defines its boundary.
  assert.ok(pointInPolygon(project([103.8770633, 1.3123882], map.origin), frame.outline));
});

test('authored site projection preserves metre lengths and the orientation of both street edges', () => {
  const origin = frame.point([0, 0]), across = frame.point([site.width, 0]), inland = frame.point([0, 25.5]);
  assert.ok(Math.abs(Math.hypot(across[0] - origin[0], across[1] - origin[1]) - 10.4) < 1e-10);
  assert.ok(Math.abs(Math.hypot(inland[0] - origin[0], inland[1] - origin[1]) - 25.5) < 1e-10);
  assert.ok(across[0] > origin[0] && across[1] < origin[1]);
  assert.ok(inland[0] < origin[0] && inland[1] < origin[1]);
});

test('temple collision outline and coping clear every source building and estimated carriageway', () => {
  for (const building of map.buildings) {
    const poly = building.coordinates.slice(0, -1).map(p => project(p, map.origin));
    assert.equal(poly.some(p => pointInPolygon(p, frame.outline)), false, building.id);
    assert.equal(frame.outline.some(p => pointInPolygon(p, poly)), false, building.id);
    const distance = Math.min(...edges(frame.outline).flatMap(([a, b]) => edges(poly).map(([c, d]) => segmentDistance(a, b, c, d))));
    assert.ok(distance > .7, `building ${building.id}: ${distance} m clearance`);
  }
  for (const road of map.roads) {
    const line = road.coordinates.map(p => project(p, map.origin));
    for (let i = 1; i < line.length; i++) {
      const clearance = Math.min(...edges(frame.outline).map(([a, b]) => segmentDistance(a, b, line[i - 1], line[i]))) - roadWidth(road) / 2;
      assert.ok(clearance > .65, `${road.name}: ${clearance} m to road edge`);
    }
  }
});

test('both temple review starts are outside the enclosed site and other building collisions', () => {
  for (const review of site.reviews) {
    const p = frame.point(review.position);
    for (const poly of [frame.outline, ...map.buildings.map(b => b.coordinates.map(c => project(c, map.origin)))]) {
      assert.equal(pointInPolygon(p, poly), false, review.id);
      assert.ok(edges(poly).every(([a, b]) => nearestOnSegment(p, a, b).distance > .28), review.id);
    }
  }
});
