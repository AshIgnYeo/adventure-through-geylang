// June 2024 exteriors on Lorongs 6 and 8, south of Geylang Road, at the south-west edge of the widened study area
// (open question 26). Neither lane is modelled: these fronts are seen down the lanes from Geylang Road, and their
// review starts stand in the lanes. Unnamed unless a listing point inside the way and photographed signage agree.
// Positions come from features triangulated from two or more panoramas of the June 2024 drives along each lane;
// heights are read on that plane. Where a photographed front is wider or narrower than its source front edge, the
// elevation is laid out proportionally on the source edge (heights unscaled), and the source footprint is kept.
const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const range = (a, b, step) => Array.from({ length: Math.round((b - a) / step) + 1 }, (_, i) => +(a + i * step).toFixed(2));
const r2 = v => +v.toFixed(2);
// Keep the parts of an elevation (u ranges along a row) that fall on one way, re-based at its start.
const cut = (items, from, to) => items.flatMap(it => {
  const l = Math.max(it.u[0], from), r = Math.min(it.u[1], to);
  return r - l > .02 ? [{ ...it, u: [r2(l - from), r2(r - from)] }] : [];
});
const cutPiers = (piers, from, to) => cut(piers.map(u => ({ u })), from, to).map(p => p.u);

// No. 1 Lorong 8. Triangulated from cz5N... and OBfb...: the tower front stands 0.4-1.0 m behind the source front and
// runs about 10.3 m, over the source front edge and the 1 m jog at its south end, so the elevation is laid out on the
// 7.95 m front edge at x0.82 (the jog is plain wall). Heights x1.06 about the camera height.
const lexFloors = [[5.3, 7.9], [8.35, 11.15], [11.65, 14.4], [14.8, 17.75], [18.0, 21.0], [21.55, 24.4], [24.9, 28.0]];
const lexSmall = [[6.0, 7.1], [9.0, 10.15], [12.15, 13.4], [15.3, 16.6], [18.6, 19.9], [21.9, 23.25], [25.35, 26.75]];
export const lexHotel = {
  id: 'lex-hotel', buildingIds: ['454438339'], kind: 'lex-hotel', frontEdge: 5, reviewRoad: 'Lorong 8 Geylang', reviewDistance: 13, reviewPitch: 32,
  name: 'Lex Hotel 樂斯旅店 (June 2024 exterior)', address: '1 Lorong 8 Geylang',
  height: 29.5, ceiling: 4.35, fiveFootWay: .6, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Google Maps lists Lex Hotel, a one-star hotel taking bookings in October 2026, at 1 Lor 8 Geylang, Singapore 399073, and its point lies inside source way 454438339, tagged No. 1. June 2024 Street View shows a narrow eight-storey hotel tower behind a small garden and spirit house on the east side of Lorong 8: sky blue up to the fifth storey and pale lavender above, with a column of small windows on its north side, a recessed stair void in the middle, a column of large windows on its south side and a darker blue cornice with two roof aerials. Over the glazed entrance, beside an orange door, a blue canopy carries LEX HOTEL LORONG 8 with orange 樂斯旅店 characters standing on it; the sign names the hotel and is redrawn in original type. Triangulating the tower edges from two panoramas puts its front 0.4-1.0 m behind the source front and about 10.3 m wide, across the 7.95 m source front edge and a 1 m jog at its south end; the elevation is laid out proportionally on that edge and the jog is plain wall. Heights were read on the triangulated plane; the roof is about 29.5 m to ±1.5 m.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Lex+Hotel+1+Lorong+8+Geylang', way('454438339'), pano('OBfb5mkcz3RGANcPTWypJg', 95, 25, 100), pano('cz5NlMOoHLatP47T8bOKPQ', 75, 25, 100), pano('Dk4PFUJi8TDjyxEtSnS0ew', 140, 30, 80)],
  colours: { wall: '#c4cee8', trim: '#e6ebf5', frame: '#3d5a86', glass: '#5d6f80', pier: '#7fb2e5', back: '#7fb2e5', floor: '#b0a59a' },
  bands: [[29.0, 29.5, .3, '#4f7cc4'], [14.7, 14.9, .06, '#e3e9f4']],
  windows: [
    ...lexSmall.map(h => ({ u: [1.31, 2.13], h, panes: 1, surround: true, out: .02 })),
    ...lexFloors.map(h => ({ u: [5.41, 7.38], h, panes: 2, out: .02 })),
  ],
  blocks: [
    { name: 'sky blue lower storeys', u: [0, 7.94], h: [4.35, 14.75], out: .005, depth: .02, colour: '#7fb2e5' },
    ...lexFloors.map(h => ({ name: 'shaded stair void', u: [3.36, 4.84], h, out: .015, depth: .02, colour: '#3f5878' })),
    { name: 'blue entrance canopy', u: [.55, 6.5], h: [4.3, 4.45], out: .6, depth: 1.2, colour: '#2f6fb8' },
    ...[.7, 7.1].map(u => ({ name: 'roof aerial', u: [u, u + .15], h: [29.5, 31.0], out: -.7, depth: .15, colour: '#d8dde6' })),
  ],
  board: { u: [.9, 6.3], h: [4.35, 6.2], out: 1.22 },
  piers: [[.1, .4], [7.6, 7.9]],
  backFittings: [
    { name: 'price banner', u: [1.15, 2.2], h: [1.5, 2.7], colour: '#c43a3a' },
    { name: 'glass entrance doors', u: [2.4, 4.0], h: [.1, 3.2], colour: '#2c3a3c', glow: .15 },
    { name: 'orange door', u: [4.2, 5.1], h: [.1, 2.5], colour: '#d0643a' },
    { name: 'timber panel', u: [5.35, 6.25], h: [.1, 2.4], colour: '#a58a66' },
  ],
};

