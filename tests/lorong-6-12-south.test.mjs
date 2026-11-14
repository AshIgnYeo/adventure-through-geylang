import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong612South, lorong612SouthFrame, lorong612SouthLayout, lorong612SouthReviews, lorong612SouthSides, lorong612SouthUpper } from '../src/lorong-6-12-south-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

const plots = ['454274481', '454254191', '1223129486', '454254199', '454254198', '1236158086', '454274470', '454274479', '454274473', '454274475', '454274477', '454274466', '1223401724', '454438336', '121873782', '454438333', '454438325', '454438324', '454438322', '454438317'];

test('Lorongs 6, 8, 10 and 12 south of the rectangle bring in twenty plots, and the lanes and the service road are walkable', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(lorong612South.flatMap(p => p.buildingIds), plots);
  assert.ok(sourceMap.roads.some(r => r.name === 'Lorong 6 Geylang') && sourceMap.roads.some(r => r.name === 'Lorong 8 Geylang') && sourceMap.roads.some(r => r.name === 'Service road'));
  const inStudy = studyArea(sourceMap);
  for (const name of ['Lorong 6 Geylang, south', 'Lorong 8 Geylang, south', 'Lorong 10 Geylang, south', 'Lorong 12 Geylang, south', 'Service road between Lorongs 4 and 6']) {
    const path = sourceMap.corridors.find(c => c.name === name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
});

test('the plots south of the rectangle fit their outlines, face their roads and keep their review starts clear', () => {
  const houses = lorong612South.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong612SouthFrame(poly, spec);
    assertFittings(frame, poly, lorong612SouthLayout(spec, frame.width).boxes);
    for (const side of lorong612SouthSides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong612SouthReviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across the avenue.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong612SouthSides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong612SouthUpper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

