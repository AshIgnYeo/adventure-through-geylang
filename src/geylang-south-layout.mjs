// June 2024 exteriors on the south side of Geylang Road, Nos. 236-250, on the owner-approved split of
// block 454438330 (open question 16). Positions were read on panoramas rectified 2.4 m in front of the
// source front, where they agree; s runs east along the front from the Lorong 10 corner. Each unit's
// frame runs east to west (u = s1 - s) and heights are on the road datum.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const block = 'https://www.openstreetmap.org/way/454438330';
const rowPanos = [pano('qlix72cVwRmaU5XrvZip_g', 185, 10, 90), pano('cBqbRTlVc3dH2YibOH0LvA', 167, 12, 90), pano('jYF-BzVq__RpGZWD3Tplwg', 167, 12, 90)];
const depthNote = 'Positions were read on June 2024 panoramas rectified 2.4 m in front of the source front, where triangulation and the panoramas agree (the drive\'s known position error), and the unit stands on its strip of the owner-approved split (open question 16); heights carry about ±0.4 m.';

// The cream four-storey row with maroon trim, Nos. 236-244: two upper storeys of maroon-framed windows
// under louvred vents, a deep maroon hood over the first, a broad eaves band on top.
const M = { ceiling: 4.0, floorBand: [5.7, 5.95], lower: [6.05, 7.6], lowerVents: [7.9, 8.25], hood: [8.4, 8.6], band: [9.7, 9.95], upper: [10.3, 12.0], upperVents: [12.1, 12.4], top: 12.8 };
const maroon = { wall: '#ebe3d2', trim: '#9a4e45', frame: '#8f4a41', glass: '#d9d2c4', pier: '#ebe3d2', back: '#3a312c', floor: '#a49a8f' };

function maroonUnit({ id, number, s: [s0, s1], windows, hoods, extra = {}, unnamed = true, ...rest }) {
  const u = ([a, b]) => [s1 - b, s1 - a], width = s1 - s0;
  return {
    id, buildingIds: [`gr-${number}`], frontEdge: number === '236' ? 1 : 0, reviewRoad: 'Geylang Road', address: `${number} Geylang Road`,
    ...(unnamed ? { kind: 'unnamed', unnamed: true } : {}),
    height: M.top, ceiling: M.ceiling, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 14.2, colour: '#7d4a40' },
    colours: maroon,
    bands: [[M.top - .3, M.top, .7, '#8f4a41'], [M.band[0], M.band[1], .2, maroon.trim], [M.floorBand[0], M.floorBand[1], .25, maroon.trim]],
    windows: windows.flatMap(w => [{ u: u(w), h: M.lower, panes: 2, surround: true }, { u: u(w), h: M.upper, panes: 2, surround: true }]),
    vents: windows.flatMap(w => [{ u: u(w), h: M.lowerVents }, { u: u(w), h: M.upperVents }]),
    pilasters: [[0, .3, M.floorBand[1], M.top - .3], [width - .3, width, M.floorBand[1], M.top - .3]],
    blocks: [...(hoods ?? [[s0 + .2, s1 - .2]]).map(h => ({ name: 'maroon hood', u: u(h), h: M.hood, out: .5, depth: 1.0, colour: '#8a4a40' })), ...(extra.blocks ?? [])],
    piers: [[0, .35], [width - .35, width]],
    ...rest,
  };
}

