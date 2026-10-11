// June 2024 exterior of Ming Li's Eating House, 114 Sims Avenue at the Lorong 15 corner. The source corner
// outline (with its 4.41 m chamfer) is kept: the registered satellite roof agrees with it within about 1.5 m.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=15&fov=100`;
export const mingLi = {
  id: 'ming-li', buildingIds: ['682928749'], kind: 'ming-li',
  name: "Ming Li's Eating House 明利美食阁 (June 2024 exterior)", address: '114 Sims Avenue (Lorong 15 corner)',
  height: 11.4, ceiling: 3.47, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Sims Avenue',
  evidence: "Google Maps lists Ming Li's Eating House, a coffee shop open 24 hours, at 114 Sims Ave, Singapore 387438, matching the source way tagged No. 114 with three levels. June 2024 Street View shows the white three-storey Art Deco corner block at Sims Avenue and Lorong 15: a white 明利美食阁 MING LI'S EATING HOUSE board with a blue roundel on the chamfered corner, a long board of food photographs over the Sims Avenue bay, blue awnings, and a SingGas awning along Lorong 15. Upper floors have paired casement windows under projecting hoods, with small vent blocks. Open question 4 allowed an authored corner outline, but the registered satellite roof agrees with the source outline within about 1.5 m and does not support an earlier 2.6 m westward reading, which would also collide with the unchanged Amrise model, so the source outline is kept. Positions and heights were read on square-on frames and scaled to the source faces; the Lorong 15 face is laid out from oblique views. Food photographs are shown as plain panels; furniture and the interior are not reconstructed.",
  sources: ["https://www.google.com/maps/search/?api=1&query=Ming+Li's+Eating+House+114+Sims+Avenue", 'https://www.openstreetmap.org/way/682928749', pano('h2kKLtNXCnyJJ5yafhvakg', 186), pano('GAGuHvrVQL7_V8J0GG_fZw', 189), pano('GSi02rgoddx_BEQoQuw5bw', 200)],
  colours: { wall: '#f1f0eb', trim: '#f6f5f1', frame: '#3c4043', glass: '#55606a', pier: '#e7d27a', back: '#3a3734', floor: '#9a8f7e' },
  bands: [[11.3, 11.4, .25], [7.15, 7.3, .5], [11.0, 11.12, .6]],
};

// u runs west from the chamfer to the Amrise party wall; the frame faces Sims Avenue.
export const mingLiFrame = poly => frontageFrame(poly, mingLi.frontEdge);
export const elevation = {
  floor2: { h: [5.3, 7.0], u: [[.22, .81], [2.06, 4.13], [5.31, 6.11]] },
  floor3: { h: [8.9, 10.7], u: [[.15, .89], [2.21, 4.27], [5.4, 6.2]] },
  vents: [2.43, 3.1, 3.83, 5.97].map(u => ({ u: [u - .14, u + .14], h: [8.3, 8.6] })),
  board: { u: [.05, 5.84], h: [3.9, 4.93] }, cornerBoard: { h: [3.8, 5.0] },
  awning: { from: .05, to: 6.55, wall: 3.47, front: 2.6, depth: 1.6, valance: .25 },
};

export function mingLiLayout(width) {
  const E = elevation;
  return simpleHouseLayout(width, {
    ...mingLi,
    windows: [...E.floor2.u.map(u => ({ u, h: E.floor2.h, panes: 2 })), ...E.floor3.u.map(u => ({ u, h: E.floor3.h, panes: 2 }))],
    vents: E.vents, piers: [[0, .45], [width - .4, width]],
    board: { ...E.board }, awning: { ...E.awning },
    backFittings: [{ name: 'coffeeshop interior', u: [.4, width - .4], h: [.1, 3.3], colour: '#4a4540', glow: .06 }],
  });
}

// Bays on the chamfer and along Lorong 15, from oblique views.
export const sideBays = { chamfer: [.5], lorong15: [.12, .3, .48, .66, .84] };
export const mingLiReviews = frame => facing(frame, 'ming-li', 10, 22, [{ id: 'ming-li-corner', at: [-5, 9], look: [1.5, 0], pitch: 22 }]);
