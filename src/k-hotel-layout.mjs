// April 2024 street exterior of No. 15 Lorong 15. Only the retained No. 15 footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const kHotel = {
  id: 'k-hotel-1515', buildingIds: ['1223539238'], kind: 'k-hotel',
  name: 'K Hotel 1515 (April 2024 exterior)', address: '15 Lorong 15 Geylang',
  height: 22.6, frontEdge: 1, reviewRoad: 'Lorong 15 Geylang',
  evidence: 'The Hotels Licensing Board recorded the change to K Hotel 1515 at 15 Lorong 15 Geylang, and current booking listings keep that name and address. Retained OSM node 4302905933 carries the stale name Chang Ziang Hotel with No. 15 and lies inside the addressed way 1223539238; the stale name is not used. April 2024 Street View shows an eight-level hotel filling the footprint: a three-storey podium with a covered driveway under the K HOTEL 1515 sign, a grey band, four storeys of canted bay windows over aqua panels with X grilles between three round grey columns, a glazed turret with a pyramidal roof and a broad aqua pediment. The north half of the frontage is set back about 1.3 m. Heights were measured photogrammetrically and remain estimates. Rear elevations, rooms and the lobby are not reconstructed.',
  sources: [
    'https://www.hlb.gov.sg/notices/2021-q1/',
    'https://hotels.com/ho2062187072/k-hotel-1515-singapore-singapore',
    'https://www.openstreetmap.org/node/4302905933',
    'https://www.openstreetmap.org/way/1223539238',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=sk190g6HmylnIEWoWujUmA&heading=261.5&pitch=0&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=sk190g6HmylnIEWoWujUmA&heading=261.5&pitch=28&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=4VkQxUB4x9mQmQdqDyRARQ&heading=200&pitch=20&fov=60',
  ],
};

// u runs south (No. 11) to north (No. 17); out runs towards Lorong 15.
export const kHotelFrame = poly => frontageFrame(poly, kHotel.frontEdge);

// Measured plan: the south half sits on the source edge, the north half 1.27 m back.
export const step = { u: 5.9, depth: 1.27 };
export const floors = { bays: [9.1, 12.1, 15.1, 18.1], band: [8.9, 9.83], beam: [22.0, 22.6] };

