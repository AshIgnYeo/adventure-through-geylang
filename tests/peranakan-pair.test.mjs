import { test } from 'node:test';
import assert from 'node:assert/strict';
import { peranakan } from '../src/peranakan-layout.mjs';
import { goodwood, goodwoodFrame, goodwoodLayout, goodwoodReviews, groundFloor } from '../src/goodwood-layout.mjs';
import { tbss, tbssFrame, tbssLayout, tbssReviews, front } from '../src/tbss-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, sharesCorners, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const gPoly = outline('l11w-19'), gFrame = goodwoodFrame(gPoly);
const tPoly = outline('l11w-21'), tFrame = tbssFrame(tPoly);

test('Goodwood and TBSS take the re-spaced Nos. 19 and 21, between Hok Tek Chi and No. 23', () => {
  for (const [id, num, src, place] of [['l11w-19', '19', '1223407886', goodwood], ['l11w-21', '21', '1223407883', tbss]]) {
    const b = building(id);
    assert.equal(b.number, num); assert.equal(b.geometrySource, 'authored-estimate'); assert.ok(b.replaces.includes(src));
    assert.equal(landmarkFor(id).id, place.id); assert.deepEqual(landmarkFor(id).buildingIds, [id]);
    assert.equal(nearestRoad(outline(id)[0]).name, 'Lorong 11 Geylang');
  }
  assert.equal(landmarkFor('l11w-17').id, 'hok-tek-chi');
  assert.equal(sharesCorners(gPoly, outline('l11w-17')), 2); assert.equal(sharesCorners(gPoly, tPoly), 2); assert.equal(sharesCorners(tPoly, outline('l11w-23')), 2);
  assert.equal(landmarkFor('l11w-23'), undefined);
  assert.ok(Math.abs(gFrame.width - 5.3) < .02 && Math.abs(tFrame.width - 5.2) < .02);
  assert.match(tbss.evidence, /No Google Maps listing was found/);
});

test('the shared Peranakan elevation is ordered and both houses keep their fittings in the frontage', () => {
  const E = peranakan;
  assert.ok(E.ceiling <= E.beam[0] && E.beam[1] <= E.floorBand[0] && E.floorBand[1] < E.tiles[0] && E.tiles[1] < E.shutters[0]);
  assert.ok(E.shutters[1] === E.fanlight[0] && E.fanlight[1] < E.cornice[0] && E.cornice[1] < E.height && E.height < E.ridgeHeight);
  for (let i = 1; i < E.windows.length; i++) assert.ok(E.windows[i - 1][1] <= E.windows[i][0]);
  assert.ok(groundFloor.board[3] <= E.ceiling && front.board[2] > E.beam[1] - .3 && front.board[3] < front.ledge[0]);
  assertFittings(gFrame, gPoly, goodwoodLayout(gFrame.width).boxes, .02);
  const t = tbssLayout(tFrame.width);
  assertFittings(tFrame, tPoly, t.boxes, .02);
  assertClearOfCarriageway([tFrame.point(t.awning.from, t.awning.depth), tFrame.point(t.awning.to, t.awning.depth), gFrame.point(.1, peranakan.eavesOverhang)]);
});

test('Goodwood and TBSS review starts face their frontages and stay walkable', () => {
  assertReviews(gFrame, goodwoodReviews(gFrame));
  assertReviews(tFrame, tbssReviews(tFrame));
});
