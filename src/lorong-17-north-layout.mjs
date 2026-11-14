// Lorong 17 north of Sims Avenue (open question 87): four industrial plots set back 15-23 m from the lane behind car parks
// and trees, seen in passing in KartaView's drive of 16 May 2023 down the lane (open question 84). None of them shows
// party walls to solve a frame from, so they are photographed massing on their source outlines, as Sims Avenue Nos.
// 165-177 are: colours, storeys and roofs as photographed, with window rows placed by estimate. Heights come from roofline
// elevations in frames at known distances and carry about ±3 m. Every building is unnamed for now, its boards drawn blank.
// See docs/lorong-17-north-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

/** n spans of width w spread evenly across a face of width W, with a margin m at each end. */
const spread = (W, n, w, m = .8) => Array.from({ length: n }, (_, i) => {
  const c = m + w / 2 + (n > 1 ? (W - 2 * m - w) * i / (n - 1) : (W - 2 * m - w) / 2);
  return [+(c - w / 2).toFixed(2), +(c + w / 2).toFixed(2)];
});
const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const bands = (W, hs, colour, depth = .06) => hs.map(h => ({ name: 'floor band', u: [.03, +(W - .06).toFixed(2)], h: [+h.toFixed(2), +(h + .3).toFixed(2)], out: depth / 2, depth, colour }));
const mass = (colours, o) => ({
  reviewRoad: 'Lorong 17 Geylang', shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  ...o,
});
const note = ' Set back behind a car park and trees, it is seen only in passing in KartaView\'s drive of 16 May 2023 down the lane (open question 84), so it is modelled as photographed massing on its source outline: colours, storeys and roof as photographed, with its window rows placed by estimate.';
const sources = id => [way(id), kv('8344809', '288'), kv('8344809', '292'), kv('8344809', '298')];

// No. 43: three storeys of red brick under a dark hipped roof, with cream floor bands and a red canopy at its entrance.
const floors43 = [1.0, 4.5, 8.0];
export const no43 = {
  ...mass({ wall: '#b5553c', frame: '#e8e6e0', glass: '#3a4044' }, { frontEdge: 0, review: { distance: 16, pitch: 16 }, height: 10.5, roof: { type: 'hip', ridge: 13.5, colour: '#4a4c50' } }),
  id: 'l17-43', buildingIds: ['439168851'], kind: 'unnamed', unnamed: true,
  name: 'No. 43 Lorong 17 Geylang (May 2023 massing, occupant not identified)', address: '43 Lorong 17 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a three-storey red-brick block under a dark grey hipped roof, with cream bands at its floors, rows of windows and a red canopy over its entrance, behind a fence and tall trees on the west side of the lane. A board at its gate reads 新加坡佛教居士林 彌陀村 活動中心; listings could not be checked (open question 84), so no name is given. Its heights come from frames about 30-46 m away and carry about ±2 m.' + note,
  sources: sources('439168851'),
  windows: grid(spread(10.2, 3, 2.0), floors43, 1.6),
  blocks: [...bands(10.2, [3.3, 6.8, 10.2], '#e2d6c2'), { name: 'red entrance canopy', u: [2.5, 7.5], h: [2.6, 3.0], out: .6, depth: 1.2, colour: '#b8322a' }],
  sides: [[1, 20.3], [5, 29.3]].map(([edge, W]) => ({ edge, windows: grid(spread(W, Math.round(W / 3.6), 1.6), floors43, 1.6), blocks: bands(W, [3.3, 6.8, 10.2], '#e2d6c2') })),
};

