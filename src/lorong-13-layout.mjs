// Lorong 13 Geylang exteriors not covered by an earlier single-place module, from April 2024 Street View
// unless stated. Each place is a measured simple-house elevation in its frontage frame: u along the front
// from frame.a, out towards the street, heights above the five-foot-way floor. Named places meet the
// listing-plus-signage bar; unnamed ones (open question 18) carry no business name and leave boards blank.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';
import { row13, row13Layout } from './row13-layout.mjs';
import { singleRow, addShutter, addRowFittings, rowBrackets } from './single-row-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
// The west row north of Hainan Lim (Nos. 21-29) photographs about 2.6 m in front of its source front line,
// but the street width from the same panorama matches the source, so a panorama position error is as
// likely; the models keep the source front and were measured on frames rectified at the photographed depth.
const westRowOffset = 'The April 2024 frames place this row about 2.6 m in front of its source front line, by three-panorama triangulation and the façade base in level frames, but the façade-to-façade street width from the same panorama matches the source to within about 1 m, so a panorama position error explains it as well. The model keeps the source front, measured on frames rectified at the photographed depth, which gives the same widths and heights under either explanation (open question 20 asks only about the No. 25 party line).';

export const thirteenBbq = {
  id: 'thirteen-bbq', buildingIds: ['1223454595'], kind: 'thirteen-bbq', frontEdge: 0,
  name: 'Thirteen BBQ Bar 十三烤吧 (April 2024 exterior)', address: '27 Lorong 13 Geylang',
  height: 11.23, ceiling: 3.3, fiveFootWay: 1.8, reviewRoad: 'Lorong 13 Geylang',
  roof: { type: 'gable', ridge: 15.9, ridgeDepth: .36, colour: '#7d6b62' },
  evidence: 'Google Maps lists Thirteen BBQ Bar 十三烤吧, a Chinese restaurant, at 27 Lor 13 Geylang, Singapore 388670, open until 2 am in October 2026, and its point lies in unnumbered source way 1223454595. Seth Lui reported its opening at that address on 3 August 2023. April 2024 Street View shows its red 十三烤吧 THIRTEEN BBQ & BAR board, a red blade sign and a black BISTRO & BAR awning on the three-storey house between the BUILDERSmart corner (No. 29) and the scaffolded No. 25; in March 2022 the same frontage carried a black THIR13EN BISTRO & BAR board. Triangulating both party lines from three April 2024 panoramas gives a 6.1 m frontage on the source way to within 0.4 m, which resolves the 9 October width lock. ' + westRowOffset + ' A blue top storey under a deep hood and a stepped parapet sits over a cream middle storey with a stained hood; each has two windows under louvred vents. The blue north gable, seen above BUILDERSmart from Sims Avenue, peaks about 15.9 m up some 7 m behind the front. Menus, furniture, lights and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Thirteen+BBQ+Bar+27+Lorong+13+Geylang', 'https://sethlui.com/?p=190671', way('1223454595'), pano('TkVxod6FJdS-GoG9rWW7YQ', 252), pano('ChoF67Y2VEMaqvc2BplW8A', 215, 20), pano('6rAI_POhVESnh95mtBOQuw', 200, 5, 90), pano('Pux6vZ62VTrqmhLGTQ9rGA', 290, 15)],
  colours: { wall: '#4b8db6', trim: '#e8e4da', frame: '#2f3a40', glass: '#5d6f78', pier: '#e6e3dc', back: '#2e2b29' },
  blocks: [
    { name: 'cream middle storey', u: [0, 6.1], h: [3.3, 7.0], out: .02, depth: .04, colour: '#e4dccb' },
    { name: 'stained middle hood', u: [.1, 6.0], h: [6.95, 7.15], out: .45, depth: .9, colour: '#d4b393' },
    { name: 'top-storey ledge', u: [.8, 5.5], h: [7.78, 7.88], out: .1, depth: .2 },
    { name: 'top hood', u: [0, 6.1], h: [10.4, 10.6], out: .55, depth: 1.1, colour: '#3f7ea6' },
    { name: 'stepped parapet', u: [0, 1.03], h: [11.23, 11.74], out: -.08, depth: .25, colour: '#4b8db6' },
    { name: 'stepped parapet', u: [1.03, 3.17], h: [11.23, 11.49], out: -.08, depth: .25, colour: '#4b8db6' },
    { name: 'air conditioner', u: [2.6, 3.4], h: [7.15, 7.75], out: .35, depth: .45, colour: '#e8e8e4' },
  ],
  windows: [
    { u: [.94, 2.71], h: [7.95, 9.2], out: .02, panes: 3 }, { u: [3.53, 5.34], h: [7.95, 9.2], out: .02, panes: 3 },
    { u: [1.09, 2.89], h: [4.7, 6.1], out: .07, panes: 3 }, { u: [3.77, 5.6], h: [4.7, 6.1], out: .07, panes: 3 },
  ],
  vents: [{ u: [.91, 2.63], h: [9.32, 9.7] }, { u: [3.53, 5.2], h: [9.32, 9.7] }, { u: [1.06, 2.84], h: [6.2, 6.55] }, { u: [3.74, 5.56], h: [6.2, 6.55] }],
  piers: [[0, .3], [5.8, 6.1]],
  board: { u: [.41, 6.06], h: [3.42, 4.57], out: .07 },
  blades: [{ u: 6.0, out: [.15, 1.15], h: [4.3, 7.6] }],
  awning: { from: .05, to: 6.05, wall: 3.28, front: 2.4, depth: 1.5, valance: .3 },
  backFittings: [{ name: 'restaurant front', u: [.5, 5.6], h: [.1, 2.7], colour: '#3a3f42', glow: .1 }, { name: 'menu board', u: [4.0, 4.9], h: [1.2, 2.2], colour: '#e9e2d2', out: .02 }],
};

