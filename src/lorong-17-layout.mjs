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

// ---------------------------------------------------------------------------------------------
// 10. Way 454254277, No. 31 (letterbox 31): a peach walk-up like No. 29, with brown-framed three-pane windows
// under red-brown louvred hoods. Two June 2024 panoramas triangulate its window edges 1.95 m forward; with its
// fins it reads 6.4 m wide from 2.4 m south of the source corner. Laid on the 5.81 m source edge, u north.
const W277 = 5.811, at277 = lay(-2.4, W277 / 6.4), win277 = [[-1.59, .32], [1.37, 3.2]].map(at277);
const brownHood = (u, h) => ({ name: 'red-brown louvred hood', u: [u[0] + .1, u[1] - .1], h, out: .12, depth: .24, colour: '#9a4a3a' });
export const no31 = {
  id: 'l17-31', buildingIds: ['454254277'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 31 Lorong 17 (June 2024 exterior, occupant not identified)', address: '31 Lorong 17 Geylang (letterbox 31)',
  height: 10.6, ceiling: 3.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows a pale peach three-storey walk-up like No. 29, with side fins, a balcony slab and a deep roof slab, but with two wide brown-framed three-pane windows on each upper floor under red-brown louvred hoods. The ground floor is a glazed shop stacked with pipes and fittings, with a tiled column and letterbox 31 at its south end. Google Maps lists Visual Gallery Singapore (artistic handicrafts) at 31 Lorong 17 Geylang, Singapore 388555, but no sign for it was photographed and the shop holds plumbing stock, so no name is given. Two June 2024 panoramas triangulate its window edges on a plane about 1.95 m in front of the source edge; with its fins it reads about 6.4 m wide from 2.4 m south of the source corner, and it is laid on the 5.81 m source edge. The east-ring massing had given it 14 m.',
  sources: [way('454254277'), search('Visual Gallery Singapore 31 Lorong 17 Geylang'), pano('INboFn5xnG6TxoVcRIkLXA', 255, 18, 100), pano('8zShCoV5q2fYvPBEC901Vw', 215, 18, 100), pano('gBz2E1aqjym_0qAkSZxE2A', 230, 18, 100)],
  colours: { ...peach, frame: '#6e3f2c' },
  bands: [[3.0, 3.5, .3]],
  windows: win277.flatMap(u => [{ u, h: [4.6, 5.9], panes: 3 }, { u, h: [7.6, 8.75], panes: 3 }]),
  blocks: [
    { name: 'deep roof slab', u: [0, W277], h: [10.1, 10.6], out: .5, depth: 1.0, colour: '#e2cbb8' },
    { name: 'balcony slab', u: [0, W277], h: [6.75, 7.1], out: .4, depth: .8, colour: '#e2cbb8' },
    ...[[0, .3], [W277 - .3, W277]].map(u => ({ name: 'side fin', u, h: [3.5, 10.1], out: .45, depth: .9, colour: '#ecd6c4' })),
    ...win277.flatMap(u => [brownHood(u, [6.0, 6.4]), brownHood(u, [9.1, 9.5])]),
    { name: 'air conditioner', u: at277([2.4, 3.3]), h: [3.6, 4.3], out: .3, depth: .5, colour: '#e8e8e4' },
  ],
  piers: [[0, .3], at277([-1.75, -1.35]), [W277 - .3, W277]],
  backFittings: [
    { name: 'glazed pipe shop', u: at277([-1.0, 3.6]), h: [.1, 2.9], colour: '#4a5458', glow: .1 },
    { name: 'shelves of pipes', u: at277([-1.0, .2]), h: [.1, 2.4], out: .05, depth: .1, colour: '#cfd2d0' },
    { name: 'letterbox', u: at277([-1.3, -1.15]), h: [1.2, 1.45], out: .05, depth: .1, colour: '#c9a64a' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 11. Way 454254278, No. 33: a finned peach walk-up like No. 31, over a temple front with a black board reading
// 覺寺. Read on a plane 2.0 m forward from two June 2024 panoramas: about 7.0 m between fin centres, from 3.0 m
// south of the source corner. Laid on the 5.80 m source edge, u north.
const W278 = 5.8, at278 = lay(-3.0, W278 / 7.0), win278 = [[-1.0, .75], [2.1, 3.6]].map(at278);
export const no33 = {
  id: 'l17-33', buildingIds: ['454254278'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'No. 33 Lorong 17 (June 2024 exterior, occupant not identified)', address: '33 Lorong 17 Geylang',
  height: 11.0, ceiling: 3.25, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows a pale peach finned walk-up like No. 31: two brown-framed windows under red-brown louvred hoods on each upper floor, a balcony slab and a deep roof slab at about 11 m. The ground floor is a temple front: a black board with gold characters reading 覺寺 under red silk rosettes, a glass door between vertical couplets, painted lanterns and potted plants. Google Maps lists Maha Mantra Buddhist Centre, a Buddhist temple on floor 1, at 33 Lorong 17 Geylang, with its point on the photographed house, but the board\'s visible characters do not give that name, so it is not named and the board is blank. Read on a plane 2.0 m in front of the source edge from two June 2024 panoramas, its fins are about 7.0 m apart from 3.0 m south of the source corner; it is laid on the 5.80 m source edge. The east-ring massing had given it 14 m.',
  sources: [way('454254278'), search('Maha Mantra Buddhist Centre 33 Lorong 17 Geylang'), pano('8zShCoV5q2fYvPBEC901Vw', 232, 18, 100), pano('INboFn5xnG6TxoVcRIkLXA', 220, 18, 100), pano('ghWQo6rbUlRhzXunm7Gf2g', 210, 18, 100)],
  colours: { ...peach, frame: '#6e3f2c' },
  bands: [[3.25, 3.6, .3]],
  windows: win278.flatMap(u => [{ u, h: [4.75, 6.05], panes: 3 }, { u, h: [8.0, 9.05], panes: 3 }]),
  blocks: [
    { name: 'deep roof slab', u: [0, W278], h: [10.6, 11.0], out: .5, depth: 1.0, colour: '#e2cbb8' },
    { name: 'balcony slab', u: [0, W278], h: [6.9, 7.25], out: .4, depth: .8, colour: '#e2cbb8' },
    ...[[0, .3], [W278 - .3, W278]].map(u => ({ name: 'side fin', u, h: [3.6, 10.6], out: .45, depth: .9, colour: '#ecd6c4' })),
    ...win278.flatMap(u => [brownHood(u, [6.1, 6.5]), brownHood(u, [9.4, 9.8])]),
    ...[[-.9, 0], [2.3, 3.2]].map(s => ({ name: 'air conditioner', u: at278(s), h: [4.0, 4.6], out: .3, depth: .5, colour: '#e8e8e4' })),
  ],
  piers: [[0, .3], [W278 - .3, W278]],
  backFittings: [
    { name: 'blank black temple board', u: at278([.3, 2.3]), h: [2.6, 3.15], out: .05, colour: '#1c1a19' },
    { name: 'red silk rosettes', u: at278([.2, 2.4]), h: [3.0, 3.2], out: .08, colour: '#c3201a' },
    { name: 'glass temple door', u: at278([.8, 1.9]), h: [.1, 2.55], colour: '#3e3a36', glow: .12 },
    ...[[.45, .65], [2.05, 2.25]].map(s => ({ name: 'blank couplet', u: at278(s), h: [.6, 2.5], out: .04, colour: '#1f1d1c' })),
    { name: 'painted lantern', u: at278([-.4, .2]), h: [2.0, 2.9], out: .5, depth: .5, colour: '#8a4a2a' },
    { name: 'pale glazed front', u: at278([-2.5, -.6]), h: [.1, 2.6], colour: '#b8c4c0' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 12. Way 454254279, No. 35 (door plate 35): a taller off-white finned walk-up with corrugated metal awnings over its
// top windows, over the Gyaltsap Tashi Ling Buddhist Society's board. Two June 2024 panoramas triangulate its window
// edges and north fin 2.2-2.6 m forward; its fins are about 6.7 m apart from 1.5 m south of the source corner.
// Heights are read on that plane. Laid on the 5.81 m source edge, u north.
const W279 = 5.811, at279 = lay(-1.5, W279 / 6.7), win279 = [[-.31, 1.63], [2.72, 4.57]].map(at279);
export const gyaltsap = {
  id: 'gyaltsap-tashi-ling', buildingIds: ['454254279'], kind: 'gyaltsap-tashi-ling', frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 24 },
  name: 'Gyaltsap Tashi Ling Buddhist Society (June 2024 exterior)', address: '35 Lorong 17 Geylang (door plate 35; listed as 17 Lor 35 Geylang)',
  height: 11.4, ceiling: 3.83, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows an off-white three-storey finned walk-up, taller than its peach neighbours, with a pink-stained fin to the north: two windows on each upper floor, white louvred vents over the first-floor windows, a balcony slab, corrugated metal awnings over the top windows and a roof slab at about 11.4 m. The ground floor carries two gold lotus emblems on its fascia over a long brown board with an orange disc emblem, gold lotuses and lettering reading Gyaltsap Tashi Ling Buddhist Society over a Chinese line (…察吉…林佛…會) partly hidden by hanging plants, above a tiled wall plated 35 and a pair of wooden doors. Google Maps lists Gyaltsab Tashi Ling Centre, a Buddhist temple, at 17 Lor 35 Geylang, an apparent transposition of 35 Lorong 17, with its point on the photographed house, about 1 m in front of the source way to the south. Board and listing agree on the name, so the house is named after its board (open question 12 allows a clearly signed occupant when published addresses disagree); the English lettering and emblem are redrawn in original type, and the partly hidden Chinese line is not drawn. Two June 2024 panoramas triangulate its window edges and north fin 2.2-2.6 m in front of the source edge; its fins are about 6.7 m apart from 1.5 m south of the source corner, and it is laid on the 5.81 m source edge. The east-ring massing had given it 14 m.',
  sources: [way('454254279'), search('Gyaltsab Tashi Ling Centre'), pano('8zShCoV5q2fYvPBEC901Vw', 247, 18, 100), pano('ghWQo6rbUlRhzXunm7Gf2g', 205, 18, 100), pano('INboFn5xnG6TxoVcRIkLXA', 215, 18, 100)],
  colours: { wall: '#ece8dc', trim: '#e2ddd0', frame: '#3a3a36', glass: '#3f474a', pier: '#ece8dc', back: '#d9d3c4', floor: '#a19b90' },
  bands: [[3.83, 4.16, .3]],
  windows: win279.flatMap(u => [{ u, h: [5.11, 6.25], panes: 3 }, { u, h: [7.96, 9.25], panes: 2 }]),
  vents: win279.map(u => ({ u, h: [6.28, 6.68] })),
  blocks: [
    { name: 'roof slab', u: [0, W279], h: [11.0, 11.4], out: .4, depth: .8, colour: '#e2ddd0' },
    { name: 'balcony slab', u: [0, W279], h: [7.16, 7.6], out: .4, depth: .8, colour: '#e2ddd0' },
    { name: 'side fin', u: [0, .3], h: [4.16, 11.0], out: .45, depth: .9, colour: '#ece8dc' },
    { name: 'pink-stained side fin', u: [W279 - .4, W279], h: [4.16, 11.0], out: .45, depth: .9, colour: '#c99d8f' },
    ...win279.map(u => ({ name: 'corrugated metal awning', u: [u[0] - .15, u[1] + .15], h: [9.7, 10.2], out: .55, depth: 1.1, colour: '#9aa09f' })),
    ...[[-.2, .7], [2.3, 3.2]].map(s => ({ name: 'air conditioner', u: at279(s), h: [7.6, 8.15], out: .25, depth: .45, colour: '#e8e8e4' })),
    { name: 'air conditioner', u: at279([1.6, 2.5]), h: [4.2, 4.8], out: .3, depth: .5, colour: '#e8e8e4' },
    ...[[.3, .8], [1.9, 2.4]].map(s => ({ name: 'gold lotus emblem', u: at279(s), h: [3.58, 3.8], out: .04, depth: .03, colour: '#d6b25a' })),
  ],
  // The society's long brown board, on the back wall of the five-foot way.
  boards: [{ u: at279([-.3, 4.6]), h: [3.07, 3.55], out: -1.9 }],
  piers: [[0, .3], [W279 - .4, W279]],
  backFittings: [
    { name: 'tiled wall', u: at279([-.3, 4.6]), h: [.1, 3.0], colour: '#e9dccb' },
    { name: 'wooden double doors', u: at279([1.0, 3.6]), h: [.1, 2.74], out: .02, colour: '#8a5030' },
    { name: 'frosted door panels', u: at279([1.25, 3.35]), h: [.6, 2.4], out: .03, colour: '#c9c4b8' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 13. Way 454254280, Nos. 37-41: one pale yellow three-storey building of three finned bays, the middle one with the
// Singapore Rattan Industry Association's board, over a builder's store with a long yellow board. Its front (edge 1)
// runs north. Two pairs of June 2024 panoramas triangulate its ends and fins 0.2-1.0 m behind the source edge: 17.4 m
// long from 2.7 m south of the source corner, with bays of about 5.4, 6.1 and 5.9 m. Laid on the 14.62 m source edge.
const W280 = 14.624, at280 = lay(-2.7, W280 / 17.4);
const win280 = { a: [[-2.45, -1.0], [.67, 1.9]], b: [[3.33, 4.67], [6.44, 7.78]], c: [[9.4, 10.1], [11.8, 13.0]] };
export const no37to41 = {
  id: 'l17-37-41', buildingIds: ['454254280'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 17 Geylang', review: { distance: 5, pitch: 30 },
  name: 'Nos. 37-41 Lorong 17, three bays with the Singapore Rattan Industry Association (June 2024 exterior, not yet named)', address: '37-41 Lorong 17 Geylang (the association at No. 39)',
  height: 10.4, ceiling: 3.3, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f8c84' },
  evidence: 'June 2024 Street View shows one pale yellow three-storey building of three bays between projecting fins, its roof slab at about 10.4 m. The south bay has two windows on each upper floor, over a vent band and an open five-foot way. The middle bay carries a white board reading 新加坡籐業公會 S\'PORE RATTAN INDUSTRY ASSN. between its first-floor windows. The north bay has a louvred vent band and a grilled top-floor window. Across the ground floor of the middle and north bays runs a long yellow board reading Ah Qi Trading & Construction Pte Ltd, Islandwide Roofing & Decking Specialists, over a green awning and a builder\'s store. Google Maps lists Singapore Rattan Industry Assoc. with its point inside this way, under the address 39 Sims Cl, Singapore 388562: the postal code belongs to this stretch of Lorong 17, so the association is at No. 39, the middle bay. Naming one bay of a three-bay way needs the way split, so it waits on open question 37 and the boards are blank. Ah Qi Trading & Construction is listed only at Woodlands and Lim Chu Kang, so its board stays blank. Two pairs of June 2024 panoramas triangulate the ends and the two fins 0.2-1.0 m behind the source edge: the building is 17.4 m long from 2.7 m south of the source corner, filling most of the 4 m gap after No. 35\'s way, and is laid on the 14.62 m source edge. Its plain white north wall on the back lane carries small windows under concrete hoods near its west end.',
  sources: [way('454254280'), search('Singapore Rattan Industry Association'), pano('ghWQo6rbUlRhzXunm7Gf2g', 245, 15, 100), pano('9Tdsro0uN2QtbZA28ESq8Q', 225, 15, 100), pano('8zShCoV5q2fYvPBEC901Vw', 260, 15, 100), pano('qR4qVlrIcfZojnmELQB3hQ', 215, 15, 100)],
  colours: { wall: '#e8e0c2', trim: '#ddd5b6', frame: '#3a3a36', glass: '#3f474a', pier: '#e8e0c2', back: '#d9d2c2', floor: '#a19b90' },
  bands: [[3.3, 3.55, .3]],
  windows: [
    ...win280.a.flatMap(s => [{ u: at280(s), h: [4.4, 5.6], panes: 2 }, { u: at280(s), h: [7.5, 8.6], panes: 2 }]),
    ...win280.b.flatMap(s => [{ u: at280(s), h: [4.5, 5.6], panes: 2 }, { u: at280(s), h: [7.6, 8.6], panes: 2 }]),
    ...win280.c.flatMap(s => [{ u: at280(s), h: [4.7, 5.8], panes: 2 }, { u: at280(s), h: [7.6, 8.7], panes: 2 }]),
  ],
  vents: [{ u: at280([-2.6, 1.9]), h: [5.75, 6.05] }, { u: at280([9.3, 13.5]), h: [5.95, 6.25] }],
  blocks: [
    { name: 'roof slab', u: [0, W280], h: [10.0, 10.4], out: .4, depth: .8, colour: '#ddd5b6' },
    { name: 'balcony slab', u: [0, W280], h: [6.95, 7.25], out: .4, depth: .8, colour: '#ddd5b6' },
    // Fins and awning are kept shallow: the front stands 4.2 m from the lane's centreline.
    ...[[-2.7, -2.4], [1.9, 2.9], [8.2, 9.2], [14.4, 14.7]].map(s => ({ name: 'side fin', u: at280(s), h: [3.55, 10.0], out: .3, depth: .6, colour: '#e8e0c2' })),
    { name: 'blank rattan association board', u: at280([3.9, 7.1]), h: [5.7, 6.4], out: .06, depth: .04, colour: '#f2f0ea' },
    ...[[-1.0, -.2], [5.3, 6.1], [10.6, 11.4]].map(s => ({ name: 'air conditioner', u: at280(s), h: [7.8, 8.3], out: .25, depth: .45, colour: '#e8e8e4' })),
    ...[[-.3, .5], [.6, 1.4]].map(s => ({ name: 'air conditioner', u: at280(s), h: [3.6, 4.2], out: .3, depth: .5, colour: '#e8e8e4' })),
    { name: 'blank yellow trading board', u: at280([3.2, 14.3]), h: [2.5, 3.4], out: .1, depth: .06, colour: '#e9cf4a' },
    { name: 'green awning', u: at280([3.2, 14.3]), h: [2.3, 2.5], out: .3, depth: .6, colour: '#2f6a4a' },
  ],
  piers: [[0, .3], at280([1.9, 2.9]), at280([8.2, 9.2]), [W280 - .3, W280]],
  backFittings: [
    { name: 'open five-foot way doors', u: at280([-2.4, -1.4]), h: [.1, 2.4], colour: '#5a4a3a' },
    { name: 'wooden door', u: at280([-.5, .2]), h: [.1, 2.3], colour: '#8a5a3a' },
    { name: 'builder\'s store', u: at280([3.2, 14.3]), h: [.1, 2.3], colour: '#6a6660' },
  ],
  sides: [{
    // The plain white north wall on the back lane, u west from the front corner, read from qR4q... on its source plane.
    edge: 0,
    windows: [{ u: [6.5, 7.1], h: [7.3, 8.4], panes: 2 }, { u: [9.0, 9.6], h: [7.6, 8.9], panes: 1 }, { u: [6.6, 7.2], h: [4.3, 5.4], panes: 1 }, { u: [9.3, 9.9], h: [4.3, 5.4], panes: 1 }],
    vents: [{ u: [6.6, 7.2], h: [5.75, 6.0] }, { u: [9.3, 9.9], h: [5.7, 5.95] }, { u: [6.6, 7.6], h: [2.7, 3.0] }, { u: [9.3, 9.9], h: [2.7, 3.0] }],
    blocks: [[6.3, 7.6], [8.9, 9.9]].flatMap(u => [
      { name: 'concrete window hood', u, h: [9.2, 9.35], out: .3, depth: .6, colour: '#e6e4de' },
      { name: 'concrete window hood', u: [u[0] + .1, u[1] + .1], h: [6.85, 7.0], out: .3, depth: .6, colour: '#e6e4de' },
    ]),
  }],
};

// ---------------------------------------------------------------------------------------------
// 15. Way 682928733, No. 134 Sims Avenue, the Lorong 17 east corner: a cream three-storey corner block with a tall
// parapet and curved concrete hoods, and a lower two-storey wing to the south with a flowered balcony, over a corner
// coffeeshop. Triangulated from straight-run June 2024 panoramas, its Lorong 17 face stands 5-6 m east of the source
// edge, which lies inside the lane, and about 2-3 m further south (open question 39); it is laid on the source edges.
// Frame: edge 3, the corner block's Lorong 17 face, u south from the splay. The photographed face, s from the
// corner, runs -0.6 to 10.0 m and is laid on the 10.92 m edge.
const W134 = 10.922, at134 = lay(-.6, W134 / 10.6);
const win134 = [[.4, 1.75], [2.4, 3.9], [5.3, 6.9], [7.6, 9.45]].map(at134);
const brownCoping = '#8a4f3a', cream134 = '#ece6d6';
const hood134 = (u, h) => ({ name: 'curved concrete hood', u, h, out: .5, depth: 1.0, colour: '#e4ddcc' });
const red = '#c9302c';
export const sims134 = {
  id: 'sims-134', buildingIds: ['682928733'], kind: 'unnamed', unnamed: true, heldFlat: true, frontEdge: 3, reviewRoad: 'Lorong 17 Geylang', review: { distance: 2.2, pitch: 32 },
  name: 'No. 134 Sims Avenue, Lorong 17 east corner (June 2024 exterior, occupants not identified)', address: '134 Sims Avenue (Lorong 17 corner)',
  height: 10.0, ceiling: 4.5, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9c9a94' },
  evidence: 'June 2024 Street View shows a cream corner block of three tall storeys with a parapet at about 15.1 m (16 m over the splay), curved concrete hoods over each upper floor, louvred vents, brown-edged ledges and windows in pairs, and a lower two-storey wing to the south with a balcony hung with flowers and string lights under a blue awning. The ground floor is a corner coffeeshop: red SingGas LPG awnings, green beer-sponsor boards for the stalls (K.L Hokkien Mee, Signature Intestines, Claypot Frog Porridge, Hongkong Steam Shark Head) and a white board reading 驰名猪什汤大王 over the splayed corner. Google Maps lists 134 Sims Ave only as an address, with no business, so no name is given and every board and awning is blank. Triangulated from straight-run June 2024 panoramas (qR4q..., 9Tds... and Zwx6...), the corner block\'s Lorong 17 face is about 10.6 m long, against the 10.92 m source edge, and stands 5-6 m east of the source edge and 2-3 m south of it: the source outline reaches into the lane, 0.9 m from its centreline. Panoramas taken as the car turned at the junction place the corner about 1.4 m further north. The elevation is laid on the source edges (open question 39), and its street-level pieces are held within 0.25 m of the walls, which stand in the estimated carriageways of Lorong 17 and Sims Avenue.',
  sources: [way('682928733'), search('134 Sims Ave Singapore 387456'), pano('qR4qVlrIcfZojnmELQB3hQ', 10, 12, 70), pano('9Tdsro0uN2QtbZA28ESq8Q', 345, 12, 100), pano('Zwx6nRNu4CPL9jyWL624Fw', 40, 15, 100), pano('F6D3qY_SnKVyp-erTxBPDA', 120, 15, 100), pano('xH65Wze70tWSMzS5zLcP7Q', 160, 12, 100)],
  colours: { wall: cream134, trim: '#e4ddcc', frame: '#3a3a36', glass: '#3f474a', pier: cream134, back: '#3a3532', floor: '#a19b90' },
  windows: win134.map(u => ({ u, h: [6.25, 7.5], panes: 2 })),
  vents: win134.map(u => ({ u, h: [7.75, 8.1] })),
  blocks: [
    ...win134.map(u => ({ name: 'brown-edged ledge', u: [u[0] - .1, u[1] + .1], h: [6.1, 6.25], out: .08, depth: .16, colour: brownCoping })),
    hood134(at134([-.6, 4.25]), [9.0, 9.6]), hood134(at134([4.6, 10.0]), [9.0, 9.6]),
    { name: 'blank green sponsor boards', u: [.1, W134 - .1], h: [4.6, 6.0], out: .05, depth: .04, colour: '#2f5a3f' },
    { name: 'red awning, held flat', u: [0, W134], h: [3.0, 4.5], out: .12, depth: .24, colour: red },
  ],
  piers: [[0, .4], [W134 - .4, W134]],
  backFittings: [{ name: 'coffeeshop front', u: [.4, W134 - .4], h: [.1, 4.3], colour: '#3a332e', glow: .14 }],
  // The corner block above the wing's roof: its outline in this frame, from the splay to the cut square to the face
  // at the wing's step, back to the party wall and round to the Sims Avenue end of the splay.
  upper: [{ outline: [[0, 0], [W134, 0], [W134, -7.6], [-2.42, -7.6], [-2.48, -3.47]], from: 10.0, to: 15.1, colour: cream134, roof: '#9c9a94',
    windows: win134.map(u => ({ u, h: [10.25, 11.6], panes: 2 })),
    vents: win134.map(u => ({ u, h: [12.1, 12.5] })),
    blocks: [
      ...win134.map(u => ({ name: 'brown-edged ledge', u: [u[0] - .1, u[1] + .1], h: [10.1, 10.25], out: .08, depth: .16, colour: brownCoping })),
      hood134(at134([-.6, 4.25]), [13.2, 14.3]), hood134(at134([4.6, 10.0]), [13.2, 14.3]),
      { name: 'parapet coping', u: [0, W134], h: [14.9, 15.1], out: .1, depth: .2, colour: brownCoping },
      ...[[1.0, 1.9], [7.9, 8.9]].map(s => ({ name: 'air conditioner', u: at134(s), h: [9.6, 10.25], out: .3, depth: .5, colour: '#e8e8e4' })),
    ] }],
  sides: [
    {
      edge: 4, // the splay, u from its Sims Avenue end to the Lorong 17 corner, read s -0.5 to 4.1 m
      windows: [{ u: [1.4, 2.88], h: [6.5, 7.6], panes: 2 }, { u: [1.4, 2.88], h: [10.4, 12.0], panes: 2 }],
      vents: [{ u: [1.4, 2.88], h: [8.2, 8.5] }, { u: [1.4, 2.88], h: [12.4, 13.0] }],
      blocks: [
        { name: 'curved concrete hood', u: [.09, 4.09], h: [9.5, 9.9], out: .5, depth: 1.0, colour: '#e4ddcc' },
        { name: 'curved concrete hood', u: [.09, 4.09], h: [13.5, 14.2], out: .5, depth: 1.0, colour: '#e4ddcc' },
        { name: 'brown-edged ledge', u: [1.3, 2.98], h: [6.3, 6.45], out: .08, depth: .16, colour: brownCoping },
        { name: 'brown-edged ledge', u: [1.3, 2.98], h: [10.2, 10.35], out: .08, depth: .16, colour: brownCoping },
        { name: 'stepped parapet', u: [.5, 3.8], h: [15.1, 16.0], out: -.1, depth: .2, colour: cream134 },
        { name: 'parapet coping', u: [.5, 3.8], h: [16.0, 16.15], out: -.05, depth: .3, colour: brownCoping },
        { name: 'blank soup-king board', u: [.1, 4.18], h: [5.0, 5.6], out: .05, depth: .04, colour: '#f3efe6' },
        { name: 'red awning, held flat', u: [0, 4.279], h: [3.4, 4.4], out: .12, depth: .24, colour: red },
        { name: 'coffeeshop front', u: [.3, 3.98], h: [.13, 3.3], out: .03, depth: .04, colour: '#3a332e', glow: .14 },
      ],
    },
    {
      edge: 5, // Sims Avenue, u west from the party wall
      windows: [[.45, 1.65], [2.35, 3.55]].flatMap(u => [{ u, h: [6.3, 7.5], panes: 2 }, { u, h: [10.4, 11.7], panes: 2 }]),
      vents: [[.45, 1.65], [2.35, 3.55]].flatMap(u => [{ u, h: [7.75, 8.1] }, { u, h: [12.1, 12.5] }]),
      blocks: [
        { name: 'curved concrete hood', u: [.1, 4.06], h: [9.4, 9.9], out: .5, depth: 1.0, colour: '#e4ddcc' },
        { name: 'curved concrete hood', u: [.1, 4.06], h: [13.4, 14.2], out: .5, depth: 1.0, colour: '#e4ddcc' },
        { name: 'blank green sponsor board', u: [.1, 4.06], h: [4.6, 6.0], out: .05, depth: .04, colour: '#2f5a3f' },
        { name: 'red awning, held flat', u: [0, 4.162], h: [3.0, 4.5], out: .12, depth: .24, colour: red },
        { name: 'coffeeshop front', u: [.3, 3.86], h: [.13, 2.9], out: .03, depth: .04, colour: '#3a332e', glow: .14 },
      ],
    },
    {
      edge: 1, // the two-storey wing's Lorong 17 face, u south from the step
      windows: [[1.0, 4.0], [5.5, 8.5]].map(u => ({ u, h: [6.5, 7.4], panes: 3 })),
      vents: [[1.0, 4.0], [5.5, 8.5]].map(u => ({ u, h: [8.4, 8.8] })),
      blocks: [
        { name: 'roof slab', u: [0, 10.48], h: [9.7, 10.0], out: .3, depth: .6, colour: '#e4ddcc' },
        { name: 'balcony slab', u: [0, 10.48], h: [5.0, 5.3], out: .4, depth: .8, colour: '#e4ddcc' },
        { name: 'balcony railing', u: [.1, 10.38], h: [5.3, 6.2], out: .78, depth: .04, colour: '#d6d6d0' },
        { name: 'flowering creepers', u: [.1, 10.38], h: [5.6, 6.0], out: .82, depth: .04, colour: '#c47a96' },
        { name: 'blue awning', u: [0, 10.48], h: [7.6, 8.1], out: .5, depth: 1.0, colour: '#2e5c9e' },
        { name: 'red awning, held flat', u: [0, 10.48], h: [3.0, 4.4], out: .12, depth: .24, colour: red },
        { name: 'coffeeshop dining', u: [.3, 10.18], h: [.13, 2.9], out: .03, depth: .04, colour: '#3a332e', glow: .12 },
      ],
    },
  ],
};

// ---------------------------------------------------------------------------------------------
// 16. Way 454254307, Nos. 42-44 (Google's address points for both fall in this way): a white three-storey block of
// two bays either side of a stair tower, with sloping roof hoods. Three pairs of June 2024 panoramas fix its north
// corner 1.4 m behind the source corner, and two more its south party line about 12.2 m along and 2-2.5 m behind.
// Read from ghWQ... on a plane 1.4 m behind the source edge (0.6-11.3 m there) and laid proportionally, u south.
const W307 = 11.462, at307 = lay(.6, W307 / 10.7);
const win44 = [[1.83, 3.33], [3.67, 5.17]].map(at307), win42 = [[8.3, 9.5], [10.2, 11.2]].map(at307);
const white307 = '#e9eaea';
export const no42to44 = {
  id: 'l17-42-44', buildingIds: ['454254307'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 6, pitch: 26 },
  name: 'Nos. 42-44 Lorong 17 (June 2024 exterior, occupants not identified)', address: '42-44 Lorong 17 Geylang (east side)',
  height: 11.0, ceiling: 3.8, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9c9a94' },
  evidence: 'June 2024 Street View shows a white three-storey block of two bays either side of a narrow stair tower lit by tall slit windows. The north bay, No. 44, is taller: two windows on each upper floor under louvred vents, a balcony slab and a large sloping roof hood at about 12.6 m. The south bay, No. 42, has the same pattern lower down, its hood at about 11 m, over an open front with grilles, a door and a letterbox. The stair tower has a small stepped parapet at about 12 m. The ground floor is framed by deep piers, with a glazed office front and a bamboo blind in the north bay. Google Maps gives address points for 42 and 44 Lorong 17 Geylang inside this way but lists no business, and no sign was photographed, so no name is given. Three pairs of June 2024 panoramas fix the north front corner 1.4 m behind the source corner. Two further pairs put its south party line, where the cream block of Nos. 38-40 begins, about 12.2 m along and 2.0-2.5 m behind the source front, 1.3 m south of the source party line. The elevation was read on a plane 1.4 m behind the source edge, where three panoramas agree on the north bay to about 0.3 m, and is laid proportionally on the 11.46 m source edge.',
  sources: [way('454254307'), pano('ghWQo6rbUlRhzXunm7Gf2g', 80, 15, 110), pano('9Tdsro0uN2QtbZA28ESq8Q', 100, 10, 60), pano('qR4qVlrIcfZojnmELQB3hQ', 135, 10, 60), pano('8zShCoV5q2fYvPBEC901Vw', 60, 15, 100)],
  colours: { wall: white307, trim: '#dfe0e0', frame: '#2f3436', glass: '#3c4549', pier: white307, back: '#d6d6d2', floor: '#a19b90' },
  bands: [[3.8, 4.2, .3]],
  windows: [
    ...win44.flatMap(u => [{ u, h: [5.45, 6.65], panes: 2 }, { u, h: [8.65, 9.95], panes: 2 }]),
    ...win42.flatMap(u => [{ u, h: [4.8, 5.8], panes: 2 }, { u, h: [7.8, 8.8], panes: 2 }]),
  ],
  vents: [
    ...win44.flatMap(u => [{ u, h: [6.9, 7.3] }, { u, h: [10.2, 10.65] }]),
    ...win42.flatMap(u => [{ u, h: [6.07, 6.5] }, { u, h: [9.0, 9.5] }]),
  ],
  blocks: [
    { name: 'balcony slab', u: at307([.6, 5.3]), h: [8.1, 8.6], out: .45, depth: .9, colour: '#dfe0e0' },
    { name: 'balcony slab', u: at307([7.6, 11.3]), h: [7.0, 7.5], out: .45, depth: .9, colour: '#dfe0e0' },
    { name: 'sloping roof hood', u: at307([7.4, 11.3]), h: [10.3, 11.0], out: .6, depth: 1.2, colour: '#d9dada' },
    // The stair tower: slit windows from the first floor to the top, and a small stepped parapet behind the front.
    { name: 'stair tower slit windows', u: at307([6.0, 6.9]), h: [4.5, 10.8], out: .02, depth: .03, colour: '#3c4549' },
    { name: 'stair tower', u: at307([5.3, 7.6]), h: [11.0, 12.0], out: -2.0, depth: 4.0, colour: white307 },
    { name: 'stepped parapet', u: at307([5.9, 7.0]), h: [12.0, 12.3], out: -.1, depth: .2, colour: white307 },
    { name: 'air conditioner', u: at307([2.0, 2.8]), h: [9.95, 10.4], out: .25, depth: .45, colour: '#e8e8e4' },
    { name: 'bamboo blind', u: at307([5.6, 7.4]), h: [2.0, 3.6], out: .05, depth: .04, colour: '#8a6e4f' },
  ],
  piers: [[0, .5], at307([5.0, 5.6]), at307([7.3, 7.7]), [W307 - .4, W307]],
  backFittings: [
    { name: 'glazed office front', u: at307([1.4, 4.4]), h: [.1, 2.9], colour: '#4a5458', glow: .08 },
    { name: 'dark door', u: at307([5.8, 6.5]), h: [.1, 2.1], colour: '#2c2a2a' },
    { name: 'grilled door', u: at307([8.0, 8.9]), h: [.1, 2.3], colour: '#9a9c99' },
    { name: 'window', u: at307([9.6, 10.6]), h: [1.0, 2.3], colour: '#3c4549' },
  ],
  // The taller north bay above the south bay's roof.
  upper: [{ outline: [[.02, 0], [at307([5.3, 5.3])[0], 0], [at307([5.3, 5.3])[0], -8.0], [.05, -8.0]], from: 11.0, to: 12.0, colour: white307, roof: '#9c9a94',
    blocks: [{ name: 'sloping roof hood', u: at307([.4, 5.3]), h: [11.7, 12.6], out: .6, depth: 1.2, colour: '#d9dada' }] }],
};

// ---------------------------------------------------------------------------------------------
// 17. Way 454254308, Nos. 38-40 (door plate 40; address points for both in this way): a weathered cream three-storey
// block of two bays either side of a stair tower, with deep hoods and balcony slabs. Two pairs of June 2024 panoramas
// triangulate its north party line about 1.3 m south of the source party line and 2.0-2.5 m behind the source front,
// and its south end on the source end, 1.6-2.0 m behind. Read square-on from 8zSh... (13.67-22.33 m there) and laid
// on the 11.45 m source edge, u south.
const W308 = 11.452, at308 = lay(13.67, W308 / 8.66);
const win40 = [[14.33, 15.44], [16.0, 17.1]].map(at308), win38 = [[19.55, 20.44], [20.78, 21.78]].map(at308);
const cream308 = '#e4dccb';
export const no38to40 = {
  id: 'l17-38-40', buildingIds: ['454254308'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 17 Geylang', review: { distance: 6, pitch: 26 },
  name: 'Nos. 38-40 Lorong 17 (June 2024 exterior, occupants not identified)', address: '38-40 Lorong 17 Geylang (east side; door plate 40)',
  height: 9.7, ceiling: 3.55, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9c9a94' },
  evidence: 'June 2024 Street View shows a weathered, mould-streaked cream three-storey block of two bays either side of a narrow stair tower with vertical windows. The north bay, No. 40 (door plate 40 on a grilled door with red couplets), has two windows on each upper floor under louvred vents, a balcony slab with air-conditioners and a deep roof hood at about 10 m; the south bay, No. 38, repeats the pattern slightly lower. The ground floor is an open five-foot way with grilled doors, a barred window, a red letterbox, a ladder and an altar on the stair-tower pier. Google Maps lists CSL Engineering, an engineering consultant on floor 1, at 40 Lorong 17 Geylang, Singapore 388563, but no sign for it was photographed, so no name is given. Two pairs of June 2024 panoramas triangulate the block\'s north party line about 1.3 m south of the source party line and 2.0-2.5 m behind the source front, and its south end on the source end, 1.6-2.0 m behind it: about 10.1 m long. The elevation was read square-on from one panorama and is laid proportionally on the 11.45 m source edge.',
  sources: [way('454254308'), search('CSL Engineering 40 Lorong 17 Geylang'), pano('8zShCoV5q2fYvPBEC901Vw', 85, 15, 100), pano('ghWQo6rbUlRhzXunm7Gf2g', 80, 15, 110), pano('9Tdsro0uN2QtbZA28ESq8Q', 75, 15, 110)],
  colours: { wall: cream308, trim: '#d8d0bf', frame: '#3a3a36', glass: '#3f474a', pier: cream308, back: '#d9d2c2', floor: '#a19b90' },
  bands: [[4.0, 4.45, .3]],
  windows: [
    ...win40.flatMap(u => [{ u, h: [4.67, 5.67], panes: 2 }, { u, h: [7.44, 8.44], panes: 2 }]),
    ...win38.flatMap(u => [{ u, h: [4.3, 5.1], panes: 2 }, { u, h: [6.9, 7.67], panes: 2 }]),
  ],
  vents: [
    ...win40.flatMap(u => [{ u, h: [5.8, 6.2] }, { u, h: [8.55, 8.9] }]),
    ...win38.flatMap(u => [{ u, h: [5.25, 5.6] }, { u, h: [7.8, 8.15] }]),
  ],
  blocks: [
    { name: 'balcony slab', u: at308([13.7, 17.6]), h: [6.67, 7.2], out: .5, depth: 1.0, colour: '#d8d0bf' },
    { name: 'balcony slab', u: at308([19.1, 22.33]), h: [6.2, 6.7], out: .5, depth: 1.0, colour: '#d8d0bf' },
    { name: 'deep roof hood', u: at308([13.7, 17.6]), h: [9.55, 10.1], out: .6, depth: 1.2, colour: '#d2cab8' },
    { name: 'deep roof hood', u: at308([19.1, 22.33]), h: [8.7, 9.2], out: .6, depth: 1.2, colour: '#d2cab8' },
    { name: 'stair tower windows', u: at308([18.0, 18.7]), h: [4.6, 9.2], out: .02, depth: .03, colour: '#3f474a' },
    { name: 'stair tower parapet', u: at308([17.6, 19.1]), h: [9.7, 9.9], out: -.1, depth: .2, colour: cream308 },
    ...[[14.4, 15.2], [15.7, 16.5]].map(s => ({ name: 'air conditioner', u: at308(s), h: [7.2, 7.7], out: .3, depth: .5, colour: '#e8e8e4' })),
    { name: 'mould streaks', u: at308([17.6, 19.1]), h: [3.6, 9.7], out: .01, depth: .02, colour: '#b9b2a2' },
  ],
  piers: [[0, .35], at308([17.5, 18.0]), at308([18.9, 19.3]), [W308 - .35, W308]],
  backFittings: [
    { name: 'grilled door with red couplets', u: at308([15.3, 16.2]), h: [.1, 2.4], colour: '#6a6660' },
    { name: 'stair door', u: at308([18.1, 18.8]), h: [.1, 2.3], colour: '#3a3a36' },
    { name: 'barred window', u: at308([19.5, 20.2]), h: [1.0, 2.0], colour: '#3f474a' },
    { name: 'grilled gate', u: at308([21.0, 22.0]), h: [.1, 2.4], colour: '#9a9c99' },
    { name: 'red letterbox', u: at308([20.4, 20.7]), h: [1.1, 1.5], out: .05, depth: .1, colour: '#b5221d' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 18. Way 454254240, No. 20: Bright Star Hotel, a six-storey block set back about 10 m from the lane behind a lawn,
// with a granite-clad ground and first floor under a white cornice, four cream upper floors with peach spandrels and
// a curved pediment. Five June 2024 panoramas agree on it on the source plane; it photographs about 45.3 m long from
// 2.3 m north of the source corner, laid on the 42.12 m source edge, u south.
const W240 = 42.119, at240 = lay(-2.3, W240 / 45.3);
const cols240 = [[-2.0, 2.2], [3.9, 8.0], [9.1, 12.8], [13.9, 17.0], [18.4, 21.4], [23.96, 27.04], [28.0, 31.0], [31.8, 34.9], [35.1, 37.4], [38.15, 40.3], [40.9, 42.6]].map(at240);
const first240 = [[9.5, 12.2], [14.5, 16.6], [18.7, 21.2], [24.0, 26.3], [28.2, 30.5], [32.1, 34.0], [35.4, 37.1], [38.3, 39.6], [40.9, 42.1]].map(at240);
const floors240 = [[10.3, 12.4], [13.4, 15.5], [16.4, 18.6], [19.4, 21.0]];
export const brightStar = {
  id: 'bright-star-hotel', buildingIds: ['454254240'], kind: 'bright-star-hotel', frontEdge: 2, reviewRoad: 'Lorong 17 Geylang', review: { distance: 9, pitch: 30 },
  name: 'Bright Star Hotel (June 2024 exterior)', address: '20 Lorong 17 Geylang (door plate 20)',
  height: 21.8, ceiling: 3.4, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#a5a39c' },
  evidence: 'June 2024 Street View shows a six-storey block set back about 10 m from the lane behind a lawn, palms and shrubs: an open ground floor clad in red granite with a lobby, a drinks machine and parked motorcycles, a first floor of white-framed windows in red granite under a white cornice at about 9.5 m, then four cream upper floors of paired windows between white pilasters with peach spandrel panels, hooded windows on the top floor, a parapet at about 21.8 m and a curved pediment with an oval medallion at about 23 m. A door plate reads 20, and a red banner on the granite reads BRIGHT STAR HOTEL SPECIAL PROMOTION 特别促销 with room rates and a telephone number. Google Maps lists Bright Star Hotel, a 3-star hotel, at 20 Lorong 17 Geylang, with its point 0.28 m in front of the source front, inside the photographed front (the Crystal Mansions precedent, open question 32). Listing, door plate and banner agree, so the building is named and the banner is redrawn in original type. Five June 2024 panoramas agree on the façade on the source plane; it photographs about 45.3 m long from 2.3 m north of the source corner and is laid on the 42.12 m source edge.',
  sources: [way('454254240'), search('Bright Star Hotel 20 Lorong 17 Geylang'), pano('INboFn5xnG6TxoVcRIkLXA', 95, 4, 24), pano('gBz2E1aqjym_0qAkSZxE2A', 90, 20, 110), pano('FeWy4yNg9qEGZG5jKgP5XA', 90, 15, 110), pano('zA0hxiYKqVOIl4BIukFCWw', 115, 20, 100), pano('qKWw6QiwVVcNE7eOEzxMSA', 100, 20, 100)],
  colours: { wall: '#ece9e1', trim: '#f4f3ef', frame: '#3b4a52', glass: '#7d97a3', pier: '#7e4a44', back: '#5a3a36', floor: '#9d978c' },
  bands: [[9.3, 9.8, .5]],
  windows: [
    ...first240.map(u => ({ u, h: [5.0, 7.4], panes: 2, surround: true, out: .06 })),
    ...floors240.flatMap(h => cols240.map(u => ({ u, h, panes: 3 }))),
  ],
  blocks: [
    { name: 'red granite cladding', u: [0, W240], h: [3.4, 9.3], out: .02, depth: .04, colour: '#8a5048' },
    { name: 'canopy soffit', u: [0, W240], h: [3.25, 3.45], out: .4, depth: .8, colour: '#e8e6e0' },
    ...floors240.slice(0, 3).flatMap(h => cols240.map(u => ({ name: 'peach spandrel', u, h: [h[1] + .05, h[1] + .85], out: .02, depth: .03, colour: '#e3a589' }))),
    ...cols240.map(u => ({ name: 'top-floor window hood', u: [u[0] - .1, u[1] + .1], h: [21.0, 21.3], out: .35, depth: .7, colour: '#f4f3ef' })),
    ...cols240.slice(1).map(u => ({ name: 'white pilaster', u: [u[0] - .7, u[0] - .1], h: [9.8, 21.8], out: .15, depth: .3, colour: '#f4f3ef' })),
    { name: 'curved pediment', u: at240([32.5, 38.5]), h: [21.8, 23.2], out: .05, depth: .3, colour: '#f4f3ef' },
    { name: 'oval medallion', u: at240([34.4, 36.6]), h: [21.9, 22.9], out: .22, depth: .04, colour: '#e6e2d8' },
    { name: 'lawn', u: [0, W240], h: [0, .1], out: 1.25, depth: 2.5, colour: '#5b7a45' },
  ],
  // The red promotional banner on the granite at the north end.
  boards: [{ u: at240([1.0, 4.2]), h: [3.7, 5.3], out: .05 }],
  piers: [[0, .5], ...[[8.4, 9.0], [17.5, 18.1], [27.3, 27.9], [35.0, 35.6]].map(at240), [W240 - .5, W240]],
  backFittings: [
    { name: 'hotel lobby', u: at240([0, 6.5]), h: [.1, 3.2], colour: '#3e3632', glow: .18 },
    { name: 'drinks machine', u: at240([24.5, 25.4]), h: [.1, 1.9], out: .4, depth: .8, colour: '#e8e6e0', glow: .2 },
    { name: 'undercroft', u: at240([7.0, 42.0]), h: [.1, 3.2], colour: '#4a4440' },
  ],
  sides: [{
    edge: 3, // the north end on the service lane, u east from the front corner
    windows: [[1.5, 4.5], [6.0, 9.0], [10.5, 13.5]].flatMap(u => [{ u, h: [5.0, 7.4], panes: 2, out: .06 }, ...floors240.map(h => ({ u, h, panes: 2 }))]),
    blocks: [
      { name: 'red granite cladding', u: [0, 15.82], h: [0, 9.3], out: .02, depth: .04, colour: '#8a5048' },
      { name: 'cornice', u: [0, 15.82], h: [9.3, 9.8], out: .25, depth: .5, colour: '#f4f3ef' },
    ],
  }],
};

// ---------------------------------------------------------------------------------------------
// 19. Way 454254238, by No. 14: the middle of a single-storey temple with a red-tiled hipped roof behind a tiled
// forecourt. Three June 2024 panoramas triangulate its eaves about 10 m long, 1-1.5 m in front of the source front,
// from 4 m north of the way to 1.2 m south of it (open question 40). The way holds the 4.84 m slice between, which is
// modelled at its photographed scale, u south; s along the photographed eaves runs 0.9-10.9 m, the way 4.86-9.71 m.
const W238 = 4.837, at238 = ([a, b]) => [+Math.max(0, a - 4.86).toFixed(2), +Math.min(W238, b - 4.86).toFixed(2)];
export const temple238 = {
  id: 'l17-14-temple', buildingIds: ['454254238'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 17 Geylang', review: { distance: 7, pitch: 12 },
  name: 'Temple with the 和友社 and 華德善室 boards, by No. 14 Lorong 17 (June 2024 exterior, not listed)', address: 'Lorong 17 Geylang, east side, south of No. 20 (Google\'s No. 14 point lies in front of it)',
  height: 3.7, ceiling: 2.75, fiveFootWay: 1.5, roof: { type: 'hip', ridge: 5.0, colour: '#b9623f' },
  evidence: 'June 2024 Street View shows a single-storey temple behind a tiled forecourt between Bright Star Hotel and a white two-storey row: a red-tiled hipped roof with a dark ridge edge, a beige fascia under the eaves over a beige canopy, granite entrance columns carrying couplets, stone lions, an open altar front, green railings to the north and a grille gate to the south. Its gold-on-brown boards read 和友社 and 華德善室 (right to left). Neither is listed on Google Maps, and Google\'s address point for 14 Lorong 17 Geylang, in front of this way, carries no business, so no name is given and the boards are blank. Three June 2024 panoramas triangulate its eaves about 10 m long, 1-1.5 m in front of the source front, from about 4 m north of the way to 1.2 m south of it, so the 4.84 m way holds only its middle; that slice is modelled at its photographed scale, and the rest of the temple is open question 40. Heights were read on the triangulated plane: eaves at about 3.7 m and ridge at about 5 m.',
  sources: [way('454254238'), pano('GX6RAPRapiD3eAKqXG_3uA', 70, 5, 30), pano('M_9st2eoKa2qvAZ10P9vRQ', 100, 12, 110), pano('qKWw6QiwVVcNE7eOEzxMSA', 90, 12, 100)],
  colours: { wall: '#ddcdb3', trim: '#d6c3a5', frame: '#3a3a36', glass: '#3f474a', pier: '#8f8a84', back: '#5a2d26', floor: '#b5713f' },
  blocks: [
    { name: 'beige fascia', u: [0, W238], h: [3.1, 3.7], out: .55, depth: 1.1, colour: '#d9c4a2' },
    { name: 'beige canopy', u: [0, W238], h: [2.75, 3.1], out: .6, depth: 1.2, colour: '#e3d2b5' },
    { name: 'dark eaves edge', u: [0, W238], h: [3.7, 3.85], out: .7, depth: .2, colour: '#4a3a32' },
    { name: 'green railing', u: at238([4.86, 5.86]), h: [.9, 1.9], out: .02, depth: .04, colour: '#3e6b4f' },
    ...[[6.28, 6.54], [7.82, 8.25]].map(s => ({ name: 'granite couplet column', u: at238(s), h: [0, 2.75], out: .15, depth: .3, colour: '#8f8a84' })),
    { name: 'blank couplet', u: at238([6.3, 6.52]), h: [.6, 2.4], out: .31, depth: .02, colour: '#e8e2d4' },
    ...[[5.9, 6.2], [8.3, 8.6]].map(s => ({ name: 'stone lion', u: at238(s), h: [0, 1.1], out: .4, depth: .5, colour: '#a6a39d' })),
    { name: 'blank gold-on-brown board', u: at238([4.86, 6.2]), h: [2.2, 2.7], out: .02, depth: .03, colour: '#5c3d2a' },
    { name: 'tiled forecourt', u: [0, W238], h: [0, .06], out: 1.0, depth: 2.0, colour: '#b5713f' },
  ],
  piers: [[0, .15], [W238 - .15, W238]],
  backFittings: [
    { name: 'open altar front', u: at238([6.54, 7.82]), h: [.1, 2.65], colour: '#5a2d26', glow: .18 },
    { name: 'grille gate', u: at238([8.25, 9.55]), h: [.1, 2.4], colour: '#7d827f' },
    { name: 'dark interior', u: at238([4.86, 6.28]), h: [.1, 2.0], colour: '#3a332e' },
  ],
};

// ---------------------------------------------------------------------------------------------
// 20-23. The white two-storey row south of the temple. June 2024 panoramas (M_9s..., qC7t...) agree on six houses
// on a line through the source fronts of ways 249-251, s from (170.35, -13.0) towards the Geylang Road end: A 5.5-10.9,
// B 10.9-15.2, C 15.2-19.0, D 19.0-22.8, E 22.8-26.4, F 26.4-29.9 m. The four source ways (z 0.8-18.5) overlap houses
// C-F, one each; A and B stand in the gap the map leaves north of way 249 (open question 41). Each house is laid
// proportionally on its own way, u south. Heights read on that line.
const rowHouse = ({ id, way: w, W, s0, s1, windows, blocks = [], backFittings = [], ...rest }) => {
  const at = lay(s0, W / (s1 - s0));
  return {
    // The fronts stand 3.2-3.5 m from the lane's centreline, at the carriageway's edge, so street-level pieces are held flat.
    id, buildingIds: [w], heldFlat: true, frontEdge: w === '454254249' ? 0 : 2, reviewRoad: 'Lorong 17 Geylang', review: { distance: 6, pitch: 20 },
    height: 6.8, ceiling: 3.5, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 8.2, ridgeDepth: .4, colour: '#7d746c' },
    colours: { wall: '#eeede8', trim: '#e4e2dc', frame: '#2c3032', glass: '#3c4549', pier: '#eeede8', back: '#e2e0da', floor: '#a19b90' },
    bands: [[6.32, 6.76, .3], [3.75, 3.95, .2]],
    windows: windows.map(sw => ({ u: at(sw), h: [4.45, 5.74], panes: 2 })),
    blocks: [{ name: 'pilaster', u: [0, .2], h: [3.95, 6.32], out: .05, depth: .1, colour: '#e4e2dc' }, ...blocks(at)],
    piers: [[0, .25], [W - .25, W]],
    backFittings: backFittings(at),
    sources: [way(w), pano('qC7tdabb-uutEWXfday1Jw', 97, 15, 100), pano('M_9st2eoKa2qvAZ10P9vRQ', 100, 12, 110), pano('h2GMbpqMlF5I3mVPjbwO9w', 60, 12, 100)],
    ...rest,
  };
};
const rowEvidence = 'June 2024 Street View shows a white two-storey row of six shophouses south of the temple, under pitched roofs behind a cornice at about 6.8 m: two windows on each upper floor, a ledge at about 3.9 m, and a five-foot way, with a long maroon awning across the middle houses. Two June 2024 panoramas agree on the six houses on a line through the source fronts, from north to south about 5.4, 4.3, 3.8, 3.8, 3.6 and 3.5 m wide. The map\'s four source ways overlap the four southern houses, one each, and the two northern houses stand in the gap it leaves after the temple (open question 41). Each house is laid proportionally on its own way.';
export const chinaware = rowHouse({
  id: 'chinaware-merchants', way: '454254249', W: 3.765, s0: 15.2, s1: 19.0, kind: 'chinaware-merchants',
  name: 'Singapore Chinaware Merchants Association (June 2024 exterior)', address: '6 Lorong 17 Geylang (letterbox 6-B)',
  windows: [[15.5, 16.9], [17.4, 18.7]],
  evidence: rowEvidence + ' The third house from the north carries the left part of a long red board reading 新加坡瓷商公會 SINGAPORE CHINAWARE MERCHANTS ASSOCIATION over its five-foot way, which runs on over the fourth house; its stair door carries a letterbox lettered 6-B, beside red-framed glazed doors with fretwork panels. Google Maps lists the Singapore Chinaware Merchants Association at 6 Lorong 17 Geylang, Singapore 388537, with its point about 8 m south, inside way 454254252: the address, the letterbox and the board agree on this house, so it is named after the board (the Bamboo Lounge precedent, open question 33) and the whole board is redrawn on this house in original type. No claim is made about the ground floor.',
  blocks: () => [{ name: 'maroon awning, held flat', u: [0, 3.765], h: [2.5, 3.4], out: .04, depth: .08, colour: '#6e2b33' }],
  // The board, drawn whole on this house although it runs on over No. 4.
  boards: [{ u: [.2, 3.6], h: [3.53, 4.41], out: .1 }],
  backFittings: at => [
    { name: 'stair door', u: at([15.3, 15.95]), h: [.1, 2.3], colour: '#4a3a32' },
    { name: 'brass letterbox', u: at([15.5, 15.75]), h: [1.1, 1.35], out: .04, depth: .08, colour: '#b48a3a' },
    { name: 'red-framed glazed doors', u: at([16.1, 18.0]), h: [.1, 2.6], colour: '#9c2a24', glow: .08 },
    { name: 'fretwork panel', u: at([18.15, 18.85]), h: [.3, 2.6], colour: '#e3c88a' },
  ],
});

export const no4 = rowHouse({
  id: 'l17-4', way: '454254250', W: 4.742, s0: 19.0, s1: 22.8, kind: 'unnamed', unnamed: true,
  name: 'No. 4 Lorong 17 (June 2024 exterior, occupant not identified)', address: '4 Lorong 17 Geylang (between No. 6, letterbox 6-B, and No. 2, plates 2A, 2B and 02; no plate seen)',
  windows: [[19.3, 20.5], [20.9, 22.2]],
  evidence: rowEvidence + ' The fourth house from the north continues the red board of the Chinaware Merchants Association next door (drawn whole on No. 6) and the red fretwork panels round an open doorway, then has a grey door with a red letterbox, a sink and a brass incense urn under the maroon awning. No listing or sign identifies it, so no name is given.',
  blocks: () => [{ name: 'maroon awning, held flat', u: [0, 4.742], h: [2.5, 3.4], out: .04, depth: .08, colour: '#6e2b33' }],
  backFittings: at => [
    ...[[19.25, 19.6], [20.4, 20.75]].map(sw => ({ name: 'fretwork panel', u: at(sw), h: [.3, 2.6], colour: '#e3c88a' })),
    { name: 'open doorway', u: at([19.6, 20.4]), h: [.1, 2.5], colour: '#5a2d26', glow: .1 },
    { name: 'grey door', u: at([20.9, 21.6]), h: [.1, 2.3], colour: '#9a9c99' },
    { name: 'red letterbox', u: at([21.65, 21.85]), h: [1.1, 1.5], out: .04, depth: .08, colour: '#b5221d' },
    { name: 'brass incense urn', u: at([20.6, 20.9]), h: [.1, 1.1], out: .6, depth: .3, colour: '#b48a3a' },
  ],
});

export const no2 = rowHouse({
  id: 'l17-2', way: '454254252', W: 4.709, s0: 22.8, s1: 26.4, kind: 'unnamed', unnamed: true,
  name: 'No. 2 Lorong 17, upper floors (June 2024 exterior, occupants not identified)', address: '2 Lorong 17 Geylang (stair door plated 2A, 2B)',
  windows: [[23.1, 24.3], [24.4, 25.6]],
  evidence: rowEvidence + ' The fifth house from the north has a grey stair door plated 2A and 2B at its north end, a wide barred window with blinds under a row of small louvred lights, and chairs on its five-foot way; the maroon awning stops at its north party line (it appears to run further south only where it is projected onto the façade plane). Together with the sixth house, whose glass shop door is lettered 02, it is No. 2. Google Maps places the Singapore Chinaware Merchants Association\'s listing point inside this way, but its board and letterbox are two houses north, on No. 6; no listing or sign identifies this house, so no name is given.',
  blocks: () => [],
  backFittings: at => [
    { name: 'grey stair door', u: at([22.9, 23.6]), h: [.1, 2.3], colour: '#9a9c99' },
    { name: 'door plate', u: at([23.62, 23.75]), h: [1.6, 2.0], out: .03, depth: .04, colour: '#1c1c1c' },
    { name: 'barred window with blinds', u: at([23.9, 26.1]), h: [.9, 2.3], colour: '#c9cfd0' },
    { name: 'louvred lights', u: at([23.9, 26.1]), h: [2.55, 2.85], colour: '#7d8487' },
  ],
});
export const no2Shop = rowHouse({
  id: 'l17-2-shop', way: '454254251', W: 4.698, s0: 26.4, s1: 29.9, kind: 'unnamed', unnamed: true,
  name: 'No. 2 Lorong 17, the ground-floor shop at the south end of the row (June 2024 exterior, occupant not identified)', address: '2 Lorong 17 Geylang (glass door lettered 02)',
  windows: [[26.6, 27.7], [28.0, 29.0]],
  evidence: rowEvidence + ' The sixth and southernmost house has a fascia with faded, mould-streaked lettering and a glass shop door lettered 02 under a red festive banner reading 横财就手, with red couplets and lanterns and potted plants. It is part of No. 2 with the stair door plated 2A and 2B next door. No listing for a business at 2 Lorong 17 was found, so no name is given; the faded fascia and the festive banner are blank.',
  blocks: at => [
    { name: 'blank faded fascia', u: at([26.5, 29.8]), h: [3.0, 3.45], out: .02, depth: .03, colour: '#d9d6cc' },
    { name: 'blank red festive banner', u: at([26.7, 29.2]), h: [2.45, 2.75], out: .04, depth: .03, colour: '#c2241c' },
    ...[[26.65, 26.85], [29.0, 29.2]].map(sw => ({ name: 'blank red couplet', u: at(sw), h: [.8, 2.4], out: .04, depth: .02, colour: '#c2241c' })),
  ],
  backFittings: at => [{ name: 'glass shop door', u: at([27.1, 29.0]), h: [.1, 2.4], colour: '#4a5458', glow: .08 }],
});

// ---------------------------------------------------------------------------------------------
// 24. Way 454254253, the Geylang Road corner house east of Lorong 17: a two-storey corner shophouse, 5.3 m on Geylang
// Road and 28.7 m along the lane, with six bays of paired louvred-shutter windows over an arcade under a green awning.
// The frame is the Lorong 17 side (edge 1), u south from the north end. Three panoramas place it from about 2.2 m
// north of the source corner to 26 m south of it on the source plane; laid on the 28.71 m source edge.
const W253 = 28.711, at253 = lay(-2.2, W253 / 28.2);
const piers253 = [-1.0, 3.5, 8.5, 13.0, 17.0, 20.5, 24.25];
const bays253 = piers253.slice(1).map((r, i) => [piers253[i], r]);
export const corner253 = {
  id: 'gr-l17-east-corner', buildingIds: ['454254253'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 17 Geylang', review: { distance: 3.5, pitch: 24 },
  name: 'Corner shophouse at Geylang Road and Lorong 17, east side (June 2024 exterior, vacant)', address: 'Geylang Road, north side, Lorong 17 east corner',
  height: 8.5, ceiling: 4.2, fiveFootWay: 2.2, roof: { type: 'hip', ridge: 10.2, colour: '#8e6c5a' },
  evidence: 'June 2024 Street View shows a two-storey corner shophouse on the east corner of Lorong 17 and Geylang Road, cream with grey louvred shutters: on its long Lorong 17 side, six bays of paired shuttered windows between pilasters over pierced ventilation panels, and an arcaded five-foot way under a long green awning; on its narrow Geylang Road front, two shuttered windows with a RENT/SALE banner over an arched opening. Its boards read 明辉田鸡粥 EMINENT FROG PORRIDGE SEAFOOD RESTAURANT, CHÁO ẾCH MING HUI, with vertical boards at the corner. Google Maps now lists Eminent Frog Porridge & Seafood at 323 Geylang Road, near Lorong 19, and the RENT/SALE banner marks this corner as vacant, so no name is given and every board is blank. Three panoramas (April and June 2024) place the Lorong 17 side on the source plane from about 2.2 m north of the source corner to 26 m south of it, about 28 m against the 28.71 m source edge; heights were read on that plane: eaves at about 8.5 m, shuttered windows at 5.3-7.3 m and the five-foot way to 4.2 m.',
  sources: [way('454254253'), search('Eminent Frog Porridge & Seafood 323 Geylang Road'), pano('BUPeoAsGocsyXOdFQHewCw', 95, 15, 110), pano('L9oNMo8yJzknAL9O3GOnbw', 100, 15, 100), pano('PcP8fdxa3FdNxOSFtx1EAA', 10, 15, 100), pano('R0licFeVz38dKLAM_gICTg', 40, 15, 100)],
  colours: { wall: '#ebe2cc', trim: '#e0d6bd', frame: '#7d8487', glass: '#9aa3a6', pier: '#ebe2cc', back: '#4a4440', floor: '#a19b90' },
  bands: [[8.2, 8.5, .35], [4.2, 4.5, .3]],
  windows: bays253.flatMap(([a, b]) => { const m = (a + b) / 2; return [[a + .4, m - .2], [m + .2, b - .4]]; }).map(sw => ({ u: at253(sw), h: [5.3, 7.3], panes: 4 })),
  vents: bays253.flatMap(([a, b]) => { const m = (a + b) / 2; return [[a + .5, m - .3], [m + .3, b - .5]]; }).map(sw => ({ u: at253(sw), h: [4.6, 5.05] })),
  blocks: [
    ...piers253.map(c => ({ name: 'pilaster', u: at253([c - .25, c + .25]), h: [4.5, 8.2], out: .08, depth: .16, colour: '#e0d6bd' })).filter(b => b.u[0] >= 0 && b.u[1] <= W253),
    { name: 'green awning', u: [0, W253], h: [3.3, 4.15], out: .25, depth: .5, colour: '#2f6e58' },
  ],
  piers: [[0, .4], ...piers253.slice(1, -1).map(c => at253([c - .2, c + .2])), [W253 - .5, W253]],
  backFittings: [
    { name: 'shuttered shopfronts', u: at253([-1.5, 24.0]), h: [.1, 3.4], colour: '#7a7670' },
    { name: 'blank vertical board', u: at253([24.4, 24.8]), h: [3.0, 4.0], out: .04, colour: '#c9a83a' },
  ],
  sides: [{
    edge: 0, // the Geylang Road front, u east from the Lorong 17 corner
    windows: [[.7, 2.3], [3.0, 4.6]].map(u => ({ u, h: [5.3, 7.3], panes: 4 })),
    vents: [[.8, 2.2], [3.1, 4.5]].map(u => ({ u, h: [4.6, 5.05] })),
    blocks: [
      { name: 'cornice', u: [0, 5.305], h: [8.2, 8.5], out: .17, depth: .35, colour: '#e0d6bd' },
      { name: 'ledge', u: [0, 5.305], h: [4.2, 4.5], out: .15, depth: .3, colour: '#e0d6bd' },
      { name: 'blank RENT/SALE banner', u: [2.0, 3.6], h: [4.7, 5.6], out: .05, depth: .02, colour: '#e9d74a' },
      { name: 'blank restaurant board', u: [.3, 5.0], h: [3.3, 4.15], out: .08, depth: .04, colour: '#e48a2c' },
      { name: 'arched opening', u: [1.4, 4.0], h: [.1, 3.2], out: .02, depth: .03, colour: '#3a3532' },
      ...[[0, .35], [4.95, 5.305]].map(u => ({ name: 'blank vertical board', u, h: [4.5, 7.6], out: .25, depth: .1, colour: '#e5c25a' })),
    ],
  }],
};

export const lorong17 = [fengShang, row237, trueJesus, yangClan, no21, no23, no25, no27, no29, no31, no33, gyaltsap, no37to41, sims134, no42to44, no38to40, brightStar, temple238, chinaware, no4, no2, no2Shop, corner253];
export const lorong17Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong17Layout = (place, width) => simpleHouseLayout(width, place);
// Upper volumes over part of a footprint: an outline in the front frame, raised from `from` to `to`, with their own
// fittings on the front edge (the outline's first edge, which lies on the front).
export const lorong17Upper = (place, frame) => (place.upper ?? []).map(up => ({
  ...up, points: up.outline.map(([u, out]) => frame.point(u, out)),
  boxes: simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: up.windows, vents: up.vents, blocks: up.blocks }).boxes
    .filter(b => !['upper wall', 'five-foot way floor', 'five-foot way ceiling', 'five-foot way return', 'back wall'].includes(b.name)),
}));
export const lorong17Reviews = (place, frame) => facing(frame, place.id, place.review?.distance ?? 8, place.review?.pitch ?? 18);

// Side faces: windows, vents, bands, blocks and drawn signs on another source edge, with no five-foot way.
const shell = new Set(['upper wall', 'five-foot way floor', 'five-foot way ceiling', 'five-foot way return', 'back wall']);
export const lorong17Sides = (place, poly) => (place.sides ?? []).map(side => {
  const frame = frontageFrame(poly, side.edge);
  const { boxes, boards, blades } = simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: side.windows, vents: side.vents, blocks: side.blocks, bands: side.bands, boards: side.boards, blades: side.blades });
  return { edge: side.edge, frame, boxes: boxes.filter(b => !shell.has(b.name)), boards, blades };
});
