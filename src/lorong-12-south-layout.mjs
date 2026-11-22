// Lorong 12 south to Guillemard Road (open question 96), from the dated extension of 22 November 2026 and KartaView's
// drive of 19 May 2023 up the lane (sequence 8344969, frames 528-546). South of No. 21 the east side holds a weathered
// three-storey row, the temple at No. 27 clad in vertical fins, the mosque centre at No. 31, two small houses by the lane
// and a mint-green block at the Guillemard Road corner. None shows party walls to place a frame by, so every plot is
// photographed massing on its source outline. Every building is unnamed for now, its boards drawn blank.
// See docs/lorong-12-south-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .6) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 12 Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 19 May 2023 up the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344969', f))];

// The weathered row: three-storey shophouses with green-framed windows under small hoods, over grilled fronts.
const row = (id, label, front, W, review, wall) => ({
  ...mass({ wall, frame: '#2e8a5a', glass: '#3a4044' }, { frontEdge: front, review: { distance: review, pitch: 24 }, height: 10.4 }),
  id: `l12-row-${label}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `Lorong 12 Geylang, east side, the weathered row, house ${label} (May 2023 massing, occupant not identified)`, address: 'East side of Lorong 12 Geylang, south of No. 21',
  evidence: `KartaView panoramas of May 2023 show a weathered three-storey shophouse, one of a row of three south of the blue hotel at No. 21 on the east side of the lane, with green-framed windows under small hoods on its upper floors and a grilled front behind a gated forecourt. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.${note}`,
  sources: src(id, '542', '541', '543'),
  windows: grid(spread(W, 2, 1.5, .5), [4.2, 7.4], 1.5, 3),
  blocks: [plain('grilled front', span(W, .4), [.05, 2.8], '#5a5e60'), ...[4.2, 7.4].map(b => plain('window hood', span(W, .4), [b + 1.6, b + 1.85], '#d8d4cc', .15, .3))],
});
export const row1 = row('454438316', '1', 5, 6.05, 15, '#e8e4dc');
export const row2 = row('764372594', '2', 0, 6.09, 15, '#e4e0d6');
export const row3 = row('764372593', '3', 0, 6.11, 15.5, '#ece0b4');

export const no27 = {
  ...mass({ wall: '#8a8480', frame: '#3a3c3e', glass: '#2a2e32' }, { frontEdge: 7, review: { distance: 8, pitch: 30 }, height: 16.0 }),
  id: 'l12-27', buildingIds: ['764372592'], kind: 'unnamed', unnamed: true,
  name: 'No. 27 Lorong 12 Geylang (May 2023 massing, occupant not identified)', address: '27 Lorong 12 Geylang (painted on its gate wall)',
  evidence: 'KartaView panoramas of May 2023 show a modern temple of about four storeys on the east side of the lane, its upper floors wrapped in a screen of brown-grey vertical fins over a dark recessed ground floor on round columns, behind a wall of grey stacked stone; large characters on its north face read 灵山寺, a gilded finial stands on its roof, and 27 is painted on the gate wall. Listings could not be checked (open question 84), so no name is given and the characters are not drawn. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('764372592', '536', '535', '538'),
  blocks: [
    plain('vertical fin screen', span(22.23, .2), [4.4, 16.0], '#8a8480', .3, .2),
    ...Array.from({ length: 20 }, (_, k) => +(1.0 + k * 1.05).toFixed(2)).map(a => plain('vertical fin', [a, +(a + .12).toFixed(2)], [4.4, 16.0], '#6a6460', .45, .1)),
    plain('dark ground floor', span(22.23, .6), [.05, 4.2], '#2a2826', .006, .01),
    ...[[6.0, 6.6], [12.4, 13.0]].map(u => plain('round column', u, [0, 4.4], '#e8e4da', .1, .6)),
    plain('stone wall', span(22.23, .2), [0, 1.8], '#5a5654', 1.8, .3),
    plain('gilded finial', [10.6, 11.6], [16.0, 18.4], '#c8a040', -4.0, 1.0),
  ],
};

export const no31 = {
  ...mass({ wall: '#f2f0ea', frame: '#2e7a4a', glass: '#3a4044', trim: '#2e7a4a' }, { frontEdge: 4, review: { distance: 12, pitch: 30 }, height: 19.0 }),
  id: 'l12-31', buildingIds: ['764372591'], kind: 'unnamed', unnamed: true,
  name: 'No. 31 Lorong 12 Geylang (May 2023 massing, occupant not identified)', address: '31 Lorong 12 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white block of about five storeys on the east side of the lane, its front framed by green-trimmed pointed arches, with tall narrow arched windows, a round green emblem high on its face, lettering that ends JAMIYAH, and a banner reading Our Masjid@Jamiyah is now open, behind a white gate and a pale fence. Listings could not be checked (open question 84), so no name is given and the lettering and banner are not drawn. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('764372591', '533', '532', '534'),
  windows: grid([[1.2, 2.0], [14.7, 15.5]], [4.4, 8.4, 12.4], 2.6, 1),
  blocks: [
    plain('green-trimmed pointed arch', [4.0, 12.6], [3.0, 13.6], '#2e7a4a', .06, .06),
    plain('white arch field', [4.3, 12.3], [3.0, 13.3], '#f2f0ea', .1, .04),
    plain('dark arched entrance', [6.0, 10.6], [.05, 6.0], '#2a2c3a', .13, .02),
    plain('green emblem', [7.4, 9.2], [14.6, 16.4], '#2e7a4a', .1, .04),
    plain('pale fence', span(16.69, .3), [0, 1.4], '#e8e4d8', 3.0, .1),
  ],
};

const smallHouse = (id, label, review) => ({
  ...mass({ wall: '#e8b4a4', frame: '#f0efea', glass: '#3a4044' }, { frontEdge: 2, review: { distance: review, pitch: 8 }, height: 3.0, roof: { type: 'hip', ridge: 4.8, colour: '#c8443a' } }),
  id: `l12-small-${label}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `Lorong 12 Geylang, east side, small house ${label} (May 2023 massing, occupant not identified)`, address: 'East side of Lorong 12 Geylang, south of No. 31',
  evidence: `KartaView panoramas of May 2023 show a small salmon-pink single-storey house under a red tiled hipped roof with white-framed windows, one of two by the lane south of No. 31, behind a low red wall. Listings could not be checked (open question 84), so no name is given.${note}`,
  sources: src(id, '531', '530', '529'),
  windows: [{ u: [.6, 2.0], h: [1.0, 2.1], panes: 2 }],
  blocks: [plain('low red wall', span(3.56, .1), [0, 1.2], '#c8443a', 2.5, .2)],
});
export const small1 = smallHouse('764372589', '1', 7);
export const small2 = { ...smallHouse('764372588', '2', 7), blocks: [plain('low red wall', span(2.51, .1), [0, 1.2], '#c8443a', 2.5, .2)], windows: [{ u: [.5, 1.9], h: [1.0, 2.1], panes: 2 }] };