// The corner hardware store fronts Sims Avenue: frame u runs west from the Lorong 13 corner along edge 3.
export const builderSmart = {
  id: 'buildersmart', buildingIds: ['1223454594'], kind: 'buildersmart', frontEdge: 3,
  name: 'BUILDERSmart 魯班行 hardware store (June 2024 exterior)', address: '29 Lorong 13 Geylang (Sims Avenue corner)',
  height: 3.6, ceiling: 3.2, fiveFootWay: 1.2, reviewRoad: 'Sims Avenue',
  roof: { type: 'hip', ridge: 4.6, colour: '#7f9180' },
  evidence: 'Google Maps lists BUILDERSmart, a hardware store, at 29 Lor 13 Geylang, Singapore 388672 (buildersmart.com.sg), with current opening hours in October 2026, and its point lies in unnumbered source way 1223454594, the Sims Avenue corner of the west row. June 2024 Sims Avenue Street View shows a cream BUILDERSmart board, a white tool-icon panel and three small windows on a green corrugated loft over a single-storey shed, with green awnings reading 魯班行 BUILDERSmart and www.buildersmart.com.sg; the Lorong 13 awning repeats the web address in April 2024. This settles the earlier lock: the BUILDERSmart boards at No. 100 Sims Avenue are a second frontage, and the listed number matches this corner after Thirteen BBQ at No. 27. Two June 2024 panoramas resolve the loft by parallax, about 1.2-1.8 m behind the Sims face, rising to about 7.3 m (parallax gives 7.7-8.2 m, a render from the June 2024 pose about 7 m) and running from the Lorong 13 face for about 15 m. Eaves, awnings and the loft depth are estimates. Stock, pallets, vehicles and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=BUILDERSmart+29+Lorong+13+Geylang', 'https://buildersmart.com.sg/', way('1223454594'), pano('m3nF37u9pRBV296INfZ-1A', 160, 10, 90), pano('6iJpKmp-pzojl_DODGbq4Q', 175, 10, 90), pano('6rAI_POhVESnh95mtBOQuw', 200, 5, 90), pano('ChoF67Y2VEMaqvc2BplW8A', 262, 5, 90)],
  colours: { wall: '#9aa596', trim: '#c9cec4', frame: '#4b524b', glass: '#4a5552', pier: '#b8bdb3', back: '#3b3a36', floor: '#8f8b82' },
  rooftop: [{ u: [0, 15.2], top: 7.3, setback: 1.3, depth: 3.4, colour: '#8d9b86' }],
  blocks: [
    ...[[3.08, 3.98], [6.88, 7.71], [10.5, 11.28]].map(u => ({ name: 'loft window', u, h: [5.8, 6.65], out: -1.27, depth: .04, colour: '#4a5552' })),
    { name: 'tool-icon panel', u: [11.6, 13.8], h: [4.9, 7.2], out: -1.22, depth: .06, colour: '#f1f1ee' },
  ],
  boards: [{ u: [6.7, 11.16], h: [4.85, 5.55], out: -1.24 }],
  awning: { from: .1, to: 19.3, wall: 3.25, front: 2.15, depth: 2.2, valance: .35 },
  backFittings: [{ name: 'open hardware store front', u: [.4, 19.0], h: [.1, 2.9], colour: '#2f2e2b' }],
  // The 6.1 m Lorong 13 face, on edge 0: open shopfront under its own green awning.
  side: { edge: 0, opening: { u: [.4, 5.7], h: [.13, 2.9] }, awning: { from: .1, to: 6.0, wall: 3.25, front: 2.3, depth: 1.8, valance: .35 } },
};

// Unnamed exteriors carry no business name (open question 18); their ids start with l13-.
const unnamed = (number, extra) => ({ kind: 'unnamed', unnamed: true, reviewRoad: 'Lorong 13 Geylang', frontEdge: 0, name: `No. ${number} Lorong 13 Geylang (April 2024 exterior, occupant not identified)`, address: `${number} Lorong 13 Geylang`, ...extra });

export const no15de = unnamed('15D/E', {
  id: 'l13-15de', buildingIds: ['1223773761'],
  height: 8.2, ceiling: 3.0, fiveFootWay: 1.8,
  evidence: 'Unnumbered source way 1223773761 lies between Muhammadiyah (No. 17) and the Chong Min house plated 15-C on the way tagged 15B; April 2024 Street View shows door plates 15E and 15D on this two-storey cream house. Hiap Lian Friendly Association is listed at 15D, but no association sign was seen, so no name is given. Rectifications from the panoramas either side agree with the façade about 0.9 m in front of the source front, inside the usual tolerance, so the source front is kept. A small window in a moulded surround under a louvred vent and a wide four-pane window sit under a deep hood and a plain parapet; below are a timber door, the grilled 15E door and two roller shutters. The small white board by the door is left blank.',
  sources: [way('1223773761'), pano('D4Uk9t7JuM7EbZHDIk3xog', 230), pano('8k_BeNJ16snqOq6gubtsYw', 290, 8, 85), 'https://www.google.com/maps/search/?api=1&query=Hiap+Lian+Friendly+Association+15D+Lorong+13+Geylang'],
  colours: { wall: '#eadfbf', trim: '#efe6c8', frame: '#3e403c', glass: '#4d5a60', pier: '#ece3c6', back: '#e5dcc0' },
  bands: [[7.86, 8.2, .25], [7.07, 7.27, .9, '#e2d6b2'], [2.95, 3.05, .2]],
  windows: [{ u: [.88, 2.24], h: [4.64, 5.86], panes: 3, surround: true }, { u: [3.17, 5.88], h: [4.76, 6.79], panes: 4 }],
  blocks: [{ name: 'window transom', u: [3.17, 5.88], h: [5.97, 6.03], out: .02, depth: .02, colour: '#3e403c' }],
  vents: [{ u: [.77, 2.27], h: [6.07, 6.57] }],
  piers: [[0, .25], [5.9, 6.14]],
  backFittings: [
    { name: 'timber door', u: [1.41, 2.2], h: [.1, 2.2], colour: '#4a2a20' }, { name: 'grilled door 15E', u: [2.37, 3.17], h: [.1, 2.5], colour: '#5a3a2a' },
    { name: 'roller shutter', u: [3.42, 4.35], h: [.1, 2.65], colour: '#b9bbb6' }, { name: 'roller shutter', u: [4.56, 5.95], h: [.1, 2.65], colour: '#b9bbb6' },
    { name: 'blank board', u: [1.2, 2.06], h: [2.29, 2.79], colour: '#efefe8', out: .02 },
  ],
});

