// June 2024 street elevation of Masjid Haji Mohd Salleh, 245 Geylang Road, measured on 10 October 2026
// by triangulating three Geylang Road panoramas. u runs east from the Chen Hing party wall along the
// source front, out towards the street (negative is behind the façade), heights above the façade base.
export const mosqueElevation = {
  // The photographed front is 20.3 m wide; the source front is 22.46 m, leaving a 2.16 m strip at the east.
  facade: 20.3, parapet: 15.8, height: 15.8,
  ground: { top: 2.8, openingTop: 2.45, piers: [[0, .5], [2.6, 3.1], [6.45, 7.06], [13.22, 13.8], [17.15, 17.78], [19.85, 20.3]] },
  // Cream recessed panels per storey, inside the orange frame.
  storeys: { second: [3.65, 6.63], third: [7.4, 10.48], fourth: [11.05, 14.1] },
  bays: [[3.4, 6.54], [7.12, 10.06], [10.22, 13.16], [13.74, 16.88]],
  centre: 10.14, windows: [5.26, 8.63, 11.65, 15.02], windowWidth: 1.48,
  second: { windows: [5.26, 15.02], width: 1.42, h: [3.7, 6.5], panel: [7.12, 13.16], arch: { radius: 2.27, base: 3.65 } },
  third: { h: [7.45, 10.13] },
  fourth: { h: [11.15, 13.74], fanBase: 13.74 },
  calligraphy: { u: [8.2, 12.05], h: [6.83, 7.31] },
  sign: { u: [17.3, 20.3], h: [2.95, 3.45] },
  screen: { u: [.5, 2.63], h: [7.05, 15.2] },
  stair: { u: [17.4, 19.85], h: [3.75, 15.1] },
  parapetBand: { from: 3.6, to: 16.9, h: [14.75, 15.05], step: .56 },
  // Roof features stand behind the parapet: the towers about 2.5 m back, the gable about 4.8 m back.
  // The west tower is photographed centred about 1.0 m from the west wall; it is drawn 1.45 m further east
  // because the source outline's west wall runs back about 10 degrees off square to the source front.
  towers: [{ u: 2.45, script: 'محمد' }, { u: 18.82, script: 'الله' }],
  tower: { size: 2.95, setback: 2.5, top: 19.95, medallion: { y: 18.3, radius: 1.0 }, dome: { radius: 1.1, rise: 1.4 } },
  gable: { setback: 4.8, back: 17, peak: 22.1, eaves: 15.5, halfWidth: 6.83, vent: { base: 18.95, radius: 1.0 } },
  colours: {
    orange: '#e08a5a', cream: '#e3dccb', frame: '#557e78', glass: '#33474a', screen: '#3f5f5c', fin: '#5d8f86',
    stairFin: '#2f6a62', letters: '#3f8c84', roof: '#b9673d', tower: '#e6e0cf', dome: '#d8c79c', gold: '#c9a64b',
  },
};

