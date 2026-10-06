import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { thyeSeng, thyeSengLayout, thyeSengRoofTriangles, thyeSengReviews } from '../src/thye-seng-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '682928762');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const a = poly[5], b = poly[4], width = Math.hypot(b[0] - a[0], b[1] - a[1]);
const dx = (b[0] - a[0]) / width, dz = (b[1] - a[1]) / width;
const f = { a, dx, dz, nx: -dz, nz: dx, width };
const pt = (u, out) => [a[0] + dx * u - dz * out, a[1] + dz * u + dx * out];
const area = points => Math.abs(points.reduce((sum, p, i) => {
  const q = points[(i + 1) % points.length]; return sum + p[0] * q[1] - q[0] * p[1];
}, 0)) / 2;

test('Thye Seng retains the single addressed No. 122 outline, named pin and concave roof', () => {
  const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
  const node = xml.match(/<node\b[^>]*id="6396561545"[^>]*>[\s\S]*?<\/node>/)[0];
  assert.match(node, /name" v="Thye Seng Hardware/);
  const pin = [Number(node.match(/lon="([^"]+)"/)[1]), Number(node.match(/lat="([^"]+)"/)[1])];
  assert.equal(pointInPolygon(pin, source.coordinates), true);
  assert.equal(source.number, '122'); assert.equal(source.levels, 3);
  assert.equal(source.street, 'Sims Avenue');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.equal(thyeSeng.frontEdge, 4); assert.ok(Math.abs(width - 6.70) < .02);
  for (const id of ['682928761', '682928763']) assert.notEqual(landmarkFor(id)?.id, thyeSeng.id);
  const way = xml.match(/<way\b[^>]*id="682928762"[^>]*>[\s\S]*?<\/way>/)[0];
  const original = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => {
    const n = xml.match(new RegExp('<node\\b[^>]*id="' + id + '"[^>]*>'))[0];
    return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])];
  });
  assert.deepEqual(source.coordinates, original);
  let covered = 0;
  for (const ids of thyeSengRoofTriangles) {
    const tri = ids.map(i => poly[i]); covered += area(tri);
    // Interior samples expose any triangle crossing the source rear notch.
    for (let i = 1; i < 10; i++) for (let j = 1; j < 10 - i; j++) {
      const p = [0, 1].map(axis => tri[0][axis] * i / 10 + tri[1][axis] * j / 10 + tri[2][axis] * (10 - i - j) / 10);
      assert.equal(pointInPolygon(p, poly), true);
    }
  }
  assert.ok(Math.abs(covered - area(poly)) < 1e-6);
});

test('Thye Seng fittings stay in one frontage and clear the Sims Avenue carriageway', () => {
  const { boxes, awning } = thyeSengLayout(width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= width + 1e-8, box.name);
    assert.ok(box.w > 0 && box.h > 0 && box.depth > 0);
    if (box.y - box.h / 2 < 2.5) {
      for (const x of [-1, 1]) for (const z of [-1, 1]) {
        assert.equal(pointInPolygon(pt(box.u + x * box.w / 2, box.out + z * box.depth / 2), poly), true, box.name);
      }
    }
  }
  assert.ok(awning.bottom > 3 && awning.left > 0 && awning.right < width);
  const protrusions = [...boxes.flatMap(box => [-1, 1].map(side => pt(box.u + side * box.w / 2, box.out + box.depth / 2))), pt(awning.left, awning.front), pt(awning.right, awning.front)];
  for (const r of map.roads) for (let i = 1; i < r.coordinates.length; i++) {
    for (const p of protrusions) assert.ok(nearestOnSegment(p, project(r.coordinates[i - 1], map.origin), project(r.coordinates[i], map.origin)).distance > roadWidth(r) / 2);
  }
});

test('Thye Seng review starts face the frontage and stay inside walkable study margins', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  const target = pt(width / 2, 0);
  for (const { p, yaw } of thyeSengReviews(f)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    assert.ok(Math.abs(yaw - Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI) < 1e-8);
    for (const building of map.buildings) {
      const outline = building.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
