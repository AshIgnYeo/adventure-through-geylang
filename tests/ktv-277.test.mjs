import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ktv277, ktvFrame, ktvLayout, ktvReviews } from '../src/ktv-277-layout.mjs';
import { goldenJadeFrame } from '../src/golden-jade-layout.mjs';
import { rrMotorFrame } from '../src/rr-motor-layout.mjs';
import { eatFirst } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const polys = ktv277.buildingIds.map(outline), frames = polys.map(ktvFrame);
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);

test('277 KTV holds Nos. 275 and 277, between Zui Xiang at No. 273 and the Eros unit at No. 279', () => {
  for (const id of ktv277.buildingIds) assert.equal(landmarkFor(id).id, 'ktv-277');
  assert.equal(landmarkFor('454254221'), undefined, 'the closed Zui Xiang frontage at No. 273 stays generic');
  assert.equal(landmarkFor('454254224').id, 'eros', 'No. 279 is the separately signed Eros frontage');
  assert.ok(dist(frames[0].b, frames[1].a) < 1e-9);
  // Two frontages east of Golden Jade (No. 271) and two west of RR Motor (No. 281).
  assert.ok(Math.abs(dist(goldenJadeFrame(outline('454254220')).b, frames[0].a) - 5.13) < .05);
  assert.ok(Math.abs(dist(frames[1].b, rrMotorFrame(outline('454254225')).a) - 5.13) < .05);
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(ktv277[k], eatFirst[k]);
});

test('277 KTV fittings stay in their frontages; boards are continuous across the shared party line', () => {
  const ends = {};
  frames.forEach((frame, unit) => {
    const { boxes, shares, quilt, arches } = ktvLayout(frame.width, unit);
    assert.ok(arches.every(a => a.fret), 'fretwork fanlights');
    for (const box of boxes) {
      assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
      if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
        assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), polys[unit]), true, box.name);
      }
    }
    assert.ok(quilt.out < -.3 && quilt.out > -ktv277.fiveFootWay && quilt.left > 0 && quilt.right < frame.width);
    for (const s of shares) (ends[s.key] ??= []).push(s);
  });
  for (const [a, b] of Object.values(ends)) {
    assert.ok(Math.abs(a.right - frames[0].width) < 1e-9 && b.left === 0, 'no gap at the party line');
    assert.ok(Math.abs(a.uv[1] - b.uv[0]) < .002, 'texture continues across');
  }
});

test('277 KTV review starts face the pair and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of ktvReviews(frames[0])) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frames[0].point(frames[0].width, -.5);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
