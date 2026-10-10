// Pitched shophouse roofs over one untouched source frontage. The ridge runs
// parallel to the street; the rear slope falls to the rear wall at eaves height.

// u runs along the frontage, out runs from the wall towards the road.
export function frontageFrame(poly, edge) {
  let i = edge, j = (edge + 1) % poly.length;
  let a = poly[i], b = poly[j];
  const width = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const centre = [0, 1].map(k => poly.reduce((s, p) => s + p[k], 0) / poly.length);
  let dx = (b[0] - a[0]) / width, dz = (b[1] - a[1]) / width;
  if (-dz * ((a[0] + b[0]) / 2 - centre[0]) + dx * ((a[1] + b[1]) / 2 - centre[1]) < 0) {
    [a, b, i, j] = [b, a, j, i]; dx = -dx; dz = -dz;
  }
  // The rear corners are the other neighbour of each front corner.
  const n = poly.length, other = (k, skip) => [(k + 1) % n, (k + n - 1) % n].find(m => m !== skip);
  const rearA = poly[other(i, j)], rearB = poly[other(j, i)];
  const nx = -dz, nz = dx;
  return { a, b, rearA, rearB, width, dx, dz, nx, nz, angle: Math.atan2(nx, nz) * 180 / Math.PI,
    point: (u, out = 0) => [a[0] + dx * u + nx * out, a[1] + dz * u + nz * out] };
}

const mix = (p, q, t) => p.map((v, i) => v + (q[i] - v) * t);

// spec: wall height, ridge height, ridge depth as a fraction of each party
// wall, and the front eaves overhang. Vertices are [x, y, z] in metres.
export function gableRoof(frame, { height, ridgeHeight, ridgeDepth, eavesOverhang: o }) {
  const ridgeA = mix(frame.a, frame.rearA, ridgeDepth), ridgeB = mix(frame.b, frame.rearB, ridgeDepth);
  const run = Math.hypot(ridgeA[0] - frame.a[0], ridgeA[1] - frame.a[1]);
  const wall = height + .08, slope = (ridgeHeight - wall) / run;
  const at = (p, y) => [p[0], y, p[1]], out = p => [p[0] + frame.nx * o, p[1] + frame.nz * o];
  // Front eaves overhang the street wall; the rear stays on the source outline.
  const v = [
    at(out(frame.a), wall - slope * o), at(out(frame.b), wall - slope * o),
    at(ridgeA, ridgeHeight), at(ridgeB, ridgeHeight), at(frame.rearA, wall), at(frame.rearB, wall),
  ];
  const slopes = [[0, 1, 3], [0, 3, 2], [2, 3, 5], [2, 5, 4]].map(t => orientUp(t, v));
  const gables = [[frame.a, frame.rearA, ridgeA], [frame.b, frame.rearB, ridgeB]].map(([p, q, r]) => [at(p, wall), at(q, wall), at(r, ridgeHeight)]);
  return { vertices: v, slopes, gables, ridge: [ridgeA, ridgeB], run, slope, pitch: Math.atan(slope) * 180 / Math.PI };
}

function orientUp(tri, v) {
  const [a, b, c] = tri.map(i => v[i]);
  const ux = b[0] - a[0], uz = b[2] - a[2], wx = c[0] - a[0], wz = c[2] - a[2];
  return uz * wx - ux * wz > 0 ? tri : [tri[0], tri[2], tri[1]];
}
