// April 2024 street exterior of No. 26 Lorong 11. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const liuDaMa = {
  id: 'liu-da-ma', buildingIds: ['1223250204'], kind: 'liu-da-ma',
  name: 'Liu Da Ma BBQ 刘大妈烧烤吧 (April 2024 exterior)', address: '26 Lorong 11 Geylang',
  height: 7.23, roofHeight: 6.9, frontEdge: 2, fiveFootWay: 2.0, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Liu Da Ma BBQ, a Chinese restaurant, at 26 Lor 11 Geylang, Singapore 388718, Floor 1, open in October 2026, matching the source way tagged No. 26; 天府渔香 is listed on Floor 2 and is not assigned. April 2024 Street View shows the salmon two-storey shophouse between Ho San Kong Hoey (No. 24) and No. 28, with a tall dark blade sign of bulb-studded characters reading 刘大妈烧烤吧 on the party line with No. 28, a red retractable awning, and a restaurant with lamb posters in the five-foot way. A square-on March 2022 capture shows the same frontage, blade sign and restaurant. Render-and-compare against the existing No. 24 model confirms the source frontage. Heights come from the square-on frame, with the camera height solved from the five-foot-way floor at the façade and the back wall; the awning projection comes from its front bar. The ground-floor fittings follow the April 2024 oblique views and are approximate. Posters, kiosks, the robot waiter, couplets, furniture and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Liu+Da+Ma+BBQ+26+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223250204',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=Iep_Wq_YcEGEcE0_R-ecew&heading=72.8&pitch=0&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=H3-9KS_v_QrrAnpO7y28LQ&heading=100&pitch=8&fov=45',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=8kEpH_Q3jNSaUef89yiXtQ&heading=55&pitch=6&fov=45',
  ],
};

// u runs north (the No. 28 party wall) to south (No. 24); out runs west towards Lorong 11.
export const liuDaMaFrame = poly => frontageFrame(poly, liuDaMa.frontEdge);

// Measured in the square-on frame at 55.0 px/m, camera 2.41 m above the five-foot way.
export const elevation = {
  canopy: { wall: 6.33, front: 6.18, depth: .6 },
  louvres: [5.38, 5.65], windows: { u: [[.58, 2.36], [3.64, 5.42]], h: [4.21, 5.38] }, sill: [4.14, 4.21],
  beam: [3.52, 3.65],
  awning: { wall: 3.42, front: 2.43, depth: 1.3, valance: .25 },
  condensers: [
    { u: [.45, 1.36], h: [3.68, 4.88], stack: 2 },
    { u: [3.67, 4.67], h: [3.68, 4.56], stack: 1 },
    { u: [4.85, 5.93], h: [3.68, 4.92], stack: 2 },
  ],
  piers: [[0, .36], [5.55, 6.09]], ceiling: 3.3,
  // Approximate positions on the back wall, from the April 2024 oblique views.
  poster: { u: [.6, 2.0], h: [.9, 2.7] }, kiosks: { u: [2.15, 2.95], h: [.9, 2.0] }, door: { u: [3.2, 4.7], top: 2.6 },
  blade: { u: .08, out: [.25, .95], h: [3.56, 7.2] },
};

