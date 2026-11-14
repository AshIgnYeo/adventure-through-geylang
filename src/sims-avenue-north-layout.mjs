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

// Nos. 197-205 are plainer two-storey houses: rectangular windows under round vents and a flat eave. Read in frames from
// the 24 May drive (No. 195 and No. 197) and the 25 May drive (Nos. 199-205), whose positions are solved the same way.
const modern = (colours, o = {}) => row({ trim: colours.wall, frame: '#2e3032', glass: '#262e32', ...colours }, { roof: { type: 'flat', colour: '#8f9396' }, ...o });
const vents = (us, h) => us.map(u => ({ name: 'round vent', u: [+(u - .08).toFixed(3), +(u + .08).toFixed(3)], h: [h - .08, h + .08], out: .01, depth: .02, colour: '#3a3836' }));
const eave = (W, h, colour = '#9a9c9a', depth = .7) => ({ name: 'flat eave', u: [0, W], h, out: depth / 2, depth, colour });
const modernNote = ' Read on the source front in a near-frontal frame whose position and heading are solved from the party walls (open question 84). Heights are above the five-foot-way floor and carry about ±0.4 m; the five-foot way\'s depth is estimated.';

export const no195 = {
  ...row({ wall: '#e8d24a', trim: '#e2cb44', frame: '#2a2c2c', glass: '#2a3236', pier: '#e8d24a', back: '#3a3632' }, { height: 7.8, ceiling: 3.9 }),
  id: 'sa-195', buildingIds: ['454254359'], kind: 'unnamed', unnamed: true,
  name: 'No. 195 Sims Avenue (May 2023 exterior, occupant not identified)', address: '195 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a yellow Late-style house, a little lower than its neighbours: three dark windows under yellow arches between pilasters with green and white strips, the middle one over a small iron balcony grille, tile panels under the others, a yellow frieze under a grey gutter, and a thick moulded beam on bulging yellow piers over the five-foot way, behind which a brown door and a roller shutter. A blue blade sign reading 天下 hangs at the east pier; listings could not be checked (open question 84), so it is drawn blank and no name is given.' + lateNote,
  sources: [way('454254359'), kv('8348649', '2758'), kv('8350297', '5492')],
  windows: arched([[1.24, 2.13], [2.64, 3.53], [4.03, 4.91]], [5.19, 6.3], [5.19, 6.3]),
  pilasters: [[.7, 1.1, 4.4, 6.9], [2.13, 2.53, 4.4, 6.9], [3.57, 3.96, 4.4, 6.9], [4.96, 5.3, 4.4, 6.9]],
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks.filter(b => b.name !== 'eaves fascia'), ...whiteDetail([[.7, 1.1, 4.4, 6.9], [2.13, 2.53, 4.4, 6.9], [3.57, 3.96, 4.4, 6.9], [4.96, 5.3, 4.4, 6.9]], [6.94, 7.6], 5.314, '#e4efe6'),
    eave(5.314, [7.73, 7.94], '#8a8c8a', .5),
    { name: 'iron balcony grille', u: [2.68, 3.49], h: [4.33, 5.13], out: .12, depth: .04, colour: '#2e2a26' },
    { name: 'moulded beam', u: [.15, 5.15], h: [3.9, 4.3], out: .1, depth: .2, colour: '#e2cb44' },
    { name: 'blank blue blade sign, held flat', u: [5.0, 5.12], h: [4.9, 6.5], out: .12, depth: .2, colour: '#3a7ac8' },
  ] }))(lateParts(5.314, { frieze: [6.94, 7.6], eaves: [7.73, 7.94], ledge: [4.3, 4.4], panels: [[1.24, 2.13], [4.03, 4.91]], pierW: .45 })),
  backFittings: [
    { name: 'brown door', u: [1.8, 2.5], h: [.3, 2.3], colour: '#5a3a2a' },
    { name: 'roller shutter', u: [2.6, 4.9], h: [.3, 2.6], colour: '#c8c8c4' },
  ],
};

export const no197 = {
  ...modern({ wall: '#e4dccb', frame: '#3a2e28', glass: '#4a4642', pier: '#e4dccb' }, { height: 7.95, ceiling: 3.2 }),
  id: 'sa-197', buildingIds: ['454254360'], kind: 'unnamed', unnamed: true,
  name: 'No. 197 Sims Avenue (May 2023 exterior, occupant not identified)', address: '197 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a cream house with a flat eave: three brown-framed windows with curtains under three round vents, an air-conditioner under the east one, and over the five-foot way a white board painted with parrots reading AIK GUAN PETT TRADING, EXPORTER & IMPORTRTER OF BIRDS, since 1978, over a red door and a shop of birdcages. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + modernNote,
  sources: [way('454254360'), kv('8348649', '2758'), kv('8350297', '5492')],
  windows: [[.82, 1.89], [2.31, 3.35], [3.75, 4.78]].map(u => ({ u, h: [5.23, 6.97], panes: 2 })),
  blocks: [
    eave(5.323, [7.94, 8.16]), ...vents([.71, 2.07, 3.49], 7.23),
    { name: 'air-conditioner, held flat', u: [4.18, 5.07], h: [4.51, 5.13], out: .12, depth: .24, colour: '#e8e8e4' },
    { name: 'blank white board', u: [.38, 5.21], h: [3.23, 4.09], out: .1, depth: .06, colour: '#f0efe8' },
  ],
  piers: [[0, .3], [5.023, 5.323]],
  backFittings: [
    { name: 'red door', u: [.78, 1.57], h: [.2, 2.5], colour: '#8a2a24' },
    { name: 'birdcage shop', u: [1.92, 5.0], h: [.2, 2.8], colour: '#4a2a26', glow: .06 },
  ],
};

export const no199 = {
  ...modern({ wall: '#ecc8d6', frame: '#3a3a3c', glass: '#3c4e5c', pier: '#ecc8d6', back: '#e8c4d2' }, { height: 8.0, ceiling: 3.25 }),
  id: 'sa-199', buildingIds: ['454254361'], kind: 'unnamed', unnamed: true,
  name: 'No. 199 Sims Avenue (May 2023 exterior, occupant not identified)', address: '199 Sims Avenue (plate 199)',
  evidence: 'KartaView panoramas of May 2023 show a pink house with a flat eave: three windows under round vents, the name Temptations with EST 1985 lettered on the wall and the plate 199 below it, and the five-foot way entered through a wide arch, behind which a pink glass shopfront with a tiled counter. Listings could not be checked (open question 84), so the lettering is drawn as a blank panel and no name is given.' + modernNote,
  sources: [way('454254361'), kv('8350297', '5492'), kv('8348649', '2758')],
  windows: [[.89, 1.86], [2.25, 3.25], [3.6, 4.63]].map(u => ({ u, h: [4.8, 6.61], panes: 2 })),
  blocks: [
    eave(5.314, [7.94, 8.23]), ...vents([2.07, 3.43, 4.79], 6.91),
    { name: 'blank lettering panel', u: [1.53, 3.89], h: [3.66, 4.59], out: .02, depth: .04, colour: '#e2b8ca' },
    ...[[.55, 1.1], [4.2, 4.8]].map(u => ({ name: 'arch haunch', u, h: [2.59, 3.25], out: -.03, depth: .06, colour: '#ecc8d6' })),
  ],
  piers: [[0, .6], [4.82, 5.314]],
  backFittings: [
    { name: 'dark grey door', u: [.82, 1.6], h: [.3, 2.7], colour: '#3a3e42' },
    { name: 'pink glass shopfront', u: [1.67, 4.32], h: [.3, 2.6], colour: '#e8a8bc', glow: .08 },
  ],
};

