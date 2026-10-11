// June 2024 exterior of Red Dot Running Company, Sims Avenue Nos. 108–110, on the owner-approved re-spaced footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=8&fov=80`;
export const redDot = {
  id: 'red-dot-running', buildingIds: ['sa-108'], kind: 'red-dot-running',
  name: 'Red Dot Running Company (June 2024 exterior)', address: '108 Sims Avenue',
  height: 10.45, ceiling: 3.77, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Sims Avenue',
  evidence: 'Google Maps (about 213 reviews) and Time Out list Red Dot Running Company, a running store, at 108 Sims Avenue, Singapore 387432, open in October 2026. June 2024 Street View shows its shopfront glazing with mountain-silhouette decals, red-dot logos and running-wear mannequins, under a large 108 lettered on the central pier, in the pale-pink three-storey Art Deco row west of the Amrise Hotel. The shopfront runs from the 106/108 pier to Amrise across that pier, so the model stands on the owner-approved re-spaced footprint (open question 8a) that joins the former source Nos. 108 and 110 east of the measured 106/108 pier. The upper storeys repeat the row: narrow and paired windows under terracotta-coloured hoods. Heights were read on a ground-level frame rectified 1.5 m in front of the source front; the top floor and parapet are partly estimated, matching the Amrise height. The real façade stands about 1.5 m in front of the source front, where the model keeps it, as on the rest of this row (open question 9), so renders from street panoramas draw the upper storeys slightly small. Mannequins, stock and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Red+Dot+Running+Company+108+Sims+Avenue', 'https://www.timeout.com/singapore', 'https://www.openstreetmap.org/way/682928752', 'https://www.openstreetmap.org/way/682928751', pano('f3PAOh05dGmjZW4CdsBN2Q', 160), pano('YsOoBymJj446X2wJOG9R7w', 200)],
  colours: { wall: '#e9cbc9', trim: '#efdcda', frame: '#f4f2ef', glass: '#4d5a5e', pier: '#f1eeea', back: '#30383a', floor: '#a49e95' },
  bands: [[10.35, 10.45, .2], [3.77, 4.14, .35, '#efe6e2']],
};

// u runs west from the Amrise party line; the frame faces Sims Avenue.
export const redDotFrame = poly => frontageFrame(poly, 0);
export const elevation = {
  narrow: [[.03, .54], [5.31, 5.77], [7.0, 7.49]], pairs: [[1.67, 2.57], [3.22, 4.12], [8.63, 9.54], [10.22, 11.12]],
  hoods: [[.03, .71], [1.07, 4.31], [5.0, 6.03], [6.77, 7.85], [8.49, 11.89]],
  floor2: [5.28, 6.45], floor2Hood: [7.05, 7.18], floor3: [8.45, 9.6], floor3Hood: [9.95, 10.08],
  piers: [[0, .5], [5.67, 6.97], [11.65, 12.17]], columns: [1.1, 3.35, 4.9, 8.1, 10.4],
  numeral: { u: [5.6, 7.05], h: [2.86, 3.41] }, glazing: { h: [.6, 3.1] }, decal: [1.0, 2.0],
};

export function redDotLayout(width) {
  const E = redDot, M = elevation, cols = [...M.narrow, ...M.pairs];
  const layout = simpleHouseLayout(width, {
    ...E,
    windows: [...cols.map(u => ({ u, h: M.floor2, panes: 2 })), ...cols.map(u => ({ u, h: M.floor3, panes: 2 }))],
    piers: M.piers,
    boards: [{ ...M.numeral, out: .05 }],
    backFittings: [
      { name: 'shop glazing', u: [.6, width - .6], h: M.glazing.h, colour: '#3e4a4e', glow: .08 },
      { name: 'mountain decal band', u: [.6, width - .6], h: M.decal, colour: '#6f9a92', out: .03 },
      ...[2.2, 9.6].map(u => ({ name: 'red dot logo', u: [u - .18, u + .18], h: [2.45, 2.81], colour: '#d2332d', out: .04, glow: .2 })),
      ...[3.0, 8.9].map(u => ({ name: 'mannequin', u: [u - .2, u + .2], h: [.1, 1.8], colour: '#2c2c2e', out: .6, depth: .3 })),
    ],
  });
  for (const hood of [M.floor2Hood, M.floor3Hood]) for (const [l, r] of M.hoods) layout.boxes.push({ name: 'window hood', u: (l + r) / 2, y: (hood[0] + hood[1]) / 2, out: .2, w: r - l, h: .13, depth: .4, colour: '#b98d82', glow: 0 });
  for (const u of M.columns) layout.boxes.push({ name: 'shopfront column', u, y: M.glazing.h[1] / 2 + .3, out: -.25, w: .3, h: M.glazing.h[1] + .6, depth: .3, colour: '#f1eeea', glow: 0 });
  return layout;
}

export const redDotReviews = frame => facing(frame, 'red-dot-running', 9, 16);
