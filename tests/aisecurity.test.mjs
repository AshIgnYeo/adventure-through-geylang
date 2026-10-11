import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { aiSecurity, aiSecurityFrame, aiSecurityLayout, aiSecurityReviews, elevation } from '../src/aisecurity-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223250214');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = aiSecurityFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));

test('No. 2 Lorong 11 takes the addressed outline south of S.M. Khek Leow', () => {
  assert.equal(source.number, '2'); assert.equal(source.street, 'Lorong 11 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223250215').id, 'sm-khek-leow');
  // u runs from the No. 4 party line (north) to the south side, facing the lane.
  assert.ok(outline('1223250215').some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < 1e-9));
  assert.ok(Math.abs(frame.width - 5.26) < .01);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 11 Geylang');
  assert.match(aiSecurity.evidence, /operator name itself is not displayed/);
});

test('No. 2 Lorong 11 elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation;
  assert.ok(M.ceiling <= M.canopy.h[0] && M.canopy.h[1] <= M.fascia[0] && M.fascia[1] <= M.floorBand[0] && M.floorBand[1] <= M.doorSill);
  assert.ok(M.tilePanels[0] >= M.doorSill && M.tilePanels[1] <= M.shutters[0] && M.shutters[1] <= M.fanlight[0] && M.fanlight[1] < M.archTop);
  assert.ok(M.archTop < M.capitals[1] && M.capitals[1] <= M.cornice[0] && M.cornice[1] <= M.frieze[0] && M.frieze[1] < aiSecurity.ridgeHeight);
  assert.ok(M.board.h[1] <= M.canopy.h[0] && M.board.h[0] > M.glassDoor.h[1]);
  // Pilasters, windows, columns and the door tile the frontage in order.
  const order = [M.pilasters[0], M.windows[0], M.columns[0], M.door, M.columns[1], M.windows[1], M.pilasters[1]];
  for (let i = 1; i < order.length; i++) assert.ok(order[i - 1][1] <= order[i][0] + 1e-9);
  assert.ok(Math.abs(M.pilasters[1][1] - frame.width) < .01);
  const { boxes } = aiSecurityLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -.06 && b.u + b.w / 2 <= frame.width + .06, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  for (const s of roadSegments) for (const p of [frame.point(.1, aiSecurity.eavesOverhang), frame.point(M.signBox.u[1], M.signBox.out + .11)]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('No. 2 Lorong 11 review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of aiSecurityReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = aiSecurityReviews(frame), centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
});
