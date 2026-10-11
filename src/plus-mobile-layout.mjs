// April 2024 street exterior of No. 22 Lorong 13. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { singleRow, addShutter, addRowFittings, rowBrackets } from './single-row-layout.mjs';

export const plusMobile = {
  id: 'plus-mobile', buildingIds: ['1223454587'], kind: 'plus-mobile',
  name: 'Plus Mobile (April 2024 exterior)', address: '22 Lorong 13 Geylang',
  // A single-storey shophouse: a short tiled front slope over a dark, shallow rear roof.
  height: singleRow.height, ridgeHeight: singleRow.ridgeHeight, ridgeDepth: singleRow.ridgeDepth, eavesOverhang: singleRow.eavesOverhang, frontEdge: 2, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists Plus Mobile, a cell phone store, at 22 Lor 13 Geylang, Singapore 388665, open in October 2026; its place point lies inside the source way tagged No. 22. April 2024 Street View shows a door plate reading 22 between two roller shutters of this single-storey shophouse, under a white signboard reading Plus Mobile & Accessories and No.22, with a blue service board beside the door plate. A March 2022 capture shows the same frontage vacant, square on. The salmon party-wall copings recur every two units along the row; triangulated from three April 2024 panoramas, they match the source frontages to within about 5%. The tiled front slope is about 3.4 m deep, and satellite imagery shows a dark low roof behind it. A steel lattice canopy shelters the walkway. Heights come from the square-on frame; the canopy depth and rear roof are estimates. Third-party adverts are shown as blank panels; the interior and stock are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Plus+Mobile+22+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223454587',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=0lzllny6dnDfGwAbWWI8_Q&heading=50&pitch=6&fov=55',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=yo_MuatdX6WE9xNVY4PqBg&heading=124&pitch=6&fov=55',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=XRsK3ZOFCVXavNp5PPCSmQ&heading=72.8&pitch=8&fov=100',
  ],
};

// u runs north (the No. 24 party wall) to south (No. 20); out runs west towards Lorong 13.
export const plusMobileFrame = poly => frontageFrame(poly, plusMobile.frontEdge);

// Measured positions, metres along the frontage from the No. 24 party wall and above the walkway.
export const elevation = {
  leftShutter: [.12, 2.83, 2.49], rightShutter: [3.42, 5.27, 2.45], header: [2.49, 2.69],
  signboard: { left: .10, right: 2.85, bottom: 2.52, top: 2.90 },
  advert: { left: 3.47, right: 5.22, bottom: 2.74, top: 3.34 },
  serviceBoard: { left: 2.92, right: 3.30, bottom: .90, top: 2.22 },
  plate: { left: 2.97, right: 3.13, bottom: 2.28, top: 2.40 },
  canopy: singleRow.canopy,
};

export function plusMobileLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, C = E.canopy;
  // Roller shutters on the façade: the left one single, the right one in two leaves.
  addShutter(add, E.leftShutter, 1);
  addShutter(add, E.rightShutter, 2);
  const [rl, rr] = E.rightShutter;
  add('header panel', (rl + rr) / 2, (E.header[0] + E.header[1]) / 2 + .1, .02, rr - rl, E.header[1] - E.header[0], .03, '#d9cfb8');
  // White downpipe on the No. 24 party wall, then the eaves board, tiled walkway and steel canopy beams.
  addRowFittings(add, width, { downpipe: .09 });
  return {
    boxes,
    sign: { ...E.signboard, out: .045 }, advert: { ...E.advert, out: .045 },
    serviceBoard: { ...E.serviceBoard, out: .04 }, plate: { ...E.plate, out: .045 },
    canopy: { ...C, from: 0, to: width },
    // Diagonal brackets from the wall up to the front beam, at the photographed spacing.
    brackets: rowBrackets([.35, 2.9, 5.45]),
  };
}

export function plusMobileReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'plus-mobile', p: point(width / 2, 10.0), target: point(width / 2, 0), pitch: 14 },
    { id: 'plus-mobile-walkway', p: point(width - .6, 2.6), target: point(width / 2 - .4, 0), pitch: 10 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
