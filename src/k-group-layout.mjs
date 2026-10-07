// April 2024 street exterior of No. 5 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { row13, row13Layout } from './row13-layout.mjs';

export const kGroup = {
  id: 'k-group', buildingIds: ['1223773754'], kind: 'k-group',
  name: 'K Group (April 2024 exterior)', address: '5 Lorong 13 Geylang',
  height: row13.height, ridgeHeight: row13.ridgeHeight, ridgeDepth: row13.ridgeDepth, eavesOverhang: row13.eavesOverhang,
  frontEdge: row13.frontEdge, fiveFootWay: row13.fiveFootWay, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists K Group Pte Ltd at 5 Lor 13 Geylang, Singapore 388643; its place point falls in the street and is not used. April 2024 Street View shows a black board with a mirrored-K logo and K Group Pte Ltd over the door of the conserved house between No. 3, whose door plate reads 3, and No. 7, whose door plate reads 7, matching the source way tagged No. 5. The house shares the row elevation measured at No. 7: three tall windows between pilasters, floral tile panels under the outer windows, a plaster relief under the middle one and the timber fretwork eaves. Window positions were measured from an oblique frame with perspective correction; ground-floor positions and the five-foot way depth are estimates. Statues, plants and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=K+Group+Pte+Ltd+5+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223773754',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=f-IHSXdP88-BA3LwDO6R0Q&heading=275&pitch=10&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=218&pitch=1&fov=16',
  ],
};

// u runs south (No. 3) to north (No. 7); out runs east towards Lorong 13.
export const kGroupFrame = poly => frontageFrame(poly, kGroup.frontEdge);

export const elevation = {
  windows: [[.61, 1.59, 5.41, 7.49], [2.06, 3.03, 5.41, 7.49], [3.56, 4.55, 5.41, 7.49]],
  pilasters: [[0, .3], [1.59, 2.06], [3.03, 3.56], [4.55, 5.0]],
};

export function kGroupLayout(width) {
  const E = elevation;
  const base = row13Layout(width, { windows: E.windows, pilasters: E.pilasters, tilesUnder: [0, 2], reliefUnder: [1], piers: [[.15, .3], [width - .21, .4]], floor: '#b86a4a' });
  const { add, D } = base;
  // Recessed ground floor: two windows over pink tile dados, a dark door and a wall-mounted condenser.
  for (const [l, r] of [[.68, 1.34], [3.34, 4.37]]) {
    add('ground window', (l + r) / 2, 1.85, -D + .04, r - l, 1.5, .03, '#2f3538');
    add('tile dado', (l + r) / 2, .55, -D + .04, r - l + .1, .7, .02, '#d8a3a8');
  }
  add('dark door', 2.34, 1.35, -D + .04, 1.39, 2.55, .03, '#25292b');
  add('condenser', 1.1, 2.95, -.45, .85, .55, .3, '#e9e9e4');
  add('condenser grille', 1.05, 2.95, -.295, .55, .45, .01, '#a9aba7');
  return { ...base, board: { left: 1.75, right: 2.95, bottom: 2.75, top: 3.1, out: -D + .065 } };
}

export function kGroupReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'k-group', p: point(width / 2, 9.0), target: point(width / 2, 0), pitch: 18 },
    { id: 'lorong-13-row', p: point(width + .2, 10.5), target: point(width + .2, 0), pitch: 16 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
