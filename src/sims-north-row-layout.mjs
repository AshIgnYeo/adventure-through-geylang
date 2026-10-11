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

// The low tiled fruit-stall buildings at No. 77 (ways 439168813 and 439168845) and the small shed behind.
const fruitNote = 'June 2024 Street View shows a single-storey building under weathered tiled roofs with fruit and vegetable stalls under striped and dark awnings in its open front. Durian Culture (SG) is listed at 77 Sims Ave with its point in way 439168813, and fruit stalls are listed nearby, but no sign naming either was seen, so no name is given. Read on the 49OM and qzPH panoramas at the source front, where the roofs and awnings fit; heights carry about ±0.3 m. Produce, crates and vehicles are not reconstructed.';
const fruitShed = (id, way, frontEdge, extra) => ({
  id, buildingIds: [way], kind: 'unnamed', unnamed: true, frontEdge, reviewRoad: 'Sims Avenue',
  name: `Fruit-stall building at 77 Sims Avenue, way ${way} (June 2024 exterior, occupant not identified)`, address: '77 Sims Avenue (north side, by Lorong 11)',
  height: 3.4, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'hip', ridge: 5.6, colour: '#7a5a48' },
  evidence: fruitNote, sources: [`https://www.openstreetmap.org/way/${way}`, pano('49OMf9AQc8HWnOxc6MrJFQ', 330, 10, 100), pano('qzPH3ywF_WDqHNnMt4xojA', 340, 10, 100)],
  colours: { wall: '#d9d4c6', trim: '#c9c4b6', frame: '#3a3e40', glass: '#3e474b', pier: '#d9d4c6', back: '#3a3532', floor: '#9a978f' },
  backFittings: [{ name: 'open stall front', u: [.3, 5.8], h: [.1, 2.8], colour: '#4a3a2e', glow: .05 }],
  ...extra,
});
export const fruit77 = fruitShed('sa-77', '439168813', 0, { awning: { from: .1, to: 6.2, wall: 3.0, front: 2.4, depth: 2.6, valance: .3 } });
export const fruit77b = fruitShed('sa-77b', '439168845', 2, { awning: { from: .1, to: 5.0, wall: 3.0, front: 2.4, depth: 2.6, valance: .3 }, backFittings: [{ name: 'open stall front', u: [.3, 4.8], h: [.1, 2.8], colour: '#4a3a2e', glow: .05 }] });
export const fruitBack = fruitShed('sa-77c', '439168847', 0, { height: 3.0, roof: { type: 'flat', colour: '#8f9596' }, backFittings: [] });

// Yi Xiu Factory Building, 65 Sims Avenue: a salmon ten-storey flatted factory over its whole source way,
// its west part fronting Sims Avenue (edge 5) and its east wing set back (edge 3).
export const yiXiu = {
  id: 'yi-xiu-factory-building', buildingIds: ['439168856'], kind: 'yi-xiu-factory-building', frontEdge: 5, reviewRoad: 'Sims Avenue',
  name: 'Yi Xiu Factory Building (June 2024 exterior)', address: '65 Sims Avenue',
  height: 36.0, ceiling: 6.0, fiveFootWay: 1.5, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Google Maps lists Yi Xiu Factory Building at 65 Sims Ave, Singapore 387418, with tenants on levels 2 to 7, and June 2024 Street View shows FACTORY BUILDING lettering on its parapet and the lower characters 厂大厦 of a vertical name on its pale stair core (the rest hidden by a tree, so left blank), with the English name shown in full only on the parapet as listed, on the salmon flatted factory filling source way 439168856 north of Sims Avenue by Lorong 11. Bands of dark windows run across every upper storey between salmon spandrels, over a tall ground storey with loading bays. The roof is about 36 m up, from the roofline elevation in the YZf1 panorama at the source line, where the wing\'s base sits on the ground; a 6 m ground storey and nine upper storeys of about 3.3 m fit it. The model fills the whole source outline, part of which lies beyond the study\'s north edge; the rear elevations are simplified to the same bands. Air-conditioner units, vehicles and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Yi+Xiu+Factory+Building+65+Sims+Avenue', 'https://www.openstreetmap.org/way/439168856', pano('YZf1yddH0WodqqcVAH4tUA', 345, 15, 100), pano('49OMf9AQc8HWnOxc6MrJFQ', 290, 22, 30)],
  colours: { wall: '#de6f5f', trim: '#c95a4d', frame: '#3a3e40', glass: '#3e474b', pier: '#de6f5f', back: '#3a3532', floor: '#9a978f' },
  storeys: Array.from({ length: 9 }, (_, i) => 6.3 + i * 3.3),
};
export function yiXiuBands(width) {
  const boxes = [], add = (name, u, y, out, w, h, depth, colour) => boxes.push({ name, u, y, out, w, h, depth, colour, glow: 0 });
  for (const f of yiXiu.storeys) {
    add('window band', width / 2, f + 1.55, .03, width - .6, 1.7, .04, '#3e474b');
    add('spandrel ledge', width / 2, f + .2, .25, width, .3, .5, '#c95a4d');
  }
  add('parapet', width / 2, yiXiu.height - .4, .1, width, .8, .2, '#c95a4d');
  return boxes;
}

