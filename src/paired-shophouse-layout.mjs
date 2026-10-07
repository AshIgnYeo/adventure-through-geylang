// The matching two-storey elevations of Nos. 287 and 289 Geylang Road, measured
// from June 2024 panoramas. Each unit adds its own five-foot way contents and signs.
export const pairedShophouse = { height: 7.78, ridgeHeight: 12.2, ridgeDepth: .54, eavesOverhang: .45, frontEdge: 0, fiveFootWay: 2.0 };

// piers: [{ u, w, face, side }] give each pier's centre, width, front colour and
// the colour of its inner side faces. downpipe adds the pipe on the east party line.
export function pairedShophouseLayout(width, { piers, downpipe = false }) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0, roll = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow, roll });
  const D = pairedShophouse.fiveFootWay;
  const white = '#f1efe8', shade = '#dcd9cf', red = '#b3343a', green = '#3d7a54';

  // Five-foot way: tiled floor, white back wall and ceiling, closed at both ends
  // because the five-foot ways beyond each modelled frontage are not continuous here.
  add('five-foot way tiles', width / 2, .17, -D / 2, width - .08, .08, D - .04, '#a5604c');
  add('back wall', width / 2, 1.87, -D, width - .06, 3.50, .08, '#ece9df');
  add('five-foot way ceiling', width / 2, 3.67, -D / 2, width - .04, .10, D, '#e9e6dc');
  add('ceiling tube light', 2.9, 3.59, -1.25, 1.2, .04, .07, '#f5f7ec', 1.2);
  for (const u of [.03, width - .03]) add('five-foot way return', u, 1.87, -(D + .55) / 2, .03, 3.5, D - .55, white);
  add('front beam', width / 2, 3.455, -.15, width, .33, .30, white);

  // Piers, with consoles hanging under the beam.
  for (const { u, w, face = white, side = white } of piers) {
    add('pier', u, 1.71, -.275, w, 3.16, .55, side);
    add('pier face', u, 1.71, .005, w - .01, 3.16, .01, face);
    add('pier plinth', u, .30, -.265, w, .34, .57, shade);
    add('pier capital band', u, 3.20, -.25, w, .10, .60, white);
    add('console block', u, 3.13, .06, .26, .22, .12, white);
    add('console scroll', u, 2.91, .045, .17, .24, .09, white);
    add('console drop', u, 2.74, .03, .09, .12, .06, shade);
  }

  // Fascia bed mould and the projecting cornice above the signboard.
  add('fascia bed mould', width / 2, 3.91, .08, width, .08, .16, white);
  add('lower cornice', width / 2, 4.04, .12, width, .18, .24, white);
  add('lower cornice shadow', width / 2, 3.952, .12, width - .02, .012, .23, shade);
  add('lower cornice fillet', width / 2, 4.155, .07, width, .05, .14, white);

  // Upper storey: three equal openings between Corinthian pilasters.
  const windows = [1.065, 2.565, 4.065].map(c => ({ u: c * width / 5.13, w: 1.03 }));
  const sill = 5.10, transom = 6.27, springing = 6.30, apex = 6.71;
  add('sill course', width / 2, 5.00, .07, width - .04, .10, .14, white);
  add('sill course moulding', width / 2, 4.92, .045, width - .06, .05, .09, shade);
  const pilasters = [[.27, .40], [1.815, .33], [3.315, .33], [4.86, .40]].map(([u, w]) => ({ u: u * width / 5.13, w }));
  for (const { u, w } of pilasters) {
    add('pilaster shaft', u, 5.60, .05, w, 1.10, .10, white);
    add('pilaster face', u, 5.60, .105, w - .10, 1.02, .01, '#f6f4ef');
    for (const side of [-1, 1]) add('pilaster edge shadow', u + side * (w / 2 - .05), 5.60, .101, .012, 1.02, .01, '#c9c5ba');
    add('pilaster necking', u, 6.17, .06, w + .02, .04, .12, shade);
    add('capital bell', u, 6.29, .07, w - .02, .20, .12, '#d3cfc4');
    for (const side of [-1, 1]) {
      add('capital acanthus', u + side * w * .22, 6.25, .135, w * .30, .13, .03, '#f7f5ef', 0, side * 25);
      add('capital volute', u + side * (w / 2 - .02), 6.37, .12, .08, .08, .09, '#f7f5ef', 0, 45);
    }
    add('capital central leaf', u, 6.26, .135, .07, .12, .03, '#f7f5ef');
    add('capital abacus', u, 6.43, .08, w + .08, .06, .16, white);
  }
  const casements = [];
  for (const { u, w } of windows) {
    // Red frame around the opening; casements sit just behind it.
    for (const side of [-1, 1]) add('red window jamb', u + side * (w / 2 + .03), (sill + springing) / 2, .05, .06, springing - sill, .10, red);
    add('red window bottom rail', u, sill + .02, .05, w + .12, .05, .10, red);
    add('red transom', u, transom, .05, w + .12, .06, .10, red);
    for (const [i, du] of [-w / 4, w / 4].entries()) {
      const lw = w / 2 - .01;
      casements.push({ u: u + du, w: lw });
      for (const s of [-1, 1]) add('leaf stile', u + du + s * (lw / 2 - .025), (sill + transom) / 2, .025, .05, transom - sill - .06, .04, green);
      for (const y of [sill + .06, 5.645, transom - .055]) add('leaf rail', u + du, y, .025, lw, y === 5.645 ? .05 : .05, .04, green);
      for (let col = 0; col < 2; col++) for (let row = 0; row < 2; row++) {
        add('glass pane', u + du + (col - .5) * (lw - .05) / 2, 5.67 + .275 * (row + .5) + .0, .012, (lw - .05) / 2 - .03, .245, .01, row ? '#83909a' : '#76848d');
      }
      add('leaf muntin', u + du, 5.95, .03, .025, .55, .02, green);
      add('leaf glazing bar', u + du, 5.945, .03, lw - .05, .025, .02, green);
      add('louvre field', u + du, 5.375, .012, lw - .06, .49, .01, '#c9cdc6');
      for (let k = 0; k < 9; k++) add('louvre slat', u + du, 5.16 + k * .053, .03, lw - .07, .03, .025, '#e6e8e2');
      if (i === 0) add('meeting stile', u, (sill + transom) / 2, .03, .03, transom - sill - .06, .045, green);
    }
  }
  // Segmental arches. Bands run outward from the fanlight edge: [inner, outer, colour, out].
  const arches = windows.map(({ u, w }) => ({ u, span: w, springing, apex,
    bands: [[0, .06, red, .045], [.06, .09, '#c9c5ba', .06], [.09, .22, '#f8f7f3', .09], [.22, .245, '#bdb8ac', .08]] }));

  // Upper frieze under the eaves, cornice mouldings and gutter.
  add('upper cornice', width / 2, 7.45, .06, width, .10, .12, white);
  add('upper cornice top', width / 2, 7.53, .10, width, .06, .20, white);
  add('eaves soffit', width / 2, 7.64, .24, width, .04, .48, '#4f5a50');
  add('green eaves fascia', width / 2, 7.71, .46, width, .20, .04, '#2f7a5c');
  add('green gutter', width / 2, 7.82, .42, width, .10, .12, '#2b6f55');
  if (downpipe) {
    add('downpipe', width - .045, 3.68, .06, .07, 7.10, .07, '#3a8a6a');
    add('downpipe shoe', width - .045, .20, .10, .08, .14, .14, '#3a8a6a');
    for (const y of [1.5, 3.2, 5.0, 6.6]) add('downpipe bracket', width - .045, y, .025, .09, .04, .05, '#2f735a');
  }
  return {
    boxes, add, windows, casements, arches, pilasters,
    downpipeOffset: downpipe ? { u: width - .045, from: [.06, 7.20], to: [.40, 7.74] } : null,
    cartouches: windows.map(({ u }) => ({ u, w: .86, bottom: 4.26, top: 4.72, out: .02 })),
    frieze: { bottom: 6.98, top: 7.40, out: .012 },
  };
}
