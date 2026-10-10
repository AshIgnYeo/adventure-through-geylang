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
// The west-side places are appended below their definitions.
export const lorong9Frame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const lorong9Layout = (place, width) => place.id === 'l9-6-8' ? greyBuildingLayout(width) : simpleHouseLayout(width, place);
export const lorong9Reviews = (place, frame) => facing(frame, place.id, 14, 24);

// The west side of Lorong 9 (frames face east, u running north from each south corner). Lorong 9 is outside
// the derived road set; these ways straddle the study's west edge.
const westDepth = 'Heights come from roofline elevations in June 2024 Lorong 9 panoramas and carry about ±2 m; the façades are kept on the source front.';
const balconyStack = (us, floors, colour) => us.flatMap(u => floors.map(y => ({ name: 'curved balcony', u, h: [y, y + 1.0], out: .45, depth: .9, colour })));
export const kimCourt = {
  id: 'kim-court', buildingIds: ['453797935'], kind: 'kim-court', frontEdge: 2, reviewRoad: 'Lorong 9 Geylang',
  name: 'Kim Court (June 2024 exterior)', address: '11 Lorong 9 Geylang',
  height: 24.7, ceiling: 3.6, fiveFootWay: 1.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Google Maps lists Kim Court at 11 Lor 9 Geylang, and June 2024 Street View shows KIM COURT lettering over the plate 11 on the pale entrance pillar of the yellow apartment block on source way 453797935, tagged No. 11; triangulating the pillar from two panoramas puts it 2.2 m behind the way\'s front line. This resolves the 10 October lock, which had placed the lettering on the way tagged 17 (where The Diamond stands). An eight-storey block of yellow walls with stacks of curved balconies framed in maroon, a pale stair core and a car porch behind red gates. ' + westDepth + ' The interior and parked cars are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Kim+Court+11+Lorong+9+Geylang', 'https://www.openstreetmap.org/way/453797935', pano('TWmJ4hHNCuOUbKyqstqd7g', 255, 15, 100), pano('CCVSJEitT2kunabTWNPGyQ', 260, 15, 100)],
  colours: { wall: '#d9a93a', trim: '#8a3a2e', frame: '#2b2e30', glass: '#3e474b', pier: '#d9a93a', back: '#ecebe6', floor: '#a49e95' },
  bands: [[24.4, 24.7, .3, '#8a3a2e']],
  windows: [3, 6.5, 13.0, 19.5].flatMap(u => [6.0, 8.9, 11.8, 14.7, 17.6, 20.5].map(y => ({ u: [u, u + 1.6], h: [y, y + 1.4], panes: 2 }))),
  blocks: [
    ...balconyStack([[1.0, 4.2], [7.6, 10.8], [15.0, 18.2]], [5.0, 7.9, 10.8, 13.7, 16.6, 19.5, 22.4], '#8a3a2e'),
    { name: 'pale stair core', u: [11.2, 13.4], h: [0, 24.9], out: .3, depth: .6, colour: '#efe3c4' },
    { name: 'red gate', u: [.3, 10.8], h: [0, 1.9], out: 1.8, depth: .06, colour: '#a8433a' },
  ],
  board: { u: [11.3, 13.3], h: [3.9, 4.6], out: .62 },
  piers: [[0, .4], [22.8, 23.23]],
  backFittings: [{ name: 'car porch', u: [.5, 10.8], h: [.1, 3.4], colour: '#3a3735' }, { name: 'entrance', u: [13.6, 17.0], h: [.1, 3.0], colour: '#4a4440' }],
};

