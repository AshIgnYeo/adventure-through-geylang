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

// 2. Way 764372595, No. 12, Wing Fong Mansions 永豐樓: the eight-storey block south of Talma Road, Wing Fong Court's
// twin in cream over a terracotta-red ground floor, with a four-storey annex at its south end beyond the extract's
// edge. Its lane face (edge 75, u north from the south end) runs eight projecting bays under red cornices, single and
// paired dormers alternating, with Greek-key strips in the recesses between them. The dormers, followed between
// odvH... and 15hk... and between odvH... and 7Umz..., line up on planes 0.4-1.5 m behind the source edge, so the face
// stands on its source line, its bays about half a metre proud, and is laid at its own scale. The face runs on about
// 85 m past the extract's last way (open question 52), so its review start stands at its north end. The boundary wall
// stands about 6 m in front of the source edge.
const W595 = 122.352, cream595 = '#efe7d8', red595 = '#b8504a', redTop595 = '#c0605a', teal595 = '#2f6f6c';
const bays595 = [
  { u: [10.6, 16.0], dormers: [13.3] }, { u: [19.6, 30.9], dormers: [23.05, 27.45] }, { u: [34.5, 45.8], dormers: [39.1] },
  { u: [49.4, 60.6], dormers: [52.8, 57.2] }, { u: [64.2, 75.5], dormers: [68.9] }, { u: [79.1, 90.4], dormers: [83.3, 87.7] },
  { u: [94.0, 105.3], dormers: [98.3] }, { u: [108.9, 122.3], dormers: [113.4, 117.8] },
];
const recesses595 = bays595.slice(1).map((b, i) => [bays595[i].u[1], b.u[0]]);
const porches595 = [18.0, 61.0, 76.2, 94.4, 109.6];
const portal595 = [80.0, 87.5];
const posts595 = Array.from({ length: 30 }, (_, i) => +(10.8 + i * 3.9).toFixed(2)).filter(c => c < W595 - .4 && (c < portal595[0] - .3 || c > portal595[1] + .3));
// The drive-through portal under the sixth bay leaves its ground floor open.
const bay595 = ({ u: [l, r], dormers }) => [
  { name: 'projecting bay', u: [l, r], h: [5.0, 24.8], out: .25, depth: .5, colour: cream595 },
  { name: 'cream arch spandrel', u: [l, r], h: [3.9, 5.0], out: .25, depth: .5, colour: '#e8dcc6' },
  ...[[l, Math.min(r, portal595[0])], [Math.max(l, portal595[1]), r]].filter(([a, b]) => b - a > .1)
    .map(u => ({ name: 'red ground floor of the bay', u, h: [.05, 3.9], out: .25, depth: .5, colour: red595 })),
  { name: 'red cornice', u: [l, r], h: [24.8, 25.9], out: .55, depth: 1.1, colour: redTop595 },
  ...dormers.flatMap(c => [
    { name: 'dormer gable', u: [c - 1.15, c + 1.15], h: [25.9, 26.6], out: .3, depth: .6, colour: redTop595 },
    { name: 'dormer gable', u: [c - .7, c + .7], h: [26.6, 27.2], out: .3, depth: .6, colour: redTop595 },
    { name: 'dormer apex', u: [c - .25, c + .25], h: [27.2, 27.6], out: .3, depth: .6, colour: redTop595 },
    { name: 'cream bay window box', u: [c - 1.0, c + 1.0], h: [22.3, 23.6], out: .8, depth: 1.1, colour: '#e8dcc6' },
    ...[[12.6, 13.7], [15.7, 16.8]].flatMap(h => [
      { name: 'rounded cream balcony', u: [c - 1.15, c + 1.15], h, out: .9, depth: 1.2, colour: '#e8dcc6' },
      { name: 'teal lattice panel', u: [c - .45, c + .45], h: [h[0] + .2, h[1] - .2], out: 1.52, depth: .02, colour: teal595 },
    ]),
  ]),
];
export const wingFongMansions = {
  id: 'wing-fong-mansions', buildingIds: ['764372595'], kind: 'wing-fong-mansions', frontEdge: 75, reviewRoad: 'Lorong 14 Geylang', review: { at: 112, distance: 13, pitch: 24 },
  name: 'Wing Fong Mansions 永豐樓 (June 2024 exterior)', address: '12 Lorong 14 Geylang (south of Talma Road)',
  height: 14.3, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'flat', colour: '#a8583e' },
  evidence: 'June 2024 Street View shows an eight-storey block on the west side of Lorong 14 south of Talma Road, Wing Fong Court\'s twin in cream over a terracotta-red ground floor, behind a garden of trees and a cream boundary wall with salmon-capped posts and grey railings, with a four-storey annex at its south end. Its lane face runs eight projecting bays under red cornices, single and paired gabled dormers alternating over cream bay windows, rounded cream balconies with teal lattice panels on the fifth and sixth floors and cream arches over the red ground floor; between the bays, recessed walls carry Greek-key strips, with small porches of teal lattice under tiled gables at their feet, and a drive-through portal under the sixth bay. At the Talma Road corner the boundary wall carries a granite panel lettered 永豐樓 and Wing Fong Mansions. Google Maps lists Wing Fong Mansions, a condominium complex, at 12 Lor 14 Geylang, Singapore 398924, with its point inside this way, and the source map names it Wing Fong Mansions, No. 12, eight storeys, of 1997; the listing, the source and the lettering agree, so it is named and the panel is redrawn in original type. Wing Fong Court is also listed at No. 12, with its point inside this way, but its lettering stands on No. 10 north of Talma Road. The dormers, followed between June 2024 lane panoramas (odvH... with 15hk... and with 7Umz...), line up on planes 0.4-1.5 m behind the source edge, so the face stands on its source line, its bays about half a metre proud, and is laid at its own scale; floors repeat every 3.0 m, the main wall stands at 24.8 m under a 1.1 m red cornice, the dormer apexes at about 27.5 m and the annex at 14.3 m. The boundary wall, read from the elevation of its foot in three panoramas, stands about 6 m in front of the source edge, and the corner panel triangulates from three panoramas about 5 m north of the block\'s north-east corner. The face runs on about 85 m past the extract\'s last way, where the lane continues to Guillemard Road (open question 52).',
  sources: [way('764372595'), search('Wing Fong Mansions 12 Lorong 14 Geylang'), pano('2NQaljbY-ry-_7uNSyFjJg', 245, 20, 90), pano('15hkcTGDkfNoapXIU24Aiw', 250, 25, 90), pano('C_NxGSjPG6B_eMJvOxuQxw', 255, 20, 90), pano('jrMzKbxEkHu-lNNinj-HiA', 226, 0, 30)],
  colours: { wall: cream595, trim: '#e2d6c0', frame: teal595, glass: '#4a5a5c', pier: red595, back: red595, floor: '#a8a296' },
  windows: [
    // The annex's four floors, then two windows a dormer on every floor of each bay.
    ...rows892.slice(0, 4).flatMap(h => [[1.5, 3.4], [5.2, 7.1]].map(u => ({ u, h, panes: 2 }))),
    ...bays595.flatMap(b => b.dormers.flatMap(c => [...rows892, [23.6, 25.0]].map(h => ({ u: [c - .85, c + .85], h, panes: 2, out: h[0] > 22 ? .62 : .52 })))),
  ],
  blocks: [
    { name: 'red ground floor', u: [0, W595], h: [3.0, 3.9], out: .01, depth: .02, colour: red595 },
    { name: 'red annex cornice', u: [0, 10.2], h: [13.6, 14.3], out: .3, depth: .6, colour: redTop595 },
    ...bays595.flatMap(bay595),
    ...recesses595.flatMap(([l, r]) => {
      const c = (l + r) / 2;
      return [
        ...[[c - .75, c - .35], [c + .35, c + .75]].map(u => ({ name: 'Greek-key strip', u, h: [1.0, 21.5], out: .05, depth: .06, colour: '#8a8070' })),
        { name: 'cream half-round lattice', u: [l + .3, r - .3], h: [22.6, 24.3], out: .3, depth: .6, colour: '#e8dcc6' },
      ];
    }),
    ...porches595.flatMap(c => [
      { name: 'teal lattice porch', u: [c - .7, c + .7], h: [0, 2.9], out: .6, depth: 1.2, colour: teal595 },
      { name: 'porch gable', u: [c - .8, c + .8], h: [2.9, 3.3], out: .6, depth: 1.3, colour: '#b4553d' },
      { name: 'porch gable', u: [c - .4, c + .4], h: [3.3, 3.65], out: .6, depth: 1.3, colour: '#b4553d' },
    ]),
    { name: 'drive-through portal', u: portal595, h: [3.0, 5.6], out: -.1, depth: .06, colour: '#3a3a38' },
    { name: 'portal soffit', u: portal595, h: [5.6, 5.9], out: .05, depth: .1, colour: '#efe7d8' },
    // The boundary wall about 6 m in front: cream, with salmon-capped posts, beige planters and grey railings, and a
    // grey gate across the portal's drive.
    ...[[10.5, portal595[0]], [portal595[1], W595]].flatMap(u => [
      { name: 'boundary wall', u, h: [0, 1.0], out: 6.0, depth: .3, colour: '#f0e8d6' },
      { name: 'beige planter', u, h: [1.0, 1.3], out: 6.0, depth: .45, colour: '#d8c8a8' },
      ...grille('grey railing', u, [1.3, 2.0], 6.0, '#5a5c5c', .3, false),
    ]),
    ...grille('grey gate', portal595, [0, 2.0], 6.0, '#4a4c4c', .3, false),
    ...posts595.flatMap(c => [
      { name: 'boundary post', u: [c - .3, c + .3], h: [0, 2.0], out: 6.0, depth: .55, colour: '#f0e8d6' },
      { name: 'salmon post cap', u: [c - .25, c + .25], h: [2.0, 2.4], out: 6.0, depth: .45, colour: '#d07060' },
    ]),
  ],
  backFittings: [
    ...porches595.map(c => ({ name: 'porch door', u: [c - .5, c + .5], h: [.1, 2.3], colour: '#3a3a36' })),
    { name: 'courtyard beyond the portal', u: portal595, h: [.1, 2.9], colour: '#4a4a46' },
  ],
  // The eight-storey block over the annex's height, from the annex to the north end, to the shallowest of its rear
  // notches.
  upper: [{ name: 'eight-storey block', outline: [[10.5, 0], [W595, 0], [W595, -14.5], [10.5, -14.5]], from: 14.3, to: 24.8, colour: cream595, roof: '#a8583e' }],
  sides: [{
    edge: 73, // the north end on Talma Road, u west from the corner's splay
    windows: rows892.flatMap(h => [[3.0, 5.0], [9.0, 11.0]].map(u => ({ u, h, panes: 2 }))),
    blocks: [
      { name: 'red ground floor', u: [0, 16.488], h: [.13, 3.9], out: .01, depth: .02, colour: red595 },
      { name: 'red cornice', u: [0, 16.488], h: [24.8, 25.9], out: .4, depth: .8, colour: redTop595 },
      { name: 'boundary wall', u: [0, 16.488], h: [0, 1.9], out: 5.0, depth: .3, colour: '#f0e8d6' },
    ],
  }, {
    edge: 74, // the short splay at the Lorong 14 corner, its boundary wall carrying the lettered panel
    blocks: [
      { name: 'red ground floor', u: [0, 4.721], h: [.13, 3.9], out: .01, depth: .02, colour: red595 },
      { name: 'red cornice', u: [0, 4.721], h: [24.8, 25.9], out: .4, depth: .8, colour: redTop595 },
    ],
    // The corner of the boundary wall with its granite panel lettered 永豐樓 Wing Fong Mansions.
    boards: [{ u: [-1.9, 3.1], h: [0, 1.9], out: 5.0 }],
  }],
};

