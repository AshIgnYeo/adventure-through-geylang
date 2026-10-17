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

// ---------------------------------------------------------------------------------------------
// 4. Way 763764689, Nos. 6-18: a salmon-pink four-storey walk-up behind an open car park, under a low zinc roof with
// deep eaves. Teal-framed windows in raised surrounds, narrow and wide in turn, with two stair bays of grid glazing; on
// the ground floor, covered parking, a lounge under an orange tiled canopy, a blue-tiled car porch and two timber
// pavilions over the entrance plated 6A. The source outline's east face steps back about 1 m four times; the photographed
// façade is flat. It was read on one plane along edge 22 (u_ph north from its south end): four June 2024 lane panoramas
// (o1zP..., o1jX..., GYT7..., 3ZQq...), 25-28 m away, line up on a plane 2.6 m in front of (east of) that edge, where the
// façade runs from u_ph = -12.2 to 18.1, 30.3 m against the 31.3 m of the source face. It is laid proportionally along
// the source face (s north from its south-east corner) and sliced across its nine east edges, the four recessed ones
// included.
const pink689 = '#e6c6bc', teal689 = '#3e8a86', surround689 = '#86b6ae';
// East edges of the outline: [edge, s0, s1] along the face from its south-east corner.
const east689 = [[14, 0, 4.562], [16, 4.554, 6.801], [18, 6.80, 10.155], [20, 10.15, 12.397], [22, 12.41, 19.432], [24, 19.43, 21.788], [26, 21.78, 24.509], [28, 24.52, 27.428], [30, 27.42, 31.255]];
const at689 = s => lay(.2, 31.255 / 30.3)(s.map(u => u + 12.41)).map(v => Math.min(31.255, Math.max(0, v)));
const cols689 = [[-11.7, -10.08], [-8.9, -6.8], [-3.25, -1.25], [.25, 1.95], [3.6, 5.25], [6.75, 8.9], [12.25, 14.45], [15.5, 17.2]];
const stairs689 = [[-5.75, -4.05], [9.45, 11.3]];
const whole689 = {
  windows: cols689.flatMap(c => [[5.65, 7.45], [9.05, 10.85], [12.45, 14.25]].map(h => ({ u: at689(c), h, panes: 2, surround: true }))),
  blocks: [
    ...cols689.flatMap(c => [7.45, 10.85, 14.25].map(t => ({ name: 'transom vent', u: at689(c), h: [t - .45, t - .3], out: .03, depth: .02, colour: '#d8dcd6' }))),
    ...stairs689.flatMap(c => [[4.9, 5.8], [6.8, 8.6], [10.4, 12.2], [13.5, 14.4]].map(h => ({ name: 'stair bay grid glazing', u: at689(c), h, out: .02, depth: .04, colour: '#7a8486' }))),
    ...stairs689.flatMap(c => [6.8, 7.4, 8.0, 10.4, 11.0, 11.6].map(y => ({ name: 'grid glazing bar', u: at689(c), h: [y, y + .05], out: .05, depth: .02, colour: '#c8ccc8' }))),
    { name: 'deep eaves', u: [0, 31.255], h: [14.85, 15.1], out: .5, depth: 1.0, colour: '#8a8680' },
    // The ground floor's canopies, from the south: a zinc car porch, the lounge's orange tiles, a blue-tiled car porch,
    // the two timber pavilions over the 6A entrance and a tiled lean-to.
    { name: 'zinc car porch', u: at689([-12.2, -6.1]), h: [4.4, 4.75], out: 1.2, depth: 2.4, colour: '#7a6a5a' },
    { name: 'orange tiled canopy', u: at689([-5.55, 3.0]), h: [3.9, 4.9], out: 1.2, depth: 2.4, colour: '#e08a50' },
    { name: 'gate pillar with an orange cap', u: at689([-5.75, -4.9]), h: [0, 2.2], out: 1.6, depth: .6, colour: '#e0884a' },
    { name: 'blue-tiled car porch', u: at689([3.0, 8.1]), h: [4.6, 5.1], out: 1.2, depth: 2.4, colour: '#3a5a9a' },
    ...[[9.0, 12.4], [12.4, 15.9]].flatMap(u => [
      { name: 'timber pavilion roof', u: at689(u), h: [4.7, 5.15], out: 1.4, depth: 2.8, colour: '#5a5c5a' },
      { name: 'timber pavilion ridge', u: at689([u[0] + .8, u[1] - .8]), h: [5.15, 5.6], out: 1.4, depth: 1.6, colour: '#5a5c5a' },
      ...[u[0] + .2, u[1] - .3].map(p => ({ name: 'timber pavilion post', u: at689([p, p + .15]), h: [0, 4.7], out: 2.6, depth: .15, colour: '#3a3430' })),
    ]),
    { name: 'blank blue 6A plate', u: at689([9.8, 10.9]), h: [4.85, 5.2], out: 2.82, depth: .03, colour: '#4a8ac8' },
    { name: 'tiled lean-to', u: at689([15.9, 18.1]), h: [4.6, 4.9], out: 1.0, depth: 2.0, colour: '#6a6c6a' },
    ...[[-1.0, -.3], [.2, 1.0], [1.4, 2.1], [4.0, 4.8], [5.2, 5.9], [8.2, 8.9], [14.6, 15.2]].map(u => ({ name: 'air-conditioner', u: at689(u), h: [5.0, 5.5], out: .2, depth: .4, colour: '#e8e8e4' })),
  ],
  backFittings: [
    { name: 'shop with red lanterns', u: at689([-11.0, -6.4]), h: [.1, 3.2], colour: '#6a3a32', glow: .1 },
    { name: 'lounge doors under neon', u: at689([-4.6, 2.6]), h: [.1, 3.4], colour: '#3a2e2e', glow: .15 },
    { name: 'car porch', u: at689([3.0, 8.4]), h: [.1, 3.6], colour: '#4a4a46' },
    { name: 'pavilion entrance and rock garden', u: at689([9.2, 17.8]), h: [.1, 3.6], colour: '#4a4438', glow: .05 },
  ],
};
// The part of the elevation on one east edge, re-based at its s0.
const part689 = ([edge, s0, s1]) => {
  const keep = ([a, b]) => { const l = Math.max(a, s0), r = Math.min(b, s1 - .003); return r - l > .05 ? [+(l - s0).toFixed(3), +(r - s0).toFixed(3)] : null; };
  const cut = xs => xs.flatMap(x => { const u = keep(x.u); return u ? [{ ...x, u }] : []; });
  // A window cut at an edge's end keeps its surround inside the edge, and is dropped when less than 0.3 m remains.
  const W = s1 - s0 - .001, fit = w => { const [l, r] = [Math.max(w.u[0], .11), Math.min(w.u[1], W - .11)]; return r - l < .3 ? [] : [{ ...w, u: [+l.toFixed(3), +r.toFixed(3)] }]; };
  return { edge, windows: cut(whole689.windows).flatMap(fit), blocks: cut(whole689.blocks), backFittings: cut(whole689.backFittings) };
};
const front689 = part689(east689[4]);
export const no6 = {
  id: 'l16-6', buildingIds: ['763764689'], kind: 'unnamed', unnamed: true, frontEdge: 22, reviewRoad: 'Lorong 16 Geylang', review: { distance: 22, pitch: 18 },
  name: 'Nos. 6-18 Lorong 16 (June 2024 exterior, occupants not identified)', address: '6-18 Lorong 16 Geylang',
  height: 15.0, ceiling: 3.8, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 16.4, colour: '#8a5a48' },
  evidence: 'June 2024 Street View shows a salmon-pink four-storey walk-up behind an open car park on the west side of Lorong 16, under a low zinc roof with deep eaves: teal-framed windows in raised surrounds, narrow and wide in turn, eight columns on each upper floor, with two stair bays of grid glazing whose panes step by half a floor; on the ground floor, from the south, covered parking in front of a shop hung with red lanterns, a lounge under an orange tiled canopy with a lit welcome sign, an OPEN sign and a plate numbered 10, a blue-tiled car porch, two timber pavilions over the entrance plated 6A beside a rock garden, and a tiled lean-to. Google Maps gives geocoded addresses for Nos. 6, 8, 10, 12, 14 and 18 Lorong 16 on this block, and lists no business here; no name board was photographed, so no name is given. The source outline\'s east face steps back about 1 m four times, where the photographed façade is flat: four June 2024 lane panoramas (o1zP..., o1jX..., GYT7..., 3ZQq...), 25-28 m away, line up on a plane about 2.6 m in front of (east of) its longest step (the depth scores, weak at this range, peak at 2.25-2.75 m), where the façade runs about 30.3 m against the 31.3 m source face; the registered satellite puts its roof 4-6 m east of the outline, with deep eaves. It is laid proportionally along the source face and sliced across its nine east edges, the recessed ones included, pending open question 64. Heights were read on that plane: canopies at 3.9-5.1 m, windows with their surrounds at 5.5-7.6, 8.9-11.0 and 12.3-14.4 m, and the eaves at about 15 m, the roof rising to about 16.4 m.',
  sources: [way('763764689'), search('6 Lorong 16 Geylang Singapore'), pano('GYT7KOn6QA512aDNwGBvAA', 262, 8, 75), pano('o1jXgQxOmY0JXJ7F1mnoEg', 255, 8, 75), pano('3ZQqgioQm3wQleRlKAjrrQ', 285, 8, 75), pano('o1zPdNWSWM89tQnp0aWb0A', 245, 8, 75)],
  colours: { wall: pink689, trim: surround689, frame: teal689, glass: '#3e4a4c', pier: pink689, back: '#4a4642', floor: '#a8a296' },
  windows: front689.windows, blocks: front689.blocks, backFittings: front689.backFittings,
  piers: [[0, .3], [6.72, 7.022]],
  // Side faces have no five-foot way, so their open ground floor is drawn as a dark field with its fittings over it.
  sides: east689.filter(([e]) => e !== 22).map(part689).map(({ backFittings, ...side }) => ({
    ...side, blocks: [
      { name: 'open ground floor', u: [.02, +(east689.find(([e]) => e === side.edge)[2] - east689.find(([e]) => e === side.edge)[1] - .03).toFixed(3)], h: [.1, 3.8], out: .01, depth: .02, colour: '#3e3a36' },
      ...backFittings.map(f => ({ ...f, out: .03, depth: .02 })), ...side.blocks,
    ],
  })),
};

