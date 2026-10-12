import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong19, geylangRow19, lorong19Frame, lorong19Layout, lorong19Reviews, lorong19Sides, lorong19Upper } from '../src/lorong-19-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 19 Geylang');
const lanePath = lane.path.map(p => project(p, sourceMap.origin)), laneSegments = lanePath.slice(1).map((b, i) => [lanePath[i], b]);
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 19 brings in its own buildings, its corners and the Geylang Road houses back to Lorong 17', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const west = ['454254263', '454254248', '476113985', '454254241', '476113983', '476113984', '454254239', '454254309', '454254310'];
  const east = ['454254168', '454254246', '1223524381', '454254247', '454254314', '454254339'];
  const geylangRoad = ['454254254', '454254256', '454254258', '454254260', '454254262'];
  for (const id of [...west, ...east, ...geylangRoad]) assert.ok(ids.has(id), id);
  // Sims Avenue Nos. 136-144 wait for their measurement (open question 43), and the Lorong Bachok row for a later pass.
  for (const id of ['682928736', '682928738', '682928739', '682928741', '682928744', '454254315', '454254245']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 19 Geylang').length, 7);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Lorong Bachok').map(r => r.id), ['23513607']);
});

test('Lorong 19 is walkable from the Geylang Road centreline to the Sims Avenue centreline, and back to Lorong 17 along both', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  // The links run from Lorong 17's junctions to past Lorong 19's, along the Geylang Road and Sims Avenue centrelines.
  for (const name of ['Geylang Road, Lorong 17 to Lorong 19', 'Sims Avenue, Lorong 17 to Lorong 19']) walkable(corridor(name).path.map(p => project(p, sourceMap.origin)), inStudy);
  // The backs of the blocks either side stay outside: between Lorong 17 and Lorong 19, and east towards Lorong 21.
  for (const p of [[188, -40], [195, 10], [262, -40], [265, 0]]) assert.equal(inStudy(p, 0), false, `${p}`);
});

test('the Lorong 19 exteriors fit their outlines, face the lane and keep their review starts clear', () => {
  for (const place of lorong19) {
    const poly = outline(place.buildingIds[0]), frame = lorong19Frame(poly, place);
    assertFittings(frame, poly, lorong19Layout(place, frame.width).boxes);
    for (const side of lorong19Sides(place, poly)) assertFittings(side.frame, poly, side.boxes);
    assertReviews(frame, lorong19Reviews(place, frame));
    assert.match(place.evidence, /(April|June) 2024/);
    // Sources cite the source way, or for an authored footprint one of the ways it replaces.
    const ways = [place.buildingIds[0], ...(building(place.buildingIds[0]).replaces ?? [])];
    assert.ok(place.sources.some(s => ways.some(w => s.includes(`way/${w}`))), place.id);
    // Every front looks across the lane: its outward normal points at the nearest point of the lane's centreline.
    const centre = frame.point(frame.width / 2, 0), lanePoint = laneSegments.map(([a, b]) => nearestOnSegment(centre, a, b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((lanePoint[0] - centre[0]) * frame.nx + (lanePoint[1] - centre[1]) * frame.nz > 0, place.id);
    // Street-level pieces stay clear of the modelled carriageways. A face whose source edge stands at or inside a
    // carriageway's edge is flagged heldFlat (the place, which its side faces follow unless they say otherwise, or one
    // side face), and its pieces stay within 0.25 m.
    const faces = [{ frame, blocks: place.blocks ?? [], heldFlat: place.heldFlat }, ...lorong19Sides(place, poly).map((side, i) => ({ frame: side.frame, blocks: place.sides[i].blocks ?? [], heldFlat: place.sides[i].heldFlat ?? place.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    // Upper volumes stand inside the footprint.
    for (const up of lorong19Upper(place, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), place.id);
    if (place.unnamed) {
      assert.equal(landmarkFor(place.buildingIds[0]), undefined);
      assert.equal(place.boards, undefined); assert.equal(place.blades, undefined);
      for (const side of place.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
    } else assert.equal(landmarkFor(place.buildingIds[0]).id, place.id);
  }
});

test('Eminent Frog Porridge & Seafood is named on the west corner, No. 323, its listing point inside the way', () => {
  const place = lorong19.find(p => p.id === 'eminent-frog-porridge');
  assert.equal(landmarkFor('454254263').id, place.id);
  assert.equal(pointInPolygon(project([103.879233, 1.3127383], map.origin), outline('454254263')), true);
  // The lane face runs north from the Geylang Road end; the two-storey block covers its first 22 m.
  const frame = lorong19Frame(outline('454254263'), place);
  assert.ok(frame.dz < -.95 && Math.abs(frame.width - 28.71) < .01);
  assert.equal(place.upper[0].outline[1][0], 22.0);
});

test('the Geylang Road row between Lorong 17 and Lorong 19 is shared out over its five source ways and faces Geylang Road', () => {
  assert.deepEqual(geylangRow19.map(p => p.buildingIds[0]), ['454254254', '454254256', '454254258', '454254260', '454254262']);
  let windows = 0;
  for (const place of geylangRow19) {
    const poly = outline(place.buildingIds[0]), frame = lorong19Frame(poly, place);
    assertFittings(frame, poly, lorong19Layout(place, frame.width).boxes);
    assertReviews(frame, lorong19Reviews(place, frame));
    // The source fronts stand at the edge of Geylang Road's estimated carriageway, so street-level pieces are held flat.
    assert.equal(place.heldFlat, true);
    for (const b of place.blocks.filter(b => b.out > 0 && b.h[0] < 5)) assert.ok(b.out + b.depth / 2 <= .25, b.name);
    // The front looks south across Geylang Road.
    assert.ok(frame.nz > .95, place.id);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
    windows += place.windows.length;
  }
  // The thirteen photographed windows survive the slicing; two are cut at party lines, so fifteen pieces in all.
  assert.ok(windows >= 13 && windows <= 16, `${windows}`);
});
