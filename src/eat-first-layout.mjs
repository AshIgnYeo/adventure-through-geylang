// June 2024 street exterior. Only the No. 287 source footprint is assigned.
import { frontageFrame, gableRoof } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const eatFirst = {
  id: 'eat-first', buildingIds: ['454254228'], kind: 'eat-first',
  name: 'Eat First (June 2024 exterior)', address: '287 Geylang Road',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'Eatbook, Burpple and ieatishootipost give Eat First at 287 Geylang Road, the original Sik Wai Sin premises it returned to in July 2023. Retained 2017 OSM node 4689499460 (Sik Wai Sin) lies inside unnumbered way 454254228, east of the Buddhist Art Centre at No. 285. June 2024 Street View shows the red 食之為鮮 EAT FIRST fascia numbered 287, a maroon board over a glass shopfront and a grille gate in a 2 m five-foot way, three segmental-arched casements with green louvred leaves and red frames between Corinthian pilasters, relief cartouches and frieze, a green gutter and an orange tiled roof whose ridge sits about 8 m back. Heights were measured photogrammetrically from calibrated panoramas and remain estimates. Only this footprint is assigned; the Sik Wai Sin frontage at No. 289 and the dark door in its five-foot way are excluded. No interior, diners, food or temporary notices are reconstructed.',
  sources: [
    'https://eatbook.sg/eat-first/',
    'https://ieatishootipost.sg/eat-first-tale-two-brothers/',
    'https://www.openstreetmap.org/node/4689499460',
    'https://www.openstreetmap.org/way/454254228',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=LiyhSflRbRfon_vCcaecGQ&heading=352&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=4E9yml2h1kTBeHbJ3p0Ygg&heading=352&pitch=0&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=_w5yHraTw78BWJJ4wn1RSQ&heading=28&pitch=9&fov=34',
  ],
};

// u runs west (No. 285) to east (No. 289) along the frontage, out towards the road.
export const eatFirstFrame = poly => frontageFrame(poly, eatFirst.frontEdge);

// Ridge 8 m back, matching the triangulated party-wall coping peaks of Nos. 287 and 289.
export const eatFirstRoof = frame => gableRoof(frame, eatFirst);

export function eatFirstLayout(width) {
  // West pier abuts the ochre No. 285 pier; the east pier is the No. 287 half of
  // the pier shared with No. 289.
  const base = pairedShophouseLayout(width, { piers: [{ u: .16, w: .30 }, { u: width - .24, w: .46 }], downpipe: true });
  const { add } = base, D = eatFirst.fiveFootWay, metal = '#b5b8b2';

  // Back wall: aluminium-framed shopfront, opaque so no dining room is shown,
  // then the grille gate and its dark transom.
  add('opaque shopfront glass', 1.75, 1.30, -D + .06, 3.40, 2.34, .03, '#36403f');
  for (const u of [.08, 1.20, 2.35, 3.43]) add('shopfront frame', u, 1.30, -D + .09, .06, 2.34, .04, metal);
  for (const [y, h] of [[.18, .06], [2.30, .10], [2.45, .05]]) add('shopfront rail', 1.75, y, -D + .09, 3.40, h, .04, metal);
  for (const u of [1.12, 1.28]) add('door pull', u, 1.15, -D + .13, .025, .45, .03, '#d7d9d3');
  add('maroon board border', 1.77, 3.065, -D + .06, 3.46, 1.0, .04, '#4a2124');
  add('grille gate backing', 4.03, 1.28, -D + .05, .92, 2.30, .03, '#2b302f');
  for (let i = 0; i <= 10; i++) add('grille gate bar', 3.585 + .89 * i / 10, 1.28, -D + .09, .022, 2.28, .025, '#a3a8a3');
  for (const y of [.25, 1.28, 2.40]) add('grille gate rail', 4.03, y, -D + .09, .92, .04, .03, '#a3a8a3');
  add('gate transom', 4.03, 3.0, -D + .05, .92, .98, .03, '#2e3433');
  for (const u of [3.80, 4.03, 4.26]) add('transom bar', u, 3.0, -D + .08, .025, .96, .03, '#7d837f');
  add('sign backing', 2.38, 3.585, .035, 4.46, .58, .07, '#8f2422');
  return {
    ...base,
    sign: { left: .16, right: 4.60, bottom: 3.30, top: 3.87, out: .072 },
    board: { left: .08, right: 3.46, bottom: 2.60, top: 3.53, out: -D + .085 },
    plaque: { u: .301, out: [-.12, -.40], bottom: 2.02, top: 2.24 },
  };
}

export function eatFirstReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'eat-first', p: point(width / 2, 14), target: point(width / 2, 0), pitch: 15 },
    // The oblique start approximates the calibrated cross-road panorama camera.
    { id: 'eat-first-oblique', p: point(-16.3, 23.7), target: point(width / 2, 0), pitch: 12 },
    { id: 'eat-first-five-foot-way', p: point(width / 2 - .4, 2.8), target: point(width / 2, -1.5), pitch: 16 },
    { id: 'eat-first-upper', p: point(width / 2 + 1.2, 5.5), target: point(width / 2, 0), pitch: 27 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