// No. 11 is a detached house behind a walled yard: frame u runs north from the south party line.
export const teckHoe = {
  id: 'teck-hoe', buildingIds: ['1223773759'], kind: 'teck-hoe', frontEdge: 1, reviewRoad: 'Lorong 13 Geylang',
  name: 'Teck Hoe Airconditioning Parts (April 2024 exterior)', address: '11 Lorong 13 Geylang',
  height: 5.2, ceiling: .13, fiveFootWay: .05, roof: { type: 'hip', ridge: 7.8, colour: '#9c5a46' },
  evidence: 'April 2024 Street View shows TECK HOE AIRCONDITIONING PARTS PTE LTD lettered across the front wall and door plate 11 on the detached two-storey house of source way 1223773759, which is tagged No. 11. Google Maps now lists Teck Hoe Airconditioning Parts at 8 Lor 15 Geylang (and a branch at 54 Dunlop Street), so the addresses conflict; under the owner\'s answer to open question 12 the signed house is modelled as a dated exterior, without claiming the company is there now. Rectifications from the panoramas north and south agree with the front wall about 1.4 m in front of the source front; the source front is kept. That resolves the earlier plan lock: the main block (about 4 m, under a hipped tiled roof with a ventilated gablet) and a lower south wing (about 2.3 m) share one front line, with an open yard at the south end and a metal canopy over the north passage. A walled yard stands about 2.2 m in front, its wall about 1.75 m high under a mesh fence to about 2.7 m, from the ground line in a level frame. The hipped roof rises to about 7.8 m: its apex shows above the eaves from the street. Plants, the flag and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Teck+Hoe+Airconditioning+Parts+Pte+Ltd', way('1223773759'), pano('8U4ZM41vQ-4RzwAUOCWcrg', 252, 10, 100), pano('HaY-y7EfW3SXOm-83rKMAw', 300, 10, 80), pano('J1TCFhzakKX2wiHsdsUgGQ', 220, 10, 80)],
  colours: { wall: '#ece8da', trim: '#2f6b63', frame: '#2f6b63', glass: '#3e4a4c', pier: '#ece8da', back: '#ece8da' },
  windows: [{ u: [4.87, 5.87], h: [3.36, 4.55], panes: 2 }, { u: [6.37, 7.37], h: [3.36, 4.55], panes: 2 }, { u: [3.47, 4.17], h: [3.3, 4.3], panes: 1 }, { u: [4.5, 7.6], h: [1.36, 2.36], panes: 6 }],
  blocks: [
    { name: 'fretwork eaves band', u: [1.6, 8.0], h: [4.64, 4.95], out: .05, depth: .04, colour: '#4d4a42' },
    { name: 'teal fascia', u: [1.4, 8.2], h: [5.05, 5.25], out: .45, depth: .9, colour: '#2f6b63' },
    { name: 'lower south wing eaves', u: [1.5, 3.97], h: [4.3, 4.45], out: .4, depth: .8, colour: '#9c5a46' },
    { name: 'north passage canopy', u: [7.97, 8.75], h: [4.2, 4.3], out: .5, depth: 1.0, colour: '#cfd2cf' },
    { name: 'yard wall', u: [0, 8.77], h: [0, 1.75], out: 2.2, depth: .2, colour: '#e9e6dc' },
    { name: 'teal yard gate', u: [.1, 1.6], h: [.05, 1.75], out: 2.2, depth: .22, colour: '#2f6b63' },
    { name: 'fence rail', u: [0, 8.77], h: [2.65, 2.7], out: 2.2, depth: .04, colour: '#b8bcb8' },
    ...Array.from({ length: 58 }, (_, i) => ({ name: 'fence bar', u: [.08 + i * .15, .11 + i * .15], h: [1.75, 2.7], out: 2.2, depth: .02, colour: '#b8bcb8' })),
  ],
  board: { u: [4.32, 7.95], h: [2.5, 3.15], out: .03 },
};

// The conserved row at Nos. 3-9 shares the row module measured at No. 7; each house supplies
// its own bays (u north from the south party line) and ground floor.
const rowHouse = (number, extra) => unnamed(number, { row: true, height: row13.height, ridgeHeight: row13.ridgeHeight, ridgeDepth: row13.ridgeDepth, eavesOverhang: row13.eavesOverhang, fiveFootWay: row13.fiveFootWay, ceiling: 3.28, ...extra });

export const no9South = rowHouse('9', {
  id: 'l13-9s', buildingIds: ['1223773756'],
  name: 'No. 9 Lorong 13 Geylang, southern house (April 2024 exterior, occupant not identified)', address: '9 Lorong 13 Geylang (southern of two houses tagged No. 9)',
  evidence: 'The southern of the two source ways tagged No. 9, between Hong Ye Chen (No. 7) and the Mister Contracts house. April 2024 Street View shows a free-standing MC Multi Skills banner and a vending machine in its five-foot way, but no fixed sign; Expert Sliding Door Repair SG is listed at 9 Lor 13 #01-01 without a matching sign. No name is given. It shares the row elevation measured at No. 7: shuttered windows either side of a full-height French window, floral tile panels under the outer windows and the fretwork eaves, read on a square-on frame at the row\'s 0.5 m forward depth. A full-height white grille closes the five-foot way, as next door. The banner, vending machine and interior are not reconstructed.',
  sources: [way('1223773756'), pano('uh9Y_1rGJSeI8vjJVZDDHg', 290, 8, 60), pano('HaY-y7EfW3SXOm-83rKMAw', 230, 8, 60)],
  bays: { windows: [[.65, 1.69, 5.41, 7.49], [2.09, 3.36, 4.2, 7.49], [3.63, 4.83, 5.41, 7.49]], pilasters: [[0, .55], [1.69, 2.09], [3.36, 3.63], [4.83, 5.01]], tilesUnder: [0, 2], piers: [[.25, .5], [4.81, .4]], floor: '#b9a98c' },
  ground: [
    { name: 'grille rail', u: [.5, 4.6], h: [3.12, 3.18], out: -.05, depth: .05, colour: '#f1f0eb' }, { name: 'grille rail', u: [.5, 4.6], h: [2.02, 2.08], out: -.05, depth: .05, colour: '#f1f0eb' },
    ...Array.from({ length: 22 }, (_, i) => ({ name: 'grille bar', u: [.55 + i * .185, .585 + i * .185], h: [.1, 3.15], out: -.05, depth: .035, colour: '#f1f0eb' })),
    { name: 'dark shop interior', u: [.3, 4.7], h: [.1, 3.2], out: -1.46, depth: .03, colour: '#2d2c2a' },
  ],
});