// Nos. 7A-11A Lorong 8: one cream four-storey block over a car park across three source ways. Triangulated from
// cz5N... and LSA1...: the front stands about 1 m behind the plane of the drive and runs 24.45 m against the 24.64 m
// of the three source front edges, so it is laid out along them (row s from the north end of No. 7A).
// Heights x1.107 about the camera height.
const ROW = { '1223401727': [11.86, 20.0], '1223401726': [20.0, 27.83], '454438338': [27.83, 36.5] };
const creamBays = [[11.97, 15.76], [15.99, 19.67], [20.05, 23.57], [23.91, 27.14]];
const creamFloors = [[5.9, 7.4], [9.1, 10.6], [12.3, 14.05]], creamAwnings = [[7.4, 8.6], [10.75, 11.9], [14.2, 15.7]];
const balconySlabs = [[5.2, 6.1], [8.55, 9.65], [12.1, 13.4]], balconyDoors = [[6.15, 8.3], [9.7, 11.9], [13.45, 15.4]];
const creamRow = {
  windows: [
    ...creamBays.flatMap(([l, r]) => creamFloors.map(h => ({ u: [r2(l + .56), r2(r - .55)], h, panes: 2 }))),
    ...balconyDoors.map(h => ({ u: [28.43, 32.73], h, panes: 4 })),
    ...[[6.15, 7.8], [9.7, 11.3], [12.5, 14.05]].map(h => ({ u: [33.43, 34.73], h, panes: 2 })),
  ],
  blocks: [
    ...creamBays.flatMap(u => creamAwnings.map(h => ({ name: 'red-brown awning', u, h, out: .35, depth: .7, colour: '#99473a' }))),
    ...balconySlabs.map(h => ({ name: 'balcony front', u: [28.03, 33.13], h, out: .5, depth: 1.0, colour: '#ece3d0' })),
    { name: 'projecting roof slab', u: [32.63, 36.5], h: [15.5, 15.9], out: .6, depth: 1.2, colour: '#e4dac6' },
    ...[[.05, .15], [1.75, 1.85]].map(h => ({ name: 'fence rail', u: [11.9, 36.45], h, out: 1.6, depth: .05, colour: '#1f2121' })),
    ...range(12.0, 36.25, .25).map(u => ({ name: 'fence bar', u: [u, r2(u + .03)], h: [.15, 1.75], out: 1.6, depth: .03, colour: '#1f2121' })),
  ],
  piers: [[11.96, 12.3], [15.7, 16.05], [19.6, 19.95], [20.05, 20.4], [23.6, 23.95], [27.2, 27.55], [27.9, 28.25], [32.0, 32.35], [36.1, 36.45]],
  backFittings: [
    { name: 'car park notice wall', u: [18.3, 19.5], h: [.1, 4.8], colour: '#e9ddc6' },
    { name: 'office wall', u: [31.75, 33.8], h: [.1, 4.0], colour: '#e2d6c0' },
    { name: 'office door', u: [32.3, 33.2], h: [.1, 2.4], colour: '#6b4a3a' },
  ],
};
const creamUnit = (id, part) => {
  const [from, to] = ROW[id];
  return {
    id: `l8-${part}`, buildingIds: [id], kind: 'unnamed', unnamed: true, frontEdge: { '1223401727': 6, '1223401726': 5, '454438338': 7 }[id], reviewRoad: 'Lorong 8 Geylang',
    name: `Cream four-storey block over a car park, Lorong 8 Geylang, No. ${part.toUpperCase()} part (June 2024 exterior, occupants not named)`, address: `${part.replace(/-.*/, '').toUpperCase()} Lorong 8 Geylang`,
    height: 16.2, ceiling: 4.95, fiveFootWay: 6.0, shellInset: .2, roof: { type: 'flat', colour: '#9a9893' },
    evidence: 'June 2024 Street View shows one cream four-storey block across source ways 1223401727 (No. 7A) and 1223401726 and 454438338 (both No. 11A) on the east side of Lorong 8: three upper storeys of paired windows under red-brown awnings in four bays, a ground floor open as a private car park behind a black railing fence, and at its south end a section of deep balconies with a projecting roof slab. Gold lettering 機商大廈 is on the second-floor awnings and 新加坡機器廠商公會 on the lowest balcony; Google Maps lists the Singapore Engineering Merchants\' Association at 11A Lor 8 Geylang, but its point lies in the lane outside every source way, so no name is given and the lettering is not drawn (open question 32). Its ends were triangulated from two panoramas: the front stands about 1 m behind the plane of the drive and runs 24.45 m against the 24.64 m of the three source front edges, so the elevation is laid along them; heights were read on that plane.',
    sources: [way(id), pano('1G0pN2cIa19S5RjGAOBikA', 75, 12, 100), pano('cz5NlMOoHLatP47T8bOKPQ', 110, 12, 100), pano('LSA1dt2JpbRjad2UdJAk-w', 60, 12, 100)],
    colours: { wall: '#ebdfc8', trim: '#e2d5bc', frame: '#3b3532', glass: '#3a4145', pier: '#ebdfc8', back: '#4a4642', floor: '#8e8b85' },
    bands: [[15.95, 16.2, .3], [4.95, 5.5, .2]],
    windows: cut(creamRow.windows, from, to), blocks: cut(creamRow.blocks, from, to),
    piers: cutPiers(creamRow.piers, from, to), backFittings: cut(creamRow.backFittings, from, to),
  };
};
export const creamNorth = creamUnit('1223401727', '7a');
export const creamMiddle = creamUnit('1223401726', '11a-north');
export const creamSouth = creamUnit('454438338', '11a-south');

