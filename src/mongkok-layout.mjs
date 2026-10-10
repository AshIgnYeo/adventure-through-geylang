// A visible corner within a larger OSM block, not a whole-block tenancy claim.
export const mongkok = {
  id: 'mongkok-dim-sum', name: 'Mongkok Dim Sum (June 2024 exterior)',
  address: '214 Geylang Road', sourceBuildingId: '454254202',
  geometrySource: 'source-edges-with-estimated-internal-division',
  height: 11.6, streetReturn: 5.8, canopyDepth: 1.3,
  evidence: 'The named OSM point at No. 214 lies inside a larger, unnumbered block outline. The current Maps listing and Time Out address corroborate the corner location. June 2024 Street View from Geylang Road and Lorong 8 shows the corner repainted since the October 2016 contributor panorama: taupe walls, red ground-floor walls and columns, dark red awnings, a red MONGKOK DIMSUM 24 HRS board and red vertical 旺角点心 lettering on the chamfer, balconies on the Geylang Road return with a blade sign at its west end, and windows and an awning along Lorong 8. Re-checked on 10 October 2026: the parapet stands about 11.5–12.5 m above the road, against an earlier 10.1 m estimate; panorama position errors here leave heights and the internal division as estimates. The remainder of the block has no Mongkok identity; no private interior or legal boundary is asserted.',
  sources: [
    'https://www.openstreetmap.org/node/4345449693',
    'https://www.openstreetmap.org/way/454254202',
    'https://www.timeout.com/singapore/restaurants/mongkok-dim-sum',
    'https://www.google.com/maps/search/?api=1&query=Mongkok+Dim+Sum+214+Geylang+Road',
    'https://www.google.com/maps/@1.3120804,103.8768422,12a,90y,200h,100t/data=!3m4!1e1!3m2!1sCIHM0ogKEICAgICEzfWY1gE!2e10',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=kbMaxdnGfSxxcW_ZWuryZw&heading=169&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=Ek8gN_rkboAVG9ytJd-CNA&heading=230&pitch=10&fov=90',
  ],
};


