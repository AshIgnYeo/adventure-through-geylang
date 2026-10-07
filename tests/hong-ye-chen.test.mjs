import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hongYeChen, hongYeChenFrame, hongYeChenLayout, hongYeChenReviews, elevation } from '../src/hong-ye-chen-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223773755');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = hongYeChenFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Hong Ye Chen keeps the addressed No. 7 Lorong 13 outline containing its mapped point', () => {
  assert.equal(source.number, '7'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.equal(pointInPolygon([103.8775078, 1.3128704], source.coordinates), true);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223773754').id, 'k-group');
  for (const id of ['1223773756', '1223773757']) assert.equal(landmarkFor(id), undefined);
  assert.match(hongYeChen.evidence, /Mister Contracts shares the same Maps point/);
  assert.ok(Math.abs(frame.width - 5.02) < .02);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 13 Geylang');
});

test('Hong Ye Chen elevation is ordered and fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.sign[1] < E.beamTop && E.beamTop < E.floor2 && E.tiles[1] < E.sill && E.capitals[1] < E.fretwork[0] && E.fretwork[1] < hongYeChen.height);
  for (const [l, r, b, t] of E.windows) assert.ok(l >= 0 && r <= frame.width && b < t && t < E.fretwork[0]);
  const { boxes, sign, blade } = hongYeChenLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  assert.ok(sign.left > 0 && sign.right < frame.width);
  for (const p of [frame.point(blade.u, blade.out + blade.r), frame.point(frame.width / 2, hongYeChen.eavesOverhang)]) {
    for (const s of roadSegments) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
  }
});

test('Hong Ye Chen review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of hongYeChenReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.3);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
