// Lorong 22's west side from Guillemard Road to Geylang Road (open question 98), from the dated extension of
// 22 November 2026 and KartaView's drive of 16 May 2023 up the lane (sequence 8344809, frames 1036-1060). The plots stand
// 13-30 m back from the lane behind yards, car parks and fences. None shows party walls to place a frame by, so every
// plot is photographed massing on its source outline, matched to the frames by its order along the lane. The extension
// stops at the lane, so its east side waits. Every building is unnamed for now, its boards drawn blank.
// See docs/lorong-22-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .6) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 22 Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 16 May 2023 up the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344809', f))];
const unnamed = (id, label, name, address, evidence, sources) => ({ id: `l22-${label}`, buildingIds: [id], kind: 'unnamed', unnamed: true, name: `${name} (May 2023 massing, occupant not identified)`, address, evidence: evidence + note, sources });

export const karmaKagyud = {
  ...mass({ wall: '#efe6d4', frame: '#7a2a2a', glass: '#2e3438', trim: '#7a2a2a' }, { frontEdge: 9, review: { distance: 21, pitch: 32 }, height: 24.0 }),
  ...unnamed('474904365', 'karma-kagyud', 'No. 38 Lorong 22 Geylang', '38 Lorong 22 Geylang (a plate 38 on its gate post)',
    'KartaView panoramas of May 2023 show a cream block of about seven storeys near the Guillemard Road end of the lane, banded in maroon with windows in maroon frames and a top floor under deep red eaves lettered KARMA KAGYUD BUDDHIST CENTRE, a gilded red gateway canopy over its entrance between gold finials, and the plate 38 on its gate post. The source way carries the same name; listings could not be checked (open question 84), so no name is given and the lettering is not drawn. Its height follows its storeys and carries about ±4 m.',
    src('474904365', '1037', '1036', '1038')),
  windows: grid(spread(11.45, 3, 1.4), floors(5, 4.6, 3.2), 1.8, 2),
  blocks: [
    ...floors(5, 4.3, 3.2).map(b => plain('maroon band', span(11.45), [+b.toFixed(2), +(b + .25).toFixed(2)], '#7a2a2a', .04, .04)),
    plain('red eave band', span(11.45), [20.6, 22.4], '#8a2a2a', .3, .6),
    plain('gilded red gateway canopy', [3.6, 7.8], [3.0, 4.6], '#b8302a', .8, 1.6),
    ...[[3.2, 3.6], [7.8, 8.2]].map(u => plain('gold finial', u, [0, 4.8], '#c8a040', 1.4, .3)),
  ],
};

export const no36 = {
  ...mass({ wall: '#b8c0c8', frame: '#4a5a6a', glass: '#2a4a6a' }, { frontEdge: 1, review: { distance: 21.5, pitch: 34 }, height: 27.0 }),
  ...unnamed('454438305', '36', 'No. 36 Lorong 22 Geylang', '36 Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a grey-blue tower of eight storeys behind the gate of No. 38, its face divided by tall pale vertical fins between bands of dark blue glass. The source way is tagged eight levels. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±4 m.',
    src('454438305', '1037', '1041', '1038')),
  windows: grid(spread(19.24, 6, 1.6), floors(7, 4.4, 3.1), 2.2, 2),
  blocks: [...[2.6, 5.9, 9.2, 12.5, 15.8].map(a => plain('pale vertical fin', [a, a + .5], [3.6, 27.0], '#e0e4e8', .3, .6)), plain('dark glass band', [8.6, 10.6], [3.6, 27.0], '#2a4a6a', .06, .04)],
};

