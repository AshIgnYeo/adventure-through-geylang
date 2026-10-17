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
// The same for a building over several source ways (`houses`, south to north, each with its front edges): the elevation is
// scaled to all their edges' combined width and shared out in turn. Boards go to the edge holding their centre.
function acrossHouses(elev, Wp, houses) {
  const total = houses.flatMap(h => h.parts).reduce((s, p) => s + p.w, 0), k = total / Wp, sc = scaleSpan(k);
  const scaled = { windows: elev.windows?.map(sc), vents: elev.vents?.map(sc), blocks: elev.blocks?.map(sc), backFittings: elev.backFittings?.map(sc), piers: elev.piers?.map(([a, b]) => [+(a * k).toFixed(3), +(b * k).toFixed(3)]) };
  const boards = (elev.boards ?? []).map(sc);
  // Each edge keeps a hair's margin of its width; windows cut at a slice are inset by their sills, and fittings behind
  // the front by 0.12-0.15 m, since the source party walls and steps are not quite square to the front.
  const inset = (xs, w, m) => xs?.flatMap(x => { const l = Math.max(x.u[0], m), r = Math.min(x.u[1], w - m); return r - l > .25 ? [{ ...x, u: [+l.toFixed(3), +r.toFixed(3)] }] : []; });
  let t = 0;
  return houses.map(house => {
    const cut = house.parts.map(p => {
      const w = p.w - .002, t0 = t, piece = sliceSpec(scaled, t0, t0 + w); t += p.w;
      const behind = (piece.blocks ?? []).filter(b => (b.out ?? 0) + (b.depth ?? .1) / 2 <= 0), proud = (piece.blocks ?? []).filter(b => !behind.includes(b));
      const mine = boards.filter(b => (b.u[0] + b.u[1]) / 2 >= t0 && (b.u[0] + b.u[1]) / 2 < t0 + p.w).map(b => ({ ...b, u: [+Math.max(.02, b.u[0] - t0).toFixed(3), +Math.min(w - .02, b.u[1] - t0).toFixed(3)] }));
      return { edge: p.edge, ...piece, windows: inset(piece.windows, w, .09), backFittings: inset(piece.backFittings, w, .12), blocks: [...proud, ...inset(behind, w, .15)], boards: mine.length ? mine : undefined };
    });
    const main = cut.find(c => c.edge === house.front);
    const sides = cut.filter(c => c.edge !== house.front).map(c => ({
      edge: c.edge, windows: c.windows, vents: c.vents, boards: c.boards,
      blocks: [...(c.blocks ?? []), ...(c.backFittings ?? []).map(f => ({ ...f, out: .02, depth: .04 })), ...(c.piers ?? []).map(u => ({ name: 'pier', u, h: [0, elev.ceiling ?? 3], out: .15, depth: .3, colour: elev.pierColour ?? '#e8e6e0' }))],
    }));
    return { frontEdge: house.front, windows: main.windows, vents: main.vents, blocks: main.blocks, backFittings: main.backFittings, piers: main.piers, boards: main.boards, sides };
  });
}
const across = (elev, Wp, parts, front) => acrossHouses(elev, Wp, [{ parts, front }])[0];

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
    // The CYGON lettering on the canopy's fascia.
    boards: [{ u: [1.0, 3.2], h: [3.08, 3.52], out: .72 }],
  }, 6.6, [{ edge: 0, w: 4.027 }, { edge: 6, w: 3.993 }], 0),
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
    // The 20公館 lightbox on its post at the north side.
    boards: [{ u: [7.0, 8.3], h: [2.0, 2.8], out: 1.08 }],
    backFittings: [{ name: 'dark lobby', u: [1.4, 7.0], h: [.1, 3.2], colour: '#3a3634', glow: .06 }],
  }, 8.4, [{ edge: 5, w: 3.938 }, { edge: 7, w: 2.997 }], 5),
};


