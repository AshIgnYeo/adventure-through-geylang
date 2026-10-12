import test from 'node:test';
import assert from 'node:assert/strict';
import { ringEast, ringEastFrame, ringEastLayout, ringEastReviews } from '../src/ring-east-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { lorong17 } from '../src/lorong-17-layout.mjs';
import { assertFittings, assertReviews, outline } from './helpers.mjs';

test('the east-ring exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringEast.filter(p => !p.massing)) {
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

test('the Lorong 17 west side walk-ups not yet rebuilt are massing, one entry per way, coloured and unnamed', () => {
  const row = ringEast.filter(p => p.id.startsWith('l17-'));
  // Each of the eleven ways is either still massing here or rebuilt with its front in the Lorong 17 layout.
  const west = ['454254272', '454254273', '454254274', '454254270', '454254271', '454254275', '454254276', '454254277', '454254278', '454254279', '454254280'];
  const rebuilt = lorong17.flatMap(p => p.buildingIds);
  for (const id of west) assert.equal(row.some(p => p.buildingIds[0] === id), !rebuilt.includes(id), id);
  const ids = ringEast.flatMap(p => p.buildingIds);
  assert.equal(new Set(ids).size, ids.length);
  for (const place of row) {
    assert.equal(place.massing, true); assert.equal(place.unnamed, true);
    assert.match(place.colour, /^#[0-9a-f]{6}$/);
    assert.ok(place.height > 10 && place.height < 16);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
    assert.ok(outline(place.buildingIds[0]).length >= 4);
  }
});
