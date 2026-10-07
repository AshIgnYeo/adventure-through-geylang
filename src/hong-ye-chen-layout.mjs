// April 2024 street exterior of No. 7 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { row13, row13Layout } from './row13-layout.mjs';

export const hongYeChen = {
  id: 'hong-ye-chen', buildingIds: ['1223773755'], kind: 'hong-ye-chen',
  name: 'Hong Ye Chen Interior Design (April 2024 exterior)', address: '7 Lorong 13 Geylang',
  ...{ height: row13.height, ridgeHeight: row13.ridgeHeight, ridgeDepth: row13.ridgeDepth, eavesOverhang: row13.eavesOverhang, frontEdge: row13.frontEdge, fiveFootWay: row13.fiveFootWay },
  reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists Hong Ye Chen Interior Design at 7 Lor 13 Geylang, Singapore 388645; its place point lies inside the source way tagged No. 7. April 2024 Street View shows door number 7 beside the glazed doors of this conserved two-storey shophouse, under a black signboard with three gold roundels reading 浤業成 and HONG YE CHEN INTERIOR DESIGN. The upper storey has a central French window between two tall windows, slender pilasters with capitals, floral tile panels and the timber fretwork eaves shared along the row. Mister Contracts shares the same Maps point and address, but its signage hangs on the houses to the north, so it is recorded and not assigned. Heights were measured from a square-on frame scaled by the 5.02 m frontage; the five-foot way depth and roof are estimates. The interior is not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Hong+Ye+Chen+Interior+Design+7+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223773755',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=251.4&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=245&pitch=-3&fov=40',
  ],
};

// u runs south (No. 5) to north (No. 9); out runs east towards Lorong 13.
export const hongYeChenFrame = poly => frontageFrame(poly, hongYeChen.frontEdge);

// Measured heights and positions, metres; the shared levels live in row13.
export const elevation = {
  ...row13,
  windows: [[.61, 1.80, 5.41, 7.49], [2.14, 3.37, 4.44, 7.54], [3.70, 4.88, 5.41, 7.49]],
  pilasters: [[0, .55], [1.82, 2.14], [3.37, 3.70], [4.88, 5.01]],
};

export function hongYeChenLayout(width) {
  const E = elevation;
  const base = row13Layout(width, { windows: E.windows, pilasters: E.pilasters, tilesUnder: [0, 2], piers: [[.2, .4], [width - .11, .2]] });
  const { add, D } = base, black = '#1c1d1f';
  // Fascia sign on the beam, and the recessed glazed shopfront.
  add('sign backing', 2.67, (E.sign[0] + E.sign[1]) / 2, .02, 4.1, E.sign[1] - E.sign[0], .06, black);
  for (const [l, r] of [[.81, 1.90], [3.88, 4.88]]) add('display window', (l + r) / 2, 1.85, -D + .04, r - l, 1.9, .03, '#3a4246');
  add('glazed double door', 2.92, 1.5, -D + .04, 1.29, 2.85, .03, '#2a3033');
  for (const u of [2.86, 2.98]) add('door pull', u, 1.4, -D + .07, .025, .7, .02, '#c49a3b');
  add('door number plate', 3.72, 1.2, -D + .045, .18, .24, .02, '#232425');
  return {
    ...base,
    sign: { left: .62, right: 4.72, bottom: E.sign[0], top: E.sign[1], out: .055 },
    blade: { u: width - .12, out: .35, top: 4.1, discs: 3, r: .2 },
    numberPlate: { u: 3.72, out: -D + .06, bottom: 1.09, top: 1.31, w: .16 },
  };
}

export function hongYeChenReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'hong-ye-chen', p: point(width / 2, 9.0), target: point(width / 2, 0), pitch: 18 },
    { id: 'hong-ye-chen-ground', p: point(width / 2 + .4, 4.6), target: point(width / 2, -.8), pitch: 8 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
