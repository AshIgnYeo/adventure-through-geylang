// June 2024 street exterior. Only the No. 285 source footprint is assigned.
export const buddhistArtCentre = {
  id: 'buddhist-art-centre', buildingIds: ['454254227'], kind: 'buddhist-art-centre',
  name: 'Buddhist Art Centre (June 2024 exterior)', address: '285 Geylang Road',
  height: 7.7, ridgeHeight: 10.2, ridgeDepth: .32, frontEdge: 0, fiveFootWay: 1.8, eavesOverhang: .45, reviewRoad: 'Geylang Road',
  evidence: 'The operator store page and web listings give 285 Geylang Road. Named OSM node 4689499461 lies inside unnumbered way 454254227, between the Sik Wai Sin node in the next footprint and No. 283. June 2024 Street View shows the signed NO:285 frontage: two storeys under a pitched tiled roof, three arched upper windows between fluted blue and yellow pilasters, a red scroll frieze, a teal bilingual signboard, two vertical signs, ochre five-foot way piers, a faded red awning and two tiered chandeliers hung in the five-foot way outside the shopfront glass. Only this footprint is assigned. Heights, roof pitch and ornament are estimated; vertical sign wording is not reproduced; no stock, religious objects or private interior are reconstructed.',
  sources: [
    'https://www.buddhistartcentre.com/store/',
    'https://www.openstreetmap.org/node/4689499461',
    'https://www.openstreetmap.org/way/454254227',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=70E8HnCOcGqPcYcFVA6kZw&heading=10&pitch=8&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=_w5yHraTw78BWJJ4wn1RSQ&heading=27&pitch=6&fov=22',
  ],
};