export const no201 = {
  ...modern({ wall: '#ecebe6', frame: '#2e3032', glass: '#222a2e', pier: '#ecebe6' }, { height: 8.2, ceiling: 3.2 }),
  id: 'sa-201', buildingIds: ['454254362'], kind: 'unnamed', unnamed: true,
  name: 'No. 201 Sims Avenue (May 2023 exterior, occupant not identified)', address: '201 Sims Avenue (plate 201)',
  evidence: 'KartaView panoramas of May 2023 show a white house with a flat eave: three large dark windows under round vents, over the five-foot way a red board reading 新科昱 燕窩貿易私人有限公司 S.K.Y. Birdnest Trading Pte Ltd, a white blade sign with a black swift at the east pier, the plate 201 on that pier, and a dark glass shopfront. Listings could not be checked (open question 84), so the board and the blade are drawn blank and no name is given.' + modernNote,
  sources: [way('454254362'), kv('8350297', '5492'), kv('8350297', '5494')],
  windows: [[.6, 1.85], [2.17, 3.45], [3.83, 5.14]].map(u => ({ u, h: [4.9, 6.83], panes: 3 })),
  blocks: [
    eave(5.314, [8.16, 8.44]), ...vents([1.97, 3.64], 7.23),
    { name: 'blank red board', u: [.28, 5.27], h: [3.23, 4.13], out: .1, depth: .06, colour: '#c8282a' },
    { name: 'blank white blade sign, held flat', u: [5.15, 5.27], h: [4.37, 5.73], out: .12, depth: .2, colour: '#f0f0ec' },
  ],
  piers: [[0, .3], [4.71, 5.314]],
  backFittings: [
    { name: 'dark glass shopfront', u: [.3, 3.28], h: [.3, 3.0], colour: '#2a3236', glow: .05 },
    { name: 'stacked water bottles', u: [3.71, 4.65], h: [.1, 1.6], colour: '#8ab0c8' },
  ],
};

export const no203 = {
  ...modern({ wall: '#d4d6d6', frame: '#2e3032', glass: '#2a3034', pier: '#d4d6d6' }, { height: 8.3, ceiling: 3.4 }),
  id: 'sa-203', buildingIds: ['454254363'], kind: 'unnamed', unnamed: true,
  name: 'No. 203 Sims Avenue (May 2023 exterior, occupant not identified)', address: '203 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a pale grey house under a deep flat eave: three windows under round vents, and over the five-foot way a dark board reading DIVIN WINE over a glass front stacked with bottled water and crates. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + modernNote,
  sources: [way('454254363'), kv('8350297', '5494'), kv('8348649', '2759')],
  windows: [[.6, 1.62], [2.37, 3.47], [3.86, 4.9]].map(u => ({ u, h: [5.19, 7.04], panes: 2 })),
  blocks: [
    { ...eave(5.325, [8.3, 8.6], '#9a9c9a', .9) }, ...vents([2.19, 3.33, 4.83], 7.3),
    { name: 'blank dark board', u: [.2, 4.26], h: [3.7, 4.41], out: .1, depth: .06, colour: '#3a3436' },
  ],
  piers: [[0, .3], [5.025, 5.325]],
  backFittings: [{ name: 'glass front with bottled water', u: [.3, 5.0], h: [.4, 3.3], colour: '#6a7c88', glow: .05 }],
};

export const no205 = {
  ...modern({ wall: '#e8e6dc', frame: '#3a3a36', glass: '#2e3436', pier: '#ecebe4', back: '#e8e6de' }, { height: 8.4, ceiling: 3.75 }),
  id: 'sa-205', buildingIds: ['454254364'], kind: 'unnamed', unnamed: true,
  name: 'No. 205 Sims Avenue (May 2023 exterior, occupant not identified)', address: '205 Sims Avenue (the Lorong 21A corner)',
  evidence: 'KartaView panoramas of May 2023 show the corner coffeeshop at Lorong 21A: a white two-storey house under a deep eave with a timber soffit, four windows, two of them under small metal hoods and one over an air-conditioner, square piers banded in brown and round columns at the splayed corner, maroon awnings over the five-foot way, and the tables of the coffeeshop behind. Its stalls\' signs are a yellow board reading 阿顺(火炭)炒福建虾面 over the east bay, a red blade reading 黃氏雲吞麵 WONG\'S WAN TAN MEE at the west pier, a red vertical board at the corner and a green blade marked KS 21. Listings could not be checked (open question 84), so all are drawn blank and no name is given. The Lorong 21A face is not covered by a usable frame, so it is left plain.' + modernNote,
  sources: [way('454254364'), kv('8350297', '5494'), kv('8350297', '5495'), kv('8348649', '2760')],
  windows: [
    { u: [1.48, 2.87], h: [4.87, 6.66], panes: 2 }, { u: [3.34, 4.65], h: [4.87, 6.66], panes: 2 },
    { u: [6.25, 7.34], h: [4.8, 7.09], panes: 2 }, { u: [7.87, 9.05], h: [4.8, 7.09], panes: 2 },
  ],
  blocks: [
    eave(9.513, [8.37, 8.7], '#d8d4c8', 1.2), ...vents([1.01, 2.44, 2.94, 6.08, 7.65], 7.58),
    ...[[1.48, 2.87], [3.34, 4.65]].map(u => ({ name: 'window hood', u, h: [6.75, 6.95], out: .3, depth: .6, colour: '#8a8c88' })),
    { name: 'air-conditioner, held flat', u: [3.3, 4.48], h: [4.16, 5.09], out: .12, depth: .24, colour: '#e8e8e4' },
    { name: 'first-floor slab', u: [0, 9.513], h: [3.73, 4.0], out: .1, depth: .2, colour: '#e8e6dc' },
    { name: 'maroon awning, held flat', u: [.37, 5.58], h: [2.73, 3.23], out: .12, depth: .2, colour: '#6a2a2a' },
    { name: 'maroon awning, held flat', u: [5.68, 9.45], h: [2.73, 3.23], out: .12, depth: .2, colour: '#6a2a2a' },
    { name: 'blank yellow board', u: [6.01, 9.3], h: [2.99, 3.76], out: .1, depth: .06, colour: '#e8de7a' },
    { name: 'blank red blade sign, held flat', u: [.05, .17], h: [4.16, 7.37], out: .12, depth: .2, colour: '#d23a2a' },
    { name: 'blank red corner board, held flat', u: [9.35, 9.47], h: [4.0, 7.0], out: .12, depth: .2, colour: '#b8322a' },
    ...[[7.94, 8.37], [9.05, 9.5]].map(u => ({ name: 'round column', u, h: [0, 3.73], out: -.25, depth: .45, colour: '#f0efe8' })),
    ...[[.22, 1.44], [5.37, 6.01], [7.94, 8.37], [9.05, 9.5]].map(u => ({ name: 'brown band', u, h: [1.35, 1.6], out: .01, depth: .02, colour: '#7a4a32' })),
  ],
  piers: [[.22, 1.44], [5.37, 6.01]],
  backFittings: [
    { name: 'grille gate', u: [2.22, 3.58], h: [.2, 2.6], colour: '#8a8a86' },
    { name: 'white-tiled stall front', u: [3.58, 5.37], h: [.1, 1.5], colour: '#ecebe6' },
    { name: 'coffeeshop with tables', u: [6.01, 9.3], h: [.1, 2.7], colour: '#d8d2c4', glow: .06 },
  ],
};

