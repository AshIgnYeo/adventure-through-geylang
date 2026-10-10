// June 2024 exteriors at the west end of the widened study area (open question 26): Geylang Road west of
// No. 223, the Lorong 7 corners and the south side opposite. Unnamed unless a listing and signage agree.
// Positions come from party lines triangulated from two panoramas; heights are read on that plane.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;

// Geylang Road north side, from the Lorong 7 corner east to the modelled No. 223 (u runs east from the corner).
// Triangulated from i-vtf... and U23w...: the corner pier lies on the source front, 1.6 m short of the source
// corner, and the party lines fall 4.6, 9.0 and 13.5 m east of it. The east 4.5 m of the strip is where both
// panoramas place the house with the Lor 9 Frog Porridge board, modelled as No. 223 one strip further east
// (open question 28).
export const no221West = {
  id: 'gr-221-west', buildingIds: ['gr-221-west'], kind: 'unnamed', unnamed: true, frontEdge: 6, reviewRoad: 'Geylang Road',
  name: 'Peranakan row at the Lorong 7 corner, Geylang Road Nos. 217-221 (June 2024 exterior, occupants not identified)', address: '217-221 Geylang Road',
  height: 7.7, ceiling: 3.3, fiveFootWay: 2.0, roof: { type: 'hip', ridge: 9.3, colour: '#b4643f' },
  // The Lorong 7 side wall runs back slightly off square, so the shell stands in from it.
  shellInset: .2,
  evidence: 'June 2024 Street View shows three two-storey Peranakan shophouses east of the Lorong 7 corner under orange tiled roofs: the chamfered corner house with three arched louvred windows over a red GONG HE GUAN board (Gong He Guan, a dessert restaurant, is listed at 217 Geylang Rd), the next with three arched louvred windows over a BBQ HOME board (listed at No. 219 and permanently closed), and a white house with three louvred windows over arched five-foot-way openings. East of them, inside this strip, stands the cream house with tiled pilasters and the red Geylang Lor 9 Fresh Frog Porridge board that the earlier split modelled as No. 223 one strip further east. The boards are blank until the row is re-spaced and its strips match the houses (open question 28). Party lines were triangulated from two June 2024 panoramas and heights read on that plane.',
  sources: [way('453797929'), pano('i-vtfVn07QFERJ6yuTUUtA', 338, 14, 100), pano('U23wEgPybSSNqmMh7jNGZQ', 20, 12, 100)],
  colours: { wall: '#eeeeea', trim: '#e6e4dc', frame: '#7d939c', glass: '#9fb0b6', pier: '#eeeeea', back: '#3a3330', floor: '#a59c90' },
  bands: [[7.5, 7.7, .4], [6.5, 7.0, .2], [3.3, 3.6, .25]],
  windows: [
    ...[[1.2, 2.1], [3.4, 4.3], [4.7, 5.6], [6.6, 7.6], [7.9, 8.9], [9.1, 10.0]].map(u => ({ u, h: [3.85, 6.3], arched: true })),
    ...[[10.8, 11.7], [12.05, 13.05], [13.3, 14.25]].map(u => ({ u, h: [3.6, 6.3] })),
    { u: [16.0, 17.1], h: [4.0, 5.9] }, { u: [18.0, 19.1], h: [4.0, 5.9] },
  ],
  blocks: [
    ...[[.9, 1.1], [2.75, 2.95], [6.2, 6.4], [8.95, 9.1]].map(u => ({ name: 'brown pilaster', u, h: [3.6, 6.5], out: .06, depth: .12, colour: '#a5643e' })),
    { name: 'cream east house', u: [15.1, 19.62], h: [3.3, 7.5], out: .005, depth: .02, colour: '#e6e2cf' },
    ...[[15.4, 15.8], [17.4, 17.8], [19.15, 19.5]].map(u => ({ name: 'tiled pilaster', u, h: [3.8, 6.2], out: .05, depth: .08, colour: '#9fc4c0' })),
    { name: 'blank red board', u: [1.3, 5.9], h: [3.05, 3.65], out: .08, depth: .05, colour: '#a8242a' },
    { name: 'blank dark board', u: [6.4, 10.0], h: [3.05, 3.7], out: .08, depth: .05, colour: '#2b2422' },
    { name: 'black fascia', u: [15.3, 19.4], h: [2.3, 2.67], out: .06, depth: .05, colour: '#1c1c1d' },
    { name: 'blank red board', u: [16.6, 18.5], h: [2.0, 2.3], out: .08, depth: .04, colour: '#8a2a2a' },
  ],
  piers: [[.25, .7], [5.9, 6.15], [10.3, 10.55], [15.0, 15.25], [19.3, 19.6]],
  backFittings: [
    { name: 'dessert shop front', u: [.5, 5.9], h: [.1, 3.0], colour: '#3a2f2a', glow: .12 },
    { name: 'closed shop front', u: [6.2, 10.2], h: [.1, 3.0], colour: '#2a2422' },
    { name: 'arched openings', u: [10.6, 14.9], h: [.1, 2.9], colour: '#3d3a36' },
    { name: 'roller shutter', u: [15.3, 19.3], h: [.1, 2.3], colour: '#c0c2be' },
  ],
};

