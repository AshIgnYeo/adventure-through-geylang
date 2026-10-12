// Exteriors in the widened ring east of Lorong 15: the Geylang Road corner block, the Lorong 15 east side
// north of it, and Sims Avenue Nos. 126-130. All unnamed. Positions were read on planes where two
// panoramas agree, then laid proportionally on the source fronts, which are kept; heights carry about ±0.4 m.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;

/** Alternating stripes (a striped valance or awning) as thin blocks between u0 and u1. */
const stripes = (name, [u0, u1], h, out, depth, colours, step = .25) => Array.from({ length: Math.ceil((u1 - u0) / step - 1e-9) }, (_, i) => ({
  name, u: [u0 + i * step, Math.min(u1, u0 + (i + 1) * step)], h, out, depth, colour: colours[i % colours.length],
}));

/** Keep the part of a run's elevation between `from` and `to`, re-based at `from`. */
function slice(spec, from, to) {
  const cut = xs => xs?.flatMap(x => {
    const l = Math.max(x.u[0], from), r = Math.min(x.u[1], to);
    return r - l > .02 ? [{ ...x, u: [l - from, r - from] }] : [];
  });
  return { ...spec, windows: cut(spec.windows), vents: cut(spec.vents), blocks: cut(spec.blocks), backFittings: cut(spec.backFittings) };
}

