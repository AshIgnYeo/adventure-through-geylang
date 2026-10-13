// Lorong 21 between Geylang Road and Sims Avenue (open question 47), built one building at a time as Lorong 19 was:
// north up the west side, then south down the east side, then west along Sims Avenue to Lorong 19. Each elevation is
// read on the plane where the panoramas agree, and laid on its source edge, which is kept. Named only where a listing
// and a photographed sign agree. See docs/lorong-21-brief.md.
import { pano, way, search, lay, laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';

/** A breeze-block screen: a shadowed field crossed by light bars, about 0.4 m by 0.33 m a block. */
/** A grille over a dark recess (or open, for a railing or gate): bars about 0.25 m apart with three rails. */
const grille = (name, u, h, out, colour, step = .25, recess = true) => {
  const [l, r] = u, [b, t] = h, n = Math.max(2, Math.round((r - l) / step));
  return [
    ...(recess ? [{ name: `${name} recess`, u, h, out: out - .05, depth: .02, colour: '#34363a' }] : []),
    ...Array.from({ length: n + 1 }, (_, i) => ({ name, u: [+(l + (r - l) * i / n - .02).toFixed(3), +(l + (r - l) * i / n + .02).toFixed(3)].map(v => Math.min(r, Math.max(l, v))), h, out, depth: .04, colour })),
    ...[b, (b + t) / 2, t - .05].map(y => ({ name, u, h: [+y.toFixed(3), +(y + .05).toFixed(3)], out, depth: .04, colour })),
  ];
};
const breeze = (u, h, out = .03, colour = '#d8d6cf') => {
  const [l, r] = u, [b, t] = h, nx = Math.max(1, Math.round((r - l) / .4)), ny = Math.max(1, Math.round((t - b) / .33));
  return [
    { name: 'breeze-block screen', u, h, out: out - .02, depth: .02, colour: '#6d6e6a' },
    ...Array.from({ length: nx + 1 }, (_, i) => ({ name: 'breeze-block web', u: [+(l + (r - l) * i / nx - .04).toFixed(3), +(l + (r - l) * i / nx + .04).toFixed(3)].map(v => Math.min(r, Math.max(l, v))), h, out, depth: .06, colour })),
    ...Array.from({ length: ny + 1 }, (_, j) => ({ name: 'breeze-block web', u, h: [+(b + (t - b) * j / ny - .04).toFixed(3), +(b + (t - b) * j / ny + .04).toFixed(3)].map(v => Math.min(t, Math.max(b, v))), out, depth: .06, colour })),
  ];
};

// ---------------------------------------------------------------------------------------------
// 1. Way 454254167, Nos. 335-351 Geylang Road, the Lorong 21 west corner: Cheng Yi Coffee Shop. One source outline
// over two buildings: a white four-storey walk-up of breeze-block screens and balconies at the corner, with Cheng Yi's
// coffeeshop under maroon awnings, and to its west a five-storey glass block of coloured fins standing forward on
// Geylang Road. The walk-up's lane face (edge 8, u north from the corner) is read where three April 2024 lane
// panoramas agree, 3.25 m behind the source edge, from 2.67 m north of the source corner to its north end; its Geylang
// Road front (edge 9, u east to the corner) 3.0 m behind its source edge, from 4.1 m west of it to the corner; and the
// glass front (edge 11, u east) 3.6 m behind its source edge, from 8.2 m west of the source corner to 21.3 m along.
// Each face is laid proportionally on its source edge. The lane and Geylang Road drives disagree on the heights by
// about 11%; as at No. 323 on Lorong 19, the mean is used (lane readings x0.947, Geylang Road readings x1.059).
const W8 = 21.862, at8 = s => lay(2.67, W8 / 18.63)(s).map(v => Math.min(W8, Math.max(0, v)));
const W9 = 26.343, at9 = s => lay(-4.1, W9 / 27.6)(s).map(v => Math.min(W9, Math.max(0, v)));
const W11 = 26.41, at11 = s => lay(-8.2, W11 / 29.5)(s).map(v => Math.min(W11, Math.max(0, v)));
const white167 = '#e6e4de', grey167 = '#55585a', frame167 = '#2e3133';
const rows167 = [[5.3, 6.69], [8.58, 9.94], [11.93, 13.26]];
// The recessed window panels on each upper floor of the lane face, with a hood over and a ledge under each.
const panels167 = [[5.1, 7.2], [8.36, 10.47], [11.65, 13.92]].flatMap(([b, t]) => [
  { name: 'recessed window panel', u: at8([5.67, 13.9]), h: [b, t], out: .01, depth: .02, colour: '#d6d4cd' },
  { name: 'panel hood', u: at8([5.6, 13.97]), h: [t - .12, t], out: .15, depth: .3, colour: white167 },
  { name: 'panel ledge', u: at8([5.6, 13.97]), h: [b, b + .12], out: .15, depth: .3, colour: white167 },
]);
// The glass block's curtain wall: coloured fins about 0.85 m apart over grey glass, between dark floor lines.
const finColours167 = ['#e8e6df', '#8a8a68', '#b8b2a2', '#6a6656', '#e8e6df', '#9a8e74'];
const fins167 = Array.from({ length: 30 }, (_, i) => {
  const c = .6 + i * .85, w = [.1, .16, .12, .18][i % 4];
  return { name: 'curtain-wall fin', u: [+c.toFixed(2), +(c + w).toFixed(2)], h: [3.76, 18.32], out: .1, depth: .12, colour: finColours167[i % finColours167.length] };
});
export const chengYi = {
  id: 'cheng-yi', buildingIds: ['454254167'], kind: 'cheng-yi', frontEdge: 8, reviewRoad: 'Lorong 21 Geylang', review: { distance: 6, pitch: 24 },
  name: 'Cheng Yi Coffee Shop (April and June 2024 exteriors)', address: '351 Geylang Road (the Lorong 21 west corner), with Nos. 335-349 to its west',
  height: 14.3, ceiling: 3.9, fiveFootWay: 2.2, roof: { type: 'flat', colour: '#8f8c86' },
  evidence: 'April and June 2024 Street View show two buildings on this source outline at the Lorong 21 west corner of Geylang Road. At the corner, a white four-storey walk-up: on Lorong 21, a recessed panel of windows and louvred vents on each upper floor, a breeze-block screen at its north end and a projecting window bay beyond, over a coffeeshop under maroon awnings; on Geylang Road, balconies, grilled windows and breeze-block columns over a single-storey extension of shops under a zinc lean-to, with a white I-TEC SUPERMART board and a red 5G board, and an overhead bridge landing in front of it. At the corner hang six vertical boards (煮炒, 炖汤, 杂菜饭, 田鸡粥, 肉骨茶, 海鲜烧烤 BBQ) over yellow lettering reading CHENG YI COFFEE SHOP. To its west, standing forward on Geylang Road, is a five-storey glass block of grey glass and coloured fins over a five-foot way on white columns. Google Maps lists Cheng Yi Coffee Shop, a seafood restaurant open until 1 am, at 351 Geylang Road, Singapore 389372, with its point in this way, so the block is named after it and its boards are redrawn in original type, the Chinese characters on its name board, which could not be read, left out; no claim is made about the other premises or the glass block. I-Tec Supermart (347) and the Geylang coffee shop (345) are listed as closed, so their boards are blank. The walk-up\'s lane face triangulates 3.25 m behind the source edge (three April 2024 lane panoramas agree) and runs from 2.67 m north of the source corner to the edge\'s north end; its Geylang Road front stands 3.0 m behind its source edge and the glass front 3.6 m behind its own (three June 2024 Geylang Road pairs each), and the glass block\'s west wall meets No. 325-333\'s block about 8.2 m west of this outline. The satellite agrees on the Geylang Road fronts. The strip between the walk-up and the source lines holds the coffeeshop\'s awnings and the single-storey extension. Each face is laid proportionally on its source edge, pending open question 48. The lane and Geylang Road drives disagree on the heights by about 11%, so, as at No. 323 on Lorong 19, the mean is used: the walk-up\'s parapet at 14.3 m and the glass block\'s top at 18.6 m. The walk-up\'s north wall on the side lane was read only obliquely and its fittings are placed by estimate.',
  sources: [way('454254167'), search('Cheng Yi Coffee Shop 351 Geylang Road'), pano('RG105fb5zCOqHMW_Jc3YSQ', 250, 15, 90), pano('BBKtpuwk3f2y1WLGHHECJQ', 230, 15, 90), pano('hWp4rWDnHe0RwOI-Bg_jlw', 215, 15, 90), pano('J9oClFBNKf4zlsawptcpqw', 330, 10, 90), pano('vE6QsnnDx9FCAdmLUlUabg', 352, 15, 100), pano('D065AKncXwLwyIGAKe_whQ', 5, 25, 100)],
  colours: { wall: white167, trim: '#d0cec7', frame: '#3a3c3c', glass: '#4c585c', pier: '#efeee9', back: '#4a4440', floor: '#a8a296' },
  windows: [
    ...rows167.flatMap(h => [{ u: at8([5.9, 7.7]), h, panes: 3 }, { u: at8([11.78, 13.67]), h, panes: 3 }]),
    // The projecting window bay at the north end.
    ...rows167.map(h => ({ u: at8([19.15, 20.85]), h, panes: 3, out: .38 })),
  ],
  vents: [[6.06, 6.53], [9.47, 9.94], [12.88, 13.45]].map(h => ({ u: at8([9.33, 10.44]), h })),
  blocks: [
    ...panels167,
    ...[[3.88, 7.0], [7.39, 10.23], [11.36, 13.64]].flatMap(h => breeze(at8([14.4, 18.8]), h)),
    ...rows167.map(([b, t]) => ({ name: 'projecting window frame', u: at8([19.0, 21.0]), h: [b - .3, t + .3], out: .2, depth: .4, colour: white167 })),
    { name: 'parapet coping', u: [0, W8], h: [14.15, 14.3], out: .08, depth: .16, colour: '#d0cec7' },
    { name: 'maroon awning', u: [.2, 21.6], h: [3.03, 3.85], out: .55, depth: 1.1, colour: '#8a2e32' },
    ...[[9.0, 9.3], [14.0, 14.3]].map(s => ({ name: 'blank red hanging board', u: at8(s), h: [1.9, 2.7], out: .05, depth: .03, colour: '#c8302a' })),
  ],
  piers: [[2.67, 3.1], [4.0, 4.4], [9.1, 9.5], [14.1, 14.5], [18.9, 19.3], [21.0, 21.3]].map(at8),
  backFittings: [
    { name: 'coffeeshop with tables', u: at8([3.1, 14.1]), h: [.1, 3.5], colour: '#5a4a40', glow: .1 },
    { name: 'roller shutter', u: at8([15.9, 18.8]), h: [.1, 3.0], colour: '#a7a9a6' },
    { name: 'dark doorway', u: at8([19.3, 21.0]), h: [.1, 2.6], colour: '#2e2e2c' },
  ],
  // The glass block above the walk-up's parapet, over its part of the outline (outline in this front's frame: the
  // glass front's two ends, then back to the outline's west rear corner's depth).
  upper: [{ name: 'glass block', outline: [[-4.228, -52.764], [-4.289, -26.353], [12.44, -26.347], [12.5, -52.758]], from: 14.3, to: 18.64, colour: grey167, roof: '#8f8f8a' }],
  sides: [{
    edge: 9, // the walk-up's Geylang Road front, u east from the step at the glass block to the corner
    windows: [
      ...[[-4.0, -1.6], [.5, 3.0]].flatMap(s => [
        { u: at9(s), h: [11.4, 13.5], panes: 3 }, { u: at9(s), h: [7.3, 9.53], panes: 3 }, { u: at9(s), h: [4.5, 6.35], panes: 4 },
      ]),
      { u: at9([8.4, 10.4]), h: [12.7, 13.66], panes: 4 },
      ...[[11.38, 13.66], [7.94, 10.48], [4.77, 6.35]].map(h => ({ u: at9([10.4, 12.9]), h, panes: 3 })),
      ...[[12.2, 13.6], [8.74, 9.9], [4.77, 6.88]].map(h => ({ u: at9([15.1, 17.0]), h, panes: 2 })),
      ...[[12.2, 13.6], [8.74, 9.9]].map(h => ({ u: at9([22.0, 23.3]), h, panes: 2 })),
    ],
    blocks: [
      ...[[-4.0, -1.6], [.5, 3.0], [15.1, 17.0], [22.0, 23.5]].flatMap(s => [
        { name: 'balcony railing', u: at9(s), h: [10.7, 11.75], out: .1, depth: .06, colour: '#d8d8d4' },
        { name: 'balcony slab', u: at9(s), h: [10.55, 10.7], out: .35, depth: .7, colour: white167 },
        { name: 'balcony railing', u: at9(s), h: [7.3, 8.05], out: .1, depth: .06, colour: '#d8d8d4' },
      ]),
      ...[[-4.0, -1.6], [.5, 3.0]].map(s => ({ name: 'zinc window awning', u: at9(s), h: [6.5, 6.8], out: .3, depth: .6, colour: '#b9bdb8' })),
      ...breeze(at9([3.1, 4.0]), [4.24, 13.24]),
      ...breeze(at9([13.0, 14.9]), [4.24, 13.24]),
      { name: 'parapet coping', u: [0, W9], h: [14.15, 14.3], out: .08, depth: .16, colour: '#d0cec7' },
      // The single-storey extension of shops under a zinc lean-to, the overhead bridge's landing in front of it.
      { name: 'zinc lean-to', u: at9([-4.1, 13.0]), h: [3.96, 4.24], out: .5, depth: 1.0, colour: '#9a9c98' },
      { name: 'shopfronts', u: at9([-4.1, 13.0]), h: [.1, 1.9], out: .02, depth: .04, colour: '#3a4446', glow: .06 },
      { name: 'blank white I-TEC board', u: at9([-4.1, -2.1]), h: [1.94, 3.97], out: .05, depth: .04, colour: '#f2f2ee' },
      { name: 'blank red board', u: at9([-2.1, 5.0]), h: [1.9, 3.7], out: .05, depth: .04, colour: '#b8243a' },
      { name: 'blank supermarket board', u: at9([8.0, 13.0]), h: [1.69, 2.12], out: .05, depth: .04, colour: '#e8e2cc' },
      { name: 'coffeeshop', u: at9([14.0, 23.5]), h: [.1, 1.9], out: .02, depth: .04, colour: '#5a4a40', glow: .1 },
      { name: 'maroon awning', u: at9([14.0, 23.5]), h: [1.9, 2.75], out: .9, depth: 1.8, colour: '#8a2e32' },
      { name: 'blank green stall banner', u: at9([19.6, 21.6]), h: [2.85, 3.5], out: .1, depth: .03, colour: '#2e8a4a' },
    ],
    // Cheng Yi's name board, and its six vertical boards along the corner.
    boards: [
      { u: at9([20.0, 23.2]), h: [3.81, 4.13], out: .12 },
      ...Array.from({ length: 6 }, (_, i) => ({ u: [+(21.8 + i * .79).toFixed(2), +(22.35 + i * .79).toFixed(2)], h: [4.24, 5.61], out: .15 })),
    ],
  }, {
    edge: 11, // the glass block's Geylang Road front, u east
    blocks: [
      { name: 'grey glass', u: [0, W11], h: [3.76, 18.32], out: .02, depth: .04, colour: '#7d8a8c' },
      ...fins167,
      ...[6.88, 10.48, 14.19].map(h => ({ name: 'dark floor line', u: [0, W11], h: [h - .06, h + .06], out: .17, depth: .16, colour: frame167 })),
      { name: 'dark top frame', u: [0, W11], h: [18.32, 18.64], out: .14, depth: .28, colour: frame167 },
      ...[[0, .25], [W11 - .25, W11]].map(u => ({ name: 'dark side frame', u, h: [2.54, 18.64], out: .14, depth: .28, colour: frame167 })),
      { name: 'dark fascia', u: [0, W11], h: [2.54, 3.76], out: .2, depth: .4, colour: frame167 },
      { name: 'glazed shopfronts', u: [.3, W11 - .3], h: [.1, 2.5], out: .02, depth: .04, colour: '#3a4446', glow: .06 },
      ...[[.4, .8], [4.5, 4.9], [9.5, 9.9], [14.7, 15.1], [19.0, 19.4]].map(s => ({ name: 'white column', u: at11(s), h: [.1, 2.54], out: .2, depth: .35, colour: '#efeee9' })),
    ],
  }, {
    edge: 10, // the step between the glass front and the walk-up's: the glass block's dark east wall
    blocks: [{ name: 'dark cladding', u: [0, 4.339], h: [3.9, 14.3], out: .02, depth: .02, colour: grey167 }],
  }, {
    edge: 0, // the glass block's west wall, seen past No. 325-333's block
    blocks: [{ name: 'dark cladding', u: [0, 16.727], h: [.13, 14.3], out: .02, depth: .02, colour: grey167 }],
  }, {
    edge: 7, // the walk-up's north wall on the side lane, u west from the lane corner, its fittings placed by estimate
    windows: rows167.map(h => ({ u: [2.6, 6.4], h, panes: 4, out: .32 })),
    blocks: [
      ...breeze([.4, 2.2], [3.88, 13.64]),
      { name: 'projecting glazed bay', u: [2.4, 6.6], h: [4.9, 13.7], out: .15, depth: .3, colour: white167 },
      { name: 'zinc awning', u: [2.4, 6.8], h: [6.85, 7.1], out: .5, depth: 1.0, colour: '#b9bdb8' },
      { name: 'zinc lean-to', u: [0, 7.5], h: [2.6, 3.0], out: .6, depth: 1.2, colour: '#9a9c98' },
      { name: 'blank yellow stall canopy', u: [.5, 6.5], h: [2.25, 2.6], out: .3, depth: .6, colour: '#e8b830' },
      { name: 'drinks stall', u: [.3, 7.0], h: [.1, 2.2], out: .02, depth: .04, colour: '#6a5a48', glow: .1 },
    ],
  }],
};

// ---------------------------------------------------------------------------------------------
// 2-3. Ways 1223524387 and 1223524388, Nos. 5 and 7: a weathered cream three-storey walk-up pair under a hipped roof
// with deep eaves, sharing a stair lit by a breeze-block screen, set back behind a boundary wall. The front was read on
// one plane along No. 7's front (s north from the party wall, d towards the lane): the stair screen, followed between
// three April 2024 panoramas, stands 0.2 m behind the source line, where the pair runs from s = -8.2 to 8.3 with the
// party line at the screen's centre (0.4), against the source ways' -6.74 to 6.72. Each house is laid proportionally on
// its own source edge (u north from its south end). The boundary wall triangulates 7.1 m in front.
const pairNote = ' Nos. 5 and 7 are one walk-up pair, read together on one plane along No. 7\'s front: three April 2024 lane panoramas (-BDV5..., 8yiH..., O-hH...) agree on the stair screen 0.2 m behind the source line, where the pair runs about 16.5 m, from 8.2 m south of the party wall to 8.3 m north of it, against the 13.5 m of the two source ways, with the party line at the screen\'s centre. Each house is laid proportionally on its own source edge. The boundary wall, followed between two panoramas by its letterbox panel, stands about 7.1 m in front of the houses. Heights were read on the façade\'s plane: eaves at 9.5-10.0 m and the hipped roof to about 10.9 m.';
const cream5 = '#e4dcc4', W5 = 6.736, W7 = 6.718;
const at5 = s => lay(-8.2, W5 / 8.6)(s).map(v => Math.min(W5, Math.max(0, v))), at7 = s => lay(.4, W7 / 7.9)(s).map(v => Math.min(W7, Math.max(0, v)));
const pairCommon5 = {
  kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 21 Geylang', review: { distance: 10, pitch: 22 },
  height: 9.6, ceiling: 2.5, fiveFootWay: .3, roof: { type: 'hip', ridge: 10.9, colour: '#6e6b66' },
  colours: { wall: cream5, trim: '#d6cdb2', frame: '#3a3836', glass: '#46504e', pier: cream5, back: '#5a5650', floor: '#a8a296' },
};
const eaves5 = w => ({ name: 'deep eaves', u: [0, w], h: [9.5, 9.95], out: .5, depth: 1.0, colour: '#5e5b56' });
const brownBreeze5 = at => [...breeze(at([-.81, 1.63]), [5.4, 9.4], .05, '#b8864e'), ...breeze(at([-.81, 1.63]), [2.9, 4.75], .05, '#e2e0d8')];
export const no5 = {
  ...pairCommon5, id: 'l21-5', buildingIds: ['1223524387'],
  name: 'No. 5 Lorong 21 (April 2024 exterior, occupants not identified)', address: '5 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows the south half of a weathered cream three-storey walk-up pair north of the side lane by the Geylang Road corner block, behind a grey boundary wall with letterboxes reading 5, 5A and 5B: a window and a balcony with a railing on the top floor, a window and a balcony enclosed in a brick-red grille on the first, grilled windows and a door under a zinc awning on the ground floor, and the shared stair lit by a brown breeze-block screen over a white one. No sign was photographed. Google Maps gives a geocoded address for 5 Lor 21 Geylang and lists New Century Realty & Trading Co there, but its point lies in the corner block and no sign for it was photographed, so no name is given.' + pairNote,
  sources: [way('1223524387'), search('5 Lorong 21 Geylang'), pano('8yiH4E0hcM3Bdr1egBGv2Q', 270, 15, 80), pano('-BDV5dezAGqUQQ_NAmVgew', 265, 15, 80)],
  windows: [
    { u: at5([-7.6, -5.4]), h: [7.25, 8.8], panes: 2 }, { u: at5([-4.0, -1.65]), h: [7.25, 8.8], panes: 3 },
    { u: at5([-7.6, -5.4]), h: [4.0, 5.7], panes: 2 }, { u: at5([-5.0, -1.3]), h: [3.6, 5.8], panes: 3 },
    { u: at5([-7.75, -5.7]), h: [.85, 1.9], panes: 3 }, { u: at5([-4.3, -1.3]), h: [.5, 2.1], panes: 3 },
  ],
  blocks: [
    eaves5(W5),
    ...grille('balcony railing', at5([-5.25, -1.03]), [7.1, 7.9], .9, '#3a3836', .15, false),
    { name: 'balcony slab', u: at5([-5.25, -1.03]), h: [6.6, 7.1], out: .5, depth: 1.0, colour: '#d6cdb2' },
    ...grille('brick-red balcony grille', at5([-5.25, -1.03]), [3.2, 6.0], .9, '#9a4a3a'),
    { name: 'floor ledge', u: [0, W5], h: [6.5, 6.6], out: .15, depth: .3, colour: '#d6cdb2' },
    ...brownBreeze5(at5),
    { name: 'zinc awning', u: at5([-8.0, 0]), h: [2.5, 2.9], out: .6, depth: 1.2, colour: '#9a9c98' },
    // The grey boundary wall along the pavement, with the pair's letterboxes and a black gate.
    ...[[0, at5([-3.6, -3.6])[0]], [at5([-2.0, -2.0])[0], W5]].map(u => ({ name: 'boundary wall', u, h: [0, 1.9], out: 7.1, depth: .2, colour: '#b8b5ad' })),
    ...grille('black gate', at5([-3.6, -2.0]), [0, 1.9], 7.1, '#2a2a2a', .15, false),
    { name: 'letterboxes', u: at5([-.6, .3]), h: [.6, 1.5], out: 7.22, depth: .04, colour: '#e8e6e0' },
  ],
};
export const no7 = {
  ...pairCommon5, id: 'l21-7', buildingIds: ['1223524388'],
  name: 'No. 7 Lorong 21 (April 2024 exterior, occupants not identified)', address: '7 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows the north half of the walk-up pair behind the same boundary wall, its car gate plated 7 in red: a balcony with a railing and a window on the top floor, and a balcony enclosed in a white grille on the first; a white festival tent stands over its forecourt, and is not modelled. No sign was photographed. Google Maps lists MP Express Services and the closed Di Zhong Hai Buffet Steamboat at 7 Lor 21 Geylang, but their points lie in the corner block and no sign for either was photographed, so no name is given.' + pairNote,
  sources: [way('1223524388'), search('7 Lorong 21 Geylang'), pano('8yiH4E0hcM3Bdr1egBGv2Q', 270, 15, 80), pano('O-hHiRaRl86cXbRRvIT4bg', 245, 15, 80)],
  windows: [
    { u: at7([2.2, 5.9]), h: [7.25, 8.65], panes: 4 }, { u: at7([6.22, 8.19]), h: [7.25, 8.8], panes: 2 },
    { u: at7([2.2, 7.4]), h: [4.1, 6.0], panes: 4 },
  ],
  blocks: [
    eaves5(W7),
    ...grille('balcony railing', at7([1.78, 6.16]), [7.1, 7.9], .9, '#3a3836', .15, false),
    { name: 'balcony slab', u: at7([1.78, 6.16]), h: [6.6, 7.1], out: .5, depth: 1.0, colour: '#d6cdb2' },
    ...grille('white balcony grille', at7([1.9, 7.6]), [3.9, 6.3], .9, '#e8e8e4'),
    { name: 'floor ledge', u: [0, W7], h: [6.5, 6.6], out: .15, depth: .3, colour: '#d6cdb2' },
    ...brownBreeze5(at7),
    { name: 'boundary wall', u: [0, at7([4.6, 4.6])[0]], h: [0, 1.9], out: 7.1, depth: .2, colour: '#b8b5ad' },
    ...grille('black car gate', at7([4.6, 8.3]), [0, 1.9], 7.1, '#2a2a2a', .15, false),
  ],
  backFittings: [{ name: 'grilled ground floor', u: at7([1.0, 8.0]), h: [.1, 2.3], colour: '#4a4a46' }],
};

// ---------------------------------------------------------------------------------------------
// 4-8. Ways 1223524384, 1223524383, 1223524382, 1223524385 and 1223524386, Nos. 9, 11, 15, 17 and 19: a two-storey
// terrace over five-foot ways, cream at both ends and grey between. Read on one plane along No. 9's front (s north from
// its south corner): the lane panoramas' depth scores peak 3.5-4 m forward on the festival tents, but No. 9's gold
// emblem, followed between four panoramas, and the strongest pair (OXhE..., m4CG...) put the upper façade about 1.5 m
// in front of the source line. On that plane the party walls stand at s = 0, 7.0, 13.4, 19.7, 26.0 and 32.2, against
// the source's 0, 6.41, 12.82, 19.22, 25.62 and 32.02; each house is laid proportionally on its own source edge.
const rowNote9 = ' The five houses from No. 9 to No. 19 were read together on one plane along No. 9\'s front: the April 2024 lane panoramas\' depth scores peak 3.5-4 m in front of the source line, on the festival tents, but No. 9\'s gold emblem, followed between four panoramas (8yiH..., O-hH..., OXhE..., m4CG...), and the strongest pair put the upper façades about 1.5 m in front of it. On that plane the party walls stand 0, 7.0, 13.4, 19.7, 26.0 and 32.2 m along, within 0.6 m of the source ones, and each elevation is laid proportionally on its own source edge. Heights were read on that plane: the first-floor ledge at 3.1-3.4 m, windows at about 4.5-6.1 m under louvred vents, and parapets at 7.8-8.0 m.';
const walls9 = [0, 7.0, 13.4, 19.7, 26.0, 32.2], widths9 = [6.412, 6.403, 6.401, 6.398, 6.4];
const onHouse9 = i => { const k = widths9[i] / (walls9[i + 1] - walls9[i]); return s => s.map(v => Math.min(widths9[i], Math.max(0, +((v - walls9[i]) * k).toFixed(3)))); };
const row9 = (i, colour) => ({
  frontEdge: 0, reviewRoad: 'Lorong 21 Geylang', review: { distance: 7, pitch: 16 },
  height: 7.8, ceiling: 3.1, fiveFootWay: 1.6, roof: { type: 'flat', colour: '#8f8c86' },
  colours: { wall: colour, trim: '#d6d2c6', frame: '#3a3c3c', glass: '#4a5658', pier: colour, back: '#4a4642', floor: '#a8a296' },
  piers: [[0, .35], [widths9[i] - .35, widths9[i]]],
});
// The grey houses' three windows under louvred vents, a dark parapet band and the ledge over the five-foot way.
const grey9 = (i, spans) => {
  const at = onHouse9(i), W = widths9[i];
  return {
    windows: spans.map(s => ({ u: at(s), h: [4.5, 6.1], panes: 2, surround: true })),
    vents: spans.map(s => ({ u: at(s), h: [6.2, 6.6] })),
    blocks: [
      { name: 'dark parapet band', u: [0, W], h: [7.0, 7.75], out: .06, depth: .12, colour: '#5e5f5c' },
      { name: 'first-floor ledge', u: [0, W], h: [3.1, 3.4], out: .15, depth: .3, colour: '#8e8c84' },
    ],
  };
};
const grey9Colour = '#9c9a92';
const grey9Sources = (w, h) => [way(w), search(`${h} Lorong 21 Geylang`), pano('OXhE51eBCy3ZbCoxdt3SnA', 262, 15, 80), pano('m4CGRqdMRofN0Fz0583zBw', 262, 15, 80)];
export const nyingmaKathok = {
  ...row9(0, '#efe9d8'), id: 'nyingma-kathok', buildingIds: ['1223524384'], kind: 'nyingma-kathok',
  name: 'Nyingma Kathok Buddhist Centre (April 2024 exterior)', address: '9 Lorong 21 Geylang', height: 8.0,
  evidence: 'April 2024 Street View shows a cream two-storey house at the south end of the terrace, three windows in raised surrounds on its upper floor under a deep cornice, a cream vertical board on its south pilaster reading 宁玛噶陀 NYINGMA KATHOK under an emblem, and a gold dharma wheel between two gold deer on the ledge over its five-foot way; below, a wooden door and a glazed front under a Tibetan valance, with a framed board reading 宁玛噶陀佛学会 NYINGMA KATHOK BUDDHIST CENTRE under a line of Tibetan script. Google Maps lists Nyingma Kathok Buddhist Centre, a Buddhist temple, at 9 Lor 21 Geylang, Singapore 388456; its point lies in the walk-up pair next door, but the address and the signs agree on this house, so it is named (as at Crystal Mansions, open question 32), and its boards are redrawn in original type, the Tibetan script drawn as a plain gold band. L E Fashion, also listed at No. 9, is closed.' + rowNote9,
  sources: [way('1223524384'), search('Nyingma Kathok Buddhist Centre 9 Lorong 21 Geylang'), pano('O-hHiRaRl86cXbRRvIT4bg', 255, 15, 80), pano('OXhE51eBCy3ZbCoxdt3SnA', 228, 15, 60)],
  windows: [[1.3, 2.6], [3.2, 4.6], [5.1, 6.6]].map(s => ({ u: onHouse9(0)(s), h: [4.6, 6.15], panes: 2, surround: true })),
  blocks: [
    { name: 'deep cornice', u: [0, 6.412], h: [7.3, 7.6], out: .35, depth: .7, colour: '#e6dfcc' },
    { name: 'first-floor ledge', u: [0, 6.412], h: [3.1, 3.4], out: .2, depth: .4, colour: '#e6dfcc' },
    { name: 'gold dharma wheel', u: onHouse9(0)([3.25, 3.75]), h: [3.4, 4.25], out: .3, depth: .1, colour: '#d4a838', glow: .15 },
    ...[[2.6, 3.1], [3.9, 4.4]].map(s => ({ name: 'gold deer', u: onHouse9(0)(s), h: [3.4, 3.85], out: .3, depth: .1, colour: '#d4a838', glow: .15 })),
    { name: 'Tibetan valance', u: onHouse9(0)([2.3, 6.6]), h: [2.1, 2.45], out: .05, depth: .04, colour: '#b8302a' },
    { name: 'drainpipe', u: onHouse9(0)([6.65, 6.85]), h: [.1, 7.8], out: .1, depth: .1, colour: '#e8e6e0' },
  ],
  // The vertical board on the south pilaster, and the framed board over the door.
  boards: [{ u: onHouse9(0)([.1, .75]), h: [3.7, 7.2], out: .12 }, { u: onHouse9(0)([3.5, 5.9]), h: [2.55, 3.0], out: -1.55 }],
  backFittings: [
    { name: 'wooden door', u: onHouse9(0)([.9, 1.9]), h: [.1, 2.5], colour: '#a8683a' },
    { name: 'glazed front', u: onHouse9(0)([2.3, 6.6]), h: [.1, 2.1], colour: '#3e4a4c', glow: .08 },
  ],
};
export const no11 = {
  ...row9(1, grey9Colour), ...grey9(1, [[7.7, 8.96], [9.64, 10.94], [11.6, 12.86]]), id: 'l21-11', buildingIds: ['1223524383'], kind: 'unnamed', unnamed: true,
  name: 'No. 11 Lorong 21 (April 2024 exterior, occupants not identified)', address: '11 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows a weathered grey two-storey house north of the Nyingma Kathok Buddhist Centre, three windows under louvred vents on its upper floor and a dark parapet band, over an open five-foot way stacked with goods. Google Maps lists Leong Yew Textiles at 11 Lor 21 Geylang, but its point lies in the corner block and no sign for it was photographed, so no name is given.' + rowNote9,
  sources: grey9Sources('1223524383', 11),
  backFittings: [{ name: 'open shop with goods', u: [.5, 6.0], h: [.1, 2.6], colour: '#5a5650', glow: .05 }, { name: 'air-conditioner', u: onHouse9(1)([8.0, 8.6]), h: [3.6, 4.1], out: 1.6, colour: '#e8e8e4' }],
};
export const no15 = {
  ...row9(2, grey9Colour), ...grey9(2, [[14.0, 15.34], [15.96, 17.24], [17.96, 19.24]]), id: 'l21-15', buildingIds: ['1223524382'], kind: 'unnamed', unnamed: true,
  name: 'No. 15 Lorong 21 (April 2024 exterior, occupants not identified)', address: '15 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows the second grey two-storey house of the terrace, like No. 11, its five-foot way hidden behind a yellow tarpaulin and a red-and-white festival tent that run on past Nos. 17 and 19 and are not modelled. No business is listed at the address and no sign was photographed.' + rowNote9,
  sources: grey9Sources('1223524382', 15),
  backFittings: [{ name: 'roller shutter', u: [.5, 5.9], h: [.1, 2.7], colour: '#9a9c98' }],
};
export const no17 = {
  ...row9(3, grey9Colour), ...grey9(3, [[20.3, 21.6], [22.25, 23.55], [24.2, 25.5]]), id: 'l21-17', buildingIds: ['1223524385'], kind: 'unnamed', unnamed: true,
  name: 'No. 17 Lorong 21 (April 2024 exterior, occupants not identified)', address: '17 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows the third grey two-storey house of the terrace, a grilled window and a grilled gate in its five-foot way, hung with red festival banners behind the tent, which are not modelled. No business is listed at the address and no sign was photographed.' + rowNote9,
  sources: grey9Sources('1223524385', 17),
  backFittings: [
    { name: 'grilled window', u: [.7, 2.6], h: [.8, 2.3], colour: '#4a5450' },
    { name: 'grilled gate', u: [3.0, 5.6], h: [.1, 2.4], colour: '#6a7470' },
  ],
};
export const beiChenGong = {
  ...row9(4, '#ece4cc'), id: 'bei-chen-gong', buildingIds: ['1223524386'], kind: 'bei-chen-gong', height: 8.0,
  name: 'Bei Chen Gong Association (April 2024 exterior)', address: '19 Lorong 21 Geylang',
  evidence: 'April 2024 Street View shows a cream two-storey house at the north end of the terrace, three windows under louvred vents on its upper floor, its blank north wall on the open car park beyond; its five-foot way is a temple front, a doorway under a red banner reading 玄天上帝, hung with lanterns lettered 北辰宫, during a festival whose tent, altar and flags stand in the lane and are not modelled. Google Maps lists Bei Chen Gong Association, a religious destination, at 19 Lor 21 Geylang, Singapore 388462, with its point inside this way, so it is named after its lanterns, and the banner and a lantern are redrawn in original type.' + rowNote9,
  sources: [way('1223524386'), search('Bei Chen Gong Association 19 Lorong 21 Geylang'), pano('m4CGRqdMRofN0Fz0583zBw', 312, 5, 40), pano('pgGtqEQ_mct-AU8DVUWYMA', 263, 10, 80), pano('TpCeu2XK3GzOs0Ju4fwGbA', 210, 10, 60)],
  windows: [[26.6, 27.9], [28.5, 29.8], [30.5, 31.76]].map(s => ({ u: onHouse9(4)(s), h: [4.6, 6.1], panes: 2, surround: true })),
  vents: [[26.6, 27.9], [28.5, 29.8], [30.5, 31.76]].map(s => ({ u: onHouse9(4)(s), h: [6.25, 6.6] })),
  blocks: [
    { name: 'cornice', u: [0, 6.4], h: [7.4, 7.6], out: .2, depth: .4, colour: '#e2d9bf' },
    { name: 'first-floor ledge', u: [0, 6.4], h: [3.1, 3.4], out: .15, depth: .3, colour: '#e2d9bf' },
  ],
  // The red banner over the doorway, and a lantern lettered with the temple's name.
  boards: [{ u: onHouse9(4)([27.0, 31.4]), h: [2.65, 3.0], out: -1.55 }, { u: onHouse9(4)([27.2, 27.75]), h: [2.0, 2.6], out: .3 }],
  backFittings: [
    { name: 'grilled window', u: onHouse9(4)([26.3, 27.4]), h: [.8, 2.3], colour: '#4a5450' },
    { name: 'temple doorway', u: onHouse9(4)([28.0, 30.2]), h: [.1, 2.6], colour: '#5a2a24', glow: .12 },
  ],
};

// ---------------------------------------------------------------------------------------------
// 9. Way 454254329, 29 Lorong Bachok, the Lorong Bachok corner: Tan Ser Seng Herbal Soup 陳生成, a grey stuccoed
// two-storey corner shophouse with a splayed corner under a curved parapet cap, its long side on Lorong 21 (edge 3, u
// north from the Bachok corner). Its two grilled windows near the north end, which disagree by 4-5 m between three April
// 2024 lane panoramas on the source plane, agree within 0.5 m on a plane 3.25 m in front of it, as do the depth scores
// (3.0-3.5 m). On that plane the face runs from the splay, 1.3 m from the Bachok corner, to the back lane, 26.1 m
// along; it is laid proportionally on the 26.5 m source edge.
const W329 = 26.495, at329 = s => lay(1.3, W329 / 24.8)(s).map(v => Math.min(W329, Math.max(0, v)));
const grey329 = '#a8a49a', wins329 = [[4.8, 5.9], [7.6, 8.7], [10.5, 11.6], [12.5, 13.7], [15.4, 16.6], [17.9, 19.0], [20.9, 22.05], [23.4, 24.6]];
export const tanSerSeng = {
  id: 'tan-ser-seng', buildingIds: ['454254329'], kind: 'tan-ser-seng', frontEdge: 3, reviewRoad: 'Lorong 21 Geylang', review: { distance: 8, pitch: 16 },
  name: 'Tan Ser Seng Herbal Soup (April 2024 exterior)', address: '29 Lorong Bachok (the Lorong Bachok corner of Lorong 21)',
  height: 8.5, ceiling: 3.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 10.2, colour: '#b4553d' },
  evidence: 'April 2024 Street View shows a grey stuccoed two-storey corner shophouse at Lorong 21 and Lorong Bachok, with a splayed corner under a curved parapet cap carrying a red-framed board reading 陳生成 TAN SER SENG HERBAL SOUP SINCE 1946; along Lorong 21, eight windows under louvred vents, two of them grilled, below a red moulding and a plain parapet, over an open coffeeshop under red-and-green striped awnings on square columns, closed at the north end by a white wall and a door on the back lane. Google Maps lists Tan Ser Seng Herbal Soup 陳生成山瑞补品, a soup shop, at 29 Lor Bachok, with its point in the house next door to the west, and a herbal soup store at the same address with its point inside this way; the address and the board agree on this house, so it is named and its board is redrawn in original type. Three April 2024 lane panoramas agree on the Lorong 21 face 3.25 m in front of the source edge, where it runs from the splay, 1.3 m from the Bachok corner, to the back lane, 26.1 m along, against the 26.5 m source edge; it is laid proportionally on that edge. Heights were read on that plane: awnings at 2.6-3.75 m, windows at 4.6-5.9 m under vents at 6.0-6.5 m, the red moulding at 7.6-7.8 m and the parapet at 8.5 m, the corner cap to about 9.2 m.',
  sources: [way('454254329'), search('Tan Ser Seng Herbal Soup 29 Lorong Bachok'), pano('ASmmf_U74831L5MzgK5kkw', 285, 15, 80), pano('02JzN2zcLThkH0ZkrerNlw', 260, 15, 80), pano('CWWn89B8KiWH0q7GYJwcSQ', 245, 15, 80), pano('JdEaA4aRTSoZtkCgy0gPBw', 300, 10, 80)],
  colours: { wall: grey329, trim: '#b8b4aa', frame: '#3a3c3c', glass: '#4a5658', pier: '#b0aca2', back: '#e8e6e0', floor: '#a8a296' },
  windows: wins329.map((s, i) => ({ u: at329(s), h: [4.6, 5.9], panes: i >= 6 ? 4 : 2 })),
  vents: wins329.map(s => ({ u: at329(s), h: [6.0, 6.5] })),
  blocks: [
    { name: 'red moulding', u: [0, W329], h: [7.6, 7.8], out: .1, depth: .2, colour: '#a8433a' },
    { name: 'parapet coping', u: [0, W329], h: [8.35, 8.5], out: .1, depth: .2, colour: '#b8b4aa' },
    { name: 'curved parapet cap', u: at329([1.3, 3.9]), h: [8.5, 9.2], out: .05, depth: .3, colour: grey329 },
    { name: 'first-floor slab', u: [0, W329], h: [3.75, 3.95], out: .15, depth: .3, colour: '#b8b4aa' },
    ...Array.from({ length: 13 }, (_, i) => ({ name: 'striped awning', u: [+(i * W329 / 13).toFixed(3), +((i + 1) * W329 / 13).toFixed(3)], h: [2.6, 3.75], out: .6, depth: 1.2, colour: i % 2 ? '#2e7a5a' : '#c8505a' })),
  ],
  // The corner board on the splay.
  boards: [{ u: at329([1.6, 3.8]), h: [5.5, 7.75], out: .12 }],
  piers: [[1.3, 2.1], [3.6, 4.6], [9.4, 10.25], [14.25, 15.1], [19.4, 20.25], [25.4, 26.1]].map(at329),
  backFittings: [
    { name: 'coffeeshop with tables', u: at329([2.1, 24.0]), h: [.1, 3.0], colour: '#e6e2d8', glow: .06 },
    { name: 'back wall and door', u: at329([24.0, 25.4]), h: [.1, 2.2], colour: '#6a6a66' },
  ],
  sides: [{
    edge: 0, // the Lorong Bachok front, u west from the corner
    windows: [{ u: [1.8, 3.0], h: [4.6, 5.9], panes: 2 }],
    vents: [{ u: [1.8, 3.0], h: [6.0, 6.5] }],
    blocks: [
      { name: 'red moulding', u: [0, 5.83], h: [7.6, 7.8], out: .1, depth: .2, colour: '#a8433a' },
      { name: 'striped awning', u: [0, 5.83], h: [2.6, 3.75], out: .3, depth: .6, colour: '#2e7a5a' },
      { name: 'coffeeshop', u: [.4, 5.5], h: [.1, 2.6], out: .02, depth: .04, colour: '#e6e2d8', glow: .06 },
    ],
  }],
};

export const lorong21 = [chengYi, no5, no7, nyingmaKathok, no11, no15, no17, beiChenGong, tanSerSeng];
export const lorong21Frame = laneFrame, lorong21Layout = laneLayout, lorong21Upper = laneUpper, lorong21Reviews = laneReviews, lorong21Sides = laneSides;
