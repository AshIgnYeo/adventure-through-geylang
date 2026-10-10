import { test } from 'node:test';
import assert from 'node:assert/strict';
import { geylangNorth, geylangNorthFrame, geylangNorthLayout, geylangNorthReviews, lianSeng, no231 } from '../src/geylang-north-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertReviews } from './helpers.mjs';

test('Lian Seng takes the No. 229 strip and No. 231 stays unnamed', () => {
  assert.equal(building('gr-229').number, '229'); assert.equal(landmarkFor('gr-229').id, lianSeng.id);
  assert.equal(landmarkFor('gr-231'), undefined); assert.match(no231.evidence, /no name is given/);
  for (const place of geylangNorth) {
    const frame = geylangNorthFrame(outline(place.buildingIds[0]), place);
    assert.equal(nearestRoad(frame.point(frame.width / 2, 3)).name, 'Geylang Road', place.id);
  }
});

test('Geylang Road north infill keeps its bays inside the frontage', () => {
  for (const place of geylangNorth) {
    const poly = outline(place.buildingIds[0]), frame = geylangNorthFrame(poly, place);
    for (const w of place.windows) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[0] > place.ceiling && w.h[1] < place.height, place.id);
    assertFittings(frame, poly, geylangNorthLayout(place, frame.width).boxes, .12);
  }
});

test('Geylang Road north infill review starts stay walkable', () => {
  for (const place of geylangNorth) { const frame = geylangNorthFrame(outline(place.buildingIds[0]), place); assertReviews(frame, geylangNorthReviews(place, frame)); }
});
