import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fokWaiKee, fokWaiKeeFrame, fokWaiKeeLayout, fokWaiKeeReviews, elevation } from '../src/fok-wai-kee-layout.mjs';
import { amrise } from '../src/amrise-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '682928754');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = fokWaiKeeFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Fok Wai Kee keeps the addressed three-level No. 104 outline containing its mapped point', () => {
  assert.equal(source.number, '104'); assert.equal(source.street, 'Sims Avenue'); assert.equal(source.levels, 3);
  assert.equal(pointInPolygon([103.8776415, 1.3138318], source.coordinates), true);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['682928753', '682928755']) assert.equal(landmarkFor(id), undefined);
  assert.ok(Math.abs(frame.width - 6.29) < .02);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Sims Avenue');
  assert.ok(nearestOnSegment(frame.point(frame.width / 2, 1), nearest.point, nearest.point).distance < nearestOnSegment(frame.point(frame.width / 2), nearest.point, nearest.point).distance);
});

test('Fok Wai Kee elevation is ordered and the parapet sits near the measured Amrise parapet', () => {
  const [w1, w2] = [elevation.windows.slice(0, 3), elevation.windows.slice(3)];
  for (const [a, b] of w1.map((w, i) => [w, w2[i]])) assert.ok(a[3] < b[2], 'second-floor windows above first-floor windows');
  for (const [l, r, b, t] of elevation.windows) assert.ok(l > 0 && r < frame.width && b < t);
  assert.ok(elevation.shoulders[2] < elevation.crown[2] && fokWaiKee.height < elevation.shoulders[2]);
  assert.ok(Math.abs(elevation.shoulders[2] - (amrise.height + .8)) < .5, 'shoulders near the Amrise stepped parapet');
});

test('Fok Wai Kee fittings stay in the frontage and the canopy clears the carriageway', () => {
  const { boxes, canopy, sign } = fokWaiKeeLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  assert.ok(sign.out < 0 && sign.top < canopy.bottom);
  for (const p of [frame.point(canopy.left, canopy.front), frame.point(canopy.right, canopy.front)]) {
    for (const s of roadSegments) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
  }
});

test('Fok Wai Kee review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of fokWaiKeeReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
