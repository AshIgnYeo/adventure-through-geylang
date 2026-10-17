// Lorong 14 from Geylang Road to the edge of the extract (open question 51), built one building at a time as Lorong 21
// was: south down the west side, then north up the east side to Geylang Road, then east along Geylang Road to Lorong 16.
// Each elevation is read on the plane where the panoramas agree, and laid on its source edge, which is kept. Named only
// where a listing and a photographed sign agree. See docs/lorong-14-brief.md.
import { pano, way, search, lay, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

/** A grille over a dark recess (or open, for a railing or gate): bars about 0.25 m apart with three rails. */
const grille = (name, u, h, out, colour, step = .25, recess = true) => {
  const [l, r] = u, [b, t] = h, n = Math.max(2, Math.round((r - l) / step));
  return [
    ...(recess ? [{ name: `${name} recess`, u, h, out: out - .05, depth: .02, colour: '#34363a' }] : []),
    ...Array.from({ length: n + 1 }, (_, i) => ({ name, u: [+(l + (r - l) * i / n - .02).toFixed(3), +(l + (r - l) * i / n + .02).toFixed(3)].map(v => Math.min(r, Math.max(l, v))), h, out, depth: .04, colour })),
    ...[b, (b + t) / 2, t - .05].map(y => ({ name, u, h: [+y.toFixed(3), +(y + .05).toFixed(3)], out, depth: .04, colour })),
  ];
};
/** Repeat a piece at each of several heights or spans. */
const each = (xs, fn) => xs.flatMap(fn);
const clampTo = W => ([a, b]) => [Math.min(W, Math.max(0, a)), Math.min(W, Math.max(0, b))];

// ---------------------------------------------------------------------------------------------
// West side

// 1. Way 121872892, No. 10, Wing Fong Court 永豐閣: an eight-storey block behind a fenced garden of palms, from the
// lawn at the Geylang Road corner to Talma Road. Its lane face (edge 0, u north from the Talma Road end) is a run of six
// projecting bays, each under a teal cornice with paired gabled dormers, rounded teal balconies and teal window hoods,
// over a grey base of three storeys; between them recessed white walls carry pairs of Greek-key strips under teal
// half-round lattices, with small gabled porches at their feet. The dormers, followed between four June 2024 lane
// panoramas, line up on a plane 0.75 m in front of the source edge (the depth scores' 1.5-2.25 m forward came from the
// repeating bays), so the face stands on its source line, its bays projecting about half a metre. On that plane the
// face runs the source edge's 85.6 m, from the rounded Talma Road corner to the north end, and is laid at its own scale.
// The boundary wall stands about 5 m in front of the source edge.
const W892 = 85.573, white892 = '#eeeeea', grey892 = '#9a9fa4', teal892 = '#2f6f6c';
// Window rows: the ground floor, then a floor every 3.0 m, the eighth in the dormers.
const rows892 = [[2.1, 3.3], [5.3, 6.5], [8.1, 9.3], [11.0, 12.3], [14.0, 15.2], [17.0, 18.2], [20.2, 21.4]];
// The projecting bays (u extents) and their dormers' centres, read on the 0.75 m plane.
const bays892 = [
  { u: [5.0, 16.0], dormers: [8.2, 12.3] }, { u: [19.8, 30.6], dormers: [22.6, 26.6] }, { u: [34.8, 46.0], dormers: [37.3, 41.8] },
  { u: [49.8, 59.4], dormers: [53.2, 57.1] }, { u: [64.6, 75.4], dormers: [67.6, 72.3] }, { u: [79.6, 85.4], dormers: [83.0] },
];
const recesses892 = [[16.0, 19.8], [30.6, 34.8], [46.0, 49.8], [59.4, 64.6], [75.4, 79.6]];
const porches892 = [19.3, 34.0, 44.8, 60.0, 74.0];
const portal892 = [37.0, 44.5];
const posts892 = Array.from({ length: 20 }, (_, i) => +(.3 + i * 4.47).toFixed(2)).filter(c => c < W892 - .4);
const bay892 = ({ u: [l, r], dormers }) => [
  { name: 'projecting bay', u: [l, r], h: [10.1, 24.8], out: .25, depth: .5, colour: white892 },
  { name: 'projecting bay base', u: [l, r], h: [.05, 10.1], out: .25, depth: .5, colour: grey892 },
  { name: 'teal window hood', u: [l + .6, r - .6], h: [6.6, 7.25], out: .9, depth: .9, colour: teal892 },
  { name: 'teal cornice', u: [l, r], h: [24.8, 25.9], out: .55, depth: 1.1, colour: teal892 },
  ...dormers.flatMap(c => [
    { name: 'dormer gable', u: [c - 1.15, c + 1.15], h: [25.9, 26.5], out: .3, depth: .6, colour: teal892 },
    { name: 'dormer gable', u: [c - .7, c + .7], h: [26.5, 27.0], out: .3, depth: .6, colour: teal892 },
    { name: 'dormer apex', u: [c - .25, c + .25], h: [27.0, 27.3], out: .3, depth: .6, colour: teal892 },
    { name: 'teal bay window box', u: [c - 1.0, c + 1.0], h: [22.3, 23.6], out: .8, depth: 1.1, colour: teal892 },
    ...[[12.6, 13.7], [15.7, 16.8]].map(h => ({ name: 'rounded teal balcony', u: [c - 1.15, c + 1.15], h, out: .9, depth: 1.2, colour: teal892 })),
  ]),
];
export const wingFongCourt = {
  id: 'wing-fong-court', buildingIds: ['121872892'], kind: 'wing-fong-court', frontEdge: 0, reviewRoad: 'Lorong 14 Geylang', review: { distance: 11, pitch: 24 },
  name: 'Wing Fong Court 永豐閣 (June 2024 exterior)', address: '10 Lorong 14 Geylang (Google Maps gives 12 Lorong 14 Geylang)',
  height: 24.8, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'flat', colour: '#a8583e' },
  evidence: 'June 2024 Street View shows an eight-storey block on the west side of Lorong 14, from the lawn at the Geylang Road corner to Talma Road, behind a garden of palms and a white boundary wall with teal posts, teal planters and black railings. Its lane face is a run of six projecting bays, each under a teal cornice with paired gabled dormers over teal bay windows, rounded teal balconies on the fifth and sixth floors and teal hoods over the second-floor windows, all over a grey base of three storeys; between the bays, recessed white walls carry pairs of Greek-key strips under teal half-round lattices, with small porches of teal lattice under tiled gables at their feet, and a drive-through portal opens into the courtyard. At the Talma Road corner the boundary wall carries a granite panel lettered 永豐閣 and Wing Fong Court, which triangulates about 3.6 m south of the building\'s Talma Road wall, and a teal canopy on Talma Road reads Wing Fong Court. The source map names this way Wing Fong Court, No. 10, eight storeys. Google Maps lists Wing Fong Court, an apartment complex, at 12 Lor 14 Geylang, Singapore 398924, with its point inside Wing Fong Mansions south of Talma Road, while 10 Lor 14 Geylang geocodes inside this outline; the lettering and the source agree on this building, so it is named under open question 12 (a clearly signed occupant may be modelled when published addresses disagree, the conflict recorded), and the corner panel is redrawn in original type. Four June 2024 lane panoramas (0W5F..., iXFF..., BMFJ..., Y-F5...) agree on the dormers on a plane 0.75 m in front of the source edge, where their apexes stand at 27.1-27.3 m; the depth scores\' 1.5-2.25 m forward came from the repeating bays. So the face stands on its source line, its bays projecting about half a metre, and runs the source edge\'s 85.6 m from the rounded Talma Road corner to the north end; it is laid at its own scale. Floors repeat every 3.0 m, the grey base reaches 10.1 m and the main wall 24.8 m under a 1.1 m teal cornice. The boundary wall, read from the elevation of its foot in three panoramas, stands about 5 m in front of the source edge.',
  sources: [way('121872892'), search('Wing Fong Court 12 Lorong 14 Geylang'), search('10 Lorong 14 Geylang'), pano('0W5FoVfgJUTpsOTPyVtxMQ', 255, 25, 90), pano('BMFJQJlmtfdvat-L3dcNig', 255, 25, 90), pano('64rMlx95tL_DPPv-vtYdjg', 262, 10, 60), pano('QGGji0BgigGZIln2qQtyaw', 345, 0, 40)],
  colours: { wall: white892, trim: '#dcdcd6', frame: teal892, glass: '#4a5a5c', pier: grey892, back: grey892, floor: '#a8a296' },
  windows: [
    // The rounded Talma Road corner, then two windows a dormer on every floor of each bay.
    ...rows892.slice(1).map(h => ({ u: [1.0, 3.6], h, panes: 3 })),
    ...bays892.flatMap(b => b.dormers.flatMap(c => [...rows892, [23.6, 25.0]].map(h => ({ u: [c - .85, c + .85], h, panes: 2, out: h[0] > 22 ? .62 : .52 })))),
  ],
  blocks: [
    { name: 'grey base', u: [0, W892], h: [3.0, 10.1], out: .01, depth: .02, colour: grey892 },
    { name: 'parapet', u: [0, W892], h: [24.5, 24.8], out: .05, depth: .1, colour: '#dcdcd6' },
    ...bays892.flatMap(bay892),
    ...recesses892.flatMap(([l, r]) => {
      const c = (l + r) / 2;
      return [
        ...[[c - .75, c - .35], [c + .35, c + .75]].map(u => ({ name: 'Greek-key strip', u, h: [1.0, 21.5], out: .05, depth: .06, colour: '#6a6e70' })),
        { name: 'teal half-round lattice', u: [l + .3, r - .3], h: [22.6, 24.3], out: .3, depth: .6, colour: teal892 },
      ];
    }),
    // The porches of teal lattice under small tiled gables.
    ...porches892.flatMap(c => [
      { name: 'teal lattice porch', u: [c - .7, c + .7], h: [0, 2.9], out: .6, depth: 1.2, colour: teal892 },
      { name: 'porch gable', u: [c - .8, c + .8], h: [2.9, 3.3], out: .6, depth: 1.3, colour: '#b4553d' },
      { name: 'porch gable', u: [c - .4, c + .4], h: [3.3, 3.65], out: .6, depth: 1.3, colour: '#b4553d' },
    ]),
    { name: 'drive-through portal', u: portal892, h: [3.0, 5.6], out: -.1, depth: .06, colour: '#3a3a38' },
    { name: 'portal soffit', u: portal892, h: [5.6, 5.9], out: .05, depth: .1, colour: '#e8dcc0' },
    // The boundary wall about 5 m in front: white, with teal posts and planters and black railings, and a black gate
    // across the portal's drive.
    ...[[0, portal892[0]], [portal892[1], W892]].flatMap(u => [
      { name: 'boundary wall', u, h: [0, 1.0], out: 5.0, depth: .3, colour: '#f2f2ee' },
      { name: 'teal planter', u, h: [1.0, 1.3], out: 5.0, depth: .45, colour: teal892 },
      ...grille('black railing', u, [1.3, 2.0], 5.0, '#1e2020', .3, false),
    ]),
    ...grille('black gate', portal892, [0, 2.0], 5.0, '#1e2020', .3, false),
    ...posts892.flatMap(c => [
      { name: 'boundary post', u: [c - .3, c + .3], h: [0, 2.0], out: 5.0, depth: .55, colour: '#f2f2ee' },
      { name: 'teal post panel', u: [c - .2, c + .2], h: [.2, 1.6], out: 5.29, depth: .02, colour: teal892 },
      { name: 'teal post cap', u: [c - .25, c + .25], h: [2.0, 2.35], out: 5.0, depth: .45, colour: teal892 },
    ]),
  ],
  backFittings: [
    ...porches892.map(c => ({ name: 'porch door', u: [c - .5, c + .5], h: [.1, 2.3], colour: '#3a3a36' })),
    { name: 'car park beyond the portal', u: portal892, h: [.1, 2.9], colour: '#4a4a46' },
  ],
  sides: [{
    edge: 1, // the Talma Road end, u east to the lane corner
    windows: rows892.slice(1).flatMap(h => [[5.0, 7.1], [11.0, 13.1], [16.5, 18.6]].map(u => ({ u, h, panes: 2 }))),
    blocks: [
      { name: 'grey base', u: [0, 21.12], h: [.13, 10.1], out: .01, depth: .02, colour: grey892 },
      { name: 'teal cornice', u: [0, 21.12], h: [24.8, 25.9], out: .4, depth: .8, colour: teal892 },
      ...[[4.5, 7.6], [16.0, 19.1]].map(u => ({ name: 'teal window hood', u, h: [6.6, 7.25], out: .45, depth: .9, colour: teal892 })),
      // The boundary wall on Talma Road, where the granite panel at the corner triangulates (from QGGj... and jrMz...)
      // about 3.6 m south of this wall.
      { name: 'boundary wall', u: [8.0, 21.12], h: [0, 1.9], out: 3.6, depth: .3, colour: '#f2f2ee' },
      ...[8.3, 12.6, 16.9].flatMap(c => [
        { name: 'boundary post', u: [c - .3, c + .3], h: [0, 2.0], out: 3.6, depth: .55, colour: '#f2f2ee' },
        { name: 'teal post cap', u: [c - .25, c + .25], h: [2.0, 2.35], out: 3.6, depth: .45, colour: teal892 },
      ]),
    ],
    // The curved corner of the wall beyond the building's corner, with its granite panel lettered 永豐閣 Wing Fong Court.
    boards: [{ u: [21.3, 25.3], h: [0, 1.9], out: 3.6 }],
  }, {
    edge: 21, // the north end on the lawn, u west from the lane corner
    windows: rows892.slice(1).flatMap(h => [[2.0, 4.2], [9.0, 11.2]].map(u => ({ u, h, panes: 2 }))),
    blocks: [
      { name: 'grey base', u: [0, 16.14], h: [.13, 10.1], out: .01, depth: .02, colour: grey892 },
      { name: 'teal cornice', u: [0, 16.14], h: [24.8, 25.9], out: .4, depth: .8, colour: teal892 },
      ...[[1.5, 4.7], [8.5, 11.7]].map(u => ({ name: 'teal window hood', u, h: [6.6, 7.25], out: .45, depth: .9, colour: teal892 })),
      ...[[12.6, 13.7], [15.7, 16.8]].map(h => ({ name: 'rounded teal balcony', u: [8.9, 11.3], h, out: .6, depth: 1.2, colour: teal892 })),
    ],
  }],
};

export const lorong14 = [wingFongCourt];
export const lorong14Frame = laneFrame, lorong14Layout = laneLayout, lorong14Upper = laneUpper, lorong14Reviews = laneReviews, lorong14Sides = laneSides;
export { grille, each, clampTo, pano, way, search, lay };
