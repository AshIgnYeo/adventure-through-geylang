// April 2024 street exterior of No. 1 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const barLorong13 = {
  id: 'bar-lorong-13', buildingIds: ['1223773758'], kind: 'bar-lorong-13',
  name: 'Bar @ Lorong 13, No. 1 Lorong 13 (April 2024 exterior)', address: '1 Lorong 13 Geylang (the bar at 1A)',
  height: 8.45, towerHeight: 9.14, frontEdge: 0, fiveFootWay: 2.0, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists Bar @ Lorong 13 at 1A Lor 13 Geylang, Singapore 388674, open in October 2026; Koh Hwee Cheng is listed at No. 1 and is not assigned, and the River Ash Bakery point that falls in this way is excluded, as recorded for No. 3. April 2024 Street View shows the white three-storey Art Deco block plated 1 at the Geylang Road end of the lorong: two wings with steel-framed windows under louvred vents and thin cantilevered eaves, either side of a stair tower with paired slit windows, a scalloped bracket and a cap lettered 協華大厦. A yellow BAR@LORONG13 sign in tube lettering spans the north wing over the bar; the south bay holds a restaurant signed 忆滋味. The source way, tagged No. 1, carries no other address. Measured from one square-on frame scaled by the 12.36 m source frontage, which the photographed frontage matches to within about 2%. Posters, the Guinness sign, furniture and interiors are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Bar+%40+Lorong+13+1A+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223773758',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=FXTw5jMQr6bKoFFGgqyVkw&heading=251.4&pitch=0&fov=110',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=f-IHSXdP88-BA3LwDO6R0Q&heading=230&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=pE_LD86BSAb8LSBZLrANuA&heading=290&pitch=10&fov=90',
  ],
};

// u runs from the south end (towards Geylang Road) to the No. 3 party line; out runs east to Lorong 13.
export const barLorong13Frame = poly => frontageFrame(poly, barLorong13.frontEdge);

// Measured, metres, above the five-foot-way floor. Wings and tower as [left, right] in u.
export const elevation = {
  south: [0, 4.47], tower: [4.47, 7.35], north: [7.35, 12.36],
  pilasters: [[0, .59], [11.81, 12.36]], towerFrame: [5.02, 7.0],
  windows: {
    lower: { h: [3.75, 4.65], u: [[.9, 2.24], [2.8, 4.16], [7.85, 9.36], [9.91, 11.4]] },
    upper: { h: [6.25, 7.2], u: [[.81, 2.27], [2.74, 4.18], [7.76, 9.31], [9.8, 11.32]] },
  },
  vents: { lower: [4.8, 5.15], upper: [7.4, 7.7] },
  slits: { u: [[5.51, 5.85], [6.08, 6.41]], lower: [3.8, 4.6], upper: [6.25, 7.05], vents: [[4.79, 5.04], [7.26, 7.55]] },
  ledges: [[3.6, 3.72], [5.3, 5.42], [6.1, 6.22]], eave: { h: [8.45, 8.6], depth: .9 },
  cap: { h: [9.14, 9.28], depth: .5 }, lettering: { u: [5.0, 6.81], h: [8.08, 8.67] },
  ceiling: 2.5, beam: [2.5, 2.67], piers: [[4.72, 5.25], [7.0, 7.47]],
  sign: { u: [7.76, 11.65], h: [2.67, 3.73] },
  bracket: { u: [5.0, 6.82], h: [2.75, 3.6] },
};

