import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { muhammadiyah, muhammadiyahFrame, muhammadiyahLayout, muhammadiyahReviews, elevation } from './muhammadiyah-layout.mjs';

/** April 2024 exterior of No. 17 Lorong 13, using the untouched source outline. */
export function buildMuhammadiyah(world: World, id: string, poly: Point[]) {
  if (!muhammadiyah.buildingIds.includes(id)) return false;
  const frame = muhammadiyahFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const E = elevation, H = muhammadiyah.height, f = E.face, white = material('#eeece4');

  // The tower volume: the screened front stands back from the source front line;
  // the sides and rear follow the untouched outline.
  const mix = (p: Point, q: Point, t: number) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t] as Point;
  const side = (front: Point, rear: Point) => mix(front, rear, -f / Math.hypot(rear[0] - front[0], rear[1] - front[1]));
  const fa = side(frame.a, frame.rearA), fb = side(frame.b, frame.rearB);
  world.panel(pt(0, f), pt(width, f), E.fascia[1], H, material('#5fb3a0'));
  world.panel(fa, frame.rearA, 0, H, white);
  world.panel(fb, frame.rearB, 0, H, white);
  world.panel(frame.rearA, frame.rearB, 0, H, white);
  const roof = [fa, fb, frame.rearB, frame.rearA];
  world.mesh('Muhammadiyah flat roof', roof.flatMap(p => [p[0], H - .05, p[1]]), roof.flatMap(p => [p[0] / 3, p[1] / 3]), [0, 1, 2, 0, 2, 3], material('#9aa39e'));
  // Grilled windows on the side elevations, visible above the lower neighbours.
  for (const [front, rear] of [[fa, frame.rearA], [fb, frame.rearB]] as const) {
    for (const s of E.slabs.slice(0, -1)) for (const t of [.25, .6]) {
      const c = mix(front, rear, t), d = mix(front, rear, t + .08);
      world.panel(c, d, s + .7, s + 2.5, material('#4a4440'));
    }
  }

  const layout = muhammadiyahLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Muhammadiyah ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Geometric lattice panels in the left column: an original eight-pointed star pattern, cut out over dark glass.
  const lt = layout.lattice, lw = lt.u[1] - lt.u[0];
  const latticeCanvas = document.createElement('canvas'); latticeCanvas.width = 256; latticeCanvas.height = Math.round(256 * 1.59 / lw);
  {
    const c = latticeCanvas.getContext('2d')!, W = 256, h = latticeCanvas.height;
    c.strokeStyle = '#3f8f78'; c.lineWidth = 7; c.lineJoin = 'round';
    const n = 3, s = W / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < Math.ceil(h / s); j++) {
      const x = s * (i + .5), y = s * (j + .5), r = s * .42;
      for (const rot of [0, Math.PI / 4]) {
        c.beginPath();
        for (let k = 0; k < 4; k++) { const a = rot + k * Math.PI / 2; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
        c.closePath(); c.stroke();
      }
      c.strokeRect(i * s + 3, j * s + 3, s - 6, s - 6);
    }
  }
  const latticeMat = textured(latticeCanvas, 0, true);
  for (let j = 0; j < lt.bars.length - 1; j++) {
    world.panel(pt(lt.u[0] + .04, lt.out - .02), pt(lt.u[1] - .04, lt.out - .02), lt.bars[j] + .06, lt.bars[j + 1] - .06, material('#2c3a3d'));
    world.panel(pt(lt.u[0] + .04, lt.out), pt(lt.u[1] - .04, lt.out), lt.bars[j] + .06, lt.bars[j + 1] - .06, latticeMat);
  }

  // Top band of teal glass panels with a rayed emblem and MUHAMMADIYAH, redrawn originally.
  const bd = layout.band, band = document.createElement('canvas');
  band.width = 2048; band.height = Math.round(2048 * (bd.top - bd.bottom) / (bd.right - bd.left));
  {
    const c = band.getContext('2d')!, W = 2048, h = band.height;
    c.fillStyle = '#5aa595'; c.fillRect(0, 0, W, h);
    c.strokeStyle = 'rgba(30,70,60,.55)'; c.lineWidth = 4;
    for (let x = 0; x < W; x += W / 7) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
    c.beginPath(); c.moveTo(0, h * .62); c.lineTo(W, h * .62); c.stroke();
    const cx = W * .27, cy = h * .32, R = h * .17;
    c.fillStyle = '#f2f2ec';
    for (let k = 0; k < 16; k++) { const a = k * Math.PI / 8; c.beginPath(); c.moveTo(cx + Math.cos(a) * R * .6, cy + Math.sin(a) * R * .6); c.lineTo(cx + Math.cos(a + .1) * R * 1.35, cy + Math.sin(a + .1) * R * 1.35); c.lineTo(cx + Math.cos(a - .1) * R * 1.35, cy + Math.sin(a - .1) * R * 1.35); c.fill(); }
    c.beginPath(); c.arc(cx, cy, R * .6, 0, Math.PI * 2); c.fill();
    c.font = `600 ${h * .28}px Georgia, "Times New Roman", serif`; c.textBaseline = 'middle'; c.fillText('MUHAMMADIYAH', cx + R * 2, cy + h * .02, W * .6);
  }
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(band, .05));

  // Green signboard on the fascia: an emblem shield, the Arabic name and MUHAMMADIYAH ISLAMIC COLLEGE.
  const sg = layout.sign, sign = document.createElement('canvas');
  sign.width = 1536; sign.height = Math.round(1536 * (sg.top - sg.bottom) / (sg.right - sg.left));
  {
    const c = sign.getContext('2d')!, W = 1536, h = sign.height;
    c.fillStyle = '#f3f3ee'; c.fillRect(0, 0, W, h);
    c.fillStyle = '#9ccf6a'; c.fillRect(10, 10, W - 20, h * .45);
    c.fillStyle = '#3d9a4c'; c.fillRect(10, h * .45 + 10, W - 20, h * .55 - 20);
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(60, 30); c.lineTo(300, 30); c.lineTo(300, h * .6); c.quadraticCurveTo(180, h - 20, 60, h * .6); c.closePath(); c.fill();
    c.fillStyle = '#3d9a4c'; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; c.beginPath(); c.moveTo(180, h * .4); c.lineTo(180 + Math.cos(a) * 80, h * .4 + Math.sin(a) * 80); c.lineTo(180 + Math.cos(a + .3) * 40, h * .4 + Math.sin(a + .3) * 40); c.fill(); }
    c.fillStyle = '#2e6e3a'; c.textBaseline = 'middle'; c.textAlign = 'center';
    c.font = `500 ${h * .26}px "Geeza Pro", "Al Nile", "Damascus", serif`; c.fillText('معهد المحمدية الإسلامي', W * .6, h * .24);
    c.fillStyle = '#f3f3ee'; c.font = `600 ${h * .2}px Georgia, "Times New Roman", serif`; c.fillText('MUHAMMADIYAH ISLAMIC COLLEGE', W * .6, h * .7, W * .66);
  }
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(sign, .08));

  // Scrollwork cresting over the sliding gate, cut out.
  const sc = layout.scroll, scroll = document.createElement('canvas');
  scroll.width = 2048; scroll.height = Math.round(2048 * (sc.top - sc.bottom) / (sc.right - sc.left));
  {
    const c = scroll.getContext('2d')!, W = 2048, h = scroll.height;
    c.strokeStyle = '#f4f4f0'; c.lineWidth = 10; c.lineCap = 'round';
    const n = 4, s = W / n;
    for (let i = 0; i < n; i++) {
      const x0 = s * i;
      c.beginPath(); c.moveTo(x0, h - 6); c.quadraticCurveTo(x0 + s / 2, -h * .4, x0 + s, h - 6); c.stroke();
      for (const d of [-1, 1]) { c.beginPath(); c.arc(x0 + s / 2 + d * s * .18, h * .6, h * .18, 0, Math.PI * 1.6); c.stroke(); }
      c.beginPath(); c.arc(x0 + s / 2, h * .42, h * .12, 0, Math.PI * 2); c.stroke();
    }
    c.beginPath(); c.moveTo(0, h - 6); c.lineTo(W, h - 6); c.stroke();
  }
  world.panel(pt(sc.left, sc.out), pt(sc.right, sc.out), sc.bottom, sc.top, textured(scroll, 0, true));
  const pl = layout.plate;
  world.panel(pt(pl.left, pl.out), pt(pl.right, pl.out), pl.bottom, pl.top, world.textMaterial('17 LORONG 13 GEYLANG', '#1d1d1d', '#e9e9e2', 0, (pl.right - pl.left) / (pl.top - pl.bottom)));

  for (const r of muhammadiyahReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