// No. 17B Lorong 8: a pink two-storey house across two source ways. Triangulated from LSA1... and _VUx...: the red
// fascia projects 0.65 m in front of the source front; heights read on that plane need no correction.
const B17 = { '1223401725': [0, 5.68], '454438337': [5.68, 11.64] };
const pinkRow = {
  blocks: [
    { name: 'pink wall head', u: [0, 11.64], h: [4.2, 5.45], out: .005, depth: .02, colour: '#e3b4a0' },
    { name: 'shadowed upper storey', u: [0, 11.64], h: [6.3, 8.6], out: .005, depth: .02, colour: '#5b4d45' },
    { name: 'red corrugated fascia', u: [.3, 11.64], h: [5.45, 6.3], out: .65, depth: .12, colour: '#b5462f' },
    { name: 'yellow slatted screen', u: [1.2, 11.64], h: [6.0, 7.8], out: .3, depth: .05, colour: '#d8b44c' },
    { name: 'roof eave', u: [0, 11.64], h: [8.6, 8.9], out: .35, depth: .7, colour: '#6a4030' },
    { name: 'white fabric canopy', u: [4.1, 11.64], h: [4.2, 4.5], out: 1.4, depth: 2.8, colour: '#e4e4df' },
    { name: 'pink brick boundary wall', u: [0, 5.0], h: [0, 2.4], out: 2.6, depth: .25, colour: '#e5b29d' },
  ],
  backFittings: [
    { name: 'dark doorway and windows', u: [.6, 3.8], h: [1.0, 4.0], colour: '#2f2b29' },
    { name: 'window', u: [6.0, 7.3], h: [2.6, 3.9], colour: '#2f2b29' },
    { name: 'porch opening', u: [9.8, 11.55], h: [.1, 3.9], colour: '#3a3330' },
  ],
};
const pinkUnit = (id, part) => {
  const [from, to] = B17[id];
  return {
    id: `l8-17b-${part}`, buildingIds: [id], kind: 'unnamed', unnamed: true, frontEdge: 5, reviewRoad: 'Lorong 8 Geylang',
    name: `Pink house with a yellow slatted screen, 17B Lorong 8 Geylang, ${part} part (June 2024 exterior)`, address: '17B Lorong 8 Geylang',
    height: 8.9, ceiling: 4.2, fiveFootWay: 1.5, shellInset: .15, roof: { type: 'gable', ridge: 10.6, colour: '#b0583a' },
    // Both centres lie south of the study edge: look at them from starts in the lane further north.
    review: part === 'south' ? [-8, 11] : [-3, 11],
    evidence: 'June 2024 Street View shows a two-storey pink house across source ways 1223401725 and 454438337 (both tagged No. 17B) on the east side of Lorong 8: a ground floor behind a pink brick boundary wall and under a white fabric canopy, a red corrugated fascia, a yellow slatted screen across the shaded upper storey and a dark eave under an orange tiled roof. No name was seen, so none is given. The fascia was triangulated from two panoramas 0.65 m in front of the source front; heights were read on that plane.',
    sources: [way(id), pano('_VUxK5oKz8ZHq64AKWZXbQ', 85, 15, 100), pano('LSA1dt2JpbRjad2UdJAk-w', 75, 15, 100)],
    colours: { wall: '#e3b4a0', trim: '#e9c3b2', frame: '#3a3330', glass: '#3d4144', pier: '#e3b4a0', back: '#e2b19c', floor: '#c9b9a8' },
    blocks: cut(pinkRow.blocks, from, to), backFittings: cut(pinkRow.backFittings, from, to),
    piers: cutPiers([[.1, .4], [5.3, 5.6], [5.8, 6.1], [11.25, 11.55]], from, to),
  };
};
export const pinkNorth = pinkUnit('1223401725', 'north');
export const pinkSouth = pinkUnit('454438337', 'south');

