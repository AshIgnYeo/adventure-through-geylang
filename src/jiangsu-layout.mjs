// April 2024 street exterior of No. 20 Lorong 11. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const jiangsu = {
  id: 'jiangsu', buildingIds: ['1223250201'], kind: 'jiangsu',
  name: 'JiangSu Jiu Jia 江苏酒家 (April 2024 exterior)', address: '20 Lorong 11 Geylang',
  height: 7.67, roofHeight: 7.25, frontEdge: 2, fiveFootWay: 1.9, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists JiangSu Jiu Jia 江苏酒家, a Chinese restaurant, at 20 Lor 11 Geylang, Singapore 388712, open in October 2026; its place point is displaced into the lane about 8 m south and is not used. The listed number matches the source way tagged No. 20. Kim Chai Hin, a supermarket, is also listed at No. 20 and is not assigned. April 2024 Street View shows the white two-storey shophouse immediately south of the Hainan Goh frontage (No. 20B), with a blue 江苏酒家 board above a shallow dark awning, a glazed restaurant front lit by a second 江苏酒家 sign, and a vertical neon 江苏酒家 blade sign on the party line with No. 20B. Triangulating the party downpipes from three April 2024 panoramas puts both party lines within 0.3 m of the source frontage, 6.12 m wide against 6.10 m. Heights come from a square-on frame with the camera height used for the same drive at No. 19; the blade sign was triangulated in plan from two panoramas. The roof behind the parapet is flat on satellite imagery; its height is estimated. Couplets, tables, bins and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=JiangSu+Jiu+Jia+20+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223250201',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=73intX-f7jQoMaTMSJ_4Mg&heading=71.6&pitch=0&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=110&pitch=6&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=H9_pLycpI51HF8H7LV6YxA&heading=40&pitch=6&fov=100',
  ],
};

// u runs north (the No. 20B party wall) to south (No. 18); out runs west towards Lorong 11.
export const jiangsuFrame = poly => frontageFrame(poly, jiangsu.frontEdge);

// Measured heights in metres above the five-foot way and positions along u.
export const elevation = {
  parapet: [7.55, 7.67], moulding: [7.15, 7.27],
  leftWindow: { u: [.82, 2.26], louvre: [5.97, 6.42], casement: [4.58, 5.97], surround: [.66, 2.40], sill: [4.44, 4.56] },
  rightWindow: { u: [3.12, 5.92], h: [4.64, 6.47], transom: 5.90 },
  smallOpening: { u: [.86, 1.39], h: [3.88, 4.30] },
  exhaust: { u: [3.37, 3.86], h: [4.21, 4.38] },
  board: { u: [2.07, 5.15], h: [3.54, 4.21] },
  awning: { wall: 3.35, front: 3.05, depth: .45 },
  ceiling: 3.2,
  // Back wall of the five-foot way.
  grille: { u: [.25, 1.35], top: 2.11 }, shopfront: { u: [1.51, 5.63], top: 3.07 }, litSign: { u: [2.36, 5.10], h: [2.52, 3.07] },
  piers: [[0, .24], [5.85, 6.10]],
  blade: { u: .05, out: [.2, .9], h: [3.7, 6.7] },
};

