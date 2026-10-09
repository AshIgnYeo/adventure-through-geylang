import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { lannaThai, lannaThaiFrame, lannaThaiLayout, lannaThaiReviews, elevation } from '../src/lanna-thai-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223250206');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = lannaThaiFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Lanna Thai takes the addressed No. 34 Lorong 11 outline, whose front matches the triangulated façade', () => {
  assert.equal(source.number, '34'); assert.equal(source.street, 'Lorong 11 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223250207'), undefined, 'No. 32 stays generic');
  // Corners triangulated from three April 2024 panoramas: the No. 36 (north) and No. 32 (south) party lines.
  for (const [corner, measured] of [[frame.a, [-49.05, -52.98]], [frame.b, [-46.61, -44.09]]]) assert.ok(Math.hypot(corner[0] - measured[0], corner[1] - measured[1]) < .5);
  assert.ok(Math.abs(frame.width - elevation.measuredWidth) < .2);
  // The listing's point is displaced into No. 36 and is not used; the board's own number is.
  assert.equal(pointInPolygon([103.8768262, 1.3136069], source.coordinates), false);
  assert.match(lannaThai.evidence, /ending in the number 34/);
  assert.match(lannaThai.evidence, /without a claim about current use/);
  assert.match(lannaThai.evidence, /first glyph is uncertain/);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 11 Geylang');
});

test('Lanna Thai elevation is ordered and its fittings stay in the frontage', () => {
  const E = elevation;
  assert.ok(E.ledge[1] < E.largeSill[0] && E.largeWindow[1] <= E.vents[1] && E.smallWindows[1] < E.vents[0]);
  assert.ok(E.vents[1] < E.cornice[0] && E.cornice[1] < E.name[0] && E.name[1] < E.year[0] && E.year[1] < E.parapet[0] && E.parapet[1] === lannaThai.height);
  assert.ok(E.board[1] < E.ceiling && E.ledge[0] < E.board[1], 'the board rises behind the downstand beam to just under the ceiling');
  assert.ok(E.frontBlockDepth < E.roofDepth);
  const { boxes, name, board } = lannaThaiLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  // The name's measured character centres run north to south inside its span, and the board sits on the back wall.
  assert.ok(name.centres.every((c, i) => c > name.left && c < name.right && (i === 0 || c > name.centres[i - 1])));
  assert.ok(board.out < -lannaThai.fiveFootWay + .1 && board.left > 0 && board.right < frame.width);
  // Ledges and floodlights stay clear of the estimated carriageway.
  for (const s of roadSegments) assert.ok(nearestOnSegment(frame.point(frame.width / 2, .3), s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Lanna Thai review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of lannaThaiReviews(frame)) {
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
