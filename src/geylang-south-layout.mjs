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

export const geylangSouth = [no236, no238, monsterInk, no242, shadowTattoo, no246, nanyangLian, no250];
export const geylangSouthFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const geylangSouthLayout = (place, width) => simpleHouseLayout(width, place);
export const geylangSouthReviews = (place, frame) => facing(frame, place.id, 12, 18);
