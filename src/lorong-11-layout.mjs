// Lorong 11 Geylang exteriors not covered by an earlier single-place module, from April 2024 Street View.
// Unnamed places (open question 18) carry no business name and leave boards blank. Positions are in each
// footprint's frontage frame: u along the front from frame.a, out towards the street, heights above the
// five-foot-way floor, which stands about 0.5 m above the road on this row.
import { frontageFrame } from './gable-roof-layout.mjs';
import { peranakanLayout } from './peranakan-layout.mjs';
import { facing, simpleHouseLayout } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const unnamed = (number, extra) => ({ kind: 'unnamed', unnamed: true, reviewRoad: 'Lorong 11 Geylang', frontEdge: 0, name: `No. ${number} Lorong 11 Geylang (April 2024 exterior, occupant not identified)`, address: `${number} Lorong 11 Geylang`, ...extra });

// No. 15 is a two-bay conserved Peranakan house on the owner-approved re-spaced footprint, its outline
// wrapping behind Hotel 81 Joy's yard; u runs north from the row start.
export const no15 = unnamed('15', {
  id: 'l11-15', buildingIds: ['l11w-15'], style: 'peranakan',
  evidence: 'The re-spaced No. 15 footprint (open question 1), the first house of the west row beside Hotel 81 Joy\'s yard. April 2024 Street View shows a cream two-bay conserved Peranakan shophouse: five windows with louvred shutters and pierced fretwork fanlights under arched heads, the fourth a full-height French window, with floral tile panels and tiled pilaster strips, a deep moulded cornice and a wide central pier. No listing or sign was found for No. 15, so no name is given. Measured on the H9_p panorama rectified at the row\'s 0.6 m façade depth; heights match the elevation measured at Nos. 19 and 21 once the 0.5 m raised walkway is allowed for, so that elevation is shared. The south bay\'s ground floor is a plain wall with one door; the north bay has two barred windows, a door and fretwork panels. Pallets, wiring and the interior are not reconstructed.',
  sources: [way('1223407884'), pano('H9_pLycpI51HF8H7LV6YxA', 252, 15, 90), pano('s5xUAomPKGxY8ZZLb-YpSA', 290, 12, 80)],
  colours: { wall: '#e8e2d5', trim: '#f1ede4', shutter: '#ebe6da', frame: '#cbc3b2' },
  bays: {
    windows: [[1.33, 2.58], [2.92, 3.92], [5.0, 6.0], [6.33, 7.33], [7.75, 8.75]], full: [3],
    pilasters: [[.3, 1.33], [2.58, 2.92], [3.92, 5.0], [6.0, 6.33], [7.33, 7.75], [8.75, 9.3]],
    piers: [[.3, .9], [4.0, 4.8], [8.75, 9.3]],
  },
  ground: [
    { name: 'plain wall', u: [.9, 4.0], h: [.1, 3.2], colour: '#ece8df' }, { name: 'dark door', u: [3.14, 3.64], h: [.1, 2.3], colour: '#2b2a28', out: .02 },
    { name: 'barred window', u: [5.0, 5.6], h: [1.8, 2.45], colour: '#4e5a5e', out: .02 }, { name: 'grey-blue door', u: [6.07, 6.64], h: [.1, 2.45], colour: '#6f7f8f', out: .02 },
    { name: 'barred window', u: [7.0, 7.64], h: [1.8, 2.45], colour: '#4e5a5e', out: .02 },
    ...[[5.0, 5.6], [6.07, 6.64], [7.0, 7.64]].map(u => ({ name: 'fretwork panel', u, h: [2.9, 3.1], colour: '#d7d2c7', out: .02 })),
  ],
});