const coffeeshop = 'June 2024 Street View shows a coffeeshop under green columns and a scalloped maroon awning across the corner unit and No. 238; Aladdin\'s Kopi House is listed at 236 Geylang Rd, but no name could be read on the frontage, so no name is given.';
export const no236 = maroonUnit({
  id: 'gr-236', number: '236', s: [0, 9.9], name: 'No. 236 Geylang Road, Lorong 10 corner (June 2024 exterior, occupant not identified)',
  windows: [[6.1, 7.3], [7.6, 9.0], [1.2, 2.4]], hoods: [[5.4, 9.6], [.5, 3.0]],
  evidence: coffeeshop + ' The corner unit of the cream four-storey row with maroon trim; its chamfered corner and Lorong 10 face are simplified onto the source corner. ' + depthNote,
  sources: [block, ...rowPanos.slice(0, 1)],
  backFittings: [{ name: 'open coffeeshop', u: [.4, 9.5], h: [.1, 3.6], colour: '#3a2e28', glow: .05 }],
  extra: { blocks: [[.2, .65], [4.2, 4.75], [9.3, 9.75]].map(u => ({ name: 'green column', u, h: [0, 3.9], out: .1, depth: .5, colour: '#6aa83a' })) },
});
export const no238 = maroonUnit({
  id: 'gr-238', number: '238', s: [9.9, 16.6], name: 'No. 238 Geylang Road (June 2024 exterior, occupant not identified)',
  windows: [[10.9, 12.2], [12.6, 13.9], [14.3, 15.5]],
  evidence: coffeeshop + ' Three maroon-framed windows on each upper storey under a deep hood. ' + depthNote,
  sources: [block, ...rowPanos.slice(0, 1)],
  awning: { from: .2, to: 6.5, wall: 3.95, front: 3.2, depth: 1.8, valance: .3 },
  backFittings: [{ name: 'open coffeeshop', u: [.4, 6.3], h: [.1, 3.6], colour: '#3a2e28', glow: .05 }],
  extra: { blocks: [[.15, .7]].map(u => ({ name: 'green column', u, h: [0, 3.9], out: .1, depth: .5, colour: '#6aa83a' })) },
});
export const monsterInk = maroonUnit({
  id: 'monster-ink', number: '240', s: [16.6, 21.0], unnamed: false, kind: 'monster-ink',
  name: 'Monster Ink tattoo studio (June 2024 exterior)',
  windows: [[17.3, 18.6], [18.9, 20.1]],
  evidence: 'Google Maps lists Monster Ink Singapore, a tattoo and piercing shop, at 240 Geylang Rd, open in October 2026, and June 2024 Street View shows its white MONSTER INK TATTOO board numbered 240 over a hair and beauty salon on this unit of the cream row with maroon trim; Doubble Interior is listed at 240B and its DOUBBLE lettering stands on the parapet. The narrow unit has two maroon-framed windows on each upper storey. ' + depthNote + ' The salon posters and interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Monster+Ink+240+Geylang+Road', block, ...rowPanos.slice(0, 2)],
  board: { u: [.05, 4.35], h: [4.4, 5.5], out: .08 },
  boards: [{ u: [.3, 3.6], h: [12.85, 13.6], out: .05 }],
  backFittings: [{ name: 'lit salon front', u: [.4, 4.0], h: [.1, 3.6], colour: '#d6cfc4', glow: .25 }],
});
export const no242 = maroonUnit({
  id: 'gr-242', number: '242', s: [21.0, 27.5], name: 'No. 242 Geylang Road (June 2024 exterior, occupant not identified)',
  windows: [[22.1, 23.4], [23.8, 24.9], [25.5, 26.6]],
  evidence: 'June 2024 Street View shows a black restaurant board numbered #242 with a vertical sign and red lanterns on this unit of the cream row with maroon trim. No listing for the restaurant was found, and Crown Paints, listed at No. 242, has no sign, so no name is given and the boards are blank. Three maroon-framed windows on each upper storey under a deep hood. ' + depthNote,
  sources: [block, ...rowPanos.slice(1, 2)],
  extra: { blocks: [{ name: 'blank black board', u: [.3, 6.0], h: [4.6, 5.7], out: .1, depth: .08, colour: '#1c1c1d' }, { name: 'blank vertical sign', u: [5.95, 6.45], h: [5.9, 9.0], out: .35, depth: .1, colour: '#1c1c1d' }] },
  awning: { from: .2, to: 6.3, wall: 4.1, front: 3.6, depth: 1.6, valance: .25 },
  backFittings: [{ name: 'restaurant front', u: [.4, 6.1], h: [.1, 3.6], colour: '#4a2a26', glow: .1 }, ...[1.2, 2.2, 3.2, 4.2, 5.2].map(c => ({ name: 'red lantern', u: [c - .15, c + .15], h: [3.1, 3.5], colour: '#c8322d', out: .6, depth: .3, glow: .3 }))],
});
export const shadowTattoo = maroonUnit({
  id: 'shadow-tattoo', number: '244', s: [27.5, 33.5], unnamed: false, kind: 'shadow-tattoo',
  name: 'Shadow Tattoo 皮影刺青 (June 2024 exterior)',
  windows: [[28.4, 29.5], [29.9, 31.0], [31.4, 32.4]],
  evidence: 'June 2024 Street View shows a black SHADOW TATTOO 皮影刺青 ACADEMY board, a vertical TATTOO 刺青 blade sign and a glazed studio front on this unit of the cream row with maroon trim, with a COSY CORNER private-working-space board upstairs. Google Maps now lists Shadow Tattoo Singapore at 345 Geylang Rd (Pavilion Square), so under the owner\'s answer to open question 12 the signed studio is modelled as a dated exterior, without claiming it is here now; Dental Solution JD is listed at 244A. The Cosy Corner board is blank. ' + depthNote,
  sources: ['https://www.google.com/maps/search/?api=1&query=Shadow+Tattoo+Singapore', block, ...rowPanos.slice(1, 3)],
  board: { u: [.15, 5.7], h: [4.4, 5.6], out: .1 },
  blades: [{ u: 5.8, out: [.3, 1.2], h: [6.0, 10.0] }],
  extra: { blocks: [{ name: 'blank Cosy Corner board', u: [.6, 5.2], h: [7.65, 8.25], out: .1, depth: .06, colour: '#f2f1ee' }] },
  backFittings: [{ name: 'glazed studio front', u: [.9, 4.9], h: [.1, 3.3], colour: '#3d4549', glow: .08 }, { name: 'roller shutter', u: [4.9, 5.6], h: [.1, 3.3], colour: '#c9ccc7' }],
});