// Lorong 17 to Lorong 19: No. 147, a single-storey eating place set back behind a covered forecourt, and the two-storey row
// from No. 149 to No. 159, the Lorong 19 corner, read in solved frames from the 24 May drive.
const rowNote = ' Read on the source front in a near-frontal frame of the 24 May 2023 drive, whose position and heading are solved from the party walls (open question 84); the photographed party walls stand within 0.3 m of the source ones. Heights are above the five-foot-way floor and carry about ±0.4 m; the five-foot way\'s depth is estimated.';
// These outlines are skewed: each east party wall slants about 0.18 m inward per metre back, so the shell stands 0.4 m in.
const shop = (colours, o = {}) => row({ trim: colours.wall, frame: '#3a3c3c', glass: '#3a4044', ...colours }, { shellInset: .4, roof: { type: 'gable', ridge: 9.3, ridgeDepth: .5, overhang: .4, colour: tile }, ...o });
const beam = (W, h, colour) => ({ name: 'five-foot-way beam', u: [.1, +(W - .1).toFixed(3)], h, out: .05, depth: .1, ...(colour && { colour }) });

export const no147 = {
  frontEdge: 3, reviewRoad: 'Sims Avenue', review: { distance: 8, pitch: 12 },
  height: 4.3, ceiling: 3.3, fiveFootWay: 3.0, shellInset: .65, roof: { type: 'hip', ridge: 8.3, colour: '#2b5d7c' },
  colours: { wall: '#d8d4ca', trim: '#c8c4ba', frame: '#3a3c3c', glass: '#3a4044', back: '#4a3e36', floor: '#a8a296', pier: '#d8d4ca' },
  id: 'sa-147', buildingIds: ['475918110'], kind: 'unnamed', unnamed: true,
  name: 'No. 147 Sims Avenue (May 2023 exterior, occupant not identified)', address: '147 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a single-storey eating place set back from the avenue under a blue corrugated hipped roof, with broad dark canvas awnings sloping forward over a forecourt of round tables, and plastic crates stacked at its east end; a red banner reading 旺德 hangs inside and a white board stands on the roof. No sign of it could be matched to a listing (open question 84), so no name is given. Its front stands about 13 m from the avenue\'s centreline, so its awnings reach forward without crossing the carriageway; their depth and the roof\'s ridge are estimated from the oblique frames.' + rowNote,
  sources: [way('475918110'), kv('8348649', '2746'), kv('8348649', '2747')],
  awning: { from: .2, to: 13.3, depth: 3.5, wall: 4.3, front: 2.75 },
  blocks: [{ name: 'stacked crates', u: [9.5, 13.3], h: [0, 1.6], out: .5, depth: 1.0, colour: '#2e3236' }],
  piers: [[0, .3], [6.6, 6.9], [12.9, 13.2]],
  backFittings: [{ name: 'eating place with round tables', u: [.7, 12.6], h: [.1, 3.0], colour: '#5a4a40', glow: .08 }],
};

export const no149 = {
  ...shop({ wall: '#e8dfc4', trim: '#ece4cc', frame: '#8a4a32', pier: '#ece4cc', back: '#3a3430' }, { height: 7.9, ceiling: 3.6, roof: { type: 'gable', ridge: 9.4, ridgeDepth: .5, overhang: .4, colour: tile } }),
  id: 'sa-149', buildingIds: ['475918111'], kind: 'unnamed', unnamed: true,
  name: 'No. 149 Sims Avenue (May 2023 exterior, occupant not identified)', address: '149 Sims Avenue (149 on its board)',
  evidence: 'KartaView panoramas of May 2023 show the west house of the row, cream, under tiled eaves: three brown casement windows with small lights between plain pilasters, a white board reading 謙利企業私人有限公司 KINDLY ENTERPRISES PTE. LTD. and 149 below them, and over the five-foot way a dark red board with the same name, over a shop stacked with boxes. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given.' + rowNote,
  sources: [way('475918111'), kv('8348649', '2747'), kv('8348649', '2746')],
  windows: [[.9, 2.04], [2.43, 3.53], [3.9, 4.93]].map(u => ({ u, h: [5.31, 6.89], panes: 3 })),
  pilasters: [[.21, .79, 4.4, 7.7], [4.95, 5.2, 4.4, 7.7]],
  bands: [[4.07, 4.36, .2]],
  blocks: [
    { name: 'plain frieze', u: [.05, 5.186], h: [6.93, 7.71], out: .05, depth: .1 },
    { name: 'blank white board', u: [.64, 5.1], h: [4.46, 5.24], out: .1, depth: .06, colour: '#f0eee8' },
    beam(5.236, [3.64, 4.07]),
    { name: 'blank dark red board', u: [1.0, 5.0], h: [2.93, 3.5], out: .1, depth: .06, colour: '#7a2a28' },
  ],
  piers: [[.05, .35], [4.84, 5.14]],
  backFittings: [{ name: 'shop stacked with boxes', u: [.45, 4.75], h: [.3, 2.9], colour: '#4a3a30', glow: .06 }],
};

export const no151 = {
  ...shop({ wall: '#e4e4e0', frame: '#c8c8c4', pier: '#e4e4e0' }, { height: 7.85, ceiling: 3.2 }),
  id: 'sa-151', buildingIds: ['682928772'], kind: 'unnamed', unnamed: true,
  name: 'No. 151 Sims Avenue (May 2023 exterior, occupant not identified)', address: '151 Sims Avenue (plate 151)',
  evidence: 'KartaView panoramas of May 2023 show a white house under tiled eaves with a room on the roof behind them: three aluminium windows over two air-conditioners, a plain frieze, and in the five-foot way a small dark board reading 天禧 TIENXI over a grey glass front with the plate 151. Listings could not be checked (open question 84), so the board is drawn blank and no name is given. The rooftop room\'s depth is estimated.' + rowNote,
  sources: [way('682928772'), kv('8348649', '2747')],
  windows: [[.83, 1.86], [2.26, 3.29], [3.72, 4.76]].map(u => ({ u, h: [5.11, 6.71], panes: 2 })),
  bands: [[4.03, 4.29, .2]],
  blocks: [
    { name: 'plain frieze', u: [.05, 5.175], h: [6.79, 7.57], out: .05, depth: .1 },
    { name: 'air-conditioner, held flat', u: [.79, 1.76], h: [4.4, 5.14], out: .12, depth: .24, colour: '#e8e8e4' },
    { name: 'air-conditioner, held flat', u: [2.57, 3.55], h: [4.29, 5.0], out: .12, depth: .24, colour: '#e8e8e4' },
    beam(5.225, [3.14, 3.5]),
    { name: 'blank dark board', u: [2.95, 3.97], h: [2.86, 3.31], out: .1, depth: .06, colour: '#3a3230' },
  ],
  piers: [[0, .3], [4.825, 5.125]],
  backFittings: [{ name: 'grey glass shopfront', u: [.45, 4.4], h: [.3, 3.1], colour: '#4a5054', glow: .04 }],
  upper: [{ outline: [[.2, -1.0], [5.0, -1.0], [5.0, -5.0], [.2, -5.0]], from: 7.85, to: 8.6, colour: '#9a9c98', roof: '#8a8c88' }],
};