// West side of Lorong 8: the apartment block in way 454438335 (tagged No. 8; the Maps address point for 6 Lor 8
// Geylang lies inside it). Two panoramas disagree on its depth (trees cover the north end), so the symmetric
// 23 m front read on the source plane is centred on the 27.48 m source edge, with plain wall at either end.
const C = 13.74, sym = (l, r) => [[r2(C - r), r2(C - l)], [r2(C + l), r2(C + r)]];
const condoFloors = range(4.0, 20.5, 2.75);
export const lorong8Apartments = {
  id: 'l8-west-apartments', buildingIds: ['454438335'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 8 Geylang', reviewDistance: 14, reviewPitch: 28,
  name: 'Eight-storey apartment block, Lorong 8 Geylang west side (June 2024 exterior)', address: 'Lorong 8 Geylang, west side (Maps address point 6 Lor 8 Geylang)',
  height: 23.2, ceiling: 4.0, fiveFootWay: 3.5, shellInset: .9, upperInset: .1, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'June 2024 Street View shows an eight-storey apartment block of the 1990s set back behind a white boundary wall with zigzag piers, globe lamps and palms on the west side of Lorong 8: grey lower storeys and cream upper storeys with wavy cornices, beige balcony panels in four bay columns, a full-height glazed stair in the centre over a white louvred panel, arched top windows under small gables, and a car park under the building. No name was seen, so none is given. Two panoramas disagree on the depth of the front (trees cover its north end), so the 23 m symmetric front read on the source plane is centred on the 27.48 m source front edge with plain wall at either end; heights were read on that plane to about ±1.5 m. The boundary wall is omitted.',
  sources: [way('454438335'), pano('1G0pN2cIa19S5RjGAOBikA', 255, 18, 100), pano('cz5NlMOoHLatP47T8bOKPQ', 250, 18, 100)],
  colours: { wall: '#ebe5da', trim: '#e0d9cc', frame: '#5b6f86', glass: '#3e4d5a', pier: '#a29d95', back: '#3a3836', floor: '#8e8b85' },
  bands: [[22.95, 23.2, .3]],
  windows: [
    ...sym(2.5, 5.3).flatMap(u => condoFloors.slice(0, 6).map(b => ({ u, h: [b + .9, b + 2.3], panes: 4, out: .02 }))),
    ...sym(2.5, 5.3).map(u => ({ u, h: [21.0, 22.9], panes: 4, arched: true })),
    ...sym(6.4, 9.0).flatMap(u => condoFloors.map(b => ({ u, h: [b + .9, b + 2.3], panes: 4, out: .02 }))),
    ...sym(10.0, 10.8).flatMap(u => condoFloors.map(b => ({ u, h: [b + 1.0, b + 2.2], panes: 1, out: .02 }))),
    ...condoFloors.map(b => ({ u: [r2(C - 1.1), r2(C + 1.1)], h: [b + .15, b + 2.6], panes: 2, out: .1 })),
  ],
  blocks: [
    { name: 'grey lower storeys', u: [r2(C - 11.5), r2(C + 11.5)], h: [4.0, 15.0], out: .005, depth: .02, colour: '#a29d95' },
    ...[...sym(2.5, 5.3), ...sym(6.4, 9.0)].flatMap(u => condoFloors.map(b => ({ name: 'beige balcony panel', u, h: [b + .05, b + .85], out: .25, depth: .5, colour: '#d8c29c' }))),
    ...sym(2.2, 9.4).map(u => ({ name: 'wavy cornice', u, h: [15.0, 15.45], out: .12, depth: .24, colour: '#8a7f72' })),
    { name: 'wavy cornice', u: [r2(C - 2.2), r2(C + 2.2)], h: [10.3, 10.8], out: .12, depth: .24, colour: '#8a7f72' },
    { name: 'white louvred panel', u: [r2(C - .7), r2(C + .7)], h: [4.2, 10.2], out: .18, depth: .06, colour: '#f0eee8' },
    ...sym(2.2, 5.6).map(u => ({ name: 'small gable', u, h: [23.2, 24.6], out: 0, depth: .3, colour: '#ebe5da' })),
    { name: 'stair tower head', u: [r2(C - 1.3), r2(C + 1.3)], h: [23.2, 25.0], out: .05, depth: .3, colour: '#ebe5da' },
  ],
  piers: [...sym(11.3, 11.6), ...sym(5.6, 5.9), [.15, .45], [27.03, 27.33]],
  backFittings: [{ name: 'car park', u: [1.0, 26.4], h: [.1, 3.6], colour: '#3f3d3a' }],
};

// West side of Lorong 6: the block in way 454438334 (tagged No. 8). Triangulated from RTP-... and w1P...: the
// front stands about 0.75 m behind the source front and runs 15.0 m against the 15.72 m source edge, so it is laid
// out along the edge at x1.048. Heights x1.05 about the camera height. Most of the way lies south of the study edge.
const l6Rows = [[4.6, 5.95], [7.75, 9.3], [11.0, 12.35], [14.05, 15.4], [17.2, 18.65], [20.2, 21.5], [23.05, 24.5]];
const l6Slabs = [4.05, 7.1, 10.14, 13.4, 16.4, 19.8, 22.85];
export const lorong6West = {
  id: 'l6-west-block', buildingIds: ['454438334'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 6 Geylang', review: [14.5, 10], reviewPitch: 32,
  name: 'Eight-storey block, Lorong 6 Geylang west side (June 2024 exterior)', address: 'Lorong 6 Geylang, west side',
  height: 26.3, ceiling: 4.05, fiveFootWay: 3.0, shellInset: .5, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'June 2024 Street View shows a white eight-storey block on the west side of Lorong 6: cream-yellow lower storeys at its south end, slab bands at every floor, green-framed windows and two full-height green glazing strips on its north half, small windows and recessed balconies on its south half, whose roof rises higher with open frames, and a car porch on round columns under the building. No name was seen, so none is given. Its ends were triangulated from two panoramas: the front stands about 0.75 m behind the source front and runs 15.0 m against the 15.72 m source edge, so it is laid out along that edge; heights were read on that plane.',
  sources: [way('454438334'), pano('RTP-AGnynpEu6-9T9lAxuA', 270, 20, 100), pano('w1P_X09EBE9Amq98c9OUiA', 240, 20, 100)],
  colours: { wall: '#eceae3', trim: '#e2e0d8', frame: '#3f6a55', glass: '#4d5a5a', pier: '#eceae3', back: '#46433f', floor: '#9a958c' },
  bands: l6Slabs.map(y => [r2(y - .1), r2(y + .1), .15]),
  windows: [
    ...[[9.22, 10.17], [11.32, 12.16]].flatMap(u => l6Rows.map(h => ({ u, h, panes: 2 }))),
    ...l6Rows.map(h => ({ u: [3.04, 3.56], h, panes: 1, out: .02 })),
  ],
  blocks: [
    { name: 'cream-yellow lower storeys', u: [0, 7.2], h: [4.05, 7.1], out: .005, depth: .02, colour: '#e8ddb5' },
    ...l6Slabs.slice(0, 6).map(b => ({ name: 'recessed balcony', u: [5.55, 7.13], h: [r2(b + .15), r2(b + 2.8)], out: .015, depth: .02, colour: '#55524c' })),
    { name: 'green glazing strip', u: [7.44, 8.28], h: [4.1, 21.5], out: .02, depth: .04, colour: '#35574a' },
    { name: 'green glazing strip', u: [13.52, 14.36], h: [4.1, 24.5], out: .02, depth: .04, colour: '#35574a' },
    { name: 'raised south roof', u: [.1, 7.2], h: [26.3, 27.9], out: -.1, depth: .2, colour: '#eceae3' },
  ],
  piers: [[.15, .5], [7.0, 7.35], [15.2, 15.55]],
  backFittings: [{ name: 'car porch', u: [7.4, 15.1], h: [.1, 3.6], colour: '#4a4742' }, { name: 'lobby', u: [.6, 6.8], h: [.1, 3.6], colour: '#d9cfa8' }],
};

// East side of Lorong 6: Crystal Mansions, in way 454274483 (tagged No. 3). Its front repeats a 14 m bay pattern,
// read from five June 2024 panoramas through heavy tree cover; heights are read on the source plane to about ±1.5 m.
// Only its north 13 m lies inside the study bounds.
const cmSlabs = [4.5, 8.0, 11.6, 15.1, 18.7], P = 14.0, W = 56.65;
const cmBays = range(0, 42, P);
const cmRow = {
  windows: cmBays.flatMap(o => [
    ...cmSlabs.map(b => ({ u: [o + .9, o + 4.4], h: [b + .3, b + 2.6], panes: 4, out: .02 })),
    { u: [o + 1.6, o + 3.7], h: [22.8, 24.3], panes: 2, arched: true, out: .12 },
    ...cmSlabs.map(b => ({ u: [o + 5.9, o + 7.2], h: [b + .9, b + 2.2], panes: 2 })),
    ...cmSlabs.map(b => ({ u: [o + 8.3, o + 10.7], h: [b + 1.1, b + 2.6], panes: 3 })),
    ...cmSlabs.map(b => ({ u: [o + 11.7, o + 13.4], h: [b + .9, b + 2.2], panes: 2 })),
  ]),
  blocks: [
    ...cmBays.flatMap(o => [
      { name: 'grey bay frame', u: [o, o + 5.3], h: [4.4, 22.6], out: .005, depth: .02, colour: '#6e6e6c' },
      { name: 'grey arched gable', u: [o + .4, o + 4.9], h: [22.6, 25.0], out: .1, depth: .2, colour: '#6e6e6c' },
      ...cmSlabs.map(b => ({ name: 'balcony slab', u: [o + .4, o + 4.9], h: [b - .15, b + .05], out: .3, depth: .6, colour: '#e6e6e2' })),
      ...cmSlabs.map(b => ({ name: 'balcony railing', u: [o + .5, o + 4.8], h: [b + .05, b + 1.1], out: .58, depth: .04, colour: '#d9dcdc' })),
      ...cmSlabs.map(b => ({ name: 'green panel', u: [o + 7.9, o + 11.1], h: [b + .1, b + 1.0], out: .1, depth: .2, colour: '#b7c88a' })),
      { name: 'small grey gable', u: [o + 8.1, o + 10.9], h: [22.6, 23.8], out: .05, depth: .2, colour: '#6e6e6c' },
    ]),
    { name: 'grey boundary wall', u: [0, W], h: [0, 2.2], out: 3.0, depth: .25, colour: '#77777a' },
  ],
};
export const crystalMansions = {
  id: 'l6-crystal-mansions', buildingIds: ['454274483'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 6 Geylang', review: [6, 11], reviewPitch: 25,
  name: 'Apartment block signed Crystal Mansions, 3 Lorong 6 Geylang (June 2024 exterior)', address: '3 Lorong 6 Geylang',
  height: 22.6, ceiling: 4.4, fiveFootWay: 4.0, shellInset: .2, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'June 2024 Street View shows a white six-storey apartment block 56 m long behind a grey boundary wall on the east side of Lorong 6, lettered Crystal Mansions 3 LOR 6 on the wall: grey-framed bays of balconies with steel railings under arched gables, white bays with small windows and air-conditioning units, and bays of green panels under small grey gables, over a car park on columns. Google Maps lists Crystal Mansions at 3 Lor 6 Geylang, but its point lies 0.5 m outside source way 454274483, so no name is given and the wall lettering is not drawn (open question 32). The bay pattern repeats about every 14 m; it was read through heavy tree cover from five panoramas, and heights on the source plane carry about ±1.5 m. Only the north 13 m lies inside the study bounds.',
  sources: [way('454274483'), pano('w1P_X09EBE9Amq98c9OUiA', 100, 20, 100), pano('ME8QKQ0HaOO9CBheWmGPvQ', 70, 20, 100), pano('dFdi9EVX06KFJGLCcTOasg', 60, 20, 100)],
  colours: { wall: '#f0f0ee', trim: '#e2e2de', frame: '#4a4a48', glass: '#3d4446', pier: '#f0f0ee', back: '#3d3c3a', floor: '#8e8b85' },
  bands: [[22.35, 22.6, .3]],
  windows: cut(cmRow.windows, 0, W), blocks: cut(cmRow.blocks, 0, W),
  piers: range(.2, 56.2, 7.0).map(u => [u, r2(u + .4)]),
  backFittings: [{ name: 'car park', u: [.5, 56.1], h: [.1, 3.8], colour: '#3f3d3a' }],
};

export const ringSouth = [lexHotel, creamNorth, creamMiddle, creamSouth, pinkNorth, pinkSouth, lorong8Apartments, lorong6West, crystalMansions];