// No. 246: a narrow glass curtain-wall block under a pale-blue frame and gabled top.
export const no246 = {
  id: 'gr-246', buildingIds: ['gr-246'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'No. 246 Geylang Road (June 2024 exterior, occupant not identified)', address: '246 Geylang Road',
  height: 14.0, ceiling: 4.2, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 15.8, ridgeDepth: .2, colour: '#3d5a86', gable: '#c9d6e6' },
  evidence: 'June 2024 Street View shows a black 剪爱 HairSalon board over a glazed salon on a narrow five-storey building: four storeys of green-tinted glazing in a pale-blue frame with blue bands, under a gabled top. No listing for the salon was found, so no name is given and the board is blank. ' + depthNote,
  sources: [block, pano('jYF-BzVq__RpGZWD3Tplwg', 167, 12, 90)],
  colours: { wall: '#c9d6e6', trim: '#8fa7c9', frame: '#d7e0ea', glass: '#7fa7a1', pier: '#1f1f20', back: '#2e3436' },
  bands: [[13.8, 14.0, .3, '#3d5a86'], [11.6, 11.8, .2, '#3d5a86'], [8.9, 9.1, .2, '#3d5a86'], [5.9, 6.1, .2, '#3d5a86']],
  windows: [[6.1, 8.9], [9.1, 11.6], [11.8, 13.8]].map(h => ({ u: [.4, 6.7], h, panes: 6, out: .02 })),
  blocks: [{ name: 'blank black board', u: [0, 7.1], h: [4.3, 5.8], out: .08, depth: .08, colour: '#1f1f20' }],
  piers: [[0, .5], [6.6, 7.1]],
  backFittings: [{ name: 'glazed salon', u: [.6, 6.5], h: [.1, 3.9], colour: '#3f4a4d', glow: .12 }],
};