// Nos. 212 and 210 share one cream three-storey building west of the corner, with a set-back penthouse.
// Measured on the square-on June 2024 frame (6WnI7...) after removing the drive's shared 2.9 m
// along-street error, which also puts the Mongkok return at 5.8 m rather than the earlier 8.8 m estimate.
// Positions are metres west along the Geylang Road edge from the chamfer corner.
const westPanos = [
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=6WnI7_UoH2IqxCRJ-XI2BA&heading=167&pitch=12&fov=95',
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=BPsxlk0ALSJFfWvTXn51NA&heading=160&pitch=12&fov=95',
];
const unitBase = {
  sourceBuildingId: '454254202', geometrySource: 'source-edges-with-estimated-internal-division', reviewRoad: 'Geylang Road',
  height: 10.5, ceiling: 3.0, fiveFootWay: 2.0, roof: { type: 'flat' },
  colours: { wall: '#e4e1d8', trim: '#f0eee8', frame: '#4a4f50', glass: '#3f4a4e', back: '#3b3632', floor: '#a8a49b', pier: '#e4e1d8' },
  bands: [[5.95, 6.1, .25], [8.9, 9.1, .25], [10.4, 10.5, .2]],
};
export const nanyangDentist = {
  ...unitBase, id: 'nanyang-dentist', name: 'Nanyang Dentist 南洋齿科 (June 2024 exterior)', address: '212 Geylang Road',
  from: 5.8, to: 12.85,
  evidence: 'Google Maps lists Nanyang Dentist 南洋齿科 at 212 Geylang Rd, Singapore 389272, and June 2024 Street View shows its white NANYANG DENTIST 南洋齿科 board over the five-foot way of the cream three-storey building directly west of Mongkok Dim Sum (No. 214), with a white grille and door plate 212. The listing point falls about 3 m inside the Mongkok corner\'s estimated division; Maps points are approximate, and the board and address order place the clinic next door. The 7.05 m frontage is measured on a square-on frame after removing a 2.9 m along-street panorama error; the rear division and depth are estimates within the unnumbered source block. The interior is not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Nanyang+Dentist+212+Geylang+Road', 'https://www.openstreetmap.org/way/454254202', ...westPanos],
  windows: [{ u: [.3, 2.65], h: [4.45, 5.5], panes: 3 }, { u: [3.0, 4.1], h: [5.0, 5.5] }, { u: [4.55, 6.2], h: [4.45, 5.5], panes: 3 },
    { u: [.3, 2.65], h: [7.4, 8.6], panes: 3 }, { u: [4.55, 6.8], h: [7.4, 8.6], panes: 3 }],
  blocks: [
    { name: 'air conditioner', u: [3.7, 4.5], h: [4.0, 4.45], out: .25, depth: .3, colour: '#d8d8d2' },
    { name: 'air conditioner', u: [4.7, 5.5], h: [4.0, 4.45], out: .25, depth: .3, colour: '#d8d8d2' },
    { name: 'air conditioner', u: [5.7, 6.5], h: [4.0, 4.45], out: .25, depth: .3, colour: '#d8d8d2' },
    { name: 'air conditioner', u: [1.7, 2.6], h: [7.0, 7.5], out: .25, depth: .3, colour: '#d8d8d2' },
  ],
  board: { u: [0, 7.0], h: [3.05, 3.77], out: .08 },
  piers: [[0, .25]],
  backFittings: [
    { name: 'clinic wall', u: [.3, 3.5], h: [.1, 2.9], colour: '#d6d3ca' },
    { name: 'clinic grille', u: [3.5, 5.2], h: [.1, 2.6], colour: '#cfd2cc' },
    { name: 'clinic door', u: [5.2, 6.2], h: [.1, 2.4], colour: '#2f3433' },
  ],
  // The penthouse spans both units, about 2.5 m behind the front (setback estimated).
  rooftop: [{ u: [5.45, 7.05], top: 12.4, setback: 2.5, depth: 6, colour: '#e0d9c8' }],
};
export const shaxianEatery = {
  ...unitBase, id: 'shaxian-eatery', name: 'Shaxian Eatery 沙县小吃 (June 2024 exterior)', address: '210 Geylang Road',
  from: 12.85, to: 19.55,
  evidence: 'Google Maps lists Shaxian Eatery 沙县小吃, a Chinese restaurant open 24 hours, at 210 Geylang Rd, Singapore 389270, and its point lies inside this unit. June 2024 Street View shows the dark red 沙县小吃 SHAXIAN SNACKS board with a red round logo and a red menu strip over the open dining front, in the western half of the cream three-storey building shared with Nanyang Dentist. The 6.7 m frontage is measured on a square-on frame after removing a 2.9 m along-street panorama error; the rear division and depth are estimates within the unnumbered source block. The logo and menu text are reduced to plain shapes, and the interior is not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Shaxian+Eatery+210+Geylang+Road', 'https://www.openstreetmap.org/way/454254202', ...westPanos],
  windows: [{ u: [.25, 2.6], h: [4.45, 5.5], panes: 3 }, { u: [2.8, 3.85], h: [4.9, 5.5] }, { u: [4.35, 6.6], h: [4.45, 5.5], panes: 3 },
    { u: [.25, 2.6], h: [7.4, 8.6], panes: 3 }, { u: [4.35, 6.6], h: [7.4, 8.6], panes: 3 }],
  blocks: [
    { name: 'air conditioner', u: [2.85, 3.75], h: [8.05, 8.45], out: .25, depth: .3, colour: '#d8d8d2' },
    { name: 'air conditioner', u: [2.9, 3.6], h: [5.8, 6.2], out: .25, depth: .3, colour: '#d8d8d2' },
    { name: 'menu strip', u: [2.35, 6.7], h: [2.37, 2.68], out: .1, depth: .04, colour: '#d32a2b' },
  ],
  board: { u: [.05, 6.7], h: [2.95, 4.32], out: .09 },
  piers: [[6.5, 6.7]],
  backFittings: [{ name: 'dining front', u: [.2, 6.5], h: [.1, 2.9], colour: '#3a2f2a', glow: .15 }],
  rooftop: [{ u: [0, 4.25], top: 12.4, setback: 2.5, depth: 6, colour: '#e0d9c8' }],
};
export const blockUnits = [nanyangDentist, shaxianEatery];

/** Partition render volumes only. Collision retains the complete original way. */
export function mongkokLayout(poly) {
  // The corner division and unit walls run square to the Geylang Road edge, from the front to the rear edge.
  const len = Math.hypot(poly[2][0] - poly[3][0], poly[2][1] - poly[3][1]);
  const f = [(poly[2][0] - poly[3][0]) / len, (poly[2][1] - poly[3][1]) / len];
  const toRear = s => {
    const p = [poly[3][0] + f[0] * s, poly[3][1] + f[1] * s], d = [-f[1], f[0]], r0 = poly[5], r = [poly[0][0] - r0[0], poly[0][1] - r0[1]];
    // Solve p + t d = r0 + k r for the line square to the front.
    const det = d[0] * -r[1] + d[1] * r[0], t = ((r0[0] - p[0]) * -r[1] + (r0[1] - p[1]) * r[0]) / det;
    return [p, [p[0] + d[0] * t, p[1] + d[1] * t]];
  };
  const [a, b] = toRear(mongkok.streetReturn), [p1, r1] = toRear(nanyangDentist.to), [p2, r2] = toRear(shaxianEatery.to);
  return {
    corner: [a, poly[3], poly[4], poly[5], b],
    units: [[p1, a, b, r1], [p2, p1, r1, r2]],
    remainder: [poly[0], poly[1], poly[2], p2, r2],
  };
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
