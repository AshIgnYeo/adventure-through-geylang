// Lorong 25A from Sims Avenue to Geylang Road (open question 107), from the Lorong 25 extract of 28 November 2026 and
// KartaView's drive of 16 May 2023 down the lane (sequence 8344809, frames 2066-2091). The source outlines here are
// coarser than the frontages: one outline can hold a temple and a row of link houses, another a modern house, an
// apartment block and part of a building site. Each outline takes the frontages its corners bracket in the frames, with
// upper volumes where one part stands taller, so the matching carries some uncertainty (open question 108). Every plot
// is photographed massing with openings placed by estimate, heights from storey counts carrying about ±2 m (±4 m for
// five storeys or more), unnamed for now with its boards drawn blank. See docs/lorong-25a-brief.md.
import { laneFrame, laneLayout, laneUpper, laneReviews, laneSides } from './lane-house-layout.mjs';
import { plot, grid, spread, floors, span, plain, r2 } from './lorong-25-layout.mjs';

const lane = 'Lorong 25A Geylang';
// An upper volume over the part of a front between u0 and u1, set back `back` from the front and `depth` deep.
const volume = (name, u0, u1, from, to, colour, { back = .3, depth = 10, roof = '#9a9c98', windows = [], blocks = [] } = {}) =>
  ({ name, outline: [[u0, -back], [u1, -back], [u1, -back - depth], [u0, -back - depth]], from, to, colour, roof, windows, blocks });

