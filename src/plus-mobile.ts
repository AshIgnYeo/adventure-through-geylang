import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { plusMobile, plusMobileFrame, plusMobileLayout, plusMobileReviews } from './plus-mobile-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';

/** April 2024 exterior of No. 22 Lorong 13, using the untouched source outline. */
export function buildPlusMobile(world: World, id: string, poly: Point[]) {
  if (!plusMobile.buildingIds.includes(id)) return false;
  const frame = plusMobileFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const board = (w: number, h: number, draw: (c: CanvasRenderingContext2D, W: number, H: number) => void) => {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.max(64, Math.round(1024 * h / w));
    draw(canvas.getContext('2d')!, 1024, canvas.height); return canvas;
  };
  const layout = plusMobileLayout(width);
  const white = material('#eeede8'), wallTop = plusMobile.height + .08;

  // Party, rear and street walls of the single storey.
  world.panel(frame.a, frame.rearA, 0, wallTop, white);
  world.panel(frame.b, frame.rearB, 0, wallTop, white);
  world.panel(frame.rearA, frame.rearB, 0, wallTop, white);
  world.panel(pt(0), pt(width), 0, wallTop, white);

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Plus Mobile ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Signboard over the left shutter, redrawn with original typography. The email address is omitted.
  const sg = layout.sign, sign = board(sg.right - sg.left, sg.top - sg.bottom, (c, W, H) => {
    c.fillStyle = '#f7f6f1'; c.fillRect(0, 0, W, H);
    c.strokeStyle = '#c9c7bf'; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6);
    c.fillStyle = '#3f7d3a'; c.beginPath(); c.arc(H * .5, H * .5, H * .38, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#e8d34a'; c.beginPath(); c.arc(H * .5, H * .5, H * .22, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#c8272d'; c.textBaseline = 'middle'; c.font = `italic 700 ${H * .5}px Georgia, "Times New Roman", serif`;
    c.fillText('Plus Mobile & Accessories', H * 1.05, H * .42, W - H * 1.3);
    c.fillStyle = '#1d1d1d'; c.font = `700 ${H * .2}px Arial, sans-serif`; c.textAlign = 'right'; c.fillText('No.22', W - 14, H * .8);
  });
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(sign, .05));

  // Third-party SIM advert over the right shutter, kept as a blank red and white panel.
  const ad = layout.advert, advert = board(ad.right - ad.left, ad.top - ad.bottom, (c, W, H) => {
    c.fillStyle = '#f4f3ef'; c.fillRect(0, 0, W, H); c.fillStyle = '#b5242f'; c.fillRect(0, 0, W * .32, H);
    c.strokeStyle = '#8f8f8a'; c.lineWidth = 6; c.strokeRect(3, 3, W - 6, H - 6);
  });
  world.panel(pt(ad.left, ad.out), pt(ad.right, ad.out), ad.bottom, ad.top, textured(advert));

  // Tall blue service board beside the door plate: the Plus Mobile mark over its four services in Chinese.
  const sb = layout.serviceBoard, service = board(sb.right - sb.left, sb.top - sb.bottom, (c, W, H) => {
    c.fillStyle = '#1f2f6b'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#4f9a3b'; c.beginPath(); c.ellipse(W / 2, H * .09, W * .38, H * .06, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#f2e04c'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `italic 700 ${W * .16}px Georgia, serif`; c.fillText('Plus', W / 2, H * .09);
    c.fillStyle = '#f1f1ec'; c.font = `700 ${W * .15}px "PingFang SC", "Heiti SC", sans-serif`;
    ['批发与零售', '手机配件', '维修手机', '手机买卖'].forEach((t, i) => c.fillText(t, W / 2, H * (.62 + i * .09), W * .9));
  });
  world.panel(pt(sb.left, sb.out), pt(sb.right, sb.out), sb.bottom, sb.top, textured(service, .05));
  const pl = layout.plate;
  world.panel(pt(pl.left, pl.out), pt(pl.right, pl.out), pl.bottom, pl.top, world.textMaterial('22', '#f4f4f0', '#181818', 0, (pl.right - pl.left) / (pl.top - pl.bottom)));

  // Corrugated steel canopy, rising slightly towards the lane, on diagonal brackets.
  const cn = layout.canopy, corrugation = board(4, 1, (c, W, H) => {
    c.fillStyle = '#c3c6c2'; c.fillRect(0, 0, W, H);
    for (let x = 0; x < W; x += 16) { c.fillStyle = '#a9aeaa'; c.fillRect(x, 0, 6, H); }
  });
  const corners = [pt(cn.from, 0), pt(cn.to, 0), pt(cn.to, cn.depth), pt(cn.from, cn.depth)];
  const heights = [cn.inner, cn.inner, cn.outer, cn.outer];
  world.mesh('Plus Mobile canopy sheet', corners.flatMap((p, i) => [p[0], heights[i], p[1]]), [0, 0, 6, 0, 6, 1, 0, 1], [0, 1, 2, 0, 2, 3], textured(corrugation));
  for (const br of layout.brackets) {
    const [o0, y0] = br.wall, [o1, y1] = br.beam, mid = pt(br.u, (o0 + o1) / 2);
    world.box('Plus Mobile canopy bracket', mid[0], (y0 + y1) / 2, mid[1], .05, .05, Math.hypot(o1 - o0, y1 - y0), world.mat('#7f8482'), undefined, angle)
      .rotateLocal(-Math.atan2(y1 - y0, o1 - o0) * 180 / Math.PI, 0, 0);
    const tie = pt(br.u, (cn.depth - .06) / 2);
    world.box('Plus Mobile canopy tie', tie[0], (cn.inner + cn.outer) / 2 - .06, tie[1], .03, .03, cn.depth - .06, world.mat('#7f8482'), undefined, angle);
  }

  // Roof: a short tiled front slope with tile courses, a dark low rear roof, white gable
  // walls and the salmon party-wall coping on the No. 24 side only.
  const roof = gableRoof(frame, plusMobile), v = roof.vertices;
  const tile = material('#b8664a'), dark = material('#3d4042'), course = material('#9c5240'), coping = material('#cf8a74');
  const tri = (name: string, idx: number[][], mat: pc.Material) => world.mesh(name, idx.flat().flatMap(i => v[i]), idx.flat().flatMap(i => [v[i][0] / 3, v[i][2] / 3]), idx.flat().map((_, k) => k), mat);
  tri('Plus Mobile tiled front slope', roof.slopes.slice(0, 2), tile);
  tri('Plus Mobile dark rear roof', roof.slopes.slice(2), dark);
  for (const g of roof.gables) world.mesh('Plus Mobile gable wall', g.flat(), [0, 0, 1, 0, .5, 1], [0, 1, 2], white);
  const lerp = (p: number[], q: number[], t: number) => p.map((x, i) => x + (q[i] - x) * t);
  const quad = [0, 0, 1, 0, 1, 1, 0, 1], quadIndices = [0, 1, 2, 0, 2, 3];
  for (let t = .06; t < .97; t += .09) {
    const q = [lerp(v[0], v[2], t), lerp(v[1], v[3], t), lerp(v[1], v[3], t + .025), lerp(v[0], v[2], t + .025)];
    world.mesh('Plus Mobile tile course', q.flatMap(p => [p[0], p[1] + .015, p[2]]), quad, quadIndices, course);
  }
  const ch = .25, cw = .22, shift = (s: number[]) => [s[0] + frame.dx * cw, s[1], s[2] + frame.dz * cw];
  const top = [v[0], v[2], shift(v[2]), shift(v[0])].map(s => [s[0], s[1] + ch, s[2]]);
  world.mesh('Plus Mobile party-wall coping', top.flat(), quad, quadIndices, coping);
  world.mesh('Plus Mobile coping face', [shift(v[0]), shift(v[2]), top[2], top[3]].flat(), quad, quadIndices, coping);

  for (const r of plusMobileReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
