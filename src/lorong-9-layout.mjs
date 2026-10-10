// June 2024 exteriors on the east side of Lorong 9 around the Public Free Clinic Society tower. Three
// panoramas of this drive agree on the street fronts only about 4 m behind the source front line, the same
// offset as the PFCS tower's measured position less its forecourt, so it is treated as this drive's position
// error: the models keep the source front and were measured on frames rectified 4 m back. Frames run north
// to south, facing west onto Lorong 9 (which is outside the derived road set); heights carry about ±1 m.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;
const depth = 'Three June 2024 panoramas agree on its street front only about 4 m behind the source front, as along this whole row; the model keeps the source front and was measured at the photographed depth, with heights carrying about ±1 m.';

export const no12 = {
  id: 'l9-12', buildingIds: ['1223603459'], kind: 'unnamed', unnamed: true, frontEdge: 3, reviewRoad: 'Lorong 9 Geylang',
  name: 'No. 12 Lorong 9 Geylang (June 2024 exterior, occupant not identified)', address: '12 Lorong 9 Geylang',
  height: 10.5, ceiling: 3.6, fiveFootWay: 3.0, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Source way 1223603459 is tagged No. 12, north of the PFCS tower. June 2024 Street View shows a weathered white three-storey building of the 1960s-70s with cantilevered floor slabs and a deep roof slab, banded glazing and grilles on the upper floors, yellow blinds, a louvred panel band and an open car porch behind gates at street level. No listing or sign identifies the occupants, so no name is given. ' + depth + ' Plants, laundry and the interior are not reconstructed.',
  sources: [way('1223603459'), pano('CCVSJEitT2kunabTWNPGyQ', 80), pano('TWmJ4hHNCuOUbKyqstqd7g', 75), pano('N-T15W1WRThGKvX1Uv669w', 40)],
  colours: { wall: '#d9d8d1', trim: '#cfcec7', frame: '#3a3e40', glass: '#3e474b', pier: '#cfcec7', back: '#2f2d2b', floor: '#9a978f' },
  bands: [[10.1, 10.5, 1.4, '#cfcec7'], [7.45, 7.75, .7], [3.6, 4.1, .8]],
  windows: [{ u: [1.4, 5.5], h: [5.3, 7.1], panes: 5 }, { u: [6.8, 11.6], h: [5.3, 7.1], panes: 4 }, { u: [1.0, 5.3], h: [8.0, 9.9], panes: 4 }, { u: [5.8, 11.0], h: [8.0, 9.9], panes: 4 }],
  blocks: [
    { name: 'yellow blinds', u: [3.0, 5.5], h: [4.55, 5.05], out: .1, depth: .04, colour: '#d9b84a' },
    { name: 'louvred panel band', u: [6.8, 11.2], h: [7.75, 8.0], out: .05, depth: .04, colour: '#8a8780' },
    ...Array.from({ length: 12 }, (_, i) => ({ name: 'gate bar', u: [1.2 + i * .3, 1.24 + i * .3], h: [0, 1.8], out: .3, depth: .04, colour: '#3a3e40' })),
  ],
  piers: [[.3, .7], [6.0, 6.4], [11.9, 12.3]],
  backFittings: [{ name: 'open car porch', u: [.7, 11.9], h: [.1, 3.5], colour: '#2b2a28' }],
};

