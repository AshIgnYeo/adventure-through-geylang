// April 2024 street exterior of No. 19 Lorong 13. Only the matching source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';

export const hainanLim = {
  id: 'hainan-lim', buildingIds: ['1223773760'], kind: 'hainan-lim',
  name: 'Hainan Lim Clan Association building (April 2024 exterior)', address: '19 Lorong 13 Geylang (association at #04-01)',
  height: 15.3, frontEdge: 0, reviewRoad: 'Lorong 13 Geylang',
  evidence: 'The SFCCA member directory lists the Hainan Lim Clan Association at 19 Lorong 13 Geylang #04-01, Singapore 388662. April 2024 Street View shows a mosaic-tiled four-storey building numbered 19, carrying 新加坡海南林氏公會 HAINAN LIM CLAN ASSOCIATION (SINGAPORE) and the year 1970 on its top band, 瓊崖沙港同鄉會 KHENG JAI SAR KANG ASSOCIATION on the band below, RAVE AUTO S.C in the second-storey windows and a car-park entrance at street level. The unnumbered source way 1223773760 lies directly north of No. 17, the green-latticed building whose footprint carries that number, and satellite imagery shows the same stepped front. Heights were measured from square-on frames scaled by the 14.17 m frontage; the top band is less certain, at ±0.5 m. The association is shown as one signed tenant, not the whole-building occupier. Faded characters on the third-storey band, plants, vehicles and interiors are not reconstructed.',
  sources: [
    'https://sfcca.sg/en/our-members/',
    'https://www.openstreetmap.org/way/1223773760',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=yo_MuatdX6WE9xNVY4PqBg&heading=252&pitch=0&fov=110',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=yo_MuatdX6WE9xNVY4PqBg&heading=252&pitch=35&fov=110',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=yo_MuatdX6WE9xNVY4PqBg&heading=247&pitch=45&fov=40',
  ],
};

// u runs south (No. 17) to north; out runs east towards Lorong 13.
export const hainanLimFrame = poly => frontageFrame(poly, hainanLim.frontEdge);

// Measured storeys: [bottom, top] of each window band and tiled band, in metres.
export const storeys = {
  carport: [0, 2.67], spandrel2: [2.67, 4.31], windows2: [4.31, 5.99], spandrel3: [5.99, 7.67],
  windows3: [7.67, 9.16], khengBand: [9.16, 11.23], windows4: [11.23, 12.61], limBand: [12.61, 15.3],
};

export function hainanLimLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour) => boxes.push({ name, u, y, out, w, h, depth, colour });
  const S = storeys, recess = .28, metal = '#d9dcd8';

  // Ground floor: a car-park opening on the south and a closed tiled bay with a door.
  const park = [.25, 10.9];
  add('car park floor', (park[0] + park[1]) / 2, .06, -3.0, park[1] - park[0], .08, 5.9, '#8c8f8a');
  add('car park ceiling', (park[0] + park[1]) / 2, S.carport[1] - .05, -3.0, park[1] - park[0], .1, 5.9, '#d8d6cc');
  add('car park back wall', (park[0] + park[1]) / 2, 1.33, -5.95, park[1] - park[0], 2.6, .08, '#3b3e3c');
  for (const u of [park[0], park[1]]) add('car park side wall', u, 1.33, -3.0, .06, 2.6, 5.9, '#c9c7bc');
  add('height gantry', (park[0] + park[1]) / 2, 2.2, -1.2, park[1] - park[0] - .2, .12, .08, '#ddb52a');
  add('barrier arm', 4.0, .95, .6, 6.0, .06, .06, '#e8e6df');
  for (let u = 1.2; u < 7; u += .8) add('barrier stripe', u, .95, .635, .3, .062, .005, '#222222');
  add('barrier post', 7.1, .5, .6, .2, 1.0, .2, '#555a57');
  add('closed bay door', 12.0, 1.1, .02, .95, 2.2, .04, '#3a3433');

  // Recessed window bands: aluminium frames with a transom row, over a dark reveal.
  const band = (name, [bottom, top], glass, transom = true) => {
    const mid = (bottom + top) / 2, h = top - bottom;
    add(`${name} reveal`, width / 2, mid, -recess - .02, width - .5, h, .04, glass);
    const bays = 16, bw = (width - .5) / bays;
    for (let i = 0; i <= bays; i++) add(`${name} mullion`, .25 + bw * i, mid, -recess + .01, .05, h, .04, metal);
    for (const y of [bottom + .03, top - .03]) add(`${name} rail`, width / 2, y, -recess + .01, width - .5, .05, .04, metal);
    if (transom) add(`${name} transom`, width / 2, top - .3, -recess + .01, width - .5, .04, .04, metal);
    add(`${name} sill`, width / 2, bottom - .02, -recess / 2, width - .5, .05, recess, '#cbc4b2');
    add(`${name} soffit`, width / 2, top + .02, -recess / 2, width - .5, .05, recess, '#cbc4b2');
    for (const u of [.15, width - .15]) add(`${name} end return`, u, mid, -recess / 2, .25, h, recess - .01, '#d7cfbd');
  };
  band('second storey windows', S.windows2, '#5a6a72');
  band('third storey windows', S.windows3, '#62727a');
  band('fourth storey windows', S.windows4, '#1f2a33', false);
  // Tiled bands project as slab edges, slightly proud of the source line at the top.
  return {
    boxes,
    tiles: [
      { key: 'spandrel2', range: S.spandrel2, out: .0, number: true },
      { key: 'spandrel3', range: S.spandrel3, out: .0 },
      { key: 'khengBand', range: S.khengBand, out: .0, lines: [['瓊崖沙港同鄉會', .67, .34], ['KHENG JAI SAR KANG ASSOCIATION', .25, .15]] },
      { key: 'limBand', range: S.limBand, out: .0, lines: [['1970', .86, .09], ['新加坡海南林氏公會', .62, .30], ['HAINAN LIM CLAN ASSOCIATION (SINGAPORE)', .33, .14]] },
    ],
    rave: { left: 4.7, right: 9.6, bottom: 4.75, top: 5.55, out: -recess + .045 },
    park,
  };
}

export function hainanLimReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'hainan-lim', p: point(width / 2, 12.5), target: point(width / 2, 0), pitch: 30 },
    { id: 'hainan-lim-signs', p: point(width / 2 + 3, 11), target: point(width / 2, 0), pitch: 42 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
