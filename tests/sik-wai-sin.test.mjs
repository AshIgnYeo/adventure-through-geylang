import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { sikWaiSin, sikWaiSinFrame, sikWaiSinLayout, sikWaiSinReviews } from '../src/sik-wai-sin-layout.mjs';
import { eatFirst, eatFirstFrame } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const source = map.buildings.find(b => b.id === '454254229');
const poly = outline(source.id);
const frame = sikWaiSinFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Sik Wai Sin is assigned only the unnumbered No. 289 outline east of Eat First', () => {
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(source.number, null);
  assert.equal(landmarkFor('454254230'), undefined, 'No. 291 stays generic');
  // u = 0 is the corner shared with Eat First's east end.
  const ef = eatFirstFrame(outline('454254228'));
  assert.ok(Math.hypot(frame.a[0] - ef.b[0], frame.a[1] - ef.b[1]) < 1e-9);
  const way = xml.match(/<way id="454254229"[^>]*>[\s\S]*?<\/way>/)[0];
  const nodes = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => { const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0]; return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])]; });
  assert.deepEqual(source.coordinates, nodes);
  assert.ok(Math.abs(frame.width - 5.13) < .02);
  assert.match(sikWaiSin.name, /June 2024 exterior/);
  assert.match(sikWaiSin.evidence, /current use of No\. 289 after June 2024 is unresolved/);
  // Shares the measured elevation, so eaves and ridge line up with No. 287.
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(sikWaiSin[k], eatFirst[k]);
});

test('Sik Wai Sin fittings stay within the frontage and clear the carriageway', () => {
  const { boxes, sign, board, downpipeOffset } = sikWaiSinLayout(frame.width);
  assert.equal(downpipeOffset, null, 'the shared downpipe belongs to No. 287');
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  assert.ok(sign.left > 0 && sign.right < frame.width && board.out < 0);
  const protrusions = boxes.filter(b => b.out + b.depth / 2 > 0).flatMap(b => [-1, 1].map(s => frame.point(b.u + s * b.w / 2, b.out + b.depth / 2)));
  for (const s of roadSegments) for (const p of protrusions) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Sik Wai Sin review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of sikWaiSinReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.5);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
