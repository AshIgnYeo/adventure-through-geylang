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

// The west side (odd numbers): three-storey walk-ups of the 1960s-70s behind yards, read on April 2024
// frames. Frames run south to north (u from each south party line). Along-street positions carry about
// ±3 m and heights about ±0.5 m: the panoramas agree on these fronts at 1.7 m behind (Nos. 25-33) to 4 m in
// front of (Nos. 5-11) the source front, which is kept, with the source party lines.
const westNote = 'Read on April 2024 Lorong 15 panoramas; they agree on this stretch at a depth that differs from the source front by up to 4 m, so the model keeps the source front and party lines, with along-street positions uncertain by about 3 m and heights by about 0.5 m.';
function walkUp(width, { stair = 'left', upper = 'balcony', colour = '#e3e1d9', storeys = 3 } = {}) {
  const top = storeys * 3.0 + .2, floors = Array.from({ length: storeys - 1 }, (_, i) => 3.2 + i * 3.0);
  const panel = stair === 'left' ? [.2, 1.5] : stair === 'right' ? [width - 1.5, width - .2] : null;
  const bay = panel ? (stair === 'left' ? [1.8, width - .3] : [.3, width - 1.8]) : [.4, width - .4];
  const blocks = [], windows = [];
  if (panel) {
    blocks.push({ name: 'breezeblock stair panel', u: panel, h: [3.3, top - .6], out: .03, depth: .05, colour: '#d9d6cc' });
    for (let y = 3.5; y < top - .8; y += .3) blocks.push({ name: 'breezeblock opening row', u: [panel[0] + .1, panel[1] - .1], h: [y, y + .12], out: .06, depth: .01, colour: '#6a6458' });
  }
  for (const f of floors) {
    blocks.push({ name: 'floor slab', u: [0, width], h: [f - .05, f + .2], out: .4, depth: .8, colour: '#d6d3ca' });
    if (upper === 'lattice') {
      blocks.push({ name: 'lattice screen', u: bay, h: [f + .25, f + 2.6], out: .7, depth: .04, colour: '#ecebe6' });
      for (let x = bay[0] + .1; x < bay[1]; x += .25) blocks.push({ name: 'lattice bar', u: [x, x + .04], h: [f + .25, f + 2.6], out: .73, depth: .02, colour: '#bdbab2' });
    } else if (upper === 'balcony') {
      blocks.push({ name: 'balcony railing', u: bay, h: [f + .9, f + 1.0], out: .75, depth: .05, colour: '#ecebe6' });
      for (let x = bay[0] + .1; x < bay[1]; x += .18) blocks.push({ name: 'railing bar', u: [x, x + .03], h: [f + .2, f + .95], out: .75, depth: .03, colour: '#ecebe6' });
      windows.push({ u: [bay[0] + .3, bay[1] - .3], h: [f + .6, f + 2.3], panes: 4, out: -.3 });
    } else windows.push({ u: [bay[0] + .3, bay[1] - .3], h: [f + .7, f + 2.1], panes: 3 });
  }
  return { height: top, ceiling: 3.0, fiveFootWay: .3, roof: { type: 'flat', colour: '#a9a69e' }, colours: { wall: colour, trim: '#d6d3ca', frame: '#3a3e40', glass: '#3e474b', pier: colour, back: '#3a3532', floor: '#9a978f' },
    bands: [[top - .25, top, .3]], windows, blocks, piers: [[0, .3], [width - .3, width]],
    backFittings: [{ name: 'ground-floor unit', u: [.5, width - .5], h: [.1, 2.8], colour: '#3a3532' }] };
}
const westUnit = (id, way, number, width, opts, extra = {}) => ({ id, buildingIds: [way], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang',
  name: `No. ${number} Lorong 15 Geylang (April 2024 exterior, occupant not identified)`, address: `${number} Lorong 15 Geylang`, ...walkUp(width, opts), ...extra });
