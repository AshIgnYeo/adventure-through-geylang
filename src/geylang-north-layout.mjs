// Infill on the north side of Geylang Road between the Lorong 9 corner and Wat Dhammasatis, from June
// 2024 Street View. Frames face Geylang Road with u running east from each house's west party line;
// heights are read on the same road datum as the Wat Dhammasatis model next door.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';
import { beefKwayTeow, floors as bktFloors } from './beef-kway-teow-layout.mjs';

const pano = (id, heading, pitch = 10, fov = 80) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const pilasterTiles = (spans, colour) => spans.map(u => ({ name: 'tiled pilaster panel', u, h: [3.2, 4.8], out: .07, depth: .02, colour }));
const frieze = width => [
  { name: 'cornice', u: [0, width], h: [6.25, 6.87], out: .15, depth: .3, colour: '#e3dfcf' },
  { name: 'ornamented frieze', u: [0, width], h: [5.67, 6.25], out: .04, depth: .06, colour: '#d9d6c2' },
];
const roundels = us => us.map(u => ({ name: 'round vent', u: [u - .12, u + .12], h: [5.33, 5.58], out: .06, depth: .03, colour: '#5d6b62' }));
// Scale an elevation's positions along the front by k (open question 34 moves two houses onto strips of other widths).
const scaleU = (spec, k) => {
  const m = ([l, r]) => [+(l * k).toFixed(3), +(r * k).toFixed(3)];
  const list = xs => xs?.map(x => ({ ...x, u: m(x.u) }));
  return { ...spec, windows: list(spec.windows), blocks: list(spec.blocks), backFittings: list(spec.backFittings), piers: spec.piers?.map(m), board: spec.board && { ...spec.board, u: m(spec.board.u) } };
};
const q34 = 'Under the owner\'s answer to open question 34 it was moved one strip west: party lines triangulated from June 2024 panoramas of the same drive, which puts the Lorong 7 and Lorong 9 corners on their source corners, place Lian Seng\'s house at 29.35-34.7 m from the Lorong 7 corner and the Vietnam Unisex house at 34.7-40.7 m, one house west of the strips first given to them. The strips are kept; the elevation is scaled to the strip.';
// Width-scaled positions: both houses were read on panorama 2Y21 rectified on the source front, whose
// widths match the re-split strips (5.25 m and 4.17 m measured against 5.33 m and 4.30 m).

const lianSengElevation = {
  id: 'lian-seng', buildingIds: ['gr-229'], kind: 'lian-seng', frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Lian Seng Weighing Scale Co. (June 2024 exterior)', address: '229 Geylang Road',
  height: 6.87, ceiling: 2.67, fiveFootWay: 2.0, shellInset: .1, roof: { type: 'gable', ridge: 8.6, ridgeDepth: .4, colour: '#8e5a46' },
  evidence: 'Google Maps lists Lian Seng Weighing Scale Co., an importer and exporter, at 229 Geylang Rd, Singapore 389289, and June 2024 Street View shows its black Lian Seng Weighing Scale Co. board over the five-foot way of the cream Peranakan shophouse on the No. 229 strip of the split block (open question 11), directly west of the Vietnam Unisex Concept house. Two arched French windows with pale green louvred shutters stand between pilasters with blue-and-white tiled panels, under a frieze of green plaster ornament with round vents, a moulded cornice and a tiled roof. Read on panorama 2Y21 rectified on the source front, where the photographed frontage measures 5.25 m against the 5.33 m strip; the roof ridge is estimated. Stock, vans and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Lian+Seng+Weighing+Scale+229+Geylang+Road', 'https://www.openstreetmap.org/way/475158360', pano('2Y21iC-Tp9xBEWdsRjwK4w', 10, 10, 80), pano('XvnqlmacQsIGn3oTpJoW9A', 330, 10, 80)],
  colours: { wall: '#e6e2cf', trim: '#dfe2d2', frame: '#8aa48a', glass: '#c9d9b4', pier: '#e8e5d6', back: '#35302c' },
  bands: [[2.67, 3.0, .3, '#e3dfcf']],
  windows: [{ u: [1.2, 2.2], h: [3.08, 4.83], panes: 2, arched: true }, { u: [2.92, 3.92], h: [3.08, 4.83], panes: 2, arched: true }],
  blocks: [...frieze(5.33), ...pilasterTiles([[.58, 1.08], [2.33, 2.87], [4.05, 4.63]], '#9fc4c0'), ...roundels([.83, 2.6, 4.34])],
  piers: [[.1, .4], [4.95, 5.33]],
  board: { u: [.12, 4.95], h: [2.0, 2.65], out: .06 },
  backFittings: [{ name: 'dark shop front', u: [.5, 4.8], h: [.1, 2.0], colour: '#2f2c2a' }, { name: 'grille', u: [3.0, 3.8], h: [.6, 1.8], colour: '#8c8f8c', out: .02 }],
};
export const lianSeng = {
  ...scaleU(lianSengElevation, 4.87 / 5.33), buildingIds: ['gr-229-west'],
  evidence: lianSengElevation.evidence.replace('on the No. 229 strip of the split block (open question 11), directly west of the Vietnam Unisex Concept house', 'directly west of the Vietnam Unisex Concept house') + ' ' + q34 + ' It now stands on the east 4.87 m of block 453797929 (strip gr-229-west, cut under open question 28).',
  sources: [...lianSengElevation.sources.slice(0, 1), 'https://www.openstreetmap.org/way/453797929', ...lianSengElevation.sources.slice(1)],
};

