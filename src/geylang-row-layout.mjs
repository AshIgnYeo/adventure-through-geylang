// June 2024 street exteriors on the owner-approved re-spaced Geylang Road row, Nos. 255–267.
// Elevations were read on far-side panoramas rectified on the street front (façade 0.5 m behind it);
// u runs west to east from each house's west party line, heights above the five-foot-way floor.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const row = (pano, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${pano}&heading=${heading}&pitch=8&fov=70`;
export const geylangRowFrame = poly => frontageFrame(poly, 0);

// No. 255 is photographed 5.6 m wide but modelled on the 5.18 m re-spaced bay that keeps Leong Kee's
// source line; its positions are scaled by 0.925 into the bay.
export const tingYuXuan = {
  id: 'ting-yu-xuan', buildingIds: ['gr-255'], kind: 'ting-yu-xuan',
  name: 'Ting Yu Xuan 听雨轩 foot reflexology (June 2024 exterior)', address: '255 Geylang Road',
  height: 7.96, ceiling: 2.36, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists Ting Yu Xuan Pte Ltd, a foot massage parlour, at 255 Geylang Rd, Singapore 389312. June 2024 Street View shows a cream board reading 听雨轩 Ting Yu Xuan with massage photographs and the number 255, and a vertical 听雨轩 blade sign, on the two-storey house directly east of the Leong Kee corner building; its east neighbour carries the 新福興 board numbered #257. The house stands on the owner-approved re-spaced No. 255 footprint (open question 2). It is photographed about 5.6 m wide but modelled in the 5.18 m bay that keeps the source line shared with Leong Kee, with positions scaled by 0.925. Two shuttered windows sit under louvred vents and a tall plain parapet, with a rooftop shed behind. The teal blade sign at the east party line could not be read and is left blank. Photographs, posters and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Ting+Yu+Xuan+255+Geylang+Road', 'https://www.openstreetmap.org/way/454254211', row('-O10SpmBP2FEdlHStFPVdA', 0), row('EWi2140joapW2y_dadfhkA', 20)],
  colours: { wall: '#e2ded3', trim: '#ebe8df', frame: '#5f5b55', glass: '#d9d5cb', back: '#2b2826' },
  bands: [[7.86, 7.96, .25], [6.62, 6.74, .3], [3.45, 3.6, .25]],
  windows: [{ u: [.71, 2.23], h: [4.19, 5.67], panes: 4 }, { u: [2.69, 4.19], h: [4.19, 5.67], panes: 4 }],
  vents: [{ u: [.71, 2.23], h: [5.96, 6.43] }, { u: [2.69, 4.19], h: [5.96, 6.43] }],
  piers: [[0, .5], [4.7, 5.18]],
  board: { u: [.06, 4.6], h: [2.5, 3.21] },
  blades: [{ u: .19, out: [.2, .75], h: [3.57, 6.21] }, { u: 4.62, out: [.2, .6], h: [4.07, 6.79] }],
  rooftop: [{ u: [1.94, 4.44], top: 8.6, setback: 2, depth: 3 }],
  backFittings: [{ name: 'shop doorway', u: [.8, 2.3], h: [.1, 2.3], colour: '#3a3532' }, { name: 'price poster', u: [2.5, 3.4], h: [.6, 2.1], colour: '#efe7dc', out: .02 }],
};