const westPanos = [pano('4VkQxUB4x9mQmQdqDyRARQ', 285, 12, 70), pano('dwargxggy9TZvawFPhFm_A', 300, 12, 60), pano('p-KKH3__2aUcyvl6hLhBZQ', 265, 10, 100), pano('pGMXxZekZXq_40rZyzjlcg', 250, 10, 90)];
const tent = (colour, depth = 6) => ({ name: 'yard tent', u: [.1, 6.0], h: [3.7, 3.85], out: 1.0 + depth / 2, depth, colour });

export const westRow = [
  westUnit('l15-33', '1223454579', '33', 6.1, { stair: null, upper: 'lattice' }, { evidence: 'Source way 1223454579 is tagged No. 33. A three-storey walk-up whose upper balconies are enclosed by white lattice screens, with a yellow-tarpaulin yard in front; Myths KTV & Disco Pub is listed at No. 31 and nothing was signed here, so no name is given. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223454579', ...westPanos.slice(0, 2)] }),
  westUnit('l15-31', '1223454580', '31', 6.1, { stair: null, upper: 'lattice' }, { evidence: 'Source way 1223454580 is tagged No. 31, where Myths KTV & Disco Pub is listed, but no sign for it was seen in April 2024, so no name is given. A three-storey walk-up with lattice-screened upper balconies behind the yellow tarpaulin over a Four-Faced Buddha shrine yard, which is not reconstructed. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223454580', ...westPanos.slice(0, 2)] }),
  westUnit('l15-29', '1223454581', '29', 6.1, { stair: 'right', upper: 'balcony' }, { evidence: 'Source way 1223454581 is tagged No. 29, where Fu Shan Tan is listed; the shrine yard\'s signs could not be tied to it, so no name is given. A three-storey walk-up with a breezeblock stair panel and railed balconies. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223454581', ...westPanos.slice(0, 2)] }),
  westUnit('l15-27', '1223454582', '27', 6.1, { stair: 'left', upper: 'balcony', colour: '#dcdad2' }, { evidence: 'Source way 1223454582 is tagged No. 27. A three-storey walk-up with a breezeblock stair panel and railed balconies behind a blue-tented yard; no sign or listing identifies it, so no name is given. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223454582', ...westPanos.slice(0, 2)] }),
  westUnit('l15-25', '1223454583', '25', 6.1, { stair: 'left', upper: 'balcony', colour: '#dcdad2' }, { evidence: 'Source way 1223454583 is tagged No. 25. A three-storey walk-up with a breezeblock stair panel and railed balconies behind a blue-tented yard; no sign or listing identifies it, so no name is given. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223454583', ...westPanos.slice(0, 2)] }),
  westUnit('l15-17j', '1223539239', '17J', 7.41, { stair: 'left', upper: 'balcony' }, { evidence: 'Source way 1223539239 is tagged 17J, and the plate 17J hangs over its gated yard in April 2024, with gilded Buddhist ornaments over the door and a green tent; a vertical sign for a Buddhist association (电话 6741 1552) stands at its south end, but no listing could be matched, so no name is given. A three-storey walk-up with a breezeblock stair panel and railed balconies. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223539239', ...westPanos.slice(1, 3)] }),
  westUnit('l15-17f', '1223539240', '17F', 7.4, { stair: 'right', upper: 'lattice' }, { evidence: 'Source way 1223539240 is tagged 17F. A three-storey walk-up with a breezeblock stair panel and lattice-screened upper balconies; no sign or listing identifies it, so no name is given. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223539240', ...westPanos.slice(2, 3)] }),
  westUnit('l15-11', '1223539237', '11', 5.8, { stair: null, upper: 'windows', storeys: 3 }, { evidence: 'Source way 1223539237 is tagged No. 11, and the plate 11 hangs by its dark recessed entrance beside K Hotel 1515 in April 2024; no sign or listing identifies it, so no name is given. A narrow white three-storey walk-up with louvred windows. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223539237', ...westPanos.slice(3, 4), pano('sk190g6HmylnIEWoWujUmA', 265, 10, 100)] }),
  westUnit('l15-9', '1223539236', '9', 5.81, { stair: null, upper: 'windows', storeys: 3 }, { evidence: 'Source way 1223539236 is tagged No. 9. A white three-storey walk-up with banded windows under hoods and a stepped parapet; a small GinGko Interior Solutions sign hangs at its door, but no listing at this number was found, so no name is given. ' + westNote, sources: ['https://www.openstreetmap.org/way/1223539236', ...westPanos.slice(3, 4), pano('sk190g6HmylnIEWoWujUmA', 265, 10, 100)] }),
];

