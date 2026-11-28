import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong25, lorong25Frame, lorong25Layout, lorong25Reviews, lorong25Sides, lorong25Upper } from '../src/lorong-25-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

test('Lorong 25 comes in from its own narrow extract, with the lane and its links to Aljunied Road', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const plots = lorong25.flatMap(p => p.buildingIds);
  assert.equal(plots.length, 26);
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.equal(sourceMap.extensionLorong25.retrieved, '2026-11-28');
  // Each plot comes from the Lorong 25 extract and from no earlier source.
  const earlier = ['osm-source.osm', 'osm-extension.osm', 'osm-extension-east.osm'].map(f => fs.readFileSync(new URL('../public/' + f, import.meta.url), 'utf8')).join('');
  // Four plots at the Geylang Road end straddle the east extension's north edge, which holds them but never took them in.
  const straddling = ['454254125', '454254123', '454254129', '454254122'];
  for (const id of plots) assert.equal(earlier.includes(`<way id="${id}"`), straddling.includes(id), id);
  const inStudy = studyArea(sourceMap);
  for (const name of ['Lorong 25 Geylang', 'Geylang Road, Lorong 25A to Aljunied Road', 'Sims Avenue, Aljunied Road to Lorong 25A']) {
    const path = sourceMap.corridors.find(c => c.name === name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
  // The terrace is Nos. 6-26, in order up the lane.
  assert.deepEqual(lorong25.filter(p => /^l25-\d+$/.test(p.id)).map(p => p.id.slice(4)), ['6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26']);
});

test("Lorong 25 fits its outlines, faces its streets and keeps its review starts clear", () => {
  const houses = lorong25.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong25Frame(poly, spec);
    assertFittings(frame, poly, lorong25Layout(spec, frame.width).boxes);
    for (const side of lorong25Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong25Reviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across its street.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong25Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong25Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

