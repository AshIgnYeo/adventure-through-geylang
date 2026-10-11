import { test } from 'node:test';
import assert from 'node:assert/strict';
import { redDot, redDotFrame, redDotLayout, redDotReviews, elevation } from '../src/red-dot-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, sharesCorners, assertFittings, assertReviews } from './helpers.mjs';

const poly = outline('sa-108'), frame = redDotFrame(poly);

test('Red Dot Running takes the joined Nos. 108–110 unit between No. 106 and Amrise', () => {
  const b = building('sa-108');
  assert.equal(b.number, '108'); for (const id of ['682928752', '682928751']) assert.ok(b.replaces.includes(id));
  assert.equal(landmarkFor('sa-108').id, redDot.id); assert.equal(landmarkFor('sa-106'), undefined);
  assert.equal(landmarkFor('682928750').id, 'amrise-hotel');
  assert.ok(sharesCorners(poly, outline('682928750')) >= 2 && sharesCorners(poly, outline('sa-106')) >= 2);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Sims Avenue');
});

test('Red Dot elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation;
  assert.ok(M.glazing.h[1] < redDot.ceiling && M.numeral.h[1] < redDot.ceiling && redDot.ceiling < M.floor2[0]);
  assert.ok(M.floor2[1] < M.floor2Hood[0] && M.floor2Hood[1] < M.floor3[0] && M.floor3[1] < M.floor3Hood[0] && M.floor3Hood[1] < redDot.height);
  assert.ok(M.piers[1][0] < M.numeral.u[1] && M.numeral.u[0] < M.piers[1][1], 'the 108 numerals are on the central pier');
  assertFittings(frame, poly, redDotLayout(frame.width).boxes, .1);
});

test('Red Dot review start faces the frontage and stays walkable', () => assertReviews(frame, redDotReviews(frame)));