// No. 248: the cream block of the Nanyang Lian Clan Association, with BKK Forex at street level.
export const nanyangLian = {
  id: 'nanyang-lian', buildingIds: ['gr-248'], kind: 'nanyang-lian', frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Nanyang Lian Clan Association building (June 2024 exterior)', address: '248 Geylang Road',
  height: 11.5, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a8a59e' },
  evidence: 'Google Maps lists the Nanyang Lian Clan Assn at 248 Geylang Rd, and Bkk Forex Pte Ltd and Choo Mee Jin Apparel there too. June 2024 Street View shows a yellow 南洋連氏公會 NANYANG LIAN CLAN ASSOCIATION board on the cream three-storey block, a FOOCHOW DIONGLOK ASSOCIATION SINGAPORE board beneath it and a blue BKK FOREX board numbered 248 over the shops. The association is modelled as one signed tenant, as at Hainan Lim; the Foochow Dionglok board, with no listing found, is left plain. Windows in pairs on each upper storey under a flat parapet. ' + depthNote + ' Shop stock, phone-network boards and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Nanyang+Lian+Clan+Association+248+Geylang+Road', 'https://www.google.com/maps/search/?api=1&query=BKK+Forex+248+Geylang+Road', block, pano('jYF-BzVq__RpGZWD3Tplwg', 167, 12, 90), pano('1udsor6p2plZzO-0C3V8yg', 160, 12, 90)],
  colours: { wall: '#ece6d4', trim: '#ddd6c3', frame: '#5b6266', glass: '#4b555a', pier: '#ece6d4', back: '#3a3532' },
  bands: [[11.3, 11.5, .25], [7.0, 7.2, .2], [4.0, 4.25, .25]],
  windows: [[1.7, 3.0], [3.4, 4.7], [6.2, 7.5], [8.4, 9.7]].flatMap(u => [{ u, h: [5.3, 6.4], panes: 2 }, { u, h: [8.3, 9.6], panes: 2 }]),
  blocks: [{ name: 'plain Foochow Dionglok board', u: [.4, 5.5], h: [6.4, 7.0], out: .06, depth: .04, colour: '#e9d9a3' }],
  board: { u: [.6, 5.0], h: [7.5, 8.2], out: .07 },
  boards: [{ u: [.3, 5.3], h: [4.3, 5.2], out: .09 }],
  piers: [[0, .4], [10.7, 11.1]],
  awning: { from: 5.6, to: 10.6, wall: 3.9, front: 3.3, depth: 1.4, valance: .3 },
  backFittings: [{ name: 'forex office', u: [.5, 5.4], h: [.1, 3.6], colour: '#3e4a4e', glow: .08 }, { name: 'shop', u: [5.6, 10.6], h: [.1, 3.6], colour: '#4a3a32', glow: .06 }],
};

