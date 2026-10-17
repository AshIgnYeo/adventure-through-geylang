// Lorong 18 between Geylang Road and Westerhout Road (open question 71), built one building at a time as Lorong 21 was:
// the Geylang Road block back to Lorong 16 first, then south down the west side, then north up the east side. Each
// elevation is read on the plane where the panoramas agree, and laid on its source edge, which is kept. Named only where
// a listing and a photographed sign agree. See docs/lorong-18-brief.md.
import { pano, way, search, lay, sliceSpec, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

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

export const lorong18 = [leRegal];
export const lorong18Frame = laneFrame, lorong18Layout = laneLayout, lorong18Upper = laneUpper, lorong18Reviews = laneReviews, lorong18Sides = laneSides;