const vuElevation = {
  id: 'gr-231', buildingIds: ['gr-231'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'No. 231 Geylang Road (June 2024 exterior, occupant not identified)', address: '231 Geylang Road',
  height: 6.8, ceiling: 2.67, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 8.5, ridgeDepth: .4, colour: '#8e5a46' },
  evidence: 'The No. 231 strip of the split block (open question 11), between Lian Seng (No. 229) and Wat Dhammasatis (No. 233). June 2024 Street View shows a VIETNAM UNISEX CONCEPT SPA & SALON board, but no listing for it was found, so no name is given and the board is blank. A cream Peranakan shophouse: two arched French windows with teal louvred shutters between pilasters with pink tiled panels, under the same ornamented frieze, round vents and cornice as No. 229, over a salon hung with lanterns. Read on panorama 2Y21 rectified on the source front, where the frontage measures 4.17 m against the 4.30 m strip; the roof ridge is estimated.',
  sources: ['https://www.openstreetmap.org/way/475158360', pano('2Y21iC-Tp9xBEWdsRjwK4w', 30, 10, 80), pano('XvnqlmacQsIGn3oTpJoW9A', 340, 10, 80)],
  colours: { wall: '#e9e3cf', trim: '#e2dfd0', frame: '#1f7a72', glass: '#2fa59a', pier: '#ebe7d8', back: '#3a2f2c' },
  bands: [[2.67, 3.0, .3, '#e3dfcf']],
  windows: [{ u: [.29, 1.32], h: [3.05, 4.85], panes: 2, arched: true }, { u: [2.06, 3.09], h: [3.05, 4.85], panes: 2, arched: true }],
  blocks: [...frieze(4.3), ...pilasterTiles([[1.37, 2.01], [3.17, 3.69]], '#e3b9bb'), ...roundels([1.69, 3.43]), { name: 'blank board', u: [.2, 4.0], h: [2.3, 2.67], out: .06, depth: .05, colour: '#1e1e1f' }],
  piers: [[0, .2], [3.95, 4.3]],
  backFittings: [{ name: 'lantern-hung salon front', u: [.3, 3.9], h: [.1, 2.2], colour: '#4a2a2a', glow: .1 }],
};
export const no231 = {
  ...scaleU(vuElevation, 5.32 / 4.3), id: 'gr-231', buildingIds: ['gr-229'], shellInset: .35,
  // The strip's west wall runs back off square, so the west pier stands in from it.
  piers: [[.15, .4], [4.9, 5.32]],
  name: 'Vietnam Unisex Concept house, Geylang Road (June 2024 exterior, occupant not identified)', address: 'Geylang Road, between Lian Seng and Wat Dhammasatis',
  evidence: vuElevation.evidence.replace('The No. 231 strip of the split block (open question 11), between Lian Seng (No. 229) and Wat Dhammasatis (No. 233).', 'The cream Peranakan shophouse between Lian Seng and the white Wat Dhammasatis building.') + ' ' + q34 + ' It now stands on the strip first given to No. 229, whose source number tag no longer matches it.',
};

