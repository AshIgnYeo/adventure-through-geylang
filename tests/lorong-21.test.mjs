import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong21, simsRow21, lorong21Frame, lorong21Layout, lorong21Reviews, lorong21Sides, lorong21Upper } from '../src/lorong-21-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 21 Geylang');
const lanePath = lane.path.map(p => project(p, sourceMap.origin)), laneSegments = lanePath.slice(1).map((b, i) => [lanePath[i], b]);
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 21 brings in its own buildings, its corners and the Sims Avenue houses back to Lorong 19', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const west = ['454254167', '1223524387', '1223524388', '1223524384', '1223524383', '1223524382', '1223524385', '1223524386', '454254329', '454254330'];
  const east = ['454254164', '454254165', '454254160', '454254144'];
  const sims = ['454254331', '454254332', '454254333', '454254334', '454254335', '454254336', '454254337', '454254338'];
  for (const id of [...west, ...east, ...sims]) assert.ok(ids.has(id), id);
  // The Lorong Bachok row, the block behind the Geylang Road corner and the part north of Sims Avenue wait.
  for (const id of ['454254328', '454254242', '454254353', '454254366']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 21 Geylang').length, 20);
});

test('Lorong 21 is walkable from the Geylang Road centreline to the Sims Avenue centreline, and back to Lorong 19 along both', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  for (const name of ['Geylang Road, Lorong 19 to Lorong 21', 'Sims Avenue, Lorong 19 to Lorong 21']) walkable(corridor(name).path.map(p => project(p, sourceMap.origin)), inStudy);
  // The backs of the blocks either side stay outside: between Lorong 19 and Lorong 21 (behind Bougainvilla, and the
  // back lane between the Lorong Bachok and Sims Avenue rows), and the HCSA compound east of the lane.
  for (const p of [[265, -40], [270, -125], [350, -60], [360, -120]]) assert.equal(inStudy(p, 0), false, `${p}`);
});

test('the Lorong 21 exteriors fit their outlines, face the lane and keep their review starts clear', () => {
  // Each building, with a place over several buildings built from its parts.
  const houses = lorong21.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong21Frame(poly, spec);
    assertFittings(frame, poly, lorong21Layout(spec, frame.width).boxes);
    for (const side of lorong21Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong21Reviews(spec, frame));
    assert.match(spec.evidence, /(April|June) 2024/);
    // Sources cite the source way, or for an authored footprint one of the ways it replaces.
    const ways = [id, ...(building(id).replaces ?? [])];
    assert.ok(spec.sources.some(s => ways.some(w => s.includes(`way/${w}`))), id);
    // Every front looks across the lane: its outward normal points at the nearest point of the lane's centreline.
    const centre = frame.point(frame.width / 2, 0), lanePoint = laneSegments.map(([a, b]) => nearestOnSegment(centre, a, b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((lanePoint[0] - centre[0]) * frame.nx + (lanePoint[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageways, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong21Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    // Upper volumes stand inside the footprint.
    for (const up of lorong21Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    if (place.unnamed) {
      assert.equal(landmarkFor(id), undefined);
      assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
      for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
    } else assert.equal(landmarkFor(id).id, place.id);
  }
  // One review start per place.
  for (const place of lorong21.filter(p => p.parts)) assert.equal(place.buildingIds.filter(id => !place.parts[id].noReview).length, 1, place.id);
});

test('Cheng Yi Coffee Shop is named on the west corner, its listing point inside the outline, with the glass block raised over its part', () => {
  const place = lorong21.find(p => p.id === 'cheng-yi');
  assert.equal(landmarkFor('454254167').id, place.id);
  assert.equal(pointInPolygon(project([103.8800790, 1.3129369], map.origin), outline('454254167')), true);
  // The lane face runs north from the Geylang Road corner; the walk-up stands 14.3 m and the glass block 18.64 m.
  const frame = lorong21Frame(outline('454254167'), place);
  assert.ok(frame.dz < -.95 && Math.abs(frame.width - 21.863) < .01);
  assert.equal(place.height, 14.3);
  assert.deepEqual([place.upper[0].from, place.upper[0].to], [14.3, 18.64]);
  // Its name board and six dish boards hang on the Geylang Road front, within it.
  const gr = place.sides.find(s => s.edge === 9);
  assert.equal(gr.boards.length, 7);
  for (const b of gr.boards) assert.ok(b.u[0] >= 0 && b.u[1] <= 26.344, `${b.u}`);
});

test('HCSA Community Services is named over the four buildings of its compound, its gateway on the drive', () => {
  const place = lorong21.find(p => p.id === 'hcsa-community-services');
  for (const id of ['454254164', '454254165', '454254160', '454254144']) assert.equal(landmarkFor(id).id, place.id);
  // HCSA Highpoint, located in the compound, has its listing point at the long two-storey block.
  const p = project([103.8802537, 1.3139771], map.origin), o = outline('454254165');
  assert.ok(pointInPolygon(p, o) || o.some((a, i) => nearestOnSegment(p, a, o[(i + 1) % o.length]).distance < .2));
  // The gateway's board spans the drive between the house by the entrance and the U-shaped block.
  const gate = place.parts['454254160'].sides.find(s => s.edge === 2);
  assert.equal(gate.blades.length, 1);
  const f = lorong21Frame(outline('454254160'), { frontEdge: 2 }), end = f.point(gate.blades[0].u, gate.blades[0].out[1]);
  assert.ok(nearestOnSegment(end, ...[outline('454254144')[8], outline('454254144')[9]]).distance < 1.5);
});

test('the Sims Avenue row back to Lorong 19 is laid at its photographed positions across its eight source ways and faces Sims Avenue', () => {
  assert.deepEqual(simsRow21.map(p => p.buildingIds[0]), ['454254331', '454254332', '454254333', '454254334', '454254335', '454254336', '454254337', '454254338']);
  let windows = 0;
  for (const place of simsRow21) {
    const poly = outline(place.buildingIds[0]), frame = lorong21Frame(poly, place);
    assertFittings(frame, poly, lorong21Layout(place, frame.width).boxes);
    assertReviews(frame, lorong21Reviews(place, frame));
    assert.ok(frame.nz < -.95, place.id);
    // The fronts stand at the edge of Sims Avenue's estimated carriageway, so street-level pieces are held flat.
    assert.equal(place.heldFlat, true);
    for (const b of place.blocks.filter(b => b.out > 0 && b.h[0] < 5)) assert.ok(b.out + b.depth / 2 <= .25, b.name);
    // Unnamed until the row is re-cut (open question 50): no boards, no landmark.
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
    assert.equal(place.boards, undefined);
    windows += place.windows.length;
  }
  // Every photographed upper window is laid once, a window cut by a source party line counting on both sides.
  assert.ok(windows >= 38, `${windows}`);
});
