import type { World, Point } from './world';
import { eatFirst, eatFirstFrame, eatFirstLayout, eatFirstReviews } from './eat-first-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

/** June 2024 exterior of No. 287, using the untouched source outline. */
export function buildEatFirst(world: World, id: string, poly: Point[]) {
  if (!eatFirst.buildingIds.includes(id)) return false;
  const frame = eatFirstFrame(poly), { width } = frame;
  const layout = eatFirstLayout(width);
  const { pt, textured } = buildPairedShophouse(world, 'Eat First', frame, layout, eatFirst);

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

  for (const r of eatFirstReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
