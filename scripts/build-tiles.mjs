// Writes public/tiles.json, the index the viewer streams the map with (docs/loading-and-streaming-plan.md, step 4).
// It runs the real World and every builder in Node, on PlayCanvas's null graphics device, and records:
// - the tile each unit (a building, or one of the lane passes) builds into, from the middle of what it builds;
// - every review spawn and the unit that sets it, so `?review=` links open before anything is built;
// - the outlines builders add for collision beyond the map's footprints;
// - massing for each footprint: the tile it belongs to and the height of the detailed model over it;
// - the colour materials some builder draws two-sided, so culling does not depend on which tiles load first.
// Run with `npm run tiles`; dev and build run it first, and skip the work when its inputs are unchanged.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const tilesPath = path.join(root, 'public/tiles.json');
const TILE = 64;

// Just enough DOM for the builders' sign canvases. Drawing calls do nothing, and text measures 10 units a character.
function installShims() {
  if (globalThis.document?.createElement) return;
  const context = new Proxy({}, {
    get(target, key) {
      if (key in target) return target[key];
      if (key === 'measureText') return text => ({ width: String(text).length * 10 });
      if (key === 'getImageData' || key === 'createImageData') return (a, b, w, h) => { const W = typeof a === 'number' ? (w ?? a) : a.width, H = typeof a === 'number' ? (h ?? b) : a.height; return { width: W, height: H, data: new Uint8ClampedArray(Math.max(0, W * H * 4)) }; };
      if (key === 'createLinearGradient' || key === 'createRadialGradient' || key === 'createPattern') return () => ({ addColorStop() {} });
      return () => {};
    },
    set(target, key, value) { target[key] = value; return true; },
  });
  class Canvas { constructor() { this.width = 300; this.height = 150; this.style = {}; } getContext() { return context; } addEventListener() {} }
  Object.assign(globalThis, { HTMLCanvasElement: Canvas, HTMLImageElement: class {}, HTMLVideoElement: class {}, ImageBitmap: class {} });
  globalThis.window ??= globalThis; globalThis.addEventListener ??= () => {}; globalThis.removeEventListener ??= () => {};
  globalThis.document = { createElement: () => new Canvas(), addEventListener() {}, removeEventListener() {}, hidden: false };
}

let loaded;
/** The headless World, bundled from TypeScript with esbuild (Vite's own). */
export async function loadHeadless() {
  if (loaded) return loaded;
  installShims();
  const { build } = await import('esbuild');
  const outfile = path.join(root, 'node_modules/.cache/geylang/headless-world.mjs');
  await build({ entryPoints: [path.join(root, 'scripts/headless-world.ts')], bundle: true, format: 'esm', platform: 'node', outfile, external: ['playcanvas'], logLevel: 'warning' });
  loaded = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
  return loaded;
}

export function readMap() { return JSON.parse(fs.readFileSync(path.join(root, 'public/map.json'), 'utf8')); }

/** A hash of everything the index is measured from. */
export function inputsHash() {
  const hash = crypto.createHash('sha1');
  const files = ['public/map.json', 'scripts/build-tiles.mjs', 'scripts/headless-world.ts', 'node_modules/playcanvas/package.json',
    ...fs.readdirSync(path.join(root, 'src')).filter(f => /\.(ts|mjs)$/.test(f) && f !== 'main.ts').sort().map(f => `src/${f}`)];
  for (const f of files) { hash.update(f); hash.update(fs.readFileSync(path.join(root, f))); }
  return hash.digest('hex');
}

const tileOf = (x, z) => `${Math.floor(x / TILE)},${Math.floor(z / TILE)}`;

/** Measures the map and returns the index, without writing it. */
export async function buildTileIndex(raw = readMap()) {
  const { headlessBuild } = await loadHeadless();
  const { world, parts, culled, unitTile } = await headlessBuild(raw);

  // A unit's tile is the one under the middle of everything it builds.
  const bounds = new Map();
  for (const p of parts) {
    const b = bounds.get(p.unit) ?? [Infinity, Infinity, -Infinity, -Infinity];
    b[0] = Math.min(b[0], p.min[0]); b[1] = Math.min(b[1], p.min[2]); b[2] = Math.max(b[2], p.max[0]); b[3] = Math.max(b[3], p.max[2]);
    bounds.set(p.unit, b);
  }
  const units = {};
  for (const unit of world.units) { const b = bounds.get(unit); units[unit] = b ? tileOf((b[0] + b[2]) / 2, (b[1] + b[3]) / 2) : unitTile(unit); }

  const spawns = {};
  for (const [id, s] of world.reviewSpawns) spawns[id] = [s.p[0], s.p[1], s.yaw, s.pitch ?? null, world.reviewSpawns.owners.get(id) ?? ''];

  // Massing over each footprint: as high as the parts standing on it or on its walls, in the tile of the unit
  // that builds most of them. A footprint with no parts of its own keeps its unit's tile and gets no massing.
  const cell = 16, grid = new Map();
  for (const p of parts) { const x = (p.min[0] + p.max[0]) / 2, z = (p.min[2] + p.max[2]) / 2, key = `${Math.floor(x / cell)},${Math.floor(z / cell)}`; if (!grid.has(key)) grid.set(key, []); grid.get(key).push([x, z, p]); }
  const owners = [...world.units.filter(u => !['shan-yuan-tang', 'alley-exteriors'].includes(u)), ...world.addedFootprints.map(([unit]) => unit)];
  const massing = world.footprints.map((poly, i) => {
    const xs = poly.map(p => p[0]), zs = poly.map(p => p[1]), margin = .3;
    let top = 0; const count = new Map();
    for (let gx = Math.floor((Math.min(...xs) - margin) / cell); gx <= Math.floor((Math.max(...xs) + margin) / cell); gx++)
      for (let gz = Math.floor((Math.min(...zs) - margin) / cell); gz <= Math.floor((Math.max(...zs) + margin) / cell); gz++)
        for (const [x, z, p] of grid.get(`${gx},${gz}`) ?? []) {
          const on = pointInPolygon([x, z], poly) || poly.some((a, k) => nearestOnSegment([x, z], a, poly[(k + 1) % poly.length]).distance < margin);
          if (!on) continue;
          top = Math.max(top, p.max[1]); count.set(p.unit, (count.get(p.unit) ?? 0) + 1);
        }
    const unit = [...count].sort((a, b) => b[1] - a[1])[0]?.[0] ?? owners[i];
    return [units[unit], Math.round(top * 100) / 100];
  });

  return { tileSize: TILE, inputs: inputsHash(), units, spawns, footprints: world.addedFootprints, massing, culled };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const inputs = inputsHash();
  const current = fs.existsSync(tilesPath) ? JSON.parse(fs.readFileSync(tilesPath, 'utf8')) : null;
  if (current?.inputs === inputs && !process.argv.includes('--force')) console.log('tile index: up to date');
  else {
    const started = Date.now(), index = await buildTileIndex();
    fs.writeFileSync(tilesPath, JSON.stringify(index) + '\n');
    console.log(`tile index: ${Object.keys(index.units).length} units in ${new Set(Object.values(index.units)).size} tiles, ${Object.keys(index.spawns).length} review spawns (${((Date.now() - started) / 1000).toFixed(1)} s)`);
  }
}
