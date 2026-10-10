// Lorong 11 Geylang exteriors not covered by an earlier single-place module, from April 2024 Street View.
// Unnamed places (open question 18) carry no business name and leave boards blank. Positions are in each
// footprint's frontage frame: u along the front from frame.a, out towards the street, heights above the
// five-foot-way floor, which stands about 0.5 m above the road on this row.
import { frontageFrame } from './gable-roof-layout.mjs';
import { peranakanLayout } from './peranakan-layout.mjs';
import { facing } from './simple-house-layout.mjs';

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

export const lorong11 = [no15];
export const lorong11Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
/** Rear corners for an irregular outline: the deepest vertices near each end of the front. */
export function lorong11RoofFrame(poly, place) {
  const f = lorong11Frame(poly, place), uv = p => [(p[0] - f.a[0]) * f.dx + (p[1] - f.a[1]) * f.dz, -((p[0] - f.a[0]) * f.nx + (p[1] - f.a[1]) * f.nz)];
  const deepest = end => poly.filter(p => Math.abs(uv(p)[0] - end) < 1.6).sort((p, q) => uv(q)[1] - uv(p)[1])[0];
  return { ...f, rearA: deepest(0), rearB: deepest(f.width) };
}
export function lorong11Layout(place, width) {
  const base = peranakanLayout(width, place.colours, place.bays), mid = (a, b) => (a + b) / 2;
  for (const g of place.ground ?? []) base.add(g.name, mid(...g.u), mid(...g.h), base.back + (g.out ?? 0), g.u[1] - g.u[0], g.h[1] - g.h[0], .03, g.colour);
  return base;
}
export const lorong11Reviews = (place, frame) => facing(frame, place.id, 9, 18);
