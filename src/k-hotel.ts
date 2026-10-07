import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { kHotel, kHotelFrame, kHotelLayout, kHotelReviews, step } from './k-hotel-layout.mjs';

/** April 2024 exterior of No. 15 Lorong 15, using the untouched source outline. */
export function buildKHotel(world: World, id: string, poly: Point[]) {
  if (!kHotel.buildingIds.includes(id)) return false;
  const frame = kHotelFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const white = material('#eeebe3'), H = kHotel.height, parapet = H + .6, s = step.u, north = -step.depth;

  // The north half stands 1.27 m back, so its party wall starts behind the source edge.
  const along = (p: Point, q: Point, d: number): Point => {
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]); return [p[0] + (q[0] - p[0]) * d / len, p[1] + (q[1] - p[1]) * d / len];
  };
  const northStart = along(frame.b as Point, frame.rearB as Point, step.depth);
  world.panel(frame.a as Point, frame.rearA as Point, 0, parapet, white);
  world.panel(northStart, frame.rearB as Point, 0, parapet, white);
  world.panel(frame.rearA as Point, frame.rearB as Point, 0, parapet, white);
  world.panel(pt(0), pt(s), 4.3, H, white);
  world.panel(pt(5.5), pt(s), 0, 4.3, white);
  world.panel(pt(s), pt(s, north), 0, H, white);
  world.panel(pt(s, north), pt(width, north), 0, H, white);
  // Flat roof over the stepped plan, with a low parapet along the front.
  const roof = [frame.a as Point, pt(s), pt(s, north), northStart, frame.rearB as Point, frame.rearA as Point];
  world.mesh('K Hotel roof', roof.flatMap(p => [p[0], H, p[1]]), roof.flatMap(p => [p[0] / 4, p[1] / 4]), roof.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#b9b6ad'));
  for (const [a, b] of [[pt(0), pt(s)], [pt(s), pt(s, north)], [pt(s, north), pt(width, north)]]) world.panel(a, b, H, parapet, white);

  const layout = kHotelLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`K Hotel ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }
  // Plan polygons extruded between two heights: top, bottom and side faces.
  const prism = (name: string, plan: number[][], bottom: number, top: number, mat: pc.Material) => {
    const ring = plan.map(([u, out]) => pt(u, out)), n = ring.length;
    const positions = [...ring.flatMap(p => [p[0], top, p[1]]), ...ring.flatMap(p => [p[0], bottom, p[1]])];
    const indices: number[] = [];
    for (let i = 1; i < n - 1; i++) indices.push(0, i, i + 1, n, n + i + 1, n + i);
    for (let i = 0; i < n; i++) { const j = (i + 1) % n; indices.push(i, j, n + j, i, n + j, n + i); }
    const uvs = [...ring, ...ring].flatMap(p => [p[0] / 3, p[1] / 3]);
    world.mesh(`K Hotel ${name}`, positions, uvs, indices, mat);
  };
  for (const p of layout.prisms) prism(p.name, p.plan, p.bottom, p.top, material(p.colour));
  const grey = world.mat('#8d9298');
  for (const c of layout.columns) {
    const p = pt(c.u, c.out);
    world.cylinder('K Hotel round column', p[0], (c.bottom + c.top) / 2, p[1], c.d, c.top - c.bottom, grey);
    world.box('K Hotel column cap', p[0], c.top - .05, p[1], c.d + .12, .14, c.d + .12, grey, undefined, angle);
  }

  // Bay faces: white-framed windows over aqua panels, on the front and both cants.
  const windowCanvas = (panes: number) => {
    const canvas = document.createElement('canvas'); canvas.width = 128 * panes; canvas.height = 128;
    const c = canvas.getContext('2d')!;
    const g = c.createLinearGradient(0, 0, 0, 128); g.addColorStop(0, '#5c93bd'); g.addColorStop(1, '#2f6a98');
    c.fillStyle = g; c.fillRect(0, 0, canvas.width, 128);
    c.fillStyle = '#f4f4f0'; c.fillRect(0, 0, canvas.width, 9); c.fillRect(0, 119, canvas.width, 9);
    for (let i = 0; i <= panes; i++) c.fillRect(Math.min(canvas.width - 9, i * 128 - 4), 0, 9, 128);
    c.fillRect(0, 34, canvas.width, 6);
    return textured(canvas);
  };
  const frontGlass = windowCanvas(3), cantGlass = windowCanvas(1), aqua = material('#a6d9d6');
  for (const bay of layout.bays) {
    const [l, fl, fr, r] = bay.plan.map(([u, out]) => [u, out + .005]);
    for (const [p, q, glass] of [[l, fl, cantGlass], [fl, fr, frontGlass], [fr, r, cantGlass]] as const) {
      world.panel(pt(p[0], p[1]), pt(q[0], q[1]), bay.panel[0], bay.panel[1], aqua);
      world.panel(pt(p[0], p[1]), pt(q[0], q[1]), bay.window[0], bay.window[1], glass);
    }
  }

  // Glazed turret with a white cornice and a brown pyramidal roof.
  const t = layout.turret, [w0, w1] = t.wall, tc = [(t.u0 + t.u1) / 2, (t.out0 + t.out1) / 2];
  const corners = [[t.u0, t.out1], [t.u1, t.out1], [t.u1, t.out0], [t.u0, t.out0]];
  const band = windowCanvas(4);
  for (let i = 0; i < 4; i++) {
    const [p, q] = [corners[i], corners[(i + 1) % 4]];
    world.panel(pt(p[0], p[1]), pt(q[0], q[1]), H, w0 + .6, white);
    world.panel(pt(p[0], p[1]), pt(q[0], q[1]), w0 + .6, w1 - .25, band);
    world.panel(pt(p[0], p[1]), pt(q[0], q[1]), w1 - .25, w1, white);
  }
  const eave = corners.map(([u, out]) => [u + Math.sign(u - tc[0]) * .25, out + Math.sign(out - tc[1]) * .25]);
  const apex = pt(tc[0], tc[1]), ring = eave.map(([u, out]) => pt(u, out));
  world.mesh('K Hotel turret roof', [...ring.flatMap(p => [p[0], w1, p[1]]), apex[0], t.apex, apex[1]], [0, 0, 1, 0, 1, 1, 0, 1, .5, .5], [0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4], material('#8a5a44'));
  prism('turret cornice', eave, w1 - .12, w1 + .02, white);
  world.box('K Hotel turret finial', apex[0], t.apex + .15, apex[1], .08, .35, .08, world.mat('#d7d3c8'), undefined, angle);

  // Broad aqua pediment with white raking and base cornices.
  const pd = layout.pediment;
  const tri = [pt(pd.u0, pd.out), pt(pd.u1, pd.out), pt(pd.apexU, pd.out)];
  world.mesh('K Hotel pediment', [tri[0][0], pd.base, tri[0][1], tri[1][0], pd.base, tri[1][1], tri[2][0], pd.apex, tri[2][1]], [0, 0, 1, 0, .5, 1], [0, 1, 2], aqua);
  const trim = (u0: number, u1: number, y0: number, y1: number) => {
    const p = pt((u0 + u1) / 2, pd.out + .08), len = Math.hypot(u1 - u0, y1 - y0);
    world.box('K Hotel pediment cornice', p[0], (y0 + y1) / 2, p[1], len + .2, .2, .25, world.mat('#f6f5f0'), undefined, angle)
      .rotateLocal(0, 0, Math.atan2(y1 - y0, u1 - u0) * 180 / Math.PI);
  };
  trim(pd.u0, pd.u1, pd.base + .1, pd.base + .1);
  trim(pd.u0, pd.apexU, pd.base, pd.apex);
  trim(pd.apexU, pd.u1, pd.apex, pd.base);

  // Concrete forecourt between the frontage and Lorong 15.
  const ap = layout.apron, apron = [[ap.u0, ap.out1], [ap.u1, ap.out1], [ap.u1, north], [s, north], [s, ap.out0], [ap.u0, ap.out0]].map(([u, out]) => pt(u, out));
  // Fan from the reflex corner beside the step keeps every triangle inside the apron.
  world.mesh('K Hotel forecourt', apron.flatMap(p => [p[0], .05, p[1]]), apron.flatMap(p => [p[0] / 3, p[1] / 3]), [4, 5, 0, 4, 0, 1, 4, 1, 2, 4, 2, 3], material('#a7a69e'));

  // Lightbox sign, redrawn with original lettering: the K mark and HOTEL 1515.
  const sg = layout.sign, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (sg.top - sg.bottom) / (sg.right - sg.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#f3f3ef'; c.fillRect(0, 0, 2048, h);
  c.strokeStyle = '#c9cbc8'; c.lineWidth = 10; c.strokeRect(5, 5, 2038, h - 10);
  const mark = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
    ctx.fillStyle = '#1d1d1f'; ctx.fillRect(x, y - s / 2, s * .2, s);
    ctx.fillStyle = '#2f62a8'; ctx.beginPath(); ctx.moveTo(x + s * .3, y); ctx.lineTo(x + s * .85, y - s * .48); ctx.lineTo(x + s * .85, y + s * .48); ctx.closePath(); ctx.fill();
  };
  mark(c, 90, h / 2, h * .62);
  c.fillStyle = '#1d1d1f'; c.textBaseline = 'middle'; c.font = '800 250px "Arial Black", "Helvetica Neue", sans-serif';
  c.fillText('HOTEL 1515', 520, h * .56, 1460);
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(canvas, .15));
  world.panel(pt(4.88, .01), pt(5.30, .01), 3.0, 3.25, world.textMaterial('15', '#8d9298', '#eeebe3', 0, 1.7));

  // Round sign on a post at the driveway entrance, readable from both sides.
  const lp = layout.lollipop, disc = document.createElement('canvas'); disc.width = disc.height = 256;
  const d = disc.getContext('2d')!;
  d.fillStyle = '#c8302d'; d.beginPath(); d.arc(128, 128, 126, 0, Math.PI * 2); d.fill();
  d.fillStyle = '#f6f4ee'; d.beginPath(); d.arc(128, 128, 104, 0, Math.PI * 2); d.fill();
  mark(d, 74, 108, 74); d.fillStyle = '#1d1d1f'; d.font = '800 40px sans-serif'; d.textAlign = 'center'; d.fillText('HOTEL', 128, 182);
  const discMat = textured(disc);
  for (const side of [-1, 1]) {
    const centre = pt(lp.u, lp.out + side * .02), positions = [centre[0], lp.y, centre[1]], uv = [.5, .5], indices: number[] = [];
    for (let i = 0; i <= 32; i++) {
      const a = Math.PI * 2 * i / 32, p = pt(lp.u + Math.cos(a) * lp.r * side, lp.out + side * .02);
      positions.push(p[0], lp.y + Math.sin(a) * lp.r, p[1]); uv.push(.5 + Math.cos(a) / 2, .5 - Math.sin(a) / 2);
      if (i) indices.push(0, i, i + 1);
    }
    world.mesh('K Hotel round sign', positions, uv, indices, discMat);
  }

  for (const r of kHotelReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
