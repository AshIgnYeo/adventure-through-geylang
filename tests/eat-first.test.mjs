import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { eatFirst, eatFirstFrame, eatFirstLayout, eatFirstRoof, eatFirstReviews } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '454254228');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = eatFirstFrame(poly);
const area = points => Math.abs(points.reduce((sum, p, i) => {
  const q = points[(i + 1) % points.length]; return sum + p[0] * q[1] - q[0] * p[1];
}, 0)) / 2;
const nodePoint = id => {
  const n = xml.match(new RegExp('<node\\b[^>]*id="' + id + '"[^>]*>'))[0];
  return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])];
};
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Eat First keeps the single No. 287 outline containing the Sik Wai Sin source point', () => {
  const node = xml.match(/<node\b[^>]*id="4689499460"[^>]*>[\s\S]*?<\/node>/)[0];
  assert.match(node, /name" v="Sik Wai Sin"/);
  assert.equal(pointInPolygon(nodePoint('4689499460'), source.coordinates), true);
  assert.equal(pointInPolygon(nodePoint('4689499461'), source.coordinates), false, 'the Buddhist Art Centre point stays in No. 285');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(landmarkFor('454254227').id, 'buddhist-art-centre');
  // The Sik Wai Sin frontage at No. 289 is a separate, dated identity.
  assert.equal(landmarkFor('454254229').id, 'sik-wai-sin');
  const way = xml.match(/<way\b[^>]*id="454254228"[^>]*>[\s\S]*?<\/way>/)[0];
  assert.deepEqual(source.coordinates, [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => nodePoint(id)));
  assert.equal(source.number, null, 'the published address is provenance, not a source-map edit');
  assert.ok(Math.abs(frame.width - 5.13) < .02);
  const nearest = p => roadSegments.map(s => ({ ...nearestOnSegment(p, s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest(frame.point(frame.width / 2)).name, 'Geylang Road');
  assert.ok(nearest(frame.point(frame.width / 2, 1)).distance < nearest(frame.point(frame.width / 2)).distance);
  // u = 0 is the corner shared with No. 285.
  const west = map.buildings.find(b => b.id === '454254227').coordinates.slice(0, -1).map(p => project(p, map.origin));
  assert.ok(west.some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < 1e-9));
});

test('Eat First fittings stay within the frontage and clear the Geylang Road carriageway', () => {
  const { boxes, sign, board, cartouches, downpipeOffset } = eatFirstLayout(frame.width);
  const D = eatFirst.fiveFootWay;
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    assert.ok(box.w > 0 && box.h > 0 && box.depth > 0, box.name);
    // Five-foot way fittings sit inside the source outline; test 1 mm in from the wall line.
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  assert.ok(board.out > -D && board.out < 0 && board.left > 0 && board.right < frame.width);
  assert.ok(sign.left > 0 && sign.right < frame.width && sign.bottom > 3.2);
  for (const c of cartouches) assert.ok(c.u - c.w / 2 > 0 && c.u + c.w / 2 < frame.width);
  assert.ok(downpipeOffset.u + .035 <= frame.width);
  const protrusions = [
    ...boxes.filter(b => b.out + b.depth / 2 > 0).flatMap(b => [-1, 1].map(s => frame.point(b.u + s * b.w / 2, b.out + b.depth / 2))),
    frame.point(0, eatFirst.eavesOverhang), frame.point(frame.width, eatFirst.eavesOverhang),
  ];
  for (const s of roadSegments) for (const p of protrusions) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Eat First arched windows sit between the pilasters and below the frieze', () => {
  const { windows, pilasters, arches, frieze, cartouches } = eatFirstLayout(frame.width);
  assert.equal(windows.length, 3);
  const sorted = [...pilasters].sort((a, b) => a.u - b.u);
  windows.forEach((w, i) => {
    // Red frames clear the pilaster shafts on both sides.
    assert.ok(w.u - w.w / 2 - .06 >= sorted[i].u + sorted[i].w / 2 - .02, `window ${i} left`);
    assert.ok(w.u + w.w / 2 + .06 <= sorted[i + 1].u - sorted[i + 1].w / 2 + .02, `window ${i} right`);
    assert.ok(Math.abs(cartouches[i].u - w.u) < 1e-9);
  });
  for (const a of arches) {
    const outer = Math.max(...a.bands.map(b => b[1]));
    assert.ok(a.apex + outer < frieze.bottom, 'archivolt stays below the frieze');
    assert.ok(a.apex > a.springing && a.apex - a.springing < a.span / 2, 'segmental, not semicircular');
  }
});

test('Eat First roof rises to a ridge about 8 m back on both party walls', () => {
  const roof = eatFirstRoof(frame), o = eatFirst.eavesOverhang;
  const flat = roof.slopes.map(t => t.map(i => [roof.vertices[i][0], roof.vertices[i][2]]));
  assert.ok(Math.abs(flat.reduce((s, t) => s + area(t), 0) - area(poly) - frame.width * o) < .01);
  for (const [p, wall] of [[roof.ridge[0], [frame.a, frame.rearA]], [roof.ridge[1], [frame.b, frame.rearB]]]) {
    const n = nearestOnSegment(p, ...wall);
    assert.ok(n.distance < 1e-9);
    assert.ok(Math.abs(n.t * Math.hypot(wall[1][0] - wall[0][0], wall[1][1] - wall[0][1]) - 8) < .2, 'triangulated ridge depth');
  }
  assert.ok(roof.pitch > 25 && roof.pitch < 32, `front pitch ${roof.pitch}`);
  // The tile edge meets the bottom of the green fascia, shared with No. 285.
  assert.ok(Math.abs(roof.vertices[0][1] - 7.61) < .02);
  for (const [a, b, c] of roof.slopes.map(t => t.map(i => roof.vertices[i]))) {
    assert.ok((b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]) > 0, 'roof normals face upwards');
  }
});

test('Eat First review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  const reviews = eatFirstReviews(frame);
  assert.deepEqual(reviews.map(r => r.id), ['eat-first', 'eat-first-oblique', 'eat-first-five-foot-way', 'eat-first-upper']);
  for (const { p, yaw, pitch } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    assert.ok(pitch > 0 && pitch < 30);
    const centre = frame.point(frame.width / 2, -.5);
    const facing = Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180);
    assert.ok(facing > .97, 'review looks towards the frontage');
    for (const building of map.buildings) {
      const outline = building.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
