// The north side of Sims Avenue from No. 135 to No. 205 (open question 83), walked one building at a time from KartaView's
// May 2023 panoramas while Google Street View cannot be reached (open question 84): Lorong 21 to Lorong 21A first, then west
// to No. 135. Each frame's position and heading are solved from party walls matched to source corners, and each elevation
// is read in a near-frontal rectification on its source front, with heights above the five-foot-way floor. Every building is
// unnamed for now, its boards drawn blank. See docs/sims-avenue-north-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

/** A KartaView frame, by its sequence and index. */
export const kv = (seq, index) => `https://kartaview.org/details/${seq}/${index}/track-info`;

// Nos. 183-193 are Late-style shophouses: three arched windows between ornate pilasters, a moulded frieze under tiled eaves,
// and a five-foot way behind piers at each party wall. The fronts stand 6.6-7.3 m from Sims Avenue's centreline, at its
// estimated carriageway's edge, so street-level pieces are held within 0.25 m of the walls (heldFlat).
const tile = '#b45a43', moss = '#6f7569';
const row = (colours, o = {}) => ({
  frontEdge: 0, reviewRoad: 'Sims Avenue', review: { distance: 8, pitch: 16 }, heldFlat: true,
  height: 8.4, ceiling: 4.0, fiveFootWay: 1.9, shellInset: .05, roof: { type: 'gable', ridge: 9.9, ridgeDepth: .5, overhang: .45, colour: tile },
  colours: { trim: '#ece7da', frame: '#e8e6de', glass: '#3e4a52', back: '#3a3632', floor: '#a8a296', ...colours },
  ...o,
});
/** The parts every house of the Late row shares, in its own frame: frieze, eaves, ledge, tile panels, piers. */
const lateParts = (W, { frieze, eaves, ledge, panels = [], pierW = .25, fascia = tile }) => ({
  bands: [[...ledge, .2]],
  blocks: [
    { name: 'moulded frieze', u: [.05, +(W - .05).toFixed(3)], h: frieze, out: .06, depth: .12 },
    { name: 'eaves fascia', u: [0, W], h: eaves, out: .25, depth: .5, colour: fascia },
    ...panels.map(u => ({ name: 'green tile panel', u, h: [ledge[1] + .15, ledge[1] + .65], out: .02, depth: .04, colour: '#5f8f72' })),
  ],
  piers: [[0, pierW], [+(W - pierW).toFixed(3), W]],
});
const arched = (us, side, middle) => us.map((u, i) => ({ u, h: i === 1 ? middle : side, panes: 2, arched: true }));
const fanlights = (us, h, colour = '#e8e4d8') => us.map(u => ({ name: 'fanlight grille', u, h, out: .02, depth: .04, colour }));
/** White patterned strips down the middle of coloured pilasters, and a white band of ornament across the frieze. */
const whiteDetail = (pilasters, frieze, W, colour = '#eef4f0') => [
  ...pilasters.map(([l, r, b, t]) => ({ name: 'white patterned strip', u: [+((l + r) / 2 - .07).toFixed(3), +((l + r) / 2 + .07).toFixed(3)], h: [b + .1, t - .1], out: .13, depth: .02, colour })),
  { name: 'white frieze ornament', u: [.15, +(W - .15).toFixed(3)], h: [frieze[0] + .2, frieze[1] - .2], out: .13, depth: .02, colour },
];
const lateNote = ' Read on the source front, where the 24 May 2023 frames agree (open question 84): their positions and headings are solved from the party walls, which the photographs put within 0.3 m of the source ones. Heights are above the five-foot-way floor and carry about ±0.4 m; the five-foot way\'s depth is estimated.';

