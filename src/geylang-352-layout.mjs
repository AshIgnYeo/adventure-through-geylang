// Geylang Road's south side from No. 352 to No. 364 (open question 86), east of Lorong 18's east corner: a three-storey
// Modern-style row walked from KartaView's westbound 2023 drives while Street View cannot be reached (open question 84).
// Two frames are solved from the row's party walls; with them the photographed walls stand within 0.3 m of the source ones,
// so each elevation is read on its source front, with heights above the five-foot-way floor. Every building is unnamed
// for now, its boards drawn blank. See docs/geylang-352-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

// Each frame runs u west along the front from the house's east party wall, which slants about 0.13 m inward for every metre
// back, so the five-foot way's shell and the east pier stand in from it. The houses share one elevation: two storeys of
// paired aluminium windows under louvred vents, a ledge between them, a deep cornice at the parapet and a five-foot way.
const white = '#e8e6de', ledge = '#dcdad2';
const row = (o = {}) => ({
  frontEdge: 0, reviewRoad: 'Geylang Road', review: { distance: 9, pitch: 20 },
  height: 11.1, ceiling: 3.6, fiveFootWay: 2.2, shellInset: .38, upperInset: .02, roof: { type: 'flat', colour: '#9a9c98' },
  colours: { wall: white, trim: ledge, frame: '#c8c8c4', glass: '#2e3438', pier: white, back: '#3a3632', floor: '#a8a296' },
  ...o,
});
/** Both upper storeys: windows under louvred vents, a ledge under each storey, the cornice and parapet. */
const storeys = (wins, W, vents = 'louvre') => ({
  windows: [4.25, 7.6].flatMap(b => wins.map(u => ({ u, h: [b, b + 1.35], panes: 3 }))),
  blocks: [
    ...[4.25, 7.6].flatMap(b => wins.map(u => (vents === 'louvre'
      ? { name: 'louvred vent', u: [u[0] + .05, u[1] - .05], h: [b + 1.55, b + 1.85], out: .02, depth: .04, colour: '#cfcdc4' }
      : { name: 'pierced vent blocks', u: [u[0] + .05, u[1] - .05], h: [b + 1.55, b + 1.85], out: .02, depth: .04, colour: '#3a3836' }))),
    ...[3.6, 6.9].map(b => ({ name: 'storey ledge', u: [0, +(W - .005).toFixed(3)], h: [b, b + .3], out: .15, depth: .3, colour: ledge })),
    { name: 'cornice', u: [0, +(W - .005).toFixed(3)], h: [10.2, 10.55], out: .2, depth: .4, colour: ledge },
  ],
});
const note = ' Read on the source front in near-frontal KartaView frames of the 16 May 2023 drive, whose positions and headings are solved from the row\'s party walls (open question 84); the photographed walls stand within 0.3 m of the source ones. Heights are above the five-foot-way floor and carry about ±0.4 m; the five-foot way\'s depth is estimated.';
const src = id => [way(id), kv('8344809', '3228'), kv('8344809', '3225')];

const no352Parts = storeys([[.7, 2.4], [3.3, 5.0]], 5.818, 'pierced');
export const no352 = {
  ...row(), id: 'gr-352', buildingIds: ['764372558'], kind: 'unnamed', unnamed: true,
  name: 'No. 352 Geylang Road (May 2023 exterior, occupant not identified)', address: '352 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show the west house of the row: two storeys of windows set in deep splayed reveals under rows of pierced vent blocks, a round satellite dish and a tall pale board hung from the upper floor, and over the five-foot way a white board edged in pink reading 當興德 TECK HING PAWNSHOP NGEE KEE, with red vertical boards of the same name at the piers. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given.' + note,
  sources: src('764372558'),
  ...no352Parts,
  blocks: [
    ...no352Parts.blocks,
    ...[4.25, 7.6].flatMap(b => [[.55, 2.55], [3.15, 5.15]].map(u => ({ name: 'splayed reveal', u, h: [b - .1, b + 1.45], out: .05, depth: .1, colour: '#d8d6ce' }))),
    { name: 'blank white board edged in pink', u: [.5, 4.9], h: [2.4, 3.3], out: .34, depth: .06, colour: '#f2eeea' },
    { name: 'blank red board', u: [5.0, 5.12], h: [.2, 2.4], out: .12, depth: .2, colour: '#c8282a' },
    { name: 'blank pale board', u: [2.5, 2.62], h: [5.3, 7.6], out: .12, depth: .2, colour: '#d8ccb0' },
  ],
  piers: [[.32, .62], [5.498, 5.798]],
  backFittings: [{ name: 'pawnshop counter', u: [.5, 5.3], h: [.2, 2.4], colour: '#5a4038', glow: .06 }],
};

