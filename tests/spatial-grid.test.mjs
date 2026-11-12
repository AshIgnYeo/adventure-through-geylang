import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { FootprintGrid, SegmentGrid } from '../src/spatial-grid.mjs';
import { project, nearestOnSegment, pointInPolygon } from '../src/geo.mjs';
import { withAuthoredFootprints } from '../src/authored-footprints.mjs';

const map = withAuthoredFootprints(JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8')));
// Segments and footprints as World builds them.
const segments = map.roads.flatMap(r => r.coordinates.slice(1).map((c, i) => ({ a: project(r.coordinates[i], map.origin), b: project(c, map.origin) })))
  .filter(s => Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) >= .1);
const footprints = map.buildings.map(b => {
  const poly = b.coordinates.map(p => project(p, map.origin));
  if (poly.length > 1 && Math.hypot(poly[0][0] - poly.at(-1)[0], poly[0][1] - poly.at(-1)[1]) < .1) poly.pop();
  return poly;
}).filter(p => p.length >= 3);

// A fixed pseudo-random spread of points over the map and a margin beyond it.
const points = (() => {
  const xs = segments.flatMap(s => [s.a[0], s.b[0]]), zs = segments.flatMap(s => [s.a[1], s.b[1]]);
  const [x0, x1, z0, z1] = [Math.min(...xs) - 60, Math.max(...xs) + 60, Math.min(...zs) - 60, Math.max(...zs) + 60];
  let seed = 20261112; const rand = () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  return Array.from({ length: 6000 }, () => [x0 + rand() * (x1 - x0), z0 + rand() * (z1 - z0)]);
})();

test('the footprint grid blocks exactly the points a full scan of every footprint blocks', () => {
  const grid = new FootprintGrid(.28); footprints.forEach(p => grid.add(p));
  const scan = p => footprints.some(poly => pointInPolygon(p, poly)
    || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .28));
  // Points along every footprint edge, just inside and outside the clearance, as well as the spread.
  const edges = footprints.slice(0, 120).flatMap(poly => poly.flatMap((a, i) => {
    const b = poly[(i + 1) % poly.length], mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const n = [-(b[1] - a[1]) / len, (b[0] - a[0]) / len];
    return [.1, .27, .29, .5].flatMap(d => [[mid[0] + n[0] * d, mid[1] + n[1] * d], [mid[0] - n[0] * d, mid[1] - n[1] * d]]);
  }));
  let blocked = 0;
  for (const p of [...points, ...edges]) { const expected = scan(p); assert.equal(grid.blocked(p), expected, `${p}`); blocked += +expected; }
  assert.ok(blocked > 500, 'the sample reaches the footprints');
});

test('the segment grid finds the same nearest road segment as a full scan, first in order on ties', () => {
  const grid = new SegmentGrid(segments);
  const scan = p => {
    let best = { distance: Infinity, index: -1 };
    segments.forEach((s, index) => { const d = nearestOnSegment(p, s.a, s.b).distance; if (d < best.distance) best = { distance: d, index }; });
    return best;
  };
  // Segment end points are shared by neighbouring segments, so they test the tie-break.
  const ends = segments.flatMap(s => [s.a, s.b]);
  for (const p of [...points, ...ends]) {
    const expected = scan(p), found = grid.nearest(p);
    assert.equal(found.index, expected.index, `${p}`);
    assert.equal(found.distance, expected.distance);
  }
});
