// June 2024 street exterior. Only the No. 285 source footprint is assigned.
export const buddhistArtCentre = {
  id: 'buddhist-art-centre', buildingIds: ['454254227'], kind: 'buddhist-art-centre',
  name: 'Buddhist Art Centre (June 2024 exterior)', address: '285 Geylang Road',
  height: 7.7, ridgeHeight: 10.2, ridgeDepth: .32, frontEdge: 0, fiveFootWay: 1.8, eavesOverhang: .45, reviewRoad: 'Geylang Road',
  evidence: 'The operator store page and web listings give 285 Geylang Road. Named OSM node 4689499461 lies inside unnumbered way 454254227, between the Sik Wai Sin node in the next footprint and No. 283. June 2024 Street View shows the signed NO:285 frontage: two storeys under a pitched tiled roof, three casements under banded segmental arches between six fluted blue and yellow pilasters, a red scroll frieze, a teal bilingual signboard, two vertical signs, ochre five-foot way piers, a faded red awning and two tiered chandeliers hung in the five-foot way outside the shopfront glass. Only this footprint is assigned. Heights, roof pitch and ornament are estimated; vertical sign wording and telephone numbers are not reproduced; no stock, religious objects or private interior are reconstructed.',
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
  // roll turns a box within the façade plane, for leaf and star ornament.
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
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

  // Lintel, painted bands and the bilingual signboard over the five-foot way.
  add('five-foot way lintel', width / 2, 3.60, .02, width, .30, .20, '#ebe6d8');
  for (const [i, colour] of [red, blue, '#e9b23f', green].entries()) add('painted band', width / 2, 3.78 + i * .055, .06, width, .055, .12, colour);
  add('signboard edge', 2.70, 4.48, .12, 4.24, 1.0, .14, '#2f7477');
  add('sign ledge', width / 2, 5.03, .12, width, .08, .30, '#e9dfc4');
  // Vertical sign colours follow the reference; wording and numbers are not reproduced.
  add('vertical sign frame', .32, 5.58, .30, .34, 2.74, .08, '#1d1b19');
  for (const y of [4.45, 6.70]) add('vertical sign bracket', .32, y, .13, .04, .04, .26, '#5c4a3a');
  add('projecting sign cream edge', width - .10, 5.60, .50, .05, 3.04, .70, '#efe6cf');
  add('projecting sign face', width - .10, 5.60, .50, .09, 2.92, .60, teal);
  for (const y of [4.30, 6.90]) add('projecting sign bracket', width - .10, y, .07, .03, .04, .14, '#5a5f5c');

  // Upper storey, from the June 2024 close view: a tall and a short fluted
  // pilaster at each end, two between the windows, and segmental banded arches.
  const k = width / 5.13, edge = '#e3a93b', face = '#f3e6bd', star = '#c8453a', leaf = '#3d8a56';
  const springing = 6.74, glassTop = 6.64, sill = 5.07;
  const pilaster = (u, w, top, out, kind) => {
    const shaft = top - .37 - sill;
    add(`${kind} pilaster base`, u, sill + .07, out + .02, w + .04, .14, .16, '#efe3c0');
    add(`${kind} pilaster edge`, u, sill + .14 + shaft / 2, out, w, shaft, .12, edge);
    add(`${kind} pilaster face`, u, sill + .14 + shaft / 2, out + .065, w - .07, shaft - .04, .01, face);
    for (let i = 1; i <= 4; i++) add(`${kind} pilaster flute`, u - (w - .07) / 2 + (w - .07) * i / 5, sill + .14 + shaft / 2, out + .075, .035, shaft - .14, .012, blue);
    // Capital: cream block, green leaf scrolls, a red star flower and red cap.
    // Tall end capitals overhang less, keeping them inside the No. 285 frontage.
    const y0 = top - .37, over = kind === 'tall' ? .02 : .06;
    add(`${kind} capital necking`, u, y0 + .02, out + .01, w + .02, .04, .14, edge);
    add(`${kind} capital block`, u, y0 + .19, out + .03, w + over, .30, .18, '#f0e9d6');
    for (const side of [-1, 1]) {
      add(`${kind} capital lower leaf`, u + side * w * .25, y0 + .10, out + .125, w * .48, .07, .02, leaf, 0, side * 28);
      add(`${kind} capital scroll leaf`, u + side * w * .28, y0 + .235, out + .125, w * .44, .065, .02, leaf, 0, -side * 34);
      add(`${kind} capital leaf tip`, u + side * w * .42, y0 + .29, out + .125, .06, .06, .02, leaf, 0, 45);
    }
    for (const roll of [0, 45]) add(`${kind} capital star flower`, u, y0 + .17, out + .13, .085, .085, .015, star, 0, roll);
    add(`${kind} capital red cap`, u, y0 + .37, out + .03, w + over + .04, .07, .22, star);
  };
  const pilasters = [
    [.17, .26, 7.32, .03, 'tall'], [.48, .34, springing, .06, 'short'], [1.86, .38, springing, .06, 'inner'],
    [3.27, .38, springing, .06, 'inner'], [4.645, .34, springing, .06, 'short'], [4.945, .24, 7.32, .03, 'tall'],
  ].map(([u, w, top, out, kind]) => ({ u: u * k, w: w * k, top, out, kind }));
  for (const p of pilasters) pilaster(p.u, p.w, p.top, p.out, p.kind);

  // Casements: thick white frames, two leaves with a transom, pale curtained glass.
  const windows = [[1.165, .99, '#3d8a56'], [2.565, 1.01, '#2d5bb0'], [3.965, .99, '#3d8a56']].map(([u, w, fan]) => ({ u: u * k, w: w * k, fan }));
  const arches = [];
  for (const { u, w, fan } of windows) {
    const h = glassTop - sill, mid = sill + h / 2;
    for (const [i, du] of [-w / 4, w / 4].entries()) for (const [j, y] of [[0, (sill + 5.85) / 2], [1, (5.85 + glassTop) / 2]]) {
      add('curtained window pane', u + du, y, .03, w / 2 - .02, j ? glassTop - 5.85 : 5.85 - sill, .02, (i + j) % 2 ? '#7f888c' : '#8d9497');
    }
    for (const s of [-w / 2 + .035, 0, w / 2 - .035]) add('window stile', u + s, mid, .065, s ? .07 : .06, h, .04, white);
    for (const y of [sill + .035, 5.85, glassTop - .035]) add('window rail', u, y, .065, w, y === 5.85 ? .06 : .07, .04, white);
    arches.push({ u, span: w, springing, glassTop, rise: .30, fan,
      // Bands outward from the intrados: [inner, outer, colour], within the pilaster gap.
      bands: [[0, .06, '#f3efe4'], [.06, .12, '#2d5bb0'], [.12, .16, '#e9b23f'], [.16, .18, star], [.18, .19, leaf]] });
  }

  // Frieze, eaves bands, gutter and the shared downpipe.
  add('eaves blue band', width / 2, 7.56, .05, width, .08, .10, '#2d5bb0');
  add('eaves red line', width / 2, 7.615, .05, width, .03, .10, star);
  add('eaves soffit', width / 2, 7.64, .24, width, .04, .48, '#5d5148');
  add('green eaves fascia', width / 2, 7.71, .46, width, .20, .04, '#2f7a5c');
  add('green gutter', width / 2, 7.82, .42, width, .10, .12, '#2b6f55');
  add('shared downpipe', width - .018, 3.90, .05, .03, 7.60, .05, '#3a8a6a');
  // A small chimney stack near the west party wall, position estimated.
  add('chimney stack', .55, 8.45, -1.0, .32, .70, .32, '#9a8f84');
  add('chimney cap', .55, 8.83, -1.0, .40, .06, .40, '#7d736a');

  // Two tiered chandeliers hang in the five-foot way, outside the glazing.
  const tiers = [[2.90, .22, .10], [2.80, .36, .10], [2.68, .52, .12], [2.55, .66, .14], [2.42, .54, .12], [2.31, .38, .10], [2.21, .22, .09], [2.12, .10, .08]];
  // Crystal drops ring the two widest tiers: [y, radius, count].
  const drops = [[2.47, .31, 16], [2.30, .22, 10]];
  const chandeliers = [.95, 3.25].map(t => ({ u: t * width / 5.13, out: -D + .5, rod: [3.03, 3.45], tiers, drops }));
  return {
    boxes, arches, chandeliers, pilasters, windows,
    sign: { left: .58, right: 4.82, bottom: 3.98, top: 4.98, out: .195 },
    verticalSign: { left: .17, right: .47, bottom: 4.28, top: 6.88, out: .345 },
    frieze: { bottom: springing - .05, top: 7.52, out: .012 },
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
    { id: 'buddhist-art-centre-upper', p: point(width / 2 - 1.2, 5.5), target: point(width / 2, 0), pitch: 27 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
