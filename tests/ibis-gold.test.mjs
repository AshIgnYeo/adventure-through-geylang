import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ibisGold, ibisGoldFrame, ibisGoldLayout, ibisGoldReviews } from '../src/ibis-gold-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertReviews, sharesCorners } from './helpers.mjs';

test('ibis budget Singapore Gold provisionally takes the four adjoining source ways, Nos. 121-127', () => {
  assert.deepEqual(ibisGold.buildingIds.map(id => building(id).number), ['121', '123', '125', '127']);
  for (const id of ibisGold.buildingIds) assert.equal(landmarkFor(id).id, ibisGold.id);
  for (let i = 1; i < 4; i++) assert.equal(sharesCorners(outline(ibisGold.buildingIds[i - 1]), outline(ibisGold.buildingIds[i])), 2);
  assert.match(ibisGold.evidence, /provisional/);
});

test('each ibis unit faces Sims Avenue and keeps its fittings in its frontage', () => {
  ibisGold.buildingIds.forEach((id, i) => {
    const poly = outline(id), frame = ibisGoldFrame(poly);
    assert.equal(nearestRoad(frame.point(frame.width / 2, 3)).name, 'Sims Avenue');
    assert.ok(frame.dx > 0, 'frames run west to east');
    assertFittings(frame, poly, ibisGoldLayout(i, frame.width).boxes, .12);
  });
});

test('the ibis review start stays walkable', () => { const frame = ibisGoldFrame(outline(ibisGold.reviewBuildingId)); assertReviews(frame, ibisGoldReviews(frame)); });
