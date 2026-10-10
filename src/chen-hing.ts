import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { chenHing, chenHingFrame, chenHingFrontBlock, chenHingLayout, chenHingReviews, elevation } from './chen-hing-layout.mjs';

/** June 2024 exterior of No. 241 Geylang Road, using the untouched source outline. */
export function buildChenHing(world: World, id: string, poly: Point[]) {
  if (!chenHing.buildingIds.includes(id)) return false;
  const frame = chenHingFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5;
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = chenHing.height, RH = chenHing.rearHeight, E = elevation, tile = material('#a9aaa5'), rear = material('#d7d5c5');
  const layout = chenHingLayout(width);

  // The rear wing keeps the back-lane height; the street wall starts above the five-foot way.
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    world.panel(a, b, front ? E.ceiling : .13, front ? H : RH, front ? tile : rear);
  }
  world.mesh('Chen Hing rear roof', poly.flatMap(p => [p[0], RH - .05, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]),
    poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#8d8b85'));
  // Three-storey front block, clipped to the slanted west party wall at its estimated depth.
  const block = chenHingFrontBlock(frame) as Point[];
  for (let i = 0; i < 4; i++) if (i !== 0) world.panel(block[i], block[(i + 1) % 4], i === 2 ? RH - .1 : .13, H, tile);
  world.mesh('Chen Hing front roof', block.flatMap(p => [p[0], H - .05, p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#8d8b85'));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Chen Hing ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Raised gold lettering, redrawn originally on transparent panels.
  const lettering = (s: { left: number; right: number; bottom: number; top: number; out: number }, text: string, font: string, spread: boolean) => {
    const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = Math.round(2048 * (s.top - s.bottom) / (s.right - s.left));
    const c = canvas.getContext('2d')!, w = canvas.width, h = canvas.height, chars = [...text];
    c.fillStyle = '#c9a659'; c.strokeStyle = '#7a6230'; c.lineWidth = h * .03; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `${font} ${h * .9}px ${spread ? '"Songti SC", "STSong", serif' : '"DIN Condensed", "Arial Narrow", sans-serif'}`;
    chars.forEach((ch, i) => { const x = w * (i + .5) / chars.length; c.strokeText(ch, x, h * .53); c.fillText(ch, x, h * .53); });
    world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, textured(canvas));
  };
  lettering(layout.chinese, '增興貿易私人有限公司', '900', true);
  lettering(layout.english, 'CHEN HING TRADING PTE. LTD.', '700', false);

  // Red awning with a scalloped valance over the stall.
  const aw = layout.awning;
  const corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)], ys = [aw.wall, aw.wall, aw.front, aw.front];
  world.mesh('Chen Hing awning', corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 6, 0, 6, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#9e2e34'));
  const valance = document.createElement('canvas'); valance.width = 1024; valance.height = 64;
  {
    const c = valance.getContext('2d')!, n = Math.round((aw.to - aw.from) / .3), s = 1024 / n;
    c.fillStyle = '#9e2e34'; c.fillRect(0, 0, 1024, 40);
    for (let i = 0; i < n; i++) { c.beginPath(); c.arc(s * (i + .5), 40, s / 2, 0, Math.PI); c.fill(); }
  }
  world.panel(pt(aw.from, aw.depth), pt(aw.to, aw.depth), aw.front - aw.valance, aw.front, textured(valance));

  for (const r of chenHingReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
