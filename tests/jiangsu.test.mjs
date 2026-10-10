import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { jiangsu, jiangsuFrame, jiangsuLayout, jiangsuReviews, elevation } from '../src/jiangsu-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223250201');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = jiangsuFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('JiangSu takes the addressed No. 20 Lorong 11 outline, next to Hainan Goh at No. 20B', () => {
  assert.equal(source.number, '20'); assert.equal(source.street, 'Lorong 11 Geylang');
  // The listing's point is displaced into the lane, outside every outline, and is not used.
  assert.ok(map.buildings.every(b => !pointInPolygon([103.8770385, 1.3129901], b.coordinates)));
  assert.match(jiangsu.evidence, /displaced into the lane/);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223250202').id, 'hainan-goh');
  assert.equal(landmarkFor('1223250212'), undefined, 'No. 18 stays generic');
  // u runs from the No. 20B party line, where the triangulated corner lies, to No. 18.
  for (const [corner, measured] of [[frame.a, [-33.22, -1.58]], [frame.b, [-31.28, 4.24]]]) assert.ok(Math.hypot(corner[0] - measured[0], corner[1] - measured[1]) < .35);
  assert.ok(Math.abs(frame.width - 6.10) < .02);
  assert.match(jiangsu.evidence, /Kim Chai Hin, a supermarket, is also listed at No. 20 and is not assigned/);
});

test('JiangSu elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.board.h[1] < E.rightWindow.h[0] && E.awning.wall < E.board.h[0] && E.ceiling < E.awning.wall);
  assert.ok(E.leftWindow.louvre[1] < E.moulding[0] && E.moulding[1] < E.parapet[0] && E.parapet[1] === jiangsu.height && jiangsu.roofHeight < jiangsu.height);
  assert.ok(E.grille.u[1] < E.shopfront.u[0] && E.shopfront.top < E.ceiling && E.litSign.h[1] <= E.shopfront.top);
  const { boxes, board, blade, awning } = jiangsuLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  assert.ok(board.left > 0 && board.right < frame.width);
  // The blade sign hangs on the No. 20B party line and, with the awning, stays clear of the carriageway.
  assert.ok(blade.u > 0 && blade.u < .1 && blade.out[0] > 0 && blade.h[0] > 3);
  for (const s of roadSegments) for (const p of [frame.point(blade.u, blade.out[1]), frame.point(frame.width / 2, awning.depth)]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('JiangSu review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of jiangsuReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -1);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .9);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
