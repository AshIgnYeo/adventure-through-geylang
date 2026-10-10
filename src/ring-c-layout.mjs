// June 2024 exteriors on Lorong 10, south of Geylang Road, in the widened study area (open question 26).
// Unnamed unless a listing and signage agree. Rectified panoramas of this drive put the west-side façades
// about 2.4 m east of their source fronts and the east-side ones about 2.7 m east, so the shared shift is
// treated as the drive's position error and the models keep the source fronts. Each elevation is measured
// in its own photographed run `s` (metres along the rectified plane) and laid proportionally onto the
// source front by `photo: [s at u = 0, s at u = width]`, so a run measured from the far end is mirrored.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const P = {
  jnDM: 'jnDMFXXtQ-1SRBy-Nzcfpw', aWmw: 'aWmwhQSqJkPyQXV_2ii5HA', GkBe: 'GkBetGqamwBHBmDMY8mVGA', akP: '-akPX6cxdWBVVIMbMbeIsA',
  nbA2: 'nbA2prbOzOmLns7ZNAXG-Q', RxYL: 'RxYL5Vf8pSKwrySFv7snNw', oiWz: 'oiWzCMf99eMMsrmUT3xhuw',
};
const drive = 'Rectified June 2024 panoramas of this Lorong 10 drive put the west-side façades about 2.4 m east of their source fronts and the east-side ones about 2.7 m east, nearly the same shift on both sides, so it is treated as the drive\'s position error and the model keeps the source front.';
const blank = 'Boards and signs are blank and no lettering is reconstructed.';

/** Map a spec measured along the photographed run onto the frontage, scaled to the source width and clipped to it. */
export function placeOnFront(spec, width) {
  const [s0, s1] = spec.photo, f = s => (s - s0) / (s1 - s0) * width;
  const m = ([a, b]) => { const x = Math.min(Math.max(Math.min(f(a), f(b)), 0), width), y = Math.min(Math.max(Math.max(f(a), f(b)), 0), width); return y - x > .005 ? [x, y] : null; };
  const list = xs => xs?.flatMap(x => { const u = m(x.u); return u ? [{ ...x, u }] : []; });
  return {
    ...spec,
    windows: list(spec.windows), vents: list(spec.vents), blocks: list(spec.blocks), backFittings: list(spec.backFittings),
    piers: spec.piers?.map(m).filter(Boolean), boards: list(spec.boards),
  };
}

const grid = (cols, rows, extra = {}) => cols.flatMap(u => rows.map(h => ({ u, h, ...extra })));
const bars = (s0, s1, step, h, out, colour) => Array.from({ length: Math.floor((s1 - s0) / step) + 1 }, (_, i) => ({ name: 'railing bar', u: [s0 + i * step, s0 + i * step + .04], h, out, depth: .04, colour }));

// ---- West side, north to south ----

