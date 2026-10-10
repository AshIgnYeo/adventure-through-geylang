import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { lannaThai, lannaThaiFrame, lannaThaiLayout, lannaThaiReviews, elevation } from './lanna-thai-layout.mjs';

/** April 2024 exterior of No. 34 Lorong 11, using the untouched source outline. */
export function buildLannaThai(world: World, id: string, poly: Point[]) {
  if (!lannaThai.buildingIds.includes(id)) return false;
  const frame = lannaThaiFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const E = elevation, cream = material('#e9e3d2'), H = lannaThai.height;
  const mix = (p: number[], q: number[], t: number) => p.map((v, i) => v + (q[i] - v) * t);
  const sideA = Math.hypot(frame.rearA[0] - frame.a[0], frame.rearA[1] - frame.a[1]);
  const sideB = Math.hypot(frame.rearB[0] - frame.b[0], frame.rearB[1] - frame.b[1]);
  // Points along each party wall at a given depth behind the façade.
  const alongA = (d: number) => mix(frame.a, frame.rearA, Math.min(1, d / sideA)) as Point;
  const alongB = (d: number) => mix(frame.b, frame.rearB, Math.min(1, d / sideB)) as Point;

  // Street wall above the five-foot way, and the full-height front block's party walls.
  world.panel(pt(0), pt(width), E.ledge[0], H, cream);
  const blockA = alongA(E.frontBlockDepth), blockB = alongB(E.frontBlockDepth);
  world.panel(frame.a, blockA, 0, H, cream); world.panel(frame.b, blockB, 0, H, cream);
  // Rear massing at the estimated lower height, on the untouched source outline.
  world.panel(blockA, frame.rearA, 0, E.rearHeight, cream); world.panel(blockB, frame.rearB, 0, E.rearHeight, cream);
  world.panel(frame.rearA, frame.rearB, 0, E.rearHeight, cream);
  // Tops of the raised party walls, stepping down to the rear massing.
  world.panel(blockA, blockB, E.rearHeight, H, cream);

  // Roof: a tiled slope falling back from behind the parapet, then a flat dark roof to the rear.
  const fall = [alongA(.25), alongB(.25), alongB(E.roofDepth), alongA(E.roofDepth)];
  const roofY = [H - .4, H - .4, E.rearHeight, E.rearHeight];
  const tiles = material('#b46a4c');
  world.mesh('Lanna Thai estimated tiled roof', fall.flatMap((p, i) => [p[0], roofY[i], p[1]]), fall.flatMap(p => [p[0] / 3, p[1] / 3]), [0, 1, 2, 0, 2, 3], tiles);
  const flat = [alongA(E.roofDepth), alongB(E.roofDepth), frame.rearB, frame.rearA];
  world.mesh('Lanna Thai estimated flat rear roof', flat.flatMap(p => [p[0], E.rearHeight, p[1]]), flat.flatMap(p => [p[0] / 3, p[1] / 3]), [0, 1, 2, 0, 2, 3], material('#5b5d5a'));
  // Triangular infill of each party wall under the sloping roof, beyond the full-height block.
  for (const [along, rear] of [[alongA, frame.rearA], [alongB, frame.rearB]] as const) {
    const p = along(E.frontBlockDepth), q = along(E.roofDepth), yp = H - .4 - (H - .4 - E.rearHeight) * (E.frontBlockDepth - .25) / (E.roofDepth - .25);
    world.mesh('Lanna Thai party wall gable', [p[0], E.rearHeight, p[1], q[0], E.rearHeight, q[1], p[0], yp, p[1]], [0, 0, 1, 0, 0, 1], [0, 1, 2], cream);
    void rear;
  }

  const layout = lannaThaiLayout(width);
  // Five-foot way floor, ceiling and back wall follow the source sides, including the skewed south side.
  const atDepth = (front: Point, rear: Point, depth: number) => {
    const dir = [rear[0] - front[0], rear[1] - front[1]], inward = -(dir[0] * frame.nx + dir[1] * frame.nz), t = depth / inward;
    return [front[0] + dir[0] * t, front[1] + dir[1] * t] as Point;
  };
  const fw = layout.fiveFootWay, backA = atDepth(frame.a, frame.rearA, fw.depth), backB = atDepth(frame.b, frame.rearB, fw.depth);
  const quad = (name: string, corners: Point[], y: number, mat: pc.Material) => world.mesh(`Lanna Thai ${name}`, corners.flatMap(p => [p[0], y, p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], mat);
  quad('five-foot way floor', [frame.a, frame.b, backB, backA], .08, material(fw.floor));
  quad('five-foot way ceiling', [frame.a, frame.b, backB, backA], fw.ceiling, material(fw.soffit));
  world.panel(backA, backB, 0, fw.ceiling, material(fw.wall));
  // A return just inside the skewed south side, so the generic neighbour's wall on that edge never shows through.
  const inside = (p: Point) => [p[0] - frame.dx * .02, p[1] - frame.dz * .02] as Point;
  world.panel(inside(frame.b), inside(backB), 0, fw.ceiling, cream);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Lanna Thai ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Raised white letters, drawn with a soft shadow and cut out, reading from the north end.
  // centres: each character's measured position along u; otherwise they are spaced evenly.
  const letters = (text: string, box: { left: number; right: number; bottom: number; top: number; out: number; centres?: number[] }, font: string, spread: number) => {
    const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = Math.round(2048 * (box.top - box.bottom) / (box.right - box.left));
    const c = canvas.getContext('2d')!, h = canvas.height, chars = [...text];
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = font.replace('SIZE', String(Math.round(h * .9)));
    chars.forEach((ch, i) => {
      const x = box.centres ? 2048 * (box.centres[i] - box.left) / (box.right - box.left) : 2048 * (.5 / chars.length + i / chars.length) * spread + 1024 * (1 - spread);
      c.fillStyle = 'rgba(70,66,58,.85)'; c.fillText(ch, x + 10, h * .5 + 12);
      c.fillStyle = '#f6f4ee'; c.fillText(ch, x, h * .5);
    });
    world.panel(pt(box.left, box.out), pt(box.right, box.out), box.bottom, box.top, textured(canvas, true));
  };
  letters('南洋丁氏總會', layout.name, '700 SIZEpx "Kaiti SC", "STKaiti", "Songti SC", serif', 1);
  letters('1995', layout.year, '600 SIZEpx "Times New Roman", Times, serif', .9);

  // Breeze-block vents over the small windows: a quatrefoil in each square, an original pattern.
  for (const v of layout.vents) {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.round(1024 * (v.top - v.bottom) / (v.right - v.left));
    const c = canvas.getContext('2d')!, h = canvas.height, n = Math.max(1, Math.round((v.right - v.left) / (v.top - v.bottom))), s = 1024 / n;
    c.fillStyle = '#e4ddcb'; c.fillRect(0, 0, 1024, h);
    for (let i = 0; i < n; i++) {
      const x = s * (i + .5), y = h / 2, r = Math.min(s, h) * .17;
      c.fillStyle = '#4d4a44';
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { c.beginPath(); c.arc(x + dx * r, y + dy * r, r * .8, 0, Math.PI * 2); c.fill(); }
      c.strokeStyle = '#cfc7b3'; c.lineWidth = 6; c.strokeRect(i * s + 3, 3, s - 6, h - 6);
    }
    world.panel(pt(v.left, v.out), pt(v.right, v.out), v.bottom, v.top, textured(canvas));
  }

  // Yellow board on the back wall, redrawn with original typography: LANNA THAI TRADITIONAL
  // MASSAGE over 南娜泰式傳统按摩, with a small gable mark and 34 in a red roundel.
  const bd = layout.board, board = document.createElement('canvas');
  board.width = 2048; board.height = Math.round(2048 * (bd.top - bd.bottom) / (bd.right - bd.left));
  const g = board.getContext('2d')!, BH = board.height;
  g.fillStyle = '#e3b53c'; g.fillRect(0, 0, 2048, BH);
  g.strokeStyle = '#1d1d1d'; g.lineWidth = 10; g.beginPath(); g.moveTo(40, BH * .5); g.lineTo(110, BH * .22); g.lineTo(180, BH * .5); g.stroke();
  g.fillStyle = '#1d1d1d'; g.textBaseline = 'middle'; g.font = `600 ${BH * .32}px "Helvetica Neue", Arial, sans-serif`;
  g.fillText('LANNA THAI TRADITIONAL MASSAGE', 230, BH * .27, 1650);
  g.fillStyle = '#b3262b'; g.font = `700 ${BH * .44}px "Kaiti SC", "STKaiti", serif`;
  g.fillText('南娜泰式傳统按摩', 230, BH * .71, 1650);
  g.beginPath(); g.arc(1975, BH * .68, BH * .26, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#f3efe4'; g.font = `700 ${BH * .26}px Arial, sans-serif`; g.textAlign = 'center'; g.fillText('34', 1975, BH * .7);
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(board));

  for (const r of lannaThaiReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
