import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { misterContracts, misterContractsFrame, misterContractsLayout, misterContractsReviews, elevation } from '../src/mister-contracts-layout.mjs';
import { row13 } from '../src/row13-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const source = map.buildings.find(b => b.id === '1223773757');
const poly = outline(source.id), frame = misterContractsFrame(poly);

test('Mister Contracts takes the signed northern No. 9 house, between the other No. 9 and No. 11', () => {
  assert.equal(source.number, '9'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223773756'), undefined, 'the southern No. 9 house stays generic');
  // u runs from the southern No. 9 house to the No. 11 side.
  assert.ok(outline('1223773756').some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < 1e-9));
  assert.match(misterContracts.evidence, /signboard itself reads 5 Lorong 13 Geylang/);
  assert.match(misterContracts.evidence, /Google Maps lists Mister Contracts at No\. 7/);
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(misterContracts[k], row13[k]);
});

test('Mister Contracts elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  const order = [E.pilasters[0], E.windows[0], E.pilasters[1], E.windows[1], E.pilasters[2], E.windows[2], E.pilasters[3]].map(x => x.slice(0, 2));
  for (let i = 1; i < order.length; i++) assert.ok(order[i - 1][1] <= order[i][0] + 1e-9);
  assert.ok(E.pilasters[3][1] < frame.width);
  assert.ok(E.board[3] < row13.floor2 && E.board[2] > 3.0);
  const { boxes, board } = misterContractsLayout(frame.width);
  for (const b of boxes) {
    if (!b.roll) assert.ok(b.u - b.w / 2 >= -.04 && b.u + b.w / 2 <= frame.width + .04, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  assert.ok(board.left >= 0 && board.right <= frame.width);
});

test('Mister Contracts review start faces the house and stays walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of misterContractsReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    const centre = frame.point(frame.width / 2, 0);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
  }
});
