// April 2024 street exterior of No. 17 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const muhammadiyah = {
  id: 'muhammadiyah-college', buildingIds: ['454254295'], kind: 'muhammadiyah',
  name: 'Muhammadiyah Islamic College (April 2024 exterior)', address: '17 Lorong 13 Geylang',
  height: 23.5, frontEdge: 1, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists Kolej Islam Muhammadiyah (KIM) at 17 Lor 13 Geylang, Singapore 388660, matching the source way tagged No. 17. April 2024 Street View shows a green signboard reading معهد المحمدية الإسلامي and MUHAMMADIYAH ISLAMIC COLLEGE with this address over an open ground floor, and a top band reading MUHAMMADIYAH, on a slender building faced with a teal grid screen: one column of geometric lattice panels, six columns of windows and dark green shelves every 1.59 m, between white side columns with grilles and floor slabs. A white scrolled sliding gate and fence close the forecourt at the lane. The signboard was triangulated from two same-drive panoramas, which puts the screen face about 1.4 m behind the source front; the bar spacing in a level frame gives a matching scale. Heights come from the level frame, with the horizon fixed by the five-foot-way floor next door, and from an upward frame whose fitted pitch agrees with the requested one. The roof structures seen on satellite imagery, the side elevations above the neighbours and the interior are simplified or omitted.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Kolej+Islam+Muhammadiyah+17+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/454254295',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=D4Uk9t7JuM7EbZHDIk3xog&heading=251.5&pitch=0&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=D4Uk9t7JuM7EbZHDIk3xog&heading=251.5&pitch=45&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=0lzllny6dnDfGwAbWWI8_Q&heading=225&pitch=-4&fov=70',
  ],
};

// u runs south (No. 15D/E) to north (Hainan Lim); out runs east towards Lorong 13.
export const muhammadiyahFrame = poly => frontageFrame(poly, muhammadiyah.frontEdge);

// Measured, metres. The screen face stands 1.37 m behind the source front line.
export const elevation = {
  face: -1.37,
  bars: Array.from({ length: 11 }, (_, k) => 4.53 + 1.59 * k),
  slabs: Array.from({ length: 6 }, (_, k) => 4.53 + 3.18 * k),
  southColumn: [.13, 2.03], southGrille: [1.10, 2.01], slabSpan: [.15, 2.75], slabDepth: .8,
  tealLeft: [2.03, 3.88], lattice: [3.88, 4.88], windows: [4.88, 10.42], columns: 6, tealRight: [10.42, 12.03],
  northColumn: [12.03, 13.86], northGrille: [12.15, 12.95],
  lowRow: [3.6, 4.3], fascia: [2.78, 3.6], sign: { u: [5.70, 8.56], h: [2.78, 3.42] },
  band: [20.43, 22.6], parapet: [22.6, 23.5], coreTop: 24.7, railing: { u: [2.5, 8.0], inset: 1.0, h: [23.5, 24.5] },
  voidDepth: 4.0,
  fence: { out: 2.3, h: 1.45, gate: [4.75, 11.0], pillar: [4.25, 4.7], pillarH: 1.9 },
};

