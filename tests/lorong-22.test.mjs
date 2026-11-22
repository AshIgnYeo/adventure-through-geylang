import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong22, lorong22Frame, lorong22Layout, lorong22Reviews, lorong22Sides, lorong22Upper } from '../src/lorong-22-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

// The west side, south to north (open question 98).
const plots = ['474904365', '454438305', '454438306', '454274583', '454274580', '454274578', '454274575', '454438308', '454438309', '454438310'];

test("Lorong 22's west side comes in from the dated extension, with the lane's four ways and a corridor along it", () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(lorong22.flatMap(p => p.buildingIds), plots);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 22 Geylang').length, 4);
  const inStudy = studyArea(sourceMap), path = sourceMap.corridors.find(c => c.name === 'Lorong 22 Geylang').path.map(p => project(p, sourceMap.origin));
  for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3));
  for (const [id, n] of [['454438305', '36'], ['454438306', '34']]) assert.equal(building(id).street ?? 'Lorong 22 Geylang', 'Lorong 22 Geylang');
});

test('the Lorong 22 plots fit their outlines, face the lane and keep their review starts clear', () => {
  const houses = lorong22.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong22Frame(poly, spec);
    assertFittings(frame, poly, lorong22Layout(spec, frame.width).boxes);
    for (const side of lorong22Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong22Reviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across its street.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong22Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong22Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

