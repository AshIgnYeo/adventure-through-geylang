// Lorong 16 from Geylang Road to the edge of the extract (open question 61), built one building at a time as Lorong 21
// was: south down the west side, then north up the east side back to Geylang Road. Each elevation is read on the plane
// where the panoramas agree, and laid on its source edge, which is kept. Named only where a listing and a photographed
// sign agree. See docs/lorong-16-brief.md.
import { pano, way, search, lay, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

/** A grille over a dark recess (or open, for a railing or gate): bars about 0.25 m apart with three rails. */
const grille = (name, u, h, out, colour, step = .25, recess = true) => {
  const [l, r] = u, [b, t] = h, n = Math.max(2, Math.round((r - l) / step));
  return [
    ...(recess ? [{ name: `${name} recess`, u, h, out: out - .05, depth: .02, colour: '#34363a' }] : []),
    ...Array.from({ length: n + 1 }, (_, i) => ({ name, u: [+(l + (r - l) * i / n - .02).toFixed(3), +(l + (r - l) * i / n + .02).toFixed(3)].map(v => Math.min(r, Math.max(l, v))), h, out, depth: .04, colour })),
    ...[b, (b + t) / 2, t - .05].map(y => ({ name, u, h: [+y.toFixed(3), +(y + .05).toFixed(3)], out, depth: .04, colour })),
  ];
};
/** A scalloped canvas awning: a sloping band with a darker valance. */
const awning = (u, h, colour, valance, out = .7) => [
  { name: 'awning', u, h: [h[0] + .25, h[1]], out, depth: out * 2, colour },
  { name: 'awning valance', u, h: [h[0], h[0] + .25], out: out * 2 - .02, depth: .04, colour: valance },
];

// ---------------------------------------------------------------------------------------------
// 1-3. Ways 764372569, 764372571 and 764372570, Nos. 314, 312 and 310 Geylang Road, the Lorong 16 west corner: a row of
// three-storey shophouses under deep hoods, cream at the corner and at No. 312, grey at No. 310. Their Geylang Road
// fronts were read on one plane along No. 312's front (u_g west from the source party point of Nos. 312 and 314): four
// June 2024 Geylang Road panoramas agree on it 2.5 m in front of (north of) the source front, where the party walls stand
// at u_g = -0.6, 5.0 and 10.6, within 1 m of the source ones, and No. 314's front runs from its splay at u_g = -5.8. No.
// 314's lane face (edge 2, u north) was read on the plane where three lane panoramas agree, 1.75 m in front of (east of)
// its source edge: it runs about 27 m, from the splay to the back lane, against the 16.2 m source edge, so it is laid at
// its own scale from the splay (u_ph - 2.42) and its southern 11 m, beyond the outline, waits for open question 63. The
// fronts are laid proportionally on their own source edges. Heights are those of the Geylang Road drive; the lane
// panoramas, taken about 0.75 m below the five-foot way, read about 0.75 m higher.
const cream314 = '#ecdcb0', cream312 = '#ebe2c6', grey310 = '#8c989c', hoodShade = '#e2d6b4';
const at314 = s => [Math.max(0, +(s[0] - 2.42).toFixed(2)), Math.min(16.179, +(s[1] - 2.42).toFixed(2))];
const at314f = s => lay(-5.8, 3.02 / 5.2)(s).map(v => Math.min(3.02, Math.max(0, v)));
const at312 = s => lay(-.6, 5.669 / 5.6)(s).map(v => Math.min(5.669, Math.max(0, v)));
const at310 = s => lay(5.0, 5.835 / 5.6)(s).map(v => Math.min(5.835, Math.max(0, v)));
const floors16 = { first: [4.85, 6.05], second: [8.3, 9.45] };
// The row's hoods: a thin beam over the five-foot way, a deep ledge at the second floor and a deep roof slab.
const hoods16 = (w, colour = hoodShade) => [
  { name: 'five-foot way beam', u: [0, w], h: [3.2, 3.4], out: .1, depth: .2, colour },
  { name: 'second-floor hood', u: [0, w], h: [7.0, 7.2], out: .45, depth: .9, colour },
  { name: 'roof hood', u: [0, w], h: [10.9, 11.25], out: .5, depth: 1.0, colour },
];
const vents16 = spans => spans.flatMap(u => [{ u, h: [6.2, 6.5] }, { u, h: [9.6, 9.9] }]);
const wins16 = (spans, extra = {}) => spans.flatMap(u => [{ u, h: floors16.first, panes: 2, ...extra }, { u, h: floors16.second, panes: 2, ...extra }]);
const rowNote16 = ' The three houses from No. 310 to the corner were read together: four June 2024 Geylang Road panoramas (D065..., SGbX..., KMWZ..., rxHH...) agree on their fronts 2.5 m in front of (north of) the source front, where the party walls stand within 1 m of the source ones (No. 312 about 5.6 m wide against 5.67 m, No. 310 about 5.6 m against 5.84 m), and the registered satellite also puts the roofs about 3 m north. Each front is laid proportionally on its own source edge, pending open question 63. Heights were read on that plane: a beam over the five-foot way at 3.2-3.4 m, windows at 4.85-6.05 m and 8.3-9.45 m, a deep hood at 7.0-7.2 m and a deep roof slab at 10.9-11.25 m, with parapets at about 11.6 m; the lane panoramas, taken about 0.75 m below the five-foot way, read about 0.75 m higher.';
export const changJiang = {
  id: 'chang-jiang-g1', buildingIds: ['764372569'], kind: 'chang-jiang-g1', frontEdge: 2, reviewRoad: 'Lorong 16 Geylang', review: { distance: 6, pitch: 22 },
  name: 'Chang Jiang G1 Claypot Frog Porridge (June 2024 exterior)', address: '314 Geylang Road (the Lorong 16 west corner)',
  height: 11.6, ceiling: 3.2, fiveFootWay: 1.6, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a cream three-storey corner shophouse at Lorong 16 and Geylang Road, with a splayed corner and deep hoods wrapping it at the second floor and the roof: on Lorong 16, windows under louvred vents on both upper floors and a narrow window by the corner, over an open coffeeshop of red tables under a maroon scalloped awning on square columns, with a dark lit board in green and gold dots reading FROG PORRIDGE, FROG FARM FRANCHISE, 长江1号 beside a frog, 宫保田鸡粥 and a special offer, and a white stall board reading 建通蝦麵 KIAN THONG PRAWN NOODLE; on the splay, a board reading 海鮮田鸡粥 SEAFOOD & FROG PORRIDGE between two claypots; and on Geylang Road, two narrow windows on each floor beside a vertical board of dishes signed 长江1号. Google Maps lists Chang Jiang G1 Claypot Frog Porridge 长江1号, a restaurant, operating, at 314 Geylang Road, Singapore 389353, with its point just inside this way, so the corner is named after it and its three boards are redrawn in original type, the dishes drawn as plain plates and the lit board\'s smaller lines left out. Kian Thong Prawn Mee is listed only at Sims Vista, so its board is blank. Ho Kian Thong, also listed at 314, is closed. Three June 2024 lane panoramas (Y8N4..., epU_..., t5yp...) agree on the lane face 1.75 m in front of (east of) the source edge, where it runs about 27 m from the splay to the back lane, its brown back doors and an LPG store at the south end, against the 16.2 m source edge; it is laid at its own scale from the splay, and its southern 11 m, beyond the outline, is not drawn (open question 63).' + rowNote16,
  sources: [way('764372569'), search('Chang Jiang G1 Claypot Frog Porridge 314 Geylang Road'), pano('Y8N4oE6LyYX3XOrlOgvz0A', 250, 12, 100), pano('epU_kXrLWJOyHtmPT3xPew', 265, 10, 100), pano('t5ypPj9vaHlwphFWbCHmsQ', 300, 15, 90), pano('ZOYBFZtrBaCSEHWzi3ae4w', 228, 12, 60), pano('D065AKncXwLwyIGAKe_whQ', 200, 12, 90)],
  colours: { wall: cream314, trim: hoodShade, frame: '#3a3c3c', glass: '#46504e', pier: '#efeee9', back: '#7a4a40', floor: '#b8b2a6' },
  windows: [
    ...wins16([[3.6, 5.5], [8.4, 10.3], [13.1, 15.0]].map(at314)),
    ...wins16([at314([17.2, 17.65])], { panes: 1 }),
  ],
  vents: vents16([[3.6, 5.5], [8.4, 10.3], [13.1, 15.0]].map(at314)),
  blocks: [
    ...hoods16(16.179),
    ...awning([0, 16.08], [2.3, 3.15], '#8e3a40', '#6e2a30'),
    { name: 'blank white stall board', u: at314([8.5, 9.7]), h: [3.55, 4.25], out: .05, depth: .04, colour: '#ecece6' },
    { name: 'parapet coping', u: [0, 16.179], h: [11.45, 11.6], out: .05, depth: .1, colour: hoodShade },
  ],
  // The restaurant's lit board along the lane.
  boards: [{ u: at314([10.6, 16.6]), h: [3.5, 4.3], out: .08 }],
  piers: [[0, .3], ...[[6.0, 6.4], [11.0, 11.4], [16.0, 16.4]].map(at314), [15.85, 16.179]],
  backFittings: [
    { name: 'coffeeshop with red tables', u: [.3, 15.8], h: [.1, 3.0], colour: '#8a4a40', glow: .1 },
    { name: 'drinks fridges', u: at314([14.0, 15.6]), h: [.1, 2.0], out: .2, depth: .4, colour: '#c8ccd0', glow: .12 },
  ],
  sides: [{
    edge: 1, // the splay, u from the lane end
    windows: [{ u: [.9, 3.0], h: floors16.first, panes: 3 }, { u: [.9, 3.0], h: floors16.second, panes: 3 }],
    vents: [{ u: [1.2, 2.7], h: [6.2, 6.5] }, { u: [1.2, 2.7], h: [9.6, 9.9] }],
    blocks: [
      ...hoods16(3.94),
      ...awning([0, 3.94], [2.3, 3.15], '#8e3a40', '#6e2a30'),
      { name: 'coffeeshop', u: [.1, 3.84], h: [.1, 3.2], out: .02, depth: .04, colour: '#8a4a40', glow: .1 },
    ],
    // The SEAFOOD & FROG PORRIDGE board across the splay.
    boards: [{ u: [.25, 3.7], h: [3.5, 4.7], out: .12 }],
  }, {
    edge: 0, // the Geylang Road front, u west from the splay to the party wall with No. 312
    windows: wins16([[-3.7, -2.85], [-2.15, -1.3]].map(at314f), { panes: 1 }),
    vents: vents16([[-3.7, -2.85], [-2.15, -1.3]].map(at314f)),
    blocks: [
      ...hoods16(3.02),
      ...awning([0, 3.02], [2.3, 3.15], '#8e3a40', '#6e2a30'),
      { name: 'coffeeshop', u: [.05, 2.8], h: [.1, 3.2], out: .02, depth: .04, colour: '#8a4a40', glow: .1 },
      { name: 'party-wall column', u: [2.8, 3.02], h: [.1, 3.2], out: .1, depth: .2, colour: '#efeee9' },
    ],
    // The vertical board of dishes signed 长江1号, by the splay.
    boards: [{ u: at314f([-5.3, -4.4]), h: [3.55, 5.9], out: .12 }],
  }],
};

// Nos. 312 and 310 face Geylang Road; each is laid proportionally on its own source front (edge 0, u west).
export const no312 = {
  id: 'l16-geylang-312', buildingIds: ['764372571'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road', review: { distance: 7, pitch: 22 },
  name: 'No. 312 Geylang Road (June 2024 exterior, occupants not identified)', address: '312 Geylang Road',
  height: 11.6, ceiling: 3.2, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a cream three-storey shophouse next to the corner, two wide windows on each upper floor, an air-conditioner under the upper pair and a mesh railing round its roof terrace, over a shop of ladders and goods under a maroon awning, beneath a board reading CHANG JIANG FISHERIES FARM SUPERMARKET 长江牛蛙养鱼场 超市店 in English, Chinese and Vietnamese. No such business is listed. Google Maps lists Hwa Seng Furniture, operating, and four other businesses at 312 Geylang Road, but no sign for any of them was photographed, so no name is given and the board is blank.' + rowNote16,
  sources: [way('764372571'), search('312 Geylang Road Singapore'), pano('SGbXqDevOTBdLzV8UeDDwg', 175, 14, 90), pano('KMWZXnMwYIdwjtR9ZHLmug', 165, 14, 90)],
  colours: { wall: cream312, trim: hoodShade, frame: '#3a3c3c', glass: '#46504e', pier: '#efeee9', back: '#4a4642', floor: '#b8b2a6' },
  windows: wins16([[0, 1.95], [2.55, 4.45]].map(at312), { panes: 3 }),
  blocks: [
    ...hoods16(5.669),
    ...awning([.05, 5.62], [2.3, 3.15], '#8e3a40', '#6e2a30'),
    { name: 'blank fisheries supermarket board', u: at312([-.5, 4.8]), h: [3.45, 4.35], out: .08, depth: .04, colour: '#2e2c2a' },
    { name: 'air-conditioner', u: at312([2.75, 3.55]), h: [7.4, 7.9], out: .2, depth: .4, colour: '#e8e8e4' },
    ...grille('roof terrace mesh railing', [.1, 5.57], [11.6, 12.6], -.45, '#6a6c6a', .9, false),
  ],
  piers: [[.2, .45], [5.36, 5.6]], shellInset: .2,
  backFittings: [
    { name: 'shop of ladders and goods', u: [.3, 5.4], h: [.1, 2.9], colour: '#5a5048', glow: .06 },
    { name: 'aluminium ladder', u: [3.6, 4.1], h: [.1, 2.4], out: .4, depth: .1, colour: '#c8ccd0' },
  ],
};
export const bsMiniMart = {
  id: 'bs-mini-mart', buildingIds: ['764372570'], kind: 'bs-mini-mart', frontEdge: 0, reviewRoad: 'Geylang Road', review: { distance: 7, pitch: 22 },
  name: 'B & S Mini Mart (June 2024 exterior)', address: '310 Geylang Road',
  height: 11.6, ceiling: 3.2, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a grey three-storey shophouse, two windows of white glazing bars on each upper floor, green grilles on the lower pair and a mesh railing round its roof terrace, over a minimart under a blue awning, beneath a red board reading B & S MINIMART PRIVATE LTD. in English and Bengali with 310, GEYLANG ROAD, SINGAPORE 389349 and a panel of fish and poultry. Google Maps lists B & S Mini Mart Pte Ltd, a supermarket, operating, at 310 Geylang Road, Singapore 389349, with its point just inside this way, so it is named and its board is redrawn in original type, the Bengali line drawn as a plain band. The lettering on its awning advertises a product, not a business, and is not drawn.' + rowNote16,
  sources: [way('764372570'), search('B & S Mini Mart 310 Geylang Road'), pano('KMWZXnMwYIdwjtR9ZHLmug', 165, 14, 90), pano('rxHH3aE6uvw225UPp98KpA', 160, 14, 90)],
  colours: { wall: grey310, trim: '#a8b2b4', frame: '#e8ece8', glass: '#46504e', pier: '#d8dcd8', back: '#4a4642', floor: '#b8b2a6' },
  windows: [
    ...[[5.6, 7.25], [8.2, 10.05]].map(at310).map(u => ({ u, h: floors16.first, panes: 3 })),
    ...[[5.6, 7.25], [8.2, 10.05]].map(at310).map(u => ({ u, h: floors16.second, panes: 3 })),
  ],
  blocks: [
    ...hoods16(5.835, '#9aa6aa'),
    ...[[5.6, 7.25], [8.2, 10.05]].map(at310).flatMap(u => grille('green window grille', u, floors16.first, .05, '#3a7a5a', .3, false)),
    ...awning([.05, 5.78], [2.3, 3.2], '#2a3e7a', '#1e2e5e'),
    ...grille('roof terrace mesh railing', [.1, 5.74], [11.6, 12.6], -.45, '#6a6c6a', .9, false),
  ],
  // The red board across the house.
  boards: [{ u: at310([5.6, 10.6]), h: [3.55, 4.65], out: .08 }],
  piers: [[.22, .47], [5.5, 5.74]], shellInset: .22,
  backFittings: [{ name: 'minimart with goods', u: [.3, 5.55], h: [.1, 2.9], colour: '#6a5a3a', glow: .08 }],
};

export const lorong16 = [changJiang];
// The Geylang Road houses at the corner face Geylang Road, not the lane.
export const geylangRow16 = [no312, bsMiniMart];
export const lorong16Frame = laneFrame, lorong16Layout = laneLayout, lorong16Upper = laneUpper, lorong16Reviews = laneReviews, lorong16Sides = laneSides;
