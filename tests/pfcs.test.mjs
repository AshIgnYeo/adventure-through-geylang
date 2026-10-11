import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pfcs, pfcsFrame, pfcsLayout, pfcsReviews, elevation } from '../src/pfcs-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon } from '../src/geo.mjs';
import { map, sourceMap, building, outline, assertFittings, assertReviews } from './helpers.mjs';

const poly = outline('l9-10'), frame = pfcsFrame(poly);

test('the Public Free Clinic Society takes the set-back No. 10 Lorong 9 footprint, leaving the forecourt open', () => {
  const b = building('l9-10');
  assert.equal(b.number, '10'); assert.ok(b.replaces.includes('1223603460'));
  assert.equal(landmarkFor('l9-10').id, pfcs.id);
  const src = sourceMap.buildings.find(x => x.id === '1223603460').coordinates.slice(0, -1).map(c => project(c, map.origin));
  // The forecourt, 4 m inside the old source front, is now open ground.
  const front = [(src[3][0] + src[0][0]) / 2, (src[3][1] + src[0][1]) / 2], inward = frame.point(frame.width / 2, 0);
  const d = Math.hypot(inward[0] - front[0], inward[1] - front[1]);
  assert.ok(Math.abs(d - 8) < .2, `the tower front is ${d} m behind the source front`);
  const forecourt = [front[0] + (inward[0] - front[0]) / 2, front[1] + (inward[1] - front[1]) / 2];
  assert.equal(map.buildings.some(x => pointInPolygon(forecourt, x.coordinates.slice(0, -1).map(c => project(c, map.origin)))), false);
  assert.ok(Math.abs(frame.width - 12.92) < .02);
});

test('the PFCS tower elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.entranceSign.h[1] <= pfcs.ceiling && pfcs.ceiling < E.glass[0] && E.glass[1] < E.label[0] && E.label[1] < pfcs.height);
  assertFittings(frame, poly, pfcsLayout(frame.width).boxes, .05);
});

test('the PFCS review start faces the tower and stays walkable', () => assertReviews(frame, pfcsReviews(frame)));