// u runs west to east along the frontage, out runs from the wall towards the road.
export function artCentreFrame(poly, edge = buddhistArtCentre.frontEdge) {
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

export function artCentreLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const D = buddhistArtCentre.fiveFootWay;
  const ochre = '#b98a34', soffit = '#d9bf72', gold = '#c08a2e', white = '#f3f0e6';
  const blue = '#2f58a8', green = '#3d8a56', red = '#c13b36', teal = '#2f8d86';

  // Five-foot way. Glazing is opaque; stock and religious objects are omitted.
  add('five-foot way tiles', width / 2, .17, -D / 2, width - .08, .08, D - .04, '#9a5b4b');
  add('shop backing wall', width / 2, 1.83, -D, width - .06, 3.34, .08, ochre);
  add('five-foot way soffit', width / 2, 3.50, -D / 2 + .04, width - .04, .10, D, soffit);
  for (const t of [.25, .5, .75]) add('soffit downlight', width * t, 3.44, -.8, .16, .02, .16, '#fff0c8', 1.2);
  for (const u of [.035, width - .035]) add('five-foot way return', u, 1.80, -(D + .4) / 2, .03, 3.3, D - .4, ochre);
  add('opaque shop glazing', 2.025, 1.30, -D + .06, 3.45, 2.20, .03, '#3a2e2b');
  for (const u of [.30, 1.45, 2.60, 3.75]) add('gilded shopfront mullion', u, 1.30, -D + .09, .06, 2.20, .04, gold);
  for (const y of [.20, 2.40]) add('gilded shopfront rail', 2.025, y, -D + .09, 3.51, .06, .04, gold);
  add('side door', 4.30, 1.20, -D + .06, .70, 2.10, .03, '#5a4436');
  for (const u of [3.95, 4.65]) add('side door frame', u, 1.20, -D + .09, .05, 2.10, .04, gold);
  add('side door head', 4.30, 2.25, -D + .09, .75, .05, .04, gold);
  add('red LED board', 3.97, 2.22, -D + .55, .62, .30, .05, '#4a1715');
  add('red LED glow', 3.97, 2.22, -D + .58, .56, .24, .01, '#d8332b', .9);
  add('left ochre pier', .15, 1.75, -.20, .28, 3.50, .40, '#c99a3a');
  add('right ochre pier', width - .21, 1.75, -.20, .40, 3.50, .40, '#c99a3a');
  for (const [u, w] of [[.16, .30], [width - .22, .42]]) add('pier plinth', u, .30, -.20, w, .60, .42, '#b98a33');
  for (const [i, colour] of [red, green, blue].entries()) add('pier capital band', width - .21, 3.10 + i * .08, -.20, .40, .08, .44, colour);
  add('pier bracket', width - .20, 2.92, -.02, .22, .26, .08, green);
  add('pier bracket bloom', width - .20, 2.86, .025, .10, .10, .02, red);

  // Lintel, tricolour bands and the bilingual signboard over the five-foot way.
  add('five-foot way lintel', width / 2, 3.60, .02, width, .30, .20, '#ebe6d8');
  for (const [i, colour] of [red, green, blue, '#e2ad3a'].entries()) add('painted band', width / 2, 3.79 + i * .055, .06, width, .055, .12, colour);
  add('signboard edge', 2.70, 4.48, .12, 4.24, 1.0, .14, '#2f7477');
  add('sign ledge', width / 2, 5.03, .12, width, .08, .30, '#e9dfc4');
  // Vertical sign colours follow the reference; its wording is not reproduced.
  add('vertical sign frame', .32, 5.55, .14, .34, 2.68, .10, '#d4552f');
  add('vertical sign green field', .32, 5.85, .195, .26, 1.90, .01, '#4c9a4a', .15);
  add('vertical sign red field', .32, 4.62, .195, .26, .60, .01, '#b8322c', .15);
  add('projecting sign frame', width - .22, 5.30, .45, .06, 2.72, .66, '#1f5f5a');
  add('projecting sign face', width - .22, 5.30, .45, .10, 2.56, .56, teal);
  for (const y of [4.10, 6.50]) add('projecting sign bracket', width - .22, y, .08, .04, .04, .16, '#5a5f5c');

  // Upper storey: four fluted pilasters and three arched casement windows.
  const pilasters = [.40, 1.80, 3.33, 4.73].map(t => t * width / 5.13);
  for (const u of pilasters) {
    add('pilaster base', u, 5.14, .09, .40, .16, .18, '#e2ad3a');
    add('fluted pilaster shaft', u, 5.885, .08, .32, 1.33, .14, white);
    for (const s of [-.105, -.035, .035, .105]) add('pilaster flute', u + s, 5.885, .155, .035, 1.20, .02, blue);
    add('capital necking', u, 6.575, .09, .36, .05, .16, '#e2ad3a');
    add('capital leaves', u, 6.71, .10, .42, .22, .22, green);
    add('capital bloom', u, 6.72, .215, .14, .10, .02, red);
    add('capital abacus', u, 6.855, .10, .46, .07, .24, '#f0e7cf');
  }
  const windows = [[(pilasters[0] + pilasters[1]) / 2, .98], [(pilasters[1] + pilasters[2]) / 2, 1.08], [(pilasters[2] + pilasters[3]) / 2, .98]];
  const arches = [];
  for (const [u, w] of windows) {
    add('window dark recess', u, 5.975, .04, w, 1.85, .03, '#2a2c31');
    for (const s of [-w / 2 + .03, 0, w / 2 - .03]) add('window stile', u + s, 5.975, .075, .06, 1.85, .04, white);
    for (const y of [5.08, 6.10, 6.87]) add('window rail', u, y, .075, w, .06, .04, white);
    arches.push({ u, span: w, base: 6.90, rise: .40 });
  }
  add('frieze moulding', width / 2, 7.60, .05, width, .06, .10, '#2f7a5c');
  add('eaves soffit', width / 2, 7.66, .22, width, .04, .44, '#e8e1cf');
  add('green eaves fascia', width / 2, 7.70, .44, width, .22, .04, '#2f7a5c');
  add('shared downpipe', width - .045, 3.90, .08, .07, 7.60, .07, '#3a8a6a');

  // Two tiered chandeliers hang in the five-foot way, outside the glazing.
  const tiers = [[2.90, .22, .10], [2.80, .36, .10], [2.68, .52, .12], [2.55, .66, .14], [2.42, .54, .12], [2.31, .38, .10], [2.21, .22, .09], [2.12, .10, .08]];
  // Crystal drops ring the two widest tiers: [y, radius, count].
  const drops = [[2.47, .31, 16], [2.30, .22, 10]];
  const chandeliers = [.95, 3.25].map(t => ({ u: t * width / 5.13, out: -D + .5, rod: [3.03, 3.45], tiers, drops }));
  return {
    boxes, arches, chandeliers, pilasters, windows,
    sign: { left: .58, right: 4.82, bottom: 3.98, top: 4.98, out: .195 },
    frieze: { bottom: 6.92, top: 7.57, out: .012 },
    awning: { left: .30, right: width - .42, back: .02, front: .55, top: 3.42, bottom: 3.16 },
  };
}

const mix = (p, q, t) => p.map((v, i) => v + (q[i] - v) * t);

// Asymmetric gable roof with its ridge parallel to Geylang Road. The steeper
// street slope is visible from the far kerb, as in the reference.
export function artCentreRoof(frame) {
  const { height, ridgeHeight, ridgeDepth, eavesOverhang: o } = buddhistArtCentre;
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

export function artCentreReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'buddhist-art-centre', p: point(width / 2, 14), target: point(width / 2, 0), pitch: 15 },
    { id: 'buddhist-art-centre-oblique', p: point(width / 2 - 11, 18), target: point(width / 2, 0), pitch: 12 },
    { id: 'buddhist-art-centre-five-foot-way', p: point(width / 2 + .6, 2.6), target: point(width / 2, -1), pitch: 22 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
