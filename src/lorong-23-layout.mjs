// Lorong 23 from Geylang Road to Sims Avenue (open question 97), from the dated extension of 22 November 2026 and
// KartaView's drive of 16 May 2023 down the lane twice (sequence 8344809, frames 3018-3039 and 3203-3222). The east side
// is a run of shophouses and blocks from a coffee shop at the Sims Avenue end to a pink corner block on Geylang Road;
// the west side holds a long two-storey block behind trees and a fenced compound at the Geylang Road corner. None shows
// party walls to place a frame by, so every plot is photographed massing on its source outline, matched to the frames
// by its order along the lane (the drive's fixes trail its true position by about 10 m). The source draws the lane's
// centreline within 1-5 m of the east side's fronts, so pieces over the street there are held flat. Every building is
// unnamed for now, its boards drawn blank. See docs/lorong-23-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 23 Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 16 May 2023 down the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344809', f))];

// A shophouse on the east side: its front held flat, a shop front below and windows above.
const house = ({ id, label, front = 0, W = 5.7, height, storeys, wall, frame = '#3a3c3e', look, frames, blocks = [], review = 9, shop = '#3a3836' }) => ({
  ...mass({ wall, frame, glass: '#3a4044' }, { frontEdge: front, heldFlat: true, review: { distance: review, pitch: storeys > 2 ? 24 : 18 }, height }),
  id: `l23-${label}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `Lorong 23 Geylang, east side, ${look.split(',')[0]} (May 2023 massing, occupant not identified)`, address: 'East side of Lorong 23 Geylang',
  evidence: `KartaView panoramas of May 2023 show ${look}. Listings could not be checked (open question 84), so no name is given and any boards are drawn blank. Its height follows its storeys and carries about ±2 m.${note}`,
  sources: src(id, ...frames),
  windows: grid(spread(W, Math.max(1, Math.round(W / 3)), Math.min(2.2, W / Math.max(1, Math.round(W / 3)) - .6)), floors(storeys - 1, 4.0, 3.2), 1.6, 3),
  blocks: [plain('shop front', span(W, .3), [.05, 3.0], shop), ...blocks],
});

export const coffeeShop = { upperInset: .4, ...house({ id: '454254159', label: 'coffee-shop', front: 19, W: 22.1, height: 13.6, storeys: 4, wall: '#efc89a', review: 9.5, frames: ['3018', '3019', '3203'],
  look: 'a peach coffee shop block of four storeys at the Sims Avenue end of the lane\'s east side, with a red and white board reading 福右 over the shop, a poster of a noodle dish, open casements above under louvred vents and an orange spiral stair at its south end',
  blocks: [plain('blank red and white board', [1.0, 8.6], [3.4, 4.6], '#e8e4dc', .04, .04), plain('red lettering field', [1.2, 5.6], [3.5, 4.5], '#c8302a', .07, .02), plain('dark awning', [.5, 12.0], [2.6, 3.2], '#2a2c2e', .1, .2), plain('orange spiral stair', [19.6, 21.9], [0, 12.0], '#e8a060', .08, .2)] }) };

export const white4 = house({ id: '454254157', label: 'white-block', front: 3, W: 11.23, height: 13.2, storeys: 4, wall: '#efeeea', review: 9.5, frames: ['3018', '3019', '3020'],
  look: 'a white block of four storeys with roller shutters on its ground floor and casements and air-conditioning units above',
  blocks: [plain('roller shutter', [3.0, 6.0], [.05, 2.8], '#7a9a8a', .03, .04)] });

export const tcm = house({ id: '454254151', label: 'tcm', front: 7, W: 12.53, height: 10.6, storeys: 3, wall: '#efefec', review: 9.5, frames: ['3022', '3023', '3204'],
  look: 'a white three-storey house with deep window frames on its upper floors, a shop under a board reading 健康中医养生馆 and a front hung with green and blue tarpaulins',
  blocks: [plain('blank shop board', [.4, 4.2], [2.6, 3.2], '#e8e4dc', .04, .04), plain('green tarpaulin', [4.6, 10.6], [1.6, 3.4], '#2e8a6a', .06, .04), plain('blue tarpaulin', [4.6, 8.6], [.2, 1.6], '#2a5aa8', .06, .04)] });

export const orangeFrames = house({ id: '454254152', label: 'orange-frames', front: 7, W: 13.6, height: 10.6, storeys: 3, wall: '#efeeea', frame: '#3a3c3e', review: 6.5, frames: ['3022', '3024', '3205'],
  look: 'a white three-storey house whose upper windows sit in deep orange frames, with red lanterns over its shop front',
  blocks: [...floors(2, 3.7, 3.2).map(b => plain('orange window frame', span(13.6, .6), [+b.toFixed(2), +(b + 2.3).toFixed(2)], '#d8784a', .12, .24)), plain('red lanterns', [2.0, 11.6], [2.4, 2.9], '#c8302a', .15, .1)] });

export const yellowTemple = house({ id: '454254145', label: 'yellow-house', height: 10.6, storeys: 3, wall: '#e2dc7a', frame: '#f0efea', frames: ['3027', '3207', '3026'],
  look: 'a yellow three-storey shophouse whose upper floors carry the raised characters 西香祖師廟, with roller shutters below, at the north end of a row of six',
  blocks: [plain('raised characters', [.6, 5.1], [5.2, 5.9], '#f2f0ea', .06, .04), plain('roller shutter', [.5, 3.0], [.05, 2.7], '#b8b8b4', .03, .04)] });

export const whiteModern = house({ id: '454254146', label: 'white-modern', height: 10.6, storeys: 3, wall: '#f2f2ee', frame: '#e8e8e4', frames: ['3027', '3207', '3028'],
  look: 'a white three-storey house of plain modern lines in the row, with wide white-framed windows and a recessed doorway',
  blocks: [plain('timber door', [1.4, 2.6], [.05, 2.4], '#c8945a', .03, .04)] });

const taiWah = (id, label, frames) => house({ id, label, height: 7.6, storeys: 2, wall: '#efeeea', frame: '#2e8a8a', frames,
  look: 'a white two-storey shophouse in the row under a corrugated roof edge, with teal-framed louvred windows over a vented sill and a blue awning lettered for an air-conditioning dealer over its shop',
  blocks: [plain('blue awning', span(5.7, .1), [2.6, 3.3], '#2a4a9a', .1, .2), plain('vented sill', span(5.7, .3), [3.4, 4.0], '#d8d8d4', .04, .04), plain('corrugated roof edge', span(5.7), [7.3, 7.6], '#7aa8a8', .2, .4)] });
export const taiWahA = taiWah('454254147', 'tai-wah-a', ['3028', '3208', '3029']);
export const taiWahB = taiWah('454254148', 'tai-wah-b', ['3028', '3209', '3029']);

export const redVents = house({ id: '454254149', label: 'red-vents', height: 7.6, storeys: 2, wall: '#efeeea', frame: '#5a5e60', frames: ['3029', '3209', '3030'],
  look: 'a white two-storey shophouse in the row with a band of red vents under its upper windows and a red-edged canopy',
  blocks: [plain('red vents', span(5.7, .5), [3.5, 4.0], '#c8443a', .04, .04), plain('red-edged canopy', span(5.7, .1), [2.8, 3.1], '#c8443a', .1, .2)] });

export const lightBlue = house({ id: '454254150', label: 'light-blue', height: 9.4, storeys: 3, wall: '#c8dce4', frame: '#4a6a7a', frames: ['3030', '3210', '3031'],
  look: 'a light blue three-storey house at the south end of the row, with louvred windows and small square vents, and a red door',
  blocks: [plain('red door', [1.0, 2.2], [.05, 2.3], '#c8302a', .03, .04)] });

export const charoya = house({ id: '454254139', label: 'restaurant', front: 9, W: 19.46, height: 8.4, storeys: 2, wall: '#efe4d4', frame: '#7a4a2a', review: 6.5, frames: ['3031', '3211', '3032'],
  look: 'a cream two-storey house with timber louvred windows and small square vents, over a restaurant under a blue and yellow striped awning, with a green vertical sign at its corner',
  blocks: [plain('blue and yellow awning', [1.0, 10.0], [2.6, 3.3], '#2a4a9a', .1, .2), plain('green vertical sign', [10.2, 10.6], [3.6, 7.6], '#3a9a5a', .12, .1)] });

export const pinkCorner = {
  ...house({ id: '454254141', label: 'geylang-corner', front: 3, W: 20.65, height: 13.2, storeys: 4, wall: '#efc8bc', frame: '#5a5e60', review: 6, frames: ['3035', '3036', '3215'],
    look: 'a pink corner block of four storeys at Lorong 23 and Geylang Road, with windows in deep pink frames, red diamond ornaments, a white spiral stair at its north end, and coffee shops under green awnings on both streets, one with a gold board reading 兰州拉面 Lanzhou Lamian and a green board for a food centre at the corner',
    blocks: [plain('green awning', span(20.65, .6), [2.6, 3.2], '#2e7a5a', .1, .2), plain('white spiral stair', [.2, 2.4], [0, 12.0], '#f2f0ea', .08, .2), plain('blank gold board', [10.0, 14.0], [3.6, 4.4], '#c8a040', .04, .04), plain('blank green board', [17.0, 20.4], [3.4, 4.4], '#2e8a4a', .04, .04)] }),
  name: 'Lorong 23 Geylang, the Geylang Road corner (May 2023 massing, occupant not identified)', address: 'Geylang Road at the east corner of Lorong 23',
  sides: [{ edge: 1, windows: grid(spread(20.67, 6, 1.8), [4.0, 7.2, 10.4], 1.6, 3), blocks: [plain('green awning', span(20.67, .6), [2.6, 3.2], '#2e7a5a', .1, .2)] }],
};

// West side.
export const longBlock = {
  ...mass({ wall: '#f0efea', frame: '#2a5a9a', glass: '#3a4044' }, { frontEdge: 2, review: { distance: 10.5, pitch: 14 }, height: 7.4, roof: { type: 'hip', ridge: 10.0, colour: '#9a5a44' } }),
  id: 'l23-long-block', buildingIds: ['454254163'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 23 Geylang, west side, the long two-storey block (May 2023 massing, occupant not identified)', address: 'West side of Lorong 23 Geylang, between Geylang Road and Sims Avenue',
  evidence: 'KartaView panoramas of May 2023 show a long white two-storey block behind trees and a fence on the west side of the lane, under a brown tiled hipped roof, with rows of windows behind blue louvred shutters. Question 91 found it facing Lorong 23. No sign could be read and listings could not be checked (open question 84), so no name is given. Its eaves stand about 7.4 m up.' + note,
  sources: src('454254163', '3027', '3024', '3207'),
  windows: grid(spread(74.11, 18, 1.6, 1.4), [1.0, 4.4], 1.6, 3),
  blocks: [plain('fence', span(74.11, .3), [0, 1.8], '#5a6a5a', 3.0, .05)],
};

export const shed = {
  ...mass({ wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 14, pitch: 10 }, height: 4.0, roof: { type: 'gable', ridge: 6.6, ridgeDepth: .5, overhang: .3, colour: '#5a5e60' } }),
  id: 'l23-shed', buildingIds: ['454254143'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 23 Geylang, west side, the gabled hall behind the hoarding (May 2023 massing, occupant not identified)', address: 'West side of Lorong 23 Geylang, near Geylang Road',
  evidence: 'KartaView panoramas of May 2023 show a white single-storey hall under a dark gabled roof with a blue ventilator cowl, behind a blue hoarding on the west side of the lane near Geylang Road. No sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454254143', '3037', '3038', '3217'),
  blocks: [plain('blue hoarding', span(10.1, .2), [0, 2.2], '#2a3a6a', 4.0, .05), plain('blue ventilator cowl', [4.0, 6.0], [6.6, 7.8], '#2a6ab8', -3.0, 1.6)],
};

export const foodCentre = {
  ...mass({ wall: '#e8e6e0', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 1, review: { distance: 6.5, pitch: 10 }, height: 4.6, roof: { type: 'gable', ridge: 6.8, ridgeDepth: .5, overhang: .8, colour: '#2a5aa8' } }),
  id: 'l23-food-centre', buildingIds: ['454254140'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 23 Geylang, the west corner on Geylang Road (May 2023 massing, occupant not identified)', address: 'Geylang Road at the west corner of Lorong 23',
  evidence: 'KartaView panoramas of May 2023 show an open-sided food centre under a blue roof behind a fence at the west corner of Lorong 23 and Geylang Road, as question 81 recorded from the Geylang Road frames, which also found that the outline does not match all that is photographed. No sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454254140', '3038', '3039', '3221'),
  blocks: [plain('open side', [.6, 9.6], [.3, 3.8], '#3a3836', -.6, .1), plain('fence', span(10.26, .2), [0, 1.8], '#2a3a6a', 2.0, .05)],
  sides: [{ edge: 2, blocks: [plain('open side', [1.0, 21.1], [.3, 3.8], '#3a3836', -.6, .1)] }],
};

// Geylang Road's south side east of the Lorong 20 corner, from the westbound drives of 16 and 19 May 2023 (sequences
// 8344809, frames 4683-4688, and 8344969, frames 1663-1668). Each outline holds two buildings, laid as fields on its
// front (u runs west from the outline's east corner).
const roadNote = ' It is seen in KartaView\'s westbound drives of 16 and 19 May 2023 along Geylang Road (open question 84), which show no party walls to place a frame by, so it is modelled as photographed massing on its source outline, the two buildings laid as fields on its front.';
export const ktvPair = {
  ...mass({ wall: '#efe6dc', frame: '#3a3c3e', glass: '#3a4044' }, { reviewRoad: 'Geylang Road', frontEdge: 0, heldFlat: true, review: { distance: 10, pitch: 30 }, height: 17.0 }),
  id: 'l23-gr-ktv', buildingIds: ['454438312'], kind: 'unnamed', unnamed: true,
  name: 'Geylang Road, south side east of Lorong 20, the cream and grey blocks (May 2023 massing, occupants not identified)', address: 'South side of Geylang Road, between Lorongs 20 and 22',
  evidence: 'KartaView panoramas of May 2023 show two five-storey blocks on Geylang Road\'s south side east of the Lorong 20 corner: to the east a cream block framed in red-orange with windows under small hoods over a shop whose dark board reads 烧烤屋, and to the west a grey block banded in red with air-conditioning units at its windows and a large lit sign for a karaoke lounge reading IQ. Listings could not be checked (open question 84), so no name is given and the boards are drawn blank. Its height follows its storeys and carries about ±2 m.' + roadNote,
  sources: [way('454438312'), kv('8344809', '4687'), kv('8344809', '4688'), kv('8344969', '1667')],
  // The windows stand forward of the grey field laid over the west half of the front.
  windows: grid([[2.0, 4.6], [6.4, 9.0], [13.0, 15.6], [17.6, 20.2]], floors(4, 4.4, 3.1), 1.6, 3).map(w => ({ ...w, out: .02 })),
  blocks: [
    plain('grey block', [11.2, 23.08], [3.4, 17.0], '#8a8c90', .006, .01),
    ...[[.1, .8], [10.4, 11.1], [11.3, 12.0], [22.3, 23.0]].map(u => plain('red frame', u, [3.4, 17.0], '#c8503a', .05, .1)),
    plain('blank dark board', [1.0, 10.0], [2.8, 4.0], '#2a2826', .05, .04),
    plain('blank lit sign', [13.0, 22.0], [2.8, 4.0], '#3a6ac8', .05, .04),
  ],
};
export const dumplingPair = {
  ...mass({ wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { reviewRoad: 'Geylang Road', frontEdge: 0, heldFlat: true, review: { distance: 10, pitch: 18 }, height: 8.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l23-gr-dumpling', buildingIds: ['454438311'], kind: 'unnamed', unnamed: true,
  name: 'Geylang Road, south side east of Lorong 20, the two-storey pair (May 2023 massing, occupants not identified)', address: 'South side of Geylang Road, between Lorongs 20 and 22',
  evidence: 'KartaView panoramas of May 2023 show two two-storey shophouses on Geylang Road\'s south side: to the east a weathered white pair of bays over a dumpling restaurant under a red awning, its brown board reading 東北餃子王, and to the west a shophouse under a tiled roof hung with blue boards for a phone shop and a red awning. Listings could not be checked (open question 84), so no name is given and the boards are drawn blank.' + roadNote,
  sources: [way('454438311'), kv('8344809', '4684'), kv('8344809', '4685'), kv('8344969', '1665')],
  windows: grid([[1.0, 3.6], [5.0, 7.6], [9.0, 11.6], [15.4, 17.6], [18.6, 20.8]], [4.4], 1.6, 3),
  blocks: [
    plain('red awning', [.4, 13.6], [2.6, 3.2], '#c8302a', .1, .2),
    plain('blank brown board', [3.0, 12.0], [3.4, 4.2], '#8a4a2a', .05, .04),
    plain('tiled roof edge', [14.0, 22.9], [7.6, 8.0], '#9a5a44', .1, .2),
    plain('blank blue boards', [14.4, 22.4], [3.4, 6.2], '#2a6ac8', .05, .04),
    plain('red awning', [14.0, 22.6], [2.6, 3.2], '#c8302a', .1, .2),
  ],
};

export const lorong23 = [coffeeShop, white4, tcm, orangeFrames, yellowTemple, whiteModern, taiWahA, taiWahB, redVents, lightBlue, charoya, pinkCorner, longBlock, shed, foodCentre, ktvPair, dumplingPair];
export const lorong23Frame = laneFrame, lorong23Layout = laneLayout, lorong23Upper = laneUpper, lorong23Reviews = laneReviews, lorong23Sides = laneSides;
