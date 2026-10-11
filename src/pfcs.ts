import type { World, Point } from './world';
import { pfcs, pfcsFrame, pfcsLayout, pfcsReviews } from './pfcs-layout.mjs';
import { buildSimpleHouse } from './simple-house';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'serif', weight = '700', max?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, max);
};

/** June 2024 exterior of the Public Free Clinic Society headquarters, 10 Lorong 9. */
export function buildPfcs(world: World, id: string, poly: Point[]) {
  if (!pfcs.buildingIds.includes(id)) return false;
  const frame = pfcsFrame(poly), layout = pfcsLayout(frame.width);
  const { pt } = buildSimpleHouse(world, 'Public Free Clinic Society', frame, poly, pfcs, layout, {
    boards: [
      (c, w, h) => { c.fillStyle = '#f4f4f0'; c.fillRect(0, 0, w, h); [...'大眾醫院'].forEach((ch, i) => text(c, ch, w * (.2 + i * .2), h * .5, h * .7, '#c0392b', '"Kaiti SC", "STKaiti", serif', '900')); },
      (c, w, h) => { c.fillStyle = '#d9d4c6'; c.fillRect(0, 0, w, h); text(c, '大 眾 醫 院', w * .36, h * .5, h * .62, '#7a3b2a', '"Kaiti SC", serif', '900', w * .45); text(c, 'Public Free Clinic Society', w * .78, h * .5, h * .32, '#3b3b3b', 'sans-serif', '700', w * .38); },
    ],
  });
  // Forecourt paving between Lorong 9 and the tower.
  const a = pt(0, 0), b = pt(frame.width, 0), c2 = pt(frame.width, 8), d = pt(0, 8);
  world.mesh('Public Free Clinic Society forecourt', [a, b, c2, d].flatMap(p => [p[0], .1, p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], world.mat('#9a978f'));
  // Granite gate sign at the forecourt entrance: 大眾醫院 中醫學研究院 PUBLIC FREE CLINIC SOCIETY.
  const gs = document.createElement('canvas'); gs.width = 512; gs.height = 440;
  { const c = gs.getContext('2d')!; c.fillStyle = '#e9e7e2'; c.fillRect(0, 0, 512, 440); text(c, '大眾醫院', 256, 90, 110, '#c0392b', '"Kaiti SC", serif', '900'); text(c, '中醫學研究院', 256, 210, 70, '#c0392b', '"Kaiti SC", serif', '900'); text(c, 'PUBLIC FREE CLINIC SOCIETY', 256, 300, 34, '#2b2b2b', 'sans-serif', '800', 480); text(c, 'INSTITUTE OF CHINESE MEDICAL STUDIES PTE. LTD.', 256, 350, 22, '#2b2b2b', 'sans-serif', '700', 480); }
  const gm = world.mat('#b9b4aa'), g0 = pt(3.0, 7.4), g1 = pt(4.9, 7.4), mid = pt(3.95, 7.25);
  world.box('Public Free Clinic Society gate pier', mid[0], .95, mid[1], 2.1, 1.9, .3, gm, undefined, frame.angle);
  const sm = new (world.mat('#ffffff').constructor as any)(); sm.diffuseMap = world.texture(gs); sm.update();
  world.panel(g0, g1, .2, 1.8, sm);
  for (const r of pfcsReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
