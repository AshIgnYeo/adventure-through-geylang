import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { cico, cicoFrame, cicoLayout, cicoReviews } from './cico-layout.mjs';

/** April 2024 exterior of the Cico Flooring building across Nos. 1–7 Lorong 11. */
export function buildCico(world: World, id: string, poly: Point[]) {
  if (!cico.buildingIds.includes(id)) return false;
  const frame = cicoFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => { const m = world.mat(colour); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  const textured = (canvas: HTMLCanvasElement) => { const m = new pc.StandardMaterial(); m.diffuseMap = world.texture(canvas); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  // Herringbone timber cladding on the street wall, plain render elsewhere.
  const hb = document.createElement('canvas'); hb.width = 1024; hb.height = 256;
  {
    const c = hb.getContext('2d')!; c.fillStyle = '#b77a45'; c.fillRect(0, 0, 1024, 256);
    for (let x = -256; x < 1280; x += 32) for (let y = 0; y < 256; y += 32) {
      c.fillStyle = ((x + y) / 32) % 2 ? '#a96c3b' : '#c4874f';
      c.save(); c.translate(x, y); c.rotate(((x / 32) % 2) ? Math.PI / 4 : -Math.PI / 4); c.fillRect(0, 0, 44, 14); c.restore();
    }
  }
  const timber = textured(hb), wall = material('#e2ddd2');
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    world.panel(a, b, .05, cico.eaves - .1, i === cico.frontEdge ? timber : wall);
  }
  // Two hipped roofs side by side, each over half the frontage, ridges running back from the street.
  const tile = material('#c4673f'), depthDir = [frame.rearA[0] - frame.a[0], frame.rearA[1] - frame.a[1]], D = Math.hypot(depthDir[0], depthDir[1]);
  const back = (p: Point, t: number): Point => [p[0] + depthDir[0] * t / D, p[1] + depthDir[1] * t / D];
  for (const [u0, u1] of [[0, width / 2], [width / 2, width]]) {
    const c0 = pt(u0, .4), c1 = pt(u1, .4), r1 = back(c1, D + .4), r0 = back(c0, D + .4);
    const inset = (u1 - u0) * .35, m0 = back(pt((u0 + u1) / 2, .4), inset), m1 = back(pt((u0 + u1) / 2, .4), D + .4 - inset);
    const v = [c0, c1, r1, r0].flatMap(p => [p[0], cico.eaves, p[1]]).concat([m0, m1].flatMap(p => [p[0], cico.ridge, p[1]]));
    world.mesh('Cico hipped roof', v, Array.from({ length: 12 }, (_, i) => v[Math.floor(i / 2) * 3 + (i % 2 ? 2 : 0)] / 3), [0, 1, 4, 1, 5, 4, 1, 2, 5, 2, 3, 5, 3, 4, 5, 3, 0, 4], tile);
  }
  const layout = cicoLayout(width);
  for (const b of layout.boxes) { const p = pt(b.u, b.out); world.box(`Cico ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle); }
  // Metal canopy over the front, sloping gently to the forecourt.
  const cn = layout.canopy, cs = [pt(cn.from, 0), pt(cn.to, 0), pt(cn.to, cn.depth), pt(cn.from, cn.depth)], ys = [cn.wall, cn.wall, cn.front, cn.front];
  world.mesh('Cico canopy', cs.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#a9aeac'));
  // CICO FLOORING 志高地板 logo, redrawn originally.
  const lg = document.createElement('canvas'); lg.width = 512; lg.height = 384;
  {
    const c = lg.getContext('2d')!; c.clearRect(0, 0, 512, 384); c.strokeStyle = '#1b1a19'; c.lineWidth = 22; c.beginPath(); c.arc(256, 130, 95, .3, Math.PI * 2 - .2); c.stroke();
    c.fillStyle = '#1b1a19'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '900 120px "Kaiti SC", serif'; c.fillText('志', 256, 135);
    c.font = '700 46px "Trebuchet MS", sans-serif'; c.fillText('CICO FLOORING', 256, 275); c.font = '700 38px "Kaiti SC", serif'; c.fillText('志高地板', 330, 330);
  }
  const lm = new pc.StandardMaterial(); lm.diffuseMap = world.texture(lg); lm.opacityMap = lm.diffuseMap; lm.opacityMapChannel = 'a'; lm.alphaTest = .5; lm.cull = pc.CULLFACE_NONE; lm.update();
  world.panel(pt(layout.logo.u - .6, .04), pt(layout.logo.u + .6, .04), layout.logo.h - .55, layout.logo.h + .35, lm);
  for (const r of cicoReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