// ---------------------------------------------------------------------------------------------
// 7-8. Ways 764372565 and 454274634, Nos. 24 and 22: one six-storey building over both ways, GoFit X Gym Geylang. A
// white front of grilled openings in coloured frames, grey, pink, green and orange, over a timber-slatted soffit and a
// drive-through car park, with a stair strip and a floor-directory banner at its south end and GOFIT lettered along its
// top. Read on No. 30's front line (s north from the building's south end): its frames line up between four June 2024
// lane panoramas 1.25 m behind that line, which is 2-2.5 m in front of the two ways' projecting source edges and about
// 5 m in front of their recessed ones. On that plane it runs from s = 18.3 to 31.8, about 13.5 m against the source
// ways' 12.2 m.
const frame22 = (u, h, colour) => {
  const [l, r] = u, [b, t] = h, k = .2;
  return [
    { name: 'grey louvred infill', u: [l + k, r - k], h: [b + k, t - k], out: .12, depth: .04, colour: '#c8cacb' },
    ...[[l, l + k], [r - k, r]].map(uu => ({ name: 'coloured frame', u: uu, h, out: .2, depth: .3, colour })),
    ...[[b, b + k], [t - k, t]].map(hh => ({ name: 'coloured frame', u, h: hh, out: .2, depth: .3, colour })),
  ];
};
const grey22 = '#8e9294', pink22 = '#d8607a', green22 = '#2e8a5a', orange22 = '#e8a030';
const rows22 = [[4.3, 7.3], [7.4, 10.2], [10.3, 13.0], [13.1, 15.8]], cols22 = [[5.4, 9.5], [9.6, 13.2]];
const colours22 = [[grey22, pink22], [green22, grey22], [grey22, orange22], [orange22, grey22]];
const gofitNote = ' Google Maps lists GoFit X Gym Geylang, a gym open 24 hours, at 22 Lor 18 Geylang, Singapore 398804, with its point inside this building (in way 764372565), and its marks are photographed: GOFIT along the top of the front, and its banner and boards. So the building is named after it, and its lettering and banner are redrawn in original type. The Foochow Building (Geylang), listed at the same address, is marked permanently closed; Alpha Omega Wellness & Recovery, listed on its fifth floor, and the Singapore Hock Chew Kong Kien Phor Tor have no photographed signs. The front was read on No. 30\'s front line: four June 2024 lane panoramas (FA-o..., zOAB..., D46t..., Z5Yk...) agree on its frames 1.25 m behind that line, 2-2.5 m in front of the two ways\' projecting source edges and about 5 m in front of their recessed ones; on that plane the building runs about 13.5 m, against the ways\' 12.2 m. The elevation is laid proportionally across the four source front edges, No. 24\'s and then No. 22\'s. Heights were read on that plane: the car park to 3.6 m under a timber-slatted soffit to 4.3 m, four floors of frames to 15.8 m, rooftop louvres to 16.5 m and the lettering to about 17.6 m.';
const [gofit24, gofit22] = acrossHouses({
  windows: rows22.flatMap(h => cols22.map(u => ({ u: [u[0] + .3, u[1] - .3], h: [h[0] + .5, h[1] - .5], panes: 4 }))),
  blocks: [
    ...rows22.flatMap((h, i) => cols22.flatMap((u, j) => frame22(u, h, colours22[i][j]))),
    { name: 'timber-slatted soffit', u: [4.9, 13.5], h: [3.6, 4.3], out: .15, depth: .3, colour: '#b06a4a' },
    { name: 'rooftop louvres', u: [4.9, 13.5], h: [15.9, 16.5], out: .1, depth: .2, colour: '#c8cacb' },
    // The stair strip at the south end: small framed windows over grey louvres.
    ...frame22([.6, 2.0], [5.8, 8.2], orange22), ...frame22([.5, 2.1], [10.8, 14.0], pink22),
    ...[[8.5, 10.5], [14.3, 16.0]].map(h => ({ name: 'grey louvres', u: [.6, 2.0], h, out: .05, depth: .04, colour: '#a6aaac' })),
    { name: 'pink vending machine', u: [12.0, 12.9], h: [0, 1.8], out: .5, depth: .7, colour: '#e8a0c0' },
  ],
  backFittings: [{ name: 'drive-through car park', u: [5.5, 11.6], h: [.1, 3.5], colour: '#3a3c3e', glow: .05 }, { name: 'white wall', u: [.2, 5.5], h: [.1, 3.5], colour: '#efeeea' }],
  // The floor-directory banner, the plate reading 22 Geylang Lor 18, and GOFIT along the top, letter by letter.
  // The banner is drawn in two halves, either side of the step between No. 24's two front edges.
  boards: [
    { u: [2.75, 3.72], h: [3.9, 16.4], out: .12 }, { u: [3.78, 4.85], h: [3.9, 16.4], out: .12 }, { u: [1.4, 3.1], h: [1.5, 1.95], out: .05 },
    ...[[5.6, 6.8], [7.0, 8.2], [8.5, 9.5], [9.8, 10.3], [10.6, 11.8]].map(u => ({ u, h: [16.5, 17.6], out: .05 })),
  ],
  ceiling: 3.6,
}, 13.5, [{ parts: [{ edge: 3, w: 3.373 }, { edge: 5, w: 2.891 }], front: 3 }, { parts: [{ edge: 3, w: 3.027 }, { edge: 1, w: 2.860 }], front: 3 }]);
export const gofit = {
  id: 'gofit', buildingIds: ['764372565', '454274634'], kind: 'gofit', reviewRoad: 'Lorong 18 Geylang', review: { distance: 7, pitch: 30 },
  name: 'GoFit X Gym Geylang (June 2024 exterior)', address: '22 Lorong 18 Geylang (over Nos. 22 and 24)',
  height: 16.5, ceiling: 3.6, fiveFootWay: 1.5, shellInset: .15, roof: { type: 'flat', colour: '#9b9a95' },
  colours: { wall: '#efeeea', trim: '#e4e4e0', frame: '#3a3c3c', glass: '#3e4a4e', pier: '#efeeea', back: '#3a3c3e', floor: '#a8a296' },
  evidence: 'June 2024 Street View shows one six-storey building over Nos. 22 and 24: a white front of grilled openings in coloured frames, grey, pink, green and orange, four floors of them over a timber-slatted soffit and a drive-through car park; at its south end a stair strip of small framed windows and a banner listing the floors (6 rooftop garden and chill zone, 5 my GoFit virtual PT, 4 cardio, 3 fitness machines and super circuit, 2 free weights, 1P car park); along its top the letters GOFIT; and on its wall a plate reading 22 Geylang Lor 18, with a GoFit board and a pink vending machine in front.' + gofitNote,
  sources: [way('764372565'), way('454274634'), search('GoFit X Gym Geylang 22 Lorong 18'), pano('D46tgWFRjVIkWNPE9YXH6w', 262, 15, 75), pano('zOABkuSTa8EV0waK82wcQg', 300, 20, 45), pano('FA-o7CNNp9nWc64Y24bQSg', 300, 15, 75)],
  parts: {
    // No. 24, the south way: the stair strip, the banner and the south column of frames; the review start.
    '764372565': { ...gofit24 },
    // No. 22, the north way: the north column of frames and the end of the lettering.
    '454274634': { ...gofit22, id: 'gofit-22', noReview: true },
  },
};

