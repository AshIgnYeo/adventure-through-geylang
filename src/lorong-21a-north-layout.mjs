// Lorong 21A north of Sims Avenue (open question 89): five plots seen in KartaView's drive of 16 May 2023 up and down the lane
// (open question 84). As on Lorongs 17, 19 and 21 north of the avenue, they show no party walls to place a frame by, so they
// are photographed massing on their source outlines, with heights from storey counts carrying about ±4 m for the towers.
// Every building is unnamed for now. See docs/lorong-21a-north-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .6) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const span = W => [.03, +(W - .06).toFixed(2)];
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 21A Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in passing in KartaView\'s drive of 16 May 2023 up and down the lane (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys and main features as photographed, with window rows placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344809', f))];

export const no9 = {
  ...mass({ wall: '#ecebe6', frame: '#2e7a78', glass: '#2e3438' }, { frontEdge: 2, review: { distance: 14, pitch: 32 }, height: 33.0 }),
  id: 'l21a-9', buildingIds: ['541941378'], kind: 'unnamed', unnamed: true,
  name: 'No. 9 Lorong 21A Geylang (May 2023 massing, occupant not identified)', address: '9 Lorong 21A Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white block of about nine storeys with teal ledges over its window bands, a red canopy over its ground floor and a boundary wall carrying a blue and white board reading UNION Food. The source way is named Union Food Industrial Centre; listings could not be checked (open question 84), so no name is given, and the board is drawn blank. Its height follows its nine storeys and carries about ±4 m.' + note,
  sources: src('541941378', '3752', '3753', '3742'),
  windows: grid(spread(15.22, 3, 3.6), floors(8, 4.8, 3.5), 1.6, 4),
  blocks: [
    ...floors(8, 4.6, 3.5).map(b => ({ name: 'teal ledge', u: span(15.22), h: [+b.toFixed(2), +(b + .2).toFixed(2)], out: .3, depth: .6, colour: '#2e8a8a' })),
    { name: 'red canopy', u: [1.0, 9.0], h: [3.2, 3.6], out: .6, depth: 1.2, colour: '#c8302a' },
    { name: 'blank white board on the boundary wall', u: [2.0, 8.0], h: [.4, 1.8], out: 3.0, depth: .1, colour: '#f0f0ec' },
  ],
};

export const no11a = {
  ...mass({ wall: '#ecebe6', frame: '#5a6a72', glass: '#3a4a56' }, { frontEdge: 2, review: { distance: 12, pitch: 32 }, height: 30.0 }),
  id: 'l21a-11a', buildingIds: ['541941377'], kind: 'unnamed', unnamed: true,
  name: 'No. 11A Lorong 21A Geylang (May 2023 massing, occupant not identified)', address: '11A Lorong 21A Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white tower of about eight storeys with a deep blue vertical band down one end, rows of windows and a blue canopy over its loading bay, behind a low white-tiled gatehouse under a blue canopy. The source way is named Lam Thong Building; no sign could be read and listings could not be checked (open question 84), so no name is given. Its height follows its eight storeys and carries about ±4 m.' + note,
  sources: src('541941377', '3747', '3748', '3746'),
  windows: grid(spread(18.22, 4, 2.4), floors(7, 4.8, 3.5), 1.6, 3),
  blocks: [
    { name: 'deep blue vertical band', u: [.2, 2.2], h: [.2, 30.0], out: .05, depth: .1, colour: '#2a4a9a' },
    { name: 'blue canopy', u: [3.0, 12.0], h: [3.6, 4.0], out: .6, depth: 1.2, colour: '#2a5aa8' },
  ],
};

