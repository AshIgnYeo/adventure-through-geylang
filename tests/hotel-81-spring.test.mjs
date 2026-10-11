import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hotel81Spring, hotel81SpringFrame, hotel81SpringLayout, hotel81SpringReviews, elevation } from '../src/hotel-81-spring-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('l15-22'), frame = hotel81SpringFrame(poly);

test('Hotel 81 Spring takes the No. 22 strip of the split Lorong 15 block', () => {
  assert.equal(building('l15-22').number, '22'); assert.ok(building('l15-22').replaces.includes('454254281'));
  assert.equal(landmarkFor('l15-22').id, hotel81Spring.id);
  assert.equal(landmarkFor('l15-shed'), undefined);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 15 Geylang');
  assert.ok(Math.abs(frame.width - 16.2) < .02);
  assert.match(hotel81Spring.evidence, /current operation is uncertain/);
});

test('the Hotel 81 Spring elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(hotel81Spring.ceiling < E.sign.h[0] && E.sign.h[1] <= E.canopy.h[0] + .01 && E.canopy.h[1] < E.floors[0][0]);
  for (let i = 1; i < E.floors.length; i++) assert.ok(E.floors[i - 1][1] < E.floors[i][0]);
  assert.ok(E.floors[2][1] < hotel81Spring.height && hotel81Spring.height < E.pediment.top);
  const L = hotel81SpringLayout(frame.width);
  for (const w of [E.columns.left, E.columns.centre, ...E.columns.right]) assert.ok(w[0] > 0 && w[1] < frame.width);
  assertFittings(frame, poly, L.boxes, .05);
  assertClearOfCarriageway([frame.point(E.canopy.u[0], E.canopy.depth), frame.point(E.canopy.u[1], E.canopy.depth)]);
});

test('the Hotel 81 Spring review start faces the frontage and stays walkable', () => assertReviews(frame, hotel81SpringReviews(frame)));
