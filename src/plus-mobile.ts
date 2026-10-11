import type { World, Point } from './world';
import { plusMobile, plusMobileFrame, plusMobileLayout, plusMobileReviews } from './plus-mobile-layout.mjs';
import { buildSingleRowHouse } from './single-row';

/** April 2024 exterior of No. 22 Lorong 13, using the untouched source outline. */
export function buildPlusMobile(world: World, id: string, poly: Point[]) {
  if (!plusMobile.buildingIds.includes(id)) return false;
  const frame = plusMobileFrame(poly), { width } = frame;
  const layout = plusMobileLayout(width);
  // Walls, canopy and roof are the row's; the salmon party-wall coping is on the No. 24 side only.
  const { pt, textured, board } = buildSingleRowHouse(world, 'Plus Mobile', frame, plusMobile, layout, 'a');

  // Signboard over the left shutter, redrawn with original typography. The email address is omitted.
  const sg = layout.sign, sign = board(sg.right - sg.left, sg.top - sg.bottom, (c, W, H) => {
    c.fillStyle = '#f7f6f1'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#c9c7bf'; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6);
    c.fillStyle = '#3f7d3a'; c.beginPath(); c.arc(H * .5, H * .5, H * .38, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#e8d34a'; c.beginPath(); c.arc(H * .5, H * .5, H * .22, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#c8272d'; c.textBaseline = 'middle'; c.font = `italic 700 ${H * .5}px Georgia, "Times New Roman", serif`;
    c.fillText('Plus Mobile & Accessories', H * 1.05, H * .42, W - H * 1.3);
    c.fillStyle = '#1d1d1d'; c.font = `700 ${H * .2}px Arial, sans-serif`; c.textAlign = 'right'; c.fillText('No.22', W - 14, H * .8);
  });
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(sign, .05));

  // Third-party SIM advert over the right shutter, kept as a blank red and white panel.
  const ad = layout.advert, advert = board(ad.right - ad.left, ad.top - ad.bottom, (c, W, H) => {
    c.fillStyle = '#f4f3ef'; c.fillRect(0, 0, W, H); c.fillStyle = '#b5242f'; c.fillRect(0, 0, W * .32, H);
    c.strokeStyle = '#8f8f8a'; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6);
  });
  world.panel(pt(ad.left, ad.out), pt(ad.right, ad.out), ad.bottom, ad.top, textured(advert));

  // Tall blue service board beside the door plate: the Plus Mobile mark over its four services in Chinese.
  const sb = layout.serviceBoard, service = board(sb.right - sb.left, sb.top - sb.bottom, (c, W, H) => {
    c.fillStyle = '#1f2f6b'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#4f9a3b'; c.beginPath(); c.ellipse(W / 2, H * .09, W * .38, H * .06, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#f2e04c'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `italic 700 ${W * .16}px Georgia, serif`; c.fillText('Plus', W / 2, H * .09);
    c.fillStyle = '#f1f1ec'; c.font = `700 ${W * .15}px "PingFang SC", "Heiti SC", sans-serif`;
    ['批发与零售', '手机配件', '维修手机', '手机买卖'].forEach((t, i) => c.fillText(t, W / 2, H * (.62 + i * .09), W * .9));
  });
  world.panel(pt(sb.left, sb.out), pt(sb.right, sb.out), sb.bottom, sb.top, textured(service, .05));
  const pl = layout.plate;
  world.panel(pt(pl.left, pl.out), pt(pl.right, pl.out), pl.bottom, pl.top, world.textMaterial('22', '#f4f4f0', '#181818', 0, (pl.right - pl.left) / (pl.top - pl.bottom)));

  for (const r of plusMobileReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