export const no3 = rowHouse('3', {
  id: 'l13-3', buildingIds: ['1223773753'],
  evidence: 'Source way 1223773753 is tagged No. 3, between Bar @ Lorong 13 (No. 1) and K Group (No. 5), and April 2024 Street View shows the plate 3 over its glass door. River Ash Bakery is listed at 3 Lor 13, but no bakery sign appears in captures from 2018 to April 2024, so no name is given. It shares the row elevation measured at No. 7: three tall windows with fretwork transoms between pilasters, the middle one full height, and floral tile panels under the outer two, read on a square-on frame at the row\'s 0.5 m forward depth. A maroon awning shades a roller shutter, the glass door and a timber door, with two condensers on the beam. The chest freezer, plants and interior are not reconstructed.',
  sources: [way('1223773753'), pano('f-IHSXdP88-BA3LwDO6R0Q', 252, 8, 60), pano('pX6bAWhW7vPxweoZ77FCbg', 252, 8, 60), 'https://www.google.com/maps/search/?api=1&query=River+Ash+Bakery+3+Lorong+13+Geylang'],
  bays: { windows: [[.91, 1.91, 5.41, 7.49], [2.24, 3.34, 4.5, 7.49], [3.6, 4.75, 5.41, 7.49]], pilasters: [[0, .7], [1.91, 2.24], [3.34, 3.6], [4.75, 5.01]], tilesUnder: [0, 2], piers: [[.25, .5], [4.81, .4]], floor: '#a9a39a' },
  ground: [
    { name: 'roller shutter', u: [1.3, 2.5], h: [.1, 2.6], out: -1.46, depth: .03, colour: '#b4b6b2' },
    { name: 'glass door', u: [2.58, 3.58], h: [.1, 2.5], out: -1.46, depth: .03, colour: '#56656b', glow: .05 },
    { name: 'timber door', u: [3.9, 4.78], h: [.1, 2.4], out: -1.46, depth: .03, colour: '#9a5a3a' },
    { name: 'condenser', u: [.85, 1.45], h: [2.55, 3.0], out: -.35, depth: .3, colour: '#e9e9e4' },
    { name: 'condenser', u: [4.25, 4.7], h: [2.6, 2.95], out: -.35, depth: .3, colour: '#e9e9e4' },
  ],
  awning: { from: .7, to: 4.91, wall: 3.4, front: 2.9, depth: .9, colour: '#93384a' },
});

// The single-storey row at Nos. 20-28 (east side) shares No. 22's measured form. Frames were rectified
// about 1 m behind the source front, where three panoramas agree; u runs south from each north party line.
const rowShop = (extra) => ({ single: true, frontEdge: 2, reviewRoad: 'Lorong 13 Geylang', height: singleRow.height, ridgeHeight: singleRow.ridgeHeight, ridgeDepth: singleRow.ridgeDepth, eavesOverhang: singleRow.eavesOverhang, ...extra });
const eastRowDepth = 'Party lines read on frames rectified about 1 m behind the source front, where three April 2024 panoramas agree, fall within about 0.3 m of the source subdivision. The house shares the single-storey form measured at No. 22 (Plus Mobile): a short tiled front slope over a dark rear roof and a steel lattice canopy over a tiled walkway.';

export const no28 = rowShop({ ...unnamed('28', {}), frontEdge: 2,
  id: 'l13-28', buildingIds: ['1223454584'], coping: 'b',
  evidence: 'Source way 1223454584 is tagged No. 28, at the north end of the single-storey row, and April 2024 Street View shows plate 28 between a blue-framed door and a display window. Its glazing carries Wunderfolks tart posters, but Wunderfolks published its address as No. 26 next door, and Ganh Xua (GX) Minimart, listed here as temporarily closed, has no sign, so no name is given; the posters are blank panels. ' + eastRowDepth + ' The salmon party-wall coping on its south side recurs every second party line.',
  sources: [way('1223454584'), pano('I_hhtdchIOdknrryrI3yng', 71.5, 0, 90), pano('io0FBYoICWg1rVxKcWqTJQ', 100, 5, 80)],
  front: [
    { name: 'blue door frame', u: [.46, 2.77], h: [0, 2.42], out: .03, depth: .06, colour: '#2a6fb5' }, { name: 'door glazing', u: [.56, 2.67], h: [.1, 2.32], out: .065, depth: .01, colour: '#3b4a55' },
    { name: 'blank poster', u: [1.55, 2.55], h: [.9, 2.2], out: .075, depth: .01, colour: '#e3d6c2' },
    { name: 'blue window frame', u: [3.14, 5.68], h: [.3, 2.31], out: .03, depth: .06, colour: '#2a6fb5' }, { name: 'window glazing', u: [3.24, 5.58], h: [.4, 2.21], out: .065, depth: .01, colour: '#3b4a55' },
    { name: 'blank poster', u: [3.3, 5.5], h: [.5, 2.1], out: .075, depth: .01, colour: '#d9b07a' },
  ],
  plate: { u: [2.86, 3.05], h: [2.45, 2.62], text: '28' },
});

export const wunderfolks = rowShop({
  id: 'wunderfolks', buildingIds: ['1223454585'], kind: 'wunderfolks', coping: null,
  name: 'Wunderfolks handmade tarts (April 2024 exterior)', address: '26 Lorong 13 Geylang',
  evidence: 'Time Out (27 September 2023) gives Wunderfolks, a handmade-tart bakery, at 26 Lor 13 Geylang, Singapore 388669, open daily for collection, and April 2024 Street View shows its blue WUNDERFOLKS board (HOME OF HANDMADE TARTS, www.wunderfolks.com) over the blue-framed door of the house on source way 1223454585, tagged No. 26. Google Maps now lists Wunderfolks only at 1 Kaki Bukit View, so this is a dated exterior that claims nothing about current use. ' + eastRowDepth + ' Posters, the fridge, stools and stock are not reconstructed.',
  sources: ['https://www.timeout.com/singapore/restaurants/wunderfolks', way('1223454585'), pano('I_hhtdchIOdknrryrI3yng', 71.5, 0, 90), pano('yo_MuatdX6WE9xNVY4PqBg', 71.5, 0, 90)],
  front: [
    { name: 'blue door frame', u: [.47, 2.84], h: [0, 2.12], out: .03, depth: .06, colour: '#2a6fb5' }, { name: 'door glazing', u: [.57, 2.74], h: [.1, 2.02], out: .065, depth: .01, colour: '#3b4a55' },
    { name: 'blank poster', u: [1.7, 2.65], h: [.6, 1.9], out: .075, depth: .01, colour: '#e3d6c2' },
  ],
  shutters: [{ at: [4.6, 5.7, 2.45], leaves: 1 }],
  board: { u: [.54, 3.54], h: [2.2, 2.9], out: .06 },
});

