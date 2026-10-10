import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong11, lorong11Frame, lorong11RoofFrame, lorong11Layout, lorong11Reviews } from '../src/lorong-11-layout.mjs';
import { peranakan } from '../src/peranakan-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertReviews } from './helpers.mjs';

test('Lorong 11 module places take west-row footprints and face Lorong 11', () => {
  for (const place of lorong11) {
    const poly = outline(place.buildingIds[0]), frame = lorong11Frame(poly, place);
    assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 11 Geylang', place.id);
    assert.equal(building(place.buildingIds[0]).street, 'Lorong 11 Geylang');
    if (place.unnamed) { assert.equal(landmarkFor(place.buildingIds[0]), undefined); assert.match(place.evidence, /no name is given/); }
  }
});

test('each Lorong 11 elevation keeps its bays ordered and its fittings in the frontage', () => {
  for (const place of lorong11) {
    const poly = outline(place.buildingIds[0]), frame = lorong11Frame(poly, place), B = place.bays ?? {};
    const edges = [...(B.windows ?? []), ...(B.pilasters ?? [])].sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < edges.length; i++) assert.ok(edges[i][0] >= edges[i - 1][1] - 1e-9, `${place.id} overlap at ${edges[i][0]}`);
    assert.ok(edges.at(-1)[1] <= frame.width + .01, place.id);
    for (const g of place.ground ?? []) assert.ok(g.h[1] <= peranakan.ceiling && g.u[0] >= 0 && g.u[1] <= frame.width, `${place.id} ${g.name}`);
    assertFittings(frame, poly, lorong11Layout(place, frame.width).boxes, .12);
  }
});

test('the No. 15 roof spans the full depth of its wrapped outline', () => {
  const place = lorong11.find(p => p.id === 'l11-15'), poly = outline('l11w-15'), f = lorong11RoofFrame(poly, place);
  const depth = p => -((p[0] - f.a[0]) * f.nx + (p[1] - f.a[1]) * f.nz);
  assert.ok(depth(f.rearA) > 20 && depth(f.rearB) > 20);
});

test('Lorong 11 module review starts face their frontages and stay walkable', () => {
  for (const place of lorong11) { const frame = lorong11Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong11Reviews(place, frame)); }
});
