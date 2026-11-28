// Uniform grids over bounding boxes, so collision and road lookups test only nearby items as the map grows.
// Both give exactly the answers of a full scan: the same footprints block, and the same road segment is nearest,
// the first in order among equal distances.
import { nearestOnSegment, pointInPolygon } from './geo.mjs';

class BoxGrid {
  constructor(cell) { this.cell = cell; this.cells = new Map(); }
  key(i, j) { return `${i},${j}`; }
  insert(item, minX, minZ, maxX, maxZ) {
    const c = this.cell;
    for (let i = Math.floor(minX / c); i <= Math.floor(maxX / c); i++)
      for (let j = Math.floor(minZ / c); j <= Math.floor(maxZ / c); j++) {
        const k = this.key(i, j), list = this.cells.get(k);
        if (list) list.push(item); else this.cells.set(k, [item]);
      }
  }
  at(i, j) { return this.cells.get(this.key(i, j)); }
}

/** Footprints a walker must keep `clearance` metres from. Footprints may be added at any time. */
export class FootprintGrid {
  constructor(clearance, cell = 16) { this.clearance = clearance; this.grid = new BoxGrid(cell); this.count = 0; }
  add(poly) {
    let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity;
    for (const [x, z] of poly) { minX = Math.min(minX, x); minZ = Math.min(minZ, z); maxX = Math.max(maxX, x); maxZ = Math.max(maxZ, z); }
    // The margin covers the clearance, so every footprint that could block a point is filed in that point's cell.
    const m = this.clearance + .01;
    this.grid.insert(poly, minX - m, minZ - m, maxX + m, maxZ + m); this.count++;
  }
  blocked(p) {
    const list = this.grid.at(Math.floor(p[0] / this.grid.cell), Math.floor(p[1] / this.grid.cell));
    if (!list) return false;
    for (const poly of list) {
      if (pointInPolygon(p, poly)) return true;
      for (let i = 0; i < poly.length; i++) if (nearestOnSegment(p, poly[i], poly[(i + 1) % poly.length]).distance < this.clearance) return true;
    }
    return false;
  }
}

/** Road segments ({a, b}) searched in growing rings of cells around the query point. */
export class SegmentGrid {
  constructor(segments, cell = 32) {
    this.segments = segments; this.grid = new BoxGrid(cell);
    let lo = [Infinity, Infinity], hi = [-Infinity, -Infinity];
    segments.forEach((s, index) => {
      const minX = Math.min(s.a[0], s.b[0]), minZ = Math.min(s.a[1], s.b[1]), maxX = Math.max(s.a[0], s.b[0]), maxZ = Math.max(s.a[1], s.b[1]);
      this.grid.insert(index, minX, minZ, maxX, maxZ);
      lo = [Math.min(lo[0], minX), Math.min(lo[1], minZ)]; hi = [Math.max(hi[0], maxX), Math.max(hi[1], maxZ)];
    });
    this.lo = lo.map(v => Math.floor(v / cell)); this.hi = hi.map(v => Math.floor(v / cell));
  }
  nearest(p) {
    const c = this.grid.cell, ci = Math.floor(p[0] / c), cj = Math.floor(p[1] / c);
    // Rings past this one hold no segments, so the search can stop there.
    const last = Math.max(Math.abs(ci - this.lo[0]), Math.abs(ci - this.hi[0]), Math.abs(cj - this.lo[1]), Math.abs(cj - this.hi[1]));
    const seen = new Set();
    let best = { distance: Infinity, index: -1, point: [0, 0] };
    for (let r = 0; r <= last; r++) {
      for (let i = ci - r; i <= ci + r; i++) for (let j = cj - r; j <= cj + r; j++) {
        if (Math.max(Math.abs(i - ci), Math.abs(j - cj)) !== r) continue;
        for (const index of this.grid.at(i, j) ?? []) {
          if (seen.has(index)) continue; seen.add(index);
          const s = this.segments[index], n = nearestOnSegment(p, s.a, s.b);
          if (n.distance < best.distance || (n.distance === best.distance && index < best.index)) best = { distance: n.distance, index, point: n.point };
        }
      }
      // Anything outside rings 0..r lies at least r cells from p, so a closer or equally close later segment is impossible.
      if (best.distance < r * c) break;
    }
    return best;
  }
}