export const no24 = rowShop({ ...unnamed('24', {}), frontEdge: 2,
  id: 'l13-24', buildingIds: ['1223454586'], coping: null,
  evidence: 'Source way 1223454586 is tagged No. 24. April 2024 Street View shows a closed roller shutter and a key-cutting booth signed 配锁匙 / DUPLICATING under a small canopy. Bookland Library Services is listed open at No. 24, but no Bookland sign was seen and the key sign is a generic trade sign, so no name is given. ' + eastRowDepth + ' The booth\'s signs, keys and stock are not reconstructed.',
  sources: [way('1223454586'), pano('yo_MuatdX6WE9xNVY4PqBg', 71.5, 0, 90), 'https://www.google.com/maps/search/?api=1&query=Bookland+Library+Services+24+Lorong+13+Geylang'],
  shutters: [{ at: [.2, 2.38, 2.15], leaves: 1 }],
  front: [
    { name: 'dark shopfront', u: [2.5, 5.2], h: [0, 2.05], out: .02, depth: .03, colour: '#3a3330' },
    { name: 'key booth canopy', u: [2.5, 5.2], h: [2.05, 2.15], out: .4, depth: .8, colour: '#e9e6dd' },
    { name: 'key booth counter', u: [3.5, 4.8], h: [0, 1.5], out: .3, depth: .5, colour: '#e8e4dc' },
    { name: 'condenser', u: [1.25, 2.0], h: [2.25, 2.75], out: .2, depth: .3, colour: '#e9e9e4' }, { name: 'condenser', u: [3.87, 4.87], h: [2.25, 2.75], out: .2, depth: .3, colour: '#e9e9e4' },
  ],
});

export const no20 = rowShop({ ...unnamed('20', {}), frontEdge: 2,
  id: 'l13-20', buildingIds: ['1223454588'], coping: 'b',
  evidence: 'Source way 1223454588 is tagged No. 20, the south end of the single-storey row before an open yard. April 2024 Street View shows two closed roller shutters with plate 20 between them and a louvred panel above the first; no business sign was seen, so no name is given. ' + eastRowDepth + ' The salmon party-wall coping on its south side recurs every second party line.',
  sources: [way('1223454588'), pano('0lzllny6dnDfGwAbWWI8_Q', 71.5, 0, 90), pano('D4Uk9t7JuM7EbZHDIk3xog', 40, 5, 80)],
  shutters: [{ at: [.31, 2.31, 2.2], leaves: 1 }, { at: [2.85, 5.38, 2.3], leaves: 2 }],
  front: [{ name: 'louvred panel', u: [.4, 2.2], h: [2.45, 2.9], out: .03, depth: .04, colour: '#ecebe6' }, ...Array.from({ length: 5 }, (_, i) => ({ name: 'panel louvre', u: [.45, 2.15], h: [2.5 + i * .08, 2.53 + i * .08], out: .06, depth: .01, colour: '#a9aca8' }))],
  plate: { u: [2.4, 2.62], h: [1.95, 2.18], text: '20' },
});

// Houses whose upper block stands back from the source front over a single-storey strip: the upper
// block is a simple-house elevation on the inset outline (lorong13Outline), the strip is in the source frame.
const setbackColours = { wall: '#e9e7e0', trim: '#dcd9d0', frame: '#2d3033', glass: '#3a4245', back: '#2b2a28', pier: '#e9e7e0' };
const pairEvidence = 'The two-storey building over Nos. 16 and 18 has its upper storey about 1.2 m behind the ground-floor front, where three April 2024 panoramas agree, under one continuous weathered tiled roof with eaves at about 6.3 m. A tiled lean-to covers the ground floor of No. 16 and the south end of No. 18; a white steel canopy shelters the rest of No. 18\'s front.';

export const no18 = unnamed('18', {
  id: 'l13-18', buildingIds: ['1223454591'], frontEdge: 2,
  height: 6.27, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'gable', ridge: 8.0, ridgeDepth: .25, colour: '#6b5146', gable: '#e9e7e0' },
  evidence: 'Source way 1223454591 is tagged No. 18, south of the open yard that ends the single-storey row; no business sign was seen in April 2024, so no name is given. ' + pairEvidence + ' Under the canopy are a dark recessed ground floor and parked cars; one dark window and service pipes mark the upper wall. The roof ridge, set about 4 m back, is estimated; cars, lanterns and the interior are not reconstructed.',
  sources: [way('1223454591'), pano('8k_BeNJ16snqOq6gubtsYw', 71, 0, 90), pano('D4Uk9t7JuM7EbZHDIk3xog', 100, 10, 80), pano('J1TCFhzakKX2wiHsdsUgGQ', 45, 10, 80)],
  colours: setbackColours,
  windows: [{ u: [2.64, 4.09], h: [4.78, 5.55], panes: 2 }],
  blocks: [{ name: 'eaves fascia', u: [0, 5.81], h: [6.15, 6.3], out: .3, depth: .6, colour: '#5b4a40' }],
  setback: {
    depth: 1.2,
    canopy: { u: [0, 4.1], wall: 4.4, front: 3.8, out: 2.0, colour: '#cfd2cf', posts: [.2, 3.9] },
    leanTo: { u: [4.1, 5.81], low: 3.05, high: 4.67, colour: '#6b5146' },
    front: [
      { name: 'front wall', u: [4.1, 5.81], h: [.13, 3.05], out: -.07, colour: '#e9e7e0' },
      { name: 'glass sliding door', u: [5.0, 5.81], h: [.1, 2.6], colour: '#4b5a5e', glow: .05 },
      { name: 'grey-blue awning', u: [4.1, 5.81], h: [3.0, 3.1], out: .35, depth: .7, colour: '#9fb3bf' },
    ],
  },
});

export const no16 = unnamed('16', {
  id: 'l13-16', buildingIds: ['1223454590'], frontEdge: 2,
  height: 6.27, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'gable', ridge: 8.0, ridgeDepth: .25, colour: '#6b5146', gable: '#e9e7e0' },
  evidence: 'Source way 1223454590 is tagged No. 16. April 2024 Street View shows a glass sliding door, a dark doorway and a yellow barber shopfront under grey-blue and pink corrugated awnings. A barber shop is listed at 16 Lor 13 Geylang without a trading name, and Kum Huat Shoe Merchant is listed at 16 Lor 11, not here; no name is given and the barber poster is a blank panel. ' + pairEvidence + ' A small window and a timber hatch mark the upper wall. The roof ridge is estimated; chairs, plants and the interior are not reconstructed.',
  sources: [way('1223454590'), pano('8k_BeNJ16snqOq6gubtsYw', 71, 0, 90), pano('J1TCFhzakKX2wiHsdsUgGQ', 60, 10, 80)],
  colours: setbackColours,
  windows: [{ u: [.1, .5], h: [4.67, 5.13], panes: 1 }],
  blocks: [
    { name: 'eaves fascia', u: [0, 5.81], h: [6.15, 6.3], out: .3, depth: .6, colour: '#5b4a40' },
    { name: 'timber hatch', u: [2.29, 2.79], h: [4.55, 5.1], out: .02, depth: .03, colour: '#9a6a3c' },
  ],
  setback: {
    depth: 1.2,
    leanTo: { u: [0, 5.81], low: 3.05, high: 4.67, colour: '#6b5146' },
    front: [
      { name: 'front wall', u: [0, 5.81], h: [.13, 3.05], out: -.07, colour: '#e9e7e0' },
      { name: 'glass sliding door', u: [0, 1.19], h: [.1, 2.6], colour: '#4b5a5e', glow: .05 },
      { name: 'dark doorway', u: [2.19, 3.19], h: [.1, 2.4], colour: '#2a2826' },
      { name: 'yellow shopfront', u: [3.19, 5.59], h: [.1, 2.9], colour: '#e8c43a' },
      { name: 'blank poster', u: [3.4, 4.1], h: [1.2, 2.2], out: .05, colour: '#f2efe8' },
      { name: 'shop window', u: [4.5, 5.3], h: [.9, 2.3], out: .05, colour: '#56656b', glow: .05 },
      { name: 'grey-blue awning', u: [0, 1.19], h: [3.0, 3.1], out: .35, depth: .7, colour: '#9fb3bf' },
      { name: 'pink awning', u: [1.19, 5.81], h: [2.95, 3.05], out: .35, depth: .7, colour: '#d98a86' },
    ],
  },
});

