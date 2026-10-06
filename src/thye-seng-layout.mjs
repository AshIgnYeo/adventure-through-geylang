// June 2024 street exterior. Only the retained No. 122 footprint is assigned.
export const thyeSeng = {
  id: 'thye-seng', kind: 'thye-seng', buildingIds: ['682928762'],
  name: 'Thye Seng Hardware Enterprise (June 2024 exterior)', address: '122 Sims Avenue',
  height: 10.25, frontEdge: 4, reviewRoad: 'Sims Avenue',
  evidence: 'The operator and Makita dealer directory list 122 Sims Avenue. Named OSM node 6396561545 lies inside the addressed three-level way 682928762. June 2024 Street View shows cream walls, two windows on each upper floor, ochre surrounds, ventilation slots, two lower-storey condensers, a red awning and bilingual shop fascia. Only No. 122 is assigned; adjacent Thye Seng signage does not establish another unit boundary. Upper-storey occupation is not asserted. Heights, depths and fittings are estimated; no private interior is reconstructed.',
  sources: [
    'https://thyeseng.com/shop/',
    'https://makita.com.sg/find-a-dealer/',
    'https://www.openstreetmap.org/node/6396561545',
    'https://www.openstreetmap.org/way/682928762',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=2Ajok7bnMLxnkcW7PuS2sQ&heading=135.73&pitch=15&fov=75',
  ],
};

// The rear has a notch. These source-index triangles preserve it, unlike a fan
// from vertex zero, which would span the missing corner.
export const thyeSengRoofTriangles = [[0, 1, 5], [1, 4, 5], [1, 2, 3], [1, 3, 4]];

export function thyeSengLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour) => boxes.push({ name, u, y, out, w, h, depth, colour });
  const cream = '#dfd9c9', ochre = '#baa075', light = '#e8e1ce', metal = '#878d87';
  add('sheltered floor', width / 2, .16, -.76, width - .06, .08, 1.5, '#a37f6a');
  add('opaque shop backing', width / 2, 1.62, -1.46, width - .06, 2.86, .08, '#30403e');
  add('shop soffit', width / 2, 3.25, -.70, width - .02, .12, 1.4, cream);
  for (const u of [.18, width - .18]) {
    add('tiled shop pier', u, 1.83, -.19, .30, 3.28, .34, '#abb0ac');
    for (let y = .35; y < 3.4; y += .2) add('pier tile joint', u, y, -.014, .30, .009, .006, '#858e87');
  }
  for (const fraction of [.1, .31, .5, .69, .9]) add('shop upright', width * fraction, 1.52, -1.37, .05, 2.64, .06, metal);
  for (const y of [.25, .9, 2.77]) add('shop rail', width / 2, y, -1.36, width * .84, .055, .05, metal);
  add('closed central entrance', width / 2, 1.46, -1.35, width * .30, 2.38, .025, '#23312f');
  for (const u of [.48, .52]) add('door handle', width * u, 1.4, -1.30, .025, .35, .035, '#bdc2b7');
  add('shop fascia backing', width / 2, 3.00, -1.35, width * .88, .57, .08, '#e6dcc1');
  add('awning front rail', width / 2, 3.33, .83, width - .04, .075, .07, '#84796b');
  add('awning cream valance', width / 2, 3.20, .84, width - .06, .22, .05, '#c9c1a8');
  add('awning wall flashing', width / 2, 3.72, .045, width, .075, .16, '#a69a7e');
  for (const u of [.14, width - .14]) add('awning bracket', u, 3.39, .4, .045, .06, .85, metal);

  for (const y of [5.25, 8.25]) {
    for (const fraction of [.265, .735]) {
      const u = width * fraction, w = width * .345, h = 1.39;
      add('ochre window surround', u, y, .07, w + .20, h + .20, .15, ochre);
      add('window dark recess', u, y, .15, w + .035, h + .035, .035, '#4d514b');
      add('opaque grey glazing', u, y, .177, w, h, .028, '#546463');
      for (let i = 0; i <= 3; i++) add('window upright', u - w / 2 + w * i / 3, y, .21, .032, h, .035, metal);
      for (const dy of [-h / 2, h / 2]) add('window frame rail', u, y + dy, .21, w, .035, .035, metal);
      if (y < 6) add('lower window crossbar', u, y + .1, .21, w, .025, .035, metal);
      add('window sill', u, y - h / 2 - .10, .14, w + .26, .10, .34, ochre);
      add('vent shadow', u, y + 1.04, .05, w * .82, .34, .04, '#696e61');
      for (let row = 0; row < 4; row++) add('vent horizontal slat', u, y + .87 + row * .112, .08, w * .84, .037, .06, light);
      for (const shift of [-.15, .15]) add('vent divider', u + w * shift, y + 1.04, .095, .036, .34, .06, light);
    }
  }
  for (const fraction of [.20, .82]) {
    const u = width * fraction;
    add('condenser casing', u, 6.30, .33, .77, .55, .48, '#b5b8ac');
    add('condenser front grille', u, 6.30, .58, .65, .41, .025, '#6f796f');
    for (let y = 6.14; y < 6.50; y += .055) add('condenser louvre', u, y, .603, .65, .014, .018, '#b4b7ad');
    for (const du of [-.27, .27]) add('condenser support', u + du, 5.98, .27, .045, .065, .62, metal);
  }
  for (const y of [3.81, 6.92]) add('floor band', width / 2, y, .035, width, .13, .17, light);
  add('roof cornice', width / 2, 10.20, .10, width, .17, .28, light);
  add('shallow roof shade', width / 2, 10.32, .26, width, .12, .66, cream);
  add('roof edge', width / 2, 10.40, .25, width, .07, .69, '#9d927d');
  return { boxes, awning: { left: .035, right: width - .035, back: -.12, front: .87, top: 3.69, bottom: 3.35 } };
}

export function thyeSengReviews(f) {
  const pt = (u, out) => [f.a[0] + f.dx * u + f.nx * out, f.a[1] + f.dz * u + f.nz * out];
  const target = pt(f.width / 2, 0);
  // The normal road-centre start falls outside the walkable northern margin.
  // Both views stay inside the existing study boundary, without extending it.
  return [
    { id: 'thye-seng', p: pt(f.width / 2, 8), pitch: 20 },
    { id: 'thye-seng-oblique', p: pt(f.width / 2 + 5, 9), pitch: 20 },
  ].map(r => ({ ...r, yaw: Math.atan2(r.p[0] - target[0], r.p[1] - target[1]) * 180 / Math.PI }));
}
