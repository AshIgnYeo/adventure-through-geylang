// April 2024 street exterior of the white two-bay building at Nos. 13 and 15 Lorong 13.
// Each bay carries its own signed identity; only the two matching source footprints are assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

const shared = { frontEdge: 0, height: 6.01, parapet: 6.18, reviewRoad: 'Lorong 13 Geylang' };
const panoramas = [
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=J1TCFhzakKX2wiHsdsUgGQ&heading=251.3&pitch=20&fov=100',
  'https://www.google.com/maps/@?api=1&map_action=pano&pano=J1TCFhzakKX2wiHsdsUgGQ&heading=268&pitch=-2&fov=14',
];

export const fooHui = {
  ...shared, id: 'foo-hui', buildingIds: ['1223773764'], kind: 'foo-hui',
  name: 'Foo Hui Ging Xiu Centre (April 2024 exterior)', address: '13 Lorong 13 Geylang',
  evidence: 'Google Maps lists FOO HUI GING XIU CENTRE 福慧净修中心 at 13 Lor 13 Geylang, Singapore 388651; its place point lies inside the source way tagged No. 13. April 2024 Street View shows the purple 福慧净修中心 FOO HUI GING XIU CENTRE lettering on the south bay of a white two-storey, two-bay building, over a red awning, a perforated roller shutter and a 13/13A plate. Heights and positions were measured from square-on frames scaled by the 12.21 m two-bay frontage; the camera stood about 1.83 m above the five-foot way. The ground-floor pier dividing the bays measured about 5.5 m from the south edge, against the 6.11 m source party line; the source split is preserved. No interior is reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Foo+Hui+Ging+Xiu+Centre+13+Lorong+13+Geylang', 'https://www.openstreetmap.org/way/1223773764', ...panoramas],
};

export const siawLim = {
  ...shared, id: 'siaw-lim', buildingIds: ['1223773763'], kind: 'siaw-lim',
  name: 'Siaw Lim Hood Sun Thong (April 2024 exterior)', address: '15 Lorong 13 Geylang',
  evidence: 'April 2024 Street View shows a black board reading 少林佛山堂 SIAW LIM HOOD SUN THONG over the doorway of the north bay of the white two-bay building, with a door number 15, matching the source way tagged No. 15. Google Maps places Siaw Lim Hood Sun Thong with a point inside the same way, though its listing text gives 6B Lor 13 Geylang; the photographed number, mapped point and source tag agree on No. 15, and the 6B text is recorded as a conflict. The bay has a red scalloped awning with gold tassels, a grilled door, a lattice gate, a doorway and a grilled window. Heights were measured with the No. 13 bay. Altar furnishings, couplets, people and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Siaw+Lim+Hood+Sun+Thong', 'https://www.openstreetmap.org/way/1223773763', ...panoramas],
};

// Pair coordinates: u runs south from the No. 11 side of No. 13 to the 15-C side of No. 15;
// out runs east towards Lorong 13.
export const twinFrame = (poly13, poly15) => {
  const f13 = frontageFrame(poly13, 0), f15 = frontageFrame(poly15, 0);
  const width = Math.hypot(f15.b[0] - f13.a[0], f15.b[1] - f13.a[1]);
  return { ...f13, b: f15.b, rearB: f15.rearB, width, split: f13.width,
    point: (u, out = 0) => [f13.a[0] + f13.dx * u + f13.nx * out, f13.a[1] + f13.dz * u + f13.nz * out] };
};