// ---------------------------------------------------------------------------------------------
// 5. Way 763764687, No. 20, Hotel 81 Geylang: a lavender hotel of four floors over a car park, its narrow east face on
// the lane in three steps: the main block, a middle bay and a stair tower crowned in steps, which rises highest and
// stands about 1 m forward; white ledges band the windows, a white board reading HOTEL 81 hangs over the car park, and a
// blade reading HOTEL 81 GEYLANG stands out between the middle bay and the tower. The face was read along its two
// collinear source edges (20 and 19, u_ph north from the south-east corner): four June 2024 lane panoramas agree on its
// south corner on the source line and on the tower about 1 m forward, where the face runs from u_ph = -0.4 to 12.0,
// 12.4 m against the 10.06 m source face. It is laid proportionally (x0.81) and sliced across the two edges.
const lilac687 = '#9ca8dc', ledge687 = '#eef0f4';
const at687 = s => lay(-.4, 10.06 / 12.4)(s).map(v => Math.min(10.058, Math.max(0, v)));
const rows687 = [[5.1, 6.6], [8.15, 9.7], [11.3, 12.8], [14.4, 16.0]];
const towerRows687 = [[3.8, 5.4], [7.2, 8.6], [10.3, 11.9], [13.5, 15.1], [16.9, 18.5]];
const whole687 = {
  windows: [
    ...[[.1, .85], [1.7, 3.5], [4.7, 6.0], [7.0, 8.8]].flatMap(c => rows687.map(h => ({ u: at687(c), h, panes: c[1] - c[0] < 1 ? 1 : 3, surround: true }))),
    ...towerRows687.map(h => ({ u: at687([10.3, 11.7]), h, panes: 2, surround: true, out: 1.02 })),
  ],
  blocks: [
    ...rows687.flatMap(([b, t]) => [{ name: 'white ledge', u: at687([-.4, 9.2]), h: [b - .2, b - .08], out: .1, depth: .2, colour: ledge687 }, { name: 'white ledge', u: at687([.9, 9.2]), h: [t + .1, t + .22], out: .1, depth: .2, colour: ledge687 }]),
    { name: 'parapet ledge', u: at687([-.4, 6.1]), h: [17.4, 17.6], out: .12, depth: .24, colour: ledge687 },
    { name: 'middle bay', u: at687([6.1, 9.2]), h: [3.4, 18.5], out: .15, depth: .3, colour: lilac687 },
    { name: 'stair tower', u: at687([9.2, 12.0]), h: [.13, 20.6], out: .5, depth: 1.0, colour: lilac687 },
    { name: 'stepped crown of the stair tower', u: at687([9.5, 11.7]), h: [20.6, 21.0], out: .5, depth: .8, colour: lilac687 },
    { name: 'car park beam', u: [0, 10.058], h: [3.3, 3.45], out: .05, depth: .1, colour: lilac687 },
    { name: 'blank number plate', u: at687([7.3, 7.9]), h: [3.45, 3.9], out: .17, depth: .02, colour: '#e8e8e4' },
  ],
  piers: [[-.4, .1], [5.1, 5.6], [8.9, 9.3]].map(at687),
  backFittings: [{ name: 'car park under the hotel', u: at687([.1, 11.6]), h: [.1, 3.2], colour: '#2e3032' }],
  // The white board over the car park, and the blade between the middle bay and the tower.
  boards: [{ u: at687([.9, 4.6]), h: [3.6, 4.3], out: .1 }],
  blades: [{ u: +at687([9.2, 9.2])[0].toFixed(2), out: [.15, 1.45], h: [10.4, 17.5] }],
};
const part687 = (edge, s0, s1) => {
  const keep = ([a, b]) => { const l = Math.max(a, s0), r = Math.min(b, s1); return r - l > .05 ? [+(l - s0).toFixed(3), +(r - s0).toFixed(3)] : null; };
  const cut = xs => xs.flatMap(x => { const u = keep(x.u); return u ? [{ ...x, u }] : []; });
  const W = s1 - s0, fit = w => { const [l, r] = [Math.max(w.u[0], .11), Math.min(w.u[1], W - .11)]; return r - l < .3 ? [] : [{ ...w, u: [+l.toFixed(3), +r.toFixed(3)] }]; };
  return { edge, windows: cut(whole687.windows).flatMap(fit), blocks: cut(whole687.blocks), piers: whole687.piers.map(keep).filter(Boolean), backFittings: cut(whole687.backFittings) };
};
const south687 = part687(20, 0, 5.03), north687 = part687(19, 5.03, 10.058);
export const hotel81Geylang = {
  id: 'hotel-81-geylang', buildingIds: ['763764687'], kind: 'hotel-81-geylang', frontEdge: 20, reviewRoad: 'Lorong 16 Geylang', review: { distance: 9, pitch: 26 },
  name: 'Hotel 81 Geylang (June 2024 exterior)', address: '20 Lorong 16 Geylang',
  height: 18.0, ceiling: 3.3, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a lavender hotel on the west side of Lorong 16, four floors of rooms over a car park, its narrow east face on the lane in three steps: the main block, with a narrow window and two wide ones on each floor between white ledges; a middle bay; and a stair tower, its windows at the landings, rising to about 20.6 m under a stepped crown and standing about 1 m forward. A white board reading HOTEL 81 in teal hangs over the car park beside a plate numbered 20, and a blade reading HOTEL 81 GEYLANG stands out between the middle bay and the tower; the long north and south walls are almost blank. Google Maps lists Hotel 81 Geylang at 20 Lorong 16 Geylang, Singapore 398863, with its point inside this way, and the source map names it, so it is named and its two signs are redrawn in original type. Four June 2024 lane panoramas (2YRD..., fiAm..., DIeq..., 3ZQq...) agree on the face\'s south corner on the source line and on the tower about 1 m forward, where the face runs about 12.4 m, from 0.4 m south of the source face to 2.3 m north of it, against 10.06 m; it is laid proportionally across the two source edges. Heights were read on that plane: the car park to 3.3 m, windows at 5.1-6.6, 8.15-9.7, 11.3-12.8 and 14.4-16.0 m, the main block\'s parapet at about 18 m and the middle bay\'s at 18.5 m.',
  sources: [way('763764687'), search('Hotel 81 Geylang 20 Lorong 16 Geylang'), pano('fiAmbtGnWtFj4iJB-TZ-6A', 260, 20, 80), pano('DIeq9U72OHmVQomR0vXobQ', 265, 20, 80), pano('2YRDXiSJdEBL2CpWbqIedQ', 300, 20, 80), pano('3ZQqgioQm3wQleRlKAjrrQ', 225, 20, 80)],
  colours: { wall: lilac687, trim: ledge687, frame: '#3a3c40', glass: '#46505a', pier: lilac687, back: '#2e3032', floor: '#8a5a4a' },
  windows: south687.windows, blocks: south687.blocks, piers: south687.piers, backFittings: south687.backFittings,
  boards: whole687.boards,
  sides: [{ edge: 19, windows: north687.windows, blocks: [
    { name: 'car park under the hotel', u: [.05, 4.98], h: [.13, 3.2], out: .01, depth: .02, colour: '#2e3032' },
    ...north687.piers.map(u => ({ name: 'car park column', u, h: [.13, 3.3], out: .1, depth: .2, colour: lilac687 })), ...north687.blocks,
  ], blades: whole687.blades.map(b => ({ ...b, u: +(b.u - 5.03).toFixed(2) })) }],
};