export const no183 = {
  ...row({ wall: '#e2ddd0', trim: '#d8d2c2', glass: '#3e5260', pier: '#e4dfd2' }, { height: 8.4 }),
  id: 'sa-183', buildingIds: ['454254353'], kind: 'unnamed', unnamed: true,
  name: 'No. 183 Sims Avenue (May 2023 exterior, occupant not identified)', address: '183 Sims Avenue (the Lorong 21 corner)',
  evidence: 'KartaView panoramas of May 2023 show the corner house at Lorong 21: a weathered cream front with three arched glazed windows between ornate pilasters, the middle one glazed down to the ledge and an air-conditioner under the east one, a moulded frieze under pink-faced tiled eaves, and a green awning over a fruit stall in the five-foot way. A red blade sign at the corner reads 美罗鲜果有限公司 with 183 Sims Ave; listings could not be checked (open question 84), so it is drawn blank and no name is given. On Lorong 21 the side wall is blank but for one small high window; two green awnings run along it over the stall, and its top steps down about 10.5 m back.' + lateNote,
  sources: [way('454254353'), kv('8348649', '2755'), kv('8348649', '2756'), kv('8348649', '2754'), kv('8350297', '5487')],
  windows: arched([[.71, 1.57], [2.19, 3.07], [3.67, 4.53]], [5.5, 6.74], [4.53, 6.74]),
  pilasters: [[.31, .71, 4.64, 6.93], [1.74, 2.17, 4.64, 6.93], [3.21, 3.64, 4.64, 6.93], [4.71, 5.14, 4.64, 6.93]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.71, 1.57], [2.19, 3.07], [3.67, 4.53]], [6.74, 7.12]),
    { name: 'air-conditioner', u: [3.86, 4.98], h: [4.71, 5.5], out: .12, depth: .24, colour: '#e8e8e4' },
    { name: 'green awning, held flat', u: [.02, 5.29], h: [3.3, 4.07], out: .12, depth: .2, colour: '#1f5a4c' },
    { name: 'awning valance', u: [.02, 5.29], h: [3.14, 3.3], out: .2, depth: .04, colour: '#e8e8e4' },
    { name: 'fruit stall', u: [.1, 5.2], h: [0, 1.3], out: .1, depth: .2, colour: '#d9b34a' },
    // The double-sided corner blade, drawn blank: it hangs above the street-level pieces.
    { name: 'blank red blade sign', u: [.02, .14], h: [5.2, 8.2], out: .75, depth: 1.3, colour: '#d22c2c' },
  ] }))(lateParts(5.312, { frieze: [7.36, 8.14], eaves: [8.2, 8.5], ledge: [4.21, 4.64], panels: [[.75, 1.55]], fascia: '#c9867f' })),
  backFittings: [{ name: 'fruit shop', u: [.3, 5.0], h: [.1, 3.0], colour: '#3a3430', glow: .08 }],
  sides: [{
    edge: 1, // Lorong 21, u north to south from the rear corner
    windows: [{ u: [17.04, 17.59], h: [5.55, 6.2], panes: 1 }],
    blocks: [
      { name: 'stepped parapet', u: [11.95, 22.55], h: [8.4, 9.15], out: 0, depth: .2 },
      { name: 'rear parapet', u: [3.45, 11.95], h: [8.4, 8.6], out: 0, depth: .2 },
      { name: 'green awning, held flat', u: [9.75, 22.55], h: [2.8, 4.4], out: .12, depth: .2, colour: '#1f5a4c' },
      { name: 'green awning, held flat', u: [3.55, 12.35], h: [2.75, 4.25], out: .1, depth: .16, colour: '#24604f' },
      { name: 'brown steel grille', u: [16.45, 22.0], h: [.2, 2.8], out: .02, depth: .04, colour: '#5a4a3a' },
      { name: 'drinks fridge', u: [13.25, 15.95], h: [.2, 2.2], out: .1, depth: .2, colour: '#d8d8d4', glow: .1 },
    ],
  }],
};

