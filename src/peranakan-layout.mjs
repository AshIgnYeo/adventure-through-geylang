// Conserved two-storey Peranakan shophouses of the Lorong 11 west row (Nos. 19 and 21 measured from
// April 2024 panoramas). Each house supplies its colours, ground floor and signs.
import { frontageFrame } from './gable-roof-layout.mjs';

export const peranakan = {
  height: 8.17, ridgeHeight: 10.1, ridgeDepth: .45, eavesOverhang: .4, frontEdge: 0, fiveFootWay: 1.8,
  windows: [[.76, 1.69], [2.04, 2.97], [3.33, 4.33]], shutters: [5.2, 6.46], fanlight: [6.46, 6.96],
  pilasters: [[.07, .7], [1.69, 2.04], [2.97, 3.33], [4.33, 4.8]], tiles: [4.53, 4.96],
  cornice: [7.03, 8.03], floorBand: [3.9, 4.3], beam: [3.25, 3.6], ceiling: 3.25,
};

export const peranakanFrame = poly => frontageFrame(poly, peranakan.frontEdge);

/**
 * Upper storey, cornice, floor band, beam, piers and the five-foot way shell. A house may give its own
 * window, pilaster and pier positions (`bays`), and full-height French windows by index (`full`).
 */
export function peranakanLayout(width, colours, bays = {}) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = { ...peranakan, ...bays }, D = E.fiveFootWay, { wall, trim, shutter, frame } = colours, mid = (a, b) => (a + b) / 2;
  const full = new Set(bays.full ?? []);
  const [cb, ct] = E.cornice, top = E.cornice[0];
  add('upper wall', width / 2, mid(E.floorBand[1], top), -.05, width, top - E.floorBand[1], .04, wall);
  for (const [l, r] of E.pilasters) {
    add('pilaster', mid(l, r), mid(E.floorBand[1], top), .05, r - l, top - E.floorBand[1], .1, trim);
    add('pilaster capital', mid(l, r), top - .2, .1, r - l + .06, .3, .16, trim);
    add('pilaster tile strip', mid(l, r), mid(E.tiles[0], E.fanlight[1]), .105, Math.max(.08, (r - l) * .3), E.fanlight[1] - E.tiles[0], .01, '#d8a6a9');
  }
  E.windows.forEach(([l, r], i) => {
    const u = mid(l, r), w = r - l, S = full.has(i) ? [E.tiles[0], E.shutters[1]] : E.shutters;
    add('window reveal', u, mid(S[0], E.fanlight[1]), -.02, w, E.fanlight[1] - S[0], .04, '#2d3335');
    for (const k of [0, 1]) {
      add('louvred shutter', l + w * (k + .5) / 2, mid(...S), .005, w / 2 - .03, S[1] - S[0], .03, shutter);
      for (let y = S[0] + .12; y < S[1] - .06; y += .09) add('shutter louvre', l + w * (k + .5) / 2, y, .025, w / 2 - .12, .03, .02, frame);
    }
    add('fretwork fanlight', u, mid(...E.fanlight), -.0, w - .04, E.fanlight[1] - E.fanlight[0], .02, frame);
    add('arched window head', u, E.fanlight[1] + .07, .06, w + .14, .14, .12, trim);
    add('window frame', u, mid(S[0], E.fanlight[1]), .03, w + .08, .06, .04, frame);
    if (full.has(i)) return;
    add('tile panel', u, mid(...E.tiles), .04, w, E.tiles[1] - E.tiles[0], .02, '#f0e4dc');
    for (let x = l + .1; x < r - .04; x += .15) add('tile flower', x, mid(...E.tiles), .055, .09, .09, .01, '#c4505e');
    add('sill', u, E.tiles[1] + .05, .08, w + .12, .07, .16, trim);
  });
  add('cornice', width / 2, mid(cb, ct), .14, width, ct - cb, .28, trim);
  for (let u = .12; u < width; u += .26) add('dentil', u, cb + .08, .3, .1, .14, .08, wall);
  add('floor band', width / 2, mid(...E.floorBand), .1, width, E.floorBand[1] - E.floorBand[0], .2, trim);
  add('beam', width / 2, mid(...E.beam), .02, width, E.beam[1] - E.beam[0], .12, wall);
  for (const [l, r] of E.piers ?? [[0, .58], [width - .55, width]]) add('pier', mid(l, r), E.ceiling / 2, -.18, r - l, E.ceiling, .36, trim);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#b9a48a');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#e9e6de');
  add('back wall', width / 2, E.ceiling / 2, -D, width - .04, E.ceiling, .06, wall);
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, trim);
  return { boxes, add, D, back: -D + .04 };
}

export const facingReviews = (frame, id) => [{ id, p: frame.point(frame.width / 2, 8.2), target: frame.point(frame.width / 2, 0), pitch: 18 }]
  .map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
