// Guillemard Road between Lorongs 16 and 20 (open question 100), from the dated extension of 22 November 2026 and
// KartaView's drive of 19 May 2023 east along the road (sequence 8344969, frames 810-818). On the north side, Nos.
// 175-181 are single-storey houses in gardens behind a green railing; on the south side, Nos. 84-88 are a white walk-up
// block and Nos. 90-94 a grey two-storey row of shophouses. None shows party walls to place a frame by, so every plot is
// photographed massing on its source outline. Every building is unnamed for now, its boards drawn blank.
// See docs/guillemard-road-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const mass = (colours, o) => ({
  reviewRoad: 'Guillemard Road', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 19 May 2023 east along Guillemard Road (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344969', f))];
// A see-through railing: two rails on posts every 2 m.
const railing = (W, out) => [plain('green railing rail', span(W, .1), [.95, 1.1], '#2e7a4a', out, .05), plain('green railing rail', span(W, .1), [.15, .25], '#2e7a4a', out, .05),
  ...Array.from({ length: Math.floor((W - .2) / 2) + 1 }, (_, k) => plain('green railing post', [+(.1 + k * 2).toFixed(2), +(.16 + k * 2).toFixed(2)], [0, 1.1], '#2e7a4a', out, .06))];
const place = (id, number, label, o) => ({ id: `gu-${label}`, buildingIds: [id], kind: 'unnamed', unnamed: true, name: `No. ${number} Guillemard Road (May 2023 massing, occupant not identified)`, address: `${number} Guillemard Road`, ...o, evidence: o.evidence + note });

// North side, west to east: the grey-blue house under corrugated roofs over three outlines, and the white house.
const greyBlue = (id, number, front, W, review) => place(id, number, number, {
  ...mass({ wall: '#a8b4bc', frame: '#5a6a72', glass: '#3a4a56' }, { frontEdge: front, review: { distance: review, pitch: 10 }, height: 3.6, roof: { type: 'hip', ridge: 5.4, colour: '#a8acae' } }),
  evidence: 'KartaView panoramas of May 2023 show a grey-blue single-storey house under low corrugated metal roofs on the north side of Guillemard Road west of the Lorong 20 corner, with louvred windows, a glazed door and a for-rent sign, behind a green railing; it spans the source\'s outlines for Nos. 175-179. Listings could not be checked (open question 84), so no name is given.',
  sources: src(id, '812', '811', '813'),
  windows: [{ u: [.6, +(W - .6).toFixed(2)], h: [1.0, 2.4], panes: Math.max(2, Math.round(W / 1.4)) }],
  blocks: railing(W, 3.0),
});
export const no175 = greyBlue('454274537', '175', 1, 5.55, 10);
export const no177 = greyBlue('764372530', '177', 0, 5.93, 10);
export const no179 = greyBlue('764372529', '179', 4, 6.49, 10);
export const no181 = place('764372528', '181', '181', {
  ...mass({ wall: '#f0f0ec', frame: '#3a3c3e', glass: '#2e3438' }, { frontEdge: 4, review: { distance: 10, pitch: 10 }, height: 3.6, roof: { type: 'hip', ridge: 6.0, colour: '#b4443a' } }),
  evidence: 'KartaView panoramas of May 2023 show a white single-storey house under a red tiled hipped roof at the east end of the row, with a large dark window and a garden of tall plants behind a green railing, beside an open lawn to the Lorong 20 corner. Listings could not be checked (open question 84), so no name is given.',
  sources: src('764372528', '813', '814', '812'),
  windows: [{ u: [1.2, 4.2], h: [.8, 2.6], panes: 3 }],
  blocks: railing(7.3, 3.0),
});

// South side, west to east.
const walkUp = (id, number, review) => place(id, number, number, {
  ...mass({ wall: '#f0efea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 3, review: { distance: review, pitch: 24 }, height: 10.4 }),
  evidence: 'KartaView panoramas of May 2023 show a white three-storey walk-up block on the south side of Guillemard Road, one of the three outlines for Nos. 84-88, with windows behind grilles, a stair of pierced vent blocks and laundry at its upper floors, behind a green hoarding. Listings could not be checked (open question 84), so no name is given. Its height follows its storeys and carries about ±2 m.',
  sources: src(id, '812', '814', '816'),
  windows: grid(spread(7.58, 2, 1.4), [1.0, 4.2, 7.4], 1.5, 2),
  blocks: [plain('green hoarding', span(7.58, .1), [0, 1.8], '#2e7a5a', 2.0, .05), plain('pierced vent blocks', [3.3, 4.3], [3.6, 9.6], '#e0e0dc', .03, .04)],
});
export const no84 = walkUp('1257881438', '84', 6);
export const no86 = walkUp('1257881439', '86', 6);
export const no88 = walkUp('1257881440', '88', 6);

const shop = (id, number, review, extra = []) => place(id, number, number, {
  ...mass({ wall: '#c8ccd0', frame: '#3a3c3e', glass: '#2e3438' }, { frontEdge: 3, review: { distance: review, pitch: 18 }, height: 7.4, roof: { type: 'hip', ridge: 9.0, colour: '#b4553d' } }),
  evidence: 'KartaView panoramas of May 2023 show a grey two-storey shophouse under a red tiled roof on the south side of Guillemard Road, one of the row at Nos. 90-94, with dark windows on its upper floor over roller shutters, its middle shop under a board reading ARCADE FISH SOUP. Listings could not be checked (open question 84), so no name is given and the board is drawn blank.',
  sources: src(id, '814', '816', '815'),
  windows: grid(spread(7.58, 2, 1.4), [4.0], 1.4, 2),
  blocks: [plain('roller shutter', span(7.58, .6), [.05, 2.8], '#b8bcc0'), ...extra],
});
export const no90 = shop('1257881443', '90', 6);
export const no92 = shop('1257881442', '92', 6, [plain('blank white board', [1.4, 6.2], [2.9, 3.5], '#f2f2f0', .05, .04)]);
export const no94 = shop('1257881441', '94', 6);

export const guillemardRoad = [no175, no177, no179, no181, no84, no86, no88, no90, no92, no94];
export const guillemardRoadFrame = laneFrame, guillemardRoadLayout = laneLayout, guillemardRoadUpper = laneUpper, guillemardRoadReviews = laneReviews, guillemardRoadSides = laneSides;
