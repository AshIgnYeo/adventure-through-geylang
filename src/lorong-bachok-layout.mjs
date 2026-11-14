// Lorong Bachok's north row between Kang Ha Pheng Sim Kok (No. 1, the Lorong 19 corner) and Tan Ser Seng (No. 29, the
// Lorong 21 corner), from KartaView's drive of 16 May 2023 along the lane (open questions 84 and 93). The frames show
// eleven houses where the source has twelve outlines (ways 454254315-454254328, each 5.84 m wide), which squares with
// Tan Ser Seng's face standing 3.25 m beyond its outline: the row is measured as eleven equal houses of 6.37 m over the
// twelve outlines' 70.06 m front, and each outline takes its slice of that one elevation. Where a taller house runs onto a
// lower outline, an upper volume carries it. Every house is unnamed for now, its boards drawn blank.
// See docs/lorong-bachok-brief.md.
import { way, sliceSpec, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const ROW = 70.06, N = 11, B = k => +(ROW * k / N).toFixed(2), C = k => (B(k) + B(k + 1)) / 2;
const r2 = v => +v.toFixed(2);
const span = (a, b) => [r2(a), r2(b)];
const DEPTH = 26.2;

// Ornate Late-style houses (0-5): three tall windows under arched heads, tile panels below them, pilasters and a deep
// moulded cornice, a frieze over the five-foot way.
const ORNATE = { ceiling: 3.4, height: 10.4, top: 10.1 };
const ornate = (k, { wall, accent, tiles, shutters }) => {
  const c = C(k), us = [-1.75, 0, 1.75].map(d => span(c + d - .6, c + d + .6));
  return {
    windows: us.map(u => ({ u, h: [6.0, 8.2], panes: 2 })),
    blocks: [
      ...us.map(([a, b]) => ({ name: 'arched head', u: span(a - .08, b + .08), h: [8.2, 8.4], out: .05, depth: .1, colour: '#f2eee4' })),
      { name: 'painted facade', u: span(B(k) + .01, B(k + 1) - .01), h: [ORNATE.ceiling, ORNATE.top], out: -.02, depth: .01, colour: wall },
      { name: 'relief frieze', u: span(B(k) + .35, B(k + 1) - .35), h: [3.6, 4.4], out: .01, depth: .02, colour: accent },
      { name: 'moulded cornice', u: span(B(k), B(k + 1)), h: [4.5, 4.85], out: .06, depth: .12, colour: '#f2eee4' },
      ...us.map(([a, b], i) => ({ name: 'coloured tile panel', u: span(a + .1, b - .1), h: [5.1, 5.6], out: .01, depth: .02, colour: tiles[i % tiles.length] })),
      ...(shutters ? us.map(([a, b]) => ({ name: 'closed louvred shutters', u: span(a + .03, b - .03), h: [6.03, 8.17], out: .012, depth: .006, colour: shutters })) : []),
      ...[span(B(k), B(k) + .3), span(B(k + 1) - .3, B(k + 1))].map(u => ({ name: 'pilaster', u, h: [4.85, 9.2], out: .04, depth: .08, colour: '#f2eee4' })),
      ...[-.875, .875].map(d => ({ name: 'window pilaster', u: span(c + d - .09, c + d + .09), h: [5.0, 9.0], out: .03, depth: .06, colour: accent })),
      { name: 'ornate cornice', u: span(B(k), B(k + 1)), h: [9.2, 9.9], out: .15, depth: .3, colour: '#f2eee4' },
    ],
  };
};

// White Modern houses (6-8): three casements in brown frames, a fascia over the five-foot way and a flat roof slab.
const WHITE = { ceiling: 3.4, height: 7.9 };
const white = (k, step, w) => {
  const c = C(k);
  return {
    windows: [-step, 0, step].map(d => ({ u: span(c + d - w / 2, c + d + w / 2), h: [4.6, 6.7], panes: 2 })),
    blocks: [
      { name: 'painted facade', u: span(B(k) + .01, B(k + 1) - .01), h: [WHITE.ceiling, WHITE.height], out: -.02, depth: .01, colour: '#efeeea' },
      { name: 'fascia', u: span(B(k), B(k + 1)), h: [3.4, 3.9], out: .04, depth: .08, colour: '#f4f4f0' },
      ...[span(B(k), B(k) + .3), span(B(k + 1) - .3, B(k + 1))].map(u => ({ name: 'pilaster', u, h: [3.9, 7.6], out: .03, depth: .06, colour: '#f4f4f0' })),
      { name: 'roof slab', u: span(B(k), B(k + 1)), h: [7.6, 7.9], out: .3, depth: .6, colour: '#e8e8e4' },
    ],
  };
};

// Grey stuccoed houses (9-10): casements under louvred vents, a deep eave slab and a parapet, a white shopfront wall.
const GREY = { ceiling: 3.4, height: 9.3 };
const grey = k => ({
  blocks: [
    { name: 'stuccoed facade', u: span(B(k) + .01, B(k + 1) - .01), h: [GREY.ceiling, GREY.height], out: -.02, depth: .01, colour: '#a39e94' },
    { name: 'floor beam', u: span(B(k), B(k + 1)), h: [3.4, 4.0], out: .04, depth: .08, colour: '#a39e94' },
    { name: 'eave slab', u: span(B(k), B(k + 1)), h: [7.9, 8.2], out: .45, depth: .9, colour: '#b0aca2' },
  ],
  backFittings: [{ name: 'white shopfront wall', u: span(B(k) + .35, B(k + 1) - .35), h: [0, 3.3], colour: '#e6e4de' }],
});

const merge = (...xs) => ({ windows: xs.flatMap(x => x.windows ?? []), vents: xs.flatMap(x => x.vents ?? []), blocks: xs.flatMap(x => x.blocks ?? []), backFittings: xs.flatMap(x => x.backFittings ?? []) });
const cream = { wall: '#ede6d4', accent: '#7aa89a', tiles: ['#d88a90', '#5a8ab8', '#d88a90'] };

/** The whole row's elevation, u east from the west corner of way 454254315, heights above the five-foot way floor. */
export const row = merge(
  ornate(0, { wall: '#efeee8', accent: '#7e98a0', tiles: ['#9ab4bc'], shutters: '#e2e0d8' }),
  ornate(1, { wall: '#c8d5cf', accent: '#6e8e86', tiles: ['#9ab4ac'], shutters: '#dfe2da' }),
  ornate(2, cream), ornate(3, cream), ornate(4, cream),
  ornate(5, { ...cream, wall: '#efe8d8', tiles: ['#4a9a8a', '#5a8ab8', '#4a9a8a'] }),
  white(6, 1.95, 1.15), white(7, 2.0, 1.15), white(8, 1.65, 1.1),
  grey(9), grey(10),
  {
    windows: [{ u: [57.9, 59.6], h: [5.3, 6.5], panes: 2 }, { u: [60.4, 62.25], h: [5.3, 6.5], panes: 2 }, { u: [64.95, 66.15], h: [5.3, 6.5], panes: 2 }, { u: [67.75, 68.95], h: [5.3, 6.5], panes: 2 }],
    vents: [{ u: [58.1, 59.4], h: [6.8, 7.15] }, { u: [60.7, 62.0], h: [6.8, 7.15] }],
    blocks: [
      // House 0: a dark board in its five-foot way is drawn blank (below, as a back fitting).
      // House 3: a pale yellow board on its upper floor.
      { name: 'blank yellow board', u: [21.9, 24.4], h: [4.65, 5.35], out: .03, depth: .02, colour: '#e8dc9a' },
      // House 4: a red awning over its five-foot way, held flat to the front.
      { name: 'red awning', u: [25.6, 31.1], h: [2.55, 3.4], out: .05, depth: .1, colour: '#c8303a' },
      // House 5: a red board on its frieze and a red valance below it.
      { name: 'blank red board', u: [31.95, 37.6], h: [3.45, 4.3], out: .03, depth: .02, colour: '#c8202a' },
      { name: 'red valance', u: [31.95, 37.6], h: [2.55, 3.05], out: .03, depth: .02, colour: '#c8202a' },
      // House 6: a small white board and a red awning.
      { name: 'blank white board', u: [39.6, 42.4], h: [3.4, 3.75], out: .1, depth: .02, colour: '#e8ece4' },
      { name: 'red awning', u: [38.6, 43.9], h: [2.6, 3.15], out: .05, depth: .1, colour: '#b8303a' },
      // House 7: a beige board over a red awning.
      { name: 'blank beige board', u: [45.0, 50.6], h: [2.95, 3.4], out: .03, depth: .02, colour: '#e8dcc0' },
      { name: 'red awning', u: [45.2, 50.5], h: [2.35, 2.95], out: .05, depth: .1, colour: '#d02a2a' },
      // House 8: a cream board.
      { name: 'blank cream board', u: [51.4, 56.6], h: [2.85, 3.4], out: .03, depth: .02, colour: '#ece2c4' },
      // House 10: a yellow board over its floor beam, a cream board under its eave and a red awning.
      { name: 'blank yellow board', u: [64.8, 69.6], h: [4.1, 5.0], out: .04, depth: .02, colour: '#d8c838' },
      { name: 'blank cream board', u: [65.2, 69.4], h: [6.6, 7.3], out: .03, depth: .02, colour: '#ece6c8' },
      { name: 'red awning', u: [63.8, 70.0], h: [2.85, 3.35], out: .05, depth: .1, colour: '#b8282a' },
    ],
    backFittings: [
      { name: 'blank dark board', u: [2.0, 4.2], h: [2.6, 3.1], colour: '#3a2a22' },
      { name: 'black grille gate', u: [13.4, 17.6], h: [.1, 2.7], colour: '#2a2c2e' },
      { name: 'red boards', u: [20.3, 24.6], h: [2.5, 3.2], colour: '#c8282a' },
      { name: 'red door', u: [60.6, 61.7], h: [0, 2.1], colour: '#c8402a' },
      { name: 'dark door', u: [64.6, 65.7], h: [0, 2.3], colour: '#3a2a24' },
      { name: 'roller shutter', u: [66.3, 69.4], h: [0, 2.4], colour: '#a8aaa8' },
    ],
  },
);
row.piers = Array.from({ length: N + 1 }, (_, k) => span(Math.max(0, B(k) - .3), Math.min(ROW, B(k) + .3)));
// The five-foot way's returns stand at the photographed party walls, not at the outlines' edges.
row.blocks.push(...Array.from({ length: N - 1 }, (_, k) => ({ name: 'five-foot way return', u: span(B(k + 1) - .015, B(k + 1) + .015), h: [0, 3.4], out: -1.0, depth: 1.99, colour: '#ece8de' })));

const ids = ['454254315', '454254316', '454254318', '454254320', '454254321', '454254322', '454254323', '454254324', '454254325', '454254326', '454254327', '454254328'];
// Each outline's west corner along the row and its front width (from the source ways).
const at = [0, 5.84, 11.68, 17.52, 23.36, 29.2, 35.03, 40.88, 46.71, 52.54, 58.39, 64.22];
const widths = [5.844, 5.833, 5.844, 5.835, 5.844, 5.833, 5.844, 5.835, 5.833, 5.844, 5.833, 5.844];
const frames = ['3164', '3166', '3168', '3170'];
const sources = id => [way(id), ...frames.map(f => kv('8344809', f))];

const roofs = {
  ornate: { type: 'gable', ridge: 14.0, ridgeDepth: .5, overhang: .4, colour: '#8a5a48' },
  flat: { type: 'flat', colour: '#9a9c98' },
};
const colours = {
  ornate: { wall: '#ede6d4', trim: '#f2eee4', frame: '#e8e4da', glass: '#2e3438', back: '#3a3634', floor: '#b8a89a', pier: '#ede6d4' },
  white: { wall: '#efeeea', trim: '#f4f4f0', frame: '#4a3a32', glass: '#2e3438', back: '#3a3836', floor: '#a8a296', pier: '#efeeea' },
  grey: { wall: '#a39e94', trim: '#b0aca2', frame: '#e8e8e4', glass: '#3a4046', back: '#e6e4de', floor: '#a8a296', pier: '#a39e94' },
};
const kinds = ['ornate', 'ornate', 'ornate', 'ornate', 'ornate', 'ornate', 'white', 'white', 'white', 'white', 'grey', 'grey'];
const bases = { ornate: ORNATE, white: WHITE, grey: GREY };
// Upper volumes where a taller house runs onto a lower outline: house 5 onto 454254323, house 9 onto 454254326.
const uppers = {
  '454254323': { u: [0, r2(B(6) - at[6])], to: ORNATE.height, ridge: 12.0, colour: '#efe8d8', roof: '#8a5a48' },
  '454254326': { u: [r2(B(9) - at[9]), r2(widths[9] - .1)], to: GREY.height, colour: '#a39e94', roof: '#9a9c98' },
};
const reviewed = { '454254318': ['bachok-west', 9], '454254322': ['bachok-middle', 9], '454254325': ['bachok-white', 9], '454254328': ['bachok-east', 8] };
const houses = (a, b) => Array.from({ length: N }, (_, k) => k).filter(k => Math.min(b, B(k + 1)) - Math.max(a, B(k)) > .05)
  .map(k => `${r2(Math.min(b, B(k + 1)) - Math.max(a, B(k)))} m of house ${k + 1}`);

const evidence = 'KartaView panoramas of May 2023 show eleven two-storey houses between Kang Ha Pheng Sim Kok and Tan Ser Seng, where the source has twelve outlines; the row is laid as eleven equal houses of 6.37 m over the outlines\' 70.06 m front, with party walls solved from four frames to within about 1°. From the west: (1) a white Late-style house with louvred shutters and blue-grey relief, a dark board in its five-foot way reading 仁和聯誼社; (2) a grey-green one with louvred shutters; (3) a cream one with arched glazed windows and pink and blue tile panels behind a grille gate; (4) another with a pale yellow board on its upper floor reading DHAMMA DUTA BUDDHIST CENTRE and red boards in its five-foot way; (5) another under a red awning; (6) another with a red board and valance reading GANG TIAN DA DI ASSOCIATION, stone lions at its piers; (7-9) three white Modern houses with brown-framed casements under a flat roof slab, the first with a small white board and a red awning, the second with a beige board reading POH LENG JIE KWAN INN BUDDHIST ASSOCIATION over a red awning, the third with a cream board reading BUDDHIST LIFE MISSION; and (10-11) two grey stuccoed houses under a deep eave and a parapet, the second with a yellow board reading TEO (JOO LIM) ASSOCIATION, a cream board reading Land of Compassion Buddha (Singapore), a red awning and the plate 27. Listings could not be checked (open question 84), so no house is named and every board is drawn blank. Heights come from the rectified frames at 8-10 m and carry about ±0.5 m: ornate eaves about 10.4 m, white roof slabs 7.9 m, grey parapets 9.3 m. Awnings are held flat to the front, as the fronts stand about 4 m from the lane\'s centreline.';

const parts = Object.fromEntries(ids.map((id, i) => {
  const kind = kinds[i], base = bases[kind], W = widths[i], up = uppers[id];
  const sl = sliceSpec(row, at[i], +(at[i] + W - .003).toFixed(3));
  // A window cut by an outline's edge keeps a 6 cm mullion there, so its sill and frame stay on the outline.
  sl.windows = sl.windows.map(w => ({ ...w, u: [Math.max(w.u[0], .06), Math.min(w.u[1], +(W - .06).toFixed(3))] })).filter(w => w.u[1] - w.u[0] > .25);
  return [id, {
    ...sl, height: base.height, ceiling: base.ceiling, roof: kind === 'ornate' ? roofs.ornate : roofs.flat, colours: colours[kind],
    ...(i === 0 ? { colours: { ...colours.ornate, wall: '#efeee8' } } : i === 1 ? { colours: { ...colours.ornate, wall: '#c8d5cf' } } : {}),
    ...(reviewed[id] ? { id: reviewed[id][0], review: { distance: reviewed[id][1], pitch: 18 } } : { noReview: true }),
    ...(up ? { upper: [{ outline: [[up.u[0], 0], [up.u[1], 0], [up.u[1], -DEPTH], [up.u[0], -DEPTH]], from: base.height, to: up.to, ...(up.ridge ? { ridge: up.ridge } : {}), colour: up.colour, roof: up.roof }] } : {}),
    sources: sources(id),
    evidence: `${evidence} This outline, ${i + 1} of 12 from the west, carries ${houses(at[i], at[i] + W).join(' and ')}.`,
  }];
}));


export const bachokRow = {
  id: 'bachok-row', buildingIds: ids, kind: 'unnamed', unnamed: true,
  name: 'Lorong Bachok, the row between Nos. 1 and 29 (May 2023 elevation, occupants not identified)', address: 'North side of Lorong Bachok, between Nos. 1 and 29',
  reviewRoad: 'Lorong Bachok', frontEdge: 0, heldFlat: true, shellInset: .02, fiveFootWay: 2.0, returns: false,
  ...ORNATE, roof: roofs.ornate, colours: colours.ornate, evidence, sources: ids.map(way),
  parts,
};

export const lorongBachok = [bachokRow];
export const lorongBachokFrame = laneFrame, lorongBachokLayout = laneLayout, lorongBachokUpper = laneUpper, lorongBachokReviews = laneReviews, lorongBachokSides = laneSides;