export const no185 = {
  ...row({ wall: '#e6dcc4', trim: '#efe8d6', frame: '#b23a33', glass: '#8a9aa6', pier: '#e8e0cc' }, { height: 8.35 }),
  id: 'sa-185', buildingIds: ['454254354'], kind: 'unnamed', unnamed: true,
  name: 'No. 185 Sims Avenue (May 2023 exterior, occupant not identified)', address: '185 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a cream Late-style house: three red-framed windows with blue-grey louvred shutters under arched grilles, the middle one opened over white panels, green-tiled pilasters and panels, and a moulded frieze under tiled eaves; over the five-foot way a short green canopy above a dark blue board reading 185 and 大華白鋼工程 TAI WAH STAINLESS STEEL WORKS, over a stainless-steel workshop. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + lateNote,
  sources: [way('454254354'), kv('8348649', '2756'), kv('8348649', '2755')],
  windows: [
    { u: [.8, 1.76], h: [5.29, 6.6], panes: 2, arched: true },
    { u: [2.26, 3.26], h: [4.43, 6.6], panes: 2, arched: true, shutters: true },
    { u: [3.9, 4.83], h: [5.29, 6.6], panes: 2, arched: true },
  ],
  pilasters: [[.33, .72, 4.43, 6.95], [1.83, 2.23, 4.43, 6.95], [3.38, 3.76, 4.43, 6.95], [4.9, 5.26, 4.43, 6.95]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.8, 1.76], [2.26, 3.26], [3.9, 4.83]], [6.6, 7.0], '#dcdcd8'),
    { name: 'open window', u: [2.32, 3.2], h: [5.35, 6.55], out: .025, depth: .03, colour: '#2c3234' },
    { name: 'white lower panels', u: [2.32, 3.2], h: [4.47, 5.3], out: .025, depth: .03, colour: '#e8e8e4' },
    { name: 'green canopy, held flat', u: [.25, 5.1], h: [3.71, 4.0], out: .12, depth: .2, colour: '#1f5a4c' },
    { name: 'blank dark blue board', u: [.48, 4.98], h: [2.86, 3.64], out: .1, depth: .06, colour: '#2a2f6e' },
  ] }))(lateParts(5.325, { frieze: [6.93, 8.07], eaves: [8.31, 8.5], ledge: [4.0, 4.36], panels: [[.8, 1.76], [3.9, 4.83]] })),
  backFittings: [{ name: 'stainless-steel workshop', u: [.3, 5.0], h: [.1, 2.8], colour: '#9a9c9a', glow: .04 }],
};

export const no187 = {
  ...row({ wall: '#e6dcc4', trim: '#efe8d6', frame: '#7a5a32', glass: '#8f744a', pier: '#e8e0cc' }, { height: 8.3 }),
  id: 'sa-187', buildingIds: ['454254355'], kind: 'unnamed', unnamed: true,
  name: 'No. 187 Sims Avenue (May 2023 exterior, occupant not identified)', address: '187 Sims Avenue (No. 187 on its board)',
  evidence: 'KartaView panoramas of May 2023 show a cream Late-style house: three windows with closed brown louvred shutters under arched grilles, the middle one shuttered down to the ledge, green-tiled pilasters and panels, and a moulded frieze under tiled eaves; over the five-foot way a yellow board reading 永豐白鋼雪櫃工程 ENG FONG STEEL REFRIGERATION WORKS and No. 187, over a kitchen-equipment shop. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + lateNote,
  sources: [way('454254355'), kv('8348649', '2756')],
  windows: arched([[.83, 1.79], [2.33, 3.36], [3.9, 4.9]], [5.29, 6.64], [4.4, 6.64]),
  pilasters: [[.43, .79, 4.4, 7.0], [1.9, 2.29, 4.4, 7.0], [3.46, 3.83, 4.4, 7.0], [5.0, 5.3, 4.4, 7.0]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.83, 1.79], [2.33, 3.36], [3.9, 4.9]], [6.64, 7.05], '#dcdcd8'),
    { name: 'blank yellow board', u: [.57, 5.15], h: [3.03, 4.0], out: .1, depth: .06, colour: '#e8e08a' },
  ] }))(lateParts(5.314, { frieze: [7.07, 8.0], eaves: [8.21, 8.4], ledge: [4.07, 4.36], panels: [[.83, 1.79], [3.9, 4.9]] })),
  backFittings: [{ name: 'kitchen-equipment shop', u: [.3, 5.0], h: [.1, 2.9], colour: '#8c8e8c', glow: .05 }],
};