export const no153 = {
  ...shop({ wall: '#d8d4c8', frame: '#b8b8b4', glass: '#3e4448', pier: '#e2ded2' }, { height: 7.7, ceiling: 3.4, roof: { type: 'gable', ridge: 9.2, ridgeDepth: .5, overhang: .4, colour: tile } }),
  id: 'sa-153', buildingIds: ['682928771'], kind: 'unnamed', unnamed: true,
  name: 'No. 153 Sims Avenue (May 2023 exterior, occupant not identified)', address: '153 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a grey-cream house under tiled eaves: three aluminium windows between capped pilasters, a white board reading 郭德明帆布私人有限公司 QUEK TECK BENG CANVAS PTE LTD with 153 Sims Avenue below them, a tall white blade sign of the same firm at the east pier, and over the five-foot way a smaller board with the same name, over brown steel grilles. Listings could not be checked (open question 84), so the boards and the blade are drawn blank and no name is given.' + rowNote,
  sources: [way('682928771'), kv('8348649', '2747'), kv('8348649', '2748')],
  windows: [[.75, 1.75], [2.18, 3.14], [3.57, 4.51]].map(u => ({ u, h: [5.03, 6.61], panes: 2 })),
  pilasters: [[.05, .35, 4.2, 7.3], [4.85, 5.15, 4.2, 7.3]],
  bands: [[3.93, 4.21, .2]],
  blocks: [
    { name: 'plain frieze', u: [.05, 5.164], h: [6.64, 7.36], out: .05, depth: .1 },
    { name: 'blank white board', u: [.61, 4.83], h: [4.26, 4.89], out: .1, depth: .06, colour: '#f0eee8' },
    { name: 'blank white blade sign, held flat', u: [5.08, 5.2], h: [4.43, 6.43], out: .12, depth: .2, colour: '#f0eee8' },
    beam(5.214, [3.14, 3.5]),
    { name: 'blank white board', u: [.47, 3.4], h: [2.57, 3.07], out: .1, depth: .06, colour: '#f0eee8' },
  ],
  piers: [[0, .3], [4.814, 5.114]],
  backFittings: [
    { name: 'dark door', u: [.5, 1.8], h: [.3, 2.6], colour: '#2e2e2e' },
    { name: 'brown steel grille', u: [1.83, 3.68], h: [.4, 2.4], colour: '#6a4a3a' },
    { name: 'steel grille', u: [3.83, 4.5], h: [.4, 2.4], colour: '#5a5a58' },
  ],
};

export const no155 = {
  ...shop({ wall: '#e6e2d8', frame: '#3a3a3a', glass: '#2a3034', pier: '#ece8de' }, { height: 7.6, ceiling: 3.9, roof: { type: 'gable', ridge: 9.2, ridgeDepth: .5, overhang: .4, colour: tile } }),
  id: 'sa-155', buildingIds: ['682928770'], kind: 'unnamed', unnamed: true,
  name: 'No. 155 Sims Avenue (May 2023 exterior, occupant not identified)', address: '155 Sims Avenue (plate 155)',
  evidence: 'KartaView panoramas of May 2023 show a pale house under tiled eaves: three small windows under panels of pierced vent blocks, a white board reading UNISTEEL 友联白钢 below them, a tall UNISTEEL blade sign at the east pier, and over the five-foot way a larger white and blue UNISTEEL board for new and used kitchen equipment, with the plate 155 on the west pier. Listings could not be checked (open question 84), so the boards and the blade are drawn blank and no name is given.' + rowNote,
  sources: [way('682928770'), kv('8348649', '2747'), kv('8348649', '2749')],
  windows: [[.62, 1.47], [1.97, 2.76], [3.33, 4.19]].map(u => ({ u, h: [4.86, 5.97], panes: 2 })),
  blocks: [
    ...[[.62, 1.47], [1.97, 2.76], [3.33, 4.19]].map(u => ({ name: 'pierced vent blocks', u, h: [6.21, 6.5], out: .02, depth: .04, colour: '#c8c4b8' })),
    { name: 'blank white board', u: [.4, 4.33], h: [4.07, 4.79], out: .1, depth: .06, colour: '#f0f0ec' },
    { name: 'blank white blade sign, held flat', u: [5.0, 5.12], h: [4.14, 7.71], out: .12, depth: .2, colour: '#f0f4f8' },
    { name: 'blank white and blue board', u: [.62, 4.33], h: [2.79, 3.83], out: .1, depth: .06, colour: '#e8eef4' },
  ],
  piers: [[0, .3], [4.812, 5.112]],
  backFittings: [{ name: 'kitchen-equipment shop', u: [.45, 4.75], h: [.1, 2.9], colour: '#8c8e8c', glow: .05 }],
};

export const no157 = {
  ...shop({ wall: '#ecebe6', pier: '#ecebe6' }, { height: 7.6, ceiling: 3.4, roof: { type: 'gable', ridge: 9.0, ridgeDepth: .5, overhang: .4, colour: '#c86a5a' } }),
  id: 'sa-157', buildingIds: ['682928769'], kind: 'unnamed', unnamed: true,
  name: 'No. 157 Sims Avenue (May 2023 exterior, occupant not identified)', address: '157 Sims Avenue (plate 157)',
  evidence: 'KartaView panoramas of May 2023 show a white house under a deep eave: three windows with a row of transoms above them, a black board reading FENG DESIGN PTE LTD across the upper floor, a black FENG DESIGN blade at the east pier, and a glass shopfront in the five-foot way with the plate 157 on the east pier. Listings could not be checked (open question 84), so the board and the blade are drawn blank and no name is given.' + rowNote,
  sources: [way('682928769'), kv('8348649', '2749'), kv('8348649', '2748')],
  windows: [
    ...[[1.0, 2.05], [2.38, 3.43], [3.76, 4.48]].map(u => ({ u, h: [5.07, 6.26], panes: 2 })),
    ...[[1.0, 2.0], [2.38, 3.35], [3.76, 4.5]].map(u => ({ u, h: [6.54, 6.83], panes: 2 })),
  ],
  blocks: [
    { name: 'deep eave', u: [0, 5.22], h: [7.5, 8.0], out: .4, depth: .8, colour: '#ecebe6' },
    { name: 'blank black board', u: [.19, 4.48], h: [3.57, 5.0], out: .1, depth: .06, colour: '#1e1e1e' },
    { name: 'blank black blade sign, held flat', u: [5.02, 5.14], h: [3.5, 7.07], out: .12, depth: .2, colour: '#1e1e1e' },
    beam(5.225, [3.21, 3.5]),
  ],
  piers: [[0, .3], [4.8, 5.125]],
  backFittings: [
    { name: 'steel grille', u: [.4, 1.2], h: [.4, 2.4], colour: '#5a5a58' },
    { name: 'glass shopfront', u: [2.1, 4.4], h: [.4, 3.0], colour: '#d8d8d4', glow: .06 },
  ],
};

