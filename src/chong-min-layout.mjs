// April 2024 street exterior of the 15-C frontage on Lorong 13. Only the matching source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const chongMin = {
  id: 'chong-min', buildingIds: ['1223773762'], kind: 'chong-min',
  name: 'Singapore Chong Min Association and Yun Teck Sian Tng (April 2024 exterior)', address: '15C Lorong 13 Geylang',
  height: 6.12, ridgeHeight: 7.6, ridgeDepth: .4, eavesOverhang: 0, frontEdge: 0, recess: .5, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists the Singapore Chong Min Association at 15C Lor 13 Geylang, Singapore 388656, and Yun Teck Sian Tng Thong Sin Sia as a Buddhist temple whose place point lies inside source way 1223773762. April 2024 Street View shows this frontage, with a door plate reading 15-C, carrying a 新加坡眾民聯誼會 SINGAPORE CHONG MIN ASSOCIATION board on the upper storey and a 運德善堂同心社 YUN TECK SIAN TNG THONG SIN SIA board over the ground floor. To the south stands the two-bay building plated 13/13A, covering source ways No. 13 and No. 15; to the north stand the 15D/15E shutters and the green No. 17 tower. The source way is tagged 15B, one letter behind the door plate; the sequence of frontages and the temple point support this assignment, and the tag is recorded, not changed. Heights were measured from square-on frames scaled by the 6.10 m frontage. The roof behind the slab eave is tiled on satellite imagery; its form is estimated. The altar, people, offerings and interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Singapore+Chong+Min+Association+15C+Lorong+13+Geylang',
    'https://www.google.com/maps/search/?api=1&query=Yun+Teck+Sian+Tng+Thong+Sin+Sia',
    'https://www.openstreetmap.org/way/1223773762',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=8k_BeNJ16snqOq6gubtsYw&heading=251.3&pitch=30&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=8k_BeNJ16snqOq6gubtsYw&heading=262&pitch=-2&fov=18',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=J1TCFhzakKX2wiHsdsUgGQ&heading=252&pitch=8&fov=110',
  ],
};

// u runs south (the 13/13A building) to north (15D/15E); out runs east to Lorong 13.
export const chongMinFrame = poly => frontageFrame(poly, chongMin.frontEdge);

export function chongMinLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const white = '#ebe8df', frame = '#2b2d2e', R = chongMin.recess;

  // Upper storey: two dark-framed windows; slab eave and parapet line above.
  for (const [left, right] of [[1.05, 2.52], [3.95, 5.33]]) {
    const u = (left + right) / 2, w = right - left;
    // A dark frame ring around grey glass, with the glass face just proud of it.
    for (const [du, dy, fw, fh] of [[0, .505, w, .05], [0, -.505, w, .05], [-w / 2 + .025, 0, .05, 1.06], [w / 2 - .025, 0, .05, 1.06]]) add('window frame', u + du, 4.73 + dy, .03, fw, fh, .06, frame);
    add('window glass', u, 4.73, .01, w - .1, .96, .02, '#56636b');
    add('window mullion', u, 4.73, .03, .045, .96, .04, frame);
    add('window transom', u, 4.95, .03, w - .1, .04, .04, frame);
    add('window sill', u, 4.17, .06, w + .1, .05, .12, '#d9d5ca');
  }
  add('slab eave', width / 2, 6.29, .3, width, .34, .6, white);
  add('slab eave soffit line', width / 2, 6.11, .58, width, .02, .04, '#b9b5ab');
  add('parapet', width / 2, 6.56, -.05, width, .2, .1, white);
  add('upper floor band', width / 2, 3.55, .03, width, .12, .06, '#dcd8ce');

  // Ground floor: a shallow recess with the shrine opening, the 15-C door and a lattice gate.
  for (const u of [.12, width - .12]) add('ground pier', u, 1.75, -R / 2 + .02, .24, 3.5, R, white);
  add('recess soffit', width / 2, 3.45, -R / 2, width - .48, .1, R, '#e2ded4');
  add('recess floor', width / 2, .07, -R / 2, width - .48, .06, R, '#a8a49b');
  add('shrine opening', 2.3, 1.45, -R + .02, 3.9, 2.9, .04, '#2a1d1a');
  add('shrine red backdrop', 2.7, 1.55, -R + .045, 1.7, 2.2, .01, '#8e2525');
  add('shrine lintel', 2.3, 3.0, -R + .05, 3.9, .12, .05, '#c9c4b8');
  add('15-C door', 4.78, 1.2, -R + .04, .75, 2.35, .04, '#5a3426');
  for (let i = 0; i < 6; i++) add('door grille bar', 4.48 + i * .12, 1.2, -R + .065, .02, 2.2, .01, '#3a2219');
  add('door number plate', 4.78, 2.62, -R + .05, .7, .22, .02, '#ecebe6');
  add('lattice gate', 5.6, 1.2, -R + .04, .7, 2.35, .03, '#7a5238');
  for (const s of [-1, 1]) for (let i = 0; i < 6; i++) add('gate lattice bar', 5.6, .3 + i * .38, -R + .06, .7 * 1.12, .025, .01, '#5c3b29');
  return {
    boxes,
    boards: [
      { key: 'chong', left: .85, right: 6.0, bottom: 5.26, top: 5.9, out: .05 },
      { key: 'yunteck', left: .63, right: 5.8, bottom: 2.76, top: 3.38, out: .06 },
    ],
    awning: { left: .2, right: width - .1, back: .05, front: 1.55, top: 2.6, bottom: 2.25 },
    numberPlate: { u: 4.78, out: -R + .065, bottom: 2.52, top: 2.72, w: .66 },
  };
}

export function chongMinReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'chong-min', p: point(width / 2, 9.5), target: point(width / 2, 0), pitch: 18 },
    { id: 'chong-min-ground', p: point(width / 2 + .5, 4.8), target: point(width / 2, -.5), pitch: 10 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
