import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { amrise, amriseLayout, amriseObliqueReview } from '../src/amrise-layout.mjs';
import { landmarkFor, landmarkReviewPoint } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '682928750');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
// No. 112's source edge 0 runs eastwards. The façade's outward normal is north,
// so the rendered frame starts at its eastern end and runs westwards.
const a = poly[1], b = poly[0], width = Math.hypot(b[0] - a[0], b[1] - a[1]);
const dx = (b[0] - a[0]) / width, dz = (b[1] - a[1]) / width;
const pt = (u, out) => [a[0] + dx * u - dz * out, a[1] + dz * u + dx * out];

test('Amrise assigns only the addressed three-storey No. 112 containing its named source node', () => {
  const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
  const node = xml.match(/<node\b[^>]*id="4302905890"[^>]*>[\s\S]*?<\/node>/)?.[0];
  assert.match(node, /name" v="Amrise Hotel"/);
  assert.match(node, /addr:housenumber" v="112"/);
  const pin = [Number(node.match(/lon="([^"]+)"/)[1]), Number(node.match(/lat="([^"]+)"/)[1])];
  assert.equal(pointInPolygon(pin, source.coordinates), true);
  assert.equal(source.levels, 3);
  assert.equal(source.number, '112');
  assert.equal(source.street, 'Sims Avenue');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  assert.ok(Math.abs(width - 8.24) < .02);
  for (const id of ['682928749', '682928751']) assert.notEqual(landmarkFor(id)?.id, amrise.id);
});

test('Amrise frontage fittings stay within the single bay and ground fittings stay behind its source edge', () => {
  const { boxes, blade } = amriseLayout(width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= width + 1e-8, box.name);
    assert.ok(box.w > 0 && box.h > 0 && box.depth > 0);
    if (box.y - box.h / 2 < 2.5) {
      for (const x of [-1, 1]) for (const z of [-1, 1]) {
        assert.equal(pointInPolygon(pt(box.u + x * box.w / 2, box.out + z * box.depth / 2), poly), true, box.name);
      }
    }
  }
  assert.ok(blade.y - blade.height / 2 > 5, 'blade sign clears pedestrians');
  assert.ok(blade.u - blade.thickness / 2 > 0 && blade.u + blade.thickness / 2 < width);
  // Projecting hoods and sign stay well clear of the estimated carriageway.
  for (const r of map.roads) for (let i = 1; i < r.coordinates.length; i++) {
    const roadA = project(r.coordinates[i - 1], map.origin), roadB = project(r.coordinates[i], map.origin);
    for (const p of [pt(blade.u, blade.out + blade.depth / 2), ...boxes.map(box => pt(box.u, box.out + box.depth / 2))]) {
      assert.ok(nearestOnSegment(p, roadA, roadB).distance > (r.name.startsWith('Lorong') ? 6.5 : r.lanes * 3.2) / 2);
    }
  }
});

test('Amrise review starts face its Sims Avenue elevation from walkable points', () => {
  const segments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ name: r.name, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
  const front = landmarkReviewPoint(amrise, pt(width / 2, 0), segments);
  const oblique = amriseObliqueReview({ a, dx, dz, nx: -dz, nz: dx, width }).p;
  assert.ok(segments.filter(s => s.name === 'Sims Avenue').some(s => nearestOnSegment(front, s.a, s.b).distance < 1e-8));
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const p of [front, oblique]) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const building of map.buildings) {
      const outline = building.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
