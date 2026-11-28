// Lorong 22's east side from Geylang Road to Guillemard Road (open question 104), from the narrow east extension of
// 28 November 2026 and KartaView's drive of 16 May 2023 up the lane's northbound carriageway (sequence 8344809), which
// faces the east side across both carriageways. None of the plots shows party walls to place a frame by, so every one is
// photographed massing on its source outline, matched to the frames by its order along the lane. Heights follow storey
// counts and carry about ±2 m, ±4 m for the towers. Every building is unnamed for now, its boards drawn blank. See
// docs/lorong-22-east-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const spread = (W, n, w, m = .5) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes, out: .02 })));
const floors = (n, h0, step) => Array.from({ length: n }, (_, k) => h0 + step * k);
const span = (W, m = .03) => [m, +(W - m).toFixed(2)];
const plain = (name, u, h, colour, out = .02, depth = .04) => ({ name, u, h, out, depth, colour });
const note = ' It is seen in KartaView\'s drive of 16 May 2023 up the lane (open question 84), across both carriageways, which shows no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';

const plot = ({ id, way: w, front, W, storeys, height = +(storeys * 3.2 + .4).toFixed(1), roof, colours, label, address, look, signs, frames, review, windows, blocks = [] }) => ({
  id, buildingIds: [w], kind: 'unnamed', unnamed: true, frontEdge: front, reviewRoad: 'Lorong 22 Geylang',
  review: { distance: review, pitch: height > 14 ? 34 : 18 }, shellInset: .3, ceiling: .2, fiveFootWay: .02, height, roof: roof ?? { type: 'flat', colour: '#9a9c98' },
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  name: `${label} (May 2023 massing, occupant not identified)`, address,
  evidence: `KartaView panoramas of May 2023 show ${look}.${signs ? ' ' + signs : ''} Listings could not be checked (open question 84), so no name is given${signs ? ' and the lettering is not drawn' : ''}.${storeys > 1 ? ` Its height follows its ${storeys} storeys and carries about ±${storeys >= 6 ? 4 : 2} m.` : ''}` + note,
  sources: [way(w), ...frames.map(f => kv('8344809', f))],
  windows: windows ?? grid(spread(W, Math.max(1, Math.round((W - 1) / 3.2)), Math.min(1.5, W / 3)), floors(storeys - 1, 4.1, 3.2), 1.6), blocks,
});
const row = (id, number, front, W) => plot({ id: `l22e-${number}`, way: id, front, W, storeys: 3, colours: { wall: '#e8e2d4', frame: '#5a5e60', glass: '#3a4044' }, frames: ['1041', '1038'], review: 12.5,
  label: `No. ${number} Lorong 22 Geylang`, address: `${number} Lorong 22 Geylang`,
  look: `a weathered three-storey walk-up house, one of the row at Nos. 31-39 on the east side of Lorong 22, with balconies and grilled windows over a ground floor behind gates`,
  blocks: [plain('balcony', span(W, .3), [3.6, 4.6], '#d8d4c8', .5, .1), plain('dark ground floor', span(W, .4), [.05, 2.8], '#3a3836')] });

