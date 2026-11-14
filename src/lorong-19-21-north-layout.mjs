// Lorongs 19 and 21 north of Sims Avenue, with the road joining them (open question 88): eleven plots seen in KartaView's
// drive of 16 May 2023, which runs up Lorong 19, along the joining road and up Lorong 21 (open question 84). Like Lorong 17's,
// they show no party walls to solve a frame from, so they are photographed massing on their source outlines: colours, storeys,
// roofs and the main openings as photographed, with window rows placed by estimate and heights from storey counts and
// rooflines, carrying about ±2 m (±4 m for the towers). Every building is unnamed for now. See docs/lorong-19-21-north-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

/** n spans of width w spread evenly across a face of width W, with a margin m at each end. */
const spread = (W, n, w, m = .6) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = W => [.03, +(W - .06).toFixed(2)];
const mass = (road, colours, o) => ({
  reviewRoad: road, shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  ...o,
});
const note = ' It is seen in passing in KartaView\'s drive of 16 May 2023 (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roof and main openings as photographed, with window rows placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344809', f))];
const L19 = 'Lorong 19 Geylang', L21 = 'Lorong 21 Geylang';

export const no74 = {
  ...mass(L19, { wall: '#3aa8a0', frame: '#8a5a32', glass: '#2e3032' }, { frontEdge: 0, review: { distance: 6, pitch: 14 }, heldFlat: true, height: 7.2, roof: { type: 'gable', ridge: 9.0, ridgeDepth: .4, overhang: .6, colour: '#8a8c88' } }),
  id: 'l19-74', buildingIds: ['682937276'], kind: 'unnamed', unnamed: true,
  name: 'No. 74 Lorong 19 Geylang (May 2023 massing, occupant not identified)', address: '74 Lorong 19 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a two-storey timber house at the corner of Lorong 19 and the road east to Lorong 21: an upper floor clad in turquoise corrugated sheet with brown-framed windows, a white masonry ground floor with grilled windows under small red awnings and air-conditioners, under a grey corrugated gable roof, behind a low white fence and potted plants. No sign is photographed, so no name is given. Its source front lies about 1.5 m from the road\'s centreline, inside the modelled carriageway, while the photographs show the house a few metres back behind its fence, so its pieces are held flat to the wall (open question 88).' + note,
  sources: src('682937276', '3690', '3691', '3676'),
  windows: [...grid(spread(15.84, 4, 1.2), [4.3], 1.5), ...grid(spread(15.84, 4, 1.2), [1.0], 1.4, 3)],
  blocks: [
    { name: 'white masonry ground floor', u: span(15.84), h: [.2, 3.6], out: .02, depth: .04, colour: '#ecebe6' },
    ...spread(15.84, 4, 1.4).map(u => ({ name: 'red window awning', u, h: [2.5, 2.7], out: .1, depth: .2, colour: '#9a3a2e' })),
  ],
};