export const no34 = {
  ...mass({ wall: '#e8bcc0', frame: '#3a5a7a', glass: '#2a4a7a' }, { frontEdge: 1, review: { distance: 21, pitch: 34 }, height: 27.0 }),
  ...unnamed('454438306', '34', 'No. 34 Lorong 22 Geylang', '34 Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a pink tower of eight storeys with broad vertical panels of blue glass, a curved glass bay at its top under a green dome, and a teal board reading HOTEL over its entrance behind a low wall. The source way is named Lemon Grass and tagged eight levels; listings could not be checked (open question 84), so no name is given and the board is drawn blank. Its height follows its storeys and carries about ±4 m.',
    src('454438306', '1041', '1037', '1042')),
  windows: grid(spread(17.11, 4, 1.4), floors(7, 4.4, 3.1), 1.6, 2),
  blocks: [
    ...[[3.6, 6.6], [10.5, 13.5]].map(u => plain('blue glass panel', u, [3.8, 26.4], '#2a4a8a', .1, .1)),
    plain('blank teal board', [5.0, 12.0], [3.0, 3.8], '#5ac8c0', .1, .1),
    plain('green dome', [7.0, 10.0], [27.0, 29.0], '#3a8a8a', -3.0, 3.0),
  ],
};

export const greyShop = {
  ...mass({ wall: '#4a4c50', frame: '#d8dcdc', glass: '#c8d0d4' }, { frontEdge: 3, review: { distance: 15, pitch: 16 }, height: 7.6 }),
  ...unnamed('454274583', 'grey-shop', 'Lorong 22 Geylang, west side, the dark grey shop', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a dark grey two-storey building on the west side of the lane, with a long frosted-glass front lettered with an offer from $5 and a dark fascia, beside a gated yard. Listings could not be checked (open question 84), so no name is given and the lettering is not drawn.',
    src('454274583', '1041', '1042', '1043')),
  blocks: [plain('frosted glass front', [3.0, 11.4], [.2, 3.6], '#c8d0d4', .03, .04), plain('dark fascia', span(11.77), [3.8, 5.6], '#2a2c2e', .05, .1)],
};

export const whiteHouse = {
  ...mass({ wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 13, pitch: 20 }, height: 10.4 }),
  ...unnamed('454274580', 'white-house', 'Lorong 22 Geylang, west side, the white three-storey house', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a weathered white three-storey house behind a corrugated fence and trees on the west side of the lane, with small windows and a balcony on its top floor. Listings could not be checked (open question 84), so no name is given.',
    src('454274580', '1043', '1044')),
  windows: grid(spread(12.2, 3, 1.4), [1.0, 4.2, 7.4], 1.5, 2),
  blocks: [plain('corrugated fence', span(12.2, .2), [0, 2.0], '#c8ccd0', 3.0, .05)],
};

export const timberHouse = {
  ...mass({ wall: '#9a6a44', frame: '#5a3a24', glass: '#3a3028' }, { frontEdge: 1, review: { distance: 10.5, pitch: 10 }, height: 4.6, roof: { type: 'hip', ridge: 7.4, colour: '#b4553d' } }),
  ...unnamed('454274578', 'timber-house', 'Lorong 22 Geylang, west side, the timber house', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a single-storey timber house raised on a white base with steps up to its door, under an orange tiled hipped roof with a deep overhang on timber posts, behind a wire fence and a gate with a small house plate. Listings could not be checked (open question 84), so no name is given.',
    src('454274578', '1044', '1045')),
  windows: [{ u: [1.0, 2.4], h: [1.8, 3.4], panes: 2 }, { u: [4.6, 6.0], h: [1.8, 3.4], panes: 2 }],
  blocks: [plain('white base', span(7.09), [0, 1.2], '#e8e6e0', .05, .1), plain('steps', [2.8, 4.2], [0, 1.2], '#d8d6d0', .6, 1.2), plain('wire fence', span(7.09, .1), [0, 1.8], '#8a9090', 5.0, .03)],
};

