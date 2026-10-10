import type { World, Point } from './world';
import { goldenJade, goldenJadeFrame, goldenJadeLayout, goldenJadeReviews } from './golden-jade-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

/** June 2024 exterior of No. 271, using the untouched source outline. */
export function buildGoldenJade(world: World, id: string, poly: Point[]) {
  if (!goldenJade.buildingIds.includes(id)) return false;
  const frame = goldenJadeFrame(poly), { width } = frame;
  const layout = goldenJadeLayout(width);
  const { pt, textured } = buildPairedShophouse(world, 'Golden Jade', frame, layout, goldenJade, {
    tile: '#8e5846', course: '#a26a55', coping: '#6f7d6a', gable: '#f1efe8', copingHeight: .25, copingWidth: .2, frontCap: { length: .45, height: .3 },
  });

  // Black marquee signboard, redrawn with original typography: 金翠餐厅,
  // GOLDEN JADE RESTAURANT, SINCE 2003 and 271, ringed by bulbs.
  const sg = layout.sign, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (sg.top - sg.bottom) / (sg.right - sg.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#141414'; c.fillRect(0, 0, 2048, h);
  c.fillStyle = '#f3f0e2';
  for (let x = 30; x < 2030; x += 46) for (const y of [24, h - 24]) { c.beginPath(); c.arc(x, y, 8, 0, Math.PI * 2); c.fill(); }
  for (let y = 70; y < h - 40; y += 46) for (const x of [24, 2024]) { c.beginPath(); c.arc(x, y, 8, 0, Math.PI * 2); c.fill(); }
  c.textBaseline = 'middle'; c.fillStyle = '#efc23d'; c.font = '900 250px "PingFang SC", "Heiti SC", sans-serif';
  c.fillText('金翠餐厅', 80, h * .47, 1050);
  c.fillStyle = '#e9e9e4'; c.font = '700 112px "Helvetica Neue", Arial, sans-serif';
  c.fillText('GOLDEN JADE', 1190, h * .3, 780); c.fillText('RESTAURANT', 1190, h * .55, 780);
  c.font = '600 54px "Helvetica Neue", Arial, sans-serif'; c.fillText('SINCE 2003', 1190, h * .82); c.fillText('271', 1820, h * .82);
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(canvas, .12));

  for (const r of goldenJadeReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
