import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guanKeat, guanKeatFrame, guanKeatLayout, guanKeatReviews, elevation } from '../src/guan-keat-layout.mjs';
import { landmarkFor, landmarks } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('l11-38'), frame = guanKeatFrame(poly);

test('the Guan Keat coffeeshop replaces the provisional Lok Fu model on a chamfered No. 38 footprint', () => {
  const b = building('l11-38');
  assert.equal(b.number, '38'); assert.ok(b.replaces.includes('1223250209'));
  assert.equal(landmarkFor('l11-38').id, guanKeat.id); assert.equal(landmarks.find(p => p.id === 'lok-fu'), undefined);
  assert.equal(poly.length, 5, 'the Lorong 11 corner is chamfered');
  assert.ok(Math.abs(frame.width - 21.05) < .02);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Sims Avenue');
  assert.match(guanKeat.evidence, /Guan Keat is an LPG distributor/);
});

test('the Guan Keat elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.awning.front < E.awning.wall && E.awning.wall < guanKeat.ceiling + .2 && guanKeat.ceiling < E.floor2[0]);
  assert.ok(E.floor2[1] <= E.vents[0][1] && E.vents[0][1] < 7.47 && 7.74 < E.floor3[0] && E.floor3[1] <= E.vents[1][1] && E.vents[1][1] < guanKeat.height);
  for (let i = 1; i < E.wide.length; i++) assert.ok(E.wide[i - 1][1] < E.wide[i][0]);
  const L = guanKeatLayout(frame.width);
  assertFittings(frame, poly, L.boxes, .05);
  assertClearOfCarriageway([frame.point(L.awning.from, L.awning.depth), frame.point(L.awning.to, L.awning.depth)]);
});

test('the Guan Keat review starts face the frontage and stay walkable', () => assertReviews(frame, guanKeatReviews(frame)));
