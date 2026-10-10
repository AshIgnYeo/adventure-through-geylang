import test from 'node:test';
import assert from 'node:assert/strict';
import { pointInPolygon } from '../src/geo.mjs';
import { frontageFrame } from '../src/gable-roof-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { mosqueElevation as M, mosqueLayout } from '../src/mosque-layout.mjs';
import { assertFittings, outline } from './helpers.mjs';

const poly = outline('454254204'), frame = frontageFrame(poly, 2);

test('the mosque frame runs east from the Chen Hing party wall along the 22.46 m source front', () => {
  assert.ok(Math.abs(frame.width - 22.46) < .02);
  assert.deepEqual(frame.point(0, 0).map(v => +v.toFixed(2)), poly[3].map(v => +v.toFixed(2)));
  assert.equal(landmarkFor('454254204').height, M.parapet);
});

test('the measured elevation fits the photographed front, inside the source front', () => {
  const boxes = mosqueLayout();
  assertFittings(frame, poly, boxes);
  for (const b of boxes) {
    assert.ok(b.u + b.w / 2 <= M.facade + .06, b.name);
    assert.ok(b.y + b.h / 2 <= M.parapet + .25, b.name);
    assert.ok(b.out + b.depth / 2 <= .3, b.name);
  }
  // Four window bays symmetric about the centre, with the arch between the middle pair.
  assert.equal(M.windows.length, 4);
  for (let i = 0; i < 2; i++) assert.ok(Math.abs(M.windows[i] + M.windows[3 - i] - 2 * M.centre) < .02);
  const [l, r] = M.second.panel;
  assert.ok(M.centre - M.second.arch.radius - .16 > l && M.centre + M.second.arch.radius + .16 < r);
});

test('the set-back towers and gable roof stay inside the outline', () => {
  const T = M.tower, G = M.gable;
  for (const { u } of M.towers) for (const du of [-1, 1]) for (const out of [-T.setback, -T.setback - T.size]) {
    assert.equal(pointInPolygon(frame.point(u + du * T.size / 2, out), poly), true);
  }
  for (const u of [M.centre - G.halfWidth, M.centre + G.halfWidth]) for (const out of [-G.setback, -G.back]) {
    assert.equal(pointInPolygon(frame.point(u, out), poly), true);
  }
  assert.ok(G.peak > T.top && T.top > M.parapet);
});
