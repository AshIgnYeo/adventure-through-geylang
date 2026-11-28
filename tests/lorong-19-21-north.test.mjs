import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong1921North, lorong1921NorthFrame, lorong1921NorthLayout, lorong1921NorthReviews, lorong1921NorthSides, lorong1921NorthUpper } from '../src/lorong-19-21-north-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

const plots = ['682937276', '541941370', '541941369', '452646019', '454254367', '541941368', '682937270', '682937272', '682937274', '454254350', '454254352'];

test('Lorongs 19 and 21 north of Sims Avenue bring in their eleven plots, and the lanes and the road between them are walkable', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(new Set(lorong1921North.flatMap(p => p.buildingIds)), new Set(plots));
  const inStudy = studyArea(sourceMap);
  for (const name of ['Lorong 19 Geylang, north of Sims Avenue', 'Lorong 19 Geylang, the road to Lorong 21', 'Lorong 21 Geylang, north of Sims Avenue']) {
    const path = sourceMap.corridors.find(c => c.name === name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
});

test('the Lorongs 19 and 21 north plots fit their outlines, face their roads and keep their review starts clear', () => {
  const houses = lorong1921North.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong1921NorthFrame(poly, spec);
    assertFittings(frame, poly, lorong1921NorthLayout(spec, frame.width).boxes);
    for (const side of lorong1921NorthSides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong1921NorthReviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across the avenue.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong1921NorthSides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong1921NorthUpper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

