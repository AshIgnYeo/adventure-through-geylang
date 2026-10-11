// April 2024 street exterior of No. 2 Lorong 11. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const aiSecurity = {
  id: 'aisecurityready', buildingIds: ['1223250214'], kind: 'aisecurityready',
  name: 'AiSecurityReady CCTV shop, No. 2 Lorong 11 (April 2024 exterior)', address: '2 Lorong 11 Geylang',
  height: 8.0, ridgeHeight: 10.2, ridgeDepth: .45, eavesOverhang: .55, frontEdge: 2, fiveFootWay: 1.8, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'The operator website (Ai Trading And Marketing, AiSecurityReady), read on 10 October 2026, gives its CCTV shop at 2 Lor 11 Geylang, Singapore 388694, and Google Maps lists AiSecurityReady at the same address, open; the source way is tagged No. 2, between S.M. Khek Leow (No. 4, already modelled) and the Leong Kee corner. April 2024 Street View shows the ornate charcoal-grey conserved shophouse with three arched upper openings (louvred timber shutters either side of a full-height pair), Peranakan tile panels and strips, carved pilaster panels and capitals, a modillion cornice and a fretwork eave board under a tiled roof. Its ground floor carries a lit SUPPLY / INSTALL / WHOLESALE / CCTV sign and CCTV advertising under a board left over from Wina Salon, which is listed as permanently closed; the operator name itself is not displayed in the frames examined. Three panoramas rectified onto the source front agree on the No. 4 party line; the photographed frontage is 5.26 m, matching the source edge, with a 0.64 m along-street offset shared by these same-drive panoramas. Heights are read from the five-foot-way floor in a near square-on frame. Fine carving, cameras, solar panels, the vending machine, posters and the interior are not reconstructed; the tile pattern is an original simplification.',
  sources: [
    'https://aisecurityready.com/',
    'https://www.google.com/maps/search/?api=1&query=AiSecurityReady+2+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223250214',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=ifUFTPmGn1-kOv6waVHktw&heading=80&pitch=10&fov=60',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=Kh1ZpAnWZ1uShZfVr533yQ&heading=50&pitch=10&fov=60',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=DuD94mwPz0YzH7qI81rjmA&heading=120&pitch=10&fov=60',
  ],
};

// u runs from the No. 4 party line (north) to the south side; out runs west towards Lorong 11.
export const aiSecurityFrame = poly => frontageFrame(poly, aiSecurity.frontEdge);

// Measured, metres from the No. 4 line and above the five-foot-way floor.
export const elevation = {
  pilasters: [[0, .63], [4.45, 5.26]], columns: [[1.72, 2.04], [3.08, 3.4]],
  windows: [[.76, 1.72], [3.4, 4.35]], door: [2.04, 3.08],
  shutters: [4.65, 6.0], fanlight: [6.0, 6.36], archTop: 6.55, doorSill: 3.95,
  tilePanels: [4.05, 4.45], tileStrips: { u: [.63, 1.81, 3.18, 4.27], h: [4.4, 5.7], w: .17 },
  reliefs: [[.1, .45], [4.75, 5.15]], reliefH: [4.5, 5.9], capitals: [6.27, 6.9],
  cornice: [7.0, 7.4], frieze: [7.4, 7.95],
  floorBand: [3.55, 3.95], fascia: [3.09, 3.55], canopy: { u: [.73, 4.86], h: [2.95, 3.09], scroll: .4 },
  ceiling: 2.95, piers: [[0, .46], [4.8, 5.26]],
  board: { u: [1.17, 4.08], h: [2.14, 2.93] },
  louvreWindow: { u: [.94, 1.17], h: [2.32, 2.68] }, timberDoor: { u: [1.26, 1.76], h: [.4, 2.09] },
  glassDoor: { u: [2.08, 3.08], h: [.4, 2.05] }, display: { u: [3.3, 4.22], h: [1.3, 2.05] },
  cctvSign: { u: [2.2, 2.95], h: [1.25, 1.95] },
  signBox: { u: [4.84, 5.2], h: [.18, 4.3], out: .3 },
};

