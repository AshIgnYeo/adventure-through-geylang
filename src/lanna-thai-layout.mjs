// April 2024 street exterior of No. 34 Lorong 11. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const lannaThai = {
  id: 'lanna-thai', buildingIds: ['1223250206'], kind: 'lanna-thai',
  name: 'Lanna Thai Traditional Massage, in the building signed 南洋丁氏總會 (April 2024 exterior)', address: '34 Lorong 11 Geylang',
  height: 8.14, frontEdge: 2, fiveFootWay: 2.1, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Lanna Thai Traditional Massage at 34 Lor 11 Geylang, Singapore 388726, Floor 1, open in October 2026. April 2024 Street View shows its yellow LANNA THAI TRADITIONAL MASSAGE board, ending in the number 34, in the five-foot way of a cream two-storey building with 1995 and 南洋丁氏總會 in raised white letters on its parapet. No listing for that association was found, so the lettering is modelled as photographed, without a claim about current use. A second band of grey letters ending 揚體育會 is omitted because its first glyph is uncertain. Triangulation from three April 2024 panoramas puts the façade corners within about 0.3 m of the front of source way 1223250206, tagged No. 34, and its width at 9.22 m against the source 9.37 m. The source rear edge is skewed and is preserved unchanged. Heights come from a square-on frame with the camera height used for the same April 2024 drive at No. 19. The roof behind the parapet and the rear massing are estimates from satellite imagery and the exposed party wall. Posters, plants and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Lanna+Thai+Traditional+Massage+34+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223250206',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=aHF7c6gZTF_nwgN7N0wTwg&heading=74.65&pitch=0&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=hHdVXQD79Suo5Y4VlonoNg&heading=72.8&pitch=2&fov=100',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=QQNp4tBAf9BWzHrMOUczcw&heading=30&pitch=2&fov=100',
  ],
};

// u runs north (the No. 36 party wall) to south (No. 32); out runs west towards Lorong 11.
export const lannaThaiFrame = poly => frontageFrame(poly, lannaThai.frontEdge);

// Measured from the south corner (uS) in the square-on frame, then mapped onto the source frontage.
// Heights in metres above the five-foot way.
export const elevation = {
  measuredWidth: 9.22,
  parapet: [7.95, 8.14], year: [7.13, 7.41], name: [6.36, 6.93], cornice: [6.20, 6.33],
  vents: [5.67, 5.96], smallWindows: [4.44, 5.59], smallSills: [4.30, 4.42],
  largeWindow: [3.55, 5.96], largeTransom: 4.46, largeSill: [3.40, 3.55], ledge: [2.79, 2.98],
  // [uS left, uS right] spans along the façade, from the No. 32 corner.
  spans: {
    largeWindow: [.20, 3.51], smallWindowSouth: [3.97, 5.82], smallWindowNorth: [6.50, 8.33],
    year: [3.99, 4.96], name: [1.75, 6.91], nameCentres: [6.68, 5.88, 4.83, 4.09, 3.02, 2.05], northPier: [8.80, 9.22], southPier: [0, .30],
    upperLamps: [2.6, 4.5, 6.2], lowerLamps: [5.82, 7.22],
    // On the back wall, 2.1 m behind the façade.
    slate: [.50, 6.30], poster: [2.88, 6.20], board: [.58, 6.23], glassDoor: [6.36, 7.64], grilleDoor: [7.83, 8.90],
  },
  board: [2.32, 2.96], poster: [1.31, 2.13], ceiling: 3.02,
  // The south party wall stands at parapet height for about 6.1 m behind the façade.
  frontBlockDepth: 6.1, roofDepth: 10, rearHeight: 6.3,
  // tan of the source south side's angle from the façade normal (about 11°).
  southSkew: .2,
};

