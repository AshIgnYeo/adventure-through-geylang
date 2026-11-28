// Lorongs 4, 6 and 8 south to Guillemard Road (open question 101), from the dated extension of 22 November 2026 and
// KartaView's drive of 19 May 2023 along all three lanes and the service road from Lorong 4 to Lorong 6 (sequence
// 8344969). Lorong 4's west side lies outside both extracts. None of the plots shows party walls to place a frame by, so
// every one is photographed massing on its source outline, matched to the frames by its order along the lane (the
// drive's fixes trail its true position by about 10 m). Heights follow storey counts and carry about ±2 m, ±4 m for
// blocks of six storeys or more. Every building is unnamed for now, its boards drawn blank. See
// docs/south-lanes-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const L4 = 'Lorong 4 Geylang', L6 = 'Lorong 6 Geylang', L8 = 'Lorong 8 Geylang';
const note = ' It is seen in KartaView\'s drive of 19 May 2023 along the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';

/** Upper-floor window rows for a face of width W: one window per `bay` metres, on every floor above the ground. */
const rows = (W, storeys, step, bay = 3.2, w = 1.4, hh = 1.5, panes = 2) =>
  grid(spread(W, Math.max(1, Math.round((W - 1) / bay)), Math.min(w, W / 2)), Array.from({ length: storeys - 1 }, (_, k) => step * (k + 1) + .9), hh, panes);

/**
 * One plot. `look` is what the frames show; `signs` names any board or lettering read in them, which is drawn blank.
 * `step` is the storey height; windows fill every floor above the ground unless `windows` is given.
 */
