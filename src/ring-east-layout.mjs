// June 2024 exteriors at the east end of the widened study area (open question 26): the Lorong 15 corner
// of Geylang Road's north side and the row east of Lorong 12 on its south side. Unnamed unless a listing
// and signage agree. Positions are read on planes where two panoramas agree, then laid on the source front.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
const way = id => `https://www.openstreetmap.org/way/${id}`;

/** Mirror a spec measured from the west end onto a frame that runs east to west. */
function fromWest(spec, width) {
  const m = ([a, b]) => [width - b, width - a];
  const list = (xs, key = 'u') => xs?.map(x => ({ ...x, [key]: m(x[key]) }));
  return {
    ...spec,
    windows: list(spec.windows), vents: list(spec.vents), blocks: list(spec.blocks), backFittings: list(spec.backFittings),
    piers: spec.piers?.map(m), board: spec.board && { ...spec.board, u: m(spec.board.u) },
  };
}

export const no291 = {
  id: 'gr-291', buildingIds: ['454254230'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Lorong 15 corner coffeeshop, No. 291 Geylang Road (June 2024 exterior, occupant not identified)', address: '291 Geylang Road',
  height: 8.3, ceiling: 3.55, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 10.5, colour: '#a8613f' },
  evidence: 'The two-storey Peranakan corner shophouse at the Lorong 15 corner, east of Sik Wai Sin. June 2024 Street View shows two arched upper windows with dark louvred shutters, an ornamental band, a black corner pier, a blade sign reading 291 茶室 291 EATING HOUSE, a Hainanese chicken rice stall board and a blue LPG awning, with dining along the Lorong 15 side under a 333 frog-porridge board. The 291 Eating House listing is marked permanently closed while ACRA records stay live, so no name is given and the boards and blade are blank. Triangulating the party pilaster and the corner pier from two June 2024 panoramas puts the front on the source front and about 4.0 m wide against the 5.13 m source way; the layout is scaled to the source width. The authored corner footprint proposed under open question 5 was not needed: the frontage fits the source way, and a deeper footprint along Lorong 15 could not be confirmed.',
  sources: [way('454254230'), pano('4E9yml2h1kTBeHbJ3p0Ygg', 10), pano('-tVuCuhwTBBFqueftEw2DQ', 330), pano('QSm_EKHCXuTyZel9sEGVzQ', 354, 15, 100)],
  colours: { wall: '#f0efe9', trim: '#e9e7df', frame: '#4d5a58', glass: '#4d5a58', pier: '#f0efe9', back: '#3b3632', floor: '#a59d92' },
  bands: [[8.1, 8.3, .4], [5.36, 6.0, .25]],
  windows: [{ u: [.67, 1.96], h: [6.27, 7.55], arched: true, surround: true }, { u: [2.67, 4.06], h: [6.27, 7.55], arched: true, surround: true }],
  pilasters: [[0, .3, 6.0, 8.1], [4.75, 5.1, 6.0, 8.1]],
  blocks: [
    { name: 'blank stall board', u: [.67, 4.6], h: [4.73, 5.45], out: .08, depth: .06, colour: '#26302f' },
    { name: 'blue box awning', u: [.67, 4.6], h: [3.55, 4.64], out: .35, depth: .7, colour: '#1f3f8c' },
    { name: 'black corner pier', u: [4.3, 5.1], h: [0, 3.55], out: -.2, depth: .4, colour: '#262626' },
    { name: 'blank blade sign', u: [4.98, 5.1], h: [5.7, 8.8], out: .55, depth: .9, colour: '#1f2f6a' },
  ],
  piers: [[0, .3]],
  backFittings: [{ name: 'coffeeshop front', u: [.3, 4.2], h: [.1, 3.4], colour: '#3a332e', glow: .12 }],
};