// ---------------------------------------------------------------------------------------------
// 6. Way 763764688, No. 24, Then Shen Temple 天善堂: a cream single-storey temple under a hipped roof, re-roofed in blue
// glazed tiles and wrapped in blue scaffold netting in June 2024, behind a red-brick boundary wall with a green glazed
// balustrade. Its east front (edge 3, u_ph north from the south corner) was read from the December 2022 drive, when it
// stood unwrapped: three panoramas agree on its corner piers about 1.5 m in front of the source edge, 14.8 m apart against
// the 16.04 m edge, under a zinc verandah about 3.5 m deep; the June 2024 drive puts the boundary wall about 7 m in
// front. It is laid proportionally (x1.08).
const cream688 = '#e8dcc0', red688 = '#b8302a', green688 = '#2e7a52';
const at688 = s => lay(0, 16.04 / 14.8)(s).map(v => Math.min(16.038, Math.max(0, v)));
// The boundary wall: red brick under a green glazed balustrade and a green tiled coping.
const wall688 = ([l, r]) => [
  { name: 'red brick boundary wall', u: [l, r], h: [0, 1.15], out: 7.0, depth: .3, colour: '#a8503e' },
  ...Array.from({ length: Math.round((r - l) / .28) }, (_, i) => ({ name: 'green glazed baluster', u: [+(l + .07 + i * .28).toFixed(3), +(l + .21 + i * .28).toFixed(3)].map(v => Math.min(r, v)), h: [1.15, 1.85], out: 7.0, depth: .14, colour: green688 })),
  ...Array.from({ length: Math.floor((r - l) / 3.2) + 1 }, (_, i) => ({ name: 'brick pier', u: [+Math.min(r - .4, l + i * 3.2).toFixed(3), +Math.min(r, l + i * 3.2 + .4).toFixed(3)], h: [0, 1.95], out: 7.0, depth: .36, colour: '#a8503e' })),
  { name: 'green tiled coping', u: [l, r], h: [1.85, 2.15], out: 7.0, depth: .4, colour: '#2a6a46' },
];
export const thenShen = {
  id: 'then-shen-temple', buildingIds: ['763764688'], kind: 'then-shen-temple', frontEdge: 3, reviewRoad: 'Lorong 16 Geylang', review: { distance: 14, pitch: 8 },
  name: 'Then Shen Temple (June 2024 exterior)', address: '24 Lorong 16 Geylang',
  height: 5.0, ceiling: 3.9, fiveFootWay: .3, roof: { type: 'hip', ridge: 7.6, colour: '#3a4a8a' },
  evidence: 'June 2024 Street View shows a single-storey temple on the west side of Lorong 16 under a hipped roof of new blue glazed tiles, its roof and north half wrapped in blue netting on scaffolding, which is not modelled: a zinc verandah on poles hung with red lanterns runs across its east front, over a black board lettered in gold 天善 and a grille door between two windows, behind a red-brick boundary wall with a green glazed balustrade and coping, a gold grille gate at the south end and a white one plated 24 at the north, their red pillars topped with green lions, and a red and yellow octagonal furnace inside the north gate. In December 2022 the same temple stood unwrapped under red tiles with dragons on its ridge: cream walls between white corner piers with red brackets, a chevron frieze in yellow, green and red, and a cream board reading 天善堂, from which the board\'s third character is taken. Google Maps lists Then Shen Temple, a place of worship, at 24 Lorong 16 Geylang, Singapore 398866, with its point inside this way, so it is named and its board is redrawn in original type. Three December 2022 lane panoramas (Fwgu..., ckR5..., tDR0...) agree on the corner piers about 1.5 m in front of the source edge, 14.8 m apart against the 16.04 m edge, and the verandah reaches about 3.5 m further; four June 2024 panoramas put the boundary wall about 7 m in front of the source edge. The front is laid proportionally on the edge. Heights were read on that plane: windows at 1.2-3.0 m, the frieze at 4.0-4.4 m, the verandah at about 4.6 m, the eaves at about 5 m and the ridge at about 7.6 m.',
  sources: [way('763764688'), search('Then Shen Temple 24 Lorong 16 Geylang'), pano('2YRDXiSJdEBL2CpWbqIedQ', 262, 5, 75), pano('Z8Z-ljVYEyMx7D21fBKcjQ', 265, 5, 75), pano('ckR5_la_6WbBbljHVwiIqg', 262, 6, 80), pano('FwgunrIkHngGPVr97s9cXw', 245, 6, 80)],
  colours: { wall: cream688, trim: '#f2ece0', frame: '#6a3a26', glass: '#3a3430', pier: '#f2f0ea', back: '#4a2e26', floor: '#a89a88' },
  windows: [[2.4, 4.4], [10.6, 12.6]].map(at688).map(u => ({ u, h: [1.2, 3.0], panes: 3 })),
  blocks: [
    ...[[2.4, 4.4], [10.6, 12.6]].map(at688).flatMap(u => [{ name: 'window grille', u, h: [1.2, 3.0], out: .04, depth: .02, colour: '#8a6a40' }]),
    { name: 'grille door', u: at688([5.6, 9.4]), h: [.1, 3.3], out: .02, depth: .04, colour: '#4a4440' },
    ...[[0, .6], [14.2, 14.8]].map(at688).flatMap(u => [
      { name: 'white corner pier', u, h: [.1, 4.9], out: .15, depth: .3, colour: '#f2f0ea' },
      { name: 'red bracket', u, h: [4.2, 4.9], out: .3, depth: .3, colour: red688 },
    ]),
    { name: 'chevron frieze', u: at688([.6, 14.2]), h: [4.0, 4.4], out: .03, depth: .04, colour: '#c8a840' },
    { name: 'red fascia under the eaves', u: [0, 16.038], h: [4.85, 5.05], out: .6, depth: 1.2, colour: '#7a2a2a' },
    // The zinc verandah on poles, hung with red lanterns.
    { name: 'zinc verandah', u: at688([1.0, 13.8]), h: [4.45, 4.7], out: 2.25, depth: 4.5, colour: '#b8bcb8' },
    ...[1.2, 5.4, 9.6, 13.6].map(p => ({ name: 'verandah pole', u: at688([p - .05, p + .05]), h: [0, 4.45], out: 4.3, depth: .1, colour: '#d8d8d4' })),
    ...Array.from({ length: 8 }, (_, i) => ({ name: 'red lantern', u: at688([1.8 + i * 1.55, 2.3 + i * 1.55]), h: [3.5, 4.15], out: 3.9, depth: .5, colour: '#c8282a', glow: .15 })),
    // The boundary wall, its gold south gate and white north gate between red pillars with green lions, and the furnace.
    ...grille('gold grille gate', at688([0, 1.5]), [0, 2.0], 7.0, '#c8a03a', .15, false),
    ...wall688([at688([2.1, 2.1])[0], 15.45]),
    // The white north gate stands beyond the outline's north end; its south pillar closes the wall.
    ...[at688([1.5, 2.1]), [15.45, 16.03]].flatMap(u => [
      { name: 'red gate pillar', u, h: [0, 2.4], out: 7.0, depth: .5, colour: red688 },
      { name: 'green lion', u: [+(u[0] + .1).toFixed(2), +(u[1] - .1).toFixed(2)], h: [2.4, 2.9], out: 7.0, depth: .3, colour: green688 },
    ]),
    { name: 'octagonal furnace', u: at688([13.6, 14.5]), h: [0, 2.6], out: 5.6, depth: .9, colour: '#e8b830' },
    { name: 'furnace roof', u: at688([13.5, 14.6]), h: [2.6, 3.4], out: 5.6, depth: 1.0, colour: red688 },
  ],
  // The board under the verandah, black with gold characters.
  boards: [{ u: at688([5.5, 9.5]), h: [3.85, 4.45], out: .06 }],
  backFittings: [{ name: 'temple hall', u: [.7, 15.3], h: [.1, 3.8], colour: '#4a2e26', glow: .08 }],
};

