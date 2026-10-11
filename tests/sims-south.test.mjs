import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simsSouth, simsSouthFrame, simsSouthLayout, simsSouthReviews, yapSun, no106 } from '../src/sims-south-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

test('Sims Avenue infill takes Nos. 120 and 106 and faces Sims Avenue', () => {
  assert.equal(building('682928761').number, '120'); assert.equal(landmarkFor('682928761').id, 'yap-sun');
  assert.match(yapSun.evidence, /open question 12/); assert.match(yapSun.evidence, /Chancerlodge/);
  assert.equal(building('sa-106').number, '106'); assert.equal(landmarkFor('sa-106'), undefined); assert.match(no106.evidence, /no name is given/);
  for (const place of simsSouth.filter(p => p.unnamed)) { assert.equal(landmarkFor(place.buildingIds[0]), undefined); assert.match(place.evidence, /no name is given/); }
  for (const place of simsSouth) {
    const frame = simsSouthFrame(outline(place.buildingIds[0]), place);
    assert.ok(['Sims Avenue', ...(place.side ? ['Lorong 15 Geylang'] : [])].includes(nearestRoad(frame.point(frame.width / 2, 3)).name), place.id);
  }
});

test('Sims Avenue infill elevations keep their fittings in the frontage and clear of the road', () => {
  for (const place of simsSouth) {
    const poly = outline(place.buildingIds[0]), frame = simsSouthFrame(poly, place), L = simsSouthLayout(place, frame.width);
    for (const w of place.windows) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[1] < place.height, place.id);
    assertFittings(frame, poly, L.boxes, .12);
    if (place.awning) assertClearOfCarriageway([frame.point(place.awning.from, place.awning.depth), frame.point(place.awning.to, place.awning.depth)]);
  }
});

test('Sims Avenue infill review starts face their frontages and stay walkable', () => {
  for (const place of simsSouth) { const frame = simsSouthFrame(outline(place.buildingIds[0]), place), reviews = simsSouthReviews(place, frame); if (reviews.length) assertReviews(frame, reviews); }
  assert.equal(simsSouthReviews(simsSouth.find(p => p.id === 'sims-124'), {}).length, 0, 'No. 124 lies beyond the walkable bounds');
});
