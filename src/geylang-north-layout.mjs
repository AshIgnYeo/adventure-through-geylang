// Infill on the north side of Geylang Road between the Lorong 9 corner and Wat Dhammasatis, from June
// 2024 Street View. Frames face Geylang Road with u running east from each house's west party line;
// heights are read on the same road datum as the Wat Dhammasatis model next door.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const pilasterTiles = (spans, colour) => spans.map(u => ({ name: 'tiled pilaster panel', u, h: [3.2, 4.8], out: .07, depth: .02, colour }));
const frieze = width => [
  { name: 'cornice', u: [0, width], h: [6.25, 6.87], out: .15, depth: .3, colour: '#e3dfcf' },
  { name: 'ornamented frieze', u: [0, width], h: [5.67, 6.25], out: .04, depth: .06, colour: '#d9d6c2' },
];
const roundels = us => us.map(u => ({ name: 'round vent', u: [u - .12, u + .12], h: [5.33, 5.58], out: .06, depth: .03, colour: '#5d6b62' }));
// Width-scaled positions: both houses were read on panorama 2Y21 rectified on the source front, whose
// widths match the re-split strips (5.25 m and 4.17 m measured against 5.33 m and 4.30 m).

export const lianSeng = {
  id: 'lian-seng', buildingIds: ['gr-229'], kind: 'lian-seng', frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Lian Seng Weighing Scale Co. (June 2024 exterior)', address: '229 Geylang Road',
  height: 6.87, ceiling: 2.67, fiveFootWay: 2.0, shellInset: .1, roof: { type: 'gable', ridge: 8.6, ridgeDepth: .4, colour: '#8e5a46' },
  evidence: 'Google Maps lists Lian Seng Weighing Scale Co., an importer and exporter, at 229 Geylang Rd, Singapore 389289, and June 2024 Street View shows its black Lian Seng Weighing Scale Co. board over the five-foot way of the cream Peranakan shophouse on the No. 229 strip of the split block (open question 11), directly west of the Vietnam Unisex Concept house. Two arched French windows with pale green louvred shutters stand between pilasters with blue-and-white tiled panels, under a frieze of green plaster ornament with round vents, a moulded cornice and a tiled roof. Read on panorama 2Y21 rectified on the source front, where the photographed frontage measures 5.25 m against the 5.33 m strip; the roof ridge is estimated. Stock, vans and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Lian+Seng+Weighing+Scale+229+Geylang+Road', 'https://www.openstreetmap.org/way/475158360', pano('2Y21iC-Tp9xBEWdsRjwK4w', 10, 10, 80), pano('XvnqlmacQsIGn3oTpJoW9A', 330, 10, 80)],
  colours: { wall: '#e6e2cf', trim: '#dfe2d2', frame: '#8aa48a', glass: '#c9d9b4', pier: '#e8e5d6', back: '#35302c' },
  bands: [[2.67, 3.0, .3, '#e3dfcf']],
  windows: [{ u: [1.2, 2.2], h: [3.08, 4.83], panes: 2, arched: true }, { u: [2.92, 3.92], h: [3.08, 4.83], panes: 2, arched: true }],
  blocks: [...frieze(5.33), ...pilasterTiles([[.58, 1.08], [2.33, 2.87], [4.05, 4.63]], '#9fc4c0'), ...roundels([.83, 2.6, 4.34])],
  piers: [[.1, .4], [4.95, 5.33]],
  board: { u: [.12, 4.95], h: [2.0, 2.65], out: .06 },
  backFittings: [{ name: 'dark shop front', u: [.5, 4.8], h: [.1, 2.0], colour: '#2f2c2a' }, { name: 'grille', u: [3.0, 3.8], h: [.6, 1.8], colour: '#8c8f8c', out: .02 }],
};

export const no231 = {
  id: 'gr-231', buildingIds: ['gr-231'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'No. 231 Geylang Road (June 2024 exterior, occupant not identified)', address: '231 Geylang Road',
  height: 6.8, ceiling: 2.67, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 8.5, ridgeDepth: .4, colour: '#8e5a46' },
  evidence: 'The No. 231 strip of the split block (open question 11), between Lian Seng (No. 229) and Wat Dhammasatis (No. 233). June 2024 Street View shows a VIETNAM UNISEX CONCEPT SPA & SALON board, but no listing for it was found, so no name is given and the board is blank. A cream Peranakan shophouse: two arched French windows with teal louvred shutters between pilasters with pink tiled panels, under the same ornamented frieze, round vents and cornice as No. 229, over a salon hung with lanterns. Read on panorama 2Y21 rectified on the source front, where the frontage measures 4.17 m against the 4.30 m strip; the roof ridge is estimated.',
  sources: ['https://www.openstreetmap.org/way/475158360', pano('2Y21iC-Tp9xBEWdsRjwK4w', 30, 10, 80), pano('XvnqlmacQsIGn3oTpJoW9A', 340, 10, 80)],
  colours: { wall: '#e9e3cf', trim: '#e2dfd0', frame: '#1f7a72', glass: '#2fa59a', pier: '#ebe7d8', back: '#3a2f2c' },
  bands: [[2.67, 3.0, .3, '#e3dfcf']],
  windows: [{ u: [.29, 1.32], h: [3.05, 4.85], panes: 2, arched: true }, { u: [2.06, 3.09], h: [3.05, 4.85], panes: 2, arched: true }],
  blocks: [...frieze(4.3), ...pilasterTiles([[1.37, 2.01], [3.17, 3.69]], '#e3b9bb'), ...roundels([1.69, 3.43]), { name: 'blank board', u: [.2, 4.0], h: [2.3, 2.67], out: .06, depth: .05, colour: '#1e1e1f' }],
  piers: [[0, .2], [3.95, 4.3]],
  backFittings: [{ name: 'lantern-hung salon front', u: [.3, 3.9], h: [.1, 2.2], colour: '#4a2a2a', glow: .1 }],
};

export const geylangNorth = [lianSeng, no231];
export const geylangNorthFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const geylangNorthLayout = (place, width) => simpleHouseLayout(width, place);
export const geylangNorthReviews = (place, frame) => facing(frame, place.id, 11, 14);
