// The conserved two-storey row at Nos. 3–9 Lorong 13 (west side), measured from April 2024
// panoramas at No. 7. Each house supplies its own windows, pilasters and ground floor.
export const row13 = {
  height: 8.74, ridgeHeight: 10.8, ridgeDepth: .45, eavesOverhang: .5, frontEdge: 0, fiveFootWay: 1.5,
  sign: [3.28, 4.13], beamTop: 4.34, floor2: 4.44, tiles: [4.52, 5.11], sill: 5.23,
  windowRange: [5.41, 7.49], capitals: [6.87, 7.29], fretwork: [7.70, 8.27],
};

// windows: [[left, right, bottom, top]]; pilasters: [[left, right]]; tilesUnder and
// reliefUnder index the windows; piers: [[centre, width]].
export function row13Layout(width, { windows, pilasters, tilesUnder, reliefUnder = [], piers, floor = '#c9b996' }) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const E = row13, D = row13.fiveFootWay, white = '#efede6', shade = '#dad7cd', black = '#1c1d1f';

  for (const [l, r, b, t] of windows) {
    const u = (l + r) / 2, w = r - l, h = t - b, mid = (b + t) / 2;
    add('window frame', u, mid, .01, w, h, .04, black);
    add('tinted glazing', u, mid, .035, w - .1, h - .1, .01, '#3f4549');
    add('window mullion', u, mid, .04, .04, h - .1, .02, black);
    add('window transom', u, b + h * .72, .04, w - .1, .04, .02, black);
    add('window head moulding', u, t + .07, .05, w + .16, .1, .1, shade);
    if (b > E.sill) add('sill ledge', u, E.sill, .06, w + .2, .08, .16, shade);
  }
  // Party pilasters are shared with the neighbours, so their capitals stop at the party line.
  for (const [l, r] of pilasters) {
    const u = (l + r) / 2, w = r - l, cl = Math.max(l - .03, 0), cr = Math.min(r + .03, width);
    add('pilaster', u, (E.floor2 + E.capitals[0]) / 2, .04, w, E.capitals[0] - E.floor2, .08, white);
    add('pilaster capital', (cl + cr) / 2, (E.capitals[0] + E.capitals[1]) / 2, .07, cr - cl, E.capitals[1] - E.capitals[0], .14, shade);
    for (const side of [-1, 1]) {
      const vu = u + side * (w / 2 - .02);
      if (vu - .06 >= 0 && vu + .06 <= width) add('capital volute', vu, E.capitals[1] - .08, .1, .08, .08, .1, white, 0, 45);
    }
  }
  const head = Math.max(...windows.map(w => w[3]));
  add('frieze band', width / 2, (head + E.fretwork[0]) / 2 + .04, .03, width, E.fretwork[0] - head, .06, white);
  add('upper floor ledge', width / 2, E.floor2 - .04, .1, width, .1, .2, shade);
  add('cornice', width / 2, E.beamTop - .08, .12, width, .16, .24, white);
  add('eaves soffit', width / 2, E.fretwork[1] + .02, .25, width, .05, .5, '#6b5a50');
  add('roof edge board', width / 2, E.height - .2, .5, width, .2, .05, '#8a6a5a');

  for (const [u, w] of piers) {
    add('pier', u, 1.64, -.3, w, 3.28, .6, white);
    add('pier console', u, 3.1, .02, w, .2, .12, shade);
  }
  add('five-foot way floor', width / 2, .08, -D / 2, width - .1, .08, D, floor);
  add('five-foot way ceiling', width / 2, 3.24, -D / 2, width - .1, .08, D, '#e8e6df');
  add('back wall', width / 2, 1.6, -D, width - .1, 3.2, .06, white);
  return {
    boxes, add, D,
    tilePanels: tilesUnder.map(i => windows[i]).map(([l, r]) => ({ u: (l + r) / 2, w: r - l, bottom: E.tiles[0], top: E.tiles[1], out: .02 })),
    reliefs: reliefUnder.map(i => windows[i]).map(([l, r]) => ({ u: (l + r) / 2, w: r - l, bottom: E.tiles[0], top: E.tiles[1], out: .02 })),
    fretwork: { bottom: E.fretwork[0], top: E.fretwork[1], out: .5 },
  };
}
