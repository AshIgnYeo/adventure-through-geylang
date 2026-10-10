import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { gableRoof, type frontageFrame } from './gable-roof-layout.mjs';
import type { simpleHouseLayout } from './simple-house-layout.mjs';
import { buildGableRoof } from './gable-roof';

type Frame = ReturnType<typeof frontageFrame>;
type Layout = ReturnType<typeof simpleHouseLayout>;
type Panel = { left: number; right: number; bottom: number; top: number; out: number };
export type Draw = (c: CanvasRenderingContext2D, w: number, h: number) => void;

/**
 * Walls of the whole outline (the street wall above the five-foot way), a flat or hipped roof, the
 * layout boxes, and signs drawn by callbacks: board(s), double-faced blade signs and a sloping awning.
 */
export function buildSimpleHouse(world: World, label: string, frame: Frame, poly: Point[], spec: { height: number; ceiling: number; roof?: { type: string; ridge?: number; colour?: string; ridgeDepth?: number; overhang?: number; gable?: string }; colours: { wall: string } }, layout: Layout,
  draw: { boards?: Draw[]; blades?: Draw[]; awning?: string; valance?: Draw } = {}) {
  const { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => { const m = world.mat(colour); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const m = new pc.StandardMaterial(); m.diffuseMap = world.texture(canvas);
    if (glow) { m.emissiveMap = m.diffuseMap; m.emissive = new pc.Color(1, 1, 1); m.emissiveIntensity = glow; }
    m.opacityMap = m.diffuseMap; m.opacityMapChannel = 'a'; m.alphaTest = .5; m.cull = pc.CULLFACE_NONE; m.update(); return m;
  };
  const H = spec.height, wall = material(spec.colours.wall);
  // A gable roof's eaves sit 8 cm above the wall head (gableRoof), so its walls run up to meet them.
  const wallTop = spec.roof?.type === 'gable' ? H + .08 : H;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    world.panel(a, b, front ? spec.ceiling : .13, wallTop, wall);
  }
  const roof = spec.roof ?? { type: 'flat' }, roofMat = material(roof.colour ?? '#9b9993');
  if (roof.type === 'hip') {
    // Hipped roof: the outline at eaves height rising to a ridge line inset from every side.
    const c = poly.reduce((s, p) => [s[0] + p[0] / poly.length, s[1] + p[1] / poly.length], [0, 0]);
    const inner = poly.map(p => [c[0] + (p[0] - c[0]) * .35, c[1] + (p[1] - c[1]) * .35] as Point);
    const v = [...poly.flatMap(p => [p[0], H, p[1]]), ...inner.flatMap(p => [p[0], roof.ridge ?? H + 2, p[1]])], n = poly.length, idx: number[] = [];
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; idx.push(i, j, n + j, i, n + j, n + i); }
    for (let k = 1; k < n - 1; k++) idx.push(n, n + k, n + k + 1);
    world.mesh(`${label} hipped roof`, v, v.flatMap((_, i) => i % 3 === 1 ? [] : [v[i] / 3]).slice(0, (v.length / 3) * 2), idx, roofMat);
  } else if (roof.type === 'gable') {
    // Ridge parallel to the street, party walls carried up as gables; the front slope is usually hidden by the parapet.
    const g = gableRoof(frame, { height: H, ridgeHeight: roof.ridge ?? H + 2, ridgeDepth: roof.ridgeDepth ?? .5, eavesOverhang: roof.overhang ?? 0 });
    const tile = roof.colour ?? '#8a5a48', gable = roof.gable ?? spec.colours.wall;
    buildGableRoof(world, label, frame, g, { tile, course: tile, coping: gable, gable, copingHeight: .12, copingWidth: .2 });
  } else {
    world.mesh(`${label} flat roof`, poly.flatMap(p => [p[0], H - .1, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]), poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), roofMat);
  }
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }
  const canvasFor = (s: { w: number; h: number }, base = 1024, fn?: Draw) => {
    const canvas = document.createElement('canvas'); canvas.width = base; canvas.height = Math.max(16, Math.round(base * s.h / s.w));
    fn?.(canvas.getContext('2d')!, canvas.width, canvas.height); return canvas;
  };
  const boards = [layout.board, ...layout.boards].filter(Boolean) as Panel[];
  boards.forEach((s, i) => { const fn = draw.boards?.[i]; if (fn) world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, textured(canvasFor({ w: s.right - s.left, h: s.top - s.bottom }, 1024, fn), .1)); });
  layout.blades.forEach((bl: { u: number; out: number[]; h: number[] }, i: number) => {
    const fn = draw.blades?.[i]; if (!fn) return;
    const m = textured(canvasFor({ w: bl.out[1] - bl.out[0], h: bl.h[1] - bl.h[0] }, 256, fn), .2);
    world.panel(pt(bl.u - .03, bl.out[0]), pt(bl.u - .03, bl.out[1]), bl.h[0], bl.h[1], m);
    world.panel(pt(bl.u + .03, bl.out[1]), pt(bl.u + .03, bl.out[0]), bl.h[0], bl.h[1], m);
    for (const y of [bl.h[0] + .25, bl.h[1] - .25]) { const p = pt(bl.u, bl.out[0] / 2); world.box(`${label} blade bracket`, p[0], y, p[1], .05, .05, bl.out[0] + .02, world.mat('#2a2a2a'), undefined, angle); }
  });
  const aw = layout.awning;
  if (aw && draw.awning) {
    const corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)], ys = [aw.wall, aw.wall, aw.front, aw.front];
    world.mesh(`${label} awning`, corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material(draw.awning));
    if (draw.valance) world.panel(pt(aw.from, aw.depth), pt(aw.to, aw.depth), aw.front - (aw.valance ?? .25), aw.front, textured(canvasFor({ w: aw.to - aw.from, h: aw.valance ?? .25 }, 1024, draw.valance)));
  }
  return { pt, textured };
}

/** Keep the part of each box between `from` and `to` along a frontage, re-based at `from`: one elevation sliced across adjoining footprints. */
export function sliceBoxes<T extends { u: number; w: number }>(boxes: T[], from: number, to: number): T[] {
  return boxes.flatMap(b => {
    const l = Math.max(b.u - b.w / 2, from), r = Math.min(b.u + b.w / 2, to);
    return r - l > .005 ? [{ ...b, u: (l + r) / 2 - from, w: r - l }] : [];
  });
}