const teal = '#2a8a8a';
export const no159 = {
  ...shop({ wall: '#e6b84a', trim: '#e2b445', pier: '#e6b84a', back: '#3a3430' }, { height: 7.9, ceiling: 3.3, roof: { type: 'gable', ridge: 9.4, ridgeDepth: .5, overhang: .4, colour: tile } }),
  id: 'sa-159', buildingIds: ['682928768'], kind: 'unnamed', unnamed: true,
  name: 'No. 159 Sims Avenue (May 2023 exterior, occupant not identified)', address: '159 Sims Avenue (the Lorong 19 corner, plate 159)',
  evidence: 'KartaView panoramas of May 2023 show the corner house at Lorong 19, ochre picked out in teal under tiled eaves: two windows either side of an air-conditioner, teal capitals and fascia, and over the five-foot way a white board lettered SIMS LIGHTING CENTRE in red, a string of prayer flags, a tall dark banner at the corner and a pink display board on a stand in front. Listings could not be checked (open question 84), so the board and the banner are drawn blank and no name is given. Its Lorong 19 face is plain, with the teal fascia carried round.' + rowNote,
  sources: [way('682928768'), kv('8348649', '2749'), kv('8348649', '2748')],
  windows: [[.82, 1.78], [3.78, 4.82]].map(u => ({ u, h: [4.97, 6.17], panes: 2 })),
  blocks: [
    { name: 'teal fascia', u: [0, 5.21], h: [7.14, 7.43], out: .08, depth: .16, colour: teal },
    ...[[0, .4], [4.8, 5.21]].flatMap(u => [{ name: 'teal capital', u, h: [6.9, 7.45], out: .1, depth: .2, colour: teal }, { name: 'teal pier capital', u, h: [4.14, 4.43], out: .1, depth: .2, colour: teal }]),
    { name: 'air-conditioner', u: [2.15, 3.0], h: [5.64, 6.26], out: .2, depth: .4, colour: '#e8e8e4' },
    { name: 'blank white board', u: [.18, 4.75], h: [3.29, 4.11], out: .1, depth: .06, colour: '#f2ece0' },
    { name: 'prayer flags, held flat', u: [0, 4.9], h: [2.86, 3.29], out: .1, depth: .02, colour: '#d86a8a' },
    { name: 'blank dark banner, held flat', u: [4.95, 5.18], h: [3.29, 6.93], out: .12, depth: .2, colour: '#7a3a3a' },
    { name: 'pink display board, held flat', u: [.05, 1.6], h: [.9, 2.7], out: .1, depth: .1, colour: '#e8b8c8' },
  ],
  piers: [[0, .35], [4.762, 5.112]],
  backFittings: [{ name: 'lighting shop', u: [.6, 4.75], h: [.3, 3.0], colour: '#5a4038', glow: .1 }],
  sides: [{ edge: 1, blocks: [{ name: 'teal fascia', u: [0, 21.3], h: [7.14, 7.43], out: .08, depth: .16, colour: teal }] }],
};

// West of Lorong 17: Nos. 135-143 and the corner at No. 145, read in solved frames of the 24 May drive. The road dips by
// Lorong 17's junction, so these frames' cameras ride about 2.0 m above the five-foot-way floor.
const westNote = ' Read on the source front in near-frontal frames of the 24 May 2023 drive, whose positions and headings are solved from five party walls (open question 84); those walls stand within 0.3 m of the source ones. Heights are above the five-foot-way floor and carry about ±0.4 m; the five-foot way\'s depth is estimated.';
const west = (colours, o = {}) => row({ trim: colours.wall, frame: '#2a2c2c', glass: '#2a3034', ...colours }, { height: 8.4, ceiling: 3.6, roof: { type: 'gable', ridge: 9.6, ridgeDepth: .5, overhang: .5, colour: '#c8786a' }, ...o });
const louvres = (us, h, colour = '#3a3a38') => us.map(u => ({ name: 'vent strip', u, h, out: .02, depth: .04, colour }));

export const no135 = {
  ...west({ wall: '#3a3c3e', trim: '#2e3032', glass: '#2a2e30', pier: '#3a3c3e', back: '#3a3836' }, { height: 8.6 }),
  id: 'sa-135', buildingIds: ['439168677'], kind: 'unnamed', unnamed: true,
  name: 'No. 135 Sims Avenue (May 2023 exterior, occupant not identified)', address: '135 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a charcoal house next to the QianJing pair: dark latticed and louvred windows across its upper floor, a large white board hung out from its east side, and over the five-foot way a black board lettered INTERIOR TIMES in red, over a glass front and a timber panel door. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given. The photographs put its west party wall about 1.3 m east of the source one, as if No. 133 were wider than its outline; its elevation is laid at its photographed positions from the east party wall, with the west strip a plain dark pier.' + westNote,
  sources: [way('439168677'), kv('8348649', '2742'), kv('8348649', '2743')],
  windows: [[2.0, 3.0], [3.15, 4.15], [4.3, 5.1]].map(u => ({ u, h: [5.1, 7.65], panes: 3 })),
  blocks: [
    { name: 'dark eave fascia', u: [0, 5.51], h: [8.3, 8.6], out: .3, depth: .6, colour: '#2a2c2e' },
    { name: 'dark ledge', u: [1.3, 5.2], h: [3.9, 4.2], out: .08, depth: .16, colour: '#2a2c2e' },
    { name: 'blank black board', u: [1.85, 4.85], h: [3.0, 3.75], out: .1, depth: .06, colour: '#1e1e1e' },
    { name: 'blank white board, held flat', u: [4.5, 5.3], h: [4.0, 6.8], out: .12, depth: .2, colour: '#f0f0ec' },
  ],
  piers: [[0, 1.75], [5.21, 5.51]],
  backFittings: [
    { name: 'glass front', u: [1.8, 3.05], h: [.2, 2.6], colour: '#3e4448', glow: .04 },
    { name: 'timber panel door', u: [3.1, 4.75], h: [.2, 2.6], colour: '#b07a4e' },
    { name: 'dark door', u: [4.75, 5.15], h: [.2, 2.6], colour: '#262626' },
  ],
};

export const no137 = {
  ...west({ wall: '#f0efea', trim: '#f0efea', frame: '#1e1e1e', glass: '#e4e4de', pier: '#f0efea' }, { height: 8.1, ceiling: 3.4 }),
  id: 'sa-137', buildingIds: ['439168816'], kind: 'unnamed', unnamed: true,
  name: 'No. 137 Sims Avenue (May 2023 exterior, occupant not identified)', address: '137 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a white house trimmed in black: three windows with closed white louvred shutters under stained-glass fanlights in black frames, vent strips above them and a black balustrade band below, and in the five-foot way a timber door, a black-framed window and white double doors under transom grilles. No board or sign is photographed, so no name is given.' + westNote,
  sources: [way('439168816'), kv('8348649', '2742')],
  windows: [[1.0, 2.15], [2.45, 3.65], [3.9, 5.05]].map(u => ({ u, h: [5.0, 6.55], panes: 2 })),
  blocks: [
    ...[[1.0, 2.15], [2.45, 3.65], [3.9, 5.05]].map(u => ({ name: 'stained-glass fanlight', u, h: [6.6, 7.15], out: .02, depth: .04, colour: '#7a90a8' })),
    ...louvres([[1.1, 2.05], [2.55, 3.55], [4.0, 4.95]], [7.33, 7.65]),
    { name: 'black eave fascia', u: [0, 5.509], h: [7.83, 8.1], out: .3, depth: .6, colour: '#1e1e1e' },
    { name: 'black balustrade band', u: [.6, 5.2], h: [3.85, 4.2], out: .1, depth: .1, colour: '#1e1e1e' },
  ],
  piers: [[0, .55], [5.21, 5.509]],
  backFittings: [
    { name: 'timber door', u: [.82, 1.74], h: [.2, 2.8], colour: '#b07a4e' },
    { name: 'black-framed window', u: [2.0, 3.07], h: [.9, 2.8], colour: '#2a2e30' },
    { name: 'white double doors', u: [3.12, 4.66], h: [.2, 2.6], colour: '#ecebe6' },
    ...[[2.0, 3.07], [3.12, 4.66]].map(u => ({ name: 'transom grille', u, h: [2.6, 2.85], out: .01, colour: '#2a2a2a' })),
  ],
};