// Shi Cheng Temple 真佛宗狮城雷藏寺, 117 Sims Avenue: a cream temple front between two octagonal towers.
// u runs east along the Sims front (edge 0) from its west corner; heights from roofline elevations in the
// -vjb panorama on the front plane, the set-back upper tiers estimated.
const T = { towers: [[0, 3.2], [14.4, 17.59]], bands: [5.0, 8.4, 11.8, 15.2, 18.4], eaves: [8.3, 11.3], railings: [12.6, 15.6], columns: [5.6, 8.0, 10.4, 12.0] };
export const shiCheng = {
  id: 'shi-cheng-temple', buildingIds: ['475915911'], kind: 'shi-cheng-temple', frontEdge: 0, reviewRoad: 'Sims Avenue',
  name: 'Shi Cheng Temple 真佛宗狮城雷藏寺 (June 2024 exterior)', address: '117 Sims Avenue',
  height: 17.0, ceiling: 4.5, fiveFootWay: .5, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Google Maps lists Shi Cheng Temple 真佛宗狮城雷藏寺, a True Buddha School temple, at 117 Sims Ave, its point about 1 m beyond the north edge of source way 475915911, and June 2024 Street View shows the temple architecture of that building above the tent: a cream front between two octagonal towers banded in brown, red columns with carved bracket capitals, red balcony railings on two levels, green-tiled eaves with a central pediment, and a pavilion with a flared roof on top. No name board could be read, the ground floor being hidden by the temporary tent and a red hoarding, which are not reconstructed. Heights come from roofline elevations in the -vjb panorama on the front plane (towers about 18.6 m, eaves about 8.3 and 11.3 m, the upper railing about 13.3 m); the set-back upper tiers are estimates, and part of the outline lies beyond the study\'s north edge.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Shi+Cheng+Temple+117+Sims+Avenue', 'https://www.openstreetmap.org/way/475915911', pano('-vjbkWOXAP_tX2wp_eg-4w', 325, 25, 90), pano('eLBmJpBQgY1u_CPP4C8XGw', 352, 28, 40)],
  colours: { wall: '#ece6d6', trim: '#8a5a44', frame: '#a8322e', glass: '#3e474b', pier: '#ece6d6', back: '#3a3532', floor: '#a49e95' },
};
export function shiChengLayout(width) {
  const red = '#a8322e', green = '#4f6f66', brown = '#8a5a44', cream = '#ece6d6';
  const blocks = [];
  for (const [l, r] of T.towers) {
    blocks.push({ name: 'octagonal tower', u: [l, Math.min(r, width)], h: [0, 18.6], out: .4, depth: .8, colour: cream });
    for (const b of T.bands) blocks.push({ name: 'tower band', u: [l - .05, Math.min(r + .05, width)], h: [b, b + .35], out: .85, depth: .1, colour: brown });
    for (const y of [6.2, 9.6, 13.0, 16.4]) blocks.push({ name: 'tower window', u: [(l + r) / 2 - .3, (l + r) / 2 + .3], h: [y, y + 1.0], out: .82, depth: .03, colour: '#4a5658' });
  }
  const mid = [3.4, 14.2];
  for (const e of T.eaves) {
    blocks.push({ name: 'green-tiled eave', u: mid, h: [e - .2, e + .25], out: 1.0, depth: 2.0, colour: green });
    blocks.push({ name: 'eave ridge tiles', u: mid, h: [e + .25, e + .4], out: .3, depth: .6, colour: '#3e5a52' });
  }
  blocks.push({ name: 'central pediment', u: [6.8, 10.8], h: [8.6, 9.6], out: 1.6, depth: .2, colour: '#d9cf9a' });
  for (const u of [4.2, 6.6, 8.8, 11.0, 13.4]) for (const [b, t] of [[4.6, 8.1], [8.7, 11.1]]) {
    blocks.push({ name: 'red column', u: [u - .14, u + .14], h: [b, t], out: .6, depth: .28, colour: red });
    blocks.push({ name: 'carved bracket capital', u: [u - .35, u + .35], h: [t - .45, t], out: .65, depth: .5, colour: '#7a2a24' });
  }
  for (const y of T.railings) {
    blocks.push({ name: 'red railing', u: mid, h: [y, y + .1], out: .7, depth: .06, colour: red });
    for (let u = mid[0] + .1; u < mid[1]; u += .22) blocks.push({ name: 'railing baluster', u: [u, u + .05], h: [y - .7, y], out: .7, depth: .05, colour: red });
  }
  blocks.push({ name: 'top pavilion', u: [5.5, 12.1], h: [17.0, 20.0], out: -3.0, depth: 4.0, colour: cream });
  blocks.push({ name: 'pavilion flared roof', u: [5.0, 12.6], h: [20.0, 20.7], out: -3.0, depth: 5.0, colour: green });
  blocks.push({ name: 'pavilion ridge', u: [5.8, 11.8], h: [20.7, 21.2], out: -3.0, depth: .8, colour: '#3e5a52' });
  return simpleHouseLayout(width, {
    ...shiCheng, blocks,
    windows: [{ u: [5.2, 7.8], h: [5.6, 7.4], panes: 3 }, { u: [9.8, 12.4], h: [5.6, 7.4], panes: 3 }, { u: [5.2, 7.8], h: [9.4, 10.8], panes: 3 }, { u: [9.8, 12.4], h: [9.4, 10.8], panes: 3 }],
    piers: [[3.2, 3.6], [14.0, 14.4]],
    backFittings: [{ name: 'temple entrance', u: [6.6, 11.0], h: [.1, 4.0], colour: '#5a2a24' }],
  });
}

export const simsNorthRow = [whitePair, saWest, saWhite, redFlagDavco, fruit77, fruit77b, fruitBack, shiCheng];
export const simsNorthRowFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const simsNorthRowLayout = (place, width) => place.id === 'shi-cheng-temple' ? shiChengLayout(width) : simpleHouseLayout(width, place);
export const simsNorthRowReviews = (place, frame) => facing(frame, place.id, place.id === 'shi-cheng-temple' ? 14 : 10, place.id === 'shi-cheng-temple' ? 30 : 12);
