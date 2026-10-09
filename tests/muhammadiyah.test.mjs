import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { muhammadiyah, muhammadiyahFrame, muhammadiyahLayout, muhammadiyahReviews, elevation } from '../src/muhammadiyah-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '454254295');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = muhammadiyahFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
const others = map.buildings.filter(b => b.id !== source.id).map(b => b.coordinates.slice(0, -1).map(c => project(c, map.origin)));

test('Muhammadiyah Islamic College takes the addressed No. 17 Lorong 13 outline, facing the lane', () => {
  assert.equal(source.number, '17'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('1223773760').id, 'hainan-lim');
  assert.equal(landmarkFor('1223773761'), undefined, 'No. 15D/E stays generic');
  assert.ok(Math.abs(frame.width - 13.86) < .02);
  const toLane = s => Math.min(...roadSegments.filter(r => r.road.name === 'Lorong 13 Geylang').map(r => nearestOnSegment(frame.point(frame.width / 2, s), r.a, r.b).distance));
  assert.ok(toLane(3) < toLane(-3), 'out points towards Lorong 13');
  assert.match(muhammadiyah.evidence, /triangulated from two same-drive panoramas/);
});

test('Muhammadiyah elevation follows the measured screen rhythm', () => {
  const E = elevation;
  for (let k = 1; k < E.bars.length; k++) assert.ok(Math.abs(E.bars[k] - E.bars[k - 1] - 1.59) < 1e-9);
  assert.ok(E.slabs.every(s => E.bars.some(b => Math.abs(b - s) < 1e-9)), 'storey slabs fall on every second bar');
  assert.ok(Math.abs(E.bars.at(-1) - E.band[0]) < 1e-9 && E.band[1] === E.parapet[0] && E.parapet[1] === muhammadiyah.height && E.coreTop > muhammadiyah.height);
  assert.ok(E.sign.h[1] < E.lowRow[0] && E.lowRow[1] < E.bars[0] && E.fascia[0] === E.sign.h[0]);
  // Columns run south to north and fill the frontage.
  const spans = [E.southColumn, E.tealLeft, E.lattice, E.windows, E.tealRight, E.northColumn];
  for (let i = 1; i < spans.length; i++) assert.ok(Math.abs(spans[i][0] - spans[i - 1][1]) < 1e-9);
  assert.ok(spans[0][0] >= 0 && Math.abs(spans.at(-1)[1] - frame.width) < .02);
  assert.ok(E.face < 0 && E.face > -2, 'the screen face stands a little behind the source front');
});

test('Muhammadiyah fittings stay in the frontage and the forecourt fence clears the lane and neighbours', () => {
  const { boxes, sign } = muhammadiyahLayout(frame.width);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -.02 && b.u + b.w / 2 <= frame.width + .02, b.name);
    for (const x of [-1, 1]) for (const z of [-1, 1]) {
      const p = frame.point(b.u + x * (b.w / 2 - .02), b.out + z * (b.depth / 2 - .01));
      for (const o of others) assert.equal(pointInPolygon(p, o), false, `${b.name} enters a neighbour`);
      for (const s of roadSegments) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2, `${b.name} reaches the carriageway`);
    }
  }
  assert.ok(sign.left > elevation.windows[0] && sign.right < elevation.windows[1]);
});

test('Muhammadiyah review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of muhammadiyahReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, elevation.face);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
