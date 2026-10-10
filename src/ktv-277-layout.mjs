// June 2024 street exterior of the signed No. 275/277 pair. Only these two source footprints are assigned.
import { frontageFrame } from './gable-roof-layout.mjs';
import { pairedShophouse, pairedShophouseLayout } from './paired-shophouse-layout.mjs';

export const ktv277 = {
  id: 'ktv-277', buildingIds: ['454254222', '454254223'], kind: 'ktv-277',
  name: '277 KTV (June 2024 exterior)', address: '277 Geylang Road (signboard across Nos. 275–277)',
  ...pairedShophouse, reviewRoad: 'Geylang Road',
  evidence: 'Google Maps lists 277 KTV at 277 Geylang Road, Singapore 389327, open in October 2026. June 2024 Street View shows one black signboard reading 芽笼 277 KTV and 醉好 across the two unnumbered source ways between the No. 273 Zui Xiang frontage and the Eros unit, which is consistent with Nos. 275 and 277. The five-foot way is closed by a black quilted wall behind dark grey piers, with lower boards and a gold star-and-microphone motif. The upper storeys share the measured row elevation, finished in dusty pink with white fretwork fanlights over mauve-grey louvred casements, under terracotta tiles. Heights follow the measured row; the enclosure depth and roofs are estimates. Beer brand panels, cartoon characters, interiors and activity are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=277+KTV+277+Geylang+Road',
    'https://www.openstreetmap.org/way/454254222',
    'https://www.openstreetmap.org/way/454254223',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=1udsor6p2plZzO-0C3V8yg&heading=8&pitch=4&fov=40',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=1udsor6p2plZzO-0C3V8yg&heading=8&pitch=22&fov=40',
  ],
  // Pair coordinates run from No. 275's west party line into No. 277.
  signboard: { from: .1, to: 10.16, bottom: 3.22, top: 4.06, out: .27 },
  lowerBoard: { from: .32, to: 9.95, bottom: 2.62, top: 3.18, out: -.36 },
  enclosure: -.42,
};

export const ktvFrame = poly => frontageFrame(poly, ktv277.frontEdge);

export function ktvLayout(width, unit) {
  const grey = '#3d3f40';
  // Half piers at the outer party lines; the central pier is shared by the two units.
  const piers = unit === 0 ? [{ u: .17, w: .34, face: grey, side: grey }, { u: width - .19, w: .38, face: grey, side: grey }] : [{ u: .19, w: .38, face: grey, side: grey }, { u: width - .17, w: .34, face: grey, side: grey }];
  const base = pairedShophouseLayout(width, { piers, style: 'fretwork' });
  const { add } = base, k = ktv277, offset = unit * width;
  // Boards run continuously across the shared party line; only their outer ends are inset.
  const span = (from, to) => [Math.max(from - offset, unit ? 0 : .04), Math.min(to - offset, unit ? width - .04 : width)];
  // Signboard backing and lower board backing, each this unit's share of the pair.
  for (const [name, b, depth] of [['signboard backing', k.signboard, .14], ['lower board backing', k.lowerBoard, .05]]) {
    const [l, r] = span(b.from, b.to);
    add(name, (l + r) / 2, (b.bottom + b.top) / 2, b.out - depth / 2 - .005, r - l, b.top - b.bottom, depth, '#111111');
  }
  return {
    ...base,
    shares: ['signboard', 'lowerBoard'].map(key => {
      const b = k[key], [left, right] = span(b.from, b.to);
      return { key, left, right, bottom: b.bottom, top: b.top, out: b.out, uv: [(left + offset - b.from) / (b.to - b.from), (right + offset - b.from) / (b.to - b.from)] };
    }),
    // The quilted wall closes the five-foot way between the piers, behind their fronts.
    quilt: { left: unit === 0 ? .34 : .38, right: width - (unit === 0 ? .38 : .34), out: k.enclosure, bottom: .21, top: 3.29, star: unit === 0 },
  };
}

export function ktvReviews(frame) {
  // Unit 0 frame: the pair's centre is No. 275's east party line.
  const { point, width } = frame;
  return [
    { id: 'ktv-277', p: point(width, 14), target: point(width, 0), pitch: 15 },
    { id: 'ktv-277-five-foot-way', p: point(width - .8, 3.2), target: point(width, -.4), pitch: 15 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
