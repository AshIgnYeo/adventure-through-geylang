import { project } from './geo.mjs';

// Only centrelines are surveyed map data. Widths and exterior details are estimates.
export const templeAlley = {
  serviceId: '695010162', footwayId: '1223458240', accessId: '633797717',
  serviceWidth: 3.5, footwayWidth: 1.4,
  evidence: 'June 2024 Lorong 9 and April 2024 Lorong 11 Street View. OSM retains a service lane and a separate pedestrian continuation, not a sealed dead end. Current access rights are unverified.',
};

// Explicit source-edge selection prevents rear treatment spreading to other places.
export const alleyElevations = [
  { id: '453797939', edge: 4, height: 16.75, colour: '#d7ce9e', floors: 5, style: 'block' },
  { id: '454274485', edge: 0, height: 6.7, colour: '#e1d6ca', floors: 2, style: 'shophouse' },
  { id: '475158359', edge: 0, height: 6.7, colour: '#d7d5c5', floors: 2, style: 'plain' },
  { id: '454254204', edge: 0, height: 11.35, colour: '#ddd6b8', floors: 3, style: 'plain' },
  { id: '1223407890', edge: 1, height: 3.35, colour: '#d5d0bc', floors: 1, style: 'low' },
];

export function alleyFrame(a, b) {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dx = (b[0] - a[0]) / length, dz = (b[1] - a[1]) / length;
  return { a, b, length, dx, dz, angle: Math.atan2(-dz, dx) * 180 / Math.PI,
    point: (along, out = 0) => [a[0] + dx * along - dz * out, a[1] + dz * along + dx * out] };
}

export function alleyRoutes(map) {
  return [templeAlley.serviceId, templeAlley.footwayId].map((id, index) => {
    const source = map.paths.find(p => p.id === id);
    // Store source order unchanged in map.json; walk/render consistently west to east.
    const points = source.coordinates.map(c => project(c, map.origin)).reverse();
    return { id, width: index ? templeAlley.footwayWidth : templeAlley.serviceWidth,
      ...alleyFrame(points[0], points[1]) };
  });
}

export function alleyElevationFrame(map, elevation) {
  const poly = map.buildings.find(b => b.id === elevation.id).coordinates.slice(0, -1).map(c => project(c, map.origin));
  const centre = poly.reduce((sum, p) => sum.map((v, i) => v + p[i] / poly.length), [0, 0]);
  let a = poly[elevation.edge], b = poly[(elevation.edge + 1) % poly.length];
  const mid = a.map((v, i) => (v + b[i]) / 2), dx = b[0] - a[0], dz = b[1] - a[1];
  if (-dz * (mid[0] - centre[0]) + dx * (mid[1] - centre[1]) < 0) [a, b] = [b, a];
  return alleyFrame(a, b);
}

export function alleyReviews(map) {
  const [service, footway] = alleyRoutes(map);
  return [
    { id: 'temple-back-alley', p: service.point(4), target: service.point(30) },
    { id: 'temple-back-alley-middle', p: service.point(28), target: service.point(50) },
    { id: 'temple-back-alley-east', p: footway.point(footway.length), target: footway.point(0) },
  ].map(({id, p, target}) => ({id, p, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI}));
}

// Two illustrative bins stand by the northern rear walls, outside the walking strip.
export function alleyBins(map) {
  return [alleyElevations[0], alleyElevations[4]].map((e, i) => {
    const f = alleyElevationFrame(map, e), u = f.length * (i ? .7 : .22), out = .5;
    return { p: f.point(u, out), angle: f.angle,
      outline: [[-.32, -.3], [.32, -.3], [.32, .3], [-.32, .3]].map(([x, z]) => f.point(u + x, out + z)) };
  });
}
