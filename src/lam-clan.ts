import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { lamClan, lamClanFrame, lamClanLayout, lamClanReviews } from './lam-clan-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** April 2024 exterior of No. 3 Lorong 15, using the untouched source outline. */
export function buildLamClan(world: World, id: string, poly: Point[]) {
  if (!lamClan.buildingIds.includes(id)) return false;
  const frame = lamClanFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const blue = material('#a6d4ea'), side = material('#e9ecea'), wallTop = lamClan.height + .08;

  // Party and rear walls to the eaves; the blue front rises to the parapet above the recess.
  world.panel(frame.a, frame.rearA, .13, wallTop, side);
  world.panel(frame.b, frame.rearB, .13, wallTop, side);
  world.panel(frame.rearA, frame.rearB, .13, wallTop, side);
  world.panel(pt(0), pt(width), 3.05, lamClan.parapet, blue);
  for (const [u0, u1] of [[0, .14], [width - .14, width]]) world.panel(pt(u0), pt(u1), 0, 3.05, blue);
  for (const u of [.14, width - .14]) world.panel(pt(u, 0), pt(u, -lamClan.recess), 0, 3.05, blue);

  const layout = lamClanLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Lam Clan ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, angle);
  }

  // Raised characters on the parapet, displayed in the observed left-to-right order
  // 會総氏藍 and read right to left. Redrawn in an original brush-style serif.
  const lt = layout.lettering, letters = document.createElement('canvas');
  letters.width = 2048; letters.height = Math.round(2048 * (lt.top - lt.bottom) / (lt.right - lt.left));
  const c = letters.getContext('2d')!, h = letters.height;
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `700 ${h * .8}px "Kaiti SC", "STKaiti", "Songti SC", serif`;
  [...'會総氏藍'].forEach((ch, i) => {
    const x = 2048 * (.12 + .253 * i);
    c.fillStyle = 'rgba(70,90,96,.55)'; c.fillText(ch, x + 10, h * .54 + 12);
    c.fillStyle = '#2f3436'; c.fillText(ch, x, h * .54);
  });
  world.panel(pt(lt.left, lt.out), pt(lt.right, lt.out), lt.bottom, lt.top, textured(letters, true));

  // Black board with gilt 藍氏総會 over the doors; festive lanterns are omitted.
  const bd = layout.board, board = document.createElement('canvas');
  board.width = 1536; board.height = Math.round(1536 * (bd.top - bd.bottom) / (bd.right - bd.left));
  const b = board.getContext('2d')!, bh = board.height;
  b.fillStyle = '#121212'; b.fillRect(0, 0, 1536, bh);
  b.strokeStyle = '#6b5a2f'; b.lineWidth = 8; b.strokeRect(6, 6, 1524, bh - 12);
  b.textAlign = 'center'; b.textBaseline = 'middle'; b.font = `700 ${bh * .62}px "Kaiti SC", "STKaiti", "Songti SC", serif`;
  [...'會総氏藍'].forEach((ch, i) => { b.fillStyle = '#7a5d22'; b.fillText(ch, 330 + i * 300 + 5, bh * .52 + 5); b.fillStyle = '#d7b866'; b.fillText(ch, 330 + i * 300, bh * .52); });
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(board));

  // Grey stone forecourt paving out towards Lorong 15.
  const fc = layout.forecourt, pave = document.createElement('canvas'); pave.width = pave.height = 512;
  const p = pave.getContext('2d')!;
  let seed = 3;
  for (let x = 0; x < 512; x += 64) for (let y = 0; y < 512; y += 64) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const g = 150 + seed % 30; p.fillStyle = `rgb(${g},${g + 2},${g + 4})`; p.fillRect(x, y, 64, 64);
  }
  p.strokeStyle = '#7d8183'; p.lineWidth = 3;
  for (let i = 0; i <= 512; i += 64) { p.beginPath(); p.moveTo(i, 0); p.lineTo(i, 512); p.stroke(); p.beginPath(); p.moveTo(0, i); p.lineTo(512, i); p.stroke(); }
  const paveMat = textured(pave);
  const corners = [pt(fc.left, 0), pt(fc.right, 0), pt(fc.right, fc.out), pt(fc.left, fc.out)];
  world.mesh('Lam Clan forecourt', corners.flatMap(q => [q[0], .05, q[1]]), [0, 0, width / 1.6, 0, width / 1.6, fc.out / 1.6, 0, fc.out / 1.6], [0, 2, 1, 0, 3, 2], paveMat);

  buildGableRoof(world, 'Lam Clan', frame, gableRoof(frame, lamClan), {
    tile: '#9b5543', course: '#84463a', coping: '#d9e2e3', gable: '#e9ecea', copingHeight: .12, copingWidth: .14,
  });

  for (const r of lamClanReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
