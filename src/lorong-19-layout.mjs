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

export const lorong19 = [eminent, primero, no3, nanyangChee, no23, cheeHoeHong];
// The shared lane-house helpers under this lane's names.
export const lorong19Frame = laneFrame, lorong19Layout = laneLayout, lorong19Upper = laneUpper, lorong19Reviews = laneReviews, lorong19Sides = laneSides;
