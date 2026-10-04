// June 2024 exterior of No. 112 only. Vertical dimensions are estimates.
export const amrise = {
  id: 'amrise-hotel', kind: 'amrise', buildingIds: ['682928750'],
  name: 'Amrise Hotel (June 2024 exterior)', address: '112 Sims Avenue',
  height: 10.45, frontEdge: 0, reviewRoad: 'Sims Avenue',
  evidence: 'The operator lists Amrise Hotel at 112 Sims Avenue. Named OSM node 4302905890 lies inside the matching No. 112 three-level footprint. June 2024 Street View corroborates the recessed entrance beside a brown door, paired and narrow upper windows, pale pink walls, stepped parapet and vertical Amrise blade sign. Dimensions and fine detail are estimated. Only No. 112 is assigned; adjacent units and the larger horizontal hotel sign remain excluded. No private interior is reconstructed.',
  sources: [
    'https://amrisehotel.com/',
    'https://mail.amrisehotel.com/',
    'https://www.openstreetmap.org/node/4302905890',
    'https://www.openstreetmap.org/way/682928750',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=YsOoBymJj446X2wJOG9R7w&heading=160&pitch=15&fov=80',
  ],
};

/** Local façade coordinates: u follows the street edge, out points to the road. */
export function amriseLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour) =>
    boxes.push({ name, u, y, out, w, h, depth, colour });
  const pink = '#e3bdc3', trim = '#c19b92', cream = '#e9dbce', green = '#729389';
  // The sheltered entrance is inside the retained footprint. Opaque back wall
  // closes it; this shallow recess is not an invented hotel lobby.
  add('entrance floor', width / 2, .16, -.69, width - .08, .08, 1.36, '#aa8878');
  add('entrance back wall', width / 2, 1.75, -1.35, width - .08, 3.1, .08, pink);
  add('entrance soffit', width / 2, 3.3, -.64, width - .04, .16, 1.28, cream);
  for (const u of [.22, width - .22]) {
    add('entrance pier', u, 1.75, -.18, .34, 3.18, .34, pink);
    add('pier terracotta base', u, .67, -.20, .36, 1.02, .36, '#b37667');
    add('pier capital', u, 3.16, -.18, .43, .19, .36, cream);
  }
  // Left timber door and right green-framed glazing are visibly distinct.
  add('timber door surround', width * .25, 1.62, -1.27, width * .19, 2.77, .06, cream);
  add('opaque timber door', width * .25, 1.62, -1.22, width * .16, 2.65, .04, '#634c40');
  for (const u of [.208, .292]) {
    add('door raised panel', width * u, 1.62, -1.19, width * .065, 1.92, .025, '#73594a');
  }
  add('entrance glass', width * .62, 1.67, -1.27, width * .43, 2.72, .06, '#324947');
  for (const u of [.405, .55, .69, .835]) add('entrance vertical frame', width * u, 1.67, -1.22, .065, 2.74, .05, green);
  for (const y of [.3, 2.56, 3.01]) add('entrance rail', width * .62, y, -1.22, width * .43, .075, .05, green);
  for (const u of [.61, .635]) add('entrance pull handle', width * u, 1.39, -1.16, .032, .4, .04, '#b8b6aa');
  add('entrance lintel', width / 2, 3.43, -.08, width, .22, .32, '#c6b2a6');
  add('lintel lower moulding', width / 2, 3.29, -.02, width - .04, .06, .35, cream);

  for (const y of [5.12, 8.16]) {
    add('paired window recess surround', width / 2, y + .13, .04, width * .39, 2.03, .09, '#c6aea1');
    for (const [fraction, span] of [[.135, .068], [.403, .145], [.597, .145], [.865, .068]]) {
      const u = width * fraction, w = width * span, h = 1.57;
      add('window surround', u, y, .105, w + .14, h + .14, .08, cream);
      add('opaque green grey glazing', u, y, .155, w, h, .035, '#526d68');
      const columns = span > .1 ? 3 : 1;
      for (let i = 0; i <= columns; i++) add('window upright', u - w / 2 + w * i / columns, y, .18, .027, h, .025, '#b4c6b8');
      for (let i = 0; i <= 4; i++) add('window horizontal bar', u, y - h / 2 + h * i / 4, .18, w, .027, .025, '#b4c6b8');
      add('window sill', u, y - .84, .17, w + .24, .07, .33, cream);
    }
    for (const [fraction, span] of [[.135, .13], [.5, .43], [.865, .13]]) {
      add('projecting window hood', width * fraction, y + 1.05, .25, width * span, .12, .65, cream);
      add('hood terracotta lip', width * fraction, y + 1.125, .32, width * span, .045, .69, trim);
    }
  }
  for (const u of [.04 * width, .96 * width]) add('edge pilaster', u, 7.03, .025, .15, 6.14, .09, '#dac0ba');
  add('roofline moulding', width / 2, 10.36, .08, width, .12, .26, cream);
  add('parapet shoulder', width / 2, 10.58, -.025, width * .59, .27, .22, pink);
  add('stepped central parapet', width / 2, 10.88, -.025, width * .35, .72, .22, pink);
  add('parapet top cap', width / 2, 11.25, .015, width * .39, .10, .30, trim);
  for (const u of [.2675 * width, .7325 * width]) add('parapet shoulder cap', u, 10.745, .015, width * .125, .075, .30, trim);
  return {
    boxes,
    blade: { u: .23, y: 8.04, out: .56, height: 2.75, depth: .83, thickness: .07 },
  };
}

export function amriseObliqueReview(f) {
  const pt = (u, out) => [f.a[0] + f.dx * u + f.nx * out, f.a[1] + f.dz * u + f.nz * out];
  const p = pt(f.width / 2 + 4, 12), target = pt(f.width / 2, 0);
  return { p, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI };
}