export const theDiamond = {
  id: 'the-diamond', buildingIds: ['453797934'], kind: 'the-diamond', frontEdge: 1, reviewRoad: 'Lorong 9 Geylang',
  name: 'The Diamond (June 2024 exterior)', address: '17 Lorong 9 Geylang',
  height: 25.0, ceiling: 3.6, fiveFootWay: 1.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Google Maps lists The Diamond, an apartment building, at 17 Lor 9 Geylang, and June 2024 Street View shows THE DIAMOND lettering on the green-trimmed band over the car porch of the cream apartment block north of Kim Court, on source way 453797934, tagged No. 17. Cream walls with green trim, bay windows with white diamond-lattice balustrades, and a tall rear tower with glazed balconies. ' + westDepth + ' The car porch, gates and interior are simplified.',
  sources: ['https://www.google.com/maps/search/?api=1&query=The+Diamond+17+Lorong+9+Geylang', 'https://www.openstreetmap.org/way/453797934', pano('TWmJ4hHNCuOUbKyqstqd7g', 300, 20, 100), pano('TWmJ4hHNCuOUbKyqstqd7g', 320, 40, 100)],
  colours: { wall: '#eee8d2', trim: '#7fb24a', frame: '#f2f2ee', glass: '#3e474b', pier: '#eee8d2', back: '#3a3735', floor: '#a49e95' },
  bands: [[24.7, 25.0, .3, '#7fb24a'], [3.6, 4.0, .4, '#7fb24a']],
  windows: [2.0, 6.0, 10.5].flatMap(u => [5.0, 8.0, 11.0, 14.0, 17.0, 20.0].map(y => ({ u: [u, u + 1.8], h: [y, y + 1.6], panes: 3, surround: true }))),
  blocks: [6.6, 9.6, 12.6].map(y => ({ name: 'diamond-lattice balustrade', u: [5.6, 8.4], h: [y - 1.6, y - .8], out: .35, depth: .7, colour: '#f2f2ee' })),
  board: { u: [3.0, 9.0], h: [3.65, 3.95], out: .42 },
  piers: [[0, .4], [15.2, 15.61]],
  backFittings: [{ name: 'car porch', u: [.5, 15.0], h: [.1, 3.4], colour: '#3a3735' }],
};

export const no7a = {
  id: 'l9-7a', buildingIds: ['453797930'], kind: 'unnamed', unnamed: true, frontEdge: 2, reviewRoad: 'Lorong 9 Geylang',
  name: 'No. 7A Lorong 9 Geylang (June 2024 exterior, occupant not identified)', address: '7A Lorong 9 Geylang',
  height: 13.0, ceiling: 3.4, fiveFootWay: 1.0, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'Source way 453797930 is tagged 7A, south of Kim Court. June 2024 Street View shows a weathered white four-storey block of the 1960s-70s with ribbon windows, a timber-screened top floor, a glazed stair tower and a car porch with mailboxes for 7A and 7B; no sign or listing identifies it, so no name is given. ' + westDepth,
  sources: ['https://www.openstreetmap.org/way/453797930', pano('N-T15W1WRThGKvX1Uv669w', 250, 15, 100)],
  colours: { wall: '#d9d8d1', trim: '#cfcec7', frame: '#3a3e40', glass: '#3e474b', pier: '#d9d8d1', back: '#2f2d2b', floor: '#9a978f' },
  bands: [[12.7, 13.0, .3], [3.4, 3.7, .6]],
  windows: [{ u: [4.5, 13.0], h: [4.4, 6.1], panes: 6 }, { u: [4.5, 13.0], h: [7.4, 9.1], panes: 6 }],
  blocks: [
    { name: 'timber screen', u: [4.5, 13.0], h: [10.3, 12.2], out: .05, depth: .05, colour: '#8a5a3e' },
    { name: 'glazed stair tower', u: [.6, 2.4], h: [3.7, 12.5], out: .3, depth: .6, colour: '#3e474b' },
  ],
  piers: [[0, .4], [13.8, 14.21]],
  backFittings: [{ name: 'car porch', u: [3.0, 13.6], h: [.1, 3.2], colour: '#2f2d2b' }, { name: 'stair door', u: [.6, 2.4], h: [.1, 2.4], colour: '#5a3a2a' }],
};

// The construction sites at Nos. 3 and 5 (ways 453797937 and 453797936): white corrugated hoarding under
// scaffolding hung with sound-barrier sheeting, as in June 2024.
export const constructionSites = [
  { id: 'l9-3-site', buildingIds: ['453797937'], number: '3', listed: 'the Ji Yang Cai Clan Association' },
  { id: 'l9-5-site', buildingIds: ['453797936'], number: '5', listed: 'the Pu Guang Tang Buddhist Society' },
].map(s => ({ ...s, kind: 'unnamed', unnamed: true, name: `Construction site at No. ${s.number} Lorong 9 Geylang (June 2024)`, hoarding: 2.4, sheeting: 8.0,
  evidence: `Source way ${s.buildingIds[0]}, at No. ${s.number} Lorong 9 by the Geylang Road corner, was a construction site in June 2024: white corrugated hoarding painted No. ${s.number} under scaffolding hung with sound-barrier sheeting about 8 m high. ${s.listed[0].toUpperCase() + s.listed.slice(1)} is listed at No. ${s.number}; what is being built is not known, so the site is shown as photographed, unnamed.`,
  sources: [`https://www.openstreetmap.org/way/${s.buildingIds[0]}`, pano('Rf3W33Key9E8E81TUuh2Cw', 250, 10, 100), pano('d9Up2Z9zfeNguauN5DT6Dw', 255, 10, 100)] }));

export const lorong9West = [kimCourt, theDiamond, no7a];
lorong9.push(...lorong9West);
