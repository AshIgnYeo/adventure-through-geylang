import type { World, Point } from './world';
import { hongYeChen, hongYeChenFrame, hongYeChenLayout, hongYeChenReviews } from './hong-ye-chen-layout.mjs';
import { buildRow13House } from './row13';

/** April 2024 exterior of No. 7 Lorong 13, using the untouched source outline. */
export function buildHongYeChen(world: World, id: string, poly: Point[]) {
  if (!hongYeChen.buildingIds.includes(id)) return false;
  const frame = hongYeChenFrame(poly), { width, angle } = frame;
  const layout = hongYeChenLayout(width);
  const { pt, textured } = buildRow13House(world, 'Hong Ye Chen', frame, layout);

  // Black signboard with three gold roundels, 浤業成, and HONG YE CHEN INTERIOR DESIGN, redrawn originally.
  const sg = layout.sign, sc = document.createElement('canvas');
  sc.width = 2048; sc.height = Math.round(2048 * (sg.top - sg.bottom) / (sg.right - sg.left));
  const s = sc.getContext('2d')!, sh = sc.height;
  s.fillStyle = '#18191b'; s.fillRect(0, 0, 2048, sh);
  const roundel = (cx: number, ch: string, r: number) => {
    s.strokeStyle = '#c7a35a'; s.lineWidth = r * .07; s.beginPath(); s.arc(cx, sh / 2, r, 0, Math.PI * 2); s.stroke();
    s.fillStyle = '#d4b46c'; s.textAlign = 'center'; s.textBaseline = 'middle'; s.font = `700 ${r * 1.2}px "Kaiti SC", "STKaiti", serif`; s.fillText(ch, cx, sh / 2 + r * .05);
  };
  [...'浤業成'].forEach((ch, i) => roundel(560 + i * 320, ch, sh * .38));
  s.fillStyle = '#d4b46c'; s.textAlign = 'left'; s.font = `600 ${sh * .14}px "Helvetica Neue", Arial, sans-serif`;
  s.fillText('HONG YE CHEN', 1420, sh * .42); s.fillText('INTERIOR DESIGN', 1420, sh * .6);
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(sc, { glow: .06 }));

  // Blade sign of three stacked black discs with gold characters, on the north pier.
  const bl = layout.blade;
  [...'浤業成'].forEach((ch, i) => {
    const disc = document.createElement('canvas'); disc.width = disc.height = 256;
    const d = disc.getContext('2d')!;
    d.fillStyle = '#18191b'; d.beginPath(); d.arc(128, 128, 126, 0, Math.PI * 2); d.fill();
    d.strokeStyle = '#c7a35a'; d.lineWidth = 8; d.beginPath(); d.arc(128, 128, 104, 0, Math.PI * 2); d.stroke();
    d.fillStyle = '#d4b46c'; d.textAlign = 'center'; d.textBaseline = 'middle'; d.font = '700 130px "Kaiti SC", "STKaiti", serif'; d.fillText(ch, 128, 134);
    const mat = textured(disc, { cutout: true }), y = bl.top - bl.r - i * (bl.r * 2 + .04);
    for (const side of [-.02, .02]) world.panel(pt(bl.u + side, bl.out - bl.r), pt(bl.u + side, bl.out + bl.r), y - bl.r, y + bl.r, mat);
  });
  const arm = pt(bl.u, bl.out / 2);
  world.box('Hong Ye Chen blade bracket', arm[0], bl.top + .02, arm[1], .04, .04, bl.out + .1, world.mat('#2b2b2b'), undefined, angle);

  const np = layout.numberPlate;
  world.panel(pt(np.u - np.w / 2, np.out), pt(np.u + np.w / 2, np.out), np.bottom, np.top, world.textMaterial('7', '#232425', '#e5e5e0', 0, np.w / (np.top - np.bottom)));

  for (const r of hongYeChenReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