// No. 250: a narrow four-storey block with deep balcony slabs at the east end of the block.
export const no250 = {
  id: 'gr-250', buildingIds: ['gr-250'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'No. 250 Geylang Road (June 2024 exterior, occupant not identified)', address: '250 Geylang Road',
  height: 14.0, ceiling: 4.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a8a59e' },
  evidence: 'The east end of the split block. June 2024 Street View shows a narrow cream four-storey block with deep balcony slabs at each floor over the Mufiz Prata Corner, which is listed permanently closed, so no name is given and its boards are blank. ' + depthNote,
  sources: [block, pano('1udsor6p2plZzO-0C3V8yg', 160, 12, 90)],
  colours: { wall: '#e3dccb', trim: '#d6cfbd', frame: '#4a5054', glass: '#3e474b', pier: '#e3dccb', back: '#3a3532' },
  bands: [[13.8, 14.0, .3]],
  windows: [[1.0, 2.5], [2.9, 4.3]].flatMap(u => [{ u, h: [5.0, 6.8], panes: 2 }, { u, h: [8.4, 10.1], panes: 2 }, { u, h: [11.7, 13.4], panes: 2 }]),
  blocks: [7.3, 10.7].map(y => ({ name: 'balcony slab', u: [.3, 5.0], h: [y, y + .2], out: .7, depth: 1.4, colour: '#ddd6c4' })),
  piers: [[0, .4], [4.87, 5.27]],
  awning: { from: .3, to: 5.0, wall: 3.9, front: 3.3, depth: 1.6, valance: .25 },
  backFittings: [{ name: 'closed shop', u: [.5, 4.8], h: [.1, 3.6], colour: '#4a4440' }],
};

// Nos. 218-230, between Lorong 8 and Lorong 10, on the owner-approved split of block 454438340 (open
// question 11). Read on June 2024 panoramas rectified 0.9 m in front of the source front, where the
// triangulated party piers put the street front; u runs west from each east party line.
const westBlock = 'https://www.openstreetmap.org/way/454438340';
const westPanos = [pano('yLxdM90ecueaqOeXgMp-2g', 168, 12, 90), pano('7-UfHDndnVbmRSMy3AWU9w', 168, 12, 90), pano('x9pb4XARIUjp2Lxgfw5uyg', 168, 12, 90)];
const westNote = 'Positions were read on June 2024 panoramas rectified 0.9 m in front of the source front, where triangulated party piers put the street front and three panoramas agree; the unit stands on its strip of the owner-approved split (open question 11), and heights carry about ±0.4 m.';
const greyHouse = { wall: '#c7cdd0', trim: '#e6e9e9', frame: '#f4f4f2', glass: '#3e474b', pier: '#d9dddf', back: '#3a3532', floor: '#a49a8f' };
const hoods = (spans, h, colour) => spans.map(u => ({ name: 'window hood', u: [u[0] - .25, u[1] + .25], h, out: .45, depth: .9, colour }));
const twoStoreys = (spans, lower, upper, panes = 2) => spans.flatMap(u => [{ u, h: lower, panes }, { u, h: upper, panes }]);

export const no218 = {
  id: 'gr-218', buildingIds: ['gr-218'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Geylang Road',
  name: 'Lorong 8 corner, Geylang Road south side (June 2024 exterior, occupant not identified)', address: 'Geylang Road at Lorong 8 (south side)',
  height: 12.6, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 14.0, colour: '#6f777a' },
  evidence: 'The Lorong 8 corner of the split block. June 2024 Street View shows a grey four-storey corner building with white-framed windows under dark grey hoods, a corner balcony, and the LẬP PHƯƠNG NAM Vietnamese restaurant at street level, which is listed at 218 Geylang Rd and permanently closed, so no name is given and its board is blank. The photographed corner stands about 3 m east of the source block\'s west end; the curved corner is simplified. ' + westNote,
  sources: [westBlock, pano('ZvONx9MbvuKGcqhHe87DTQ', 185, 12, 90), ...westPanos.slice(0, 1)],
  colours: greyHouse,
  bands: [[12.3, 12.6, .6, '#7b8487'], [4.4, 4.75, .3]],
  windows: twoStoreys([[1.25, 2.95], [4.05, 5.65]], [5.6, 7.15], [9.4, 11.2]),
  vents: [[1.25, 2.95], [4.05, 5.65]].map(u => ({ u, h: [11.4, 11.8] })),
  blocks: [...hoods([[1.25, 2.95], [4.05, 5.65]], [8.5, 8.7], '#7b8487'), { name: 'corner balcony', u: [6.6, 8.3], h: [6.0, 7.1], out: .6, depth: 1.2, colour: '#d9dddf' }, { name: 'blank restaurant board', u: [.5, 6.5], h: [3.4, 3.95], out: .08, depth: .06, colour: '#2b2a28' }],
  piers: [[0, .4], [6.0, 6.5], [11.2, 11.65]],
  backFittings: [{ name: 'restaurant front', u: [.5, 11.0], h: [.1, 3.9], colour: '#3a332e', glow: .1 }],
};

export const tianTian = {
  id: 'tian-tian', buildingIds: ['gr-220'], kind: 'tian-tian', frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Tian Tian Minimart 天天超市 (June 2024 exterior)', address: 'Geylang Road, south side (listed at No. 218)',
  height: 12.6, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 14.0, colour: '#6f777a' },
  evidence: 'Google Maps lists Tian Tian Minimart, a grocery store, at 218 Geylang Rd, and June 2024 Street View shows its red 天天超市 Tian Tian Minimart board over the five-foot way of the grey four-storey house next to the Lorong 8 corner building. Two white-framed windows on each upper storey under dark grey hoods. An orange self-service kiosk stands on the walkway. ' + westNote + ' Stock and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Tian+Tian+Minimart+218+Geylang+Road', westBlock, ...westPanos.slice(0, 2)],
  colours: greyHouse,
  bands: [[12.3, 12.6, .6, '#7b8487'], [4.4, 4.75, .3]],
  windows: twoStoreys([[.8, 2.3], [3.6, 5.2]], [5.6, 7.15], [9.4, 11.2]),
  vents: [[.8, 2.3], [3.6, 5.2]].map(u => ({ u, h: [7.35, 7.7] })),
  blocks: [...hoods([[.8, 2.3], [3.6, 5.2]], [8.5, 8.7], '#7b8487'), { name: 'orange kiosk', u: [4.9, 5.8], h: [0, 2.1], out: .6, depth: .7, colour: '#e8792e' }],
  board: { u: [.3, 5.0], h: [3.2, 3.95], out: .08 },
  piers: [[0, .35], [5.9, 6.25]],
  backFittings: [{ name: 'minimart front', u: [.4, 5.8], h: [.1, 3.9], colour: '#4a3a32', glow: .12 }],
};

