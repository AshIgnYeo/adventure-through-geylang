// Lorongs 14 and 16 south to Guillemard Road (open questions 52 and 62), from the dated extension of 22 November 2026 and
// KartaView's drive of 19 May 2023, which runs down Lorong 14 three times and up Lorong 16 once (sequence 8344969). On
// Lorong 14 the east side carries on past No. 37 behind a hoarding, past a temple compound and a single-storey house,
// to a two-storey row of shophouses at the Guillemard Road end; on Lorong 16 the Association Building and Canberlin
// Apartments stand on the west side and a cultural building on the east. None shows party walls to place a frame by,
// so every plot is photographed massing on its source outline. Every building is unnamed for now, its boards drawn
// blank. See docs/lorong-14-16-south-brief.md.
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
const mass = (road, colours, o) => ({
  reviewRoad: road, shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drive of 19 May 2023 (open question 84), which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(f => kv('8344969', f))];
const tiles = (ridge, colour = '#b4553d') => ({ type: 'hip', ridge, colour });

// Lorong 14, east side, north to south.
export const no43 = {
  ...mass('Lorong 14 Geylang', { wall: '#d8d4cc', frame: '#3a3c3e' }, { frontEdge: 4, review: { distance: 14, pitch: 8 }, height: 3.0, roof: { type: 'gable', ridge: 4.4, ridgeDepth: .5, overhang: .3, colour: '#8a4a32' } }),
  id: 'l14-43', buildingIds: ['763764653'], kind: 'unnamed', unnamed: true,
  name: 'No. 43 Lorong 14 Geylang (May 2023 massing, occupant not identified)', address: '43 Lorong 14 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a small old single-storey house under a rusty corrugated roof behind a hoarding of patched corrugated sheets, painted in places, along the east side of the lane south of No. 37. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('763764653', '10', '9', '104'),
  windows: [{ u: [1.0, 2.6], h: [1.0, 2.2], panes: 3 }],
  blocks: [plain('corrugated hoarding', [.1, 3.8], [0, 2.4], '#a8806a', 9.8, .1)],
};

export const no49 = {
  ...mass('Lorong 14 Geylang', { wall: '#efe0d4', frame: '#7a2a22', glass: '#3a3032' }, { frontEdge: 0, review: { distance: 15.5, pitch: 10 }, height: 4.0, roof: { type: 'hip', ridge: 6.4, colour: '#3a3c40' } }),
  id: 'l14-49', buildingIds: ['763764651'], kind: 'unnamed', unnamed: true,
  name: 'No. 49 Lorong 14 Geylang (May 2023 massing, occupant not identified)', address: '49 Lorong 14 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a single-storey temple under a dark tiled roof with green ridge tiles, its front carrying a red board with gold characters, behind a grey boundary wall under blue tiled coping whose board reads 鳳山王助會 (read from the right), with red gates to its south. Question 52 recorded the compound\'s gate as reading 鳳山寺. Listings could not be checked (open question 84), so no name is given and the boards are drawn blank.' + note,
  sources: src('763764651', '10', '11', '104'),
  windows: [{ u: [1.2, 2.6], h: [.8, 2.4], panes: 2 }, { u: [4.4, 5.8], h: [.8, 2.4], panes: 2 }],
  blocks: [
    plain('blank red board', [2.0, 5.0], [2.7, 3.4], '#b8202a', .05, .04),
    plain('dark doorway', [2.9, 4.1], [.05, 2.5], '#3a1a14'),
    plain('grey boundary wall', span(6.97, .1), [0, 1.9], '#a8a8a4', 11.0, .25),
    plain('blue tiled coping', span(6.97, .1), [1.9, 2.15], '#2a5aa8', 11.0, .4),
    plain('blank dark board', [1.8, 5.2], [.9, 1.5], '#2a2c2e', 11.14, .02),
  ],
};

export const no51 = {
  ...mass('Lorong 14 Geylang', { wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 4, review: { distance: 12.5, pitch: 8 }, height: 3.4, roof: tiles(5.4) }),
  id: 'l14-51', buildingIds: ['763764652'], kind: 'unnamed', unnamed: true,
  name: 'No. 51 Lorong 14 Geylang (May 2023 massing, occupant not identified)', address: '51 Lorong 14 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white single-storey house under an orange tiled roof behind red gates, south of the temple compound on the east side of the lane. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('763764652', '11', '12', '105'),
  windows: [{ u: [1.0, 2.8], h: [.9, 2.3], panes: 2 }],
  blocks: [plain('red gate', span(3.85, .2), [0, 1.8], '#c8302a', 7.5, .05)],
};

export const no61 = {
  ...mass('Lorong 14 Geylang', { wall: '#efeeea', frame: '#3a3c3e', glass: '#3a4044' }, { frontEdge: 0, review: { distance: 9, pitch: 8 }, height: 3.4, roof: tiles(5.6) }),
  id: 'l14-61', buildingIds: ['763764656'], kind: 'unnamed', unnamed: true,
  name: 'No. 61 Lorong 14 Geylang (May 2023 massing, occupant not identified)', address: '61 Lorong 14 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white single-storey house under an orange tiled roof behind a garden of potted plants on the east side of the lane, north of the two-storey row at Nos. 63-73. Listings could not be checked (open question 84), so no name is given.' + note,
  sources: src('763764656', '13', '16', '107'),
  windows: grid(spread(6.53, 2, 1.4), [.9], 1.4, 2),
  blocks: [plain('dark door', [2.8, 3.8], [.05, 2.2], '#2a2c2e')],
};

// Nos. 63-73: a two-storey row of shophouses under a red roof edge, cream, with white-framed windows over five-foot
// ways. Their fronts stand 6-9 m from the lane's centreline, so pieces over the five-foot way are held flat.
const shop = (id, number, front, W, review, extra = {}) => ({
  ...mass('Lorong 14 Geylang', { wall: '#efe6d0', frame: '#f0efea', glass: '#3a4044', pier: '#efe6d0', back: '#4a4440' }, {
    frontEdge: front, heldFlat: true, review: { distance: review, pitch: 18 }, height: 7.6, ceiling: 3.3, fiveFootWay: 1.8,
    roof: { type: 'gable', ridge: 9.2, ridgeDepth: .5, overhang: .3, colour: '#b4443a' },
  }),
  id: `l14-${number}`, buildingIds: [id], kind: 'unnamed', unnamed: true,
  name: `No. ${number} Lorong 14 Geylang (May 2023 massing, occupant not identified)`, address: `${number} Lorong 14 Geylang`,
  evidence: `KartaView panoramas of May 2023 show a cream two-storey shophouse, one of the row at Nos. 63-73 at the Guillemard Road end of the lane's east side, with white-framed windows and air-conditioning units on its upper floor under a red roof edge, over a five-foot way with grilled shop fronts. Listings could not be checked (open question 84), so no name is given.${note}`,
  sources: src(id, '16', '19', '110'),
  windows: grid(spread(W, Math.max(1, Math.round(W / 2.4)), 1.4, .5), [4.2], 1.6, 3),
  piers: [[.05, .45], [+(W - .45).toFixed(2), +(W - .05).toFixed(2)]],
  blocks: [plain('red roof edge', span(W), [7.2, 7.6], '#b4443a', .1, .2)],
  backFittings: [{ name: 'grilled shop front', u: span(W, .5), h: [.05, 2.8], colour: '#5a5e60' }],
  ...extra,
});
export const no63 = shop('763764657', '63', 0, 6.54, 9);
export const no65 = shop('763764658', '65', 0, 7.74, 8.5);
export const no67 = shop('763764659', '67', 0, 5.85, 6);
export const no69 = shop('763764660', '69', 0, 4.19, 6);
export const no71 = shop('763764661', '71', 5, 5.2, 6);
export const no73 = shop('763764662', '73', 5, 8.48, 6, { sides: [{ edge: 3, windows: grid(spread(13.96, 4, 1.4), [4.2], 1.6, 3) }] });

// Lorong 16, west side then east side.
export const canberlin = {
  ...mass('Lorong 16 Geylang', { wall: '#efeeea', frame: '#5a5e60', glass: '#4a5a62' }, { frontEdge: 17, review: { distance: 13, pitch: 30 }, height: 22.0 }),
  id: 'l16-60', buildingIds: ['763764655'], kind: 'unnamed', unnamed: true,
  name: 'No. 60 Lorong 16 Geylang (May 2023 massing, occupant not identified)', address: '60 Lorong 16 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white apartment block of about seven storeys over a car park behind a gated wall on the west side of the lane, with grey louvred screens across its balconies. Question 62 found Canberlin Apartments listed at 60 Lorong 16; listings could not be checked again (open question 84), so no name is given. Its height follows its storeys and carries about ±4 m.' + note,
  sources: src('763764655', '721', '722', '720'),
  windows: grid(spread(18.27, 5, 1.8), floors(6, 4.2, 3.0), 1.7, 3),
  blocks: [
    ...floors(6, 3.9, 3.0).map(b => plain('grey louvred screen', [1.0, 17.27], [+b.toFixed(2), +(b + 1.2).toFixed(2)], '#9aa4aa', .5, .1)),
    plain('open car park', [1.0, 17.27], [.05, 3.4], '#3a3836', .006, .01),
  ],
};

export const associationBuilding = {
  ...mass('Lorong 16 Geylang', { wall: '#f0f0ec', frame: '#5a8a96', glass: '#3a4a56' }, { frontEdge: 9, review: { distance: 8.5, pitch: 30 }, height: 17.0 }),
  id: 'l16-association', buildingIds: ['763764663'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 16 Geylang, west side, the Association Building (May 2023 massing, occupant not identified)', address: 'West side of Lorong 16 Geylang, near Guillemard Road',
  evidence: 'KartaView panoramas of May 2023 show a white block of five storeys on the west side of the lane near Guillemard Road, with big round openings in its upper walls, pale blue-teal window frames and a pale blue stair tower, and a sign at its gate reading ASSOCIATION BUILDING under Chinese characters. Question 62 recorded the Association Building at 68 Lorong 16; listings could not be checked again (open question 84), so no name is given and the sign is not drawn. Its height follows its storeys and carries about ±2 m.' + note,
  sources: src('763764663', '717', '718', '721'),
  windows: grid(spread(15.71, 4, 2.0), [4.0, 7.2, 10.4, 13.6], 1.6, 3),
  blocks: [
    ...[[2.0, 4.6], [6.6, 9.2], [11.2, 13.8]].map(u => plain('round opening', u, [7.0, 9.6], '#3a4448', .03, .04)),
    plain('pale blue stair tower', [13.4, 15.6], [0, 17.6], '#a8d0dc', .3, .6),
  ],
  sides: [{ edge: 0, windows: grid(spread(15.84, 4, 2.0), [4.0, 7.2, 10.4, 13.6], 1.6, 3), blocks: [...[[2.0, 4.6], [6.6, 9.2], [11.2, 13.8]].map(u => plain('round opening', u, [7.0, 9.6], '#3a4448', .03, .04))] }],
};

export const culturalBuilding = {
  ...mass('Lorong 16 Geylang', { wall: '#f2f2ee', frame: '#e8ecf0', glass: '#4a9a9a' }, { frontEdge: 8, review: { distance: 10, pitch: 28 }, height: 15.0 }),
  id: 'l16-71', buildingIds: ['454274626'], kind: 'unnamed', unnamed: true,
  name: 'No. 71 Lorong 16 Geylang (May 2023 massing, occupant not identified)', address: '71 Lorong 16 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a white block of four storeys on the east side of the lane near Guillemard Road, with a bay of teal glass up its middle floors, a gold crest and a board of Chinese characters ending Cultural Building, behind a white wall and a slatted gate; red lanterns hang across its ground floor. The source way is tagged four levels. Listings could not be checked (open question 84), so no name is given and the crest and board are not drawn.' + note,
  sources: src('454274626', '717', '716', '722'),
  windows: [...grid(spread(22.57, 5, 1.4), [4.4, 7.6, 10.8], 1.6, 2), { u: [8.0, 14.5], h: [4.2, 11.8], panes: 6 }],
  blocks: [plain('red lanterns', [3.0, 19.5], [2.6, 3.0], '#c8302a', .3, .1), plain('white wall', span(22.57, .2), [0, 1.9], '#f2f2ee', 3.5, .25), plain('slatted gate', [9.0, 15.0], [0, 1.9], '#e8e4d8', 3.5, .1)],
};

export const lorong1416South = [no43, no49, no51, no61, no63, no65, no67, no69, no71, no73, canberlin, associationBuilding, culturalBuilding];
export const lorong1416SouthFrame = laneFrame, lorong1416SouthLayout = laneLayout, lorong1416SouthUpper = laneUpper, lorong1416SouthReviews = laneReviews, lorong1416SouthSides = laneSides;