/** Boxes in the frontage frame: { name, u, y, out, w, h, depth, colour }. */
export function mosqueLayout() {
  const M = mosqueElevation, C = M.colours, boxes = [];
  const add = (name, u, y, out, w, h, depth, colour) => boxes.push({ name, u, y, out, w, h, depth, colour });
  const mid = (a, b) => (a + b) / 2;

  // Ground floor: orange piers, dark openings with roller-shutter boxes, the stair door and signboard.
  const G = M.ground;
  for (const [l, r] of G.piers) add('ground pier', mid(l, r), mid(.15, G.top), .12, r - l, G.top - .15, .24, C.orange);
  for (let i = 0; i < G.piers.length - 1; i++) {
    const l = G.piers[i][1], r = G.piers[i + 1][0];
    add('ground opening', mid(l, r), mid(.15, G.openingTop), -.25, r - l, G.openingTop - .15, .04, '#363c3a');
    add('shutter box', mid(l, r), G.openingTop + .15, -.1, r - l, .3, .3, '#e4e4de');
  }
  // Slatted shutters either side of the open main doorway, and over the east bay.
  for (const [l, r] of [[7.06, 9.55], [10.95, 13.22], [13.8, 17.15]]) {
    for (let y = 1.0; y < G.openingTop - .05; y += .12) add('shutter slat', mid(l, r), y, -.2, r - l, .05, .03, '#b9bcb6');
  }
  add('main doorway', mid(9.55, 10.95), mid(.15, 2.3), -.22, 1.4, 2.15, .03, '#1d2322');
  for (const [l, r] of [[.5, 2.6], [3.1, 6.45]]) add('planter wall', mid(l, r), .55, .12, r - l, .8, .2, '#efefe9');
  add('stair door', 18.8, 1.2, -.22, .95, 2.1, .04, '#5e4a3a');
  add('signboard', mid(...M.sign.u), mid(...M.sign.h), .2, M.sign.u[1] - M.sign.u[0], M.sign.h[1] - M.sign.h[0], .08, '#1f3326');

  // Cream recessed panels: four bays on the upper storeys; the second storey joins the middle bays.
  const S = M.storeys;
  for (const [l, r] of [M.bays[0], M.bays[3]]) add('cream panel', mid(l, r), mid(...S.second), .005, r - l, S.second[1] - S.second[0], .02, C.cream);
  for (const storey of [S.third, S.fourth]) for (const [l, r] of M.bays) add('cream panel', mid(l, r), mid(...storey), .005, r - l, storey[1] - storey[0], .02, C.cream);

  // Windows: cream architraves, teal frames, a mullion and transoms.
  const window = (c, w, [b, t], transoms) => {
    add('window surround', c, mid(b, t), .06, w + .24, t - b + .12, .08, '#f1ece0');
    add('window glazing', c, mid(b, t), .1, w, t - b, .02, C.glass);
    for (const u of [c - w / 2 + .03, c, c + w / 2 - .03]) add('window frame', u, mid(b, t), .12, .06, t - b, .03, C.frame);
    for (const y of [b + .03, ...transoms, t - .03]) add('window rail', c, y, .12, w, .05, .03, C.frame);
    add('window sill', c, b - .06, .14, w + .34, .08, .2, '#f1ece0');
  };
  for (const c of M.second.windows) window(c, M.second.width, M.second.h, [5.6]);
  for (const c of M.windows) window(c, M.windowWidth, M.third.h, [8.35, 9.25]);
  for (const c of M.windows) window(c, M.windowWidth, M.fourth.h, [12.3, 13.4]);

  // Side bays: a louvred green screen at the west, open stair fins at the east.
  const W = M.screen;
  add('green screen', mid(...W.u), mid(...W.h), .02, W.u[1] - W.u[0], W.h[1] - W.h[0], .04, C.screen);
  for (let i = 1; i < 8; i++) add('screen fin', W.u[0] + (W.u[1] - W.u[0]) * i / 8, mid(...W.h), .06, .06, W.h[1] - W.h[0], .14, C.fin);
  for (const y of [10.76, 14.0]) add('screen rail', mid(...W.u), y, .06, W.u[1] - W.u[0], .08, .14, '#2e4a47');
  const T = M.stair;
  add('stair recess', mid(...T.u), mid(...T.h), -.6, T.u[1] - T.u[0], T.h[1] - T.h[0], .04, '#424d4b');
  for (const y of [7.0, 10.76, 14.4]) add('stair landing', mid(...T.u), y, -.3, T.u[1] - T.u[0], .3, .6, C.orange);
  for (let i = 0; i <= 8; i++) add('stair fin', T.u[0] + .1 + (T.u[1] - T.u[0] - .2) * i / 8, mid(...T.h), .05, .07, T.h[1] - T.h[0], .2, C.stairFin);

  // Parapet: a row of small cream recesses, a projecting cornice and corner caps.
  const P = M.parapetBand;
  for (let u = P.from + .15; u < P.to; u += P.step) add('parapet recess', u, mid(...P.h), .01, .3, P.h[1] - P.h[0], .02, C.cream);
  add('parapet cornice', M.facade / 2, 15.65, .12, M.facade, .12, .24, '#e9dcc4');
  add('parapet coping', M.facade / 2, M.parapet - .04, .02, M.facade, .08, .2, C.orange);
  for (const u of [.3, M.facade - .3]) add('corner cap', u, M.parapet + .12, .05, .6, .24, .4, '#e9dcc4');
  for (const u of [6.8, 13.45]) add('parapet console', u, 15.4, .14, .22, .3, .2, '#e9dcc4');
  return boxes;
}

