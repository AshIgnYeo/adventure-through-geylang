// Lorong 15 Geylang exteriors from April 2024 Street View, on the owner-approved split of block 454254281.
// The two association houses north of Hotel 81 Spring photograph about 4.8 m in front of the source
// front; under the owner's answer to open question 15 they stand on the source front as labelled
// estimates, measured on frames rectified at the photographed depth. Heights are on the road datum.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const block = 'https://www.openstreetmap.org/way/454254281';
const offset = 'Two April 2024 panoramas agree on its frontage only on a plane about 4.8 m in front of the source block, close to the modelled Lorong 15 carriageway; under the owner\'s answer to open question 15 it stands on the source front of its strip as a labelled estimate, the northern 13 m of the block having been split in the ratio of the two houses\' photographed widths (about 5.4 m and 5.1 m). Heights were read at the photographed depth and carry about ±0.4 m.';

export const sinChewTan = {
  id: 'sin-chew-tan', buildingIds: ['l15-28a'], kind: 'sin-chew-tan', frontEdge: 3, reviewRoad: 'Lorong 15 Geylang',
  name: "Sin Chew Tan's Clan Association 星洲陳氏公會 (April 2024 exterior)", address: '28A Lorong 15 Geylang',
  height: 9.75, ceiling: 2.4, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'April 2024 Street View shows a black board reading 星洲陳氏公會 SIN CHEW TAN\'S CLAN ASSOCIATION, numbered 28A, across the white three-storey house north of the Teck Keow Association, over the Ganh Xua restaurant (Ganh Xua by Homely Vietnam, listed at 28 Lor 15, temporarily closed). No published address for the association was found; the owner approved building it here on the signboard (open question 15). A band of dark glazing fills the second storey and an open loggia the top storey, under a plain parapet. ' + offset + ' Plants, bicycles and the interior are not reconstructed.',
  sources: [block, pano('9_3nbM5BeBGGFhZTdb0ktQ', 75, 15, 80), pano('tdl8caP_bqm-JQg0Ag7NRg', 40, 15, 80), 'https://www.google.com/maps/search/?api=1&query=Ganh+Xua+28+Lorong+15+Geylang'],
  colours: { wall: '#ecebe6', trim: '#dcdbd5', frame: '#2a2e31', glass: '#2f383c', pier: '#ecebe6', back: '#3a2f2a', floor: '#9c968c' },
  bands: [[9.55, 9.75, .3], [7.6, 8.0, .25], [4.7, 4.9, .2]],
  windows: [{ u: [.3, 6.3], h: [4.9, 6.7], panes: 6 }],
  blocks: [
    { name: 'open loggia', u: [.4, 6.2], h: [8.0, 9.5], out: .005, depth: .02, colour: '#3a3b3a' },
  ],
  board: { u: [.5, 6.1], h: [3.6, 4.6], out: .08 },
  boards: [{ u: [2.3, 4.6], h: [2.5, 3.5], out: .1 }],
  awning: { from: .2, to: 6.4, wall: 2.95, front: 2.4, depth: 1.5, valance: .25 },
  backFittings: [{ name: 'restaurant front', u: [.4, 6.2], h: [.1, 2.3], colour: '#4a3a2e', glow: .1 }],
};

export const teckKeow = {
  id: 'teck-keow', buildingIds: ['l15-26a'], kind: 'teck-keow', frontEdge: 2, reviewRoad: 'Lorong 15 Geylang',
  name: 'Singapore Teck Keow Association 新加坡德僑社 (April 2024 exterior)', address: '26A Lorong 15 Geylang',
  height: 9.9, ceiling: 2.4, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'The SFCCA member directory lists the Singapore Teck Keow Association at 26A Lorong 15 Geylang, and April 2024 Street View shows its white board reading 新加坡德僑社 SINGAPORE TECK KEOW ASSOCIATION on the weathered three-storey house directly north of Hotel 81 Spring, with 王氏慈善福樓 lettering under an ornamental grille on the top storey. The eating house board beneath (昱歡美食閣) has no listing and is left plain. A band of dark glazing fills the second storey. ' + offset + ' The stair, shop contents and interior are not reconstructed.',
  sources: ['https://sfcca.sg/en/our-members/', block, pano('tdl8caP_bqm-JQg0Ag7NRg', 75, 15, 80), pano('MgS1CqglRPN1fG9C_TToMA', 30, 15, 80)],
  colours: { wall: '#d9d2c3', trim: '#cfc6b4', frame: '#2a2e31', glass: '#2f383c', pier: '#dcd6c9', back: '#3a3532', floor: '#9c968c' },
  bands: [[9.7, 9.9, .3, '#b9b0a0'], [6.75, 7.0, .25, '#e2ddd2'], [4.45, 4.9, .2, '#e8e4dc']],
  windows: [{ u: [.3, 6.1], h: [4.9, 6.75], panes: 5 }],
  blocks: [
    { name: 'top-storey loggia', u: [.3, 6.1], h: [7.75, 9.5], out: .005, depth: .02, colour: '#3a3836' },
    ...Array.from({ length: 22 }, (_, i) => ({ name: 'ornamental grille bar', u: [.4 + i * .26, .44 + i * .26], h: [7.75, 9.5], out: .03, depth: .03, colour: '#5a4a40' })),
    { name: 'grille rail', u: [.3, 6.1], h: [8.6, 8.66], out: .03, depth: .03, colour: '#5a4a40' },
    { name: 'plain eating-house board', u: [.2, 6.2], h: [2.75, 3.6], out: .12, depth: .08, colour: '#efe7dc' },
  ],
  board: { u: [.6, 5.8], h: [3.75, 4.4], out: .1 },
  boards: [{ u: [1.2, 5.2], h: [7.05, 7.5], out: .03 }],
  awning: { from: .2, to: 6.2, wall: 2.8, front: 2.4, depth: 1.4, valance: .2 },
  backFittings: [{ name: 'stair door', u: [1.0, 2.0], h: [.1, 2.3], colour: '#3e3a36' }, { name: 'eating house', u: [2.2, 6.0], h: [.1, 2.3], colour: '#4a4038', glow: .06 }],
};