export const no139 = {
  ...west({ wall: '#ecc8b8', trim: '#e6c0b0', frame: '#1e5a4a', glass: '#2a6a58', pier: '#ecc8b8', back: '#3a3634' }, { height: 8.6 }),
  id: 'sa-139', buildingIds: ['439168799'], kind: 'unnamed', unnamed: true,
  name: 'No. 139 Sims Avenue (May 2023 exterior, occupant not identified)', address: '139 Sims Avenue (plate 139)',
  evidence: 'KartaView panoramas of May 2023 show a pink house: three windows with green louvred shutters under fanlights, vent strips above them, a black board with gold lettering reading 新加坡瓊海同鄉會 QIONGHAI ASSOCIATION (SINGAPORE) below them, a pink dentil band, and over the five-foot way a black board reading MLC MEDIA LIGHTING CONCEPT, Media Aire-con Engineering Pte Ltd, over a glass shopfront hung with lamps and fans, with the plate 139 and a dark board at the east pier. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given.' + westNote,
  sources: [way('439168799'), kv('8348649', '2742')],
  windows: [[.73, 1.98], [2.23, 3.48], [3.73, 4.98]].map(u => ({ u, h: [5.0, 6.5], panes: 2, shutters: false })),
  blocks: [
    ...[[.73, 1.98], [2.23, 3.48], [3.73, 4.98]].map(u => ({ name: 'fanlight', u, h: [6.55, 7.08], out: .02, depth: .04, colour: '#3a6a5a' })),
    ...louvres([[.85, 1.9], [2.35, 3.4], [3.85, 4.9]], [7.25, 7.53]),
    { name: 'pink eave fascia', u: [0, 5.51], h: [8.25, 8.6], out: .3, depth: .6, colour: '#e2b4a2' },
    { name: 'blank black board', u: [.9, 4.73], h: [4.03, 4.97], out: .08, depth: .06, colour: '#1e1e1e' },
    { name: 'pink dentil band', u: [0, 5.51], h: [3.75, 4.0], out: .08, depth: .12, colour: '#e2b4a2' },
    { name: 'blank black board', u: [.31, 5.18], h: [2.75, 3.7], out: .1, depth: .06, colour: '#1e1e1e' },
    { name: 'blank dark blade sign, held flat', u: [5.39, 5.5], h: [3.8, 6.6], out: .12, depth: .2, colour: '#2a2a2a' },
  ],
  piers: [[0, .3], [5.18, 5.51]],
  backFittings: [
    { name: 'glass shopfront with lamps and fans', u: [.98, 4.06], h: [.2, 2.4], colour: '#c8c4bc', glow: .1 },
    { name: 'light timber door', u: [4.06, 5.06], h: [.2, 2.1], colour: '#d8c8a8' },
  ],
};

const plain141 = (o = {}) => west({ wall: '#ecebe6', frame: '#3a3c3c', glass: '#2a3034', pier: '#ecebe6' }, { height: 8.3, ceiling: 3.4, ...o });
export const no141 = {
  ...plain141(),
  id: 'sa-141', buildingIds: ['439168674'], kind: 'unnamed', unnamed: true,
  name: 'No. 141 Sims Avenue (May 2023 exterior, occupant not identified)', address: '141 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a white house, the twin of No. 143: three dark windows under grilled transoms and vent strips, a ledge with a row of small brackets, and in the five-foot way a grey roller shutter and a green door; a white board hangs at the east pier. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + westNote,
  sources: [way('439168674'), kv('8348649', '2742'), kv('8348649', '2743')],
  windows: [[.67, 1.77], [2.3, 3.32], [3.84, 4.9]].map(u => ({ u, h: [4.75, 6.25], panes: 2 })),
  blocks: [
    ...[[.67, 1.77], [2.3, 3.32], [3.84, 4.9]].map(u => ({ name: 'grilled transom', u, h: [6.33, 6.83], out: .02, depth: .04, colour: '#c8c8c2' })),
    ...louvres([[.7, 1.75], [2.3, 3.3], [3.85, 4.9]], [7.08, 7.37]),
    { name: 'white eave fascia', u: [0, 5.509], h: [7.75, 8.3], out: .3, depth: .6, colour: '#ecebe6' },
    { name: 'bracketed ledge', u: [0, 5.509], h: [3.5, 3.83], out: .1, depth: .2, colour: '#e2e1dc' },
    { name: 'blank white board, held flat', u: [5.33, 5.45], h: [3.67, 6.25], out: .12, depth: .2, colour: '#f0f0ec' },
  ],
  piers: [[0, .3], [5.21, 5.509]],
  backFittings: [
    { name: 'grey roller shutter', u: [.34, 3.05], h: [.25, 2.25], colour: '#a8aaa8' },
    { name: 'green door', u: [3.3, 4.14], h: [.25, 1.9], colour: '#3a7a4a' },
  ],
};

export const no143 = {
  ...plain141({ height: 7.9 }),
  id: 'sa-143', buildingIds: ['439168825'], kind: 'unnamed', unnamed: true,
  name: 'No. 143 Sims Avenue (May 2023 exterior, occupant not identified)', address: '143 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a white house, the twin of No. 141: three dark windows under stained-glass transoms and vent strips, a ledge with a row of small brackets, and in the five-foot way a grille door and a roller shutter under a red banner hung with lanterns. No board is photographed, so no name is given. Read in a different frame from No. 141, its heights come out about 0.4 m lower than its twin\'s; both are kept as read.' + westNote,
  sources: [way('439168825'), kv('8348649', '2743'), kv('8348649', '2742')],
  windows: [[1.04, 1.96], [2.49, 3.38], [3.93, 4.83]].map(u => ({ u, h: [4.42, 5.75], panes: 2 })),
  blocks: [
    ...[[1.04, 1.96], [2.49, 3.38], [3.93, 4.83]].map(u => ({ name: 'stained-glass transom', u, h: [5.87, 6.25], out: .02, depth: .04, colour: '#8a9aa8' })),
    ...louvres([[1.0, 2.0], [2.45, 3.45], [3.9, 4.9]], [6.53, 6.83]),
    { name: 'white eave fascia', u: [0, 5.51], h: [7.6, 7.9], out: .3, depth: .6, colour: '#ecebe6' },
    { name: 'bracketed ledge', u: [0, 5.51], h: [3.17, 3.5], out: .1, depth: .2, colour: '#e2e1dc' },
    { name: 'red banner with lanterns', u: [1.16, 4.66], h: [2.2, 2.5], out: .05, depth: .1, colour: '#c8282a' },
  ],
  piers: [[0, .36], [5.04, 5.51]],
  backFittings: [
    { name: 'grille door', u: [.96, 1.96], h: [.1, 2.4], colour: '#8a8a86' },
    { name: 'roller shutter', u: [1.36, 4.86], h: [.1, 2.67], colour: '#c8c8c4' },
  ],
};