// The two-storey row behind the Geylang Road corner. Measured on a plane 2.4 m east of the source front, where
// three panoramas agree (window edges within 0.3 m); s runs south from the row's north end.
export const westRow = {
  id: 'l10-west-row', buildingIds: ['454438332'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 10 Geylang', shellInset: .1,
  name: 'Two-storey shophouse row, Lorong 10 west side (June 2024 exterior, occupants not identified)', address: 'Lorong 10 Geylang, west side, behind the Geylang Road corner',
  height: 8.15, ceiling: 3.75, fiveFootWay: 2.2, roof: { type: 'flat', colour: '#8d8a84' },
  evidence: 'A weathered cream two-storey row of three shops on the west side of Lorong 10, south of the back lane behind Geylang Road. June 2024 Street View shows six upper windows under louvred vents (two sliding windows each in the southern and middle units, two casements in the lower northern unit), a projecting roof slab, a stepped parapet that rises over the middle unit, and a zinc awning with a tiled edge over shops boarded FriendlyMart, a phone shop with a Shopee collection point and Poshz Infinity. The boards are shop signs over changing tenants and no listing was checked, so no name is given; ' + blank + ' Rectified from three panoramas, the row measures 15.25 m against the 16.90 m source front, with parapets at 8.15, 8.75 and 9.05 m and windows at 5.05-6.4 m; positions are scaled to the source width. ' + drive,
  sources: [way('454438332'), pano(P.aWmw, 270, 12, 100), pano(P.jnDM, 235, 15, 90), pano(P.GkBe, 300, 15, 70)],
  colours: { wall: '#e3ded1', trim: '#d6d0c2', frame: '#3b3833', glass: '#3c4447', pier: '#e3ded1', back: '#34302c', floor: '#a09a90' },
  photo: [15.9, .65],
  windows: [
    ...[[15.53, 13.92], [13.08, 11.42], [10.72, 9.0], [8.17, 6.38]].map(u => ({ u, h: [5.05, 6.4] })),
    ...[[5.53, 4.12], [3.0, 1.5]].map(u => ({ u, h: [5.0, 6.35], panes: 3 })),
  ],
  vents: [[15.5, 13.95], [13.05, 11.45], [10.7, 9.05], [8.15, 6.4], [5.5, 4.15], [2.95, 1.55]].map(u => ({ u, h: [6.55, 6.95] })),
  blocks: [
    { name: 'projecting roof slab', u: [16.67, .25], h: [7.5, 7.85], out: .45, depth: .9, colour: '#d6d0c2' },
    { name: 'southern parapet', u: [15.9, 11.0], h: [8.15, 8.75], out: -.1, depth: .2, colour: '#d2ccbe' },
    { name: 'raised middle parapet', u: [11.0, 5.6], h: [8.15, 9.05], out: -.1, depth: .2, colour: '#cfc9bb' },
    { name: 'zinc awning', u: [16.67, .25], h: [4.3, 4.42], out: 1.1, depth: 2.2, colour: '#8f8b85' },
    { name: 'tiled awning edge', u: [16.67, .25], h: [4.15, 4.42], out: 2.2, depth: .06, colour: '#b8674c' },
  ],
  piers: [[15.9, 15.6], [11.15, 10.85], [6.05, 5.75], [.95, .65]],
  backFittings: [
    { name: 'minimart front', u: [15.6, 11.15], h: [.1, 3.5], colour: '#3d3833', glow: .1 },
    { name: 'phone shop front', u: [10.85, 6.05], h: [.1, 3.5], colour: '#3a3531', glow: .1 },
    { name: 'shop front', u: [5.75, .95], h: [.1, 3.5], colour: '#34302c', glow: .1 },
    { name: 'blank blue shop board', u: [13.85, 10.95], h: [2.75, 3.2], out: .03, colour: '#2f5aa0' },
    { name: 'blank red shop board', u: [10.7, 8.0], h: [2.45, 3.2], out: .03, colour: '#c8432b' },
    { name: 'blank black shop board', u: [5.85, 2.9], h: [2.35, 2.85], out: .03, colour: '#1e1e1e' },
  ],
  review: { distance: 9, pitch: 18 },
};

// Two three-storey terrace houses with red-tiled canopies. Each source way steps back part-way along its
// front; the frames take the forward edges, where the photographed front and canopies are, and the set-back
// edges are plain walls. Measured on a plane 1.0 m east of the forward source fronts (s runs south from the
// boundary between the two ways), where the two nearest panoramas agree.
const houseNote = 'Two June 2024 panoramas agree on the upper façades about 1 m east of the forward source fronts, about 1.4 m behind them once the drive shift is removed; the model keeps the source front and lays the photographed front onto the forward edge, leaving the set-back edge a plain wall. Heights carry about ±0.5 m.';
const houseTop = [
  { name: 'red-tiled eaves', u: [9, -6], h: [9.1, 9.5], out: .4, depth: .8, colour: '#b35a3e' },
  { name: 'corrugated porch roof', u: [9, -6], h: [3.75, 3.85], out: 1.2, depth: 2.4, colour: '#9a958d' },
];
export const blueHouse = {
  id: 'l10-blue-house', buildingIds: ['1223401723'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 10 Geylang', shellInset: .15,
  name: 'Blue-grey terrace house, Lorong 10 west side (June 2024 exterior, occupant not identified)', address: 'Lorong 10 Geylang, west side (letterbox marked 6)',
  height: 9.1, ceiling: 4.0, fiveFootWay: 1.3, roof: { type: 'hip', ridge: 11.0, colour: '#a9533b' },
  evidence: 'The northern of two three-storey terrace houses between the shophouse row and the hotel block on the west side of Lorong 10. June 2024 Street View shows a light blue-grey front with two small upper windows under a red-tiled canopy, red-tiled eaves, a corrugated porch roof and a white front wall whose letterbox is marked 6, with a set-back grey bay to the north. No sign or listing identifies the occupant, so no name is given. ' + houseNote,
  sources: [way('1223401723'), pano(P.akP, 285, 10, 75), pano(P.GkBe, 245, 10, 75)],
  colours: { wall: '#c9d2d4', trim: '#bfc7c9', frame: '#3a3e40', glass: '#3e474b', pier: '#c9d2d4', back: '#4a4744', floor: '#a49e95' },
  photo: [1.0, -3.0],
  windows: [{ u: [.34, -.8], h: [5.1, 6.2] }, { u: [-2.0, -2.74], h: [5.0, 6.15], panes: 1 }],
  blocks: [
    ...houseTop,
    { name: 'red-tiled canopy', u: [.6, -3.0], h: [7.2, 7.9], out: .45, depth: .9, colour: '#b35a3e' },
    { name: 'white front wall', u: [0, -3.0], h: [0, 1.9], out: 3.0, depth: .2, colour: '#e6e4de' },
  ],
  piers: [[.92, .72], [-2.8, -2.98]],
  backFittings: [{ name: 'front door', u: [-.3, -1.3], h: [.1, 2.3], colour: '#4b3a2e' }],
  review: { distance: 10, pitch: 20 },
};

export const creamHouse = {
  id: 'l10-cream-house', buildingIds: ['1223401722'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 10 Geylang', shellInset: .15,
  name: 'Cream terrace house with bay windows, Lorong 10 west side (June 2024 exterior, occupant not identified)', address: 'Lorong 10 Geylang, west side',
  height: 9.1, ceiling: 4.4, fiveFootWay: 1.3, roof: { type: 'hip', ridge: 11.0, colour: '#a9533b' },
  evidence: 'The southern of the two terrace houses, beside the eight-storey hotel block. June 2024 Street View shows a cream front with a projecting two-storey bay of brown-framed glazing under a red-tiled canopy, a third-storey window band under red-tiled eaves, a set-back bay to the south, a corrugated porch roof and a brown slatted gate between brick posts. No sign or listing identifies the occupant, so no name is given. ' + houseNote,
  sources: [way('1223401722'), pano(P.akP, 285, 10, 75), pano(P.GkBe, 245, 10, 75)],
  colours: { wall: '#e7dfca', trim: '#ddd4bd', frame: '#5a4636', glass: '#3a4245', pier: '#e7dfca', back: '#4a4239', floor: '#a49e95' },
  photo: [5.0, 1.0],
  windows: [{ u: [4.56, 1.3], h: [5.2, 7.2], panes: 4 }, { u: [4.9, 2.5], h: [7.95, 8.85], panes: 3 }],
  blocks: [
    ...houseTop,
    { name: 'red-tiled canopy', u: [5.8, .6], h: [7.45, 7.95], out: .5, depth: 1.0, colour: '#b35a3e' },
    { name: 'brown slatted gate', u: [5.0, 1.6], h: [0, 1.9], out: 3.0, depth: .08, colour: '#6b4532' },
    { name: 'brick gatepost', u: [1.6, 1.0], h: [0, 2.0], out: 3.0, depth: .4, colour: '#e9e2cf' },
  ],
  piers: [[5.0, 4.8], [1.2, 1.0]],
  backFittings: [{ name: 'porch', u: [4.8, 1.2], h: [.1, 3.6], colour: '#3f3a34' }],
  review: { distance: 10, pitch: 20 },
};

// The eight-storey hotel block with black floor ledges, measured from the panorama square to it on a plane
// 1.0 m east of the source front (s runs north from the source's south corner), where four panoramas agree best.
const jhRows = [[5.45, 7.6], [8.7, 11.0], [12.1, 14.5], [15.7, 17.9], [19.3, 21.5], [22.8, 25.0]];
export const ledgeBlock = {
  id: 'jh-hotel', buildingIds: ['1223401721'], kind: 'jh-hotel', frontEdge: 0, reviewRoad: 'Lorong 10 Geylang', shellInset: .1,
  name: 'JH Hotel 嘉華酒店 (June 2024 exterior)', address: 'Lorong 10 Geylang, west side',
  height: 26.0, ceiling: 4.2, fiveFootWay: 5.0, roof: { type: 'flat', colour: '#8f8d88' },
  evidence: 'A cream eight-storey hotel block on the west side of Lorong 10 between the terrace houses and the yellow block. June 2024 Street View shows two columns of white-framed bay windows on seven storeys, black ledges projecting at every floor, a deep black roof slab, a set-back attic storey over the southern half with one window column, and a car porch under a blue board reading 嘉華酒店 JH HOTEL with an LED price panel. Google Maps lists JH Hotel, a hotel taking bookings in October 2026, with its point inside this source way, so the board names it; its lettering is redrawn in original type and the LED panel is blank. The façade measures 13.3 m across the ledges against the 14.81 m source front and is scaled to it; the main roof is about 26 m and the attic about 29 m, with floors about 3.5 m apart. Four panoramas fit best on a plane 1.0 m east of the source front, about 1.4 m behind it once the drive\'s 2.4 m shift on this side is removed; the model keeps the source front.',
  sources: ['https://www.google.com/maps/search/?api=1&query=JH+Hotel+Lorong+10+Geylang', way('1223401721'), pano(P.nbA2, 265, 20, 110), pano(P.akP, 265, 20, 110), pano(P.RxYL, 265, 25, 110)],
  colours: { wall: '#ebe5d4', trim: '#d8d1bd', frame: '#efefea', glass: '#4a5560', pier: '#ebe5d4', back: '#2c2a28', floor: '#9e988e' },
  photo: [1.6, 14.9],
  bands: [[25.3, 26.0, 1.0, '#2e2e30']],
  windows: [
    ...grid([[3.75, 6.4], [10.0, 12.8]], jhRows, { panes: 3, out: .3 }),
    { u: [3.75, 6.4], h: [26.5, 28.2], panes: 3, out: -.78 },
  ],
  blocks: [
    ...[[21.55, 21.9], [17.95, 18.3], [14.55, 14.9], [11.1, 11.45], [7.65, 8.0]].map(h => ({ name: 'black floor ledge', u: [1.6, 14.9], h, out: .4, depth: .8, colour: '#2e2e30' })),
    ...grid([[3.6, 6.55], [9.85, 12.95]], jhRows.map(([b]) => [b - .3, b - .05])).map(b => ({ ...b, name: 'window ledge', out: .35, depth: .7, colour: '#2e2e30' })),
    { name: 'attic storey', u: [1.7, 8.5], h: [26.0, 28.6], out: -3.9, depth: 6.2, colour: '#ebe5d4' },
    { name: 'attic roof slab', u: [1.7, 8.6], h: [28.6, 29.3], out: -3.6, depth: 6.8, colour: '#2e2e30' },
    { name: 'hotel board backing', u: [5.25, 11.2], h: [4.3, 5.3], out: .1, depth: .08, colour: '#1f3a8c' },
    { name: 'blank LED panel', u: [5.25, 7.45], h: [3.95, 4.25], out: .1, depth: .06, colour: '#1b1b1b' },
  ],
  boards: [{ u: [5.3, 11.15], h: [4.35, 5.25], out: .15 }],
  piers: [[1.6, 2.0], [14.5, 14.9]],
  backFittings: [
    { name: 'lobby entrance', u: [5.6, 7.4], h: [.1, 3.0], colour: '#5a5a52', glow: .15 },
    { name: 'car porch', u: [7.6, 14.4], h: [.1, 3.6], colour: '#262422' },
  ],
  review: { distance: 12, pitch: 28 },
};

// The yellow seven-storey block south of it. Its north-east corner triangulates from three panoramas to
// (27.4, 174.5) in the drive's frame; measured on a plane 1.2 m behind the source front, s runs north from
// the source's south corner.
export const yellowBlock = {
  id: 'l10-yellow-block', buildingIds: ['454438331'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 10 Geylang', shellInset: .25,
  name: 'Yellow seven-storey hotel block, Lorong 10 west side (June 2024 exterior, occupant not identified)', address: 'Lorong 10 Geylang, west side',
  height: 23.4, ceiling: 5.0, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'A pale yellow seven-storey block on source way 454438331 (tagged six levels), south of the ledged hotel block. June 2024 Street View shows five columns of white-framed windows on six storeys above a tall glazed ground floor, grey hoods on the northern column, a grey strip at the southern corner, a dark grey north flank, a raised planter terrace with a glass railing, and blue lettering reading ibis budget HOTEL AMETRINE with a blue corner sign. The signage is recorded here but no listing was checked, so no name is given; ' + blank + ' Read square-on, the façade measures 15.4 m against the 16.64 m source front and is scaled to it; the roof is 23.4 m and the window rows are about 3.1 m apart. Three panoramas place its north-east corner about 1.2 m behind the source front, about 3.6 m behind it once the drive\'s 2.4 m shift on this side is removed, roughly on the line of the ledged hotel block\'s source front (its exposed grey flank shows it standing proud of that block); the model keeps the source front.',
  sources: [way('454438331'), pano(P.oiWz, 290, 15, 80), pano(P.RxYL, 260, 15, 80), pano(P.nbA2, 225, 15, 80)],
  colours: { wall: '#e5d290', trim: '#d8c583', frame: '#ecebe6', glass: '#5b6e7b', pier: '#e5d290', back: '#3a3a38', floor: '#a49e95' },
  photo: [.7, 16.1],
  bands: [[23.05, 23.4, .3]],
  windows: grid([[1.83, 3.55], [4.75, 6.5], [7.8, 9.5], [10.68, 12.38], [13.7, 15.43]], [[6.2, 8.6], [9.38, 11.75], [12.55, 14.88], [15.63, 17.93], [18.8, 21.05]]),
  blocks: [
    { name: 'grey corner strip', u: [.7, 1.45], h: [0, 23.4], out: .02, depth: .06, colour: '#6e7377' },
    ...[8.6, 11.75, 14.88, 17.93, 21.05].map(t => ({ name: 'grey window hood', u: [13.55, 15.58], h: [t + .05, t + .25], out: .12, depth: .24, colour: '#6e7377' })),
    { name: 'grey canopy band', u: [5.6, 15.6], h: [5.95, 6.1], out: .3, depth: .6, colour: '#6e7377' },
    { name: 'blank corner sign', u: [15.95, 16.1], h: [5.0, 6.5], out: .7, depth: 1.2, colour: '#1f3f9a' },
    { name: 'raised planter', u: [.9, 12.8], h: [0, 1.1], out: 2.0, depth: .3, colour: '#e3d8b0' },
    { name: 'glass railing', u: [.9, 12.8], h: [1.1, 2.1], out: 2.0, depth: .04, colour: '#9fb0b3' },
  ],
  piers: [[.75, 1.1], [15.7, 16.1]],
  backFittings: [{ name: 'glazed lobby', u: [1.5, 15.5], h: [.1, 4.6], colour: '#4a5a62', glow: .12 }],
  // The block lies beyond the study's southern margin; the review looks at it from up the lane.
  review: { at: [20, 10], pitch: 25 },
};

// ---- East side ----

// One source way under three hotel blocks: a taupe block with a glazed stair tower at the north, a yellow
// and grey block in the middle and a white block with a pediment at the south. All three line up across four
// panoramas on a plane 2.7 m behind the source front; s runs south from the source's north corner. The
// tallest parts rise above the shell as blocks inside the outline.
const ibisRows = [7.06, 10.56, 14.0, 17.6, 20.93, 24.43];
const jixinRows = [[26.0, 27.3], [22.8, 24.1], [19.5, 20.8], [16.1, 17.6], [12.8, 14.4], [9.5, 11.1], [6.1, 7.7]];
const shell = (u, h, colour, name) => ({ name, u, h, out: -.03 - 4.9, depth: 9.8, colour });
const face = (u, h, colour, name) => ({ name, u, h, out: .005, depth: .02, colour });
export const hotelRow = {
  id: 'l10-hotel-row', buildingIds: ['454438326'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 10 Geylang', shellInset: .15,
  name: 'Three hotel blocks, Lorong 10 east side (June 2024 exterior, occupants not identified)', address: 'Lorong 10 Geylang, east side',
  height: 20.4, ceiling: 4.0, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#8f8d88' },
  evidence: 'Source way 454438326 runs 51 m along the east side of Lorong 10 under three hotel blocks behind forecourts. June 2024 Street View shows, from the north: a taupe six-storey block with paired small windows between yellow recessed slots and a green fascia board reading D\'Nova Hotel, beside a taupe stair tower with a tall arched glazed strip and a round window; a seven-storey block of pale yellow, cream and grey bands with framed windows, a louvred strip, a car porch, a stair tower over the roof and a blue sign reading ibis budget SAPPHIRE over the plate 3; and a white eight-storey block with yellow ledges, a stepped curtain wall and a pediment over a blue board reading 嘉鑫酒店 JXIN HOTEL. The signs are recorded here but no listing was checked, so no name is given; ' + blank + ' Read on the shared plane, the blocks run 0.4-13.3, 13.3-38.5 and 38.5-51.8 m from the source\'s north corner, 51.4 m in all against the 51.10 m source front, so positions are scaled to it; the roofs are 20.4 m (21.9 m at the stair tower), about 26.3 m with a 28.8 m stair tower, and 29.1 m with the pediment to 32.3 m. ' + drive,
  sources: [way('454438326'), pano(P.GkBe, 60, 20, 100), pano(P.akP, 80, 20, 110), pano(P.nbA2, 80, 20, 110), pano(P.aWmw, 80, 20, 110)],
  colours: { wall: '#ecdba2', trim: '#ddd0a6', frame: '#e9e8e2', glass: '#4f5e68', pier: '#ddd0a6', back: '#2e2c2a', floor: '#a39d93' },
  photo: [.43, 51.8],
  windows: [
    // Taupe block: paired small windows, then the stair tower's arched strip and round window.
    ...grid([[1.91, 2.43], [2.91, 3.49], [6.09, 6.63], [7.14, 7.71]], [6.3, 9.45, 12.6, 15.7, 18.5].map(c => [c - .3, c + .3]), { panes: 1, out: .03 }),
    { u: [10.6, 13.0], h: [3.4, 17.9], panes: 3, arched: true, out: .03 },
    { u: [11.4, 12.2], h: [19.9, 20.6], panes: 1, out: .03 },
    // Yellow-and-grey block: framed windows in four columns and small square windows between them.
    ...grid([[13.83, 15.67], [19.17, 21.07], [30.67, 32.33], [36.33, 38.17]], ibisRows.map(c => [c - .85, c + .85]), { surround: true, out: .03 }),
    ...grid([[16.83, 17.5], [23.17, 23.83], [29.17, 29.83], [34.67, 35.17]], ibisRows.map(c => [c - .1, c + .45]), { panes: 1, out: .03 }),
    // White block: a window column, the stepped curtain wall and a slit, with paired windows on the top floors.
    ...grid([[39.3, 40.9]], jixinRows, { out: .03 }),
    ...grid([[42.7, 44.2], [47.5, 49.0]], jixinRows.slice(0, 2), { out: .03 }),
    ...grid([[45.1, 45.6], [45.8, 46.3]], jixinRows.slice(0, 2), { panes: 1, out: .03 }),
    ...grid([[47.5, 49.0]], jixinRows.slice(4), { out: .03 }),
    { u: [42.5, 49.2], h: [15.5, 21.3], panes: 8, out: .03 },
    { u: [42.5, 46.4], h: [6.1, 15.3], panes: 5, out: .03 },
    { u: [51.0, 51.4], h: [13.0, 27.3], panes: 1, out: .03 },
  ],
  blocks: [
    face([.43, 9.0], [4.0, 20.4], '#a8998a', 'taupe wall'),
    face([9.0, 10.1], [4.0, 20.4], '#e3c770', 'yellow recess'),
    ...[[.7, 1.6], [4.1, 4.9], [8.0, 8.9]].map(u => ({ name: 'yellow slot', u, h: [4.3, 18.8], out: .02, depth: .02, colour: '#e3c770' })),
    face([10.1, 13.3], [4.0, 20.4], '#a8998a', 'taupe stair tower'),
    { name: 'stair tower base', u: [10.1, 13.3], h: [0, 4.0], out: -1.5, depth: 3.0, colour: '#a8998a' },
    { name: 'white service door', u: [10.4, 13.0], h: [.05, 3.0], out: .02, depth: .03, colour: '#eeeeea' },
    { name: 'blank green fascia', u: [1.0, 9.1], h: [3.4, 4.2], out: .12, depth: .1, colour: '#2e6b3a' },
    shell([10.1, 13.3], [20.4, 21.9], '#a8998a', 'stair tower top'),
    // Yellow-and-grey block.
    face([13.3, 38.5], [4.0, 4.9], '#6f7478', 'grey ground band'),
    ...[[13.3, 22.2], [29.6, 38.5]].flatMap(u => [face(u, [8.6, 12.3], '#8a8f93', 'grey band'), face(u, [19.2, 20.4], '#8a8f93', 'grey band')]),
    face([24.4, 25.5], [4.9, 20.4], '#6b5a48', 'louvred strip'),
    shell([13.3, 22.2], [20.4, 26.3], '#ecdba2', 'north wing'), shell([22.2, 29.6], [20.4, 25.3], '#ecdba2', 'middle bay'), shell([29.6, 38.5], [20.4, 26.3], '#ecdba2', 'south wing'),
    ...[[13.3, 22.2], [29.6, 38.5]].flatMap(u => [{ name: 'grey band', u, h: [20.4, 22.7], out: .005, depth: .02, colour: '#8a8f93' }, { name: 'grey roof cap', u, h: [25.9, 26.3], out: .05, depth: .2, colour: '#7d8287' }]),
    { name: 'louvred strip', u: [24.4, 25.5], h: [20.4, 23.0], out: .005, depth: .02, colour: '#6b5a48' },
    { name: 'stair tower over the roof', u: [25.3, 28.0], h: [25.3, 28.8], out: -4.5, depth: 5.0, colour: '#d9cc9c' },
    { name: 'blank hotel sign', u: [26.0, 28.0], h: [5.6, 7.8], out: .1, depth: .08, colour: '#1f3f9a' },
    { name: 'blank name plate', u: [26.3, 27.7], h: [4.95, 5.45], out: .08, depth: .04, colour: '#f2f2ee' },
    // White block.
    face([38.5, 51.8], [4.0, 20.4], '#eeeae0', 'white wall'),
    shell([38.5, 51.7], [20.4, 29.1], '#eeeae0', 'white block upper floors'),
    { name: 'yellow coping', u: [38.5, 51.8], h: [28.8, 29.15], out: .1, depth: .2, colour: '#c9a640' },
    ...[[[40.5, 49.5], [29.1, 30.2]], [[42.0, 48.0], [30.2, 31.3]], [[43.6, 46.4], [31.3, 32.3]]].map(([u, h]) => ({ name: 'stepped pediment', u, h, out: -.25, depth: .5, colour: '#eeeae0' })),
    ...jixinRows.map(([b]) => ({ name: 'yellow ledge', u: [39.1, 41.1], h: [b - .35, b - .1], out: .25, depth: .5, colour: '#c9a640' })),
    ...jixinRows.slice(0, 2).map(([b]) => ({ name: 'yellow ledge', u: [42.5, 44.4], h: [b - .35, b - .1], out: .25, depth: .5, colour: '#c9a640' })),
    { name: 'yellow ledge', u: [46.4, 49.4], h: [14.9, 15.25], out: .25, depth: .5, colour: '#c9a640' },
    { name: 'blank hotel board', u: [40.3, 47.7], h: [5.1, 6.1], out: .1, depth: .08, colour: '#1f3a8c' },
    { name: 'blank shop board', u: [38.6, 42.2], h: [3.3, 3.95], out: .05, depth: .05, colour: '#1d1d1d' },
  ],
  piers: [[.6, 1.0], [13.1, 13.6], [17.7, 18.1], [22.0, 22.4], [29.4, 29.8], [38.3, 38.7], [51.3, 51.75]],
  backFittings: [
    { name: 'café front', u: [1.0, 9.0], h: [.1, 3.2], colour: '#3c3a36', glow: .1 },
    { name: 'car porch', u: [13.6, 22.0], h: [.1, 3.8], colour: '#2a2826' },
    { name: 'glazed lobby', u: [30.0, 34.5], h: [.1, 3.8], colour: '#55606a', glow: .12 },
    { name: 'shop front', u: [38.8, 42.5], h: [.1, 3.2], colour: '#2e2c2a', glow: .08 },
    { name: 'glazed lobby', u: [43.0, 46.5], h: [.1, 3.6], colour: '#4a4640', glow: .12 },
  ],
  review: { distance: 9, pitch: 30 },
};

// The two-storey association hall south of the hotels, behind a railing. Its upper corners triangulate from two
// panoramas to a plane 3.3 m behind the source front, about 0.6 m behind it once the drive shift is removed;
// s runs south from the source's north corner.
export const no11 = {
  id: 'nanyang-fan-clan', buildingIds: ['454438323'], kind: 'nanyang-fan-clan', frontEdge: 8, reviewRoad: 'Lorong 10 Geylang', shellInset: .25,
  name: 'Nanyang Fan Clan General Association 南洋范氏總會 (June 2024 exterior)', address: '11 Lorong 10 Geylang',
  height: 9.0, ceiling: 3.9, fiveFootWay: 2.5, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'A beige two-storey hall with a long ribbon window, two small windows and a louvred vent above an open ground-floor hall with brown doors, behind a black railing on a white planter wall whose gatepost carries the plate NO. 11. June 2024 Street View shows large raised lettering on the upper wall reading 南洋范氏總會 NANYANG FAN CLAN GENERAL ASSOCIATION and 旺源樓; Google Maps lists Nanyang Fan Clan General Assn at 11 Lor 10 Geylang, Singapore 399044, with its point inside this source way, so the hall is named; the raised lettering is redrawn in original type. Rectified from two panoramas, the façade measures 13.06 m against the 13.44 m source front and is scaled to it; the parapet is 9.0 m and the ribbon window 5.8-7.0 m. Its upper corners triangulate from the two panoramas 3.3 m behind the source front, about 0.6 m behind it once the drive\'s 2.7 m shift on this side is removed; the model keeps the source front.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Nanyang+Fan+Clan+General+Association+11+Lorong+10+Geylang', way('454438323'), pano(P.RxYL, 80, 20, 110), pano(P.oiWz, 70, 20, 110)],
  colours: { wall: '#d8c9a2', trim: '#cdbd94', frame: '#3a3a36', glass: '#2f3538', pier: '#d8c9a2', back: '#3a3530', floor: '#a49e95' },
  photo: [.84, 13.9],
  bands: [[8.82, 9.0, .2], [3.9, 4.15, .1]],
  windows: [{ u: [3.9, 13.55], h: [5.8, 7.0], panes: 10 }, { u: [1.0, 1.6], h: [5.8, 7.0], panes: 1 }, { u: [3.07, 3.67], h: [5.8, 7.0], panes: 1 }],
  vents: [{ u: [1.8, 2.9], h: [6.55, 6.9] }],
  blocks: [
    { name: 'planter wall', u: [1.0, 8.8], h: [0, 1.0], out: 1.5, depth: .3, colour: '#e8e6df' },
    ...bars(1.0, 8.7, .25, [1.0, 2.85], 1.5, '#26282a'),
    { name: 'railing top rail', u: [1.0, 8.8], h: [2.8, 2.9], out: 1.5, depth: .05, colour: '#26282a' },
    { name: 'gatepost', u: [8.7, 8.95], h: [0, 3.0], out: 1.5, depth: .25, colour: '#e8e6df' },
  ],
  // Raised lettering on the upper wall, read on a rectified June 2024 frame and scaled to this elevation.
  boards: [{ u: [2.6, 11.8], h: [7.72, 8.54], out: .04 }, { u: [3.0, 11.4], h: [7.13, 7.5], out: .04 }, { u: [5.6, 9.0], h: [4.7, 5.32], out: .04 }],
  piers: [[.92, 1.25], [13.55, 13.9]],
  backFittings: [
    { name: 'brown doors', u: [1.9, 3.3], h: [.1, 2.6], colour: '#6a3f2e' },
    { name: 'open hall', u: [3.5, 13.4], h: [.1, 3.6], colour: '#2e2a26', glow: .05 },
  ],
  // The hall lies beyond the study's southern margin; the review looks at it from up the lane.
  review: { at: [-3, 6], pitch: 15 },
};

export const ringC = [westRow, blueHouse, creamHouse, ledgeBlock, yellowBlock, hotelRow, no11];
export const ringCFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const ringCLayout = (place, width) => simpleHouseLayout(width, placeOnFront(place, width));
/** One review start per place, facing the frontage centre; places beyond the study margin are viewed from up the lane. */
export const ringCReviews = (place, frame) => {
  const { distance = 10, at = [frame.width / 2, distance], pitch = 20 } = place.review ?? {};
  const p = frame.point(...at), t = frame.point(frame.width / 2, 0);
  return [{ id: place.id, p, pitch, yaw: Math.atan2(p[0] - t[0], p[1] - t[1]) * 180 / Math.PI }];
};
