// Lorongs 6, 8, 10 and 12 south of the study rectangle, with the service road between Lorongs 4 and 6 (open question 92):
// twenty plots seen in KartaView's drives of 16 and 19 May 2023 up the lanes (open question 84). As on the lanes north of
// Sims Avenue they show no party walls to place a frame by, so they are photographed massing on their source outlines:
// colours, storeys, roofs and main features as photographed, window rows placed by estimate, heights from storey counts
// carrying about ±2 m (±4 m for the blocks of six storeys or more). Every building is unnamed for now. See
// docs/lorong-6-12-south-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .6) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
/** Window rows: n windows of width w on each storey of height step, from h0, up to height H. */
const rows = (W, n, w, h0, step, H, hh = 1.5, panes = 2) => {
  const out = [];
  for (let b = h0; b + hh < H - .4; b += step) for (const u of spread(W, n, w)) out.push({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes });
  return out;
};
const band = (name, W, h, colour, out = .02, depth = .04) => ({ name, u: [.03, +(W - .06).toFixed(2)], h, out, depth, colour });
const note = ' It is seen in passing in KartaView\'s drives of May 2023 up the lane (open question 84), which show no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys and main features as photographed, with window rows placed by estimate.';
const L6 = 'Lorong 6 Geylang', L8 = 'Lorong 8 Geylang', L10 = 'Lorong 10 Geylang', L12 = 'Lorong 12 Geylang', SR = 'Service road';
const place = ({ id, way: w, road, front, review, height, roof, colours, name, address, evidence, frames, windows = [], blocks = [], pitch }) => ({
  id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: road, review: { distance: review, pitch: pitch ?? (height > 12 ? 30 : 14) },
  heldFlat: true, shellInset: .3, upperInset: .04, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  name, address, evidence: evidence + note, sources: [way(w), ...frames.map(([s, i]) => kv(s, i))], windows, blocks,
});
const terrace = (w, front, W, n) => place({
  id: `l8-terrace-${n}`, way: w, road: L8, front, review: 14, height: 3.6, roof: { type: 'gable', ridge: 5.4, ridgeDepth: .4, overhang: .6, colour: '#b4553d' },
  colours: { wall: '#ecebe6', frame: '#2e5a8a' }, name: `Single-storey house ${n} on the west side of Lorong 8 (May 2023 massing, occupant not identified)`, address: 'West side of Lorong 8 Geylang, south of the study rectangle',
  evidence: 'KartaView panoramas of May 2023 show a row of single-storey houses on the west side of Lorong 8 under red tiled roofs, with blue gates, blue painted steps and railings, potted plants and a green awning, behind a low wall. No sign is photographed, so no name is given.',
  frames: [['8344969', '446'], ['8344969', '448'], ['8344969', '449']],
  windows: [{ u: [.8, +(W - .8).toFixed(2)], h: [1.0, 2.4], panes: 2 }],
  blocks: [{ name: 'blue gate', u: [.2, +(W - .2).toFixed(2)], h: [.2, 1.6], out: .1, depth: .06, colour: '#3a6aa8' }],
});