// The grey concrete-and-glass building across source ways No. 8 and No. 6; one elevation in a frame
// spanning both ways, u from the No. 10 party line.
export const greyBuilding = {
  id: 'l9-6-8', buildingIds: ['1223603458', '1223603457'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 9 Geylang',
  name: 'Grey building at Nos. 6-8 Lorong 9 Geylang (June 2024 exterior, occupant not identified)', address: '6-8 Lorong 9 Geylang',
  height: 25.0, ceiling: 4.3, fiveFootWay: 2.0, roof: { type: 'flat', colour: '#8f9396' },
  evidence: 'A recent eight-storey building in grey concrete panels with glazed bays under black louvre hoods and a tall slit stair window, behind a garden fence, spans source ways No. 8 and No. 6 between the PFCS tower and the yellow YWAM building; triangulation puts its party lines on the source lines at s 25.6 and 35.7 m. Youth With A Mission is listed at No. 8, but its own plaque hangs on the yellow building next door and reads No. 4, so no name is given here. ' + depth + ' The ways are assigned together as one exterior, without asserting legal extent.',
  sources: [way('1223603458'), way('1223603457'), pano('hv2-NbixqeoRs-wcFG5zEA', 105), pano('d9Up2Z9zfeNguauN5DT6Dw', 75)],
  colours: { wall: '#b9bab6', trim: '#a9aaa6', frame: '#2b2e30', glass: '#4a5658', pier: '#b9bab6', back: '#3a3735', floor: '#9a978f' },
};
const G = { bays: [5.3, 8.6, 11.9, 15.2, 18.5], bayU: [3.4, 9.6], slit: [1.0, 1.9] };
export function greyBuildingLayout(width) {
  const spec = {
    ...greyBuilding,
    bands: [[24.7, 25.0, .3]],
    windows: G.bays.map(b => ({ u: G.bayU, h: [b, b + 2.6], panes: 4, out: .3 })),
    blocks: [
      ...G.bays.map(b => ({ name: 'black louvre hood', u: [G.bayU[0] - .2, G.bayU[1] + .2], h: [b + 2.7, b + 2.85], out: .75, depth: 1.0, colour: '#2b2b2b' })),
      { name: 'stair slit window', u: G.slit, h: [3.5, 23.5], out: .02, depth: .03, colour: '#2f3537' },
      { name: 'rooftop pergola', u: [3.0, 10.0], h: [25.0, 25.2], out: -1.0, depth: 2.0, colour: '#8a8a86' },
      { name: 'garden fence', u: [.2, 9.9], h: [0, 1.4], out: 1.6, depth: .05, colour: '#3a3e40' },
      { name: 'planted strip', u: [.2, 9.9], h: [0, .5], out: 1.0, depth: 1.0, colour: '#4f6a3e' },
    ],
    piers: [[0, .4], [9.7, width]],
    backFittings: [{ name: 'glazed lobby', u: [3.6, 9.4], h: [.1, 3.8], colour: '#3e474b', glow: .1 }],
  };
  return simpleHouseLayout(width, spec);
}

export const ywam = {
  id: 'ywam-singapore', buildingIds: ['453797939'], kind: 'ywam-singapore', frontEdge: 0, reviewRoad: 'Lorong 9 Geylang',
  name: 'YWAM Singapore (Youth With A Mission) (June 2024 exterior)', address: '4 Lorong 9 Geylang (listed at No. 8)',
  height: 17.5, ceiling: 3.6, fiveFootWay: 2.0, shellInset: .45, roof: { type: 'flat', colour: '#9a9893' },
  evidence: 'Google Maps lists Youth With A Mission Singapore, a training centre (ywam.org.sg), at 8 Lor 9 Geylang, while June 2024 Street View shows its brown plaque, YWAM SINGAPORE with its logo and 4 LORONG 9 GEYLANG, beside the door of the yellow five-storey building on source way 453797939, tagged No. 4 with five levels. The plaque, the footprint tag and the frontage agree, so the signed occupant is modelled under the owner\'s answer to open question 12, recording the listing\'s No. 8. Cantilevered upper floors with concrete balcony ledges and windows over a recessed ground floor with a breezeblock panel, a door and roller shutters. ' + depth + ' Vehicles and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=YWAM+Singapore+Lorong+9+Geylang', way('453797939'), pano('d9Up2Z9zfeNguauN5DT6Dw', 75), pano('hv2-NbixqeoRs-wcFG5zEA', 105)],
  colours: { wall: '#d9c99a', trim: '#cbbb8c', frame: '#ecebe6', glass: '#5a6a7a', pier: '#d9c99a', back: '#ecebe6', floor: '#9a978f' },
  bands: [[17.2, 17.5, .3], [3.7, 4.3, 1.0]],
  windows: [[1.2, 2.4], [4.4, 5.6]].flatMap(u => [6.0, 9.2, 12.4].map(b => ({ u, h: [b, b + 1.6], panes: 2, out: .3 }))),
  blocks: [
    ...[8.0, 11.2, 14.4].map(y => ({ name: 'balcony ledge', u: [.2, 6.6], h: [y, y + .2], out: .6, depth: 1.2, colour: '#cbbb8c' })),
    { name: 'breezeblock panel', u: [3.3, 6.2], h: [.6, 3.4], out: -1.9, depth: .05, colour: '#d6cfb9' },
    ...Array.from({ length: 6 }, (_, i) => ({ name: 'breezeblock opening', u: [3.4 + i * .45, 3.7 + i * .45], h: [1.0, 3.0], out: -1.86, depth: .02, colour: '#6a6458' })),
  ],
  board: { u: [1.7, 2.3], h: [1.6, 2.0], out: -1.9 },
  piers: [[.45, .85], [6.4, 6.83]],
  backFittings: [{ name: 'brown door', u: [.6, 1.4], h: [.1, 2.3], colour: '#6a4a32' }, { name: 'roller shutter', u: [3.3, 6.2], h: [.1, .55], colour: '#c9ccc7' }],
};

export const lorong9 = [no12, greyBuilding, ywam];
export const lorong9Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong9Layout = (place, width) => place.id === 'l9-6-8' ? greyBuildingLayout(width) : simpleHouseLayout(width, place);
export const lorong9Reviews = (place, frame) => facing(frame, place.id, 14, 24);
