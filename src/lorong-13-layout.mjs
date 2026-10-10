// Lorong 13 Geylang exteriors not covered by an earlier single-place module, from April 2024 Street View
// unless stated. Each place is a measured simple-house elevation in its frontage frame: u along the front
// from frame.a, out towards the street, heights above the five-foot-way floor. Named places meet the
// listing-plus-signage bar; unnamed ones (open question 18) carry no business name and leave boards blank.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
// The west row north of Hainan Lim (Nos. 21-29) stands about 2.6 m in front of its source front line, by
// three-panorama triangulation and the ground line in two level frames. It is modelled on the source front
// (open question 20), so heights and widths were read on frames rectified at the measured depth.
const westRowOffset = 'Its photographed façade stands about 2.6 m in front of the source front line: three-panorama triangulation of its party lines gives 2.2-2.9 m, the façade base in two level frames gives 2.7-2.8 m, and the four-storey Nos. 21/23 block shows a side return beyond Hainan Lim. The model keeps the source front (open question 20) and was measured on frames rectified at the photographed depth.';

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

export const lorong13 = [thirteenBbq, builderSmart];
export const lorong13Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong13Layout = (place, width) => simpleHouseLayout(width, place);
export const lorong13Reviews = (place, frame) => facing(frame, place.id, place.id === 'buildersmart' ? 12 : 7.5, place.id === 'buildersmart' ? 8 : 22);
