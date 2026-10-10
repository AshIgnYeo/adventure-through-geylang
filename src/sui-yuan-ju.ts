import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { suiYuanJu, suiYuanJuFrame, suiYuanJuLayout, suiYuanJuReviews } from './sui-yuan-ju-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** April 2024 exterior of Nos. 4 and 2 Lorong 13, one source outline at a time. */
export function buildSuiYuanJu(world: World, id: string, poly: Point[]) {
  const unit = suiYuanJu.buildingIds.indexOf(id);
  if (unit < 0) return false;
  const frame = suiYuanJuFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, opts: { glow?: number; cutout?: boolean } = {}) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (opts.glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = opts.glow; }
    if (opts.cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const layout = suiYuanJuLayout(width, unit), wallTop = suiYuanJu.height + .08, side = material('#e8ddcc');
  const label = 'Sui Yuan Ju';

  world.panel(frame.a, frame.rearA, .13, wallTop, side);
  world.panel(frame.b, frame.rearB, .13, wallTop, side);
  world.panel(frame.rearA, frame.rearB, .13, wallTop, side);
  world.panel(pt(0), pt(width), 3.5, wallTop, side);

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  // Façade shapes in (u, y) at a fixed distance from the wall.
  const shape = (name: string, points: number[][], out: number, mat: pc.Material, indices: number[]) => {
    const positions = points.flatMap(([u, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; });
    world.mesh(`${label} ${name}`, positions, points.flatMap(([u, y]) => [u, y]), indices, mat);
  };
  // Segmental arches with pink and cream archivolts over timber lattice fanlights.
  for (const arch of layout.arches) {
    const half = arch.span / 2, rise = arch.apex - arch.springing, R = (half * half + rise * rise) / (2 * rise);
    const cy = arch.apex - R, phi0 = Math.asin(half / R), steps = 20;
    const at = (r: number, phi: number) => [arch.u + r * Math.sin(phi), cy + r * Math.cos(phi)];
    const arc = (r: number) => Array.from({ length: steps + 1 }, (_, i) => at(r, -phi0 + 2 * phi0 * i / steps));
    for (const [d0, d1, colour, out] of arch.bands as [number, number, string, number][]) {
      const inner = arc(R + d0), outer = arc(R + d1), indices: number[] = [];
      for (let i = 1; i <= steps; i++) { const kk = i * 2; indices.push(kk - 2, kk - 1, kk + 1, kk - 2, kk + 1, kk); }
      const foot = (p: number[]) => [p[0], arch.springing];
      const pairs = [[foot(inner[0]), foot(outer[0])], ...inner.map((p, i) => [p, outer[i]]), [foot(inner[steps]), foot(outer[steps])]];
      const idx: number[] = []; for (let i = 1; i < pairs.length; i++) { const kk = i * 2; idx.push(kk - 2, kk - 1, kk + 1, kk - 2, kk + 1, kk); }
      shape('arch band', pairs.flat(), out, material(colour), idx);
    }
    // Diamond lattice fanlight, an original pattern cut out over a dark ground.
    const fan = [[arch.u, arch.springing], ...arc(R)];
    shape('fanlight', fan, .0, material('#2c2522'), fan.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]));
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * rise / arch.span);
    const c = canvas.getContext('2d')!, kpx = 512 / arch.span, ox = 256, oy = canvas.height + (R - rise) * kpx;
    c.save(); c.beginPath(); c.arc(ox, oy, R * kpx - 3, 0, Math.PI * 2); c.clip();
    c.strokeStyle = '#7a5440'; c.lineWidth = 7;
    for (let x = -canvas.height; x < 512 + canvas.height; x += 34) {
      c.beginPath(); c.moveTo(x, 0); c.lineTo(x + canvas.height, canvas.height); c.stroke();
      c.beginPath(); c.moveTo(x, canvas.height); c.lineTo(x + canvas.height, 0); c.stroke();
    }
    c.restore();
    world.panel(pt(arch.u - half, .015), pt(arch.u + half, .015), arch.springing, arch.apex, textured(canvas, { cutout: true }));
  }

  // Glazed tile panels under the windows: an original floral pattern on cream.
  for (const tp of layout.tilePanels) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * (tp.top - tp.bottom) / tp.w);
    const c = canvas.getContext('2d')!, h = canvas.height, n = 6, s = 512 / n;
    c.fillStyle = '#f2ead6'; c.fillRect(0, 0, 512, h);
    for (let i = 0; i < n; i++) for (let j = 0; j < Math.ceil(h / s); j++) {
      const x = s * (i + .5), y = s * (j + .5);
      c.fillStyle = '#5f9f7f'; for (let a = 0; a < 4; a++) { c.beginPath(); c.ellipse(x + Math.cos(a * Math.PI / 2) * s * .22, y + Math.sin(a * Math.PI / 2) * s * .22, s * .14, s * .07, a * Math.PI / 2, 0, Math.PI * 2); c.fill(); }
      c.fillStyle = '#e07a8c'; c.beginPath(); c.arc(x, y, s * .13, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#f6d36b'; c.beginPath(); c.arc(x, y, s * .05, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(80,120,140,.5)'; c.lineWidth = 2; c.strokeRect(i * s, j * s, s, s);
    }
    c.strokeStyle = '#cf7c78'; c.lineWidth = 10; c.strokeRect(5, 5, 502, h - 10);
    world.panel(pt(tp.u - tp.w / 2, tp.out), pt(tp.u + tp.w / 2, tp.out), tp.bottom, tp.top, textured(canvas));
  }

  // Frieze over the arches: green leaf scrolls and round vents on pink.
  const fz = layout.frieze, friezeCanvas = document.createElement('canvas');
  friezeCanvas.width = 2048; friezeCanvas.height = Math.round(2048 * (fz.top - fz.bottom) / width);
  const f = friezeCanvas.getContext('2d')!, H = friezeCanvas.height, toX = (u: number) => u / width * 2048;
  f.fillStyle = unit ? '#e2a199' : '#d98f86'; f.fillRect(0, 0, 2048, H);
  f.strokeStyle = '#3f8a5c'; f.lineWidth = H * .12; f.lineCap = 'round';
  for (const w of layout.windows) {
    for (const dir of [-1, 1]) {
      f.beginPath(); f.moveTo(toX(w.u + dir * .12), H * .55);
      f.bezierCurveTo(toX(w.u + dir * .3), H * .1, toX(w.u + dir * .5), H * .9, toX(w.u + dir * .62), H * .45); f.stroke();
    }
    f.fillStyle = '#f0e2cc'; f.beginPath(); f.arc(toX(w.u), H * .5, H * .3, 0, Math.PI * 2); f.fill();
    f.fillStyle = '#4b3a33'; f.beginPath(); f.arc(toX(w.u), H * .5, H * .17, 0, Math.PI * 2); f.fill();
  }
  world.panel(pt(0, fz.out), pt(width, fz.out), fz.bottom, fz.top, textured(friezeCanvas));

  // Timber fretwork fascia with a scalloped fringe, cut out against the soffit.
  const fa = layout.fascia, fasciaCanvas = document.createElement('canvas');
  fasciaCanvas.width = 2048; fasciaCanvas.height = Math.round(2048 * (fa.top - fa.bottom) / width);
  const g = fasciaCanvas.getContext('2d')!, FH = fasciaCanvas.height, step = 2048 / Math.round(width / .16);
  g.fillStyle = '#c45f66'; g.fillRect(0, 0, 2048, FH * .72);
  g.globalCompositeOperation = 'destination-out';
  for (let x = step / 2; x < 2048; x += step) {
    g.beginPath(); g.arc(x, FH * .4, step * .26, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.moveTo(x, FH * .1); g.lineTo(x + step * .2, FH * .2); g.lineTo(x, FH * .3); g.lineTo(x - step * .2, FH * .2); g.closePath(); g.fill();
  }
  g.globalCompositeOperation = 'source-over'; g.fillStyle = '#c45f66';
  for (let x = 0; x < 2048; x += step) { g.beginPath(); g.moveTo(x, FH * .7); g.arc(x + step / 2, FH * .7, step / 2, Math.PI, 0, true); g.fill(); }
  g.fillStyle = '#8e3f3f'; g.fillRect(0, 0, 2048, FH * .08);
  world.panel(pt(0, fa.out + .02), pt(width, fa.out + .02), fa.bottom, fa.top, textured(fasciaCanvas, { cutout: true }));

  // Red awning with a gathered valance across the five-foot way opening.
  const aw = layout.awning;
  const awningCorners = [[aw.left, aw.back, aw.top], [aw.right, aw.back, aw.top], [aw.right, aw.front, aw.bottom], [aw.left, aw.front, aw.bottom]];
  world.mesh(`${label} red awning`, awningCorners.flatMap(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; }), [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#c43838'));
  const valance = pt((aw.left + aw.right) / 2, aw.front);
  world.box(`${label} awning valance`, valance[0], aw.bottom - .12, valance[1], aw.right - aw.left, .24, .03, world.mat('#b02f30'), undefined, angle);
  world.box(`${label} awning roller`, valance[0], aw.bottom + .02, valance[1], aw.right - aw.left, .05, .06, world.mat('#e9e4dc'), undefined, angle);

  if (layout.sign) {
    // Yellow signboard, redrawn with original typography.
    const sg = layout.sign, canvas = document.createElement('canvas');
    canvas.width = 2048; canvas.height = Math.round(2048 * (sg.top - sg.bottom) / (sg.right - sg.left));
    const c = canvas.getContext('2d')!, h = canvas.height;
    c.fillStyle = '#f2d83a'; c.fillRect(0, 0, 2048, h);
    c.strokeStyle = '#c9a91e'; c.lineWidth = 12; c.strokeRect(6, 6, 2036, h - 12);
    c.textBaseline = 'middle'; c.textAlign = 'center';
    c.fillStyle = '#c42a2a'; c.font = `700 ${h * .4}px "Songti SC", "STSong", serif`;
    c.fillText('随  缘  居  佛  社', 900, h * .3, 1500); c.font = `600 ${h * .22}px "Songti SC", serif`; c.fillText('(精舍)', 1820, h * .3);
    c.font = `700 ${h * .3}px "Brush Script MT", "Snell Roundhand", cursive`; c.fillText('Sui Yuan Ju Buddhist Society', 1024, h * .68, 1900);
    c.font = `600 ${h * .1}px sans-serif`; c.fillText('No4, Lor 13 Geylang Road', 1024, h * .9);
    world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(canvas, { glow: .08 }));
  }

  if (layout.porch) {
    // Dark-tiled hipped canopy over the No. 2 doors, with ridge end ornaments.
    const pr = layout.porch, midU = (pr.left + pr.right) / 2;
    // Hipped canopy: eave line at the front, rising to a short ridge against the wall.
    const ridgeOut = pr.back + .05, rise = pr.ridge - pr.eave;
    const v = [[pr.left, pr.back, pr.ridge - rise * .15], [pr.right, pr.back, pr.ridge - rise * .15], [pr.right, pr.front, pr.eave], [pr.left, pr.front, pr.eave],
      [pr.left + .7, ridgeOut, pr.ridge], [pr.right - .7, ridgeOut, pr.ridge]].map(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; });
    const tiles = document.createElement('canvas'); tiles.width = tiles.height = 256;
    const t = tiles.getContext('2d')!;
    t.fillStyle = '#3e4447'; t.fillRect(0, 0, 256, 256);
    for (let x = 0; x < 256; x += 16) { t.fillStyle = x % 32 ? '#596064' : '#4a5155'; t.fillRect(x, 0, 9, 256); }
    for (let y = 0; y < 256; y += 32) { t.fillStyle = 'rgba(20,24,26,.6)'; t.fillRect(0, y, 256, 3); }
    const tileMat = textured(tiles); tileMat.diffuseMapTiling = new pc.Vec2(3, 2); tileMat.update();
    const uv = [0, 0, 1, 0, 1, 1, 0, 1, .15, .1, .85, .1];
    world.mesh(`${label} porch roof`, v.flat(), uv, [3, 2, 5, 3, 5, 4, 0, 3, 4, 1, 5, 2, 0, 4, 5, 0, 5, 1], tileMat);
    const ridgeA = pt(pr.left + .7, ridgeOut), ridgeB = pt(pr.right - .7, ridgeOut);
    const rm = pt(midU, ridgeOut);
    world.box(`${label} porch ridge`, rm[0], pr.ridge + .06, rm[1], Math.hypot(ridgeB[0] - ridgeA[0], ridgeB[1] - ridgeA[1]) + .2, .14, .16, world.mat('#2f3436'), undefined, angle);
    for (const [u, dir] of [[pr.left + .6, 1], [pr.right - .6, -1]]) {
      const p = pt(u, ridgeOut);
      world.box(`${label} ridge ornament`, p[0], pr.ridge + .26, p[1], .26, .34, .12, world.mat('#3a4043'), undefined, angle).rotateLocal(0, 0, dir * 25);
    }
    // A beam and two posts carry the canopy front.
    const fb = pt(midU, pr.front - .05);
    world.box(`${label} porch beam`, fb[0], pr.eave - .08, fb[1], pr.right - pr.left, .12, .1, world.mat('#8b5a3c'), undefined, angle);
  }

  buildGableRoof(world, label, frame, gableRoof(frame, suiYuanJu), {
    tile: '#9a5a48', course: '#84483a', coping: '#8e3f3f', gable: '#e8ddcc', copingHeight: .15, copingWidth: .15,
  });

  if (unit === 0) for (const r of suiYuanJuReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
