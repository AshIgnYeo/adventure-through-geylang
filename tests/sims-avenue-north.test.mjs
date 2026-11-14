import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { simsAvenueNorth, simsAvenueNorthFrame, simsAvenueNorthLayout, simsAvenueNorthReviews, simsAvenueNorthSides, simsAvenueNorthUpper } from '../src/sims-avenue-north-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, building, roadSegments } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
// The 29 source outlines along the north side, west to east (open question 83).
const north = [
  '439168677', '439168816', '439168799', '439168674', '439168825', '439168849',
  '475918110', '475918111', '682928772', '682928771', '682928770', '682928769', '682928768',
  '682928722', '682937224', '454254365', '454254366',
  '454254353', '454254354', '454254355', '454254356', '454254357', '454254358', '454254359', '454254360', '454254361',
  '454254362', '454254363', '454254364',
];

test('the north side of Sims Avenue brings in its 29 buildings and the mouths of the lanes north of it', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of north) assert.ok(ids.has(id), id);
  // The Buddhist Congress Center at Lorong 23, beyond Lorong 21A, waits.
  assert.equal(ids.has('541941379'), false);
  for (const [id, name] of [['708456471', 'Lorong 17 Geylang'], ['666807374', 'Lorong 19 Geylang'], ['666807857', 'Lorong 21 Geylang'], ['666579841', 'Lorong 21A Geylang']])
    assert.equal(sourceMap.roads.find(r => r.id === id)?.name, name, id);
});

test('the north pavement is walkable from No. 135 to Lorong 21A, in front of every building but the set-back care centre', () => {
  const inStudy = studyArea(sourceMap);
  for (const name of ['Sims Avenue, No. 135 to Lorong 17', 'Sims Avenue, Lorong 21 to Lorong 21A']) {
    const path = corridor(name).path.map(p => project(p, sourceMap.origin));
    for (let i = 1; i < path.length; i++) for (let k = 0; k <= 20; k++) assert.ok(inStudy([path[i - 1][0] + (path[i][0] - path[i - 1][0]) * k / 20, path[i - 1][1] + (path[i][1] - path[i - 1][1]) * k / 20], 3), name);
  }
  // 8 m in front of each front's midpoint, where the review starts stand.
  const sims = roadSegments.filter(s => s.road.name === 'Sims Avenue');
  for (const id of north.filter(id => id !== '682928722')) {
    const o = outline(id);
    const fronts = o.map((a, i) => ({ a, b: o[(i + 1) % o.length] })).filter(e => Math.hypot(e.b[0] - e.a[0], e.b[1] - e.a[1]) > 2);
    const near = e => Math.min(...sims.map(s => nearestOnSegment([(e.a[0] + e.b[0]) / 2, (e.a[1] + e.b[1]) / 2], s.a, s.b).distance));
    const f = fronts.sort((x, y) => near(x) - near(y))[0], m = [(f.a[0] + f.b[0]) / 2, (f.a[1] + f.b[1]) / 2];
    const nearest = sims.map(s => nearestOnSegment(m, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point, d = Math.hypot(nearest[0] - m[0], nearest[1] - m[1]);
    assert.ok(inStudy([m[0] + (nearest[0] - m[0]) * 8 / d, m[1] + (nearest[1] - m[1]) * 8 / d], 3), id);
  }
});

test('the Sims Avenue north exteriors fit their outlines, face the avenue and keep their review starts clear', () => {
  const houses = simsAvenueNorth.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = simsAvenueNorthFrame(poly, spec);
    assertFittings(frame, poly, simsAvenueNorthLayout(spec, frame.width).boxes);
    for (const side of simsAvenueNorthSides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview) assertReviews(frame, simsAvenueNorthReviews(spec, frame));
    // Measured from KartaView's May 2023 drives, and cited by frame and source way.
    assert.match(spec.evidence, /May 2023/);
    assert.ok(spec.sources.some(s => s.includes(`way/${id}`)), id);
    assert.ok(spec.sources.some(s => s.startsWith('https://kartaview.org/details/')), id);
    // Every front looks across the avenue.
    const centre = frame.point(frame.width / 2, 0), street = roadSegments.filter(s => s.road.name === spec.reviewRoad);
    const nearest = street.map(s => nearestOnSegment(centre, s.a, s.b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((nearest[0] - centre[0]) * frame.nx + (nearest[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageway, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...simsAvenueNorthSides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    for (const up of simsAvenueNorthUpper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    // Unnamed until listings can be checked: no landmark, and no drawn board or blade.
    assert.equal(place.unnamed, true, id);
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  }
});

test('the row east of Lorong 21 is read on its source front and numbered from its signs', () => {
  // No. 183 is the corner: its Lorong 21 face is a side face; the rest face the avenue alone.
  const corner = simsAvenueNorth.find(p => p.id === 'sa-183');
  assert.deepEqual(corner.sides.map(s => s.edge), [1]);
  assert.equal(building('454254353').number, '183');
  for (const [id, n] of [['454254354', '185'], ['454254355', '187'], ['454254358', '193']]) {
    assert.equal(building(id).number, n);
    assert.match(simsAvenueNorth.find(p => p.buildingIds.includes(id)).evidence, new RegExp(n));
  }
});
