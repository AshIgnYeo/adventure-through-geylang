// The north side of Sims Avenue between Lorong 11 and ibis budget Gold, from June 2024 Street View.
// Frames run west to east facing Sims Avenue; heights are above the road datum.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;

// The white two-storey pair on way 439168818, under one hipped tiled roof; three panoramas agree at the
// source front, where the building measures about 13.4 m of the 15.43 m way (an access lane runs past its
// east end), so its east 2 m is plain wall.
export const whitePair = {
  id: 'sims-north-pair', buildingIds: ['439168818'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Sims Avenue',
  name: 'White two-storey pair, Sims Avenue north side (June 2024 exterior, occupant not identified)', address: 'Sims Avenue, north side, west of the access lane',
  height: 6.0, ceiling: 2.6, fiveFootWay: .3, roof: { type: 'hip', ridge: 7.7, colour: '#9a5a46' },
  evidence: 'Unnumbered source way 439168818 on the north side of Sims Avenue. June 2024 Street View shows a white two-storey pair under one hipped tiled roof, five dark upper windows in white frames with two condensers, a red tiled lean-to over a mesh-fronted store at the west end, and roller shutters to the east; no sign or listing identifies the occupants, so no name is given. Three panoramas (49OM, m3nF, 6iJp) agree at the source front, where the building measures about 13.4 m of the 15.43 m way, an access lane running past its east end; positions are measured from the west end. Heights carry about ±0.3 m. Goods, crates and interiors are not reconstructed.',
  sources: ['https://www.openstreetmap.org/way/439168818', pano('m3nF37u9pRBV296INfZ-1A', 345), pano('6iJpKmp-pzojl_DODGbq4Q', 330), pano('49OMf9AQc8HWnOxc6MrJFQ', 20)],
  colours: { wall: '#ecebe6', trim: '#dedcd5', frame: '#f2f2ee', glass: '#2f3539', pier: '#ecebe6', back: '#3a3735', floor: '#9a978f' },
  bands: [[5.9, 6.0, .4, '#dedcd5'], [3.4, 3.6, .2]],
  windows: [[.1, 1.8], [3.0, 4.9], [6.0, 7.9], [9.06, 10.9], [12.3, 13.3]].map(u => ({ u, h: [4.1, 5.15], panes: 2 })),
  blocks: [
    { name: 'condenser', u: [1.85, 2.6], h: [4.3, 4.8], out: .3, depth: .4, colour: '#e8e8e4' }, { name: 'condenser', u: [1.85, 2.6], h: [3.75, 4.25], out: .3, depth: .4, colour: '#e8e8e4' },
    { name: 'tiled lean-to', u: [.05, 5.1], h: [2.6, 2.75], out: .9, depth: 1.8, colour: '#a85a46' },
    { name: 'blue awning', u: [5.1, 7.5], h: [2.5, 2.6], out: .5, depth: 1.0, colour: '#3a62a8' },
  ],
  piers: [[0, .3], [5.0, 5.3], [13.1, 13.4]],
  backFittings: [
    { name: 'mesh-fronted store', u: [.3, 4.9], h: [.1, 2.5], colour: '#4a4a46' }, { name: 'doorway', u: [5.5, 6.4], h: [.1, 2.2], colour: '#3a3532' },
    { name: 'roller shutter', u: [7.2, 9.6], h: [.1, 2.3], colour: '#c9ccc7' }, { name: 'roller shutter', u: [9.7, 11.9], h: [.1, 2.3], colour: '#c9ccc7' },
  ],
};

// The tiled two-storey row on the clipped way 439168694 (open question 11), about 6.5 m behind the way's
// Sims front where three panoramas agree, behind a forecourt of fruit stalls; heights above its walkway.
const rowNote = 'It stands on the owner-approved clipped split of way 439168694 (open question 11): three June 2024 panoramas agree on the row\'s façade about 6.5 m behind the way\'s Sims front, the front 6.5 m being a forecourt of fruit stalls and tents. Heights carry about ±0.3 m.';
const tiledRow = { height: 5.0, ceiling: 2.9, fiveFootWay: .3, roof: { type: 'hip', ridge: 6.3, colour: '#a85a46' }, reviewRoad: 'Sims Avenue' };
const rowPanos = [pano('_B2cTM1WvKqosc0_vduiqA', 330, 10, 70), pano('eLBmJpBQgY1u_CPP4C8XGw', 340, 15, 100), pano('-vjbkWOXAP_tX2wp_eg-4w', 320, 12, 90)];
const vents = spans => spans.map(u => ({ u, h: [4.55, 4.8] }));

export const saWest = {
  ...tiledRow, id: 'sa-107', buildingIds: ['sa-107'], kind: 'unnamed', unnamed: true, frontEdge: 3,
  name: 'West unit of the tiled row, Sims Avenue north side (June 2024 exterior, occupant not identified)', address: 'Sims Avenue, north side (Nos. 107-109 area)',
  evidence: 'The west unit of the low tiled row west of the pagoda building: a salmon-red two-storey shophouse with two windows under white vents, behind a fruit stall under a dark tarpaulin. Fruits (a grocery) is listed at 107 Sims Ave with its point in the way, but no sign was seen, so no name is given. ' + rowNote,
  sources: ['https://www.openstreetmap.org/way/439168694', ...rowPanos.slice(0, 2)],
  colours: { wall: '#c0675a', trim: '#e8e4dc', frame: '#e8e4dc', glass: '#3e4a4e', pier: '#c0675a', back: '#3a3532', floor: '#8f8b82' },
  windows: [[3.12, 4.72], [5.56, 7.0]].map(u => ({ u, h: [3.5, 4.5], panes: 2, surround: true })),
  vents: vents([[3.12, 4.72], [5.56, 7.0]]),
  blocks: [{ name: 'dark tarpaulin', u: [.4, 7.1], h: [2.25, 2.4], out: 1.6, depth: 3.2, colour: '#3e4f5a' }],
  backFittings: [{ name: 'fruit stall', u: [.6, 7.0], h: [.1, 2.2], colour: '#6a4a2e', glow: .05 }],
};

export const saWhite = {
  ...tiledRow, id: 'sa-109', buildingIds: ['sa-109'], kind: 'unnamed', unnamed: true, frontEdge: 2,
  name: 'Sài Gòn Mart unit of the tiled row, Sims Avenue north side (June 2024 exterior, occupant not identified)', address: 'Sims Avenue, north side (No. 109 area)',
  evidence: 'The white middle unit of the tiled row, with a yellow Sài Gòn Mart board over a shop under a blue awning. No listing for Sài Gòn Mart was found, so no name is given and the board is blank. ' + rowNote,
  sources: ['https://www.openstreetmap.org/way/439168694', ...rowPanos.slice(1, 3)],
  colours: { wall: '#ecebe6', trim: '#dedcd5', frame: '#e8e4dc', glass: '#3e4a4e', pier: '#ecebe6', back: '#3a3532', floor: '#8f8b82' },
  vents: vents([[.3, 3.7]]),
  blocks: [{ name: 'blank yellow board', u: [.1, 3.7], h: [3.2, 4.1], out: .08, depth: .06, colour: '#e8c43a' }, { name: 'blue awning', u: [0, 4.0], h: [2.3, 2.45], out: .6, depth: 1.2, colour: '#2f62a8' }],
  backFittings: [{ name: 'shop front', u: [.3, 3.7], h: [.1, 2.3], colour: '#c9cfd3', glow: .1 }],
};

export const redFlagDavco = {
  ...tiledRow, id: 'red-flag-davco', buildingIds: ['sa-111'], kind: 'red-flag-davco', frontEdge: 2,
  name: 'Red Flag Store (Davco) (June 2024 exterior)', address: '111 Sims Avenue, Floor 1',
  evidence: 'Google Maps lists Red Flag Store (Davco), a homewares store, at 111 Sims Ave, Floor 1 (TongLi Trading shares the address), and June 2024 Street View shows a DAVCO roundel on the upper wall of the east unit of the tiled row and a yellow-and-red Sika awning (Sika owns the Davco brand) over its building-materials shop; the listing and the sign agree on Davco, and the unit is the 111 position counting from ibis at 121-127. The awning lettering is shown as colour only. ' + rowNote,
  sources: ['https://www.google.com/maps/search/?api=1&query=111+Sims+Ave+Singapore', 'https://www.openstreetmap.org/way/439168694', ...rowPanos.slice(1, 3)],
  colours: { wall: '#c0675a', trim: '#e8e4dc', frame: '#e8e4dc', glass: '#3e4a4e', pier: '#c0675a', back: '#3a3532', floor: '#8f8b82' },
  windows: [[1.7, 3.2], [4.2, 5.7]].map(u => ({ u, h: [3.5, 4.5], panes: 2, surround: true })),
  vents: vents([[1.7, 3.2], [4.2, 5.7]]),
  board: { u: [3.3, 4.1], h: [3.55, 4.35], out: .06 },
  awning: { from: .2, to: 6.5, wall: 2.85, front: 2.0, depth: 1.8, valance: .45 },
  backFittings: [{ name: 'building-materials shop', u: [.4, 6.3], h: [.1, 2.3], colour: '#4a3a32', glow: .08 }],
};

export const simsNorthRow = [whitePair, saWest, saWhite, redFlagDavco];
export const simsNorthRowFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const simsNorthRowLayout = (place, width) => simpleHouseLayout(width, place);
export const simsNorthRowReviews = (place, frame) => facing(frame, place.id, 10, 12);