export function lannaThaiLayout(width) {
  const E = elevation, S = E.spans, k = width / E.measuredWidth;
  // Map a south-measured span onto u, which runs from the north corner.
  const span = ([l, r]) => [width - r * k, width - l * k];
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const cream = '#e9e3d2', shade = '#d2cbb8', frame = '#2b2e30', glass = '#3e4a52', D = lannaThai.fiveFootWay;

  // Parapet coping, the cornice ledge under the name and the ground-floor ledge.
  add('parapet coping', width / 2, (E.parapet[0] + E.parapet[1]) / 2, .04, width, E.parapet[1] - E.parapet[0], .14, '#7d7a72');
  add('cornice ledge', width / 2, (E.cornice[0] + E.cornice[1]) / 2, .07, width, E.cornice[1] - E.cornice[0], .16, shade);
  add('ground-floor ledge', width / 2, (E.ledge[0] + E.ledge[1]) / 2, .06, width, E.ledge[1] - E.ledge[0], .14, shade);

  // Upper storey: two small windows under breeze-block vents, and one large two-tier window.
  for (const key of ['smallWindowSouth', 'smallWindowNorth']) {
    const [l, r] = span(S[key]), u = (l + r) / 2, w = r - l, [b, t] = E.smallWindows;
    add('window surround', u, (b + t) / 2, .02, w + .16, t - b + .14, .04, cream);
    add('window frame', u, (b + t) / 2, .045, w, t - b, .03, frame);
    add('window glass', u, (b + t) / 2, .062, w - .08, t - b - .08, .01, glass);
    for (const f of [1 / 3, 2 / 3]) add('window mullion', l + w * f, (b + t) / 2, .068, .035, t - b - .08, .015, frame);
    add('window sill', u, (E.smallSills[0] + E.smallSills[1]) / 2, .07, w + .2, E.smallSills[1] - E.smallSills[0], .12, shade);
  }
  {
    const [l, r] = span(S.largeWindow), u = (l + r) / 2, w = r - l, [b, t] = E.largeWindow;
    add('large window surround', u, (b + t) / 2, .02, w + .16, t - b + .1, .04, cream);
    add('large window frame', u, (b + t) / 2, .045, w, t - b, .03, frame);
    add('large window glass', u, (b + t) / 2, .062, w - .08, t - b - .08, .01, glass);
    add('large window transom', u, E.largeTransom, .068, w - .08, .05, .015, frame);
    for (const f of [.25, .5, .75]) add('large window mullion', l + w * f, (b + t) / 2, .068, .035, t - b - .08, .015, frame);
    add('large window sill', u, (E.largeSill[0] + E.largeSill[1]) / 2, .07, w + .2, E.largeSill[1] - E.largeSill[0], .12, shade);
  }

  // Ground floor: piers at the façade line, a 2.1 m five-foot way and its back wall.
  // The source's south side is skewed, so items behind the façade are clipped to it there.
  // uMax(out) gives the southern limit at a depth behind the façade.
  const uMax = out => width - Math.abs(out) * E.southSkew - .02;
  for (const key of ['northPier', 'southPier']) {
    const [l, r0] = span(S[key]), r = Math.min(r0, uMax(.3));
    add('pier', (l + r) / 2, E.ledge[0] / 2, -.15, r - l, E.ledge[0], .3, cream);
  }
  // The ledge is a downstand beam at the façade; the ceiling behind it is higher, above the board.
  add('front beam', uMax(.2) / 2, (E.ledge[0] + E.ceiling) / 2, -.1, uMax(.2), E.ceiling - E.ledge[0], .2, cream);
  const wall = -D + .035;
  {
    // Dark slate tiles under the board, with a long framed poster, kept blank.
    const [l, r] = span(S.slate), [pl, pr] = span(S.poster), [pb, pt] = E.poster;
    add('slate tiled wall', (l + r) / 2, E.board[0] / 2, wall, r - l, E.board[0], .02, '#3a3b3e');
    add('poster frame', (pl + pr) / 2, (pb + pt) / 2, wall + .02, pr - pl, pt - pb, .03, '#c9c6bd');
    add('poster', (pl + pr) / 2, (pb + pt) / 2, wall + .04, pr - pl - .1, pt - pb - .1, .01, '#c98a55');
  }
  {
    const [l, r] = span(S.glassDoor);
    add('glass door frame', (l + r) / 2, 1.2, wall, r - l, 2.3, .03, '#4b4743');
    add('glass door', (l + r) / 2, 1.2, wall + .02, r - l - .1, 2.2, .01, '#23282b');
  }
  {
    const [l, r] = span(S.grilleDoor);
    add('dark door', (l + r) / 2, 1.15, wall, r - l, 2.3, .03, '#3a2b24');
    for (let i = 1; i < 6; i++) add('door grille bar', l + (r - l) * i / 6, 1.15, wall + .03, .025, 2.1, .02, '#5d5853');
    for (const y of [.35, 1.15, 1.95]) add('door grille rail', (l + r) / 2, y, wall + .03, r - l - .08, .03, .02, '#5d5853');
  }
  // White downpipe on the south pier.
  add('downpipe', width - .12, (E.ledge[0] + 7.9) / 2, .07, .08, 7.9 - E.ledge[0], .08, '#efede6');
  const slate = span(S.slate);
  if (slate[1] > uMax(D)) throw new Error('back-wall fittings must clear the skewed south side');

  // Black floodlight boxes on stands, on the cornice ledge and on the ground-floor ledge.
  const lamps = [
    ...S.upperLamps.map(uS => ({ u: width - uS * k, y: E.cornice[1], tilt: 1 })),
    ...S.lowerLamps.map(uS => ({ u: width - uS * k, y: E.ledge[1], tilt: 1 })),
  ];
  for (const l of lamps) {
    add('floodlight stand', l.u, l.y + .06, .1, .03, .12, .03, '#222222');
    add('floodlight', l.u, l.y + .13, .1, .32, .06, .22, '#1d1d1d');
  }

  const [nl, nr] = span(S.name), [yl, yr] = span(S.year), [bl, br] = span(S.board);
  return {
    boxes,
    name: { left: nl, right: nr, bottom: E.name[0], top: E.name[1], out: .03, centres: S.nameCentres.map(uS => width - uS * k) },
    year: { left: yl, right: yr, bottom: E.year[0], top: E.year[1], out: .03 },
    board: { left: bl, right: br, bottom: E.board[0], top: E.board[1], out: wall + .03 },
    fiveFootWay: { depth: D, ceiling: E.ceiling, floor: '#8f8b80', soffit: '#e4ded0', wall: '#d9d2c1' },
    vents: ['smallWindowSouth', 'smallWindowNorth'].map(key => { const [l, r] = span(S[key]); return { left: l, right: r, bottom: E.vents[0], top: E.vents[1], out: .03 }; }),
  };
}

export function lannaThaiReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'lanna-thai', p: point(width / 2, 7.0), target: point(width / 2, 0), pitch: 20 },
    { id: 'lanna-thai-five-foot-way', p: point(width * .65, 3.0), target: point(width * .55, -2.1), pitch: 6 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
