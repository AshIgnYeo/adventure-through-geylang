import test from 'node:test';
import assert from 'node:assert/strict';
import { ringWest, ringWestFrame, ringWestLayout, ringWestReviews } from '../src/ring-west-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { assertFittings, assertReviews, outline } from './helpers.mjs';

test('the west-ring exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringWest) {
    const poly = outline(place.buildingIds[0]), frame = ringWestFrame(poly, place);
    assertFittings(frame, poly, ringWestLayout(place, frame.width).boxes);
    assertReviews(frame, ringWestReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
    // Unnamed exteriors carry no registered identity.
    assert.equal(place.unnamed, true);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
});
