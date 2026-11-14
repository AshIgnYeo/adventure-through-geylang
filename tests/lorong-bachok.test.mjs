import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorongBachok, lorongBachokFrame, lorongBachokLayout, lorongBachokReviews, lorongBachokSides, lorongBachokUpper, row } from '../src/lorong-bachok-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

const plots = ['454254315', '454254316', '454254318', '454254320', '454254321', '454254322', '454254323', '454254324', '454254325', '454254326', '454254327', '454254328'];

test('Lorong Bachok brings in its twelve outlines and two middle ways, and is walkable from Lorong 19 to Lorong 21', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.deepEqual(lorongBachok.flatMap(p => p.buildingIds), plots);
  // The two blocks south of the lane wait for a walk that can photograph them (open question 93).
  for (const id of ['454254245', '454254242']) assert.equal(ids.has(id), false, id);
  for (const id of ['666807846', '762269508']) assert.equal(sourceMap.roads.find(r => r.id === id)?.name, 'Lorong Bachok', id);
  const inStudy = studyArea(sourceMap), path = sourceMap.corridors.find(c => c.name === 'Lorong Bachok').path.map(p => project(p, sourceMap.origin));
  for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3));
});

test('the row is one elevation of eleven houses, sliced across the twelve outlines without gaps', () => {
  // Every piece of the row lands on the outlines it spans: the slices' widths add back up to the piece, less the hairline
  // trims at the outlines' joins and the 6 cm mullions kept where an outline's edge cuts a window.
  const [place] = lorongBachok, at = plots.map(id => place.parts[id]);
  for (const key of ['windows', 'blocks', 'backFittings']) {
    const whole = row[key].reduce((s, x) => s + x.u[1] - x.u[0], 0), sliced = at.reduce((s, p) => s + (p[key] ?? []).reduce((t, x) => t + x.u[1] - x.u[0], 0), 0);
    assert.ok(whole - sliced > -1e-6 && whole - sliced < (key === 'windows' ? 1.5 : .25), key);
  }
  // A taller house running onto a lower outline stands as an upper volume over its share.
  assert.equal(at[6].upper.length, 1); assert.equal(at[9].upper.length, 1);
  assert.ok(at[6].upper[0].to > at[6].height); assert.ok(at[9].upper[0].to > at[9].height);
  assert.match(place.parts['454254328'].evidence, /plate 27/);
});

test('the Lorong Bachok outlines fit their slices, face the lane and keep their review starts clear', () => {
  const houses = lorongBachok.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorongBachokFrame(poly, spec);
    assertFittings(frame, poly, lorongBachokLayout(spec, frame.width).boxes);
    for (const side of lorongBachokSides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorongBachokReviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /May 2023 elevation/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across the lane.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorongBachokSides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorongBachokUpper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