export const keLaiShun = {
  id: 'ke-lai-shun', buildingIds: ['gr-259'], kind: 'ke-lai-shun',
  name: 'Ke Lai Shun Restaurant 客来顺饭店 (June 2024 exterior)', address: '259 Geylang Road',
  height: 7.93, ceiling: 2.3, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists 客来顺饭店, a restaurant, at 259 Geylang Rd, Singapore 389315, open in October 2026. June 2024 Street View shows a red board reading 客来顺 KE LAI SHUN RESTAURANT with a handshake roundel and 川東北菜 lettering, and a red vertical 客来顺 sign numbered 259, on the two-storey house between the shuttered 新福興 (No. 257, listed permanently closed) and the Instyle house (No. 261). It stands on the owner-approved re-spaced No. 259 footprint (open question 2), 5.25 m wide as measured. Two windows with open grey shutters sit under louvred vents and a tall plain parapet, with a rooftop shed behind. The glazed shopfront is simplified and the interior is not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=%E5%AE%A2%E6%9D%A5%E9%A1%BA%E9%A5%AD%E5%BA%97+259+Geylang+Road', 'https://www.openstreetmap.org/way/454254209', row('Euugks0_rEGqzhRP8bLR1Q', 345), row('-O10SpmBP2FEdlHStFPVdA', 15)],
  colours: { wall: '#e0ddd5', trim: '#ebe9e2', frame: '#8f918e', glass: '#3e474b', back: '#45413d' },
  bands: [[7.83, 7.93, .25], [6.62, 6.74, .3], [3.62, 3.74, .25]],
  windows: [{ u: [.31, 1.53], h: [4.1, 5.64], shutters: true }, { u: [2.84, 4.1], h: [4.1, 5.64], shutters: true }],
  vents: [{ u: [.23, 1.96], h: [5.9, 6.36] }, { u: [2.49, 4.19], h: [5.9, 6.36] }],
  piers: [[0, .3], [4.49, 4.89]],
  board: { u: [.05, 4.49], h: [2.33, 3.6] },
  blades: [{ u: .12, out: [.2, .7], h: [3.5, 6.75] }],
  rooftop: [{ u: [1.7, 4.4], top: 8.6, setback: 2, depth: 3 }],
  backFittings: [{ name: 'glazed shopfront', u: [.5, 4.4], h: [.1, 2.2], colour: '#4f5a5c', glow: .05 }],
};

export const mobileTime = {
  id: 'mobile-time', buildingIds: ['gr-263'], kind: 'mobile-time',
  name: 'Mobile Time (Lor 13) (June 2024 exterior)', address: '263 Geylang Road',
  height: 6.6, ceiling: 2.7, fiveFootWay: 1.8, frontEdge: 0, reviewRoad: 'Geylang Road', roof: { type: 'hip', ridge: 7.7, colour: '#a85a43' },
  evidence: 'Google Maps lists Mobile Time (Lor 13), a cell phone store, at 263 Geylang Rd, Singapore 389319, with current hours. June 2024 Street View shows a black SAMSUNG / Mobile Time board numbered 263 over a purple SIMBA awning and a lit phone shop, on the lilac two-storey house with three arched white-shuttered windows under a tiled roof, between the Instyle house (No. 261) and the Shi Hao corner. It stands on the owner-approved re-spaced No. 263 footprint (open question 2), 5.4 m wide as measured. The Samsung mark is shown as plain lettering; displays, posters and the interior are not reconstructed. The roof is estimated as hipped.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Mobile+Time+263+Geylang+Road', 'https://www.openstreetmap.org/way/454254207', row('qlix72cVwRmaU5XrvZip_g', 345), row('Euugks0_rEGqzhRP8bLR1Q', 20)],
  colours: { wall: '#bdb8d2', trim: '#d8d6e2', frame: '#f2f2ef', glass: '#c9cfd1', back: '#e9e6dd' },
  bands: [[6.42, 6.6, .45, '#8f8b9e']],
  windows: [.49, 2.01, 3.59].map((l, i) => ({ u: [l, [1.56, 3.1, 4.67][i]], h: [3.93, 5.71], arched: true, panes: 2 })),
  piers: [[0, .35], [5.05, 5.4]],
  board: { u: [.05, 5.07], h: [2.96, 3.86] },
  awning: { from: .05, to: 5.35, wall: 2.85, front: 2.45, depth: .8, valance: .35 },
  backFittings: [{ name: 'lit phone shop', u: [.4, 5.0], h: [.1, 2.6], colour: '#e7e4dc', glow: .35 }, { name: 'phone counter', u: [1.6, 3.6], h: [.1, 1.0], colour: '#d1d4d6', out: .5, depth: .6 }],
};

