import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { eatFirst, eatFirstFrame, eatFirstLayout, eatFirstRoof, eatFirstReviews } from './eat-first-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** June 2024 exterior of No. 287, using the untouched source outline. */
export function buildEatFirst(world: World, id: string, poly: Point[]) {
  if (!eatFirst.buildingIds.includes(id)) return false;
  const frame = eatFirstFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const wallTop = eatFirst.height + .08, white = '#f1efe8';

  // Party and rear walls close the volume; the street wall starts above the five-foot way.
  world.panel(frame.a, frame.rearA, .13, wallTop, material(white));
  world.panel(frame.b, frame.rearB, .13, wallTop, material(white));
  world.panel(frame.rearA, frame.rearB, .13, wallTop, material(white));
  world.panel(pt(0), pt(width), 3.29, wallTop, material(white));

  const layout = eatFirstLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`Eat First ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }
  const pipe = layout.downpipeOffset, [o0, y0] = pipe.from, [o1, y1] = pipe.to;
  const mid = pt(pipe.u, (o0 + o1) / 2);
  world.box('Eat First downpipe offset', mid[0], (y0 + y1) / 2, mid[1], .07, Math.hypot(o1 - o0, y1 - y0), .07, world.mat('#3a8a6a'), undefined, angle)
    .rotateLocal(Math.atan2(o1 - o0, y1 - y0) * 180 / Math.PI, 0, 0);

  // Flat façade shapes in (u, y), placed at a fixed distance from the wall.
  const shape = (name: string, points: number[][], out: number, mat: pc.Material, indices: number[]) => {
    const positions = points.flatMap(([u, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; });
    world.mesh(`Eat First ${name}`, positions, points.flatMap(([u, y]) => [u, y]), indices, mat);
  };
  // Segmental arches: red frame, white archivolt and its shadow line, then the
  // dark fanlight with white glazing bars clipped to the curve.
  for (const arch of layout.arches) {
    const half = arch.span / 2, rise = arch.apex - arch.springing, R = (half * half + rise * rise) / (2 * rise);
    const cy = arch.apex - R, phi0 = Math.asin(half / R), steps = 20;
    const at = (r: number, phi: number) => [arch.u + r * Math.sin(phi), cy + r * Math.cos(phi)];
    const arc = (r: number) => Array.from({ length: steps + 1 }, (_, i) => at(r, -phi0 + 2 * phi0 * i / steps));
    for (const [d0, d1, colour, out] of arch.bands as [number, number, string, number][]) {
      const inner = arc(R + d0), outer = arc(R + d1), indices: number[] = [];
      for (let i = 1; i <= steps; i++) { const k = i * 2; indices.push(k - 2, k - 1, k + 1, k - 2, k + 1, k); }
      shape('arch band', inner.flatMap((p, i) => [p, outer[i]]), out, material(colour), indices);
    }
    const fan = [[arch.u, arch.springing], ...arc(R)];
    shape('fanlight', fan, .02, material('#3a4448'), fan.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]));
    for (let i = 1; i < 6; i++) {
      const u = arch.u - half + arch.span * i / 6, top = cy + Math.sqrt(R * R - (u - arch.u) ** 2);
      const p = pt(u, .03);
      world.box('Eat First fanlight bar', p[0], (arch.springing + top) / 2, p[1], .022, top - arch.springing - .02, .02, world.mat('#f3f2ec'), undefined, angle);
    }
  }

  // White relief, drawn as raised plaster: highlight above, shadow below.
  const relief = (c: CanvasRenderingContext2D, draw: () => void, line: number) => {
    c.lineCap = 'round'; c.lineJoin = 'round';
    c.save(); c.translate(-3, -3); c.strokeStyle = '#ffffff'; c.lineWidth = line; draw(); c.stroke(); c.restore();
    c.save(); c.translate(4, 5); c.strokeStyle = '#a7a296'; c.lineWidth = line * 1.1; draw(); c.stroke(); c.restore();
    c.strokeStyle = '#ebe8df'; c.lineWidth = line * .85; draw(); c.stroke();
  };
  // Cartouches under the windows: an elongated octagon with mirrored leaf scrolls.
  for (const ca of layout.cartouches) {
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * (ca.top - ca.bottom) / ca.w);
    const c = canvas.getContext('2d')!, w = 512, h = canvas.height;
    c.fillStyle = white; c.fillRect(0, 0, w, h);
    const octagon = () => { c.beginPath(); c.moveTo(70, 14); c.lineTo(w - 70, 14); c.lineTo(w - 14, h / 2); c.lineTo(w - 70, h - 14); c.lineTo(70, h - 14); c.lineTo(14, h / 2); c.closePath(); };
    relief(c, octagon, 10);
    for (const s of [-1, 1]) {
      const scroll = () => {
        c.beginPath(); c.moveTo(w / 2 + s * 20, h / 2);
        c.bezierCurveTo(w / 2 + s * 80, h * .15, w / 2 + s * 170, h * .2, w / 2 + s * 190, h / 2);
        c.bezierCurveTo(w / 2 + s * 200, h * .7, w / 2 + s * 150, h * .75, w / 2 + s * 135, h * .58);
      };
      relief(c, scroll, 9);
      for (const t of [.35, .6, .85]) {
        const leaf = () => { c.beginPath(); c.ellipse(w / 2 + s * (40 + 150 * t), h * (.32 + .1 * t), 20, 9, s * .6, 0, Math.PI * 2); };
        relief(c, leaf, 6);
      }
    }
    relief(c, () => { c.beginPath(); c.arc(w / 2, h / 2, 18, 0, Math.PI * 2); }, 8);
    world.panel(pt(ca.u - ca.w / 2, ca.out), pt(ca.u + ca.w / 2, ca.out), ca.bottom, ca.top, textured(canvas));
  }
  // Frieze of running acanthus scrolls under the eaves, an original pattern.
  const fz = layout.frieze, friezeCanvas = document.createElement('canvas');
  friezeCanvas.width = 2048; friezeCanvas.height = Math.round(2048 * (fz.top - fz.bottom) / width);
  const f = friezeCanvas.getContext('2d')!, H = friezeCanvas.height, step = 2048 / 9;
  f.fillStyle = white; f.fillRect(0, 0, 2048, H);
  for (let i = 0; i < 9; i++) {
    const x = step * i, dir = i % 2 ? -1 : 1;
    relief(f, () => {
      f.beginPath(); f.moveTo(x, H * (.5 + .2 * dir));
      f.bezierCurveTo(x + step * .3, H * (.5 - .45 * dir), x + step * .7, H * (.5 + .45 * dir), x + step, H * (.5 - .2 * dir));
    }, 7);
    relief(f, () => { f.beginPath(); f.arc(x + step * .5, H * (.5 - .12 * dir), H * .16, 0, Math.PI * 1.6); }, 6);
  }
  world.panel(pt(0, fz.out), pt(width, fz.out), fz.bottom, fz.top, textured(friezeCanvas));

  // Fish logo shared by both signs: a black crescent head with a ringed eye.
  const fish = (c: CanvasRenderingContext2D, x: number, y: number, s: number, eye: string) => {
    c.fillStyle = '#141414'; c.beginPath();
    c.moveTo(x - s * .95, y - s * .15);
    c.bezierCurveTo(x - s * .3, y - s * .75, x + s * .7, y - s * .55, x + s, y - s * .2);
    c.bezierCurveTo(x + s * .55, y - s * .35, x - s * .05, y - s * .32, x - s * .45, y - s * .05);
    c.bezierCurveTo(x - s * .05, y + s * .2, x + s * .2, y + s * .5, x + s * .45, y + s * .75);
    c.bezierCurveTo(x - s * .05, y + s * .55, x - s * .6, y + s * .2, x - s * .95, y - s * .15);
    c.fill();
    c.fillStyle = eye; c.beginPath(); c.arc(x - s * .05, y - s * .3, s * .11, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#141414'; c.beginPath(); c.arc(x - s * .05, y - s * .3, s * .05, 0, Math.PI * 2); c.fill();
  };
  // Red fascia, redrawn with original typography: 食之為鮮 EAT FIRST, logo and 287.
  const sign = layout.sign, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (sign.top - sign.bottom) / (sign.right - sign.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#c8302d'; c.fillRect(0, 0, 2048, h);
  c.strokeStyle = '#9c2321'; c.lineWidth = 8; c.strokeRect(4, 4, 2040, h - 8);
  c.textBaseline = 'middle'; c.lineJoin = 'round';
  c.font = '700 178px "Songti SC", "STSong", serif'; c.lineWidth = 10; c.strokeStyle = '#8e1f1c'; c.fillStyle = '#f2cf4b';
  c.textAlign = 'left'; c.strokeText('食之為鮮', 60, h * .54, 780); c.fillText('食之為鮮', 60, h * .54, 780);
  c.font = '900 150px "Arial Rounded MT Bold", "Arial Black", sans-serif';
  c.strokeText('EAT FIRST', 880, h * .56, 700); c.fillText('EAT FIRST', 880, h * .56, 700);
  fish(c, 1810, h * .5, 150, '#f4f0e4');
  c.font = '700 54px sans-serif'; c.fillStyle = '#f2cf4b'; c.textAlign = 'right'; c.fillText('287', 2010, h * .84);
  world.panel(pt(sign.left, sign.out), pt(sign.right, sign.out), sign.bottom, sign.top, textured(canvas, .06));

  // Maroon board on the back wall: silver lettering with a dark relief shadow.
  const board = layout.board, boardCanvas = document.createElement('canvas');
  boardCanvas.width = 1536; boardCanvas.height = Math.round(1536 * (board.top - board.bottom) / (board.right - board.left));
  const bc = boardCanvas.getContext('2d')!, bh = boardCanvas.height;
  bc.fillStyle = '#8a3439'; bc.fillRect(0, 0, 1536, bh);
  bc.strokeStyle = '#5a2226'; bc.lineWidth = 14; bc.strokeRect(7, 7, 1522, bh - 14);
  bc.textBaseline = 'middle'; bc.textAlign = 'center';
  bc.font = '700 190px "Songti SC", "STSong", serif';
  bc.fillStyle = '#3b1416'; bc.fillText('食之為鮮', 600, bh * .42 + 8, 1000);
  bc.fillStyle = '#e4dfda'; bc.fillText('食之為鮮', 594, bh * .42, 1000);
  bc.font = '600 62px sans-serif'; bc.fillStyle = '#d9d4cf';
  bc.fillText('E A T   F I R S T', 600, bh * .82, 760);
  fish(bc, 1270, bh * .45, 170, '#f4f0e4');
  world.panel(pt(board.left, board.out), pt(board.right, board.out), board.bottom, board.top, textured(boardCanvas));

  // Small red-on-white number plate on the inner face of the west pier.
  const pl = layout.plaque;
  world.panel(pt(pl.u, pl.out[0]), pt(pl.u, pl.out[1]), pl.bottom, pl.top, world.textMaterial('287', '#f2efe6', '#a82b2b', 0, (pl.out[0] - pl.out[1]) / (pl.top - pl.bottom)));

  // Orange tiled gable roof; its raised copings end in blocks above the gutter.
  buildGableRoof(world, 'Eat First', frame, eatFirstRoof(frame), {
    tile: '#c96f45', course: '#ad5a39', coping: '#a64f3a', gable: white,
    copingHeight: .30, copingWidth: .22, frontCap: { length: .5, height: .28 },
  });

  for (const r of eatFirstReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
