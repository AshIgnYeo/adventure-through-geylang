import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engLeeHuat, engLeeHuatFrame, engLeeHuatLayout, engLeeHuatReviews, elevation } from '../src/eng-lee-huat-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, sharesCorners, assertFittings, assertReviews } from './helpers.mjs';

const poly = outline('l11w-29'), frame = engLeeHuatFrame(poly);

test('Eng Lee Huat takes the re-spaced No. 29 footprint between No. 27 and No. 29A', () => {
  const b = building('l11w-29');
  assert.equal(b.number, '29'); assert.equal(b.geometrySource, 'authored-estimate'); assert.ok(b.replaces.includes('1223407879'));
  assert.deepEqual(landmarkFor(b.id).buildingIds, ['l11w-29']);
  for (const id of ['l11w-27', 'l11w-29a']) { assert.equal(landmarkFor(id), undefined); assert.equal(sharesCorners(poly, outline(id)), 2, id); }
  assert.ok(Math.abs(frame.width - 4.0) < .02);
  // u runs from the No. 27 party line, facing the lane.
  assert.equal(sharesCorners([frame.a], outline('l11w-27')), 1);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 11 Geylang');
  assert.match(engLeeHuat.evidence, /re-spaced No\. 29 footprint/);
});

test('Eng Lee Huat elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation;
  assert.ok(M.ceiling <= M.ledge[0] && M.ledge[1] < M.pediment.base && M.pediment.base < M.grilleLower.h[0] && M.grilleLower.h[1] <= M.window.h[0]);
  assert.ok(M.pediment.apex < M.window.h[0] + .1, "the pediment rises just into the lower grille");
  assert.ok(M.window.h[1] < M.hood.h[0] && M.hood.h[1] < engLeeHuat.height);
  assert.ok(M.board.h[1] < M.ledge[0] && M.plate.u[0] > M.board.u[1]);
  assert.ok(M.piers[0][1] === M.opening[0] && M.opening[1] === M.piers[1][0] && Math.abs(M.piers[1][1] - frame.width) < .02);
  assertFittings(frame, poly, engLeeHuatLayout(frame.width).boxes, .02);
});

test('Eng Lee Huat review start faces the frontage and stays walkable', () => assertReviews(frame, engLeeHuatReviews(frame)));
