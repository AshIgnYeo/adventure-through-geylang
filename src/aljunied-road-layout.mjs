// Aljunied Road between Geylang Road and the Lorong 23 coffee shop (open question 102), from the dated extension of
// 22 November 2026 and KartaView's drives of 15 and 16 May 2023 north along the road (sequences 8344585 and 8344809).
// The west side is a row of shophouses behind Lorong 23's east side; the east side holds three office blocks, the
// northern two at the extension's east edge. None shows party walls to place a frame by, so every plot is photographed
// massing on its source outline, matched to the frames by its order along the road. Every building is unnamed for now,
// its boards drawn blank. See docs/aljunied-road-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes, out: .02 })));
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const AR = 'Aljunied Road';
const note = ' It is seen in KartaView\'s drives of 15 and 16 May 2023 along Aljunied Road (open question 84), which show no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(([s, i]) => kv(s, i))];
const A = i => ['8344585', i], B = i => ['8344809', i];

const plot = ({ id, way: w, front, W, height, roof, colours, label, address, look, signs, frames, review = 9, heldFlat, windows, blocks = [], sides }) => ({
  id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: AR, review: { distance: review, pitch: height > 12 ? 30 : 18 },
  ...(heldFlat ? { heldFlat: true } : {}), shellInset: .3, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  name: `${label} (May 2023 massing, occupant not identified)`, address,
  evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ' ' + signs : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.` + note,
  sources: src(w, ...frames), windows, blocks, ...(sides ? { sides } : {}),
});

// West side, south to north.
export const west = [
  plot({ id: 'al-corner', way: '454254142', front: 1, W: 21.11, height: 16.8, colours: { wall: '#efe8d4', frame: '#5a5e60' }, frames: [A('5000'), A('4999'), B('1066')], review: 12,
    label: 'Aljunied Road, the Geylang Road corner', address: 'The corner of Geylang Road and Aljunied Road',
    look: 'a cream block of five storeys at the corner of Geylang Road and Aljunied Road, with windows and air-conditioning units on every floor over shops under blue boards, one reading MONEYMAX',
    signs: 'A red board high on its side reads 新…旅店, a hotel\'s name.',
    windows: grid(spread(21.11, 6, 1.6), [4.4, 7.6, 10.8, 14.0], 1.6),
    blocks: [plain('blank blue boards', span(21.11, .6), [2.8, 3.6], '#2a4a9a', .05, .04), plain('dark shop fronts', span(21.11, .6), [.05, 2.8], '#3a3836')],
    sides: [{ edge: 2, windows: grid(spread(20.77, 6, 1.6), [4.4, 7.6, 10.8, 14.0], 1.6), blocks: [plain('blank blue boards', span(20.77, .6), [2.8, 3.6], '#2a4a9a', .05, .04)] }] }),
  plot({ id: 'al-tiled-house', way: '454438286', front: 1, W: 9.66, height: 3.6, roof: { type: 'hip', ridge: 6.2, colour: '#b4553d' }, colours: { wall: '#f0efea', frame: '#3a3c3e' }, frames: [A('5000'), B('1069')],
    label: 'Aljunied Road, west side, the single-storey house with the tiled roof', address: 'West side of Aljunied Road, north of the side road',
    look: 'a white single-storey house under a red tiled hipped roof on the west side of Aljunied Road, north of the side road behind the Geylang Road corner, with a grey roller shutter and a white wall along the side road',
    blocks: [plain('roller shutter', [3.0, 8.0], [.05, 2.6], '#5a5e60')] }),
  plot({ id: 'al-blue-awning', way: '454438285', front: 1, W: 9.37, height: 7.6, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: [A('5003'), B('1070')],
    label: 'Aljunied Road, west side, the house with the blue awning', address: 'West side of Aljunied Road',
    look: 'a white two-storey shophouse on the west side of Aljunied Road, with a band of dark windows under a deep white fascia and a blue awning over its shop',
    windows: [{ u: [.6, 8.8], h: [4.4, 6.0], panes: 6, out: .02 }],
    blocks: [plain('white fascia', span(9.37), [3.2, 4.2], '#f2f2ee', .1, .2), plain('blue awning', span(9.37, .2), [2.6, 3.1], '#2a5aa8', .5, 1.0)] }),
  plot({ id: 'al-union', way: '454438284', front: 0, W: 14.6, height: 8.4, roof: { type: 'gable', ridge: 11.0, ridgeDepth: .5, overhang: .3, colour: '#8a8c8e' }, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: [A('5003'), A('5006'), B('1072')],
    label: 'Aljunied Road, west side, the gabled building with the energy company\'s sign', address: 'West side of Aljunied Road',
    look: 'a white two-storey building on the west side of Aljunied Road under a grey gable, its front lettered with a company name and logo, over shops under red awnings with a tall vertical board and red lanterns',
    signs: 'Its gable reads UNION ENERGY GROUP.',
    windows: grid(spread(14.6, 3, 1.6), [4.4], 1.6),
    blocks: [plain('red awnings', span(14.6, .3), [2.6, 3.1], '#b8303a', .5, 1.0), plain('blank vertical board', [10.0, 10.8], [3.6, 7.6], '#efe8dc', .3, .1)] }),
  plot({ id: 'al-full-wellness', way: '454254153', front: 0, W: 11.22, height: 7.6, colours: { wall: '#a8acb0', frame: '#f0efea', glass: '#2e3438' }, frames: [A('5009'), B('1076')],
    label: 'Aljunied Road, west side, the grey house with diamond vents', address: 'West side of Aljunied Road',
    look: 'a grey two-storey shophouse on the west side of Aljunied Road, its upper floor with a band of casements under a row of diamond vents, over a wellness shop with a dark board and glass front',
    windows: [{ u: [1.2, 6.6], h: [4.2, 5.8], panes: 4, out: .02 }],
    blocks: [...Array.from({ length: 6 }, (_, k) => plain('diamond vent', [+(1.2 + k * 1.0).toFixed(2), +(1.6 + k * 1.0).toFixed(2)], [6.6, 7.0], '#f0efea', .03, .02)), plain('blank dark board', [1.0, 6.8], [2.8, 3.3], '#2a2c2e', .05, .04)] }),
  plot({ id: 'al-brown-house', way: '454254154', front: 5, W: 8.54, height: 7.6, colours: { wall: '#7a5a4a', frame: '#f0efea', glass: '#2e3438' }, frames: [A('5009'), B('1076')],
    label: 'Aljunied Road, west side, the brown house', address: 'West side of Aljunied Road',
    look: 'a two-storey shophouse rendered in brown on the west side of Aljunied Road, with two windows in white frames under a row of diamond vents, over a white ground floor with timber doors and a tiled forecourt',
    windows: grid([[1.0, 3.6], [4.9, 7.5]], [4.2], 1.6),
    blocks: [plain('white ground floor', span(8.54), [.05, 3.2], '#f0efea', .006, .01), ...Array.from({ length: 5 }, (_, k) => plain('diamond vent', [+(1.2 + k * 1.4).toFixed(2), +(1.6 + k * 1.4).toFixed(2)], [6.6, 7.0], '#f0efea', .03, .02))] }),
  plot({ id: 'al-ornate-pair', way: '454254155', front: 0, W: 13.2, height: 8.6, heldFlat: true, colours: { wall: '#e8d49a', frame: '#5a6a5a', glass: '#3a4044', trim: '#efe4c0' }, frames: [A('5012'), B('1078')], review: 7,
    label: 'Aljunied Road, west side, the ornate pair', address: 'West side of Aljunied Road',
    look: 'a pair of ornate two-storey shophouses on the west side of Aljunied Road, cream-yellow with heavy plaster relief: the southern one with three tall windows behind a relief balustrade under a moulded cornice, the northern one with three arched windows behind lattice grilles over a relief frieze, over a maroon awning and a white awning',
    windows: [...grid([[.6, 1.8], [2.4, 3.6], [4.2, 5.4]], [4.4], 2.0), ...grid([[7.4, 8.6], [9.4, 10.6], [11.4, 12.6]], [4.6], 2.2)],
    blocks: [plain('relief balustrade', [.4, 5.8], [3.6, 4.4], '#efe4c0', .1, .2), plain('relief frieze', [7.0, 13.0], [3.6, 4.4], '#efe4c0', .05, .1), plain('moulded cornice', span(13.2), [7.4, 7.9], '#efe4c0', .1, .2),
      ...[[7.4, 8.6], [9.4, 10.6], [11.4, 12.6]].map(u => plain('arched head', [u[0] - .05, u[1] + .05], [6.8, 7.2], '#efe4c0', .05, .1)),
      plain('maroon awning', [.4, 6.2], [2.6, 3.2], '#7a2a2a', .1, .2), plain('white awning', [6.8, 12.8], [2.6, 3.2], '#efeeea', .1, .2)] }),
  plot({ id: 'al-m35', way: '454254156', front: 2, W: 10.76, height: 8.0, heldFlat: true, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: [A('5015'), B('1080')], review: 7,
    label: 'No. 35 Aljunied Road', address: '35 Aljunied Road (on its board)',
    look: 'a white two-storey shophouse on the west side of Aljunied Road, its upper front covered by a large dark board with beer brands, over a blue awning lettered with beer brands and a dark bar front, with the address 35 Aljunied Road on the board',
    signs: 'The board reads M35. The source way names it Cheng Xing Qi Tian Gong Xiang Yu Hui and tags it a pub.',
    windows: [],
    blocks: [plain('blank dark board', span(10.76, .4), [4.2, 7.4], '#1e2428', .05, .04), plain('blue awning', span(10.76, .2), [3.2, 3.8], '#2a6ab8', .1, .2), plain('dark bar front', span(10.76, .6), [.05, 3.0], '#2a2c2e')] }),
  plot({ id: 'al-durian', way: '454254158', front: 0, W: 10.8, height: 10.4, heldFlat: true, colours: { wall: '#efd88a', frame: '#3a3c3e', glass: '#2e3438' }, frames: [A('5018'), B('1082')], review: 7,
    label: 'Aljunied Road, west side, the fruit shop', address: 'West side of Aljunied Road, south of the Lorong 23 coffee shop',
    look: 'a yellow three-storey shophouse on the west side of Aljunied Road, a fruit shop under a deep blue awning with orange and blue banners, its fruit laid out on the five-foot way',
    signs: 'Its boards read Singapore 新加坡榴槤男孩 DURIAN BOY and Valu$.',
    windows: grid([[1.0, 3.2], [7.6, 9.8]], [4.4, 7.6], 1.6),
    blocks: [plain('blank blue board', [.6, 6.4], [3.6, 4.4], '#2a5aa8', .05, .04), plain('blue awning', span(10.8, .2), [2.8, 3.4], '#2a6ab8', .1, .2), plain('orange banner', span(10.8, .4), [2.2, 2.8], '#e8782a', .05, .04)] }),
];

// East side, south to north.
export const east = [
  plot({ id: 'al-kh-plaza', way: '454274707', front: 3, W: 42.84, height: 22.0, colours: { wall: '#c87a8a', frame: '#3a3c3e', glass: '#2a4a6a' }, frames: [A('5006'), A('5009'), B('1073')], review: 9,
    label: 'No. 12 Aljunied Road', address: '12 Aljunied Road (the source tag)',
    look: 'an office block of six storeys on the east side of Aljunied Road, its floors banded in pink between staggered bands of blue glass, with an orange stair tower of glass at its south end and a forecourt under a canopy',
    signs: 'Its forecourt sign reads KH PLAZA, as the source way names it.',
    windows: grid([[6.0, 41.8]], [4.4, 7.8, 11.2, 14.6, 18.0], 2.4, 16),
    blocks: [plain('orange stair tower', [.3, 5.4], [0, 23.0], '#d86a2a', .3, .6), plain('canopy', [14.0, 30.0], [3.6, 4.0], '#d8d8d4', 1.0, 2.0)] }),
  plot({ id: 'al-api', way: '454274704', front: 2, W: 55.06, height: 22.0, colours: { wall: '#3a5a7a', frame: '#d8dcdc', glass: '#3a6a8a' }, frames: [A('5012'), A('5015'), B('1079')], review: 10,
    label: 'Aljunied Road, east side, the blue glass institute', address: 'East side of Aljunied Road',
    look: 'a block of six storeys clad in blue glass on the east side of Aljunied Road, with an orange end tower, a porch over its entrance and red lettering under its parapet',
    signs: 'The lettering reads API ASIAN PASTORAL INSTITUTE 亞洲牧靈中心; the source way is named Elite Building.',
    windows: grid([[6.0, 54.0]], [4.4, 7.8, 11.2, 14.6, 18.0], 2.6, 20),
    blocks: [plain('orange end tower', [.3, 5.0], [0, 23.0], '#d86a2a', .3, .6), plain('porch', [22.0, 34.0], [3.6, 4.2], '#d8d8d4', 1.5, 3.0), plain('blank red lettering', [20.0, 36.0], [19.2, 20.6], '#c8302a', .05, .04)] }),
  plot({ id: 'al-union-trove', way: '454274694', front: 3, W: 24.54, height: 17.0, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#3a4a56' }, frames: [A('5018'), B('1082')], review: 7,
    label: 'Aljunied Road, east side, the white block at the extension\'s edge', address: 'East side of Aljunied Road, north of the blue glass institute',
    look: 'a white block of five storeys on the east side of Aljunied Road with rows of windows and a red and blue logo and lettering under its parapet, partly hidden behind traffic in the frames',
    signs: 'The lettering reads UNION TROVE.',
    windows: grid(spread(24.54, 6, 1.6), [4.4, 7.6, 10.8, 14.0], 1.6),
    blocks: [plain('blank lettering', [6.0, 18.0], [15.2, 16.4], '#c8302a', .05, .04)] }),
];

export const aljuniedRoad = [...west, ...east];
export const aljuniedRoadFrame = laneFrame, aljuniedRoadLayout = laneLayout, aljuniedRoadUpper = laneUpper, aljuniedRoadReviews = laneReviews, aljuniedRoadSides = laneSides;
