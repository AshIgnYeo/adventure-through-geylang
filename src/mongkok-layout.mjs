// A visible corner within a larger OSM block, not a whole-block tenancy claim.
export const mongkok = {
  id: 'mongkok-dim-sum', name: 'Mongkok Dim Sum (October 2016 exterior)',
  address: '214 Geylang Road', sourceBuildingId: '454254202',
  geometrySource: 'source-edges-with-estimated-internal-division',
  height: 10.1, streetReturn: 8.8, rearReturn: 15.8, canopyDepth: 1.3,
  evidence: 'The named OSM point at No. 214 lies inside a larger, unnumbered block outline. The current Maps listing and Time Out address corroborate the corner location. The Red Marker SG panorama has October 2016 capture metadata (August 2017 displayed beside the contributor). Three visible exterior tiers, cream walls, red vertical lettering, green lower columns, red canopy and balcony railings guide this dated reconstruction. Height, internal division, fittings and furniture arrangement are estimates. The remainder of the block has no Mongkok identity; no private interior or legal boundary is asserted.',
  sources: [
    'https://www.openstreetmap.org/node/4345449693',
    'https://www.openstreetmap.org/way/454254202',
    'https://www.timeout.com/singapore/restaurants/mongkok-dim-sum',
    'https://www.google.com/maps/search/?api=1&query=Mongkok+Dim+Sum+214+Geylang+Road',
    'https://www.google.com/maps/@1.3120804,103.8768422,12a,90y,200h,100t/data=!3m4!1e1!3m2!1sCIHM0ogKEICAgICEzfWY1gE!2e10',
  ],
};

const towards = (a, b, metres) => {
  const t = metres / Math.hypot(b[0] - a[0], b[1] - a[1]);
  return a.map((value, i) => value + (b[i] - value) * t);
};

/** Partition render volumes only. Collision retains the complete original way. */
export function mongkokLayout(poly) {
  const a = towards(poly[3], poly[2], mongkok.streetReturn);
  const b = towards(poly[5], poly[0], mongkok.rearReturn);
  return { corner: [a, poly[3], poly[4], poly[5], b], remainder: [poly[0], poly[1], poly[2], a, b] };
}

/** Oriented left-to-right when looking at an exterior face. */
export function mongkokFrame(poly, edge) {
  let a = poly[edge], b = poly[(edge + 1) % poly.length];
  const centre = [0, 1].map(i => poly.reduce((s, p) => s + p[i], 0) / poly.length);
  const width = Math.hypot(b[0] - a[0], b[1] - a[1]);
  let dx = (b[0] - a[0]) / width, dz = (b[1] - a[1]) / width;
  if (-dz * ((a[0] + b[0]) / 2 - centre[0]) + dx * ((a[1] + b[1]) / 2 - centre[1]) < 0) {
    [a, b] = [b, a]; dx = -dx; dz = -dz;
  }
  const nx = -dz, nz = dx;
  return { width, angle: Math.atan2(nx, nz) * 180 / Math.PI,
    point: (u, out = 0) => [a[0] + dx * u + nx * out, a[1] + dz * u + nz * out] };
}