export function liuDaMaLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = liuDaMa, M = elevation, D = E.fiveFootWay, salmon = '#d9786a', red = '#a8382f';

  add('parapet coping', width / 2, E.height - .05, .03, width, .1, .1, '#c96d60');
  // Upper storey: two windows with white louvred transoms over pale panes, on a sill ledge.
  for (const [l, r] of M.windows.u) {
    const u = (l + r) / 2, w = r - l, [b, t] = M.windows.h;
    add('louvre frame', u, (M.louvres[0] + M.louvres[1]) / 2, .03, w, M.louvres[1] - M.louvres[0], .03, '#efefea');
    for (let y = M.louvres[0] + .04; y < M.louvres[1]; y += .06) add('louvre blade', u, y, .05, w - .04, .02, .02, '#d9d9d3');
    add('window frame', u, (b + t) / 2, .03, w, t - b, .03, '#efefea');
    add('window pane', u, (b + t) / 2, .046, w - .08, t - b - .08, .01, '#c3c7c6');
    for (const f of [.25, .5, .75]) add('window stile', l + w * f, (b + t) / 2, .052, .035, t - b - .08, .012, '#efefea');
  }
  add('sill ledge', width / 2, (M.sill[0] + M.sill[1]) / 2, .06, width, M.sill[1] - M.sill[0], .12, '#e6e3db');
  // Air-conditioning condensers on brackets below the windows.
  for (const c of M.condensers) {
    const [l, r] = c.u, [b, t] = c.h, step = (t - b) / c.stack;
    for (let k = 0; k < c.stack; k++) {
      const y = b + step * (k + .5);
      add('condenser', (l + r) / 2, y, .2, r - l, step - .04, .32, '#e9e9e4');
      add('condenser grille', (l + r) / 2 - (r - l) * .12, y, .365, Math.min(step, r - l) * .55, Math.min(step, r - l) * .55, .01, '#9da09d');
    }
    add('condenser bracket', (l + r) / 2, b - .03, .2, r - l, .04, .36, '#4a4a48');
  }
  // Ground floor: red-painted piers, beam, the 2.0 m five-foot way and its back wall.
  for (const [l, r] of M.piers) add('pier', (l + r) / 2, M.ceiling / 2, -.15, r - l, M.ceiling, .3, red);
  add('beam', width / 2, (M.ceiling + M.beam[1]) / 2, -.1, width, M.beam[1] - M.ceiling, .2, salmon);
  add('awning box', width / 2, (M.beam[0] + M.beam[1]) / 2, .08, width, M.beam[1] - M.beam[0], .16, '#d9d9d3');
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#5d4a42');
  add('five-foot way ceiling', width / 2, M.ceiling + .03, -D / 2, width - .04, .06, D, '#e4ddd4');
  add('back wall', width / 2, M.ceiling / 2, -D, width - .04, M.ceiling, .06, '#b34a3c');
  for (const u of [.02, width - .02]) add('five-foot way return', u, M.ceiling / 2, -(D + .3) / 2, .03, M.ceiling, D - .3, red);
  const wall = -D + .035;
  {
    const [l, r] = M.poster.u, [b, t] = M.poster.h;
    add('poster panel', (l + r) / 2, (b + t) / 2, wall, r - l, t - b, .02, '#f1ece2');
    add('poster picture', (l + r) / 2, (b + t) / 2 + .2, wall + .015, r - l - .2, (t - b) * .45, .01, '#9a6a45');
  }
  {
    const [l, r] = M.kiosks.u, [b, t] = M.kiosks.h;
    add('kiosk panel', (l + r) / 2, (b + t) / 2, wall, r - l, t - b, .02, '#c43a35');
    for (const f of [.27, .73]) add('kiosk screen', l + (r - l) * f, (b + t) / 2 + .05, wall + .03, (r - l) * .4, (t - b) * .7, .04, '#1d2733', .3);
  }
  {
    const [l, r] = M.door.u, t = M.door.top;
    add('doorway', (l + r) / 2, t / 2, wall, r - l, t, .02, '#1e1b1a');
    add('door frame', (l + r) / 2, t + .04, wall + .01, r - l + .1, .08, .03, '#c9a24a');
  }
  return {
    boxes,
    canopy: { ...M.canopy, from: 0, to: width },
    awning: { ...M.awning, from: .02, to: width - .02 },
    blade: { ...M.blade },
  };
}

export function liuDaMaReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'liu-da-ma', p: point(width / 2, 6.5), target: point(width / 2, 0), pitch: 16 },
    { id: 'liu-da-ma-blade', p: point(width * .85, 4.5), target: point(.1, .5), pitch: 22 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