export const takeToys = {
  id: 'taketoys', buildingIds: ['gr-222'], kind: 'taketoys', frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'TakeToys adult store (June 2024 exterior)', address: '222 Geylang Road',
  height: 12.8, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 14.0, colour: '#9a5a46' },
  evidence: 'Google Maps lists the TakeToys adult store (taketoys.sg) at Geylang Rd #1/F, Singapore 389282, the postcode of No. 222, open in October 2026, and June 2024 Street View shows its pink 10,000+ items 成人用品超级市场 taketoys.sg and Adult Toys Supermarket boards on the beige four-storey house between Tian Tian Minimart and the blue building, under a striped awning. Two windows on each upper storey under red-brown hoods. ' + westNote + ' Window displays and the interior are not reconstructed; the boards carry plain lettering only.',
  sources: ['https://www.google.com/maps/search/?api=1&query=TakeToys+Geylang+Road', westBlock, ...westPanos.slice(0, 3)],
  colours: { wall: '#ead6b5', trim: '#f0e3cc', frame: '#3a3e40', glass: '#3c4549', pier: '#b0346a', back: '#3a3532', floor: '#a49a8f' },
  bands: [[12.5, 12.8, .3], [4.4, 4.6, .3]],
  windows: twoStoreys([[.4, 1.9], [3.1, 4.6]], [5.9, 7.9], [9.7, 11.6]),
  blocks: [...hoods([[.4, 1.9], [3.1, 4.6]], [8.3, 8.5], '#a65a46'), { name: 'striped awning', u: [0, 5.7], h: [4.85, 5.0], out: .5, depth: 1.0, colour: '#d7dde3' }],
  board: { u: [.15, 5.55], h: [4.4, 4.85], out: .09 },
  boards: [{ u: [.6, 4.9], h: [3.2, 4.2], out: .07 }],
  piers: [[0, .45], [5.25, 5.7]],
  backFittings: [{ name: 'shop front', u: [.5, 5.2], h: [.1, 3.9], colour: '#2f2b30', glow: .12 }],
};

