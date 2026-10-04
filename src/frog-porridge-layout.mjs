// June 2026 exterior study. Source edges are retained; vertical dimensions are estimates.
export const frogPorridge = {
  id: 'lor-9-frog-porridge', buildingIds: ['453797927'], kind: 'frog-porridge',
  name: 'Geylang Lor 9 Fresh Frog Porridge (June 2026 exterior)', address: '235 Geylang Road',
  height: 7.7, ridgeHeight: 8.6, verandahDepth: 1.5,
  evidence: 'Operator address, named OSM node 4689524152 inside way 453797927, and June 2026 contributor photographs support this corner exterior. One source building shell is assigned without asserting whole-building tenancy. Two storeys, dark pilasters, red fascia, open lower bays and public seating are observed; heights, roof profile and furniture layout are estimated. Postcodes disagree between operator and Maps. The estimated Lorong 9 carriageway overlaps the source shell, so new ground-level fittings stay inside its boundary. No private interior is reconstructed.',
  sources: [
    'https://geylanglor9.com/',
    'https://www.openstreetmap.org/node/4689524152',
    'https://www.openstreetmap.org/way/453797927',
    'https://www.google.com/maps/search/?api=1&query=Geylang+Lor+9+Fresh+Frog+Porridge+235+Geylang+Road',
  ],
};

export function frogFrame(poly, edge) {
  let a = poly[edge], b = poly[(edge + 1) % poly.length];
  const width = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const centre = [0, 1].map(i => poly.reduce((s, p) => s + p[i], 0) / poly.length);
  let dx = (b[0] - a[0]) / width, dz = (b[1] - a[1]) / width;
  if (-dz * ((a[0] + b[0]) / 2 - centre[0]) + dx * ((a[1] + b[1]) / 2 - centre[1]) < 0) {
    [a, b] = [b, a]; dx = -dx; dz = -dz;
  }
  return { width, angle: Math.atan2(-dz, dx) * 180 / Math.PI,
    point: (u, out = 0) => [a[0] + dx * u - dz * out, a[1] + dz * u + dx * out] };
}

export function frogLayout(poly) {
  const faces = [1, 2, 3].map(edge => {
    const frame = frogFrame(poly, edge), bays = edge === 1 ? 4 : 1;
    const piers = Array.from({ length: bays + 1 }, (_, bay) => {
      const u = Math.max(.4, Math.min(frame.width - .4, bay * frame.width / bays));
      const corner = (edge === 1 && bay === 0) || edge === 2 || (edge === 3 && bay === bays);
      const half = corner ? .4 : .24;
      return { u, corner, outline: [[-half, -.46], [half, -.46], [half, -.005], [-half, -.005]].map(([x, d]) => frame.point(u + x, d)) };
    });
    return { edge, bays, piers, ...frame };
  });
  // Both ridge ends sit inside the original concave outline. The notched west
  // edge is triangulated explicitly rather than bridged by a rectangular roof.
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const rear = mix(poly[0], poly[1], .5), front = mix(poly[2], poly[5], .5);
  const roof = {
    vertices: [...poly.map(p => [p[0], frogPorridge.height, p[1]]),
      ...[mix(rear, front, .22), mix(rear, front, .82)].map(p => [p[0], frogPorridge.ridgeHeight, p[1]])],
    triangles: [[0, 1, 7], [1, 2, 8], [1, 8, 7], [2, 3, 8], [3, 4, 8], [4, 5, 8], [5, 6, 8], [6, 7, 8], [6, 0, 7]],
  };
  const settings = faces.flatMap(f => (f.edge === 1 ? [.125, .375, .625, .875] : [.5]).map(t => ({
    edge: f.edge, u: f.width * t, out: -.72,
    // Conservative bounds include the two stools and all table legs.
    outline: [[-.83, -.34], [.83, -.34], [.83, .34], [-.83, .34]].map(([u, d]) => f.point(f.width * t + u, -.72 + d)),
  })));
  const corner = poly[3], p = [corner[0] + 8.5, corner[1] + 7];
  const target = faces[1].point(faces[1].width / 2);
  const side = faces[0], sidePoint = side.point(side.width * .87, 2.6), sideTarget = side.point(side.width * .25, -.2);
  const reviews = [
    { id: frogPorridge.id, p, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI },
    { id: 'lor-9-frog-porridge-side', p: sidePoint,
      yaw: Math.atan2(sidePoint[0] - sideTarget[0], sidePoint[1] - sideTarget[1]) * 180 / Math.PI },
  ];
  return { faces, roof, settings, reviews };
}
