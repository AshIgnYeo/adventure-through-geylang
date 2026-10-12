// Lorong 17 between Geylang Road and Sims Avenue (open question 35), built one building at a time: north up the
// west side, then south down the east side. Each elevation is read on the plane where two panoramas agree, then
// laid proportionally on its source edge, which is kept. Named only where a listing and a photographed sign agree.
// See docs/lorong-17-brief.md.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const search = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q).replaceAll('%20', '+')}`;

/** A photographed span [a, b] in metres, laid proportionally on a source edge: u = (s - s0) * k. */
const lay = (s0, k) => ([a, b]) => [+((a - s0) * k).toFixed(2), +((b - s0) * k).toFixed(2)];

// ---------------------------------------------------------------------------------------------
// 2. Way 454254236, north of the corner block: a white two-storey building of two bays. Its front (edge 1) runs
// north from the back lane. Two June 2024 panoramas agree on the front 1.5 m in front of the source edge, from
// 1.56 m south of the source corner to 11.35 m north of it: 12.5 m, laid on the 9.04 m source edge.
const W236 = 9.041, at236 = lay(-1.56, W236 / 12.52);
export const fengShang = {
  id: 'feng-shang', buildingIds: ['454254236'], kind: 'feng-shang', frontEdge: 1, reviewRoad: 'Lorong 17 Geylang', review: { distance: 6, pitch: 16 },
  name: 'Feng Shang Hair Salon (June 2024 exterior)', address: '5 Lorong 17 Geylang (as listed; Google\'s address point for No. 7 also falls in this way)',
  height: 8.0, ceiling: 3.25, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 10.2, ridgeDepth: .4, colour: '#8e8b85' },
  evidence: 'June 2024 Street View shows a white two-storey building of two bays north of the back lane behind No. 301 Geylang Road, under a thin cantilevered roof slab: four windows under louvred vents upstairs, and a five-foot way below. The south bay is a hair salon, with a black board reading 峰尚造型 HAIR SALON on the front and another on the back-lane gable, a fascia reading 峰尚造型 Feng Shang Hair Salon over a glazed front, a blue side door and two barber poles. The north bay has a narrow dark door with door-god posters under a black board reading 聖靈花炶聯誼会, and a glass office lettered Dr Handy behind a folding gate; neither is listed, so both stay blank. Google Maps lists Feng Shang Hair Salon, a hair salon operating in October 2026, at 5 Lorong 17 Geylang (floor 1), with its point 1.3 m in front of the source front, inside the photographed front, which stands 1.5 m forward; so the boards and fascia name the salon and are redrawn in original type, with no claim about the north bay or the upper floor. Google\'s address point for 7 Lorong 17 Geylang also falls in this way and no door number is visible, so the conflict is recorded (open question 12 allows a clearly signed occupant). Two June 2024 panoramas triangulate the four windows and the north party line on a plane 1.4-1.7 m in front of the source edge: the building photographs about 12.5 m wide against the 9.04 m source edge and reaches the south wall of way 454254237, so its elevation is laid proportionally on the source edge (open question 36). Heights were read on that plane, above the five-foot-way floor.',
  sources: [way('454254236'), search('Feng Shang Hair Salon 5 Lorong 17 Geylang'), pano('h2GMbpqMlF5I3mVPjbwO9w', 262, 10, 100), pano('qC7tdabb-uutEWXfday1Jw', 220, 10, 100), pano('4m2rqWXQ6KXQMoq91snllg', 330, 15, 100)],
  colours: { wall: '#ecebe5', trim: '#e2e0d9', frame: '#2b2f31', glass: '#3d4549', pier: '#ecebe5', back: '#d9d7d0', floor: '#a19b90' },
  bands: [[4.64, 4.8, .15]],
  windows: [[-.29, 1.18], [2.67, 4.18], [5.62, 7.1], [8.49, 9.9]].map(s => ({ u: at236(s), h: [4.91, 6.13], panes: 2 })),
  vents: [[-.29, 1.18], [2.67, 4.18], [5.62, 7.1], [8.49, 9.9]].map(s => ({ u: at236(s), h: [6.36, 6.73] })),
  blocks: [{ name: 'cantilevered roof slab', u: [0, W236], h: [7.8, 8.6], out: .3, depth: .7, colour: '#e4e2dc' }],
  // The salon's board on the front, and its fascia over the shopfront on the back wall.
  boards: [{ u: at236([-.6, 3.0]), h: [3.25, 4.29], out: .08 }, { u: at236([.67, 4.67]), h: [2.78, 3.13], out: -1.92 }],
  piers: [at236([-1.56, -.78]), at236([4.9, 5.33]), at236([10.3, 10.96])],
  backFittings: [
    { name: 'salon glazing', u: at236([.67, 3.9]), h: [.1, 2.75], colour: '#3a4448', glow: .14 },
    { name: 'LED barber pole', u: at236([.3, .5]), h: [1.2, 2.8], out: .05, depth: .1, colour: '#3050c0', glow: .3 },
    { name: 'blue side door', u: at236([4.16, 4.6]), h: [.1, 2.0], colour: '#24508f' },
    { name: 'striped barber pole', u: at236([4.62, 4.8]), h: [1.0, 2.9], out: .05, depth: .1, colour: '#c9b25a' },
    { name: 'dark door with door-god posters', u: at236([5.4, 6.2]), h: [.1, 2.3], colour: '#2a2a2a' },
    { name: 'blank association board', u: at236([5.4, 6.2]), h: [2.4, 2.9], out: .03, colour: '#1d1d1d' },
    { name: 'glass office behind a folding gate', u: at236([6.4, 10.2]), h: [.1, 2.75], colour: '#8f9b9a' },
    { name: 'dark lintel', u: at236([5.4, 10.2]), h: [2.95, 3.2], colour: '#2c2c2c' },
  ],
  sides: [{
    edge: 2, // the back-lane gable, u east to the front corner
    windows: [{ u: [9.6, 10.5], h: [5.0, 6.0], panes: 1 }, { u: [12.3, 13.3], h: [5.0, 6.2], panes: 2 }],
    vents: [{ u: [9.6, 10.5], h: [6.1, 6.5] }, { u: [12.3, 13.3], h: [6.3, 6.7] }],
    blocks: [{ name: 'air conditioner', u: [7.4, 8.2], h: [3.3, 3.9], out: .25, depth: .5, colour: '#e6e6e2' }],
    boards: [{ u: [11.9, 14.6], h: [3.4, 4.45], out: .08 }],
  }],
};

