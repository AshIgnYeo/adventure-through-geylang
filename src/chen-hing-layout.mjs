// June 2024 street exterior of No. 241 Geylang Road. Only the source footprint west of the mosque is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const chenHing = {
  id: 'chen-hing', buildingIds: ['475158359'], kind: 'chen-hing',
  name: 'Chen Hing Trading 增興貿易 (June 2024 exterior)', address: '241 Geylang Road',
  height: 10.0, rearHeight: 6.7, frontDepth: 6, frontEdge: 2, fiveFootWay: 1.8, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists CHEN HING TRADING PTE. LTD., a general store, at 241 Geylang Rd, Singapore 389296, open in October 2026; its place point lies inside the unnumbered source way directly west of Masjid Haji Mohd Salleh (No. 245). June 2024 Street View shows the grey-tiled three-storey block between the mosque and the pink building of Geylang Lor 9 Beef Kway Teow (listed at No. 237), with ribbon windows under louvred hoods on both upper floors and raised gold lettering reading 增興貿易私人有限公司 / CHEN HING TRADING PTE. LTD. over a red awning and an open fruit and sundries stall. The three panoramas on this stretch disagree with the source frame by about 3 m in depth and 1.5 m along the street; with that offset removed from the square-on panorama, renders of the existing mosque model and of this source frontage align with the photograph, and the photographed frontage matches the 10.08 m source edge. Heights are read on that corrected frame from the five-foot-way floor. The rear wing keeps the 6.7 m height of the reviewed back-lane elevation; the 6 m depth of the three-storey front block is estimated. The awning keeps its photographed height but is shortened to 0.7 m, because the source front lies close to the modelled carriageway. Stock, umbrellas and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Chen+Hing+Trading+241+Geylang+Road',
    'https://www.openstreetmap.org/way/475158359',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=SE7V8xC8dISjOl-1xdIR9A&heading=335&pitch=12&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=kbMaxdnGfSxxcW_ZWuryZw&heading=345&pitch=18&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=ZvONx9MbvuKGcqhHe87DTQ&heading=300&pitch=12&fov=100',
  ],
};

// u runs from the west party line (No. 237 side) to the mosque; out runs south to Geylang Road.
export const chenHingFrame = poly => frontageFrame(poly, chenHing.frontEdge);

// The three-storey front block, ending at its estimated depth on each slanted party wall.
export function chenHingFrontBlock(frame, depth = chenHing.frontDepth) {
  const along = (p, q) => {
    const v = [q[0] - p[0], q[1] - p[1]], t = depth / -(v[0] * frame.nx + v[1] * frame.nz);
    return [p[0] + v[0] * t, p[1] + v[1] * t];
  };
  return [frame.a, frame.b, along(frame.b, frame.rearB), along(frame.a, frame.rearA)];
}

// Measured on the corrected square-on frame, metres from the west line and above the five-foot-way floor.
export const elevation = {
  upper: { h: [6.61, 7.83], u: [[.65, 3.26], [3.7, 6.48], [6.95, 9.84]] },
  lower: { h: [3.89, 5.06], u: [[.56, 3.15], [3.64, 6.41], [6.89, 9.78]] },
  upperHood: [7.83, 8.48], lowerHood: [5.06, 5.5], lowerLedge: [5.5, 5.72],
  fascia: [2.56, 3.89], ledge: [2.44, 2.56], ceiling: 2.44,
  chinese: { u: [1.4, 8.13], h: [3.1, 3.67] }, english: { u: [1.18, 8.43], h: [2.55, 3.0] },
  // The photographed slope runs to 1.61 m; its depth is shortened to stay clear of the modelled carriageway.
  awning: { from: .1, to: 8.6, wall: 2.44, front: 1.95, depth: .7, valance: .22 },
  piers: [[.08, .3], [9.72, 10.06]],
};

