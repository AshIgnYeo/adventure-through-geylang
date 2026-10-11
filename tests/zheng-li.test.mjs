import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zhengLi, zhengLiFrame, zhengLiLayout, zhengLiReviews, elevation } from '../src/zheng-li-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, sharesCorners, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const poly = outline('l11w-35'), frame = zhengLiFrame(poly);

test('Zheng Li takes the re-spaced No. 35 footprint at the north end of the row', () => {
  const b = building('l11w-35');
  assert.equal(b.number, '35'); assert.ok(b.replaces.includes('1223407876'));
  assert.deepEqual(landmarkFor(b.id).buildingIds, ['l11w-35']);
  assert.equal(landmarkFor('l11w-33'), undefined); assert.equal(sharesCorners(poly, outline('l11w-33')), 2);
  assert.ok(Math.abs(frame.width - 6.9) < .02);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 11 Geylang');
  assert.match(zhengLi.evidence, /ends 0\.66 m past the source end/);
});

test('Zheng Li elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.ceiling <= E.awning.bottom && E.awning.top <= E.band[0] && E.band[1] < E.bay.h[0] && E.bay.h[0] < E.bigWindow.h[0]);
  assert.ok(E.bigWindow.h[1] < E.bay.h[1] && E.bay.h[1] < E.slab[0] && E.smallWindow.h[1] < E.vents.h[0] && E.slab[1] <= zhengLi.height + .11);
  assert.ok(E.bay.u[0] < E.bigWindow.u[0] && E.bigWindow.u[1] < E.bay.u[1] && E.smallWindow.u[1] < E.bay.u[0]);
  assert.ok(E.blade.h[1] < E.slab[0] && E.blade.u < frame.width);
  const L = zhengLiLayout(frame.width);
  assertFittings(frame, poly, L.boxes, .06);
  assertClearOfCarriageway([frame.point(.1, L.awning.depth), frame.point(frame.width - .1, L.awning.depth), frame.point(L.blade.u, L.blade.out[1])]);
});

test('Zheng Li review starts face the frontage and stay walkable', () => assertReviews(frame, zhengLiReviews(frame)));
