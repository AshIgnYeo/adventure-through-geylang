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

export const geylangRow = [tingYuXuan, keLaiShun, mobileTime, shiHao];
export const geylangRowLayout = (place, width) => simpleHouseLayout(width, place);
export const geylangRowReviews = (place, frame) => facing(frame, place.id, 9, 16, place.id === 'shi-hao' ? [{ id: 'shi-hao-corner', at: [frame.width + 6, 7], look: [frame.width - 1, 0], pitch: 14 }] : []);
