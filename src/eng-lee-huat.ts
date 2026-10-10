import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { engLeeHuat, engLeeHuatFrame, engLeeHuatLayout, engLeeHuatReviews, elevation } from './eng-lee-huat-layout.mjs';

/** April 2024 exterior of No. 29 Lorong 11, on its re-spaced footprint. */
export function buildEngLeeHuat(world: World, id: string, poly: Point[]) {
  if (!engLeeHuat.buildingIds.includes(id)) return false;
  const frame = engLeeHuatFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => { const m = world.mat(colour); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  const H = engLeeHuat.height, white = material('#eeeee9'), layout = engLeeHuatLayout(width);

  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    if (!front) world.panel(a, b, .13, H, white);
  }
  world.mesh('Eng Lee Huat flat roof', poly.flatMap(p => [p[0], H - .2, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]),
    poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#9d9b95'));
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Eng Lee Huat ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }
  const textured = (canvas: HTMLCanvasElement) => { const m = new pc.StandardMaterial(); m.diffuseMap = world.texture(canvas); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  // Black board with gold 永利發五金 and ENG LEE HUAT HARDWARE PTE. LTD., redrawn originally; the festival banner is omitted.
  const bd = layout.board, board = document.createElement('canvas');
  board.width = 1024; board.height = Math.round(1024 * (bd.top - bd.bottom) / (bd.right - bd.left));
  {
    const c = board.getContext('2d')!, w = board.width, h = board.height;
    c.fillStyle = '#151515'; c.fillRect(0, 0, w, h); c.fillStyle = '#d9b765'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `700 ${h * .5}px "Kaiti SC", "STKaiti", serif`; c.fillText('永 利 發 五 金 有 限 公 司', w / 2, h * .33, w * .94);
    c.font = `700 ${h * .26}px "DIN Condensed", "Arial Narrow", sans-serif`; c.fillText('ENG LEE HUAT HARDWARE PTE. LTD.', w / 2, h * .78, w * .92);
  }
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(board));
  const pl = layout.plate, plate = document.createElement('canvas'); plate.width = 128; plate.height = Math.round(128 * (pl.top - pl.bottom) / (pl.right - pl.left));
  { const c = plate.getContext('2d')!; c.fillStyle = '#ece8df'; c.fillRect(0, 0, 128, plate.height); c.fillStyle = '#2a2a2a'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `600 ${plate.height * .6}px sans-serif`; c.fillText('29', 64, plate.height * .55); }
  world.panel(pt(pl.left, pl.out), pt(pl.right, pl.out), pl.bottom, pl.top, textured(plate));
  // Red lanterns at either end of the board.
  for (const u of [elevation.board.u[0] - .25, elevation.board.u[1] + .35]) world.cylinder('Eng Lee Huat lantern', pt(u, .25)[0], 2.85, pt(u, .25)[1], .26, .32, world.mat('#c22a25', .2));

  for (const r of engLeeHuatReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
