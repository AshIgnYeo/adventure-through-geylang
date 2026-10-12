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

export const lorong17 = [fengShang, row237];
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