export function muhammadiyahLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, f = E.face, white = '#eeece4', teal = '#5fb3a0', green = '#2f6f58', glass = '#6f86a6', grille = '#6b5446';
  const top = E.band[0], mid = (a, b) => (a + b) / 2;

  // White side columns: plain wall faces with grilled windows in each storey.
  for (const [[l, r], [gl, gr]] of [[E.southColumn, E.southGrille], [E.northColumn, E.northGrille]]) {
    add('side column face', mid(l, r), mid(E.fascia[0], top), f + .02, r - l, top - E.fascia[0], .04, white);
    for (const s of E.slabs.slice(0, -1)) {
      add('grilled window', mid(gl, gr), s + 1.55, f + .045, gr - gl, 1.9, .02, '#3e3a36');
      for (let i = 0; i <= 6; i++) add('window grille bar', gl + (gr - gl) * i / 6, s + 1.55, f + .06, .025, 1.9, .015, grille);
      for (let i = 0; i <= 8; i++) add('window grille rail', mid(gl, gr), s + .6 + 1.9 * i / 8, f + .06, gr - gl, .02, .015, grille);
    }
  }
  // White floor slabs cantilevered from the south column, one per storey, with dark shelves between.
  for (const s of E.slabs) add('south floor slab', mid(...E.slabSpan), s, f + E.slabDepth / 2, E.slabSpan[1] - E.slabSpan[0], .22, E.slabDepth, white);
  for (const b of E.bars.filter(b => !E.slabs.includes(b))) add('south column shelf', mid(...E.southColumn), b, f + .2, E.southColumn[1] - E.southColumn[0], .1, .4, green);
  for (const s of E.slabs) add('north column shelf', mid(...E.northColumn), s, f + .2, E.northColumn[1] - E.northColumn[0], .1, .4, green);

  // The teal screen: plain panels, the lattice column and six window columns, with shelves at every bar.
  const screen = [E.tealLeft[0], E.tealRight[1]];
  add('teal screen backing', mid(...screen), mid(E.lowRow[0], top), f + .02, screen[1] - screen[0], top - E.lowRow[0], .04, teal);
  const [wl, wr] = E.windows, cw = (wr - wl) / E.columns;
  for (let j = 0; j < E.bars.length - 1; j++) {
    const b = E.bars[j], t = E.bars[j + 1];
    for (let c = 0; c < E.columns; c++) add('screen window', wl + cw * (c + .5), mid(b, t) + .02, f + .045, cw - .14, t - b - .2, .02, glass);
  }
  for (let c = 0; c < E.columns; c++) add('low row window', wl + cw * (c + .5), mid(...E.lowRow), f + .045, cw - .14, E.lowRow[1] - E.lowRow[0] - .1, .02, '#4d5f78');
  for (let c = 0; c <= E.columns; c++) add('screen fin', wl + cw * c, mid(E.lowRow[0], top), f + .14, .07, top - E.lowRow[0], .24, green);
  for (const u of E.lattice) add('lattice fin', u, mid(E.lowRow[0], top), f + .14, .07, top - E.lowRow[0], .24, green);
  for (const b of E.bars) add('screen shelf', mid(...screen), b, f + .18, screen[1] - screen[0], .1, .36, green);

  // Ground floor: the fascia carrying the signboard over an open, sheltered drop-off.
  add('fascia band', width / 2, mid(...E.fascia), f + .03, width, E.fascia[1] - E.fascia[0], .1, teal);
  add('drop-off ceiling', width / 2, E.fascia[0] - .04, f - E.voidDepth / 2, width - .1, .08, E.voidDepth, '#d9d8d2');
  add('drop-off back wall', width / 2, E.fascia[0] / 2, f - E.voidDepth, width - .1, E.fascia[0], .08, '#3a4443');
  add('drop-off floor', width / 2, .05, f - E.voidDepth / 2, width - .1, .1, E.voidDepth, '#8f8e88');
  for (const u of [E.southColumn[1] - .2, E.northColumn[0] + .25]) add('drop-off column', u, E.fascia[0] / 2, f - .3, .45, E.fascia[0], .45, teal);
  for (const u of [3.2, 6.9, 10.6]) add('drop-off ceiling light', u, E.fascia[0] - .1, f - 1.6, .9, .04, .12, '#f4f4ea', 1);

  // Top: the cream parapet over the lettered band, and the south column rising as a core.
  add('parapet', width / 2, mid(...E.parapet), f + .02, width, E.parapet[1] - E.parapet[0], .3, '#e7dfcc');
  add('parapet coping', width / 2, E.parapet[1] - .03, f + .05, width + .02, .06, .38, '#cfc6b2');
  add('stair core', mid(...E.southColumn), mid(E.parapet[1], E.coreTop), f - 1.2, E.southColumn[1] - E.southColumn[0], E.coreTop - E.parapet[1], 2.4, '#e7dfcc');
  const rl = E.railing;
  for (const y of [rl.h[0] + .35, rl.h[0] + .7, rl.h[1]]) add('roof railing rail', mid(...rl.u), y, f - rl.inset, rl.u[1] - rl.u[0], .04, .04, '#55626a');
  for (let u = rl.u[0]; u <= rl.u[1] + 1e-6; u += (rl.u[1] - rl.u[0]) / 5) add('roof railing post', u, mid(...rl.h), f - rl.inset, .05, rl.h[1] - rl.h[0], .05, '#55626a');

  // Forecourt paving, and the white fence with its sliding gate and numbered pillar at the lane.
  const fc = E.fence;
  add('forecourt paving', width / 2, .04, mid(f, fc.out), width - .1, .08, fc.out - f, '#a7a49b');
  const fenceRuns = [[.1, fc.pillar[0]], [fc.gate[1], width - .1]];
  for (const [l, r] of fenceRuns) {
    add('fence rail', mid(l, r), fc.h, fc.out, r - l, .05, .05, '#f4f4f0');
    add('fence base', mid(l, r), .25, fc.out, r - l, .5, .18, '#f0eee8');
    for (let u = l; u < r; u += .14) add('fence baluster', u, .5 + (fc.h - .5) / 2, fc.out, .025, fc.h - .5, .025, '#f4f4f0');
  }
  add('gate pillar', mid(...fc.pillar), fc.pillarH / 2, fc.out, fc.pillar[1] - fc.pillar[0], fc.pillarH, .45, '#f0eee8');
  add('gate pillar letterbox', mid(...fc.pillar), 1.25, fc.out + .23, .22, .3, .02, '#2b2b2b');
  const [gl, gr] = fc.gate;
  add('sliding gate bottom rail', mid(gl, gr), .12, fc.out, gr - gl, .08, .06, '#f4f4f0');
  add('sliding gate top rail', mid(gl, gr), 1.2, fc.out, gr - gl, .06, .06, '#f4f4f0');
  for (let u = gl; u <= gr + 1e-6; u += .2) add('sliding gate bar', u, .66, fc.out, .03, 1.08, .03, '#f4f4f0');
  for (let y = .3; y < 1.15; y += .2) add('sliding gate grid rail', mid(gl, gr), y, fc.out, gr - gl, .025, .03, '#f4f4f0');
  return {
    boxes,
    lattice: { u: E.lattice, bars: E.bars, out: f + .05 },
    band: { left: .05, right: width - .05, bottom: E.band[0] + .08, top: E.band[1], out: f + .05 },
    sign: { left: E.sign.u[0], right: E.sign.u[1], bottom: E.sign.h[0], top: E.sign.h[1], out: f + .1 },
    scroll: { left: gl, right: gr, bottom: 1.2, top: 1.95, out: fc.out },
    plate: { left: fc.pillar[0] + .03, right: fc.pillar[1] - .03, bottom: .8, top: .98, out: fc.out + .235 },
  };
}

export function muhammadiyahReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'muhammadiyah-college', p: point(width * .45, 7.6), target: point(width * .45, -1.4), pitch: 40 },
    { id: 'muhammadiyah-college-gate', p: point(width * .55, 4.6), target: point(width * .5, -1.4), pitch: 10 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
