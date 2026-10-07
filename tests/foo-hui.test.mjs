import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fooHui, siawLim, twinFrame, twinLayout, twinReviews } from '../src/foo-hui-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const p13 = outline('1223773764'), p15 = outline('1223773763');
const frame = twinFrame(p13, p15);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Foo Hui holds the way tagged No. 13 and Siaw Lim the way tagged No. 15, each containing its mapped point', () => {
  for (const [place, id, number, pin] of [[fooHui, '1223773764', '13', [103.8774696, 1.3131298]], [siawLim, '1223773763', '15', [103.8774648, 1.3131642]]]) {
    const b = map.buildings.find(b => b.id === id);
    assert.equal(b.number, number); assert.equal(b.street, 'Lorong 13 Geylang');
    assert.equal(landmarkFor(id), landmarkFor(place.buildingIds[0]));
    assert.equal(landmarkFor(id).id, place.id);
    assert.equal(pointInPolygon(pin, b.coordinates), true);
  }
  assert.match(siawLim.evidence, /6B Lor 13 Geylang/);
  assert.ok(Math.abs(frame.width - 12.21) < .03 && Math.abs(frame.split - 6.11) < .02);
  // The two source ways share the party line exactly.
  assert.equal(p13.filter(p => p15.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-9)).length, 2);
});

test('Twin-bay fittings stay within the two outlines and the awnings clear Lorong 13', () => {
  const { boxes, awnings, fooHuiSign, siawLimBoard } = twinLayout(frame.width, frame.split);
  const inside = (u, out) => pointInPolygon(frame.point(u, out), p13) || pointInPolygon(frame.point(u, out), p15);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.ok(inside(b.u + x * (b.w / 2 - .03), b.out + z * (b.depth / 2 - .001)), b.name);
  }
  assert.ok(fooHuiSign.right < frame.split, 'Foo Hui lettering sits on the No. 13 bay');
  assert.ok(siawLimBoard.left > frame.split, 'Siaw Lim board sits on the No. 15 bay');
  for (const aw of awnings) for (const u of [aw.left, aw.right]) {
    const p = frame.point(u, aw.front);
    for (const s of roadSegments) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
  }
});

test('Twin-bay review starts face the building and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of twinReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
