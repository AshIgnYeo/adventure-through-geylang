import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simsNorthRow, simsNorthRowFrame, simsNorthRowLayout, simsNorthRowReviews } from '../src/sims-north-row-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { outline, nearestRoad, assertFittings, assertReviews } from './helpers.mjs';

test('the Sims Avenue north-side places face Sims Avenue with their fittings in the frontage', () => {
  for (const place of simsNorthRow) {
    const poly = outline(place.buildingIds[0]), frame = simsNorthRowFrame(poly, place);
    assert.equal(nearestRoad(frame.point(frame.width / 2, 3)).name, 'Sims Avenue', place.id);
    if (place.unnamed) { assert.equal(landmarkFor(place.buildingIds[0]), undefined); assert.match(place.evidence, /no name is given/); }
    for (const w of place.windows ?? []) assert.ok(w.u[0] >= 0 && w.u[1] <= frame.width && w.h[1] < place.height, place.id);
    if (place.id === 'shi-cheng-temple') assert.match(place.evidence, /No name board could be read/);
    assertFittings(frame, poly, simsNorthRowLayout(place, frame.width).boxes, .12);
  }
});

test('Sims Avenue north-side review starts stay walkable', () => {
  for (const place of simsNorthRow) { const frame = simsNorthRowFrame(outline(place.buildingIds[0]), place); assertReviews(frame, simsNorthRowReviews(place, frame)); }
});
