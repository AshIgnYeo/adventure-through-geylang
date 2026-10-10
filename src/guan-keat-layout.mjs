// June 2024 exterior of the Guan Keat coffeeshop corner block, No. 38 Lorong 11 at Sims Avenue,
// on its owner-approved chamfered footprint. This replaces the provisional Lok Fu Lala Pot model (C4).
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=10&fov=90`;
export const guanKeat = {
  id: 'guan-keat', buildingIds: ['l11-38'], kind: 'guan-keat',
  name: 'Guan Keat coffeeshop, No. 38 Lorong 11 (June 2024 exterior; Lok Fu Lala Pot stall, 2024)', address: '38 Lorong 11 Geylang (Sims Avenue corner)',
  height: 12.07, ceiling: 3.5, fiveFootWay: 2.4, frontEdge: 4, reviewRoad: 'Sims Avenue',
  evidence: 'Re-identified on 10 October 2026 (open question 8). The corner coffeeshop at No. 38 Lorong 11 carries a long awning lettered GUAN KEAT PTE LTD with telephone numbers along Sims Avenue, and a May 2024 OSM point names Guan Keat in this way; Guan Keat is an LPG distributor whose branded awnings appear on coffeeshops (as at No. 291 Geylang Road), so the name records the awning rather than the operator. In April 2024 a banner inside announced 六福 LOK FU LALA POT, 38 Lorong 11 as newly open; Lok Fu was a stall here and is now listed elsewhere, which the earlier provisional model did not know. June 2024 Street View from four Sims Avenue panoramas shows the mint-green three-storey block with a rounded Lorong 11 corner: three wide windows nearest the corner and three narrow ones to the east on each upper floor, under breeze-block vent strips, over an open coffeeshop with yellow chairs. The authored footprint keeps the 23.17 m source side and adds a 3 m chamfer. Positions and heights were read on a rectified frame and scaled to the source face (factor 0.914); they are approximate. Stalls, furniture detail and the interior are not reconstructed.',
  sources: ['https://www.openstreetmap.org/way/1223250209', 'https://www.quandoo.sg/place/lok-fu-lala-pot-106960/about', pano('qzPH3ywF_WDqHNnMt4xojA', 200), pano('YZf1yddH0WodqqcVAH4tUA', 160), pano('49OMf9AQc8HWnOxc6MrJFQ', 230)],
  colours: { wall: '#bfe0d0', trim: '#d6ece1', frame: '#4f7f70', glass: '#3a4a4d', pier: '#cfe6da', back: '#3b3936', floor: '#8f8a80' },
  bands: [[11.97, 12.07, .25], [7.47, 7.74, .3]],
};

// u runs west along Sims Avenue from the east party wall to the chamfer.
export const guanKeatFrame = poly => frontageFrame(poly, guanKeat.frontEdge);
const fromCorner = ([a, b]) => [a, b];
export const elevation = {
  wide: [[.12, 2.77], [3.68, 6.34], [7.34, 9.99]].map(fromCorner), narrow: [[12.37, 13.56], [16.11, 17.21], [18.76, 19.77]].map(fromCorner),
  floor2: [5.51, 7.38], floor3: [9.31, 11.15], vents: [[7.0, 7.38], [10.77, 11.15]],
  awning: { wall: 3.67, front: 2.29, depth: 2.2, valance: .32 }, columns: [2.0, 6.0, 10.0, 14.0, 18.0],
};

export function guanKeatLayout(width) {
  const E = elevation, flip = ([a, b]) => [width - b, width - a], cols = [...E.wide, ...E.narrow].map(flip);
  const layout = simpleHouseLayout(width, {
    ...guanKeat,
    windows: [...cols.map(u => ({ u, h: [E.floor2[0], E.vents[0][0]], panes: 3 })), ...cols.map(u => ({ u, h: [E.floor3[0], E.vents[1][0]], panes: 3 }))],
    vents: cols.flatMap(u => E.vents.map(h => ({ u, h }))),
    piers: [[0, .4], [width - .4, width]],
    awning: { from: .05, to: width - .05, ...E.awning },
    backFittings: [{ name: 'coffeeshop interior', u: [.4, width - .4], h: [.1, 3.3], colour: '#4a4540', glow: .06 }, { name: 'drinks stall', u: [width - 6, width - 3], h: [.1, 1.2], colour: '#c9c2b4', out: .4, depth: .6 }],
  });
  const add = (name, u, y, out, w, h, depth, colour) => layout.boxes.push({ name, u, y, out, w, h, depth, colour, glow: 0 });
  for (const u of E.columns) add('coffeeshop column', width - u, E.awning.wall / 2, -.35, .32, E.awning.wall, .32, '#cfe6da');
  for (let k = 0; k < 7; k++) {
    const u = 1.5 + k * (width - 3) / 6;
    add('table', u, .75, -1.2, .8, .05, .8, '#e1d9c8'); add('table leg', u, .37, -1.2, .08, .72, .08, '#3b3d3e');
    for (const d of [-.55, .55]) add('yellow chair', u + d, .45, -1.2, .4, .9, .4, '#e7c22f');
  }
  return layout;
}

export const guanKeatReviews = frame => facing(frame, 'guan-keat', 11, 22, [{ id: 'guan-keat-corner', at: [frame.width + 6, 6], look: [frame.width - 2, 0], pitch: 22 }]);