export const no224 = {
  id: 'gr-224', buildingIds: ['gr-224'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Blue four-storey building, Geylang Road south side (June 2024 exterior, occupant not identified)', address: 'Geylang Road, south side, between Lorong 8 and Lorong 10',
  height: 12.6, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'June 2024 Street View shows a wide blue four-storey building with four bays of white-framed windows under orange-capped hoods, a navy band of floral decals under its eaves and a stepped ornamental crest, over a 7-Eleven and a provision shop. 7-Eleven is listed at 222 Geylang Rd, a number this frontage does not carry, so no name is given and the shop signs are plain. ' + westNote,
  sources: [westBlock, ...westPanos.slice(1, 3)],
  colours: { wall: '#6b7dbd', trim: '#5b6db0', frame: '#f4f4f2', glass: '#3e474b', pier: '#eeeeea', back: '#3a3532', floor: '#a49a8f' },
  bands: [[12.0, 12.6, .4, '#2f3a6a'], [4.85, 5.6, .3, '#3e4f92']],
  windows: twoStoreys([[1.15, 2.9], [4.2, 5.95], [7.3, 9.0], [10.2, 11.9]], [6.0, 7.9], [10.35, 12.0 - .1]),
  blocks: [
    ...hoods([[1.15, 2.9], [4.2, 5.95], [7.3, 9.0], [10.2, 11.9]].map(([l, r]) => [l + .2, r - .2]), [8.5, 8.7], '#c87a4a'),
    ...[1.6, 3.4, 5.2, 7.0, 8.8, 10.6].map(u => ({ name: 'floral decal', u: [u, u + .7], h: [12.15, 12.45], out: .21, depth: .01, colour: '#e3c79a' })),
    { name: 'ornamental crest', u: [6.1, 8.4], h: [12.6, 13.3], out: -.1, depth: .3, colour: '#5b6db0' }, { name: 'crest finial', u: [7.0, 7.5], h: [13.3, 13.8], out: -.1, depth: .3, colour: '#c87a4a' },
    { name: 'plain convenience-store sign', u: [0, 1.8], h: [4.2, 4.8], out: .1, depth: .06, colour: '#f2f2ee' },
    { name: 'maroon awning', u: [2.0, 8.0], h: [3.6, 3.75], out: .5, depth: 1.0, colour: '#9a2f3a' },
  ],
  piers: [[0, .4], [6.0, 6.4], [11.8, 12.2]],
  backFittings: [{ name: 'convenience store', u: [.4, 5.8], h: [.1, 3.9], colour: '#3e474b', glow: .15 }, { name: 'provision shop', u: [6.5, 11.7], h: [.1, 3.9], colour: '#4a3a32', glow: .06 }],
};

export const no228 = {
  id: 'gr-228', buildingIds: ['gr-228'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Cream four-storey house, Geylang Road south side (June 2024 exterior, occupant not identified)', address: 'Geylang Road, south side, between Lorong 8 and Lorong 10',
  height: 12.6, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 14.0, colour: '#9a5a46' },
  evidence: 'June 2024 Street View shows a cream four-storey house with two windows on each upper storey under grey hoods, east of the blue building, with a small shop sign at street level that could not be read. Agarwood World Gallery and others are listed at 228 Geylang Rd, but the number could not be matched to this frontage, so no name is given. ' + westNote,
  sources: [westBlock, ...westPanos.slice(1, 3)],
  colours: { wall: '#ece6d6', trim: '#ddd6c4', frame: '#4a4f52', glass: '#3c4549', pier: '#ece6d6', back: '#3a3532', floor: '#a49a8f' },
  bands: [[12.3, 12.6, .3], [4.4, 4.7, .3]],
  windows: twoStoreys([[.6, 2.3], [3.3, 5.0]], [6.0, 7.9], [10.3, 12.0]),
  blocks: hoods([[.6, 2.3], [3.3, 5.0]], [8.5, 8.7], '#9a9893'),
  piers: [[0, .35], [5.05, 5.4]],
  backFittings: [{ name: 'shop front', u: [.4, 5.0], h: [.1, 3.9], colour: '#4a3a32', glow: .08 }],
};

export const no230 = {
  id: 'gr-230', buildingIds: ['gr-230'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'White block at Lorong 10, Geylang Road south side (June 2024 exterior, occupant not identified)', address: 'Geylang Road at Lorong 10 (south side)',
  height: 12.9, ceiling: 3.8, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'The east end of the split block, by Lorong 10. June 2024 Street View shows a tall, plain white building with narrow vertical slit windows and red-framed windows on its east end, a yellow ABC ... 23 HOURS vertical sign, and a fruit stall under a green awning at street level; HALAL Singapore Nasi Kandar is listed at 232, but no sign could be matched, so no name is given and the vertical sign is blank. ' + westNote,
  sources: [westBlock, pano('x9pb4XARIUjp2Lxgfw5uyg', 190, 12, 90), pano('EWi2140joapW2y_dadfhkA', 220, 12, 90)],
  colours: { wall: '#ecebe6', trim: '#dddcd6', frame: '#a8433a', glass: '#3c4549', pier: '#ecebe6', back: '#3a3532', floor: '#a49a8f' },
  bands: [[12.7, 12.9, .3]],
  windows: [{ u: [.3, 1.5], h: [6.0, 7.4], panes: 2, surround: true }, { u: [.3, 1.5], h: [9.4, 10.8], panes: 2, surround: true }],
  blocks: [
    ...[2.4, 5.8].map(u => ({ name: 'slit window', u: [u, u + .35], h: [5.8, 11.2], out: .02, depth: .03, colour: '#56656b' })),
    { name: 'blank yellow vertical sign', u: [1.7, 2.3], h: [5.4, 7.6], out: .35, depth: .1, colour: '#e8c43a' },
    { name: 'green awning', u: [1.8, 8.0], h: [3.4, 3.55], out: .6, depth: 1.2, colour: '#2f6b55' },
  ],
  piers: [[0, .4], [7.85, 8.27]],
  backFittings: [{ name: 'fruit stall', u: [2.0, 7.8], h: [.1, 3.0], colour: '#6a3a2a', glow: .08 }],
};

// No. 258, ChongQingXiaoMian, the two-storey corner east of Lorong 12 on the split of block 454438318.
// Its signed long face is on Lorong 12 (edge 3, u south from the Geylang Road corner), behind covered
// dining; Lorong 12 is not in the derived road set.
export const chongQing = {
  id: 'chongqing-xiaomian', buildingIds: ['gr-258'], kind: 'chongqing-xiaomian', frontEdge: 3, reviewRoad: 'Geylang Road',
  name: 'ChongQingXiaoMian 重庆小面 (June 2024 exterior)', address: '258 Geylang Road (Lorong 12 corner)',
  height: 8.0, ceiling: 4.0, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Google Maps lists ChongQingXiaoMian - Geylang Lor 12, a coffee shop, at 258 Geylang Rd, Singapore 389314, open in October 2026, its point inside the corner strip, and June 2024 Street View shows its red 重庆小面 boards and a picture board reading Chong Qing Noodles on the cream-and-orange two-storey corner building east of Lorong 12, with tables under a red awning along Lorong 12. The building stands on the owner-approved split of block 454438318 (open question 11), whose east part runs beyond the study edge. Heights come from two oblique June 2024 frames with the wall somewhere between the source edge and the satellite roof edge 3.5 m inside it, so they carry about ±1 m: the ground storey to about 4 m, eaves about 8 m. The Geylang Road face is simplified to its windows. Tables, menus and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=ChongQingXiaoMian+258+Geylang+Road', 'https://www.openstreetmap.org/way/454438318', pano('GoN_sSIIHBlMwIISLNgVww', 120, 12, 90), pano('_w5yHraTw78BWJJ4wn1RSQ', 150, 10, 100)],
  colours: { wall: '#efd89a', trim: '#e8a072', frame: '#3a3e40', glass: '#3e474b', pier: '#efe3c4', back: '#3a2f2a', floor: '#a49a8f' },
  bands: [[7.8, 8.0, .6, '#e9cf8a'], [4.0, 4.4, .3, '#e8a072']],
  windows: [{ u: [1.2, 3.2], h: [5.0, 6.6], panes: 2 }, { u: [5.8, 7.6], h: [5.0, 6.6], panes: 2 }, { u: [10.2, 11.8], h: [5.0, 6.6], panes: 2 }, { u: [13.2, 14.2], h: [5.0, 6.6], panes: 1 }],
  blocks: [{ name: 'orange upper wall', u: [8.6, 19.9], h: [4.4, 7.8], out: .02, depth: .04, colour: '#e8a072' }],
  board: { u: [1.0, 5.6], h: [4.45, 5.0], out: .08 },
  boards: [{ u: [8.8, 13.0], h: [4.45, 5.0], out: .08 }],
  awning: { from: .2, to: 19.7, wall: 3.9, front: 2.9, depth: 3.0, valance: .35 },
  piers: [[0, .5], [19.5, 19.98]],
  backFittings: [{ name: 'coffeeshop front', u: [.6, 19.3], h: [.1, 3.6], colour: '#4a3a2e', glow: .1 }],
};

export const geylangSouth = [chongQing, no218, tianTian, takeToys, no224, no228, no230, no236, no238, monsterInk, no242, shadowTattoo, no246, nanyangLian, no250];
export const geylangSouthFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const geylangSouthLayout = (place, width) => simpleHouseLayout(width, place);
export const geylangSouthReviews = (place, frame) => place.id === 'chongqing-xiaomian' ? [] : facing(frame, place.id, 12, 18);