const railing = (u, h) => [{ name: 'balcony railing', u, h: [h[1] - .06, h[1]], out: .35, depth: .05, colour: '#f1f0eb' }, ...Array.from({ length: Math.floor((u[1] - u[0]) / .14) }, (_, i) => ({ name: 'railing bar', u: [u[0] + .05 + i * .14, u[0] + .08 + i * .14], h, out: .35, depth: .03, colour: '#f1f0eb' }))];
const balconyWall = (u, h) => ({ name: 'balcony wall', u, h, out: .35, depth: .12, colour: '#e3dfd6' });

export const no12a = unnamed('12A', {
  id: 'l13-12a', buildingIds: ['1223454589'], frontEdge: 2,
  height: 14.4, ceiling: 3.6, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#cfccc4' },
  evidence: 'Source way 1223454589 is tagged 12A and spans three bays south of No. 16. April 2024 Street View shows a five-storey apartment block, its flat roof filling the source outline on satellite imagery, behind a white front wall with a slatted brown gate and a planted bed. Brilliant Electronics S\'pore (1989) is listed at 14A Lor 13 with its point in this way, but no sign was seen, so no name is given. The upper storeys stand about 2 m behind the front wall, where the J1TC and 8U4Z panoramas agree; heights were read at that depth and carry several per cent of uncertainty. Grilled first-floor windows sit under a tiled eave band, then two storeys of balconies with white railings under striped awnings, a deep parapet at about 14.4 m and a rooftop railing. Plants, the mailbox and interiors are not reconstructed.',
  sources: [way('1223454589'), pano('J1TCFhzakKX2wiHsdsUgGQ', 72, 18, 100), pano('8U4ZM41vQ-4RzwAUOCWcrg', 40, 15, 90), 'https://www.google.com/maps/search/?api=1&query=Brilliant+Electronics+14A+Lorong+13+Geylang'],
  colours: { wall: '#e8e4da', trim: '#ddd8cc', frame: '#2b2f31', glass: '#3c4549', back: '#d8d3c8', pier: '#e8e4da', floor: '#a9a59c' },
  bands: [[3.6, 3.9, .3], [6.95, 7.3, .5, '#b36b52'], [9.95, 10.1, .3], [12.7, 14.4, .25, '#e3dfd6']],
  windows: [{ u: [1.4, 6.9], h: [5.0, 6.35], panes: 8 }, { u: [11.4, 15.6], h: [5.0, 6.35], panes: 6 }, { u: [1.0, 16.4], h: [7.95, 9.6], panes: 10, out: .02 }, { u: [1.0, 16.4], h: [11.2, 12.6], panes: 10, out: .02 }],
  blocks: [
    ...railing([4.8, 7.4], [6.85, 7.95]), ...railing([10.9, 12.4], [6.85, 7.95]), balconyWall([.4, 4.8], [6.85, 7.95]), balconyWall([7.4, 10.9], [6.85, 7.95]), balconyWall([12.4, 16.6], [6.85, 7.95]),
    ...railing([4.9, 7.4], [10.1, 11.2]), ...railing([10.0, 12.4], [10.1, 11.2]), balconyWall([.4, 4.9], [10.1, 11.2]), balconyWall([7.4, 10.0], [10.1, 11.2]), balconyWall([12.4, 16.6], [10.1, 11.2]),
    { name: 'striped awning', u: [.4, 16.6], h: [8.8, 9.0], out: .7, depth: 1.3, colour: '#b9b2a2' }, { name: 'striped awning', u: [.4, 16.6], h: [11.95, 12.15], out: .7, depth: 1.3, colour: '#b9b2a2' },
    { name: 'roof railing', u: [.2, 17.2], h: [15.1, 15.16], out: -.1, depth: .05, colour: '#5a4a46' },
    ...Array.from({ length: 12 }, (_, i) => ({ name: 'railing post', u: [.25 + i * 1.5, .3 + i * 1.5], h: [14.4, 15.15], out: -.1, depth: .05, colour: '#5a4a46' })),
  ],
  setback: {
    depth: 2.0,
    front: [
      { name: 'front wall', u: [0, 1.8], h: [0, 2.0], colour: '#ecebe5' }, { name: 'gate pillar', u: [6.1, 6.8], h: [0, 2.2], colour: '#ecebe5' },
      { name: 'garden wall', u: [6.8, 17.44], h: [0, 1.4], colour: '#ecebe5' },
      { name: 'slatted gate', u: [1.8, 6.1], h: [.05, 2.0], out: .05, depth: .06, colour: '#5a4234' },
      ...Array.from({ length: 14 }, (_, i) => ({ name: 'gate slat', u: [1.9 + i * .3, 2.0 + i * .3], h: [.1, 1.95], out: .1, depth: .03, colour: '#8a6a52' })),
      { name: 'planted bed', u: [6.9, 17.3], h: [0, .5], out: -.8, depth: 1.4, colour: '#4f6a3e' },
      ...Array.from({ length: 7 }, (_, i) => ({ name: 'shrub', u: [7.2 + i * 1.45, 8.2 + i * 1.45], h: [.5, 1.6], out: -.8, depth: 1.0, colour: '#3f5e35' })),
    ],
  },
});