export const no354 = {
  ...row(), id: 'gr-354', buildingIds: ['764372556'], kind: 'unnamed', unnamed: true,
  name: 'No. 354 Geylang Road (May 2023 exterior, occupant not identified)', address: '354 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a house of the row with two broad dark windows on each upper storey under louvred vents, and over the five-foot way a blue awning reading M.R. PROVISIONS OPEN 24 HOURS over a minimart. Listings could not be checked (open question 84), so the awning\'s lettering is not drawn and no name is given.' + note,
  sources: src('764372556'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'blue awning', u: [.1, 5.8], h: [2.6, 3.3], out: .6, depth: 1.0, colour: '#1e3e8a' },
  ] }))(storeys([[.6, 2.7], [3.2, 5.3]], 5.925)),
  piers: [[.32, .62], [5.605, 5.905]],
  backFittings: [{ name: 'minimart', u: [.4, 5.5], h: [.2, 2.6], colour: '#c8282a', glow: .08 }],
};

const twoPair = [[.5, 2.3], [2.9, 4.8]];
export const no356 = {
  ...row(), id: 'gr-356', buildingIds: ['764372557'], kind: 'unnamed', unnamed: true,
  name: 'No. 356 Geylang Road (May 2023 exterior, occupant not identified)', address: '356 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a house of the row with paired aluminium windows under louvred vents on both upper storeys, and over the five-foot way a yellow board reading realme above a red awning advertising a mobile network, over a phone shop with a roller shutter. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + note,
  sources: src('764372557'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'blank yellow board', u: [.25, 5.3], h: [3.3, 4.15], out: .34, depth: .06, colour: '#e8c828' },
    { name: 'red awning', u: [.15, 5.4], h: [2.5, 3.3], out: .6, depth: 1.0, colour: '#d23a2a' },
  ] }))(storeys(twoPair, 5.592)),
  piers: [[.32, .62], [5.272, 5.572]],
  backFittings: [{ name: 'roller shutter', u: [.5, 5.0], h: [.2, 2.5], colour: '#c8c8c4' }],
};

export const no358 = {
  ...row(), id: 'gr-358', buildingIds: ['764372554'], kind: 'unnamed', unnamed: true,
  name: 'No. 358 Geylang Road (May 2023 exterior, occupant not identified)', address: '358 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a house of the row with paired aluminium windows under louvred vents, one with curtains, and over the five-foot way a green board reading oppo above a green awning repeating it, over a phone shop. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + note,
  sources: src('764372554'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'blank green board', u: [.2, 5.5], h: [3.25, 4.1], out: .34, depth: .06, colour: '#1e7a4a' },
    { name: 'green awning', u: [.2, 5.5], h: [2.45, 3.25], out: .6, depth: 1.0, colour: '#1e6a42' },
  ] }))(storeys([[.6, 2.5], [3.1, 5.0]], 5.694)),
  piers: [[.32, .62], [5.374, 5.674]],
  backFittings: [{ name: 'phone shop', u: [.4, 5.3], h: [.2, 2.45], colour: '#d8d8d4', glow: .1 }],
};

