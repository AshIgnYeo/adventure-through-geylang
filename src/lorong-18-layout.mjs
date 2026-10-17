// Lorong 18 between Geylang Road and Westerhout Road (open question 71), built one building at a time as Lorong 21 was:
// the Geylang Road block back to Lorong 16 first, then south down the west side, then north up the east side. Each
// elevation is read on the plane where the panoramas agree, and laid on its source edge, which is kept. Named only where
// a listing and a photographed sign agree. See docs/lorong-18-brief.md.
import { pano, way, search, lay, sliceSpec, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

// A house's elevation, measured in photographed metres from its south party wall, laid proportionally across its stepped
// front: the source outline's lane end is two parallel edges, a projecting one and a recessed one about 2 m apart. Each
// edge takes its share of the elevation, scaled to the two edges' combined width. The front edge carries the five-foot
// way and the review start; the other is a side face, its back-wall fittings and piers drawn on its wall.
const scaleSpan = k => x => ({ ...x, u: [+(x.u[0] * k).toFixed(3), +(x.u[1] * k).toFixed(3)] });
function across(elev, Wp, parts, front) {
  const total = parts.reduce((s, p) => s + p.w, 0), k = total / Wp, sc = scaleSpan(k);
  const scaled = { windows: elev.windows?.map(sc), vents: elev.vents?.map(sc), blocks: elev.blocks?.map(sc), backFittings: elev.backFittings?.map(sc), piers: elev.piers?.map(([a, b]) => [+(a * k).toFixed(3), +(b * k).toFixed(3)]) };
  let t = 0;
  // Each edge keeps a hair's margin of its width; windows cut at a slice are inset by their sills, and back-wall
  // fittings by 0.12 m, since the source party walls and steps are not quite square to the front.
  const inset = (xs, w, m) => xs?.flatMap(x => { const l = Math.max(x.u[0], m), r = Math.min(x.u[1], w - m); return r - l > .25 ? [{ ...x, u: [+l.toFixed(3), +r.toFixed(3)] }] : []; });
  const cut = parts.map(p => {
    const w = p.w - .002, piece = sliceSpec(scaled, t, t + w); t += p.w;
    const behind = (piece.blocks ?? []).filter(b => (b.out ?? 0) + (b.depth ?? .1) / 2 <= 0), proud = (piece.blocks ?? []).filter(b => !behind.includes(b));
    return { edge: p.edge, ...piece, windows: inset(piece.windows, w, .09), backFittings: inset(piece.backFittings, w, .12), blocks: [...proud, ...inset(behind, w, .15)] };
  });
  const main = cut.find(c => c.edge === front);
  const sides = cut.filter(c => c.edge !== front).map(c => ({
    edge: c.edge, windows: c.windows, vents: c.vents,
    blocks: [...(c.blocks ?? []), ...(c.backFittings ?? []).map(f => ({ ...f, out: .02, depth: .04 })), ...(c.piers ?? []).map(u => ({ name: 'pier', u, h: [0, elev.ceiling ?? 3], out: .15, depth: .3, colour: elev.pierColour ?? '#e8e6e0' }))],
  }));
  return { frontEdge: front, windows: main.windows, vents: main.vents, blocks: main.blocks, backFittings: main.backFittings, piers: main.piers, sides };
}

// ---------------------------------------------------------------------------------------------
// 1. Way 541941365, Le Regal, 340 Geylang Road: the Lorong 18 west corner, back to Lorong 16. A white five-storey
// condominium over a shopping arcade, its upper floors in bands of grey slab edges and glass balcony rails, crossed by
// three perforated screens striped in pink and yellow. Its Geylang Road front (edge 9, u west from the lane corner) is
// read where four June 2024 Geylang Road panoramas agree, on a plane about 0.8 m behind the source edge; on that plane
// the front runs the source edge's length, so it is laid on it at its photographed positions. Its lane face (edge 7, u
// north from the back lane) and Lorong 16 face (edge 11, u south from Geylang Road) stand behind street trees, and their
// fittings follow the front's floors, placed by estimate where the trees hide them. The satellite shows the tower as an
// L of wings, along Geylang Road and down the lane, round a pool deck over the podium, so the wings are raised over the
// podium as one upper volume.
const W541 = 60.105, white541 = '#e8e7e2', grey541 = '#7a7d80', rail541 = '#c8d4d2', glaze541 = '#8a9a9c';
// The slab edges, and the floors between them: the ground floor's five-foot way under the first, four storeys above.
const slabs541 = [[3.5, 4.4], [7.1, 7.8], [10.5, 11.1], [14.0, 14.6], [17.3, 17.9]];
const floors541 = slabs541.slice(0, -1).map(([, t], i) => [t, slabs541[i + 1][0]]);
// Balcony bays between the white piers and the screens, with the screens' spans and the heights they cover.
const screens541 = [{ u: [2.25, 10.25], h: [12.3, 19.3] }, { u: [23.0, 27.25], h: [3.75, 19.3] }, { u: [40.1, 50.25], h: [7.0, 19.3] }];
const bays541 = [[.3, 2.1], [2.4, 10.1], [11.6, 16.6], [17.4, 22.8], [27.45, 33.1], [33.9, 39.9], [40.3, 50.0], [50.45, 55.7], [56.5, 59.8]];
const behindScreen = (u, h) => screens541.some(s => u[0] >= s.u[0] - .3 && u[1] <= s.u[1] + .3 && h[1] > s.h[0] + .2);
// One floor's balcony fittings across a face's bays: sliding doors on the wall behind (`back` metres in), a glass rail
// along the balcony front.
const balconies541 = (bays, skip = () => false, back = 0) => floors541.flatMap(([b, t]) => bays.filter(u => !skip(u, [b, t])).map(u => ({
  window: { u: [u[0] + .3, u[1] - .3], h: [+(b + .2).toFixed(2), +(b + 2.3).toFixed(2)], panes: Math.max(2, Math.round((u[1] - u[0]) / 1.3)), out: -back },
  rail: { name: 'glass balcony rail', u, h: [+(b + .15).toFixed(2), +(b + 1.0).toFixed(2)], out: back ? -.05 : .25, depth: .04, colour: rail541 },
})));
// The slab edges and parapet: on the front, balcony slabs `back` metres deep from the wall to the front line.
const slabBands541 = (w, back = 0) => [
  ...slabs541.map(([b, t]) => ({ name: 'grey slab edge', u: [0, w], h: [b, t], out: back ? -back / 2 : .2, depth: back || .4, colour: grey541 })),
  ...slabs541.slice(1).map(([, t]) => ({ name: 'slab edge lip', u: [0, w], h: [t - .08, t], out: back ? .02 : .42, depth: .04, colour: white541 })),
  { name: 'parapet', u: [0, w], h: [17.9, 19.0], out: back ? -back / 2 : .1, depth: back || .2, colour: white541 },
];
// On Geylang Road the balconies are about 1.5 m deep: the screens and balcony fronts on the front line, the flats' walls
// behind them.
const deep541 = 1.5;
const front541 = balconies541(bays541, behindScreen, deep541);
const leRegalNote = ' Google Maps lists Le Regal, a condominium complex, at 340 Geylang Road, Singapore 389365, with its point inside this way, and the June 2024 photographs show its name lettered LE REGAL under a leaf mark on the lobby wall in the five-foot way on Geylang Road, so the block is named after it and the lettering is redrawn in original type. The arcade\'s shops (mobile-phone shops, salons, a money changer, a print shop) have their boards drawn blank; no claim is made about any of them. Four June 2024 Geylang Road panoramas (J2Pm..., J9oC..., Cb5e..., vE6Q...) agree on the screens and balcony fronts on a plane about 0.8 m behind the source edge, where the front runs the edge\'s length, so the elevation is laid on the source edge at its photographed positions. Heights were read on that plane: the five-foot way to 3.5 m, slab edges at 3.5-4.4, 7.1-7.8, 10.5-11.1, 14.0-14.6 and 17.3-17.9 m, the parapet to about 19.0 m and the screens to 19.3 m. The lane and Lorong 16 faces stand behind street trees; their fittings follow the front\'s floors and are placed by estimate where the trees hide them. The registered satellite shows the tower as two wings, along Geylang Road and down the lane, round a pool deck on the podium; it leans about 7 m in that image, so the wings\' depths (about 14 m) are estimates, and the podium\'s height is taken as the first-floor slab\'s.';
export const leRegal = {
  id: 'le-regal', buildingIds: ['541941365'], kind: 'le-regal', frontEdge: 9, reviewRoad: 'Geylang Road', review: { distance: 9, pitch: 26 },
  name: 'Le Regal (June 2024 exterior)', address: '340 Geylang Road (the Lorong 18 west corner, back to Lorong 16)',
  height: 4.4, ceiling: 3.5, fiveFootWay: 2.6, roof: { type: 'flat', colour: '#9b9a95' },
  evidence: 'June 2024 Street View shows the Geylang Road block from Lorong 16 to Lorong 18 as one white five-storey condominium over a shopping arcade: its upper floors in bands of grey slab edges and glass balcony rails over sliding doors, with bamboo blinds and aluminium louvres in some bays, crossed by three perforated grey screens striped in pink and yellow, one over the top two floors near the lane corner, one full height and one from the overhead bridge\'s stair, which lands in front of it, to the roof. The ground floor is a five-foot way of shops under grey awnings behind white columns, with the residential lobby near the bridge stair. At the lane corner the number 340 stands over a car-park rate board, and a pitched roof rises over the corner; on the lane a car-park entrance opens at the back lane, and on Lorong 16 a beauty spa and an adult toy store have boards.' + leRegalNote,
  sources: [way('541941365'), search('Le Regal 340 Geylang Road'), pano('J9oClFBNKf4zlsawptcpqw', 185, 15, 100), pano('J2PmGcgYvnnTXVVX-C22jQ', 185, 15, 100), pano('6Np0nyCkpOY2q-_fIA23aA', 147, 0, 25), pano('Qy81lI2vV4_AzDy0f_u7Mw', 205, 10, 80), pano('oew0MziHDkoQJ37-k6pxAw', 240, 10, 80), pano('Y8N4oE6LyYX3XOrlOgvz0A', 100, 5, 80)],
  colours: { wall: white541, trim: '#d8d7d2', frame: '#c8cacb', glass: glaze541, pier: '#efeee9', back: '#3a3c3e', floor: '#a8a296' },
  windows: front541.map(f => f.window),
  blocks: [
    ...slabBands541(W541, deep541),
    ...front541.map(f => f.rail),
    ...[[11.0, 11.4], [16.8, 17.2], [33.3, 33.7], [55.9, 56.3]].map(u => ({ name: 'white pier', u, h: [4.4, 17.9], out: -deep541 / 2, depth: deep541, colour: '#efeee9' })),
    // The screens: a perforated grey panel standing proud of the balconies (their stripes are drawn on the boards).
    ...screens541.map(s => ({ name: 'perforated screen', u: s.u, h: s.h, out: .2, depth: .06, colour: '#b9bbbc' })),
    { name: 'bamboo blind', u: [17.6, 22.6], h: [12.0, 13.75], out: -.12, depth: .04, colour: '#9a7a52' },
    { name: 'bamboo blind', u: [27.6, 30.6], h: [9.25, 10.4], out: -.12, depth: .04, colour: '#9a7a52' },
    { name: 'aluminium louvres', u: [33.9, 39.9], h: [4.6, 6.9], out: -.12, depth: .04, colour: '#b8bcbc' },
    // The shops under the first floor: grey awnings and blank boards, with the lobby by the bridge stair.
    ...[[6.3, 10.8], [11.7, 16.6], [17.5, 22.7], [27.7, 33.0], [50.9, 55.6], [56.5, 59.3]].map(u => ({ name: 'grey striped awning', u, h: [2.9, 3.4], out: .5, depth: 1.0, colour: '#6e6e6a' })),
    { name: 'blank shop board', u: [30.7, 32.8], h: [3.55, 4.35], out: .04, depth: .04, colour: '#efe2d0' },
  ],
  piers: [[.2, .7], [5.6, 6.1], [11.0, 11.5], [16.8, 17.3], [22.9, 23.4], [27.0, 27.5], [33.2, 33.7], [39.9, 40.4], [45.2, 45.7], [50.2, 50.7], [55.8, 56.3], [59.5, 60.0]],
  backFittings: [
    ...[[.8, 5.5], [6.2, 10.9], [11.6, 16.7], [17.4, 22.8], [23.5, 26.9], [27.6, 33.1], [33.8, 39.8], [40.5, 45.1], [50.8, 55.7], [56.4, 59.4]].map(u => ({ name: 'shopfront', u, h: [.1, 2.7], colour: '#3e4a4c', glow: .08 })),
    ...[[.8, 5.5], [6.2, 10.9], [17.4, 22.8], [33.8, 39.8], [50.8, 55.7]].map(u => ({ name: 'blank shop board', u, h: [2.75, 3.2], colour: '#2a3a8a' })),
    { name: 'lobby wall', u: [45.8, 48.6], h: [.1, 3.4], colour: '#8e9092' },
    { name: 'lobby entrance', u: [48.6, 50.1], h: [.1, 2.6], colour: '#2e3436', glow: .1 },
  ],
  // The three screens' stripes, and the LE REGAL lettering on the lobby wall.
  boards: [...screens541.map(s => ({ u: s.u, h: s.h, out: .24 })), { u: [45.95, 48.45], h: [1.9, 2.75], out: -2.55 }],
  upper: [
    // The two wings over the podium: along Geylang Road about 14 m deep, behind the balconies, and down the lane to the
    // back lane.
    { name: 'tower wings', outline: [[-4.077, -4.182], [-1.462, -1.5], [61.785, -1.5], [63.651, -3.166], [64.378, -14], [12, -14], [12, -29.106], [-.975, -29.173], [-2.432, -27.795]], from: 4.4, to: 19.0, colour: white541, roof: '#9b9a95' },
    // The pitched roof over the corner, seen from the lane.
    { name: 'corner roof', outline: [[-4.077, -4.182], [-1.462, -1.5], [2.5, -1.5], [2.5, -10.5], [-3.637, -10.5]], from: 19.0, to: 19.05, ridge: 20.7, colour: white541, roof: '#7e8284' },
  ],
  sides: [{
    edge: 8, // the splay at the lane corner, u from the lane towards Geylang Road: the number 340 over the car-park board
    windows: floors541.map(([b, t]) => ({ u: [.5, 3.6], h: [+(b + .1).toFixed(2), +(t - .2).toFixed(2)], panes: 2 })),
    blocks: [
      ...slabBands541(5.839),
      ...floors541.map(([b]) => ({ name: 'glass balcony rail', u: [.4, 5.4], h: [+(b + .15).toFixed(2), +(b + 1.0).toFixed(2)], out: .25, depth: .04, colour: rail541 })),
      { name: 'blank yellow car-park board', u: [.3, 3.4], h: [2.55, 3.4], out: .1, depth: .04, colour: '#f0c830' },
      { name: 'shopfront', u: [.3, 5.5], h: [.1, 2.5], out: .02, depth: .04, colour: '#3e4a4c', glow: .08 },
      { name: 'corner column', u: [2.7, 3.2], h: [.1, 3.5], out: .25, depth: .5, colour: '#efeee9' },
    ],
    boards: [{ u: [1.6, 4.2], h: [3.6, 4.35], out: .45 }],
  }, {
    edge: 7, // the lane face, u north from the back lane: the car-park entrance, then shops under the first floor
    windows: balconies541([[5.6, 10.4], [11.0, 16.0], [16.6, 21.4]]).map(f => f.window),
    blocks: [
      ...slabBands541(23.67),
      ...balconies541([[5.6, 10.4], [11.0, 16.0], [16.6, 21.4]]).map(f => f.rail),
      ...floors541.map(([b, t]) => ({ name: 'grey car-park louvres', u: [.3, 4.9], h: [b + .1, t - .1], out: .05, depth: .04, colour: '#8a8e90' })),
      { name: 'car-park entrance', u: [.4, 4.8], h: [.1, 3.3], out: .02, depth: .04, colour: '#2e3032' },
      { name: 'blank car-park sign', u: [.6, 4.6], h: [2.6, 3.1], out: .1, depth: .04, colour: '#e8e8ec' },
      ...[[5.5, 10.4], [11.0, 16.0], [16.6, 23.3]].map(u => ({ name: 'shopfront', u, h: [.1, 2.6], out: .02, depth: .04, colour: '#3e4a4c', glow: .08 })),
      ...[[5.0, 5.4], [10.5, 10.9], [16.1, 16.5], [23.0, 23.4]].map(u => ({ name: 'white column', u, h: [.1, 3.5], out: .25, depth: .5, colour: '#efeee9' })),
      { name: 'blank maroon salon board', u: [10.2, 13.6], h: [2.65, 3.25], out: .1, depth: .04, colour: '#7a2a3a' },
      { name: 'blank purple phone-shop board', u: [18.6, 22.6], h: [2.65, 3.2], out: .1, depth: .04, colour: '#4a2a9a' },
    ],
  }, {
    edge: 11, // the Lorong 16 face, u south from Geylang Road: the west wing's end, then the podium
    windows: balconies541([[.6, 5.2], [5.8, 10.4]]).map(f => f.window),
    blocks: [
      ...slabBands541(10.86),
      ...balconies541([[.6, 5.2], [5.8, 10.4]]).map(f => f.rail),
      { name: 'podium wall', u: [10.86, 18.585], h: [3.5, 4.4], out: .1, depth: .2, colour: grey541 },
      ...[[.4, 7.6], [8.2, 10.6], [11.2, 17.8]].map(u => ({ name: 'shopfront', u, h: [.1, 2.6], out: .02, depth: .04, colour: '#3e4a4c', glow: .08 })),
      { name: 'blank beauty-spa board', u: [2.0, 7.4], h: [2.65, 3.2], out: .1, depth: .04, colour: '#b8304a' },
      { name: 'blank toy-store board', u: [11.4, 15.2], h: [2.4, 2.9], out: .1, depth: .04, colour: '#1e1e22' },
    ],
  }, {
    edge: 10, // the splay at the Lorong 16 corner
    blocks: [
      ...slabBands541(4.753),
      ...floors541.map(([b]) => ({ name: 'glass balcony rail', u: [.3, 4.4], h: [+(b + .15).toFixed(2), +(b + 1.0).toFixed(2)], out: .25, depth: .04, colour: rail541 })),
      { name: 'shopfront', u: [.3, 4.4], h: [.1, 2.6], out: .02, depth: .04, colour: '#3e4a4c', glow: .08 },
    ],
  }],
};

// ---------------------------------------------------------------------------------------------
// West side

// 2. Way 454274650, No. 10, OYO 102 Budgetone Hotel: a seven-storey hotel south of the back lane behind Le Regal. Its
// front (edge 1, u north from its party wall with No. 14) is read where four June 2024 lane panoramas agree on its
// lettering, 0.5 m behind the source edge, where it runs the edge's length: a glazed stair strip and a beige panel at
// the south end, then the rooms' white front, its windows in projecting white surrounds between grey panels, under a
// slatted roof canopy and a row of grey fins on the top floor.
const W650 = 14.158, white650 = '#ecebe6';
const rows650 = [[4.7, 6.4], [7.8, 9.5], [11.2, 12.8], [14.5, 16.2], [17.8, 19.5]];
const cols650 = [[5.3, 7.2], [8.3, 10.1], [11.4, 13.5]];
export const budgetone = {
  id: 'budgetone-hotel', buildingIds: ['454274650'], kind: 'budgetone-hotel', frontEdge: 1, reviewRoad: 'Lorong 18 Geylang', review: { distance: 8, pitch: 28 },
  name: 'OYO 102 Budgetone Hotel (June 2024 exterior)', address: '10 Lorong 18 Geylang',
  height: 21.3, ceiling: 3.6, fiveFootWay: 1.0, roof: { type: 'flat', colour: '#9b9a95' },
  evidence: 'June 2024 Street View shows a seven-storey hotel south of the back lane behind Le Regal: at its south end a glazed stair strip of green glass and a plain beige panel, crowned by a red board lettered oyo; then the rooms\' white front, its windows in projecting white surrounds between grey panels, under a row of grey fins on the top floor and a slatted roof canopy. Between the first and second floors of rooms runs the lettering BudgetOne Hotel, blue with an orange O and a pink Hotel, over a band of painted waves above the lobby; a low garden wall with a gate plated 10 stands in front. Its north wall on the back lane is plain white. Google Maps lists OYO 102 Budgetone Hotel at 10 Lor 18 Geylang, Singapore 398793, with its point inside this way, so the hotel is named after it, and its lettering and the OYO board are redrawn in original type. Four June 2024 lane panoramas (pKnB..., USMH..., ijKd..., m8yM...) agree on the lettering 0.5 m behind the source edge, where the front runs the edge\'s length, so it is laid on the edge at its photographed positions. Heights were read on that plane from ijKd...: the lobby to 3.6 m under a band of waves to 4.3 m, windows at 4.7-6.4, 7.8-9.5, 11.2-12.8, 14.5-16.2 and 17.8-19.5 m, the lettering at 6.65-7.55 m, the fins to 21.3 m and the stair strip to about 22 m.',
  sources: [way('454274650'), search('OYO 102 Budgetone Hotel 10 Lorong 18 Geylang'), pano('ijKdW6tyrOTKZnnSK2iXdg', 262, 15, 75), pano('m8yMJuQIYmZU0SXX8yBJQA', 250, 15, 75), pano('USMHl-GTkar2AgGO1c8zGA', 235, 15, 70), pano('VqEMeB2kieus_7vLL6lHQA', 318, 20, 20)],
  colours: { wall: white650, trim: '#f2f2ee', frame: '#5a6064', glass: '#4a5a60', pier: white650, back: '#3a3c3e', floor: '#a8a296' },
  windows: rows650.flatMap(h => cols650.map(u => ({ u, h, panes: 2, out: .32 }))),
  blocks: [
    // The glazed stair strip and the beige panel at the south end, full height.
    { name: 'green glazed stair strip', u: [.05, 2.0], h: [.1, 22.0], out: .1, depth: .2, colour: '#5c7a72' },
    ...Array.from({ length: 7 }, (_, i) => ({ name: 'stair glazing mullion', u: [.05, 2.0], h: [3.3 + i * 3.3, 3.45 + i * 3.3], out: .22, depth: .04, colour: '#c8ccc8' })),
    { name: 'beige panel', u: [2.0, 4.9], h: [.1, 22.0], out: .05, depth: .1, colour: '#cdb98e' },
    // The rooms' windows in projecting white surrounds, with grey panels between them.
    ...rows650.flatMap(([b, t]) => [
      ...cols650.map(([l, r]) => ({ name: 'projecting window surround', u: [l - .2, r + .2], h: [b - .25, t + .25], out: .15, depth: .3, colour: '#f4f4f0' })),
      ...[[7.4, 8.1], [10.3, 11.2]].map(u => ({ name: 'grey panel', u, h: [b, t], out: .02, depth: .04, colour: '#a9adb0' })),
    ]),
    ...[3.6, 7.0, 10.4, 13.7, 17.0].map(y => ({ name: 'floor band', u: [4.9, W650], h: [y - .12, y + .12], out: .04, depth: .08, colour: '#d8d8d4' })),
    { name: 'band of painted waves', u: [4.9, W650], h: [3.6, 4.3], out: .03, depth: .06, colour: '#cfe0ea' },
    // The top floor's grey fins and the slatted roof canopy.
    ...Array.from({ length: 13 }, (_, i) => ({ name: 'grey fin', u: [+(5.1 + i * .7).toFixed(2), +(5.25 + i * .7).toFixed(2)], h: [19.8, 21.3], out: .45, depth: .5, colour: '#a6a9aa' })),
    { name: 'slatted roof canopy', u: [4.9, W650], h: [21.3, 21.6], out: .6, depth: 1.2, colour: '#b8bab8' },
    // The garden wall and gate in front, plated 10.
    { name: 'garden wall', u: [.3, 10.2], h: [0, 1.0], out: 1.6, depth: .2, colour: '#ecebe6' },
    { name: 'gate pillar plated 10', u: [10.2, 10.8], h: [0, 1.4], out: 1.6, depth: .4, colour: '#ecebe6' },
    { name: 'garden of potted plants', u: [.6, 10.0], h: [0, 1.6], out: .9, depth: 1.2, colour: '#4e7a3a' },
  ],
  piers: [[4.9, 5.3], [13.7, 14.1]],
  backFittings: [
    { name: 'lobby glazing', u: [5.6, 10.6], h: [.1, 3.0], colour: '#3e4a4c', glow: .1 },
    { name: 'white wall', u: [10.6, 13.6], h: [.1, 3.5], colour: '#ecebe6' },
  ],
  // The lettering between the first two floors of rooms, and the oyo board over the stair strip.
  boards: [{ u: [5.6, 13.3], h: [6.65, 7.55], out: .08 }, { u: [2.5, 4.5], h: [19.8, 22.0], out: .12 }],
  sides: [{
    edge: 0, // the north wall on the back lane, u west from the front
    windows: [4.7, 8.1, 11.5, 14.8, 18.1].map(b => ({ u: [9.6, 10.2], h: [b, b + .6], panes: 1 })),
    blocks: [{ name: 'slatted roof canopy', u: [0, 1.2], h: [21.3, 21.6], out: .6, depth: 1.2, colour: '#b8bab8' }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 3-6. Ways 454274632, 764372568, 764372567 and 764372566, Nos. 14, 16, 18 and 20: a two-storey terrace under one red
// tiled roof, its houses painted grey, blue, orange and cream, each with a porch or car porch in front of its upper
// floor. Read on one plane along No. 30's front (s north from its south corner), where the blue house's edge and window
// line up between four June 2024 lane panoramas 7.5 m behind that line: about 2 m behind the houses' recessed source
// edges and 4.5 m behind their projecting ones. The porches' fronts (the CYGON canopy at No. 14) line up about 3 m behind
// it, on the projecting edges. On the upper façades' plane the party walls stand at s = 29.7, 38.1, 46.2, 55.9 and 62.5,
// against the source's 31.7, 38.9, 46.8, 54.5 and 62.5.
const terrace14Note = ' Nos. 14 to 20 are a two-storey terrace under one red tiled roof, read together on one plane along No. 30\'s front: four June 2024 lane panoramas (Z5Yk..., VqEM..., m8yM..., ijKd...) agree on the blue house\'s edge and its window 7.5 m behind that line, which is about 2 m behind the houses\' recessed source edges and 4.5 m behind their projecting ones; the porches\' fronts, such as the CYGON canopy, line up about 3 m behind it, on the projecting edges. On the upper façades\' plane the party walls stand within 1.5 m of the source ones. Each house\'s elevation is laid proportionally across its two source front edges, which step about 2 m. Heights were read on that plane: porch roofs and canopies at 3.0-4.0 m, balcony rails to about 5.1 m, eaves at 7.1 m and the roof to about 8.7 m.';
const t14 = (colour, extra = {}) => ({
  reviewRoad: 'Lorong 18 Geylang', review: { distance: 7, pitch: 16 },
  height: 7.1, ceiling: 3.0, fiveFootWay: 1.2, shellInset: .15, roof: { type: 'hip', ridge: 8.7, colour: '#b4553d' },
  colours: { wall: colour, trim: '#e4e2dc', frame: '#3a3c3c', glass: '#46504e', pier: '#e8e6e0', back: '#4a4642', floor: '#a8a296' },
  ...extra,
});
const eaves14 = Wp => [{ name: 'tiled eaves', u: [0, Wp], h: [6.95, 7.25], out: .35, depth: .7, colour: '#b4553d' }, { name: 'tiled roof', u: [0, Wp], h: [7.1, 8.1], out: -.7, depth: 1.4, colour: '#b4553d' }];
export const cygon = {
  ...t14('#9fa4a7'), id: 'cygon', buildingIds: ['454274632'], kind: 'cygon',
  name: 'Cygon (June 2024 exterior)', address: '14 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the north house of the terrace, grey: its upper floor a plain wall with a white-framed door onto a terrace with a white railing, over a canopy whose fascia is lettered CYGON, on two columns; under it a grey concrete-textured front with a dark door and the number 14, between low white walls. Google Maps lists Cygon, an adult entertainment club open 24 hours, at 14 Lor 18 Geylang, Singapore 398797, with its point inside this way, so the house is named after it, and the lettering is redrawn in original type.' + terrace14Note,
  sources: [way('454274632'), search('Cygon 14 Lorong 18 Geylang'), pano('m8yMJuQIYmZU0SXX8yBJQA', 262, 10, 60), pano('ijKdW6tyrOTKZnnSK2iXdg', 225, 10, 50), pano('VqEMeB2kieus_7vLL6lHQA', 300, 10, 60)],
  ...across({
    windows: [{ u: [3.7, 4.5], h: [4.8, 6.8], panes: 1 }],
    blocks: [
      ...eaves14(6.6),
      { name: 'white terrace railing', u: [.1, 5.6], h: [4.15, 5.0], out: .5, depth: .04, colour: '#e8e8e4' },
      { name: 'air-conditioner', u: [2.9, 3.6], h: [4.2, 4.85], out: .3, depth: .5, colour: '#e8e8e4' },
      { name: 'CYGON canopy fascia', u: [0, 6.6], h: [3.0, 3.6], out: .6, depth: .2, colour: '#c8ccce' },
      { name: 'canopy roof', u: [0, 6.6], h: [3.55, 3.65], out: .1, depth: .1, colour: '#9a9c98' },
      ...[[.1, .4], [6.2, 6.5]].map(u => ({ name: 'low white wall', u, h: [0, 2.0], out: .4, depth: .3, colour: '#ecebe6' })),
    ],
    backFittings: [{ name: 'grey concrete-textured front', u: [.4, 6.2], h: [.1, 2.9], colour: '#8e9294' }, { name: 'dark door', u: [2.3, 3.4], h: [.1, 2.4], colour: '#2e3032' }],
    piers: [[.4, .7], [5.9, 6.2]], pierColour: '#c8ccce', ceiling: 3.0,
  }, 6.6, [{ edge: 0, w: 4.027 }, { edge: 6, w: 3.993 }], 0),
  // The CYGON lettering on the canopy's fascia, on the projecting edge.
  boards: [{ u: [1.2, 3.9], h: [3.08, 3.52], out: .72 }],
};
export const no16 = {
  ...t14('#3a68c4'), id: 'l18-16', buildingIds: ['764372568'], kind: 'unnamed', unnamed: true,
  name: 'No. 16 Lorong 18 (June 2024 exterior, occupants not identified)', address: '16 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the second house of the terrace, painted blue: a small grilled window in a white frame on its upper floor, over a balcony with a pink railing on pink posts, and a blue front below with a red banner, the number 16 in red and a forecourt of potted plants. No business is listed at the address and no sign was photographed.' + terrace14Note,
  sources: [way('764372568'), search('16 Lorong 18 Geylang'), pano('m8yMJuQIYmZU0SXX8yBJQA', 245, 10, 60), pano('VqEMeB2kieus_7vLL6lHQA', 270, 10, 60)],
  ...across({
    windows: [{ u: [3.8, 4.8], h: [5.3, 6.6], panes: 2 }],
    blocks: [
      ...eaves14(9.7),
      { name: 'grille', u: [3.85, 4.75], h: [5.35, 6.55], out: .04, depth: .02, colour: '#e8e8e4' },
      { name: 'balcony slab', u: [1.2, 6.9], h: [3.95, 4.2], out: .5, depth: 1.0, colour: '#e4c8cc' },
      { name: 'pink balcony railing', u: [1.3, 6.8], h: [4.2, 5.1], out: .95, depth: .04, colour: '#e89aa8' },
      ...[[2.0, 2.6], [3.0, 3.6]].map(u => ({ name: 'air-conditioner', u, h: [4.25, 4.9], out: .5, depth: .5, colour: '#e8e8e4' })),
      ...[[1.3, 1.5], [6.6, 6.8]].map(u => ({ name: 'pink post', u, h: [0, 3.95], out: .9, depth: .2, colour: '#e89aa8' })),
      { name: 'potted plants', u: [.4, 6.4], h: [0, 1.0], out: 1.6, depth: .8, colour: '#5a7a42' },
    ],
    backFittings: [{ name: 'blue front', u: [.3, 9.4], h: [.1, 2.9], colour: '#2e58b4' }, { name: 'blank red banner', u: [3.0, 6.0], h: [2.5, 2.9], colour: '#c8302a' }, { name: 'doorway', u: [6.9, 8.2], h: [.1, 2.4], colour: '#2a2e3a' }],
  }, 9.7, [{ edge: 5, w: 4.497 }, { edge: 7, w: 3.022 }], 5),
};
export const no18 = {
  ...t14('#e0893a'), id: 'l18-18', buildingIds: ['764372567'], kind: 'unnamed', unnamed: true,
  name: 'No. 18 Lorong 18 (June 2024 exterior, occupants not identified)', address: '18 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the third house of the terrace, painted orange: its upper floor faced with orange timber shutters behind a balcony with a dark railing, over an open shed between orange posts, where a lorry is parked beside a white partition. Google Maps lists Adult Secret, a 24-hour adult store, at 18 Lor 18 Geylang, but marks it permanently closed, and no sign for it was photographed, so no name is given.' + terrace14Note,
  sources: [way('764372567'), search('18 Lorong 18 Geylang'), pano('VqEMeB2kieus_7vLL6lHQA', 245, 10, 60), pano('Z5YkBNIYJLXgklpzRD8c5g', 290, 10, 60)],
  ...across({
    blocks: [
      ...eaves14(8.1),
      ...[.4, 1.8, 3.2, 4.6, 6.0].map(l => ({ name: 'orange timber shutter', u: [l, l + 1.35], h: [4.8, 7.0], out: .03, depth: .06, colour: '#d8823a' })),
      { name: 'balcony slab', u: [.3, 6.4], h: [4.0, 4.3], out: .5, depth: 1.0, colour: '#c8c4bc' },
      { name: 'dark balcony railing', u: [.4, 6.2], h: [4.3, 5.2], out: .95, depth: .04, colour: '#3a3836' },
      ...[[1.0, 1.7], [2.2, 2.9]].map(u => ({ name: 'air-conditioner', u, h: [4.35, 4.95], out: .5, depth: .5, colour: '#e8e8e4' })),
      ...[[.35, .6], [3.4, 3.65]].map(u => ({ name: 'orange post', u, h: [0, 4.0], out: .9, depth: .25, colour: '#d8823a' })),
      { name: 'white partition', u: [4.6, 6.4], h: [0, 2.3], out: .6, depth: .1, colour: '#ecebe6' },
    ],
    backFittings: [{ name: 'open shed', u: [.6, 7.8], h: [.1, 3.3], colour: '#4a4440', glow: .04 }],
  }, 8.1, [{ edge: 5, w: 4.936 }, { edge: 7, w: 3.342 }], 5),
};
export const club20 = {
  ...t14('#e8dcc0'), id: 'club-20', buildingIds: ['764372566'], kind: 'club-20',
  name: 'Club 20 (June 2024 exterior)', address: '20 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the south house of the terrace, cream: two dark doors on its upper floor behind a balcony with a white railing, on the slab of a car porch across the whole front, hung with red lanterns, under which two cars are parked before a dark lobby; a low cream wall at its south side, and on a post at its north side a lightbox lettered 20公館. Google Maps lists Club 20, a night club opening at noon, at 20 Lor 18 Geylang, Singapore 398803, with its point in the house next door; the address and the lightbox, which gives the club\'s name, agree on this house, so it is named (as the Nyingma Kathok Buddhist Centre was on Lorong 21), and the lightbox is redrawn in original type. SG山水庄园, also listed at No. 20, has no photographed sign.' + terrace14Note,
  sources: [way('764372566'), search('Club 20 20 Lorong 18 Geylang'), pano('Z5YkBNIYJLXgklpzRD8c5g', 262, 10, 60), pano('VqEMeB2kieus_7vLL6lHQA', 228, 10, 60)],
  ...across({
    windows: [[2.8, 3.8], [4.4, 5.4]].map(u => ({ u, h: [4.9, 6.9], panes: 1 })),
    blocks: [
      ...eaves14(8.4),
      { name: 'car porch slab', u: [0, 8.0], h: [3.4, 3.95], out: .6, depth: 1.2, colour: '#e8dcc0' },
      { name: 'white balcony railing', u: [2.0, 7.3], h: [3.95, 5.1], out: 1.1, depth: .04, colour: '#ecebe6' },
      ...[1.2, 2.4, 3.6, 4.8, 6.0].map(l => ({ name: 'red lantern', u: [l, l + .35], h: [2.6, 3.05], out: .6, depth: .35, colour: '#c8302a', glow: .2 })),
      { name: 'low cream wall', u: [0, 1.0], h: [0, 1.8], out: 1.1, depth: .3, colour: '#e8dcc0' },
      { name: 'lightbox post', u: [7.6, 7.75], h: [0, 2.0], out: 1.0, depth: .15, colour: '#d8d8d4' },
    ],
    backFittings: [{ name: 'dark lobby', u: [1.4, 7.0], h: [.1, 3.2], colour: '#3a3634', glow: .06 }],
  }, 8.4, [{ edge: 5, w: 3.938 }, { edge: 7, w: 2.997 }], 5),
};
// The 20公館 lightbox on its post at the north side, on the projecting edge.
club20.sides[0].boards = [{ u: [1.85, 2.95], h: [2.0, 2.8], out: 1.08 }];

export const lorong18 = [leRegal, budgetone, cygon, no16, no18, club20];
export const lorong18Frame = laneFrame, lorong18Layout = laneLayout, lorong18Upper = laneUpper, lorong18Reviews = laneReviews, lorong18Sides = laneSides;