// Nos. 23-33: plainer houses of the same re-spaced row (open question 1), read square-on on frames
// rectified at the 0.6 m façade depth; road-datum readings less the 0.5 m walkway step. u runs north
// from each house's south party line.
const rowSources = (id, p, h = 252) => [way(id), pano(p, h, 12, 80)];
const ac = (u, h) => ({ name: 'air conditioner', u, h, out: .3, depth: .5, colour: '#e6e6e2' });
const vents4 = (l, r, h) => Array.from({ length: 4 }, (_, i) => ({ name: 'square vent', u: [l + (r - l) * i / 4 + .1, l + (r - l) * i / 4 + .3], h, out: .02, depth: .03, colour: '#5f6466' }));
const blankBoard = (u, h, colour) => ({ name: 'blank board', u, h, out: .05, depth: .06, colour });

export const no23 = unnamed('23', {
  id: 'l11-23', buildingIds: ['l11w-23'], style: 'simple',
  height: 3.4, ceiling: 3.0, fiveFootWay: .3,
  evidence: 'The re-spaced No. 23 footprint (open question 1). Canton (Foshan) Wong Clan Lion Dance Association and Choo Chin Meng Construction are listed at 23 Lor 11 and a small aestmod auto sign hung here in April 2024, but no clear sign names a current occupant, so no name is given. April 2024 Street View shows a plain white building: a narrow three-storey block over the south 3.5 m, with bands of dark windows on each upper floor under a sheet-metal canopy at about 6.5 m, and a single-storey gated yard to the north, above which No. 25\'s party wall shows. Read on the 64XR panorama rectified at the 0.6 m façade depth.',
  sources: rowSources('1223407882', '64XRklcWkCBOa9KyrvJ_PA'),
  colours: { wall: '#e9e6df', trim: '#dcd8cf', frame: '#2c3033', glass: '#3c4549', pier: '#e9e6df', back: '#3a3735' },
  rooftop: [{ u: [.1, 3.5], top: 6.6, setback: 0, depth: 10, colour: '#e9e6df' }],
  windows: [{ u: [.3, 3.4], h: [3.63, 4.36], panes: 5 }, { u: [.3, 3.4], h: [5.1, 5.85], panes: 5 }],
  blocks: [
    { name: 'sheet-metal canopy', u: [0, 3.6], h: [6.45, 6.6], out: .4, depth: .8, colour: '#b9bcb9' },
    { name: 'mid canopy', u: [0, 3.6], h: [4.55, 4.65], out: .3, depth: .6, colour: '#b9bcb9' },
    { name: 'ground canopy', u: [0, 4.6], h: [3.3, 3.45], out: .5, depth: 1.0, colour: '#9c9f9c' },
    ac([.2, .9], [4.75, 5.15]), ac([2.8, 3.4], [4.75, 5.15]),
    { name: 'yard gate', u: [3.6, 5.95], h: [.1, 2.5], out: .02, depth: .05, colour: '#ecebe6' },
  ],
  backFittings: [{ name: 'roller shutter', u: [.3, 2.5], h: [.1, 2.4], colour: '#5a5652' }, { name: 'office door', u: [2.6, 3.4], h: [.1, 2.2], colour: '#3a3735' }],
});

export const no25 = unnamed('25', {
  id: 'l11-25', buildingIds: ['l11w-25'], style: 'simple',
  height: 8.2, ceiling: 3.0, fiveFootWay: .3,
  evidence: 'The re-spaced No. 25 footprint (open question 1). E-Cool Technology and Honeycomb Design Studio are listed at 25 Lor 11, but the April 2024 frontage carries no sign, its ground floor closed behind white hoarding panels, so no name is given. A white two-storey house with a tall parapet to about 8.2 m: a long window and a smaller window under four square vents, a corrugated canopy across the upper storey and a wall-mounted condenser. Read on the 8kEp panorama rectified at the 0.6 m façade depth.',
  sources: rowSources('1223407881', '8kEpH_Q3jNSaUef89yiXtQ'),
  colours: { wall: '#ecebe6', trim: '#d9d8d2', frame: '#2c3033', glass: '#3c4549', pier: '#ecebe6', back: '#3a3735' },
  bands: [[7.9, 8.2, .3, '#c9c8c2'], [2.85, 3.35, .25]],
  windows: [{ u: [.83, 3.46], h: [4.64, 6.09], panes: 3 }, { u: [4.3, 5.95], h: [4.45, 5.55], panes: 2 }],
  blocks: [
    ...vents4(4.4, 5.9, [6.0, 6.2]), ac([1.7, 2.7], [4.0, 4.6]),
    { name: 'corrugated canopy', u: [0, 6.1], h: [7.3, 7.42], out: .55, depth: 1.1, colour: '#8f9590' },
    { name: 'white hoarding', u: [.6, 5.6], h: [.1, 2.5], out: .05, depth: .05, colour: '#f1f1ed' },
  ],
});

