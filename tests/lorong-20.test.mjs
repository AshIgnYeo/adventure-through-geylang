import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong20, lorong20Frame, lorong20Layout, lorong20Reviews, lorong20Sides, lorong20Upper } from '../src/lorong-20-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

// East side north to south, then west side north to south (open question 81).
const plots = [
  '454438313', '763764650', '454274568', '454274563', '454274565', '454274559', '454274557', '454274586', '454274554', '454274551', '454274550',
  '121873024', '454274591', '454274594', '454274588', '764372538', '764372525', '454274547', '764372526', '764372524', '764372523', '764372522', '764372521',
];

test('Lorong 20 comes in from the dated extension with its plots, its thirteen ways and its corridor from Geylang Road to Guillemard Road', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(lorong20.flatMap(p => p.buildingIds), plots);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 20 Geylang').length, 13);
  assert.equal(sourceMap.extension.retrieved, '2026-11-22');
  const inStudy = studyArea(sourceMap);
  for (const name of ['Lorong 20 Geylang', 'Geylang Road, No. 364 to Lorong 20', 'Guillemard Road at Lorong 20']) {
    const path = sourceMap.corridors.find(c => c.name === name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
  // The Westerhout Road row west of the lane came in with its own pass (open question 72), and the Lorong 18 stub's west
  // side still waits.
  for (const id of ['764372539', '454438307', '454274544']) assert.equal(ids.has(id), true, id);
  assert.equal(ids.has('454274629'), false);
});

test('the Lorong 20 plots fit their outlines, face the lane and keep their review starts clear', () => {
  const houses = lorong20.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong20Frame(poly, spec);
    assertFittings(frame, poly, lorong20Layout(spec, frame.width).boxes);
    for (const side of lorong20Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong20Reviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across its street.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong20Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong20Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

