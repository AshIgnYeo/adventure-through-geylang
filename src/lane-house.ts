import type { World, Point } from './world';
import * as pc from 'playcanvas';
import { laneFrame, laneLayout, laneReviews, laneSides, laneUpper } from './lane-house-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

export const canvasFor = (w: number, h: number, base: number, fn: Draw) => {
  const canvas = document.createElement('canvas'); canvas.width = base; canvas.height = Math.max(16, Math.round(base * h / w));
  fn(canvas.getContext('2d')!, canvas.width, canvas.height); return canvas;
};
export const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
export const sans = '"Helvetica Neue", Arial, sans-serif', hei = '"PingFang SC", "Heiti SC", sans-serif', kai = '"Kaiti SC", "STKaiti", serif';
export type Draws = Record<string, { boards?: Draw[]; blades?: Draw[] }>;

/** One lane house: its front elevation, side faces, upper volumes and review starts. Signs are drawn only where `draws` has them. */
export function buildLaneHouse(world: World, place: any, poly: Point[], draws: Draws) {
  const frame = laneFrame(poly, place);
  const { textured } = buildSimpleHouse(world, place.name, frame, poly, place, laneLayout(place, frame.width) as any, draws[place.id] ?? {});
  for (const side of laneSides(place, poly) as any[]) {
    for (const b of side.boxes) {
      const p = side.frame.point(b.u, b.out) as Point;
      world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, side.frame.angle);
    }
    const sd = draws[`${place.id}@${side.edge}`] ?? {}, pt = (u: number, out: number) => side.frame.point(u, out) as Point;
    side.boards.forEach((s: any, i: number) => {
      const fn = sd.boards?.[i]; if (!fn) return;
      world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, textured(canvasFor(s.right - s.left, s.top - s.bottom, 1024, fn), .1));
    });
    side.blades.forEach((bl: any, i: number) => {
      const fn = sd.blades?.[i]; if (!fn) return;
      const m = textured(canvasFor(bl.out[1] - bl.out[0], bl.h[1] - bl.h[0], 256, fn), .2);
      world.panel(pt(bl.u - .03, bl.out[0]), pt(bl.u - .03, bl.out[1]), bl.h[0], bl.h[1], m);
      world.panel(pt(bl.u + .03, bl.out[1]), pt(bl.u + .03, bl.out[0]), bl.h[0], bl.h[1], m);
    });
  }
  // Upper volumes: walls round their outline, a flat roof (or a hipped one up to `ridge`), and their fittings on the front.
  for (const up of laneUpper(place, frame) as any[]) {
    const wall = world.mat(up.colour); wall.cull = pc.CULLFACE_NONE; wall.update();
    const pts = up.points as Point[];
    for (let i = 0; i < pts.length; i++) world.panel(pts[i], pts[(i + 1) % pts.length], up.from, up.to, wall);
    const roof = world.mat(up.roof); roof.cull = pc.CULLFACE_NONE; roof.update();
    if (up.ridge) {
      // As buildSimpleHouse's hipped roof: the outline at eaves height rising to a ridge outline inset from every side.
      const c = pts.reduce((s, p) => [s[0] + p[0] / pts.length, s[1] + p[1] / pts.length], [0, 0]), n = pts.length;
      const inner = pts.map(p => [c[0] + (p[0] - c[0]) * .35, c[1] + (p[1] - c[1]) * .35]);
      const v = [...pts.flatMap(p => [p[0], up.to, p[1]]), ...inner.flatMap(p => [p[0], up.ridge, p[1]])], idx: number[] = [];
      for (let i = 0; i < n; i++) { const j = (i + 1) % n; idx.push(i, j, n + j, i, n + j, n + i); }
      for (let k = 1; k < n - 1; k++) idx.push(n, n + k, n + k + 1);
      world.mesh(`${place.name} upper hipped roof`, v, v.flatMap((_, i) => i % 3 === 1 ? [] : [v[i] / 3]).slice(0, (v.length / 3) * 2), idx, roof);
    } else {
      const indices: number[] = []; for (let k = 1; k < pts.length - 1; k++) indices.push(0, k, k + 1);
      world.mesh(`${place.name} upper roof`, pts.flatMap(p => [p[0], up.to, p[1]]), pts.flatMap(() => [0, 0]), indices, roof);
    }
    for (const b of up.boxes) {
      const p = frame.point(b.u, b.out) as Point;
      world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, frame.angle);
    }
  }
  for (const r of laneReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
}
