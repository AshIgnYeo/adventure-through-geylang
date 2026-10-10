import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong9, lorong9Frame, lorong9Layout, lorong9Reviews, ywam, greyBuilding } from '../src/lorong-9-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, assertFittings, assertReviews, sharesCorners } from './helpers.mjs';

test('YWAM takes the way tagged No. 4, where its plaque hangs; the others are unnamed', () => {
  assert.equal(building('453797939').number, '4'); assert.equal(landmarkFor('453797939').id, ywam.id);
  assert.match(ywam.evidence, /4 LORONG 9 GEYLANG/); assert.match(ywam.evidence, /open question 12/);
  for (const place of lorong9.filter(p => p.unnamed)) for (const id of place.buildingIds) assert.equal(landmarkFor(id), undefined);
  assert.equal(sharesCorners(outline(greyBuilding.buildingIds[0]), outline(greyBuilding.buildingIds[1])), 2, 'the grey building spans two adjoining ways');
});

test('Lorong 9 frames face west and keep their fittings in the frontage', () => {
  for (const place of lorong9) {
    const poly = outline(place.buildingIds[0]), frame = lorong9Frame(poly, place);
    assert.ok(frame.nx < 0, `${place.id} faces west`);
    if (place.buildingIds.length === 1) assertFittings(frame, poly, lorong9Layout(place, frame.width).boxes, .12);
  }
});

test('Lorong 9 review starts stay walkable', () => {
  for (const place of lorong9.filter(p => p.buildingIds.length === 1)) { const frame = lorong9Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong9Reviews(place, frame)); }
});