// ---------------------------------------------------------------------------------------------
// 9-10. Ways 454274635 and 454274637, Nos. 26 and 28: a single-storey pair under red tiled hipped roofs, behind a long
// tiled porch roof on slim posts, cream walls, and a dark timber gate lettered 28 26 across their forecourt. Read on No.
// 30's front line: the gate's lettering lines up between three June 2024 lane panoramas about 1 m behind that line, and
// the porch roof's eaves between it and the line, on the houses' projecting source edges. The pair runs from No. 30's
// party wall (s = 8.0, on the source one) to GoFit's south wall (18.3), and is shared at the source party line (13.8).
const pair26Note = ' Nos. 26 and 28 are a single-storey pair under red tiled hipped roofs, read together on No. 30\'s front line: three June 2024 lane panoramas (anNq..., FA-o..., zOAB...) agree on the lettering of their gate about 1 m behind that line, and the eaves of their long porch roof between it and the line, on the houses\' projecting source edges. The pair runs from No. 30\'s party wall, on the source one, to GoFit\'s south wall, about 1 m inside No. 26\'s source outline, and is shared at the source party line. Each elevation is laid proportionally across its house\'s two source front edges, which step about 2.5 m. Heights were read on that plane: the porch roof\'s eaves at 3.3 m rising to 4.4 m, and the hipped roofs to about 6.0 m.';
const p26 = colour => ({
  reviewRoad: 'Lorong 18 Geylang', review: { distance: 6, pitch: 14 },
  height: 3.4, ceiling: 3.0, fiveFootWay: 1.5, shellInset: .15, roof: { type: 'hip', ridge: 6.0, colour: '#b4553d' },
  colours: { wall: colour, trim: '#e8e2d0', frame: '#3a3c3c', glass: '#46504e', pier: '#efeee8', back: '#e8e2d0', floor: '#b0a898' },
  kind: 'unnamed', unnamed: true,
});
const porch26 = Wp => [
  { name: 'tiled porch roof', u: [0, Wp], h: [3.3, 4.4], out: .6, depth: 1.2, colour: '#c8603e' },
  { name: 'porch roof gutter', u: [0, Wp], h: [3.25, 3.35], out: 1.2, depth: .1, colour: '#e8e6e0' },
];
export const no28 = {
  ...p26('#ece4cc'), id: 'l18-28', buildingIds: ['454274637'],
  name: 'No. 28 Lorong 18 (June 2024 exterior, occupants not identified)', address: '28 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the south house of a single-storey pair, cream, under a red tiled hipped roof behind a long tiled porch roof on slim posts: a dark timber door beside the number 28, and the south half of a dark timber gate lettered 28 26 across the forecourt. No business is listed at the address and no sign was photographed.' + pair26Note,
  sources: [way('454274637'), search('28 Lorong 18 Geylang'), pano('FA-o7CNNp9nWc64Y24bQSg', 268, 10, 65), pano('zOABkuSTa8EV0waK82wcQg', 235, 10, 60)],
  ...across({
    blocks: [
      ...porch26(5.8),
      { name: 'slim porch post', u: [.25, .4], h: [0, 3.3], out: 1.1, depth: .15, colour: '#e8e6e0' },
      { name: 'dark timber gate', u: [3.8, 5.8], h: [0, 1.95], out: 1.4, depth: .08, colour: '#3a2e28' },
      { name: 'low grey wall', u: [.4, 3.8], h: [0, 1.0], out: 1.4, depth: .2, colour: '#b8b8b2' },
    ],
    backFittings: [{ name: 'dark timber door', u: [2.6, 3.7], h: [.1, 2.3], colour: '#4a3226' }, { name: 'number 28 plate', u: [2.2, 2.5], h: [1.9, 2.25], colour: '#1e1e1e' }],
  }, 5.8, [{ edge: 3, w: 2.904 }, { edge: 1, w: 2.578 }], 3),
};
export const no26 = {
  ...p26('#ece4cc'), id: 'l18-26', buildingIds: ['454274635'],
  name: 'No. 26 Lorong 18 (June 2024 exterior, occupants not identified)', address: '26 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the north house of the pair, like No. 28: a frosted glass front beside the number 26, behind the north half of the timber gate, under the same porch roof, against the south wall of the GoFit building. No business is listed at the address and no sign was photographed.' + pair26Note,
  sources: [way('454274635'), search('26 Lorong 18 Geylang'), pano('FA-o7CNNp9nWc64Y24bQSg', 285, 10, 65), pano('zOABkuSTa8EV0waK82wcQg', 240, 10, 60)],
  ...across({
    blocks: [
      ...porch26(4.5),
      { name: 'dark timber gate', u: [0, 1.6], h: [0, 1.95], out: 1.4, depth: .08, colour: '#3a2e28' },
      { name: 'slim porch post', u: [4.25, 4.4], h: [0, 3.3], out: 1.1, depth: .15, colour: '#e8e6e0' },
    ],
    backFittings: [{ name: 'frosted glass front', u: [2.0, 3.9], h: [.3, 2.6], colour: '#b8ccc8', glow: .04 }, { name: 'number 26 plate', u: [3.95, 4.25], h: [1.9, 2.25], colour: '#1e1e1e' }],
  }, 4.5, [{ edge: 4, w: 3.699 }, { edge: 2, w: 2.59 }], 4),
};

