import { project } from './geo.mjs';

// Exterior estimates from April/June 2024 Street View, never cadastral data.
export const leongKeeExterior = {
  cornerId: '454254214', rearContextId: '454254215',
  eaves: 7.05, ridge: 8.10, rearTop: 12.5,
  recess: 1.8, pavementOuter: -.35, canopyOutset: 1.4, tableOffset: -.85,
  // These are illustrative public dining positions, not a seating survey.
  tables: [.17, .40, .66, .86],
  reviews: [
    { id: 'leong-kee-corner', position: [-7, 14], target: [5.3, -2.5] },
    { id: 'leong-kee-side', position: [-4.6, -5.9], target: [0, -5.9] },
    { id: 'leong-kee-side-rear', position: [-4.5, -17.5], target: [0, -17.5] },
  ],
};

export function leongKeeSideEdges(map) {
  const points = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
  const corner = points(leongKeeExterior.cornerId), rear = points(leongKeeExterior.rearContextId);
  return { corner: [corner[3], corner[0]], rear: [rear[0], rear[1]], join: [corner[0], rear[0]] };
}

export function sideFrame([a, b]) {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dx = (b[0] - a[0]) / length, dz = (b[1] - a[1]) / length;
  // Edges run northwards, the outward normal faces west towards the temple.
  const nx = dz, nz = -dx;
  return { length, angle: Math.atan2(nx, nz) * 180 / Math.PI,
    point: (s, out = 0) => [a[0] + dx * s + nx * out, a[1] + dz * s + nz * out] };
}

export function leongKeeRearUpper(poly) {
  const centre = poly.reduce((sum, p) => sum.map((v, i) => v + p[i] / poly.length), [0, 0]);
  // A modest estimated setback contained inside the unchanged source outline.
  return poly.map(p => p.map((v, i) => v + (centre[i] - v) * .08));
}