// No. 51, Superior Industrial Building: about ten storeys, white with yellow vertical bands and beige floor bands.
const floors51 = Array.from({ length: 10 }, (_, k) => 3.6 * k + 1.2);
const slabs51 = Array.from({ length: 9 }, (_, k) => 3.6 * (k + 1));
export const no51 = {
  ...mass({ wall: '#f0efea', frame: '#5a6a72', glass: '#3a4a56' }, { frontEdge: 1, review: { distance: 18, pitch: 30 }, height: 37.0, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l17-51', buildingIds: ['439168795'], kind: 'unnamed', unnamed: true,
  name: 'No. 51 Lorong 17 Geylang (May 2023 massing, occupant not identified)', address: '51 Lorong 17 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a block of about ten storeys, white with vertical yellow bands, recessed yellow balconies and beige bands at its floors, behind palms and a gated car park on the west side of the lane. The source way is named Superior Industrial Building, but no sign could be read and listings could not be checked (open question 84), so no name is given. Its height, about 37 m, comes from its roofline in a frame about 75 m away and carries about ±3 m.' + note,
  sources: sources('439168795'),
  windows: grid(spread(8.8, 2, 1.2), floors51, 1.4),
  blocks: [{ name: 'yellow vertical band', u: [3.7, 5.1], h: [3.6, 37.0], out: .03, depth: .06, colour: '#e8c428' }, ...bands(8.8, slabs51, '#e2cfa0')],
  sides: [[5, 8.8], [9, 9.5], [10, 10.1], [0, 19.7]].map(([edge, W]) => ({
    edge, windows: grid(spread(W, Math.max(2, Math.round(W / 4)), 1.2), floors51, 1.4),
    blocks: [...bands(W, slabs51, '#e2cfa0'), ...(edge === 9 || edge === 10 ? [{ name: 'yellow vertical band', u: [+(W / 2 - .7).toFixed(2), +(W / 2 + .7).toFixed(2)], h: [3.6, 37.0], out: .03, depth: .06, colour: '#e8c428' }] : [])],
  })),
};

// No. 46, Enterprise Industrial Building: a tower of green glass bands in a grey tiled frame, over a tall dark lobby.
const floors46 = Array.from({ length: 11 }, (_, k) => 7.0 + 3.2 * k);
const glass46 = W => grid([[1.2, +(W / 2 - .8).toFixed(2)], [+(W / 2 + .8).toFixed(2), +(W - 1.2).toFixed(2)]], floors46.map(b => b + .3), 2.3, 6);
export const no46 = {
  ...mass({ wall: '#c8c6c0', frame: '#b8b6b0', glass: '#2e7a78' }, { frontEdge: 9, review: { distance: 23, pitch: 32 }, height: 42.0, roof: { type: 'flat', colour: '#8a8c88' } }),
  id: 'l17-46', buildingIds: ['454254369'], kind: 'unnamed', unnamed: true,
  name: 'No. 46 Lorong 17 Geylang (May 2023 massing, occupant not identified)', address: '46 Lorong 17 Geylang',
  evidence: 'KartaView panoramas of May 2023 show a tower of about eleven storeys of green glass bands in a grey tiled frame, over a tall dark lobby with a curved canopy, behind a guardhouse and a barrier on the east side of the lane, with antennas on its roof. A low sign at the gate reads ENTERPRISE INDUSTRIAL BUILDING 46 LORONG 17 GEYLANG, and a board high on the south face reads PRIMAC; listings could not be checked (open question 84), so no name is given. Its height, about 42 m to the parapet, comes from its roofline in a frame about 114 m north of it and carries about ±4 m; the tower is taken to fill the outline, as the frames from the west and the south show.' + note,
  sources: [...sources('454254369'), kv('8344809', '280'), kv('8348649', '2746')],
  windows: glass46(27.5),
  blocks: [
    { name: 'dark lobby', u: [1.0, 26.5], h: [.2, 6.5], out: .02, depth: .04, colour: '#2a2e30' },
    { name: 'curved canopy', u: [14.0, 25.0], h: [6.4, 7.4], out: 1.2, depth: 2.4, colour: '#d8d4c8' },
    { name: 'rooftop antennas', u: [3.0, 8.0], h: [42.0, 46.0], out: -3.0, depth: .3, colour: '#d8d8d4' },
  ],
  sides: [[8, 33.7], [7, 31.6], [4, 18.5]].map(([edge, W]) => ({ edge, windows: glass46(W), blocks: [{ name: 'dark lobby', u: [1.0, +(W - 1).toFixed(2)], h: [.2, 6.5], out: .02, depth: .04, colour: '#2a2e30' }] })),
};

// No. 50: a grey three-level industrial block, roller shutters below and a long louvred band window above.
export const no50 = {
  ...mass({ wall: '#b8bcc0', frame: '#7a7c7a', glass: '#9aa0a2' }, { frontEdge: 3, review: { distance: 15, pitch: 20 }, height: 15.7, roof: { type: 'flat', colour: '#9a9c98' } }),
  id: 'l17-50', buildingIds: ['454254368'], kind: 'unnamed', unnamed: true,
  name: 'No. 50 Lorong 17 Geylang (May 2023 massing, occupant not identified)', address: '50 Lorong 17 Geylang (plate 50 on its gate pier)',
  evidence: 'KartaView panoramas of May 2023 show a plain grey industrial block of three tall levels on the east side of the lane, behind a brick gate pier with the plate 50: roller shutters on its ground floor, a long band of louvred windows near the top, a few small windows on its south face, and red lettering ending (PTE) LTD high on its lane face. Listings could not be checked (open question 84), so the lettering is not drawn and no name is given. Its height, about 15.7 m, comes from its corner in a frame 15 m away and carries about ±1 m.' + note,
  sources: sources('454254368'),
  windows: [[3.0, 15.0], [18.0, 30.0], [33.0, 40.0]].map(u => ({ u, h: [10.4, 12.8], panes: 8 })),
  blocks: [
    ...[[2.0, 8.0], [10.0, 16.0], [25.0, 31.0]].map(u => ({ name: 'roller shutter', u, h: [.2, 5.2], out: .02, depth: .04, colour: '#a8aaa8' })),
    ...[[20.0, 21.5], [26.0, 27.5]].map(u => ({ name: 'small window', u, h: [7.0, 8.4], out: .02, depth: .04, colour: '#3a4044' })),
  ],
  sides: [{ edge: 2, windows: [[3.0, 4.2], [9.0, 10.2]].flatMap(u => [6.5, 11.5].map(b => ({ u, h: [b, b + 1.5], panes: 2 }))) }],
};

export const lorong17North = [no43, no51, no46, no50];
export const lorong17NorthFrame = laneFrame, lorong17NorthLayout = laneLayout, lorong17NorthUpper = laneUpper, lorong17NorthReviews = laneReviews, lorong17NorthSides = laneSides;
