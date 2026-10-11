// June 2024 street exterior of No. 118 Sims Avenue. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const fsl = {
  id: 'fsl-led-lighting', buildingIds: ['682928760'], kind: 'fsl-led-lighting',
  name: 'FSL EW LED Lighting (June 2024 exterior)', address: '118 Sims Avenue',
  height: 10.8, frontEdge: 4, fiveFootWay: 2.3, reviewRoad: 'Sims Avenue',
  evidence: 'Google Maps lists FSL EW LED Lighting, a lighting store, at 118 Sims Ave, open in October 2026, matching the source way tagged No. 118 with three levels; Hua Bian Assn and the Singapore Paper Merchants Association share the address and are not assigned. June 2024 Street View shows the stained three-storey frontage between Yap Sun Hardware (No. 120) and the ABC Bistro corner building (No. 116), with grey-framed windows under louvred vents on both upper floors, a red FSL LED LIGHTING blade sign on the No. 120 party line, an orange FSL disc sign on the pier, and a red FSL EW LED LIGHTING signboard and LED LIGHTING lettering on the shop front of an open lighting shop. Three panoramas rectified onto the façade agree when the real wall stands about 3.25 m in front of the source front; at that depth the photographed frontage runs about 0.5 m inside the No. 120 line and ends on the No. 116 line, and heights are read from the five-foot-way floor. The signboard ends were triangulated on the shop front, about 2.3 m behind the piers. The model keeps the source front, like its modelled neighbours on this row. Displays, stock and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=FSL+EW+LED+Lighting+118+Sims+Avenue',
    'https://www.openstreetmap.org/way/682928760',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=u8Gt4GPB01nNd4_FoWchUQ&heading=170&pitch=14&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=2Ajok7bnMLxnkcW7PuS2sQ&heading=200&pitch=12&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=GSi02rgoddx_BEQoQuw5bw&heading=125&pitch=5&fov=80',
  ],
};

// u runs from the No. 120 (east) party line to the No. 116 side; out runs north to Sims Avenue.
export const fslFrame = poly => frontageFrame(poly, fsl.frontEdge);

// Measured on the rectified façade, metres from the No. 120 line and above the five-foot-way floor.
export const elevation = {
  frontage: [.49, 6.72],
  windows: [
    { u: [.92, 3.06], h: [4.69, 6.09] }, { u: [4.13, 6.16], h: [4.69, 6.09] },
    { u: [.84, 2.99], h: [7.95, 9.38] }, { u: [4.13, 6.2], h: [7.95, 9.38] },
  ],
  vents: [
    { u: [1.06, 2.99], h: [6.24, 6.59] }, { u: [4.2, 6.09], h: [6.24, 6.59] },
    { u: [1.0, 2.95], h: [9.59, 10.02] }, { u: [4.2, 6.1], h: [9.59, 10.02] },
  ],
  parapetBand: [10.52, 10.8], cornice: [6.81, 7.09], slab: [3.59, 3.88], beam: [3.17, 3.59],
  piers: [[.49, 1.06], [6.17, 6.72]], ceiling: 3.17,
  // The grille, signboard and lettering hang on the shop front at the back of the five-foot way:
  // the board ends were triangulated there, and the façade-plane readings reprojected to that depth.
  grille: { u: [.1, 6.62], h: [2.88, 3.15] }, sign: { u: [1.74, 4.54], h: [2.85, 3.12] },
  lettering: { u: [1.66, 4.93], h: [2.36, 2.81] },
  disc: { u: .75, h: 3.06, diameter: .5, out: .3 },
  blade: { u: .49, out: [.25, 1.05], h: [3.92, 6.78] },
};

