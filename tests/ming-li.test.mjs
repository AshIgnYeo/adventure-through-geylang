import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mingLi, mingLiFrame, mingLiLayout, mingLiReviews, elevation } from '../src/ming-li-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, sharesCorners, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('682928749'), frame = mingLiFrame(poly);

test("Ming Li's takes the source No. 114 corner outline between Amrise and Lorong 15", () => {
  const b = building('682928749');
  assert.equal(b.number, '114'); assert.equal(b.street, 'Sims Avenue'); assert.equal(b.geometrySource, undefined, 'the source outline is kept');
  assert.equal(landmarkFor(b.id).id, mingLi.id);
  assert.ok(sharesCorners(poly, outline('682928750')) >= 2, 'it meets Amrise');
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Sims Avenue');
  const side = poly[2], end = poly[3];
  assert.equal(nearestRoad([(side[0] + end[0]) / 2, (side[1] + end[1]) / 2]).name, 'Lorong 15 Geylang');
});

test("Ming Li's elevation is ordered and its fittings stay in the frontage", () => {
  const E = elevation;
  assert.ok(E.awning.front < E.awning.wall && E.awning.wall <= mingLi.ceiling && mingLi.ceiling < E.board.h[0] && E.board.h[1] < E.floor2.h[0]);
  assert.ok(E.floor2.h[1] < 7.15 && 7.3 < E.vents[0].h[0] && E.vents[0].h[1] < E.floor3.h[0] && E.floor3.h[1] < 11.0 && 11.4 === mingLi.height);
  const L = mingLiLayout(frame.width);
  assertFittings(frame, poly, L.boxes, .05);
  assertClearOfCarriageway([frame.point(L.awning.from, L.awning.depth), frame.point(L.awning.to, L.awning.depth)]);
});

test("Ming Li's review starts face the frontage and stay walkable", () => assertReviews(frame, mingLiReviews(frame)));
