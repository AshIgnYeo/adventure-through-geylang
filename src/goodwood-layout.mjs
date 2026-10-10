// April 2024 street exterior of No. 19 Lorong 11, on the owner-approved re-spaced footprint.
import { peranakan, peranakanFrame, peranakanLayout, facingReviews } from './peranakan-layout.mjs';

export const goodwood = {
  id: 'goodwood', buildingIds: ['l11w-19'], kind: 'goodwood',
  name: 'Goodwood Garments Services & Trading (April 2024 exterior)', address: '19 Lorong 11 Geylang',
  ...peranakan, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Goodwood Garments Services & Trading, a textile merchant, at 19 Lor 11 Geylang, Singapore 388711. April 2024 Street View shows its black 良木林 Goodwood board over a grilled door in the five-foot way of the pale grey-green conserved shophouse directly north of Hok Tek Chi (No. 17); an earlier frame shows door number 19. Triangulated party lines put the frontage at about 5.3 m, so it stands on the owner-approved re-spaced No. 19 footprint (open question 1) rather than the 6.41 m source way 1223407886. The upper storey has three arched shuttered windows with fretwork fanlights between tiled pilasters, floral tile panels, a pierced vent panel and an ornate cornice; heights come from an April 2024 frame rectified at the solved façade depth, and the back-wall openings were corrected for the 1.8 m five-foot-way depth. Fine stucco, the parked vehicles and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Goodwood+Garments+Services+Trading+19+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223407886',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=73intX-f7jQoMaTMSJ_4Mg&heading=252&pitch=12&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=H9_pLycpI51HF8H7LV6YxA&heading=240&pitch=10&fov=90',
  ],
};

export const goodwoodFrame = peranakanFrame;
export const colours = { wall: '#c9d8cf', trim: '#e1e8e2', shutter: '#9fcfbf', frame: '#6fae9c' };

// Back-wall openings, corrected for the five-foot-way depth; metres from the No. 17 line.
export const groundFloor = {
  windows: [[.68, 1.65, 1.72, 3.0], [3.55, 4.53, 2.17, 3.0]], door: [2.03, 3.18, 2.72],
  board: [2.03, 3.18, 2.73, 3.11], fretwork: [3.18, 3.25], vent: [2.2, 2.9, 4.31, 4.96],
};

export function goodwoodLayout(width) {
  const base = peranakanLayout(width, colours), { add, back } = base, G = groundFloor, mid = (a, b) => (a + b) / 2;
  const [vl, vr, vb, vt] = G.vent;
  add('pierced vent panel', mid(vl, vr), mid(vb, vt), .045, vr - vl, vt - vb, .02, '#e8ece6');
  for (let u = vl + .1; u < vr; u += .14) for (let y = vb + .1; y < vt; y += .14) add('vent piercing', u, y, .058, .07, .07, .01, '#6b7570');
  for (const [l, r, b, t] of G.windows) {
    add('ground window', mid(l, r), mid(b, t), back, r - l, t - b, .03, '#2f3c3f');
    for (let u = l + .08; u < r; u += .12) add('window bar', u, mid(b, t), back + .03, .02, t - b, .02, '#e8ece6');
    add('ground window frame', mid(l, r), t + .04, back + .02, r - l + .1, .08, .04, '#6fae9c');
  }
  const [dl, dr, dt] = G.door;
  add('doorway', mid(dl, dr), dt / 2, back, dr - dl, dt, .03, '#252b2c');
  for (let u = dl + .06; u < dr; u += .11) add('collapsible gate bar', u, dt / 2, back + .05, .02, dt, .02, '#b9bdb8');
  for (const [l, r] of [[.68, 1.65], [2.03, 3.18], [3.55, 4.53]]) add('fretwork panel', mid(l, r), mid(3.11, 3.24), back + .02, r - l, .13, .02, '#cfd8d2');
  return { ...base, board: { left: G.board[0], right: G.board[1], bottom: G.board[2], top: G.board[3], out: back + .04 } };
}

export const goodwoodReviews = frame => facingReviews(frame, 'goodwood');