export const no189 = {
  ...row({ wall: '#ecebe6', trim: '#f2f1ec', frame: '#b04a3c', glass: '#2e3638', pier: '#ecebe6' }, { height: 8.3 }),
  id: 'sa-189', buildingIds: ['454254356'], kind: 'unnamed', unnamed: true,
  name: 'No. 189 Sims Avenue (May 2023 exterior, occupant not identified)', address: '189 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a white Late-style house: two dark windows in red arched frames either side of an orange-panelled middle window, an air-conditioner on the west one\'s sill, white pilasters and a moulded frieze under tiled eaves; its west pier is clad in stainless steel, and the five-foot way\'s fascia carries the date 1930 in relief over a black board reading Ni flora Wellness, with a SPA blade sign at the east pier, over a glass spa front with painted panels. Listings could not be checked (open question 84), so the board and the blade are drawn blank and no name is given.' + lateNote,
  sources: [way('454254356'), kv('8348649', '2756'), kv('8348649', '2757')],
  windows: arched([[.88, 1.84], [2.38, 3.34], [3.91, 4.91]], [5.29, 6.5], [4.36, 6.5]),
  pilasters: [[.55, .88, 4.36, 7.0], [1.98, 2.34, 4.36, 7.0], [3.41, 3.76, 4.36, 7.0], [4.91, 5.3, 4.36, 7.0]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.88, 1.84], [2.38, 3.34], [3.91, 4.91]], [6.5, 6.95], '#e4e0d8'),
    { name: 'orange middle panel', u: [2.42, 3.3], h: [4.4, 6.45], out: .025, depth: .03, colour: '#d0702e' },
    { name: 'air-conditioner, held flat', u: [1.08, 2.12], h: [4.86, 5.6], out: .12, depth: .24, colour: '#e8e8e4' },
    { name: 'stainless-clad pier', u: [.34, .98], h: [0, 4.29], out: -.2, depth: .44, colour: '#a7aaa8' },
    { name: 'dated fascia (1930)', u: [2.41, 3.69], h: [3.71, 4.03], out: .06, depth: .12, colour: '#f0efea' },
    { name: 'blank black board', u: [1.05, 3.76], h: [3.07, 3.5], out: .1, depth: .06, colour: '#22201e' },
    { name: 'blank black blade sign, held flat', u: [4.31, 4.91], h: [3.0, 4.86], out: .1, depth: .1, colour: '#1e1e1e' },
  ] }))(lateParts(5.325, { frieze: [7.07, 8.0], eaves: [8.21, 8.36], ledge: [4.14, 4.36], panels: [[3.91, 4.91]] })),
  backFittings: [{ name: 'glass spa front with painted panels', u: [1.05, 4.9], h: [.1, 2.9], colour: '#d8d4c8', glow: .08 }],
};

export const no191 = {
  ...row({ wall: '#2ea3a3', trim: '#2b9a9a', frame: '#1f7f80', glass: '#1e2a2c', pier: '#2ea3a3', back: '#2a9a98' }, { height: 8.55 }),
  id: 'sa-191', buildingIds: ['454254357'], kind: 'unnamed', unnamed: true,
  name: 'No. 191 Sims Avenue (May 2023 exterior, occupant not identified)', address: '191 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a turquoise Late-style house picked out in white: three dark arched windows, the middle one over turquoise panels and an air-conditioner in the east one, white-patterned pilasters and tile panels, and a moulded frieze under tiled eaves; the five-foot way has an ornamented beam on piers faced with pink tiles, and behind it turquoise French windows either side of a grilled door. No board or sign is photographed, so no name is given.' + lateNote,
  sources: [way('454254357'), kv('8348649', '2757'), kv('8348649', '2756')],
  windows: arched([[.86, 1.86], [2.41, 3.41], [3.93, 4.93]], [5.57, 6.86], [4.71, 6.86]),
  pilasters: [[.36, .79, 4.64, 7.2], [1.89, 2.29, 4.64, 7.2], [3.41, 3.83, 4.64, 7.2], [5.01, 5.3, 4.64, 7.2]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.86, 1.86], [2.41, 3.41], [3.93, 4.93]], [6.86, 7.21], '#e9f1ec'),
    ...whiteDetail([[.36, .79, 4.64, 7.2], [1.89, 2.29, 4.64, 7.2], [3.41, 3.83, 4.64, 7.2], [5.01, 5.3, 4.64, 7.2]], [7.43, 8.14], 5.303),
    { name: 'turquoise lower panels', u: [2.45, 3.37], h: [4.73, 5.5], out: .025, depth: .03, colour: '#3fb3b0' },
    { name: 'air-conditioner', u: [4.03, 4.72], h: [5.6, 6.1], out: .2, depth: .4, colour: '#e8e8e4' },
    { name: 'ornamented five-foot-way beam', u: [.2, 5.1], h: [3.71, 4.29], out: .05, depth: .1, colour: '#e9f1ec' },
    { name: 'pink tile pier facing', u: [5.05, 5.28], h: [.9, 3.2], out: .02, depth: .04, colour: '#e7b9b0' },
  ] }))(lateParts(5.303, { frieze: [7.43, 8.14], eaves: [8.43, 8.64], ledge: [4.29, 4.64], panels: [[.86, 1.86], [3.93, 4.93]], pierW: .3 })),
  backFittings: [
    { name: 'turquoise French window', u: [1.29, 2.29], h: [1.57, 3.43], colour: '#3aa6a0' },
    { name: 'grilled door', u: [2.65, 3.75], h: [.1, 3.43], colour: '#3b4446' },
    { name: 'turquoise French window', u: [4.15, 5.0], h: [1.57, 3.43], colour: '#3aa6a0' },
  ],
};

