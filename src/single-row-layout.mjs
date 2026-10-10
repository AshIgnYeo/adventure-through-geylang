// The single-storey row at Nos. 20-28 Lorong 13 (east side), measured at No. 22 (Plus Mobile): a short
// tiled front slope over a dark, shallow rear roof, with a steel lattice canopy over a tiled walkway.
// u runs along the frontage from frame.a, out towards Lorong 13, heights above the walkway.
export const singleRow = {
  height: 4.31, ridgeHeight: 6.32, ridgeDepth: .1815, eavesOverhang: .45,
  canopy: { depth: 2.0, inner: 3.50, outer: 3.58 },
};

/** A roller shutter on the façade, in one or more leaves, with its hood and guides. */
export function addShutter(add, [l, r, top], leaves = 1, colour = '#c9ccc7') {
  add('roller shutter', (l + r) / 2, top / 2, .02, r - l, top, .04, colour);
  for (let y = .15; y < top - .05; y += .1) add('shutter slat', (l + r) / 2, y, .045, r - l, .015, .01, '#acb1ab');
  add('shutter hood', (l + r) / 2, top + .07, .07, r - l + .08, .14, .14, '#dcded8');
  for (let k = 1; k < leaves; k++) add('shutter meeting rail', l + (r - l) * k / leaves, top / 2, .05, .05, top, .02, '#9fa49e');
  for (const u of [l + .02, r - .02]) add('shutter guide', u, top / 2, .04, .04, top, .05, '#9fa49e');
}

/** The eaves board, walkway and canopy beams every house in the row shares, plus a downpipe if given. */
export function addRowFittings(add, width, { downpipe } = {}) {
  const C = singleRow.canopy;
  if (downpipe !== undefined) add('downpipe', downpipe, C.inner / 2, .07, .08, C.inner, .08, '#eeeeea');
  add('eaves board', width / 2, 4.07, singleRow.eavesOverhang - .02, width, .14, .04, '#5b4a40');
  add('walkway tiles', width / 2, .03, C.depth / 2, width, .06, C.depth, '#b7b8b2');
  add('canopy front beam', width / 2, C.outer - .14, C.depth - .03, width, .2, .05, '#8d9290');
  add('canopy wall plate', width / 2, C.inner - .05, .03, width, .1, .05, '#8d9290');
}

/** Diagonal canopy brackets from the wall up to the front beam, at the given positions. */
export const rowBrackets = us => us.map(u => ({ u, wall: [.04, 2.95], beam: [singleRow.canopy.depth - .06, singleRow.canopy.outer - .2] }));
