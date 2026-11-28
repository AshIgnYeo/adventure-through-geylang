import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { buildTileIndex, loadHeadless, readMap, tilesPath } from '../scripts/build-tiles.mjs';
import { triangulate, massingGeometry } from '../src/massing.mjs';

const committed = JSON.parse(fs.readFileSync(tilesPath, 'utf8'));
const strip = ({ inputs, ...rest }) => rest;
const signature = parts => crypto.createHash('sha1').update(JSON.stringify(parts.map(p => [p.name, p.min, p.max, p.material]))).digest('hex');
const byUnit = parts => { const m = new Map(); for (const p of parts) { if (!m.has(p.unit)) m.set(p.unit, []); m.get(p.unit).push(p); } return m; };

test('the committed tile index matches what the builders build (run npm run tiles)', async () => {
  assert.deepEqual(strip(await buildTileIndex()), strip(committed));
});

test('the index covers every unit, spawn and footprint, on 64 m tiles', () => {
  assert.equal(committed.tileSize, 64);
  for (const tile of Object.values(committed.units)) assert.match(tile, /^-?\d+,-?\d+$/);
  for (const [, , , , unit] of Object.values(committed.spawns)) assert.ok(unit in committed.units, `spawn set by unknown unit ${unit}`);
  for (const [tile, height] of committed.massing) { assert.ok(Object.values(committed.units).includes(tile)); assert.ok(height > 0); }
});

test('streaming builds every unit exactly as the full build does, in any order and after unloading', async () => {
  const { headlessBuild } = await loadHeadless();
  const raw = readMap();
  const full = await headlessBuild(raw);
  const expected = new Map([...byUnit(full.parts)].map(([unit, parts]) => [unit, signature(parts)]));
  // A snake across the map and back to the start, so tiles build nearest first from many places and unload behind.
  const xs = [-150, 100, 350, 600], zs = [-250, 0, 250, 450], sweep = [[0, 0]];
  zs.forEach((z, j) => (j % 2 ? [...xs].reverse() : xs).forEach(x => sweep.push([x, z])));
  sweep.push([0, 0]);
  const streamed = await headlessBuild(raw, { index: committed, sweep });
  // onUnit reports each build of a unit; a unit built again after unloading must match too.
  const builds = new Map();
  for (const p of streamed.parts) { const key = p.unit; if (!builds.has(key)) builds.set(key, []); builds.get(key).push(p); }
  assert.ok(streamed.builds > full.builds, 'the sweep should unload and rebuild some tiles');
  const seen = new Set(streamed.parts.map(p => p.unit));
  for (const unit of full.world.units) if (expected.has(unit)) assert.ok(seen.has(unit), `${unit} never streamed in`);
  // Repeated builds of a unit append the same parts again, so each unit's parts are whole copies of the full build's.
  for (const [unit, parts] of builds) {
    const one = expected.get(unit), n = parts.length / byUnit(full.parts).get(unit).length;
    assert.ok(Number.isInteger(n), `${unit} built a different number of parts`);
    const size = parts.length / n;
    for (let k = 0; k < n; k++) assert.equal(signature(parts.slice(k * size, (k + 1) * size)), one, `${unit} differs when streamed`);
  }
  assert.deepEqual(streamed.culled, full.culled, 'colour culling depends on build order');
  assert.deepEqual([...streamed.world.reviewSpawns.stale], [], 'a builder set a review spawn the index does not hold');
  assert.equal(streamed.world.footprints.length, full.world.footprints.length);
});

test('massing triangulates concave outlines without spilling outside them', () => {
  const l = [[0, 0], [10, 0], [10, 4], [4, 4], [4, 10], [0, 10]];
  const area = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  for (const poly of [l, [...l].reverse()]) {
    const tri = triangulate(poly); assert.equal(tri.length, (poly.length - 2) * 3);
    let sum = 0; for (let i = 0; i < tri.length; i += 3) sum += area([poly[tri[i]], poly[tri[i + 1]], poly[tri[i + 2]]]);
    assert.ok(Math.abs(sum - area(poly)) < 1e-9);
  }
  const g = massingGeometry([l], [6]);
  assert.equal(g.positions.length / 3, l.length * 4 + l.length);
  assert.ok(g.positions.every((v, i) => i % 3 !== 1 || v === 0 || v === 6));
});
