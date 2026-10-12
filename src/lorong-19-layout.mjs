// Lorong 19 between Geylang Road and Sims Avenue (open question 42), built one building at a time as Lorong 17 was:
// north up the west side, then south down the east side, then the Geylang Road houses back to Lorong 17. Each
// elevation is read on the plane where the panoramas agree, and laid on its source edge, which is kept. Named only
// where a listing and a photographed sign agree. See docs/lorong-19-brief.md.
import { pano, way, search, lay, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

// ---------------------------------------------------------------------------------------------
// 1. Way 454254263, No. 323 Geylang Road, the west corner: Eminent Frog Porridge & Seafood. A cream two-storey corner
// shophouse with a chamfered corner, its long face on Lorong 19 (edge 3, u north from the Geylang Road end) and a
// lower zinc-roofed extension beyond it. Three June 2024 lane panoramas agree on the lane face 3.5 m in front of the
// source edge, from the corner (0.4 m along) to the two-storey block's north end (22.4 m along). Laid at its
// photographed scale from the corner; the two-storey block is a raised volume, and the extension the low shell.
const W263 = 28.711, at263 = lay(.4, 1), main263 = 22.0;
const cream263 = '#ecdfbf', salmon263 = '#e0ae78', maroon263 = '#74302c';
const piers263 = [[2.5, 3.3], [7.3, 8.2], [10.2, 11.0], [13.8, 14.7], [17.2, 18.1], [20.2, 21.0], [21.8, 22.4]].map(at263);
export const eminent = {
  id: 'eminent-frog-porridge', buildingIds: ['454254263'], kind: 'eminent-frog-porridge', frontEdge: 3, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 14 },
  name: 'Eminent Frog Porridge & Seafood (June 2024 exterior)', address: '323 Geylang Road (the Lorong 19 west corner)',
  height: 3.9, ceiling: 3.75, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8e9190' },
  evidence: 'June 2024 Street View shows a cream two-storey corner shophouse at Geylang Road and Lorong 19, with salmon pilasters, maroon louvred shutters under louvred vents, a chamfered corner and a deep-eaved hipped roof. On Geylang Road it carries a dark board reading 明輝田雞粥海鮮煮炒店 EMINENT FROG PORRIDGE & SEAFOOD (LOR 19) over a yellow frog lightbox, with a larger frog board and red $18 promotion boards at the corner. Along Lorong 19 it has six bays of windows over an arcaded five-foot way under blue Tiger awnings, stall boards between the floors (among them an EMINENT FROG PORRIDGE board; the others read Changi Village Nasi Lemak, Heng Wang Seafood, Sin Kee Hainan Chicken Rice and B.B.Q Express), a green Lor 19 Geylang street sign and, at the north end, a vertical lightbox reading 明輝田雞粥 EMINENT FROG PORRIDGE 323; beyond it is a lower zinc-roofed extension. Google Maps lists Eminent Frog Porridge & Seafood, a porridge restaurant open until 4 am, at 323 Geylang Road, Singapore 389359, with its point inside this way, so its boards, lightboxes and stall board are redrawn in original type. The other stall boards are not listed and stay blank. Three June 2024 panoramas along the lane agree on its Lorong 19 face 3.5 m in front of the source edge, and its Geylang Road front is about 7 m wide with its party wall about 1.4 m east of the source line: the building stands about 3.5 m east of its source outline. Until its footprint is settled with the Geylang Road row, the photographed elevation is laid at its own scale from the corner on the source edges; the two-storey block covers the first 22 m and the extension the rest. Heights were read on the triangulated planes, above the five-foot-way floor.',
  sources: [way('454254263'), search('Eminent Frog Porridge & Seafood 323 Geylang Road'), pano('_V35ZcH4MPpWV-ImZnEVsA', 262, 10, 100), pano('PDfryrUeGs2xTHzFqYRBlQ', 262, 10, 100), pano('ukZWTPS52TsHumpZjk8qWg', 235, 10, 100), pano('u07Yl1k8nX72_c24lJZ5hg', 330, 10, 100), pano('sH6CfyvyQsxgdBweKtGXhg', 300, 10, 100)],
  colours: { wall: cream263, trim: salmon263, frame: '#4f2422', glass: maroon263, pier: '#ece2c6', back: '#5a5652', floor: '#a8a296' },
  bands: [[3.75, 3.95, .3]],
  // The two-storey block over the first 22 m, under a deep-eaved hipped roof.
  upper: [{ name: 'two-storey block', outline: [[0, 0], [main263, 0], [main263, -5.3], [0, -5.3]], from: 3.9, to: 7.65, ridge: 9.4, colour: cream263, roof: '#9a6048' }],
  pilasters: [[3.6, 4.5], [7.1, 7.6], [10.0, 10.5], [13.8, 14.3], [17.2, 17.6], [20.0, 20.5], [21.6, 22.0]].map(([l, r]) => [l, r, 3.95, 7.45]),
  windows: [
    { u: at263([3.1, 3.7]), h: [4.6, 5.95], panes: 1 },
    ...[[5.4, 6.5], [12.1, 13.1], [18.9, 19.9]].map(s => ({ u: at263(s), h: [4.6, 5.95], panes: 2 })),
    ...[[8.3, 10.1], [16.1, 17.6]].map(s => ({ u: at263(s), h: [4.6, 5.95], panes: 3 })),
    ...[[4.55, 5.05], [5.45, 5.95]].map(h => ({ u: at263([21.1, 21.7]), h, panes: 1 })),
  ],
  vents: [[3.15, 3.65], [5.45, 6.45], [8.7, 9.7], [12.1, 13.1], [16.4, 17.3], [18.9, 19.9]].map(s => ({ u: at263(s), h: [6.15, 6.55] })),
  blocks: [
    ...[[8.3, 10.1], [16.1, 17.6]].map(s => { const [l, r] = at263(s), m = (r - l) / 3; return { name: 'white-framed glazing', u: [+(l + m).toFixed(2), +(r - m).toFixed(2)], h: [4.63, 5.92], out: .02, depth: .02, colour: '#e3e6e4' }; }),
    { name: 'deep eaves', u: [0, main263], h: [7.5, 7.7], out: .45, depth: .9, colour: '#5e4a40' },
    ...[[4.8, 7.5], [8.2, 10.3], [15.2, 17.5], [18.1, 20.0], [20.1, 21.3]].map(s => ({ name: 'blank stall board', u: at263(s), h: [4.05, 4.7], out: .04, depth: .05, colour: '#e6dfcd' })),
    ...piers263.map(u => ({ name: 'orange pier base', u, h: [0, .8], out: -.19, depth: .44, colour: '#d9a05a' })),
    { name: 'blue Tiger awning', u: at263([4.3, 22.0]), h: [2.85, 3.5], out: .55, depth: 1.1, colour: '#23427c' },
    // The lower extension north of the two-storey block: a zinc lean-to over a shop with red promotion boards.
    { name: 'zinc lean-to', u: [main263, W263], h: [3.3, 3.5], out: .5, depth: 1.0, colour: '#8e9190' },
    { name: 'blank red promotion boards', u: [22.9, 23.5], h: [1.2, 2.6], out: .05, depth: .03, colour: '#c8302a' },
    { name: 'blank shop board', u: [23.6, 26.4], h: [2.4, 2.9], out: .04, depth: .03, colour: '#ddd5c6' },
  ],
  // Eminent's own stall board between the floors, and the green Lor 19 Geylang street sign on the first bay.
  boards: [{ u: at263([11.0, 14.0]), h: [4.05, 4.7], out: .05 }, { u: at263([5.5, 7.4]), h: [2.25, 2.65], out: .05 }],
  blades: [{ u: 21.9, out: [.25, .8], h: [3.9, 6.4] }],
  piers: piers263,
  backFittings: [
    ...[[3.3, 7.3], [8.2, 10.2], [11.0, 13.8], [14.7, 17.2], [18.1, 20.2]].map(s => ({ name: 'roller shutter', u: at263(s), h: [.1, 3.0], colour: '#a7a9a6' })),
    { name: 'grilled side door', u: at263([21.0, 21.8]), h: [.1, 2.3], colour: '#6a6a66' },
    { name: 'extension shutter', u: [24.0, 27.4], h: [.1, 2.4], colour: '#9fa19e' },
  ],
  sides: [{
    edge: 0, // the Geylang Road front, u east from the source party wall; laid from the corner, u = s - 3.5
    heldFlat: true, // the source front stands 0.1 m inside Geylang Road's estimated carriageway
    windows: [{ u: [.6, 1.5], h: [4.6, 5.95], panes: 2 }, { u: [1.9, 3.3], h: [4.6, 5.95], panes: 2 }, { u: [4.5, 5.0], h: [4.6, 5.95], panes: 1 }],
    vents: [{ u: [.6, 1.5], h: [6.15, 6.55] }, { u: [1.9, 3.3], h: [6.15, 6.55] }],
    blocks: [
      { name: 'deep eaves', u: [0, 5.295], h: [7.5, 7.7], out: .45, depth: .9, colour: '#5e4a40' },
      { name: 'salmon corner pilaster', u: [3.4, 4.1], h: [3.95, 7.45], out: .05, depth: .1, colour: salmon263 },
      { name: 'ledge', u: [0, 5.295], h: [3.75, 3.95], out: .1, depth: .2, colour: salmon263 },
      { name: 'arcade', u: [.4, 3.4], h: [0, 3.75], out: .01, depth: .02, colour: '#4a4440' },
      { name: 'corner pier', u: [3.4, 4.1], h: [0, 3.75], out: .05, depth: .1, colour: '#ece2c6' },
      { name: 'orange pier base', u: [3.4, 4.1], h: [0, .8], out: .06, depth: .12, colour: '#d9a05a' },
      { name: 'blank red $18 boards', u: [3.45, 4.1], h: [1.7, 3.0], out: .13, depth: .02, colour: '#c8302a' },
    ],
    // Eminent's board and frog lightbox over the arcade, and the larger frog board at the corner.
    boards: [{ u: [.5, 3.2], h: [3.27, 3.74], out: .06 }, { u: [.5, 2.6], h: [2.7, 3.2], out: .06 }, { u: [4.1, 5.3], h: [2.85, 3.85], out: .06 }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 2. Way 454254248, No. 1, The Primero: a weathered grey four-storey block of five bays with a raised central tower,
// shops in its five-foot way. Its lane face (edge 0, u north from the south corner) triangulates 2.2-2.6 m behind
// the source edge, from 0.8 m south of the source corner to 27.8 m north of it: read on a plane 2.4 m behind and laid
// proportionally on the 26.81 m source edge (x0.94). The source face stands 3.8 m from the lane's centreline, so its
// street-level pieces stay within half a metre of the wall.
const W248 = 26.808, at248 = lay(-.8, W248 / 28.6);
const bays248 = [[-.4, 1.0], [2.75, 4.5], [5.6, 7.0], [8.0, 9.6], [10.8, 13.0], [13.4, 15.2], [16.3, 17.8], [18.9, 20.2], [22.1, 23.9], [24.9, 26.4]];
const ribbons248 = [[-.3, 4.7], [5.6, 9.9], [10.8, 15.2], [16.1, 19.9], [22.1, 26.5]];
const cols248 = [[-.8, -.3], [4.7, 5.5], [10.0, 10.7], [15.3, 16.1], [20.5, 21.2], [26.5, 27.8]];
const grey248 = '#bdb7ae';
export const primero = {
  id: 'the-primero', buildingIds: ['454254248'], kind: 'the-primero', frontEdge: 0, reviewRoad: 'Lorong 19 Geylang', review: { distance: 8, pitch: 30 },
  name: 'The Primero (June 2024 exterior)', address: '1 Lorong 19 Geylang',
  height: 13.9, ceiling: 3.1, fiveFootWay: 2.2, roof: { type: 'flat', colour: '#8f8a84' },
  heldFlat: true, // the source face's south end stands 2.7 m from the lane's centreline, inside the estimated carriageway
  evidence: 'June 2024 Street View shows a weathered grey four-storey block of five bays north of the side lane behind No. 323 Geylang Road, with ribbon windows on each upper floor between full-height piers, deep concrete hoods over the first-floor windows, ribbed balcony panels, a thick fascia under the top floor and a raised central tower under a pyramidal roof. In its five-foot way, from the south: a paint shop under an orange awning and a long orange board reading NIPPON PAINT B&S (2017) PTE LTD #01-01; a shop under a yellow board reading 显密度母林佛学会 XIAN MI DU MU LIN BUDDHIST ASSOCIATION; the lobby under raised lettering reading THE PRIMERO; a glazed shop; and a red temple front under a banner reading 南北斗母宫, with gold couplets and an incense urn. Google Maps lists The Primero, an apartment building, at 1 Lorong 19 Geylang, Singapore 388487, and B&S hardware lorong 19, a paint store, at 1 Lor 19 Geylang #01-01; so the building is named after its lettering and the shop board is redrawn in original type, without the paint brand, with no claim about the other premises. The Primero\'s listing point lies about 20 m west, in way 454254249 on Lorong 17, and B&S\'s south of Geylang Road, but the addresses and the signs agree on this building. The Buddhist association is now listed at Lorong 21A and the temple is not listed, so their boards are blank. Bearings from four June 2024 panoramas put its south-east corner 2.2 m and its north-east corner 2.6 m behind the source edge, 28.6 m apart against the 26.81 m source edge; the elevation was read on a plane 2.4 m behind, where the panoramas agree, and is laid proportionally on the source edge.',
  sources: [way('454254248'), search('The Primero 1 Lorong 19 Geylang'), search('B&S hardware lorong 19'), pano('ukZWTPS52TsHumpZjk8qWg', 315, 15, 80), pano('gWQbjpYBNuduJ0hBOUrHGw', 262, 25, 110), pano('NZfk6nTA1mTETJHQXIob7Q', 262, 25, 110), pano('ZqOXZ8yOp3uJbHKrYGYtcQ', 205, 15, 80)],
  colours: { wall: grey248, trim: '#aaa49b', frame: '#3a4446', glass: '#7fa3a0', pier: '#c4beb4', back: '#4a4846', floor: '#a19b90' },
  bands: [[3.1, 4.6, .2]],
  windows: [
    ...bays248.flatMap(s => [{ u: at248(s), h: [4.7, 6.2], panes: 3 }, { u: at248(s), h: [8.0, 9.45], panes: 3 }]),
    ...ribbons248.map(s => ({ u: at248(s), h: [11.3, 13.0], panes: 4 })),
  ],
  blocks: [
    ...ribbons248.map(s => ({ name: 'deep concrete hood', u: at248(s), h: [6.55, 6.95], out: .45, depth: .9, colour: '#b3ada4' })),
    ...ribbons248.map(s => ({ name: 'ribbed balcony panel', u: at248(s), h: [7.1, 7.9], out: .08, depth: .16, colour: '#c9c4bb' })),
    { name: 'thick fascia under the top floor', u: [0, W248], h: [9.9, 10.9], out: .3, depth: .6, colour: '#a59f96' },
    { name: 'top fascia', u: [0, W248], h: [13.0, 13.9], out: .15, depth: .3, colour: '#a59f96' },
    ...cols248.map(s => { const [l, r] = at248(s); return { name: 'pier', u: [Math.max(0, l), Math.min(W248, r)], h: [4.6, 13.0], out: .1, depth: .2, colour: '#c4beb4' }; }),
    { name: 'orange awning', u: at248([-.8, 4.6]).map(v => Math.max(0, v)), h: [2.45, 3.0], out: .12, depth: .24, colour: '#e0652a' },
    { name: 'blank yellow association board', u: at248([5.4, 9.0]), h: [2.9, 3.4], out: .05, depth: .04, colour: '#e9c23a' },
    { name: 'blank white fascia panel', u: at248([13.25, 17.75]), h: [4.15, 4.55], out: .22, depth: .02, colour: '#e8e6e0' },
    { name: 'blank red temple banner', u: at248([22.3, 26.5]), h: [2.4, 2.9], out: .05, depth: .03, colour: '#c8241c' },
  ],
  // B&S's board over its shop, and THE PRIMERO's raised lettering on the beam over the lobby.
  boards: [{ u: at248([-.6, 4.6]).map(v => Math.max(0, v)), h: [3.75, 4.55], out: .22 }, { u: at248([11.4, 14.4]), h: [3.4, 3.9], out: .22 }],
  piers: [[-.8, -.2], [5.0, 5.5], [10.0, 10.6], [15.4, 16.0], [20.6, 21.1], [27.2, 27.8]].map(s => { const [l, r] = at248(s); return [Math.max(0, l), Math.min(W248, r)]; }),
  backFittings: [
    { name: 'paint shop with stacked goods', u: at248([-.2, 4.6]), h: [.1, 2.4], colour: '#c8693a', glow: .08 },
    { name: 'grilled shopfront', u: at248([5.6, 9.6]), h: [.1, 2.6], colour: '#6a6a66' },
    { name: 'lobby grille', u: at248([10.8, 15.2]), h: [.1, 2.7], colour: '#4a4c4c' },
    { name: 'glazed shopfront', u: at248([16.2, 20.4]), h: [.1, 2.7], colour: '#6c7a7c', glow: .05 },
    { name: 'red temple front', u: at248([22.0, 27.0]), h: [.1, 2.4], colour: '#9a2018', glow: .1 },
    ...[[22.5, 22.8], [26.2, 26.5]].map(s => ({ name: 'gold couplet', u: at248(s), h: [.4, 2.3], out: .05, colour: '#c9a23a' })),
  ],
  // The raised central tower under a pyramidal roof, set back from the front.
  upper: [{ name: 'central tower', outline: [[11.5, -1.5], [15.8, -1.5], [15.8, -5.0], [11.5, -5.0]], from: 13.9, to: 16.0, ridge: 17.6, colour: grey248, roof: '#6e5a4e' }],
  sides: [{
    edge: 9, // the north wall on the side lane, u west from the lane corner: three bays of windows on each upper floor
    windows: [[1.0, 2.6], [3.6, 5.2], [6.2, 7.8]].flatMap(u => [[4.7, 6.2], [8.0, 9.45], [11.3, 13.0]].map(h => ({ u, h, panes: 2 }))),
    blocks: [[1.0, 2.6], [3.6, 5.2], [6.2, 7.8]].map(u => ({ name: 'concrete hood', u: [u[0] - .1, u[1] + .1], h: [6.55, 6.85], out: .3, depth: .6, colour: '#b3ada4' })),
  }],
};

// ---------------------------------------------------------------------------------------------
// 3. Way 476113985, No. 3: a dark brown modern house of four storeys across the side lane from The Primero, its upper
// floors in three cream window frames over a pilotis. Its front (edge 1, u north from the side lane) is read where
// three June 2024 panoramas agree on the frames, 2.3 m behind the source edge: 9.2 m wide from 0.9 m south of the source
// corner, laid proportionally on the 9.45 m source edge.
const W985 = 9.445, at985 = lay(-.9, W985 / 9.2);
const frameWindows985 = (h, spans) => spans.map(s => ({ u: at985(s), h, panes: 2, out: .12 }));
const brown985 = '#645a55', cream985 = '#d9d3c0';
export const no3 = {
  id: 'l19-3', buildingIds: ['476113985'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 32 },
  name: 'No. 3 Lorong 19 (June 2024 exterior, occupants not identified)', address: '3 Lorong 19 Geylang',
  height: 13.7, ceiling: 2.9, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8a8580' },
  evidence: 'June 2024 Street View shows a dark brown modern house of four storeys north of the side lane beside The Primero: an open ground floor between dark columns, with a wooden door, a window over a bank of letterboxes and a wooden slatted gate on its back wall; three upper floors of four windows each, set in raised cream frames; a white strip with a tall louvred slot at the south edge; and a low gable over the parapet. Its south wall on the side lane is panelled in white, beige and brown, and its white north wall shows above the single-storey Nanyang Chee Clan Association next door. Google Maps gives an address point for 3 Lorong 19 Geylang inside this way but lists no business there, and no sign was photographed, so no name is given. Three June 2024 panoramas agree on the window frames on a plane 2.3 m behind the source front, where the front is about 9.2 m wide from 0.9 m south of the source corner, against the 9.45 m source edge; so it stands about 1.2 m in front of the Nanyang Chee Clan Association, not the 3.5 m the source map gives. Heights were read on that plane: ground floor to 2.9 m, frames at 4.7-6.8, 8.0-10.0 and 11.0-12.5 m, parapet at 13.7 m and the gable to about 14.8 m.',
  sources: [way('476113985'), search('3 Lorong 19 Geylang'), pano('ZqOXZ8yOp3uJbHKrYGYtcQ', 262, 30, 100), pano('0tJ_yZzLMxOeYk3kLcr2Bw', 280, 15, 90), pano('C6WgL2wlMEl3mpMGCqZnIw', 215, 15, 90)],
  colours: { wall: brown985, trim: cream985, frame: '#3a3634', glass: '#4c5658', pier: '#4e4744', back: '#4a4442', floor: '#b39a86' },
  windows: [
    ...frameWindows985([5.0, 6.45], [[2.95, 3.95], [4.15, 5.1], [5.25, 6.2], [6.4, 7.35]]),
    ...frameWindows985([8.3, 9.7], [[2.95, 3.95], [4.15, 5.1], [5.25, 6.2], [6.4, 7.35]]),
    ...frameWindows985([11.2, 12.2], [[2.9, 3.75], [3.95, 4.8], [4.95, 5.8], [6.0, 6.8]]),
  ],
  blocks: [
    { name: 'cream window frame', u: at985([2.67, 7.67]), h: [4.67, 6.83], out: .06, depth: .12, colour: cream985 },
    { name: 'cream window frame', u: at985([2.67, 7.67]), h: [8.0, 10.0], out: .06, depth: .12, colour: cream985 },
    { name: 'cream window frame', u: at985([2.67, 7.0]), h: [11.0, 12.5], out: .06, depth: .12, colour: cream985 },
    { name: 'white strip', u: at985([-.8, .7]), h: [3.8, 13.2], out: .08, depth: .16, colour: '#e6e4de' },
    { name: 'louvred slot', u: at985([-.15, .1]), h: [4.3, 12.8], out: .17, depth: .02, colour: '#5d6062' },
    { name: 'gable parapet', u: at985([1.0, 7.4]), h: [13.7, 14.3], out: .05, depth: .3, colour: '#cfcac0' },
    { name: 'gable apex', u: at985([3.2, 5.2]), h: [14.3, 14.8], out: .05, depth: .3, colour: '#cfcac0' },
  ],
  piers: [[-1.0, -.4], [1.7, 2.1]].map(s => at985(s).map(v => Math.max(0, v))),
  backFittings: [
    { name: 'wooden door', u: at985([2.05, 2.9]), h: [.1, 2.3], colour: '#6a4a33' },
    { name: 'window', u: at985([3.4, 4.3]), h: [1.3, 2.2], colour: '#3c4446' },
    { name: 'letterboxes', u: at985([3.4, 4.3]), h: [.45, 1.15], colour: '#d8d6d0' },
    { name: 'wooden slatted gate', u: at985([5.75, 7.6]), h: [.15, 2.0], colour: '#a45a32' },
  ],
  sides: [{
    edge: 2, // the south wall on the side lane, u west from the lane corner: panelled, with windows on each upper floor
    windows: [[1.5, 2.3], [4.5, 5.3], [8.0, 8.8]].flatMap(u => [[5.0, 6.4], [8.3, 9.7], [11.2, 12.4]].map(h => ({ u, h, panes: 1 }))),
    blocks: [
      { name: 'white panel', u: [0, 3.2], h: [3.0, 13.6], out: .02, depth: .02, colour: '#e8e6e1' },
      { name: 'beige panel', u: [3.2, 7.0], h: [3.0, 13.6], out: .02, depth: .02, colour: '#c9b9a0' },
      { name: 'brown panel', u: [7.0, 9.5], h: [7.0, 13.6], out: .02, depth: .02, colour: '#6a5a50' },
    ],
  }, {
    edge: 4, // the north wall above the Nanyang Chee Clan Association's roof: white
    blocks: [{ name: 'white north wall', u: [.3, 15.4], h: [4.6, 13.6], out: .02, depth: .02, colour: '#e6e6e2' }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 4-6. Ways 454254241, 476113983 and 476113984, Nos. 21, 23 and 25: a row of three single-storey houses under red
// roofs. Their fronts were read on one plane, along way 476113983's front (s north from its south corner), 1.25 m
// behind the source line where the lane panoramas agree; each elevation is laid proportionally on its own source edge
// (u north from its south corner). No. 21 photographs from s = -8.1 to 0, No. 23 from 0 to 9.9 and No. 25 from 10.1
// to 17.6, so the row drifts about 1 m north of its source ways by No. 25.
const rowNote = ' The three single-storey houses from No. 21 to No. 25 were read together on one plane 1.25 m behind their source fronts, where the June 2024 lane panoramas (C6Wg..., NzRD..., DRAX...) agree; each elevation is laid proportionally on its own source edge.';
const at241 = lay(-8.1, 7.6 / 8.1), at983 = lay(0, 9.126 / 9.9), at984 = lay(10.1, 7.49 / 7.5);
export const nanyangChee = {
  id: 'nanyang-chee', buildingIds: ['454254241'], kind: 'nanyang-chee', frontEdge: 0, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 10 },
  name: 'Nanyang Chee Clan Association (June 2024 exterior)', address: '21 Lorong 19 Geylang',
  height: 3.75, ceiling: 2.85, fiveFootWay: .25, roof: { type: 'hip', ridge: 5.6, colour: '#b4553d' },
  evidence: 'June 2024 Street View shows a single-storey house north of No. 3 under a red corrugated roof whose deep fascia overhangs the front: a white board along the front reading NANYANG CHEE CLAN ASSOCIATION 南洋徐氏總會 in red, over blue glazed doors, a white panel with a red 徐 and XU 21, and a wide glazed front, with two steps and potted plants. Google Maps lists Nanyang Chee Clan Assn at 21 Lor 19 Geylang, Singapore 388496, with its point inside this way, so the board and the panel are redrawn in original type.' + rowNote + ' It photographs about 8.1 m wide against the 7.6 m source edge.',
  sources: [way('454254241'), search('Nanyang Chee Clan Association 21 Lorong 19 Geylang'), pano('C6WgL2wlMEl3mpMGCqZnIw', 262, 5, 90), pano('ZqOXZ8yOp3uJbHKrYGYtcQ', 240, 5, 90)],
  colours: { wall: '#e9e5da', trim: '#d6d0c0', frame: '#3c4446', glass: '#5d7f8a', pier: '#e9e5da', back: '#d9d3c2', floor: '#b8a99a' },
  blocks: [
    { name: 'red corrugated fascia', u: [0, 7.59], h: [2.85, 3.75], out: .35, depth: .7, colour: '#b8503a' },
    { name: 'front steps', u: at241([-7.6, -.4]), h: [0, .3], out: .35, depth: .7, colour: '#b9b2a6' },
    { name: 'potted plants', u: at241([-8.0, -7.5]), h: [0, .8], out: .35, depth: .5, colour: '#4e6a3e' },
  ],
  // The red-lettered board along the front, and the white 徐 XU 21 panel between the doors.
  boards: [{ u: [0, at241([-.2, 0])[0]], h: [2.3, 2.75], out: .05 }, { u: at241([-4.8, -3.7]), h: [.15, 2.1], out: .05 }],
  piers: [[0, .3], [7.29, 7.59]],
  backFittings: [
    { name: 'boarded panel', u: at241([-7.9, -7.2]), h: [.1, 2.2], colour: '#c8a878' },
    { name: 'blue glazed doors', u: at241([-7.2, -5.3]), h: [.1, 2.2], colour: '#4f8a9a', glow: .05 },
    { name: 'boarded panel', u: at241([-5.3, -4.8]), h: [.1, 2.2], colour: '#c8a878' },
    { name: 'glazed front', u: at241([-3.5, -.3]), h: [.1, 2.2], colour: '#6a7a7c', glow: .05 },
  ],
};
export const no23 = {
  id: 'l19-23', buildingIds: ['476113983'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 10 },
  name: 'No. 23 Lorong 19 (June 2024 exterior, occupants not identified)', address: '23 Lorong 19 Geylang (plate 23)',
  height: 3.25, ceiling: 2.65, fiveFootWay: .25, roof: { type: 'hip', ridge: 5.9, colour: '#b8583e' },
  evidence: 'June 2024 Street View shows a cream single-storey house under a red tiled hipped roof, plated 23: a grilled door under a dark canopy at its south end with a red letterbox, two wide barred windows behind potted plants and trees, and a cream beam under the eaves. Google Maps lists Commercial Industrial Supplies & Services Pte Ltd and the Singapore PickleBall Association at 23 Lor 19 Geylang, the first with its point inside this way, but no sign for either was photographed, so no name is given.' + rowNote + ' It photographs about 9.9 m wide against the 9.13 m source edge.',
  sources: [way('476113983'), search('23 Lorong 19 Geylang'), pano('NzRDDjZPo91yWpvV8BIq5A', 262, 5, 90), pano('C6WgL2wlMEl3mpMGCqZnIw', 240, 5, 90)],
  colours: { wall: '#e2d6b4', trim: '#d8ccaa', frame: '#3c4446', glass: '#3d4549', pier: '#e2d6b4', back: '#e2d6b4', floor: '#a8a296' },
  bands: [[2.65, 3.05, .2]],
  blocks: [
    { name: 'dark canopy', u: at983([.1, 3.6]), h: [2.7, 3.0], out: .4, depth: .8, colour: '#4a4440' },
    { name: 'potted plants and trees', u: at983([4.5, 8.6]), h: [0, 1.1], out: .4, depth: .6, colour: '#4e6a3e' },
  ],
  piers: [[0, .25], [8.9, 9.126]],
  backFittings: [
    { name: 'grilled door', u: at983([.6, 2.6]), h: [.1, 2.25], colour: '#5a5c58' },
    { name: 'red letterbox', u: at983([1.2, 1.45]), h: [1.0, 1.4], out: .04, depth: .08, colour: '#b5221d' },
    { name: 'barred window', u: at983([4.0, 6.8]), h: [.4, 1.95], colour: '#cfcbbf' },
    { name: 'barred window', u: at983([6.9, 9.2]), h: [.4, 2.0], colour: '#c3bfb3' },
    { name: 'house plate', u: at983([5.2, 5.5]), h: [2.3, 2.5], out: .03, colour: '#2a2a2a' },
  ],
};
export const cheeHoeHong = {
  id: 'chee-hoe-hong', buildingIds: ['476113984'], kind: 'chee-hoe-hong', frontEdge: 0, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 10 },
  name: 'Chee Hoe Hong (Pte) Ltd (June 2024 exterior)', address: '25 Lorong 19 Geylang',
  height: 3.75, ceiling: 3.05, fiveFootWay: .25, roof: { type: 'hip', ridge: 6.1, colour: '#b8583e' },
  evidence: 'June 2024 Street View shows a single-storey house under a red tiled hipped roof with a deep orange fascia: a wide mesh-grilled window over a low wall of grey tiles, and a grilled doorway up two steps under a blue board reading 志和行(私人)有限公司 CHEE HOE HONG (PTE) LTD. Google Maps lists Chee Hoe Hong Pte Ltd at 25 Lor 19 Geylang, Singapore 388498, with its point inside this way, so the board is redrawn in original type. Zhejiang Shenghua Steel is also listed at No. 25, with its point 1.7 m outside the way, but no sign for it was photographed.' + rowNote + ' It photographs about 7.5 m wide, on the 7.49 m source edge but about 1 m north of it.',
  sources: [way('476113984'), search('Chee Hoe Hong Pte Ltd 25 Lorong 19 Geylang'), pano('DRAXJ_U9_f5azRj8xhBdEA', 262, 5, 90), pano('NzRDDjZPo91yWpvV8BIq5A', 235, 5, 90)],
  colours: { wall: '#ddd9cc', trim: '#d9824a', frame: '#3a3c3c', glass: '#6c7472', pier: '#ddd9cc', back: '#ddd9cc', floor: '#a8a296' },
  blocks: [
    { name: 'orange fascia', u: [0, 7.49], h: [3.05, 3.75], out: .3, depth: .6, colour: '#d9824a' },
    { name: 'tiled low wall', u: at984([10.2, 14.3]), h: [.05, 1.05], out: .02, depth: .02, colour: '#cfd2d0' },
    { name: 'front steps', u: at984([14.6, 17.4]), h: [0, .3], out: .3, depth: .6, colour: '#b9b2a6' },
  ],
  windows: [{ u: at984([10.2, 14.3]), h: [1.05, 2.65], panes: 6, out: .02 }],
  boards: [{ u: at984([14.5, 17.6]), h: [2.5, 2.85], out: .05 }],
  piers: [[0, .2], [7.29, 7.49]],
  backFittings: [{ name: 'grilled doorway', u: at984([14.6, 17.4]), h: [.3, 2.4], colour: '#3e3e3c' }],
};

// ---------------------------------------------------------------------------------------------
// 7. Way 454254239, No. 29: Lei Zang Si, a white five-storey temple behind a garden, with blue-framed windows under
// striped Tibetan lintels and a central bay of blue balconies. Its front (edge 1, u north from the south corner) is
// read 1.5 m behind the source edge, where the lane panoramas agree: about 14.4 m wide from 1.8 m south of the source
// corner, laid proportionally on the 13.87 m source edge.
const W239 = 13.873, at239 = lay(-1.8, W239 / 14.4);
const blue239 = '#2a62a8', rows239 = [[5.0, 6.7], [8.3, 9.9], [11.6, 13.1], [15.2, 16.8]];
const cols239 = [[-1.7, -.95], [-.1, 1.25], [9.1, 11.0], [11.7, 12.4]];
const lintel239 = (u, top) => [['#c8302a', 0, .14], ['#e8c23a', .14, .24], ['#3f8a4a', .24, .34]].map(([colour, b, t]) => ({ name: 'striped lintel', u: [u[0] - .08, u[1] + .08], h: [top + .06 + b, top + .06 + t], out: .1, depth: .2, colour }));
export const leiZangSi = {
  id: 'lei-zang-si', buildingIds: ['454254239'], kind: 'lei-zang-si', frontEdge: 1, reviewRoad: 'Lorong 19 Geylang', review: { distance: 12, pitch: 32 },
  name: 'Lei Zang Si (Singapore) 雷藏寺 (June 2024 exterior)', address: '29 Lorong 19 Geylang',
  height: 18.5, ceiling: 4.0, fiveFootWay: .3, roof: { type: 'flat', colour: '#9a9a96' },
  evidence: 'June 2024 Street View shows a white five-storey temple set back behind a garden north of No. 25, hung with strings of Tibetan prayer flags: blue-framed windows under striped red, yellow and green lintels in four rows either side; a central bay of blue balconies with yellow lattice balustrades, over which tall windows carry the large characters 雷藏寺 between gold emblems and columns of black script; blue eaves; and, under maroon awnings, a yellow lattice gate, a glazed front and a red door with gold, with an incense burner chimney in the garden. Google Maps lists Lei Zang Si (Singapore) 雷藏寺 (新加坡) at 29 Lor 19 Geylang, Singapore 388500, with its point inside this way, so the characters are redrawn in original type. Two pairs of June 2024 lane panoramas agree on the front about 1.5 m behind the source edge, where it is about 14.4 m wide from 1.8 m south of the source corner, against the 13.87 m source edge. Heights were read on that plane, with the top floor allowed for the eaves\' overhang: window rows at about 5.0-6.7, 8.3-9.9, 11.6-13.1 and 15.2-16.8 m, eaves at about 18.5 m.',
  sources: [way('454254239'), search('Lei Zang Si Singapore 29 Lorong 19 Geylang'), pano('jTV3E2m6tWXbN5g4963Hdg', 262, 25, 100), pano('MXq6J5f3NkewJxPMUah9pQ', 235, 15, 100), pano('DRAXJ_U9_f5azRj8xhBdEA', 280, 20, 100)],
  colours: { wall: '#f2f2ee', trim: blue239, frame: blue239, glass: '#4c5a5e', pier: '#f2f2ee', back: '#e8e6e0', floor: '#a8a296' },
  windows: [
    ...cols239.flatMap(s => rows239.map(h => ({ u: at239(s), h, panes: 2, surround: true }))),
    ...[[5.9, 7.1], [8.6, 10.2]].map(h => ({ u: at239([2.9, 7.6]), h, panes: 4 })),
    ...[[11.6, 14.0], [14.3, 17.0]].map(h => ({ u: at239([3.6, 6.6]), h, panes: 2, out: .06 })),
  ],
  blocks: [
    ...cols239.flatMap(s => rows239.flatMap(([, t]) => lintel239(at239(s), t))),
    { name: 'blue frame round the upper central windows', u: at239([3.3, 6.9]), h: [11.4, 17.8], out: .02, depth: .04, colour: blue239 },
    ...lintel239(at239([3.3, 6.9]), 17.8),
    ...[[4.2, 4.55], [7.25, 7.6], [10.95, 11.35]].map(h => ({ name: 'blue balcony slab', u: at239([2.6, 7.9]), h, out: .7, depth: 1.4, colour: blue239 })),
    ...[[2.6, 2.9], [7.6, 7.9]].map(s => ({ name: 'blue balcony column', u: at239(s), h: [4.55, 10.95], out: 1.25, depth: .2, colour: blue239 })),
    ...[[4.55, 5.4], [7.6, 8.45]].map(h => ({ name: 'yellow lattice balustrade', u: at239([2.9, 7.6]), h, out: 1.3, depth: .06, colour: '#e3bf4e' })),
    ...[[2.0, 2.6], [7.6, 8.2]].map(s => ({ name: 'gold emblem', u: at239(s), h: [14.8, 15.5], out: .05, depth: .05, colour: '#d9b54a' })),
    ...[[2.1, 2.35], [7.7, 7.95]].map(s => ({ name: 'column of black script', u: at239(s), h: [11.8, 14.0], out: .03, depth: .02, colour: '#1d1d1d' })),
    { name: 'blue eaves', u: [0, W239], h: [18.2, 18.8], out: .4, depth: .8, colour: blue239 },
    { name: 'maroon awning', u: [0, at239([9.9, 0])[0]], h: [3.1, 3.9], out: .75, depth: 1.5, colour: '#8e2a36' },
    { name: 'garden shrubs', u: at239([-1.5, 12.2]), h: [0, .85], out: 2.6, depth: 2.6, colour: '#4a6a3c' },
    { name: 'incense burner chimney', u: at239([11.6, 12.2]), h: [0, 3.4], out: 3.6, depth: .6, colour: '#3a3532' },
  ],
  // The characters 雷藏寺 on the upper central windows.
  boards: [{ u: at239([4.4, 5.8]), h: [11.8, 16.6], out: .1 }],
  piers: [[0, .3], [W239 - .3, W239]],
  backFittings: [
    { name: 'yellow lattice gate', u: at239([0, 3.3]), h: [.1, 2.9], colour: '#d9b54a' },
    { name: 'glazed front', u: at239([3.3, 7.6]), h: [.1, 2.9], colour: '#5a6a6a', glow: .08 },
    { name: 'red door with gold', u: at239([7.8, 9.7]), h: [.1, 2.9], colour: '#b8241c' },
    { name: 'glass door', u: at239([10.8, 11.6]), h: [.1, 2.5], colour: '#6a7a7c' },
  ],
  rooftop: [{ u: at239([.5, 4.5]), top: 20.6, setback: 1.0, depth: 3.0, colour: '#ecece8' }],
};

// ---------------------------------------------------------------------------------------------
// 8. Way 454254309, No. 33 (Treasures @ G19): a white three-storey streamline block of five bays and two stair towers,
// with curved hoods, pink speed stripes and a row of shops in its five-foot way. Its front (edge 2, u north from the
// side lane) is read 1.5 m behind the source edge, where the lane panoramas agree: about 24.4 m long from 0.5 m north
// of the source corner, laid proportionally on the 25.17 m source edge. The source face's north end stands 2.7 m from
// the lane's centreline, inside the estimated carriageway, so its street-level pieces are held within 0.25 m.
const W309 = 25.165, at309 = lay(.5, W309 / 24.4);
const bays309 = [[.6, 4.6], [7.6, 11.8], [12.5, 16.5], [18.7, 20.6], [20.9, 24.6]];
const wins309 = [[.6, 2.0], [2.6, 4.0], [8.0, 9.25], [9.9, 11.25], [13.0, 14.25], [14.9, 16.1], [19.25, 20.25], [21.4, 22.5], [23.0, 24.0]];
const towers309 = [[5.4, 6.4], [17.25, 18.0]];
const pink309 = '#d9a3a0';
export const starlonTektron = {
  id: 'starlon-tektron', buildingIds: ['454254309'], kind: 'starlon-tektron', frontEdge: 2, reviewRoad: 'Lorong 19 Geylang', review: { distance: 8, pitch: 24 },
  name: 'Starlon and Tektron Pacific, No. 33 Lorong 19 (June 2024 exterior)', address: '33 Lorong 19 Geylang (Treasures @ G19)',
  height: 12.0, ceiling: 3.3, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9893' },
  heldFlat: true, // the source face's north end stands 2.7 m from the lane's centreline, inside the estimated carriageway
  evidence: 'June 2024 Street View shows a white three-storey streamline block across a side lane from Lei Zang Si, in five bays either side of two stair towers lit by tall strips of windows: paired windows on each upper floor under curved concrete hoods, triple pink speed stripes above and below them, and a stepped parapet with small fins over the towers; its south wall on the side lane is mauve. Its five-foot way holds a row of shops: a hair salon with barber poles under a black board reading Starlon & Spa, 33 Lorong 19 Geylang #01-05; an empty unit; Tektron Pacific under two boards reading tektron pacific, the sticker & signage workshop; a florist under a board reading MISS BECCA FLORAL; a green board reading QUAN AN VIETNAM; and two boards reading 康记冰糖葫芦 over stalls with tiled canopies. Google Maps lists Starlon (hair salon, 33 Lor 19 Geylang #01-05, Treasures @ G19) and Tektron Pacific (print shop, #01-06) here, both operating, with their points inside this way, so the block is named after them, as No. 301 Geylang Road was, and their boards are redrawn in original type, with no claim about the other units. The florist is listed as Orae Fleur, Quan An Viet Nam is marked permanently closed and the candied-fruit stall is not listed, so their boards are blank. Two June 2024 lane panoramas agree strongly on the front 1.5 m behind the source edge, where it is about 24.4 m long against the 25.17 m source edge. Heights were read on that plane, above the five-foot-way floor: five-foot way 3.3 m, windows 5.1-6.3 and 8.7-9.8 m, hoods 7.2-7.9 and 10.8-11.6 m, parapet about 12 m.',
  sources: [way('454254309'), search('Starlon 33 Lorong 19 Geylang'), search('Tektron Pacific 33 Lorong 19 Geylang'), pano('BwN_1fcMAZiFLmKGW-VM4A', 262, 20, 100), pano('XLi_3Ajhl22orFwbiySNYQ', 262, 20, 100), pano('IzKmZuCt4YSUbvuGY87eag', 250, 20, 100)],
  colours: { wall: '#f1f0ec', trim: '#e6e4de', frame: '#55595b', glass: '#5d6a6e', pier: '#f1f0ec', back: '#d6d4cf', floor: '#a8a296' },
  windows: [
    ...wins309.flatMap(s => [{ u: at309(s), h: [5.1, 6.3], panes: 3 }, { u: at309(s), h: [8.7, 9.8], panes: 3 }]),
    ...towers309.map(s => ({ u: at309(s), h: [4.7, 10.7], panes: 2 })),
  ],
  blocks: [
    ...bays309.flatMap(s => [[7.2, 7.9], [10.8, 11.6]].map(h => ({ name: 'curved concrete hood', u: at309(s), h, out: .5, depth: 1.0, colour: '#ecebe6' }))),
    ...bays309.flatMap(s => [[4.35, 4.7], [6.7, 7.05], [10.05, 10.4]].map(h => ({ name: 'pink speed stripes', u: at309(s), h, out: .02, depth: .03, colour: pink309 }))),
    ...towers309.map(([l, r]) => ({ name: 'stepped tower parapet', u: at309([l - .4, r + .4]), h: [12.0, 12.6], out: .05, depth: .3, colour: '#ecebe6' })),
    { name: 'blank florist board', u: at309([13.4, 15.0]), h: [2.3, 2.75], out: .05, depth: .03, colour: '#e8e6e0' },
    { name: 'blank green board', u: at309([15.1, 16.4]), h: [2.3, 2.7], out: .05, depth: .03, colour: '#2f6a3a' },
    ...[[18.9, 20.0], [22.2, 23.7]].map(s => ({ name: 'blank black board', u: at309(s), h: [2.4, 2.8], out: .05, depth: .03, colour: '#1d1d1d' })),
    ...[[1.0, 1.25], [3.6, 3.85]].map(s => ({ name: 'barber pole', u: at309(s), h: [1.9, 2.6], out: .15, depth: .18, colour: '#d8d4d0' })),
  ],
  // Starlon's board, and Tektron Pacific's two boards.
  boards: [{ u: at309([1.39, 3.46]), h: [2.18, 2.86], out: .05 }, ...[[8.4, 10.0], [10.75, 12.05]].map(s => ({ u: at309(s), h: [2.31, 2.76], out: .05 }))],
  piers: [[.5, .8], [4.5, 5.0], [7.1, 7.6], [12.0, 12.4], [16.5, 17.0], [20.4, 20.9], [24.4, 24.9]].map(s => at309(s).map(v => Math.min(W309, v))),
  backFittings: [
    { name: 'salon front', u: at309([.9, 4.4]), h: [.1, 2.1], colour: '#4a3c36', glow: .08 },
    { name: 'empty glazed unit', u: at309([5.1, 7.0]), h: [.1, 2.8], colour: '#7c8688' },
    { name: 'print shop', u: at309([7.7, 11.9]), h: [.1, 2.2], colour: '#6a7270', glow: .08 },
    { name: 'florist', u: at309([12.5, 15.0]), h: [.1, 2.2], colour: '#7a6a5e', glow: .06 },
    { name: 'shop', u: at309([15.1, 16.4]), h: [.1, 2.2], colour: '#5a5e58' },
    { name: 'glazed unit', u: at309([17.1, 20.3]), h: [.1, 2.6], colour: '#6c7678' },
    { name: 'stalls under tiled canopies', u: at309([21.0, 24.3]), h: [.1, 2.4], colour: '#7a4a3a', glow: .05 },
  ],
  sides: [{
    edge: 3, // the mauve south wall on the side lane, u east to the lane corner
    blocks: [{ name: 'mauve wall', u: [.2, 26.8], h: [.1, 12.0], out: .02, depth: .02, colour: '#a87e8a' }],
    windows: [[21.0, 22.0], [23.5, 24.5]].flatMap(u => [[5.1, 6.3], [8.7, 9.8]].map(h => ({ u, h, panes: 2, out: .03 }))),
  }],
};

// ---------------------------------------------------------------------------------------------
// 9. Way 454254310, No. 146 Sims Avenue, the Lorong 19 west corner: a cream three-storey corner coffeeshop with curved
// hoods over its windows. Its lane face (edge 2, u north from the back lane to the splay) is read 1.5 m in front of the
// source edge, where three lane panoramas agree on its boards: about 20.9 m from 2.0 m south of the source corner to
// the splay, laid on the 21.02 m source edge. The splay (edge 1) and the Sims Avenue front (edge 0) are side faces,
// held flat because their source edges stand inside Sims Avenue's estimated carriageway.
const W310 = 21.021, at310 = lay(-2.0, W310 / 20.9);
const cream310 = '#e9dcb8', hood310 = '#d6bd8e', rows310 = [[5.1, 6.4], [8.6, 9.9]], hoodRows310 = [[7.1, 7.8], [10.75, 11.6]];
const hoods310 = (spans, at = s => s) => spans.flatMap(s => hoodRows310.map(h => ({ name: 'curved concrete hood', u: at(s), h, out: .32, depth: .64, colour: hood310 })));
export const sims146 = {
  id: 'sims-146', buildingIds: ['454254310'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 19 Geylang', review: { distance: 8, pitch: 22 },
  name: 'No. 146 Sims Avenue, Lorong 19 west corner (June 2024 exterior, occupants not identified)', address: '146 Sims Avenue (Lorong 19 corner)',
  height: 12.0, ceiling: 3.9, fiveFootWay: 2.5, roof: { type: 'flat', colour: '#96928a' },
  evidence: 'June 2024 Street View shows a cream three-storey corner coffeeshop at Lorong 19 and Sims Avenue: windows in pairs on its upper floors under curved concrete hoods, bathroom louvres at its south end, a stepped parapet and a splayed corner; at street level an open coffeeshop under a maroon awning of the gas supplier Union Energy Group, with a cream board reading 中国炒菜 杂菜饭 on the lane, a yellow board reading 中国炒菜·杂菜饭 on the splay, and on Sims Avenue a yellow board reading 津程餐室 JING CHEN EATING HOUSE and stall boards (板面, LẨU GÀ CÔ BA). On its back lane are a metal spiral stair and a tall exhaust duct. Google Maps lists Jing Chen Eating House at 146 Sims Ave but marks it permanently closed, and Rong Cheng Fu Qing Restaurant, also at No. 146, is closed too; the tenants listed now (Monster Eating House and Thai and Vietnamese stalls) were not photographed, and the other boards name no business, so no name is given and every board is blank. Three June 2024 lane panoramas agree on its boards 1.5 m in front of the source lane edge, where the lane face runs about 20.9 m from 2.0 m south of the source corner to the splay, against the 21.02 m source edge. Heights were read on that plane, above the five-foot-way floor: windows 5.1-6.4 and 8.6-9.9 m, hoods 7.1-7.8 and 10.75-11.6 m, parapet about 12 m.',
  sources: [way('454254310'), search('146 Sims Avenue Singapore 387468'), search('Jing Chen Eating House 146 Sims Avenue'), pano('2Ytwaot-jcjncvQsoDh-YA', 262, 20, 100), pano('FrRZ2jysnfLAH20E2BH4lw', 250, 20, 100), pano('7HvC0j9FXvZ4XoPIVwAqtA', 230, 20, 100), pano('EVsAnNKhG4-6cISXUHWaKQ', 175, 15, 90)],
  colours: { wall: cream310, trim: '#ddd0aa', frame: '#5a5c58', glass: '#4a5458', pier: cream310, back: '#5e5248', floor: '#a8a296' },
  windows: [[.75, 1.9], [3.5, 4.9], [5.8, 7.1], [8.9, 10.25], [10.9, 12.25], [13.5, 14.75], [16.4, 17.6]].flatMap(s => rows310.map(h => ({ u: at310(s), h, panes: 2 }))),
  vents: [[7.0, 7.4], [10.4, 10.8]].map(h => ({ u: at310([-1.75, -.6]), h })),
  blocks: [
    ...hoods310([[.4, 2.5], [3.0, 7.9], [8.25, 12.75], [13.1, 18.4]], at310),
    { name: 'stepped parapet', u: at310([8.0, 14.0]), h: [12.0, 12.3], out: .05, depth: .3, colour: cream310 },
    { name: 'maroon awning', u: at310([-1.0, 18.9]), h: [2.6, 3.7], out: .7, depth: 1.4, colour: '#7a2a33' },
    { name: 'blank cream board', u: at310([-.75, 4.0]), h: [3.9, 4.7], out: .05, depth: .04, colour: '#efe3b5' },
  ],
  piers: [[2.0, 2.4], [7.6, 8.0], [12.8, 13.1], [18.5, 18.9]].map(at310),
  backFittings: [{ name: 'open coffeeshop', u: at310([-1.8, 18.6]), h: [.1, 3.5], colour: '#6a5a4a', glow: .1 }],
  sides: [{
    edge: 1, // the splay, u from the lane face to the Sims Avenue front
    heldFlat: true, // its source edge stands 6.0 m from Sims Avenue's centreline, inside the estimated carriageway
    windows: rows310.map(h => ({ u: [2.2, 3.5], h, panes: 2 })),
    blocks: [...hoods310([[1.5, 4.3]]), { name: 'blank yellow board', u: [.4, 5.3], h: [3.9, 4.9], out: .06, depth: .04, colour: '#f0cc2e' }, { name: 'maroon awning, held flat', u: [0, 5.7], h: [2.7, 3.7], out: .12, depth: .24, colour: '#7a2a33' }, { name: 'corner pier', u: [2.4, 3.2], h: [0, 3.9], out: .1, depth: .2, colour: cream310 }],
  }, {
    edge: 0, // the Sims Avenue front, u west from the splay
    heldFlat: true, // its source edge stands 4.3 m from Sims Avenue's centreline, inside the estimated carriageway
    windows: [[.6, 1.9], [2.5, 3.7]].flatMap(u => rows310.map(h => ({ u, h, panes: 2 }))),
    blocks: [...hoods310([[.4, 4.0]]), { name: 'blank yellow eating-house board', u: [.2, 3.6], h: [3.9, 4.7], out: .06, depth: .04, colour: '#f0cc2e' }, { name: 'maroon awning, held flat', u: [0, 4.7], h: [2.6, 3.6], out: .12, depth: .24, colour: '#7a2a33' }, { name: 'open coffeeshop', u: [.2, 4.5], h: [.1, 3.5], out: .01, depth: .02, colour: '#6a5a4a' }],
  }, {
    edge: 3, // the south wall on the back lane: louvres and a small balcony
    vents: [[7.0, 7.4], [10.4, 10.8]].map(h => ({ u: [.6, 1.6], h })),
    blocks: [{ name: 'small balcony', u: [1.8, 3.2], h: [6.3, 6.5], out: .45, depth: .9, colour: cream310 }, { name: 'balcony railing', u: [1.8, 3.2], h: [6.5, 7.4], out: .88, depth: .04, colour: '#8a8c88' }],
  }, {
    edge: 5, // the back wall further west: a metal spiral stair and a tall exhaust duct
    blocks: [{ name: 'metal spiral stair', u: [1.0, 3.0], h: [0, 9.0], out: 1.0, depth: 1.9, colour: '#6a6c6a' }, { name: 'exhaust duct', u: [3.4, 4.4], h: [6.0, 13.5], out: .4, depth: .8, colour: '#b8bcbe' }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 10. Way 454254339, No. 148 Sims Avenue, the Lorong 19 east corner: He Ping Claypot Rice Restaurant, a cream
// two-storey corner coffeeshop with ornate capitals under deep eaves. Its lane face (edge 3, u south from Sims Avenue)
// is read 0.5 m in front of the source edge, where the lane panoramas agree: about 22.2 m from the corner to its south
// end, triangulated 21.7 m along, against the 19.64 m source edge; laid proportionally. Its Sims Avenue front is only
// about 5.9 m: its party line with No. 150 triangulates 3.6 m inside the source outline, so the outline's east 3.5 m
// on Sims Avenue is drawn as No. 150's plain pale green west bay.
const W339 = 19.635, lay339 = lay(-.5, W339 / 22.2), at339 = s => lay339(s).map(v => Math.min(W339, Math.max(0, v)));
const cream339 = '#ece6d6', rows339 = [[5.8, 7.45]];
export const hePing = {
  id: 'he-ping', buildingIds: ['454254339'], kind: 'he-ping', frontEdge: 3, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 16 },
  name: 'He Ping Claypot Rice Restaurant (June 2024 exterior)', address: '148 Sims Avenue (the Lorong 19 east corner)',
  height: 8.8, ceiling: 4.4, fiveFootWay: 2.5, roof: { type: 'hip', ridge: 10.8, colour: '#5d534d' },
  evidence: 'June 2024 Street View shows a cream two-storey corner coffeeshop on the east corner of Lorong 19 and Sims Avenue: upper-floor windows between pilasters with ornate red and green relief capitals under a moulded frieze and deep eaves, a brown cornice at first-floor level, a salmon-tiled bay at its south end, and at the corner a dark wooden board with 和平 in white calligraphy; at street level an open coffeeshop under grey awnings of the gas supplier TSH Gas, lettered Esso LPG. Google Maps lists He Ping Claypot Rice Restaurant, a Chinese restaurant, at 148 Sims Ave, Singapore 387470, with its point inside this way, so the corner board is redrawn in original type; the awnings name a gas supplier and stay blank. Two pairs of June 2024 lane panoramas agree on the lane face 0.5 m in front of the source edge; its south end on the back lane triangulates 21.7 m from the source corner, so the face is about 22.2 m long against the 19.64 m source edge. On Sims Avenue, bearings from two Sims Avenue panoramas put its party line with No. 150 3.6 m inside the source outline and 1.2 m behind its front, so its Sims front is only about 5.9 m wide; the outline\'s east 3.5 m on Sims Avenue is drawn plain, in No. 150\'s pale green. Heights were read on the lane plane, above the five-foot-way floor: cornice at 4.45-4.9 m, windows at 5.8-7.45 m, eaves at about 8.8 m.',
  sources: [way('454254339'), search('He Ping Claypot Rice Restaurant 148 Sims Avenue'), pano('7HvC0j9FXvZ4XoPIVwAqtA', 80, 10, 90), pano('FrRZ2jysnfLAH20E2BH4lw', 80, 15, 100), pano('2Ytwaot-jcjncvQsoDh-YA', 75, 10, 90), pano('8peXBtTZFyR4k8lv2HZbrQ', 175, 15, 100), pano('X9akYazsOs1oFvuI5CYKCw', 225, 10, 90)],
  colours: { wall: cream339, trim: '#e2dbc8', frame: '#4a4c4a', glass: '#4a5458', pier: cream339, back: '#5c544c', floor: '#a8a296' },
  bands: [[4.45, 4.9, .3, '#8a6450'], [8.1, 8.8, .15, '#e2dbc8']],
  windows: [[2.5, 3.5], [5.1, 6.0], [6.6, 7.7], [9.5, 10.4], [11.4, 12.4], [14.4, 15.4], [16.3, 17.3], [19.5, 20.4]].flatMap(s => rows339.map(h => ({ u: at339(s), h, panes: 2 }))),
  blocks: [
    ...[[.3, .9], [3.6, 4.3], [7.8, 8.5], [12.8, 13.4], [17.9, 18.7]].flatMap(s => [
      { name: 'pilaster', u: at339(s).map(v => Math.max(0, v)), h: [4.9, 8.1], out: .08, depth: .16, colour: '#e2dbc8' },
      { name: 'relief capital', u: at339(s).map(v => Math.max(0, v)), h: [8.0, 8.75], out: .14, depth: .2, colour: '#a85a4e' },
    ]),
    { name: 'salmon-tiled bay', u: at339([18.7, 21.7]), h: [4.9, 8.1], out: .02, depth: .03, colour: '#c27a5e' },
    { name: 'deep eaves', u: [0, W339], h: [8.8, 9.05], out: .5, depth: 1.0, colour: '#5a4a42' },
    { name: 'grey awning', u: at339([-.3, 21.6]).map(v => Math.max(0, v)), h: [2.6, 4.0], out: .7, depth: 1.4, colour: '#5f5f5d' },
  ],
  // The corner's wooden board with 和平.
  boards: [{ u: at339([1.4, 3.0]), h: [4.55, 5.9], out: .35 }],
  piers: [[-.5, .3], [8.0, 8.5], [13.0, 13.4], [18.0, 18.7], [21.2, 21.7]].map(s => at339(s).map(v => Math.max(0, v))),
  backFittings: [{ name: 'open coffeeshop', u: at339([.4, 21.2]), h: [.1, 4.0], colour: '#5e5248', glow: .1 }],
  sides: [{
    edge: 0, // the Sims Avenue front, u west from the source outline's east end; No. 148 from 3.6 m to the corner
    heldFlat: true, // its source edge stands 6.6 m from Sims Avenue's centreline, at the estimated carriageway's edge
    windows: [[5.2, 6.0], [6.3, 7.0]].flatMap(u => rows339.map(h => ({ u, h, panes: 2 }))),
    blocks: [
      { name: 'No. 150\'s west bay, pale green', u: [.05, 3.55], h: [.1, 8.8], out: .02, depth: .03, colour: '#c9d6b4' },
      { name: 'No. 150\'s shutter', u: [.3, 3.3], h: [.1, 3.0], out: .04, depth: .02, colour: '#bdbdb8' },
      { name: 'cornice', u: [3.6, 9.03], h: [4.45, 4.9], out: .12, depth: .24, colour: '#8a6450' },
      { name: 'relief capital', u: [3.6, 4.2], h: [8.0, 8.75], out: .1, depth: .2, colour: '#b8584a' },
      { name: 'deep eaves', u: [3.6, 9.03], h: [8.8, 9.05], out: .5, depth: 1.0, colour: '#5a4a42' },
      { name: 'grey awning, held flat', u: [3.6, 9.03], h: [2.6, 4.0], out: .12, depth: .24, colour: '#5f5f5d' },
      { name: 'open coffeeshop', u: [3.9, 8.8], h: [.1, 3.9], out: .01, depth: .02, colour: '#5e5248' },
    ],
  }],
};

// ---------------------------------------------------------------------------------------------
// 11. Way 454254314, 1 Lorong Bachok: Kang Ha Pheng Sim Kok 江夏平心閣, an ornate two-storey Peranakan corner house of
// 1929 with a verandah on Lorong 19 and its entrance and pediment on Lorong Bachok. Its lane face (edge 1, u south
// from the back lane) photographs on the source plane, from a low annex wall 2.8 m along to the corner pier 24.9 m
// along, where the source edge runs on to 26.5 m; the elevation is laid at its own scale with its corner on the
// source corner (u = s + 1.6), so the outline's 4.4 m surplus falls at the back-lane end. The depth score's peak
// 3-4 m forward came from the street trees; bearings to the corner pier put the front within 0.7 m of the source line.
const W314 = 26.495, at314 = ([a, b]) => [a, b].map(v => Math.min(W314, +(v + 1.6).toFixed(2)));
const cols314 = [[5.85, 6.45], [10.05, 10.65], [14.25, 14.85], [18.9, 19.5]], bays314 = [8.25, 12.45, 16.9, 21.4];
const cream314 = '#efe9dc', brown314 = '#7a4a3a';
const relief314 = (u, h, colour, face = .3) => ({ name: 'coloured relief panel', u, h, out: face + .02, depth: .04, colour });
export const kangHaPheng = {
  id: 'kang-ha-pheng', buildingIds: ['454254314'], kind: 'kang-ha-pheng', frontEdge: 1, reviewRoad: 'Lorong 19 Geylang', review: { distance: 7, pitch: 20 },
  name: 'Kang Ha Pheng Sim Kok 江夏平心閣 (June 2024 exterior)', address: '1 Lorong Bachok (the Lorong 19 corner)',
  height: 6.0, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8a84' },
  evidence: 'June 2024 Street View shows an ornate cream two-storey Peranakan corner house at Lorong 19 and Lorong Bachok, dated 1929 on its pediment. On Lorong 19, behind a green railing, a verandah of square columns with tall coloured relief panels of plants, figures and a soldier, under a frieze of animals in relief (tigers, a leopard, a hound, birds); above a brown cornice, pairs of shuttered windows with arched fanlights between pilasters carrying coloured relief and tile panels, an ornate cornice and deep eaves under a tiled hipped roof. At the back-lane end a lower white annex wall carries a wire fence. On Lorong Bachok the entrance, a grille gate under a dark board reading 江夏平心阁 KANG HA PHENG SIM KOK, stands between the soldier piers, under a curved pediment reading 江夏 平心閣 1929. Google Maps lists Kang Ha Pheng Sim Kok, an association, at 1 Lorong Bachok, with its point inside this way, so the board and the pediment are redrawn in original type. The lane panoramas agree on the front on the source plane (their depth score peaks 3-4 m forward on the street trees, but bearings from two panoramas to the corner pier put it within 0.7 m of the source line): the house runs from the annex wall 2.8 m along the source edge to the corner pier 24.9 m along, against the 26.5 m source edge, so the elevation is laid at its own scale with its corner on the source corner. Heights were read on the source plane: verandah to 4.0 m, animal frieze 4.05-4.75 m, cornice 4.8-5.25 m, upper windows 5.95-7.45 m with fanlights to 8.0 m, ornate cornice 8.6-9.1 m, eaves about 9.5 m.',
  sources: [way('454254314'), search('Kang Ha Pheng Sim Kok 1 Lorong Bachok'), pano('MXq6J5f3NkewJxPMUah9pQ', 40, 12, 70), pano('BwN_1fcMAZiFLmKGW-VM4A', 45, 10, 80), pano('XLi_3Ajhl22orFwbiySNYQ', 80, 10, 80), pano('IzKmZuCt4YSUbvuGY87eag', 105, 10, 80)],
  colours: { wall: cream314, trim: '#e4dccb', frame: '#5a3a2a', glass: '#4c4a44', pier: cream314, back: '#ece6d8', floor: '#c9c2b2' },
  bands: [[3.9, 4.05, .25, brown314], [4.05, 4.75, .2, '#ebe4d4'], [4.8, 5.25, .35, brown314]],
  // The main two-storey house over the verandah, under a hipped roof; the shell below is the annex wall's height.
  upper: [{ name: 'main house', outline: [[7.45, 0], [W314 - .05, 0], [W314 - .05, -5.7], [7.45, -5.7]], from: 6.0, to: 9.5, ridge: 11.6, colour: cream314, roof: '#9a5a44' }],
  windows: bays314.flatMap(c => [[c - 1.15, c - .4], [c + .4, c + 1.15]]).map(s => ({ u: at314(s), h: [5.95, 7.45], panes: 2, shutters: true, arched: true })),
  blocks: [
    // The verandah columns: brown plinths, relief panels and capitals; the corner pier.
    ...[...cols314, [23.35, 24.9]].flatMap(s => [
      { name: 'verandah column', u: at314(s), h: [0, 3.9], out: .15, depth: .3, colour: cream314 },
      { name: 'brown plinth', u: at314(s), h: [1.05, 1.5], out: .18, depth: .36, colour: brown314 },
      relief314(at314([s[0] + .1, s[1] - .1]), [1.9, 3.5], '#9fb69a'),
    ]),
    { name: 'raised verandah floor', u: [at314([5.85, 0])[0], W314], h: [0, .55], out: -.9, depth: 1.8, colour: '#c9c2b2' },
    // Animals in relief along the frieze, two to a bay; coloured panels and pilasters on the upper floor.
    ...bays314.flatMap(c => [[c - 1.5, c - .4], [c + .4, c + 1.5]].map(s => ({ name: 'animal relief', u: at314(s), h: [4.15, 4.65], out: .32, depth: .06, colour: '#c9c3b6' }))),
    ...[...cols314, [23.35, 24.9], ...bays314.map(c => [c - .2, c + .2])].flatMap(s => [
      { name: 'upper pilaster', u: at314(s), h: [5.25, 8.6], out: .08, depth: .16, colour: '#e4dccb' },
      relief314(at314([s[0] + .05, s[1] - .05]), [5.6, 7.8], '#c98a7a', .16),
    ]),
    ...bays314.flatMap(c => [[c - 1.15, c - .4], [c + .4, c + 1.15]]).map(s => ({ name: 'tile panel under the window', u: at314(s), h: [5.35, 5.85], out: .04, depth: .03, colour: '#8fb59a' })),
    { name: 'ornate frieze', u: [at314([5.85, 0])[0], W314], h: [8.1, 8.6], out: .05, depth: .1, colour: '#d9c9b0' },
    { name: 'ornate cornice', u: [at314([5.85, 0])[0], W314], h: [8.6, 9.1], out: .2, depth: .4, colour: '#e4dccb' },
    { name: 'deep eaves', u: [at314([5.85, 0])[0], W314], h: [9.3, 9.55], out: .55, depth: 1.1, colour: '#6a4a3e' },
    // The annex wall and the back-lane end, with the wire fence above the annex.
    { name: 'white annex wall', u: [0, at314([5.85, 0])[0]], h: [0, 4.0], out: -.05, depth: .1, colour: '#e6e2d8' },
    { name: 'wire fence', u: at314([2.8, 5.85]), h: [6.0, 8.2], out: -.3, depth: .04, colour: '#8a8c88' },
    // The green railing in front of the verandah: two rails and posts every 2 m.
    ...[[.15, .22], [1.02, 1.1]].map(h => ({ name: 'green railing rail', u: [at314([5.85, 0])[0], at314([23.2, 0])[0]], h, out: 1.2, depth: .05, colour: '#2f5a3a' })),
    ...Array.from({ length: 10 }, (_, i) => 7.45 + i * 1.97).map(c => ({ name: 'green railing post', u: [+c.toFixed(2), +(c + .06).toFixed(2)], h: [.1, 1.1], out: 1.2, depth: .05, colour: '#2f5a3a' })),
  ],
  piers: [...cols314, [23.35, 24.9]].map(at314),
  backFittings: [
    { name: 'no-parking sign', u: at314([8.1, 8.4]), h: [2.5, 2.8], out: .03, colour: '#e8e8e8' },
    { name: 'pierced vent', u: at314([12.0, 12.9]), h: [3.0, 3.4], colour: '#b8ae9a' },
    { name: 'door', u: at314([15.3, 15.9]), h: [.55, 3.3], colour: '#6a4a36' },
    ...[16.95, 21.75].flatMap(c => [
      { name: 'window', u: at314([c - .4, c + .4]), h: [1.95, 3.4], colour: '#6a4a36' },
      { name: 'tile panel', u: at314([c - .4, c + .4]), h: [1.35, 1.85], colour: '#8fb59a' },
    ]),
    { name: 'no-parking sign', u: at314([20.0, 20.3]), h: [2.5, 2.8], out: .03, colour: '#e8e8e8' },
  ],
  sides: [{
    edge: 0, // the Lorong Bachok face, u east from the Lorong 19 corner: the entrance, its board and the 1929 pediment
    windows: [[1.9, 2.6], [3.0, 3.7]].map(u => ({ u, h: [5.95, 7.45], panes: 2, shutters: true, arched: true })),
    blocks: [
      ...[[0, 1.55], [3.75, 4.6]].flatMap(u => [
        { name: 'soldier pier', u, h: [0, 3.9], out: .15, depth: .3, colour: cream314 },
        { name: 'brown plinth', u, h: [1.05, 1.5], out: .18, depth: .36, colour: brown314 },
        relief314([u[0] + .15, u[1] - .15], [1.9, 3.5], '#7f9a76'),
      ]),
      { name: 'grille gate', u: [1.7, 3.6], h: [.3, 3.1], out: .02, depth: .03, colour: '#6a6a66' },
      { name: 'frieze', u: [0, 5.83], h: [4.05, 4.75], out: .1, depth: .2, colour: '#ebe4d4' },
      { name: 'cornice', u: [0, 5.83], h: [4.8, 5.25], out: .17, depth: .35, colour: brown314 },
      { name: 'ornate cornice', u: [0, 5.83], h: [8.6, 9.1], out: .2, depth: .4, colour: '#e4dccb' },
      { name: 'curved pediment', u: [.7, 5.1], h: [9.5, 12.4], out: .05, depth: .3, colour: '#efe3c0' },
      { name: 'pediment crest', u: [2.4, 3.4], h: [12.4, 12.9], out: .05, depth: .3, colour: '#efe3c0' },
    ],
    // The entrance board, and the pediment's lettering.
    boards: [{ u: [1.7, 3.6], h: [3.2, 3.85], out: .06 }, { u: [1.3, 4.5], h: [9.8, 12.0], out: .22 }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 12. Way 454254247, No. 10: Bougainvilla Apartments, a white nine-storey block with a beige central bay under a
// gable, set back behind a lawn and a railing. Its front (edge 0, u north from the south end) photographs 4.5 m in
// front of the source edge (the No. 10 plate and the north-west corner triangulate there, and the floors repeat every
// 3.1 m only on that plane), from 1.3 m south of the source corner to 23.1 m north of it: about 24.4 m against the
// 22.18 m source edge. Laid proportionally on the source edge until its footprint is settled (open question 44).
const W247 = 22.179, at247 = lay(-1.34, W247 / 24.44);
const floors247 = [4.6, 7.7, 10.8, 13.9, 17.0, 20.1, 23.2, 26.3].slice(0, 7), white247 = '#f1f1ed', beige247 = '#e3d6b4';
export const bougainvilla = {
  id: 'bougainvilla', buildingIds: ['454254247'], kind: 'bougainvilla', frontEdge: 0, reviewRoad: 'Lorong 19 Geylang', review: { distance: 11, pitch: 34 },
  name: 'Bougainvilla Apartments (June 2024 exterior)', address: '10 Lorong 19 Geylang',
  height: 28.3, ceiling: 4.4, fiveFootWay: 2.2, roof: { type: 'flat', colour: '#a8a6a0' },
  evidence: 'June 2024 Street View shows a white apartment block of a ground-floor car porch and seven floors above, set back behind a lawn and a white railing with beige posts, north of an open car park at Lorong Bachok: angled corner bays of windows at both ends, single windows in beige surrounds, and a beige central bay of paired windows with balconies rising to an open gable; under the porch a lobby with raised lettering reading BOUGAINVILLA Apartments, a plate reading 10 and a blue sign reading BOUGAINVILLA APT. Google Maps lists Bougainvilla Apartments, an apartment complex, at 10 Lor 19 Geylang, Singapore 388492; its point lies in the block\'s rear way (454254245), outside the study, but the address, the plate and the lettering agree on this building, so it is named and the lettering is redrawn in original type (as at Crystal Mansions, open question 32). Bearings from June 2024 lane panoramas put the No. 10 plate and the north-west corner 4.5 m in front of the source edge, where the floors repeat every 3.1 m; on that plane the front runs from 1.3 m south of the source corner to 23.1 m north of it, about 24.4 m against the 22.18 m source edge. Until its footprint is settled (open question 44) the elevation is laid proportionally on the source edge, about 4.5 m behind its photographed line.',
  sources: [way('454254247'), search('Bougainvilla Apartments 10 Lorong 19 Geylang'), pano('NzRDDjZPo91yWpvV8BIq5A', 95, 20, 90), pano('C6WgL2wlMEl3mpMGCqZnIw', 105, 25, 100), pano('ZqOXZ8yOp3uJbHKrYGYtcQ', 110, 25, 100)],
  colours: { wall: white247, trim: beige247, frame: '#4a5654', glass: '#5d7a74', pier: white247, back: '#cfcdc6', floor: '#9e9a92' },
  bands: [[4.4, 4.75, .3, beige247]],
  windows: [
    ...floors247.flatMap(f => [[-.9, 1.5], [19.6, 22.0]].map(s => ({ u: at247(s), h: [f + 1.7, f + 3.2], panes: 4 }))),
    ...floors247.flatMap(f => [[2.6, 4.0], [16.2, 17.6]].map(s => ({ u: at247(s), h: [f + 1.7, f + 3.0], panes: 2, surround: true }))),
    ...floors247.flatMap(f => [[7.0, 9.3], [11.2, 13.5]].map(s => ({ u: at247(s), h: [f + 1.6, f + 3.1], panes: 3, out: .5 }))),
  ],
  blocks: [
    { name: 'beige central bay', u: at247([6.2, 14.4]), h: [4.75, 28.3], out: .22, depth: .44, colour: beige247 },
    ...floors247.filter((_, i) => i % 2).map(f => ({ name: 'balcony railing', u: at247([6.6, 14.0]), h: [f + 1.0, f + 1.9], out: .9, depth: .05, colour: '#e8e8e4' })),
    ...floors247.filter((_, i) => i % 2).map(f => ({ name: 'balcony slab', u: at247([6.6, 14.0]), h: [f + .9, f + 1.05], out: .7, depth: .5, colour: beige247 })),
    { name: 'gable frame', u: at247([6.6, 14.0]), h: [28.3, 29.0], out: .22, depth: .44, colour: beige247 },
    { name: 'gable apex', u: at247([8.4, 12.2]), h: [29.0, 30.4], out: .22, depth: .44, colour: beige247 },
    { name: 'gable crest', u: at247([9.7, 10.9]), h: [30.4, 31.0], out: .22, depth: .44, colour: beige247 },
    { name: 'parapet', u: [0, W247], h: [27.9, 28.3], out: .1, depth: .2, colour: beige247 },
    // The white railing with beige posts along the pavement, at its photographed position about 2.8 m in front of the
    // photographed front.
    ...[[.2, .8], [1.3, 1.45]].map(h => ({ name: 'white railing', u: [0, W247], h, out: 7.3, depth: .05, colour: '#f2f2ee' })),
    ...Array.from({ length: 8 }, (_, i) => .3 + i * 3.0).map(c => ({ name: 'beige railing post', u: [+c.toFixed(2), +(c + .45).toFixed(2)], h: [0, 1.7], out: 7.3, depth: .45, colour: beige247 })),
  ],
  // The lobby's raised lettering.
  boards: [{ u: at247([7.2, 10.2]), h: [3.5, 4.2], out: .05 }],
  piers: [[-1.34, -.7], [5.6, 6.2], [14.6, 15.2], [22.5, 23.1]].map(s => at247(s).map(v => Math.min(W247, Math.max(0, v)))),
  backFittings: [
    { name: 'lobby', u: at247([7.0, 10.3]), h: [.1, 3.3], colour: '#56605e', glow: .1 },
    { name: 'house plate', u: at247([10.55, 10.95]), h: [3.75, 4.15], out: .05, colour: '#2a2a2a' },
    { name: 'blue sign', u: at247([1.0, 2.2]), h: [3.0, 3.4], out: .05, colour: '#2a50a0' },
    { name: 'vent panel', u: at247([-1.0, 2.6]), h: [3.5, 4.2], colour: '#dcdcd6' },
    { name: 'car porch', u: at247([10.6, 22.8]), h: [.1, 4.2], colour: '#4c5050' },
  ],
};

export const lorong19 = [eminent, primero, no3, nanyangChee, no23, cheeHoeHong, leiZangSi, starlonTektron, sims146, hePing, kangHaPheng, bougainvilla];
// The shared lane-house helpers under this lane's names.
export const lorong19Frame = laneFrame, lorong19Layout = laneLayout, lorong19Upper = laneUpper, lorong19Reviews = laneReviews, lorong19Sides = laneSides;