// The 1939 Art Deco block on the west corner of Lorong 7 (north side). Triangulated from YzaF... and XDg9...:
// the front lies 0.6-0.9 m behind the source front and its pilasters fall at 0, 4.9, 10.1 and 14.0 m from the
// west end, matching the source; heights are corrected for that depth (x1.04 about the camera height).
export const corner1939 = {
  id: 'gr-lorong-7-west', buildingIds: ['453797928'], kind: 'unnamed', unnamed: true, frontEdge: 11, reviewRoad: 'Geylang Road', review: [19.5, 11],
  name: 'Art Deco block dated 1939 at the Lorong 7 corner, Geylang Road (June 2024 exterior, occupants not identified)', address: 'Geylang Road at Lorong 7 (north-west corner)',
  height: 12.1, ceiling: 3.0, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9b98' },
  evidence: 'June 2024 Street View shows a white three-storey Art Deco block on the west corner of Lorong 7: four bays between full-height pilasters with stepped finials, brown-framed windows under slatted blue-grey hoods on both upper storeys, a blue-grey parapet band with three stacked ornaments, a chamfered corner panel lettered 1939, and a five-foot way behind square piers with closed shopfronts. No listing could be matched to the frontage, so no name is given. Positions and heights were read on the plane where two panoramas agree, 0.6-0.9 m behind the source front; the chamfer is drawn on the straight source front.',
  sources: [way('453797928'), pano('YzaFE5nFKXtllNur6DCYtA', 300, 14, 100), pano('XDg9gq6MdstjLQ3GT6eWxg', 20, 14, 100), pano('i-vtfVn07QFERJ6yuTUUtA', 283, 14, 100)],
  colours: { wall: '#ecedeb', trim: '#4a5f74', frame: '#8a3e2c', glass: '#3a3f42', pier: '#ecedeb', back: '#3a3836', floor: '#a49d93' },
  shellInset: .25,
  bands: [[3.0, 3.63, .25], [7.42, 7.52, .12]],
  windows: [[1.0, 2.2], [3.0, 4.1], [5.75, 6.95], [8.0, 9.1], [10.9, 12.7], [14.5, 15.4]].flatMap(u => [{ u, h: [4.67, 6.12], panes: 2 }, { u, h: [8.4, 9.76], panes: 2 }]),
  blocks: [
    { name: 'parapet band', u: [.3, 13.8], h: [10.9, 12.05], out: .02, depth: .04, colour: '#4a5f74' },
    { name: 'corner date panel', u: [14.1, 15.6], h: [10.4, 12.0], out: .06, depth: .1, colour: '#4a5f74' },
    ...[[1.0, 2.2], [3.0, 4.1], [5.75, 6.95], [8.0, 9.1], [10.9, 12.7], [14.5, 15.4]].flatMap(u => [6.17, 9.8].map(y => ({ name: 'slatted hood', u: [u[0] - .15, u[1] + .15], h: [y, y + .7], out: .3, depth: .6, colour: '#4b5866' }))),
    ...[2.7, 7.6, 11.9].map(c => ({ name: 'parapet ornament', u: [c - .25, c + .25], h: [11.1, 12.5], out: .12, depth: .15, colour: '#dfe1e2' })),
    ...[[0, .45], [4.7, 5.2], [9.8, 10.3], [13.7, 14.2]].map(u => ({ name: 'full-height pilaster', u, h: [3.63, 12.6], out: .1, depth: .2, colour: '#f3f4f2' })),
  ],
  piers: [[.25, .7], [4.7, 5.2], [9.8, 10.3], [13.7, 14.2], [15.3, 15.75]],
  backFittings: [
    { name: 'green door', u: [1.7, 2.8], h: [.1, 2.3], colour: '#2c6a55' },
    { name: 'shop glazing', u: [6.0, 7.4], h: [.6, 2.2], colour: '#5a4038' },
    { name: 'dark entrance', u: [8.0, 9.3], h: [.1, 2.7], colour: '#2a2e30' },
    { name: 'shop glazing', u: [10.5, 12.9], h: [.6, 2.2], colour: '#5a4038' },
  ],
};

