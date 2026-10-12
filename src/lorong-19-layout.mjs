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

export const lorong19 = [eminent];
// The shared lane-house helpers under this lane's names.
export const lorong19Frame = laneFrame, lorong19Layout = laneLayout, lorong19Upper = laneUpper, lorong19Reviews = laneReviews, lorong19Sides = laneSides;
