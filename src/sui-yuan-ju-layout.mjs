// April 2024 street exterior of Nos. 2 and 4 Lorong 13. Only these two source footprints are assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const suiYuanJu = {
  id: 'sui-yuan-ju', buildingIds: ['1223454593', '1223454592'], kind: 'sui-yuan-ju',
  name: 'Sui Yuan Ju Buddhist Society (April 2024 exterior)', address: '4 Lorong 13 Geylang (frontage across Nos. 2–4)',
  height: 7.87, ridgeHeight: 10.6, ridgeDepth: .4, eavesOverhang: .6, frontEdge: 2, fiveFootWay: 1.8, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'Google Maps lists 随缘居佛社（精舍）Sui Yuan Ju Buddhist Society at 4 Lor 13 Geylang, Singapore 388642, with current opening hours. The addressed source ways for Nos. 4 and 2 Lorong 13 stand side by side at the Geylang Road end. April 2024 Street View shows the yellow 随缘居佛社 (精舍) Sui Yuan Ju Buddhist Society signboard, giving No4, Lor 13 Geylang Road, over No. 4, and a continuous red awning running on across No. 2, where a dark-tiled Chinese canopy roof shelters timber doors with red couplets. The two ornate two-storey upper storeys have arched louvred windows, green and pink capitals, tile panels and a timber fretwork eaves fascia. The two-unit visual assignment is provisional: the name and address belong to No. 4, and No. 2 is not separately listed. Heights were measured from two calibrated April 2024 panoramas whose triangulated edges match the 5.81 m source split; the camera stood about 1.35 m above the ground. Stone lions, the incense urn, altar furnishings, couplet wording and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Sui+Yuan+Ju+Buddhist+Society+4+Lorong+13+Geylang',
    'https://www.openstreetmap.org/way/1223454593',
    'https://www.openstreetmap.org/way/1223454592',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=FXTw5jMQr6bKoFFGgqyVkw&heading=72.4&pitch=22&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=f-IHSXdP88-BA3LwDO6R0Q&heading=72.4&pitch=22&fov=120',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=FXTw5jMQr6bKoFFGgqyVkw&heading=60&pitch=38&fov=60',
  ],
};

// u runs north (No. 6A side) to south (Geylang Road side); out runs west to Lorong 13.
export const suiYuanJuFrame = poly => frontageFrame(poly, suiYuanJu.frontEdge);

// Measured elevation, metres above the five-foot way.
export const levels = {
  beam: [3.25, 3.65], tiles: [3.65, 4.5], sill: 4.62, springing: 6.18, apex: 6.51,
  frieze: [6.62, 7.05], fascia: [7.05, 7.55], eaves: 7.87,
};

