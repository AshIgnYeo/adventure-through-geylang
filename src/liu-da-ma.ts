import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { liuDaMa, liuDaMaFrame, liuDaMaLayout, liuDaMaReviews } from './liu-da-ma-layout.mjs';

/** April 2024 exterior of No. 26 Lorong 11, using the untouched source outline. */
export function buildLiuDaMa(world: World, id: string, poly: Point[]) {
  if (!liuDaMa.buildingIds.includes(id)) return false;
  const frame = liuDaMaFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const layout = liuDaMaLayout(width);
  const salmon = material('#d9786a'), H = liuDaMa.height;

  // Street wall above the five-foot way, party and rear walls, and the dark low roof behind the parapet.
  world.panel(pt(0), pt(width), 3.3, H, salmon);
  world.panel(frame.a, frame.rearA, 0, H, salmon);
  world.panel(frame.b, frame.rearB, 0, H, salmon);
  world.panel(frame.rearA, frame.rearB, 0, H, salmon);
  const roof = [frame.a, frame.b, frame.rearB, frame.rearA];
  world.mesh('Liu Da Ma estimated dark roof', roof.flatMap(p => [p[0], liuDaMa.roofHeight, p[1]]), roof.flatMap(p => [p[0] / 3, p[1] / 3]), [0, 1, 2, 0, 2, 3], material('#45474a'));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Liu Da Ma ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Sloping sheets: the corrugated canopy over the upper windows and the red awning over the five-foot way.
  const sheet = (name: string, s: { from: number; to: number; wall: number; front: number; depth: number }, mat: pc.Material) => {
    const c = [pt(s.from, 0), pt(s.to, 0), pt(s.to, s.depth), pt(s.from, s.depth)], ys = [s.wall, s.wall, s.front, s.front];
    world.mesh(`Liu Da Ma ${name}`, c.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 6, 0, 6, 1, 0, 1], [0, 1, 2, 0, 2, 3], mat);
  };
  const corrugation = document.createElement('canvas'); corrugation.width = 256; corrugation.height = 64;
  {
    const c = corrugation.getContext('2d')!; c.fillStyle = '#8f9493'; c.fillRect(0, 0, 256, 64);
    for (let x = 0; x < 256; x += 16) { c.fillStyle = '#767b7a'; c.fillRect(x, 0, 6, 64); }
  }
  sheet('upper canopy', layout.canopy, textured(corrugation));
  for (const u of [.3, width / 2, width - .3]) {
    const c = layout.canopy, mid = pt(u, c.depth / 2);
    world.box('Liu Da Ma canopy bracket', mid[0], c.front - .25, mid[1], .04, .04, c.depth, world.mat('#3d3f3e'), undefined, angle).rotateLocal(-25, 0, 0);
  }
  const aw = layout.awning;
  sheet('red awning', aw, material('#b8333a'));
  const bar = pt(width / 2, aw.depth);
  world.box('Liu Da Ma awning bar', bar[0], aw.front, bar[1], aw.to - aw.from, .07, .07, world.mat('#f1f1ec'), undefined, angle);
  // Scalloped valance hanging from the bar.
  const valance = document.createElement('canvas'); valance.width = 1024; valance.height = 64;
  {
    const c = valance.getContext('2d')!, n = Math.round(width / .22), s = 1024 / n;
    c.fillStyle = '#b8333a'; c.fillRect(0, 0, 1024, 40);
    for (let i = 0; i < n; i++) { c.beginPath(); c.arc(s * (i + .5), 40, s / 2, 0, Math.PI); c.fill(); }
  }
  const vm = textured(valance); vm.opacityMap = vm.diffuseMap; vm.opacityMapChannel = 'a'; vm.alphaTest = .5; vm.update();
  world.panel(pt(aw.from, aw.depth + .03), pt(aw.to, aw.depth + .03), aw.front - aw.valance, aw.front - .02, vm);

  // Tall blade sign on the No. 28 party line: bulb-studded 刘大妈烧烤吧 on a dark navy board, on both faces.
  const bl = layout.blade, bw = bl.out[1] - bl.out[0], bh = bl.h[1] - bl.h[0];
  const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = Math.round(256 * bh / bw);
  {
    const c = canvas.getContext('2d')!, W = canvas.width, Hh = canvas.height;
    c.fillStyle = '#1d2740'; c.fillRect(0, 0, W, Hh);
    c.strokeStyle = '#2e3a5c'; c.lineWidth = 10; c.strokeRect(5, 5, W - 10, Hh - 10);
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${W * .66}px "Heiti SC", "PingFang SC", sans-serif`;
    [...'刘大妈烧烤吧'].forEach((ch, i) => {
      const y = Hh * (.09 + i * .164);
      c.fillStyle = '#d9d4c3'; c.fillText(ch, W / 2, y);
      // Bulbs studding each character.
      c.save(); c.globalCompositeOperation = 'source-atop';
      for (let x = 0; x < W; x += 14) for (let yy = y - W * .4; yy < y + W * .4; yy += 14) { c.fillStyle = 'rgba(255,255,240,.9)'; c.beginPath(); c.arc(x + 7, yy, 4, 0, Math.PI * 2); c.fill(); }
      c.restore();
    });
  }
  const bladeMat = textured(canvas, .35);
  world.panel(pt(bl.u - .02, bl.out[1]), pt(bl.u - .02, bl.out[0]), bl.h[0], bl.h[1], bladeMat);
  world.panel(pt(bl.u + .02, bl.out[0]), pt(bl.u + .02, bl.out[1]), bl.h[0], bl.h[1], bladeMat);
  for (const y of [bl.h[0] + .3, (bl.h[0] + bl.h[1]) / 2, bl.h[1] - .3]) {
    const p = pt(bl.u, bl.out[0] / 2);
    world.box('Liu Da Ma blade sign arm', p[0], y, p[1], .05, .05, bl.out[0] + .02, world.mat('#2a2a2a'), undefined, angle);
  }

  for (const r of liuDaMaReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
