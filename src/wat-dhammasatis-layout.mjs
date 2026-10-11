// June 2024 exterior of No. 233 Geylang Road (Wat Dhammasatis upstairs), on its owner-approved partial-block footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=10&fov=70`;
export const watDhammasatis = {
  id: 'wat-dhammasatis', buildingIds: ['gr-233'], kind: 'wat-dhammasatis',
  name: 'Wat Dhammasatis วัดธรรมสาทิส, No. 233 Geylang Road (June 2024 exterior)', address: '233B Geylang Road, #03-233',
  height: 8.63, ceiling: 2.5, fiveFootWay: 2.0, frontEdge: 0, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists Wat Dhammasatis, a Buddhist temple, at 233B Geylang Rd, #03-233, Singapore 389293, open in October 2026. June 2024 Street View shows a maroon WAT DHAMMASATIS BUDDHIST CENTRE วัดธรรมสาทิส board on the second storey of the white building directly west of the Frog Porridge corner, with a gilded Buddha image visible in the recessed top-floor window. The ground floor carries a black and gold Durian & Fruits Experience Centre 榴莲鲜果体验馆 board over a fruit stall (Fuyuan restaurant is also listed at No. 233). The building stands on an owner-approved partial-block footprint (open question 11): about 6.15 m of the 15.8 m source block 475158360, from the Frog Porridge party line, measured by width across three panoramas. The stepped front has recessed top-floor glazing behind a balcony, an arched window, and dark glazing on the first floor. Heights were read on a rectified frame at the source front and are approximate. The gas-company awning is kept to 0.35 m because the source front lies within half a metre of the modelled carriageway. Stall goods, the lights, the interior and the shrine are not reconstructed beyond the visible Buddha image.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Wat+Dhammasatis+233B+Geylang+Road', 'https://www.openstreetmap.org/way/475158360', pano('PYhl-4q1O0w9tBXLG3R9_w', 350), pano('XvnqlmacQsIGn3oTpJoW9A', 351)],
  colours: { wall: '#eeeeea', trim: '#f4f4f1', frame: '#3b3f42', glass: '#3f4a52', back: '#2a2725' },
  bands: [[8.53, 8.63, .2], [5.32, 5.43, .3], [3.7, 3.83, .3]],
};

// u runs west to east, from the No. 231 party line to the Frog Porridge wall; the frame faces Geylang Road.
export const watDhammasatisFrame = poly => frontageFrame(poly, 0);
export const elevation = {
  topGlazing: { u: [1.87, 5.98], h: [6.26, 7.41], recess: .9 }, arch: { u: [.3, 1.53], h: [6.95, 7.6] },
  balcony: { u: [1.87, 5.98], h: [5.43, 6.26], out: .4 }, secondWindow: { u: [.15, 1.67], h: [5.75, 6.37] },
  sign: { u: [.12, 2.02], h: [5.37, 5.73] }, firstGlazing: [{ u: [1.87, 5.98], h: [3.83, 5.1] }, { u: [.15, 1.6], h: [3.83, 5.1] }],
  board: { u: [.13, 4.3], h: [2.83, 4.06] }, // The source front is only 0.45 m from the modelled carriageway here, so the awning is kept to 0.35 m.
  awning: { from: .05, to: 6.1, wall: 2.63, front: 2.45, depth: .35, valance: .3 },
  buddha: { u: 3.9, h: [6.35, 6.95] },
};

export function watDhammasatisLayout(width) {
  const E = elevation;
  const layout = simpleHouseLayout(width, {
    ...watDhammasatis,
    windows: [{ ...E.secondWindow, panes: 2 }, { ...E.arch, arched: true, panes: 1 }, ...E.firstGlazing.map(w => ({ ...w, panes: 3 }))],
    piers: [[0, .2], [width - .25, width]],
    board: { ...E.board }, boards: [{ ...E.sign, out: .04 }], awning: { ...E.awning },
    backFittings: [{ name: 'fruit stall', u: [.6, 5.4], h: [.1, 1.0], colour: '#5f6b34', out: .8, depth: .9 }, { name: 'shop interior', u: [.3, 5.8], h: [.1, 2.4], colour: '#3b3532', glow: .08 }],
  });
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => layout.boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const T = E.topGlazing, B = E.balcony, mid = (a, b) => (a + b) / 2;
  add('recessed top glazing', mid(...T.u), mid(...T.h), -T.recess, T.u[1] - T.u[0], T.h[1] - T.h[0], .04, '#4a5560');
  for (let i = 0; i <= 4; i++) add('top glazing mullion', T.u[0] + (T.u[1] - T.u[0]) * i / 4, mid(...T.h), -T.recess + .03, .05, T.h[1] - T.h[0], .03, '#2f3336');
  add('recess soffit', mid(...T.u), T.h[1] + .05, -T.recess / 2, T.u[1] - T.u[0], .1, T.recess, '#e9e9e5');
  add('Buddha image', E.buddha.u, mid(...E.buddha.h), -T.recess - .25, .35, E.buddha.h[1] - E.buddha.h[0], .25, '#d4a93a', .2);
  add('balcony parapet', mid(...B.u), mid(...B.h), B.out, B.u[1] - B.u[0], B.h[1] - B.h[0], .2, '#f4f4f1');
  return layout;
}

export const watDhammasatisReviews = frame => facing(frame, 'wat-dhammasatis', 9, 20);
