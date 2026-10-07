import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { fokWaiKee, fokWaiKeeFrame, fokWaiKeeLayout, fokWaiKeeReviews } from './fok-wai-kee-layout.mjs';

/** June 2024 exterior of No. 104 Sims Avenue, using the untouched source outline. */
export function buildFokWaiKee(world: World, id: string, poly: Point[]) {
  if (!fokWaiKee.buildingIds.includes(id)) return false;
  const frame = fokWaiKeeFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = fokWaiKee.height, white = material('#ecebe5');

  // The whole source outline is walled to the main parapet; the street wall starts above the five-foot way.
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    world.panel(a, b, front ? 3.1 : .13, H, white);
  }
  world.mesh('Fok Wai Kee flat roof', poly.flatMap(p => [p[0], H - .2, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]),
    poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#a7a59e'));

  const layout = fokWaiKeeLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`Fok Wai Kee ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  // Dark sloping canopy over the five-foot way.
  const cn = layout.canopy;
  const corners = [[cn.left, cn.back, cn.top], [cn.right, cn.back, cn.top], [cn.right, cn.front, cn.bottom], [cn.left, cn.front, cn.bottom]];
  world.mesh('Fok Wai Kee canopy', corners.flatMap(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; }), [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#5d5049'));
  const edge = pt(width / 2, cn.front);
  world.box('Fok Wai Kee canopy edge', edge[0], cn.bottom - .05, edge[1], cn.right - cn.left, .12, .05, world.mat('#7c736a'), undefined, angle);

  // Cream signboard: red 霍惠記銅鐵 over black FOK WAI KEE HARDWARE and № 104, redrawn originally.
  const sg = layout.sign, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (sg.top - sg.bottom) / (sg.right - sg.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#e9dc9c'; c.fillRect(0, 0, 2048, h); c.strokeStyle = '#a89155'; c.lineWidth = 10; c.strokeRect(5, 5, 2038, h - 10);
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillStyle = '#c0292a'; c.font = `700 ${h * .5}px "Kaiti SC", "STKaiti", serif`; c.fillText('霍  惠  記  銅  鐵', 1024, h * .32, 1900);
  c.fillStyle = '#1c1b1a'; c.font = `900 ${h * .24}px "Arial Black", sans-serif`; c.fillText('FOK WAI KEE HARDWARE', 1024, h * .72, 1850);
  c.font = `700 ${h * .1}px sans-serif`; c.fillText('№ 104', 1024, h * .9);
  const sign = new pc.StandardMaterial(); sign.diffuseMap = world.texture(canvas); sign.cull = pc.CULLFACE_NONE; sign.update();
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, sign);

  for (const r of fokWaiKeeReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
