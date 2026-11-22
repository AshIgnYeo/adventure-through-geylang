// Lorong 20 from Geylang Road to Guillemard Road (open question 81), from the dated extension of 22 November 2026 and
// KartaView's drive of 19 May 2023 up the lane twice (sequence 8344969). The lane is a mix of detached blocks, houses and
// short rows, none with party walls to place a frame by, so every plot is photographed massing on its source outline:
// colours, storeys, roofs and main features as photographed, openings placed by estimate, heights from storey counts
// carrying about ±2 m (±4 m for blocks of seven storeys or more). The drive's fixes trail its true position by about
// 10 m, so plots are matched to the frames by their order along the lane. Every building is unnamed for now, its boards
// drawn blank. See docs/lorong-20-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .8) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 20 Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 19 May 2023 up the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344969', f))];
const tiles = (ridge, colour = '#b4553d') => ({ type: 'hip', ridge, colour });
// A boundary wall along the lane, `out` metres in front of the face.
const wall = (W, out, h, colour, name = 'boundary wall') => ({ name, u: span(W, .1), h: [0, h], out, depth: .2, colour });
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });

// East side, north to south.
export const haoCorner = {
  ...mass({ wall: '#efc8a0', frame: '#3a3c3e', glass: '#3a4248' }, { frontEdge: 3, heldFlat: true, review: { distance: 6.5, pitch: 22 }, height: 10.4 }),
  id: 'l20-geylang-corner', buildingIds: ['454438313'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, the Geylang Road corner (May 2023 massing, occupant not identified)', address: 'Geylang Road at the east corner of Lorong 20',
  evidence: 'KartaView panoramas of May 2023 show a peach three-storey corner house at Geylang Road and Lorong 20, white below its first-floor sill, with brown mosaic piers and a shop on the ground floor under a blue canopy, its green boards reading HAO mart. Listings could not be checked (open question 84), so no name is given and the boards are drawn blank. Its parapet stands about 10.4 m up.' + note,
  sources: src('454438313', '766', '767', '768'),
  windows: grid(spread(18.68, 4, 1.4), [5.0, 8.0], 1.4),
  blocks: [
    plain('white lower wall', span(18.68), [3.3, 4.4], '#ecebe6', .03, .06),
    plain('blue canopy', span(18.68, .2), [3.0, 3.3], '#2a6aa8', .1, .2),
    ...[[.2, .9], [9.0, 9.7], [17.8, 18.5]].map(u => plain('mosaic pier', u, [0, 3.0], '#6a4030', .05, .1)),
    plain('blank green board', [2.0, 8.0], [1.6, 2.6], '#2e9a4a', .06, .04),
    plain('blank green board', [10.0, 17.0], [1.6, 2.6], '#2e9a4a', .06, .04),
  ],
  sides: [{ edge: 0, windows: grid(spread(7.65, 2, 1.4), [5.0, 8.0], 1.4), blocks: [plain('white lower wall', span(7.65), [3.3, 4.4], '#ecebe6', .03, .06)] }],
};

export const louvredBlock = {
  ...mass({ wall: '#8a8e90', frame: '#5a5e60', glass: '#3a4248' }, { frontEdge: 4, review: { distance: 10, pitch: 26 }, height: 17.0 }),
  id: 'l20-1', buildingIds: ['763764650'], kind: 'unnamed', unnamed: true,
  name: 'No. 1 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '1 Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a modern block of about five storeys behind trees on the east side of the lane, its floors screened by grey metal louvres with red and green diagonal braces, behind a long grey boundary wall painted with stepped lines of red, blue, green, yellow and orange. No sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its five storeys and carries about ±2 m.' + note,
  sources: src('763764650', '758', '761', '762'),
  windows: grid(spread(46.03, 9, 3.2), floors(4, 4.0, 3.2), 2.2, 4),
  blocks: [
    ...floors(5, 3.6, 3.2).map(b => plain('grey louvre band', span(46.03), [+b.toFixed(2), +(b + .5).toFixed(2)], '#b8bcbe', .25, .3)),
    ...[[6, 16], [22, 32]].map(([a, b]) => plain('red diagonal brace', [a, b], [8.0, 8.3], '#c8302a', .4, .1)),
    plain('green diagonal brace', [14, 24], [11.2, 11.5], '#2a8a5a', .4, .1),
    wall(46.03, 5.5, 2.4, '#c4c6c4', 'painted boundary wall'),
    ...[[2, 10, '#c8302a'], [10, 18, '#2a4aa8'], [20, 28, '#2a8a5a'], [28, 36, '#e8c428'], [37, 45, '#e8782a']].map(([a, b, colour]) => plain('painted stripe', [a, b], [1.0, 1.15], colour, 5.62, .02)),
  ],
};

export const fretworkHouse = {
  ...mass({ wall: '#e8dcd4', frame: '#5a4a3a', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 21.5, pitch: 12 }, height: 6.8, roof: tiles(8.6, '#7a4a3a') }),
  id: 'l20-fretwork', buildingIds: ['454274568'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side behind No. 1 (May 2023 massing, occupant not identified)', address: 'East side of Lorong 20 Geylang, set back behind No. 1',
  evidence: 'KartaView panoramas of May 2023 show a pale two-storey house set back from the lane beside No. 1, its upper verandah behind a white fretwork railing under a dark tiled roof. No sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454274568', '757', '758', '753'),
  windows: [{ u: [1.0, 6.0], h: [3.9, 5.9], panes: 4 }, { u: [1.2, 5.8], h: [.9, 2.6], panes: 3 }],
  blocks: [plain('white fretwork railing', [.6, 6.4], [3.2, 4.1], '#f2f2ee', .3, .06)],
};