// Nos. 17 and 17C: the AhlulBayt Educational & Cultural Centre and the Jaafari Muslim Association, signed together.
export const aecc = {
  id: 'aecc-jmas', buildingIds: ['1223539241', '1223539242'], kind: 'aecc-jmas', frontEdge: 0, reviewRoad: 'Lorong 15 Geylang', reviewBuildingId: '1223539241',
  name: 'AhlulBayt Educational & Cultural Centre and Jaafari Muslim Association Singapore (April 2024 exterior)', address: '17 & 17C Lorong 15 Geylang',
  ...walkUp(7.41, { stair: 'right', upper: 'balcony' }),
  evidence: 'Google Maps lists the AhlulBayt Educational & Cultural Centre (AECC) and the Jaafari Muslim Association at 17 Lor 15 Geylang, Singapore 388608, and April 2024 Street View shows their board behind the fence of the walk-up north of K Hotel 1515, reading ... EDUCATIONAL & CULTURAL CENTRE (AECC), JAAFARI MUSLIM ASSOCIATION SINGAPORE (JMAS), 17 & 17C Lorong 15 Geylang. The two source ways tagged 17 and 17C are assigned together, as the board names both numbers, without asserting legal extent. Three-storey walk-ups with breezeblock stair panels and railed balconies behind a green awning and a fenced yard. ' + westNote + ' The interior is not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=AhlulBayt+Educational+Cultural+Centre+17+Lorong+15', 'https://www.openstreetmap.org/way/1223539241', 'https://www.openstreetmap.org/way/1223539242', pano('p-KKH3__2aUcyvl6hLhBZQ', 245, 0, 30)],
};

// Nos. 7 and 5 share one white three-storey building with pedimented windows and a stepped gable, its door
// plated 5, 5A, 5B / 7, 7A, 7B; each way carries half of the elevation.
const pedimented = (id, way, number) => ({
  id, buildingIds: [way], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang',
  name: `No. ${number} Lorong 15 Geylang (April 2024 exterior, occupant not identified)`, address: `${number} Lorong 15 Geylang`,
  height: 9.9, ceiling: 3.4, fiveFootWay: .5, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: `Source way ${way} is tagged No. ${number}. Nos. 5 and 7 share one white three-storey building in April 2024, its door plated 5, 5A, 5B / 7, 7A, 7B: pedimented windows on two upper floors, a stepped gable at the top and a navy awning over a glazed entrance up a short flight of steps. No sign or listing identifies its occupants, so no name is given. ` + westNote,
  sources: [`https://www.openstreetmap.org/way/${way}`, pano('pGMXxZekZXq_40rZyzjlcg', 250, 10, 90), pano('CmAFX4qNXE-oR382np4z9w', 265, 10, 100)],
  colours: { wall: '#ecebe6', trim: '#f4f3ef', frame: '#3a4a5a', glass: '#4b5a68', pier: '#ecebe6', back: '#3a3532', floor: '#a9a59c' },
  bands: [[9.7, 9.9, .3], [3.4, 3.7, .3]],
  windows: [[1.0, 2.2], [3.6, 4.8]].flatMap(u => [{ u, h: [4.6, 6.0], panes: 2, surround: true }, { u, h: [7.2, 8.6], panes: 2, surround: true }]),
  blocks: [[1.0, 2.2], [3.6, 4.8]].flatMap(([l, r]) => [6.0, 8.6].map(t => ({ name: 'window pediment', u: [l - .15, r + .15], h: [t + .2, t + .55], out: .1, depth: .15, colour: '#f4f3ef' })))
    .concat(number === '7' ? [{ name: 'stepped gable', u: [1.5, 5.8], h: [9.9, 10.6], out: -.05, depth: .3, colour: '#ecebe6' }] : [{ name: 'stepped gable', u: [0, 4.3], h: [9.9, 10.6], out: -.05, depth: .3, colour: '#ecebe6' }]),
  awning: number === '5' ? { from: .2, to: 5.6, wall: 3.3, front: 2.9, depth: 1.0, valance: .3 } : undefined,
  piers: [[0, .3], [5.5, 5.8]],
  backFittings: [{ name: 'glazed entrance', u: [.6, 5.2], h: [.4, 2.9], colour: '#4b5a68', glow: .05 }],
});