export function aiSecurityLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = aiSecurity.fiveFootWay, grey = '#5f6468', dark = '#53585c', timber = '#8a5a3f', mid = (a, b) => (a + b) / 2;

  // Upper storey: pilasters with carved panels, slim columns with tile strips, arched openings.
  for (const [l, r] of [...E.pilasters, ...E.columns]) {
    add('pilaster', mid(l, r), mid(E.floorBand[1], E.cornice[0]), .1, r - l, E.cornice[0] - E.floorBand[1], .2, grey);
    add('capital', mid(l, r), mid(...E.capitals), .16, r - l + .08, E.capitals[1] - E.capitals[0], .26, dark);
  }
  for (const [l, r] of E.reliefs) add('carved panel', mid(l, r), mid(...E.reliefH), .21, r - l, E.reliefH[1] - E.reliefH[0], .02, '#686e72');
  for (const u of E.tileStrips.u) {
    add('tile strip', u + E.tileStrips.w / 2, mid(...E.tileStrips.h), .21, E.tileStrips.w, E.tileStrips.h[1] - E.tileStrips.h[0], .02, '#ece6d2');
    for (let y = E.tileStrips.h[0] + .1; y < E.tileStrips.h[1]; y += .17) add('tile dot', u + E.tileStrips.w / 2, y, .225, .1, .1, .01, '#c87d82');
  }
  for (const [l, r] of [...E.windows, E.door]) {
    const full = l === E.door[0], bottom = full ? E.doorSill : E.shutters[0];
    add('opening reveal', mid(l, r), mid(bottom, E.archTop), -.02, r - l, E.archTop - bottom, .04, '#2e3134');
    for (const k of [0, 1]) {
      const a = l + .04 + (r - l - .08) * k / 2, b = a + (r - l - .08) / 2;
      add('timber shutter', mid(a, b), mid(bottom, E.shutters[1]), .01, b - a - .02, E.shutters[1] - bottom, .03, timber);
      for (let y = bottom + .12; y < E.shutters[1] - .1; y += .09) if (full ? y > 4.9 : true) add('shutter louvre', mid(a, b), y, .03, b - a - .1, .03, .02, '#6f4630');
    }
    add('fretwork fanlight', mid(l, r), mid(...E.fanlight), .0, r - l - .06, E.fanlight[1] - E.fanlight[0], .02, '#3f4346');
    add('arch head', mid(l, r), E.archTop - .06, .08, r - l + .1, .14, .14, dark);
    if (!full) {
      add('tile panel', mid(l, r), mid(...E.tilePanels), .06, r - l, E.tilePanels[1] - E.tilePanels[0], .02, '#ece6d2');
      for (let u = l + .1; u < r - .05; u += .16) add('tile flower', u, mid(...E.tilePanels), .075, .1, .1, .01, '#7fb3a4');
      add('sill', mid(l, r), E.tilePanels[0] - .04, .1, r - l + .1, .08, .2, dark);
    }
  }
  add('upper wall', width / 2, mid(E.floorBand[1], E.cornice[0]), -.03, width, E.cornice[0] - E.floorBand[1], .04, grey);
  // Modillion cornice and the fretwork eave board.
  add('cornice', width / 2, mid(...E.cornice), .2, width, E.cornice[1] - E.cornice[0], .4, dark);
  for (let u = .15; u < width; u += .3) add('modillion', u, E.cornice[0] - .06, .18, .1, .12, .3, '#4b5054');
  add('eave board', width / 2, mid(...E.frieze), .47, width, E.frieze[1] - E.frieze[0], .04, '#a8714f');
  for (let u = .12; u < width; u += .24) add('eave fret', u, mid(...E.frieze), .495, .12, .3, .01, '#7c4f36');

  // Floor band, fascia, the white canopy band with scroll brackets, and the five-foot way.
  add('floor band', width / 2, mid(...E.floorBand), .1, width, E.floorBand[1] - E.floorBand[0], .2, dark);
  add('fascia', width / 2, mid(...E.fascia), .0, width, E.fascia[1] - E.fascia[0], .1, grey);
  const C = E.canopy;
  add('canopy band', mid(...C.u), mid(...C.h), .08, C.u[1] - C.u[0], C.h[1] - C.h[0], .16, '#f2f0ea');
  for (const u of C.u) add('scroll bracket', u + (u < width / 2 ? .1 : -.1), C.h[0] - C.scroll / 2, .08, .2, C.scroll, .14, '#f2f0ea');
  for (const [l, r] of E.piers) add('pier', mid(l, r), E.ceiling / 2, -.15, r - l, E.ceiling, .3, grey);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#a27d6b');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#e9e6de');
  add('back wall', width / 2, E.ceiling / 2, -D, width - .04, E.ceiling, .06, '#ece7dc');
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, grey);
  const back = -D + .04, el = (name, s, colour, glow = 0, out = back) => add(name, mid(...s.u), mid(...s.h), out, s.u[1] - s.u[0], s.h[1] - s.h[0], .03, colour, glow);
  el('louvred window', E.louvreWindow, '#7c5a3d');
  el('timber door', E.timberDoor, '#6b3f2a');
  el('glass door', E.glassDoor, '#27302f');
  el('display window', E.display, '#3b4644');
  add('display shelf', mid(...E.display.u), E.display.h[0] - .3, back + .25, E.display.u[1] - E.display.u[0], .06, .4, '#d9d4c8');
  // The tall freestanding white signbox at the south end, blank-faced.
  const S = E.signBox;
  add('freestanding signbox', mid(...S.u), mid(...S.h), S.out, S.u[1] - S.u[0], S.h[1] - S.h[0], .22, '#ebe7da');
  return {
    boxes,
    board: { left: E.board.u[0], right: E.board.u[1], bottom: E.board.h[0], top: E.board.h[1], out: .02 },
    cctv: { left: E.cctvSign.u[0], right: E.cctvSign.u[1], bottom: E.cctvSign.h[0], top: E.cctvSign.h[1], out: back + .035 },
  };
}

export function aiSecurityReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'aisecurityready', p: point(width / 2, 6.5), target: point(width / 2, 0), pitch: 22 },
    { id: 'aisecurityready-shop', p: point(width / 2 + .6, 3.4), target: point(width / 2, -1.6), pitch: 4 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
