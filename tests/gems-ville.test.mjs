import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gemsVille, gemsVilleFrame, gemsVilleLayout, gemsVilleReviews, elevation } from '../src/gems-ville-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('l13-8'), frame = gemsVilleFrame(poly);

test('Gems Ville takes its authored No. 8 Lorong 13 footprint', () => {
  assert.equal(building('l13-8').number, '8'); assert.ok(building('l13-8').replaces.includes('452646018'));
  assert.equal(landmarkFor('l13-8').id, gemsVille.id);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
  assert.match(gemsVille.evidence, /seven-storey/);
});

test('the Gems Ville elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.podium < E.slabs[0]);
  for (let i = 1; i < E.slabs.length; i++) assert.ok(E.slabs[i] - E.slabs[i - 1] > 2.5 && E.slabs[i] - E.slabs[i - 1] < 3.2);
  assert.ok(E.slabs.at(-1) < E.topStorey && E.topStorey === E.louvres[0] && E.louvres[1] < gemsVille.height);
  for (let i = 1; i < E.fins.length; i++) assert.ok(E.fins[i] > E.fins[i - 1]);
  assertFittings(frame, poly, gemsVilleLayout(frame.width).boxes, .12);
  assertClearOfCarriageway([frame.point(.2, E.fence.out), frame.point(frame.width - .2, E.fence.out)]);
});

test('the Gems Ville review start stays walkable', () => assertReviews(frame, gemsVilleReviews(frame)));
