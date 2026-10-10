import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong15, lorong15Frame, lorong15Layout, lorong15Reviews, sinChewTan, teckKeow } from '../src/lorong-15-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

test('the two association houses take the 28A and 26A strips north of Hotel 81 Spring', () => {
  assert.equal(building('l15-28a').number, '28A'); assert.equal(landmarkFor('l15-28a').id, sinChewTan.id);
  assert.equal(building('l15-26a').number, '26A'); assert.equal(landmarkFor('l15-26a').id, teckKeow.id);
  for (const place of lorong15) {
    assert.match(place.evidence, /open question 15/);
    const frame = lorong15Frame(outline(place.buildingIds[0]), place);
    assert.equal(nearestRoad(frame.point(frame.width / 2, 2)).name, 'Lorong 15 Geylang', place.id);
  }
});

test('Lorong 15 elevations keep their fittings in the frontage and clear of the road', () => {
  for (const place of lorong15) {
    const poly = outline(place.buildingIds[0]), frame = lorong15Frame(poly, place);
    for (const w of place.windows) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[1] < place.height, place.id);
    assertFittings(frame, poly, lorong15Layout(place, frame.width).boxes, .12);
    assertClearOfCarriageway([frame.point(place.awning.from, place.awning.depth), frame.point(place.awning.to, place.awning.depth)]);
  }
});

test('Lorong 15 review starts stay walkable', () => {
  for (const place of lorong15) { const frame = lorong15Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong15Reviews(place, frame)); }
});
