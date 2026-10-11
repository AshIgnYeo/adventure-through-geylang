import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { barLorong13, barLorong13Frame, barLorong13Layout, barLorong13Reviews, elevation } from '../src/bar-lorong-13-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223773758');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = barLorong13Frame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));

test('Bar @ Lorong 13 takes the addressed No. 1 Lorong 13 outline, south of No. 3', () => {
  assert.equal(source.number, '1'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223773753'), undefined, 'No. 3 stays generic');
  // u runs from the south end to the No. 3 party line, facing Lorong 13.
  assert.ok(outline('1223773753').some(p => Math.hypot(p[0] - frame.b[0], p[1] - frame.b[1]) < 1e-9));
  assert.ok(Math.abs(frame.width - 12.36) < .01);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 13 Geylang');
  assert.match(barLorong13.evidence, /Koh Hwee Cheng is listed at No\. 1 and is not assigned/);
});

test('No. 1 Lorong 13 elevation is ordered, with the tower between the wings', () => {
  const M = elevation;
  assert.ok(M.south[0] === 0 && M.south[1] === M.tower[0] && M.tower[1] === M.north[0] && Math.abs(M.north[1] - frame.width) < .01);
  assert.ok(M.towerFrame[0] > M.tower[0] && M.towerFrame[1] < M.tower[1]);
  for (const [l, r] of M.windows.lower.u) assert.ok((r <= M.south[1] || l >= M.north[0]) && l < r);
  assert.ok(M.ceiling < M.sign.h[0] && M.sign.h[1] <= M.ledges[0][1] + .02 && M.ledges[0][1] < M.windows.lower.h[0]);
  assert.ok(M.windows.lower.h[1] < M.vents.lower[0] && M.vents.lower[1] < M.ledges[1][0] && M.ledges[2][1] <= M.windows.upper.h[0]);
  assert.ok(M.windows.upper.h[1] < M.vents.upper[0] && M.vents.upper[1] < M.eave.h[0] && M.eave.h[1] < M.lettering.h[1]);
  assert.ok(M.lettering.h[1] < M.cap.h[0] && barLorong13.height < barLorong13.towerHeight && M.cap.h[0] === barLorong13.towerHeight);
  for (const [l, r] of M.slits.u) assert.ok(l > M.towerFrame[0] && r < M.towerFrame[1]);
  const { boxes } = barLorong13Layout(frame.width);
  for (const b of boxes) {
    if (!b.roll) assert.ok(b.u - b.w / 2 >= -.16 && b.u + b.w / 2 <= frame.width + .16, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  // The eaves and tower cap stay clear of the estimated carriageway.
  for (const s of roadSegments) for (const p of [frame.point(.1, M.eave.depth), frame.point(frame.width - .1, M.eave.depth), frame.point(5.9, M.cap.depth + .05)]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('No. 1 Lorong 13 review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of barLorong13Reviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = barLorong13Reviews(frame), centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
});
