import test from 'node:test';
import assert from 'node:assert/strict';
import { pointInPolygon, project, nearestOnSegment } from '../src/geo.mjs';
import { frontageFrame } from '../src/gable-roof-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { mosqueElevation as M, mosqueLayout } from '../src/mosque-layout.mjs';
import { assertFittings, outline, sourceMap } from './helpers.mjs';
import { authoredSiteFrame, shanYuanTang } from '../src/authored-sites.mjs';

const poly = outline('gr-245'), frame = frontageFrame(poly, 0);

test('the mosque frame runs east from the Chen Hing party wall along the photographed 20.3 m front', () => {
  assert.ok(Math.abs(frame.width - M.facade) < 1e-6);
  assert.deepEqual(frame.point(0, 0).map(v => +v.toFixed(2)), poly[0].map(v => +v.toFixed(2)));
  assert.equal(landmarkFor('gr-245').height, M.parapet);
  // The front is parallel to the triangulated façade, about 8 degrees off the source front.
  const source = sourceMap.buildings.find(b => b.id === '454254204').coordinates.slice(0, -1).map(c => project(c, sourceMap.origin));
  const turn = Math.atan2(frame.dz, frame.dx) - Math.atan2(source[2][1] - source[3][1], source[2][0] - source[3][0]);
  assert.ok(Math.abs(Math.abs(turn * 180 / Math.PI) - 8.2) < 1);
  // The west wall stays on the source Chen Hing party wall, and the rear-west corner is shared.
  assert.ok(nearestOnSegment(poly[0], source[3], source[0]).distance < 1e-6);
  assert.deepEqual(poly[3].map(v => +v.toFixed(6)), source[0].map(v => +v.toFixed(6)));
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

test('the open east yard keeps the mosque clear of the Shan Yuan Tang site', () => {
  const site = authoredSiteFrame(shanYuanTang, sourceMap.origin).outline;
  for (const p of poly) assert.equal(pointInPolygon(p, site), false);
  for (const p of site) assert.equal(pointInPolygon(p, poly), false);
  // At the rear, the yard between the new east wall and the source east corner is about 2 m wide.
  const source = sourceMap.buildings.find(b => b.id === '454254204').coordinates.slice(0, -1).map(c => project(c, sourceMap.origin));
  const yard = Math.hypot(poly[2][0] - source[1][0], poly[2][1] - source[1][1]);
  assert.ok(yard > 1.5 && yard < 2.5, String(yard));
});
