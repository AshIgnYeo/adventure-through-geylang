// June 2024 street exterior of No. 279. Only the matching source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const eros = {
  id: 'eros', buildingIds: ['454254224'], kind: 'eros',
  name: 'Eros Adult Shop (June 2024 exterior)', address: '279 Geylang Road',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists Eros Adult Shop at 279 Geylang Road, Singapore 389328, open in October 2026; its place point is displaced behind the row and is not used. Unnumbered way 454254224 lies between the signed 277 KTV pair and the RR Motor frontage numbered 281, so it is No. 279. June 2024 Street View shows a dark dot-matrix signboard with raised white EROS letters and EROTIC HOUSE, mounted proud of the cornice, and a black oval blade sign reading EROS ADULT SHOP on the party pilaster with 277. A May 2023 capture shows the same signboard square on. The upper storey matches the measured row with white jalousies, brown arch heads and trim, under weathered tiles. In the five-foot way are a black quilted return wall, glass display windows and a glass door under a lit board, and a timber-framed dark door. Signboard heights come from the square-on frame; the blade sign and back-wall fittings were triangulated from two calibrated June 2024 panoramas. Merchandise, mannequins, window graphics and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Eros+Adult+Shop+279+Geylang+Road',
    'https://www.openstreetmap.org/way/454254224',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=l9a4ddU563R0eUYBWOE4Wg&heading=352&pitch=5&fov=70',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=1udsor6p2plZzO-0C3V8yg&heading=32&pitch=10&fov=36',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=70E8HnCOcGqPcYcFVA6kZw&heading=300&pitch=4&fov=70',
  ],
  // Measured positions, metres along the frontage from No. 277's party line.
  signboard: { left: .40, right: 4.96, bottom: 3.42, top: 4.19, out: .265 },
  blade: { u: .06, from: .07, to: 1.0, bottom: 4.28, top: 6.82 },
  ledBoard: { left: .30, right: 3.0, bottom: 2.52, top: 3.38 },
  display: [.30, 3.18], glassDoor: [3.22, 3.62], timberDoor: [3.66, 4.98], doorHead: 2.42,
  roof: { tile: '#935444', course: '#7f4536' },
};

// u runs west (No. 277) to east (No. 281), out towards the road.
export const erosFrame = poly => frontageFrame(poly, eros.frontEdge);

export function erosLayout(width) {
  const grey = '#3d3f40';
  // The west half pier is painted dark grey like its 277 KTV half; the east half pier is white.
  const base = pairedShophouseLayout(width, { piers: [{ u: .15, w: .30, face: grey, side: grey }, { u: width - .15, w: .30 }], style: 'jalousie' });
  const { add } = base, D = eros.fiveFootWay, e = eros, back = -D + .05, fit = back + .025;
  // The signboard is mounted proud of the cornice and hides it, as photographed.
  const sb = e.signboard;
  add('signboard backing', (sb.left + sb.right) / 2, (sb.bottom + sb.top) / 2, sb.out - .075, sb.right - sb.left, sb.top - sb.bottom, .14, '#141414');
  // Black lining over the back wall and ceiling, as the five-foot way reads dark in every view.
  add('dark back wall lining', width / 2, 1.87, back, width - .12, 3.50, .01, '#18181a');
  add('dark ceiling lining', width / 2, 3.61, -D / 2, width - .1, .02, D - .05, '#202022');
  // Glass display windows: dark glass, aluminium frame and a mullion, lit dimly red from inside.
  const [dl, dr] = e.display;
  add('display frame', (dl + dr) / 2, 1.25, fit, dr - dl, 2.30, .04, '#8d9093');
  add('display glass', (dl + dr) / 2, 1.27, fit + .025, dr - dl - .1, 2.14, .01, '#3a1a22', .25);
  add('display mullion', .92, 1.27, fit + .035, .05, 2.14, .02, '#8d9093');
  add('display stall riser', (dl + dr) / 2, .32, fit + .03, dr - dl - .02, .24, .02, '#26262a');
  // Glass door with a light strip down its leading edge.
  const [gl, gr] = e.glassDoor;
  add('glass door frame', (gl + gr) / 2, 1.25, fit, gr - gl, 2.30, .04, '#8d9093');
  add('glass door leaf', (gl + gr) / 2, 1.25, fit + .025, gr - gl - .08, 2.20, .01, '#202629');
  add('door light strip', gl + .05, 1.25, fit + .035, .02, 2.10, .01, '#dfe8ff', 1.4);
  // Timber-framed dark door at the east end of the five-foot way.
  const [tl, tr] = e.timberDoor;
  add('timber door frame', (tl + tr) / 2, e.doorHead / 2 + .1, fit, tr - tl, e.doorHead - .1, .06, '#6b4a36');
  add('dark door leaf', (tl + tr) / 2, (e.doorHead - .1) / 2 + .1, fit + .035, tr - tl - .2, e.doorHead - .2, .02, '#141416');
  add('door head light', (tl + tr) / 2, e.doorHead - .07, fit + .05, tr - tl - .3, .03, .02, '#f0eee6', .8);
  // Wall above the doors, under the lit board.
  const led = e.ledBoard;
  add('lit board backing', (led.left + led.right) / 2, (led.bottom + led.top) / 2, fit, led.right - led.left, led.top - led.bottom, .04, '#0c0c0e');
  return {
    ...base,
    sign: { ...sb },
    led: { ...led, out: fit + .025 },
    // The black quilted return wall closes the west end of the five-foot way.
    quilt: { from: -D + .04, to: -.56, u: .05, bottom: .21, top: 3.55 },
    blade: { ...e.blade },
  };
}

export function erosReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'eros', p: point(width / 2, 14), target: point(width / 2, 0), pitch: 15 },
    { id: 'eros-five-foot-way', p: point(width / 2 + .4, 3.2), target: point(width / 2, -1.5), pitch: 12 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