export const no145 = {
  ...west({ wall: '#f2f1ec', trim: '#1ea89a', frame: '#1ea89a', glass: '#4a6070', pier: '#1ea89a' }, { height: 7.6, ceiling: 3.1, shellInset: .35 }),
  id: 'sa-145', buildingIds: ['439168849'], kind: 'unnamed', unnamed: true, frontEdge: 5,
  name: 'No. 145 Sims Avenue (May 2023 exterior, occupant not identified)', address: '145 Sims Avenue (the Lorong 17 corner, #145 on its blade)',
  evidence: 'KartaView panoramas of May 2023 show the corner house at Lorong 17, white framed in teal, with three faces: a short front to the avenue, a broad splay and a face down the lane, each with a large teal-framed window under a teal vent strip, teal columns at each turn and a teal band over the five-foot way, and printed DCA power-tool boards covering the ground floor. A red vertical board at the corner reads 南洋五金私人有限公司 NANYANG HARDWARE PTE LTD with #145, and on the splay an orange board reads NIPPON PAINT 南洋 NANYANG HARDWARE PTE LTD. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given. The photographed front runs only about 3.3 m from No. 143\'s party wall before the corner turns, where the source front runs 7.26 m (open question 85); until that is settled the front\'s elevation is laid at its photographed positions and the splay\'s elevation is drawn flat on the rest of the source front.' + westNote,
  sources: [way('439168849'), kv('8348649', '2743'), kv('8348649', '2744')],
  windows: [{ u: [.74, 2.31], h: [4.0, 6.25], panes: 1 }, { u: [4.0, 6.6], h: [4.0, 6.25], panes: 2 }],
  blocks: [
    { name: 'white eave', u: [0, 7.26], h: [7.25, 7.6], out: .4, depth: .8, colour: '#f2f1ec' },
    ...[[.8, 2.3], [4.1, 6.5]].map(u => ({ name: 'teal vent strip', u, h: [6.3, 6.75], out: .02, depth: .04, colour: '#1ea89a' })),
    { name: 'teal band', u: [0, 7.26], h: [3.08, 3.42], out: .1, depth: .2, colour: '#1ea89a' },
    ...[[0, .27], [2.72, 3.31], [6.95, 7.26]].map(u => ({ name: 'teal column', u, h: [.2, 7.25], out: .06, depth: .12, colour: '#1ea89a' })),
    { name: 'printed tool board', u: [.19, 2.64], h: [.1, 2.7], out: .03, depth: .04, colour: '#1e8a8a' },
    { name: 'blank red corner board, held flat', u: [3.24, 3.36], h: [2.33, 5.33], out: .12, depth: .2, colour: '#c8282a' },
    { name: 'blank orange board', u: [4.0, 6.4], h: [2.3, 3.05], out: .1, depth: .06, colour: '#e87a2a' },
  ],
  piers: [[.1, .4], [6.96, 7.26]],
  backFittings: [{ name: 'hardware shop', u: [3.4, 6.9], h: [.1, 2.9], colour: '#6a5a4a', glow: .06 }],
  sides: [3, 2].map(edge => ({ edge, blocks: [
    { name: 'teal band', u: [.1, edge === 3 ? 5.4 : 10.3], h: [3.08, 3.42], out: .08, depth: .16, colour: '#1ea89a' },
    { name: 'white eave', u: [0, edge === 3 ? 5.5 : 10.4], h: [7.25, 7.6], out: .12, depth: .24, colour: '#f2f1ec' },
  ] })),
};

// Lorong 19 to Lorong 21: four buildings standing free of party walls, set back behind gardens and a forecourt. No frame's
// position could be solved from walls here, and two frames 13 m apart are too close to triangulate their corners, so they
// are photographed massing on their source outlines: colours, storeys, roofs, the colonnade and the verandah as seen in
// oblique frames, with heights carrying about ±1.5 m (±4 m for No. 165).
/** Window rows for a block of about nine storeys: n windows of width w across a face of width W. */
const grid8 = (W, n, w) => [4.6, 7.9, 11.2, 14.5, 17.8, 21.1, 24.4, 27.7].flatMap(b => Array.from({ length: n }, (_, i) => {
  const c = .8 + w / 2 + (W - 1.6 - w) * i / (n - 1);
  return { u: [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)], h: [b, +(b + 1.6).toFixed(2)], panes: 2 };
}));
const massNote = ' Seen only obliquely in the May 2023 frames (open question 84), so it is modelled as photographed massing on its source outline: colours, storeys and roof as photographed, details approximate.';
const mass = (colours, o) => ({ reviewRoad: 'Sims Avenue', heldFlat: true, shellInset: .3, colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours }, ...o });

export const no165 = {
  ...mass({ wall: '#dcdedc' }, { frontEdge: 4, review: { distance: 18, pitch: 28 }, height: 30.0, ceiling: .2, fiveFootWay: .02, roof: { type: 'flat', colour: '#9a9c9a' } }),
  id: 'sa-165', buildingIds: ['682928722'], kind: 'unnamed', unnamed: true,
  name: 'No. 165 Sims Avenue (May 2023 massing, occupant not identified)', address: '165 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a tall block standing about 23 m back from the avenue, behind the bungalow at No. 167: grey lower storeys, a broad red band above them and white upper storeys, with balconies stacked at its east end, about nine storeys and 30 m high. The source way is named Harvest Care Centre, but no sign could be read and listings could not be checked (open question 84), so no name is given. Its height rests on an estimated distance and carries about ±4 m.' + massNote,
  sources: [way('682928722'), kv('8348649', '2752'), kv('8348649', '2751')],
  windows: [3, 6.3, 9.6, 12.9, 16.2, 19.5, 22.8, 26.1].flatMap(b => [[2.0, 4.0], [6.5, 8.5], [11.0, 13.0]].map(u => ({ u, h: [b + .8, b + 2.2], panes: 2 }))),
  blocks: [
    { name: 'grey lower storeys', u: [0, 16.97], h: [.2, 10.0], out: .02, depth: .04, colour: '#a8acac' },
    { name: 'red band', u: [0, 16.97], h: [10.0, 20.5], out: .02, depth: .04, colour: '#c8615a' },
    ...[6.3, 9.6, 12.9, 16.2, 19.5, 22.8].map(b => ({ name: 'balcony railing', u: [14.2, 16.4], h: [b + .3, b + 1.3], out: .3, depth: .6, colour: '#e8e8e4' })),
  ],
};

export const no167 = {
  ...mass({ wall: '#e8a84e', trim: '#f0efea', frame: '#f0efea', glass: '#e8e6de', back: '#e2a24a', pier: '#f0efea' }, { frontEdge: 1, review: { distance: 9, pitch: 14 }, height: 4.3, ceiling: 3.5, fiveFootWay: 2.2, roof: { type: 'hip', ridge: 7.6, colour: '#b4553d' } }),
  id: 'sa-167', buildingIds: ['682937224'], kind: 'unnamed', unnamed: true,
  name: 'No. 167 Sims Avenue (May 2023 massing, occupant not identified)', address: '167 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a single-storey ochre bungalow behind a garden fence and a tree: a red tiled hipped roof with a gable to the avenue, white louvred shutters along its side, an arched window, white columns and a white balustrade along a verandah. A white board at its gate could not be read, and listings could not be checked (open question 84), so no name is given.' + massNote,
  sources: [way('682937224'), kv('8348649', '2752'), kv('8348649', '2751')],
  windows: [{ u: [1.6, 2.6], h: [1.3, 3.0], panes: 2, arched: true, shutters: true }, { u: [8.5, 9.5], h: [1.3, 3.0], panes: 2, arched: true, shutters: true }],
  blocks: [
    { name: 'white balustrade', u: [.3, 10.86], h: [.3, 1.1], out: .05, depth: .1, colour: '#f0efea' },
    { name: 'white verandah beam', u: [0, 11.16], h: [3.3, 3.6], out: .05, depth: .1, colour: '#f0efea' },
  ],
  piers: [[.3, .6], [3.8, 4.1], [7.1, 7.4], [10.56, 10.86]],
};

