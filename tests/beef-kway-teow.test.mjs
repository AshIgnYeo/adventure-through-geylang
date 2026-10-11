import { test } from 'node:test';
import assert from 'node:assert/strict';
import { beefKwayTeow, beefKwayTeowFrame, beefKwayTeowLayout, beefKwayTeowReviews, floors } from '../src/beef-kway-teow-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { alleyElevations, alleyElevationFrame } from '../src/temple-alley-layout.mjs';
import { map, building, outline, nearestRoad, assertFittings, assertReviews } from './helpers.mjs';

const poly = outline('gr-237'), frame = beefKwayTeowFrame(poly);

test('Lor 9 Beef Kway Teow takes the authored Lorong 9 corner footprint; the annex stays generic', () => {
  const b = building('gr-237');
  assert.equal(b.number, '237'); assert.ok(b.replaces.includes('454274485'));
  assert.equal(landmarkFor('gr-237').id, beefKwayTeow.id); assert.equal(landmarkFor('gr-237-annex'), undefined);
  // The corner's Geylang Road front sits close to Lorong 9 now that Lorong 9 is a derived road (open question 24).
  assert.ok(['Geylang Road', 'Lorong 9 Geylang'].includes(nearestRoad(frame.point(frame.width / 2)).name));
  // The back-lane elevation still finds its replaced source way.
  assert.ok(alleyElevationFrame(map, alleyElevations.find(e => e.id === '454274485')).length > 10);
});

test('the corner building elevation is ordered and its fittings stay in the frontage', () => {
  assert.ok(beefKwayTeow.ceiling < floors.lower[0] && floors.lower[1] < floors.vents[0][0] && floors.vents[0][1] <= floors.hoods[0]);
  assert.ok(floors.hoods[0] < floors.upper[0] && floors.upper[1] < floors.vents[1][0] && floors.hoods[1] < beefKwayTeow.height);
  assertFittings(frame, poly, beefKwayTeowLayout(frame.width).boxes, .5);
});

test('the corner building review starts stay walkable', () => assertReviews(frame, beefKwayTeowReviews(frame)));
