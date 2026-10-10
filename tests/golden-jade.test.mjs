import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { goldenJade, goldenJadeFrame, goldenJadeLayout, goldenJadeReviews } from '../src/golden-jade-layout.mjs';
import { eatFirst } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const poly = outline('454254220'), frame = goldenJadeFrame(poly);

test('Golden Jade takes No. 271, the second frontage from the Lorong 13 corner, not the stale 2017 point', () => {
  assert.deepEqual(landmarkFor('454254220').buildingIds, ['454254220']);
  assert.equal(landmarkFor('454254219'), undefined, 'the closed BN Food Palace corner stays generic');
  // The 2017 Golden Jade point falls in the corner way, one unit west of the signed No. 271.
  const n = xml.match(/<node id="4689499463"[^>]*>/)[0];
  const pin = [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])];
  assert.equal(pointInPolygon(pin, map.buildings.find(b => b.id === '454254219').coordinates), true);
  assert.equal(pointInPolygon(pin, map.buildings.find(b => b.id === '454254220').coordinates), false);
  // Seven 5.13 m frontages separate No. 271 from No. 285 (Nos. 273–283).
  const bac = goldenJadeFrame(outline('454254227'));
  assert.ok(Math.abs(Math.hypot(bac.a[0] - frame.a[0], bac.a[1] - frame.a[1]) - 7 * 5.13) < .1);
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(goldenJade[k], eatFirst[k]);
});

test('Golden Jade fittings stay within the frontage', () => {
  const { boxes, sign } = goldenJadeLayout(frame.width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  // Mounted proud of the cornice, as photographed.
  assert.ok(sign.out > .24 && sign.left > 0 && sign.right < frame.width);
});

test('Golden Jade review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of goldenJadeReviews(frame)) {
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
