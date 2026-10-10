// June 2024 street exterior of Nos. 131 and 133 Sims Avenue, on the north side of the road.
// Each source footprint carries its own identity; the street front is measured as one.
import { frontageFrame } from './gable-roof-layout.mjs';

const shared = { frontEdge: 0, reviewRoad: 'Sims Avenue' };
const panoramas = [
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=GSi02rgoddx_BEQoQuw5bw&heading=342.7&pitch=12&fov=100',
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=GSi02rgoddx_BEQoQuw5bw&heading=342.7&pitch=32&fov=100',
];

export const normalStainless = {
  ...shared, id: 'normal-stainless', buildingIds: ['439168811'], kind: 'normal-stainless',
  name: 'Normal Stainless Steel showroom (June 2024 exterior)', address: '131 Sims Avenue', height: 6.14,
  evidence: 'Google Maps lists Normal Stainless Steel Pte Ltd - Sims Avenue Showroom at 131 Sims Ave, Singapore 387454; its place point is displaced into No. 127 and is not used. The source way is tagged No. 131. June 2024 Street View shows the grey two-storey frontage with the 普通白钢有限公司 NORMAL STAINLESS STEEL PTE LTD fascia directly west of the white QianJing Crystal frontage at No. 133. Heights and positions were measured from a square-on frame scaled by the 11.02 m combined frontage: the party wall between the two measured about 6.36 m from the No. 127 side, against the equal 5.51 m source split, which is preserved. Stock, the parked car and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Normal+Stainless+Steel+131+Sims+Avenue', 'https://www.openstreetmap.org/way/439168811', ...panoramas],
};

export const qianjing = {
  ...shared, id: 'qianjing', buildingIds: ['439168787'], kind: 'qianjing',
  name: 'QianJing Crystal (June 2024 exterior)', address: '133 Sims Avenue', height: 7.31,
  ridgeHeight: 8.9, ridgeDepth: .35, eavesOverhang: .3,
  evidence: 'Google Maps lists QianJing Crystal at 133 Sims Ave, Singapore 387455, open in October 2026; its place point lies inside the source way tagged No. 133. June 2024 Street View shows the white frontage with the large QIANJING CRYSTALS & LIFESTYLE signboard and dragon roundel, three tall dark-framed upper windows under transom lights, and a tiled eave. Measured with No. 131, its visible frontage is about 4.66 m wide against the 5.51 m source way; the source outline is preserved and the difference documented. The roof form is estimated. Crystal displays and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=QianJing+Crystal+133+Sims+Avenue', 'https://www.openstreetmap.org/way/439168787', ...panoramas],
};

// Pair coordinates: u runs east from the No. 127 side of No. 131; out runs south to Sims Avenue.
export const pairFrame = (poly131, poly133) => {
  const f = frontageFrame(poly131, 0), g = frontageFrame(poly133, 0);
  return { ...f, b: g.b, rearB: g.rearB, split: f.width, width: Math.hypot(g.b[0] - f.a[0], g.b[1] - f.a[1]) };
};

// Measured: the party wall stands 6.36 m from the west end of the pair.
export const measuredSplit = 6.36;