// Geylang Road south side, west end. u runs west from each building's east corner.
// No. 198: triangulated from U23w... and i-vtf..., the grey block's front stands 0.7-1.3 m in front of the
// source front and runs from 2.2 to 23.2 m; the last 3.5 m is a narrow cream house. Heights x0.9.
export const no198 = {
  id: 'gr-198', buildingIds: ['454254201'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Geylang Road',
  name: 'Grey office block, 198 Geylang Road (June 2024 exterior, occupants not identified)', address: '198 Geylang Road',
  height: 16.1, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8e908e' },
  evidence: 'June 2024 Street View shows a grey four-storey concrete block with deep window frames and sunshade ledges on three upper storeys, blue gas-company awnings and several restaurant and reflexology boards over the ground floor, and a narrow cream house at its west end. Tenants are listed on several floors (for example a Thai restaurant at #02-02), so the building is not named after any of them and the boards are blank. Widths and heights were read where two panoramas agree, 0.7-1.3 m in front of the source front; the block keeps the source front.',
  sources: [way('454254201'), pano('U23wEgPybSSNqmMh7jNGZQ', 181, 14, 100), pano('i-vtfVn07QFERJ6yuTUUtA', 200, 14, 100)],
  colours: { wall: '#8f918f', trim: '#7d807e', frame: '#3b4042', glass: '#3e4a4f', pier: '#8f918f', back: '#3a3836', floor: '#a49d93' },
  bands: [[15.4, 16.1, .3], [8.0, 8.3, .45], [11.6, 11.9, .45]],
  windows: [
    ...[[3.0, 11.5], [12.3, 15.6], [16.4, 22.8]].flatMap(u => [{ u, h: [5.79, 7.23], panes: Math.round((u[1] - u[0]) / 1.4) }, { u, h: [8.75, 10.55], panes: Math.round((u[1] - u[0]) / 1.4) }]),
    { u: [3.0, 22.8], h: [12.2, 13.8], panes: 12 },
  ],
  blocks: [
    { name: 'cream west house', u: [23.2, 26.6], h: [4.3, 12.5], out: .02, depth: .04, colour: '#e3dccb' },
    { name: 'blue awning', u: [2.5, 13.0], h: [3.4, 4.2], out: 1.0, depth: 1.8, colour: '#1f55b0' },
    { name: 'blue awning', u: [18.8, 23.0], h: [3.4, 4.2], out: 1.0, depth: 1.8, colour: '#1f55b0' },
    { name: 'blank board', u: [3.0, 10.4], h: [4.4, 5.35], out: .1, depth: .05, colour: '#efe3c0' },
    { name: 'blank board', u: [15.5, 19.0], h: [4.4, 5.25], out: .1, depth: .05, colour: '#2a2a2a' },
    { name: 'blank board', u: [19.6, 23.0], h: [4.4, 5.25], out: .1, depth: .05, colour: '#2a2a2a' },
    { name: 'blank green sign', u: [23.6, 26.4], h: [4.5, 5.4], out: .1, depth: .05, colour: '#3a9a50' },
    ...[3.0, 5.0, 7.0, 9.0, 11.5, 12.3, 15.6, 16.4, 18.5, 20.6, 22.8].map(c => ({ name: 'concrete fin', u: [c - .15, c + .15], h: [5.6, 14.0], out: .25, depth: .5, colour: '#8a8c8a' })),
  ],
  piers: [[.3, .9], [13.0, 13.5], [23.0, 23.4]],
  backFittings: [{ name: 'restaurant fronts', u: [1.0, 22.8], h: [.1, 4.0], colour: '#3a332e', glow: .12 }, { name: 'shop front', u: [23.4, 26.4], h: [.1, 3.8], colour: '#4a4a3e' }],
};

// No. 200: triangulated from YzaF... and XDg9..., its front stands about 1.2 m in front of the source front;
// the boards fall at 8.2-13.2 m and the curved west corner ends at 19.4 m. Heights x0.8.
export const no200 = {
  id: 'gr-200', buildingIds: ['454254200'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road', review: [-3.5, 10],
  name: 'Cream Art Deco shophouses, Geylang Road south side (June 2024 exterior, occupants not identified)', address: 'Geylang Road, south side, west of No. 198',
  height: 12.8, ceiling: 4.4, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#9a9790' },
  evidence: 'June 2024 Street View shows a cream three-storey Art Deco building with horizontal salmon mouldings and a curved west corner: louvred and casement windows on two upper storeys, and three shops under a black LED-sign board, a yellow restaurant board and a black BBQ BOX board. No listing could be matched with confidence, so no name is given and the boards are blank. Positions and heights were read where two panoramas agree, about 1.2 m in front of the source front; the curved corner is drawn square on the source front.',
  sources: [way('454254200'), pano('YzaFE5nFKXtllNur6DCYtA', 200, 12, 100), pano('XDg9gq6MdstjLQ3GT6eWxg', 160, 12, 100)],
  colours: { wall: '#e2dccb', trim: '#c4906e', frame: '#5d7a66', glass: '#3e4a4f', pier: '#e2dccb', back: '#3a3532', floor: '#a49d93' },
  bands: [[12.5, 12.8, .4], [7.9, 8.6, .3], [6.0, 6.15, .15], [11.4, 11.55, .15]],
  windows: [[.6, 1.9], [2.6, 3.9], [5.0, 6.3], [8.6, 9.8], [10.6, 11.6], [12.6, 13.8], [15.6, 16.8], [17.8, 18.6]]
    .flatMap(u => [{ u, h: [6.2, 7.45], panes: 2 }, { u, h: [9.9, 11.3], panes: 2 }]),
  blocks: [
    { name: 'blank black board', u: [.6, 7.6], h: [4.6, 6.0], out: .1, depth: .06, colour: '#262626' },
    { name: 'blank yellow board', u: [8.2, 13.2], h: [4.75, 5.8], out: .1, depth: .06, colour: '#e9c96a' },
    { name: 'blank black board', u: [13.6, 18.9], h: [4.7, 6.0], out: .1, depth: .06, colour: '#262626' },
    { name: 'LED blade', u: [7.7, 7.9], h: [4.6, 8.4], out: .5, depth: .8, colour: '#1c1f2a' },
  ],
  piers: [[0, .5], [7.8, 8.2], [13.2, 13.6], [18.5, 18.9]],
  backFittings: [
    { name: 'sign shop front', u: [.5, 7.8], h: [.1, 4.2], colour: '#2b2a33', glow: .25 },
    { name: 'restaurant front', u: [8.2, 13.2], h: [.1, 4.2], colour: '#6a2a28', glow: .12 },
    { name: 'BBQ shop front', u: [13.6, 18.5], h: [.1, 4.2], colour: '#3a332e', glow: .12 },
  ],
};

// Sims Avenue west of Lorong 9 and Lorong 9's west side.
// Rozel Furniture: triangulated from lKJT... and 7hgj..., the five-foot-way columns stand 0.4-0.6 m in front of
// the source front at 0.7, 5.2, 10.0 and 14.6 m from the west end and the building ends at 24.8 m. Heights x0.94.
export const rozel = {
  id: 'rozel-furniture', buildingIds: ['439168683'], kind: 'rozel-furniture', frontEdge: 3, reviewRoad: 'Sims Avenue',
  name: 'Rozel Furniture (June 2024 exterior)', address: '51 Sims Avenue',
  height: 8.7, ceiling: 3.8, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a7a39c' },
  evidence: 'Google Maps lists Rozel Furniture Sims Avenue, a furniture store open in October 2026, at 51 Sims Ave, Singapore 387414, and its point lies inside this source way. June 2024 Street View shows maroon Rozel furniture 一站式家具广场 boards and furniture photo banners across the five-foot way of a pale pink two-storey building with black-framed windows under louvred vents, a yellow eave and a set-back yellow-edged top storey, on the north side of Sims Avenue. The listing places the store in the Geylang Square Flatted Factory Building; no claim is made about the rest of that building. Columns and building ends were triangulated from two June 2024 panoramas and heights read on that plane; the façade is kept on the source front, whose east 2.6 m is drawn as part of the building although the photographed building ends there. Banners are plain panels; stock and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Rozel+Furniture+51+Sims+Avenue', way('439168683'), pano('lKJTqy9UA5LpPhL8wtwzcw', 14, 15, 100), pano('7hgj4HMwK3e8jI1KlxTaMQ', 344, 15, 100)],
  colours: { wall: '#e9dcd8', trim: '#ddd2ce', frame: '#1f2224', glass: '#2e3437', pier: '#ece2de', back: '#3a3532', floor: '#b8b2a6' },
  bands: [[8.45, 8.7, .3, '#efe6e2'], [7.65, 7.98, .7, '#e3c13a']],
  windows: [[1.7, 4.3], [6.8, 9.4], [11.1, 13.8], [15.2, 17.8], [19.2, 21.8], [22.8, 23.5], [23.8, 24.6]].map(u => ({ u, h: [5.29, 6.52], panes: u[1] - u[0] > 1 ? 4 : 1 })),
  vents: [[1.7, 4.3], [6.8, 9.4], [11.1, 13.8], [15.2, 17.8], [19.2, 21.8], [22.8, 24.6]].map(u => ({ u, h: [6.8, 7.32] })),
  blocks: [
    { name: 'photo banner', u: [4.4, 14.0], h: [3.85, 5.1], out: .08, depth: .04, colour: '#8a7e6e' },
    { name: 'photo banner', u: [18.0, 24.8], h: [3.85, 5.1], out: .08, depth: .04, colour: '#4c4a4a' },
  ],
  boards: [{ u: [.4, 4.3], h: [3.85, 5.15], out: .1 }, { u: [14.1, 17.9], h: [3.85, 5.15], out: .1 }],
  piers: [[.45, .9], [4.95, 5.4], [9.75, 10.2], [14.35, 14.8], [19.1, 19.55], [24.4, 24.85]],
  rooftop: [{ u: [4.4, 10.2], top: 9.9, setback: 3.0, depth: 6.0, colour: '#efe6e2' }],
  backFittings: [{ name: 'showroom glazing', u: [10.3, 24.3], h: [.3, 3.3], colour: '#5a4a3e', glow: .15 }, { name: 'closed bay', u: [.9, 10.0], h: [.1, 3.6], colour: '#e2d6d2' }],
};

// The block behind Rozel Furniture, mostly hidden from Sims Avenue: drawn as massing only.
export const behindRozel = {
  id: 'sims-51-rear', buildingIds: ['1223603464'], kind: 'unnamed', unnamed: true, massing: true, height: 9.9, colour: '#e6dcd6',
  name: 'Block behind Rozel Furniture, Sims Avenue (massing only)', address: 'Sims Avenue, north side, west of Lorong 9',
  evidence: 'A source way directly behind the Rozel Furniture building, hidden from Sims Avenue in June 2024 Street View apart from roof structures above the eave. Drawn as plain massing at the height of the set-back storey seen over Rozel; its form and use are not established.',
  sources: [way('1223603464'), pano('7hgj4HMwK3e8jI1KlxTaMQ', 344, 15, 100)],
};

// No. 56 Sims Avenue: triangulated from lKJT... and UAXP..., the front runs 0.45-12.76 m west from the east corner,
// 0.6-0.75 m in front of the source front, with round columns at 3.5 and 9.7 m. Heights x0.93.
export const no56Sims = {
  id: 'sims-56', buildingIds: ['1223603461'], kind: 'unnamed', unnamed: true, frontEdge: 1, reviewRoad: 'Sims Avenue', review: [-13, 9],
  name: 'Neoclassical hotel building, 56 Sims Avenue (June 2024 exterior, operator not identified)', address: '56 Sims Avenue',
  height: 16.0, ceiling: 4.7, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#a5a39e' },
  evidence: 'June 2024 Street View shows a white four-storey neoclassical building with a pedimented centre bay of projecting windows between two round full-height columns, balconied side wings, an arched top window, round windows on its east side and a HI HOTEL board and 56 SIMS AVENUE plate over the entrance. Google Maps now lists Amrise Hotel Geylang at this point, so the operator conflicts and no name is given; the boards are blank. Columns and edges were triangulated from two June 2024 panoramas and heights read on that plane.',
  sources: [way('1223603461'), pano('lKJTqy9UA5LpPhL8wtwzcw', 193, 15, 100), pano('UAXPg6N3nfoHWJGHpB3X6g', 160, 15, 100)],
  colours: { wall: '#ecebe6', trim: '#d6d5cf', frame: '#e6e5df', glass: '#4a5558', pier: '#ecebe6', back: '#3a3836', floor: '#b4b0a8' },
  bands: [[15.6, 16.0, .4], [4.7, 4.85, .3]],
  windows: [
    ...[[1.0, 2.9], [10.4, 12.3]].flatMap(u => [6.02, 9.41, 12.67].map(b => ({ u, h: [b, b + 1.5], panes: 2 }))),
    ...[[4.2, 6.5], [6.7, 9.0]].flatMap(u => [6.02, 9.41, 12.67].map(b => ({ u, h: [b, b + 1.6], panes: 3, out: .35 }))),
    { u: [4.4, 8.8], h: [14.4, 15.3], panes: 4, arched: true },
  ],
  blocks: [
    ...[3.5, 9.67].map(c => ({ name: 'round column', u: [c - .28, c + .28], h: [4.85, 15.6], out: .3, depth: .56, colour: '#f2f1ec' })),
    { name: 'pediment', u: [3.9, 9.3], h: [16.0, 17.2], out: .1, depth: .3, colour: '#ecebe6' },
    ...[[.6, 3.2], [10.1, 12.6]].flatMap(u => [8.0, 11.3].map(y => ({ name: 'balcony', u, h: [y, y + 1.0], out: .45, depth: .9, colour: '#e3e2dc' }))),
    { name: 'blank hotel board', u: [3.4, 9.6], h: [4.76, 5.79], out: .15, depth: .08, colour: '#2f3236' },
    { name: 'blank address plate', u: [9.9, 12.3], h: [4.6, 5.2], out: .12, depth: .05, colour: '#2f3236' },
  ],
  piers: [[.45, .9], [12.3, 12.75]],
  backFittings: [{ name: 'hotel lobby', u: [3.6, 9.6], h: [.6, 3.4], colour: '#3a3a36', glow: .2 }, { name: 'glass blocks', u: [10.2, 12.0], h: [.5, 3.6], colour: '#c9d0cf' }],
};

// No. 21 Lorong 9: two June 2024 panoramas 10 m apart agree on the source front to 0.2 m. The frame runs north
// from the south corner; the louvred core and balcony slabs every 3.45 m rise to a roof at about 26.8 m.
const l9Slabs = [5.0, 8.45, 11.9, 15.35, 18.8, 22.25];
export const no21L9 = {
  id: 'l9-21', buildingIds: ['1223407892'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Lorong 9 Geylang',
  name: 'Apartment block, 21 Lorong 9 Geylang (June 2024 exterior)', address: '21 Lorong 9 Geylang',
  height: 26.8, ceiling: 3.9, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f918f' },
  evidence: 'June 2024 Street View shows an eight-storey apartment block set behind a beige boundary wall and street trees: a full-height timber-louvred core, glass-railed balconies on every upper storey, a corrugated canopy over the ground floor and a roof pergola. No name was seen, so none is given. Two panoramas 10 m apart agree on the source front to 0.2 m; heights were read there, the roofline to about ±1.5 m. The pergola is omitted.',
  sources: [way('1223407892'), pano('XSJ66Zf6ViZ31eb-BNXBhg', 275, 20, 100), pano('v1pxfTUV-xtUOnPRv9LHTw', 285, 15, 100)],
  colours: { wall: '#d9d7d0', trim: '#c9c7c0', frame: '#9ea7a8', glass: '#4f5c60', pier: '#d9d7d0', back: '#3a3836', floor: '#a9a59c' },
  bands: [[26.5, 26.8, .3]],
  windows: [[.6, 3.6], [7.8, 10.6]].flatMap(u => l9Slabs.map(y => ({ u, h: [y + .2, y + 2.6], panes: 3 }))),
  blocks: [
    { name: 'louvred core', u: [4.2, 7.3], h: [4.6, 26.6], out: .15, depth: .3, colour: '#a59684' },
    ...[[.3, 4.1], [7.4, 10.9]].flatMap(u => l9Slabs.map(y => ({ name: 'balcony slab', u, h: [y - .2, y], out: .6, depth: 1.2, colour: '#e2e0d9' }))),
    ...[[.3, 4.1], [7.4, 10.9]].flatMap(u => l9Slabs.map(y => ({ name: 'glass railing', u, h: [y, y + 1.0], out: 1.15, depth: .05, colour: '#a7c3c6' }))),
    { name: 'corrugated canopy', u: [1.0, 10.0], h: [3.8, 4.1], out: 1.0, depth: 2.0, colour: '#9fa3a2' },
    { name: 'boundary wall', u: [0, 11.0], h: [0, 2.5], out: 3.5, depth: .2, colour: '#d6b483' },
  ],
  piers: [[0, .35], [10.7, 11.05]],
  backFittings: [{ name: 'ground floor', u: [.4, 10.6], h: [.1, 3.6], colour: '#4a4842' }],
};

export const ringWest = [no221West, corner1939, no198, no200, rozel, behindRozel, no56Sims, no21L9];
export const ringWestFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const ringWestLayout = (place, width) => simpleHouseLayout(width, place);
// Buildings straddling the west edge are reviewed from an oblique start inside the walkable bounds.
export const ringWestReviews = (place, frame) => {
  if (!place.review) return facing(frame, place.id, 10, 18);
  const p = frame.point(...place.review), t = frame.point(frame.width / 2, 0);
  return [{ id: place.id, p, pitch: 18, yaw: Math.atan2(p[0] - t[0], p[1] - t[1]) * 180 / Math.PI }];
};