export const lorong22East = [
  plot({ id: 'l22e-404', way: '395804076', front: 1, W: 10.02, storeys: 2, roof: { type: 'hip', ridge: 9.0, colour: '#b4553d' }, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#3a4044' }, frames: ['1059', '1060'], review: 10,
    label: 'No. 404 Geylang Road, the Lorong 22 corner', address: '404 Geylang Road (the source tag), at the east corner of Lorong 22',
    look: 'old white two-storey buildings under red tiled roofs at the corner of Geylang Road and Lorong 22, seen past the traffic on the lane',
    signs: 'The source way is named Former Eastern Aerated Water Company.' }),
  plot({ id: 'l22e-1', way: '395804073', front: 2, W: 28.39, storeys: 8, colours: { wall: '#f2f2ee', frame: '#5a5e60', glass: '#3a4a56' }, frames: ['1059', '1056', '1053'], review: 10,
    label: 'No. 1 Lorong 22 Geylang', address: '1 Lorong 22 Geylang',
    look: 'a white apartment block of about eight storeys behind trees at the north end of Lorong 22\'s east side, its balconies screened by brown and white louvres, with a tall grey stair and lift core at its south end and a lettered sign on the core',
    signs: 'The sign reads GRANDVIEW SUITES, as the source way names it.',
    blocks: [plain('grey core', [24.4, 28.3], [0, 27.6], '#8a8c8e', .3, .6), ...floors(7, 4.0, 3.2).map(b => plain('louvred screens', [2.0, 22.0], [+b.toFixed(2), +(b + 2.0).toFixed(2)], '#c8b8a4', .3, .05))] }),
  plot({ id: 'l22e-11', way: '395805493', front: 3, W: 13.32, storeys: 1, height: 5.0, roof: { type: 'gable', ridge: 8.4, ridgeDepth: .5, overhang: .6, colour: '#c8603a' }, colours: { wall: '#e8b860', frame: '#8a2a22', glass: '#3a2a22', trim: '#c8302a' }, frames: ['1056', '1053'], review: 7,
    label: 'No. 11 Lorong 22 Geylang', address: '11 Lorong 22 Geylang',
    look: 'a small Chinese temple on the east side of Lorong 22, its ochre walls and red columns under a red tiled roof with upturned eaves and dragons on its ridge, behind a red brick wall with ornamental railings',
    windows: [],
    blocks: [plain('red doors', [5.0, 8.3], [.05, 3.0], '#a8201a', .03, .04), ...[[2.2, 2.6], [10.7, 11.1]].map(u => plain('red column', u, [0, 4.6], '#c8302a', .5, .3)),
      plain('red brick wall', span(13.32, .2), [0, 1.6], '#a8443a', 4.0, .3)] }),
  plot({ id: 'l22e-15', way: '395805492', front: 2, W: 14.15, storeys: 2, roof: { type: 'hip', ridge: 9.6, colour: '#b4553d' }, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['1053', '1050'], review: 7,
    label: 'No. 15 Lorong 22 Geylang', address: '15 Lorong 22 Geylang',
    look: 'a white two-storey building under a red tiled roof edge on the east side of Lorong 22, with a forecourt of parked cars and a blue phone shop board',
    signs: 'The board reads vivo; the source way is named Seng Wah Hotel.',
    blocks: [plain('blank blue board', [2.0, 7.0], [2.8, 3.5], '#2a5aa8', .05, .04)] }),
  plot({ id: 'l22e-19', way: '395805496', front: 2, W: 17.64, storeys: 9, colours: { wall: '#efeeea', frame: '#5a5e60', glass: '#3a4a56' }, frames: ['1050', '1047'], review: 7,
    label: 'No. 19 Lorong 22 Geylang', address: '19 Lorong 22 Geylang',
    look: 'a white hotel of nine storeys on the east side of Lorong 22, with a central bay of blue glass under an arch, white-framed windows in moulded surrounds and a porch over a driveway through its ground floor',
    signs: 'The board over the porch reads MIN WAH HOTEL, as the source way names it.',
    blocks: [plain('blue glass bay', [6.6, 11.0], [4.0, 27.0], '#2a4a7a', .1, .1), plain('driveway', [5.6, 12.0], [.05, 3.4], '#2a2e30'), plain('blank board', [6.0, 11.6], [3.5, 4.0], '#c8a040', .05, .04)] }),
  plot({ id: 'l22e-21', way: '395805499', front: 2, W: 13.63, storeys: 8, colours: { wall: '#efd0c8', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['1050', '1047'], review: 7,
    label: 'No. 21 Lorong 22 Geylang', address: '21 Lorong 22 Geylang',
    look: 'a pink hotel of eight storeys on the east side of Lorong 22, with white-framed windows under blue arched hoods and a red board over its entrance',
    signs: 'The source way is named Kim Tian Hotel.',
    blocks: floors(7, 4.1, 3.2).flatMap(b => spread(13.63, 4, 1.5).map(u => plain('blue arched hood', [u[0] - .05, u[1] + .05], [+(b + 1.6).toFixed(2), +(b + 1.9).toFixed(2)], '#3a6ab8', .1, .2))) }),
  plot({ id: 'l22e-25', way: '395805498', front: 2, W: 8.52, storeys: 9, colours: { wall: '#c8ccd0', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['1047', '1044'], review: 7,
    label: 'No. 25 Lorong 22 Geylang', address: '25 Lorong 22 Geylang',
    look: 'a narrow grey and white tower of about nine storeys on the east side of Lorong 22, its front of pierced white screens with a large lotus emblem near the top, over a dark entrance with a lotus mark on its gate',
    signs: 'A board reads PEOPLES BUDDHIST STUDY SOCIETY, as the source way names it.',
    windows: grid([[2.4, 6.1]], floors(8, 4.1, 3.2), 1.4, 3),
    blocks: [plain('lotus emblem', [2.4, 6.1], [26.0, 28.4], '#e8ecf0', .1, .05), plain('pierced screen', [.4, 2.0], [3.6, 28.0], '#e8ecf0', .2, .1), plain('pierced screen', [6.5, 8.1], [3.6, 28.0], '#e8ecf0', .2, .1)] }),
  plot({ id: 'l22e-27', way: '395805495', front: 2, W: 12.79, storeys: 4, colours: { wall: '#e8c4c0', frame: '#9a2a2a', glass: '#2e3438' }, frames: ['1047', '1044'], review: 7,
    label: 'No. 27 Lorong 22 Geylang', address: '27 Lorong 22 Geylang',
    look: 'a pink and white building of four storeys on the east side of Lorong 22, with red-railed balconies on its upper floors and a red gate',
    blocks: floors(3, 3.6, 3.2).map(b => plain('red balcony rail', span(12.79, .4), [+b.toFixed(2), +(b + 1.0).toFixed(2)], '#b8302a', .4, .05)) }),
  plot({ id: 'l22e-29', way: '395805500', front: 2, W: 12.74, storeys: 9, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#3a4a56' }, frames: ['1047', '1044', '1041'], review: 7,
    label: 'No. 29 Lorong 22 Geylang', address: '29 Lorong 22 Geylang',
    look: 'a white block of about nine storeys on the east side of Lorong 22, with rows of windows, a maroon side tower pierced by a column of round windows, and a green tiled canopy over its entrance with a board of Chinese characters',
    signs: 'The board reads 茶陽大廈; the source way is named Char Yong (Dabu) Association.',
    blocks: [plain('maroon tower', [10.6, 12.7], [0, 29.2], '#7a2a3a', .2, .4), plain('green tiled canopy', [1.0, 10.0], [3.0, 3.4], '#2e7a4a', .6, 1.2)] }),
  row('820421309', '31', 4, 8.53), row('395805490', '33', 0, 7.42), row('820421310', '35', 0, 6.95), row('820421311', '37', 0, 7.65), row('820421312', '39', 0, 5.49),
  plot({ id: 'l22e-41', way: '395805494', front: 2, W: 17.27, storeys: 9, colours: { wall: '#f0efea', frame: '#5a6a6a', glass: '#3a6a72' }, frames: ['1041', '1038'], review: 7,
    label: 'No. 41 Lorong 22 Geylang', address: '41 Lorong 22 Geylang',
    look: 'a modern apartment block of about nine storeys on the east side of Lorong 22, with bays of tinted glass and teal and white balconies, behind a low wall and a gate',
    signs: 'The source way is named Prime Residence.',
    windows: grid([[2.0, 9.0]], floors(8, 4.1, 3.2), 2.6, 5),
    blocks: floors(8, 3.8, 3.2).map(b => plain('teal balcony', [10.0, 16.8], [+b.toFixed(2), +(b + 1.0).toFixed(2)], '#7ac8c0', .6, .1)) }),
  plot({ id: 'l22e-charcoal', way: '474914006', front: 3, W: 11.2, storeys: 8, colours: { wall: '#4a4c50', frame: '#2a2c2e', glass: '#2a3034' }, frames: ['1038', '1036'], review: 7,
    label: 'Lorong 22 Geylang, east side, the charcoal block', address: 'East side of Lorong 22 Geylang, near Guillemard Road',
    look: 'a charcoal-grey apartment block of eight storeys near the Guillemard Road end of Lorong 22, with deep angled balconies and dark glass behind trees',
    windows: grid([[1.0, 10.2]], floors(7, 4.1, 3.2), 2.4, 4) }),
  plot({ id: 'l22e-213', way: '820421313', front: 9, W: 15.71, storeys: 6, colours: { wall: '#5a5c60', frame: '#2a2c2e', glass: '#2a3034' }, frames: ['1036', '1035'], review: 9,
    label: 'No. 213 Guillemard Road, the Lorong 22 corner', address: '213 Guillemard Road (the source tag), at the east corner of Lorong 22',
    look: 'a dark grey apartment block of about six storeys at the corner of Lorong 22 and Guillemard Road, with angled balconies and dark glass behind trees',
    windows: grid([[1.0, 14.7]], floors(5, 4.1, 3.2), 2.4, 6) }),
];
export const lorong22EastFrame = laneFrame, lorong22EastLayout = laneLayout, lorong22EastUpper = laneUpper, lorong22EastReviews = laneReviews, lorong22EastSides = laneSides;