export function chenHingLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = chenHing.fiveFootWay, tile = '#a9aaa5', bronze = '#6b5a44';

  add('parapet coping', width / 2, chenHing.height - .04, .03, width, .08, .1, '#9c9d98');
  // Ribbon windows: three bronze-framed groups per floor, with paired mullions.
  for (const key of ['upper', 'lower']) {
    const { h: [b, t], u } = E[key], mid = (b + t) / 2;
    for (const [l, r] of u) {
      add('window reveal', (l + r) / 2, mid, -.02, r - l, t - b, .04, '#2a2c2c');
      add('window glazing', (l + r) / 2, mid, .005, r - l - .06, t - b - .06, .01, key === 'lower' ? '#6e6a5f' : '#3b4246');
      const panes = 4;
      for (let i = 0; i <= panes; i++) add('window mullion', l + .03 + (r - l - .06) * i / panes, mid, .015, .045, t - b - .04, .02, bronze);
      add('window rail', (l + r) / 2, b + .03, .015, r - l, .045, .02, bronze);
    }
  }
  // Louvred hoods over each floor of windows, and the thin white ledge over the lower hood.
  for (const [name, [b, t], depth] of [['upper hood', E.upperHood, .45], ['lower hood', E.lowerHood, .35]]) {
    add(`${name} board`, width / 2, t - .04, depth / 2, width - .3, .08, depth, '#8b8c87');
    for (let y = b + .05; y < t - .06; y += .09) add(`${name} louvre`, width / 2, y, depth - .03, width - .3, .04, .05, '#4b3e33');
  }
  add('lower ledge', width / 2, (E.lowerLedge[0] + E.lowerLedge[1]) / 2, .2, width - .3, E.lowerLedge[1] - E.lowerLedge[0], .4, '#e4e3dd');
  // Tiled fascia over the stall, with its white ledge.
  add('fascia', width / 2, (E.fascia[0] + E.fascia[1]) / 2, .02, width, E.fascia[1] - E.fascia[0], .06, tile);
  add('fascia ledge', width / 2, (E.ledge[0] + E.ledge[1]) / 2, .08, width, E.ledge[1] - E.ledge[0], .16, '#e9e8e2');
  for (let x = .25; x < width; x += .25) add('tile joint', x, 9.2, .005, .012, 1.6, .01, '#97988f');

  // Five-foot way and the open stall behind it.
  for (const [l, r] of E.piers) add('pier', (l + r) / 2, E.ceiling / 2, -.15, r - l, E.ceiling, .3, tile);
  // The west party wall slants about 0.11 m inwards per metre, so the five-foot way starts 0.25 m in.
  const w0 = .25, fw = width - w0 - .02, fu = w0 + fw / 2;
  add('five-foot way floor', fu, .04, -D / 2, fw, .08, D, '#8f8a80');
  add('five-foot way ceiling', fu, E.ceiling + .03, -D / 2, fw, .06, D, '#d8d6cf');
  add('back wall', fu, E.ceiling / 2, -D, fw, E.ceiling, .06, '#3a3532');
  for (const u of [w0, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, tile);
  // Approximate stall: low crates of produce along the frontage, and hanging goods behind.
  for (let u = .7; u < 8.4; u += 1.25) {
    add('display crate', u, .32, .25, 1.05, .5, .55, ['#b64a3e', '#7c8a3c', '#c79a3a', '#596f8e'][Math.round(u) % 4]);
    add('crate stand', u, .08, .25, 1.0, .12, .5, '#d8c96a');
  }
  for (let u = 1.0; u < 9.5; u += .6) add('hanging goods', u, 1.9, -D + .35, .4, .7, .1, ['#5d4c7a', '#3e6a8c', '#9a3b3b', '#d1c7b0'][Math.round(u * 5) % 4]);
  return {
    boxes,
    chinese: { left: E.chinese.u[0], right: E.chinese.u[1], bottom: E.chinese.h[0], top: E.chinese.h[1], out: .06 },
    english: { left: E.english.u[0], right: E.english.u[1], bottom: E.english.h[0], top: E.english.h[1], out: .06 },
    awning: { ...E.awning },
  };
}

export function chenHingReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'chen-hing', p: point(width / 2, 9), target: point(width / 2, 0), pitch: 20 },
    { id: 'chen-hing-oblique', p: point(-6, 6), target: point(width * .6, 0), pitch: 14 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
