// Lorong 24 from Geylang Road to Guillemard Road, with the terraces of Jalan Suka and Jalan Molek off its west side,
// from the narrow extract of 28 November 2026 and KartaView's drive of 19 May 2023 down the lane and into both side
// streets (sequence 8344969, frames 1165-1253). Every plot is photographed massing on its source outline, matched to the
// frames by its order along its street, with openings and colours placed by estimate where the frames do not tell the
// houses of a row apart. Heights follow storey counts and carry about ±2 m, ±4 m for the blocks of five storeys or more.
// Every building is unnamed for now, its boards drawn blank. See docs/lorong-24-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';
import { grid, spread, floors, span, plain, r2 } from './lorong-25-layout.mjs';

const SEQ = '8344969';
const note = ' It is seen in KartaView\'s drive of 19 May 2023 (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const rowNote = ' The row is seen house by house in KartaView\'s drive of 19 May 2023 (open question 84), but the frames do not tie every house to its outline, so each house takes the row\'s form as photographed, with its colours given by estimate along the row.';
const volume = (name, u0, u1, from, to, colour, { back = .3, depth = 10, roof = '#9a9c98', windows = [], blocks = [] } = {}) =>
  ({ name, outline: [[u0, -back], [u1, -back], [u1, -back - depth], [u0, -back - depth]], from, to, colour, roof, windows, blocks });

