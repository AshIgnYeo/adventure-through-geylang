import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { zhengLi, zhengLiFrame, zhengLiLayout, zhengLiReviews } from './zheng-li-layout.mjs';

/** April 2024 exterior of No. 35 Lorong 11, on its re-spaced footprint. */
export function buildZhengLi(world: World, id: string, poly: Point[]) {
  if (!zhengLi.buildingIds.includes(id)) return false;
  const frame = zhengLiFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => { const m = world.mat(colour); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const m = new pc.StandardMaterial(); m.diffuseMap = world.texture(canvas);
    if (glow) { m.emissiveMap = m.diffuseMap; m.emissive = new pc.Color(1, 1, 1); m.emissiveIntensity = glow; }
    m.cull = pc.CULLFACE_NONE; m.update(); return m;
  };
  const H = zhengLi.height, white = material('#ecebe6'), layout = zhengLiLayout(width);
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    if (!front) world.panel(a, b, .13, H, white);
  }
  world.mesh('Zheng Li flat roof', poly.flatMap(p => [p[0], H - .15, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]), poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#9a9893'));
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Zheng Li ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }
  // Blue scalloped awning with a pale lettering band, simplified from the beer advertising.
  const aw = layout.awning, corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)], ys = [aw.top, aw.top, aw.bottom, aw.bottom];
  world.mesh('Zheng Li awning', corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#1f3557'));
  const val = document.createElement('canvas'); val.width = 1024; val.height = 64;
  { const c = val.getContext('2d')!; c.fillStyle = '#1f3557'; c.fillRect(0, 0, 1024, 64); c.fillStyle = '#e6e2d6'; for (const x of [.15, .65]) c.fillRect(1024 * x, 22, 1024 * .2, 10); }
  world.panel(pt(aw.from, aw.depth), pt(aw.to, aw.depth), aw.bottom - .25, aw.bottom, textured(val));
  for (const u of layout.lanterns) { const p = pt(u, .35); world.cylinder('Zheng Li lantern', p[0], 2.75, p[1], .5, .45, world.mat('#c32d27', .25)); }
  // Tall navy blade sign: gold 正利心厨, ZHENG LI HEARTY KITCHEN and 东海人家, on both faces.
  const bl = layout.blade, bw = bl.out[1] - bl.out[0], bh = bl.h[1] - bl.h[0], canvas = document.createElement('canvas');
  canvas.width = 256; canvas.height = Math.round(256 * bh / bw);
  {
    const c = canvas.getContext('2d')!, w = canvas.width, h = canvas.height;
    c.fillStyle = '#c4c7c9'; c.fillRect(0, 0, w, h); c.fillStyle = '#b22a2a'; c.fillRect(8, 8, w - 16, h - 16); c.fillStyle = '#1d2147'; c.fillRect(20, 20, w - 40, h - 40);
    c.fillStyle = '#e8c24d'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${w * .58}px "Kaiti SC", "STKaiti", serif`;
    [...'正利心厨'].forEach((ch, i) => c.fillText(ch, w / 2, h * (.1 + i * .16)));
    c.font = `700 ${w * .13}px sans-serif`; ['ZHENG LI', 'HEARTY', 'KITCHEN'].forEach((t, i) => c.fillText(t, w / 2, h * (.72 + i * .055)));
    c.font = `700 ${w * .17}px serif`; c.fillText('东 海 人 家', w / 2, h * .92, w * .8);
  }
  const bm = textured(canvas, .2);
  // Each face is wound so its lettering reads correctly from its own side.
  world.panel(pt(bl.u - .03, bl.out[0]), pt(bl.u - .03, bl.out[1]), bl.h[0], bl.h[1], bm);
  world.panel(pt(bl.u + .03, bl.out[1]), pt(bl.u + .03, bl.out[0]), bl.h[0], bl.h[1], bm);
  for (const y of [bl.h[0] + .3, bl.h[1] - .3]) { const p = pt(bl.u, bl.out[0] / 2); world.box('Zheng Li blade bracket', p[0], y, p[1], .05, .05, bl.out[0] + .02, world.mat('#2a2a2a'), undefined, angle); }
  for (const r of zhengLiReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