// No. 96 Sims Avenue, the east corner of Lorong 13: its long face is on Lorong 13 (edge 5, u south from
// the Sims corner) and its short face on Sims Avenue (edge 0, u west from the east party wall).
const hood = (u, h = [7.05, 7.25]) => ({ name: 'window hood', u, h, out: .35, depth: .7, colour: '#e3e6e5' });
const shutterBay = u => ({ name: 'roller shutter', u, h: [.1, 2.7], colour: '#b9bbb6' });
export const sims96 = {
  id: 'sims-96', buildingIds: ['454254303'], kind: 'unnamed', unnamed: true, frontEdge: 5, reviewRoad: 'Lorong 13 Geylang',
  name: 'No. 96 Sims Avenue, Lorong 13 corner (April 2024 exterior, occupant not identified)', address: '96 Sims Avenue (Lorong 13 corner)',
  height: 7.7, ceiling: 3.0, fiveFootWay: 2.0,
  evidence: 'Source way 454254303 is tagged No. 96 Sims Avenue, three levels, and fills the east corner of Lorong 13. April 2024 Lorong 13 Street View shows a white two-storey Art Deco corner block with closed roller shutters behind a five-bay arcade of fluted piers with stained bases, and seven windows under thin concrete hoods and louvred vents on its Lorong 13 face. In November 2022 the corner traded as Gu Thai House under Union Energy Group awnings; by June 2024 the whole block was wrapped in hoarding and sound barriers, so the April 2024 state is modelled and no name is given. Three April 2024 panoramas agree with the arcade piers about 2 m in front of the source Lorong 13 face, by triangulation of the south pier; the source outline is kept and positions are scaled from the photographed 19.6 m face onto the source 20.98 m. Heights are read on the square-on frame and carry about ±0.3 m. The short Sims Avenue face follows the November 2022 capture with its signs omitted. The hoarding, signs and interior are not reconstructed.',
  sources: [way('454254303'), pano('TkVxod6FJdS-GoG9rWW7YQ', 100, 10, 90), pano('ChoF67Y2VEMaqvc2BplW8A', 75, 12, 100), pano('I_hhtdchIOdknrryrI3yng', 15, 0, 60), pano('c7liVC51Dfz3zrFqgzF7lw', 165, 12, 90), pano('_B2cTM1WvKqosc0_vduiqA', 160, 10, 100)],
  colours: { wall: '#e0e4e3', trim: '#e9ecea', frame: '#2f3437', glass: '#3e484c', pier: '#e4e7e5', back: '#d9dcd8', floor: '#b6b4ac' },
  bands: [[7.55, 7.7, .2], [3.9, 4.25, .35], [4.35, 4.45, .15]],
  windows: [[1.6, 3.5], [5.35, 7.3], [8.0, 10.0], [11.0, 13.05], [13.6, 15.5], [18.4, 19.8]].map(u => ({ u, h: [4.5, 6.0], panes: 3 })),
  vents: [[1.6, 3.5], [5.35, 7.3], [8.0, 10.0], [11.0, 13.05], [13.6, 15.5], [18.4, 19.8]].map(u => ({ u, h: [6.3, 6.65] })),
  blocks: [
    hood([.5, 4.1]), hood([4.3, 10.5]), hood([10.9, 17.4]), hood([18.0, 20.9]),
    { name: 'pilaster', u: [10.5, 11.0], h: [4.45, 7.55], out: .05, depth: .1, colour: '#e9ecea' },
    ...[[0, .6], [4.3, 4.9], [9.6, 10.25], [15.4, 16.0], [20.2, 20.98]].map(u => ({ name: 'stained pier base', u, h: [0, 1.6], out: -.2, depth: .42, colour: '#8a5d3e' })),
  ],
  piers: [[0, .6], [4.3, 4.9], [9.6, 10.25], [15.4, 16.0], [20.2, 20.98]],
  backFittings: [shutterBay([.7, 4.2]), shutterBay([5.0, 9.5]), shutterBay([10.35, 15.3]), shutterBay([16.1, 20.1])],
  awning: { from: .7, to: 4.2, wall: 2.95, front: 2.4, depth: 1.6, valance: .2 },
  side: {
    edge: 0, opening: { u: [.8, 6.0], h: [.13, 2.9] },
    blocks: [
      { name: 'Sims Avenue window', u: [1.46, 3.56], h: [4.5, 6.0], out: .03, depth: .04, colour: '#3e484c' },
      { name: 'Sims Avenue corner window', u: [5.9, 6.5], h: [4.5, 6.0], out: .03, depth: .04, colour: '#3e484c' },
      { name: 'Sims Avenue vent', u: [1.46, 3.56], h: [6.3, 6.65], out: .03, depth: .04, colour: '#8b8f8d' },
      { name: 'Sims Avenue window hood', u: [1.06, 4.06], h: [7.05, 7.25], out: .35, depth: .7, colour: '#e3e6e5' },
      { name: 'Sims Avenue corner hood', u: [5.5, 6.66], h: [7.05, 7.25], out: .35, depth: .7, colour: '#e3e6e5' },
      { name: 'Sims Avenue cornice', u: [0, 6.66], h: [3.9, 4.25], out: .17, depth: .35, colour: '#e9ecea' },
    ],
  },
};