export const no169 = {
  ...mass({ wall: '#ecebe6', trim: '#ecebe6', back: '#e8e6e0' }, { frontEdge: 2, review: { distance: 9, pitch: 10 }, height: 3.3, ceiling: .2, fiveFootWay: .02, roof: { type: 'gable', ridge: 5.0, ridgeDepth: .3, overhang: .4, colour: '#2e3a46' } }),
  id: 'sa-169', buildingIds: ['454254365'], kind: 'unnamed', unnamed: true,
  name: 'No. 169 Sims Avenue (May 2023 massing, occupant not identified)', address: '169 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a small white hut under a dark gabled roof on this site, its lower walls faced in blue tiles, with glass doors and a white board reading 藤原 豆腐 炸店 above them and Japanese notices in its windows; behind it a car park runs back from the avenue. Listings could not be checked (open question 84), so the board is drawn blank and no name is given. The hut is narrower than the source outline, which also takes in part of the car park; it is modelled over the whole outline.' + massNote,
  sources: [way('454254365'), kv('8348649', '2752')],
  windows: [{ u: [.6, 2.0], h: [1.1, 2.4], panes: 2 }, { u: [5.6, 7.0], h: [1.1, 2.4], panes: 2 }],
  blocks: [
    { name: 'blue tile dado', u: [0, 7.58], h: [.2, 1.0], out: .02, depth: .04, colour: '#8ab0c8' },
    { name: 'glass doors', u: [2.9, 4.7], h: [.2, 2.4], out: .02, depth: .04, colour: '#5a6a72' },
    { name: 'blank white board', u: [2.3, 5.3], h: [2.55, 3.1], out: .05, depth: .06, colour: '#f4f2ec' },
  ],
};

export const no177 = {
  ...mass({ wall: '#e2c6b4', trim: '#ece6dc', frame: '#e8e6e0', glass: '#2e6a8a', back: '#ecebe6', pier: '#f0efea' }, { frontEdge: 3, review: { distance: 10, pitch: 26 }, height: 16.0, ceiling: 4.5, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9c9a' } }),
  id: 'sa-177', buildingIds: ['454254366'], kind: 'unnamed', unnamed: true,
  name: 'No. 177 Sims Avenue (May 2023 massing, occupant not identified)', address: '177 Sims Avenue (the Lorong 21 corner, plate 177)',
  evidence: 'KartaView panoramas of May 2023 show a four-storey corner building at Lorong 21 behind a clipped garden: a white colonnade on its ground floor, beige-pink upper storeys with rows of small windows, a glazed blue stair tower and a cream top storey lettered 日蓮正宗佛教會(新加坡) NICHIREN SHOSHU BUDDHIST ASSOCIATION (SINGAPORE), with a pergola on the roof and the plate 177 at the corner. Listings could not be checked (open question 84), so the lettering is drawn as a blank band and no name is given. Its photographed corner stands about 7° west of the source corner as seen from frame 8348649/2755, so the outline may run long at the corner; it is kept until it can be measured.' + massNote,
  sources: [way('454254366'), kv('8348649', '2755'), kv('8348649', '2756'), kv('8348649', '2753')],
  windows: [5.6, 8.9, 12.2].flatMap(b => [2.5, 5.0, 7.5, 10.0, 12.5, 15.0, 17.5, 20.0, 22.5].map(u => ({ u: [u, u + .7], h: [b, b + 1.6], panes: 1 }))),
  blocks: [
    { name: 'cream top storey', u: [0, 24.63], h: [12.0, 16.0], out: .02, depth: .04, colour: '#ece6dc' },
    { name: 'blank lettering band', u: [3.0, 21.0], h: [14.4, 15.4], out: .04, depth: .04, colour: '#e4ded2' },
    { name: 'glazed stair tower', u: [.6, 2.0], h: [4.6, 15.6], out: .1, depth: .2, colour: '#2e6a8a' },
    { name: 'white colonnade fascia', u: [0, 24.63], h: [4.0, 4.6], out: .05, depth: .1, colour: '#f0efea' },
    { name: 'rooftop pergola', u: [6.0, 16.0], h: [16.0, 17.2], out: -2.0, depth: 3.0, colour: '#8ac0c8' },
  ],
  piers: [[0, .4], [4.0, 4.4], [8.0, 8.4], [12.1, 12.5], [16.2, 16.6], [20.2, 20.6], [24.23, 24.63]],
  backFittings: [{ name: 'glazed ground floor', u: [.5, 24.1], h: [.2, 3.6], colour: '#c8ccd0', glow: .04 }],
  sides: [{ edge: 2, blocks: [
    { name: 'cream top storey', u: [0, 10.14], h: [12.0, 16.0], out: .02, depth: .04, colour: '#ece6dc' },
    { name: 'white ground storey', u: [0, 10.14], h: [.2, 4.6], out: .02, depth: .04, colour: '#f0efea' },
  ], windows: [5.6, 8.9].map(b => ({ u: [3.5, 4.6], h: [b, b + 1.8], panes: 2 })) }],
};

// No. 105, set back 30-60 m behind the row of Nos. 107-133 (open question 90): only its upper storeys show over the row.
export const no105 = {
  ...mass({ wall: '#ece2c8', trim: '#e2d6b4', frame: '#4a4440', glass: '#2e3438' }, { frontEdge: 3, review: { distance: 58, pitch: 24 }, height: 32.0, ceiling: .2, fiveFootWay: .02, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'sa-105', buildingIds: ['439168666'], kind: 'unnamed', unnamed: true,
  name: 'No. 105 Sims Avenue (May 2023 massing, occupant not identified)', address: '105 Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show, over the row of Nos. 107-133, the upper storeys of a cream block of about nine storeys with rows of dark windows and pale yellow upper floors, its parapet lettered CHANCERLODGE COMPLEX. The source way carries the same name; listings could not be checked (open question 84), so no name is given, and the lettering is drawn as a blank band. Its height, about 32 m, comes from its parapet in solved frame 8348649/2742, about 65 m away, and carries about ±3 m.' + massNote,
  sources: [way('439168666'), kv('8348649', '2742'), kv('8344809', '3605')],
  windows: grid8(84.53, 16, 2.4),
  blocks: [
    { name: 'pale yellow upper floors', u: [.03, 84.47], h: [21.0, 30.5], out: .02, depth: .04, colour: '#e8d49a' },
    { name: 'blank lettering band', u: [30.0, 60.0], h: [30.6, 31.8], out: .04, depth: .04, colour: '#ecebe6' },
  ],
  sides: [{ edge: 2, windows: grid8(25.43, 5, 2.4) }],
};

export const simsAvenueNorth = [no105, no135, no137, no139, no141, no143, no145, no147, no149, no151, no153, no155, no157, no159, no165, no167, no169, no177, no183, no185, no187, no189, no191, no193, no195, no197, no199, no201, no203, no205];
export const simsAvenueNorthFrame = laneFrame, simsAvenueNorthLayout = laneLayout, simsAvenueNorthUpper = laneUpper, simsAvenueNorthReviews = laneReviews, simsAvenueNorthSides = laneSides;