// South of the hotel: photographed about 4.4 m forward, where three panoramas agree; strips split at the
// measured party lines, shifted onto the hotel's line, and treated like open question 15.
const south = 'Three April 2024 panoramas agree on this stretch only about 4.4 m in front of the source block, as for the association houses north of the hotel; it stands on the source front of its strip, split from block 454254281 at the measured party lines, as a labelled estimate. Heights were read at the photographed depth and carry about ±0.4 m.';
const southPanos = [pano('4VkQxUB4x9mQmQdqDyRARQ', 85, 15, 80), pano('dwargxggy9TZvawFPhFm_A', 40, 15, 80)];
const whitewash = { wall: '#ece6d6', trim: '#ddd6c4', frame: '#3a3e40', glass: '#3c4549', pier: '#ece6d6', back: '#3a3532', floor: '#9c968c' };
const diamonds = width => Array.from({ length: Math.floor(width / .6) }, (_, i) => ({ name: 'diamond vent block', u: [.25 + i * .6, .45 + i * .6], h: [2.9, 3.1], out: .02, depth: .03, colour: '#4a4a46' }));

export const hongShengKoon = {
  id: 'hong-sheng-koon', buildingIds: ['l15-20e'], kind: 'hong-sheng-koon', frontEdge: 2, reviewRoad: 'Lorong 15 Geylang',
  name: 'Hong Sheng Koon 鴻勝館 Koontow & Lion Dance Society (April 2024 exterior)', address: '20E Lorong 15 Geylang',
  height: 10.4, ceiling: 3.2, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Google Maps lists the Hong Sheng Koon Chinese Koontow & Lion Dance Society, a kung fu school, at 20E Lor 15 Geylang, Singapore 388611 (Choi Lei Fut Kung Fu and Lion Dance Society shares the address), and April 2024 Street View shows its yellow vertical 鴻勝館 sign on the top storey of the cream four-storey house directly south of Hotel 81 Spring. Two windows on each upper storey under long louvred vents, a deep slab between them, and upper storeys over a recessed ground floor with a diamond-vent band. ' + south + ' The gym equipment and interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Hong+Sheng+Koon+20E+Lorong+15+Geylang', block, ...southPanos],
  colours: whitewash,
  bands: [[10.2, 10.4, .3], [7.1, 7.4, .6], [3.2, 3.5, .8]],
  windows: [[1.1, 2.4], [4.8, 6.0]].flatMap(u => [{ u, h: [4.75, 5.9], panes: 2 }, { u, h: [7.9, 9.0], panes: 2 }]),
  vents: [{ u: [.4, 6.0], h: [6.15, 6.4] }, { u: [.4, 6.0], h: [9.2, 9.45] }],
  blocks: diamonds(6.4),
  blades: [{ u: 2.1, out: [.3, 1.1], h: [8.0, 10.2] }],
  piers: [[0, .35], [6.05, 6.4]],
  backFittings: [{ name: 'grille door', u: [1.6, 2.5], h: [.1, 2.4], colour: '#7a7d7a' }, { name: 'door', u: [3.0, 3.8], h: [.1, 2.4], colour: '#3e3a36' }, { name: 'door', u: [4.5, 5.3], h: [.1, 2.4], colour: '#3e3a36' }],
};