// East of Lorong 12 on the south side: the rest of block 454438318 after the ChongQingXiaoMian split.
// Triangulating the four party lines from two June 2024 panoramas puts them 4.8 m in front of the source
// front, confirmed from a second drive (open question 29), and gives bays of about 5.0, 4.6 and 5.2 m from the split, which the
// grey|green line meets at 16.7 m against the split's 16.8 m; the fourth bay runs past the block's end.
const W260 = 17.2;
export const no260East = {
  id: 'gr-260-east', buildingIds: ['gr-260-east'], kind: 'unnamed', unnamed: true, frontEdge: 0, reviewRoad: 'Geylang Road',
  name: 'Shophouses east of Lorong 12, Geylang Road south side (June 2024 exterior, occupants not identified)', address: 'Geylang Road, south side, east of Lorong 12',
  height: 7.9, ceiling: 3.7, fiveFootWay: 2.0, roof: { type: 'gable', ridge: 9.6, colour: '#6a6460' },
  evidence: 'Three two-storey shophouses and part of a fourth, east of the Lorong 12 corner strip. Cross-drive triangulation shows the photographed façades stand about 4.8 m north of the source front, and a grey house with a red board stands inside the corner strip; both are open question 29. June 2024 Street View shows a green house with two large casement windows over a dark green blind, a yellow house with three louvred windows over a yellow tarpaulin and a HAPPY PLACE TATTOO banner, a white house with three windows over a teal blind, and the grey house signed 268 beyond. The banner is a temporary sign over a closed frontage, so it is blank and no name is given. Heights were read on the triangulated plane, where the two panoramas agree; the façades are kept on the source front of the owner-approved split (open question 11).',
  sources: [way('454438318'), pano('Y1SvdAjAS2SvYC5qQMSPuw', 200, 12, 100), pano('-tVuCuhwTBBFqueftEw2DQ', 200, 12, 110)],
  colours: { wall: '#e9e8e2', trim: '#e1dfd8', frame: '#2e3436', glass: '#3c4649', pier: '#e9e8e2', back: '#3a3633', floor: '#a39b90' },
  ...fromWest({
    windows: [
      { u: [.6, 2.4], h: [4.2, 7.0] }, { u: [2.6, 4.4], h: [4.2, 7.0] },
      { u: [5.55, 6.55], h: [5.0, 6.9], panes: 1 }, { u: [6.95, 7.95], h: [5.0, 6.9], panes: 1 }, { u: [8.35, 9.35], h: [5.0, 6.9], panes: 1 },
      { u: [10.2, 11.4], h: [4.1, 6.75] }, { u: [11.55, 12.75], h: [4.1, 6.75] }, { u: [12.9, 14.1], h: [4.1, 6.75] },
      { u: [15.4, 16.4], h: [4.9, 6.1] },
    ],
    vents: [{ u: [5.55, 6.55], h: [6.5, 6.9] }, { u: [6.95, 7.95], h: [6.5, 6.9] }, { u: [8.35, 9.35], h: [6.5, 6.9] }, { u: [15.4, 16.4], h: [6.1, 6.5] }],
    blocks: [
      { name: 'green upper wall', u: [.3, 4.85], h: [3.9, 7.9], out: .005, depth: .02, colour: '#62b84a' },
      { name: 'yellow upper wall', u: [5.1, 9.6], h: [3.9, 7.9], out: .005, depth: .02, colour: '#e3b32f' },
      { name: 'grey upper wall', u: [14.95, 17.2], h: [3.8, 7.5], out: .005, depth: .02, colour: '#a9adb0' },
      { name: 'green blind', u: [.2, 4.8], h: [1.0, 3.9], out: .15, depth: .05, colour: '#1f5a3e' },
      { name: 'yellow tarpaulin', u: [5.1, 9.5], h: [.15, 3.65], out: .15, depth: .05, colour: '#e2c23a' },
      { name: 'blank banner', u: [5.6, 9.4], h: [4.03, 5.0], out: .1, depth: .03, colour: '#f2f2ee' },
      { name: 'teal blind', u: [9.9, 14.6], h: [.75, 3.6], out: .15, depth: .05, colour: '#178a96' },
    ],
    backFittings: [{ name: 'grey shutter', u: [15.0, 17.1], h: [.2, 3.2], colour: '#b8bab6' }],
    piers: [[0, .3], [4.85, 5.1], [9.6, 9.85], [14.7, 14.95]],
  }, W260),
  bands: [[7.7, 7.9, .4], [3.6, 3.9, .25]],
};

// No. 134 Sims Avenue, the Lorong 17 east corner. Its outline lies almost entirely beyond the study bounds and
// two June 2024 drives disagree on its position by 3-4 m, so it is drawn as massing with its awnings only.
export const sims134 = {
  id: 'sims-134', buildingIds: ['682928733'], kind: 'unnamed', unnamed: true, massing: true,
  name: 'Corner coffeeshop, 134 Sims Avenue at Lorong 17 (June 2024 exterior, massing only)', address: '134 Sims Avenue',
  height: 14.0, colour: '#ece6d6',
  // Red canvas awnings along the Lorong 17 face and the splayed corner: [edge index, from, to] in metres.
  awnings: [[3, .3, 10.6], [4, .2, 4.1]], awning: { wall: 3.6, drop: .8, depth: 2.0, colour: '#c9302c' },
  evidence: 'A cream four-storey corner building on the east corner of Lorong 17 and Sims Avenue (tagged three levels), with louvred vents and windows on its upper storeys and a coffeeshop under red canvas awnings, green drink-sponsor boards and stall signs at street level in June 2024 Street View. Its outline lies almost entirely beyond the study bounds and two June 2024 drives disagree on its position by 3-4 m, so it is drawn as plain massing at an estimated 14 m with its awnings, and no name is given.',
  sources: [way('682928733'), pano('Zwx6nRNu4CPL9jyWL624Fw', 120, 15, 100)],
};

export const ringEast = [no291, no260East, sims134];
export const ringEastFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const ringEastLayout = (place, width) => simpleHouseLayout(width, place);
export const ringEastReviews = (place, frame) => facing(frame, place.id, 10, 18);