const plot = ({ id, way: w, front, W, storeys, height = r2(storeys * 3.2 + .4), road = 'Lorong 24 Geylang', roof, colours, label, address, look, signs, frames, review, windows, blocks = [], upper, row = false, extra = {} }) => ({
  id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: road,
  review: { distance: review, pitch: height > 14 ? 34 : 18 }, shellInset: .3, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  name: `${label} (May 2023 massing, occupant not identified)`, address,
  evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ' ' + signs : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.${storeys > 1 ? ` Its height follows its ${storeys} storeys and carries about ±${storeys >= 5 ? 4 : 2} m.` : ''}` + (row ? rowNote : note),
  sources: [way(w), ...frames.map(f => kv(SEQ, f))],
  windows: windows ?? grid(spread(W, Math.max(1, Math.round((W - 1) / 3.2)), Math.min(1.5, W / 3)), floors(storeys - 1, 4.1, 3.2), 1.6), blocks,
  ...(upper ? { upper } : {}), ...extra,
});

// Lorong 24's west row, Nos. 4-12: ornate two-storey shophouses about 4.4 m wide, two of them under scaffolding.
const shophouse = (w, number, W, { wall, shutters, scaffold = false }) => plot({
  id: `l24-${number}`, way: w, front: 3, W, storeys: 2, height: 8.6, colours: { wall, frame: '#5a5048', glass: '#3a3a38' }, frames: ['1175', '1177'], review: 9,
  roof: { type: 'gable', ridge: 10.8, ridgeDepth: .5, overhang: .4, colour: '#9a5a44' }, row: true,
  label: `No. ${number} Lorong 24 Geylang`, address: `${number} Lorong 24 Geylang`,
  look: `No. ${number} in the row of ornate two-storey shophouses on the west side of Lorong 24, with louvred shutters in moulded surrounds over a ground floor${scaffold ? ', wrapped in scaffolding and blue netting' : ' of steel doors and grey tarpaulins'}`,
  windows: [{ u: [r2(W / 2 - 1.2), r2(W / 2 - .2)], h: [5.0, 7.0], panes: 2, out: .02 }, { u: [r2(W / 2 + .2), r2(W / 2 + 1.2)], h: [5.0, 7.0], panes: 2, out: .02 }],
  blocks: [plain('painted facade', [.01, r2(W - .01)], [3.6, 8.3], wall, .006, .01), plain('ornate cornice', [.01, r2(W - .01)], [8.0, 8.5], '#f2eee6', .1, .2),
    plain('closed louvred shutters', [r2(W / 2 - 1.17), r2(W / 2 - .23)], [5.03, 6.97], shutters, .04, .006), plain('closed louvred shutters', [r2(W / 2 + .23), r2(W / 2 + 1.17)], [5.03, 6.97], shutters, .04, .006),
    ...(scaffold ? [plain('blue scaffold netting', [.05, r2(W - .05)], [.2, 8.6], '#3a6ab8', .6, .1)] : [plain('green steel door', [.6, r2(W - .6)], [.05, 2.8], '#2e6a4a', .03, .04)])],
});

// Jalan Suka's north side, Nos. 2-20: two-storey link houses under tiled roofs, behind gates and porch canopies.
const SUKA_N = ['#9a3a3a', '#e8e4dc', '#2a6a8a', '#a84a3a', '#e8e4dc', '#9a3a3a', '#2a5a7a', '#e8e4dc', '#a84a3a', '#9a3a3a'];
const sukaNorth = (w, number, k) => plot({
  id: `suka-${number}`, way: w, front: 2, W: 6.57, storeys: 2, height: 6.8, road: 'Jalan Suka', colours: { wall: k % 3 === 1 ? '#f0ece2' : '#e8e0cc', frame: '#3a3836', glass: '#2e3438' }, frames: ['1189', '1191', '1193', '1195', '1197'], review: 12.3,
  roof: { type: 'hip', ridge: 9.0, colour: '#b4553d' }, row: true,
  label: `No. ${number} Jalan Suka`, address: `${number} Jalan Suka`,
  look: `No. ${number} in the row of two-storey link houses on the north side of Jalan Suka, under a terracotta tiled roof, with a porch canopy over its car porch behind a gate and low wall`,
  windows: grid([[1.0, 2.8], [3.8, 5.6]], [4.0], 1.5, 2),
  blocks: [plain('porch canopy', [.3, 6.27], [2.6, 2.9], SUKA_N[k], 1.0, 2.0), plain('front wall and gate', [.2, 6.37], [0, 1.4], '#d8d4ca', 3.0, .2)],
});
// Jalan Suka's south side, Nos. 1-19: three-storey white walk-up houses with balconies.
const sukaSouth = (w, number, k) => plot({
  id: `suka-${number}`, way: w, front: 0, W: 6.80, storeys: 3, height: 10.2, road: 'Jalan Suka', colours: { wall: '#eeeeea', frame: '#5a5e60', glass: '#3a4044' }, frames: ['1189', '1191', '1193', '1195', '1197'], review: 12.5, row: true,
  label: `No. ${number} Jalan Suka`, address: `${number} Jalan Suka`,
  look: `No. ${number} in the row of white three-storey walk-up houses on the south side of Jalan Suka, with grilled windows, small balconies and a gated forecourt${k === 6 ? ', its upper floors framed in orange' : ''}`,
  windows: grid([[1.0, 2.8], [4.0, 5.8]], [4.2, 7.4], 1.5, 2),
  blocks: [...floors(2, 3.6, 3.2).map(b => plain('balcony', [.6, 6.2], [r2(b), r2(b + .9)], '#e4e2dc', .4, .1)), plain('front wall and gate', [.2, 6.6], [0, 1.4], '#d8d4ca', 3.0, .2),
    ...(k === 6 ? [plain('orange frame', [3.8, 6.4], [3.6, 9.8], '#e0902a', .05, .04)] : [])],
});
// Jalan Molek's north side, Nos. 2-16: two-storey link houses in pink and cream under tiled roofs.
const molek = (w, number, k) => plot({
  id: `molek-${number}`, way: w, front: 2, W: 6.02, storeys: 2, height: 6.8, road: 'Jalan Molek', colours: { wall: k % 2 ? '#ecd8d0' : '#ece4d4', frame: '#3a3836', glass: '#2e3438' }, frames: ['1237', '1239', '1241'], review: 12,
  roof: { type: 'hip', ridge: 9.0, colour: '#b4553d' }, row: true,
  label: `No. ${number} Jalan Molek`, address: `${number} Jalan Molek`,
  look: `No. ${number} in the row of two-storey link houses on the north side of Jalan Molek, pink and cream under terracotta tiled roofs, behind gates and porches${k === 5 ? ', its gate and porch painted red for a house shrine' : ''}`,
  windows: grid([[.9, 2.6], [3.4, 5.1]], [4.0], 1.5, 2),
  blocks: [plain('porch canopy', [.3, 5.72], [2.6, 2.9], k === 5 ? '#a8282a' : '#8a3a32', 1.0, 2.0), plain('front wall and gate', [.2, 5.82], [0, 1.4], k === 5 ? '#c8302a' : '#d8d4ca', 3.0, .2)],
});

export const lorong24 = [
  // West side, Geylang Road to Guillemard Road.
  plot({ id: 'l24-lai-ming', way: '395805491', front: 0, W: 19.76, storeys: 2, height: 7.2, colours: { wall: '#ece6d8', frame: '#3a3836', glass: '#2e3438' }, frames: ['1169', '1171', '1173'], review: 11.5,
    roof: { type: 'hip', ridge: 10.0, colour: '#b4553d' },
    label: 'No. 432 Geylang Road, the Lorong 24 corner', address: '432 Geylang Road (the source tag), at the west corner of Lorong 24',
    look: 'an old two-storey house under a red tiled roof on the west corner of Geylang Road and Lorong 24, almost hidden behind coconut palms and dense trees',
    signs: 'The source way is named Lai Ming Hotel.' }),
  shophouse('394866855', '4', 4.41, { wall: '#ecd8cc', shutters: '#c89a6a' }),
  shophouse('394866860', '6', 4.40, { wall: '#ece6d8', shutters: '#8a6a4a', scaffold: true }),
  shophouse('394866865', '8', 4.29, { wall: '#e8e0d4', shutters: '#6a5a4a' }),
  shophouse('394866868', '10', 4.64, { wall: '#ece6d8', shutters: '#8a6a4a', scaffold: true }),
  shophouse('394866857', '12', 6.87, { wall: '#eeeeea', shutters: '#7a7a72' }),
  // Jalan Suka, north side (Nos. 2-20, from the lane westward) and south side (Nos. 1-19).
  ...['820421343', '820421344', '820421345', '820421346', '820421347', '820421348', '820421349', '820421350', '820421351', '394866856'].map((w, k) => sukaNorth(w, String(2 + 2 * k), k)),
  ...['820421334', '820421335', '820421336', '820421337', '820421338', '820421339', '820421340', '820421341', '820421342', '394866874'].map((w, k) => sukaSouth(w, String(1 + 2 * k), k)),
  // Jalan Molek, north side (Nos. 2-16, from the lane westward).
  ...['820421327', '820421328', '820421329', '820421330', '820421331', '820421332', '820421333', '394866863'].map((w, k) => molek(w, String(2 + 2 * k), k)),
  // East side, Geylang Road to Guillemard Road. Each front runs north to south.
  plot({ id: 'l24-440', way: '395026245', front: 1, W: 24.21, storeys: 3, colours: { wall: '#ece6d4', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['1167', '1169', '1171', '1173'], review: 15,
    label: 'No. 440 Geylang Road, the Lorong 24 corner', address: '440 Geylang Road (the source tag), at the east corner of Lorong 24',
    look: 'a cream three-storey corner shophouse on the east corner of Geylang Road and Lorong 24, with a café under black fascias and awnings along its Lorong 24 side and a single-storey black annex behind',
    signs: 'The fascias read FELLASCUBE, Noodle FELLAS and CHILL CHOMP CONNECT.',
    windows: grid(spread(24.21, 6, 1.4), [4.4, 7.6], 1.4, 2),
    blocks: [plain('blank black fascia', [1.0, 15.0], [3.0, 3.8], '#1e1e20', .1, .1), plain('black awning', [1.0, 15.0], [2.5, 2.9], '#2a2a2c', .5, .9)] }),
  plot({ id: 'l24-east-block', way: '394866873', front: 0, W: 82.85, storeys: 2, height: 7.0, colours: { wall: '#e8e4dc', frame: '#3a3836', glass: '#2e3438' }, frames: ['1173', '1179', '1181', '1183', '1185'], review: 12.5,
    roof: { type: 'flat', colour: '#8a8c8e' },
    label: 'Lorong 24 Geylang, east side, between Geylang Road and Jalan Suka', address: 'East side of Lorong 24 Geylang',
    look: 'along the east side of Lorong 24: at the north end a grey and white apartment block of about ten storeys with louvred balconies over a grey wall and trees, in the middle a few two-storey houses under tiled canopies behind brick gate piers and green awnings, and at the south end another modern apartment block of about seven storeys lettered edenzloft',
    signs: 'The south block\'s entrance reads edenzloft.',
    windows: grid(spread(25, 7, 1.6).map(u => [r2(u[0] + 30), r2(u[1] + 30)]), [4.0], 1.5, 2),
    blocks: [plain('grey wall', [.5, 29.5], [0, 2.2], '#7a7c7e', .5, .2), plain('grey wall', [56.0, 82.5], [0, 2.2], '#7a7c7e', .5, .2),
      ...spread(25, 5, .5, .6).map(u => plain('brick gate pier', [r2(u[0] + 30), r2(u[1] + 30)], [0, 1.6], '#a8443a', .6, .4)), plain('green awning', [42.0, 50.0], [2.4, 2.8], '#2e8a4a', .6, .9)],
    upper: [volume('north apartment block', .5, 29.5, 7.0, 32.4, '#d8dadc', { back: 2.0, depth: 16, windows: grid(spread(29, 6, 2.4), floors(8, 8.0, 3.2), 1.6, 3),
        blocks: floors(8, 7.8, 3.2).map(b => plain('louvred balcony', [1.0, 29.0], [r2(b), r2(b + 1.0)], '#a8aaa8', .4, .1)) }),
      volume('edenzloft', 56.0, 82.5, 7.0, 22.8, '#e8e8e4', { back: 1.0, depth: 17, windows: grid(spread(26.5, 6, 2.2).map(u => [r2(u[0] + 56), r2(u[1] + 56)]), floors(5, 8.0, 3.2), 1.6, 3),
        blocks: floors(5, 7.8, 3.2).map(b => plain('grey louvre screen', [57.0, 82.0], [r2(b), r2(b + 1.4)], '#7a7c7e', .4, .06)) })] }),
  plot({ id: 'l24-buddhist-society', way: '394866866', front: 3, W: 9.77, storeys: 2, height: 7.8, colours: { wall: '#ece6d8', frame: '#3a3836', glass: '#2e3438' }, frames: ['1227', '1229'], review: 13,
    roof: { type: 'gable', ridge: 10.0, ridgeDepth: .5, overhang: .4, colour: '#9a5a44' },
    label: 'Lorong 24 Geylang, east side, the Buddhist society', address: 'East side of Lorong 24 Geylang, south of Jalan Suka',
    look: 'a cream two-storey shophouse on the east side of Lorong 24 just south of Jalan Suka, its ground floor behind yellow gates under a yellow board with red lettering, beside the car park entrance of a new grey and orange apartment block',
    signs: 'The board names a Buddhist society in English and Chinese.',
    blocks: [plain('yellow gates', [.6, 9.2], [0, 2.4], '#e8c040', .6, .1), plain('blank yellow board', [.6, 9.2], [2.6, 3.2], '#e8c040', .05, .04)] }),
  plot({ id: 'l24-station-shop', way: '394858958', front: 0, W: 8.64, storeys: 1, height: 4.0, colours: { wall: '#ecebe6', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['1249', '1251', '1253'], review: 18,
    label: 'Lorong 24 Geylang, the petrol station shop', address: 'East side of Lorong 24 Geylang, at Guillemard Road',
    look: 'the single-storey white shop of a petrol station at the south end of Lorong 24, banded in red under its roof, beside the station\'s canopy and pumps',
    signs: 'The station is an Esso; the source way is named Cheers.',
    windows: [], blocks: [plain('red band', span(8.64), [3.4, 3.8], '#c8202a', .05, .04)] }),
];
export const lorong24Frame = laneFrame, lorong24Layout = laneLayout, lorong24Upper = laneUpper, lorong24Reviews = laneReviews, lorong24Sides = laneSides;