export function jiangsuLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = jiangsu.fiveFootWay, white = '#efeeea', shade = '#d9d8d2', dark = '#2f3235', glass = '#3d474e';

  // Parapet coping and the moulding below it.
  add('parapet coping', width / 2, (E.parapet[0] + E.parapet[1]) / 2, .04, width, E.parapet[1] - E.parapet[0], .12, '#8a8a85');
  add('parapet moulding', width / 2, (E.moulding[0] + E.moulding[1]) / 2, .05, width, E.moulding[1] - E.moulding[0], .1, shade);

  // Left window: a raised white surround, a louvred transom and casements over a projecting sill.
  {
    const W = E.leftWindow, [l, r] = W.u, u = (l + r) / 2, w = r - l;
    add('window surround', (W.surround[0] + W.surround[1]) / 2, (W.sill[1] + W.louvre[1] + .1) / 2, .02, W.surround[1] - W.surround[0], W.louvre[1] + .1 - W.sill[1], .04, '#f6f5f1');
    add('louvre field', u, (W.louvre[0] + W.louvre[1]) / 2, .045, w, W.louvre[1] - W.louvre[0], .02, '#cfd1cc');
    for (let y = W.louvre[0] + .05; y < W.louvre[1] - .02; y += .075) add('louvre blade', u, y, .06, w - .04, .025, .03, '#f2f2ee');
    add('casement frame', u, (W.casement[0] + W.casement[1]) / 2, .045, w, W.casement[1] - W.casement[0], .02, '#e8e8e3');
    add('casement glass', u, (W.casement[0] + W.casement[1]) / 2, .058, w - .1, W.casement[1] - W.casement[0] - .1, .01, '#56636a');
    for (const f of [1 / 3, 2 / 3]) add('casement stile', l + w * f, (W.casement[0] + W.casement[1]) / 2, .064, .04, W.casement[1] - W.casement[0] - .08, .015, '#e8e8e3');
    for (const f of [1 / 3, 2 / 3]) add('casement bar', u, W.casement[0] + (W.casement[1] - W.casement[0]) * f, .064, w - .08, .03, .015, '#e8e8e3');
    add('window sill', (W.surround[0] + W.surround[1]) / 2, (W.sill[0] + W.sill[1]) / 2, .08, W.surround[1] - W.surround[0] + .1, W.sill[1] - W.sill[0], .16, shade);
  }
  // Right window: a wide dark aluminium frame, top-hung lights over sliding panes.
  {
    const W = E.rightWindow, [l, r] = W.u, u = (l + r) / 2, w = r - l, [b, t] = W.h;
    add('wide window frame', u, (b + t) / 2, .04, w, t - b, .03, dark);
    add('wide window glass', u, (b + t) / 2, .056, w - .08, t - b - .08, .01, glass);
    add('wide window transom', u, W.transom, .062, w - .08, .05, .015, dark);
    for (const f of [.25, .5, .75]) add('wide window mullion', l + w * f, (b + t) / 2, .062, .04, t - b - .08, .015, dark);
    add('wide window sill', u, b - .04, .07, w + .1, .08, .12, shade);
  }
  {
    const O = E.smallOpening, [l, r] = O.u;
    add('small opening frame', (l + r) / 2, (O.h[0] + O.h[1]) / 2, .03, r - l, O.h[1] - O.h[0], .03, '#e3e3de');
    add('small opening glass', (l + r) / 2, (O.h[0] + O.h[1]) / 2, .047, r - l - .08, O.h[1] - O.h[0] - .08, .01, '#9aa3a6');
    const X = E.exhaust, [xl, xr] = X.u;
    add('exhaust grille', (xl + xr) / 2, (X.h[0] + X.h[1]) / 2, .04, xr - xl, X.h[1] - X.h[0], .05, '#b5b7b2');
    for (let y = X.h[0] + .03; y < X.h[1]; y += .04) add('exhaust slat', (xl + xr) / 2, y, .068, xr - xl - .04, .012, .01, '#7c7f7b');
  }
  // Downpipe on the No. 18 party line, from the parapet to the five-foot way.
  add('downpipe', width - .05, E.parapet[0] / 2, .06, .08, E.parapet[0], .08, '#f2f1ed');

  // Ground floor: piers, the beam behind the awning, and the 1.9 m five-foot way.
  for (const [l, r] of E.piers) add('pier', (l + r) / 2, E.ceiling / 2, -.15, r - l, E.ceiling, .3, white);
  add('front beam', width / 2, (E.ceiling + E.awning.wall) / 2 - .02, -.12, width, E.awning.wall - E.ceiling + .1, .24, white);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#a9a69c');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#e7e6e0');
  add('back wall', width / 2, E.ceiling / 2, -D, width - .04, E.ceiling, .06, '#e3e1da');
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -(D + .3) / 2, .03, E.ceiling, D - .3, white);
  const wall = -D + .035;
  {
    const [l, r] = E.grille.u, t = E.grille.top;
    add('grille gate backing', (l + r) / 2, t / 2, wall, r - l, t, .02, '#2a2624');
    for (let k = 0; k <= 8; k++) add('grille gate bar', l + (r - l) * k / 8, t / 2, wall + .03, .025, t, .02, '#9a9b96');
    for (const y of [.4, t / 2, t - .1]) add('grille gate rail', (l + r) / 2, y, wall + .03, r - l, .03, .02, '#9a9b96');
  }
  {
    const [l, r] = E.shopfront.u, t = E.shopfront.top;
    add('shopfront frame', (l + r) / 2, t / 2, wall, r - l, t, .03, '#8e9190');
    add('shopfront glass', (l + r) / 2, t / 2, wall + .02, r - l - .1, t - .1, .01, '#24292b', .05);
    for (const f of [.33, .66]) add('shopfront mullion', l + (r - l) * f, t / 2, wall + .03, .05, t - .1, .02, '#8e9190');
    add('shopfront head', (l + r) / 2, (t + E.ceiling) / 2, wall, r - l, E.ceiling - t, .03, '#1d2124');
  }
  const L = E.litSign, B = E.board;
  return {
    boxes,
    board: { left: B.u[0], right: B.u[1], bottom: B.h[0], top: B.h[1], out: .1 },
    litSign: { left: L.u[0], right: L.u[1], bottom: L.h[0], top: L.h[1] - .06, out: wall + .045 },
    awning: { ...E.awning, from: .02, to: width - .02 },
    blade: { ...E.blade },
  };
}

export function jiangsuReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'jiangsu', p: point(width / 2, 6.5), target: point(width / 2, 0), pitch: 18 },
    { id: 'jiangsu-five-foot-way', p: point(width * .75, 2.8), target: point(width * .4, -1.9), pitch: 8 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
