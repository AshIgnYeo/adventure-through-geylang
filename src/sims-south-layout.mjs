// Infill on the Sims Avenue south row, from June 2024 Street View. Each frame faces Sims Avenue with
// u running west from the east party line; heights above the five-foot-way floor.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';
import { redDot, elevation as redDotElevation } from './red-dot-layout.mjs';
import { elevation as fslElevation } from './fsl-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;

// No. 120 shares FSL's three-storey type: its windows and vents fall at FSL's heights once read on the
// same five-foot-way datum, so FSL's vertical elevation is used with No. 120's own window positions.
const F = fslElevation;
export const yapSun = {
  id: 'yap-sun', buildingIds: ['682928761'], kind: 'yap-sun', frontEdge: 4, reviewRoad: 'Sims Avenue',
  name: 'Yap Sun Hardware (June 2024 exterior)', address: '120 Sims Avenue',
  height: 10.8, ceiling: F.ceiling, fiveFootWay: 2.3,
  evidence: 'June 2024 Street View shows a blue awning lettered YAP SUN HARDWARE over a glazed hardware shop on the source way tagged No. 120, between FSL EW LED Lighting (No. 118) and Thye Seng (No. 122). Google Maps lists Yap Sun Hardware Mfy at 105 Sims Ave, #04-09 Chancerlodge Complex, so under the owner\'s answer to open question 12 the signed shop is modelled as a dated exterior, without claiming the company is there now. Read on two June 2024 panoramas rectified 3.25 m in front of the source front, the depth found at FSL and Thye Seng; the source front is kept, as for its neighbours (open question 9). The upper storeys share FSL\'s type: two windows in tan surrounds on each floor under louvred vents, at FSL\'s heights. Stock, the interior and the neighbouring signs are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Yap+Sun+Hardware', way('682928761'), pano('2Ajok7bnMLxnkcW7PuS2sQ', 165, 10, 80), pano('u8Gt4GPB01nNd4_FoWchUQ', 200, 10, 80)],
  colours: { wall: '#e9e2d3', trim: '#c8a36a', frame: '#3a3f42', glass: '#4b585d', pier: '#ece7dc', back: '#e8e5de', floor: '#a49e95' },
  bands: [[F.parapetBand[0], 10.8, .25, '#e2dccd'], [F.cornice[0], F.cornice[1], .3, '#e2dccd'], [F.slab[0], F.slab[1], .3, '#e2dccd']],
  windows: [[1.14, 3.25], [4.36, 6.3]].flatMap(u => [{ u, h: [4.69, 6.09], panes: 3, surround: true }, { u, h: [7.95, 9.38], panes: 3, surround: true }]),
  vents: [[1.14, 3.25], [4.36, 6.3]].flatMap(u => [{ u, h: [6.24, 6.59] }, { u, h: [9.59, 10.02] }]),
  piers: [[0, .4], [6.0, 6.42]],
  awning: { from: .4, to: 6.0, wall: 3.15, front: 2.75, depth: 1.6, valance: .4 },
  backFittings: [{ name: 'glazed hardware shop', u: [.5, 5.9], h: [.1, 2.95], colour: '#b7c2c4', glow: .15 }, { name: 'shop door', u: [3.0, 4.0], h: [.1, 2.4], colour: '#5c6a6e', out: .02 }],
};

// No. 106 continues Red Dot's pink row: Red Dot's storey heights, with No. 106's own window bays
// read on two June 2024 panoramas and scaled to its 8.71 m re-spaced frontage.
const R = redDotElevation;
const no106Bays = { narrow: [[.37, .71], [1.48, 2.01], [2.87, 3.37], [7.42, 7.79]], pair: [[4.26, 5.21], [5.62, 6.46]] };
export const no106 = {
  id: 'sa-106', buildingIds: ['sa-106'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Sims Avenue',
  name: 'No. 106 Sims Avenue (June 2024 exterior, occupant not identified)', address: '106 Sims Avenue',
  height: redDot.height, ceiling: redDot.ceiling, fiveFootWay: 2.0,
  evidence: 'The re-spaced No. 106 footprint (open question 8a), between Fok Wai Kee (No. 104) and Red Dot Running (No. 108). Amrise Foodstuffs is listed at 106 Sims Ave, but no sign was seen, so no name is given. June 2024 Street View shows the same pale-pink row as Red Dot and Amrise: on each upper floor four narrow windows and a pair under a long hood, each under its own red-brown hood, over a roller shutter, a timber door and an open shop between white columns. Two panoramas rectified at the row\'s 1.5 m depth disagree with Red Dot\'s storey spacing by about 17%, so Red Dot\'s heights are kept for a continuous row and No. 106\'s window positions are scaled by the same factor; positions carry about ±0.3 m. Bins and the interior are not reconstructed.',
  sources: [way('682928753'), pano('dlOjQqSYnwdfAHzJaa1kqQ', 160, 10, 80), pano('f3PAOh05dGmjZW4CdsBN2Q', 200, 10, 80)],
  colours: redDot.colours,
  bands: redDot.bands,
  windows: [...no106Bays.narrow, ...no106Bays.pair].flatMap(u => [{ u, h: R.floor2, panes: 2 }, { u, h: R.floor3, panes: 2 }]),
  blocks: [[...no106Bays.narrow.map(([l, r]) => [l - .2, r + .2]), [4.06, 6.66]]].flat().flatMap(([l, r]) => [R.floor2Hood, R.floor3Hood].map(h => ({ name: 'window hood', u: [Math.max(0, l), Math.min(8.71, r)], h, out: .2, depth: .4, colour: '#b98d82' }))),
  piers: [[0, .45], [5.6, 6.2], [8.2, 8.71]],
  backFittings: [
    { name: 'roller shutter', u: [3.8, 5.5], h: [.1, 2.9], colour: '#c9ccc7' }, { name: 'timber door', u: [6.3, 6.85], h: [.1, 2.5], colour: '#5a3a2a' },
    { name: 'open shop', u: [.5, 3.6], h: [.1, 3.0], colour: '#33373a' },
  ],
};

export const simsSouth = [yapSun, no106];
export const simsSouthFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const simsSouthLayout = (place, width) => simpleHouseLayout(width, place);
export const simsSouthReviews = (place, frame) => facing(frame, place.id, 10, 16);
