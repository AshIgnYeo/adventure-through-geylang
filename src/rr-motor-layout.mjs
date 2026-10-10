// June 2024 street exterior of the signed No. 281/283 pair. Only these two source footprints are assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const rrMotor = {
  id: 'rr-motor', buildingIds: ['454254225', '454254226'], kind: 'rr-motor',
  name: 'RR Motor (June 2024 exterior)', address: '281 Geylang Road (signboard across Nos. 281–283)',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'ACRA-derived records list R R Motor Pte Ltd at 281 Geylang Road, with a business-activity change in July 2025. June 2024 Street View shows one RR MOTOR 专卖店 signboard, bearing the rrmotor.com.sg address, hung across the two unnumbered source ways west of the Buddhist Art Centre, with a 281 plate on the west door. Both units share the measured elevation of Nos. 287 and 289, finished with white timber jalousies, brown-filled arches, brown trim and a brown eaves board. Each has a closed roller shutter and a timber door. The 2017 Eros point inside way 454254225 is stale; Eros traded one unit further west in June 2024. Heights follow the measured row; roof forms are estimates, with an orange corrugated roof on No. 281 and weathered tiles on No. 283 as seen from across the road. No interior, stock or product pictures are reconstructed.',
  sources: [
    'https://recordowl.com/company/r-r-motor-pte-ltd',
    'https://www.openstreetmap.org/way/454254225',
    'https://www.openstreetmap.org/way/454254226',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=70E8HnCOcGqPcYcFVA6kZw&heading=352&pitch=5&fov=55',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=70E8HnCOcGqPcYcFVA6kZw&heading=352&pitch=30&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=_w5yHraTw78BWJJ4wn1RSQ&heading=355&pitch=22&fov=45',
  ],
  // The signboard spans both frontages in pair coordinates (No. 281's u, continuing into No. 283).
  signboard: { from: 1.6, to: 8.2, bottom: 2.55, top: 3.21, out: -.60 },
  roofs: [
    { tile: '#c66d43', course: '#a95a37' },
    { tile: '#8c5a48', course: '#a06a55' },
  ],
};

// u runs west to east along each frontage, out towards the road.
export const rrMotorFrame = poly => frontageFrame(poly, rrMotor.frontEdge);

export function rrMotorLayout(width, unit) {
  // Half piers at each party line; the central pier is shared by the two units.
  const piers = unit === 0 ? [{ u: .135, w: .27 }, { u: width - .17, w: .30 }] : [{ u: .16, w: .30 }, { u: width - .17, w: .30 }];
  const base = pairedShophouseLayout(width, { piers, style: 'jalousie' });
  const { add } = base, D = rrMotor.fiveFootWay;
  const door = unit === 0 ? [.35, 1.20] : [4.15, 4.85], shutter = unit === 0 ? [1.30, 4.70] : [.55, 4.00];
  add('timber door', (door[0] + door[1]) / 2, 1.20, -D + .06, door[1] - door[0], 2.36, .05, unit === 0 ? '#6b4a3a' : '#3e2a25');
  add('door head', (door[0] + door[1]) / 2, 2.48, -D + .07, door[1] - door[0] + .1, .08, .05, '#d9d5cb');
  for (const f of [.3, .7]) add('door panel', door[0] + (door[1] - door[0]) * f, 1.25, -D + .09, (door[1] - door[0]) * .32, 1.8, .02, unit === 0 ? '#7a5745' : '#4a332c');
  if (unit === 1) add('door ornament', (door[0] + door[1]) / 2, 1.75, -D + .11, .18, .18, .01, '#b8322c', 0, 45);
  add('roller shutter', (shutter[0] + shutter[1]) / 2, 1.24, -D + .06, shutter[1] - shutter[0], 2.30, .04, '#cdd0ca');
  for (let y = .25; y < 2.4; y += .1) add('shutter slat', (shutter[0] + shutter[1]) / 2, y, -D + .085, shutter[1] - shutter[0], .015, .01, '#b0b5af');
  add('shutter hood', (shutter[0] + shutter[1]) / 2, 2.46, -D + .12, shutter[1] - shutter[0] + .1, .14, .20, '#e2e3dd');
  // This unit's share of the signboard, hung just behind the pier fronts.
  const sb = rrMotor.signboard, offset = unit * width;
  const left = Math.max(sb.from - offset, .04), right = Math.min(sb.to - offset, width - .04);
  add('signboard frame', (left + right) / 2, (sb.bottom + sb.top) / 2, sb.out - .03, right - left, sb.top - sb.bottom + .06, .04, '#9fa39e');
  return { ...base, sign: { left, right, bottom: sb.bottom, top: sb.top, out: sb.out, uv: [(left + offset - sb.from) / (sb.to - sb.from), (right + offset - sb.from) / (sb.to - sb.from)] } };
}

export function rrMotorReviews(frame) {
  // Unit 0 frame: the pair's centre is No. 281's east party line.
  const { point, width } = frame;
  return [
    { id: 'rr-motor', p: point(width, 14), target: point(width, 0), pitch: 15 },
    { id: 'rr-motor-five-foot-way', p: point(width - .6, 3.0), target: point(width, -1.5), pitch: 14 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