// ---------------------------------------------------------------------------------------------
// East side, north from the edge of the extract

// 3. Way 454274618, No. 37: a mint-green three-storey house set back about 8 m behind No. 35, its second floor a
// glazed box over a balcony slab, behind brick gate pillars and arched railings. Its front (edge 0, u south from the
// north end) is seen square-on only from 7Umz...: rendered from there, the gate pillars' feet and lamps fall on the
// photographed ones with the gate on the source edge, the porch's back wall 2.5 m behind it and the glazed box over
// the gate line. So it stands on its source edge, laid proportionally.
const W618 = 7.530, mint618 = '#bfdcc8';
export const no37 = {
  id: 'l14-37', buildingIds: ['454274618'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 14 Geylang', review: { distance: 9, pitch: 18 },
  name: 'No. 37 Lorong 14 (June 2024 exterior, occupants not identified)', address: '37 Lorong 14 Geylang',
  height: 10.3, ceiling: 3.0, fiveFootWay: 2.5, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a mint-green three-storey house at the south end of the east side within the extract, set back about 8 m behind No. 35: a porch of folding grilles and timber posts on the ground floor, two windows on the first floor under a mint balcony slab, and a second floor glazed from end to end under a zinc eave, behind brick gate pillars with white globe lamps, a low brick wall and beige arched railings. South of it a narrow alley separates it from a corrugated hoarding, beyond the extract, plated 43. No business is listed at the address and no sign was photographed. Its front is seen square-on only from 7Umz..., the lane panoramas further north looking at it past No. 35 and a flowering tree, so its depth was checked by render-and-compare: rendered from 7Umz..., the gate pillars\' feet and lamps fall on the photographed ones with the gate on the source edge, the porch\'s back wall about 2.5 m behind it and the glazed box over the gate line. So it stands on its source edge, laid proportionally. Heights were read on that plane: the porch to about 3.0 m, the balcony slab at 5.8-6.3 m, the glazed box at 6.3-9.8 m and the eave to 10.3 m.',
  sources: [way('454274618'), search('37 Lorong 14 Geylang'), pano('7UmzxcpG70_3sM6VXFAFhw', 62, 10, 70), pano('15hkcTGDkfNoapXIU24Aiw', 40, 10, 70)],
  colours: { wall: mint618, trim: '#d8e8dc', frame: '#2e3a34', glass: '#2a3438', pier: '#b8683a', back: '#9aa89e', floor: '#b07a58' },
  windows: [
    ...[[1.0, 3.2], [4.3, 6.5]].map(u => ({ u, h: [3.9, 5.4], panes: 2 })),
    { u: [.3, 7.2], h: [6.4, 9.7], panes: 6, out: .9 },
  ],
  blocks: [
    { name: 'mint balcony slab', u: [.1, 7.4], h: [5.8, 6.3], out: .6, depth: 1.2, colour: '#d8e8dc' },
    { name: 'glazed box frame', u: [.2, 7.3], h: [6.3, 9.8], out: .45, depth: .9, colour: mint618 },
    { name: 'zinc eave', u: [0, W618], h: [9.8, 10.3], out: .6, depth: 1.2, colour: '#a8aaa6' },
    ...[[0, .6], [6.95, W618]].flatMap(u => [
      { name: 'brick gate pillar', u, h: [0, 1.9], out: .1, depth: .5, colour: '#a85a3a' },
      { name: 'white globe lamp', u: [(u[0] + u[1]) / 2 - .15, (u[0] + u[1]) / 2 + .15], h: [1.9, 2.2], out: .1, depth: .3, colour: '#f4f4ee', glow: .2 },
    ]),
    { name: 'low brick wall', u: [.6, 2.4], h: [0, .9], out: .1, depth: .25, colour: '#a85a3a' },
    ...grille('beige arched railing', [.6, 2.4], [.9, 1.7], .1, '#d8ccb0', .15, false),
    ...grille('beige gate', [2.4, 6.95], [0, 1.7], .1, '#d8ccb0', .2, false),
  ],
  piers: [[3.5, 3.8]],
  backFittings: [{ name: 'folding grilles', u: [.5, 7.0], h: [.1, 2.8], colour: '#6a4a34' }],
};

// 4. Way 454274615, No. 35: a white three-storey house with a car porch under its first floor, gold characters reading
// 慈懷蓮社 between its first-floor windows. Its front (edge 1, u south from the north end) is read on the source plane,
// where the characters line up at u 4.7-5.1 between bPco..., 2NQa... and 6y54... (at 1.5 m forward they drift 1.1 m
// apart). On that plane the façade runs from 0.5 m to the source edge's south end, and is laid at its own scale.
const W615 = 8.223, white615 = '#efefeb';
export const no35 = {
  id: 'l14-35', buildingIds: ['454274615'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 14 Geylang', review: { distance: 9, pitch: 22 },
  name: 'No. 35 Lorong 14 (June 2024 exterior, occupants not identified)', address: '35 Lorong 14 Geylang',
  height: 10.7, ceiling: 3.75, fiveFootWay: 3.0, shellInset: .5, roof: { type: 'flat', colour: '#8f8c86' }, // the porch starts where the façade does
  evidence: 'June 2024 Street View shows a white three-storey house standing forward of its neighbours: a car porch under the first floor behind a white pier, a black arched gate and a letterbox pier plated 35; a band of nine white-framed windows on each of the first and second floors, louvred in one bay, and between the first-floor windows four gold characters reading 慈懷蓮社 down the wall, under a zinc eave. No business is listed at No. 35, and a search for the characters finds no listing, so no name is given and the lettering is drawn blank. On the source plane the characters line up at u 4.7-5.1 between three June 2024 lane panoramas (bPco..., 2NQa..., 6y54...), while at 1.5 m forward they drift 1.1 m apart; so the front stands on its source edge, where it runs from 0.5 m to the edge\'s south end, and is laid at its own scale. Heights were read on that plane: the porch to 3.75 m under a slab to 4.0 m, first-floor windows at 5.1-6.65 m, second-floor windows at 8.3-9.85 m and the eave at 10.7-11.0 m.',
  sources: [way('454274615'), search('35 Lorong 14 Geylang'), pano('2NQaljbY-ry-_7uNSyFjJg', 105, 15, 60), pano('bPcoR5AOs4FXgQbHv6fiew', 120, 12, 50), pano('6y54g-HyIiVDYdF_FQeKBQ', 70, 15, 50)],
  colours: { wall: white615, trim: '#e2e2de', frame: '#e8e8e4', glass: '#2e3436', pier: white615, back: '#8a6a50', floor: '#a8a296' },
  windows: [
    ...[[1.6, 4.5], [5.35, 8.1]].map(u => ({ u, h: [5.1, 6.65], panes: 4 })),
    { u: [1.55, 5.25], h: [8.3, 9.85], panes: 5 }, { u: [5.25, 8.05], h: [8.3, 9.85], panes: 4 },
  ],
  vents: [{ u: [5.4, 6.0], h: [8.45, 9.7] }],
  blocks: [
    { name: 'first-floor slab', u: [.5, W615], h: [3.75, 4.05], out: .1, depth: .2, colour: '#e2e2de' },
    { name: 'blank gold lettering', u: [4.72, 5.1], h: [4.6, 7.2], out: .03, depth: .03, colour: '#c8a050' },
    { name: 'zinc eave', u: [.5, W615], h: [10.7, 11.0], out: .3, depth: .6, colour: '#a8aaa6' },
    { name: 'white pier wall', u: [2.0, 3.5], h: [0, 1.9], out: .1, depth: .3, colour: white615 },
    ...grille('black arched gate', [3.5, 7.6], [0, 2.3], .1, '#2a2a2a', .2, false),
    { name: 'letterbox pier', u: [7.65, W615], h: [0, 1.9], out: .1, depth: .4, colour: white615 },
    { name: 'house plate', u: [7.8, 8.1], h: [1.5, 1.7], out: .32, depth: .02, colour: '#2a2a2a' },
  ],
  piers: [[1.6, 2.0], [7.9, W615]],
  backFittings: [
    { name: 'brown doors', u: [2.8, 4.6], h: [.1, 2.4], colour: '#7a4a30' },
    { name: 'brown door', u: [5.2, 6.2], h: [.1, 2.4], colour: '#7a4a30' },
  ],
};

// 5. Way 454274614, No. 33 (no number in the source): a three-storey house of timber blinds under a red tiled pent roof,
// over a bamboo-screened balcony and a maroon awning, behind brown slatted gates. Its front (edge 0, u south from the
// north end) reads 2.0-2.25 m in front of the source edge, where the depth scores of its upper floors peak (bPco... with
// 2NQa..., 0.33) and the whole house's (three pairs, 0.24-0.33). On a plane 2.25 m forward, read square-on from 2NQa...,
// its party walls stand at u 1.0 and 6.7, against the source's 0 and 6.07; it is laid proportionally on the source
// edge. The gates triangulate from the elevation of their foot about 6 m in front of the source edge.
const W614 = 6.069, at614 = s => lay(1.0, W614 / 5.7)(s).map(v => Math.min(W614, Math.max(0, v)));
const white614 = '#e6e2d8', timber614 = '#b08a5a';
export const no33 = {
  id: 'l14-33', buildingIds: ['454274614'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 16 },
  name: 'No. 33 Lorong 14 (June 2024 exterior, occupants not identified)', address: '33 Lorong 14 Geylang (unnumbered in the source)',
  height: 9.9, ceiling: 3.3, fiveFootWay: .3, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a three-storey house between the brown slatted front of No. 31 and the white front of No. 35: on the second floor two windows between timber blinds under a dark metal canopy; on the first floor two windows between timber blinds and two air-conditioners, under a red tiled pent roof; a balcony screened in bamboo, running on across No. 31, over a maroon awning; and brown slatted gates with a letterbox at the pavement. The source way has no number; Google Maps geocodes 33 Lor 14 Geylang beside it, and no business is listed there or signed, so no name is given. The depth scores of its upper floors peak 2.0-2.25 m in front of the source edge (bPco... with 2NQa..., 0.33), as do the whole house\'s between three pairs of lane panoramas (0.24-0.33). On a plane 2.25 m forward, read square-on from 2NQa..., the party walls stand 1.0 m and 6.7 m along the source edge, against its 0 and 6.07 m; the elevation is laid proportionally on the source edge (open question 53). The gates triangulate, from the elevation of their foot in 2NQa..., about 6 m in front of the source edge. Heights were read on that plane: the awning at 2.1-3.25 m, the bamboo screen at 3.95-4.45 m, first-floor windows at 4.6-6.0 m, the pent roof at 6.1-6.9 m, second-floor windows at 7.0-8.4 m under a canopy to 8.9 m, and the parapet at 9.9 m.',
  sources: [way('454274614'), search('33 Lorong 14 Geylang'), pano('2NQaljbY-ry-_7uNSyFjJg', 80, 15, 60), pano('bPcoR5AOs4FXgQbHv6fiew', 110, 15, 60)],
  colours: { wall: white614, trim: '#d8d2c4', frame: '#3a3a36', glass: '#3a4042', pier: white614, back: '#4a4440', floor: '#a8a296' },
  windows: [
    ...[[2.5, 3.6], [4.4, 5.5]].map(s => ({ u: at614(s), h: [7.0, 8.4], panes: 2 })),
    ...[[2.2, 3.4], [4.0, 5.2]].map(s => ({ u: at614(s), h: [4.6, 6.0], panes: 2 })),
  ],
  blocks: [
    ...[[1.3, 2.4], [3.7, 4.3], [5.6, 6.5]].flatMap(s => [[7.0, 8.4], [4.6, 6.0]].map(h => ({ name: 'timber blind', u: at614(s), h, out: .02, depth: .04, colour: timber614 }))),
    { name: 'dark metal canopy', u: at614([1.0, 6.7]), h: [8.4, 8.9], out: .5, depth: 1.0, colour: '#3a3a3a' },
    { name: 'parapet', u: at614([1.0, 6.7]), h: [9.6, 9.9], out: .05, depth: .1, colour: '#d8d2c4' },
    { name: 'red tiled pent roof', u: at614([1.0, 6.8]), h: [6.1, 6.9], out: .6, depth: 1.2, colour: '#8a3a3a' },
    ...[[4.4, 5.0], [5.2, 5.8]].map(s => ({ name: 'air-conditioner', u: at614(s), h: [4.45, 5.0], out: .25, depth: .5, colour: '#e8e8e4' })),
    { name: 'bamboo balcony screen', u: [0, W614], h: [3.95, 4.45], out: .8, depth: .1, colour: '#b8a888' },
    { name: 'balcony slab', u: [0, W614], h: [3.3, 3.95], out: .4, depth: .8, colour: '#d8d2c4' },
    { name: 'maroon awning', u: [0, W614], h: [2.1, 3.25], out: 1.2, depth: 1.6, colour: '#7a2a30' },
    // The brown slatted gates and the letterbox pier at the pavement, about 6 m in front of the source edge.
    ...grille('brown slatted gate', at614([.6, 6.5]), [0, 1.3], 6.0, '#6a5040', .12, false),
    { name: 'letterbox pier', u: at614([6.5, 7.0]), h: [0, 1.5], out: 6.0, depth: .3, colour: '#d8d2c4' },
  ],
  backFittings: [{ name: 'porch and doors', u: [.4, 5.7], h: [.1, 2.6], colour: '#4a4440' }],
};

// 6. Way 454274611, No. 31, 樂緣: a three-storey house faced in brown horizontal slats above a forecourt canopy whose
// front carries a red board reading HAPPY 31 乐缘. Its front (edge 0, u south from the north end) reads 1.5 m in front of
// the source edge (the slats' north edge and No. 29's windows, three pairs, 0.38-0.47), where it runs from 1.2 m to
// 7.6 m along, against the source's 0 to 6.86; it is laid proportionally. The board lines up between jrMz... and
// bPco... on a plane about 6 m forward, at the canopy's front over the forecourt.
const W611 = 6.861, at611 = s => lay(1.2, W611 / 6.4)(s).map(v => Math.min(W611, Math.max(0, v)));
const slat611 = '#6e5e56';
export const leYuan = {
  id: 'le-yuan', buildingIds: ['454274611'], kind: 'le-yuan', frontEdge: 0, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 16 },
  name: '樂緣 HAPPY 31 (June 2024 exterior)', address: '31 Lorong 14 Geylang (Google Maps gives Lor 14 Geylang, Singapore 398933)',
  height: 10.25, ceiling: 3.6, fiveFootWay: .3, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a three-storey house between No. 29 and No. 33 faced from 4.75 m to its parapet in brown horizontal slats, over a forecourt under a canopy whose front carries a red board reading HAPPY 31 乐缘, with red awnings under it and a glazed shop front behind lettered Happy Men; a red letterbox plated 31 and a welcome board stand on the forecourt. Google Maps lists 樂緣, open until midnight, with no category, at Lor 14 Geylang, Singapore 398933, with its point inside this way. The board carries the same name, in simplified characters, with the house number; the listing gives no house number and its postal code differs from No. 31\'s (398940), so the house is named under open question 12 (a clearly signed occupant may be modelled when published addresses disagree, the conflict recorded), and the board is redrawn in original type. SBL Engineering, also listed at No. 31, is closed. The slats\' north edge and No. 29\'s windows put the front 1.5 m in front of the source edge (three pairs of June 2024 lane panoramas, 0.38-0.47), where it runs from 1.2 m to 7.6 m along the source edge, against 0 to 6.86 m; the elevation is laid proportionally on the source edge (open question 53). The board lines up between jrMz... and bPco... on a plane about 6 m forward, where No. 33\'s gates also triangulate, at the front of the canopy; its height was read on that plane (3.5-4.05 m), the slats\' on the 1.5 m plane (4.75-10.25 m).',
  sources: [way('454274611'), search('樂緣 Lorong 14 Geylang'), search('31 Lorong 14 Geylang'), pano('bPcoR5AOs4FXgQbHv6fiew', 90, 10, 60), pano('jrMzKbxEkHu-lNNinj-HiA', 100, 10, 60), pano('2NQaljbY-ry-_7uNSyFjJg', 60, 10, 60)],
  colours: { wall: slat611, trim: '#d8d4cc', frame: '#3a3a36', glass: '#3a3436', pier: '#d8d4cc', back: '#3a3436', floor: '#c8c0b4' },
  blocks: [
    { name: 'brown slat facing', u: [0, W611], h: [4.75, 10.25], out: .05, depth: .1, colour: slat611 },
    ...Array.from({ length: 22 }, (_, i) => +(4.85 + i * .25).toFixed(2)).map(y => ({ name: 'slat shadow', u: [.05, W611 - .05], h: [y, +(y + .05).toFixed(2)], out: .11, depth: .02, colour: '#4e423c' })),
    { name: 'canopy fascia', u: [0, W611], h: [4.4, 4.75], out: .1, depth: .2, colour: '#c8c4bc' },
    // The forecourt canopy from the wall to its front about 6 m out, with red awnings under the board.
    { name: 'forecourt canopy', u: [0, W611], h: [4.05, 4.2], out: 3.0, depth: 6.0, colour: '#d8d4cc' },
    { name: 'red awnings', u: at611([1.3, 7.5]), h: [2.75, 3.4], out: 5.2, depth: 1.4, colour: '#b8303a' },
    { name: 'canopy post', u: at611([1.25, 1.4]), h: [0, 4.05], out: 5.95, depth: .1, colour: '#e8e8e4' },
    { name: 'red letterbox', u: at611([4.6, 5.0]), h: [.9, 1.4], out: 6.6, depth: .3, colour: '#c8282a' },
    { name: 'letterbox post', u: at611([4.76, 4.84]), h: [0, .9], out: 6.6, depth: .06, colour: '#5a5a58' },
  ],
  // The board across the canopy's front.
  boards: [{ u: at611([1.2, 7.6]), h: [3.5, 4.05], out: 6.05 }],
  backFittings: [
    { name: 'glazed shop front', u: at611([1.6, 7.3]), h: [.1, 3.2], colour: '#3a3436', glow: .1 },
  ],
};

// 7-9. Ways 454274608, 764372579 and 764372578, Nos. 29, 27 and 25: three-storey houses over car porches, read
// together on one plane along No. 25's front (s south from its north end), where the upper floors of all three line up
// 2.5 m behind it (their own fronts' depth scores give 1.5, 1.75-2.0 and 2.5-2.75 m behind, each consistent with that
// plane). On that plane No. 25 runs from s = 0.67 to 5.1, No. 27, with its brown slatted stair tower, to 11.45, and No.
// 29 to 20.6, against the source party walls' 0, 6.12, 12.95 and 19.41; each house is laid proportionally on its own
// source edge. The gates stand at the pavement: No. 27's plate pillar triangulates (Pm_y3... with bPco...) 5.2 m in
// front of No. 25's line, No. 29's 6.3 m in front of its own front, and No. 25's gate, from the elevation of its foot,
// about 3.4 m in front.
const terraceNote = ' Nos. 25, 27 and 29 were read together on one plane along No. 25\'s front: the upper floors of all three line up about 2.5 m behind it, where June 2024 lane panoramas (0W5F..., Pm_y3..., jrMz..., bPco...) agree on their windows; the depth scores of each front give 2.5-2.75 m, 1.75-2.0 m and 1.5 m behind its own source edge, each consistent with that plane, as the source fronts step back southward. On that plane the party walls stand 0.67, 5.1, 11.45 and 20.6 m along No. 25\'s front, against the source\'s 0, 6.12, 12.95 and 19.41 m, so No. 29 photographs about 9.2 m wide on a 6.3 m way; each elevation is laid proportionally on its own source edge (open question 53). The gates stand at the pavement: No. 27\'s plate pillar triangulates (Pm_y3... with bPco...) about 5.2 m in front of No. 25\'s line, No. 29\'s plate pillar (jrMz... with bPco...) about 6.3 m in front of its own source edge, and No. 25\'s gate, from the elevation of its foot in Pm_y3..., about 3.4 m in front of its own.';
const terraceSources = w => [way(w), pano('Pm_y3b0YxCtt8zWXmMbgzQ', 100, 15, 70), pano('jrMzKbxEkHu-lNNinj-HiA', 90, 15, 70), pano('bPcoR5AOs4FXgQbHv6fiew', 60, 15, 70)];
const terraceColours = (wall, frame = '#e8e8e4') => ({ wall, trim: '#dcdad4', frame, glass: '#3a4244', pier: wall, back: '#4a4642', floor: '#a8a296' });
const W578 = 6.045, at25 = s => lay(.67, W578 / 4.43)(s).map(v => Math.min(W578, Math.max(0, v)));
export const no25 = {
  id: 'l14-25', buildingIds: ['764372578'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 16 },
  name: 'No. 25 Lorong 14 (June 2024 exterior, occupants not identified)', address: '25 Lorong 14 Geylang',
  height: 10.05, ceiling: 3.95, fiveFootWay: .3, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a white three-storey house south of the ibis budget hotel: a window on each upper floor at its north end, and at its south end a dark timber-clad panel carrying six air-conditioners, over a porch under a white corrugated canopy with a floodlight; behind the porch a feature wall of red and grey stone, and at the pavement a grey railing gate between white pillars with red tiled caps, one plated 25. No business is listed at No. 25 and no sign was photographed.' + terraceNote,
  sources: [...terraceSources('764372578'), search('25 Lorong 14 Geylang')],
  colours: terraceColours('#ecebe6', '#e0e0dc'),
  windows: [{ u: at25([.9, 2.45]), h: [8.2, 9.55], panes: 2 }, { u: at25([.9, 2.33]), h: [5.17, 6.57], panes: 2 }],
  vents: [[8.95, 9.2], [5.95, 6.2]].map(h => ({ u: at25([2.65, 2.95]), h })),
  blocks: [
    { name: 'dark timber-clad panel', u: at25([3.1, 5.1]), h: [5.3, 9.9], out: .03, depth: .06, colour: '#6a5242' },
    ...[[3.2, 4.05], [4.15, 5.0]].flatMap(s => [[4.85, 5.4], [5.6, 6.15], [6.35, 6.9]].map(h => ({ name: 'air-conditioner', u: at25(s), h, out: .3, depth: .5, colour: '#e8e8e4' }))),
    { name: 'parapet', u: [0, W578], h: [9.8, 10.05], out: .05, depth: .1, colour: '#dcdad4' },
    { name: 'white corrugated canopy', u: at25([.73, 5.1]), h: [3.95, 4.6], out: .75, depth: 1.5, colour: '#e4e2dc' },
    { name: 'floodlight', u: at25([1.6, 1.9]), h: [4.6, 4.9], out: .3, depth: .2, colour: '#2a2a2a' },
    // The gate at the pavement, about 3.4 m out: white pillars with red tiled caps either side of a grey railing.
    ...[[.5, 1.1], [4.6, 5.1]].flatMap(s => [
      { name: 'white gate pillar', u: at25(s), h: [0, 1.95], out: 3.4, depth: .5, colour: '#ecebe6' },
      { name: 'red tiled pillar cap', u: at25(s), h: [1.95, 2.2], out: 3.4, depth: .55, colour: '#c06058' },
    ]),
    ...grille('grey railing gate', at25([1.1, 4.6]), [0, 1.6], 3.4, '#4a4c4c', .15, false),
  ],
  backFittings: [
    { name: 'red and grey stone feature wall', u: at25([1.0, 3.6]), h: [.1, 3.3], colour: '#8a4a48' },
    { name: 'glazed door', u: at25([3.6, 4.9]), h: [.1, 2.6], colour: '#3a4244', glow: .06 },
  ],
};
const W579 = 6.681, at27 = s => lay(5.1, W579 / 6.35)(s).map(v => Math.min(W579, Math.max(0, v)));
export const no27 = {
  id: 'l14-27', buildingIds: ['764372579'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 16 },
  name: 'No. 27 Lorong 14 (June 2024 exterior, occupants not identified)', address: '27 Lorong 14 Geylang',
  height: 9.9, ceiling: 3.4, fiveFootWay: .3, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a white three-storey house with two windows on each upper floor, some of them open casements, and at its south end a stair tower clad in maroon slats rising the full height; over its porch a red tiled arched awning, which runs on across the north part of No. 29, and a dark board; at the pavement a black granite wall with a band of green glass, a black pillar plated 27 and a black railing gate. Google Maps lists RS Cycles, a bicycle shop, at 27 Lor 14 Geylang, with its point inside this way, but no sign for it was photographed, so no name is given.' + terraceNote,
  sources: [...terraceSources('764372579'), search('27 Lorong 14 Geylang'), pano('Pm_y3b0YxCtt8zWXmMbgzQ', 122, 0, 30)],
  colours: terraceColours('#eeede8'),
  windows: [
    ...[[5.2, 7.0], [7.67, 9.27]].map(s => ({ u: at27(s), h: [7.7, 9.1], panes: 3 })),
    ...[[5.4, 6.8], [7.73, 9.33]].map(s => ({ u: at27(s), h: [4.72, 6.06], panes: 3 })),
  ],
  blocks: [
    { name: 'maroon slatted stair tower', u: at27([9.35, 11.45]), h: [4.05, 10.0], out: .2, depth: .4, colour: '#7a3a36' },
    ...Array.from({ length: 23 }, (_, i) => +(4.15 + i * .25).toFixed(2)).map(y => ({ name: 'slat shadow', u: at27([9.4, 11.4]), h: [y, +(y + .05).toFixed(2)], out: .41, depth: .02, colour: '#4e2826' })),
    { name: 'parapet', u: [0, W579], h: [9.65, 9.9], out: .05, depth: .1, colour: '#dcdad4' },
    { name: 'blank dark board', u: at27([9.0, 11.45]), h: [4.17, 4.95], out: .45, depth: .1, colour: '#3a3634' },
    { name: 'white canopy', u: at27([5.1, 5.9]), h: [3.4, 4.05], out: .6, depth: 1.2, colour: '#e4e2dc' },
    { name: 'red tiled arched awning', u: at27([5.9, 11.45]), h: [3.25, 4.3], out: 1.0, depth: 2.0, colour: '#c0624a' },
    // The gate at the pavement, about 5.8 m out: a black granite wall with a band of green glass, the plate pillar and a
    // black railing gate.
    { name: 'black granite wall', u: at27([5.4, 10.0]), h: [0, 2.0], out: 5.8, depth: .3, colour: '#2a2a2c' },
    { name: 'green glass band', u: at27([5.5, 9.9]), h: [.9, 1.85], out: 5.97, depth: .02, colour: '#5a9a88' },
    { name: 'black plate pillar', u: at27([10.0, 10.6]), h: [0, 2.4], out: 5.8, depth: .4, colour: '#1e1e20' },
    { name: 'house plate', u: at27([10.1, 10.5]), h: [1.85, 2.15], out: 6.01, depth: .02, colour: '#e8e8e4' },
    ...grille('black railing gate', at27([10.6, 11.45]), [0, 2.0], 5.8, '#1e1e20', .15, false),
  ],
  backFittings: [{ name: 'porch with racks', u: at27([5.5, 11.0]), h: [.1, 2.8], colour: '#3a3a38', glow: .04 }],
};
const W608 = 6.299, at29 = s => lay(11.45, W608 / 9.15)(s).map(v => Math.min(W608, Math.max(0, v)));
export const no29 = {
  id: 'l14-29', buildingIds: ['454274608'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 16 },
  name: 'No. 29 Lorong 14 (June 2024 exterior, occupants not identified)', address: '29 Lorong 14 Geylang',
  height: 10.0, ceiling: 3.25, fiveFootWay: .3, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'June 2024 Street View shows a broad white three-storey house between No. 27\'s stair tower and No. 31\'s slats, three windows on each upper floor and an air-conditioner, over a porch partly under No. 27\'s red tiled awning and a dark board, partly under a cream corrugated canopy; at the pavement a black railing gate and a white pillar with a lamp, plated 29. No business is listed at No. 29 and no sign was photographed.' + terraceNote,
  sources: [...terraceSources('454274608'), search('29 Lorong 14 Geylang'), pano('bPcoR5AOs4FXgQbHv6fiew', 62, 0, 30)],
  colours: terraceColours('#eeede8'),
  windows: [
    { u: at29([11.6, 13.4]), h: [7.8, 9.15], panes: 3 }, { u: at29([14.5, 16.1]), h: [7.9, 9.2], panes: 2 }, { u: at29([19.1, 20.3]), h: [8.05, 9.4], panes: 2 },
    { u: at29([11.6, 13.45]), h: [5.0, 6.17], panes: 3 }, { u: at29([14.5, 16.1]), h: [5.0, 6.2], panes: 2 }, { u: at29([19.1, 20.3]), h: [5.05, 6.4], panes: 2 },
  ],
  blocks: [
    { name: 'air-conditioner', u: at29([18.8, 19.8]), h: [7.5, 8.17], out: .25, depth: .5, colour: '#e8e8e4' },
    { name: 'parapet', u: [0, W608], h: [9.75, 10.0], out: .05, depth: .1, colour: '#dcdad4' },
    { name: 'blank dark board', u: at29([11.45, 14.7]), h: [4.17, 4.95], out: .45, depth: .1, colour: '#3a3634' },
    { name: 'red tiled arched awning', u: at29([11.45, 15.2]), h: [3.25, 4.3], out: 1.0, depth: 2.0, colour: '#c0624a' },
    { name: 'cream corrugated canopy', u: at29([15.2, 20.1]), h: [3.95, 4.83], out: .75, depth: 1.5, colour: '#e2dccc' },
    // The gate at the pavement, about 6.3 m out: a black railing gate, the white plate pillar with its lamp, and a railing.
    ...grille('black railing gate', at29([11.45, 17.3]), [0, 2.0], 6.3, '#1e1e20', .15, false),
    { name: 'white plate pillar', u: at29([17.3, 17.8]), h: [0, 2.0], out: 6.3, depth: .45, colour: '#ecebe6' },
    { name: 'pillar lamp', u: at29([17.45, 17.65]), h: [2.0, 2.4], out: 6.3, depth: .2, colour: '#f4f0e0', glow: .2 },
    ...grille('black railing', at29([17.8, 20.6]), [.5, 1.5], 6.3, '#1e1e20', .15, false),
    { name: 'low white wall', u: at29([17.8, 20.6]), h: [0, .5], out: 6.3, depth: .25, colour: '#ecebe6' },
  ],
  backFittings: [{ name: 'porch and shop front', u: at29([11.8, 20.2]), h: [.1, 2.9], colour: '#4a4440', glow: .04 }],
};

// 10. Way 454274677, No. 21, ibis budget Singapore Pearl: an eight-storey hotel of cream panels in a grey grid, a pair
// of windows in each panel, over a ground floor of a car porch, the glazed lobby and planters behind wavy railings, with
// a blue ibis budget sign on a plinth lettered PEARL in front. Its front (edge 3, u south from the north end) repeats too
// regularly for the depth scores; the corners, triangulated from three pairs of lane panoramas each, stand 0.5-2 m
// behind the source edge and within about 1 m of its ends, so the face is read on a plane 1 m behind it, where the
// panoramas' views join cleanly, from u 0.2 to 35.8. It is laid at its own scale on the source edge. The sign
// triangulates (0W5F... with Pm_y3..., and iXFF... with Pm_y3...) 2.9 m in front of the source edge, at u 23.3.
const W677 = 35.451, at677 = s => lay(.2, W677 / 35.6)(s).map(v => Math.min(W677, Math.max(0, v)));
const cream677 = '#efe5c0', grey677 = '#7a8284';
const rows677 = Array.from({ length: 7 }, (_, i) => [+(6.2 + i * 3.35).toFixed(2), +(7.6 + i * 3.35).toFixed(2)]);
const piers677 = [.4, 3.6, 6.8, 10.0, 13.2, 16.4, 19.6, 22.8, 26.0, 29.2, 32.4, 35.6];
export const ibisPearl = {
  id: 'ibis-budget-pearl', buildingIds: ['454274677'], kind: 'ibis-pearl', frontEdge: 3, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 30 },
  name: 'ibis budget Singapore Pearl (June 2024 exterior)', address: '21 Lorong 14 Geylang',
  height: 29.6, ceiling: 4.6, fiveFootWay: 2.0, shellInset: .08, roof: { type: 'flat', colour: '#9a9a96' }, // the front is 1-2 degrees off its end walls
  evidence: 'June 2024 Street View shows an eight-storey hotel on the east side of Lorong 14 between Central Imperial and No. 25: seven floors of cream panels in a grey grid of piers and spandrels, a pair of windows in each panel, over a cream ground floor with a car porch at its north end, a glazed lobby with a pier plated 21, and planters of trees behind grey wavy railings; in front of the lobby stands a blue cushion-shaped sign reading ibis budget HOTELS on a cream plinth lettered PEARL in blue. Google Maps lists the hotel at 21 Lor 14 Geylang, Singapore 398961, with its point inside this way, now as ibis budget Singapore Vanda, a 2-star hotel; the source map names it Ibis budget Singapore Pearl, eight storeys. The brand on the photographed sign agrees with the listing at this address, so the hotel is named, as a dated exterior under the name its sign and the source carry in 2024 (open question 54), and the sign is redrawn in original type. The face repeats too regularly for the depth scores (their peaks wander from 1 m behind to 6 m in front); its corners, triangulated from three pairs of June 2024 lane panoramas each, stand 0.5-2 m behind the source edge and within about 1 m of its ends, so it is read on a plane 1 m behind the source edge, where the panoramas\' views join cleanly, from u 0.2 to 35.8, and laid at its own scale on the source edge. The sign triangulates from two pairs 2.9 m in front of the source edge. Heights were read on that plane: the ground floor to 4.6 m under a grey band to 5.4 m, window rows every 3.35 m from 6.2 m, and the parapet at 29.6 m.',
  sources: [way('454274677'), search('ibis budget Singapore Vanda 21 Lorong 14 Geylang'), pano('BMFJQJlmtfdvat-L3dcNig', 100, 20, 90), pano('0W5FoVfgJUTpsOTPyVtxMQ', 70, 20, 90), pano('Pm_y3b0YxCtt8zWXmMbgzQ', 35, 0, 40)],
  colours: { wall: cream677, trim: '#e6dcb8', frame: '#e8e8e4', glass: '#3a4448', pier: cream677, back: '#4a4842', floor: '#a8a49c' },
  windows: piers677.slice(0, -1).flatMap((l, i) => rows677.flatMap(h => [[l + .55, l + 1.4], [l + 1.8, l + 2.65]].map(u => ({ u: at677(u), h, panes: 2 })))),
  blocks: [
    { name: 'grey base band', u: [0, W677], h: [4.6, 5.4], out: .08, depth: .16, colour: grey677 },
    ...rows677.map(([, t]) => ({ name: 'grey spandrel', u: [0, W677], h: [t + .4, t + .95], out: .08, depth: .16, colour: grey677 })),
    ...piers677.map(c => ({ name: 'grey pier', u: at677([c - .25, c + .25]), h: [5.4, 29.6], out: .1, depth: .2, colour: grey677 })),
    { name: 'parapet', u: [0, W677], h: [29.3, 29.6], out: .1, depth: .2, colour: grey677 },
    { name: 'dark fascia', u: at677([.2, 26.0]), h: [4.15, 4.6], out: .05, depth: .1, colour: '#3a3c3c' },
    // Planters of trees behind grey wavy railings along the south part, and the sign on its plinth before the lobby.
    { name: 'cream planter wall', u: at677([25.6, 35.6]), h: [0, .9], out: 1.4, depth: .4, colour: '#ece2bc' },
    ...grille('grey wavy railing', at677([25.6, 35.6]), [.9, 1.8], 1.4, '#6a6e70', .4, false),
    ...[27.0, 29.5, 32.0, 34.5].map(c => ({ name: 'planter tree', u: at677([c - .8, c + .8]), h: [1.2, 3.6], out: 1.0, depth: 1.2, colour: '#4e7a3a' })),
    { name: 'sign plinth', u: [22.0, 24.6], h: [0, .9], out: 2.9, depth: .5, colour: '#ece2bc' },
    { name: 'blue sign body', u: [22.3, 24.3], h: [.9, 3.1], out: 2.75, depth: .25, colour: '#2a6ac8' },
  ],
  // The sign facing the lane, and the plinth's lettering.
  boards: [{ u: [22.3, 24.3], h: [.9, 3.1], out: 2.89 }, { u: [22.4, 24.2], h: [.3, .85], out: 3.16 }],
  piers: [[6.3, 6.7], [13.4, 13.8], [15.7, 16.2]].map(at677),
  backFittings: [
    { name: 'foyer', u: at677([.6, 6.3]), h: [.1, 3.4], colour: '#5a5048', glow: .05 },
    { name: 'car porch', u: at677([6.7, 13.4]), h: [.1, 4.2], colour: '#3a3a38' },
    { name: 'house plate', u: at677([15.8, 16.1]), h: [2.6, 2.9], out: .25, colour: '#3a3a38' },
    { name: 'glazed lobby', u: at677([16.2, 25.6]), h: [.1, 3.6], colour: '#2e3a40', glow: .1 },
  ],
};

