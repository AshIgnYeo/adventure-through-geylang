import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { westerhoutRoad, westerhoutRoadFrame, westerhoutRoadLayout, westerhoutRoadReviews, westerhoutRoadSides, westerhoutRoadUpper } from '../src/westerhout-road-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

// The south side's terrace row west to east, the two houses at Lorong 18's stub, then the north side (open question 72).
const plots = ['121873029', '764372536', '764372535', '764372533', '764372534', '764372531', '764372532', '764372527', '454274544', '454438307', '764372539'];

test('Westerhout Road comes in from Lorong 16 to Lorong 20 with its row and a corridor along it', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(westerhoutRoad.flatMap(p => p.buildingIds), plots);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Westerhout Road').length, 6);
  const inStudy = studyArea(sourceMap), path = sourceMap.corridors.find(c => c.name === 'Westerhout Road, Lorong 16 to Lorong 20').path.map(p => project(p, sourceMap.origin));
  for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3));
  // The numbers are the source ways' tags, and the photographed plates agree where they could be read.
  for (const [id, n] of [['764372536', '4'], ['764372532', '14'], ['454274544', '56'], ['454438307', '61'], ['764372539', '69']]) assert.equal(building(id).number, n);
});

test('the Westerhout Road plots fit their outlines, face the road and keep their review starts clear', () => {
  const houses = westerhoutRoad.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = westerhoutRoadFrame(poly, spec);
    assertFittings(frame, poly, westerhoutRoadLayout(spec, frame.width).boxes);
    for (const side of westerhoutRoadSides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, westerhoutRoadReviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across its street.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...westerhoutRoadSides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of westerhoutRoadUpper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

