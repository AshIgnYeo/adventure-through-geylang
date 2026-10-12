import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong17, lorong17Frame, lorong17Layout, lorong17Reviews, lorong17Sides, lorong17Upper } from '../src/lorong-17-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building } from './helpers.mjs';

const lane = sourceMap.corridors.find(c => c.name === 'Lorong 17 Geylang');
const lanePath = lane.path.map(p => project(p, sourceMap.origin)), laneSegments = lanePath.slice(1).map((b, i) => [lanePath[i], b]);

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
    // Sources cite the source way, or for an authored footprint one of the ways it replaces.
    const ways = [place.buildingIds[0], ...(building(place.buildingIds[0]).replaces ?? [])];
    assert.ok(place.sources.some(s => ways.some(w => s.includes(`way/${w}`))), place.id);
    // Every front looks across the lane: its outward normal points at the nearest point of the lane's centreline.
    const centre = frame.point(frame.width / 2, 0), lanePoint = laneSegments.map(([a, b]) => nearestOnSegment(centre, a, b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((lanePoint[0] - centre[0]) * frame.nx + (lanePoint[1] - centre[1]) * frame.nz > 0, place.id);
    assert.ok(Math.abs(frame.nx) > .9, place.id);
    // Street-level pieces stay clear of the modelled carriageways. Where a source front stands at or inside a
    // carriageway's edge (No. 134, open question 39; the white row south of the temple), the place is flagged
    // heldFlat and its pieces are held within 0.25 m of its walls instead.
    const faces = [{ frame, blocks: place.blocks ?? [] }, ...lorong17Sides(place, poly).map((side, i) => ({ frame: side.frame, blocks: place.sides[i].blocks ?? [] }))];
    for (const { frame: f, blocks } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (place.heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    // Upper volumes stand inside the footprint.
    for (const up of lorong17Upper(place, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), place.id);
    if (place.unnamed) {
      assert.equal(landmarkFor(place.buildingIds[0]), undefined);
      assert.equal(place.boards, undefined); assert.equal(place.blades, undefined);
    } else assert.equal(landmarkFor(place.buildingIds[0]).id, place.id);
  }
});

test('Feng Shang is named on Nos. 5-7, its authored footprint, with its listing point now inside it', () => {
  const place = lorong17.find(p => p.id === 'feng-shang'), poly = outline('l17w-5'), frame = lorong17Frame(poly, place);
  assert.equal(pointInPolygon(project([103.878786, 1.3129283], map.origin), poly), true);
  // The front runs north from the back lane, 12.9 m to the north party line.
  assert.ok(frame.dz < -.95); assert.ok(Math.abs(frame.width - 12.91) < .01);
});

test('the True Jesus Mission is named on No. 17, with its listing point inside its footprint', () => {
  assert.equal(landmarkFor('l17w-17').id, 'true-jesus-mission');
  assert.equal(pointInPolygon(project([103.8786787, 1.3133103], map.origin), outline('l17w-17')), true);
});

test('the Yang Clan General Association is named on No. 19, its listing point inside its re-spaced footprint', () => {
  assert.equal(landmarkFor('l17w-19').id, 'yang-clan');
  // On the source ways the point fell next door, in No. 17's; on the photographed line it falls in No. 19.
  const point = project([103.8786358, 1.3133222], map.origin);
  assert.equal(pointInPolygon(point, outline('l17w-19')), true);
  assert.equal(pointInPolygon(point, sourceMap.buildings.find(b => b.id === '454254272').coordinates.map(c => project(c, map.origin))), true);
});

test('the Gyaltsap Tashi Ling Buddhist Society is named on No. 35 from its board, with its transposed listing recorded', () => {
  const place = lorong17.find(p => p.id === 'gyaltsap-tashi-ling');
  assert.equal(landmarkFor('l17w-35').id, place.id);
  assert.match(place.address, /17 Lor 35/);
  // The listing point lies on No. 35's south party line, within 0.5 m of its footprint.
  const point = project([103.8786073, 1.3137575], map.origin), poly = outline('l17w-35');
  assert.ok(Math.min(...poly.map((a, i) => nearestOnSegment(point, a, poly[(i + 1) % poly.length]).distance)) < .5);
});

test('Bright Star Hotel is named on No. 20, its listing point 0.28 m in front of the source front', () => {
  const place = lorong17.find(p => p.id === 'bright-star-hotel'), frame = lorong17Frame(outline('454254240'), place);
  assert.equal(landmarkFor('454254240').id, place.id);
  const point = project([103.8788156, 1.3134517], map.origin);
  const out = (point[0] - frame.a[0]) * frame.nx + (point[1] - frame.a[1]) * frame.nz;
  assert.ok(out > 0 && out < .5);
});

test('the Singapore Chinaware Merchants Association is named on No. 6, its listing point two houses south', () => {
  // Way 454254249 is carried through the open question 41 group as l17e-6, unchanged.
  assert.equal(landmarkFor('l17e-6').id, 'chinaware-merchants');
  assert.deepEqual(outline('l17e-6').map(p => p.map(v => +v.toFixed(6))), sourceMap.buildings.find(b => b.id === '454254249').coordinates.slice(0, -1).map(c => project(c, map.origin).map(v => +v.toFixed(6))));
  const point = project([103.8788852, 1.3129874], map.origin);
  assert.equal(pointInPolygon(point, outline('l17e-6')), false);
  assert.equal(pointInPolygon(point, outline('454254252')), true);
});

test('Nos. 37-41 are split at their fins and No. 39 is named the Singapore Rattan Industry Association', () => {
  const widths = ['l17w-37', 'l17w-39', 'l17w-41'].map(id => lorong17Frame(outline(id), { frontEdge: 0 }).width);
  [4.4, 5.2, 5.02].forEach((w, i) => assert.ok(Math.abs(widths[i] - w) < .02, `${widths[i]}`));
  assert.equal(landmarkFor('l17w-39').id, 'rattan-association');
  assert.equal(landmarkFor('l17w-37'), undefined); assert.equal(landmarkFor('l17w-41'), undefined);
  // The listing point lies next door, in No. 37, about 1.6 m from the party line.
  assert.equal(pointInPolygon(project([103.8785861, 1.3138844], map.origin), outline('l17w-37')), true);
  // The elevation's pieces are shared out between the bays without loss: one north-wall side, the board on No. 39.
  assert.equal(lorong17.find(p => p.id === 'l17-41').sides[0].edge, 3);
  assert.equal(lorong17.find(p => p.id === 'rattan-association').boards.length, 1);
});

test('the two northern houses of the white row stand north of No. 6 on its lines, at their photographed widths', () => {
  const w = id => lorong17Frame(outline(id), { frontEdge: 0 }).width;
  assert.ok(Math.abs(w('l17e-10') - 4.8) < .01); assert.ok(Math.abs(w('l17e-8') - 4.25) < .01);
  // No. 8 shares No. 6's north wall, and No. 10 No. 8's.
  const shared = (a, b) => outline(a).filter(p => outline(b).some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6)).length;
  assert.equal(shared('l17e-8', 'l17e-6'), 2); assert.equal(shared('l17e-10', 'l17e-8'), 2);
  for (const id of ['l17e-10', 'l17e-8']) assert.equal(landmarkFor(id), undefined);
});