// ---------------------------------------------------------------------------------------------
// 11-14. Ways 454274639, 454274640, 764372564 and 764372563, Nos. 30, 32, 34 and 36: a two-storey terrace, pale blue
// at No. 30 and pink beyond, each house with a porch roof or awning over its forecourt. Read on one plane along No. 30's
// front (s north from its south corner): the upper façades line up between three June 2024 lane panoramas 3.25 m behind
// that line, which is 3.25 m behind the source edges of Nos. 30-34, whose lines follow the porch fronts, and 0.85 m
// behind No. 36's. On that plane the party walls stand at s = 6.95, -0.8, -8.7, -17.0 and -23.0, against the source's
// 7.97, 0, -7.83, -14.88 and -22.15.
const terrace30Note = ' Nos. 30 to 36 are a two-storey terrace, read together on one plane along No. 30\'s front: three June 2024 lane panoramas (FA-o..., anNq..., qTnZ..., with OGxs... at No. 36) agree on the upper façades 3.25 m behind that line, where the depth scores also peak (0.33-0.39). That is 3.25 m behind the source edges of Nos. 30-34, whose lines follow the fronts of their porch roofs, and 0.85 m behind No. 36\'s. On that plane the party walls stand at 6.95, -0.8, -8.7, -17.0 and -23.0 m along No. 30\'s front, against the source\'s 7.97, 0, -7.83, -14.88 and -22.15, so No. 36 photographs about 6.0 m wide against its 7.2 m way and No. 34 about 8.3 m against 7.0 m. Each elevation is laid proportionally on its own source edge. Heights were read on that plane: porch roofs and awnings at 3.0-4.0 m, windows at about 4.4-6.2 m and parapets at 7.6 m.';
const t30 = (colour, extra = {}) => ({
  reviewRoad: 'Lorong 18 Geylang', review: { distance: 7, pitch: 16 },
  height: 7.6, ceiling: 3.0, fiveFootWay: 2.0, shellInset: .3, roof: { type: 'flat', colour: '#9b9a95' },
  colours: { wall: colour, trim: '#efe8e0', frame: '#3a3c3c', glass: '#3e4a4e', pier: '#efeee8', back: '#4a4642', floor: '#a8a296' },
  ...extra,
});
// u on each house's source edge from s on No. 30's line: the photographed span [s0, s1] laid on the edge's width.
const on30 = (s0, s1, w) => sp => sp.map(v => Math.min(w, Math.max(0, +((v - s0) * w / (s1 - s0)).toFixed(3))));
const at30 = on30(-.8, 6.95, 7.974), at32 = on30(-8.7, -.8, 7.83), at34 = on30(-17.0, -8.7, 7.04), at36 = on30(-23.0, -17.0, 7.197);
const parapet30 = (w, colour) => ({ name: 'parapet cornice', u: [0, w], h: [7.3, 7.6], out: .1, depth: .2, colour });
export const no30 = {
  ...t30('#bcc8d8'), id: 'l18-30', buildingIds: ['454274639'], kind: 'unnamed', unnamed: true, frontEdge: 2,
  name: 'No. 30 Lorong 18 (June 2024 exterior, occupants not identified)', address: '30 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the north house of the terrace, pale blue: two windows under roller-blind boxes on its upper floor, over a red tiled porch roof across the forecourt, with red boards and festive paper on the wall under it and the number 30 on a post. No business is listed at the address and no sign was photographed.' + terrace30Note,
  sources: [way('454274639'), search('30 Lorong 18 Geylang'), pano('anNqdM9awCzYw2w5CkdyoA', 262, 10, 60), pano('FA-o7CNNp9nWc64Y24bQSg', 240, 10, 60)],
  windows: [[.3, 2.4], [4.1, 6.1]].map(s => ({ u: at30(s), h: [4.35, 5.8], panes: 3 })),
  blocks: [
    parapet30(7.973, '#d8e0ea'),
    ...[[.2, 2.5], [4.0, 6.2]].map(s => ({ name: 'roller-blind box', u: at30(s), h: [5.8, 6.3], out: .1, depth: .2, colour: '#eef0f2' })),
    { name: 'red tiled porch roof', u: [.1, 7.87], h: [3.0, 3.8], out: .7, depth: 1.4, colour: '#c8603e' },
    ...[[0, 1.0], [2.0, 2.6], [3.6, 4.2]].map(s => ({ name: 'air-conditioner', u: at30(s), h: [3.85, 4.3], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  backFittings: [
    { name: 'blank red board', u: at30([.6, 3.0]), h: [2.4, 2.75], colour: '#c8302a' }, { name: 'blank red board', u: at30([3.6, 5.8]), h: [2.4, 2.75], colour: '#c8302a' },
    { name: 'glazed front', u: at30([.3, 3.3]), h: [.1, 2.3], colour: '#3a3e42', glow: .05 }, { name: 'dark doorway', u: at30([4.2, 6.6]), h: [.1, 2.3], colour: '#4a3a34' },
  ],
};
export const no32 = {
  ...t30('#ebb4a6', { colours: { wall: '#ebb4a6', trim: '#efe8e0', frame: '#f2f2ee', glass: '#3e4a4e', pier: '#efeee8', back: '#4a4642', floor: '#a8a296' } }), id: 'l18-32', buildingIds: ['454274640'], kind: 'unnamed', unnamed: true, frontEdge: 1,
  name: 'No. 32 Lorong 18 (June 2024 exterior, occupants not identified)', address: '32 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the second house of the terrace, pink: two arched white casement windows on its upper floor over a row of air-conditioners, under a curved red-striped awning, and a ground floor faced with brick tiles round a glazed front lit purple, the number 32 in red at its door. No business is listed at the address and no sign was photographed.' + terrace30Note,
  sources: [way('454274640'), search('32 Lorong 18 Geylang'), pano('anNqdM9awCzYw2w5CkdyoA', 280, 10, 60), pano('qTnZ94l3dPCM46GK7zcMyA', 290, 10, 40)],
  windows: [[-7.0, -5.6], [-3.5, -1.9]].map(s => ({ u: at32(s), h: [4.5, 6.0], panes: 3, arched: true })),
  blocks: [
    parapet30(7.83, '#f2c8bc'),
    { name: 'curved red-striped awning', u: at32([-7.6, -.9]), h: [3.55, 4.0], out: .6, depth: 1.2, colour: '#d8706a' },
    ...[-7.4, -6.6, -5.8, -5.0, -4.2].map(l => ({ name: 'air-conditioner', u: at32([l, l + .7]), h: [4.0, 4.45], out: .3, depth: .5, colour: '#e8e8e4' })),
    { name: 'porch roof', u: [.05, 7.78], h: [3.0, 3.2], out: .8, depth: 1.6, colour: '#d8d6d0' },
  ],
  backFittings: [
    { name: 'brick-tiled wall', u: at32([-8.5, -5.2]), h: [.1, 2.9], colour: '#a8705a' },
    { name: 'glazed front lit purple', u: at32([-5.2, -1.2]), h: [.1, 2.6], colour: '#5a3a6a', glow: .12 },
  ],
};
export const no34 = {
  ...t30('#eab2a4'), id: 'l18-34', buildingIds: ['764372564'], kind: 'unnamed', unnamed: true, frontEdge: 4,
  name: 'No. 34 Lorong 18 (June 2024 exterior)', address: '34 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the third house of the terrace, pink: two broad windows under louvred hoods on its upper floor, below raised black lettering reading 浯鄉陳氏公會 along the parapet, over a flat canopy on black posts; under it a dark marble front lettered VIETNAM PARADISE in gold, the number 34, and a grille gate to a stair at its north end, where a yellow board with an emblem reads 浯鄉陳氏公會 CHEN\'S ASSOCIATION. Google Maps lists 浯乡陈氏公会, an association, at 40 Lor 18 Geylang, Singapore 398819, with its point inside this way; the lettering names it, but the listed address is No. 40, so the house is left unnamed and its lettering blank until open question 74 is answered. Vietnam Paradise is not listed.' + terrace30Note,
  sources: [way('764372564'), search('浯乡陈氏公会 40 Lorong 18 Geylang'), pano('qTnZ94l3dPCM46GK7zcMyA', 255, 8, 30), pano('OGxsF3fQsZ9otpM_qqvc3Q', 300, 10, 40), pano('anNqdM9awCzYw2w5CkdyoA', 235, 10, 40)],
  windows: [[-15.9, -12.3], [-11.3, -8.9]].map(s => ({ u: at34(s), h: [4.6, 5.9], panes: 4 })),
  blocks: [
    parapet30(7.04, '#f2c8bc'),
    ...[[-16.0, -12.2], [-11.4, -8.8]].map(s => ({ name: 'louvred hood', u: at34(s), h: [5.9, 6.5], out: .2, depth: .3, colour: '#f2c8bc' })),
    { name: 'blank black lettering', u: at34([-16.2, -9.6]), h: [6.6, 7.2], out: .04, depth: .04, colour: '#2a2a2a' },
    ...[[-12.0, -11.4], [-9.8, -9.1]].map(s => ({ name: 'air-conditioner', u: at34(s), h: [4.0, 4.5], out: .3, depth: .5, colour: '#e8e8e4' })),
    { name: 'flat canopy', u: [.05, 6.99], h: [3.1, 3.35], out: .8, depth: 1.6, colour: '#5a5e60' },
    ...[[-16.2, -16.0], [-9.4, -9.2]].map(s => ({ name: 'black post', u: at34(s), h: [0, 3.1], out: 1.5, depth: .15, colour: '#2a2a2a' })),
  ],
  backFittings: [
    { name: 'dark marble front', u: at34([-16.6, -10.0]), h: [.1, 3.0], colour: '#3a3634' },
    { name: 'blank gold-lettered board', u: at34([-16.4, -13.2]), h: [2.1, 2.9], colour: '#4a4038' },
    { name: 'grille gate to the stair', u: at34([-10.0, -9.0]), h: [.1, 2.2], colour: '#c8c8c4' },
    { name: 'blank yellow association board', u: at34([-10.0, -9.0]), h: [2.25, 2.9], colour: '#e8c840' },
  ],
};
export const no36 = {
  ...t30('#ecb8aa', { colours: { wall: '#ecb8aa', trim: '#efe8e0', frame: '#f2f2ee', glass: '#3e4a4e', pier: '#efeee8', back: '#4a4642', floor: '#a8a296' } }), id: 'l18-36', buildingIds: ['764372563'], kind: 'unnamed', unnamed: true, frontEdge: 4,
  name: 'No. 36 Lorong 18 (June 2024 exterior, occupants not identified)', address: '36 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the south house of the terrace, pink: two arched windows on its upper floor over a curved red-striped awning, and under it a ground floor faced with brown mosaic, with a woven X-shaped ornament, glass doors lit purple and the number 36 in red. No business is listed at the address and no sign was photographed.' + terrace30Note,
  sources: [way('764372563'), search('36 Lorong 18 Geylang'), pano('OGxsF3fQsZ9otpM_qqvc3Q', 275, 8, 40), pano('qTnZ94l3dPCM46GK7zcMyA', 240, 10, 60)],
  windows: [[-22.4, -21.3], [-19.9, -18.8]].map(s => ({ u: at36(s), h: [4.6, 6.0], panes: 2, arched: true })),
  blocks: [
    parapet30(7.197, '#f2c8bc'),
    { name: 'curved red-striped awning', u: at36([-22.9, -17.1]), h: [3.3, 3.8], out: .6, depth: 1.2, colour: '#d8706a' },
    ...[[-21.1, -20.5], [-18.6, -18.0]].map(s => ({ name: 'air-conditioner', u: at36(s), h: [4.9, 5.4], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  backFittings: [
    { name: 'brown mosaic wall', u: at36([-22.9, -20.2]), h: [.1, 2.9], colour: '#6a4a3a' },
    { name: 'woven X ornament', u: at36([-22.3, -21.0]), h: [1.0, 2.2], colour: '#d8c8b0' },
    { name: 'glass doors lit purple', u: at36([-20.2, -17.3]), h: [.1, 2.5], colour: '#5a3a6a', glow: .12 },
  ],
};

// ---------------------------------------------------------------------------------------------
// 15-18. Ways 454274642, 764372562, 454274643 and 764372561, Nos. 38, 40, 42 and 44: a two-storey terrace behind a
// zinc porch roof on slim posts, its houses faced in cream tiles, orange herringbone tiles, white with pink lines, and
// lavender. Read on No. 30's front line: the lavender and white houses' party wall and windows line up between three
// June 2024 lane panoramas 5.75 m behind that line, 0.25 m in front of their source edges. On that plane the party walls
// stand at s = -23.0, -30.8, -37.4, -45.4 and -52.7, against the source's -22.2, -30.1, -36.9, -44.8 and -51.9.
const terrace38Note = ' Nos. 38 to 44 are a two-storey terrace behind one zinc porch roof, read together on one plane along No. 30\'s front: three June 2024 lane panoramas (Qxql..., Crjq..., RvUa..., with GNek...) agree on the party wall between Nos. 42 and 44 and on No. 42\'s windows 5.75 m behind that line, which is 0.25 m in front of the four houses\' source edges; planes 1.25 m either side split them by about 1 m. On that plane the party walls stand at -23.0, -30.8, -37.4, -45.4 and -52.7 m along No. 30\'s front, within 0.8 m of the source ones. Each elevation is laid proportionally on its own source edge. Heights were read on that plane: the porch roof at 3.1-3.6 m, air-conditioners at 4.0-4.6 m, windows at about 4.6-5.8 m and parapets at 7.4-7.6 m.';
const t38 = (colour, extra = {}) => ({
  reviewRoad: 'Lorong 18 Geylang', review: { distance: 7, pitch: 16 }, kind: 'unnamed', unnamed: true,
  height: 7.5, ceiling: 3.1, fiveFootWay: 2.0, shellInset: .3, roof: { type: 'flat', colour: '#9b9a95' },
  colours: { wall: colour, trim: '#e8e6e0', frame: '#d8dadc', glass: '#3a4246', pier: '#efeee8', back: '#4a4642', floor: '#a8a296' },
  ...extra,
});
const at38 = on30(-30.8, -23.0, 7.857), at40 = on30(-37.4, -30.8, 6.843), at42 = on30(-45.4, -37.4, 7.877), at44 = on30(-52.7, -45.4, 7.147);
const porch38 = w => [
  { name: 'zinc porch roof', u: [.02, w - .02], h: [3.1, 3.6], out: 1.0, depth: 2.0, colour: '#a8acaa' },
  { name: 'porch fascia', u: [.02, w - .02], h: [3.0, 3.25], out: 2.0, depth: .06, colour: '#e8e8e4' },
];
const post38 = u => ({ name: 'slim porch post', u, h: [0, 3.1], out: 1.9, depth: .12, colour: '#e8e8e4' });
export const no38 = {
  ...t38('#e2d2b4'), id: 'l18-38', buildingIds: ['454274642'], frontEdge: 1, height: 7.4,
  name: 'No. 38 Lorong 18 (June 2024 exterior, occupants not identified)', address: '38 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the north house of the terrace, faced in cream tiles: two small aluminium windows high on its upper floor, a white rooftop storey set back behind the parapet, and under the zinc porch roof a glazed front with a stair lit purple, behind a large street tree. No business is listed at the address and no sign was photographed.' + terrace38Note,
  sources: [way('454274642'), search('38 Lorong 18 Geylang'), pano('OGxsF3fQsZ9otpM_qqvc3Q', 235, 10, 60), pano('QxqlKC5fT3uT0rMZmAWDvQ', 290, 10, 60)],
  windows: [[-29.4, -27.6], [-26.6, -24.8]].map(s => ({ u: at38(s), h: [4.8, 5.6], panes: 4 })),
  blocks: [
    { name: 'parapet coping', u: [0, 7.857], h: [7.25, 7.4], out: .08, depth: .16, colour: '#efe8d8' },
    ...porch38(7.857), post38(at38([-30.6, -30.5])),
    { name: 'air-conditioner', u: at38([-30.2, -29.6]), h: [4.0, 4.5], out: .3, depth: .5, colour: '#e8e8e4' },
  ],
  // The white storey set back on the roof.
  rooftop: [{ u: [.5, 7.3], top: 8.8, setback: 2.5, depth: 6.0, colour: '#ecebe6' }],
  backFittings: [{ name: 'tiled wall', u: at38([-30.6, -28.3]), h: [.1, 3.0], colour: '#d8c8a8' }, { name: 'glazed front with a stair lit purple', u: at38([-28.3, -23.4]), h: [.1, 2.8], colour: '#5a4a6a', glow: .1 }],
};
export const no40 = {
  ...t38('#e0a070'), id: 'l18-40', buildingIds: ['764372562'], frontEdge: 4, height: 7.4,
  name: 'No. 40 Lorong 18 (June 2024 exterior, occupants not identified)', address: '40 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the second house of the terrace, faced in orange herringbone tiles under a lattice band: two windows over air-conditioners on its upper floor, and under the zinc porch roof an open front faced in the same tiles, with a gilt Thai-style ornament on the wall and a white car parked. Google Maps lists 浯乡陈氏公会 at this address, but its point and its signs are at No. 34 (open question 74); no sign was photographed here, so no name is given.' + terrace38Note,
  sources: [way('764372562'), search('40 Lorong 18 Geylang'), pano('QxqlKC5fT3uT0rMZmAWDvQ', 262, 10, 60), pano('CrjqjRUlo0Yq4hlJxLZSkA', 295, 10, 60)],
  windows: [[-36.6, -34.6], [-33.9, -31.9]].map(s => ({ u: at40(s), h: [4.7, 5.8], panes: 3 })),
  blocks: [
    { name: 'lattice band', u: [0, 6.843], h: [6.8, 7.25], out: .04, depth: .06, colour: '#e8c8a0' },
    { name: 'parapet coping', u: [0, 6.843], h: [7.25, 7.4], out: .08, depth: .16, colour: '#e8c8a0' },
    ...porch38(6.843), post38(at40([-37.2, -37.1])),
    ...[[-36.4, -35.8], [-35.2, -34.6], [-34.0, -33.4]].map(s => ({ name: 'air-conditioner', u: at40(s), h: [4.0, 4.5], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  backFittings: [{ name: 'herringbone-tiled wall', u: at40([-37.0, -31.2]), h: [.1, 3.0], colour: '#c88a5a' }, { name: 'gilt Thai-style ornament', u: at40([-35.6, -34.6]), h: [1.2, 2.6], colour: '#d8b048', glow: .1 }, { name: 'dark doorway', u: at40([-34.2, -32.4]), h: [.1, 2.4], colour: '#3a3634' }],
};
export const no42 = {
  ...t38('#eeeef0'), id: 'l18-42', buildingIds: ['454274643'], frontEdge: 1, height: 7.6,
  name: 'No. 42 Lorong 18 (June 2024 exterior, occupants not identified)', address: '42 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the third house of the terrace, white with pink lines framing its upper floor: a window at each end over air-conditioners, and under the zinc porch roof a car porch with a pink panel, a grilled door and a gilt Thai-style ornament at its north end. Google Maps lists 浴中屋, an adult entertainment club, at 44 Lor 18 Geylang with its point by this house, but marks it permanently closed, and no sign for it was photographed, so no name is given.' + terrace38Note,
  sources: [way('454274643'), search('42 Lorong 18 Geylang'), pano('CrjqjRUlo0Yq4hlJxLZSkA', 262, 10, 60), pano('RvUaS2tCvcg1XuXtad5xcg', 290, 10, 60)],
  windows: [[-44.7, -43.5], [-39.6, -38.4]].map(s => ({ u: at42(s), h: [4.9, 5.8], panes: 2 })),
  blocks: [
    { name: 'grey coping', u: [0, 7.877], h: [7.4, 7.6], out: .08, depth: .16, colour: '#9a9c9e' },
    ...[[6.3, 6.4], [4.4, 4.5]].map(h => ({ name: 'pink line', u: at42([-45.2, -37.6]), h, out: .03, depth: .04, colour: '#e8b8c0' })),
    ...[[-44.6, -44.0], [-43.4, -42.8], [-42.5, -41.8], [-41.2, -40.6]].map(s => ({ name: 'air-conditioner', u: at42(s), h: [4.0, 4.6], out: .3, depth: .5, colour: '#e8e8e4' })),
    ...porch38(7.877), post38(at42([-45.2, -45.1])),
    { name: 'pink panel', u: at42([-43.5, -41.8]), h: [0, 2.0], out: 1.0, depth: .06, colour: '#e8b8c8' },
  ],
  backFittings: [{ name: 'white wall', u: at42([-45.2, -42.5]), h: [.1, 3.0], colour: '#ecebe6' }, { name: 'grilled door', u: at42([-42.5, -40.8]), h: [.1, 2.4], colour: '#3a3a38' }, { name: 'gilt Thai-style ornament', u: at42([-38.8, -37.9]), h: [1.2, 2.6], colour: '#d8b048', glow: .1 }],
};
export const no44 = {
  ...t38('#b8b4d0'), id: 'l18-44', buildingIds: ['764372561'], frontEdge: 4, height: 7.6,
  name: 'No. 44 Lorong 18 (June 2024 exterior, occupants not identified)', address: '44 Lorong 18 Geylang',
  evidence: 'June 2024 Street View shows the south house of the terrace, lavender: two windows inside a raised frame on its upper floor, over air-conditioners, and under the zinc porch roof a dark board lettered in script and wind chimes, behind a brown timber gate between low lavender walls, plated 44. No business is listed at the address but the closed 浴中屋, so the board is blank.' + terrace38Note,
  sources: [way('764372561'), search('44 Lorong 18 Geylang'), pano('RvUaS2tCvcg1XuXtad5xcg', 262, 10, 60), pano('CrjqjRUlo0Yq4hlJxLZSkA', 240, 10, 60)],
  windows: [[-51.4, -50.0], [-48.6, -47.2]].map(s => ({ u: at44(s), h: [4.7, 5.8], panes: 2 })),
  blocks: [
    { name: 'raised window frame', u: at44([-52.1, -46.0]), h: [4.4, 6.4], out: .06, depth: .12, colour: '#c8c4dc' },
    { name: 'lavender coping', u: [0, 7.147], h: [7.4, 7.6], out: .08, depth: .16, colour: '#9a98b4' },
    ...[[-52.4, -51.8], [-50.0, -49.4], [-48.0, -47.4], [-46.4, -45.8]].map(s => ({ name: 'air-conditioner', u: at44(s), h: [4.0, 4.5], out: .3, depth: .5, colour: '#e8e8e4' })),
    ...porch38(7.147), post38(at44([-52.6, -52.5])),
    { name: 'brown timber gate', u: at44([-51.6, -46.6]), h: [0, 1.9], out: 2.4, depth: .1, colour: '#8a5040' },
    ...[[-52.6, -51.6], [-46.6, -45.5]].map(s => ({ name: 'low lavender wall', u: at44(s), h: [0, 1.4], out: 2.4, depth: .2, colour: '#a8a0c8' })),
  ],
  backFittings: [{ name: 'dark front', u: at44([-52.3, -45.7]), h: [.1, 2.9], colour: '#3a3a3e' }, { name: 'blank dark script board', u: at44([-50.6, -47.4]), h: [2.3, 2.75], colour: '#2a2a2c' }],
};

// ---------------------------------------------------------------------------------------------
// 19. Way 454274645, No. 44B, the Lorong 18 west corner at Westerhout Road: a two-storey corner house under a red tiled
// hipped roof, ochre in June 2024 (lavender in December 2022), a recessed balcony with a yellow railing hung with Thai
// gilt ornaments along the lane, over a curved red awning and a Thai massage parlour's neon signs. Its lane face is read
// where three June 2024 lane panoramas agree on its south corner and balcony, about 1 m behind the source edges (edges 3
// and 1, which step 1.4 m), running about 13 m from the corner, 1.4 m south of the source corner, to No. 44. Its
// Westerhout Road front (edge 4) was read from the December 2022 Westerhout Road drive about 1 m behind its source edge,
// which follows the brick boundary wall; it is laid on the edge, its street-level pieces held flat.
const ochre44b = '#c89a62';
export const no44b = {
  id: 'l18-44b', buildingIds: ['454274645'], kind: 'unnamed', unnamed: true, reviewRoad: 'Lorong 18 Geylang', review: { distance: 8, pitch: 18 },
  name: 'No. 44B Lorong 18 (June 2024 exterior, occupants not identified)', address: '44B Lorong 18 Geylang (the Westerhout Road corner)',
  height: 6.8, ceiling: 3.4, fiveFootWay: 2.0, shellInset: .3, roof: { type: 'hip', ridge: 8.6, colour: '#b4553d' },
  colours: { wall: ochre44b, trim: '#d8b078', frame: '#4a3a2a', glass: '#3a3634', pier: '#c89a62', back: '#3a2e2a', floor: '#a8a296' },
  evidence: 'June 2024 Street View shows a two-storey corner house at Lorong 18 and Westerhout Road under a red tiled hipped roof with deep eaves, painted ochre: on the lane, a recessed balcony along its upper floor with a yellow railing, hung with Thai gilt ornaments and strings of beads, and at its south end a window under a red hood; on the ground floor a curved red awning wrapping the corner, over a massage parlour\'s neon signs (one reading SAW..., another OPEN within hearts, a red one with a welcome in Chinese) and the number 44B, behind a brown timber gate and potted topiary. Along Westerhout Road two windows under hoods on its upper floor, over a car porch behind a brick boundary wall with grey panels. In December 2022 the house was lavender. No business is listed at 44B and the neon names none, so its signs are blank. Three June 2024 lane panoramas (GNek..., RvUa..., Sen0...) agree on its south corner and balcony about 1 m behind the source edges, where the lane face runs about 13 m from the corner, 1.4 m south of the source corner, to No. 44; it is laid proportionally across the two source edges, which step 1.4 m. The December 2022 Westerhout Road drive puts the Westerhout Road front about 1 m behind its source edge, which follows the boundary wall and stands about 0.6 m from Westerhout Road\'s estimated carriageway, so that front\'s street-level pieces are held flat. Heights were read on the lane face: the awning at 3.5-4.4 m, the balcony railing at 4.5-5.5 m, eaves at 6.8 m and the roof to about 8.6 m.',
  sources: [way('454274645'), search('44B Lorong 18 Geylang'), pano('GNek5w3F44WsZnRCjqyOhA', 262, 10, 70), pano('Sen0U2YhMqlMOvyy54kfpQ', 300, 10, 70), pano('RvUaS2tCvcg1XuXtad5xcg', 240, 10, 60), pano('0w-KvtXof37AXb1R9DUTcw', 20, 10, 70)],
  ...across({
    windows: [{ u: [.6, 2.2], h: [4.8, 6.0], panes: 2 }],
    blocks: [
      { name: 'red window hood', u: [.4, 2.4], h: [6.0, 6.4], out: .3, depth: .6, colour: '#c8503e' },
      { name: 'balcony recess', u: [2.6, 12.8], h: [4.4, 6.6], out: -.02, depth: .04, colour: '#5a4632' },
      { name: 'yellow balcony railing', u: [2.6, 12.8], h: [4.5, 5.5], out: .1, depth: .06, colour: '#e8c050' },
      ...[3.6, 5.6, 7.6, 9.6, 11.6].map(l => ({ name: 'Thai gilt ornament', u: [l, l + .4], h: [5.4, 6.2], out: .05, depth: .06, colour: '#d8b048', glow: .12 })),
      { name: 'deep eaves', u: [0, 13.0], h: [6.6, 6.9], out: .5, depth: 1.0, colour: '#b4553d' },
      { name: 'curved red awning', u: [0, 13.0], h: [3.5, 4.4], out: .9, depth: 1.8, colour: '#c8503e' },
      { name: 'brown timber gate', u: [2.0, 5.6], h: [0, 2.0], out: 2.4, depth: .1, colour: '#7a4a38' },
      { name: 'potted topiary', u: [.2, 1.8], h: [0, 1.8], out: 2.2, depth: .8, colour: '#3e6a3a' },
    ],
    backFittings: [
      { name: 'massage parlour front', u: [.4, 12.6], h: [.1, 3.2], colour: '#4a2e2a', glow: .1 },
      { name: 'blank red neon', u: [3.6, 6.2], h: [2.0, 2.8], colour: '#e8303a', glow: .4 },
      { name: 'blank red neon', u: [6.6, 8.2], h: [2.4, 2.9], colour: '#e8303a', glow: .4 },
      { name: 'blank purple neon panel', u: [10.0, 12.0], h: [1.5, 2.8], colour: '#5a3a9a', glow: .3 },
    ],
  }, 13.0, [{ edge: 3, w: 8.321 }, { edge: 1, w: 3.305 }], 3),
};
// The Westerhout Road front (edge 4, u east from the west end to the corner), held flat against the carriageway, and
// the short step between the lane edges.
no44b.sides.push({
  edge: 4, heldFlat: true,
  windows: [[2.5, 4.3], [6.0, 7.8]].map(u => ({ u, h: [4.8, 6.0], panes: 3 })),
  blocks: [
    ...[[2.3, 4.5], [5.8, 8.0]].map(u => ({ name: 'window hood', u, h: [6.0, 6.35], out: .15, depth: .3, colour: '#c8503e' })),
    { name: 'deep eaves', u: [0, 13.32], h: [6.6, 6.9], out: .2, depth: .4, colour: '#b4553d' },
    { name: 'brick boundary wall', u: [0, 9.8], h: [0, .6], out: .1, depth: .2, colour: '#7a5a5a' },
    ...[[.6, 3.0], [3.6, 6.0], [6.6, 9.4]].map(u => ({ name: 'grey wall panel', u, h: [.6, 1.6], out: .1, depth: .2, colour: '#a8aaa8' })),
    { name: 'curved red awning', u: [9.8, 13.32], h: [3.5, 4.4], out: .1, depth: .2, colour: '#c8503e' },
    { name: 'car porch', u: [.3, 9.6], h: [.1, 3.0], out: .02, depth: .04, colour: '#4a4440' },
  ],
}, { edge: 2, blocks: [{ name: 'deep eaves', u: [0, 1.37], h: [6.6, 6.9], out: .2, depth: .4, colour: '#b4553d' }] });

// ---------------------------------------------------------------------------------------------
// East side

// 20. Way 764372540, No. 55, the Lorong 18 east corner at Westerhout Road: a weathered blue three-storey block of
// roughcast walls between cream floor bands, its corner splayed, with a breeze-block stair tower on Westerhout Road; in
// June 2024 it stood empty behind blue hoarding, its windows broken. Its lane face (edge 3, u south from its north end)
// lines up between the two nearest June 2024 lane panoramas on a plaster patch on the source plane; its Westerhout Road
// front (edge 0, u east from the splay) is read on its source plane from the corner's June 2024 panorama. Each face is
// laid on its source edge.
const blue55 = '#3a8aa8', cream55 = '#e0d4a8';
const bands55 = w => [[3.6, 4.1], [7.1, 7.6], [10.3, 10.75]].map(h => ({ name: 'cream floor band', u: [0, w], h, out: .3, depth: .6, colour: cream55 }));
const hoarding55 = (u, out = 1.2) => ({ name: 'blue hoarding', u, h: [0, 2.6], out, depth: .06, colour: '#5a86a8' });
export const no55 = {
  id: 'l18-55', buildingIds: ['764372540'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 18 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 55 Lorong 18 (June 2024 exterior, occupants not identified)', address: '55 Lorong 18 Geylang (the Westerhout Road corner)',
  height: 12.2, ceiling: 3.6, fiveFootWay: 1.8, shellInset: .25, roof: { type: 'flat', colour: '#8f8c86' },
  colours: { wall: blue55, trim: cream55, frame: '#3a4a52', glass: '#2e3a40', pier: blue55, back: '#2e3436', floor: '#a8a296' },
  evidence: 'June 2024 Street View shows a weathered blue three-storey block at the Lorong 18 corner of Westerhout Road: roughcast walls between cream bands at each floor and under the parapet, wide windows on the two upper floors, some of them broken and one bay patched with white plaster, a splayed corner carrying the Westerhout Rd street sign, and on Westerhout Road a stair tower faced with breeze blocks rising above the roof. The ground floor stood empty behind blue corrugated hoarding and a blue gate screened in green. In February 2022 it was occupied, with air-conditioners on its walls. Google Maps lists Kip Inn, a hotel, at 61 Westerhout Road with its point inside this way, and the closed Golden Dragon Hotel and RedDoorz at the same address, but none of their signs is on this block, which is tagged No. 55, and it was empty in 2024, so no name is given. The two nearest June 2024 lane panoramas (Crjq..., RvUa...) agree on the plaster patch on the lane face\'s source plane, and the corner\'s June 2024 panorama (Sen0...) reads the Westerhout Road front on its source plane, so each face is laid on its source edge. Heights were read on those planes: cream bands at 3.6-4.1, 7.1-7.6 and 10.3-10.75 m, windows at 4.8-6.6 and 8.4-10.1 m, the parapet at about 12.2 m and the stair tower to about 13.2 m.',
  sources: [way('764372540'), search('55 Lorong 18 Geylang'), pano('RvUaS2tCvcg1XuXtad5xcg', 85, 15, 75), pano('Sen0U2YhMqlMOvyy54kfpQ', 40, 15, 75), pano('GNek5w3F44WsZnRCjqyOhA', 70, 15, 75), pano('L4MeWEHY46jZa7IHGHfY6w', 330, 15, 75)],
  windows: [[4.8, 6.6], [8.4, 10.1]].flatMap(h => [[.5, 2.3], [3.0, 5.2], [6.7, 8.8], [9.3, 10.4]].map(u => ({ u, h, panes: 3 }))),
  blocks: [
    ...bands55(10.732),
    { name: 'parapet coping', u: [0, 10.732], h: [11.9, 12.2], out: .1, depth: .2, colour: cream55 },
    { name: 'white plaster patch', u: [5.3, 6.6], h: [4.4, 8.2], out: .02, depth: .04, colour: '#d8dcd8' },
    hoarding55([.1, 1.4]), hoarding55([8.3, 10.6]),
    { name: 'blue gate', u: [1.4, 8.3], h: [0, 2.2], out: 1.2, depth: .08, colour: '#4a7aa8' },
    { name: 'green screen on the gate', u: [1.5, 8.2], h: [.2, 1.9], out: 1.25, depth: .02, colour: '#2e6a5a' },
  ],
  backFittings: [{ name: 'empty ground floor', u: [.3, 10.4], h: [.1, 3.4], colour: '#5a5a54', glow: .03 }],
  sides: [{
    edge: 2, // the splay, u from the lane towards Westerhout Road
    windows: [[4.8, 6.6], [8.4, 10.1]].map(h => ({ u: [.8, 3.2], h, panes: 2 })),
    blocks: [...bands55(3.99), { name: 'parapet coping', u: [0, 3.99], h: [11.9, 12.2], out: .1, depth: .2, colour: cream55 }, hoarding55([.1, 3.9]), { name: 'blank street sign', u: [2.6, 3.8], h: [2.9, 3.2], out: .1, depth: .04, colour: '#2e7a4a' }],
  }, {
    edge: 0, // the Westerhout Road front, u east from the splay: the breeze-block stair tower about a third of the way along
    windows: [[4.8, 6.6], [8.4, 10.1]].flatMap(h => [[.4, 3.6], [6.2, 8.4], [8.9, 11.0]].map(u => ({ u, h, panes: 3 }))),
    blocks: [
      ...bands55(11.286).map(b => ({ ...b, u: [0, 4.2] })), ...bands55(11.285).map(b => ({ ...b, u: [5.8, 11.285] })),
      { name: 'parapet coping', u: [0, 11.285], h: [11.9, 12.2], out: .1, depth: .2, colour: cream55 },
      { name: 'breeze-block stair tower', u: [4.2, 5.8], h: [.1, 13.2], out: .3, depth: .6, colour: '#4a90a8' },
      ...Array.from({ length: 30 }, (_, i) => ({ name: 'breeze-block opening', u: [4.4 + (i % 3) * .5, 4.7 + (i % 3) * .5], h: [+(3.8 + Math.floor(i / 3) * .9).toFixed(2), +(4.1 + Math.floor(i / 3) * .9).toFixed(2)], out: .61, depth: .02, colour: '#1e3a44' })),
      hoarding55([.1, 11.2], 1.5),
    ],
  }, {
    edge: 1, blocks: [{ name: 'parapet coping', u: [0, 1.19], h: [11.9, 12.2], out: .1, depth: .2, colour: cream55 }],
  }],
};

export const lorong18 = [leRegal, budgetone, cygon, no16, no18, club20, gofit, no26, no28, no30, no32, no34, no36, no38, no40, no42, no44, no44b, no55];
export const lorong18Frame = laneFrame, lorong18Layout = laneLayout, lorong18Upper = laneUpper, lorong18Reviews = laneReviews, lorong18Sides = laneSides;
