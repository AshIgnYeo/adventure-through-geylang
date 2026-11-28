import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong24, lorong24Frame, lorong24Layout, lorong24Reviews, lorong24Sides, lorong24Upper } from '../src/lorong-24-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

test('Lorong 24 comes in from its own narrow extract, with Jalan Suka and Jalan Molek as corridors', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const plots = lorong24.flatMap(p => p.buildingIds);
  assert.equal(plots.length, 38);
  for (const id of plots) assert.ok(ids.has(id), id);
  assert.equal(sourceMap.extensionLorong24.retrieved, '2026-11-28');
  // The side streets' houses, the lane's west row and the hotel corner were held by the east extension, which never took
  // them in; every other plot comes from the Lorong 24 extract alone.
  const extract = fs.readFileSync(new URL('../public/osm-extension-lorong-24.osm', import.meta.url), 'utf8');
  const east = fs.readFileSync(new URL('../public/osm-extension-east.osm', import.meta.url), 'utf8');
  const earlier = ['osm-source.osm', 'osm-extension.osm'].map(f => fs.readFileSync(new URL('../public/' + f, import.meta.url), 'utf8')).join('');
  const lorong25 = fs.readFileSync(new URL('../public/osm-extension-lorong-25.osm', import.meta.url), 'utf8');
  for (const id of plots) {
    assert.ok(extract.includes(`<way id="${id}"`), id); assert.equal(earlier.includes(`<way id="${id}"`), false, id);
    // The two Geylang Road corners reach the road's centre, so the Lorong 25 extract holds them too.
    assert.equal(lorong25.includes(`<way id="${id}"`), ['395805491', '395026245'].includes(id), id);
  }
  assert.equal(plots.filter(id => east.includes(`<way id="${id}"`)).length, 31);
  const inStudy = studyArea(sourceMap);
  for (const name of ['Lorong 24 Geylang', 'Jalan Suka', 'Jalan Molek']) {
    const path = sourceMap.corridors.find(c => c.name === name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
});

test("Lorong 24 fits its outlines, faces its streets and keeps its review starts clear", () => {
  const houses = lorong24.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong24Frame(poly, spec);
    assertFittings(frame, poly, lorong24Layout(spec, frame.width).boxes);
    for (const side of lorong24Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, lorong24Reviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/); assert.match(spec.name, /massing/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across its street.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong24Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of lorong24Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

