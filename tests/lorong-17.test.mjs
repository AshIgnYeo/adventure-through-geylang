import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon } from '../src/geo.mjs';
import { lorong17, lorong17Frame, lorong17Layout, lorong17Reviews, lorong17Sides } from '../src/lorong-17-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map } from './helpers.mjs';

const lane = sourceMap.corridors.find(c => c.name === 'Lorong 17 Geylang');

test('Lorong 17 brings in its own buildings and road ways, not the backs of Lorong 19', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of ['454254236', '454254237', '454254238', '454254240', '454254249', '454254250', '454254251', '454254252', '454254253', '454254307', '454254308']) assert.ok(ids.has(id), id);
  // Lorong 19's west side, Sims Avenue No. 136 and the Geylang Road house east of the corner stay out.
  for (const id of ['454254241', '476113984', '454254239', '682928736', '454254254']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 17 Geylang').length, 7);
});

test('the lane is walkable from the Geylang Road centreline to the Sims Avenue centreline', () => {
  const inStudy = studyArea(sourceMap), path = lane.path.map(p => project(p, sourceMap.origin));
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  // Every metre along the lane, and the Geylang Road link back into the rectangle, keeps the 3 m margin.
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
  for (let x = 140; x <= 179; x++) assert.ok(inStudy([x, 60], 3), `Geylang Road at x ${x}`);
  // Lorong 19, about 45 m east of the lane, stays outside.
  assert.equal(inStudy([205, -40], 0), false);
  assert.equal(inStudy([215, 10], 0), false);
});

test('the Lorong 17 exteriors fit their outlines, face the lane and keep their review starts clear', () => {
  for (const place of lorong17) {
    const poly = outline(place.buildingIds[0]), frame = lorong17Frame(poly, place);
    assertFittings(frame, poly, lorong17Layout(place, frame.width).boxes);
    for (const side of lorong17Sides(place, poly)) assertFittings(side.frame, poly, side.boxes);
    assertReviews(frame, lorong17Reviews(place, frame));
    assert.match(place.evidence, /(April|June) 2024/);
    assert.ok(place.sources.some(s => s.includes(`way/${place.buildingIds[0]}`)));
    // West-side fronts look east onto the lane, east-side fronts west.
    const west = frame.point(frame.width / 2, 0)[0] < 170;
    assert.ok(west ? frame.nx > .9 : frame.nx < -.9, place.id);
    const out = (place.blocks ?? []).filter(b => b.out > 0 && b.h[0] < 5);
    assertClearOfCarriageway(out.flatMap(b => [frame.point(b.u[0], b.out + b.depth / 2), frame.point(b.u[1], b.out + b.depth / 2)]));
    if (place.unnamed) {
      assert.equal(landmarkFor(place.buildingIds[0]), undefined);
      assert.equal(place.boards, undefined); assert.equal(place.blades, undefined);
    } else assert.equal(landmarkFor(place.buildingIds[0]).id, place.id);
  }
});

test('Feng Shang is named on way 236, with its listing point inside the photographed front', () => {
  const place = lorong17.find(p => p.id === 'feng-shang'), poly = outline('454254236'), frame = lorong17Frame(poly, place);
  const point = project([103.878786, 1.3129283], map.origin);
  // 1.3 m in front of the source front, inside the front photographed 1.5 m forward.
  assert.equal(pointInPolygon(point, poly), false);
  const out = (point[0] - frame.a[0]) * frame.nx + (point[1] - frame.a[1]) * frame.nz;
  assert.ok(out > 1 && out < 1.5);
  // The front runs north from the back lane.
  assert.ok(frame.dz < -.95);
});

test('the True Jesus Mission is named on No. 17, with its listing point inside way 272', () => {
  assert.equal(landmarkFor('454254272').id, 'true-jesus-mission');
  assert.equal(pointInPolygon(project([103.8786787, 1.3133103], map.origin), outline('454254272')), true);
});

test('the Yang Clan General Association is named on No. 19, its listing point falling next door in No. 17', () => {
  assert.equal(landmarkFor('454254273').id, 'yang-clan');
  const point = project([103.8786358, 1.3133222], map.origin);
  assert.equal(pointInPolygon(point, outline('454254273')), false);
  assert.equal(pointInPolygon(point, outline('454254272')), true);
});

test('the Gyaltsap Tashi Ling Buddhist Society is named on No. 35 from its board, with its transposed listing recorded', () => {
  const place = lorong17.find(p => p.id === 'gyaltsap-tashi-ling');
  assert.equal(landmarkFor('454254279').id, place.id);
  assert.match(place.address, /17 Lor 35/);
  // The listing point lies about 1 m in front of the source way to the south, on the photographed house.
  const point = project([103.8786073, 1.3137575], map.origin), frame = lorong17Frame(outline('454254279'), place);
  const along = (point[0] - frame.a[0]) * frame.dx + (point[1] - frame.a[1]) * frame.dz;
  const out = (point[0] - frame.a[0]) * frame.nx + (point[1] - frame.a[1]) * frame.nz;
  assert.ok(along > -2 && along < 0 && out > 0 && out < 2.5);
});
