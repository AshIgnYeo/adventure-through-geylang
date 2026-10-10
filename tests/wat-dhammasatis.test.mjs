import { test } from 'node:test';
import assert from 'node:assert/strict';
import { watDhammasatis, watDhammasatisFrame, watDhammasatisLayout, watDhammasatisReviews, elevation } from '../src/wat-dhammasatis-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('gr-233'), frame = watDhammasatisFrame(poly);

test('Wat Dhammasatis takes the No. 233 strip of the split block; Nos. 229 and 231 are separate', () => {
  assert.equal(building('gr-233').number, '233'); assert.ok(building('gr-233').replaces.includes('475158360'));
  assert.equal(landmarkFor('gr-233').id, watDhammasatis.id);
  assert.equal(landmarkFor('gr-229').id, 'lian-seng'); assert.equal(landmarkFor('gr-231'), undefined);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Geylang Road');
  assert.match(watDhammasatis.evidence, /partial-block footprint/);
});

test('the No. 233 elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(watDhammasatis.ceiling <= E.awning.wall && E.awning.wall < E.board.h[0] && E.board.h[1] <= E.firstGlazing[0].h[0] + .25);
  assert.ok(E.firstGlazing[0].h[1] < E.balcony.h[0] && E.balcony.h[1] <= E.topGlazing.h[0] && E.topGlazing.h[1] < watDhammasatis.height);
  assert.ok(E.sign.h[1] <= E.secondWindow.h[0] + .01 && E.buddha.h[1] < E.topGlazing.h[1]);
  const L = watDhammasatisLayout(frame.width);
  assertFittings(frame, poly, L.boxes, .05);
  assertClearOfCarriageway([frame.point(L.awning.from, L.awning.depth), frame.point(L.awning.to, L.awning.depth)]);
});

test('the No. 233 review start faces the frontage and stays walkable', () => assertReviews(frame, watDhammasatisReviews(frame)));
