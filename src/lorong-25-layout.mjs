// Lorong 25 from Geylang Road to Sims Avenue (open question 105), from its own narrow extract of 28 November 2026 and
// KartaView's drive of 16 May 2023 (sequence 8344809): frames 2021-2047 up the lane and 556-571 west along Geylang Road.
// The lane's east side holds a terrace of eleven two-storey houses, Nos. 6-26, each modelled on its outline with its
// colours and shutters as photographed. Every other plot is photographed massing on its source outline, matched to the
// frames by its order along the lane, with openings placed by estimate. Heights follow storey counts and carry about
// ±2 m, ±4 m for the blocks of five storeys or more. Every building is unnamed for now, its boards drawn blank.
// See docs/lorong-25-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const r2 = v => +v.toFixed(2);
const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [r2(c - w / 2), r2(c + w / 2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [r2(b), r2(b + hh)], panes, out: .02 })));
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const span = (W, m = .03) => [m, r2(W - m)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const note = ' It is seen in KartaView\'s drive of 16 May 2023 (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';

const plot = ({ id, way: w, front, W, storeys, height = r2(storeys * 3.2 + .4), road = 'Lorong 25 Geylang', roof, colours, label, address, look, signs, frames, review, windows, blocks = [] }) => ({
  id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: road,
  review: { distance: review, pitch: height > 14 ? 34 : 18 }, shellInset: .3, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  name: `${label} (May 2023 massing, occupant not identified)`, address,
  evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ' ' + signs : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.${storeys > 1 ? ` Its height follows its ${storeys} storeys and carries about ±${storeys >= 5 ? 4 : 2} m.` : ''}` + note,
  sources: [way(w), ...frames.map(f => kv('8344809', f))],
  windows: windows ?? grid(spread(W, Math.max(1, Math.round((W - 1) / 3.2)), Math.min(1.5, W / 3)), floors(storeys - 1, 4.1, 3.2), 1.6), blocks,
});

// The terrace, Nos. 6-26 (ways 1225192324-1225192334). Each house fronts the lane on its short west end, about 5 m wide,
// with a five-foot way under its upper floor; the source tags Nos. 14, 16, 20 and 22 to Lorong 15, a slip for Lorong 25.
const TERRACE = { ceiling: 3.6, height: 9.0 };
const terraceNote = ' The terrace is seen house by house from the lane in KartaView\'s drive of 16 May 2023 (open question 84). Each house is modelled on its own outline, its five-foot way under the upper floor, its colours and shutters as photographed and its windows placed by estimate; the height of about 9 m to the eaves follows the two storeys and carries about ±1 m.';
// `inset` keeps the five-foot way inside an outline whose party walls run off square to the curving lane.
const house = ({ w, number, W, front = 2, wall, accent, shutters, frame = '#5a5048', frames, look, signs, review, ornate = true, porch, inset = .25 }) => {
  const c = W / 2, n = W > 4.6 ? 3 : 2, step = W > 4.6 ? 1.45 : 1.3, E = r2(W - .01);
  const us = Array.from({ length: n }, (_, i) => c + (i - (n - 1) / 2) * step).map(x => [r2(x - .52), r2(x + .52)]);
  return {
    id: `l25-${number}`, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: 'Lorong 25 Geylang',
    review: { distance: review, pitch: 16 }, heldFlat: true, returns: false, shellInset: inset, upperInset: .1, fiveFootWay: 1.8,
    ceiling: TERRACE.ceiling, height: TERRACE.height,
    roof: { type: 'gable', ridge: 11.2, ridgeDepth: .5, overhang: .4, colour: '#9a5a44' },
    colours: { wall, trim: '#f2eee6', frame, glass: '#3a3a38', back: '#4a4440', floor: '#b8b0a2', pier: wall },
    name: `No. ${number} Lorong 25 Geylang (May 2023 massing, occupant not identified)`, address: `${number} Lorong 25 Geylang`,
    evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ' ' + signs : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.` + terraceNote,
    sources: [way(w), ...frames.map(f => kv('8344809', f))],
    windows: us.map(u => ({ u, h: [5.2, 7.4], panes: 2, out: .02 })),
    blocks: [
      plain('painted facade', [.01, E], [TERRACE.ceiling, 8.7], wall, .006, .01),
      plain('floor beam', [.01, E], [TERRACE.ceiling, 4.2], '#f2eee6', .04, .08),
      ...(ornate ? [
        ...us.map(([a, b]) => plain('closed louvred shutters', [r2(a + .03), r2(b - .03)], [5.23, 7.37], shutters, .04, .006)),
        ...us.map(([a, b]) => plain('arched head', [r2(a - .06), r2(b + .06)], [7.4, 7.6], accent, .05, .1)),
        ...[[.01, .25], [r2(W - .25), E]].map(u => plain('pilaster', u, [4.2, 8.3], accent, .04, .08)),
        plain('relief frieze', [.3, r2(W - .3)], [4.3, 4.8], accent, .025, .02),
        plain('ornate cornice', [.01, E], [8.3, 8.8], '#f2eee6', .1, .2),
      ] : [
        ...us.map(([a, b]) => plain('casement frame', [r2(a - .04), r2(b + .04)], [5.16, 7.44], frame, .015, .01)),
        plain('plain cornice', [.01, E], [8.4, 8.8], '#f2eee6', .08, .16),
      ]),
      ...(porch ? [plain('red tiled porch roof', [.2, r2(W - .2)], [3.4, 3.7], '#b4553d', .1, .2)] : []),
    ],
  };
};

export const lorong25 = [
  // Geylang Road, between Aljunied Road and the lane.
  plot({ id: 'l25-gr-447', way: '454254125', front: 7, W: 15.34, storeys: 3, road: 'Geylang Road', colours: { wall: '#eeede8', frame: '#3a3c3e', glass: '#3a4a56' }, frames: ['571', '568'], review: 14,
    label: 'No. 447 Geylang Road, the Aljunied Road corner', address: '447 Geylang Road (the source tag), at the east corner of Aljunied Road',
    look: 'a white three-storey block on the corner of Geylang Road and Aljunied Road, with rows of wide windows over a ground floor of shutters and glass, and a small red and white board',
    blocks: [plain('dark ground floor', span(15.34, .4), [.05, 3.0], '#4a4a48')] }),
  plot({ id: 'l25-gr-row', way: '454254123', front: 15, W: 43.07, storeys: 2, height: 8.2, road: 'Geylang Road', colours: { wall: '#e6dcc4', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['568', '565', '562'], review: 14,
    label: 'Geylang Road, the row between Aljunied Road and Lorong 25', address: 'North side of Geylang Road between Aljunied Road and Lorong 25',
    look: 'a row of two-storey shophouses on the north side of Geylang Road, from a plain cream house at the west end through a shop under red and blue awnings and an electrical shop under a brown awning to a yellow corner house at Lorong 25 with a curved upper floor and a street sign',
    signs: 'The boards read BBQ MASTER with Chinese characters, and TOYOMI NATIONAL ELECTRICAL TRADERS.',
    windows: grid(spread(43.07, 12, 1.4), [4.4], 1.5),
    blocks: [plain('yellow corner house', [34.6, 42.5], [.2, 8.0], '#e8b84a', .006, .01), plain('dark ground floor', [.4, 42.6], [.05, 3.0], '#3a3836'),
      plain('blank red board', [11.4, 21.6], [3.2, 3.8], '#b8302a', .05, .04), plain('red and blue awning', [11.2, 21.8], [2.6, 3.0], '#b8302a', .5, .9),
      plain('blank cream board', [22.4, 33.6], [3.2, 3.8], '#e8e4d8', .05, .04), plain('brown awning', [22.2, 33.8], [2.6, 3.0], '#6a4a32', .5, .9)] }),
  // West side, south to north.
  plot({ id: 'l25-association', way: '454254129', front: 2, W: 18.84, storeys: 2, height: 8.6, colours: { wall: '#eeece6', frame: '#5a5e60', glass: '#3a4044' }, frames: ['2027', '2029'], review: 8,
    label: 'Lorong 25 Geylang, west side, the white association house', address: 'West side of Lorong 25 Geylang, behind the Geylang Road row',
    look: 'a white two-storey building lettered in Chinese along its parapet, its rows of windows behind a whitewashed wall of patterned breeze blocks and an iron gate on the west side of Lorong 25',
    signs: 'The parapet lettering names a Singapore clan association.',
    blocks: [plain('parapet', span(18.84), [7.6, 8.6], '#f2f0ea', .05, .1), plain('breeze-block wall', [.3, 18.5], [0, 2.2], '#d8d6ce', .3, .2)] }),
  plot({ id: 'l25-temple-gate', way: '454254128', front: 2, W: 6.40, storeys: 1, height: 4.4, colours: { wall: '#e8dcc0', frame: '#8a2a22', glass: '#3a2a22', trim: '#c8302a' }, frames: ['2029', '2031'], review: 9,
    label: 'Lorong 25 Geylang, west side, the temple gate', address: 'West side of Lorong 25 Geylang',
    look: 'the gate of a small Chinese temple on the west side of Lorong 25: an arch topped by green glazed dragons over yellow gates, in a wall capped with green tiles',
    roof: { type: 'gable', ridge: 5.6, ridgeDepth: .4, overhang: .4, colour: '#2e7a5a' }, windows: [],
    blocks: [plain('yellow gates', [1.4, 5.0], [.05, 2.6], '#d8c040', .03, .04), plain('green dragon arch', [.8, 5.6], [2.8, 3.4], '#3a9a6a', .1, .2)] }),
  plot({ id: 'l25-temple', way: '454254127', front: 3, W: 6.58, storeys: 1, height: 5.4, colours: { wall: '#e8dcc0', frame: '#8a2a22', glass: '#3a2a22', trim: '#c8302a' }, frames: ['2031', '2033'], review: 8,
    label: 'Lorong 25 Geylang, west side, the temple hall', address: 'West side of Lorong 25 Geylang',
    look: 'a single-storey Chinese temple hall behind its gate on the west side of Lorong 25, under a green glazed tile roof with upturned ends, half hidden by bamboo and frangipani',
    roof: { type: 'gable', ridge: 7.0, ridgeDepth: .5, overhang: .6, colour: '#2e7a5a' }, windows: [],
    blocks: [plain('red doors', [2.0, 4.6], [.05, 2.8], '#a8201a', .03, .04), ...[[.6, .9], [5.7, 6.0]].map(u => plain('red column', u, [0, 4.6], '#c8302a', .3, .3))] }),
  plot({ id: 'l25-welfare', way: '454254126', front: 1, W: 15.47, storeys: 5, colours: { wall: '#efc9a8', frame: '#2a6aa8', glass: '#3a4a56' }, frames: ['2033', '2035'], review: 14,
    label: 'Lorong 25 Geylang, west side, the salmon block', address: 'West side of Lorong 25 Geylang',
    look: 'a cream and salmon block of five storeys on the west side of Lorong 25, its windows framed in blue, behind a low wall and gate with a banner for a kindergarten',
    signs: 'A board on the block names a welfare society, in English and Chinese.',
    blocks: [plain('low wall', [.3, 15.2], [0, 1.4], '#e8c8a8', .5, .2)] }),
  plot({ id: 'l25-centra-south', way: '454274700', front: 2, W: 14.78, storeys: 6, colours: { wall: '#e8e8e4', frame: '#4a4c4e', glass: '#3a4a56' }, frames: ['2035', '2037'], review: 11,
    label: 'Lorong 25 Geylang, west side, the timber-fenced block', address: 'West side of Lorong 25 Geylang',
    look: 'a white and grey apartment block of about six storeys on the west side of Lorong 25, behind trees and a fence of timber posts',
    blocks: [plain('timber fence', [.3, 14.5], [0, 2.0], '#7a5a3e', .6, .15)] }),
  plot({ id: 'l25-centra', way: '454274699', front: 2, W: 20.93, storeys: 7, colours: { wall: '#ecece8', frame: '#4a4c4e', glass: '#3a4a56' }, frames: ['2037', '2039'], review: 11,
    label: 'Lorong 25 Geylang, west side, the studio apartments', address: 'West side of Lorong 25 Geylang',
    look: 'a white apartment block of about seven storeys on the west side of Lorong 25, with deep balconies screened in grey, an entrance under a cantilevered canopy and a driveway marked IN and OUT behind grey gates',
    signs: 'A grey wall carries a ring logo and the words CENTRA STUDIOS.',
    windows: grid([[1.0, 9.4], [11.0, 19.9]], floors(6, 4.1, 3.2), 1.8, 4),
    blocks: [...floors(6, 3.8, 3.2).map(b => plain('grey balcony screen', [1.0, 19.9], [r2(b), r2(b + 1.0)], '#8a8c8e', .5, .1)), plain('grey gates', [2.0, 12.0], [0, 1.8], '#5a5c5e', .4, .1)] }),
  plot({ id: 'l25-church', way: '454274697', front: 1, W: 20.69, storeys: 6, colours: { wall: '#8a8580', frame: '#3a3836', glass: '#2e3438' }, frames: ['2041', '2043'], review: 10,
    label: 'Lorong 25 Geylang, west side, the church', address: '39 Lorong 25 Geylang (the gate number)',
    look: 'a grey church building of about six storeys on the west side of Lorong 25, its front clad in vertical fins and panels with a tall white cross, behind a low grey wall and gates numbered 39',
    signs: 'Chinese characters beside the cross name a Bible-Presbyterian church.',
    blocks: [plain('white cross', [4.0, 5.2], [3.8, 7.6], '#f2f2ee', .06, .06), ...spread(20.69, 9, .25, .6).map(u => plain('vertical fin', u, [3.6, 19.4], '#a8a49e', .2, .3))] }),
  plot({ id: 'l25-supermarket', way: '454274695', front: 1, W: 25.17, storeys: 4, colours: { wall: '#ecebe6', frame: '#5a5e60', glass: '#3a4a56' }, frames: ['2043', '2045', '2047'], review: 8,
    label: 'Lorong 25 Geylang, the Sims Avenue corner, west side', address: 'West corner of Lorong 25 and Sims Avenue',
    look: 'a white four-storey block on the west corner of Lorong 25 and Sims Avenue, with green-tinted windows and a supermarket at street level under long red awnings',
    signs: 'The board reads U STARS SUPERMARKET, with Chinese characters.',
    blocks: [plain('blank red board', [6.0, 20.0], [3.2, 3.8], '#b8302a', .05, .04), plain('red awning', [.5, 24.6], [2.5, 2.9], '#b8302a', .5, .9)] }),
  // East side, south to north.
  plot({ id: 'l25-green-block', way: '454254122', front: 2, W: 17.44, storeys: 4, colours: { wall: '#c8dccb', frame: '#3a4a3a', glass: '#2a3430' }, frames: ['2023', '2025', '559', '562'], review: 10.5,
    label: 'Lorong 25 Geylang, east side, the Geylang Road corner', address: 'East corner of Lorong 25 and Geylang Road',
    look: 'a weathered pale green four-storey building between Lorong 25 and Lorong 25A on Geylang Road, empty, with dark windows under small hoods and a ground floor closed off by printed hoardings advertising a co-living development',
    signs: 'The hoardings read cove and MEIR COLLECTIVE.',
    blocks: [plain('printed hoarding', [.3, 17.1], [0, 2.6], '#4a3a4a', .6, .1)] }),
  plot({ id: 'l25-skewer', way: '454254130', front: 7, W: 9.85, storeys: 2, height: 7.6, colours: { wall: '#3a8ac8', frame: '#f2f2ee', glass: '#2e3438' }, frames: ['2027'], review: 13,
    label: 'Lorong 25 Geylang, east side, the blue shophouse', address: 'East side of Lorong 25 Geylang',
    look: 'a blue two-storey shophouse on the east side of Lorong 25, its upper windows with white blinds over a bar under a black awning, with bar stools along its front',
    signs: 'The boards read THE SKEWER BAR and THE SEAFOOD BAR.',
    windows: grid(spread(9.85, 3, 1.6), [4.4], 1.4, 3),
    blocks: [plain('blank white board', [3.0, 6.8], [3.4, 3.9], '#f2f2ee', .05, .04), plain('black awning', [.3, 9.5], [2.6, 3.2], '#1e1e20', .6, .9)] }),
  house({ w: '1225192332', number: '6', inset: 1.1, W: 10.71, front: 3, wall: '#f2f0ea', accent: '#f2f0ea', shutters: '#e8e4dc', frames: ['2031'], review: 7, ornate: false, porch: true,
    look: 'No. 6, the south end of the terrace on the east side of Lorong 25: a plain white house whose ground floor sits under a red tiled lean-to roof hung with bamboo and white blinds, below a plain upper storey with two small windows' }),
  house({ w: '1225192334', number: '8', inset: 0.9, W: 4.17, wall: '#e8c8c0', accent: '#f2eee6', shutters: '#a8282a', frames: ['2031', '2033'], review: 7.5,
    look: 'No. 8 in the terrace on the east side of Lorong 25: an ornate two-storey house in weathered pink, its upper windows behind red-framed louvred shutters, over an open shopfront' }),
  house({ w: '1225192333', number: '10', inset: 0.9, W: 4.18, wall: '#c8d8d4', accent: '#3ab8b0', shutters: '#7a8a98', frames: ['2033'], review: 7.5,
    look: 'No. 10 in the terrace on the east side of Lorong 25: an ornate two-storey house with teal pilasters and grey louvred shutters, a canvas blind down over its five-foot way' }),
  house({ w: '1225192331', number: '12', inset: 0.9, W: 5.40, wall: '#e0e4c0', accent: '#e8c040', shutters: '#f2eee6', frames: ['2033', '2035'], review: 7.5,
    look: 'No. 12 in the terrace on the east side of Lorong 25: an ornate two-storey house with yellow pilasters on a pale green front and white shutters' }),
  house({ w: '1225192330', number: '14', inset: 0.9, W: 5.43, wall: '#d8e4c8', accent: '#e8a0a8', shutters: '#f2eee6', frames: ['2035'], review: 7.5,
    look: 'No. 14 in the terrace on the east side of Lorong 25: an ornate two-storey house in pale green with pink capitals and white shutters, a light blue board over its five-foot way',
    signs: 'The board reads LONG CHENG PTE LTD, with Chinese characters.' }),
  house({ w: '1225192329', number: '16', inset: 0.4, W: 5.08, wall: '#f2f0ea', accent: '#f2f0ea', shutters: '#f2eee6', frames: ['2035'], review: 7.5,
    look: 'No. 16 in the terrace on the east side of Lorong 25: an ornate two-storey house painted white throughout, with white louvred shutters' }),
  house({ w: '1225192327', number: '18', inset: 0.4, W: 5.12, wall: '#f2f0ea', accent: '#f2f0ea', shutters: '#f2eee6', frames: ['2035'], review: 7.5,
    look: 'No. 18 in the terrace on the east side of Lorong 25: an ornate two-storey house painted white throughout, with white louvred shutters and its number beside a timber door' }),
  house({ w: '1225192328', number: '20', inset: 0.55, W: 5.18, wall: '#f2f0ea', accent: '#f2f0ea', shutters: '#f2eee6', frames: ['2035', '2037'], review: 7.5,
    look: 'No. 20 in the terrace on the east side of Lorong 25: an ornate white two-storey house with a red board of Chinese characters and red lanterns over its five-foot way' }),
  house({ w: '1225192326', number: '22', W: 5.02, wall: '#eeeee8', accent: '#e8eae4', shutters: '#f2eee6', frames: ['2037'], review: 7.5,
    look: 'No. 22 in the terrace on the east side of Lorong 25: an ornate two-storey house in white and pale grey with white shutters' }),
  house({ w: '1225192325', number: '24', W: 5.01, wall: '#c8302a', accent: '#e8c040', shutters: '#e8b840', frames: ['2037', '2039'], review: 7.5,
    look: 'No. 24 in the terrace on the east side of Lorong 25: a house temple, its ornate front painted red with green trim and yellow shutters, red banners and lanterns over its five-foot way, a canvas awning and gold and stone pagoda burners in front' }),
  house({ w: '1225192324', number: '26', W: 5.02, wall: '#e8e6de', accent: '#e8e6de', shutters: '#e8e4d8', frames: ['2037', '2039'], review: 8,
    look: 'No. 26, the north end of the terrace on the east side of Lorong 25: an ornate two-storey house in pale grey and white with white louvred shutters and green-painted eaves' }),
  plot({ id: 'l25-brick-block', way: '454254133', front: 3, W: 7.41, storeys: 5, colours: { wall: '#b0503a', frame: '#3a3836', glass: '#2e3438' }, frames: ['2039', '2041'], review: 13,
    label: 'Lorong 25 Geylang, east side, the red brick block', address: 'East side of Lorong 25 Geylang, north of the terrace',
    look: 'a narrow red brick block of five storeys on the east side of Lorong 25, its windows set in angled bays with flower boxes, over a gated parking floor',
    windows: grid([[1.2, 6.2]], floors(4, 4.1, 3.2), 1.6, 3),
    blocks: floors(4, 3.8, 3.2).map(b => plain('brick flower box', [1.0, 6.4], [r2(b), r2(b + .5)], '#a8402e', .4, .3)) }),
  plot({ id: 'l25-no-38', way: '454254136', front: 2, W: 20.76, storeys: 5, colours: { wall: '#c8ccd0', frame: '#3a3c3e', glass: '#3a4a56' }, frames: ['2041', '2043'], review: 19,
    label: 'No. 38 Lorong 25 Geylang', address: '38 Lorong 25 Geylang (the gate number)',
    look: 'a grey apartment block of five storeys on the east side of Lorong 25, its front banded in pale pink between the windows, behind a white wall with grey railings and a gate numbered 38',
    blocks: [plain('pink band', [2.0, 6.0], [3.8, 16.0], '#ecd2c4', .006, .01), plain('pink band', [10.0, 14.0], [3.8, 16.0], '#ecd2c4', .006, .01), plain('white wall', [.3, 20.4], [0, 1.6], '#ecebe6', .8, .2)] }),
  plot({ id: 'l25-sims-250', way: '475904848', front: 1, W: 19.32, storeys: 5, height: 19.0, road: 'Sims Avenue', colours: { wall: '#d8dadc', frame: '#3a3c3e', glass: '#2a4a6a' }, frames: ['2045', '2047'], review: 15,
    label: 'No. 250 Sims Avenue, the Lorong 25 corner', address: '250 Sims Avenue, at the east corner of Lorong 25',
    look: 'a grey office block of five storeys on the east corner of Lorong 25 and Sims Avenue, with bands of blue glass, a rounded corner and orange columns along its ground floor',
    signs: 'Large letters read 250 Sims Avenue; the source way is named SPCS Building.',
    windows: grid([[1.0, 18.3]], floors(4, 4.4, 3.6), 2.4, 6),
    blocks: [...spread(19.32, 4, .6, .8).map(u => plain('orange column', u, [0, 4.0], '#e0602a', .5, .6)), plain('blue glass band', [.5, 18.8], [11.6, 14.6], '#2a4a6a', .03, .02)] }),
];
export const lorong25Frame = laneFrame, lorong25Layout = laneLayout, lorong25Upper = laneUpper, lorong25Reviews = laneReviews, lorong25Sides = laneSides;
