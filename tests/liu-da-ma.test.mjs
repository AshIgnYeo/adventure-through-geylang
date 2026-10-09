import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { liuDaMa, liuDaMaFrame, liuDaMaLayout, liuDaMaReviews, elevation } from '../src/liu-da-ma-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223250204');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = liuDaMaFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Liu Da Ma takes the addressed No. 26 Lorong 11 outline between Ho San Kong Hoey and No. 28', () => {
  assert.equal(source.number, '26'); assert.equal(source.street, 'Lorong 11 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223250200').id, 'ho-san-kong-hoey');
  assert.equal(landmarkFor('1223250205'), undefined, 'No. 28 stays generic');
  // u runs from the No. 28 party line (north) to Ho San Kong Hoey (south), facing the lane.
  const hoSan = map.buildings.find(b => b.id === '1223250200').coordinates.slice(0, -1).map(p => project(p, map.origin));
  assert.ok(hoSan.some(p => Math.hypot(p[0] - frame.b[0], p[1] - frame.b[1]) < 1e-9));
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 11 Geylang');
  assert.match(liuDaMa.evidence, /天府渔香 is listed on Floor 2 and is not assigned/);
});

test('Liu Da Ma elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation;
  assert.ok(M.sill[1] <= M.windows.h[0] && M.windows.h[1] <= M.louvres[0] && M.louvres[1] < M.canopy.front && M.canopy.wall < liuDaMa.height);
  assert.ok(M.awning.front < M.awning.wall && M.awning.wall < M.beam[0] && M.ceiling < M.beam[0] && liuDaMa.roofHeight < liuDaMa.height);
  assert.ok(M.blade.h[1] <= liuDaMa.height && M.blade.h[0] > M.awning.wall);
  const { boxes, awning, blade } = liuDaMaLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  // The awning and blade sign stay clear of the estimated carriageway.
  for (const s of roadSegments) for (const p of [frame.point(.1, awning.depth), frame.point(frame.width - .1, awning.depth), frame.point(blade.u, blade.out[1])]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Liu Da Ma review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of liuDaMaReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = liuDaMaReviews(frame), centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
});