export const lorong25a = [
  // West side, Sims Avenue to Geylang Road. Each front runs south to north.
  plot({ id: 'l25a-ecm', way: '454254134', front: 0, W: 13.13, storeys: 5, road: 'Sims Avenue', colours: { wall: '#f0f0ec', frame: '#2a5aa8', glass: '#3a4a56' }, frames: ['2066', '2069', '2071'], review: 15,
    label: 'No. 260 Sims Avenue, the Lorong 25A corner', address: '260 Sims Avenue, at the west corner of Lorong 25A',
    look: 'a white office block of five storeys on the west corner of Sims Avenue and Lorong 25A, banded in blue under its windows and along its base, with a covered way to the lane',
    signs: 'A board names a learning hub; the source way is named ECM Building.',
    blocks: [...floors(4, 3.6, 3.2).map(b => plain('blue band', span(13.13), [r2(b), r2(b + .25)], '#2a5aa8', .03, .04)), plain('blue base', span(13.13), [0, .9], '#2a5aa8', .03, .04)] }),
  plot({ id: 'l25a-temple-row', way: '454254137', front: 1, W: 27.13, storeys: 2, height: 7.6, road: lane, colours: { wall: '#eeeae2', frame: '#3a3836', glass: '#2e3438' }, frames: ['2073', '2075', '2077', '2079'], review: 15,
    roof: { type: 'hip', ridge: 10.0, colour: '#7a3a3a' },
    label: 'Lorong 25A Geylang, west side, the temple and link houses', address: 'West side of Lorong 25A Geylang',
    look: 'a yellow Buddhist temple building of four storeys with octagonal windows and orange glazed tile eaves at each floor, then a row of two-storey link houses under maroon tiled roofs behind gates and car porches, on the west side of Lorong 25A, all set back behind forecourts',
    signs: 'Chinese characters on the temple name a Buddhist society.',
    windows: grid(spread(14.6, 4, 1.6), [4.0], 1.6).map(w => ({ ...w, u: [r2(w.u[0] + 12.0), r2(w.u[1] + 12.0)] })),
    blocks: [plain('yellow temple front', [.4, 11.6], [.2, 7.4], '#ecd27a', .006, .01), plain('orange glazed eave', [.2, 11.8], [3.2, 3.6], '#e08a3a', .4, .6),
      ...spread(14.6, 4, .2, .2).map(u => plain('porch post', [r2(u[0] + 12.0), r2(u[1] + 12.0)], [0, 2.8], '#e8e4dc', .6, .2))],
    upper: [volume('temple upper floors', .4, 11.6, 7.6, 14.0, '#ecd27a', { roof: '#e08a3a', depth: 12,
      windows: grid(spread(11.2, 3, 1.4, .6).map(u => [r2(u[0] + .4), r2(u[1] + .4)]), [8.6, 11.6], 1.4, 2),
      blocks: [plain('orange glazed eave', [.2, 11.8], [10.4, 10.8], '#e08a3a', .4, .6), plain('orange glazed eave', [.2, 11.8], [13.6, 14.0], '#e08a3a', .5, .8)] })] }),
  plot({ id: 'l25a-pink', way: '454254138', front: 1, W: 12.46, storeys: 5, road: lane, colours: { wall: '#f2e2dc', frame: '#2e7a5a', glass: '#2a4a40' }, frames: ['2081', '2083'], review: 13,
    label: 'Lorong 25A Geylang, west side, the pink apartments', address: 'West side of Lorong 25A Geylang',
    look: 'a pale pink and white apartment block of five storeys on the west side of Lorong 25A, with green-framed windows over a gated parking floor',
    blocks: [plain('black gates', [1.0, 8.0], [0, 1.8], '#2a2a2a', .5, .1)] }),
  plot({ id: 'l25a-clan', way: '454438289', front: 2, W: 14.47, storeys: 3, road: lane, colours: { wall: '#f0efea', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['2083', '2085'], review: 9,
    label: 'Lorong 25A Geylang, west side, the clan association and the Buddhist society', address: 'West side of Lorong 25A Geylang',
    look: 'two white three-storey shophouses on the west side of Lorong 25A: a clan association with a red board and lanterns over a folding gate, and a Buddhist society under a blue awning with a red board and red lanterns',
    signs: 'The boards read SIOW\'S CLAN GUILD ASSOCIATION with Chinese characters, 花蓮宮, and Guan Chen Buddhist Society.',
    windows: grid(spread(14.47, 4, 1.8), [4.2, 7.2], 1.5, 3),
    blocks: [plain('blank red board', [7.6, 13.8], [3.0, 3.6], '#b8302a', .05, .04), plain('blank red board', [.7, 6.8], [3.0, 3.6], '#b8302a', .05, .04), plain('blue awning', [.5, 6.9], [2.5, 2.9], '#2a4a8a', .5, .9)] }),
  plot({ id: 'l25a-church-tower', way: '454254132', front: 0, W: 14.80, storeys: 6, road: lane, colours: { wall: '#f2f2ee', frame: '#5a5e60', glass: '#3a4a56' }, frames: ['2087'], review: 9,
    label: 'Lorong 25A Geylang, west side, the church tower', address: 'West side of Lorong 25A Geylang',
    look: 'a white church block of about six storeys between Lorongs 25 and 25A, its Lorong 25A front screened by grey louvres over a parking floor and its Lorong 25 face carrying a tall cross and Chinese characters reading 錫安樓',
    signs: 'The source way is named Coronation Baptist Church.',
    windows: grid([[1.0, 3.0]], floors(5, 4.1, 3.2), 1.6, 2),
    blocks: [plain('grey louvre screen', [3.6, 14.4], [3.4, 19.4], '#a8aaa8', .1, .1), plain('grey shutter', [4.0, 10.0], [0, 2.8], '#7a7c7e', .03, .04)] }),
  plot({ id: 'l25a-church', way: '454254131', front: 2, W: 13.04, storeys: 2, height: 7.6, road: lane, colours: { wall: '#2a6ad8', frame: '#f2f2ee', glass: '#2e3438' }, frames: ['2087', '2089'], review: 10.5,
    label: 'Lorong 25A Geylang, west side, the church activity centre', address: 'West side of Lorong 25A Geylang',
    look: 'a bright blue two-storey building between Lorongs 25 and 25A, its glass doors on Lorong 25A under a white board, with a forecourt of potted trees on its Lorong 25 side',
    signs: 'The board reads 加冕浸信教會 CORONATION BAPTIST CHURCH, Activities Centre.',
    windows: grid(spread(13.04, 3, 1.4), [4.3], 1.4, 2),
    blocks: [plain('blank white board', [1.0, 7.0], [2.9, 3.5], '#f2f2ee', .05, .04), plain('glass doors', [1.2, 6.8], [.05, 2.7], '#2e3438', .03, .04)] }),
  // East side, Sims Avenue to Geylang Road. Each front runs north to south.
  plot({ id: 'l25a-270', way: '454274514', front: 0, W: 14.22, storeys: 5, road: lane, colours: { wall: '#9ea2a6', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['2069', '2071'], review: 7,
    label: 'No. 270 Sims Avenue, the Lorong 25A corner', address: '270 Sims Avenue, at the east corner of Lorong 25A',
    look: 'a grey block of five storeys on the east corner of Sims Avenue and Lorong 25A, its lane side lettered 270 SIMS AVENUE under a blue clinic board, then a cream apartment front numbered 48 with yellow arched balconies further down the lane',
    signs: 'The board reads K M HENG WOMEN\'S CLINIC PTE LTD; the source way is named Sims Avenue Sek Lim.',
    blocks: [plain('blank blue board', [.6, 8.0], [3.4, 4.0], '#2a4a9a', .05, .04), plain('cream front', [8.6, 14.19], [.2, 16.2], '#f0e8d0', .006, .01),
      ...floors(4, 3.8, 3.2).map(b => plain('yellow arched balcony', [9.4, 13.4], [r2(b), r2(b + 1.0)], '#e0c040', .5, .3))] }),
  plot({ id: 'l25a-amitabha', way: '454254120', front: 3, W: 11.12, storeys: 4, road: lane, colours: { wall: '#f2ead8', frame: '#a8282a', glass: '#3a2a22' }, frames: ['2071', '2073'], review: 16.5,
    label: 'Lorong 25A Geylang, east side, the Buddhist centre', address: 'East side of Lorong 25A Geylang',
    look: 'a cream Buddhist centre of four storeys on the east side of Lorong 25A, banded in red and gold with golden ornaments and a golden emblem, its upper floors under blue scaffolding netting, behind a white wall set with golden prayer wheels and small golden stupas',
    signs: 'The source way is named Amitabha Buddhist Centre; the lettering on its front is not drawn.',
    blocks: [...floors(3, 3.6, 3.2).map(b => plain('red and gold band', span(11.12), [r2(b), r2(b + .5)], '#b8302a', .05, .1)), plain('blue scaffold netting', [5.6, 11.0], [3.0, 13.2], '#2a6ad8', .6, .1),
      plain('white prayer-wheel wall', [.4, 10.7], [0, 2.4], '#f2f0ea', 1.5, .4)] }),
  plot({ id: 'l25a-centra-suites', way: '454254121', front: 7, W: 28.09, storeys: 7, road: lane, colours: { wall: '#d8dadc', frame: '#3a3c3e', glass: '#2e3438' }, frames: ['2075', '2077'], review: 11.5,
    label: 'No. 38 Lorong 25A Geylang', address: '38 Lorong 25A Geylang (the source tag)',
    look: 'a modern grey and white apartment block of about seven storeys on the east side of Lorong 25A, its balconies screened by grey louvres, behind a dark wall and a grey slatted fence',
    signs: 'The wall carries a ring logo and the words CENTRA SUITES, as the source way names it.',
    windows: grid([[1.0, 13.0], [15.0, 27.0]], floors(6, 4.1, 3.2), 1.8, 5),
    blocks: [...floors(6, 3.8, 3.2).map(b => plain('grey louvre screen', [1.0, 27.0], [r2(b), r2(b + 2.2)], '#8a8c8e', .4, .06)), plain('dark wall', [.3, 27.8], [0, 1.8], '#3a3c3e', .8, .2)] }),
  plot({ id: 'l25a-apartments', way: '454274536', front: 0, W: 63.24, storeys: 1, height: 2.6, road: lane, colours: { wall: '#eeeeea', frame: '#2e7a5a', glass: '#2a4a40' }, frames: ['2079', '2081', '2083', '2085'], review: 14.5,
    label: 'Lorong 25A Geylang, east side, the apartments and the building site', address: 'East side of Lorong 25A Geylang',
    look: 'from the north, a white and grey three-storey modern house, then a white apartment block of about seven storeys with green-trimmed balconies behind a green railing and a gate, then the hoardings of a building site running on to Geylang Road',
    signs: 'The hoardings read zyanya and advertise a freehold development.',
    windows: [],
    blocks: [plain('green railing', [7.0, 39.0], [0, 1.6], '#2e7a5a', .6, .1), plain('site hoarding', [41.0, 63.2], [0, 2.6], '#d8dadc', .1, .1), plain('yellow hoarding panel', [44.0, 52.0], [.3, 2.4], '#e8c830', .2, .02)],
    upper: [volume('modern house', .3, 6.4, 2.6, 10.2, '#e8e8e4', { depth: 11, windows: grid([[1.0, 5.4]], [4.0, 7.2], 1.8, 3) }),
      volume('apartment block', 7.0, 39.0, 2.6, 22.8, '#f2f2ee', { back: 1.0, depth: 11, windows: grid(spread(32, 8, 1.8).map(u => [r2(u[0] + 7.0), r2(u[1] + 7.0)]), floors(6, 4.1, 3.2), 1.6, 3),
        blocks: floors(6, 3.8, 3.2).map(b => plain('green balcony trim', [8.0, 38.0], [r2(b), r2(b + .3)], '#2e9a6a', .4, .1)) })] }),
  // The site's source outline reaches into the lane's modelled carriageway, so its panel is held flat on the front.
  { heldFlat: true, ...plot({ id: 'l25a-site', way: '454438304', front: 0, W: 26.55, storeys: 1, height: 2.6, road: lane, colours: { wall: '#d8dadc', frame: '#3a3c3e', glass: '#3a3c3e' }, frames: ['2087', '2089', '2091'], review: 6,
    label: 'Lorong 25A Geylang, the Geylang Road corner, east side', address: 'East corner of Lorong 25A and Geylang Road',
    look: 'the hoardings of a building site on the east corner of Lorong 25A and Geylang Road, under a sheltered walkway, with a tower crane and a new block rising behind them',
    signs: 'The hoardings carry a contractor\'s board and safety notices.',
    windows: [], blocks: [plain('dark hoarding panel', [3.0, 9.0], [.3, 2.4], '#2a2a2c', .03, .02)] }) },
];
export const lorong25aFrame = laneFrame, lorong25aLayout = laneLayout, lorong25aUpper = laneUpper, lorong25aReviews = laneReviews, lorong25aSides = laneSides;