export function twinLayout(width, split) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const white = '#ebe8e1', frame = '#f4f4f1', dark = '#2c3236';

  // Upper storey: measured windows, a louvred vent and the slab eave.
  const windows = [[1.56, 2.62, 3.57, 4.47], [3.92, 5.72, 3.57, 4.47], [7.02, 8.32, 3.61, 4.54], [8.82, 11.11, 3.67, 5.20]];
  for (const [l, r, b, t] of windows) {
    const u = (l + r) / 2, w = r - l, mid = (b + t) / 2, h = t - b;
    add('window surround', u, mid, .03, w + .16, h + .16, .06, frame);
    add('window glass', u, mid, .065, w, h, .01, '#3e474d');
    const panes = Math.max(2, Math.round(w / .45));
    for (let i = 1; i < panes; i++) add('window mullion', l + w * i / panes, mid, .075, .04, h, .02, frame);
    add('window sill', u, b - .1, .1, w + .2, .05, .16, '#dcd8d0');
  }
  add('vent louvre frame', 7.67, 4.88, .03, 1.30, .56, .05, frame);
  for (let i = 0; i < 5; i++) add('vent louvre', 7.67, 4.66 + i * .1, .06, 1.2, .04, .03, '#d4d0c8');
  for (let i = 1; i < 6; i++) add('window grille bar', 9.4 + i * .28, 4.43, .085, .025, 1.5, .015, '#2a2c2e');
  add('slab eave', width / 2, 5.63, .32, width, .76, .64, white);
  add('eave drip line', width / 2, 5.25, .63, width, .03, .03, '#c9c5bd');
  // The two source frontages meet at a hair's-breadth kink, so flush parts sit 1 cm inside.
  add('parapet', width / 2, 6.1, -.06, width, .16, .1, white);
  add('upper floor band', width / 2, 2.85, .06, width, .14, .12, '#dedad2');

  // Ground floor, No. 13 bay: perforated roller shutter and the 13/13A plate.
  add('ground wall beside shutter', 4.7, 1.45, -.03, 1.3, 2.7, .06, white);
  add('roller shutter', 2.2, 1.35, -.05, 3.7, 2.7, .04, '#f1f0ec');
  for (let row = 0; row < 7; row++) for (let col = 0; col < 13; col++) add('shutter perforation', .65 + col * .27, .75 + row * .13, -.025, .14, .05, .01, '#4a4f53');
  add('number plate', 4.34, 1.3, .0, .3, .36, .02, '#ecebe6');
  add('letter box', 4.75, 1.1, .02, .22, .28, .08, '#d2d0c8');
  add('bay pier', 5.53, 1.4, -.05, .35, 2.8, .12, white);
  for (const u of [.12, width - .12]) add('end pier', u, 1.4, -.05, .24, 2.8, .12, white);

  // Ground floor, No. 15 bay: a shallow tiled porch with doors, gate and grilled window.
  const R = .3;
  add('porch floor', (5.71 + width - .24) / 2, .1, -R / 2 - .01, width - .24 - 5.71, .1, R - .02, '#b8483f');
  add('porch back wall', (5.71 + width - .24) / 2, 1.4, -R, width - .24 - 5.71, 2.8, .06, white);
  add('grilled door', 5.98, 1.1, -R + .04, .55, 2.15, .03, '#d7d5cf');
  for (let i = 0; i < 9; i++) add('door grille bar', 5.76 + i * .055, 1.1, -R + .06, .02, 2.1, .01, '#8c8f8f');
  add('lattice gate', 6.73, 1.1, -R + .04, .65, 2.15, .03, '#c7c3b9');
  for (let i = 0; i < 6; i++) for (const s of [-1, 1]) add('gate lattice', 6.73, .3 + i * .36, -R + .055, .7, .025, .01, '#6e6a62', 0, s * 30);
  add('dark doorway', 7.51, 1.05, -R + .04, .6, 2.05, .03, dark);
  add('red couplet', 7.12, 1.0, -R + .06, .12, 1.4, .01, '#c43a2e');
  add('grilled window', 8.75, 1.5, -R + .04, .8, 1.3, .03, '#3b4246');
  for (let i = 0; i < 7; i++) add('window grille', 8.4 + i * .12, 1.5, -R + .06, .02, 1.3, .01, '#a9aaa6');
  add('side door', 10.9, 1.05, -R + .04, .85, 2.05, .03, '#8a2e2a');
  return {
    boxes,
    awnings: [
      { left: .2, right: 5.36, back: .05, front: 1.15, top: 2.69, bottom: 2.25, valance: 2.14, tassels: false },
      { left: 5.71, right: width - .15, back: .05, front: 1.15, top: 2.69, bottom: 2.25, valance: 2.14, tassels: true },
    ],
    fooHuiSign: { left: 1.91, right: 4.58, bottom: 2.9, top: 3.4, out: .07 },
    siawLimBoard: { left: 7.27, right: 8.01, bottom: 1.9, top: 2.2, out: -R + .06 },
    plate: { u: 4.34, bottom: 1.14, top: 1.46, w: .26, out: .015 },
    split,
  };
}

export function twinReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'foo-hui', p: point(3.1, 7.2), target: point(3.1, 0), pitch: 16 },
    { id: 'siaw-lim', p: point(8.6, 7.2), target: point(8.6, 0), pitch: 14 },
    { id: 'foo-hui-siaw-lim-pair', p: point(width / 2, 8.6), target: point(width / 2, 0), pitch: 18 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