export const no193 = {
  ...row({ wall: '#9fd6bf', trim: '#93ccb4', frame: '#4f9a86', glass: '#222a2c', pier: '#2ea3a3', back: '#e6e4de' }, { height: 8.5 }),
  id: 'sa-193', buildingIds: ['454254358'], kind: 'unnamed', unnamed: true,
  name: 'No. 193 Sims Avenue (May 2023 exterior, occupant not identified)', address: '193 Sims Avenue (193 on its blade sign)',
  evidence: 'KartaView panoramas of May 2023 show a mint-green Late-style house picked out in white: three dark arched windows, the middle one glazed down to the ledge, white-patterned pilasters and tile panels, a moulded frieze under tiled eaves and a room on the roof behind them, with air-conditioners; over the five-foot way a pale blue board reading POLAR ICE 永晟白钢厨具 above a narrower dark blue one, and a tall POLAR ICE blade numbered 193 at the east pier, over a kitchen-equipment shop. Listings could not be checked (open question 84), so the boards and the blade are drawn blank and no name is given. The rooftop room\'s depth is estimated.' + lateNote,
  sources: [way('454254358'), kv('8348649', '2757')],
  windows: arched([[.92, 1.85], [2.42, 3.35], [3.92, 4.85]], [5.5, 6.79], [4.57, 6.79]),
  pilasters: [[.53, .88, 4.54, 7.1], [1.99, 2.35, 4.54, 7.1], [3.52, 3.88, 4.54, 7.1], [4.99, 5.3, 4.54, 7.1]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks, ...fanlights([[.92, 1.85], [2.42, 3.35], [3.92, 4.85]], [6.79, 7.14], '#eef6f0'),
    ...whiteDetail([[.53, .88, 4.54, 7.1], [1.99, 2.35, 4.54, 7.1], [3.52, 3.88, 4.54, 7.1], [4.99, 5.3, 4.54, 7.1]], [7.29, 8.14], 5.325),
    { name: 'blank pale blue board', u: [.78, 4.99], h: [3.31, 4.21], out: .1, depth: .06, colour: '#d8ecf6' },
    { name: 'blank dark blue board', u: [.56, 3.56], h: [2.71, 3.11], out: .08, depth: .04, colour: '#2a4a8a' },
    { name: 'blank pale blue blade sign, held flat', u: [5.1, 5.2], h: [4.57, 8.0], out: .12, depth: .2, colour: '#cfe6f2' },
  ] }))(lateParts(5.325, { frieze: [7.29, 8.14], eaves: [8.43, 8.57], ledge: [4.29, 4.54], panels: [[.92, 1.85], [3.92, 4.85]], pierW: .3 })),
  backFittings: [{ name: 'kitchen-equipment shop', u: [.3, 5.0], h: [.1, 2.9], colour: '#8c8e8c', glow: .05 }],
  upper: [{
    outline: [[.25, -.8], [5.1, -.8], [5.1, -4.8], [.25, -4.8]], from: 8.45, to: 9.25, colour: '#e8e6e0', roof: '#b0473a',
    windows: [{ u: [.6, 4.8], h: [8.6, 9.1], panes: 6 }],
    blocks: [[1.8, 2.25], [4.55, 5.0]].map(u => ({ name: 'air-conditioner', u, h: [8.75, 9.1], out: -.6, depth: .3, colour: '#e8e8e4' })),
  }],
};

export const simsAvenueNorth = [no183, no185, no187, no189, no191, no193];
export const simsAvenueNorthFrame = laneFrame, simsAvenueNorthLayout = laneLayout, simsAvenueNorthUpper = laneUpper, simsAvenueNorthReviews = laneReviews, simsAvenueNorthSides = laneSides;