export const hotelEast = {
  ...mass({ wall: '#b8cce0', frame: '#e8ecf0', glass: '#4a8a8a' }, { frontEdge: 3, review: { distance: 12, pitch: 28 }, height: 17.5 }),
  id: 'l20-hotel-east', buildingIds: ['454274563'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side, the pale blue hotel (May 2023 massing, occupant not identified)', address: 'East side of Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a pale blue block of five storeys set back behind its forecourt, with tall teal windows in vertical strips and a driveway through its ground floor under a white board reading HOTEL 81. Listings could not be checked (open question 84), so no name is given and the board is drawn blank. Its height follows its five storeys and carries about ±2 m.' + note,
  sources: src('454274563', '753', '754', '752'),
  windows: grid(spread(15.36, 4, 1.4), floors(4, 4.6, 3.2), 2.4, 2),
  blocks: [
    plain('driveway', [5.4, 10.0], [.05, 3.6], '#2a2e32'),
    plain('blank white board', [5.0, 10.4], [3.7, 4.3], '#f2f2f0', .2, .1),
    plain('red porch columns', [5.0, 5.3], [0, 3.6], '#c8302a', .1, .2),
    plain('red porch columns', [10.1, 10.4], [0, 3.6], '#c8302a', .1, .2),
  ],
};

export const no31 = {
  ...mass({ wall: '#f0f0ec', frame: '#c8302a', glass: '#3a4248' }, { frontEdge: 1, review: { distance: 9, pitch: 32 }, height: 23.0 }),
  id: 'l20-31', buildingIds: ['454274565'], kind: 'unnamed', unnamed: true,
  name: 'No. 31 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '31 Lorong 20 Geylang (a red 31 on its face)',
  evidence: 'KartaView panoramas of May 2023 show a white block of seven storeys on the east side of the lane, with rows of windows in red frames, a red bay at its south end, and a red 31 on its face, over a car park at its ground floor. Listings could not be checked (open question 84), so no name is given. Its height follows its seven storeys and carries about ±4 m.' + note,
  sources: src('454274565', '753', '749', '750'),
  windows: grid(spread(16.39, 4, 1.3), floors(6, 4.4, 3.1), 1.5, 3),
  blocks: [
    plain('red bay', [13.4, 16.1], [3.6, 23.0], '#c8302a', .2, .4),
    plain('open ground floor', [.6, 12.8], [.05, 3.4], '#3a3836', -1.0, .1),
    plain('red 31', [14.0, 15.6], [10.6, 12.2], '#d83a2a', .42, .02),
  ],
};

export const no33 = {
  ...mass({ wall: '#ecebe6', frame: '#5a4a3a', glass: '#3a4044' }, { frontEdge: 2, review: { distance: 14, pitch: 10 }, height: 3.6, roof: tiles(5.8) }),
  id: 'l20-33', buildingIds: ['454274559'], kind: 'unnamed', unnamed: true,
  name: 'No. 33 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '33 Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a single-storey house under an orange tiled roof, set back behind a red brick boundary wall on the east side of the lane, between the white block at No. 31 and the condominium at No. 35. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454274559', '749', '750'),
  windows: [{ u: [1.2, 3.0], h: [.9, 2.4], panes: 2 }, { u: [4.6, 6.4], h: [.9, 2.4], panes: 2 }],
  blocks: [wall(7.56, 8.5, 1.9, '#b4553c', 'red brick wall'), plain('brick coping', span(7.56, .1), [1.9, 2.05], '#d8d4cc', 8.5, .3)],
};

export const no35 = {
  ...mass({ wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4248' }, { frontEdge: 5, review: { distance: 9, pitch: 32 }, height: 23.0 }),
  id: 'l20-35', buildingIds: ['454274557'], kind: 'unnamed', unnamed: true,
  name: 'No. 35 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '35 Lorong 20 Geylang (lettered on its gate wall)',
  evidence: 'KartaView panoramas of May 2023 show a condominium of seven storeys, white with a dark brown clad band up its upper floors and tall louvred vents, behind a gated car park; a plaque on its gate wall reads Treasures @ 20, 35 Lorong 20 Geylang. Listings could not be checked (open question 84), so no name is given and the plaque is not drawn. Its height follows its seven storeys and carries about ±4 m.' + note,
  sources: src('454274557', '749', '746', '747'),
  windows: grid([[8.4, 10.0], [11.4, 13.0], [14.4, 16.0]], floors(6, 4.4, 3.1), 1.6, 2),
  blocks: [
    plain('brown cladding', [1.0, 7.4], [10.6, 23.0], '#6a4030', .1, .2),
    ...[2.0, 4.6].map(a => plain('louvred vent', [a, a + 1.2], [11.0, 21.0], '#d8d8d4', .22, .04)),
    plain('car park gate', [.8, 7.0], [.05, 2.4], '#a8b4b8', 1.0, .05),
  ],
};

export const curvedBalconies = {
  ...mass({ wall: '#f0f0ec', frame: '#5a6064', glass: '#4a5a62' }, { frontEdge: 3, review: { distance: 12, pitch: 28 }, height: 19.0 }),
  id: 'l20-balconies', buildingIds: ['454274586'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side, the block with curved balconies (May 2023 massing, occupant not identified)', address: 'East side of Lorong 20 Geylang, south of No. 35',
  evidence: 'KartaView panoramas of May 2023 show a white apartment block of five floors over a car park on the east side of the lane, its front lined with curved balconies behind grey glass rails. No sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('454274586', '746', '747'),
  windows: grid(spread(19.1, 4, 1.8), floors(5, 4.4, 3.0), 1.8, 3),
  blocks: [
    ...floors(5, 4.0, 3.0).flatMap(b => [plain('balcony slab', [2.0, 17.1], [+b.toFixed(2), +(b + .2).toFixed(2)], '#e8e8e4', .7, 1.4), plain('grey glass rail', [2.0, 17.1], [+(b + .2).toFixed(2), +(b + 1.2).toFixed(2)], '#9aa6ac', 1.35, .05)]),
    plain('open car park', [1.0, 18.1], [.05, 3.4], '#3a3836', -1.0, .1),
  ],
};

export const peachBlock = {
  ...mass({ wall: '#ecd4c0', frame: '#f0f0ec', glass: '#4a5a62' }, { frontEdge: 5, review: { distance: 10, pitch: 30 }, height: 19.5 }),
  id: 'l20-peach', buildingIds: ['454274554'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side, the peach block (May 2023 massing, occupant not identified)', address: 'East side of Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a peach apartment block of six storeys with brown vertical bands and white-framed windows over a car park behind a white wall. No sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('454274554', '746', '826'),
  windows: grid(spread(10.25, 3, 1.6, .9), floors(5, 4.4, 3.0), 1.6, 3),
  blocks: [...[[.2, 1.0], [9.25, 10.05]].map(u => plain('brown vertical band', u, [3.6, 19.5], '#b4886a', .1, .2)), plain('white wall', span(10.25, .1), [0, 1.6], '#ecebe6', 1.5, .2)],
};

export const pinkHouses = {
  ...mass({ wall: '#ecc4c4', frame: '#4a3a32', glass: '#3a4044' }, { frontEdge: 5, review: { distance: 12.5, pitch: 12 }, height: 6.8, roof: tiles(8.8) }),
  id: 'l20-pink-houses', buildingIds: ['454274551'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side, the pink houses (May 2023 massing, occupants not identified)', address: 'East side of Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show two-storey houses set back behind gates on the east side of the lane, pink and white, with red tiled canopies over their porches and a cream neighbour under orange canopies. No sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454274551', '826', '825', '823'),
  windows: grid(spread(26.2, 6, 2.0), [3.9], 1.6, 3),
  blocks: [
    ...[[2.0, 11.0], [14.5, 24.0]].map(u => plain('red tiled porch canopy', u, [2.8, 3.2], '#c8443a', .8, 1.6)),
    plain('white upper', [13.2, 26.17], [3.4, 6.8], '#f0efea', .02, .02),
    plain('dark gate', [1.5, 11.5], [0, 1.8], '#2a2c2e', 5.0, .05),
  ],
};

export const terraceAndFlats = {
  ...mass({ wall: '#efe4cc', frame: '#c8443a', glass: '#3a4044' }, { frontEdge: 7, heldFlat: true, review: { distance: 8, pitch: 26 }, height: 12.8 }),
  id: 'l20-flats', buildingIds: ['454274550'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, east side, the cream flats (May 2023 massing, occupants not identified)', address: 'East side of Lorong 20 Geylang, near Guillemard Road',
  evidence: 'KartaView panoramas of May 2023 show cream walk-up flats of four storeys near the Guillemard Road end of the lane, with red-framed windows under blue awnings and a staircase at their north end, beside a cream two-storey terrace under an orange canopy. No sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its four storeys and carries about ±2 m.' + note,
  sources: src('454274550', '823', '822', '824'),
  windows: grid(spread(10.09, 3, 1.4), floors(4, 1.0, 3.0), 1.4, 2),
  blocks: floors(4, 2.5, 3.0).filter(b => b >= 5).map(b => plain('blue awning', [.6, 9.5], [+b.toFixed(2), +(b + .3).toFixed(2)], '#2a6aa8', .3, .6)),
};

// West side, north to south.
export const ibis = {
  ...mass({ wall: '#efe4c4', frame: '#f0f0ec', glass: '#2a3a5a' }, { frontEdge: 0, review: { distance: 10.5, pitch: 34 }, height: 30.0 }),
  id: 'l20-ibis', buildingIds: ['121873024'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, west side, the cream and grey hotel (May 2023 massing, occupant not identified)', address: 'West side of Lorong 20 Geylang, behind Lorong 18\'s east side',
  evidence: 'KartaView panoramas of May 2023 show a long cream block of nine storeys on the west side of the lane, banded in grey across its middle floors, with rows of white-framed windows and a shop front at its ground floor under blue boards reading ibis budget HOTEL. Listings could not be checked (open question 84), so no name is given and the boards are drawn blank. It is the deep outline behind Lorong 18\'s east side, which faces this lane ([Lorong 18 brief](lorong-18-brief.md)). Its height follows its nine storeys and carries about ±4 m.' + note,
  sources: src('121873024', '762', '757', '758'),
  windows: grid(spread(62.64, 18, 1.5), floors(8, 4.6, 3.1), 1.5, 2),
  blocks: [
    plain('grey band', span(62.64), [10.6, 19.6], '#6a6e72', .02, .02),
    plain('cream shop front', span(62.64), [.05, 3.8], '#efe4c4', .02, .02),
    plain('blank blue board', [4.0, 16.0], [3.0, 3.6], '#2a4a9a', .1, .05),
  ],
};

export const hotelWest = {
  ...mass({ wall: '#a8b8cc', frame: '#e8ecf0', glass: '#3a4a56' }, { frontEdge: 2, heldFlat: true, review: { distance: 8.5, pitch: 34 }, height: 29.0 }),
  id: 'l20-hotel-west', buildingIds: ['454274591'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, west side, the blue-grey hotel (May 2023 massing, occupant not identified)', address: 'West side of Lorong 20 Geylang, behind Lorong 18\'s east side',
  evidence: 'KartaView panoramas of May 2023 show a blue-grey block of nine storeys on the west side of the lane, with rows of windows and a porch at its ground floor under a board reading HOTEL 81. Listings could not be checked (open question 84), so no name is given and the board is drawn blank. Its height follows its nine storeys and carries about ±4 m.' + note,
  sources: src('454274591', '757', '753', '754'),
  windows: grid(spread(22.87, 6, 1.5), floors(8, 4.4, 3.0), 1.5, 2),
  blocks: [plain('porch', [1.0, 9.0], [.05, 3.4], '#2a2e32'), plain('blank white board', [1.0, 6.0], [3.5, 4.1], '#f2f2f0', .05, .06)],
};

export const redRoofRow = {
  ...mass({ wall: '#ecebe6', frame: '#2a5a8a', glass: '#3a4044' }, { frontEdge: 1, heldFlat: true, review: { distance: 7, pitch: 10 }, height: 3.4, roof: tiles(5.4) }),
  id: 'l20-red-roofs', buildingIds: ['454274594'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, west side, the single-storey row (May 2023 massing, occupants not identified)', address: 'West side of Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show single-storey houses under orange tiled roofs with blue eaves on the west side of the lane, with air-conditioning units along their eaves and a crowded front garden of potted plants and red lanterns. No sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454274594', '753', '750'),
  windows: grid(spread(16.35, 3, 1.6), [1.0], 1.4, 2),
  blocks: [
    plain('blue eave', span(16.35), [3.2, 3.45], '#2a5a9a', .1, .2),
    ...[2, 5.5, 9, 12.5].map(a => plain('air-conditioning unit', [a, a + .8], [2.6, 3.1], '#d8d8d4', .15, .1)),
  ],
};

export const archedHouse = {
  ...mass({ wall: '#efeeea', frame: '#5a5e60', glass: '#3a4044' }, { frontEdge: 1, heldFlat: true, review: { distance: 6, pitch: 30 }, height: 12.6 }),
  id: 'l20-arched', buildingIds: ['454274588'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 20 Geylang, west side, the white house with arched windows (May 2023 massing, occupant not identified)', address: 'West side of Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white house of four storeys behind trees on the west side of the lane, with arched windows and small balconies on its upper floors and a dark gated car porch at its ground floor. No sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('454274588', '750', '747'),
  windows: grid(spread(8.82, 2, 1.3), [4.2, 7.2, 10.2], 1.5, 2),
  blocks: [
    ...[4.2, 7.2, 10.2].flatMap(b => spread(8.82, 2, 1.3).map(u => plain('arched head', [+(u[0] - .1).toFixed(2), +(u[1] + .1).toFixed(2)], [+(b + 1.5).toFixed(2), +(b + 1.8).toFixed(2)], '#f2f2ee', .05, .1))),
    plain('dark car porch', [.6, 8.2], [.05, 2.8], '#2a2c2e'),
  ],
};

// The Westerhout Road corner holds two buildings on one outline: a white three-storey block on red columns at the corner
// (the outline's tag is No. 71 Westerhout Road), carried by an upper volume, and a turquoise single-storey house north of it.
const corner71 = 5.5;
export const no71 = {
  ...mass({ wall: '#7ac8c8', frame: '#2e3032', glass: '#3a4044', trim: '#c8443a' }, { frontEdge: 0, heldFlat: true, review: { distance: 6.5, pitch: 22 }, height: 3.4, roof: tiles(5.6, '#5a4a44') }),
  id: 'l20-westerhout-corner', buildingIds: ['764372538'], kind: 'unnamed', unnamed: true,
  name: 'No. 71 Westerhout Road, the Lorong 20 corner (May 2023 massing, occupants not identified)', address: '71 Westerhout Road (the source tag), at the corner of Lorong 20; red plates 38 and 40 on the house to its north',
  evidence: 'KartaView panoramas of May 2023 show two buildings on this corner outline. At the corner of Westerhout Road stands a white block of three storeys on red columns, with red grilles over its ground-floor door and windows, stone lions at its step, and a row of glazed windows under a pierced frieze above; the outline carries the tag No. 71, which runs on from Nos. 55, 61 and 69 along Westerhout Road. North of it, facing Lorong 20, a single-storey house under a dark tiled roof with a red-edged eave has turquoise walls and gate piers carrying red plates reading 38 and 40, behind a tiled forecourt. Listings could not be checked (open question 84), so no name is given. The corner block is carried as an upper volume over the outline\'s south end; its height follows its three storeys and carries about ±2 m.' + note,
  sources: [...src('764372538', '747', '746', '745'), kv('8344969', '742'), kv('8344969', '743')],
  windows: [{ u: [6.6, 8.4], h: [.9, 2.4], panes: 3 }, { u: [9.2, 10.9], h: [.9, 2.4], panes: 3 }],
  blocks: [
    plain('red-edged eave', [corner71, 11.34], [3.2, 3.45], '#c8443a', .1, .2), plain('dark doorway', [8.5, 9.1], [.05, 2.3], '#2a2c2e'),
    ...[[.15, .55], [4.9, 5.3]].map(u => plain('red column', u, [0, 3.4], '#c8302a', .1, .2)),
    plain('red grille', [1.0, 4.4], [.3, 2.6], '#c8302a', .02, .02),
  ],
  upper: [{
    outline: [[0, 0], [corner71, 0], [corner71, -6.0], [0, -6.0]], from: 0, to: 10.0, colour: '#f2f0ea', roof: '#a8a8a4',
    windows: [{ u: [.6, 4.9], h: [7.2, 8.6], panes: 4 }, { u: [.6, 4.9], h: [4.2, 5.6], panes: 4 }],
    blocks: [plain('pierced frieze', [.3, 5.2], [8.8, 9.2], '#e8e6e0', .03, .04)],
  }],
  sides: [{ edge: 2, windows: [{ u: [.8, 4.8], h: [4.2, 5.6], panes: 3 }, { u: [.8, 4.8], h: [7.2, 8.6], panes: 3 }], blocks: [plain('red grille', [1.0, 3.6], [.3, 2.6], '#c8302a', .02, .02)] }],
};

export const no54 = {
  ...mass({ wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 6, review: { distance: 12.5, pitch: 26 }, height: 13.0 }),
  id: 'l20-54', buildingIds: ['764372525'], kind: 'unnamed', unnamed: true,
  name: 'No. 54 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '54 Lorong 20 Geylang (the Westerhout Road corner)',
  evidence: 'KartaView panoramas of May 2023 show a white block of four storeys at the south corner of Westerhout Road, with a red column at its corner and louvred vents. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('764372525', '747', '827'),
  windows: grid(spread(8.11, 2, 1.3), [4.2, 7.2, 10.2], 1.4, 2),
  blocks: [plain('red column', [7.4, 8.0], [0, 4.0], '#c8302a', .2, .4)],
  sides: [{ edge: 4, windows: grid(spread(8.4, 2, 1.3), [4.2, 7.2, 10.2], 1.4, 2) }],
};

export const no56 = {
  ...mass({ wall: '#f0efea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 4, review: { distance: 12, pitch: 20 }, height: 9.6 }),
  id: 'l20-56', buildingIds: ['454274547'], kind: 'unnamed', unnamed: true,
  name: 'No. 56 Lorong 20 Geylang (May 2023 massing, occupant not identified)', address: '56 Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white house of three storeys on the west side of the lane, with a blue awning over its top-floor windows and a red tiled porch roof over its forecourt. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('454274547', '827', '826'),
  windows: grid(spread(7.21, 2, 1.4), [3.9, 6.9], 1.4, 2),
  blocks: [plain('blue awning', [.6, 6.6], [8.4, 8.7], '#2a6aa8', .4, .8), plain('red tiled porch roof', [.6, 6.6], [2.8, 3.2], '#c8443a', .8, 1.6)],
};

export const walkUp = {
  ...mass({ wall: '#ecebe4', frame: '#4a4e50', glass: '#3a4044' }, { frontEdge: 0, review: { distance: 12, pitch: 22 }, height: 9.8 }),
  id: 'l20-58', buildingIds: ['764372526'], kind: 'unnamed', unnamed: true,
  name: 'No. 58 Lorong 20 Geylang (May 2023 massing, occupants not identified)', address: '58 Lorong 20 Geylang',
  evidence: 'KartaView panoramas of May 2023 show weathered white walk-up flats of three storeys on the west side of the lane, with small balconies and a red tiled canopy over the ground-floor entrance. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('764372526', '827', '825'),
  windows: grid(spread(7.41, 2, 1.4), [1.0, 4.0, 7.0], 1.5, 3),
  blocks: [plain('red tiled canopy', [.6, 6.8], [2.7, 3.1], '#c8443a', .6, 1.2), ...[3.4, 6.4].map(b => plain('balcony', [.6, 6.8], [b, b + 1.0], '#d8d6ce', .5, .1))],
};

const semi = (id, frontEdge, W, number, review) => ({
  ...mass({ wall: '#ecd0b4', frame: '#4a3a32', glass: '#3a4044' }, { frontEdge, heldFlat: true, review: { distance: review, pitch: 14 }, height: 6.4, roof: tiles(8.4) }),
  id: `l20-${number.toLowerCase()}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `No. ${number} Lorong 20 Geylang (May 2023 massing, occupant not identified)`, address: `${number} Lorong 20 Geylang`,
  evidence: `KartaView panoramas of May 2023 show a peach two-storey house under an orange tiled roof, one of a pair on the west side of the lane near Guillemard Road, with a red tiled canopy over its porch behind a gate. Listings could not be checked (open question 84), so no name is given.${note}`,
  sources: src(id, '825', '823'),
  windows: grid(spread(W, 2, 1.2, .6), [3.8], 1.5, 2),
  blocks: [plain('red tiled canopy', span(W, .2), [2.7, 3.0], '#c8443a', .1, .2)],
});
export const no60 = semi('764372524', 0, 9.42, '60', 8);
export const no62 = semi('764372523', 4, 7.25, '62', 8.5);

const cornerRow = (id, frontEdge, W, number, review, extra = {}) => ({
  ...mass({ wall: '#e8e6de', frame: '#5a5e60', glass: '#3a4044' }, { frontEdge, heldFlat: true, review: { distance: review, pitch: 16 }, height: 7.0, roof: { type: 'flat', colour: '#a8a8a4' } }),
  id: `l20-${number.toLowerCase()}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `No. ${number} Lorong 20 Geylang (May 2023 massing, occupant not identified)`, address: `${number} Lorong 20 Geylang`,
  evidence: `KartaView panoramas of May 2023 show a weathered white two-storey house, one of a short row at the Guillemard Road end of the lane, with glazed and louvred windows along its upper floor under a corrugated roof edge, over a shop front. Listings could not be checked (open question 84), so no name is given.${note}`,
  sources: src(id, '821', '822'),
  windows: [{ u: span(W, .4), h: [3.9, 5.6], panes: Math.max(2, Math.round(W / 1.2)) }],
  blocks: [plain('corrugated roof edge', span(W), [6.8, 7.1], '#9a9c98', .3, .6), plain('dark shop front', span(W, .4), [.05, 2.8], '#3a3836')],
  ...extra,
});
export const no62a = cornerRow('764372522', 4, 5.94, '62A', 8);
export const no62c = cornerRow('764372521', 1, 5.53, '62C', 7, { sides: [{ edge: 2, windows: [{ u: [1.0, 9.1], h: [3.9, 5.6], panes: 6 }], blocks: [plain('corrugated roof edge', span(10.15), [6.8, 7.1], '#9a9c98', .3, .6)] }] });

export const lorong20 = [haoCorner, louvredBlock, fretworkHouse, hotelEast, no31, no33, no35, curvedBalconies, peachBlock, pinkHouses, terraceAndFlats, ibis, hotelWest, redRoofRow, archedHouse, no71, no54, no56, walkUp, no60, no62, no62a, no62c];
export const lorong20Frame = laneFrame, lorong20Layout = laneLayout, lorong20Upper = laneUpper, lorong20Reviews = laneReviews, lorong20Sides = laneSides;
