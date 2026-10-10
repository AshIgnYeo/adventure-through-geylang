// April 2024 street exterior of the northern No. 9 Lorong 13 house. Only this source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { row13, row13Layout } from './row13-layout.mjs';

export const misterContracts = {
  id: 'mister-contracts', buildingIds: ['1223773757'], kind: 'mister-contracts',
  name: 'Mister Contracts / MC Multi Skills (April 2024 exterior)', address: 'No. 9 Lorong 13 Geylang (northern house; addresses conflict)',
  height: row13.height, ridgeHeight: row13.ridgeHeight, ridgeDepth: row13.ridgeDepth, eavesOverhang: row13.eavesOverhang,
  frontEdge: row13.frontEdge, fiveFootWay: row13.fiveFootWay, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Modelled under the owner\'s 10 October 2026 decision that a clearly signed occupant may be shown when published addresses disagree. April 2024 Street View shows a MISTER CONTRACTS PTE. LTD. / MC MULTI SKILLS TRAINING CONSULTANCY signboard across this conserved house, the northern of the two source ways tagged No. 9, beside No. 11; an MC Multi Skills banner stands at the southern No. 9 house, which is not assigned. The addresses conflict: the signboard itself reads 5 Lorong 13 Geylang, Singapore 388643 (the K Group house), and Google Maps lists Mister Contracts at No. 7 (Hong Ye Chen). The model is therefore a dated exterior of the signed house, not a claim about the company\'s registered address. The house shares the row elevation measured at No. 7; its windows, pilasters and signboard were measured from a square-on frame. The full-height white grille enclosing the five-foot way is simplified, and the interior is not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Mister+Contracts+Pte+Ltd+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223773757',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=HaY-y7EfW3SXOm-83rKMAw&heading=255&pitch=10&fov=60',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=uh9Y_1rGJSeI8vjJVZDDHg&heading=300&pitch=8&fov=60',
  ],
};

// u runs south (the other No. 9 house) to north (No. 11); out runs east towards Lorong 13.
export const misterContractsFrame = poly => frontageFrame(poly, misterContracts.frontEdge);

export const elevation = {
  windows: [[.3, 1.25, 5.15, 7.48], [1.7, 2.8, 4.2, 7.5], [3.2, 4.3, 5.15, 7.48]],
  pilasters: [[0, .3], [1.25, 1.7], [2.8, 3.2], [4.3, 4.75]],
  board: [0, 4.7, 3.24, 4.06],
};

export function misterContractsLayout(width) {
  const E = elevation;
  const base = row13Layout(width, { windows: E.windows, pilasters: E.pilasters, tilesUnder: [0, 2], piers: [[.15, .3], [width - .2, .4]], floor: '#b9a98c' });
  const { add, D } = base;
  add('downpipe', 4.88, 4.2, .05, .08, 8.2, .08, '#efede6');
  // Full-height white grille closing the five-foot way, in front of a dense lattice screen.
  add('grille rail', width / 2, 3.15, -.05, width - .6, .06, .05, '#f1f0eb');
  add('grille rail', width / 2, 2.05, -.05, width - .6, .06, .05, '#f1f0eb');
  for (let u = .4; u < width - .3; u += .18) add('grille bar', u, 1.6, -.05, .035, 3.1, .035, '#f1f0eb');
  for (const u of [1.45, 3.25]) add('grille gate frame', u, 1.0, -.03, .06, 2.0, .06, '#f1f0eb');
  add('lattice screen', width / 2, 1.6, -D + .04, width - .2, 3.0, .03, '#7b6a52');
  for (let u = .3; u < width - .2; u += .3) for (let y = .4; y < 3.0; y += .4) add('lattice tile', u, y, -D + .06, .12, .12, .01, '#c9b88f');
  add('vending machine', 4.2, .95, -D + .45, .8, 1.9, .7, '#e8e8e4');
  add('vending window', 4.2, 1.15, -D + .81, .62, 1.0, .01, '#4b6a7a', .2);
  return { ...base, board: { left: E.board[0], right: Math.min(E.board[1], width), bottom: E.board[2], top: E.board[3], out: .06 } };
}

export function misterContractsReviews(frame) {
  const { point, width } = frame;
  return [{ id: 'mister-contracts', p: point(width / 2, 8.6), target: point(width / 2, 0), pitch: 16 }]
    .map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