export function fslLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = fsl.fiveFootWay, wall = '#dedad0', stain = '#b9b3a6', grey = '#a3a39c', [f0, f1] = E.frontage, fw = f1 - f0;

  add('parapet band', width / 2, (E.parapetBand[0] + E.parapetBand[1]) / 2, .06, width, E.parapetBand[1] - E.parapetBand[0], .12, '#d3cfc4');
  // Each upper floor: two windows in grey concrete surrounds, with louvred vents above.
  for (const { u: [l, r], h: [b, t] } of E.windows) {
    const u = (l + r) / 2, w = r - l, mid = (b + t) / 2, h = t - b;
    add('window surround', u, mid, .04, w, h, .08, grey);
    add('window glazing', u, mid, .085, w - .24, h - .24, .01, '#3d464b');
    for (const f of [0, .5, 1]) add('window frame', l + .12 + (w - .24) * f, mid, .095, .04, h - .24, .02, '#c9cbc8');
    for (const y of [b + .12, t - .12]) add('window rail', u, y, .095, w - .24, .04, .02, '#c9cbc8');
  }
  for (const { u: [l, r], h: [b, t] } of E.vents) {
    add('vent frame', (l + r) / 2, (b + t) / 2, .02, r - l, t - b, .04, '#c4c1b8');
    for (let y = b + .05; y < t - .03; y += .07) add('vent louvre', (l + r) / 2, y, .045, r - l - .08, .025, .03, '#7e807c');
  }
  // Projecting floor ledges with stained undersides.
  for (const [b, t] of [E.cornice, E.slab]) {
    add('floor ledge', width / 2, (b + t) / 2, .17, width, t - b, .34, '#d6d2c8');
    add('ledge underside stain', width / 2, b + .01, .17, width - .02, .02, .34, '#6a645b');
  }
  add('weathered wall streak', f0 + fw * .35, 5.2, .005, 1.1, 1.6, .01, stain);
  add('weathered wall streak', f0 + fw * .9, 8.4, .005, .7, 2.1, .01, stain);

  // Five-foot way: the beam over an ornamental grille, two piers and an open lighting shop.
  add('beam', width / 2, (E.beam[0] + E.beam[1]) / 2, -.05, width, E.beam[1] - E.beam[0], .14, wall);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#8d8a84');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#d9d6cd');
  for (const [l, r] of E.piers) add('pier', (l + r) / 2, E.ceiling / 2, -.2, r - l, E.ceiling, .4, l > width / 2 ? '#f1f1ee' : wall);
  for (let y = .25; y < E.ceiling; y += .25) add('pier tile joint', (E.piers[1][0] + E.piers[1][1]) / 2, y, .005, E.piers[1][1] - E.piers[1][0], .01, .01, '#c7c8c4');
  add('downpipe', .56, 5.25, .06, .1, 10.3, .1, '#ececea');
  add('back wall', width / 2, E.ceiling / 2, -D, width - .04, E.ceiling, .06, '#ece9e2');
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, wall);
  const back = -D + .04;
  {
    const { u: [l, r], h: [b, t] } = E.grille;
    add('grille transom', (l + r) / 2, (b + t) / 2, back, r - l, t - b, .03, '#3b2a24');
    for (let u = l + .12; u < r; u += .24) add('grille scroll', u, (b + t) / 2, back + .02, .03, t - b - .06, .02, '#7b4d36');
  }
  add('signboard backing', (E.sign.u[0] + E.sign.u[1]) / 2, (E.sign.h[0] + E.sign.h[1]) / 2, back + .05, E.sign.u[1] - E.sign.u[0] + .04, E.sign.h[1] - E.sign.h[0] + .03, .03, '#8c1f1f');
  add('lettering fascia', (E.lettering.u[0] + E.lettering.u[1]) / 2, (E.lettering.h[0] + E.lettering.h[1]) / 2, back, E.lettering.u[1] - E.lettering.u[0] + .3, E.lettering.h[1] - E.lettering.h[0] + .12, .03, '#262626');
  // Approximate display boards of round fittings, a red display cabinet and the open shop door.
  for (const [u, w] of [[1.7, .9], [2.75, 1.0]]) {
    add('display board', u, 1.35, back, w, 1.5, .03, '#f4f3ef');
    for (let i = 0; i < 6; i++) add('round fitting', u - w / 2 + .18 + (i % 3) * (w - .36) / 2, 1.85 - Math.floor(i / 3) * .55, back + .03, .22, .22, .03, '#fdfdf8', .2);
  }
  add('red display cabinet', 4.55, 1.05, back + .05, .55, 1.9, .12, '#b8312c');
  for (let i = 0; i < 4; i++) add('cabinet fitting', 4.55, .5 + i * .42, back + .12, .28, .28, .02, '#f1ece6', .2);
  add('shop doorway', 5.55, 1.2, back, 1.0, 2.2, .02, '#2c2a28');
  return {
    boxes,
    sign: { left: E.sign.u[0], right: E.sign.u[1], bottom: E.sign.h[0], top: E.sign.h[1], out: back + .07 },
    lettering: { left: E.lettering.u[0], right: E.lettering.u[1], bottom: E.lettering.h[0], top: E.lettering.h[1], out: back + .02 },
    disc: { ...E.disc }, blade: { ...E.blade },
  };
}

export function fslReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'fsl-led-lighting', p: point(width / 2, 9), target: point(width / 2, 0), pitch: 14 },
    { id: 'fsl-led-lighting-blade', p: point(width + 2.5, 5.5), target: point(.4, .6), pitch: 22 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
