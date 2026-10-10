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

export const lorong15 = [sinChewTan, teckKeow];
export const lorong15Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong15Layout = (place, width) => simpleHouseLayout(width, place);
export const lorong15Reviews = (place, frame) => facing(frame, place.id, 8, 22);