export const no27 = unnamed('27', {
  id: 'l11-27', buildingIds: ['l11w-27'], style: 'simple',
  height: 8.45, ceiling: 2.9, fiveFootWay: 1.8,
  evidence: 'The re-spaced No. 27 footprint (open question 1), plated 27. Hwa Kwang Temple 華光神壇 is listed at 27A, whose stair door stands at the south end, but no temple sign was seen on the frontage, so no name is given. April 2024 Street View shows a weathered two-storey house with a tall parapet to about 8.5 m: two upper windows, the north one under a projecting hood beside a condenser, over a five-foot way with a collapsible gate, a red banner and a dark doorway. Read on the 8kEp panorama rectified at the 0.6 m façade depth.',
  sources: rowSources('1223407880', '8kEpH_Q3jNSaUef89yiXtQ', 240),
  colours: { wall: '#d9d6cf', trim: '#cbc7be', frame: '#2c3033', glass: '#3c4549', pier: '#e2dfd8', back: '#3a3735' },
  bands: [[7.36, 8.45, .3, '#cfccc4'], [2.9, 3.4, .25]],
  windows: [{ u: [1.4, 3.3], h: [4.64, 6.18], panes: 3 }, { u: [4.85, 6.8], h: [4.91, 5.82], panes: 3 }],
  blocks: [{ name: 'window hood', u: [4.4, 7.2], h: [6.55, 6.73], out: .5, depth: 1.0, colour: '#d2cfc8' }, ac([6.0, 7.1], [4.1, 4.8])],
  piers: [[0, .4], [6.9, 7.2]],
  backFittings: [
    { name: 'collapsible gate', u: [.95, 4.5], h: [.1, 2.45], colour: '#8c8f8c' }, { name: 'red banner', u: [1.8, 3.2], h: [2.45, 2.62], colour: '#b02c2a', out: .02 },
    { name: 'dark doorway', u: [4.5, 6.4], h: [.1, 2.5], colour: '#2b2826' },
  ],
});

export const no29a = unnamed('29A', {
  id: 'l11-29a', buildingIds: ['l11w-29a'], style: 'simple',
  height: 8.55, ceiling: 3.0, fiveFootWay: 1.8,
  evidence: 'The authored No. 29A footprint (open question 1), plated 29A, which has no source way of its own, between Eng Lee Huat (No. 29) and Canton Wong (No. 31). LG Renov Services is listed at 29A, but its name could not be read on the two small red boards, so no name is given and both boards are blank. April 2024 Street View shows a white two-storey house with a tall parapet to about 8.6 m: two dark upper windows, each under four square vents, in a framed panel, a condenser between them, and two shops under the five-foot way either side of a central pier. Read on the QQNp panorama rectified at the 0.6 m façade depth.',
  sources: [pano('QQNp4tBAf9BWzHrMOUczcw', 240, 12, 80), pano('H3-9KS_v_QrrAnpO7y28LQ', 300, 12, 80)],
  colours: { wall: '#ecebe6', trim: '#dcdbd5', frame: '#2c3033', glass: '#2f3539', pier: '#ecebe6', back: '#3a3735' },
  bands: [[8.35, 8.55, .3], [3.0, 3.45, .25]],
  windows: [{ u: [.45, 2.37], h: [4.73, 5.87], panes: 2, surround: true }, { u: [3.7, 5.55], h: [4.73, 5.87], panes: 2, surround: true }],
  blocks: [...vents4(.5, 2.3, [6.25, 6.45]), ...vents4(3.75, 5.5, [6.25, 6.45]), ac([2.75, 3.6], [4.0, 4.8]), blankBoard([.5, 2.6], [2.6, 3.0], '#a8322e'), blankBoard([3.7, 5.1], [2.15, 2.55], '#a8322e')],
  piers: [[0, .2], [2.77, 3.6], [5.7, 5.9]],
  backFittings: [{ name: 'dark shop', u: [.2, 2.7], h: [.1, 2.5], colour: '#2f2c2a' }, { name: 'shop door', u: [3.7, 4.8], h: [.1, 2.3], colour: '#3f3a36' }, { name: 'collapsible gate', u: [4.9, 5.6], h: [.1, 2.4], colour: '#8c8f8c' }],
});

