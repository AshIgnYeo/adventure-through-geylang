import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { frogPorridge, frogLayout } from '../src/frog-porridge-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '453797927');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const area = points => Math.abs(points.reduce((sum, p, i) => {
  const q = points[(i + 1) % points.length]; return sum + p[0] * q[1] - p[1] * q[0];
}, 0)) / 2;

test('Lor 9 frog porridge retains the named source point and single unnumbered corner footprint', () => {
  const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
  const node = xml.match(/<node\b[^>]*id="4689524152"[^>]*>[\s\S]*?<\/node>/)?.[0];
  assert.match(node, /name" v="Geylang Lor 9 Fresh Frog Porridge"/);
  const pin = [Number(node.match(/lon="([^"]+)"/)[1]), Number(node.match(/lat="([^"]+)"/)[1])];
  assert.equal(pointInPolygon(pin, source.coordinates), true);
  assert.equal(source.number, null, 'operator street number is provenance, not a source-map edit');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['475158360', '454274485']) assert.notEqual(landmarkFor(id)?.id, frogPorridge.id);
  const original = structuredClone(poly), layout = frogLayout(poly);
  assert.deepEqual(poly, original);
  assert.ok(Math.abs(layout.faces[0].width - 20.86) < .01);
  assert.ok(Math.abs(layout.faces[1].width - 6.21) < .01);
  assert.ok(Math.abs(layout.faces[2].width - 4.93) < .01);
});

test('Lor 9 roof covers the concave source footprint without bridging its western notch', () => {
  const { roof } = frogLayout(poly);
  const triangles = roof.triangles.map(t => t.map(i => [roof.vertices[i][0], roof.vertices[i][2]]));
  assert.ok(Math.abs(triangles.reduce((s, t) => s + area(t), 0) - area(poly)) < 1e-7);
  for (const [a, b, c] of triangles) for (let u = .05; u < 1; u += .1) for (let v = .05; v < 1 - u; v += .1) {
    const p = a.map((n, i) => n * (1 - u - v) + b[i] * u + c[i] * v);
    assert.equal(pointInPolygon(p, poly), true, 'roof triangle remains inside source shell');
  }
});

test('Lor 9 seating stays in the recessed verandah and both review starts are walkable', () => {
  const { faces, settings, reviews } = frogLayout(poly);
  for (const setting of settings) for (const p of setting.outline) assert.equal(pointInPolygon(p, poly), true);
  for (const f of faces) for (const pier of f.piers) for (const p of pier.outline) assert.equal(pointInPolygon(p, poly), true);
  for (const f of faces) for (const u of [.28, f.width - .28]) assert.equal(pointInPolygon(f.point(u, -frogPorridge.verandahDepth), poly), true);
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const outline = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