// The freed No. 231 strip (open question 34): the west part of the white building whose upper storeys carry the
// WAT DHAMMASATIS board, triangulated at 41.35-43.6 m on a storey set back about 4 m, with the Durian & Fruits
// Experience Centre's vertical board at 42.3 m. The first 1.15 m is the end bay of the Vietnam Unisex house.
export const no233West = {
  id: 'gr-233-west', buildingIds: ['gr-231'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'West part of the white Wat Dhammasatis building, Geylang Road (June 2024 exterior)', address: 'Geylang Road, west part of No. 233',
  height: 8.63, ceiling: 2.5, fiveFootWay: 2.0, shellInset: .1, roof: { type: 'flat', colour: '#a9a69e' },
  evidence: 'June 2024 Street View shows the white three-storey building of No. 233 starting directly east of the Vietnam Unisex house, about 40.7 m from the Lorong 7 corner: the WAT DHAMMASATIS BUDDHIST CENTRE board, triangulated from two panoramas at 41.35-43.6 m on an upper storey set back about 4 m, an arched top window, dark first-floor glazing and the Durian & Fruits Experience Centre\'s black and gold vertical board at about 42.3 m over a fruit stall. Under the owner\'s answer to open question 34 this strip, first given to No. 231, carries the building\'s west part. The named Wat Dhammasatis model keeps the No. 233 strip and its board, which is drawn about 2.6 m east of its photographed position; the boards here are blank. The first 1.15 m of the strip is the end bay of the Vietnam Unisex house.',
  sources: ['https://www.openstreetmap.org/way/475158360', pano('XvnqlmacQsIGn3oTpJoW9A', 351, 10, 80), pano('PYhl-4q1O0w9tBXLG3R9_w', 350, 10, 80), pano('2Y21iC-Tp9xBEWdsRjwK4w', 30, 10, 80)],
  colours: { wall: '#eeeeea', trim: '#f4f4f1', frame: '#3b3f42', glass: '#3f4a52', pier: '#eeeeea', back: '#2a2725', floor: '#a49d93' },
  bands: [[8.53, 8.63, .2], [5.32, 5.43, .3], [3.7, 3.83, .3]],
  windows: [{ u: [1.5, 4.15], h: [3.83, 5.1], panes: 3 }, { u: [2.0, 3.2], h: [6.95, 7.6], arched: true, panes: 1, out: -2.0 }],
  blocks: [
    { name: 'cream end bay of the Vietnam Unisex house', u: [0, 1.15], h: [2.5, 6.87], out: .03, depth: .06, colour: '#e9e3cf' },
    { name: 'set-back upper storey', u: [1.3, 4.3], h: [5.43, 8.63], out: -2.1, depth: .1, colour: '#eeeeea' },
    { name: 'blank black vertical board', u: [2.7, 2.9], h: [3.9, 6.1], out: .45, depth: .6, colour: '#1c1a17' },
  ],
  piers: [[1.05, 1.3], [4.1, 4.3]],
  backFittings: [{ name: 'fruit stall', u: [1.4, 4.1], h: [.1, 1.0], colour: '#5f6b34', out: .8, depth: .9 }, { name: 'shop interior', u: [1.4, 4.1], h: [.1, 2.4], colour: '#3b3532', glow: .08 }],
};

// The annex east of the Lorong 9 corner building, under its own grey skylit roof: from the street the
// pink four-storey front continues to Chen Hing with one more window bay, so the corner building's
// storeys and colours carry on across it. Frame u runs east from the step in the source outline.
export const annex237 = {
  id: 'gr-237-annex', buildingIds: ['gr-237-annex'], kind: 'unnamed', unnamed: true, frontEdge: 4, reviewRoad: 'Geylang Road',
  name: 'Annex east of 237 Geylang Road (June 2024 exterior, occupant not identified)', address: 'Geylang Road, between Nos. 237 and 241',
  height: beefKwayTeow.height, ceiling: beefKwayTeow.ceiling, fiveFootWay: 1.2, shellInset: .5, upperInset: .05, roof: { type: 'flat', colour: '#8f9396' },
  evidence: 'The annex half of source way 454274485 (open question 3), between the Lorong 9 corner building (Geylang Lor 9 Beef Kway Teow) and Chen Hing. Satellite imagery shows it under a separate grey skylit roof, but June 2024 Street View shows the pink four-storey front continuing unbroken to Chen Hing, with one more bay of green-shuttered windows under hoods and the red ground storey carrying the coffeeshop on. It is unnamed and takes the corner building\'s storey heights and colours. The panoramas here carry large position errors (calibrated at Chen Hing), so the bay position and the plain wall beyond it are estimates within about ±1 m. Its east party wall slants back towards the west, so the five-foot way is kept shallow (1.2 m).',
  sources: ['https://www.openstreetmap.org/way/454274485', pano('CRxDzspjrX6PxmNqInWfPw', 330, 10, 90), pano('BPsxlk0ALSJFfWvTXn51NA', 30, 10, 90)],
  colours: beefKwayTeow.colours,
  bands: beefKwayTeow.bands,
  windows: [{ u: [.9, 2.1], h: bktFloors.lower, panes: 2 }, { u: [.9, 2.1], h: bktFloors.upper, panes: 2 }],
  vents: bktFloors.vents.map(h => ({ u: [.9, 2.1], h })),
  blocks: bktFloors.hoods.map(h => ({ name: 'window hood', u: [.75, 2.25], h: [h, h + .12], out: .3, depth: .6, colour: '#f3e3df' })),
  piers: [[3.7, 4.1], [7.1, 7.5]],
  backFittings: [{ name: 'coffeeshop interior', u: [.6, 7.1], h: [.1, 3.1], colour: '#4a403a', glow: .05 }],
};

// Nos. 223-227 (keys only), west of Lian Seng on the re-cut of block 453797929 (open question 28). Each
// elevation was first measured east to west from the house's east party line on NR4z; the re-cut strips' frames
// run west to east, so the elevations are mirrored and scaled to the triangulated widths (retarget below).
const westNote = 'Under the owner\'s answer to open question 28 it stands on its own strip of block 453797929, re-cut at party lines triangulated from June 2024 panoramas and anchored on the Lorong 7 corner (the lines hidden by a street tree in 2024 were read on 2009-2019 panoramas); the elevation, first read on the NR4z panorama, is scaled to the triangulated width. Heights carry about ±0.4 m.';
const westPanos = [pano('NR4z2s7rbrbx9IaXh2FIFg', 345, 8, 90), pano('2Y21iC-Tp9xBEWdsRjwK4w', 320, 12, 100)];
// Mirror an east-to-west elevation of width w0 onto a west-to-east frame of width w1.
const retarget = (spec, w0, w1) => {
  const k = w1 / w0, m = ([l, r]) => [+(k * (w0 - r)).toFixed(3), +(k * (w0 - l)).toFixed(3)];
  const list = xs => xs?.map(x => ({ ...x, u: m(x.u) }));
  return { ...spec, windows: list(spec.windows), blocks: list(spec.blocks), backFittings: list(spec.backFittings), piers: spec.piers?.map(m) };
};
const widths = { 'gr-227': [4.6, 4.45], 'gr-225': [5.2, 4.7], 'gr-223': [4.8, 5.0] };
const peranakanWest = (id, extra) => retarget({ id, buildingIds: [id], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  height: 6.87, ceiling: 2.67, fiveFootWay: 2.0, shellInset: .1, roof: { type: 'gable', ridge: 8.6, ridgeDepth: .4, colour: '#8e5a46' },
  sources: ['https://www.openstreetmap.org/way/453797929', ...westPanos], ...extra }, ...widths[id]);

export const no227 = peranakanWest('gr-227', {
  name: 'Red Leaf Karaoke house, Geylang Road (June 2024 exterior, occupant not identified)', address: 'Geylang Road, west of No. 229',
  evidence: 'The cream Peranakan shophouse directly west of Lian Seng, with arched shuttered windows under the shared ornamented frieze, a yellow clan-association board upstairs and a RED LEAF Karaoke Pub board over a lantern-hung front. Redleaf Karaoke is listed only at 73 Maude Road and as temporarily closed, and the association board could not be read in full, so no name is given and the boards are blank. ' + westNote,
  colours: { wall: '#e6e2cf', trim: '#dfe2d2', frame: '#8aa48a', glass: '#c9d9b4', pier: '#e8e5d6', back: '#3a2f2c' },
  windows: [{ u: [.8, 1.9], h: [3.08, 4.83], panes: 2, arched: true }, { u: [2.6, 3.7], h: [3.08, 4.83], panes: 2, arched: true }],
  blocks: [...frieze(4.6), ...roundels([.5, 2.25, 4.0]), { name: 'blank yellow association board', u: [1.0, 3.6], h: [5.0, 5.5], out: .08, depth: .05, colour: '#e3c46a' }, { name: 'blank red-and-black board', u: [.3, 4.3], h: [2.2, 2.65], out: .08, depth: .06, colour: '#2b1f1d' }],
  piers: [[.1, .35], [4.3, 4.6]],
  backFittings: [{ name: 'lantern-hung front', u: [.4, 4.2], h: [.1, 2.1], colour: '#4a2a2a', glow: .1 }],
});
export const no225 = peranakanWest('gr-225', {
  name: 'Karaoke-mural house, Geylang Road (June 2024 exterior, occupant not identified)', address: 'Geylang Road, west of No. 229',
  evidence: 'The next Peranakan shophouse west, partly hidden by a street tree, with the same frieze and a purple butterfly KARAOKE mural across its ground floor; no listing could be matched to it, so no name is given and the mural is a plain panel. ' + westNote,
  colours: { wall: '#e6e2cf', trim: '#dfe2d2', frame: '#5f7a6a', glass: '#c9d9b4', pier: '#e8e5d6', back: '#3a2f2c' },
  windows: [{ u: [1.0, 2.1], h: [3.08, 4.83], panes: 2, arched: true }, { u: [3.1, 4.2], h: [3.08, 4.83], panes: 2, arched: true }],
  blocks: [...frieze(5.2), ...roundels([.6, 2.6, 4.6]), { name: 'purple mural panel', u: [.4, 3.2], h: [.1, 2.4], out: -1.9, depth: .03, colour: '#6a4a8a' }],
  piers: [[.1, .4], [4.9, 5.2]],
  backFittings: [{ name: 'dark doorway', u: [3.4, 4.6], h: [.1, 2.3], colour: '#2b2826' }],
});
export const no223 = peranakanWest('gr-223', {
  name: 'Shuttered Peranakan house, Geylang Road (June 2024 exterior, occupant not identified)', address: 'Geylang Road, west of No. 229',
  evidence: 'A cream Peranakan shophouse with louvred windows between tiled pilasters under the ornamented frieze, and a roller shutter under a black fascia carrying a red board reading Geylang Lor 9 Fresh F[rog Porridge]. The Frog Porridge operator lists only 235 Geylang Road (modelled) and this shop was shuttered, so no name is given and the board is blank. ' + westNote,
  colours: { wall: '#e6e2cf', trim: '#dfe2d2', frame: '#4a4f52', glass: '#3c4549', pier: '#e8e5d6', back: '#3a2f2c' },
  windows: [{ u: [.9, 2.0], h: [3.08, 4.83], panes: 2 }, { u: [2.8, 3.9], h: [3.08, 4.83], panes: 2 }],
  blocks: [...frieze(4.8), ...pilasterTiles([[.4, .8], [2.15, 2.65], [4.05, 4.45]], '#9fc4c0'), { name: 'black fascia', u: [.2, 4.6], h: [2.3, 2.67], out: .06, depth: .05, colour: '#1c1c1d' }, { name: 'blank red board', u: [1.5, 3.4], h: [2.0, 2.3], out: .08, depth: .04, colour: '#8a2a2a' }],
  piers: [[.1, .4], [4.5, 4.8]],
  backFittings: [{ name: 'roller shutter', u: [.4, 4.4], h: [.1, 2.0], colour: '#b9bbb6' }],
});

export const geylangNorth = [lianSeng, no231, no233West, annex237, no227, no225, no223];
export const geylangNorthFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const geylangNorthLayout = (place, width) => simpleHouseLayout(width, place);
// The road is near the study's south edge here, so the houses west of Lian Seng are reviewed from closer in.
const closeReview = { 'gr-227': 7.5, 'gr-225': 7.5, 'gr-223': 5.5 };
export const geylangNorthReviews = (place, frame) => facing(frame, place.id, closeReview[place.id] ?? 11, 14);
