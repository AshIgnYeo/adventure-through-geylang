// April 2024 street exterior of No. 7 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const hongYeChen = {
  id: 'hong-ye-chen', buildingIds: ['1223773755'], kind: 'hong-ye-chen',
  name: 'Hong Ye Chen Interior Design (April 2024 exterior)', address: '7 Lorong 13 Geylang',
  height: 8.74, ridgeHeight: 10.8, ridgeDepth: .45, eavesOverhang: .5, frontEdge: 0, fiveFootWay: 1.5, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists Hong Ye Chen Interior Design at 7 Lor 13 Geylang, Singapore 388645; its place point lies inside the source way tagged No. 7. April 2024 Street View shows door number 7 beside the glazed doors of this conserved two-storey shophouse, under a black signboard with three gold roundels reading 浤業成 and HONG YE CHEN INTERIOR DESIGN. The upper storey has a central French window between two tall windows, slender pilasters with capitals, floral tile panels and the timber fretwork eaves shared along the row. Mister Contracts shares the same Maps point and address, but its signage hangs on the houses to the north, so it is recorded and not assigned. Heights were measured from a square-on frame scaled by the 5.02 m frontage; the five-foot way depth and roof are estimates. The interior is not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Hong+Ye+Chen+Interior+Design+7+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223773755',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=251.4&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=245&pitch=-3&fov=40',
  ],
};

// u runs south (No. 5) to north (No. 9); out runs east towards Lorong 13.
export const hongYeChenFrame = poly => frontageFrame(poly, hongYeChen.frontEdge);

// Measured heights and positions, metres.
export const elevation = {
  sign: [3.28, 4.13], beamTop: 4.34, floor2: 4.44, tiles: [4.52, 5.11], sill: 5.23,
  windows: [[.61, 1.80, 5.41, 7.49], [2.14, 3.37, 4.44, 7.54], [3.70, 4.88, 5.41, 7.49]],
  pilasters: [[0, .55], [1.82, 2.14], [3.37, 3.70], [4.88, 5.01]], capitals: [6.87, 7.29],
  fretwork: [7.70, 8.27],
};

export function hongYeChenLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const E = elevation, D = hongYeChen.fiveFootWay, white = '#efede6', shade = '#dad7cd', black = '#1c1d1f';

  // Upper storey: windows, slender pilasters with capitals, and floral tile panels.
  for (const [l, r, b, t] of E.windows) {
    const u = (l + r) / 2, w = r - l, h = t - b, mid = (b + t) / 2;
    add('window frame', u, mid, .01, w, h, .04, black);
    add('tinted glazing', u, mid, .035, w - .1, h - .1, .01, '#3f4549');
    add('window mullion', u, mid, .04, .04, h - .1, .02, black);
    add('window transom', u, b + h * .72, .04, w - .1, .04, .02, black);
    add('window head moulding', u, t + .07, .05, w + .16, .1, .1, shade);
  }
  for (const [l, r] of [E.windows[0], E.windows[2]]) add('sill ledge', (l + r) / 2, E.sill, .06, r - l + .2, .08, .16, shade);
  // Party pilasters are shared with the neighbours, so their capitals stop at the party line.
  const clip = (l, r) => [Math.max(l, 0), Math.min(r, width)];
  for (const [l, r] of E.pilasters) {
    const u = (l + r) / 2, w = r - l, [cl, cr] = clip(l - .03, r + .03);
    add('pilaster', u, (E.floor2 + E.capitals[0]) / 2, .04, w, E.capitals[0] - E.floor2, .08, white);
    add('pilaster capital', (cl + cr) / 2, (E.capitals[0] + E.capitals[1]) / 2, .07, cr - cl, E.capitals[1] - E.capitals[0], .14, shade);
    for (const side of [-1, 1]) {
      const vu = u + side * (w / 2 - .02);
      if (vu - .06 >= 0 && vu + .06 <= width) add('capital volute', vu, E.capitals[1] - .08, .1, .08, .08, .1, white, 0, 45);
    }
  }
  add('frieze band', width / 2, (E.windows[1][3] + E.fretwork[0]) / 2 + .04, .03, width, E.fretwork[0] - E.windows[1][3], .06, white);
  add('upper floor ledge', width / 2, E.floor2 - .04, .1, width, .1, .2, shade);
  add('cornice', width / 2, E.beamTop - .08, .12, width, .16, .24, white);

  // Eaves: soffit behind the timber fretwork valance.
  add('eaves soffit', width / 2, E.fretwork[1] + .02, .25, width, .05, .5, '#6b5a50');
  add('roof edge board', width / 2, hongYeChen.height - .2, .5, width, .2, .05, '#8a6a5a');

  // Ground floor: piers, fascia sign on the beam, and the recessed glazed shopfront.
  for (const [u, w] of [[.2, .4], [width - .11, .2]]) {
    add('pier', u, 1.64, -.3, w, 3.28, .6, white);
    add('pier console', u, 3.1, .02, w, .2, .12, shade);
  }
  add('sign backing', 2.67, (E.sign[0] + E.sign[1]) / 2, .02, 4.1, E.sign[1] - E.sign[0], .06, black);
  add('five-foot way floor', width / 2, .08, -D / 2, width - .1, .08, D, '#c9b996');
  add('five-foot way ceiling', width / 2, 3.24, -D / 2, width - .1, .08, D, '#e8e6df');
  add('back wall', width / 2, 1.6, -D, width - .1, 3.2, .06, white);
  for (const [l, r] of [[.81, 1.90], [3.88, 4.88]]) add('display window', (l + r) / 2, 1.85, -D + .04, r - l, 1.9, .03, '#3a4246');
  add('glazed double door', 2.92, 1.5, -D + .04, 1.29, 2.85, .03, '#2a3033');
  for (const u of [2.86, 2.98]) add('door pull', u, 1.4, -D + .07, .025, .7, .02, '#c49a3b');
  add('door number plate', 3.72, 1.2, -D + .045, .18, .24, .02, '#232425');
  return {
    boxes,
    sign: { left: .62, right: 4.72, bottom: E.sign[0], top: E.sign[1], out: .055 },
    tilePanels: [E.windows[0], E.windows[2]].map(([l, r]) => ({ u: (l + r) / 2, w: r - l, bottom: E.tiles[0], top: E.tiles[1], out: .02 })),
    fretwork: { bottom: E.fretwork[0], top: E.fretwork[1], out: .5 },
    blade: { u: width - .12, out: .35, top: 4.1, discs: 3, r: .2 },
    numberPlate: { u: 3.72, out: -D + .06, bottom: 1.09, top: 1.31, w: .16 },
  };
}

export function hongYeChenReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'hong-ye-chen', p: point(width / 2, 9.0), target: point(width / 2, 0), pitch: 18 },
    { id: 'hong-ye-chen-ground', p: point(width / 2 + .4, 4.6), target: point(width / 2, -.8), pitch: 8 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