export const no33 = unnamed('33', {
  id: 'l11-33', buildingIds: ['l11w-33'], style: 'simple',
  height: 8.73, ceiling: 2.9, fiveFootWay: 1.8,
  evidence: 'The re-spaced No. 33 footprint (open question 1), between Canton Wong (No. 31) and Zheng Li (No. 35). April 2024 Street View shows a spa board (悠雅 SPA) under a navy awning, but no listing for it at 33 Lor 11 was found, so no name is given and the board is blank. A white two-storey house with a tall parapet to about 8.7 m: a south window under a projecting hood and a north window under four square vents, three condensers below them, and glazed shopfronts. Read on the aHF7 panorama rectified at the 0.6 m façade depth.',
  sources: rowSources('1223407877', 'aHF7c6gZTF_nwgN7N0wTwg'),
  colours: { wall: '#ecebe6', trim: '#dcdbd5', frame: '#2c3033', glass: '#3c4549', pier: '#ecebe6', back: '#3a3735' },
  bands: [[8.5, 8.73, .3], [2.9, 3.3, .25]],
  windows: [{ u: [.5, 2.46], h: [4.73, 5.95], panes: 3 }, { u: [3.86, 5.83], h: [4.73, 5.95], panes: 3, surround: true }],
  blocks: [
    { name: 'window hood', u: [0, 2.9], h: [6.82, 7.04], out: .5, depth: 1.0, colour: '#e3e2dc' }, ...vents4(3.95, 5.75, [6.3, 6.5]),
    ac([.1, .75], [3.8, 4.4]), ac([1.8, 2.7], [3.8, 4.4]), ac([3.0, 3.9], [3.8, 4.4]), blankBoard([3.4, 5.2], [2.0, 2.4], '#3a2a1e'),
  ],
  awning: { from: .05, to: 6.25, wall: 2.85, front: 2.5, depth: 1.5, valance: .3 },
  backFittings: [{ name: 'glazed shopfront', u: [.4, 6.0], h: [.1, 2.4], colour: '#3d474b', glow: .08 }],
});

export const lorong11 = [no15, no23, no25, no27, no29a, no33];
export const lorong11Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
/** Rear corners for an irregular outline: the deepest vertices near each end of the front. */
export function lorong11RoofFrame(poly, place) {
  const f = lorong11Frame(poly, place), uv = p => [(p[0] - f.a[0]) * f.dx + (p[1] - f.a[1]) * f.dz, -((p[0] - f.a[0]) * f.nx + (p[1] - f.a[1]) * f.nz)];
  const deepest = end => poly.filter(p => Math.abs(uv(p)[0] - end) < 1.6).sort((p, q) => uv(q)[1] - uv(p)[1])[0];
  return { ...f, rearA: deepest(0), rearB: deepest(f.width) };
}
export function lorong11Layout(place, width) {
  if (place.style === 'simple') return simpleHouseLayout(width, place);
  const base = peranakanLayout(width, place.colours, place.bays), mid = (a, b) => (a + b) / 2;
  for (const g of place.ground ?? []) base.add(g.name, mid(...g.u), mid(...g.h), base.back + (g.out ?? 0), g.u[1] - g.u[0], g.h[1] - g.h[0], .03, g.colour);
  return base;
}
export const lorong11Reviews = (place, frame) => facing(frame, place.id, 9, 18);
