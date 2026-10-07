import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { hongYeChen, hongYeChenFrame, hongYeChenLayout, hongYeChenReviews } from './hong-ye-chen-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** April 2024 exterior of No. 7 Lorong 13, using the untouched source outline. */
export function buildHongYeChen(world: World, id: string, poly: Point[]) {
  if (!hongYeChen.buildingIds.includes(id)) return false;
  const frame = hongYeChenFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, opts: { glow?: number; cutout?: boolean } = {}) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (opts.glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = opts.glow; }
    if (opts.cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const white = material('#efede6'), wallTop = hongYeChen.height + .08;
  world.panel(frame.a, frame.rearA, .13, wallTop, white);
  world.panel(frame.b, frame.rearB, .13, wallTop, white);
  world.panel(frame.rearA, frame.rearB, .13, wallTop, white);
  world.panel(pt(0), pt(width), 3.28, wallTop, white);

  const layout = hongYeChenLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`Hong Ye Chen ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  // Pink-red floral tile panels under the side windows, an original pattern.
  for (const tp of layout.tilePanels) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * (tp.top - tp.bottom) / tp.w);
    const c = canvas.getContext('2d')!, h = canvas.height, n = 5, s = 512 / n;
    c.fillStyle = '#efe6dd'; c.fillRect(0, 0, 512, h);
    for (let i = 0; i < n; i++) for (let j = 0; j < Math.ceil(h / s); j++) {
      const x = s * (i + .5), y = s * (j + .5);
      c.fillStyle = '#c4505e'; for (let a = 0; a < 4; a++) { c.beginPath(); c.ellipse(x + Math.cos(a * Math.PI / 2) * s * .2, y + Math.sin(a * Math.PI / 2) * s * .2, s * .15, s * .08, a * Math.PI / 2, 0, Math.PI * 2); c.fill(); }
      c.fillStyle = '#5b8f74'; c.beginPath(); c.arc(x, y, s * .1, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(150,90,90,.4)'; c.lineWidth = 2; c.strokeRect(i * s, j * s, s, s);
    }
    c.strokeStyle = '#d6cfc4'; c.lineWidth = 12; c.strokeRect(6, 6, 500, h - 12);
    world.panel(pt(tp.u - tp.w / 2, tp.out), pt(tp.u + tp.w / 2, tp.out), tp.bottom, tp.top, textured(canvas));
  }

  // White timber fretwork valance with pointed teeth, continuous along the row.
  const fw = layout.fretwork, fc = document.createElement('canvas');
  fc.width = 2048; fc.height = Math.round(2048 * (fw.top - fw.bottom) / width);
  const g = fc.getContext('2d')!, FH = fc.height, step = 2048 / Math.round(width / .14);
  g.fillStyle = '#f2f0ea'; g.fillRect(0, 0, 2048, FH * .55);
  for (let x = 0; x < 2048; x += step) { g.beginPath(); g.moveTo(x, FH * .5); g.lineTo(x + step / 2, FH * .98); g.lineTo(x + step, FH * .5); g.closePath(); g.fill(); }
  g.globalCompositeOperation = 'destination-out';
  for (let x = step / 2; x < 2048; x += step) { g.beginPath(); g.arc(x, FH * .28, step * .22, 0, Math.PI * 2); g.fill(); g.beginPath(); g.arc(x + step / 2, FH * .62, step * .1, 0, Math.PI * 2); g.fill(); }
  world.panel(pt(0, fw.out), pt(width, fw.out), fw.bottom, fw.top, textured(fc, { cutout: true }));

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

  buildGableRoof(world, 'Hong Ye Chen', frame, gableRoof(frame, hongYeChen), {
    tile: '#9b5a45', course: '#86493a', coping: '#d8d5cc', gable: '#efede6', copingHeight: .12, copingWidth: .14,
  });

  for (const r of hongYeChenReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
