import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong18, lorong18Frame, lorong18Layout, lorong18Reviews, lorong18Sides, lorong18Upper } from '../src/lorong-18-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building, roadSegments } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 18 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 18 brings in its own buildings, its corners and the Geylang Road block back to Lorong 16', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const geylang = ['541941365'];
  const west = ['454274650', '454274632', '764372568', '764372567', '764372566', '454274634', '764372565', '454274635', '454274637',
    '454274639', '454274640', '764372564', '764372563', '454274642', '764372562', '454274643', '764372561', '454274645'];
  const east = ['454438314', '764372560', '764372559', '1470917582', '764372541', '121872891', '764372540'];
  for (const id of [...geylang, ...west, ...east]) assert.ok(ids.has(id), id);
  // Geylang Road east of No. 350, the Westerhout Road row and the stub south of it wait; the Lorong 16 rows are walked
  // with Lorong 16, not here.
  for (const id of ['764372558', '454438307', '764372539', '454274544', '764372525']) assert.equal(ids.has(id), false, id);
  const claimed = new Set(lorong18.flatMap(p => p.buildingIds));
  for (const id of ['763764683', '121872890', '763764666']) assert.equal(claimed.has(id), false, id);
  // The lane's eight ways, Westerhout Road's mouths either side of it, and Geylang Road on past the junction.
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 18 Geylang').length, 8);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Westerhout Road').map(r => r.id).sort(), ['23513327', '644902167']);
  for (const id of ['660071186', '666816964']) assert.equal(sourceMap.roads.find(r => r.id === id)?.name, 'Geylang Road', id);
});

test('Lorong 18 is walkable from the Geylang Road centreline to the Westerhout Road centreline, and back to Lorong 21 along Geylang Road', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Westerhout Road', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  const link = corridor('Geylang Road, Lorong 21 to Lorong 18');
  walkable(link.path.map(p => project(p, sourceMap.origin)), inStudy);
  // The link meets the Lorong 21 link where it starts, 17 m east of Lorong 21's junction.
  assert.deepEqual(link.path.at(-1), corridor('Geylang Road, Lorong 19 to Lorong 21').path[0]);
  // The backs of the blocks either side stay outside: the service lane behind the west row, the back of the Geylang Road
  // block, the service road behind the east side, and the stub south of Westerhout Road.
  for (const p of [[330, 150], [305, 70], [410, 120], [390, 275]]) assert.equal(inStudy(p, 0), false, `${p}`);
});

test('the Lorong 18 exteriors fit their outlines, face their streets and keep their review starts clear', () => {
  // Each building, with a place over several buildings built from its parts.
  const houses = lorong18.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong18Frame(poly, spec);
    assertFittings(frame, poly, lorong18Layout(spec, frame.width).boxes);
    for (const side of lorong18Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong18Reviews(spec, frame));
    assert.match(spec.evidence, /(February|December|June) 20(22|24)/);
    // Sources cite the source way, or for an authored footprint one of the ways it replaces.
    const ways = [id, ...(building(id).replaces ?? [])];
    assert.ok(spec.sources.some(s => ways.some(w => s.includes(`way/${w}`))), id);
    // Every front looks across its street: its outward normal points at the nearest point of that street's centreline.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageways, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong18Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    // Upper volumes stand inside the footprint.
    for (const up of lorong18Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    if (place.unnamed) {
      assert.equal(landmarkFor(id), undefined);
      assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
      for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
    } else assert.equal(landmarkFor(id).id, place.id);
  }
  // One review start per place.
  for (const place of lorong18.filter(p => p.parts)) assert.equal(place.buildingIds.filter(id => !place.parts[id].noReview).length, 1, place.id);
});

test('Le Regal is named on the Geylang Road block, its listing point inside the outline, with its wings raised over the podium', () => {
  const place = lorong18.find(p => p.id === 'le-regal');
  assert.equal(landmarkFor('541941365').id, place.id);
  assert.equal(pointInPolygon(project([103.8801401, 1.3125341], map.origin), outline('541941365')), true);
  // The front runs the 60.1 m Geylang Road edge, facing north; the lane and Lorong 16 faces are side faces.
  const frame = lorong18Frame(outline('541941365'), place);
  assert.ok(frame.nz < -.95 && Math.abs(frame.width - 60.105) < .01);
  assert.deepEqual(place.sides.map(s => s.edge), [8, 7, 11, 10]);
  // The wings stand from the podium to the parapet; the three screens and the lobby lettering are drawn boards.
  assert.deepEqual([place.upper[0].from, place.upper[0].to], [place.height, 19.0]);
  assert.equal(place.boards.length, 4);
  assert.ok(place.boards.at(-1).out < -place.fiveFootWay + .1, 'the lettering hangs on the lobby wall');
});
