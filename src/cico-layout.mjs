// April 2024 exterior of the Cico Flooring building, Nos. 1–7 Lorong 11, on its owner-approved merged footprint.
import { frontageFrame } from './gable-roof-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=5&fov=90`;
export const cico = {
  id: 'cico-flooring', buildingIds: ['l11-1-7'], kind: 'cico-flooring',
  name: 'Cico Flooring 志高地板, Nos. 1–7 Lorong 11 (April 2024 exterior)', address: '1–7 Lorong 11 Geylang',
  height: 3.95, eaves: 4.4, ridge: 6.0, frontEdge: 3, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Cico Flooring at 7 Lor 11 Geylang and Cico Holdings (2008) Pte Ltd, a flooring contractor, at 1 Lor 11 Geylang (open). April 2024 Street View shows a CICO FLOORING 志高地板 logo on the herringbone timber cladding of the single-storey building that runs across Nos. 1–7, beside Hotel 81 Joy, under two orange-tiled hipped roofs and a long metal canopy, behind a paved forecourt; a second logo on the same frontage (A, …ENGINEERING CONSTRUCTION) belongs to another firm and is not named. It stands on an owner-approved merged footprint (open question 7): the four source ways with the front 5 m left open, where three panoramas agree the façade stands. The shopfront layout was read on a rectified frame at that depth; roof heights and the rear are estimated. Stacked timber, the vending machine and the interior are not reconstructed beyond simple forms.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Cico+Flooring+7+Lorong+11+Geylang', 'https://www.openstreetmap.org/way/1223407887', 'https://www.openstreetmap.org/way/1223407890', pano('DuD94mwPz0YzH7qI81rjmA', 250), pano('ANSwxJrX-Y2Gb7Q78veDyQ', 230)],
};

export const cicoFrame = poly => frontageFrame(poly, cico.frontEdge);
// Measured from the north (No. 7) end, s; u runs from the south (No. 1) end, u = width - s.
export const fittings = [
  { name: 'roller shutter', s: [17.8, 21.0], h: [.05, 3.15], colour: '#b9bcba' },
  { name: 'glazed door', s: [14.1, 17.1], h: [.1, 3.0], colour: '#3c4446' },
  { name: 'timber door', s: [8.8, 10.6], h: [.1, 3.0], colour: '#6b4a32' },
  { name: 'dark doorway', s: [6.1, 8.8], h: [.1, 3.0], colour: '#22201f' },
  { name: 'glazed window', s: [2.8, 5.8], h: [.6, 3.0], colour: '#3c4446' },
  { name: 'vending machine', s: [0, .55], h: [.05, 1.9], colour: '#e3e3df', out: .4 },
];
export const logos = { cico: { s: 12.1, h: 2.95 }, grilles: [{ s: 12.9, h: 1.6 }, { s: 11.6, h: 1.0 }, { s: 12.9, h: .45 }] };

export function cicoLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const u = s => width - s;
  for (const f of fittings) { const [a, b] = [u(f.s[1]), u(f.s[0])]; add(f.name, (a + b) / 2, (f.h[0] + f.h[1]) / 2, f.out ?? .03, b - a, f.h[1] - f.h[0], f.out ? .6 : .03, f.colour); }
  for (const g of logos.grilles) add('circular grille', u(g.s), g.h, .04, .55, .55, .02, '#2b2622');
  add('canopy fascia', width / 2, cico.height + .1, 1.5, width, .2, .05, '#c9ccc9');
  add('forecourt paving', width / 2, .05, 2.5, width, .1, 5, '#b4b0a8');
  return { boxes, canopy: { from: 0, to: width, wall: cico.height + .25, front: cico.height, depth: 1.5 }, logo: { u: u(logos.cico.s), h: logos.cico.h } };
}

export function cicoReviews(frame) {
  const { point, width } = frame;
  return [{ id: 'cico-flooring', p: point(width * .45, 9.5), target: point(width * .45, 0), pitch: 8 }]
    .map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