export const no37 = {
  ...mass({ wall: '#c8e4d8', frame: '#3a3c3e', glass: '#3a4a56' }, { frontEdge: 9, heldFlat: true, review: { distance: 7, pitch: 28 }, height: 13.5 }),
  id: 'l12-37', buildingIds: ['764372587'], kind: 'unnamed', unnamed: true,
  name: 'No. 37 Lorong 12 Geylang, the Guillemard Road corner (May 2023 massing, occupant not identified)', address: '37 Lorong 12 Geylang (the source tag), at the corner of Guillemard Road',
  evidence: 'KartaView panoramas of May 2023 show a mint-green block of four storeys at the corner of Lorong 12 and Guillemard Road, its floors banded by grey glass balustrades, with a green canopy over its ground floor, Buddhist flags on poles at its gate and a plate on its gate pier, behind a red wall. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('764372587', '529', '528', '530'),
  windows: grid(spread(17.91, 4, 2.0), [4.4, 7.6, 10.8], 1.8, 3),
  blocks: [
    ...[3.9, 7.1, 10.3].map(b => plain('grey glass balustrade', [1.0, 16.9], [b, b + 1.0], '#a8b4b8', .1, .05)),
    plain('green canopy', [1.0, 16.9], [3.2, 3.5], '#2e7a4a', .1, .2),
  ],
};

export const lorong12South = [row1, row2, row3, no27, no31, small1, small2, no37];
export const lorong12SouthFrame = laneFrame, lorong12SouthLayout = laneLayout, lorong12SouthUpper = laneUpper, lorong12SouthReviews = laneReviews, lorong12SouthSides = laneSides;