export const shipChandlers = {
  id: 'ship-chandlers', buildingIds: ['l15-20'], kind: 'ship-chandlers', frontEdge: 2, reviewRoad: 'Lorong 15 Geylang',
  name: 'Singapore Ship-Chandlers Association (April 2024 exterior)', address: '20 Lorong 15 Geylang',
  height: 10.75, ceiling: 3.2, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Google Maps lists the Singapore Ship-chandlers Association at 20 Lor 15 Geylang, Singapore 388611 (ssca.sg), and April 2024 Street View shows its board, a knotted-rope logo with 新加坡船務... and SINGAPORE SHIP-CHANDLERS ASSOCIATION, on the weathered cream four-storey house south of Hong Sheng Koon. Two windows on each upper storey, the lower pair three-paned, over a recessed ground floor with a diamond-vent band. ' + south + ' Stored goods and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Singapore+Ship-chandlers+Association+20+Lorong+15', block, ...southPanos],
  colours: { ...whitewash, wall: '#e3dccb' },
  bands: [[10.55, 10.75, .3], [7.1, 7.35, .5], [4.3, 4.5, .3]],
  windows: [{ u: [1.2, 2.2], h: [7.9, 9.1], panes: 2 }, { u: [4.8, 6.2], h: [7.9, 9.1], panes: 2 }, { u: [.9, 2.6], h: [4.9, 6.0], panes: 3 }, { u: [4.75, 6.4], h: [4.9, 6.0], panes: 3 }],
  blocks: diamonds(6.8),
  board: { u: [1.3, 6.3], h: [6.3, 6.9], out: .06 },
  piers: [[0, .3], [6.5, 6.8]],
  backFittings: [{ name: 'door', u: [.6, 1.4], h: [.1, 2.4], colour: '#3e3a36' }, { name: 'grille door', u: [2.0, 2.9], h: [.1, 2.4], colour: '#7a7d7a' }, { name: 'store', u: [3.5, 6.3], h: [.1, 2.6], colour: '#4a4440' }],
};

export const l15Shed = {
  id: 'l15-shed', buildingIds: ['l15-shed'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 15 Geylang',
  name: 'Lean-to south of 20 Lorong 15 Geylang (April 2024 exterior, occupant not identified)', address: 'Lorong 15 Geylang, south of No. 20',
  height: 3.0, ceiling: 2.8, fiveFootWay: .2, roof: { type: 'flat', colour: '#8f9596' },
  evidence: 'A single-storey lean-to under a corrugated roof between the Ship-Chandlers house and the cream building to the south, its contents stored in the open; no name is given. ' + south,
  sources: [block, ...southPanos],
  colours: { wall: '#d9d4c8', trim: '#c9c4b8', frame: '#3a3e40', glass: '#3c4549', back: '#3a3532' },
  backFittings: [{ name: 'open store', u: [.1, 1.2], h: [.1, 2.6], colour: '#4a4440' }],
};

// The cream two-storey building on source way 454254268, south of the Ship-Chandlers, with a stepped parapet.
export const l15Cream = {
  id: 'l15-cream', buildingIds: ['454254268'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 15 Geylang',
  name: 'Cream building south of 20 Lorong 15 Geylang (April 2024 exterior, occupant not identified)', address: 'Lorong 15 Geylang, east side',
  height: 9.6, ceiling: 3.3, fiveFootWay: 1.8, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Unnumbered source way 454254268, south of the Lorong 15 block. April 2024 Street View shows a cream two-storey building with a stepped central parapet, four windows under a blue shade on the upper storey and a shop with a small yellow sign below; no listing could be matched to it, so no name is given. Its photographed frontage spans the source way when read at the 4.4 m depth found next door; the source front is kept. Heights carry about ±0.4 m.',
  sources: ['https://www.openstreetmap.org/way/454254268', pano('dwargxggy9TZvawFPhFm_A', 75, 15, 80), pano('7iK9Np6ddPbTJihC8wW_Qg', 75, 15, 80)],
  colours: whitewash,
  bands: [[9.4, 9.6, .3], [4.6, 4.9, .3]],
  windows: [[.45, 1.4], [2.05, 3.25], [3.9, 4.85], [5.5, 6.4]].map(u => ({ u, h: [5.4, 7.0], panes: 2 })),
  blocks: [
    { name: 'stepped parapet', u: [1.8, 4.9], h: [9.6, 10.5], out: -.05, depth: .25, colour: '#ece6d6' },
    { name: 'stepped parapet crest', u: [2.6, 4.1], h: [10.5, 11.2], out: -.05, depth: .25, colour: '#ece6d6' },
    { name: 'blue shade', u: [.2, 6.6], h: [7.6, 7.75], out: .5, depth: 1.0, colour: '#4f7fa8' },
    { name: 'small yellow sign', u: [2.5, 3.3], h: [2.9, 3.3], out: .05, depth: .04, colour: '#e8c43a' },
  ],
  piers: [[0, .35], [6.4, 6.74]],
  backFittings: [{ name: 'shop', u: [.5, 6.2], h: [.1, 2.9], colour: '#4a4038', glow: .06 }],
};

export const lorong15 = [sinChewTan, teckKeow, hongShengKoon, shipChandlers, l15Shed, l15Cream];
export const lorong15Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong15Layout = (place, width) => simpleHouseLayout(width, place);
export const lorong15Reviews = (place, frame) => facing(frame, place.id, 8, 22);