// unit 0 is No. 4 (signboard), unit 1 is No. 2 (tiled canopy porch).
export function suiYuanJuLayout(width, unit) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const L = levels, D = suiYuanJu.fiveFootWay;
  const pink = unit ? '#e2a199' : '#d98f86', cream = '#efe4cf', edge = '#cf7c78', green = '#4f9a6a', bloom = '#e58fa0';
  const k = width / 5.81;

  // Five-foot way, back wall and the ground-floor piers.
  add('five-foot way floor', width / 2, .1, -D / 2, width - .1, .1, D - .04, unit ? '#b03a35' : '#9c6b5c');
  add('back wall', width / 2, 1.8, -D, width - .1, 3.5, .08, '#e9dccb');
  add('five-foot way ceiling', width / 2, 3.22, -D / 2, width - .08, .08, D, '#eadfcd');
  for (const u of [.04, width - .04]) add('five-foot way return', u, 1.6, -(D + .5) / 2, .04, 3.2, D - .5, cream);
  // The central pier is shared: each unit carries its half at the party line.
  const piers = unit ? [[.12, .22], [width - .21, .4]] : [[.21, .4], [width - .12, .22]];
  for (const [u, w] of piers) {
    add('pier', u, 1.63, -.25, w, 3.25, .5, cream);
    for (const s of [-1, 1]) add('pier pink edge', u + s * (w / 2 - .04), 1.63, .005, .06, 3.1, .02, edge);
    add('pier tile inset', u, 1.8, .01, Math.max(.08, w - .2), 2.0, .01, '#7fb6a0');
    add('pier plinth', u, .25, -.24, w, .4, .52, '#e5cfbd');
  }
  add('ground beam', width / 2, (L.beam[0] + L.beam[1]) / 2, -.1, width, L.beam[1] - L.beam[0], .26, pink);
  add('beam moulding', width / 2, L.beam[1] - .03, .05, width, .06, .14, cream);

  // Upper storey: three arched windows between pilasters, tile panels below.
  const windows = [1.22, 2.905, 4.59].map(c => ({ u: c * k, w: 1.12 * k }));
  // The party pilaster is shared in the same way; the outer ones are wider.
  const ends = unit ? [[.15, .30], [width - .22, .44]] : [[.22, .44], [width - .15, .30]];
  const pilasters = [ends[0], [2.06 * k, .36], [3.75 * k, .36], ends[1]].map(([u, w]) => ({ u, w }));
  // Mouldings that overhang a pilaster are trimmed where it meets a party line.
  const fit = (u, w) => Math.min(w, 2 * Math.min(u, width - u));
  add('upper wall field', width / 2, (L.tiles[1] + L.frieze[0]) / 2, .005, width, L.frieze[0] - L.tiles[1], .01, pink);
  for (const { u, w } of pilasters) {
    const top = L.frieze[1];
    add('pilaster', u, (L.tiles[0] + top) / 2, .06, w, top - L.tiles[0], .12, cream);
    for (const s of [-1, 1]) add('pilaster pink fillet', u + s * (w / 2 - .04), (L.tiles[0] + top) / 2, .125, .05, top - L.tiles[0] - .1, .01, edge);
    add('pilaster tile strip', u, 5.55, .125, w * .4, 1.4, .01, '#83b9a3');
    for (let y = 4.95; y < 6.2; y += .14) add('pilaster tile flower', u, y, .132, .07, .07, .01, bloom, 0, 45);
    add('pilaster base block', u, L.sill + .1, .1, fit(u, w + .06), .22, .2, edge);
    // Capital: green acanthus leaves with a pink flower, under a cream abacus.
    add('capital bell', u, 6.8, .1, w - .04, .32, .16, '#5ea877');
    for (const s of [-1, 1]) add('capital leaf', u + s * w * .25, 6.78, .19, w * .38, .16, .03, green, 0, s * 30);
    add('capital flower', u, 6.84, .2, .12, .12, .03, bloom, 0, 45);
    add('capital abacus', u, 6.99, .1, fit(u, w + .08), .06, .2, cream);
  }
  const casements = [];
  for (const { u, w } of windows) {
    const h = L.springing - L.sill;
    add('window reveal', u, L.sill + h / 2, -.02, w, h, .04, '#2c2522');
    for (const s of [-1, 1]) {
      const lu = u + s * w / 4, lw = w / 2 - .03;
      casements.push({ u: lu, w: lw });
      add('shutter leaf', lu, L.sill + h / 2, .02, lw, h - .06, .04, unit ? '#7a6658' : '#8a5a48');
      if (unit === 0) {
        // No. 4: green-glazed upper casements over louvred lower panels.
        for (const [row, y] of [[0, 5.7], [1, 6.0]]) for (const c of [-1, 1]) add('green pane', lu + c * lw / 4.4, y, .045, lw / 2.4, .24, .01, row ? '#86b89c' : '#7aae92');
        for (let i = 0; i < 8; i++) add('louvre', lu, 4.78 + i * .09, .046, lw - .1, .035, .015, '#9b6b57');
      } else {
        for (let i = 0; i < 13; i++) add('louvre', lu, 4.78 + i * .1, .046, lw - .1, .04, .015, '#8c786a');
        add('shutter mid rail', lu, 5.45, .046, lw - .06, .06, .015, '#6c584b');
      }
    }
    add('window meeting stile', u, L.sill + h / 2, .05, .04, h - .06, .02, '#5c4438');
    add('window sill ledge', u, L.sill - .02, .1, w + .14, .07, .2, pink);
  }
  const arches = windows.map(({ u, w }) => ({ u, span: w, springing: L.springing, apex: L.apex,
    bands: [[0, .07, edge, .03], [.07, .16, '#f0d9c7', .05], [.16, .19, edge, .05]] }));

  // Eaves: frieze band, timber fretwork fascia and the roof edge.
  add('eaves soffit', width / 2, L.fascia[1] + .03, .3, width, .05, .6, '#7b3a3a');
  add('fascia backing', width / 2, (L.fascia[0] + L.fascia[1]) / 2, .58, width, L.fascia[1] - L.fascia[0], .03, '#a7464d');
  add('roof edge board', width / 2, L.eaves - .14, .62, width, .2, .06, '#8e3f3f');
  add('gutter', width / 2, L.eaves - .04, .6, width, .08, .1, '#7c3838');

  // Ground-floor fittings: the No. 4 signboard and awning, or the No. 2 porch.
  // No. 4's awning hangs from the wall under its signboard; No. 2's from the porch eave.
  const awning = unit ? { left: .1, right: width - .1, back: .9, front: 2.6, top: 2.6, bottom: 2.15 }
    : { left: .1, right: width - .1, back: .05, front: 2.3, top: 2.65, bottom: 2.1 };
  if (unit === 0) {
    add('altar table', 1.6, .45, -.9, 1.6, .8, .7, '#a83a3a');
    add('altar cloth', 1.6, .5, -.54, 1.6, .7, .02, '#c94a4a');
    add('side table', 4.2, .45, -.9, 1.2, .8, .7, '#a83a3a');
    add('back wall doorway', 2.9, 1.25, -D + .05, 1.1, 2.4, .03, '#3a2a25');
    for (const u of [2.2, 3.6]) add('red couplet', u, 1.5, -D + .06, .26, 1.8, .01, '#c8302d');
  } else {
    add('timber door frame', 2.55, 1.4, -D + .05, 3.4, 2.8, .04, '#9a6a45');
    add('dark doorway', 2.55, 1.25, -D + .08, 1.0, 2.5, .02, '#211816');
    for (const s of [-1, 1]) {
      add('grilled door leaf', 2.55 + s * 1.05, 1.25, -D + .08, 1.0, 2.5, .02, '#b17a50');
      for (let i = 0; i < 7; i++) add('door grille bar', 2.55 + s * 1.05 - .4 + i * .133, 1.95, -D + .095, .025, 1.0, .01, '#5a3a28');
      add('red couplet', 2.55 + s * 1.85, 1.6, -D + .07, .3, 2.0, .01, '#c8302d');
    }
  }
  return {
    boxes, windows, casements, pilasters, arches, awning,
    tilePanels: windows.map(({ u, w }) => ({ u, w: w + .1, bottom: L.tiles[0] + .06, top: L.tiles[1] - .04, out: .02 })),
    frieze: { bottom: L.frieze[0], top: L.frieze[1], out: .015 },
    fascia: { bottom: L.fascia[0] - .12, top: L.fascia[1], out: .6 },
    sign: unit ? null : { left: .3, right: width - .25, bottom: 2.7, top: 3.4, out: .2 },
    porch: unit ? { left: .3, right: width - .1, back: -.1, front: 1.0, eave: 2.7, ridge: 3.6 } : null,
  };
}

export function suiYuanJuReviews(frame) {
  // Unit 0 (No. 4) frame: the pair's centre is its south party line.
  const { point, width } = frame;
  return [
    { id: 'sui-yuan-ju', p: point(width, 8.8), target: point(width, 0), pitch: 22 },
    { id: 'sui-yuan-ju-upper', p: point(width - 1.5, 6.6), target: point(width, 0), pitch: 34 },
    { id: 'sui-yuan-ju-porch', p: point(width + 3, 4.6), target: point(width + 2.6, -1), pitch: 8 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
