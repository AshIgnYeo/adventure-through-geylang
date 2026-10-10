import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fsl, fslFrame, fslLayout, fslReviews, elevation } from '../src/fsl-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '682928760');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = fslFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const touches = (p, o) => o.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-9);

test('FSL EW LED Lighting takes the addressed No. 118 Sims Avenue outline between Nos. 116 and 120', () => {
  assert.equal(source.number, '118'); assert.equal(source.street, 'Sims Avenue'); assert.equal(source.levels, 3);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['682928759', '682928761']) assert.equal(landmarkFor(id), undefined, `${id} stays generic`);
  // u runs from the No. 120 party line (east) to No. 116, facing Sims Avenue.
  assert.ok(touches(frame.a, outline('682928761')) && touches(frame.b, outline('682928759')));
  assert.ok(Math.abs(frame.width - 6.77) < .01);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Sims Avenue');
  assert.match(fsl.evidence, /are not assigned/);
});

test('FSL elevation is ordered and its fittings stay in the frontage', () => {
  const M = elevation, [f0, f1] = M.frontage;
  assert.ok(f0 >= 0 && f1 <= frame.width && f1 - f0 > 6);
  for (const { u: [l, r], h: [b, t] } of [...M.windows, ...M.vents]) assert.ok(l >= f0 && r <= f1 && b < t);
  const [lower, upper] = [M.windows.filter(w => w.h[1] < M.cornice[0]), M.windows.filter(w => w.h[0] > M.cornice[1])];
  assert.equal(lower.length, 2); assert.equal(upper.length, 2);
  assert.ok(M.ceiling <= M.beam[0] && M.beam[1] <= M.slab[0] && M.slab[1] < lower[0].h[0]);
  assert.ok(upper[0].h[1] < M.vents[2].h[0] && M.vents[2].h[1] < M.parapetBand[0] && M.parapetBand[1] <= fsl.height);
  assert.ok(M.lettering.h[1] <= M.sign.h[0] && M.sign.h[1] <= M.ceiling && M.grille.h[1] <= M.ceiling);
  // The blade sign hangs clear of both projecting ledges.
  assert.ok(M.blade.h[0] > M.slab[1] && M.blade.h[1] < M.cornice[0]);
  const { boxes, disc, blade } = fslLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
  // The disc and blade signs stay clear of the estimated carriageway.
  for (const s of roadSegments) for (const p of [frame.point(disc.u, disc.out + disc.diameter / 2), frame.point(blade.u, blade.out[1])]) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('FSL review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of fslReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = fslReviews(frame), centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
});
