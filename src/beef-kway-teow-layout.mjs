// June 2024 exterior of the Lorong 9 corner building, 237 Geylang Road, on its owner-approved footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=10&fov=100`;
export const beefKwayTeow = {
  id: 'lor-9-beef-kway-teow', buildingIds: ['gr-237'], kind: 'lor-9-beef-kway-teow',
  name: 'Geylang Lor 9 Beef Kway Teow 芽龍九巷牛肉河粉 (June 2024 exterior)', address: '237 Geylang Road (Lorong 9 corner)',
  height: 13.0, ceiling: 3.2, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists Lor 9 Beef Kway Teow, a hawker stall, at 237 Geylang Rd, Singapore 389296, open in October 2026. June 2024 Street View shows its red 芽龍九巷牛肉河粉 GEYLANG LOR 9 BEEF KWAY TEOW board, a 九巷牛河 LOR 9 BEEF KWAY TEOW board under raised 勝捷 lettering on the chamfered corner, and a red 牛河大王 blade sign, on the pink three-storey corner building at Lorong 9: green-shuttered windows under louvred vents and projecting hoods over a red ground storey with a five-foot way. It stands on the owner-approved authored footprint (open question 3), the western part of source way 454274485 up to the step in its outline, with a chamfer estimated from the junction views; the grey annex to its east is a separate generic footprint. Heights were read on rectified frames whose panorama poses carry about 2 m of along-street error, so they are approximate. The Lorong 9 face is laid out from oblique views. Furniture, stalls and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Lor+9+Beef+Kway+Teow+237+Geylang+Road', 'https://www.openstreetmap.org/way/454274485', pano('6WnI7_UoH2IqxCRJ-XI2BA', 60), pano('BPsxlk0ALSJFfWvTXn51NA', 15), pano('CRxDzspjrX6PxmNqInWfPw', 345)],
  colours: { wall: '#ebcdc7', trim: '#f1dcd7', frame: '#4f9a87', glass: '#6fb19d', pier: '#b9493a', back: '#3a332f', floor: '#9a5a49' },
  bands: [[12.9, 13.0, .2], [3.2, 4.75, .12, '#b9493a']],
  roof: { type: 'flat', colour: '#8a5a44' },
};

// u runs east from the chamfer to the step; the frame faces Geylang Road.
export const beefKwayTeowFrame = poly => frontageFrame(poly, 0);
export const floors = { lower: [5.0, 6.9], upper: [9.4, 11.35], vents: [[6.95, 7.25], [11.4, 11.7]], hoods: [7.25, 11.7] };
const bay = (u, w = 1.2) => [{ u: [u - w / 2, u + w / 2], h: floors.lower, panes: 2 }, { u: [u - w / 2, u + w / 2], h: floors.upper, panes: 2 }];

export function beefKwayTeowLayout(width) {
  const centres = [.2, .5, .8].map(f => width * f);
  const spec = {
    ...beefKwayTeow,
    windows: centres.flatMap(u => bay(u)),
    vents: centres.flatMap(u => floors.vents.map(h => ({ u: [u - .6, u + .6], h }))),
    piers: [[0, .45], [width / 2 - .2, width / 2 + .2], [width - .45, width]],
    board: { u: [width * .3, width * .92], h: [2.2, 3.1] },
    blades: [{ u: .6, out: [.2, .8], h: [5.6, 9.0] }],
    backFittings: [{ name: 'coffeeshop interior', u: [.5, width - .5], h: [.1, 3.1], colour: '#4a403a', glow: .05 }],
  };
  const layout = simpleHouseLayout(width, spec);
  for (const u of centres) for (const h of floors.hoods) layout.boxes.push({ name: 'window hood', u, y: h + .06, out: .3, w: 1.5, h: .12, depth: .6, colour: '#f3e3df', glow: 0 });
  return layout;
}

// Bays along the chamfer and the Lorong 9 face, from oblique views: one on the chamfer, eight along Lorong 9.
export const sideBays = { chamfer: [.5], lorong9: [1, 2, 3, 4, 5, 6, 7, 8].map(k => k / 9) };
export const beefKwayTeowReviews = frame => facing(frame, 'lor-9-beef-kway-teow', 10, 22, [{ id: 'lor-9-beef-kway-teow-corner', at: [-6, 7], look: [1, 0], pitch: 20 }]);