export function kHotelLayout(width) {
  const boxes = [], prisms = [], columns = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  // A plan polygon in (u, out), extruded between two heights.
  const prism = (name, plan, bottom, top, colour) => prisms.push({ name, plan, bottom, top, colour });
  const white = '#eeebe3', grey = '#8d9298', aqua = '#a6d9d6', glass = '#3d78a8', frame = '#f4f4f0', grille = '#5f6b70';
  const south = 0, north = -step.depth, s = step.u;
  const plane = u => u < s ? south : north;

  // Ground floor, south half: the covered driveway between a grey pier and the "15" column.
  add('driveway floor', 2.61, .06, -4.5, 4.12, .08, 9.0, '#9a9c97');
  add('driveway ceiling', 2.61, 2.30, -4.6, 4.12, .12, 9.2, '#f1efe8');
  for (const u of [.56, 4.66]) add('driveway side wall', u, 1.15, -4.6, .06, 2.3, 9.2, '#e6e3da');
  add('lobby glazing', 2.61, 1.15, -9.1, 4.0, 2.2, .05, '#2e3d44');
  for (const u of [1.2, 2.61, 4.0]) add('lobby door frame', u, 1.15, -9.06, .05, 2.2, .04, '#b7bab4');
  add('south grey pier', .265, 2.3, -.15, .53, 4.6, .30, grey);
  add('15 column', 5.095, 2.3, -.15, .81, 4.6, .30, grey);
  add('driveway beam', 2.61, 2.96, -.05, 4.12, 1.0, .30, grey);
  add('driveway soffit edge', 2.61, 2.33, -.10, 4.12, .26, .22, '#f1efe8');
  add('sign frame', 3.0, 3.84, .12, 4.62, 1.16, .26, grey);

  // Ground floor, north half: grey beam, roller shutter, red door and fire inlet.
  add('north grey beam', 8.73, 3.10, north + .12, 5.6, .60, .24, grey);
  add('roller shutter', 8.15, 1.35, north + .04, 2.92, 2.7, .05, '#d9d8d0');
  for (let y = .25; y < 2.7; y += .12) add('shutter slat', 8.15, y, north + .07, 2.92, .02, .02, '#b8b8b0');
  add('red door', 10.18, 1.10, north + .04, .87, 2.2, .05, '#b0412e');
  add('fire inlet pipe', 10.95, 1.9, north + .14, .10, .9, .10, '#c63a2e');
  add('fire inlet head', 10.95, 2.4, north + .14, .30, .14, .14, '#c63a2e');

  // Podium storeys: windows over aqua spandrels with X grilles, and grey fins.
  const podium = [[1.61, 1.55], [4.12, 1.55], [7.30, 1.15], [9.90, 1.15]];
  for (const [u, w] of podium) {
    const p = plane(u);
    for (const [bottom, top] of [[4.40, 5.60], [7.47, 8.70]]) {
      add('podium window frame', u, (bottom + top) / 2, p + .03, w + .10, top - bottom + .10, .05, frame);
      add('podium window glass', u, (bottom + top) / 2, p + .06, w - .04, top - bottom - .06, .02, glass);
      add('podium mullion', u, (bottom + top) / 2, p + .075, .05, top - bottom - .06, .02, frame);
      add('podium sill', u, bottom - .06, p + .08, w + .16, .07, .16, '#d8d6cf');
    }
    add('aqua spandrel', u, 6.53, p + .03, w + .10, 1.62, .04, aqua);
    xVent(u, 6.53, p + .05, .42);
    if (p === north) { add('white vent panel', u, 3.87, p + .03, w + .10, .94, .04, '#f4f2ec'); xVent(u, 3.87, p + .05, .36); }
  }
  for (const [u, bottom] of [[2.95, 4.3], [8.65, 3.4]]) add('grey fin', u, (bottom + 8.9) / 2, plane(u) + .07, .24, 8.9 - bottom, .14, grey);
  add('grey edge fin', 11.38, 6.15, north + .07, .30, 5.5, .14, grey);
  for (const [a, b, p] of [[0, s, south], [s, width, north]]) {
    const [y0, y1] = floors.band;
    add('podium band', (a + b) / 2, (y0 + y1) / 2, p + .25, b - a, y1 - y0, .50, grey);
    add('podium band soffit', (a + b) / 2, y0 + .02, p + .25, b - a - .02, .04, .48, '#6f747a');
  }

  // Tower storeys: two canted bays per half, each with an aqua panel and X grille
  // below a three-pane window, capped by a white ledge.
  const bayCentres = [1.55, 4.15, 7.50, 9.95], P = .55, W = 2.30, F = W - 2 * P;
  const bays = [];
  for (const [k, f] of floors.bays.entries()) for (const c of bayCentres) {
    const p = plane(c), panelBottom = k ? f : floors.band[1];
    const plan = [[c - W / 2, p], [c - F / 2, p + P], [c + F / 2, p + P], [c + W / 2, p]];
    bays.push({ c, plane: p, plan, panel: [panelBottom, f + 1.4], window: [f + 1.4, f + 2.65], ledge: [f + 2.65, f + 2.95] });
    const ledge = [[c - W / 2 - .08, p], [c - F / 2 - .03, p + P + .1], [c + F / 2 + .03, p + P + .1], [c + W / 2 + .08, p]];
    prism('bay ledge', ledge, f + 2.65, f + 2.95, white);
    if (k === 0) prism('bay base', ledge, floors.band[1] - .02, floors.band[1] + .06, white);
    xVent(c, f + .75 + (k ? 0 : .2), p + P + .02, .40);
  }

  // Three round grey columns rise from the band to the top beam.
  for (const [u, p] of [[.20, south], [6.18, north], [11.36, north]]) columns.push({ u, out: p + .22, d: .34, bottom: floors.band[1], top: floors.beam[0] });

  // Top beam, pediment and the glazed turret on the roof.
  for (const [a, b, p] of [[0, s, south], [s, width, north]]) add('top beam', (a + b) / 2, 22.3, p + .2, b - a, .6, .40, grey);
  // The measured apexes range from 26.2 to 28.1 m; the steeper roof stays visible from the forecourt, as observed.
  const turret = { u0: .25, u1: 2.85, out0: -2.6, out1: -.05, wall: [22.6, 24.4], apex: 27.3 };
  const pediment = { u0: 3.0, u1: width - .05, apexU: 7.3, base: 23.1, apex: 26.2, out: north + .1 };
  // Rooftop lift and plant room, set well back as seen from the north.
  add('rooftop plant room', 5.75, 24.1, -11.5, 4.5, 3.0, 5.0, '#e9e6de');
  for (const [u, h] of [[4.2, 3.2], [7.0, 2.6]]) add('rooftop antenna', u, 25.6 + h / 2, -12.5, .05, h, .05, '#7d8287');

  // Forecourt: concrete apron and parking lines between the frontage and Lorong 15.
  const apron = { u0: .1, u1: width - .1, out0: 0, out1: 9.0 };
  for (const u of [5.3, 7.75, 10.2]) add('parking bay line', u, .07, 4.2, .10, .01, 4.6, '#d8b23c');
  add('parking bay front line', 7.75, .07, 6.45, 4.9, .01, .10, '#d8b23c');
  add('boom gate post', 4.95, .55, .45, .22, 1.1, .22, '#d9822b');
  add('lollipop sign post', .45, 1.1, 1.3, .07, 2.2, .07, '#9a9c97');
  return { boxes, prisms, columns, bays, turret, pediment, apron, sign: { left: .76, right: 5.18, bottom: 3.33, top: 4.34, out: .26 }, lollipop: { u: .45, out: 1.3, y: 2.4, r: .32 } };

  // X-shaped grille: a dark square with two crossed bars.
  function xVent(u, y, out, size) {
    add('grille', u, y, out, size, size, .03, grille);
    add('grille border', u, y, out - .01, size + .08, size + .08, .02, '#c7ccc9');
    for (const roll of [45, -45]) add('grille bar', u, y, out + .02, size * 1.25, .05, .02, '#b9bec0', 0, roll);
  }
}

export function kHotelReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'k-hotel-1515', p: point(width / 2 + .6, 11.5), target: point(width / 2, 0), pitch: 28 },
    { id: 'k-hotel-1515-oblique', p: point(-1.2, 11.5), target: point(width / 2, 0), pitch: 22 },
    { id: 'k-hotel-1515-forecourt', p: point(3.0, 6.5), target: point(2.6, -1), pitch: 12 },
    // The forecourt is only about 12 m deep, so the turret and pediment need a steep look up.
    { id: 'k-hotel-1515-top', p: point(width / 2 + 2.5, 12.5), target: point(width / 2, 0), pitch: 55 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
