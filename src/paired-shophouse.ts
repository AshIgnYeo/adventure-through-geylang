import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { frontageFrame } from './gable-roof-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import type { pairedShophouseLayout } from './paired-shophouse-layout.mjs';
import { buildGableRoof, type RoofFinish } from './gable-roof';

type Frame = ReturnType<typeof frontageFrame>;
type Layout = ReturnType<typeof pairedShophouseLayout>;
type Spec = { height: number; ridgeHeight: number; ridgeDepth: number; eavesOverhang: number };

/** Walls, fittings, arched windows, plaster relief and tiled roof shared by Nos. 287 and 289. */
// Orange clay tiles with raised copings, as triangulated on Nos. 287 and 289.
const orangeTiles: RoofFinish = {
  tile: '#c96f45', course: '#ad5a39', coping: '#a64f3a', gable: '#f1efe8',
  copingHeight: .30, copingWidth: .22, frontCap: { length: .5, height: .28 },
};

export function buildPairedShophouse(world: World, label: string, frame: Frame, layout: Layout, spec: Spec, finish = orangeTiles) {
  const { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const wallTop = spec.height + .08, white = layout.palette.wall, tone = layout.palette;

  // Party and rear walls close the volume; the street wall starts above the five-foot way.
  world.panel(frame.a, frame.rearA, .13, wallTop, material(white));
  world.panel(frame.b, frame.rearB, .13, wallTop, material(white));
  world.panel(frame.rearA, frame.rearB, .13, wallTop, material(white));
  world.panel(pt(0), pt(width), 3.29, wallTop, material(white));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }
  const pipe = layout.downpipeOffset;
  if (pipe) {
    const [o0, y0] = pipe.from, [o1, y1] = pipe.to, mid = pt(pipe.u, (o0 + o1) / 2);
    world.box(`${label} downpipe offset`, mid[0], (y0 + y1) / 2, mid[1], .07, Math.hypot(o1 - o0, y1 - y0), .07, world.mat('#3a8a6a'), undefined, angle)
      .rotateLocal(Math.atan2(o1 - o0, y1 - y0) * 180 / Math.PI, 0, 0);
  }

  // Flat façade shapes in (u, y), placed at a fixed distance from the wall.
  const shape = (name: string, points: number[][], out: number, mat: pc.Material, indices: number[]) => {
    const positions = points.flatMap(([u, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; });
    world.mesh(`${label} ${name}`, positions, points.flatMap(([u, y]) => [u, y]), indices, mat);
  };
  // Segmental arches: red frame, white archivolt and its shadow line, then the
  // dark fanlight with white glazing bars clipped to the curve.
  for (const arch of layout.arches) {
    const half = arch.span / 2, rise = arch.apex - arch.springing, R = (half * half + rise * rise) / (2 * rise);
    const cy = arch.apex - R, phi0 = Math.asin(half / R), steps = 20;
    const at = (r: number, phi: number) => [arch.u + r * Math.sin(phi), cy + r * Math.cos(phi)];
    const arc = (r: number) => Array.from({ length: steps + 1 }, (_, i) => at(r, -phi0 + 2 * phi0 * i / steps));
    for (const [d0, d1, colour, out] of arch.bands as [number, number, string, number][]) {
      const inner = arc(R + d0), outer = arc(R + d1), indices: number[] = [];
      for (let i = 1; i <= steps; i++) { const k = i * 2; indices.push(k - 2, k - 1, k + 1, k - 2, k + 1, k); }
      shape('arch band', inner.flatMap((p, i) => [p, outer[i]]), out, material(colour), indices);
    }
    const fan = [[arch.u, arch.springing], ...arc(R)];
    shape('fanlight', fan, .02, material(arch.fan), fan.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]));
    if (arch.fret) {
      // White fretwork: a sunburst of spokes and lattice rings, cut out over the dark fanlight.
      const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * rise / arch.span);
      const c = canvas.getContext('2d')!, k = 512 / arch.span, ox = 256, oy = canvas.height + (R - rise) * k;
      c.save(); c.beginPath(); c.arc(ox, oy, R * k - 2, 0, Math.PI * 2); c.clip();
      c.strokeStyle = '#f4f1ec'; c.lineCap = 'round';
      c.lineWidth = 7; for (let i = 0; i <= 14; i++) { const a = Math.PI * (1 + i / 14); c.beginPath(); c.moveTo(ox, oy); c.lineTo(ox + Math.cos(a) * 400, oy + Math.sin(a) * 400); c.stroke(); }
      for (const r of [.45, .7, .9]) { c.lineWidth = r > .8 ? 9 : 6; c.beginPath(); c.arc(ox, oy, R * k * r, Math.PI, Math.PI * 2); c.stroke(); }
      for (let i = 0; i < 14; i++) { const a = Math.PI * (1 + (i + .5) / 14); c.beginPath(); c.arc(ox + Math.cos(a) * R * k * .58, oy + Math.sin(a) * R * k * .58, 9, 0, Math.PI * 2); c.stroke(); }
      c.restore();
      const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas); mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a';
      mat.alphaTest = .5; mat.cull = pc.CULLFACE_NONE; mat.update();
      world.panel(pt(arch.u - half, .028), pt(arch.u + half, .028), arch.springing, arch.apex, mat);
    }
    if (arch.bars) for (let i = 1; i < 6; i++) {
      const u = arch.u - half + arch.span * i / 6, top = cy + Math.sqrt(R * R - (u - arch.u) ** 2);
      const p = pt(u, .03);
      world.box(`${label} fanlight bar`, p[0], (arch.springing + top) / 2, p[1], .022, top - arch.springing - .02, .02, world.mat('#f3f2ec'), undefined, angle);
    }
  }

  // White relief, drawn as raised plaster: highlight above, shadow below.
  const relief = (c: CanvasRenderingContext2D, draw: () => void, line: number) => {
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.save(); c.translate(-3, -3); c.strokeStyle = tone.light; c.lineWidth = line; draw(); c.stroke(); c.restore();
    c.save(); c.translate(4, 5); c.strokeStyle = tone.dark; c.lineWidth = line * 1.1; draw(); c.stroke(); c.restore();
    c.strokeStyle = tone.mid; c.lineWidth = line * .85; draw(); c.stroke();
  };
  // Cartouches under the windows: an elongated octagon with mirrored leaf scrolls.
  for (const ca of layout.cartouches) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * (ca.top - ca.bottom) / ca.w);
    const c = canvas.getContext('2d')!, w = 512, h = canvas.height;
    c.fillStyle = white; c.fillRect(0, 0, w, h);
    const octagon = () => { c.beginPath(); c.moveTo(70, 14); c.lineTo(w - 70, 14); c.lineTo(w - 14, h / 2); c.lineTo(w - 70, h - 14); c.lineTo(70, h - 14); c.lineTo(14, h / 2); c.closePath(); };
    relief(c, octagon, 10);
    for (const s of [-1, 1]) {
      const scroll = () => {
        c.beginPath(); c.moveTo(w / 2 + s * 20, h / 2);
        c.bezierCurveTo(w / 2 + s * 80, h * .15, w / 2 + s * 170, h * .2, w / 2 + s * 190, h / 2);
        c.bezierCurveTo(w / 2 + s * 200, h * .7, w / 2 + s * 150, h * .75, w / 2 + s * 135, h * .58);
      };
      relief(c, scroll, 9);
      for (const t of [.35, .6, .85]) {
        const leaf = () => { c.beginPath(); c.ellipse(w / 2 + s * (40 + 150 * t), h * (.32 + .1 * t), 20, 9, s * .6, 0, Math.PI * 2); };
        relief(c, leaf, 6);
      }
    }
    relief(c, () => { c.beginPath(); c.arc(w / 2, h / 2, 18, 0, Math.PI * 2); }, 8);
    world.panel(pt(ca.u - ca.w / 2, ca.out), pt(ca.u + ca.w / 2, ca.out), ca.bottom, ca.top, textured(canvas));
  }
  // Frieze of running acanthus scrolls under the eaves, an original pattern.
  const fz = layout.frieze, friezeCanvas = document.createElement('canvas');
  friezeCanvas.width = 2048; friezeCanvas.height = Math.round(2048 * (fz.top - fz.bottom) / width);
  const f = friezeCanvas.getContext('2d')!, H = friezeCanvas.height, step = 2048 / 9;
  f.fillStyle = white; f.fillRect(0, 0, 2048, H);
  for (let i = 0; i < 9; i++) {
    const x = step * i, dir = i % 2 ? -1 : 1;
    relief(f, () => {
      f.beginPath(); f.moveTo(x, H * (.5 + .2 * dir));
      f.bezierCurveTo(x + step * .3, H * (.5 - .45 * dir), x + step * .7, H * (.5 + .45 * dir), x + step, H * (.5 - .2 * dir));
    }, 7);
    relief(f, () => { f.beginPath(); f.arc(x + step * .5, H * (.5 - .12 * dir), H * .16, 0, Math.PI * 1.6); }, 6);
  }
  world.panel(pt(0, fz.out), pt(width, fz.out), fz.bottom, fz.top, textured(friezeCanvas));

  // Orange tiled gable roof; its raised copings end in blocks above the gutter.
  buildGableRoof(world, label, frame, gableRoof(frame, spec), finish);

  return { pt, textured };
}