export const lorong612South = [
  place({ id: 'l6-5', way: '454274481', road: L6, front: 2, review: 15, height: 26.0, colours: { wall: '#ecc8c4', glass: '#5a8a8a' },
    name: 'No. 5 Lorong 6 Geylang (May 2023 massing, occupant not identified)', address: '5 Lorong 6 Geylang',
    evidence: 'KartaView panoramas of May 2023 show a block of about eight storeys in pastel bands of pink, cream and green, with green-tinted windows, behind a palm and a dark boundary wall carrying a green mark reading five and lettering reading HOTEL SPLENDOUR. Listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '352'], ['8344969', '354']], windows: rows(33.33, 8, 2.2, 4.4, 3.0, 26.0),
    blocks: [band('cream band', 33.33, [10.0, 16.0], '#ece2c4'), band('green band', 33.33, [16.0, 19.0], '#a8c8a0'), band('dark boundary wall', 33.33, [.2, 1.6], '#2e3032', .1, .2)] }),
  place({ id: 'l6-20', way: '454254191', road: SR, front: 4, review: 12, height: 26.0, colours: { wall: '#ecdcb0', glass: '#3a4a56' },
    name: 'No. 20 Lorong 6 Geylang (May 2023 massing, occupant not identified)', address: '20 Lorong 6 Geylang',
    evidence: 'KartaView panoramas of May 2023 show a cream-yellow block of about eight storeys with grey vertical bands, small square windows and air-conditioners, its ground floor behind a gate and a grey canopy on the service road. The source way is named ibis budget Singapore Emerald; no sign could be read here and listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '978'], ['8344969', '977']], windows: rows(37.86, 10, 1.1, 4.4, 3.0, 26.0, 1.2, 1),
    blocks: spread(37.86, 5, 1.0, 2.0).map(u => ({ name: 'grey vertical band', u, h: [.2, 26.0], out: .05, depth: .1, colour: '#7a7c7e' })) }),
  place({ id: 'sr-royce', way: '1223129486', road: SR, front: 7, review: 8.5, height: 25.0, colours: { wall: '#f0efea', glass: '#3a4048' },
    name: 'Royce Residences (May 2023 massing, occupant not identified)', address: 'The service road between Lorongs 4 and 6',
    evidence: 'KartaView panoramas of May 2023 show a white block of about eight storeys with grey glass balconies over an open car park on its ground floor, with a timber pergola on a lower wing. The source way is named Royce Residences; listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '975'], ['8344969', '976']], windows: rows(25.2, 6, 2.4, 4.0, 3.0, 25.0, 1.6, 3),
    blocks: [band('open car park', 25.2, [.2, 3.4], '#4a4c4e'), ...[7.0, 10.0, 13.0, 16.0, 19.0, 22.0].map(b => ({ name: 'glass balcony', u: [1.0, 8.0], h: [b, b + 1.1], out: .1, depth: .2, colour: '#8a9aa2' }))] }),
  place({ id: 'sr-5', way: '454254199', road: SR, front: 7, review: 11, height: 25.0, colours: { wall: '#ecc8a8', glass: '#2e5a6a' },
    name: 'No. 5 on the service road between Lorongs 4 and 6 (May 2023 massing, occupant not identified)', address: '5, the service road between Lorongs 4 and 6',
    evidence: 'KartaView panoramas of May 2023 show a peach and cream apartment block of about eight storeys with brown bay windows and balconies hung with washing, behind a black gate. The source way is named Wang Lodge; listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '988'], ['8344969', '987']], windows: rows(8.73, 2, 1.6, 4.0, 2.9, 25.0) }),
  place({ id: 'sr-7', way: '454254198', road: SR, front: 0, review: 14, height: 19.0, colours: { wall: '#ecc4a8', glass: '#2e5a6a' },
    name: 'No. 7 on the service road between Lorongs 4 and 6 (May 2023 massing, occupant not identified)', address: '7, the service road between Lorongs 4 and 6',
    evidence: 'KartaView panoramas of May 2023 show a peach apartment block of about six storeys with balconies, beside the service road. The source way is named Fern Lodge; listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '985'], ['8344969', '984']], windows: rows(22.67, 6, 1.6, 4.0, 2.9, 19.0) }),
  place({ id: 'sr-block', way: '1236158086', road: SR, front: 2, review: 13, height: 13.0, colours: { wall: '#ecdcb0', glass: '#3a4a56' },
    name: 'Block at the south end of the service road between Lorongs 4 and 6 (May 2023 massing, occupant not identified)', address: 'The service road between Lorongs 4 and 6, at the extract\'s south edge',
    evidence: 'KartaView panoramas of May 2023 show a cream block of about four storeys with grey bands and small windows at the south end of the service road. No sign is photographed, so no name is given.',
    frames: [['8344969', '980'], ['8344969', '979']], windows: rows(12.06, 3, 1.2, 4.0, 3.0, 13.0, 1.2, 1) }),
  terrace('454274470', 2, 3.893, 1), terrace('454274479', 0, 4.647, 2), terrace('454274473', 0, 5.438, 3), terrace('454274475', 0, 4.848, 4), terrace('454274477', 0, 5.229, 5),
  place({ id: 'l8-temple', way: '454274466', road: L8, front: 1, review: 16, height: 4.4, roof: { type: 'hip', ridge: 6.6, colour: '#b4553d' }, colours: { wall: '#d8b04a', frame: '#c8302a' },
    name: 'Temple on the west side of Lorong 8 (May 2023 massing, occupant not identified)', address: 'West side of Lorong 8 Geylang, south of the study rectangle',
    evidence: 'KartaView panoramas of May 2023 show a small single-storey temple under a red tiled hipped roof, with red columns and a dark doorway hung with lanterns, behind an ochre boundary wall capped in red. Its name board could not be read and listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '444'], ['8344969', '445']],
    blocks: [...spread(18.2, 4, .4, 3.0).map(u => ({ name: 'red column', u, h: [.2, 4.4], out: .1, depth: .2, colour: '#c8302a' })), { name: 'dark doorway', u: [7.6, 10.6], h: [.2, 3.0], out: .02, depth: .04, colour: '#2a2422' }, band('ochre boundary wall', 18.2, [.2, 1.6], '#d8b04a', .1, .2)] }),
  ...[['l8-19', '1223401724', '19'], ['l8-19a', '454438336', '19A']].map(([id, w, n]) => place({ id, way: w, road: L8, front: 5, review: 12, height: 13.0, colours: { wall: '#ecebe6', glass: '#2e3438' },
    name: `No. ${n} Lorong 8 Geylang (May 2023 massing, occupant not identified)`, address: `${n} Lorong 8 Geylang`,
    evidence: 'KartaView panoramas of May 2023 show a four-storey row of white and grey townhouses with recessed balconies, a red tiled canopy over the ground floor and red 19 plates at the gates. Listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '448'], ['8344969', '447']], windows: rows(6.8, 2, 1.8, 4.2, 3.0, 13.0, 1.5, 3),
    blocks: [{ name: 'red tiled canopy', u: [.1, 6.7], h: [3.0, 3.5], out: .1, depth: .2, colour: '#b4553d' }, { name: 'grey vertical band', u: [2.8, 4.0], h: [3.5, 13.0], out: .05, depth: .1, colour: '#7a7c7e' }] })),
  place({ id: 'l8-19a-hotel', way: '121873782', road: L8, front: 6, review: 16, height: 17.0, colours: { wall: '#b8c4d0', glass: '#3a4048' },
    name: 'No. 19A Lorong 8 Geylang (May 2023 massing, occupant not identified)', address: '19A Lorong 8 Geylang',
    evidence: 'KartaView panoramas of May 2023 show a pale blue-grey block of about five storeys with dark window bands and a dark colonnade on its ground floor, behind a black railing and a tree. The source way is named Hotel 81 Orchid; no sign could be read and listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '444'], ['8344969', '443']], windows: rows(26.7, 6, 2.6, 4.2, 3.1, 17.0, 1.6, 3),
    blocks: [band('dark colonnade', 26.7, [.2, 3.6], '#3a3e44'), ...[3.6, 6.8, 9.9, 13.0].map(b => band('dark band', 26.7, [b, +(b + .3).toFixed(2)], '#4a5058', .05, .1))] }),
  place({ id: 'l10-14', way: '454438333', road: L10, front: 1, review: 16, height: 17.0, colours: { wall: '#ecebe6', glass: '#3a6a9a' },
    name: 'Hotel block on the west side of Lorong 10 (May 2023 massing, occupant not identified)', address: 'West side of Lorong 10 Geylang, south of the study rectangle',
    evidence: 'KartaView panoramas of May 2023 show a white and cream block of about five storeys with stacked blue windows and air-conditioners, and a white board reading K HOTEL 14 over its entrance. Listings could not be checked (open question 84), so the board is drawn blank and no name is given.',
    frames: [['8344969', '581'], ['8344969', '580']], windows: rows(23.9, 6, 1.4, 4.2, 3.1, 17.0, 1.6, 2),
    blocks: [{ name: 'blank white board', u: [9.0, 13.0], h: [2.6, 3.4], out: .1, depth: .06, colour: '#f0efea' }] }),
  place({ id: 'l10-house', way: '454438325', road: L10, front: 9, review: 14, height: 7.5, roof: { type: 'gable', ridge: 9.2, ridgeDepth: .4, overhang: .5, colour: '#8a6a4a' }, colours: { wall: '#f0efea', glass: '#3a6a5a' },
    name: 'House on the east side of Lorong 10 (May 2023 massing, occupant not identified)', address: 'East side of Lorong 10 Geylang, south of the study rectangle',
    evidence: 'KartaView panoramas of May 2023 show a white two-storey house with green-framed windows under a brown eave, a board reading NOMADIO on its upper floor and red lanterns over its porch, behind a white gate. Listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '580'], ['8344969', '579']], windows: rows(12.5, 3, 1.6, 4.4, 3.0, 7.5),
    blocks: [{ name: 'white gate', u: [.5, 12.0], h: [.2, 1.8], out: .1, depth: .06, colour: '#f0efea' }] }),
  place({ id: 'l10-la-mode', way: '454438324', road: L10, front: 3, review: 16, height: 24.0, colours: { wall: '#2a5aa8', glass: '#e8e8e4' },
    name: 'Coloured block on the east side of Lorong 10 (May 2023 massing, occupant not identified)', address: 'East side of Lorong 10 Geylang, south of the study rectangle',
    evidence: 'KartaView panoramas of May 2023 show a block of about seven storeys painted in bold triangles of blue, red, teal and cream, with white-framed windows and air-conditioners, its gate wall lettered La Mode Hotel 歌迪雅旅店. Listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '581'], ['8344969', '582']], windows: rows(11.75, 3, 1.6, 4.2, 3.0, 24.0),
    blocks: [band('red band', 11.75, [3.6, 6.6], '#c8302a'), band('teal band', 11.75, [12.0, 14.0], '#2e8a8a'), band('cream band', 11.75, [20.0, 24.0], '#ece2c4')] }),
  place({ id: 'l10-peach', way: '454438322', road: L10, front: 3, review: 14, height: 6.5, roof: { type: 'gable', ridge: 8.6, ridgeDepth: .4, overhang: .5, colour: '#8a5a42' }, colours: { wall: '#e8b890', glass: '#3a4048' },
    name: 'House on the east side of Lorong 10 (May 2023 massing, occupant not identified)', address: 'East side of Lorong 10 Geylang, south of the study rectangle',
    evidence: 'KartaView panoramas of May 2023 show a peach two-storey house under a brown gabled roof, behind a black fence and building materials. No sign is photographed, so no name is given.',
    frames: [['8344969', '582'], ['8344969', '583']], windows: rows(6.84, 2, 1.2, 3.8, 3.0, 6.5) }),
  place({ id: 'l12-21', way: '454438317', road: L12, front: 7, review: 14, height: 16.0, colours: { wall: '#5a6a80', glass: '#2e3438' },
    name: 'No. 21 Lorong 12 Geylang (May 2023 massing, occupant not identified)', address: '21 Lorong 12 Geylang',
    evidence: 'KartaView panoramas of May 2023 show a slate-blue block of about four storeys with gold bands under each floor, dark windows and a car park on its ground floor, with a banner reading NOW OPEN, behind a railing. Listings could not be checked (open question 84), so no name is given.',
    frames: [['8344969', '542'], ['8344969', '543']], windows: rows(15.77, 4, 2.0, 4.4, 3.4, 16.0, 1.8, 3),
    blocks: [3.8, 7.2, 10.6, 14.0].map(b => band('gold band', 15.77, [b, +(b + .25).toFixed(2)], '#c8a85a', .05, .1)) }),
];
export const lorong612SouthFrame = laneFrame, lorong612SouthLayout = laneLayout, lorong612SouthUpper = laneUpper, lorong612SouthReviews = laneReviews, lorong612SouthSides = laneSides;