export const peachBlock = {
  ...mass({ wall: '#ecc8a4', frame: '#5a4a3a', glass: '#3a4044' }, { frontEdge: 6, review: { distance: 18, pitch: 20 }, height: 10.4 }),
  ...unnamed('454274575', 'peach-block', 'Lorong 22 Geylang, west side, the peach block', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a peach three-storey block behind an open yard on the west side of the lane, with round arched openings on its ground floor, small balconies and windows with air-conditioning units above. Listings could not be checked (open question 84), so no name is given.',
    src('454274575', '1044', '1047', '1048')),
  windows: grid(spread(26.1, 6, 1.4), [4.2, 7.4], 1.5, 2),
  blocks: [...[[6.0, 8.0], [10.0, 12.0], [14.0, 16.0]].map(u => plain('arched opening', u, [.05, 2.6], '#3a3634', .03, .04))],
};

export const shrineHouse = {
  ...mass({ wall: '#efeeea', frame: '#c8302a', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 21, pitch: 10 }, height: 3.4, roof: { type: 'hip', ridge: 5.6, colour: '#c8603a' } }),
  ...unnamed('454438308', 'shrine-house', 'Lorong 22 Geylang, west side, the house with the shrine', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a small white single-storey house under an orange tiled hipped roof on red columns, with a small red and gold shrine in front, behind a green mesh fence between yellow gate piers. Listings could not be checked (open question 84), so no name is given.',
    src('454438308', '1050', '1049')),
  blocks: [
    ...[[1.0, 1.3], [6.4, 6.7], [11.8, 12.1]].map(u => plain('red column', u, [0, 3.2], '#c8302a', .4, .2)),
    plain('red and gold shrine', [6.0, 7.0], [.8, 2.4], '#c8302a', 2.0, .8),
    plain('green mesh fence', span(13.08, .2), [0, 1.9], '#2e7a6a', 12.0, .05),
    ...[[4.6, 5.2], [8.6, 9.2]].map(u => plain('yellow gate pier', u, [0, 2.2], '#e8c428', 12.0, .5)),
  ],
};

export const greyTower = {
  ...mass({ wall: '#a8acb0', frame: '#2a2c2e', glass: '#2a2e32' }, { frontEdge: 1, review: { distance: 26, pitch: 30 }, height: 24.0 }),
  ...unnamed('454438309', 'grey-tower', 'Lorong 22 Geylang, west side, the narrow grey tower', 'West side of Lorong 22 Geylang',
    'KartaView panoramas of May 2023 show a narrow grey block of about seven storeys set back on the west side of the lane, its end facing the lane with bands of black-framed windows on each floor. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±4 m.',
    src('454438309', '1054', '1053')),
  windows: grid(spread(30.35, 6, 3.0), floors(6, 4.0, 3.3), 1.8, 4),
};

export const longHouse = {
  ...mass({ wall: '#efeeea', frame: '#5a5e60', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 25.5, pitch: 8 }, height: 3.4, roof: { type: 'hip', ridge: 5.4, colour: '#b4443a' } }),
  ...unnamed('454438310', 'long-house', 'Lorong 22 Geylang, west side, the long tiled house', 'West side of Lorong 22 Geylang, near Geylang Road',
    'KartaView panoramas of May 2023 show a long white single-storey house under a red tiled hipped roof near the Geylang Road end of the lane, with an awning and a stall under a parasol at its front. Listings could not be checked (open question 84), so no name is given.',
    src('454438310', '1054', '1055', '1056')),
  windows: grid(spread(14.38, 3, 1.4), [.9], 1.4, 2),
  blocks: [plain('awning', [2.0, 9.0], [2.4, 2.8], '#c8c8c4', .6, 1.2)],
};

export const lorong22 = [karmaKagyud, no36, no34, greyShop, whiteHouse, timberHouse, peachBlock, shrineHouse, greyTower, longHouse];
export const lorong22Frame = laneFrame, lorong22Layout = laneLayout, lorong22Upper = laneUpper, lorong22Reviews = laneReviews, lorong22Sides = laneSides;