export const no1 = {
  id: 'l15-1', buildingIds: ['1223539232'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 15 Geylang',
  name: 'No. 1 Lorong 15 Geylang (April 2024 exterior, occupant not identified)', address: '1 Lorong 15 Geylang',
  height: 7.0, ceiling: 4.0, fiveFootWay: .3, roof: { type: 'gable', ridge: 9.0, ridgeDepth: .45, colour: '#2b2d2f', gable: '#3e4246' },
  evidence: 'Source way 1223539232 is tagged No. 1, south of the Lam Clan Association. April 2024 Street View shows a modern two-storey house in dark grey with a black tiled roof, a pergola over a glass-balustraded terrace, a timber-lined canopy and a black slatted gate between tan pillars across a paved forecourt; no sign or listing identifies it, so no name is given. ' + westNote,
  sources: ['https://www.openstreetmap.org/way/1223539232', pano('JkzvyVlpsRIrT46kkKGr6w', 255, 10, 100)],
  colours: { wall: '#3e4246', trim: '#2b2d2f', frame: '#1c1d1e', glass: '#4a5658', pier: '#b58a5a', back: '#2b2826', floor: '#c9c6bd' },
  windows: [{ u: [.5, 1.8], h: [4.6, 5.8], panes: 2 }, { u: [2.4, 4.6], h: [4.6, 5.8], panes: 3 }],
  blocks: [
    { name: 'timber canopy', u: [0, 5.8], h: [4.0, 4.3], out: .9, depth: 1.8, colour: '#7a5a3e' },
    { name: 'glass balustrade', u: [1.2, 5.6], h: [4.35, 5.35], out: .6, depth: .03, colour: '#9fb2b4', glow: .02 },
    { name: 'pergola', u: [.2, 5.6], h: [6.9, 7.05], out: .5, depth: 1.4, colour: '#2b2d2f' },
    { name: 'slatted gate', u: [.6, 5.2], h: [0, 2.3], out: 2.5, depth: .05, colour: '#1f1f20' },
    { name: 'tan gate pillar', u: [0, .6], h: [0, 2.6], out: 2.5, depth: .5, colour: '#b58a5a' }, { name: 'tan gate pillar', u: [5.2, 5.8], h: [0, 2.6], out: 2.5, depth: .5, colour: '#b58a5a' },
  ],
  piers: [[0, .3], [5.5, 5.8]],
  backFittings: [{ name: 'dark entrance', u: [.5, 5.3], h: [.1, 3.8], colour: '#2b2826' }],
};

export const lorong15 = [sinChewTan, teckKeow, hongShengKoon, shipChandlers, l15Shed, l15Cream, ...westRow, aecc, pedimented('l15-7', '1223539235', '7'), pedimented('l15-5', '1223539234', '5'), no1];
export const lorong15Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong15Layout = (place, width) => simpleHouseLayout(width, place);
// West-side walk-ups are reviewed from the middle of Lorong 15; Nos. 9 and 11 sit close to the east edge of the study.
const westReview = { 'l15-11': 9, 'l15-9': 9, 'l15-7': 9, 'l15-5': 8, 'l15-1': 6.5 };
export const lorong15Reviews = (place, frame) => facing(frame, place.id, westReview[place.id] ?? (place.buildingIds[0].startsWith('12234545') || place.buildingIds[0].startsWith('122353') ? 13 : 8), 22);
