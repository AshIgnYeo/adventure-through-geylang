import test from 'node:test';
import assert from 'node:assert/strict';
import { ringEast, ringEastFrame, ringEastLayout, ringEastReviews } from '../src/ring-east-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { assertFittings, assertReviews, outline } from './helpers.mjs';

test('the east-ring exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringEast) {
    const poly = outline(place.buildingIds[0]), frame = ringEastFrame(poly, place);
    assertFittings(frame, poly, ringEastLayout(place, frame.width).boxes);
    assertReviews(frame, ringEastReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
    // Unnamed exteriors carry no registered identity.
    assert.equal(place.unnamed, true);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
});

test('No. 291 keeps its source way; the row east of Lorong 12 fills the rest of the split block', () => {
  assert.deepEqual(ringEast.find(p => p.id === 'gr-291').buildingIds, ['454254230']);
  const row = ringEast.find(p => p.id === 'gr-260-east'), frame = ringEastFrame(outline('gr-260-east'), row);
  // The frame runs east to west, so the green bay (measured from the west end) sits at the far end of u.
  const green = row.blocks.find(b => b.name === 'green upper wall');
  assert.ok(green.u[0] > frame.width - 5 && green.u[1] <= frame.width);
});
