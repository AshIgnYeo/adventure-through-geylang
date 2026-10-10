// June 2024 street exterior of No. 271. Only the matching source footprint is assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const goldenJade = {
  id: 'golden-jade', buildingIds: ['454254220'], kind: 'golden-jade',
  name: 'Golden Jade Restaurant (June 2024 exterior)', address: '271 Geylang Road',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps and Wanderlog list Golden Jade Restaurant 金翠餐厅 at 271 Geylang Road, Singapore 389324, open in October 2026; its place point lies in front of unnumbered way 454254220. Counting from the Buddhist Art Centre at No. 285, and from the closed BN Food Palace at No. 269 on the Lorong 13 corner, the same way is No. 271. The 2017 Golden Jade point sits one unit west, in the corner way, and is not used. June 2024 Street View shows a black marquee signboard reading 金翠餐厅 GOLDEN JADE RESTAURANT, SINCE 2003 and 271, over a strip of framed food pictures and a closed shutter. The upper storey matches the measured row with white jalousies, brown arch heads and trim, under weathered tiles with grey-green coping caps. Heights follow the measured row; the roof form is estimated. No interior, food pictures or menus are reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Golden+Jade+Restaurant+271+Geylang+Road',
    'https://wanderlog.com/place/details/2630612/golden-jade',
    'https://www.openstreetmap.org/way/454254220',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=jYF-BzVq__RpGZWD3Tplwg&heading=6&pitch=6&fov=28',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=jYF-BzVq__RpGZWD3Tplwg&heading=352&pitch=8&fov=70',
  ],
};

// u runs west (No. 269, the Lorong 13 corner) to east (No. 273), out towards the road.
export const goldenJadeFrame = poly => frontageFrame(poly, goldenJade.frontEdge);

export function goldenJadeLayout(width) {
  const base = pairedShophouseLayout(width, { piers: [{ u: .16, w: .30 }, { u: width - .17, w: .30 }], style: 'jalousie' });
  const { add } = base, D = goldenJade.fiveFootWay;
  // The signboard is mounted proud of the cornice and hides it, as photographed.
  add('signboard backing', 2.75, 3.71, .19, 4.66, 1.04, .14, '#141414');
  add('picture strip', 2.45, 3.02, -.32, 4.0, .36, .06, '#3a2a24');
  for (let i = 0; i < 8; i++) add('picture frame', .58 + i * .5, 3.02, -.285, .46, .30, .01, '#6b5546');
  add('roller shutter', 1.90, 1.26, -D + .06, 3.0, 2.34, .04, '#c9ccc5');
  for (let y = .25; y < 2.4; y += .1) add('shutter slat', 1.90, y, -D + .085, 3.0, .015, .01, '#acb1aa');
  add('shutter hood', 1.90, 2.50, -D + .12, 3.1, .14, .20, '#dcddd7');
  add('dark display door', 4.05, 1.25, -D + .06, 1.0, 2.40, .05, '#2a201d');
  return { ...base, sign: { left: .45, right: 5.05, bottom: 3.20, top: 4.22, out: .265 } };
}

export function goldenJadeReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'golden-jade', p: point(width / 2, 14), target: point(width / 2, 0), pitch: 15 },
    { id: 'golden-jade-five-foot-way', p: point(width / 2 + .5, 3.0), target: point(width / 2, -1), pitch: 16 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
