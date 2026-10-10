import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chenHing, chenHingFrame, chenHingFrontBlock, chenHingLayout, chenHingReviews, elevation } from '../src/chen-hing-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { alleyElevations } from '../src/temple-alley-layout.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '475158359');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = chenHingFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));

test('Chen Hing takes the source way directly west of the mosque, containing its listed point', () => {
  assert.equal(source.street, 'Geylang Road'); assert.equal(source.number, null);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('454274485'), undefined, 'the No. 237 side stays generic');
  // u runs from the west party line to the shared corner with Masjid Haji Mohd Salleh.
  assert.ok(outline('454254204').some(p => Math.hypot(p[0] - frame.b[0], p[1] - frame.b[1]) < 1e-9));
  assert.equal(landmarkFor('454254204').id, 'haji-mohd-salleh-mosque');
  assert.equal(pointInPolygon(project([103.8767864, 1.3122656], map.origin), poly), true, 'Google Maps point for No. 241');
  assert.ok(Math.abs(frame.width - 10.08) < .01);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Geylang Road');
  // The rear wing keeps the reviewed back-lane elevation height.
  assert.equal(alleyElevations.find(e => e.id === source.id).height, chenHing.rearHeight);
});

test('Chen Hing elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation;
  assert.ok(M.ceiling <= M.ledge[0] && M.ledge[1] <= M.fascia[0] && M.fascia[1] <= M.lower.h[0]);
  assert.ok(M.lower.h[1] <= M.lowerHood[0] && M.lowerHood[1] <= M.lowerLedge[0] && M.lowerLedge[1] < M.upper.h[0]);
  assert.ok(M.upper.h[1] <= M.upperHood[0] && M.upperHood[1] < chenHing.height && chenHing.rearHeight < chenHing.height);
  assert.ok(M.english.h[1] <= M.chinese.h[0] && M.chinese.h[1] < M.fascia[1] && M.english.h[0] >= M.fascia[0] - .02);
  assert.ok(M.awning.front < M.awning.wall && M.awning.wall <= M.ceiling);
  for (const key of ['upper', 'lower']) for (const [l, r] of M[key].u) assert.ok(l > 0 && r < frame.width && l < r);
  const { boxes, awning } = chenHingLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  // The front block's back corners fit inside the source outline.
  const [, , eastBack, westBack] = chenHingFrontBlock(frame), centre = poly.reduce((s, p) => [s[0] + p[0] / poly.length, s[1] + p[1] / poly.length], [0, 0]);
  for (const p of [eastBack, westBack]) assert.equal(pointInPolygon([p[0] + (centre[0] - p[0]) * .01, p[1] + (centre[1] - p[1]) * .01], poly), true);
  for (const s of roadSegments) for (const p of [frame.point(awning.from, awning.depth), frame.point(awning.to, awning.depth)]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Chen Hing review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of chenHingReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = chenHingReviews(frame), centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
});
