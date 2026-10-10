// June 2024 exterior of ibis budget Singapore Gold, the yellow conserved block at Nos. 121-127 Sims Avenue
// (north side), over its four source ways. Positions were read on three panoramas rectified on the
// source front, where they agree; the block measures about 20.5 m against the source's 22.04 m, so
// positions are scaled by 1.075 into the source ways. Each unit's frame runs west to east, facing Sims
// Avenue; heights are above the five-foot-way floor.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const ways = ['439168663', '439168809', '439168778', '439168660'];

export const ibisGold = {
  id: 'ibis-budget-gold', buildingIds: ways, kind: 'ibis-budget-gold', frontEdge: 0, reviewRoad: 'Sims Avenue', reviewBuildingId: '439168809',
  name: 'ibis budget Singapore Gold (June 2024 exterior)', address: '121–127 Sims Avenue (listed at No. 123)',
  height: 7.9, ceiling: 3.0, fiveFootWay: 2.0,
  evidence: 'Google Maps lists ibis budget Singapore Gold at 123 Sims Ave; listing records describe 44 rooms on five levels, opened in 2022. June 2024 Street View shows its ibis budget GOLD board over a glazed entrance in the west bay of a yellow conserved block of four two-storey shophouses, with paired windows between brick pilasters under louvred vents, and a set-back modern block of grey and yellow cladding above the middle units. The continuous façade and the single rooftop block support a provisional assignment of all four source ways (Nos. 121-127) to the hotel, without asserting its legal extent; the MUNCH KITCHEN, Domino\'s and minimart boards on the eastern ground floors are shown plain. Three panoramas agree on the façade at the source front, where it measures about 20.5 m against the 22.04 m source run, so positions are scaled by 1.075 into the source ways. The set-back block\'s depth and the rear five-level extent are estimates; the 10 October lock\'s "one bay west" satellite reading is explained by the registered imagery offset. The temporary hoarding banner, stock and interiors are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=ibis+budget+Singapore+Gold+123+Sims+Avenue', ...ways.map(w => `https://www.openstreetmap.org/way/${w}`), pano('YsOoBymJj446X2wJOG9R7w', 345), pano('f3PAOh05dGmjZW4CdsBN2Q', 20), pano('h2kKLtNXCnyJJ5yafhvakg', 320)],
  colours: { wall: '#efe0a2', trim: '#f2e8bf', frame: '#f4f4f0', glass: '#3e4a4e', pier: '#efe0a2', back: '#3a3532', floor: '#a49e95' },
};

// Per-unit fittings: the unit's ground-floor board and the part of the set-back block above it (u ranges).
const boards = [
  { colour: '#c9ced2', text: 'ibis' }, { colour: '#2f8a5a', text: 'munch' }, { colour: '#1f2f5a', text: 'dominos' }, { colour: '#c42b2b', text: 'mart' },
];
const rooftops = [[3.9, 5.4], [.1, 5.4], [.1, 2.9], null];

export function ibisGoldUnit(index) {
  const brick = '#b5705a';
  return {
    ...ibisGold,
    bands: [[7.0, 7.3, .3], [3.0, 3.7, .25]],
    windows: [[.6, 2.55], [2.95, 4.9]].map(u => ({ u, h: [4.5, 5.9], panes: 3 })),
    vents: [[.6, 2.55], [2.95, 4.9]].flatMap(u => [{ u, h: [3.95, 4.15] }, { u, h: [6.3, 6.55] }]),
    pilasters: [[0, .3, 3.7, 7.0], [2.55, 2.95, 3.7, 7.0], [5.21, 5.51, 3.7, 7.0]],
    blocks: [
      ...[[0, .3], [2.55, 2.95], [5.21, 5.51]].map(u => ({ name: 'brick pilaster face', u, h: [3.75, 6.95], out: .125, depth: .01, colour: brick })),
      { name: 'plain board', u: [.5, 5.0], h: [2.55, 2.95], out: .06, depth: .05, colour: boards[index].colour },
    ],
    piers: [[0, .3], [5.21, 5.51]],
    rooftop: rooftops[index] ? [{ u: rooftops[index], top: 10.3, setback: 2.0, depth: 11, colour: '#d9cd98' }] : [],
    backFittings: [{ name: index === 0 ? 'hotel entrance glazing' : 'shop front', u: [.5, 5.0], h: [.1, 2.5], colour: index === 0 ? '#3e4a4e' : '#4a3a32', glow: .12 }],
  };
}

export const ibisGoldFrame = poly => frontageFrame(poly, 0);
export const ibisGoldLayout = (index, width) => simpleHouseLayout(width, ibisGoldUnit(index));
export const ibisGoldReviews = frame => facing(frame, 'ibis-budget-gold', 12, 14);