export const no20 = {
  ...mass({ wall: '#ecebe6', frame: '#2e3032', glass: '#1e2428' }, { frontEdge: 3, review: { distance: 12, pitch: 20 }, height: 13.5 }),
  id: 'l21a-20', buildingIds: ['454254347'], kind: 'unnamed', unnamed: true,
  name: 'No. 20 Lorong 21A Geylang (May 2023 massing, occupant not identified)', address: '20 Lorong 21A Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white block of three tall storeys with broad black window bands, a blue fascia over its loading bay and a blue DATACOM mark near its top, behind a white boundary wall. The source way is named Datacom Enterprise Building; listings could not be checked (open question 84), so no name is given, and the mark is not drawn.' + note,
  sources: src('454254347', '3748', '3749', '3745'),
  windows: grid([[1.0, 7.6]], [5.2, 9.0], 1.8, 6),
  blocks: [
    { name: 'blue fascia', u: span(8.63), h: [3.6, 4.0], out: .4, depth: .8, colour: '#2a7ab8' },
    { name: 'dark loading bay', u: [1.2, 7.4], h: [.2, 3.6], out: .02, depth: .04, colour: '#2a2e30' },
  ],
};

export const guardhouse = {
  ...mass({ wall: '#ecebe6', frame: '#2e8a8a', glass: '#3a4a56' }, { frontEdge: 3, review: { distance: 14, pitch: 10 }, height: 3.4, roof: { type: 'hip', ridge: 4.4, colour: '#d86a4a' } }),
  id: 'l21a-gatehouse', buildingIds: ['682937220'], kind: 'unnamed', unnamed: true,
  name: 'Gatehouse on Lorong 21A (May 2023 massing)', address: 'East side of Lorong 21A Geylang',
  evidence: 'KartaView panoramas of May 2023 show a small single-storey white gatehouse under a red-orange roof edge, with a teal door, beside a barrier and a car park in front of a white tower. No sign is photographed, so no name is given.' + note,
  sources: src('682937220', '3741', '3742'),
  blocks: [{ name: 'teal door', u: [3.0, 4.2], h: [.2, 2.3], out: .02, depth: .04, colour: '#2e8a8a' }],
};

export const yuLi = {
  ...mass({ wall: '#ecebe6', frame: '#5a6a72', glass: '#3a5a5a' }, { frontEdge: 16, review: { distance: 14, pitch: 32 }, height: 33.0 }),
  id: 'l23-37', buildingIds: ['454254349'], kind: 'unnamed', unnamed: true,
  name: 'No. 37 Lorong 23 Geylang (May 2023 massing, occupant not identified)', address: '37 Lorong 23 Geylang (its Lorong 21A side)',
  evidence: 'KartaView panoramas of May 2023 show a white tower of about nine storeys with a red vertical band and rows of green-tinted windows, and a stone wall at its gate lettered 有利工業大廈 YU LI INDUSTRIAL BUILDING 37 LORONG 23 GEYLANG, with a yellow 37 on the tower. Listings could not be checked (open question 84), so no name is given, and the lettering is not drawn. It is modelled from its Lorong 21A side and its long south face over Sims Avenue, which shows rows of windows in red frames; its Lorong 23 front lies at the extract\'s east edge. Its height follows its nine storeys and carries about ±4 m.' + note,
  sources: src('454254349', '3773', '3741', '3742'),
  windows: grid(spread(6.05, 1, 2.4), floors(8, 4.8, 3.5), 1.6, 3),
  blocks: [{ name: 'red vertical band', u: [.2, 1.6], h: [.2, 33.0], out: .05, depth: .1, colour: '#c8302a' }],
  // Its long south face over Sims Avenue: rows of windows in red frames, as photographed from the avenue.
  sides: [{ edge: 11, windows: grid(spread(52.87, 14, 2.6), floors(9, 4.4, 3.2), 1.7, 3), blocks: floors(9, 4.4, 3.2).map(b => ({ name: 'red window frames', u: [.6, 52.2], h: [+(b - .15).toFixed(2), +(b + 1.85).toFixed(2)], out: -.015, depth: .01, colour: '#c8302a' })) }],
};

export const lorong21aNorth = [no9, no11a, no20, guardhouse, yuLi];
export const lorong21aNorthFrame = laneFrame, lorong21aNorthLayout = laneLayout, lorong21aNorthUpper = laneUpper, lorong21aNorthReviews = laneReviews, lorong21aNorthSides = laneSides;