// ---------------------------------------------------------------------------------------------
// The corner block on Geylang Road's north side between Lorong 15 and Lorong 17 (way 454254264): a four-storey
// commercial block with five street faces. The Lorong 15 splayed corner (edge 4) is the front; the Geylang Road
// face (edge 3), the Lorong 15 face (edge 5), the Lorong 17 splayed corner (edge 2) and the Lorong 17 face (edge 1)
// carry their windows as side faces. Heights are the mean of the Geylang Road and corner readings, which differ
// by about 3.5%.
const B = { floors: [[4.9, 7.4], [8.1, 10.65], [11.3, 13.9]], bands: [[7.45, 7.92], [10.8, 11.24], [14.15, 14.65]], parapet: 15.85 };
const blue = '#2f55a8', coping = '#d9d8d2', brown = '#4b3a33';
const bandBlocks = spans => spans.flatMap(u => [...B.bands.map(h => ({ name: 'blue sunshade band', u, h, out: .45, depth: .9, colour: blue })), { name: 'coping', u, h: [15.65, 15.85], out: .15, depth: .3, colour: coping }]);
// The awning is kept 1.8 m deep, and stops short of the Lorong 15 corner, to stay clear of the modelled carriageways.
const awning = (from, to) => [
  { name: 'brown awning', u: [from, to], h: [3.95, 4.35], out: .9, depth: 1.8, colour: brown },
  { name: 'blank awning valance', u: [from, to], h: [3.1, 3.55], out: 1.78, depth: .04, colour: '#2c2a2a' },
];
const curtainMullions = (u0, u1, n, h) => [
  ...Array.from({ length: n + 1 }, (_, i) => u0 + (u1 - u0) * i / n).map(c => ({ name: 'curtain wall mullion', u: [Math.max(u0, c - .04), Math.min(u1, c + .04)], h, out: .26, depth: .04, colour: '#1f3f8c' })),
  ...[4.8, 7.7, 11.0, 14.4, 16.4].map(y => ({ name: 'curtain wall transom', u: [u0, u1], h: [y - .06, y + .06], out: .26, depth: .04, colour: '#1f3f8c' })),
];
const W3 = 22.863, W5 = 11.849, W2 = 7.323, W1 = 14.926;
// The Lorong 17 faces (open question 35). The splay photographs 8.8 m wide on its source plane, where two panoramas
// agree, from 0.2 m along it; the Lorong 17 face about 13.5 m, read on a plane 0.9 m in front of its source edge,
// where the band spacing matches the other faces. Both are laid proportionally on their source edges.
const uS = s => +((s - .2) * W2 / 8.8).toFixed(2), uF = s => +((s - .5) * W1 / 13.5).toFixed(2);
const towerMullions = (u0, u1, h) => [
  ...[0, 1, 2, 3].map(i => u0 + (u1 - u0) * i / 3).map(c => ({ name: 'stair tower mullion', u: [Math.max(u0, c - .04), Math.min(u1, c + .04)], h, out: .26, depth: .04, colour: '#1f3f8c' })),
  ...[5.8, 7.0, 8.2, 9.4, 10.6, 11.8, 13.0, 14.2, 15.4].map(y => ({ name: 'stair tower transom', u: [u0, u1], h: [y - .05, y + .05], out: .26, depth: .04, colour: '#1f3f8c' })),
];
// The closed Bee Cheng Hiang shop at the Lorong 17 corner: red awning, yellow boards and vertical signs, all blank.
const redAwning = (from, to) => [
  { name: 'red awning', u: [from, to], h: [3.95, 4.35], out: .9, depth: 1.8, colour: '#c23a2e' },
  { name: 'blank red awning valance', u: [from, to], h: [3.1, 3.55], out: 1.78, depth: .04, colour: '#a52a22' },
];
const yellow = '#f0c419';
export const corner301 = {
  id: 'sheng-siong-301', buildingIds: ['454254264'], kind: 'sheng-siong-301', frontEdge: 4, reviewRoad: 'Geylang Road',
  name: 'Sheng Siong Supermarket and Anytime Fitness Geylang Central (June 2024 exterior)',
  address: '301 Geylang Road (Lorong 15 to Lorong 17)',
  height: B.parapet, ceiling: 4.45, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#a7a59e' },
  evidence: 'Way 454254264 is a modern four-storey block, not a shophouse, so it is modelled plainly. June 2024 Street View shows white walls, three floors of orange-framed window bands under projecting blue sunshade bands on all three street faces, a blue glass curtain-wall bay on the Geylang Road face rising to a rooftop sign reading BCH@301, a black gym blade sign, and a 24-hour supermarket under a long brown awning wrapping the splayed corner, with green supermarket lettering on the corner\'s first-floor glazing and blue wave murals along the Lorong 15 ground floor. On Lorong 17, a second splayed corner carries the supermarket\'s 昇菘超市 lettering on its first-floor glazing over a Bee Cheng Hiang shop (red awning, yellow boards and vertical signs), and the Lorong 17 face has one window bay, a blue glass stair tower rising just above the parapet over a lobby door, and a shuttered unit under a dark awning. Google Maps lists Sheng Siong Supermarket (#01-02, open 24 hours) and Anytime Fitness Geylang Central (#04-01, open 24 hours) at 301 Geylang Road in October 2026, with their shared point inside this way, so the block is named after them: the supermarket\'s window lettering and awning valances and the gym\'s blade are redrawn in original type, with no claim about the other floors. Bee Cheng Hiang\'s listing at 301 Geylang Road is marked permanently closed, so its boards stay blank, and the BCH@301 rooftop sign is left blank with it. Two June 2024 panoramas agree on the Geylang Road face on the source front, where it photographs about 24.9 m long against the 22.9 m source edge; the corner face photographs about 9 m against 11.7 m, and the Lorong 15 face, read on April 2024 panoramas, about 1.4 m behind its source edge. On Lorong 17, two panoramas from different sides agree on the splay on its source plane, where it photographs about 8.8 m wide against the 7.3 m source edge; the Lorong 17 face, read on an April 2024 panorama square to it, photographs about 13.5 m against the 14.9 m source edge, on a plane about 0.9 m in front of it where its band spacing matches the other faces. Window bays are laid proportionally on each source edge; storey heights are the mean of the Geylang Road and corner readings.',
  sources: [way('454254264'), pano('-tVuCuhwTBBFqueftEw2DQ', 40, 15, 100), pano('Y1SvdAjAS2SvYC5qQMSPuw', 20, 15, 90), pano('4Jat29IpmSnlxt5arsXTmQ', 330, 20, 110), pano('e01RVJ9hD_jReamZvvSPpA', 20, 15, 100), pano('-c4xoia0Omo8Xivp3SgiTA', 60, 15, 100), pano('I9194KuNbTrP1n1u2naA7w', 80, 15, 100),
    pano('xZa10M9A9cBOuqHgQL5w5A', 300, 15, 100), pano('R0licFeVz38dKLAM_gICTg', 320, 15, 100), pano('BUPeoAsGocsyXOdFQHewCw', 250, 25, 110), pano('PcP8fdxa3FdNxOSFtx1EAA', 318, 12, 90),
    'https://www.google.com/maps/search/?api=1&query=Sheng+Siong+Supermarket+301+Geylang+Road', 'https://www.google.com/maps/search/?api=1&query=Anytime+Fitness+Geylang+Central'],
  colours: { wall: '#e8e8e4', trim: blue, frame: '#c87a2c', glass: '#5f7f7c', pier: '#e8e8e4', back: '#3a3c3c', floor: '#a49f96' },
  bands: [...B.bands.map(([b, t]) => [b, t, .9, blue]), [15.65, 15.85, .3, coping]],
  windows: B.floors.map(h => ({ u: [.9, 11.0], h, panes: 9 })),
  blocks: awning(2.4, 11.749),
  // The supermarket's window banner and the awning valance, drawn in ring-a.ts.
  boards: [{ u: [.8, 10.7], h: [6.0, 7.0], out: .03 }, { u: [2.4, 11.749], h: [3.1, 3.55], out: 1.81 }],
  piers: [[0, .5], [11.25, 11.749]],
  backFittings: [{ name: 'supermarket entrance', u: [.5, 11.25], h: [.1, 4.2], colour: '#3d4646', glow: .15 }],
  sides: [
    {
      edge: 3, // Geylang Road, u east from the corner face
      windows: B.floors.flatMap(h => [{ u: [.65, 1.71], h, panes: 1 }, { u: [2.23, 6.57], h, panes: 5 }, { u: [14.72, 21.68], h, panes: 8 }]),
      blocks: [
        ...bandBlocks([[0, 6.78], [14.45, W3]]),
        { name: 'blue glass curtain wall', u: [6.78, 14.45], h: [4.75, 16.45], out: .12, depth: .24, colour: '#3c6a96' },
        ...curtainMullions(6.78, 14.45, 6, [4.75, 16.45]),
        { name: 'blank rooftop sign', u: [8.0, 14.16], h: [16.75, 18.45], out: .12, depth: .3, colour: '#30485f' },
        ...awning(0, W3),
        { name: 'supermarket front', u: [.3, 22.56], h: [.13, 3.9], out: .03, depth: .04, colour: '#3d4646', glow: .15 },
      ],
      boards: [{ u: [0, W3], h: [3.1, 3.55], out: 1.81 }],
      blades: [{ u: 14.56, out: [.15, 1.05], h: [11.8, 15.0] }],
    },
    {
      edge: 5, // Lorong 15, u south from the north corner
      windows: B.floors.flatMap(h => [{ u: [.6, 5.1], h, panes: 4 }, { u: [5.7, 11.6], h, panes: 5 }]),
      blocks: [
        ...bandBlocks([[0, W5]]),
        { name: 'blank blue mural panel', u: [.25, 5.0], h: [1.8, 4.0], out: .03, depth: .04, colour: '#3f6fb5' },
        { name: 'blank blue mural panel', u: [5.55, 11.6], h: [1.8, 4.0], out: .03, depth: .04, colour: '#3f6fb5' },
      ],
    },
    {
      edge: 2, // the Lorong 17 splayed corner, u north-east from the Geylang Road face
      windows: B.floors.map(h => ({ u: [uS(1.28), uS(8.15)], h, panes: 7 })),
      blocks: [
        ...bandBlocks([[0, W2]]),
        ...redAwning(uS(1.0), W2),
        ...[[1.5, 3.6], [4.25, 5.4], [6.1, 8.1]].map(([a, b]) => ({ name: 'blank yellow board', u: [uS(a), uS(b)], h: [4.38, 4.78], out: .05, depth: .04, colour: yellow })),
        { name: 'blank yellow vertical sign', u: [0, .3], h: [4.9, 7.6], out: .12, depth: .06, colour: yellow },
        { name: 'shop front', u: [.3, W2 - .2], h: [.13, 3.9], out: .03, depth: .04, colour: '#3d4646', glow: .15 },
      ],
      // The supermarket's 昇菘超市 lettering on the first-floor glazing.
      boards: [{ u: [uS(2.35), uS(7.1)], h: [5.95, 6.65], out: .04 }],
    },
    {
      edge: 1, // Lorong 17, u north from the splayed corner
      windows: B.floors.map(h => ({ u: [uF(1.2), uF(7.4)], h, panes: 6 })),
      blocks: [
        ...bandBlocks([[0, uF(7.63)]]),
        { name: 'coping', u: [uF(12.0), W1], h: [15.65, 15.85], out: .15, depth: .3, colour: coping },
        { name: 'blue glass stair tower', u: [uF(7.63), uF(12.0)], h: [4.6, 16.2], out: .12, depth: .24, colour: '#3c6a96' },
        ...towerMullions(uF(7.63), uF(12.0), [4.6, 16.2]),
        ...redAwning(0, 2.5),
        { name: 'blank yellow vertical sign', u: [.1, .45], h: [4.9, 7.6], out: .12, depth: .06, colour: yellow },
        { name: 'shop front', u: [uF(1.2), uF(3.75)], h: [.13, 3.6], out: .03, depth: .04, colour: '#3d4646', glow: .15 },
        { name: 'blank food photo board', u: [uF(4.1), uF(4.7)], h: [2.45, 3.15], out: .03, depth: .03, colour: '#c99a6b' },
        { name: 'blank food photo board', u: [uF(4.1), uF(4.7)], h: [1.35, 2.05], out: .03, depth: .03, colour: '#c99a6b' },
        { name: 'dark awning', u: [uF(4.75), uF(8.0)], h: [3.5, 3.85], out: .5, depth: 1.0, colour: '#3f4a55' },
        { name: 'roller shutter', u: [uF(5.25), uF(7.75)], h: [.13, 3.0], out: .03, depth: .04, colour: '#b9bbb8' },
        { name: 'stair tower lobby', u: [uF(8.5), uF(10.1)], h: [.13, 3.0], out: .03, depth: .04, colour: '#2f3436', glow: .1 },
        { name: 'glazed lobby panel', u: [uF(10.25), uF(11.3)], h: [.13, 3.0], out: .03, depth: .04, colour: '#6d8790' },
        { name: 'grilled gate', u: [uF(13.0), uF(13.75)], h: [.13, 2.3], out: .03, depth: .04, colour: '#7d827f' },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------------
// Lorong 15 east side, April 2024 (the only 2024 drive on this lorong). Heights above the five-foot-way floor.
const lorong15Note = 'Lorong 15 has no June 2024 drive; the April 2024 panoramas are the nearest 2024 captures.';

// No. 2 Lorong 15 (way 454254234): u runs south from the north party wall. The two-storey front with its
// verandah photographs about 7.9 m wide on a plane 0.7 m behind the source front; laid on the 9.48 m source edge.
const k2 = 9.477 / 7.9, u2 = s => +((s + .6) * k2).toFixed(2);
export const no2 = {
  id: 'bengal-kitchen', buildingIds: ['454254234'], kind: 'bengal-kitchen', frontEdge: 3, reviewRoad: 'Lorong 15 Geylang', review: { distance: 3, pitch: 24 },
  name: 'Bengal Kitchen (April 2024 exterior)', address: '2 Lorong 15 Geylang',
  height: 7.1, ceiling: 4.25, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#6b6560' },
  evidence: 'Source way 454254234 is tagged No. 2. April 2024 Street View shows a white two-storey house with an open first-floor verandah behind a solid parapet under a corrugated lean-to roof, and a white top storey with a glazed band under a metal roof set about 3 m back on its south half. An eating house fills the ground floor behind a red-and-white striped valance, a green board (reading BENGAL KITCHEN, with the address 2 Lorong 15 Geylang) and a deep maroon gas-supplier awning, with a blade sign above. Google Maps lists Bengal Kitchen, a coffee shop open in October 2026, at 2 Lor 15 Geylang, Singapore 388596, with its point inside this source way, so the board names the eating house and is redrawn in original type; the valance, the gas supplier\'s awning and the blade stay blank, and no claim is made about the upper floors. The verandah edge and board ends were triangulated from two April 2024 panoramas: the front stands about 0.7 m behind the source front and the house photographs about 7.9 m wide against the 9.48 m source edge, so positions are scaled onto the source edge; the awning is kept shallow because the source front lies 3.5 m from the lorong\'s centreline. ' + lorong15Note,
  sources: ['https://www.google.com/maps/search/?api=1&query=Bengal+Kitchen+2+Lorong+15+Geylang', way('454254234'), pano('j0nZRLW-MxVya_i7dxzbqQ', 80, 12, 80), pano('JkzvyVlpsRIrT46kkKGr6w', 40, 12, 80), pano('CmAFX4qNXE-oR382np4z9w', 95, 12, 80)],
  colours: { wall: '#ecebe4', trim: '#dddbd3', frame: '#3a3f42', glass: '#3e474b', pier: '#ecebe4', back: '#3a3532', floor: '#a19b90' },
  windows: [{ u: [6.9, 7.9], h: [5.25, 6.35], panes: 2 }],
  vents: [{ u: [6.9, 7.9], h: [6.45, 6.75] }],
  blocks: [
    { name: 'open verandah', u: [.15, 6.4], h: [5.1, 6.95], out: .005, depth: .02, colour: '#4a4642' },
    ...[[.05, .25], [3.15, 3.33], [6.15, 6.35]].map(u => ({ name: 'verandah post', u, h: [5.1, 6.95], out: .05, depth: .1, colour: '#eeeae0' })),
    { name: 'verandah lean-to roof', u: [0, u2(4.9)], h: [6.95, 7.15], out: .12, depth: .24, colour: '#5d5650' },
    { name: 'set-back top storey', u: [u2(2.85), 9.4], h: [7.1, 8.45], out: -5.5, depth: 5.0, colour: '#ecebe4' },
    { name: 'top-storey glazing', u: [u2(2.85) + .15, 9.2], h: [7.25, 8.2], out: -2.975, depth: .05, colour: '#4b5a60' },
    { name: 'top-storey metal roof', u: [u2(2.85) - .25, 9.477], h: [8.45, 8.7], out: -5.3, depth: 5.6, colour: '#7d8487' },
    { name: 'blank maroon awning', u: [0, 9.477], h: [1.95, 3.6], out: .17, depth: .1, colour: '#7a1f2a' },
    ...stripes('blank striped valance', [0, 9.477], [3.65, 4.25], .2, .04, ['#c8443a', '#f2f0ea']),
  ],
  board: { u: [u2(2.37), 9.3], h: [3.55, 4.35], out: .24 },
  piers: [[0, .25], [9.23, 9.477]],
  backFittings: [{ name: 'eating house', u: [.3, 9.2], h: [.1, 3.2], colour: '#3a332e', glow: .12 }],
};

// Way 454254235 holds a pair of two-storey shophouses under one stepped parapet and a three-storey block
// south of them. Two April 2024 panoramas agree on the façade 3.3 m in front of the source front (as the
// Teck Hoe sign ends and a shop column triangulate), where the row runs 0.03-29.70 m along the edge;
// it is laid on the 30.27 m source edge. u runs south from the north end.
const k35 = 30.274 / 29.67, u35 = s => +((s - .03) * k35).toFixed(2);
const at35 = (a, b) => [u35(a), u35(b)];
export const row235 = {
  id: 'l15-east-row', buildingIds: ['454254235'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 15 Geylang', review: { distance: 5, pitch: 22 },
  name: 'Two- and three-storey row, Lorong 15 east side north of No. 2 (April 2024 exterior, occupants not identified)', address: 'Lorong 15 Geylang, east side, north of No. 2 (one unit numbered 8)',
  height: 7.6, ceiling: 2.97, fiveFootWay: 2.0, shellInset: .14, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'April 2024 Street View shows, from the north, a pair of white two-storey shophouses under one stepped parapet with four windows under louvred vents and a long hood (a sports club and mutual-benefit organisation board and a beauty saloon below), then a white three-storey block numbered 8: a narrow bay with one window per floor over an air-conditioning parts shop lettered on the fascia, a yellow-and-teal framed middle with glass-block windows and a projecting glazed balcony under green corrugated awnings with a grilled loggia above, and a plain south bay over a shuttered unit and a green door. The occupants were not matched to listings in this pass, so no name is given and the boards and lettering are left off. The two panoramas agree on the façade only 3.3 m in front of the source front; it stands on the source front, with positions scaled by 1.02 onto the source edge. ' + lorong15Note,
  sources: [way('454254235'), pano('pGMXxZekZXq_40rZyzjlcg', 75, 15, 110), pano('CmAFX4qNXE-oR382np4z9w', 30, 15, 80), pano('sk190g6HmylnIEWoWujUmA', 100, 15, 80), pano('mFm6Pl0Vtj8E29n4qWL8ig', 80, 10, 110)],
  colours: { wall: '#efeee8', trim: '#dedcd4', frame: '#30363a', glass: '#3e4a50', pier: '#efeee8', back: '#3a3532', floor: '#a19b90' },
  bands: [[2.97, 3.22, .3]],
  windows: [
    ...[[.65, 2.4], [3.4, 5.2], [6.3, 8.2], [9.2, 11.0]].map(([a, b]) => ({ u: at35(a, b), h: [4.47, 5.55], panes: 3 })),
    { u: at35(12.7, 14.6), h: [7.95, 9.15], panes: 2 }, { u: at35(12.76, 14.7), h: [4.61, 5.75], panes: 2 },
    // Inside the yellow panel the windows stand just proud of it.
    { u: at35(16.2, 18.7), h: [8.05, 9.25], panes: 3, out: .02 }, { u: at35(16.3, 18.7), h: [4.69, 5.81], panes: 3, out: .02 },
    { u: at35(27.1, 28.7), h: [8.45, 9.55], panes: 2 }, { u: at35(27.0, 28.9), h: [4.95, 6.11], panes: 2 },
  ],
  vents: [
    ...[[.6, 2.5], [3.3, 5.2], [6.3, 8.2], [9.1, 11.0]].map(([a, b]) => ({ u: at35(a, b), h: [5.88, 6.13] })),
    { u: at35(27.4, 28.6), h: [4.35, 4.55] }, { u: at35(27.4, 28.6), h: [8.1, 8.3] },
  ],
  blocks: [
    // Two-storey pair: a long hood over the windows and a stepped parapet.
    { name: 'window hood', u: [0, at35(0, 11.3)[1]], h: [6.55, 6.7], out: .45, depth: .9, colour: '#e4e2da' },
    { name: 'stepped parapet', u: at35(2.3, 10.1), h: [7.6, 8.05], out: -.15, depth: .3, colour: '#efeee8' },
    { name: 'parapet crown', u: at35(4.0, 8.2), h: [8.05, 8.47], out: -.15, depth: .3, colour: '#efeee8' },
    // Three-storey block: its third storey stands on the two-storey walls.
    { name: 'third storey', u: [u35(11.53), 30.274], h: [7.6, 11.5], out: -6.05, depth: 12, colour: '#efeee8' },
    { name: 'roof railing', u: [u35(11.53), 30.274], h: [11.5, 11.75], out: -.1, depth: .06, colour: '#9a9c98' },
    { name: 'window hood', u: at35(12.6, 14.8), h: [9.25, 9.4], out: .25, depth: .5, colour: '#e4e2da' },
    { name: 'window hood', u: at35(12.6, 14.9), h: [5.95, 6.1], out: .25, depth: .5, colour: '#e4e2da' },
    { name: 'window hood', u: at35(26.9, 29.0), h: [9.85, 10.0], out: .25, depth: .5, colour: '#e4e2da' },
    { name: 'pale yellow panel', u: [u35(15.84), u35(22.0)], h: [3.8, 10.4], out: .005, depth: .02, colour: '#efe3a6' },
    { name: 'teal frame', u: at35(15.7, 15.84), h: [3.65, 10.55], out: .08, depth: .16, colour: '#3f8f86' },
    { name: 'teal frame', u: at35(15.7, 22.0), h: [10.4, 10.55], out: .08, depth: .16, colour: '#3f8f86' },
    { name: 'teal frame', u: at35(15.7, 26.64), h: [3.65, 3.8], out: .08, depth: .16, colour: '#3f8f86' },
    { name: 'teal ledge', u: at35(15.7, 22.0), h: [7.29, 7.49], out: .15, depth: .3, colour: '#3f8f86' },
    { name: 'glass-block window', u: at35(20.0, 21.1), h: [7.55, 9.55], out: .025, depth: .02, colour: '#a9b8b2' },
    { name: 'glass-block window', u: at35(20.0, 21.2), h: [3.95, 6.25], out: .025, depth: .02, colour: '#a9b8b2' },
    { name: 'balcony base', u: at35(22.0, 26.7), h: [3.75, 3.95], out: .55, depth: 1.1, colour: '#3f8f86' },
    { name: 'frosted balcony glazing', u: at35(22.2, 26.5), h: [3.95, 5.4], out: .5, depth: 1.0, colour: '#b9c3c4' },
    { name: 'balcony glazing', u: at35(22.2, 26.5), h: [5.4, 6.81], out: .5, depth: 1.0, colour: '#3f4b50' },
    { name: 'green corrugated awning', u: at35(21.6, 28.4), h: [7.1, 7.45], out: .7, depth: 1.4, colour: '#3f8f86' },
    { name: 'loggia balustrade', u: at35(22.0, 26.0), h: [7.65, 8.75], out: .5, depth: .1, colour: '#e8e8e2' },
    { name: 'grilled loggia', u: at35(22.0, 26.0), h: [8.75, 10.45], out: .005, depth: .02, colour: '#3a3634' },
    { name: 'green corrugated awning', u: at35(21.4, 29.0), h: [10.75, 11.2], out: .8, depth: 1.6, colour: '#3f8f86' },
  ],
  piers: [[.05, .3], [5.75, 6.0], [11.6, 12.0], [15.99, 16.3], [26.03, 26.4], [29.95, 30.274]],
  backFittings: [
    { name: 'gated passage', u: [.4, 2.6], h: [.1, 2.8], colour: '#4a4a48' }, { name: 'roller shutter', u: [4.0, 5.6], h: [.1, 2.8], colour: '#c9ccc7' },
    { name: 'grey gate', u: [6.6, 8.3], h: [.1, 2.8], colour: '#8c8f8c' }, { name: 'salon front', u: [9.6, 11.5], h: [.1, 2.8], colour: '#3a3632', glow: .08 },
    { name: 'glazed shop front', u: [12.2, 19.8], h: [.1, 2.8], colour: '#6f7a7a', glow: .12 },
    { name: 'green door', u: [20.2, 20.9], h: [.1, 2.3], colour: '#2f6b4f' }, { name: 'collapsible gate', u: [21.1, 23.9], h: [.1, 2.6], colour: '#8c8f8c' },
    { name: 'blue shutter', u: [23.9, 25.9], h: [.1, 2.6], colour: '#3f6f9a' }, { name: 'side unit', u: [26.6, 29.8], h: [.1, 2.8], colour: '#3a3632' },
  ],
};

// Ways 454254265-454254267: three 5.6 m strips behind a front yard and boundary wall. April 2024 Street View
// shows canvas-roofed sheds with a shrine, an old single-storey house with a pediment and a porch, and a
// blue-roofed shed. One elevation is read along the run (u from the north end of 454254265, heights above
// the yard) and sliced at the source party lines.
const yardRun = {
  blocks: [
    { name: 'canvas awning', u: [0, 8.0], h: [4.6, 5.0], out: 1.2, depth: 2.4, colour: '#e6e1d3' },
    { name: 'canvas awning', u: [3.0, 10.4], h: [2.9, 3.2], out: 1.6, depth: 3.2, colour: '#e6e1d3' },
    { name: 'dark tarpaulin', u: [3.1, 10.25], h: [1.6, 2.9], out: 3.15, depth: .05, colour: '#4a4f4c' },
    { name: 'blank red banner', u: [.4, 2.6], h: [1.9, 2.8], out: .05, depth: .03, colour: '#b3322b' },
    { name: 'porch plinth', u: [7.9, 14.0], h: [0, 1.4], out: .9, depth: 1.8, colour: '#d9d2bf' },
    { name: 'blue porch roof', u: [7.9, 15.0], h: [4.8, 5.0], out: .9, depth: 1.8, colour: '#3f6fc4' },
    ...[[8.0, 8.4], [11.6, 12.0]].flatMap(([a, b]) => [
      { name: 'porch column', u: [a, b], h: [1.4, 4.3], out: 1.6, depth: .35, colour: '#ece6d2' },
      { name: 'porch column capital', u: [a - .05, b + .05], h: [4.3, 4.8], out: 1.6, depth: .4, colour: '#2f7a5c' },
    ]),
    { name: 'pediment', u: [8.75, 12.0], h: [5.0, 5.4], out: .3, depth: .2, colour: '#e9e4d6' },
    { name: 'pediment apex', u: [9.6, 11.15], h: [5.4, 5.85], out: .3, depth: .2, colour: '#e9e4d6' },
    { name: 'pediment wreath', u: [10.1, 10.65], h: [5.15, 5.6], out: .42, depth: .04, colour: '#2f7a5c' },
    { name: 'door', u: [10.0, 10.6], h: [1.4, 3.9], out: .01, depth: .02, colour: '#2c3a32' },
    { name: 'shuttered window', u: [12.1, 13.25], h: [2.2, 4.2], out: .01, depth: .02, colour: '#2c3a32' },
    { name: 'blue shed roof', u: [14.1, 16.89], h: [3.4, 3.65], out: 1.4, depth: 2.8, colour: '#3f6fc4' },
  ],
  backFittings: [
    { name: 'shrine', u: [.4, 2.6], h: [.1, 1.8], colour: '#5a2a24', glow: .1 },
    { name: 'shed interior', u: [2.8, 5.5], h: [.1, 2.8], colour: '#3e3e3a' },
  ],
};
const yardNote = 'April 2024 Street View from Lorong 15 shows the strips behind a cream boundary wall with green pillars: canvas-roofed sheds with a red shrine banner at the north end, an old single-storey house on a raised plinth with a small pediment and wreath over a blue-roofed porch, green-capped porch columns, a dark door and shuttered window, and a blue-roofed shed at the south end. No sign or listing identifies them, so no name is given. The pediment apex triangulates 3.1 m in front of the source fronts and about 10.5 m from the north end of the run; the run is read on that plane from the panorama facing it and laid on the source fronts, sliced at the source party lines, so the house straddles two strips. The boundary wall and yard lie outside the outlines and are not modelled. ' + lorong15Note;
const yardSources = id => [way(id), pano('p-KKH3__2aUcyvl6hLhBZQ', 75, 10, 110), pano('mFm6Pl0Vtj8E29n4qWL8ig', 80, 10, 110), pano('7iK9Np6ddPbTJihC8wW_Qg', 60, 10, 100)];
const yardColours = wall => ({ wall, trim: '#2f7a5c', frame: '#2c3a32', glass: '#3e474b', pier: wall, back: '#3a3632', floor: '#a39c8e' });
export const yardNorth = {
  id: 'l15-yard-north', buildingIds: ['454254265'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang', review: { distance: 8, pitch: 12 },
  name: 'Shrine sheds behind a front yard, Lorong 15 east side (April 2024 exterior, occupant not identified)', address: 'Lorong 15 Geylang, east side, behind a front yard',
  height: 5.4, ceiling: 3.0, fiveFootWay: 2.5, roof: { type: 'flat', colour: '#8d8a84' },
  evidence: 'The northern strip, way 454254265. ' + yardNote, sources: yardSources('454254265'),
  colours: yardColours('#ddd6c4'),
  ...slice(yardRun, 0, 5.6268),
};
export const yardHouse = {
  id: 'l15-yard-house', buildingIds: ['454254266'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang', review: { distance: 8, pitch: 12 },
  name: 'Single-storey house behind a front yard, Lorong 15 east side, north half (April 2024 exterior, occupant not identified)', address: 'Lorong 15 Geylang, east side, behind a front yard',
  height: 6.3, ceiling: .2, fiveFootWay: .3, roof: { type: 'flat', colour: '#8d8a84' },
  evidence: 'The middle strip, way 454254266: canvas sheds and the north half of the house. ' + yardNote, sources: yardSources('454254266'),
  colours: yardColours('#ece2bf'),
  bands: [[5.7, 6.3, .2, '#e2dcc6']],
  ...slice(yardRun, 5.6268, 11.2624),
};
export const yardSouth = {
  id: 'l15-yard-south', buildingIds: ['454254267'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang', review: { distance: 8, pitch: 12 },
  name: 'Single-storey house behind a front yard, Lorong 15 east side, south half (April 2024 exterior, occupant not identified)', address: 'Lorong 15 Geylang, east side, behind a front yard',
  height: 6.3, ceiling: .2, fiveFootWay: .3, roof: { type: 'flat', colour: '#8d8a84' },
  evidence: 'The southern strip, way 454254267: the south half of the house and a blue-roofed shed. ' + yardNote, sources: yardSources('454254267'),
  colours: yardColours('#ece2bf'),
  bands: [[5.7, 6.3, .2, '#e2dcc6']],
  ...slice(yardRun, 11.2624, 16.8892),
};

// ---------------------------------------------------------------------------------------------
// Sims Avenue south side, Nos. 126-130, west of Lorong 17. Frames face Sims Avenue with u running west
// from the east party line. Read on panorama BIsF rectified 3.25 m in front of the source front, the
// row's depth (FSL and Thye Seng), where it and jZsX agree; the photographed party lines fall about 3 m
// west of the source ones, so each house's bays are scaled onto its source edge. Heights are the mean of
// the two panoramas (which differ in scale by 5%), above a five-foot way taken 0.4 m above the road.
const simsNote = 'Read on two June 2024 Sims Avenue panoramas rectified 3.25 m in front of the source front, the depth found for this row at FSL and Thye Seng, where the two agree; the photographed party lines fall about 3 m west of the source lines, so the source fronts are kept and the bays are scaled onto them. Heights are the mean of the two panoramas, which differ in scale by about 5%, above a five-foot way taken 0.4 m above the road, and carry about ±0.4 m.';
const simsSources = id => [way(id), pano('BIsFYppvb1P_xY0oRECpiw', 170, 18, 110), pano('jZsXmABGRvqpwMlaKtNIDQ', 200, 18, 90), pano('YQdRIONPT8C3zFJHHEUTRw', 120, 15, 90)];
const cream = { wall: '#e6dfcd', trim: '#c9a66b', frame: '#5a5248', glass: '#59666b', pier: '#e6dfcd', back: '#3a3532', floor: '#a49e95' };
const rowBands = [[10.65, 10.9, .3, '#ddd6c4'], [7.26, 7.52, .35, '#ddd6c4'], [4.0, 4.25, .3, '#ddd6c4']];

export const sims126 = {
  id: 'sims-126', buildingIds: ['682928764'], kind: 'unnamed', unnamed: true, frontEdge: 4, reviewRoad: 'Sims Avenue', review: { distance: 4.5, pitch: 30 },
  name: 'No. 126 Sims Avenue (June 2024 exterior, occupant not identified)', address: '126 Sims Avenue',
  height: 11.0, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'The pale-blue three-storey house two doors west of the Lorong 17 corner. June 2024 Street View shows two windows on each upper floor in bright-blue surrounds under louvred vents, a projecting ledge between the floors, a tilted sign and a maroon board over a shop under a brown awning. No sign or listing identifies it, so no name is given and the board is blank. It photographs about 6.15 m wide against the 6.42 m source edge. ' + simsNote,
  sources: simsSources('682928764'),
  colours: { wall: '#a9d3e6', trim: '#3d8fc4', frame: '#e8eef0', glass: '#3b4a52', pier: '#a9d3e6', back: '#3a3532', floor: '#a49e95' },
  bands: [[10.75, 11.0, .3, '#c9e2ee'], [7.16, 7.4, .35, '#c9e2ee'], [4.0, 4.25, .3, '#c9e2ee']],
  windows: [[.54, 2.8], [3.91, 6.06]].map(u => ({ u, h: [8.26, 9.72], panes: 2, surround: true }))
    .concat([[.46, 2.56], [3.62, 5.8]].map(u => ({ u, h: [4.97, 6.31], panes: 3, surround: true }))),
  vents: [{ u: [.68, 2.77], h: [9.85, 10.21] }, { u: [4.01, 6.03], h: [9.85, 10.21] }, { u: [.44, 2.51], h: [6.46, 6.85] }, { u: [3.75, 5.74], h: [6.46, 6.85] }],
  blocks: [
    { name: 'blank maroon board', u: [.16, 4.72], h: [2.92, 3.95], out: .1, depth: .06, colour: '#7a2a2c' },
    { name: 'brown awning', u: [.16, 6.3], h: [2.3, 2.9], out: .7, depth: 1.4, colour: '#6b4a35' },
  ],
  piers: [[0, .3], [6.12, 6.422]],
  backFittings: [{ name: 'shop front', u: [.4, 6.0], h: [.1, 2.7], colour: '#3e3a36', glow: .1 }],
};

// Arched openings under No. 128's board, with haunches either side of each crown.
const arches = [[.53, 2.14], [2.41, 3.95], [4.9, 6.4]];
export const sims128 = {
  id: 'bamboo-lounge', buildingIds: ['682928765'], kind: 'bamboo-lounge', frontEdge: 4, reviewRoad: 'Sims Avenue', review: { distance: 2.8, pitch: 34 },
  name: 'Bamboo Lounge 竹屋 (June 2024 exterior)', address: '128 Sims Avenue',
  height: 10.9, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'The cream three-storey house west of the Lorong 17 corner building. June 2024 Street View shows two windows on each upper floor in tan surrounds under louvred vents, a projecting ledge between the floors, a narrow canopy over a black neon board reading Bamboo LOUNGE with Chinese characters, and three arched openings behind potted bamboo. Google Maps lists Bamboo Lounge, a bar, at 128 Sims Ave, Singapore 387451. Its point lies inside the way of No. 126 next door, about 3 m out, the same shift as this row\'s photographed party lines; the address and the sign agree on No. 128, so under the owner\'s answer to open question 33 the board names it and is redrawn in original type. It photographs about 6.15 m wide against the 6.62 m source edge. ' + simsNote + ' Plants and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Bamboo+Lounge+128+Sims+Avenue', ...simsSources('682928765')],
  colours: cream,
  bands: rowBands,
  windows: [[.49, 2.77], [4.06, 6.41]].map(u => ({ u, h: [8.5, 9.92], panes: 2, surround: true }))
    .concat([[.44, 2.67], [3.86, 6.11]].map(u => ({ u, h: [5.12, 6.42], panes: 2, surround: true }))),
  vents: [{ u: [.59, 2.68], h: [10.14, 10.5] }, { u: [4.15, 6.24], h: [10.14, 10.5] }, { u: [.46, 2.61], h: [6.61, 7.04] }, { u: [3.89, 6.04], h: [6.61, 7.04] }],
  blocks: [
    { name: 'window canopy', u: [.05, 6.5], h: [4.66, 4.86], out: .3, depth: .6, colour: '#e8e2d2' },
    ...arches.flatMap(([l, r]) => [
      { name: 'arch haunch', u: [l, l + .4], h: [2.9, 3.38], out: -.1, depth: .2, colour: '#e6dfcd' },
      { name: 'arch haunch', u: [r - .4, r], h: [2.9, 3.38], out: -.1, depth: .2, colour: '#e6dfcd' },
      { name: 'arch crown', u: [l, r], h: [3.22, 3.38], out: -.1, depth: .2, colour: '#e6dfcd' },
    ]),
  ],
  board: { u: [.19, 6.5], h: [3.38, 4.29], out: .11 },
  piers: [[0, .53], [2.14, 2.41], [3.95, 4.9], [6.4, 6.619]],
  backFittings: [{ name: 'lounge front', u: [.5, 6.1], h: [.1, 2.9], colour: '#2e2a28', glow: .06 }],
};

export const sims130 = {
  id: 'sims-130', buildingIds: ['682928766'], kind: 'unnamed', unnamed: true, frontEdge: 4, reviewRoad: 'Sims Avenue', review: { distance: 1.1, pitch: 40 },
  name: 'No. 130 Sims Avenue, Lorong 17 west corner (June 2024 exterior, occupant not identified)', address: '130 Sims Avenue (Lorong 17 corner)',
  height: 10.9, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'The cream three-storey corner house on the west side of the Lorong 17 mouth; its splayed corner (edge 5) carries a projecting bay with circular-motif grilles and a glazed top storey over a yellow board reading 福满香 FULL HOUSE F&B. Its Sims Avenue face (edge 4, the front) shows two windows on each upper floor in tan surrounds under louvred vents, red-and-white striped awnings over the top-floor windows, and a blue awning over an eating house. Google Maps lists Full House F&B, a coffee shop, at 128 Sims Ave, with its point beyond the study edge outside every source way, so no name is given; the board is not modelled and the awnings are plain. The Sims Avenue face photographs about 7.15 m wide against the 6.5 m source edge; the splayed corner and the Lorong 17 face (Lorong 17 is not modelled) are left as plain walls. ' + simsNote,
  sources: [...simsSources('682928766'), pano('F6D3qY_SnKVyp-erTxBPDA', 250, 15, 80)],
  colours: cream,
  bands: rowBands,
  windows: [[.85, 2.55], [4.16, 6.08]].map(u => ({ u, h: [8.5, 9.92], panes: 2, surround: true }))
    .concat([[.83, 2.55], [4.09, 5.96]].map(u => ({ u, h: [5.12, 6.35], panes: 3, surround: true }))),
  vents: [{ u: [.86, 2.59], h: [6.61, 6.97] }, { u: [4.13, 6.0], h: [6.61, 6.97] }],
  blocks: [
    ...stripes('striped window awning', [.27, 2.79], [9.95, 10.4], .45, .9, ['#b5483f', '#efece4'], .21),
    ...stripes('striped window awning', [3.99, 6.45], [9.95, 10.4], .45, .9, ['#b5483f', '#efece4'], .205),
    { name: 'blue awning', u: [0, 6.501], h: [3.2, 3.85], out: .7, depth: 1.4, colour: '#2f4f8f' },
    { name: 'blue awning valance', u: [0, 6.501], h: [2.4, 3.2], out: 1.38, depth: .04, colour: '#2a477f' },
  ],
  piers: [[0, .35], [6.2, 6.501]],
  backFittings: [{ name: 'eating house front', u: [.4, 6.1], h: [.1, 3.2], colour: '#3a332e', glow: .12 }],
};

export const ringA = [corner301, no2, row235, yardNorth, yardHouse, yardSouth, sims126, sims128, sims130];
export const ringAFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const ringALayout = (place, width) => simpleHouseLayout(width, place);
// The Sims Avenue fronts lie within a few metres of the study's north edge, so their review starts stand close in.
export const ringAReviews = (place, frame) => facing(frame, place.id, place.review?.distance ?? 10, place.review?.pitch ?? 18);

// Side faces of a corner block: windows, vents, bands and blocks on another source edge, with no five-foot way.
const shell = new Set(['upper wall', 'five-foot way floor', 'five-foot way ceiling', 'five-foot way return', 'back wall']);
export const ringASides = (place, poly) => (place.sides ?? []).map(side => {
  const frame = frontageFrame(poly, side.edge);
  const { boxes, boards, blades } = simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: side.windows, vents: side.vents, blocks: side.blocks, bands: side.bands, boards: side.boards, blades: side.blades });
  return { edge: side.edge, frame, boxes: boxes.filter(b => !shell.has(b.name)), boards, blades };
});
