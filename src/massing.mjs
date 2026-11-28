// Plain massing: each footprint extruded to the height of its detailed model, so tiles that are not built in
// detail still hold the skyline. One mesh per tile, flat-shaded walls and a flat roof.

const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
const signedArea = poly => poly.reduce((s, p, i) => { const q = poly[(i + 1) % poly.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;

/** Ear clipping, so concave outlines keep their shape. Returns vertex indices, three per triangle. */
export function triangulate(poly) {
  const n = poly.length; if (n < 3) return [];
  const ring = [...Array(n).keys()]; if (signedArea(poly) < 0) ring.reverse();
  const out = [];
  while (ring.length > 3) {
    let cut = false;
    for (let i = 0; i < ring.length; i++) {
      const a = ring[(i + ring.length - 1) % ring.length], b = ring[i], c = ring[(i + 1) % ring.length];
      if (cross(poly[a], poly[b], poly[c]) <= 1e-9) continue;
      const blocked = ring.some(j => j !== a && j !== b && j !== c &&
        cross(poly[a], poly[b], poly[j]) >= 0 && cross(poly[b], poly[c], poly[j]) >= 0 && cross(poly[c], poly[a], poly[j]) >= 0);
      if (blocked) continue;
      out.push(a, b, c); ring.splice(i, 1); cut = true; break;
    }
    // A self-touching outline can leave no clean ear; fan the rest rather than drop it.
    if (!cut) { for (let k = 1; k < ring.length - 1; k++) out.push(ring[0], ring[k], ring[k + 1]); return out; }
  }
  out.push(...ring);
  return out;
}

/** Walls and roof for footprints `polys` ([x, z] points) at `heights`, as flat arrays for one mesh. */
export function massingGeometry(polys, heights) {
  const positions = [], normals = [], indices = [];
  polys.forEach((poly, k) => {
    const h = heights[k], outward = signedArea(poly) > 0 ? 1 : -1;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], len = Math.hypot(b[0] - a[0], b[1] - a[1]); if (len < 1e-6) continue;
      const nx = (b[1] - a[1]) / len * outward, nz = -(b[0] - a[0]) / len * outward, base = positions.length / 3;
      positions.push(a[0], 0, a[1], b[0], 0, b[1], b[0], h, b[1], a[0], h, a[1]);
      for (let v = 0; v < 4; v++) normals.push(nx, 0, nz);
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
    const base = positions.length / 3;
    for (const p of poly) { positions.push(p[0], h, p[1]); normals.push(0, 1, 0); }
    for (const i of triangulate(poly)) indices.push(base + i);
  });
  return { positions, normals, indices };
}