export const shiHao = {
  id: 'shi-hao', buildingIds: ['gr-267'], kind: 'shi-hao',
  name: 'Shi Hao Hotpot BBQ 食好火锅烧烤 (June 2024 exterior)', address: '267 Geylang Road, #01-01 (Lorong 13 corner)',
  height: 7.21, ceiling: 2.39, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road', roof: { type: 'hip', ridge: 8.5, colour: '#a85a43' },
  evidence: 'Google Maps lists Shi Hao Hotpot BBQ 食好火锅烧烤 at 267 Geylang Rd, #01-01, Singapore 389688; Rising Sun Tattoos is also listed at No. 267. June 2024 Street View shows the cream two-storey corner block with four arched upper windows between pilasters under a hipped tiled roof, a long grey 食好火锅烧烤 SHI HAO Hot Pot BBQ board on both the Geylang Road and Lorong 13 faces, a RISING SUN TATTOOS blade sign near the chamfered corner and a CHOK DEE blade sign at the middle pilaster. It stands on the owner-approved authored corner footprint (open question 2): 8.35 m of Geylang Road front from the Mobile Time party line, an estimated 0.8 m chamfer, and a Lorong 13 face 2.1 m east of the source edge, measured from three Lorong 13 panoramas. The Lorong 13 face is modelled more simply, from oblique views. Lights, menus, the interior and a possible rear annex are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Shi+Hao+Hotpot+BBQ+267+Geylang+Road', 'https://www.openstreetmap.org/way/454254205', row('qlix72cVwRmaU5XrvZip_g', 5), row('I1fselNK0PQ33yWYjwvMYg', 330), 'https://www.google.com/maps/@?api=1&map_action=pano&pano=KZ8gY_VJ15F7O0jKFFNB8w&heading=255&pitch=10&fov=90'],
  colours: { wall: '#e7e2d6', trim: '#d9cdb8', frame: '#f4f2ec', glass: '#3b4448', pier: '#e0dbcf', back: '#2f2b28' },
  bands: [[7.05, 7.25, .45], [6.3, 6.45, .2], [4.95, 5.05, .12], [3.75, 3.9, .3]],
  pilasters: [[0, .25, 3.9, 7.05], [3.86, 4.46, 3.9, 7.05], [7.7, 8.2, 3.9, 7.05]],
  windows: [.84, 2.4, 4.79, 6.33].map(l => ({ u: [l, l + .94], h: [4.14, 5.71], arched: true, surround: true, panes: 2 })),
  piers: [[0, .3], [3.89, 4.39], [7.8, 8.35]],
  board: { u: [.1, 8.3], h: [2.39, 3.74] },
  blades: [{ u: 4.3, out: [.2, .55], h: [3.79, 5.86] }, { u: 8.15, out: [.2, .85], h: [3.67, 6.47] }],
  backFittings: [{ name: 'menu posters', u: [.4, 2.6], h: [.3, 2.2], colour: '#8a3b2a' }, { name: 'restaurant glazing', u: [2.8, 7.6], h: [.1, 2.3], colour: '#3d4447', glow: .05 }],
};

// No. 257: the shuttered 新福興 eating house, listed permanently closed, so the house is unnamed (open question 18).
export const no257 = {
  id: 'gr-257', buildingIds: ['gr-257'], kind: 'unnamed', unnamed: true,
  name: 'No. 257 Geylang Road (June 2024 exterior, occupant not identified)', address: '257 Geylang Road',
  height: 8.0, ceiling: 2.15, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road',
  evidence: 'The re-spaced No. 257 footprint (open question 2), 5.2 m wide as measured. June 2024 Street View shows a red board reading 新福興 with 傳統潮州粿汁 and #257 over a roller shutter; the business, Sin Hock Heng Eating House, is listed permanently closed, so no name is given and the board is left blank, following the ABC Bistro precedent. Two windows with closed grey panelled shutters sit under louvred vents and a tall plain parapet, as at Nos. 255 and 259, read on two far-side panoramas rectified 0.5 m behind the street front. The 客来顺 blade sign at the east party line belongs to No. 259.',
  sources: ['https://www.openstreetmap.org/way/454254210', row('-O10SpmBP2FEdlHStFPVdA', 10), row('Euugks0_rEGqzhRP8bLR1Q', 340)],
  colours: { wall: '#dbdad3', trim: '#e6e5df', frame: '#8f928f', glass: '#9a9d9a', pier: '#e2e1db', back: '#3a3532' },
  bands: [[7.9, 8.0, .25], [6.8, 7.0, .3], [3.6, 3.85, .25]],
  windows: [{ u: [.75, 2.33], h: [4.18, 5.68], panes: 4 }, { u: [2.87, 4.47], h: [4.18, 5.68], panes: 4 }],
  vents: [{ u: [.75, 2.42], h: [5.97, 6.43] }, { u: [2.83, 4.5], h: [5.97, 6.43] }],
  piers: [[0, .5], [4.92, 5.2]],
  blocks: [{ name: 'blank red board', u: [.33, 4.92], h: [2.22, 3.13], out: .05, depth: .06, colour: '#c42b2b' }],
  rooftop: [{ u: [1.2, 4.6], top: 8.6, setback: 2, depth: 3 }],
  backFittings: [{ name: 'roller shutter', u: [1.5, 4.37], h: [.1, 1.93], colour: '#b9bbb6' }, { name: 'side door', u: [.58, 1.25], h: [.1, 2.0], colour: '#3a3532' }],
};