export const no76 = {
  ...mass(L19, { wall: '#ecebe6', glass: '#2e3438' }, { frontEdge: 3, review: { distance: 12, pitch: 22 }, height: 14.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l19-76', buildingIds: ['541941370'], kind: 'unnamed', unnamed: true,
  name: 'No. 76 Lorong 19 Geylang (May 2023 massing, occupant not identified)', address: '76 Lorong 19 Geylang (plate 76)',
  evidence: 'KartaView panoramas of May 2023 show on this plot a white four-storey block with a dark glazed ground floor and a black gate under the plate 76, and in front of it on the lane a single-storey grey corrugated site office with orange trim and a red banner reading SALES OFFICE with telephone numbers. The source way is named Teeni@76; listings could not be checked (open question 84), so no name is given, and the banner is not drawn. The block is modelled over the whole outline; the site office stands within it.' + note,
  sources: src('541941370', '3678', '3681', '3680'),
  windows: grid(spread(9.95, 2, 2.4), [4.2, 7.6, 11.0], 2.0, 3),
  blocks: [{ name: 'dark glazed ground floor', u: span(9.95), h: [.2, 3.6], out: .02, depth: .04, colour: '#2a2e30' }],
};

export const no72 = {
  ...mass(L19, { wall: '#ece2c8', frame: '#6a5040', glass: '#3a4a56' }, { frontEdge: 3, review: { distance: 7, pitch: 34 }, height: 33.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l19-72', buildingIds: ['541941369'], kind: 'unnamed', unnamed: true,
  name: 'No. 72 Lorong 19 Geylang (May 2023 massing, occupant not identified)', address: '72 Lorong 19 Geylang (plate 72)',
  evidence: 'KartaView panoramas of May 2023 show a cream tower of about ten storeys with rows of windows and balconies, its ground floor behind a white gate with the plate 72 and a white LOK board. The source way is named Prestige Building; no sign could be read and listings could not be checked (open question 84), so no name is given, and the board is drawn blank. Its height follows its ten storeys and carries about ±4 m.' + note,
  sources: src('541941369', '3693', '3692', '3694'),
  windows: grid(spread(7.41, 2, 1.8), Array.from({ length: 9 }, (_, k) => 4.6 + 3.1 * k), 1.6),
  blocks: [
    { name: 'white gate', u: [.4, 5.4], h: [.2, 2.0], out: .3, depth: .1, colour: '#e8e8e4' },
    { name: 'blank white board', u: [5.6, 7.2], h: [.6, 2.1], out: .3, depth: .3, colour: '#f0efea' },
    ...Array.from({ length: 9 }, (_, k) => ({ name: 'balcony slab', u: span(7.41), h: [+(4.2 + 3.1 * k).toFixed(2), +(4.4 + 3.1 * k).toFixed(2)], out: .3, depth: .6, colour: '#dcd2b8' })),
  ],
};

const chequer = ['#d23a32', '#2a5aa8', '#f0efea'];
export const no77 = {
  ...mass(L19, { wall: '#f0efea', frame: '#e8e8e4', glass: '#3a6a5a' }, { frontEdge: 0, review: { distance: 12, pitch: 26 }, height: 21.5, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l19-77', buildingIds: ['452646019'], kind: 'unnamed', unnamed: true,
  name: 'No. 77 Lorong 19 Geylang (May 2023 massing, occupant not identified)', address: '77 Lorong 19 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a block of five storeys over a white ground floor, its upper floors painted in a chequer of red, blue and white panels with green-framed windows, and lettering reading 華順食品 WAH SUN FOOD PTE LTD over the ground floor, with LOCK+STORE banners on its fence. The source way is named Wing Tip Building; listings could not be checked (open question 84), so no name is given, and the lettering and banners are not drawn.' + note,
  sources: src('452646019', '3686', '3681', '3676'),
  windows: grid(spread(24.1, 6, 2.2), [5.4, 8.8, 12.2, 15.6, 19.0], 1.5, 3),
  blocks: [0, 1, 2, 3, 4].flatMap(f => spread(24.1, 6, 4.0, 0).map((u, i) => ({ name: 'painted panel', u, h: [+(4.6 + 3.4 * f).toFixed(2), +(8.0 + 3.4 * f).toFixed(2)], out: .01, depth: .02, colour: chequer[(i + f) % 3] }))),
};

export const no62 = {
  ...mass(L19, { wall: '#e8c860', frame: '#3a3c3c', glass: '#2e3438' }, { frontEdge: 2, review: { distance: 10, pitch: 14 }, height: 8.0, roof: { type: 'flat', colour: '#8a8c88' } }),
  id: 'l19-62', buildingIds: ['454254367'], kind: 'unnamed', unnamed: true,
  name: 'No. 62 (between Lorongs 19 and 21) (May 2023 massing, occupant not identified)', address: 'South side of the road from Lorong 19 to Lorong 21 (plate 62)',
  evidence: 'KartaView panoramas of May 2023 show a yellow two-storey works on the south side of the road joining Lorong 19 to Lorong 21: a roller shutter and a brown door below, a dark window and louvred vents above, air-conditioners on its corner, behind palms, with a board ending BUILDERS and the plate 62 at its gate. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454254367', '3697', '3698'),
  windows: grid(spread(14.68, 3, 1.6), [4.8], 1.4),
  blocks: [
    { name: 'roller shutter', u: [1.0, 4.5], h: [.2, 3.4], out: .02, depth: .04, colour: '#c8c8c4' },
    { name: 'brown door', u: [5.5, 6.7], h: [.2, 2.4], out: .02, depth: .04, colour: '#8a5a3a' },
  ],
};

export const fishVillage = {
  ...mass(L19, { wall: '#ece4c8', frame: '#2e6a6a', glass: '#3a7a78' }, { frontEdge: 4, review: { distance: 10, pitch: 18 }, height: 12.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l19-fish-village', buildingIds: ['541941368'], kind: 'unnamed', unnamed: true,
  name: 'Wholesale shed and block north of the road to Lorong 21 (May 2023 massing, occupant not identified)', address: 'North side of the road from Lorong 19 to Lorong 21',
  evidence: 'KartaView panoramas of May 2023 show a cream block of three storeys with a band of teal windows, fronted on the road by a single-storey shed under a teal canopy, with a large yellow board reading UK FISH VILLAGE PTE LTD 优鱼鲜村有限公司 ONE-STOP WHOLESALE SUPERMART and red boards reading ONE-STOP WHOLESALE CENTRE over its open front, stacked with goods. Listings could not be checked (open question 84), so the boards are drawn blank and no name is given.' + note,
  sources: src('541941368', '3696', '3695'),
  windows: grid(spread(29.63, 4, 5.0), [8.2], 1.6, 6),
  blocks: [
    { name: 'blank yellow board', u: [8.0, 18.0], h: [4.2, 7.0], out: .4, depth: .1, colour: '#e8dc4a' },
    { name: 'teal canopy', u: [.5, 29.0], h: [3.6, 4.1], out: .6, depth: 1.2, colour: '#2e7a78' },
    { name: 'blank red board', u: [18.5, 26.0], h: [2.8, 3.6], out: .4, depth: .1, colour: '#c8282a' },
    { name: 'open front with goods', u: [1.0, 28.0], h: [.2, 2.8], out: .02, depth: .04, colour: '#4a3e36' },
  ],
};

const shed = (id, frontEdge, W, frames, extra = {}) => ({
  ...mass(L19, { wall: '#8a8c88', frame: '#5a5c58' }, { frontEdge, review: { distance: 10, pitch: 10 }, height: 4.6, roof: { type: 'gable', ridge: 5.6, ridgeDepth: .4, overhang: .5, colour: '#5a5c58' } }),
  id, buildingIds: [id.replace('shed-', '')], kind: 'unnamed', unnamed: true,
  name: 'Shed on the south side of the road from Lorong 19 to Lorong 21 (May 2023 massing, occupant not identified)', address: 'South side of the road from Lorong 19 to Lorong 21',
  evidence: 'KartaView panoramas of May 2023 show low sheds of corrugated sheet under rusty corrugated roofs on the south side of the road joining Lorong 19 to Lorong 21, behind yellow sheet gates, with sheet metal and crates stacked under them; No. 165 Sims Avenue\'s tall block rises behind. No sign is photographed, so no name is given.' + note,
  sources: src(id.replace('shed-', ''), ...frames),
  blocks: [{ name: 'yellow sheet gate', u: [.4, +(W - .4).toFixed(2)], h: [.2, 2.4], out: .02, depth: .04, colour: '#d8c870' }],
  ...extra,
});
export const shed270 = shed('shed-682937270', 3, 6.01, ['3693', '3694']);
export const shed272 = shed('shed-682937272', 5, 6.44, ['3694']);
export const shed274 = shed('shed-682937274', 2, 6.26, ['3694', '3695']);

export const dmc = {
  ...mass(L21, { wall: '#3a3e44', frame: '#e8702e', glass: '#2e3438' }, { frontEdge: 1, review: { distance: 12, pitch: 22 }, upperInset: .05, height: 18.0, roof: { type: 'flat', colour: '#8a8c88' } }),
  id: 'l21-51', buildingIds: ['454254350'], kind: 'unnamed', unnamed: true,
  name: 'No. 51 Lorong 21 Geylang (May 2023 massing, occupant not identified)', address: '51 Lorong 21 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a new block of about five storeys in dark grey with orange frames and bands of orange vertical fins over its windows, a glazed lobby and a ramp behind a new lawn and young trees. The source way is named dMC; no sign could be read and listings could not be checked (open question 84), so no name is given. Its outline straddles the extract\'s north edge.' + note,
  sources: src('454254350', '3705', '3704', '3706'),
  windows: grid(spread(21.51, 4, 3.4), [4.6, 8.0, 11.4, 14.8], 2.6, 4),
  blocks: [
    ...spread(21.51, 4, 3.6).flatMap(u => [4.6, 8.0, 11.4, 14.8].map(b => ({ name: 'orange fins', u, h: [b, +(b + 2.8).toFixed(2)], out: .12, depth: .2, colour: '#e8702e' }))),
    ...spread(21.51, 5, .3, .2).map(u => ({ name: 'orange column', u, h: [.2, 18.0], out: .05, depth: .1, colour: '#e8702e' })),
    { name: 'glazed lobby', u: [3.0, 18.0], h: [.2, 3.8], out: .02, depth: .04, colour: '#2a3034' },
  ],
};

export const greatland = {
  ...mass(L21, { wall: '#e8c4b0', frame: '#4a3a32', glass: '#3a4048' }, { frontEdge: 3, review: { distance: 12, pitch: 22 }, height: 17.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l21-48', buildingIds: ['454254352'], kind: 'unnamed', unnamed: true,
  name: 'No. 48 Lorong 21 Geylang (May 2023 massing, occupant not identified)', address: '48 Lorong 21 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a peach block of about five storeys with red window bands and balconies with brown screens, a roof garden, and a tall green hedge along the lane hiding its lower floors. The source way is named Greatland Building; no sign could be read and listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('454254352', '3716', '3715', '3717'),
  windows: grid(spread(10.41, 2, 2.6), [4.4, 7.6, 10.8, 14.0], 1.6, 3),
  blocks: [
    ...[4.1, 7.3, 10.5, 13.7].map(b => ({ name: 'red window band', u: span(10.41), h: [b, +(b + .25).toFixed(2)], out: .05, depth: .1, colour: '#b84a3a' })),
    { name: 'green hedge', u: span(10.41), h: [.2, 4.0], out: .5, depth: .8, colour: '#3e6a32' },
  ],
};

export const lorong1921North = [no74, no76, no72, no77, no62, fishVillage, shed270, shed272, shed274, dmc, greatland];
export const lorong1921NorthFrame = laneFrame, lorong1921NorthLayout = laneLayout, lorong1921NorthUpper = laneUpper, lorong1921NorthReviews = laneReviews, lorong1921NorthSides = laneSides;