// ---------------------------------------------------------------------------------------------
// 3. Way 454254237: a row of four white two-storey shophouses, Nos. 9-15 (door plates 13 and a letterbox 11),
// under one pitched roof. Its front (edge 0) runs north from way 236. Two pairs of June 2024 panoramas agree on
// the four party lines: the front lies on the source edge at its south end and about 1.2 m behind it at the north
// end, 26.6 m long against the 26.16 m source edge. Read on that line, s from its south end; laid proportionally.
const W237 = 26.157, at237 = lay(0, W237 / 26.62);
const windows237 = [[.6, 2.4], [3.67, 5.56], [7.1, 8.96], [10.1, 12.0], [13.6, 15.44], [16.6, 18.5], [20.07, 21.93], [23.3, 25.2]];
export const row237 = {
  id: 'l17-9-15', buildingIds: ['454254237'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 6, pitch: 16 },
  name: 'Row of four shophouses, Nos. 9-15 Lorong 17 (June 2024 exterior, occupants not identified)', address: '9-15 Lorong 17 Geylang (west side)',
  height: 7.0, ceiling: 2.8, fiveFootWay: 1.8, roof: { type: 'gable', ridge: 9.4, ridgeDepth: .45, overhang: .5, colour: '#70746f' },
  evidence: 'June 2024 Street View shows a row of four white two-storey shophouses under one pitched roof with a front gutter, each with two windows under louvred vents upstairs and a five-foot way. From the south: a shrine hall with a white signboard carrying two dragon reliefs, a round emblem and red lettering reading 友誼聯誼會 over a 齊天大聖 altar and stone lions; a plain bay (letterbox 11) with a small altar, a window, a grilled door and a roller shutter; the Char Yang (Dabu) Lee Chee Association bay (door plates 13), with a blue board reading 茶陽(大埔)勵志社 CHAR YANG (DABU) LEE CHEE ASSOCIATION; and a bay with the blue band carried on, two air-conditioners on brackets and a 福家 gate. Google Maps lists the Char Yang (Dabu) Lee Chee Association at 13 Lorong 17 Geylang but marks it permanently closed, and 友誼聯誼會 is not listed, so no name is given and every board is blank. Two pairs of June 2024 panoramas triangulate the four party lines: the front stands on the source edge at its south end and about 1.2 m behind it at its north end, 26.6 m long against the 26.16 m source edge, with bays of about 6.35, 6.6, 6.6 and 7.0 m. Positions and heights were read on that line and are laid proportionally on the source edge.',
  sources: [way('454254237'), search('Char Yang (Dabu) Lee Chee Association 13 Lorong 17 Geylang'), pano('qC7tdabb-uutEWXfday1Jw', 245, 10, 110), pano('M_9st2eoKa2qvAZ10P9vRQ', 262, 10, 110), pano('GX6RAPRapiD3eAKqXG_3uA', 225, 10, 110)],
  colours: { wall: '#eeede7', trim: '#e4e2db', frame: '#2c3032', glass: '#3d4549', pier: '#eeede7', back: '#dcdad3', floor: '#a19b90' },
  bands: [[4.5, 4.62, .15]],
  windows: windows237.map(s => ({ u: at237(s), h: [4.6, 5.92], panes: 2 })),
  vents: windows237.map(s => ({ u: at237(s), h: [5.95, 6.25] })),
  blocks: [
    { name: 'roof gutter', u: [0, W237], h: [6.95, 7.2], out: .45, depth: .2, colour: '#5d625f' },
    ...[[6.12, 6.28], [19.3, 19.45]].map(s => ({ name: 'downpipe', u: at237(s), h: [0, 7.0], out: .08, depth: .1, colour: '#d6d6d0' })),
    { name: 'white signboard panel', u: at237([.1, 6.05]), h: [2.8, 4.45], out: .06, depth: .06, colour: '#f2f0ea' },
    ...[[.67, 2.6], [3.5, 5.44]].map(s => ({ name: 'blank dragon relief', u: at237(s), h: [3.55, 4.35], out: .11, depth: .05, colour: '#cdd9cf' })),
    { name: 'blank round emblem', u: at237([2.9, 3.4]), h: [3.75, 4.25], out: .11, depth: .04, colour: '#c9a24a' },
    { name: 'blank lettered board', u: at237([.1, 6.05]), h: [2.85, 3.4], out: .1, depth: .03, colour: '#f6f3ec' },
    { name: 'blank blue association board', u: at237([13.1, 19.07]), h: [3.1, 4.75], out: .08, depth: .06, colour: '#5d7fb0' },
    { name: 'blue painted band', u: at237([19.55, 26.2]), h: [3.2, 4.8], out: .005, depth: .02, colour: '#5d7fb0' },
    ...[[14.7, 15.6], [20.6, 21.9], [24.4, 25.7]].map((s, i) => ({ name: 'air conditioner', u: at237(s), h: i ? [4.2, 4.95] : [5.0, 5.55], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  piers: [at237([0, .25]), at237([6.1, 6.45]), at237([12.8, 13.2]), at237([19.2, 19.6]), [at237([26.0, 26.62])[0], W237]],
  backFittings: [
    { name: 'shrine hall', u: at237([.9, 6.0]), h: [.1, 2.7], colour: '#6b2a22', glow: .15 },
    { name: 'altar', u: at237([7.0, 8.6]), h: [.1, 2.5], colour: '#7a2e24', glow: .1 },
    { name: 'window', u: at237([9.4, 10.4]), h: [1.4, 2.3], colour: '#3d4549' },
    { name: 'grilled door', u: at237([10.9, 11.4]), h: [.1, 2.2], colour: '#d6d6d0' },
    { name: 'roller shutter', u: at237([11.5, 12.6]), h: [.1, 2.5], colour: '#b8bab6' },
    { name: 'white door', u: at237([13.67, 15.0]), h: [.1, 2.3], colour: '#e6e4dd' },
    { name: 'white door', u: at237([15.9, 17.4]), h: [.1, 2.3], colour: '#e6e4dd' },
    { name: 'dark door', u: at237([17.7, 18.8]), h: [.1, 2.3], colour: '#3a3a3a' },
    { name: 'blue grilled gate', u: at237([19.9, 20.9]), h: [.1, 2.3], colour: '#5a7f95' },
    { name: 'white door', u: at237([21.5, 22.6]), h: [.1, 2.2], colour: '#e6e4dd' },
    { name: 'window', u: at237([23.4, 24.3]), h: [1.0, 2.0], colour: '#3d4549' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 4. Way 454254272, No. 17, across a side passage from No. 15: the General Board of True Jesus Mission, a white
// three-storey building. Its front (edge 0) runs north from the passage. Two pairs of June 2024 panoramas put its
// ends 5.9 m apart, about 1.6 m south of the source corners and 1-2 m in front of the source edge; read on a plane
// 1.5 m forward, s from its south corner, and laid on the 5.70 m source edge.
const W272 = 5.698, at272 = lay(-1.56, W272 / 5.89);
export const trueJesus = {
  id: 'true-jesus-mission', buildingIds: ['454254272'], kind: 'true-jesus-mission', frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 22 },
  name: 'General Board of True Jesus Mission (June 2024 exterior)', address: '17 Lorong 17 Geylang',
  height: 10.9, ceiling: 3.6, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a7a6a0' },
  evidence: 'June 2024 Street View shows a white three-storey building across a bollarded side passage from No. 15, door plate 17: a ground floor behind a five-foot way with a board reading 眞耶穌教會總會 GENERAL BOARD OF TRUE JESUS MISSION over a grilled wooden door and a stair; a first floor with two windows under louvred vents, air-conditioners below them and a vertical blade sign at the south corner reading 眞耶穌教會總會 General Board of True Jesus Mission; and a second floor whose balcony parapet repeats the lettering (會總會教穌耶真, read right to left) under two windows and vents, inside a projecting roof frame. Google Maps lists General Board of True Jesus Mission (TJM), a Christian church, at 17 Lorong 17 Geylang, Singapore 388547, with its point inside this way, so the boards, parapet and blade are redrawn in original type. Two pairs of June 2024 panoramas triangulate its two ends 5.9 m apart, about 1.6 m south of the source corners and 1-2 m in front of the source edge; heights were read on a plane 1.5 m forward and the elevation is laid on the 5.70 m source edge, which is kept.',
  sources: [way('454254272'), search('General Board of True Jesus Mission 17 Lorong 17 Geylang'), pano('qKWw6QiwVVcNE7eOEzxMSA', 250, 22, 105), pano('GX6RAPRapiD3eAKqXG_3uA', 280, 22, 100), pano('zA0hxiYKqVOIl4BIukFCWw', 215, 15, 100)],
  colours: { wall: '#f1f1ee', trim: '#e7e7e3', frame: '#2c3134', glass: '#3b4448', pier: '#f1f1ee', back: '#e2e1dc', floor: '#a19b90' },
  bands: [[3.73, 4.0, .3]],
  windows: [...[[-.89, 1.04], [1.71, 3.62]].map(s => ({ u: at272(s), h: [4.56, 5.73], panes: 3 })), ...[[-.89, 1.04], [1.71, 3.62]].map(s => ({ u: at272(s), h: [8.1, 8.95], panes: 3 }))],
  vents: [[-.89, 1.04], [1.71, 3.62]].flatMap(s => [{ u: at272(s), h: [5.89, 6.29] }, { u: at272(s), h: [9.07, 9.56] }]),
  blocks: [
    { name: 'projecting roof frame', u: [0, W272], h: [10.5, 10.9], out: .25, depth: .5, colour: '#f1f1ee' },
    ...[[0, .25], [W272 - .25, W272]].map(u => ({ name: 'roof frame side', u, h: [7.0, 10.9], out: .25, depth: .5, colour: '#f1f1ee' })),
    { name: 'balcony slab', u: [.25, W272 - .25], h: [7.0, 7.15], out: .2, depth: .4, colour: '#e7e7e3' },
    ...[[-.82, .11], [2.73, 3.67]].map(s => ({ name: 'air conditioner', u: at272(s), h: [4.0, 4.56], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  // The balcony parapet's lettering, and the board on the back wall of the five-foot way; the blade at the south corner.
  boards: [{ u: at272([-1.04, 3.84]), h: [7.38, 8.44], out: .42 }, { u: at272([-.67, 2.67]), h: [2.22, 2.89], out: -1.92 }],
  blades: [{ u: .15, out: [.15, .75], h: [4.0, 7.1] }],
  piers: [[0, .35], [W272 - .3, W272]],
  backFittings: [
    { name: 'grilled wooden door', u: at272([-.38, .96]), h: [.1, 1.95], colour: '#5b3a2a' },
    { name: 'notice board', u: at272([2.2, 2.8]), h: [1.5, 2.1], colour: '#d9d4c4' },
    { name: 'stair', u: at272([2.9, 3.67]), h: [.1, 2.9], colour: '#c9b79a' },
  ],
  sides: [{
    edge: 1, // the side passage, u east to the front corner
    windows: [[6.6, 7.2], [8.2, 8.8]].flatMap(u => [{ u, h: [4.7, 5.6], panes: 1 }, { u, h: [8.2, 9.0], panes: 1 }]).concat([{ u: [8.2, 8.8], h: [1.2, 2.2], panes: 1 }]),
  }],
};

// ---------------------------------------------------------------------------------------------
// 5. Way 454254273, No. 19: a weathered cream three-storey house between dark-stained party pilasters, with the
// Yang Clan General Association's board on its balcony. Its front (edge 0) runs north from No. 17. Four June 2024
// panoramas triangulate the pilasters 2.0-2.3 m in front of the source edge; on a plane 2.2 m forward the front
// runs from 0.95 m south of the source corner, 5.55 m to the middle of the north pilaster, laid on 5.69 m.
const W273 = 5.69, at273 = lay(-.95, W273 / 5.55), pairs273 = [[-.76, .7], [1.36, 3.5]];
export const yangClan = {
  id: 'yang-clan', buildingIds: ['454254273'], kind: 'yang-clan', frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'Yang Clan General Association (June 2024 exterior)', address: '19A Lorong 17 Geylang (the upper floors of No. 19)',
  height: 10.0, ceiling: 3.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8a82' },
  evidence: 'June 2024 Street View shows a weathered cream three-storey house north of No. 17, between dark-stained party pilasters: two windows under louvred vents on each upper floor, air-conditioners on the ledges, a red board with a round emblem reading 楊氏總會 YANG CLAN GENERAL ASSOCIATION under the second-floor balcony, a white lightbox hanging from an open top-floor window, and a dark roof frame; below, a five-foot way with a grilled gate, a small window and an open altar front. Google Maps lists Yang Clan General Assn at 19A Lorong 17 Geylang, Singapore 388549, the upper floors of the house after No. 17; its point lies about 1 m south of this way, in No. 17\'s, as the row\'s 2 m registration error would place it. Address and board agree, so the upper floors are named after the board, which is redrawn in original type (the Bamboo Lounge precedent, open question 33), with no claim about the ground floor. Its black ground-floor board, reading 昆仲联… KUNTIONG A…, belongs to the Kun Tiong Association, listed at 19 Lorong 17 #01-19 but marked permanently closed, so it is blank. Four June 2024 panoramas triangulate the two party pilasters 2.0-2.3 m in front of the source edge; read on a plane 2.2 m forward, the front measures 5.55 m to the middle of the wide north pilaster and is laid on the 5.69 m source edge.',
  sources: [way('454254273'), search('Yang Clan General Association 19A Lorong 17 Geylang'), pano('qKWw6QiwVVcNE7eOEzxMSA', 250, 22, 100), pano('zA0hxiYKqVOIl4BIukFCWw', 230, 20, 100), pano('GX6RAPRapiD3eAKqXG_3uA', 290, 20, 90), pano('FeWy4yNg9qEGZG5jKgP5XA', 200, 18, 100)],
  colours: { wall: '#e3dccb', trim: '#d8d0bd', frame: '#3a3a36', glass: '#454b4c', pier: '#e3dccb', back: '#e6e1d4', floor: '#9d978c' },
  bands: [[3.3, 3.7, .35]],
  windows: pairs273.flatMap(s => [{ u: at273(s), h: [4.34, 5.4], panes: 2 }, { u: at273(s), h: [7.3, 8.34], panes: 2 }]),
  vents: pairs273.flatMap(s => [{ u: at273(s), h: [5.6, 5.9] }, { u: at273(s), h: [8.36, 8.8] }]),
  blocks: [
    { name: 'dark roof frame', u: [0, W273], h: [9.76, 10.04], out: .2, depth: .4, colour: '#6b6157' },
    { name: 'balcony ledge', u: [0, W273], h: [6.8, 7.0], out: .3, depth: .6, colour: '#d8d0bd' },
    { name: 'stained party pilaster', u: [0, .15], h: [3.0, 10.0], out: .04, depth: .08, colour: '#4a3f38' },
    { name: 'stained party pilaster', u: at273([4.05, 4.6]), h: [0, 10.0], out: .05, depth: .1, colour: '#4a3f38' },
    ...[[-.7, .2], [2.4, 3.6]].map(s => ({ name: 'air conditioner', u: at273(s), h: [3.8, 4.5], out: .3, depth: .5, colour: '#e8e8e4' })),
    { name: 'air conditioner', u: at273([.3, 1.1]), h: [6.98, 7.4], out: .25, depth: .45, colour: '#e8e8e4' },
    { name: 'blank lightbox', u: at273([1.3, 2.3]), h: [7.3, 8.6], out: .3, depth: .15, colour: '#f1f1f1' },
  ],
  boards: [{ u: at273([-.7, 3.4]), h: [6.0, 6.6], out: .06 }],
  piers: [[0, .3], at273([3.9, 4.6])],
  backFittings: [
    { name: 'grilled gate', u: [.35, .6], h: [.1, 2.2], colour: '#8c8f8c' },
    { name: 'small window', u: at273([.6, 1.16]), h: [1.6, 2.1], colour: '#3a3a3a' },
    { name: 'open altar front', u: at273([2.1, 3.7]), h: [.1, 2.6], colour: '#6b2a22', glow: .1 },
    { name: 'red valance', u: at273([-.8, 1.5]), h: [2.5, 2.9], out: .04, colour: '#c8241c' },
    { name: 'blank Kun Tiong board', u: at273([-.8, 1.5]), h: [2.05, 2.5], out: .04, colour: '#1c1a19' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 6. Way 454254274, No. 21: a three-storey house with a peach first floor in a brownish-pink frame and a cream
// balcony storey above. Its front (edge 0) runs north from No. 19. On the row's plane 2.2 m forward, three June 2024
// panoramas agree on the front from 0.8 m south of the source corner, 5.4 m long; laid on the 5.70 m source edge.
const W274 = 5.701, at274 = lay(-.8, W274 / 5.4), pairs274 = [[-.45, 1.3], [2.05, 3.9]];
export const no21 = {
  id: 'l17-21', buildingIds: ['454254274'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 21 Lorong 17 (June 2024 exterior, occupant not identified)', address: '21 Lorong 17 Geylang',
  height: 10.5, ceiling: 3.1, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8a82' },
  evidence: 'June 2024 Street View shows a three-storey house north of No. 19: a first floor panelled in peach inside a brownish-pink frame, with two windows under a lattice band; a cream balcony storey above with two windows under louvred vents and air-conditioners on the balcony; and a roof slab at about 10.5 m. The ground floor is a glazed temple front under a dark maroon scalloped awning hung with paper charms, with lotus lamps and a red banner inside. Google Maps lists Bai Yun Kong Shang Fo Tang (百雲宮善佛堂), a Buddhist temple on floor 1, at 21 Lorong 17 Geylang, Singapore 388550, but no sign bearing its name could be read from the street, so no name is given. On the row\'s plane 2.2 m in front of the source edge, three June 2024 panoramas agree on the front from 0.8 m south of the source corner, 5.4 m long; it is laid on the 5.70 m source edge.',
  sources: [way('454254274'), search('Bai Yun Kong Shang Fo Tang 21 Lorong 17 Geylang'), pano('zA0hxiYKqVOIl4BIukFCWw', 252, 18, 100), pano('FeWy4yNg9qEGZG5jKgP5XA', 210, 18, 100), pano('qKWw6QiwVVcNE7eOEzxMSA', 235, 18, 100)],
  colours: { wall: '#e8e1d0', trim: '#ddd5c2', frame: '#3a3a36', glass: '#454b4c', pier: '#e8e1d0', back: '#d9d2c2', floor: '#9d978c' },
  windows: pairs274.flatMap(s => [{ u: at274(s), h: [4.5, 5.6], panes: 2, out: .03 }, { u: at274(s), h: [7.95, 8.6], panes: 2 }]),
  vents: pairs274.map(s => ({ u: at274(s), h: [8.8, 9.2] })),
  blocks: [
    { name: 'roof slab', u: [0, W274], h: [10.0, 10.5], out: .2, depth: .4, colour: '#cfc7b6' },
    { name: 'peach first-floor panel', u: [.1, W274 - .1], h: [3.4, 6.75], out: .01, depth: .02, colour: '#e8c4a8' },
    ...[[0, .25], [W274 - .25, W274]].map(u => ({ name: 'brownish-pink frame', u, h: [3.4, 6.75], out: .04, depth: .08, colour: '#b67a5c' })),
    { name: 'brownish-pink frame', u: [0, W274], h: [6.6, 6.75], out: .04, depth: .08, colour: '#b67a5c' },
    { name: 'lattice band', u: at274([-.4, 4.0]), h: [5.75, 6.5], out: .02, depth: .03, colour: '#e3c8b0' },
    { name: 'balcony parapet', u: [0, W274], h: [6.75, 7.1], out: .25, depth: .5, colour: '#ddd5c2' },
    { name: 'air conditioner', u: at274([-.25, 1.95]), h: [7.05, 7.6], out: .25, depth: .45, colour: '#e8e8e4' },
    { name: 'maroon scalloped awning', u: [0, W274], h: [3.1, 3.5], out: .5, depth: 1.0, colour: '#5a2a2c' },
  ],
  piers: [[0, .3], [W274 - .3, W274]],
  backFittings: [
    { name: 'glazed temple front', u: at274([.4, 4.1]), h: [.1, 2.7], colour: '#4a2a26', glow: .15 },
    { name: 'blank red banner', u: at274([.6, 3.9]), h: [2.1, 2.5], out: .04, colour: '#a8281e' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 7. Ways 454254270 and 454254271, Nos. 23 and 25 (letterbox 23, door plate 25): one white three-storey building
// of two bays with corrugated metal hoods over every window. On the row's plane 2.2 m forward, three June 2024
// panoramas agree on it from 1.0 m south to 11.1 m north of No. 21's source corner, filling the 3 m gap the map
// leaves after No. 21. Each 6 m bay is laid on its own source way (4.38 m and 4.01 m), u north from the south end.
const W270 = 4.376, at270 = lay(-1.0, W270 / 6.0), W271 = 4.014, at271 = lay(5.0, W271 / 6.1);
const hood = (u, top) => ({ name: 'metal window hood', u: [u[0] - .1, u[1] + .1], h: [top + .1, top + .35], out: .35, depth: .7, colour: '#8f938f' });
const whiteBay = { height: 10.3, ceiling: 3.2, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9c9a94' }, bands: [[3.3, 3.6, .3]],
  colours: { wall: '#ebeae4', trim: '#e0ded7', frame: '#2c3032', glass: '#3b4448', pier: '#ebeae4', back: '#e3ded2', floor: '#a19b90' } };
const evidence2325 = 'June 2024 Street View shows one white three-storey building of two bays north of No. 21, with four windows on each upper floor under corrugated metal hoods and a flat roof at about 10.3 m. The south bay, No. 23 (letterbox 23, with a hall-rental notice), has a roller shutter, a wooden door and a louvred panel under the maroon awning carried on from No. 21. The north bay, No. 25 (door plate 25), is the Wee Ghee Athletic Association: a yellow board reading WEE GHEE ATHLETIC ASSOCIATION between its first-floor windows, 威義 on their glass, red lettering reading 威義體育會 under them, and a cream folding grille gate under a red-and-white striped awning hung with Buddhist prayer flags. No listing for the association was found at Lorong 17 (only a Yiwei Athletic Association elsewhere), so no name is given and its boards are blank. On the row\'s plane 2.2 m in front of the source edge, three June 2024 panoramas agree on the building from 1.0 m south to 11.1 m north of No. 21\'s source corner: it fills the 3 m gap the map leaves after No. 21, and its two bays of about 6 m are laid on their own source ways, 4.38 m and 4.01 m wide.';
const sources2325 = id => [way(id), pano('FeWy4yNg9qEGZG5jKgP5XA', 256, 22, 110), pano('zA0hxiYKqVOIl4BIukFCWw', 225, 20, 100), pano('gBz2E1aqjym_0qAkSZxE2A', 225, 20, 100)];
const win23 = [[0, 1.35], [2.86, 4.2]].map(at270), win25 = [[5.65, 6.95], [8.57, 9.8]].map(at271);
export const no23 = {
  id: 'l17-23', buildingIds: ['454254270'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 23 Lorong 17 (June 2024 exterior, occupant not identified)', address: '23 Lorong 17 Geylang (the south bay)',
  ...whiteBay, evidence: evidence2325, sources: sources2325('454254270'),
  windows: win23.flatMap(u => [{ u, h: [4.43, 5.72], panes: 2 }, { u, h: [7.72, 8.86], panes: 2 }]),
  blocks: [
    { name: 'roof slab', u: [0, W270], h: [10.0, 10.3], out: .2, depth: .4, colour: '#e0ded7' },
    ...win23.flatMap(u => [hood(u, 5.72), hood(u, 8.86)]),
    { name: 'air conditioner', u: at270([-.14, .86]), h: [7.0, 7.65], out: .3, depth: .5, colour: '#e8e8e4' },
    { name: 'air conditioner', u: at270([3.3, 4.1]), h: [3.95, 4.4], out: .3, depth: .5, colour: '#e8e8e4' },
    { name: 'maroon scalloped awning', u: [0, W270], h: [3.0, 3.4], out: .5, depth: 1.0, colour: '#6a2d36' },
  ],
  piers: [[0, .3], [W270 - .25, W270]],
  backFittings: [
    { name: 'dark door', u: at270([.14, .86]), h: [.1, 2.2], colour: '#5a2a26' },
    { name: 'louvred panel', u: at270([.9, 1.9]), h: [1.8, 2.3], colour: '#cfc9b8' },
    { name: 'roller shutter', u: at270([2.0, 4.0]), h: [.1, 2.4], colour: '#c3c4c0' },
    { name: 'wooden door', u: at270([4.29, 4.86]), h: [.1, 2.1], colour: '#b08d6a' },
  ],
};
export const no25 = {
  id: 'l17-25', buildingIds: ['454254271'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 25 Lorong 17, Wee Ghee Athletic Association (June 2024 exterior, not listed)', address: '25 Lorong 17 Geylang (the north bay)',
  ...whiteBay, evidence: evidence2325, sources: sources2325('454254271'),
  windows: win25.flatMap(u => [{ u, h: [4.43, 5.72], panes: 2 }, { u, h: [7.72, 8.86], panes: 2 }]),
  blocks: [
    { name: 'roof slab', u: [0, W271], h: [10.0, 10.3], out: .2, depth: .4, colour: '#e0ded7' },
    ...win25.flatMap(u => [hood(u, 5.72), hood(u, 8.86)]),
    { name: 'blank yellow board', u: at271([7.23, 8.57]), h: [4.57, 5.86], out: .05, depth: .04, colour: '#e7c43a' },
    { name: 'blank lettered band', u: at271([6.0, 10.4]), h: [3.86, 4.45], out: .05, depth: .04, colour: '#f2efe8' },
    { name: 'air conditioner', u: at271([10.0, 10.86]), h: [3.95, 4.55], out: .3, depth: .5, colour: '#e8e8e4' },
    { name: 'striped awning', u: at271([5.14, 11.1]), h: [2.86, 3.2], out: .5, depth: 1.0, colour: '#d2655c' },
  ],
  piers: [[0, .25], [W271 - .25, W271]],
  backFittings: [
    { name: 'folding grille gate', u: at271([5.57, 8.71]), h: [.1, 2.7], colour: '#cfc6a8' },
    { name: 'dark door', u: at271([8.86, 9.71]), h: [.1, 2.4], colour: '#2c2a2a' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 8. Way 454254275, No. 27 (door plate 27): a white three-storey house with a recessed top-floor balcony under an overhanging
// roof slab and a dark-stained fin to the north, with a black board reading 慕德同鄉會. On the row's plane 2.2 m
// forward, two June 2024 panoramas agree on its ends 5.6 m apart, from 2.33 m south of the source corner: it fills
// the 2.5 m gap the map leaves after way 271. Laid on the 5.81 m source edge, u north from the south end.
const W275 = 5.813, at275 = lay(-2.33, W275 / 5.63), win275 = [[-1.67, -.44], [1.29, 2.56]].map(at275);
export const no27 = {
  id: 'l17-27', buildingIds: ['454254275'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 27 Lorong 17, with the 慕德同鄉會 board (June 2024 exterior, not listed)', address: '27 Lorong 17 Geylang (door plate 27; stair to 27-A)',
  // The walls stop at the balcony slab; the top floor, set back about 1.2 m, and the roof slab are blocks.
  height: 7.0, ceiling: 2.8, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows a white three-storey house north of No. 25: a top floor recessed behind a balcony under an overhanging roof slab with plants growing on it, two windows under a vent band on the first floor with a black board reading 慕德同鄉會 in gold between them and a phone-number board below, and a dark-stained fin on its north side. The ground floor is open under a blue striped awning, with an arched window, a wooden door plated 27 and a stair doorway under a yellow board reading 番禺慕德同鄉會 27-A 二樓, placing the association on the floor above at 27-A. Neither the association (only the Poon Yue Association 番禹會館 at New Bridge Road is listed) nor a No. 27 Lorong 17 is listed on Google Maps, so no name is given and the boards are blank. On the row\'s plane 2.2 m in front of the source edge, two June 2024 panoramas agree on its ends 5.6 m apart, from 2.33 m south of the source corner, so it fills the 2.5 m gap the map leaves after way 454254271; it is laid on the 5.81 m source edge.',
  sources: [way('454254275'), pano('gBz2E1aqjym_0qAkSZxE2A', 235, 18, 100), pano('FeWy4yNg9qEGZG5jKgP5XA', 215, 18, 100)],
  colours: { wall: '#ecebe5', trim: '#e0ded7', frame: '#2c3032', glass: '#3b4448', pier: '#ecebe5', back: '#e6e4de', floor: '#a19b90' },
  bands: [[3.2, 3.44, .25]],
  windows: win275.flatMap(u => [{ u, h: [4.33, 5.38], panes: 2 }, { u, h: [7.18, 8.4], panes: 2, out: -1.1 }]),
  vents: win275.map(u => ({ u, h: [5.49, 5.93] })),
  blocks: [
    { name: 'set-back top storey', u: [.08, W275 - .02], h: [7.0, 9.78], out: -6.6, depth: 10.8, colour: '#e6e4de' },
    { name: 'overhanging roof slab', u: [0, W275], h: [9.78, 10.1], out: -5.95, depth: 12.5, colour: '#d9d6cc' },
    { name: 'top-floor vent band', u: [.25, W275 - .45], h: [8.4, 8.8], out: -1.17, depth: .04, colour: '#c9c7c0' },
    { name: 'balcony slab', u: [0, W275], h: [6.55, 7.0], out: .1, depth: .2, colour: '#e0ded7' },
    { name: 'balcony railing', u: [.25, W275 - .45], h: [7.0, 7.9], out: .15, depth: .04, colour: '#bdbab2' },
    { name: 'dark-stained fin', u: [W275 - .4, W275], h: [0, 10.1], out: .1, depth: .2, colour: '#3f3a36' },
    { name: 'blank black board', u: at275([-.71, 1.56]), h: [5.33, 6.0], out: .08, depth: .04, colour: '#1c1a19' },
    { name: 'blank phone board', u: at275([1.44, 2.27]), h: [3.9, 4.3], out: .05, depth: .03, colour: '#f1f1ee' },
    { name: 'blue striped awning', u: [0, at275([3.1, 3.3])[0]], h: [2.78, 3.2], out: .5, depth: 1.0, colour: '#3d63a8' },
  ],
  piers: [[0, .25], [W275 - .4, W275]],
  backFittings: [
    { name: 'arched window', u: at275([.11, .78]), h: [1.45, 2.3], colour: '#d9d6cc' },
    { name: 'wooden door', u: at275([.84, 1.51]), h: [.1, 2.4], colour: '#8a5a3a' },
    { name: 'dark doorway', u: at275([1.78, 2.44]), h: [.1, 2.5], colour: '#2a2a2a' },
    { name: 'blank yellow board', u: at275([1.73, 2.44]), h: [2.5, 2.8], out: .03, colour: '#e0b83a' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 9. Way 454254276, No. 29: the first of the pale peach walk-ups with projecting side fins, a balcony slab and a
// deep roof slab. Two June 2024 panoramas put its fins on the row's plane, 2.3 m forward, 5.3 m apart from 2.64 m
// south of the source corner, meeting No. 27's north end. Laid on the 5.80 m source edge, u north.
const W276 = 5.8, at276 = lay(-2.64, W276 / 5.31), win276 = [[-2.3, -1.4], [1.0, 2.3]].map(at276);
const peach = { wall: '#ecd6c4', trim: '#e2cbb8', frame: '#3a3a36', glass: '#3f474a', pier: '#ecd6c4', back: '#e6ded3', floor: '#a19b90' };
export const no29 = {
  id: 'l17-29', buildingIds: ['454254276'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 29 Lorong 17 (June 2024 exterior, occupant not identified)', address: '29 Lorong 17 Geylang',
  height: 10.9, ceiling: 3.4, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows the first of the pale peach three-storey walk-ups north of No. 27: two windows on each upper floor, a vent band over the first-floor windows, a balcony slab, a deep roof slab, and side fins projecting at each party wall. The ground floor has a dark fascia over a wooden door and an open front, with a chest freezer by the north pier. Google Maps lists Kaki Co @ 17 Geylang, an apartment building, at 29 Lorong 17 Geylang, Singapore 388553, with its point about 2.6 m south of this way where the photographed house stands, but no sign for it was photographed, so no name is given. Two June 2024 panoramas triangulate its fins on a plane 2.3 m in front of the source edge, 5.3 m apart from 2.64 m south of the source corner, so it meets No. 27\'s photographed north end; it is laid on the 5.80 m source edge. The east-ring massing had given it 14 m.',
  sources: [way('454254276'), search('Kaki Co @ 17 Geylang 29 Lorong 17'), pano('gBz2E1aqjym_0qAkSZxE2A', 245, 18, 100), pano('INboFn5xnG6TxoVcRIkLXA', 230, 18, 100), pano('FeWy4yNg9qEGZG5jKgP5XA', 205, 18, 100)],
  colours: peach,
  bands: [[3.4, 3.75, .3]],
  windows: win276.flatMap(u => [{ u, h: [4.75, 5.75], panes: 2 }, { u, h: [8.15, 9.25], panes: 2 }]),
  vents: [{ u: at276([-2.4, 2.4]), h: [5.95, 6.35] }],
  blocks: [
    { name: 'deep roof slab', u: [0, W276], h: [10.3, 10.9], out: .5, depth: 1.0, colour: '#e2cbb8' },
    { name: 'balcony slab', u: [0, W276], h: [7.0, 7.35], out: .4, depth: .8, colour: '#e2cbb8' },
    ...[[0, .3], [W276 - .3, W276]].map(u => ({ name: 'side fin', u, h: [3.75, 10.3], out: .45, depth: .9, colour: '#ecd6c4' })),
    { name: 'air conditioner', u: at276([1.5, 2.3]), h: [4.2, 4.7], out: .3, depth: .5, colour: '#e8e8e4' },
  ],
  piers: [[0, .3], [W276 - .3, W276]],
  backFittings: [
    { name: 'dark fascia', u: at276([-2.3, .6]), h: [2.6, 3.3], colour: '#2d2a28' },
    { name: 'open front', u: at276([-2.0, -.5]), h: [.1, 2.5], colour: '#4a4440' },
    { name: 'wooden door', u: at276([-1.4, -.85]), h: [.1, 2.3], colour: '#8a5a3a' },
    { name: 'chest freezer', u: at276([.9, 1.7]), h: [.1, 1.4], out: .35, depth: .7, colour: '#f1f1ee' },
  ],
};

export const lorong17 = [fengShang, row237, trueJesus, yangClan, no21, no23, no25, no27, no29];
export const lorong17Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong17Layout = (place, width) => simpleHouseLayout(width, place);
export const lorong17Reviews = (place, frame) => facing(frame, place.id, place.review?.distance ?? 8, place.review?.pitch ?? 18);

// Side faces: windows, vents, bands, blocks and drawn signs on another source edge, with no five-foot way.
const shell = new Set(['upper wall', 'five-foot way floor', 'five-foot way ceiling', 'five-foot way return', 'back wall']);
export const lorong17Sides = (place, poly) => (place.sides ?? []).map(side => {
  const frame = frontageFrame(poly, side.edge);
  const { boxes, boards, blades } = simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: side.windows, vents: side.vents, blocks: side.blocks, bands: side.bands, boards: side.boards, blades: side.blades });
  return { edge: side.edge, frame, boxes: boxes.filter(b => !shell.has(b.name)), boards, blades };
});
