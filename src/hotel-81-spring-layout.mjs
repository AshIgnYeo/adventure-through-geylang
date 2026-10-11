// April 2024 exterior of Hotel 81 Spring, 22 Lorong 15 Geylang, on its owner-approved partial-block footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=15&fov=90`;
export const hotel81Spring = {
  id: 'hotel-81-spring', buildingIds: ['l15-22'], kind: 'hotel-81-spring',
  name: 'Hotel 81 Spring (April 2024 exterior)', address: '22 Lorong 15 Geylang',
  height: 13.6, ceiling: 2.7, fiveFootWay: 1.6, frontEdge: 2, reviewRoad: 'Lorong 15 Geylang',
  evidence: 'Google Maps lists Hotel 81 Spring at 22 Lor 15 Geylang, Singapore 388619 (about 138 reviews, not marked closed; Hotel 22 Pte Ltd shares the address), and retained OSM node 4302906050 names Hotel 81 (Spring); the operator site no longer lists the property (its page returns 404 in October 2026), so current operation is uncertain and this is a dated exterior. April 2024 Street View shows the pale-blue hotel with a HOTEL 81 sign and a small SPRING plate over the entrance: arched and rectangular white-framed windows in three storeys above the ground floor, two vertical glass-block strips either side of the central bay, white pilasters and bands, and a central pediment with a round window. It stands on an owner-approved partial-block footprint (open question 11): about 16.2 m of the merged source block 454254281, measured by parallax across three panoramas. Heights were read on a rectified frame at the solved depth (about 0.55 m behind the source front) and are approximate; the top storey is partly estimated. The palm trees in the forecourt, cars and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Hotel+81+Spring+22+Lorong+15+Geylang', 'https://www.openstreetmap.org/node/4302906050', 'https://www.openstreetmap.org/way/454254281', pano('MgS1CqglRPN1fG9C_TToMA', 90), pano('4VkQxUB4x9mQmQdqDyRARQ', 60)],
  colours: { wall: '#a9bde3', trim: '#f3f4f6', frame: '#3f6f6a', glass: '#4c6870', pier: '#b7c8e8', back: '#334046', floor: '#9aa0a6' },
  bands: [[13.5, 13.6, .3], [3.2, 3.44, .25], [6.5, 6.7, .2]],
};

export const hotel81SpringFrame = poly => frontageFrame(poly, hotel81Spring.frontEdge);
// Measured along the source front from the block's north end; u = s - 13.0.
const u = ([a, b]) => [a - 13.0, b - 13.0];
export const elevation = {
  floors: [[4.3, 6.1], [7.4, 9.1], [10.3, 12.0]],
  columns: { left: u([15.2, 17.4]), centre: u([19.2, 22.0]), right: [u([24.0, 26.2]), u([26.5, 28.7])] },
  glassBlocks: [u([18.5, 19.0]), u([22.3, 22.7])], glassH: [3.8, 11.8],
  pilasters: [u([24.0, 24.2]), u([26.25, 26.45]), u([28.7, 28.9])],
  sign: { u: u([18.4, 22.5]), h: [2.76, 3.44] }, plate: { u: u([20.0, 20.66]), h: [2.48, 2.6] },
  canopy: { u: u([17.1, 23.7]), h: [3.44, 3.76], depth: .6 },
  pediment: { u: u([19.4, 21.8]), top: 15.5, circle: 14.5 },
  ground: [{ name: 'ground window', u: u([13.2, 14.6]), h: [1.8, 2.4] }, { name: 'service door', u: u([15.2, 16.0]), h: [.1, 2.4] }, { name: 'ground window', u: u([16.3, 17.4]), h: [1.0, 2.4] },
    { name: 'ground window', u: u([18.5, 19.7]), h: [1.0, 2.4] }, { name: 'lobby entrance', u: u([20.1, 22.7]), h: [.1, 2.6] }, { name: 'ground window', u: u([25.3, 26.5]), h: [1.0, 2.4] }, { name: 'ground window', u: u([26.9, 28.7]), h: [1.0, 2.4] }],
};

export function hotel81SpringLayout(width) {
  const E = elevation, cols = [E.columns.left, E.columns.centre, ...E.columns.right];
  const windows = E.floors.flatMap((h, i) => cols.map(c => ({ u: c, h, panes: 2, arched: i === 0 && c !== E.columns.centre || i === 2 && c === E.columns.left, surround: true })));
  const layout = simpleHouseLayout(width, {
    ...hotel81Spring, windows,
    pilasters: [...E.pilasters.map(([l, r]) => [l, r, 3.44, 13.5]), ...E.glassBlocks.map(([l, r]) => [l, r, E.glassH[0], E.glassH[1]])],
    piers: [[0, .3], [width - .3, width]],
    boards: [{ ...E.sign, out: E.canopy.depth + .02 }, { ...E.plate, out: .04 }],
    backFittings: E.ground.map(g => ({ ...g, colour: g.name === 'lobby entrance' ? '#2a3338' : '#4c6870', glow: g.name === 'lobby entrance' ? .15 : 0, out: .02 })),
  });
  const add = (name, uu, y, out, w, h, depth, colour) => layout.boxes.push({ name, u: uu, y, out, w, h, depth, colour, glow: 0 });
  for (const [l, r] of E.glassBlocks) for (let y = E.glassH[0] + .1; y < E.glassH[1]; y += .25) add('glass block course', (l + r) / 2, y, .07, r - l, .02, .01, '#c9dadf');
  const C = E.canopy;
  add('entrance canopy', (C.u[0] + C.u[1]) / 2, (C.h[0] + C.h[1]) / 2, C.depth / 2, C.u[1] - C.u[0], C.h[1] - C.h[0], C.depth, '#f3f4f6');
  const P = E.pediment;
  for (let k = 0; k < 6; k++) { const y0 = hotel81Spring.height + (P.top - hotel81Spring.height) * k / 6, half = (P.u[1] - P.u[0]) / 2 * (1 - k / 7); add('pediment', (P.u[0] + P.u[1]) / 2, y0 + (P.top - hotel81Spring.height) / 12, .02, half * 2, (P.top - hotel81Spring.height) / 6, .2, '#a9bde3'); }
  add('pediment round window', (P.u[0] + P.u[1]) / 2, P.circle, .14, .7, .7, .04, '#f3f4f6');
  add('pediment round glass', (P.u[0] + P.u[1]) / 2, P.circle, .17, .5, .5, .02, '#4c6870');
  return layout;
}

export const hotel81SpringReviews = frame => facing(frame, 'hotel-81-spring', 9, 28);