export function barLorong13Layout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const E = elevation, D = barLorong13.fiveFootWay, white = '#ecebe6', shade = '#d7d6d0', steel = '#46504c', H = barLorong13.height;

  // Full-height end pilasters and the raised stair tower.
  for (const [l, r] of E.pilasters) add('pilaster', (l + r) / 2, (E.ceiling + H) / 2, .06, r - l, H - E.ceiling, .12, white);
  add('tower front', (E.tower[0] + E.tower[1]) / 2, (E.ceiling + barLorong13.towerHeight) / 2, .05, E.tower[1] - E.tower[0], barLorong13.towerHeight - E.ceiling, .1, white);
  add('tower frame', (E.towerFrame[0] + E.towerFrame[1]) / 2, (E.ledges[0][1] + 8.0) / 2, .11, E.towerFrame[1] - E.towerFrame[0], 8.0 - E.ledges[0][1], .04, shade);
  const capW = E.tower[1] - E.tower[0] + .4, capU = (E.tower[0] + E.tower[1]) / 2;
  add('tower cap', capU, (E.cap.h[0] + E.cap.h[1]) / 2, E.cap.depth / 2, capW, E.cap.h[1] - E.cap.h[0], E.cap.depth + .1, shade);
  add('tower parapet panel', (E.lettering.u[0] + E.lettering.u[1]) / 2, (E.lettering.h[0] + E.lettering.h[1]) / 2, .12, E.lettering.u[1] - E.lettering.u[0] + .2, E.lettering.h[1] - E.lettering.h[0] + .14, .03, '#e3e2dc');

  // Steel-framed windows of three by four panes, under louvred vents, on both upper floors of each wing.
  for (const [floor, vent] of [['lower', E.vents.lower], ['upper', E.vents.upper]]) {
    const { h: [b, t], u } = E.windows[floor];
    for (const [l, r] of u) {
      const c = (l + r) / 2, w = r - l, mid = (b + t) / 2;
      add('window reveal', c, mid, .0, w, t - b, .04, '#2f3735');
      add('window glazing', c, mid, .03, w - .06, t - b - .06, .01, '#9fb0ad');
      for (let i = 0; i <= 4; i++) add('window mullion', l + .03 + (w - .06) * i / 4, mid, .04, .035, t - b - .04, .02, steel);
      for (let i = 0; i <= 3; i++) add('window transom', c, b + .03 + (t - b - .06) * i / 3, .04, w - .04, .03, .02, steel);
      add('window sill', c, b - .04, .06, w + .08, .05, .12, shade);
      for (let y = vent[0] + .04; y < vent[1]; y += .075) add('vent louvre', c, y, .04, w - .04, .03, .04, '#bcbcb5');
      add('vent frame', c, (vent[0] + vent[1]) / 2, .01, w + .04, vent[1] - vent[0] + .06, .02, shade);
    }
  }
  // Paired slit windows on each tower floor, each under its own small vent.
  for (const [k, key] of [[0, 'lower'], [1, 'upper']]) {
    const [b, t] = E.slits[key], [vb, vt] = E.slits.vents[k];
    for (const [l, r] of E.slits.u) {
      const c = (l + r) / 2, w = r - l;
      add('slit window', c, (b + t) / 2, .12, w, t - b, .03, '#2f3735');
      add('slit glazing', c, (b + t) / 2, .14, w - .06, t - b - .06, .01, '#9fb0ad');
      for (let i = 1; i < 4; i++) add('slit transom', c, b + (t - b) * i / 4, .15, w - .04, .025, .01, steel);
      for (let y = vb + .03; y < vt; y += .07) add('slit vent louvre', c, y, .14, w, .025, .03, '#bcbcb5');
    }
  }
  // Floor ledges across both wings, and the tower ledge with its scalloped bracket below.
  for (const [b, t] of E.ledges) for (const [l, r] of [E.south, E.north]) add('floor ledge', (l + r) / 2, (b + t) / 2, .09, r - l, t - b, .18, shade);
  add('tower ledge', capU, (E.ledges[0][0] + E.ledges[0][1]) / 2, .2, E.tower[1] - E.tower[0] + .1, E.ledges[0][1] - E.ledges[0][0] + .04, .3, shade);
  {
    const { u: [l, r], h: [b, t] } = E.bracket, c = (l + r) / 2, half = (r - l) / 2;
    add('bracket stem', c, (b + t) / 2, .14, .16, t - b, .2, white);
    for (const s of [-1, 1]) add('bracket sweep', c + s * half * .5, t - .22, .14, half * 1.1, .14, .2, white, 0, s * 22);
  }
  // Thin cantilevered eave slabs over each wing.
  for (const [l, r, extra] of [[E.south[0], E.south[1], -.15], [E.north[0], E.north[1], .15]]) {
    add('eave slab', (l + r) / 2 + extra / 2, (E.eave.h[0] + E.eave.h[1]) / 2, E.eave.depth / 2, r - l + Math.abs(extra), E.eave.h[1] - E.eave.h[0], E.eave.depth, shade);
  }

  // Five-foot way: beam, piers, and three bays behind it.
  add('beam', width / 2, (E.beam[0] + E.beam[1]) / 2, -.05, width, E.beam[1] - E.beam[0], .14, white);
  for (const [l, r] of [...E.pilasters, ...E.piers]) add('pier', (l + r) / 2, E.ceiling / 2, -.2, r - l, E.ceiling, .4, white);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#b5b0a5');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#e7e5df');
  const back = -D + .04;
  add('back wall', width / 2, E.ceiling / 2, -D, width - .04, E.ceiling, .06, '#e6e3dc');
  // South bay: the restaurant's glazed front and small black 忆滋味 board.
  add('restaurant glazing', 2.4, 1.2, back, 3.2, 2.1, .02, '#3a3634');
  for (const u of [1.2, 2.0, 2.8, 3.6]) add('restaurant mullion', u, 1.2, back + .02, .04, 2.1, .02, '#5a4a3a');
  add('restaurant ledge', 2.4, .25, back + .2, 3.2, .45, .4, '#b98b5a');
  // Middle bay: the door plated 1 and a glazed door with blinds.
  add('timber door', 5.55, 1.1, back, .62, 2.1, .03, '#7a4a2c');
  add('door glazing', 5.55, 1.2, back + .02, .4, 1.6, .01, '#c8ccc8');
  add('glazed door', 6.4, 1.1, back, .6, 2.1, .03, '#6e4a33');
  add('door blind', 6.4, 1.2, back + .02, .45, 1.7, .01, '#dcdcd6');
  // North bay: the bar's timber-framed glazed front.
  add('bar glazing', 9.6, 1.15, back, 3.4, 2.0, .02, '#2b2a28');
  for (const u of [8.4, 9.6, 10.8]) add('bar door frame', u, 1.15, back + .02, .06, 2.0, .02, '#6b4228');
  add('bar transom', 9.6, 2.2, back + .02, 3.4, .06, .02, '#6b4228');
  return {
    boxes,
    sign: { left: E.sign.u[0], right: E.sign.u[1], bottom: E.sign.h[0], top: E.sign.h[1], out: .02 },
    lettering: { left: E.lettering.u[0], right: E.lettering.u[1], bottom: E.lettering.h[0], top: E.lettering.h[1], out: .14 },
    plate: { left: 6.72, right: 6.95, bottom: 1.85, top: 2.2, out: back + .02 },
    board: { left: 3.3, right: 3.85, bottom: 2.08, top: 2.42, out: back + .03 },
    wallText: { left: 11.6, right: 12.3, bottom: 1.5, top: 2.35, out: back + .02 },
  };
}

export function barLorong13Reviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'bar-lorong-13', p: point(width / 2, 6.2), target: point(width / 2, 0), pitch: 22 },
    { id: 'bar-lorong-13-oblique', p: point(-5, 5), target: point(width * .55, 0), pitch: 14 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
