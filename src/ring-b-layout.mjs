// June 2024 exteriors on Lorong 12 south of Geylang Road, in the widened study area (open question 26): the
// east side from the back lane to No. 9 and the west side from the garden house to No. 12. Named only where a listing
// point lies inside the way and its sign was photographed; signage elsewhere is recorded and the boards are blank.
// Positions come from features triangulated from two or more June 2024 panoramas of one drive, whose positions
// agree with the source fronts of Summer View and the hotel to about 1 m; heights are read on those planes.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const range = (a, b, step) => Array.from({ length: Math.round((b - a) / step) + 1 }, (_, i) => +(a + i * step).toFixed(2));
const grid = (us, hs, extra = {}) => us.flatMap(u => hs.map(h => ({ u, h, ...extra })));
// Windows over a colour field (a thin block 5-15 mm proud of the wall) stand 2 cm out so their glazing shows.

// East side, first plot south of the back lane (frame runs south from the lane corner, facing west). One source
// way holds two buildings: the white apartment tower on the north 10.5 m and the blue hotel on the south 10.3 m.
// The hotel's window pairs agree between two panoramas 0.6-1.1 m in front of the source front, with its edge to the
// tower at u 10.5 m; the tower's windows agree 3.3-4.4 m behind it, behind a front yard. Both are kept on the source
// front: the outline stands at the hotel's parapet and the tower rises from it as one block.
const towerFloors = range(4.8, 27.55, 3.25);
export const towerHotel = {
  id: 'l12-tower-hotel', buildingIds: ['454438320'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 12 Geylang',
  name: 'White apartment tower and blue hotel, Lorong 12 Geylang east side (June 2024 exterior, occupants not named)', address: 'Lorong 12 Geylang, east side, first plot south of the back lane behind Geylang Road',
  height: 15.2, ceiling: 4.0, fiveFootWay: 1.2, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Source way 454438320 holds two buildings in June 2024 Street View. On the north 10.5 m stands a white nine-storey apartment tower of the 1970s-80s with glazed bay windows, curved balcony slabs and small side windows, behind a beige boundary wall and a front yard; its roof is about 29.8 m up, with a small roof structure to about 31.5 m. On the south 10.3 m stands a lavender-blue four-storey hotel with two windows per floor under white hoods, a raised parapet, a white band carrying a HOTEL 81 board over a blue entrance canopy and marble cladding, and a vertical HOTEL 81 CHERRY sign. Hotel 81 - Cherry is listed with its point in the south half of this way, but the way also holds the apartment tower, so no name is given and the boards are blank until it is split (open question 31). The tower edge was placed by a sightline from a third panorama along the back lane, and the hotel window pairs and the tower windows were matched between two June 2024 panoramas: the hotel stands 0.6-1.1 m in front of the source front and the tower 3.3-4.4 m behind it. Both are kept on the source front. Heights were read on those planes.',
  sources: [way('454438320'), pano('559fKnpX1RXdwqncH_ARjg', 95, 25, 100), pano('Sj3p3C81JURiJj2JD8dEKQ', 70, 25, 100), pano('CZ9orFWlq7AVVaWKYcs0wA', 95, 25, 100), pano('yErHLkVzU3QvkD32ZvT1jA', 120, 20, 100)],
  colours: { wall: '#e8e7e1', trim: '#f1f0ec', frame: '#3d4446', glass: '#4a5654', pier: '#e8e7e1', back: '#3a3633', floor: '#a39b90' },
  windows: [
    // Tower: a glazed bay and a small side window on each upper floor (the lower ones sit on the outline front).
    ...towerFloors.map(y => ({ u: [1.5, 6.3], h: [y, y + 2.0], panes: 4, out: .45 })),
    ...towerFloors.map(y => ({ u: [7.4, 8.3], h: [y + .5, y + 1.5], panes: 1 })),
    // Hotel: two windows a floor under white hoods.
    ...grid([[11.7, 12.75], [14.65, 15.7]], [[5.4, 7.0], [8.6, 10.1], [11.7, 13.0]], { panes: 2, surround: true, out: .02 }),
  ],
  blocks: [
    { name: 'tower upper storeys', u: [.15, 10.5], h: [15.2, 29.8], out: -10, depth: 20, colour: '#e8e7e1' },
    { name: 'tower roof cap', u: [0, 10.5], h: [29.6, 29.9], out: -.1, depth: .3, colour: '#dcdad3' },
    { name: 'tower roof structure', u: [7.5, 10.0], h: [29.8, 31.5], out: -2.5, depth: 4, colour: '#dcdad3' },
    ...towerFloors.map(y => ({ name: 'bay window frame', u: [1.4, 6.4], h: [y - .05, y + 2.05], out: .2, depth: .4, colour: '#dcdad3' })),
    ...towerFloors.map(y => ({ name: 'curved balcony slab', u: [.2, 7.0], h: [y - .35, y - .15], out: .55, depth: 1.1, colour: '#dcdad3' })),
    { name: 'beige boundary wall', u: [.1, 10.4], h: [0, 2.1], out: .2, depth: .25, colour: '#d6b6a0' },
    { name: 'blue hotel wall', u: [10.5, 20.8], h: [4.0, 15.2], out: .005, depth: .02, colour: '#a5aedb' },
    { name: 'hotel parapet cap', u: [10.5, 20.8], h: [15.0, 15.25], out: .1, depth: .25, colour: '#f1f0ec' },
    { name: 'raised hotel parapet', u: [11.4, 14.3], h: [15.2, 16.2], out: -.15, depth: .3, colour: '#a5aedb' },
    { name: 'drain pipes', u: [10.6, 10.9], h: [4.8, 15.0], out: .08, depth: .1, colour: '#c9d0e6' },
    { name: 'white band', u: [10.8, 20.6], h: [4.0, 4.8], out: .3, depth: .6, colour: '#f1f0ec' },
    { name: 'blank teal board', u: [14.4, 17.0], h: [4.1, 4.65], out: .62, depth: .04, colour: '#2a9aa8' },
    { name: 'blue entrance canopy', u: [14.2, 17.7], h: [3.0, 3.35], out: .55, depth: 1.1, colour: '#2b4a8a' },
    { name: 'blank vertical sign', u: [18.9, 19.8], h: [7.3, 14.0], out: .35, depth: .2, colour: '#2a9aa8' },
  ],
  piers: [[0, .3], [10.3, 10.7], [20.5, 20.8]],
  backFittings: [
    { name: 'tower ground floor', u: [.3, 10.3], h: [.1, 3.5], colour: '#cdb9a6' },
    { name: 'marble cladding', u: [12.0, 14.3], h: [.1, 3.9], colour: '#a08676' },
    { name: 'hotel entrance', u: [14.4, 16.1], h: [.1, 2.9], colour: '#262a2c', glow: .08 },
    { name: 'blue ground-floor wall', u: [16.1, 18.2], h: [.1, 3.9], colour: '#a5aedb' },
    { name: 'white door', u: [18.2, 19.0], h: [.1, 2.4], colour: '#eeeeea' },
    { name: 'glass-block panel', u: [19.3, 20.2], h: [.6, 3.0], colour: '#c9d5dc' },
  ],
};

// The three-storey pair south of the hotel. On a plane 2.1 m behind the source front, where three panoramas agree,
// the pair runs 15.0 m with its party pier 7.4 m from the hotel; the source way is 9.05 m, so the photographed
// elevation is laid out proportionally on it (heights unscaled).
const P = s => +((s - 20.2) * 9.05 / 15.0).toFixed(2);
const pu = (a, b) => [P(a), P(b)];
export const associationPair = {
  id: 'l12-pair', buildingIds: ['454438319'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 12 Geylang',
  name: 'Three-storey pair south of the blue hotel, Lorong 12 Geylang east side (June 2024 exterior, occupants not named)', address: 'Lorong 12 Geylang, east side, between the blue hotel and No. 5',
  height: 10.9, ceiling: 4.0, fiveFootWay: 1.8, roof: { type: 'gable', ridge: 12.2, colour: '#8d9296' },
  evidence: 'June 2024 Street View shows a cream three-storey pair under a corrugated metal roof between the blue hotel and Summer View, hung with association boards: on the north house SINGAPORE MASTER TAILORS\' ASSOCIATION over a brown awning and a dark grilled balcony, and a beige PEK SAN CHEN LEAN TUAN board over the shopfront; on the south house a red banner, a clan society board, a timber lattice screen and a dark CHINESE EATING HOUSE OWNERS\' ASSOCIATION board. The Singapore Master Tailors\' Association (3C) and the Chinese Eating House Owners\' Association (10C) are listed with points inside this way, but their unit addresses suggest upper-floor premises in a pair that photographs wider than the way, so no name is given and the boards are blank (open question 31). On a plane 2.1 m behind the source front, where three June 2024 panoramas agree, the pair is 15.0 m wide against the 9.05 m source way (it runs on over the gap to No. 5), so the elevation is laid out proportionally on the source front with heights as measured.',
  sources: [way('454438319'), pano('lT3dORajjUiKfkr3nsCKHQ', 76, 15, 90), pano('ZFIGMrMwtbWEgbO3OXyNug', 40, 15, 90), pano('Sj3p3C81JURiJj2JD8dEKQ', 110, 15, 90)],
  colours: { wall: '#e8e3d3', trim: '#dfd9c7', frame: '#3a3a36', glass: '#3c4447', pier: '#e8e3d3', back: '#3a3633', floor: '#a39b90' },
  bands: [[10.7, 10.9, .5, '#9a9ea0'], [7.6, 7.8, .15], [4.0, 4.3, .2]],
  windows: [
    { u: pu(22.3, 26.8), h: [9.0, 10.2], panes: 4 }, { u: pu(21.0, 22.0), h: [9.0, 9.8], panes: 1 }, { u: pu(27.0, 28.0), h: [9.1, 9.9], panes: 1 },
    { u: pu(28.3, 29.3), h: [9.3, 10.2], panes: 1 }, { u: pu(27.2, 28.0), h: [5.8, 6.8], panes: 1 }, { u: pu(34.2, 35.1), h: [6.0, 7.0], panes: 1 },
  ],
  blocks: [
    { name: 'blank white board', u: pu(22.0, 26.7), h: [7.85, 8.8], out: .08, depth: .04, colour: '#f2f1ec' },
    { name: 'brown awning', u: pu(22.0, 26.7), h: [7.5, 7.8], out: .3, depth: .6, colour: '#8a4a3a' },
    { name: 'dark grilled balcony', u: pu(22.0, 26.7), h: [5.2, 7.5], out: .005, depth: .02, colour: '#2c2a28' },
    { name: 'blank beige board', u: pu(22.2, 26.7), h: [4.3, 5.2], out: .08, depth: .04, colour: '#d9cdb0' },
    { name: 'blank red banner', u: pu(29.5, 33.7), h: [9.5, 10.6], out: .06, depth: .03, colour: '#b32a2a' },
    { name: 'blank white board', u: pu(29.5, 34.2), h: [8.2, 9.3], out: .08, depth: .04, colour: '#f2f1ec' },
    { name: 'timber lattice screen', u: pu(29.7, 34.2), h: [5.8, 7.3], out: .05, depth: .05, colour: '#b0703e' },
    { name: 'blank dark board', u: pu(29.7, 34.3), h: [4.8, 5.75], out: .08, depth: .04, colour: '#2b2422' },
    { name: 'white canopy', u: [.3, 4.35], h: [3.7, 4.0], out: .5, depth: 1.0, colour: '#ecebe6' },
    { name: 'white canopy', u: [4.6, 8.8], h: [4.0, 4.3], out: .5, depth: 1.0, colour: '#ecebe6' },
  ],
  piers: [[0, .25], [4.33, 4.6], [8.8, 9.04]],
  backFittings: [
    { name: 'glazed shopfront', u: [.4, 4.2], h: [.1, 3.5], colour: '#3e474b', glow: .1 },
    { name: 'grilled shopfront', u: [4.7, 8.7], h: [.1, 3.6], colour: '#5a5d5a' },
  ],
};

// Summer View, No. 5: triangulated, its south end lies 0.8 m inside the source corner and its north roof corner
// 1.5 m from the north corner, both on the source front; the pediment apex stands about 1.5 m behind it.
const svRows = [[4.3, 6.4], [7.6, 9.6], [10.8, 12.7], [13.8, 15.8], [17.0, 18.8], [20.1, 22.1], [23.4, 25.5]];
export const summerView = {
  id: 'summer-view', buildingIds: ['121873028'], kind: 'summer-view', frontEdge: 2, reviewRoad: 'Lorong 12 Geylang',
  name: 'Summer View (June 2024 exterior)', address: '5 Lorong 12 Geylang',
  height: 27.0, ceiling: 3.5, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#a59d92' },
  evidence: 'Source way 121873028 is tagged No. 5. June 2024 Street View shows an eight-storey apartment block with SUMMER VIEW lettering over its open car porch and a 5 on the gate pier: a mauve two-storey podium with diamond ornaments, cream upper floors, six window columns (wide windows at the ends, recessed balconies with green metal railings in the middle), and a raised centre with a small pediment. Google Maps lists SUMMERVIEW, an apartment complex at 5B Lor 12 Geylang, Singapore 398986, with its point inside this source way, so the lettering names the block; it is redrawn in original type. Triangulation puts its south end 0.8 m inside the source corner and its north roof corner 1.5 m from the north corner, both on the source front. Heights were read on that plane from three panoramas, scaled to the roof corner triangulated at about 27 m.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Summerview+5B+Lorong+12+Geylang', way('121873028'), pano('ZFIGMrMwtbWEgbO3OXyNug', 110, 25, 90), pano('V6UiR_l1fs3yFV2A96qQOw', 100, 25, 90), pano('lT3dORajjUiKfkr3nsCKHQ', 120, 40, 60)],
  colours: { wall: '#e9dfcf', trim: '#efe7d9', frame: '#e8e6e0', glass: '#4a6a8a', pier: '#c9b4b0', back: '#3a3735', floor: '#a49e95' },
  bands: [[26.7, 27.0, .4], [10.1, 10.4, .3, '#b29b9b']],
  windows: [
    ...grid([[2.3, 5.4], [20.75, 23.9]], svRows, { panes: 3, out: .02 }),
    ...grid([[7.0, 8.6], [18.25, 19.8]], svRows, { panes: 1, out: .02 }),
    ...grid([[9.8, 12.9], [13.9, 17.0]], svRows, { panes: 4, out: .02 }),
  ],
  blocks: [
    { name: 'mauve podium', u: [1.6, 25.0], h: [3.5, 10.1], out: .005, depth: .02, colour: '#bea9a8' },
    ...[[9.6, 13.1], [13.7, 17.2]].flatMap(u => svRows.map(([b]) => ({ name: 'balcony railing', u, h: [b, b + 1.0], out: .05, depth: .05, colour: '#5e7b70' }))),
    ...[[2.1, 5.6], [20.55, 24.1]].flatMap(u => svRows.map(([b]) => ({ name: 'window ledge', u, h: [b - .35, b - .1], out: .25, depth: .5, colour: '#efe7d9' }))),
    ...[[6.3, 6.7], [17.4, 17.8]].map(u => ({ name: 'pilaster', u, h: [3.5, 27.0], out: .1, depth: .2, colour: '#efe7d9' })),
    { name: 'raised centre', u: [7.5, 19.3], h: [27.0, 28.5], out: -.3, depth: .6, colour: '#e9dfcf' },
    { name: 'pediment', u: [12.0, 14.8], h: [28.5, 29.4], out: -.3, depth: .6, colour: '#e9dfcf' },
    { name: 'pediment', u: [12.7, 14.1], h: [29.4, 30.3], out: -.3, depth: .6, colour: '#e9dfcf' },
  ],
  // Raised bronze letters on the podium over the porch, centred on the north balcony column.
  board: { u: [10.2, 12.5], h: [3.62, 3.95], out: .04 },
  piers: [[1.6, 2.0], [8.5, 8.9], [17.6, 18.0], [24.6, 25.0]],
  backFittings: [{ name: 'car porch', u: [2.0, 24.6], h: [.1, 3.3], colour: '#4a4440' }],
};

// No. 9 and the tiled house south of it, both on source way 454438321 (frame runs south, facing west). The
// condominium's corners and green stair strip triangulate 8-10 m in front of the source front (the way appears to
// be an older trace); its front is kept on the source front over the north 18 m, the rest under the tiled roof.
const condoFloors = range(4.6, 28.6, 3.0);
export const no9 = {
  id: 'l12-9', buildingIds: ['454438321'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 12 Geylang',
  review: { at: [1, 16], pitch: 30 },
  name: 'Condominium at No. 9 Lorong 12 Geylang and the tiled house beyond (June 2024 exterior, not named)', address: '9 Lorong 12 Geylang',
  height: 4.2, ceiling: 3.0, fiveFootWay: 1.5, roof: { type: 'hip', ridge: 6.6, colour: '#b4553c' },
  evidence: 'June 2024 Street View shows a modern ten-storey white condominium behind a teal fence with a 9 Lorong 12 plate at its gate: each floor has a balcony with grey horizontal louvre screens and glass balustrades, split by a full-height teal glazed stair strip, with a blank white south wall. South of it a single-storey house with a red corrugated roof stands behind a gate. Source way 454438321 spans both. Triangulating the condominium\'s south-west corner and stair strip from June 2024 panoramas puts its front 8-10 m in front of the source front, while the same drive agrees with No. 5\'s source front to 1 m, so the way looks like an older trace; registered satellite imagery shows the flat roof with a pool over the north half of the way and the tiled roof over the south half. The model keeps the source front: the condominium rises over the north 18 m, about 31.5 m high (from a sightline at about 21 m range), and the tiled house fills the rest. Most of the way lies south of the study edge.',
  sources: [way('454438321'), pano('XnM3pDsxaW6ZR15IbMPLlg', 90, 30, 100), pano('nk8TBnq7sZd3IJKPqfYYcQ', 75, 20, 100), pano('d5vQyzeouL-IdSaMiWVR5Q', 90, 30, 100), pano('16beRBFmUrrhPm8nBsaNiw', 35, 25, 90), pano('Mfo69y2Gp1Eg8uvjBrP8QA', 75, 20, 100)],
  colours: { wall: '#ecebe6', trim: '#e2e1dc', frame: '#3a3e40', glass: '#3e474b', pier: '#ecebe6', back: '#3a3735', floor: '#a49e95' },
  blocks: [
    { name: 'condominium', u: [.2, 18.0], h: [4.2, 31.5], out: -11, depth: 22, colour: '#ecebe6' },
    { name: 'condominium roof edge', u: [0, 18.0], h: [31.2, 31.6], out: -.15, depth: .3, colour: '#e2e1dc' },
    ...condoFloors.flatMap(y => [[.4, 8.9], [10.5, 17.6]].map(u => ({ name: 'balcony slab', u, h: [y - .25, y], out: .5, depth: 1.0, colour: '#f2f2ef' }))),
    ...condoFloors.flatMap(y => [[.8, 8.6], [10.8, 17.3]].map(u => ({ name: 'grey louvre screen', u, h: [y, y + 2.2], out: .05, depth: .05, colour: '#8e918f' }))),
    ...condoFloors.flatMap(y => [[.4, 8.9], [10.5, 17.6]].map(u => ({ name: 'glass balustrade', u, h: [y, y + 1.0], out: .95, depth: .03, colour: '#b9ced0' }))),
    { name: 'teal glazed stair strip', u: [8.9, 10.5], h: [3.0, 31.0], out: .15, depth: .3, colour: '#2f8f78' },
  ],
  piers: [[0, .3], [17.8, 18.2], [34.28, 34.58]],
  backFittings: [
    { name: 'condominium lobby', u: [.5, 17.5], h: [.1, 2.8], colour: '#4a4f50', glow: .05 },
    { name: 'house front', u: [18.5, 34.0], h: [.1, 2.7], colour: '#d8d4c8' },
    { name: 'timber door', u: [24.0, 25.0], h: [.1, 2.3], out: .01, colour: '#7a5a3e' },
    { name: 'grilled window', u: [26.5, 29.0], h: [1.0, 2.3], out: .01, colour: '#5a5d5a' },
  ],
};

// West side, the garden house set back behind a wall (frame runs north, facing east).
export const gardenHouse = {
  id: 'l12-garden-house', buildingIds: ['454438327'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 12 Geylang',
  name: 'Garden house on the west side of Lorong 12 Geylang (June 2024 exterior, occupant not identified)', address: 'Lorong 12 Geylang, west side, behind a garden wall north of No. 12',
  height: 4.0, ceiling: 3.0, fiveFootWay: 2.5, roof: { type: 'hip', ridge: 6.8, colour: '#7a3e34' },
  evidence: 'Source way 454438327 stands about 16 m back from the Lorong 12 kerb. June 2024 Street View shows only a white blockwork garden wall with a timber gate, an open shed with a corrugated roof and a dark red tiled roof behind trees; registered satellite imagery shows a hipped tiled roof over the way. The gate post carries a 6 plate lettered thedesignerds and an 8 DOORS sign, and the shed is glazed as a showroom; The Designerds Pte Ltd (an interior designer) and Haus At Six are listed at 6 Lor 12 Geylang, but the listing point lies by the lane outside every source way and the signs are on the gate, so no name is given. Heights are estimated from roof sightlines at about 18 m and carry about ±1 m; the walls and openings are not seen and are kept plain.',
  sources: [way('454438327'), pano('lT3dORajjUiKfkr3nsCKHQ', 255, 12, 100), pano('ZFIGMrMwtbWEgbO3OXyNug', 270, 10, 100)],
  colours: { wall: '#ecebe5', trim: '#e2e1dc', frame: '#3a3e40', glass: '#3e474b', pier: '#ecebe5', back: '#4a4440', floor: '#9a978f' },
  piers: [[0, .3], [7.2, 7.5]],
  backFittings: [{ name: 'shaded veranda', u: [.4, 7.1], h: [.1, 2.8], colour: '#5a524a' }],
};

// West side, the four-storey block north of No. 12 (frame runs north, facing east). Matching its window and fin
// positions between two panoramas puts the façade 2.1 m in front of the source front and 12.3 m wide against
// the 12.18 m source way; it is kept on the source front.
const finU = [3.5, 4.6, 5.65, 6.45, 7.5, 8.6];
export const westBlock = {
  id: 'vintage-and-vine', buildingIds: ['1223129485'], kind: 'vintage-and-vine', frontEdge: 1, reviewRoad: 'Lorong 12 Geylang',
  name: 'Vintage & Vine (June 2024 exterior)', address: '10 Lorong 12 Geylang',
  height: 12.4, ceiling: 4.0, fiveFootWay: 2.5, roof: { type: 'flat', colour: '#9c6e58' },
  evidence: 'June 2024 Street View shows a white four-storey block of the 1960s-70s with a framed upper façade: six grey vertical fins over pairs of small windows in the middle, larger windows to each side under pale yellow sunshades, and a thin roof slab. The ground floor is recessed behind columns, with a VINTAGE & VINE board over a glazed shopfront and cars parked in front. Google Maps lists Vintage & Vine, a fine wine and spirits wholesaler open in October 2026, at 10 Lor 12 Geylang, Singapore 398991, with its point inside this source way, so the board names the ground-floor shop; it is redrawn in original type. No claim is made about the upper floors. Matching the windows and fins between two June 2024 panoramas puts the façade 2.1 m in front of the source front and 12.3 m wide against the 12.18 m way; it is kept on the source front. Heights are the mean of the two panoramas, which differ by up to 1 m at the roof.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Vintage+%26+Vine+10+Lorong+12+Geylang', way('1223129485'), pano('V6UiR_l1fs3yFV2A96qQOw', 265, 15, 100), pano('ZFIGMrMwtbWEgbO3OXyNug', 245, 15, 100), pano('XnM3pDsxaW6ZR15IbMPLlg', 290, 15, 100)],
  colours: { wall: '#ecebe6', trim: '#ecebe6', frame: '#2e3234', glass: '#3c4649', pier: '#ecebe6', back: '#3a3735', floor: '#a39b90' },
  bands: [[12.0, 12.4, .8]],
  windows: [
    ...grid([[1.1, 2.6], [9.6, 11.0]], [[5.2, 6.75], [8.3, 9.9]], { panes: 3 }),
    ...grid([[3.8, 4.5], [4.8, 5.5], [6.6, 7.4], [7.65, 8.4]], [[5.1, 6.1], [8.25, 9.25]], { panes: 1 }),
  ],
  blocks: [
    ...finU.map(u => ({ name: 'grey fin', u: [u - .1, u + .1], h: [4.3, 11.6], out: .3, depth: .6, colour: '#9aa3a8' })),
    ...[[.15, 3.3], [8.9, 12.0]].flatMap(u => [[7.4, 7.75], [4.0, 4.4]].map(h => ({ name: 'yellow sunshade', u, h, out: .5, depth: 1.0, colour: '#e6dc9a' }))),
    { name: 'frame pilaster', u: [0, .3], h: [4.0, 12.0], out: .25, depth: .5, colour: '#ecebe6' },
    { name: 'frame pilaster', u: [11.87, 12.17], h: [4.0, 12.0], out: .25, depth: .5, colour: '#ecebe6' },
    { name: 'canopy', u: [0, 12.17], h: [3.75, 4.0], out: .7, depth: 1.4, colour: '#ecebe6' },
  ],
  piers: [[.4, .7], [11.5, 11.8]],
  // The shop board over the glazing at the back of the recessed ground floor.
  board: { u: [2.4, 6.4], h: [2.98, 3.6], out: -2.4 },
  backFittings: [
    { name: 'side door', u: [.6, 1.9], h: [.1, 2.4], colour: '#2a2a2a' },
    { name: 'shop glazing', u: [2.4, 6.4], h: [.1, 2.95], colour: '#3e474b', glow: .1 },
    { name: 'dark glazing', u: [6.4, 9.4], h: [.1, 3.5], colour: '#2a2f31' },
  ],
};

// No. 12: its east side is two collinear source edges, framed as one front running north from the south corner.
// Triangulating the south-east corner from two panoramas puts the façade 1.4 m behind the source front.
const yjColumns = [[1.0, 2.3], [3.2, 4.5], [7.4, 8.8], [10.3, 11.7], [13.0, 14.4], [15.9, 17.3], [19.6, 20.9], [21.6, 22.9], [25.0, 26.7], [27.8, 29.4], [30.7, 32.2], [33.4, 34.9], [36.6, 38.1], [39.1, 40.7]];
const yjRows = [[4.6, 6.1], [8.0, 9.4], [10.9, 12.3], [13.7, 15.2], [16.6, 18.0], [19.5, 20.9], [22.2, 23.8]];
export const no12 = {
  id: 'yaju-hotel', buildingIds: ['121873031'], kind: 'yaju-hotel', frontSpan: [1, 3], reviewRoad: 'Lorong 12 Geylang',
  review: { at: [38, 14], pitch: 28 },
  name: 'Ya Ju Hotel 雅居酒店 (June 2024 exterior)', address: '12 Lorong 12 Geylang',
  height: 25.6, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Source way 121873031 is tagged No. 12. June 2024 Street View shows an eight-storey white hotel block with grey-painted recessed bays, a grid of windows with air-conditioning units, a grey band over the first upper floor, a grey cornice and a raised central bay with a grey panel over an arched entrance surround; the ground floor carries a YA JU HOTEL 雅居酒店 sign by the entrance, a drive-through car porch at the north end and a red wall beyond it. Google Maps lists YAJU HOTEL, a hotel taking bookings in October 2026, with its point inside this source way, so the sign names it; its lettering is redrawn in original type. Triangulating the south-east roof corner from two panoramas puts the façade 1.4 m behind the source front; the elevation was read on that plane, where the two panoramas nearest its north half agree on a 25.5 m cornice and a raised centre to about 29.4 m (a third reads up to 3 m higher, and the corner triangulation about 27.5 m, so heights carry about ±2 m). It is kept on the source front. Most of the way lies south of the study edge.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Ya+Ju+Hotel+12+Lorong+12+Geylang', way('121873031'), pano('XnM3pDsxaW6ZR15IbMPLlg', 228, 22, 100), pano('16beRBFmUrrhPm8nBsaNiw', 300, 22, 100), pano('d5vQyzeouL-IdSaMiWVR5Q', 250, 20, 100), pano('nk8TBnq7sZd3IJKPqfYYcQ', 265, 15, 100)],
  colours: { wall: '#eeeeea', trim: '#e4e4df', frame: '#3a3e40', glass: '#3e474b', pier: '#eeeeea', back: '#3a3735', floor: '#a49e95' },
  bands: [[25.0, 25.6, .5, '#8e9296'], [7.2, 7.9, .3, '#8e9296']],
  windows: grid(yjColumns, yjRows, { panes: 1, out: .02 }),
  blocks: [
    ...[[6.8, 17.9], [24.9, 34.6]].map(u => ({ name: 'grey recessed bay', u, h: [4.3, 24.9], out: .005, depth: .02, colour: '#8f9499' })),
    { name: 'raised central bay', u: [17.9, 24.7], h: [25.6, 29.4], out: -1.0, depth: 2.0, colour: '#eeeeea' },
    { name: 'grey central panel', u: [19.8, 22.6], h: [25.4, 28.9], out: .02, depth: .04, colour: '#8f9499' },
    { name: 'grey arch surround', u: [19.3, 23.3], h: [5.6, 9.6], out: .1, depth: .2, colour: '#8f9499' },
    { name: 'arch infill', u: [20.0, 22.6], h: [5.6, 8.9], out: .21, depth: .02, colour: '#eeeeea' },
    { name: 'hotel sign backing', u: [19.3, 23.8], h: [4.4, 5.3], out: .15, depth: .04, colour: '#f2f2ee' },
    { name: 'car porch canopy', u: [32.9, 39.3], h: [3.6, 4.0], out: 1.5, depth: 3.0, colour: '#d9d9d4' },
    ...[[33.0, 33.4], [38.8, 39.2]].map(u => ({ name: 'porch column', u, h: [0, 3.6], out: 2.8, depth: .4, colour: '#eeeeea' })),
  ],
  board: { u: [19.35, 23.75], h: [4.45, 5.25], out: .18 },
  piers: [[0, .4], [19.0, 19.4], [23.6, 24.0], [43.1, 43.5]],
  backFittings: [
    { name: 'glazed lobby', u: [19.5, 23.5], h: [.1, 3.2], colour: '#3e474b', glow: .1 },
    { name: 'ground-floor rooms', u: [.5, 18.9], h: [.6, 3.4], colour: '#c9cccc' },
    { name: 'car porch', u: [32.9, 39.3], h: [.1, 3.5], colour: '#4a4f50' },
    { name: 'red wall', u: [40.0, 42.6], h: [.1, 2.8], colour: '#c2372e' },
  ],
};

export const ringB = [towerHotel, associationPair, summerView, no9, gardenHouse, westBlock, no12];

/** The front edge, or a front made of collinear source edges (the vertices between dropped; the footprint is unchanged). */
export function ringBFrame(poly, place) {
  if (!place.frontSpan) return frontageFrame(poly, place.frontEdge);
  const [i, j] = place.frontSpan, keep = poly.filter((_, k) => k <= i || k >= j);
  return frontageFrame(keep, i);
}
export const ringBLayout = (place, width) => simpleHouseLayout(width, place);
export function ringBReviews(place, frame) {
  if (!place.review) return facing(frame, place.id, place.height > 20 ? 12 : 10, place.height > 20 ? 28 : 18);
  // The frontage centre lies south of the study edge: look at it from a start inside the bounds.
  const p = frame.point(...place.review.at), target = frame.point(frame.width / 2, 0);
  return [{ id: place.id, p, pitch: place.review.pitch, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI }];
}
