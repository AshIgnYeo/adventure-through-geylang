// Westerhout Road from Lorong 16 to Lorong 20 (open question 72), from the dated extension of 22 November 2026 and
// KartaView's drive of 19 May 2023 along the road (sequence 8344969, frames 724-744). Between Lorongs 16 and 18 its south
// side is a row of three-storey terrace houses, each with a porch bay stepped out from its front; between Lorongs 18 and
// 20 it holds two single-storey houses on the south side and a hotel and a kiosk on the north. None shows party walls
// to place a frame by, so every plot is photographed massing on its source outline: the terrace houses on the main
// segment of their stepped fronts, with the porch bay as a side. Every building is unnamed for now, its boards drawn
// blank. See docs/westerhout-road-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const mid = (W, w) => [+((W - w) / 2).toFixed(2), +((W + w) / 2).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const mass = (colours, o) => ({
  reviewRoad: 'Westerhout Road', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 19 May 2023 along the road (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344969', f))];

// A terrace house: three storeys under a tiled hipped roof, its windows on the main segment of its front and on the porch
// bay stepped out from it, a tiled canopy over the porch.
const terrace = ({ id, building, number, front, W, bay, B, wall, roof, canopy, frame = '#4a4e50', look, extra = [], bayExtra = [], review }) => ({
  ...mass({ wall, frame, glass: '#3a4044' }, { frontEdge: front, review: { distance: review, pitch: 22 }, height: 10.2, roof: { type: 'hip', ridge: 12.0, colour: roof } }),
  id, buildingIds: [building], kind: 'unnamed', unnamed: true,
  name: `No. ${number} Westerhout Road (May 2023 massing, occupant not identified)`, address: `${number} Westerhout Road`,
  evidence: `KartaView panoramas of May 2023 show ${look}, one of the row of three-storey terrace houses on the south side of Westerhout Road between Lorongs 16 and 18, behind a gate and a forecourt. Listings could not be checked (open question 84), so no name is given. Its height follows its three storeys and carries about ±2 m.${note}`,
  sources: src(building, '726', '727', '729'),
  windows: grid([mid(W, Math.min(2.4, W - .8))], [3.8, 7.0], 1.5, 3),
  blocks: [plain('dark gate', span(W, .2), [.05, 2.4], '#2a2c2e'), ...extra],
  sides: [{ edge: bay, windows: grid([mid(B, Math.min(1.6, B - .6))], [3.8, 7.0], 1.5, 2), blocks: [plain('tiled porch canopy', span(B, .1), [2.8, 3.2], canopy, .5, 1.0), ...bayExtra] }],
});

export const no2 = {
  ...mass({ wall: '#efeeea', frame: '#7a2a2a', glass: '#3a4044' }, { frontEdge: 0, review: { distance: 14.5, pitch: 18 }, height: 7.0, roof: { type: 'hip', ridge: 9.0, colour: '#b4553d' } }),
  id: 'wh-2', buildingIds: ['121873029'], kind: 'unnamed', unnamed: true,
  name: 'No. 2 Westerhout Road, the Lorong 16 corner (May 2023 massing, occupant not identified)', address: '2 Westerhout Road (a red plate 2 on its gate pier)',
  evidence: 'KartaView panoramas of May 2023 show a white two-storey corner house at Lorong 16 and Westerhout Road with maroon-framed windows, a red tiled roof over its porch and a black gate whose pier carries a red plate reading 2. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('121873029', '724', '725', '726'),
  windows: grid([mid(3.74, 2.2)], [3.9], 1.5, 3),
  blocks: [plain('black gate', span(3.74, .2), [.05, 2.2], '#2a2c2e')],
  sides: [
    { edge: 2, windows: grid([mid(2.93, 1.5)], [3.9], 1.5, 2), blocks: [plain('red tiled porch roof', span(2.93, .1), [2.8, 3.2], '#c8443a', .6, 1.2)] },
    { edge: 7, windows: grid([[1.5, 3.3], [5.5, 7.3], [9.0, 10.8]], [.9, 3.9], 1.5, 2) },
  ],
};

export const no4 = terrace({ id: 'wh-4', building: '764372536', number: '4', front: 5, W: 3.68, bay: 2, B: 1.98, wall: '#ecc4bc', roof: '#c86a3a', canopy: '#d8783a', review: 13, look: 'a pink terrace house with a gable over its top floor and an orange tiled canopy' });
export const no6 = terrace({ id: 'wh-6', building: '764372535', number: '6', front: 3, W: 3.36, bay: 5, B: 2.99, wall: '#efeeea', roof: '#c86a3a', canopy: '#d8783a', review: 13, look: 'a white terrace house under orange tiled canopies, with a balcony garden on its first floor', bayExtra: [plain('balcony planters', [.2, 2.79], [3.3, 3.9], '#4a7a3a', .4, .5)] });
export const no8 = terrace({ id: 'wh-8', building: '764372533', number: '8', front: 4, W: 3.72, bay: 2, B: 3.46, wall: '#f2f2ee', roof: '#3a6aa8', canopy: '#4a7ab8', frame: '#3a6aa8', review: 13, look: 'a white terrace house under blue tiled roofs, with arched windows framed in blue', extra: [plain('arched heads', mid(3.72, 2.6), [8.5, 8.8], '#3a6aa8', .05, .1)] });
export const no10 = terrace({ id: 'wh-10', building: '764372534', number: '10', front: 3, W: 3.89, bay: 5, B: 2.65, wall: '#ecc8c4', roof: '#b4553d', canopy: '#c8443a', review: 13, look: 'a pink terrace house with red tiled canopies' });
export const no12 = {
  ...terrace({ id: 'wh-12', building: '764372531', number: '12', front: 2, W: 4.27, bay: 2, B: 4.27, wall: '#a8b4bc', roof: '#b4553d', canopy: '#c8443a', frame: '#d8782a', review: 10, look: 'a grey-blue terrace house with a red tiled canopy and orange-framed windows' }),
  sides: [],
  blocks: [plain('dark gate', span(4.27, .2), [.05, 2.4], '#2a2c2e'), plain('red tiled canopy', span(4.27, .1), [2.8, 3.2], '#c8443a', .5, 1.0)],
};
export const no14 = terrace({ id: 'wh-14', building: '764372532', number: '14', front: 3, W: 3.79, bay: 5, B: 3.68, wall: '#f2f0ea', roof: '#b4553d', canopy: '#c8443a', review: 12.5, look: 'a white terrace house at the east end of the row, with arched windows under a red tiled roof and a small turret over its porch bay', bayExtra: [plain('turret', [.6, 3.08], [10.2, 12.4], '#f2f0ea', .3, .6)] });

export const no54 = {
  ...mass({ wall: '#ecebe6', frame: '#5a4a3a', glass: '#3a4044' }, { frontEdge: 4, heldFlat: true, review: { distance: 7, pitch: 10 }, height: 3.4, roof: { type: 'hip', ridge: 5.6, colour: '#b4553d' } }),
  id: 'wh-54', buildingIds: ['764372527'], kind: 'unnamed', unnamed: true,
  name: 'No. 54 Westerhout Road (May 2023 massing, occupant not identified)', address: '54 Westerhout Road (the Lorong 18 stub corner)',
  evidence: 'KartaView panoramas of May 2023 show a single-storey house under an orange tiled hipped roof on the south side of Westerhout Road, at the corner of Lorong 18\'s stub, beside No. 56. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('764372527', '736', '737'),
  windows: grid([mid(3.98, 1.6)], [.9], 1.5, 2),
  sides: [{ edge: 2, windows: grid([[2.0, 3.6], [6.0, 7.6], [10.0, 11.6]], [.9], 1.5, 2) }],
};

export const no56 = {
  ...mass({ wall: '#f2f2ee', frame: '#3a4e3a', glass: '#3a4044' }, { frontEdge: 0, review: { distance: 8.5, pitch: 10 }, height: 3.4, roof: { type: 'hip', ridge: 5.8, colour: '#b4553d' } }),
  id: 'wh-56', buildingIds: ['454274544'], kind: 'unnamed', unnamed: true,
  name: 'No. 56 Westerhout Road (May 2023 massing, occupant not identified)', address: '56 Westerhout Road (a red plate 56 beside its door)',
  evidence: 'KartaView panoramas of May 2023 show a white single-storey house under an orange tiled hipped roof behind a broad tiled forecourt on the south side of Westerhout Road, with a glazed door in a dark green frame, a red plate reading 56 and a painted board of a landscape beside it. Listings could not be checked (open question 84), so no name is given and the board is drawn blank.' + note,
  sources: src('454274544', '737', '738'),
  windows: [{ u: [1.9, 3.3], h: [.05, 2.3], panes: 2 }],
  blocks: [plain('blank painted board', [3.7, 5.6], [.9, 2.0], '#3a6a9a', .03, .04), plain('red plate 56', [3.75, 4.15], [2.15, 2.45], '#c8302a', .04, .02)],
};

export const no61 = {
  ...mass({ wall: '#efe4d8', frame: '#2e3032', glass: '#3a6a7a' }, { frontEdge: 4, heldFlat: true, review: { distance: 7.5, pitch: 32 }, height: 16.5 }),
  id: 'wh-61', buildingIds: ['454438307'], kind: 'unnamed', unnamed: true,
  name: 'No. 61 Westerhout Road (May 2023 massing, occupant not identified)', address: '61 Westerhout Road (a plate 61 beside its entrance)',
  evidence: 'KartaView panoramas of May 2023 show a cream hotel of five storeys on the north side of Westerhout Road, with two rust-red vertical bands, windows under small rust-red hoods, and a grey ground floor striped with red diagonals round a glazed entrance under red lettering reading RedDoorz, with the plate 61. Listings could not be checked (open question 84), so no name is given and the lettering is not drawn.' + note,
  sources: src('454438307', '739', '740', '741'),
  windows: grid([[1.4, 2.8], [4.4, 5.8], [8.9, 9.7], [11.0, 11.8], [13.1, 13.9], [15.2, 16.0], [20.0, 21.4], [23.2, 24.6]], [4.6, 7.6, 10.6, 13.6], 1.6, 2),
  blocks: [
    ...[[7.0, 8.6], [17.0, 18.6]].map(u => plain('rust-red vertical band', u, [3.9, 16.5], '#b45a48', .05, .1)),
    plain('grey ground floor', span(26.87), [.05, 3.8], '#6a6a6e'),
    ...[[2.0, 4.0], [21.0, 23.0]].map(u => plain('red diagonal stripe', u, [.3, 3.5], '#c8302a', .03, .02)),
    plain('glazed entrance', [10.0, 14.5], [.05, 2.8], '#2a3438', .04, .02),
    ...[4.6, 7.6, 10.6, 13.6].flatMap(b => [[1.2, 3.0], [4.2, 6.0], [19.8, 21.6], [23.0, 24.8]].map(u => plain('rust-red window hood', u, [+(b + 1.7).toFixed(2), +(b + 2.0).toFixed(2)], '#b45a48', .12, .24))),
  ],
};

export const no69 = {
  ...mass({ wall: '#c8ccce', frame: '#2e3032', glass: '#3a4044' }, { frontEdge: 2, heldFlat: true, review: { distance: 7.5, pitch: 8 }, height: 3.2, roof: { type: 'flat', colour: '#a8acae' } }),
  id: 'wh-69', buildingIds: ['764372539'], kind: 'unnamed', unnamed: true,
  name: 'No. 69 Westerhout Road (May 2023 massing, occupant not identified)', address: '69 Westerhout Road',
  evidence: 'KartaView panoramas of May 2023 show a single-storey kiosk under a corrugated metal roof on the north side of Westerhout Road, between the hotel at No. 61 and the corner house, with drink fridges and a red vending machine under its eave. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('764372539', '742', '743'),
  blocks: [plain('corrugated roof edge', span(5.14), [2.9, 3.2], '#9a9c98', .1, .2), plain('red vending machine', [3.4, 4.3], [.05, 1.9], '#c8302a', .03, .04), plain('open front', [.4, 3.2], [.05, 2.6], '#3a3836')],
};

export const westerhoutRoad = [no2, no4, no6, no8, no10, no12, no14, no54, no56, no61, no69];
export const westerhoutRoadFrame = laneFrame, westerhoutRoadLayout = laneLayout, westerhoutRoadUpper = laneUpper, westerhoutRoadReviews = laneReviews, westerhoutRoadSides = laneSides;
