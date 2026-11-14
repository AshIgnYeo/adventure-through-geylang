// Lorong 7 at the extract's west edge (open question 94): the Shan Fook Tong Temple and the block south of it on the
// lane's west side, Winsome Apartments at the Sims Avenue corner, and the two plots north of Sims Avenue west of the
// modelled side, seen in KartaView's drives of May 2023 down the lane and along the avenue (open question 84). As on the
// lanes north of Sims Avenue, they show no party walls to place a frame by, so they are photographed massing on their
// source outlines, with heights from storey counts and elevation angles carrying about ±2 m. Every building is unnamed
// for now, its boards drawn blank. See docs/lorong-7-brief.md.
import { way, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { kv } from './sims-avenue-north-layout.mjs';

const grid = (us, bs, hh, panes = 2) => bs.flatMap(b => us.map(u => ({ u, h: [+b.toFixed(2), +(b + hh).toFixed(2)], panes })));
const mass = (colours, o) => ({
  shellInset: .3, ceiling: .2, fiveFootWay: .02,
  colours: { trim: colours.wall, frame: '#2e3032', glass: '#3a4a56', back: '#3a3836', floor: '#a8a296', pier: colours.wall, ...colours },
  roof: { type: 'flat', colour: '#9a9c98' },
  ...o,
});
const note = ' It is seen in KartaView\'s drives of May 2023 (open question 84), which show no party walls to place a frame by, so it is modelled as photographed massing on its source outline: colours, storeys, roofs and main features as photographed, with openings placed by estimate.';
const src = (id, ...frames) => [way(id), ...frames.map(([seq, index]) => kv(seq, index))];

// The temple's compound wall along the lane: cream tiles under green glazed coping and green tiled grilles, with a
// gilded arch over its gate at the north end. It stands about 5.5 m from the lane's centreline.
const WALL = 8.0;
const compound = [
  { name: 'compound wall', u: [.1, 15.49], h: [0, 2.0], out: WALL, depth: .25, colour: '#ece6d8' },
  { name: 'green glazed coping', u: [.1, 15.49], h: [2.0, 2.3], out: WALL, depth: .4, colour: '#2e7a5a' },
  ...[[1.0, 4.0], [5.0, 8.0], [9.0, 11.6]].map(u => ({ name: 'green tiled grille', u, h: [1.4, 1.85], out: +(WALL + .13).toFixed(2), depth: .02, colour: '#2e6a54' })),
  { name: 'gate posts', u: [12.2, 15.2], h: [0, 2.8], out: WALL, depth: .5, colour: '#ece6d8' },
  { name: 'gilded gate arch', u: [12.0, 15.4], h: [2.8, 4.3], out: WALL, depth: .25, colour: '#c8a040' },
  { name: 'gate', u: [12.7, 14.7], h: [.05, 2.5], out: WALL, depth: .1, colour: '#8a4a2a' },
];

export const shanFookTong = {
  ...mass({ wall: '#efe8d8', frame: '#6a4a32', glass: '#3a4044', trim: '#f2ece0' }, {
    reviewRoad: 'Lorong 7 Geylang', frontEdge: 2, review: { distance: 13, pitch: 20 }, height: 7.0,
    roof: { type: 'gable', ridge: 10.0, ridgeDepth: .5, overhang: .6, colour: '#2e7a5a' },
  }),
  id: 'l7-5', buildingIds: ['453797931'], kind: 'unnamed', unnamed: true,
  name: 'No. 5 Lorong 7 Geylang (May 2023 massing, occupant not identified)', address: '5 Lorong 7 Geylang (the Lorong Tahar corner)',
  evidence: 'KartaView panoramas of May 2023 show a cream two-storey house at the corner of Lorong 7 and Lorong Tahar, behind a compound wall of cream tiles under green glazed coping and green tiled grilles, painted on the lane with flowers and birds, with a gilded arch over its gate at the north end. On the lane its upper storey is a glazed verandah over a patterned balustrade, under a green glazed-tile hipped roof with a striped awning below; a lower wing at the south end has a green-tiled roof with an ornamental ridge. On Lorong Tahar it shows a long face of windows under striped awnings and a gable end with an orange upturned outline and two diamond vents. The source way is named Shan Fook Tong Temple; no board could be read and listings could not be checked (open question 84), so no name is given. Its eaves stand about 7 m up and its ridge about 10 m.' + note,
  sources: src('453797931', ['8344969', '1881'], ['8344969', '1883'], ['8344873', '3994']),
  windows: [{ u: [3.0, 14.6], h: [4.1, 6.2], panes: 10 }],
  blocks: [
    { name: 'patterned balustrade', u: [2.8, 14.8], h: [3.3, 4.0], out: .4, depth: .2, colour: '#e8dcc8' },
    { name: 'striped awning', u: [2.8, 14.8], h: [2.9, 3.3], out: .6, depth: 1.0, colour: '#c89878' },
    { name: 'verandah roof', u: [2.4, 15.2], h: [6.9, 7.3], out: .7, depth: 1.4, colour: '#2e7a5a' },
    { name: 'lower wing roof', u: [.3, 2.8], h: [3.6, 4.0], out: .4, depth: .8, colour: '#2e7a5a' },
    { name: 'red-framed doors', u: [6.0, 10.0], h: [.1, 2.6], out: .02, depth: .04, colour: '#8a2a22' },
    ...compound,
  ],
  sides: [{
    edge: 1,
    windows: grid([[3.0, 4.4], [6.0, 7.4], [9.0, 10.4], [12.0, 13.4], [15.0, 16.4]], [1.2, 4.4], 1.5),
    blocks: [
      ...[[2.8, 17.0]].flatMap(u => [{ name: 'striped awning', u, h: [2.8, 3.1], out: .5, depth: .8, colour: '#c89878' }, { name: 'striped awning', u, h: [6.0, 6.3], out: .5, depth: .8, colour: '#c89878' }]),
      { name: 'orange gable outline', u: [1.0, 8.0], h: [7.0, 7.3], out: .1, depth: .2, colour: '#d8783a' },
      { name: 'compound wall', u: [.1, 19.1], h: [0, 2.0], out: 2.5, depth: .25, colour: '#ece6d8' },
      { name: 'green glazed coping', u: [.1, 19.1], h: [2.0, 2.3], out: 2.5, depth: .4, colour: '#2e7a5a' },
    ],
  }],
};

// The block south of the temple: yellow, its lane face in two bays stepped back to the north, white fins between tall
// windows under angled hoods, a shopfront below.
const yellowBay = W => ({
  windows: grid([[.6, +(W / 2 - .2).toFixed(2)], [+(W / 2 + .2).toFixed(2), +(W - .6).toFixed(2)]], [8.0, 10.2], 2.0, 3),
  blocks: [
    ...[.3, +(W / 2 - .15).toFixed(2), +(W - .6).toFixed(2)].map(a => ({ name: 'white fin', u: [a, +(a + .3).toFixed(2)], h: [7.6, 13.4], out: .25, depth: .5, colour: '#f0efea' })),
    { name: 'angled hoods', u: [.3, +(W - .3).toFixed(2)], h: [12.3, 13.2], out: .45, depth: .9, colour: '#e8d040' },
    { name: 'dark shopfront', u: [.4, +(W - .4).toFixed(2)], h: [.1, 3.8], out: .02, depth: .04, colour: '#2a2e32' },
    { name: 'fascia', u: [.1, +(W - .1).toFixed(2)], h: [3.9, 4.6], out: .1, depth: .2, colour: '#e8d040' },
  ],
});
const south = yellowBay(10.89);
export const no3 = {
  ...mass({ wall: '#e8d040', frame: '#f0efea', glass: '#3a6a7a', trim: '#f0efea' }, { reviewRoad: 'Lorong 7 Geylang', frontEdge: 4, review: { distance: 12.5, pitch: 26 }, height: 14.0 }),
  id: 'l7-yellow', buildingIds: ['453797933'], kind: 'unnamed', unnamed: true,
  name: 'Lorong 7 Geylang, south of No. 5 (May 2023 massing, occupant not identified)', address: 'West side of Lorong 7 Geylang, south of No. 5',
  evidence: 'KartaView panoramas of May 2023 show a yellow block of about three storeys on the west side of the lane, its lane face in two bays, the north one stepped back: tall windows of blue glass in two tiers between white fins under angled yellow hoods, a white stepped ornament on the south bay\'s parapet, and a dark shopfront with a blue door below, a small shrine on a white post in front. No sign could be read and listings could not be checked (open question 84), so no name is given. Its parapet stands about 14 m up and carries about ±2 m.' + note,
  sources: src('453797933', ['8344969', '1883'], ['8344873', '3999'], ['8344873', '4000']),
  windows: south.windows,
  blocks: [...south.blocks, { name: 'white stepped ornament', u: [3.6, 7.3], h: [14.0, 15.4], out: -.2, depth: .3, colour: '#f0efea' }, { name: 'blue door', u: [7.6, 8.6], h: [.1, 2.3], out: .03, depth: .04, colour: '#3a5a7a' }],
  sides: [{ edge: 2, ...yellowBay(4.57) }],
};

// Winsome Apartments' block at the Sims Avenue corner: white, three floors over an open ground floor, long windows under
// arched hoods, round windows, balconies at the corner.
const eyebrow = (u, h) => [{ name: 'arched window hood', u: [+(u[0] - .2).toFixed(2), +(u[1] + .2).toFixed(2)], h, out: .2, depth: .4, colour: '#5a7a80' }];
export const winsome = {
  ...mass({ wall: '#f2f2ee', frame: '#4a6a72', glass: '#2a3a5a', trim: '#f2f2ee' }, { reviewRoad: 'Sims Avenue', frontEdge: 3, review: { distance: 10, pitch: 24 }, height: 12.0 }),
  id: 'l7-18', buildingIds: ['1223603462'], kind: 'unnamed', unnamed: true,
  name: 'No. 18 Lorong 7 Geylang (May 2023 massing, occupant not identified)', address: '18 Lorong 7 Geylang (the Sims Avenue corner)',
  evidence: 'KartaView panoramas of May 2023 show a white apartment block at the corner of Lorong 7 and Sims Avenue, of three floors over an open ground floor on square columns behind a black railing: long windows of dark blue glass in grey-teal frames under arched hoods, round windows near the avenue end, a grey band over the ground floor, and balconies with steel railings round the corner. The source way is named Winsome Apartments; no sign could be read and listings could not be checked (open question 84), so no name is given. Its roof stands about 12 m up and carries about ±2 m.' + note,
  sources: src('1223603462', ['8348649', '2720'], ['8344969', '1871'], ['8344809', '3497']),
  windows: [{ u: [3.2, 8.6], h: [5.2, 6.8], panes: 5 }, { u: [3.2, 8.6], h: [8.4, 10.0], panes: 5 }, { u: [.9, 1.7], h: [5.6, 6.4], panes: 1 }, { u: [.9, 1.7], h: [8.8, 9.6], panes: 1 }],
  blocks: [
    ...eyebrow([3.2, 8.6], [6.9, 7.4]), ...eyebrow([3.2, 8.6], [10.1, 10.6]),
    { name: 'grey band', u: [.05, 12.68], h: [3.8, 4.4], out: .15, depth: .3, colour: '#8a9498' },
    { name: 'open ground floor', u: [.4, 12.3], h: [.1, 3.7], out: -1.0, depth: .1, colour: '#3a3836' },
    ...[[.3, .9], [6.0, 6.6], [11.8, 12.4]].map(u => ({ name: 'column', u, h: [0, 3.8], out: .1, depth: .5, colour: '#f2f2ee' })),
    ...[[5.0, 6.2], [8.2, 9.4]].map(h => ({ name: 'balcony railing', u: [9.4, 12.6], h, out: .7, depth: .05, colour: '#c8ccd0' })),
    ...[4.9, 8.1].map(b => ({ name: 'balcony slab', u: [9.4, 12.6], h: [b, b + .15], out: .4, depth: .8, colour: '#e8e8e4' })),
    { name: 'black railing', u: [.1, 12.6], h: [0, 1.3], out: 1.2, depth: .05, colour: '#2a2c2e' },
  ],
  sides: [
    { edge: 1, windows: [{ u: [2.0, 13.0], h: [5.2, 6.8], panes: 8 }, { u: [2.0, 13.0], h: [8.4, 10.0], panes: 8 }], blocks: [...eyebrow([2.0, 13.0], [6.9, 7.4]), ...eyebrow([2.0, 13.0], [10.1, 10.6]), { name: 'grey band', u: [.05, 15.38], h: [3.8, 4.4], out: .15, depth: .3, colour: '#8a9498' }] },
    { edge: 2, blocks: [...[[5.0, 6.2], [8.2, 9.4]].map(h => ({ name: 'balcony railing', u: [.1, 5.3], h, out: .7, depth: .05, colour: '#c8ccd0' })), ...[4.9, 8.1].map(b => ({ name: 'balcony slab', u: [.1, 5.3], h: [b, b + .15], out: .4, depth: .8, colour: '#e8e8e4' }))] },
  ],
};

// North of Sims Avenue: a pink single-storey hall under a corrugated metal roof, and behind it a white block of four
// storeys with a yellow end bay.
export const pinkHall = {
  ...mass({ wall: '#ecc8c8', frame: '#2e3032', glass: '#2a2e32' }, {
    reviewRoad: 'Sims Avenue', frontEdge: 2, review: { distance: 10, pitch: 12 }, height: 4.6,
    roof: { type: 'gable', ridge: 7.0, ridgeDepth: .5, overhang: .8, colour: '#8c9294' },
  }),
  id: 'sa-pink-hall', buildingIds: ['1223603463'], kind: 'unnamed', unnamed: true,
  name: 'Sims Avenue, the pink hall west of the modelled north side (May 2023 massing, occupant not identified)', address: 'North side of Sims Avenue, west of the modelled side',
  evidence: 'KartaView panoramas of May 2023 show a long pink single-storey hall behind a forecourt on the north side of Sims Avenue, under a grey corrugated metal roof, with arched windows and an arched door and a white board reading NOVA Premium. Listings could not be checked (open question 84), so no name is given, and the board is drawn blank. Its eaves stand about 4.6 m up.' + note,
  sources: src('1223603463', ['8348649', '2721'], ['8348649', '2720'], ['8348649', '2722']),
  windows: [[12.8, 13.8], [16.6, 17.6]].map(u => ({ u, h: [1.0, 3.2], panes: 2 })),
  blocks: [
    ...[[12.8, 13.8], [16.6, 17.6], [19.6, 21.0]].map(u => ({ name: 'arched head', u: [+(u[0] - .05).toFixed(2), +(u[1] + .05).toFixed(2)], h: [3.2, 3.6], out: .04, depth: .08, colour: '#ecc8c8' })),
    { name: 'blank white board', u: [14.1, 16.3], h: [1.2, 2.8], out: .05, depth: .06, colour: '#f2f2f0' },
    { name: 'arched door', u: [19.6, 21.0], h: [.05, 3.2], out: .02, depth: .04, colour: '#3a3032' },
  ],
};

export const whiteBlock = {
  ...mass({ wall: '#f2f2ee', frame: '#2e8a8a', glass: '#3a5a66' }, { reviewRoad: 'Sims Avenue', frontEdge: 2, review: { distance: 28, pitch: 24 }, height: 15.5 }),
  id: 'sa-white-block', buildingIds: ['439168657'], kind: 'unnamed', unnamed: true,
  name: 'Sims Avenue, behind the pink hall (May 2023 massing, occupant not identified)', address: 'North side of Sims Avenue, behind the pink hall',
  evidence: 'KartaView panoramas of May 2023 show a white block of four storeys behind the pink hall, with rows of windows in teal frames, a yellow band under its parapet and a yellow bay at its west end with two round windows, and solar panels on its roof. No sign could be read and listings could not be checked (open question 84), so no name is given. Its parapet stands about 15.5 m up and carries about ±2 m.' + note,
  sources: src('439168657', ['8348649', '2721'], ['8348649', '2720'], ['8344809', '3580']),
  windows: grid([[4.4, 5.8], [7.4, 8.8], [10.4, 11.8], [13.4, 14.8], [16.4, 17.8]], [1.2, 4.8, 8.4, 12.0], 1.6),
  blocks: [
    { name: 'yellow end bay', u: [.05, 3.6], h: [.1, 16.6], out: .1, depth: .2, colour: '#e8c428' },
    ...[[1.4, 2.2, 9.0], [1.4, 2.2, 12.4]].map(([a, b, h]) => ({ name: 'round window', u: [a, b], h: [h, h + .8], out: .22, depth: .04, colour: '#2e3438' })),
    { name: 'yellow band', u: [3.6, 20.66], h: [14.9, 15.5], out: .05, depth: .1, colour: '#e8c428' },
    { name: 'solar panels', u: [5.0, 16.0], h: [15.5, 16.4], out: -4.0, depth: 4.0, colour: '#2a3448' },
  ],
  sides: [{ edge: 3, windows: grid([[3.0, 4.4], [6.8, 8.2]], [1.2, 4.8, 8.4, 12.0], 1.6), blocks: [{ name: 'yellow end bay', u: [.05, 11.32], h: [.1, 16.6], out: .1, depth: .2, colour: '#e8c428' }] }],
};

export const lorong7 = [shanFookTong, no3, winsome, pinkHall, whiteBlock];
export const lorong7Frame = laneFrame, lorong7Layout = laneLayout, lorong7Upper = laneUpper, lorong7Reviews = laneReviews, lorong7Sides = laneSides;