// ---------------------------------------------------------------------------------------------
// 7. Way 763764676, No. 30, Crystal Lodge: an eight-storey block of flats over an open car park, banded in white and
// beige, its lane face (edge 8, u north from the south-east corner) in three bays: a flat south bay, a recessed middle
// bay of balconies and a north bay of projecting ledges, with an open roof terrace on the top floor. Behind a white
// boundary wall lettered CRYSTAL ODGE (its L lost) and 30 LORONG 16 GEYLANG. Four June 2024 lane panoramas agree on the
// south and north bays on the source edge (depth scores peak at -0.75 to +0.5 m), from about 1 m north of the source
// corner to 31.6 m along; the wall's lettering triangulates 5.8 m in front.
const white676 = '#e6e2da', beige676 = '#cdbfa8';
const rows676 = [[6.2, 7.5], [9.3, 10.6], [12.5, 13.8], [15.7, 17.0], [18.9, 20.2], [22.1, 23.4]];
const wall676 = 5.8;
export const crystalLodge = {
  id: 'crystal-lodge', buildingIds: ['763764676'], kind: 'crystal-lodge', frontEdge: 8, reviewRoad: 'Lorong 16 Geylang', review: { distance: 14, pitch: 26 },
  name: 'Crystal Lodge (June 2024 exterior)', address: '30 Lorong 16 Geylang',
  height: 28.4, ceiling: 4.6, fiveFootWay: 3.0, upperInset: .1, shellInset: 1.0, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows an eight-storey block of flats on the west side of Lorong 16 over an open car park, banded in white and beige, its lane face in three bays: a flat south bay of narrow and wide windows, a recessed middle bay of balconies with grey railings, and a north bay whose windows sit between projecting ledges; on the top floor, open roof terraces under a deep parapet. A white boundary wall along the pavement, with white railings and gates, is lettered in raised grey capitals CRYSTAL ODGE, the L lost, over 30 LORONG 16 GEYLANG. Google Maps lists Crystal Lodge, an apartment building, at 30 Lorong 16 Geylang, Singapore 398870, with its point inside this way, and the source map names it, so it is named and its lettering is redrawn as photographed. Four June 2024 lane panoramas (gUrd..., 978C..., rTwd..., YJ5N...) agree on the south and north bays on the source edge, where the face runs from about 1 m north of the source corner to 31.6 m along, against the 32.6 m edge; the middle bay is recessed about 1.5 m. The lettering, triangulated between two panoramas, puts the boundary wall about 5.8 m in front. Heights were read on the source plane: the car park to about 4.6 m, windows at 6.2-7.5 m and on every 3.2 m above to 22.1-23.4 m, the top floor\'s terraces at 24.9-26.4 m and the parapet at about 28.4 m.',
  sources: [way('763764676'), search('Crystal Lodge 30 Lorong 16 Geylang'), pano('rTwd74g8I0xX5Kv269SUPw', 270, 15, 85), pano('978C2KrUtxtel_U9_J90Ow', 295, 15, 85), pano('YJ5NrMKa3ziNs3OkKvpTGA', 265, 15, 85), pano('gUrdY-azKFUqo5xT_-hfnA', 280, 15, 85)],
  colours: { wall: white676, trim: beige676, frame: '#5a6a68', glass: '#3e5a58', pier: white676, back: '#3a3a38', floor: '#9a968e' },
  windows: [
    ...[[1.5, 2.7], [4.3, 5.6], [7.3, 9.1]].flatMap(u => rows676.map(h => ({ u, h, panes: 2 }))),
    ...[[13.2, 15.4], [16.5, 18.0]].flatMap(u => rows676.map(h => ({ u, h: [h[0] - .3, h[1]], panes: 3 }))),
    ...[[20.0, 21.2], [22.3, 23.3], [24.7, 25.7], [28.4, 30.4]].flatMap(u => rows676.map(h => ({ u, h, panes: 2 }))),
    { u: [28.4, 30.4], h: [24.9, 26.3], panes: 2 },
  ],
  blocks: [
    // Beige bands at each floor slab, and the beige ground of the north bay's upper floors.
    ...[4.6, 7.9, 11.1, 14.3, 17.5, 20.7, 23.9].map(b => ({ name: 'beige floor band', u: [1.0, 31.6], h: [b, b + .9], out: .02, depth: .04, colour: beige676 })),
    { name: 'recessed balcony bay', u: [11.0, 19.8], h: [4.6, 27.4], out: -.04, depth: .03, colour: '#a8a294' },
    ...rows676.map(([b]) => ({ name: 'grey balcony railing', u: [11.4, 19.4], h: [b - .3, b + .5], out: .05, depth: .04, colour: '#8a8e8a' })),
    ...[7.9, 11.1, 14.3, 17.5, 20.7, 23.9].map(b => ({ name: 'projecting ledge', u: [19.8, 27.6], h: [b, b + .2], out: .45, depth: .9, colour: white676 })),
    { name: 'open roof terrace', u: [1.0, 4.6], h: [24.9, 26.4], out: -.03, depth: .02, colour: '#c8d0d4' },
    { name: 'dark terrace opening', u: [7.0, 10.4], h: [24.9, 26.2], out: -.03, depth: .02, colour: '#3a3e40' },
    { name: 'deep parapet', u: [1.0, 31.6], h: [27.4, 28.4], out: .25, depth: .5, colour: white676 },
    // The white boundary wall along the pavement: wall and pillars, railings over a car gate, and the bin centre.
    { name: 'white boundary wall', u: [0, 17.0], h: [0, 1.9], out: wall676, depth: .3, colour: '#ecebe6' },
    { name: 'white boundary wall', u: [19.6, 21.5], h: [0, 1.9], out: wall676, depth: .3, colour: '#ecebe6' },
    ...[0, 5.0, 11.0, 17.0, 19.6, 21.5, 28.0].map(p => ({ name: 'boundary wall pillar', u: [p, +(p + .6).toFixed(1)], h: [0, 2.5], out: wall676, depth: .55, colour: '#f2f1ec' })),
    ...grille('white railing gate', [17.6, 19.6], [0, 1.6], wall676, '#f2f1ec', .2, false),
    ...grille('white car gate', [22.1, 28.0], [0, 1.7], wall676, '#f2f1ec', .25, false),
    ...grille('white car gate', [28.6, 32.4], [0, 1.7], wall676, '#f2f1ec', .25, false),
    { name: 'louvred bin centre', u: [1.4, 4.6], h: [0, 3.4], out: 2.0, depth: 2.4, colour: '#e8e8e4' },
    { name: 'blank address plate', u: [18.0, 19.2], h: [.55, .75], out: wall676 + .17, depth: .02, colour: '#9a9a96' },
  ],
  piers: [[1.0, 1.6], [6.0, 6.6], [11.0, 11.6], [19.8, 20.4], [25.0, 25.6], [31.0, 31.6]],
  backFittings: [{ name: 'open car park', u: [1.6, 31.0], h: [.1, 4.4], colour: '#4a4a46' }],
  // The raised lettering on the boundary wall, by the gate.
  boards: [{ u: [14.0, 17.0], h: [.9, 1.75], out: wall676 + .18 }],
  sides: [{
    edge: 7, // the south wall, on the hoarded site
    windows: [[3.0, 4.2], [7.4, 8.6], [13.6, 14.8], [18.0, 19.2]].flatMap(u => rows676.map(h => ({ u, h, panes: 2 }))),
    blocks: [4.6, 7.9, 11.1, 14.3, 17.5, 20.7, 23.9].map(b => ({ name: 'beige floor band', u: [0, 22.245], h: [b, b + .9], out: .02, depth: .04, colour: beige676 })),
  }],
};

export const lorong16 = [changJiang, no6, hotel81Geylang, thenShen, crystalLodge];
// The Geylang Road houses at the corner face Geylang Road, not the lane.
export const geylangRow16 = [no312, bsMiniMart];
export const lorong16Frame = laneFrame, lorong16Layout = laneLayout, lorong16Upper = laneUpper, lorong16Reviews = laneReviews, lorong16Sides = laneSides;
