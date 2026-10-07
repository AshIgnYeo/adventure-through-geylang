import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chongMin, chongMinFrame, chongMinLayout, chongMinReviews } from '../src/chong-min-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '1223773762');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = chongMinFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('The 15-C frontage is the way tagged 15B, north of Nos. 13 and 15 and south of the unnumbered way', () => {
  assert.equal(source.number, '15B', 'source tag recorded, not edited');
  assert.match(chongMin.evidence, /tagged 15B, one letter behind the door plate/);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['1223773763', '1223773761', '1223773764']) assert.equal(landmarkFor(id), undefined);
  // The Yun Teck place point lies inside this way.
  assert.equal(pointInPolygon([103.8774431, 1.3132232], source.coordinates), true);
  const way = xml.match(/<way id="1223773762"[^>]*>[\s\S]*?<\/way>/)[0];
  const nodes = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => { const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0]; return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])]; });
  assert.deepEqual(source.coordinates, nodes);
  assert.ok(Math.abs(frame.width - 6.10) < .02);
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 13 Geylang');
  // u = 0 is shared with No. 15 to the south.
  const no15 = map.buildings.find(b => b.id === '1223773763').coordinates.slice(0, -1).map(p => project(p, map.origin));
  assert.ok(no15.some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < .05));
});

test('15-C fittings stay in the frontage; boards are ordered and the awning clears the carriageway', () => {
  const { boxes, boards, awning } = chongMinLayout(frame.width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  const [upper, lower] = boards;
  assert.ok(upper.bottom > lower.top && lower.bottom > awning.top && upper.top < chongMin.height);
  for (const b of boards) assert.ok(b.left > 0 && b.right < frame.width);
  for (const p of [frame.point(awning.left, awning.front), frame.point(awning.right, awning.front)]) {
    for (const s of roadSegments) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
  }
});

test('15-C review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of chongMinReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.3);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
