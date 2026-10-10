// April 2024 street exterior of No. 29 Lorong 11, on the owner-approved re-spaced footprint.
import { frontageFrame } from './gable-roof-layout.mjs';

export const engLeeHuat = {
  id: 'eng-lee-huat', buildingIds: ['l11w-29'], kind: 'eng-lee-huat',
  name: 'Eng Lee Huat Hardware (April 2024 exterior)', address: '29 Lorong 11 Geylang',
  height: 8.82, frontEdge: 0, fiveFootWay: 1.8, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Eng Lee Huat Hardware, a hardware store, at 29 Lor 11 Geylang, Singapore 388721. April 2024 Street View shows a black signboard reading 永利… ENG LEE HUAT HARDWARE PTE. LTD., partly covered by a red festival banner, beside door plate 29 on this white two-storey house. Three panoramas rectified at the solved 0.6 m façade depth put its frontage at about 4.0 m between No. 27 and No. 29A, so it stands on the owner-approved re-spaced No. 29 footprint (open question 1) rather than the 6.41 m source way 1223407879. The upper storey has a large grilled window over air-conditioning units, a white triangular pediment with two vent blocks, and a projecting hood under a plain parapet; the ground floor is an open shop. Heights come from a square-on frame. The banner, plants, stock and interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Eng+Lee+Huat+Hardware+29+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223407879',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=H3-9KS_v_QrrAnpO7y28LQ&heading=252&pitch=15&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=QQNp4tBAf9BWzHrMOUczcw&heading=235&pitch=10&fov=90',
  ],
};

// u runs south (the No. 27 party line) to north (No. 29A); out runs east to Lorong 11.
export const engLeeHuatFrame = poly => frontageFrame(poly, engLeeHuat.frontEdge);

// Measured on the rectified façade, metres from the No. 27 line and above the five-foot-way floor.
export const elevation = {
  hood: { h: [7.1, 7.22], depth: .45 },
  window: { u: [.4, 3.55], h: [4.95, 6.72] }, grilleLower: { u: [.45, 3.5], h: [4.3, 4.95] },
  pediment: { u: [.95, 3.2], apex: 5.0, base: 4.2 }, vents: [5.15, 4.75],
  ledge: [3.37, 3.51], ceiling: 2.95,
  piers: [[0, .66], [3.75, 4.0]], opening: [.66, 3.75],
  board: { u: [1.51, 3.29], h: [2.93, 3.31] }, plate: { u: [3.42, 3.52], h: [3.18, 3.33] },
  letterbox: { u: [.68, .82], h: [2.0, 2.3] },
};

export function engLeeHuatLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = engLeeHuat.fiveFootWay, white = '#eeeee9', shade = '#d9d9d3', mid = (a, b) => (a + b) / 2;

  add('parapet coping', width / 2, engLeeHuat.height - .04, .03, width, .08, .1, shade);
  add('projecting hood', width / 2, mid(...E.hood.h), E.hood.depth / 2, width, E.hood.h[1] - E.hood.h[0], E.hood.depth, white);
  // Large grilled window: a white lattice of bars and studs over net curtains, and a lower grille over the condensers.
  const { u: [l, r], h: [b, t] } = E.window;
  add('window reveal', mid(l, r), mid(b, t), -.03, r - l, t - b, .04, '#3a4247');
  add('net curtains', mid(l, r), mid(b, t) + .2, -.01, r - l - .2, (t - b) * .6, .01, '#e6e3de');
  add('window surround', mid(l, r), t + .04, .03, r - l + .16, .08, .08, white);
  for (let u = l + .1; u < r; u += .135) add('grille bar', u, mid(b, t), .04, .025, t - b, .025, '#f4f4f0');
  for (let y = b + .1; y < t; y += .2) add('grille rail', mid(l, r), y, .04, r - l, .025, .025, '#f4f4f0');
  const G = E.grilleLower;
  add('condenser recess', mid(...G.u), mid(...G.h), -.04, G.u[1] - G.u[0], G.h[1] - G.h[0], .04, '#525759');
  for (const u of [.95, 2.95]) add('condenser', u, mid(...G.h), -.02, .8, .55, .2, '#d9d9d4');
  for (let u = G.u[0] + .1; u < G.u[1]; u += .27) add('lower grille bar', u, mid(...G.h), .03, .025, G.h[1] - G.h[0], .025, '#f4f4f0');
  // White triangular pediment with two vent blocks on its axis.
  const P = E.pediment;
  for (let k = 0; k < 8; k++) {
    const y0 = P.base + (P.apex - P.base) * k / 8, y1 = P.base + (P.apex - P.base) * (k + 1) / 8, half = (P.u[1] - P.u[0]) / 2 * (1 - (k + .5) / 8);
    add('pediment step', mid(...P.u), mid(y0, y1), .05, half * 2, y1 - y0, .06, white);
  }
  for (const y of E.vents) add('vent block', mid(...P.u), y, .085, .18, .22, .02, '#b7b8b2');
  add('sill ledge', width / 2, P.base - .05, .08, width - .2, .1, .16, shade);
  add('upper wall', width / 2, mid(E.ledge[1], engLeeHuat.height), -.05, width, engLeeHuat.height - E.ledge[1], .04, white);

  // Floor ledge over the five-foot way, piers and the open shop.
  add('floor ledge', width / 2, mid(...E.ledge), .12, width, E.ledge[1] - E.ledge[0], .24, white);
  add('beam', width / 2, mid(E.ceiling, E.ledge[0]), -.05, width, E.ledge[0] - E.ceiling, .14, white);
  for (const [a, c] of E.piers) add('pier', mid(a, c), E.ceiling / 2, -.2, c - a, E.ceiling, .4, white);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#a39f96');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#e3e1db');
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, white);
  const back = -D + .04;
  add('shop interior', mid(...E.opening), 1.45, back, E.opening[1] - E.opening[0], 2.9, .03, '#2a2826');
  for (const y of [.8, 1.5, 2.2]) add('stock shelf', mid(...E.opening) - .4, y, back + .25, 1.6, .05, .4, '#7a6a55');
  for (const u of [E.opening[0] + .08, E.opening[1] - .08]) add('folded collapsible gate', u, 1.45, -.08, .14, 2.9, .06, '#8b8f8c');
  add('letterbox', mid(...E.letterbox.u), mid(...E.letterbox.h), .02, E.letterbox.u[1] - E.letterbox.u[0], E.letterbox.h[1] - E.letterbox.h[0], .12, '#c0302e');
  return {
    boxes,
    board: { left: E.board.u[0], right: E.board.u[1], bottom: E.board.h[0], top: E.board.h[1], out: .02 },
    plate: { left: E.plate.u[0], right: E.plate.u[1], bottom: E.plate.h[0], top: E.plate.h[1], out: .02 },
  };
}

export function engLeeHuatReviews(frame) {
  const { point, width } = frame;
  return [{ id: 'eng-lee-huat', p: point(width / 2, 7.5), target: point(width / 2, 0), pitch: 18 }]
    .map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
