import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cico, cicoFrame, cicoLayout, cicoReviews, fittings } from '../src/cico-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { alleyEntranceEnclosure } from '../src/temple-alley-layout.mjs';
import { map, building, outline, nearestRoad, assertFittings, assertReviews } from './helpers.mjs';

const poly = outline('l11-1-7'), frame = cicoFrame(poly);

test('Cico Flooring takes the merged Nos. 1–7 footprint, and the back-lane enclosure still builds', () => {
  const b = building('l11-1-7');
  for (const id of ['1223407887', '1223407888', '1223407889', '1223407890']) assert.ok(b.replaces.includes(id));
  assert.equal(landmarkFor('l11-1-7').id, cico.id);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 11 Geylang');
  assert.ok(Math.abs(frame.width - 21.07) < .02);
  assert.equal(alleyEntranceEnclosure(map).outline.length, 4);
});

test('the Cico frontage fittings are ordered along the front and stay in it', () => {
  const sorted = [...fittings].filter(f => !f.out).sort((a, b) => a.s[0] - b.s[0]);
  for (let i = 1; i < sorted.length; i++) assert.ok(sorted[i - 1].s[1] <= sorted[i].s[0] + 1e-9, sorted[i].name);
  assert.ok(cico.height < cico.eaves && cico.eaves < cico.ridge);
  assertFittings(frame, poly, cicoLayout(frame.width).boxes, .05);
});

test('the Cico review start faces the frontage and stays walkable', () => assertReviews(frame, cicoReviews(frame)));
