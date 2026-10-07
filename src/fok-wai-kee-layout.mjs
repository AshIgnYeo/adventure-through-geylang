// June 2024 street exterior of No. 104 Sims Avenue. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const fokWaiKee = {
  id: 'fok-wai-kee', buildingIds: ['682928754'], kind: 'fok-wai-kee',
  name: 'Fok Wai Kee Hardware (June 2024 exterior)', address: '104 Sims Avenue',
  height: 9.9, frontEdge: 0, fiveFootWay: 1.9, reviewRoad: 'Sims Avenue',
  evidence: 'Google Maps lists Fok Wai Kee Hardware at 104 Sims Ave, Singapore 387428, with current opening hours; its place point lies inside the source way tagged No. 104 with three levels. June 2024 Street View shows the white three-storey Art Deco frontage with a stepped parapet and scrolled shoulders, a wide central window with narrow side windows under projecting hoods on each upper floor, a dark canopy over the five-foot way, and a cream 霍惠記銅鐵 FOK WAI KEE HARDWARE № 104 signboard over the shop. Heights were measured from one square-on frame scaled by the 6.29 m frontage and cross-checked against the neighbouring Amrise parapet; horizontal positions came from a second frame. The window composition is centred about 0.3 m east of the source frontage centre. Stock, people and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Fok+Wai+Kee+Hardware+104+Sims+Avenue',
    'https://www.openstreetmap.org/way/682928754',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=-vjbkWOXAP_tX2wp_eg-4w&heading=161.5&pitch=15&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=-vjbkWOXAP_tX2wp_eg-4w&heading=150&pitch=22&fov=85',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=-vjbkWOXAP_tX2wp_eg-4w&heading=156&pitch=4&fov=16',
  ],
};

// u runs from the No. 106 (east) side to the No. 102 side; out runs north to Sims Avenue.
export const fokWaiKeeFrame = poly => frontageFrame(poly, fokWaiKee.frontEdge);

// Measured, metres. Windows: [left, right, bottom, top].
export const elevation = {
  windows: [[.85, 1.5, 3.9, 5.6], [2.5, 4.56, 4.02, 5.9], [5.38, 5.98, 3.9, 5.6],
    [.9, 1.5, 6.6, 8.1], [2.46, 4.5, 6.65, 8.38], [5.3, 5.94, 6.6, 8.1]],
  hoods: [[.7, 1.65, 5.95], [2.25, 4.8, 6.43], [5.22, 6.12, 5.95], [.75, 1.65, 8.6], [2.25, 4.75, 8.99], [5.15, 6.1, 8.6]],
  shoulders: [1.64, 5.22, 11.0], crown: [2.42, 4.58, 12.0],
  canopy: { wall: 3.48, front: 3.12, depth: 1.0 },
};

export function fokWaiKeeLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const E = elevation, D = fokWaiKee.fiveFootWay, white = '#ecebe5', shade = '#d4d3cc', frame = '#3b3e40';

  for (const [l, r, b, t] of E.windows) {
    const u = (l + r) / 2, w = r - l, mid = (b + t) / 2, h = t - b;
    add('window reveal', u, mid, -.02, w, h, .04, '#2d3134');
    add('window glazing', u, mid, .005, w - .08, h - .08, .01, '#4c565c');
    const panes = w > 1.5 ? 4 : 2;
    for (let i = 0; i <= panes; i++) add('window frame', l + .04 + (w - .08) * i / panes, mid, .015, .04, h - .08, .02, frame);
    for (const y of [b + .04, t - .04]) add('window rail', u, y, .015, w, .04, .02, frame);
    add('window sill', u, b - .05, .06, w + .1, .06, .12, shade);
  }
  for (const [l, r, top] of E.hoods) add('window hood', (l + r) / 2, top - .08, .27, r - l, .16, .55, white);

  // Stepped parapet: side parapet on the wall line, scrolled shoulders and crown.
  add('parapet coping', width / 2, fokWaiKee.height + .04, .02, width, .08, .14, shade);
  const [s0, s1, sTop] = E.shoulders, [c0, c1, cTop] = E.crown;
  add('parapet shoulder', (s0 + s1) / 2, (fokWaiKee.height + sTop) / 2, -.03, s1 - s0, sTop - fokWaiKee.height, .2, white);
  add('parapet crown', (c0 + c1) / 2, (sTop + cTop) / 2, -.03, c1 - c0, cTop - sTop, .2, white);
  for (const [u, y, dir] of [[s0, sTop, -1], [s1, sTop, 1], [c0, cTop, -1], [c1, cTop, 1]]) {
    add('parapet scroll', u + dir * .12, y - .14, -.03, .34, .28, .24, white);
    add('parapet scroll curl', u + dir * .26, y - .2, -.03, .16, .16, .24, shade, 0, 45);
    add('parapet scroll cap', u + dir * .06, y + .03, .0, .46, .06, .3, shade);
  }
  for (const y of [3.62, 6.52]) add('floor band', width / 2, y, .02, width, .1, .06, shade);

  // Five-foot way: canopy beam, end piers and two slim front columns.
  add('five-foot way floor', width / 2, .08, -D / 2, width - .1, .08, D, '#a5a39b');
  add('five-foot way ceiling', width / 2, 3.08, -D / 2, width - .1, .08, D, '#e2e1db');
  add('canopy beam', width / 2, 3.2, -.08, width, .22, .2, white);
  for (const [u, w] of [[.2, .4], [width - .17, .34]]) add('party pier', u, 1.55, -.3, w, 3.1, .6, white);
  for (const u of [1.8, 5.55]) add('front column', u, 1.55, -.12, .24, 3.1, .24, shade);
  add('back wall', width / 2, 1.55, -D, width - .1, 3.1, .06, '#d9d8d1');
  for (const [l, r] of [[1.08, 2.2], [2.2, 3.3]]) {
    add('collapsible gate', (l + r) / 2, 1.3, -D + .05, r - l - .04, 2.4, .03, '#3c4a5e');
    for (let i = 0; i < 7; i++) add('gate lattice', l + .08 + (r - l - .16) * i / 6, 1.3, -D + .07, .025, 2.4, .01, '#c6c8c4');
  }
  add('grilled side window', .74, 1.45, -D + .05, .6, 1.9, .03, '#2f3a48');
  for (let i = 0; i < 6; i++) add('side window bar', .48 + i * .1, 1.45, -D + .07, .02, 1.9, .01, '#d5d6d2');
  add('shop opening', 4.67, 1.2, -D + .04, 2.3, 2.2, .02, '#2a2523');
  add('sign backing', 4.67, 2.7, -D + .04, 2.34, .66, .04, '#b59a52');
  return {
    boxes,
    sign: { left: 3.51, right: 5.83, bottom: 2.4, top: 3.0, out: -D + .065 },
    canopy: { left: .02, right: width - .02, back: .02, front: E.canopy.depth, top: E.canopy.wall, bottom: E.canopy.front },
  };
}

export function fokWaiKeeReviews(frame) {
  const { point } = frame;
  return [
    { id: 'fok-wai-kee', p: point(3.3, 9.2), target: point(3.3, 0), pitch: 22 },
    { id: 'fok-wai-kee-shop', p: point(4.4, 4.4), target: point(4.4, -1.6), pitch: 6 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