// No. 261: the signed Instyle Hair Salon, modelled as a dated exterior under open question 12.
export const instyle = {
  id: 'instyle', buildingIds: ['gr-261'], kind: 'instyle',
  name: 'Instyle Hair Salon (June 2024 exterior)', address: '261 Geylang Road',
  height: 6.6, ceiling: 2.1, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road', roof: { type: 'hip', ridge: 7.6, colour: '#b0624a' },
  evidence: 'June 2024 Street View shows an INSTYLE HAIR SALON board and Instyle Hair salon lettering on the glazed salon front of the dark grey two-storey house on the re-spaced No. 261 footprint (open question 2), 5.85 m wide as measured, between Ke Lai Shun (No. 259) and Mobile Time (No. 263). The only Instyle Hair listing found is a branch on Crawford Lane, so under the owner\'s answer to open question 12 the clearly signed salon is modelled as a dated exterior, without claiming a current address. Three windows with open brown shutters sit under louvred vents and a grey eaves band below a tiled roof, read on two far-side panoramas rectified 0.5 m behind the street front; the roof is estimated as hipped, with a rooftop room behind. The barber pole, posters, blade signs and interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Instyle+Hair+Salon+Singapore', 'https://www.openstreetmap.org/way/454254208', row('Euugks0_rEGqzhRP8bLR1Q', 15), row('qlix72cVwRmaU5XrvZip_g', 340)],
  colours: { wall: '#4f575c', trim: '#5c6469', frame: '#5a3a2c', glass: '#d8d4cb', pier: '#4f575c', back: '#e7e4dc' },
  bands: [[6.13, 6.6, .3, '#6e7377'], [3.63, 3.85, .25]],
  windows: [[1.42, 2.5], [2.97, 4.05], [4.53, 5.58]].map(u => ({ u, h: [4.02, 5.18], panes: 2, shutters: true })).map((w, i) => i === 2 ? { ...w, u: [4.4, 5.3] } : w),
  vents: [{ u: [1.42, 2.5], h: [5.38, 5.6] }, { u: [2.97, 4.05], h: [5.38, 5.6] }, { u: [4.4, 5.3], h: [5.38, 5.6] }],
  piers: [[0, .4], [5.55, 5.85]],
  board: { u: [1.25, 4.92], h: [2.52, 3.52], out: .06 },
  rooftop: [{ u: [1.0, 4.6], top: 8.0, setback: 3.5, depth: 3 }],
  backFittings: [{ name: 'lit salon front', u: [1.08, 4.67], h: [.1, 2.0], colour: '#e7e4dc', glow: .35 }, { name: 'salon door', u: [.45, 1.0], h: [.1, 2.0], colour: '#3b3f42' }],
};

export const geylangRow = [tingYuXuan, no257, keLaiShun, instyle, mobileTime, shiHao];
export const geylangRowLayout = (place, width) => simpleHouseLayout(width, place);
export const geylangRowReviews = (place, frame) => facing(frame, place.id, 9, 16, place.id === 'shi-hao' ? [{ id: 'shi-hao-corner', at: [frame.width + 6, 7], look: [frame.width - 1, 0], pitch: 14 }] : []);
