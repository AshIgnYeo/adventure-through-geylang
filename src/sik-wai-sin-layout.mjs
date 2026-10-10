// June 2024 street exterior. Only the No. 289 source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const sikWaiSin = {
  id: 'sik-wai-sin', buildingIds: ['454254229'], kind: 'sik-wai-sin',
  name: 'Sik Wai Sin frontage (June 2024 exterior)', address: '289 Geylang Road',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'ACRA-derived records list Sik Wai Sin Eating House at 289 Geylang Road #01-289, with an address change on 6 September 2024; Google Maps now places the business at No. 287, beside Eat First. June 2024 Street View shows the unnumbered source way 454254229, east of Eat First, with the red 食為先 SIK WAI SIN fascia numbered 289, a small 食為先大飯店 board, a dark timber door and a closed shutter in the five-foot way, brick-faced piers, and the same arched upper storey, relief and orange tiled roof as No. 287. This is a dated exterior: current use of No. 289 after June 2024 is unresolved. Heights follow the measurements made for No. 287. No interior is reconstructed; the vertical characters on the east pier are omitted because one is hidden.',
  sources: [
    'https://recordowl.com/company/sik-wai-sin-eating-house',
    'https://www.openstreetmap.org/way/454254229',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=4E9yml2h1kTBeHbJ3p0Ygg&heading=352&pitch=10&fov=50',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=4E9yml2h1kTBeHbJ3p0Ygg&heading=352&pitch=30&fov=90',
  ],
};

// u runs west (No. 287) to east (No. 291) along the frontage, out towards the road.
export const sikWaiSinFrame = poly => frontageFrame(poly, sikWaiSin.frontEdge);

export function sikWaiSinLayout(width) {
  // The west pier continues the white pier shared with No. 287, then turns to
  // brick; the east pier is the brick-faced No. 289 half of the pier shared with No. 291.
  const brick = '#8c5646';
  const base = pairedShophouseLayout(width, { piers: [{ u: .335, w: .65, side: brick }, { u: width - .24, w: .46, face: brick, side: brick }] });
  const { add } = base, D = sikWaiSin.fiveFootWay;
  add('west pier brick face', .50, 1.71, .016, .32, 3.16, .01, brick);
  for (let y = .45; y < 3.2; y += .16) for (const u of [.50, width - .24]) add('brick course', u, y, .023, u < 1 ? .32 : .45, .012, .006, '#6e4034');

  // Back wall: dark timber double door at the west end, the small red board and
  // a closed aluminium roller shutter under its hood.
  add('timber door', .53, 1.32, -D + .06, .95, 2.42, .05, '#2c2321');
  add('door transom', .53, 2.66, -D + .06, .95, .22, .05, '#3a2f2b');
  for (const u of [.30, .76]) add('door panel', u, 1.25, -D + .09, .36, 1.9, .02, '#352a27');
  add('door meeting stile', .53, 1.32, -D + .10, .03, 2.42, .02, '#1f1918');
  add('roller shutter', 3.09, 1.27, -D + .06, 3.46, 2.30, .04, '#c9cec8');
  for (let y = .25; y < 2.4; y += .1) add('shutter slat', 3.09, y, -D + .085, 3.46, .015, .01, '#aeb4ae');
  add('shutter guide', 1.37, 1.27, -D + .08, .05, 2.30, .05, '#9aa09a');
  add('shutter guide', 4.81, 1.27, -D + .08, .05, 2.30, .05, '#9aa09a');
  add('shutter hood', 3.09, 2.50, -D + .12, 3.56, .16, .20, '#e2e3dd');
  add('sign backing', 2.725, 3.585, .035, 4.55, .58, .07, '#8f2422');
  return {
    ...base,
    sign: { left: .45, right: 5.00, bottom: 3.30, top: 3.87, out: .072 },
    board: { left: 2.51, right: 3.63, bottom: 2.56, top: 3.03, out: -D + .085 },
  };
}

export function sikWaiSinReviews(frame) {
  const { point, width } = frame;
  return [
    // The study's walkable edge runs just west of this frontage's centre, so both
    // starts look across from in front of No. 287.
    { id: 'sik-wai-sin', p: point(-1.6, 12.5), target: point(width / 2, 0), pitch: 15 },
    { id: 'sik-wai-sin-five-foot-way', p: point(-1.2, 3.0), target: point(width / 2, -1.5), pitch: 12 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