export function pairLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const S = measuredSplit, D = 1.6, grey = '#6f7477', white = '#efeee9';

  // No. 131: grey front, two brown-glazed windows under louvred vents, a fascia sign.
  add('grey front', S / 2, (3.2 + 6.14) / 2, .0, S, 6.14 - 3.2, .06, grey);
  add('grey parapet cap', S / 2, 6.18, .02, S, .08, .14, '#5d6265');
  for (const [l, r] of [[.94, 3.23], [3.88, 6.17]]) {
    const u = (l + r) / 2, w = r - l;
    add('window frame', u, 4.07, .04, w + .1, 1.14, .04, '#e7e5df');
    add('brown glazing', u, 4.07, .065, w, 1.04, .01, '#7e4a2e');
    for (let i = 1; i < 4; i++) add('window mullion', l + w * i / 4, 4.07, .075, .04, 1.04, .02, '#e7e5df');
    add('window sill', u, 3.48, .08, w + .2, .05, .14, '#5d6265');
    add('vent', u, 4.91, .04, w * .9, .28, .04, '#55595c');
    for (let k = 0; k < 4; k++) add('vent louvre', u, 4.8 + k * .07, .07, w * .88, .025, .02, '#8b9093');
  }
  add('five-foot way soffit', S / 2, 3.18, -D / 2, S, .08, D, '#d8d6cf');
  add('five-foot way floor', S / 2, .08, -D / 2, S - .1, .08, D, '#9b9a94');
  add('shop back wall', S / 2, 1.6, -D, S - .1, 3.1, .06, '#4f5456');
  add('shop opening', S / 2, 1.25, -D + .04, S - .9, 2.3, .02, '#2c2f31');
  for (const u of [.15, S - .1]) add('pier', u, 1.6, -.3, u < 1 ? .3 : .2, 3.2, .6, grey);

  // No. 133: white front, three tall dark-framed windows with transoms, signboard.
  const Q0 = S, Q1 = width;
  add('white front', (Q0 + Q1) / 2, (2.2 + 7.31) / 2, .0, Q1 - Q0, 7.31 - 2.2, .06, white);
  for (const [l, r] of [[7.06, 8.10], [8.32, 9.38], [9.51, 10.55]]) {
    const u = (l + r) / 2, w = r - l;
    add('window frame', u, 5.08, .04, w + .08, 1.82, .05, '#3a2c26');
    add('dark glazing', u, 5.08, .07, w - .08, 1.66, .01, '#38393b');
    add('window mullion', u, 5.08, .08, .04, 1.66, .02, '#3a2c26');
    add('transom frame', u, 6.21, .04, w + .08, .33, .05, '#3a2c26');
    add('transom glass', u, 6.21, .07, w - .08, .25, .01, '#4a4b4d');
    add('window sill', u, 4.14, .08, w + .14, .05, .12, '#d9d7d0');
  }
  add('tiled eave', (Q0 + Q1) / 2, 7.25, .25, Q1 - Q0, .12, .5, '#9c5b45');
  add('grey side pilaster', Q1 - .12, 3.6, .04, .24, 7.2, .1, '#8d9093');
  add('shop glazing', (Q0 + Q1) / 2, 1.0, -D + .04, Q1 - Q0 - .5, 1.8, .03, '#3d4a4f');
  add('shopfront frame', (Q0 + Q1) / 2, 1.92, -D + .06, Q1 - Q0 - .5, .06, .03, '#cfcdc6');
  add('five-foot way floor', (Q0 + Q1) / 2, .08, -D / 2, Q1 - Q0 - .1, .08, D, '#b8b6ae');
  add('five-foot way soffit', (Q0 + Q1) / 2, 2.2, -D / 2, Q1 - Q0, .08, D, '#eceae4');
  add('shop back wall', (Q0 + Q1) / 2, 1.1, -D, Q1 - Q0 - .1, 2.2, .06, white);
  for (const u of [Q1 - .15]) add('pier', u, 1.1, -.3, .3, 2.2, .6, white);
  return {
    boxes,
    nssSign: { left: .72, right: 5.83, bottom: 2.28, top: 3.12, out: .07 },
    qjSign: { left: 6.83, right: 10.8, bottom: 2.28, top: 4.09, out: .08 },
    qjSmallSign: { left: 7.8, right: 9.9, bottom: 1.93, top: 2.15, out: -D + .07 },
  };
}

export function pairReviews(frame) {
  const { point } = frame;
  return [
    { id: 'normal-stainless', p: point(3.2, 7.0), target: point(3.2, 0), pitch: 18 },
    { id: 'qianjing', p: point(8.8, 7.0), target: point(8.8, 0), pitch: 22 },
    { id: 'sims-131-133-pair', p: point(5.5, 7.4), target: point(5.5, 0), pitch: 18 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
