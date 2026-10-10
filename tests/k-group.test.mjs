import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { kGroup, kGroupFrame, kGroupLayout, kGroupReviews, elevation } from '../src/k-group-layout.mjs';
import { hongYeChen, hongYeChenFrame } from '../src/hong-ye-chen-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const source = map.buildings.find(b => b.id === '1223773754');
const poly = outline(source.id), frame = kGroupFrame(poly);

test('K Group takes the addressed No. 5 outline between Nos. 3 and 7, sharing the row elevation', () => {
  assert.equal(source.number, '5'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223773753'), undefined, 'No. 3 stays generic');
  assert.equal(pointInPolygon([103.8775786, 1.3128358], source.coordinates), false, 'the listed point falls outside and is not used');
  assert.match(kGroup.evidence, /falls in the street and is not used/);
  const no7 = hongYeChenFrame(outline('1223773755'));
  assert.ok(Math.hypot(frame.b[0] - no7.a[0], frame.b[1] - no7.a[1]) < 1e-9, 'No. 5 meets No. 7');
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(kGroup[k], hongYeChen[k]);
});

test('K Group fittings stay in the frontage', () => {
  const { boxes, board, reliefs, tilePanels } = kGroupLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  assert.equal(reliefs.length, 1); assert.equal(tilePanels.length, 2);
  assert.ok(board.left > 0 && board.right < frame.width && board.out < 0);
  for (const [l, r] of elevation.windows) assert.ok(l > 0 && r < frame.width);
});

test('K Group review starts stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p } of kGroupReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