// No. 269 Geylang Road, the west corner of Lorong 13: a conserved two-storey corner coffeeshop. Its long
// Lorong 13 face is the modelled front (edge 1, u south from the source way's north end to the corner);
// the 5.13 m Geylang Road face is the side (edge 0, u east from the corner).
const stripedBase = u => [{ name: 'red column base', u, h: [0, 1.15], out: -.2, depth: .44, colour: '#c8322d' }, ...[.42, .78].map(y => ({ name: 'white base band', u: [u[0] - .01, u[1] + .01], h: [y, y + .1], out: -.2, depth: .46, colour: '#f1efe9' }))];
export const no269 = {
  id: 'gr-269-corner', buildingIds: ['454254219'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Lorong 13 Geylang',
  name: 'No. 269 Geylang Road, Lorong 13 corner coffeeshop (April 2024 exterior, occupant not identified)', address: '269 Geylang Road (Lorong 13 corner)',
  height: 8.4, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 10.6, colour: '#8e5a46' },
  evidence: 'Unnumbered source way 454254219 is the Lorong 13 corner of the Geylang Road row, west of Golden Jade (No. 271), and counts as No. 269. Hong Wah Coffee Shop and Geylang Food Corner are listed open there, while the April and June 2024 frontage shows Khim Seng gas awnings, a 麻辣空间 board and the closed BN Food Palace\'s board, so the listings and signs conflict and no name is given; boards are blank and the supplier awnings plain. The building is a conserved two-storey corner shophouse: arched windows with fanlights and green louvred shutters in pairs between pilasters with Corinthian capitals, a moulded frieze, a hipped tiled roof with a corner gablet, and a coffeeshop under the five-foot way behind columns with red-and-white striped bases. The photographed building continues about 13.5 m north along Lorong 13, beyond the source way, as a further two-storey bay and a single-storey wing with a balustraded parapet; that part needs an authored footprint (open question 21) and is not built. Heights were read on a square-on April 2024 frame and scaled so the eaves sit at about 8.4 m, with the frame\'s along-street positions scaled about the camera to match; three panoramas and satellite imagery put the face 2-4 m in front of the source line, so positions carry about ±0.5 m. Tables, crates, railings and the interior are not reconstructed.',
  sources: [way('454254219'), pano('KZ8gY_VJ15F7O0jKFFNB8w', 60, 12, 100), pano('DHtc5rApLUxTA9opxcXm8A', 75, 15, 100), pano('pE_LD86BSAb8LSBZLrANuA', 75, 10, 100), 'https://www.google.com/maps/search/?api=1&query=Hong+Wah+Coffee+Shop+269+Geylang+Road'],
  colours: { wall: '#eceae3', trim: '#e2ddd0', frame: '#5f7a4a', glass: '#3a4245', pier: '#efeee9', back: '#6e2a26', floor: '#b8b5ad' },
  bands: [[8.25, 8.4, .5, '#6b4b3e'], [7.55, 7.75, .25], [5.46, 5.62, .2], [4.2, 4.7, .3]],
  windows: [[4.38, 5.69], [6.72, 7.94], [10.2, 11.58], [12.08, 13.01]].map(u => ({ u, h: [5.62, 7.3], panes: 2, arched: true, shutters: true })),
  vents: [{ u: [.3, .8], h: [6.9, 7.3] }, { u: [1.7, 2.2], h: [6.9, 7.3] }],
  pilasters: [[2.62, 3.2, 4.7, 7.55], [8.96, 9.5, 4.7, 7.55], [14.15, 14.72, 4.7, 7.55]],
  blocks: [
    { name: 'moulded frieze', u: [0, 14.72], h: [7.75, 8.25], out: .02, depth: .04, colour: '#e6e2d6' },
    ...[[2.62, 3.2], [8.96, 9.5], [14.15, 14.72]].map(([l, r]) => ({ name: 'pilaster capital', u: [l - .05, r + .03 > 14.72 ? 14.72 : r + .05], h: [7.3, 7.6], out: .1, depth: .2, colour: '#e2ddd0' })),
    ...stripedBase([2.62, 3.2]), ...stripedBase([8.96, 9.5]), ...stripedBase([14.15, 14.72]),
  ],
  piers: [[2.62, 3.2], [8.96, 9.5], [14.15, 14.72]],
  backFittings: [
    { name: 'red coffeeshop doors', u: [.4, 2.5], h: [.1, 3.2], colour: '#a8302a' }, { name: 'open coffeeshop front', u: [3.3, 8.8], h: [.1, 3.4], colour: '#3b2522' },
    { name: 'open coffeeshop front', u: [9.6, 14.0], h: [.1, 3.4], colour: '#3b2522' }, { name: 'grey tile dado', u: [.4, 14.0], h: [.1, 1.0], colour: '#8d8f8e', out: .02 },
  ],
  awning: { from: .2, to: 14.3, wall: 4.3, front: 3.2, depth: 2.2, valance: .45 },
  side: {
    edge: 0, opening: { u: [.5, 4.9], h: [.13, 3.4] }, awning: { from: .3, to: 4.95, wall: 4.3, front: 3.9, depth: .7, valance: .3 },
    blocks: [
      { name: 'Geylang Road arched window', u: [1.0, 2.1], h: [5.62, 7.3], out: .03, depth: .04, colour: '#3a4245' }, { name: 'Geylang Road arched window', u: [2.9, 4.0], h: [5.62, 7.3], out: .03, depth: .04, colour: '#3a4245' },
      ...[[.7, 1.0], [2.1, 2.4], [2.6, 2.9], [4.0, 4.3]].map(u => ({ name: 'Geylang Road open shutter', u, h: [5.62, 7.3], out: .1, depth: .04, colour: '#5f7a4a' })),
      { name: 'blank red board', u: [.6, 4.4], h: [3.4, 4.3], out: .1, depth: .06, colour: '#a4282a' },
      { name: 'Geylang Road frieze', u: [0, 5.13], h: [7.55, 8.25], out: .05, depth: .1, colour: '#e6e2d6' },
      { name: 'Geylang Road floor band', u: [0, 5.13], h: [4.3, 4.7], out: .15, depth: .3, colour: '#e2ddd0' },
    ],
  },
};

export const lorong13 = [thirteenBbq, builderSmart, no15de, teckHoe, no9South, no3, no28, wunderfolks, no24, no20, no18, no16, no12a, sims96, no269];
/** The outline the elevation stands on: for a set-back place, the source outline with its front moved back. */
export function lorong13Outline(poly, place) {
  if (!place.setback) return poly;
  const f = frontageFrame(poly, place.frontEdge), d = place.setback.depth;
  return poly.map(p => p === f.a || p === f.b ? [p[0] - f.nx * d, p[1] - f.nz * d] : p);
}
export const lorong13Frame = (poly, place) => frontageFrame(lorong13Outline(poly, place), place.frontEdge);
export function lorong13Layout(place, width) {
  if (place.single) {
    const boxes = [], mid = (a, b) => (a + b) / 2;
    const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
    for (const sh of place.shutters ?? []) addShutter(add, sh.at, sh.leaves);
    for (const f of place.front ?? []) add(f.name, mid(...f.u), mid(...f.h), f.out ?? .03, f.u[1] - f.u[0], f.h[1] - f.h[0], f.depth ?? .03, f.colour, f.glow ?? 0);
    addRowFittings(add, width);
    return { boxes, canopy: { ...singleRow.canopy, from: 0, to: width }, brackets: rowBrackets([.35, 2.9, 5.45]), blades: [] };
  }
  if (!place.row) return simpleHouseLayout(width, place);
  const base = row13Layout(width, place.bays), mid = (a, b) => (a + b) / 2;
  for (const g of place.ground ?? []) base.add(g.name, mid(...g.u), mid(...g.h), g.out, g.u[1] - g.u[0], g.h[1] - g.h[0], g.depth ?? .03, g.colour, g.glow ?? 0);
  return base;
}
const reviewDistance = { 'gr-269-corner': [10, 14], 'sims-96': [12, 14], buildersmart: [12, 8], 'teck-hoe': [9, 12], 'l13-18': [10, 8], 'l13-16': [10, 8], 'l13-12a': [12, 24] };
export const lorong13Reviews = (place, frame) => facing(frame, place.id, ...(reviewDistance[place.id] ?? [7.5, 20]));