const plot = o => {
  const { id, way: w, road, front, W, storeys, step = 3.2, height = +(storeys * step + .4).toFixed(1), roof, colours, look, signs, frames,
    review = 9, heldFlat, label, address, blocks = [], sides, windows, extra } = o;
  const big = storeys >= 6;
  return {
    id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: road,
    review: { distance: review, pitch: height > 12 ? Math.min(34, 14 + storeys * 3) : 14 }, ...(heldFlat ? { heldFlat: true } : {}),
    shellInset: .3, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
    colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
    name: `${label} (May 2023 massing, occupant not identified)`, address,
    evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ` ${signs}` : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.${storeys > 1 ? ` Its height follows its ${storeys} storeys and carries about ±${big ? 4 : 2} m.` : ''}` + note + (extra ? ' ' + extra : ''),
    sources: [way(w), ...frames.map(f => kv('8344969', f))],
    // Windows stand forward of any colour field laid on the face.
    windows: (windows ?? rows(W, storeys, step)).map(x => ({ ...x, out: x.out ?? .02 })),
    blocks, ...(sides ? { sides: sides.map(sd => ({ ...sd, windows: sd.windows?.map(x => ({ ...x, out: x.out ?? .02 })) })) } : {}),
  };
};
const tiles = (ridge, colour = '#b4553d') => ({ type: 'hip', ridge, colour });
const shopFront = (W, colour = '#3a3836') => plain('shop front', span(W, .4), [.05, 2.8], colour);
const wall = (W, out, h, colour, name = 'boundary wall') => plain(name, span(W, .2), [0, h], colour, out, .2);

// Lorong 4, east side, north to south.
export const l4East = [
  plot({ id: 'l4-white-row', way: '454254196', road: L4, front: 3, W: 8.42, storeys: 3, colours: { wall: '#ecebe4', frame: '#5a4a3a' }, frames: ['268', '269', '216'], review: 9,
    label: 'Lorong 4 Geylang, east side, the weathered white house', address: 'East side of Lorong 4 Geylang, south of the service road',
    look: 'a weathered white three-storey house on the east side of Lorong 4, south of the service road\'s mouth, with a red tiled canopy over a forecourt crowded with potted plants, and a dark board with gold characters over its door',
    blocks: [plain('red tiled canopy', span(8.42, .2), [2.8, 3.2], '#c8443a', .6, 1.2), plain('blank dark board', [2.0, 6.4], [3.4, 4.0], '#2a2826', .05, .04), shopFront(8.42)] }),
  plot({ id: 'l4-green-house', way: '454254194', road: L4, front: 3, W: 21.5, storeys: 3, roof: tiles(12.0, '#a8553d'), colours: { wall: '#ecebe4', frame: '#3a3c3e', glass: '#3a4a46' }, frames: ['268', '267', '220'], review: 9,
    label: 'Lorong 4 Geylang, east side, the houses with the hanging garden', address: 'East side of Lorong 4 Geylang',
    look: 'a row of three-storey houses under a red tiled roof on the east side of Lorong 4, the northern one with a hanging garden along its upper floor and glass balconies behind it, over car porches',
    blocks: [plain('hanging garden', [11.0, 21.0], [6.0, 6.8], '#4a7a3a', .4, .6), plain('dark car porches', span(21.5, .6), [.05, 2.8], '#3a3836')] }),
  plot({ id: 'l4-teal-block', way: '454254190', road: L4, front: 4, W: 27.31, storeys: 5, colours: { wall: '#ecc8a4', frame: '#c8302a', glass: '#3a4a56' }, frames: ['264', '265', '224'], review: 11,
    label: 'Lorong 4 Geylang, east side, the peach and teal block', address: 'East side of Lorong 4 Geylang, north of the service road to Lorong 6',
    look: 'a peach apartment block of five storeys behind a planted forecourt on the east side of Lorong 4, with teal bands and balcony fronts at each floor, red doors and white railings, and a teal stair of glass blocks up its middle',
    blocks: [...[3.6, 6.8, 10.0, 13.2].map(b => plain('teal balcony front', span(27.31, .8), [b, b + 1.0], '#2a9a96', .5, .1)), plain('glass block stair', [12.6, 14.6], [.5, 16.4], '#b8d4d0', .05, .1)] }),
  plot({ id: 'l4-walk-up', way: '454274447', road: L4, front: 11, W: 36.17, storeys: 4, heldFlat: true, colours: { wall: '#efe8d4', frame: '#5a5e60', glass: '#3a4044' }, frames: ['256', '255', '229'], review: 6,
    label: 'Lorong 4 Geylang, east side, the cream walk-up flats', address: 'East side of Lorong 4 Geylang, south of the service road to Lorong 6',
    look: 'cream walk-up flats of four storeys on the east side of Lorong 4, south of the service road, with louvred vents over their windows and shops with red lanterns and grilles below, their northern end under scaffolding and grey sheeting in May 2023',
    blocks: [shopFront(36.17), plain('red lanterns', [1.0, 8.0], [2.4, 2.8], '#c8302a', .1, .1), plain('scaffolding and sheeting', [26.0, 36.0], [.05, 13.2], '#8a9094', .1, .1)] }),
  plot({ id: 'l4-red-frames', way: '454274444', road: L4, front: 5, W: 13.89, storeys: 3, heldFlat: true, colours: { wall: '#f0efea', frame: '#9a3a2a', glass: '#2e3438' }, frames: ['252', '253', '233'], review: 7,
    label: 'Lorong 4 Geylang, east side, the white house with red window frames', address: 'East side of Lorong 4 Geylang, near Guillemard Road',
    look: 'a white three-storey house near the Guillemard Road end of Lorong 4, with windows in red-brown frames under louvred vents, air-conditioning units on brackets, a red-edged canopy and a dark ground floor with a timber door',
    blocks: [plain('red-edged canopy', span(13.89, .3), [3.0, 3.25], '#9a3a2a', .1, .2), shopFront(13.89, '#2e2c2a')] }),
  plot({ id: 'l4-south-house', way: '454274442', road: L4, front: 5, W: 9.59, storeys: 3, colours: { wall: '#f0efea', frame: '#9a3a2a', glass: '#2e3438' }, frames: ['252', '233', '234'], review: 9,
    label: 'Lorong 4 Geylang, east side, the house at the Guillemard Road end', address: 'East side of Lorong 4 Geylang, at the Guillemard Road end',
    look: 'a white three-storey house at the Guillemard Road end of Lorong 4, seen at the edge of the frames beside its red-framed neighbour',
    blocks: [shopFront(9.59, '#2e2c2a')] }),
];

// Lorong 6, west side, north to south.
export const l6West = [
  plot({ id: 'l6-gabled-pair', way: '454254193', road: L6, front: 5, W: 5.88, storeys: 3, roof: tiles(12.2), colours: { wall: '#efe6d0', frame: '#3a3c3e', glass: '#3a4044' }, frames: ['345', '346', '348'], review: 10,
    label: 'Lorong 6 Geylang, west side, the semi-detached pair with tiled gables', address: 'West side of Lorong 6 Geylang, south of Sunflower Court',
    look: 'a cream semi-detached pair of three storeys on the west side of Lorong 6 under red tiled roofs, with two small red tiled gables over their porches, behind a white wall with arched niches and a slatted gate',
    blocks: [plain('red tiled porch gable', span(5.88, .3), [2.8, 3.8], '#c8603a', .6, 1.2), wall(5.88, 3.0, 1.8, '#f2f2ee', 'white wall')],
    sides: [{ edge: 9, windows: rows(6.02, 3, 3.2), blocks: [plain('red tiled porch gable', span(6.02, .3), [2.8, 3.8], '#c8603a', .6, 1.2)] }] }),
  plot({ id: 'l6-44', way: '454254189', road: L6, front: 0, W: 15.39, storeys: 7, colours: { wall: '#efe4d8', frame: '#3a3c3e', glass: '#3a5a66' }, frames: ['333', '345', '260'], review: 11,
    label: 'No. 44 Lorong 6 Geylang', address: '44 Lorong 6 Geylang (the source tag), at the service road\'s east end',
    look: 'a hotel of about seven storeys at the corner of Lorong 6 and the service road from Lorong 4, white above a deep orange-red ground floor with flagpoles and a low wall of yellow and orange railings, and a peach face to the service road',
    signs: 'Its service road face carries a board reading KIM TIAN HOTEL 金田酒店, and its ground floor a small sign beginning Oh My; the source way is named Oxley Hotel.',
    blocks: [plain('orange-red ground floor', span(15.39), [.05, 3.6], '#c8603a', .006, .01), plain('railing wall', span(15.39, .3), [0, 1.2], '#e8a040', 2.0, .1)],
    sides: [{ edge: 3, heldFlat: true, windows: rows(9.68, 7, 3.2, 2.4), blocks: [plain('peach face', span(9.68), [3.6, 22.8], '#ecc8a4', .006, .01), plain('blank board', [2.0, 7.6], [19.0, 21.0], '#e8e4dc', .02, .02)] }] }),
  plot({ id: 'l6-salmon-row', way: '454254188', road: L6, front: 2, W: 20.38, storeys: 3, colours: { wall: '#e8b89a', frame: '#5a3a2a', glass: '#2e3438' }, frames: ['333', '332', '334'], review: 9,
    label: 'Lorong 6 Geylang, west side, the salmon row', address: 'West side of Lorong 6 Geylang, south of No. 44',
    look: 'a weathered salmon-pink row of three storeys on the west side of Lorong 6, with a five-foot way behind square piers, timber doors and grilles below, and windows with air-conditioning units above',
    windows: rows(20.38, 3, 3.2, 3.4, 1.6),
    blocks: [...[[.2, 1.0], [6.8, 7.6], [13.6, 14.4], [19.4, 20.2]].map(u => plain('square pier', u, [0, 3.2], '#e8b89a', .2, .4)), shopFront(20.38, '#6a4a30')] }),
  plot({ id: 'l6-white-modern', way: '454254187', road: L6, front: 2, W: 9.25, storeys: 3, colours: { wall: '#f2f2ee', frame: '#3a3c3e', glass: '#3a4a56' }, frames: ['330', '331', '332'], review: 9,
    label: 'Lorong 6 Geylang, west side, the white modern house', address: 'West side of Lorong 6 Geylang',
    look: 'a white three-storey house of modern lines on the west side of Lorong 6, with wide windows and a recessed upper balcony',
    blocks: [shopFront(9.25, '#4a4a48')] }),
  plot({ id: 'l6-cream-terrace', way: '454254186', road: L6, front: 0, W: 8.26, storeys: 3, colours: { wall: '#efe8d8', frame: '#9a6a4a', glass: '#3a4044' }, frames: ['330', '331'], review: 9,
    label: 'Lorong 6 Geylang, west side, the cream terrace house', address: 'West side of Lorong 6 Geylang',
    look: 'a cream terrace house of three storeys on the west side of Lorong 6, with brown-framed windows under louvred vents and air-conditioning units, over a grilled door',
    blocks: [shopFront(8.26, '#4a4a48')] }),
  plot({ id: 'l6-blue-house', way: '454254185', road: L6, front: 0, W: 7.92, storeys: 3, colours: { wall: '#2a4a8a', frame: '#f0efea', glass: '#2e3438' }, frames: ['330', '329'], review: 9,
    label: 'Lorong 6 Geylang, west side, the blue house', address: 'West side of Lorong 6 Geylang, near Guillemard Road',
    look: 'a blue three-storey house near the Guillemard Road end of Lorong 6, with white-framed windows and a red tiled canopy over its porch behind a low wall',
    blocks: [plain('red tiled canopy', span(7.92, .2), [2.8, 3.2], '#a83a3a', .6, 1.2), wall(7.92, 2.0, 1.2, '#ecebe4', 'low wall')] }),
];

// Lorong 6, east side, north to south.
export const l6East = [
  plot({ id: 'l6-condo', way: '454274464', road: L6, front: 4, W: 41.34, storeys: 8, colours: { wall: '#4a5a5e', frame: '#3a3c3e', glass: '#5a7a80' }, frames: ['348', '347', '351'], review: 10,
    label: 'Lorong 6 Geylang, east side, the dark condominium', address: 'East side of Lorong 6 Geylang',
    look: 'a condominium of about eight storeys behind trees on the east side of Lorong 6, clad in dark grey and teal, with glass balconies, a central bay framed in yellow over the car park entrance, and a grey gate wall with a plaque',
    signs: 'The plaque reads Treasures and a street number.',
    windows: rows(41.34, 8, 3.2, 3.6, 2.2, 1.7, 3),
    blocks: [plain('yellow-framed bay', [18.6, 22.6], [6.0, 26.0], '#e8c428', .15, .3), plain('car park entrance', [19.0, 22.2], [.05, 3.2], '#2a2e30'),
      plain('grey gate wall', [1.0, 17.6], [0, 1.6], '#5a6064', 3.0, .3), plain('grey gate wall', [24.0, 40.3], [0, 1.6], '#5a6064', 3.0, .3)] }),
  plot({ id: 'l6-blue-awning', way: '454274450', road: L6, front: 0, W: 15.3, storeys: 2, colours: { wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, frames: ['345', '344', '346'], review: 9,
    label: 'Lorong 6 Geylang, east side, the house with the blue awning', address: 'East side of Lorong 6 Geylang, at the service road\'s mouth',
    look: 'a white two-storey shophouse on the east side of Lorong 6 opposite the service road\'s mouth, with large dark windows above and a blue scalloped awning over a shop with a dark board and a drink vending machine',
    blocks: [plain('blue awning', [1.0, 12.0], [2.5, 3.2], '#2a5aa8', .6, 1.2), plain('blank dark board', [4.0, 8.0], [2.0, 2.5], '#2a2826', .05, .04), shopFront(15.3, '#2e2c2a')] }),
  plot({ id: 'l6-cat-cafe', way: '454274453', road: L6, front: 7, W: 15.59, storeys: 3, heldFlat: true, colours: { wall: '#f0efea', frame: '#5a4a3a', glass: '#3a4044' }, frames: ['333', '334', '332'], review: 6,
    label: 'Lorong 6 Geylang, east side, the house with the turquoise shop', address: 'East side of Lorong 6 Geylang',
    look: 'a white three-storey house on the east side of Lorong 6 with a timber-railed balcony across its upper floor and a turquoise shop front below',
    signs: 'The shop\'s board reads FelinCity.',
    blocks: [plain('turquoise shop front', [3.0, 8.0], [.05, 3.0], '#3ab8b0', .03, .04), plain('timber balcony rail', span(15.59, .4), [6.6, 7.6], '#6a4a30', .1, .05)] }),
  plot({ id: 'l6-torie-ville', way: '454254180', road: L6, front: 3, W: 45.88, storeys: 5, colours: { wall: '#efe4cc', frame: '#3a3c3e', glass: '#3a5a6a' }, frames: ['333', '330', '331'], review: 12,
    label: 'Lorong 6 Geylang, east side, the cream and brown apartments', address: 'East side of Lorong 6 Geylang',
    look: 'an apartment block of five storeys over a car park on the east side of Lorong 6, cream above and brown on its lower floors, with bands of blue-tinted windows, behind a white wall of square tiles between piers with lamps',
    signs: 'The gate sign reads Torieville, as the source way names it.',
    windows: rows(45.88, 5, 3.2, 3.6, 2.4, 1.6, 3),
    blocks: [plain('brown lower floors', span(45.88), [3.2, 9.6], '#9a7058', .006, .01), plain('dark car park', span(45.88, .6), [.05, 3.0], '#2a2e30'), wall(45.88, 4.0, 1.8, '#efe8dc', 'tiled wall')] }),
  plot({ id: 'l6-69', way: '454254179', road: L6, front: 11, W: 22.96, storeys: 6, colours: { wall: '#efd8c4', frame: '#3a3c3e', glass: '#3a5a6a' }, frames: ['327', '330', '326'], review: 12,
    label: 'No. 69 Lorong 6 Geylang', address: '69 Lorong 6 Geylang (on its gate wall)',
    look: 'an apartment block of six storeys near the Guillemard Road end of Lorong 6, cream with pink bays and bay windows, over a car park behind a pink gate wall lettered with the number 69',
    signs: 'The gate wall reads 69 CANBERLIN LODGE, as the source way names it.',
    windows: rows(22.96, 6, 3.2, 3.6, 2.4, 1.6, 3),
    blocks: [...[[3.0, 6.0], [14.0, 17.0]].map(u => plain('pink bay', u, [3.2, 19.6], '#e8a8a0', .3, .6)), plain('pink gate wall', [14.0, 22.0], [0, 2.2], '#e8a8a0', 2.0, .3)] }),
];

// Lorong 8, west side, north to south.
export const l8West = [
  plot({ id: 'l8-green-frames', way: '454274469', road: L8, front: 1, W: 15.25, storeys: 8, colours: { wall: '#f0efea', frame: '#2e8a4a', glass: '#3a4a56' }, frames: ['442', '441', '443'], review: 11,
    label: 'Lorong 8 Geylang, west side, the white tower with green window frames', address: 'West side of Lorong 8 Geylang, south of the temple',
    look: 'a white tower of about eight storeys on the west side of Lorong 8, its windows in deep green frames with red sills, over a ground floor with a red and white hotel board and a blue board',
    signs: 'The boards read 81 and PARIS.',
    windows: rows(15.25, 8, 3.2, 3.0, 1.8, 1.6, 2),
    blocks: [plain('blank red board', [1.0, 4.0], [2.6, 3.2], '#c8302a', .05, .04), plain('blank blue board', [5.0, 10.0], [2.6, 3.4], '#2a4a9a', .05, .04)] }),
  plot({ id: 'l8-38', way: '541941374', road: L8, front: 8, W: 9.4, storeys: 6, colours: { wall: '#f0efea', frame: '#5a5e60', glass: '#3a4a56' }, frames: ['439', '438', '440'], review: 11,
    label: 'No. 38 Lorong 8 Geylang', address: '38 Lorong 8 Geylang (on its gate post)',
    look: 'a white apartment block of six storeys on the west side of Lorong 8, with yellow accents beside its windows, glass balconies and a screen of grey vertical fins at one side, behind a grey gate with the plate 38',
    blocks: [plain('grey fin screen', [.3, 2.0], [3.2, 19.6], '#8a8c90', .2, .2), ...[[3.0, 3.4], [7.6, 8.0]].map(u => plain('yellow accent', u, [6.0, 16.0], '#e8c428', .03, .04))] }),
  plot({ id: 'l8-teo-ann', way: '454274461', road: L8, front: 0, W: 18.85, storeys: 6, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#3a7a7a' }, frames: ['436', '439', '437'], review: 10,
    label: 'Lorong 8 Geylang, west side, the clan association block', address: 'West side of Lorong 8 Geylang',
    look: 'a block of six storeys on the west side of Lorong 8, banded in red between bands of green-tinted glass, over a recessed ground floor between red piers',
    signs: 'Its fascia reads TEO ANN HUAY KUAN, with Chinese characters above.',
    windows: grid([[1.0, 17.85]], [4.2, 7.6, 11.0, 14.4], 2.2, 10),
    blocks: [...[3.8, 7.2, 10.6, 14.0, 17.4].map(b => plain('red band', span(18.85), [b, b + .4], '#b8443a', .04, .04)), plain('blank fascia', [2.0, 16.0], [3.2, 3.8], '#efe8dc', .05, .04)] }),
  plot({ id: 'l8-old-row', way: '454274459', road: L8, front: 1, W: 15.21, storeys: 3, colours: { wall: '#efeee6', frame: '#5a4a3a', glass: '#3a4044' }, frames: ['436', '433', '435'], review: 9,
    label: 'Lorong 8 Geylang, west side, the old row with the association board', address: 'West side of Lorong 8 Geylang',
    look: 'an old white three-storey row on the west side of Lorong 8, with air-conditioning units at its windows, a red tiled canopy, coloured flags, and an orange hoarding along its front',
    signs: 'A board across its upper floor reads 社志勵陽…, with a second board beside it.',
    blocks: [plain('blank board', [1.0, 9.0], [8.0, 8.8], '#efe4c8', .05, .04), plain('red tiled canopy', [1.0, 8.0], [2.8, 3.2], '#c8443a', .5, 1.0), wall(15.21, 3.0, 2.0, '#e8782a', 'orange hoarding')] }),
  plot({ id: 'l8-bungalow', way: '454274457', road: L8, front: 1, W: 8.03, storeys: 1, height: 3.4, roof: tiles(5.6, '#3a7a7a'), colours: { wall: '#efe8dc', frame: '#5a5e60', glass: '#3a4044' }, frames: ['433', '434'], review: 9,
    label: 'Lorong 8 Geylang, west side, the bungalow behind the hoarding', address: 'West side of Lorong 8 Geylang',
    look: 'a single-storey bungalow under a blue-green tiled hipped roof with arched openings on its verandah, behind a corrugated metal hoarding on the west side of Lorong 8',
    windows: [{ u: [1.2, 2.8], h: [.8, 2.4], panes: 2 }, { u: [5.2, 6.8], h: [.8, 2.4], panes: 2 }],
    blocks: [wall(8.03, 3.0, 2.2, '#c8ccd0', 'corrugated hoarding')] }),
  plot({ id: 'l8-aston', way: '454274454', road: L8, front: 1, W: 17.66, storeys: 6, colours: { wall: '#7a8a96', frame: '#e8e8e4', glass: '#2e5a6a' }, frames: ['430', '431', '432'], review: 10,
    label: 'Lorong 8 Geylang, west side, the grey-blue apartments', address: 'West side of Lorong 8 Geylang',
    look: 'a grey-blue apartment block of six storeys on the west side of Lorong 8, its face banded in grey tiles, with white-framed windows and a recessed stair of grilled balconies, behind a gate and a wall with a plaque',
    signs: 'The source way is named Aston Lodge.',
    blocks: [plain('grilled stair', [7.4, 10.2], [3.2, 19.6], '#e8e8e4', -.05, .1), wall(17.66, 3.0, 1.8, '#6a7a86', 'grey wall')] }),
  plot({ id: 'l8-grey-walk-up', way: '454254176', road: L8, front: 1, W: 10.8, storeys: 4, colours: { wall: '#8a949c', frame: '#e8e8e4', glass: '#3a4044' }, frames: ['430', '428', '429'], review: 10,
    label: 'Lorong 8 Geylang, west side, the grey walk-up', address: 'West side of Lorong 8 Geylang',
    look: 'a grey walk-up of four storeys banded in blue on the west side of Lorong 8, with a red and white sign at its gate',
    blocks: [plain('blank red and white sign', [1.0, 2.6], [1.6, 2.8], '#c8302a', 2.0, .1)] }),
  plot({ id: 'l8-white-terrace', way: '454254177', road: L8, front: 9, W: 24.8, storeys: 3, heldFlat: true, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2a4a8a' }, frames: ['427', '426', '428'], review: 6,
    label: 'Lorong 8 Geylang, west side, the white terrace', address: 'West side of Lorong 8 Geylang, near Guillemard Road',
    look: 'a white terrace of three storeys on the west side of Lorong 8, with louvred vents over its upper windows and blue-tinted glass, an orange house at its south end, and a five-foot way with striped canopies and plants',
    windows: rows(24.8, 3, 3.2, 3.2, 1.6),
    blocks: [plain('orange house', [.03, 5.8], [3.2, 9.6], '#e89a6a', .006, .01), plain('striped canopy', [6.0, 20.0], [2.6, 3.0], '#6a8a8a', .1, .2), shopFront(24.8, '#4a4a48')] }),
  plot({ id: 'l8-swann', way: '454254178', road: L8, front: 0, W: 25.0, storeys: 5, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['423', '424', '422'], review: 11,
    label: 'Lorong 8 Geylang, west side, the white apartments at Guillemard Road', address: 'West side of Lorong 8 Geylang, at the Guillemard Road end',
    look: 'a white apartment block of five storeys at the Guillemard Road end of Lorong 8, with dark windows and small balconies, behind a white wall with a gate and a lettered sign',
    signs: 'The sign reads SWANN COURT, as the source way names it.',
    blocks: [wall(25.0, 3.0, 1.8, '#f2f2ee', 'white wall')] }),
];

// Lorong 8, east side, north to south.
export const l8East = [
  plot({ id: 'l8-louvred-block', way: '454438341', road: L8, front: 3, W: 22.23, storeys: 6, colours: { wall: '#f0efea', frame: '#5a5e60', glass: '#3a4044' }, frames: ['436', '437', '438'], review: 9,
    label: 'Lorong 8 Geylang, east side, the white block with louvred windows', address: 'East side of Lorong 8 Geylang',
    look: 'a white block of about six storeys on the east side of Lorong 8, with louvred windows and a blue canopy at its foot',
    blocks: [plain('blue canopy', [1.0, 9.0], [2.6, 3.0], '#2a6a9a', .5, 1.0)] }),
  plot({ id: 'l8-pastel-houses', way: '454438342', road: L8, front: 3, W: 21.93, storeys: 2, step: 3.6, colours: { wall: '#efe8d8', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['436', '435'], review: 9,
    label: 'Lorong 8 Geylang, east side, the cream, pink and orange houses', address: 'East side of Lorong 8 Geylang',
    look: 'three two-storey houses on the east side of Lorong 8, cream, pink and orange, with dark windows under louvred vents, the cream one under a teal canopy and the pink one behind a stone-clad pier, over open forecourts',
    blocks: [plain('pink house', [7.3, 14.6], [.05, 7.6], '#ecc4cc', .006, .01), plain('orange house', [14.6, 21.9], [.05, 7.6], '#e8a060', .006, .01), plain('teal canopy', [.6, 7.0], [2.8, 3.2], '#5ab8b0', .6, 1.2)] }),
  plot({ id: 'l8-balcony-house', way: '454438343', road: L8, front: 3, W: 19.39, storeys: 2, step: 3.6, colours: { wall: '#efe8d4', frame: '#5a4a3a', glass: '#3a4044' }, frames: ['430', '431', '433'], review: 9,
    label: 'Lorong 8 Geylang, east side, the house with the balcony', address: 'East side of Lorong 8 Geylang',
    look: 'a weathered cream two-storey house on the east side of Lorong 8, with a covered balcony hung with laundry across its upper floor and grilled doors below, behind a low white wall',
    blocks: [plain('covered balcony', span(19.39, .6), [3.8, 4.8], '#d8d4c8', .6, .1), wall(19.39, 2.0, 1.2, '#f0f0ec', 'low white wall')] }),
  plot({ id: 'l8-61', way: '121873724', road: L8, front: 0, W: 24.32, storeys: 5, colours: { wall: '#a8b4c4', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['430', '429', '431'], review: 10,
    label: 'No. 61 Lorong 8 Geylang', address: '61 Lorong 8 Geylang (on its front wall)',
    look: 'a pale grey-blue hotel of five storeys on the east side of Lorong 8, with regular rows of dark windows, a dark band with gold lines over its ground floor, a black stone wall with the number 61 and a porch',
    blocks: [plain('dark band', span(24.32), [3.2, 4.2], '#2a2e30', .05, .1), plain('black stone wall', [1.0, 22.0], [0, 1.6], '#1e2022', 2.0, .3)] }),
  plot({ id: 'l8-familie', way: '454438346', road: L8, front: 3, W: 21.9, storeys: 6, colours: { wall: '#efd8cc', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['427', '428', '426'], review: 7.5,
    label: 'Lorong 8 Geylang, east side, the pink apartments with arched windows', address: 'East side of Lorong 8 Geylang',
    look: 'a pale pink apartment block of six storeys on the east side of Lorong 8, with arched windows on its upper floors and a black railed gate',
    signs: 'The source way is named Familie Mans.',
    blocks: rows(21.9, 6, 3.2).filter(w => w.h[0] > 12).map(w => plain('arched head', [w.u[0] - .05, w.u[1] + .05], [w.h[1], w.h[1] + .3], '#efd8cc', .05, .1)) }),
  plot({ id: 'l8-clan-house', way: '454438345', road: L8, front: 3, W: 13.23, storeys: 4, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['423', '424'], review: 9,
    label: 'Lorong 8 Geylang, east side, the clan association house', address: 'East side of Lorong 8 Geylang, near Guillemard Road',
    look: 'a white four-storey house near the Guillemard Road end of Lorong 8, with salmon pier bays, grilled windows and a vine-covered balcony over a car porch',
    signs: 'A board over the porch reads 清河張氏公會 CHIN HO TEO CLAN ASSOCIATION.',
    blocks: [...[[.2, 1.4], [11.8, 13.0]].map(u => plain('salmon pier', u, [3.2, 13.2], '#d8786a', .1, .2)), plain('blank board', [2.4, 10.4], [3.2, 3.8], '#efe8dc', .05, .04), plain('dark car porch', span(13.23, 1.6), [.05, 3.0], '#2a2c2e')] }),
];

export const southLanes = [...l4East, ...l6West, ...l6East, ...l8West, ...l8East];
export const southLanesFrame = laneFrame, southLanesLayout = laneLayout, southLanesUpper = laneUpper, southLanesReviews = laneReviews, southLanesSides = laneSides;