// 11. Way 764372577, No. 3, Central Imperial: an eight-storey condominium of wavy glass-railed balconies between curved
// blue fins, over a ground floor of louvred service doors and the car park's gate, behind a fence of white angled
// slabs. Its front (edge 4, u south from the north end) is read on the louvred doors of the ground floor, which line up
// between three June 2024 lane panoramas 0.25-0.5 m in front of the source edge (depth scores 0.18-0.27), so it stands on
// its source line, laid at its own scale; the balconies project up to 1.8 m. The name board on its plinth triangulates
// (xIwN... with l2s1...) 3.65 m in front of the source edge at u 22.3, in line with the fence.
const W577 = 50.414, white577 = '#eef0f0', blue577 = '#4a7ab0';
const floors577 = Array.from({ length: 7 }, (_, i) => +(4.6 + i * 3.15).toFixed(2));
const fins577 = Array.from({ length: 12 }, (_, i) => +(2.5 + i * 4.1).toFixed(2));
// One wavy balcony slab: segments whose depth follows a wave of about 8.2 m, between two fins.
const wave577 = (y, i) => Array.from({ length: 50 }, (_, k) => {
  const l = k * W577 / 50, r = (k + 1) * W577 / 50, out = 1.1 + .7 * Math.sin(((l + r) / 2 / 8.2 + i * .25) * 2 * Math.PI);
  return [
    { name: 'wavy balcony slab', u: [+l.toFixed(3), +r.toFixed(3)], h: [y - .25, y], out: +(out / 2).toFixed(3), depth: +out.toFixed(3), colour: white577 },
    { name: 'glass balcony railing', u: [+l.toFixed(3), +r.toFixed(3)], h: [y, y + 1.05], out: +(out - .05).toFixed(3), depth: .04, colour: '#b4c6cc' },
  ];
}).flat();
export const centralImperial = {
  id: 'central-imperial', buildingIds: ['764372577'], kind: 'central-imperial', frontEdge: 4, reviewRoad: 'Lorong 14 Geylang', review: { distance: 12, pitch: 30 },
  name: 'Central Imperial (June 2024 exterior)', address: '3 Lorong 14 Geylang',
  height: 26.6, ceiling: 4.4, fiveFootWay: .3, roof: { type: 'flat', colour: '#a8aaa8' },
  evidence: 'June 2024 Street View shows an eight-storey condominium on the east side of Lorong 14 between The Amazing Inn and the ibis budget hotel: seven floors of wavy balconies with glass railings in front of full-height glazing, between curved blue fins, under a wavy white roof canopy at its north end; on the ground floor white louvred service doors, letterboxes and the car park\'s gate under a black-and-yellow height bar, behind a fence of white angled slabs and grey railings. In front of the gate a grey name board on a plinth of white slabs reads CENTRAL IMPERIAL under a swoosh, over 3 LORONG 14 GEYLANG. Google Maps lists Central Imperial, a condominium complex, at 3 Lor 14 Geylang, Singapore 398915, with its point inside this way, and the source map names it Central Imperial, No. 3, eight storeys; the listing, the source and the board agree, so it is named and the board is redrawn in original type. The ground floor\'s louvred doors line up between three June 2024 lane panoramas 0.25-0.5 m in front of the source edge (depth scores 0.18-0.27; the balconies\' scores run to the cameras), so the front stands on its source line and is laid at its own scale; the balconies project up to 1.8 m. The name board triangulates from xIwN... and l2s1... 3.65 m in front of the source edge, in line with the fence, its foot 0.55 m up. Heights were read on that plane: the ground floor to 4.4 m, floors every 3.15 m from 4.6 m, and the roof at 26.6 m, its canopy to about 27.6 m.',
  sources: [way('764372577'), search('Central Imperial 3 Lorong 14 Geylang'), pano('xIwNU-5fHvuJFuzG0DzJlQ', 90, 20, 90), pano('l2s1UBsDL_nRFM318o35og', 75, 20, 90), pano('xIwNU-5fHvuJFuzG0DzJlQ', 111, -5, 30)],
  colours: { wall: white577, trim: '#e2e4e4', frame: '#d8dcdc', glass: '#5a7a88', pier: white577, back: '#d8dada', floor: '#a8a8a4' },
  windows: floors577.flatMap(y => fins577.slice(0, -1).map(c => ({ u: [c + .35, c + 3.75], h: [y + .1, y + 2.8], panes: 4 }))),
  blocks: [
    ...floors577.flatMap(wave577),
    ...fins577.map(c => ({ name: 'curved blue fin', u: [c - .25, c + .25], h: [4.4, 26.6], out: .75, depth: 1.5, colour: blue577 })),
    { name: 'wavy roof canopy', u: [0, 17.0], h: [26.6, 27.6], out: .6, depth: 1.2, colour: white577 },
    { name: 'parapet', u: [0, W577], h: [26.3, 26.6], out: .05, depth: .1, colour: '#e2e4e4' },
    { name: 'height bar', u: [18.8, 27.2], h: [3.4, 3.6], out: .1, depth: .1, colour: '#e8c020' },
    // The fence of white angled slabs and grey railings along the pavement, 3.65 m out, broken by the car park's gate.
    ...[[0, 18.8], [27.2, W577]].flatMap(u => [
      ...grille('grey fence railing', u, [0, 1.6], 3.65, '#8a8e90', .15, false),
      ...Array.from({ length: Math.round((u[1] - u[0]) / 2.6) }, (_, k) => u[0] + 1.3 + k * 2.6).filter(c => c < u[1] - .4).map(c => ({ name: 'white angled slab', u: [+(c - .35).toFixed(2), +(c + .35).toFixed(2)], h: [0, 2.3], out: 3.65, depth: .3, colour: '#f2f2f0' })),
    ]),
    ...grille('grey sliding gate', [18.8, 27.2], [0, 1.6], 3.9, '#8a8e90', .15, false),
    { name: 'white slab plinth', u: [20.8, 24.2], h: [0, 2.6], out: 3.45, depth: .3, colour: '#f2f2f0' },
    { name: 'grey name board body', u: [21.1, 23.7], h: [.55, 2.25], out: 3.55, depth: .1, colour: '#9a9c9c' },
  ],
  // The name board facing the lane.
  boards: [{ u: [21.1, 23.7], h: [.55, 2.25], out: 3.62 }],
  backFittings: [
    ...[[3.0, 5.0], [8.0, 10.0], [11.3, 13.3], [14.5, 16.5], [29.0, 31.0], [33.0, 35.0], [40.0, 42.0]].map(u => ({ name: 'white louvred door', u, h: [.1, 3.0], colour: '#e4e6e6' })),
    { name: 'car park', u: [18.8, 27.2], h: [.1, 3.4], colour: '#3a3c3c' },
  ],
};

export const lorong14 = [wingFongCourt, wingFongMansions, no37, no35, no33, leYuan, no29, no27, no25, ibisPearl, centralImperial];
// A review start opposite a point along the front (`review.at`), for a face that runs on past the walkable corridor.
export const lorong14Reviews = (place, frame) => {
  const at = place.review?.at;
  if (at === undefined) return laneReviews(place, frame);
  const p = frame.point(at, place.review.distance ?? 8), t = frame.point(at, 0);
  return [{ id: place.id, p, pitch: place.review.pitch ?? 18, yaw: Math.atan2(p[0] - t[0], p[1] - t[1]) * 180 / Math.PI }];
};
export const lorong14Frame = laneFrame, lorong14Layout = laneLayout, lorong14Upper = laneUpper, lorong14Sides = laneSides;
export { grille, each, clampTo, pano, way, search, lay };
