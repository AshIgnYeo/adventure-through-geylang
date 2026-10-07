// April 2024 street exterior of No. 3 Lorong 15. Only the addressed source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const lamClan = {
  id: 'lam-clan', buildingIds: ['1223539233'], kind: 'lam-clan',
  name: 'Lam Clan Association (April 2024 exterior)', address: '3 Lorong 15 Geylang',
  height: 7.3, parapet: 8.83, ridgeHeight: 9.4, ridgeDepth: .5, eavesOverhang: 0, frontEdge: 0, recess: .6, reviewRoad: 'Lorong 15 Geylang',
  evidence: 'The SFCCA member directory lists the Lam Clan Association at No 3 Lorong 15 Geylang, Singapore 388597. Retained OSM way 1223539233 carries No. 3 Lorong 15 Geylang. December 2017 Street View shows LAM CLAN ASSOCIATION on this frontage, between No. 1 and the white pedimented No. 5. April 2024 Street View shows it repainted pale blue, with 藍氏総會 in large raised characters on the parapet, a framed band of eight casements, a black 藍氏総會 board over glazed doors, and a paved forecourt. Heights were measured from a square-on April 2024 frame scaled by the 5.80 m frontage. The roof behind the parapet is red tile on satellite imagery; its form is estimated. Three smaller characters below the windows, read tentatively as 如是樓, are omitted. Festive lanterns and couplets, furniture and the interior are not reconstructed.',
  sources: [
    'https://sfcca.sg/en/our-members/',
    'https://www.openstreetmap.org/way/1223539233',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=AHXvHnyePVPqdoUy9lRZ7w&heading=270&pitch=12&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=j0nZRLW-MxVya_i7dxzbqQ&heading=261.5&pitch=14&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=j0nZRLW-MxVya_i7dxzbqQ&heading=277&pitch=3&fov=22',
  ],
};

// u runs south (No. 1) to north (No. 5); out runs east towards Lorong 15.
export const lamClanFrame = poly => frontageFrame(poly, lamClan.frontEdge);

export function lamClanLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour) => boxes.push({ name, u, y, out, w, h, depth, colour });
  const blue = '#a6d4ea', edge = '#bfe0ef', frame = '#e4eff1', R = lamClan.recess;

  // Flat pilaster strips at both party lines and a thin coping along the parapet.
  for (const u of [.07, width - .07]) add('edge pilaster', u, (lamClan.parapet + .05) / 2, .025, .14, lamClan.parapet + .05, .05, edge);
  add('parapet coping', width / 2, lamClan.parapet + .04, .03, width, .08, .12, edge);

  // Upper storey: a framed band of eight casements over a sill ledge.
  const band = { left: 1.10, right: 4.88, bottom: 4.60, top: 6.34 };
  add('window band frame', (band.left + band.right) / 2, (band.bottom + band.top) / 2, .05, band.right - band.left, band.top - band.bottom, .06, frame);
  add('window band reveal', (band.left + band.right) / 2, (band.bottom + band.top) / 2, .085, band.right - band.left - .16, band.top - band.bottom - .16, .01, '#4f5f66');
  add('window sill', (band.left + band.right) / 2, band.bottom - .03, .1, band.right - band.left + .14, .07, .16, frame);
  const panes = 8, pw = (band.right - band.left - .16) / panes;
  for (let i = 0; i < panes; i++) {
    const u = band.left + .08 + pw * (i + .5);
    add('casement frame', u, (band.bottom + band.top) / 2, .095, pw - .02, band.top - band.bottom - .18, .015, '#f4f6f6');
    add('casement glass', u, (band.bottom + band.top) / 2, .103, pw - .1, band.top - band.bottom - .28, .005, i < 3 ? '#5d6f77' : '#6b7c83');
    // The five northern casements carry a white square grille.
    if (i >= 3) {
      for (const f of [.33, .67]) add('grille bar', u - (pw - .1) / 2 + (pw - .1) * f, (band.bottom + band.top) / 2, .108, .018, band.top - band.bottom - .28, .006, '#f4f6f6');
      for (let k = 1; k < 5; k++) add('grille rail', u, band.bottom + .14 + (band.top - band.bottom - .28) * k / 5, .108, pw - .1, .018, .006, '#f4f6f6');
    }
  }

  // Ground floor: a shallow recess under the lintel, closed by an opaque back wall.
  add('ground lintel', width / 2, 3.12, .0, width - .28, .14, .06, blue);
  add('recess soffit', width / 2, 3.05, -R / 2, width - .28, .06, R, '#e6eef0');
  add('recess floor', width / 2, .09, -R / 2, width - .28, .06, R, '#9aa3a4');
  add('recess back wall', width / 2, 1.55, -R, width - .28, 3.0, .06, '#dde7e9');
  add('board backing', 1.80, 2.68, -R + .05, 2.95, .70, .04, '#141414');
  add('glass door', 2.25, 1.15, -R + .05, 1.40, 2.10, .03, '#55705f');
  for (const u of [1.55, 2.25, 2.95]) add('door frame', u, 1.15, -R + .075, .04, 2.12, .02, '#b8bfbe');
  add('door head', 2.25, 2.21, -R + .075, 1.44, .04, .02, '#b8bfbe');
  add('side glazing', .85, 1.15, -R + .05, 1.30, 2.10, .03, '#5d6f6c');
  add('dark glazing', 3.65, 1.25, -R + .05, 1.30, 2.30, .03, '#2f3a3b');
  for (const y of [1.85, 2.55]) {
    add('condenser casing', 4.45, y, -R + .2, .80, .56, .28, '#e9e9e4');
    add('condenser grille', 4.40, y, -R + .345, .52, .46, .01, '#a9aba7');
  }
  add('condenser bracket', 4.45, 2.25, -R + .2, .80, .04, .30, '#4a4d4c');
  return {
    boxes, band,
    lettering: { left: .78, right: 5.02, bottom: 7.15, top: 8.60, out: .035 },
    board: { left: .36, right: 3.24, bottom: 2.36, top: 3.00, out: -R + .075 },
    // Paved forecourt between the frontage and Lorong 15, inside the study bounds.
    forecourt: { left: 0, right: width, out: 6.4 },
  };
}

export function lamClanReviews(frame) {
  const { point, width } = frame;
  // The study's east boundary leaves under 8 m in front of this frontage, so the
  // front starts look up steeply and the oblique start steps along the forecourts.
  return [
    { id: 'lam-clan', p: point(width / 2, 6.8), target: point(width / 2, 0), pitch: 28 },
    { id: 'lam-clan-ground', p: point(width / 2 + .3, 5.6), target: point(width / 2, -.6), pitch: 6 },
    { id: 'lam-clan-oblique', p: point(width / 2 - 7.5, 6.6), target: point(width / 2, 0), pitch: 22 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