export const no360 = {
  ...row(), id: 'gr-360', buildingIds: ['764372555'], kind: 'unnamed', unnamed: true,
  name: 'No. 360 Geylang Road (May 2023 exterior, occupant not identified)', address: '360 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a house of the row with paired aluminium windows under louvred vents, and over the five-foot way a green board reading 妈妈店 Mama Store, open 24 hours, above a green awning, over a minimart with a drinks fridge and a red vending machine. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.' + note,
  sources: src('764372555'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'blank green board', u: [.15, 5.35], h: [3.25, 4.25], out: .34, depth: .06, colour: '#1e8a5a' },
    { name: 'green awning', u: [.1, 5.4], h: [2.45, 3.25], out: .6, depth: 1.0, colour: '#1e7050' },
    { name: 'red vending machine', u: [.6, 1.4], h: [.1, 1.9], out: .12, depth: .2, colour: '#d2282a' },
  ] }))(storeys([[.4, 2.4], [2.9, 4.9]], 5.514)),
  piers: [[.32, .62], [5.194, 5.494]],
  backFittings: [{ name: 'minimart', u: [.4, 5.2], h: [.2, 2.45], colour: '#4a6a5a', glow: .08 }],
};

export const no362 = {
  ...row(), id: 'gr-362', buildingIds: ['764372553'], kind: 'unnamed', unnamed: true,
  name: 'No. 362 Geylang Road (May 2023 exterior, occupant not identified)', address: '362 Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a house of the row with paired aluminium windows under louvred vents, an air-conditioner in the west window of the first floor, and in the five-foot way a lit white glass shopfront with no board. No sign is photographed, so no name is given.' + note,
  sources: src('764372553'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'air-conditioner', u: [3.75, 4.3], h: [5.1, 5.55], out: .02, depth: .04, colour: '#e8e8e4' },
  ] }))(storeys([[.4, 2.4], [2.85, 4.85]], 5.261)),
  piers: [[.32, .62], [4.941, 5.241]],
  backFittings: [{ name: 'white glass shopfront', u: [.4, 4.9], h: [.2, 3.3], colour: '#dcdcd8', glow: .12 }],
};

export const no364 = {
  ...row(), id: 'gr-364', buildingIds: ['764372552'], kind: 'unnamed', unnamed: true,
  name: 'No. 364 Geylang Road (May 2023 exterior, occupant not identified)', address: '364 Geylang Road (the Lorong 20 corner)',
  evidence: 'KartaView panoramas of May 2023 show the east house of the row at Lorong 20, its parapet stepping up at the corner: two storeys of paired aluminium windows under louvred vents, and over the five-foot way a maroon board reading AL BIDAYAH over a black awning reading UNION ENERGY GROUP 6333 5555, with a dark blade sign at the corner. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given. Its Lorong 20 face is left for a Lorong 20 walk (open question 81).' + note,
  sources: src('764372552'),
  ...(({ blocks, ...rest }) => ({ ...rest, blocks: [
    ...blocks,
    { name: 'stepped parapet', u: [0, .8], h: [11.1, 11.5], out: 0, depth: .2, colour: white },
    { name: 'blank maroon board', u: [.35, 3.9], h: [3.2, 3.6], out: .34, depth: .06, colour: '#6a2a28' },
    { name: 'black awning', u: [.1, 4.0], h: [2.4, 3.1], out: .6, depth: 1.0, colour: '#2a2a2a' },
    { name: 'blank dark blade sign', u: [.05, .17], h: [2.9, 4.7], out: .12, depth: .2, colour: '#3a2a20' },
  ] }))(storeys([[.6, 2.3], [2.8, 4.3]], 4.639)),
  piers: [[.32, .62], [4.319, 4.619]],
  backFittings: [{ name: 'shop', u: [.4, 4.2], h: [.2, 2.4], colour: '#4a4440', glow: .06 }],
};

export const geylang352 = [no352, no354, no356, no358, no360, no362, no364];
export const geylang352Frame = laneFrame, geylang352Layout = laneLayout, geylang352Upper = laneUpper, geylang352Reviews = laneReviews, geylang352Sides = laneSides;
