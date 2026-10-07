import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { frontageFrame } from './gable-roof-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';
import { row13, type row13Layout } from './row13-layout.mjs';

type Frame = ReturnType<typeof frontageFrame>;
type Layout = ReturnType<typeof row13Layout>;

/** Walls, upper storey, tile panels, plaster reliefs, fretwork eaves and roof shared by the row. */
export function buildRow13House(world: World, label: string, frame: Frame, layout: Layout) {
  const { width, angle } = frame;
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
  const white = material('#efede6'), wallTop = row13.height + .08;
  world.panel(frame.a, frame.rearA, .13, wallTop, white);
  world.panel(frame.b, frame.rearB, .13, wallTop, white);
  world.panel(frame.rearA, frame.rearB, .13, wallTop, white);
  world.panel(pt(0), pt(width), 3.28, wallTop, white);

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
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

  // Plaster relief panels: a raised lotus spray, drawn as light and shadow on white.
  for (const rp of layout.reliefs) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * (rp.top - rp.bottom) / rp.w);
    const c = canvas.getContext('2d')!, h = canvas.height;
    c.fillStyle = '#efede6'; c.fillRect(0, 0, 512, h);
    const spray = (dx: number, dy: number, colour: string) => {
      c.strokeStyle = colour; c.lineWidth = 9; c.lineCap = 'round';
      c.beginPath(); c.moveTo(256 + dx, h * .9 + dy); c.lineTo(256 + dx, h * .35 + dy); c.stroke();
      for (const s of [-1, 1]) { c.beginPath(); c.moveTo(256 + dx, h * .7 + dy); c.quadraticCurveTo(256 + s * 90 + dx, h * .6 + dy, 256 + s * 120 + dx, h * .3 + dy); c.stroke(); }
      c.beginPath(); c.ellipse(256 + dx, h * .28 + dy, 34, 22, 0, 0, Math.PI * 2); c.stroke();
    };
    spray(5, 6, '#b9b5aa'); spray(-3, -3, '#ffffff'); spray(0, 0, '#e4e1d8');
    c.strokeStyle = '#d6d2c6'; c.lineWidth = 10; c.strokeRect(5, 5, 502, h - 10);
    world.panel(pt(rp.u - rp.w / 2, rp.out), pt(rp.u + rp.w / 2, rp.out), rp.bottom, rp.top, textured(canvas));
  }
  buildGableRoof(world, label, frame, gableRoof(frame, row13), {
    tile: '#9b5a45', course: '#86493a', coping: '#d8d5cc', gable: '#efede6', copingHeight: .12, copingWidth: .14,
  });

  return { pt, textured };
}
