import type { World, Point } from './world';
import { sikWaiSin, sikWaiSinFrame, sikWaiSinLayout, sikWaiSinReviews } from './sik-wai-sin-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

/** June 2024 exterior of No. 289, using the untouched source outline. */
export function buildSikWaiSin(world: World, id: string, poly: Point[]) {
  if (!sikWaiSin.buildingIds.includes(id)) return false;
  const frame = sikWaiSinFrame(poly), { width } = frame;
  const layout = sikWaiSinLayout(width);
  const { pt, textured } = buildPairedShophouse(world, 'Sik Wai Sin', frame, layout, sikWaiSin);

  // Round emblem: the character 食 in a white ring on red, with a tasselled cord.
  const emblem = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    c.fillStyle = '#f3ead8'; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#c8302d'; c.beginPath(); c.arc(x, y, r * .84, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#f3ead8'; c.lineWidth = r * .06; c.beginPath(); c.arc(x, y, r * .7, 0, Math.PI * 2); c.stroke();
    c.fillStyle = '#f3ead8'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `700 ${r * 1.05}px "Songti SC", "STSong", serif`; c.fillText('食', x, y + r * .04);
    c.beginPath(); c.moveTo(x - r * .1, y + r); c.lineTo(x + r * .1, y + r); c.lineTo(x + r * .35, y + r * 1.45); c.lineTo(x - r * .35, y + r * 1.45); c.closePath(); c.fill();
    c.fillRect(x - r * .5, y + r * 1.42, r, r * .1);
  };

  // Red fascia, redrawn with original typography: 食為先 SIK WAI SIN, emblem and 289.
  const sign = layout.sign, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (sign.top - sign.bottom) / (sign.right - sign.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#c8302d'; c.fillRect(0, 0, 2048, h);
  c.strokeStyle = '#9c2321'; c.lineWidth = 8; c.strokeRect(4, 4, 2040, h - 8);
  c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = 10; c.strokeStyle = '#8e1f1c'; c.fillStyle = '#ecc75a';
  c.font = '700 168px "Songti SC", "STSong", serif';
  [...'食為先'].forEach((ch, i) => { c.strokeText(ch, 90 + i * 215, h * .54); c.fillText(ch, 90 + i * 215, h * .54); });
  c.font = '900 150px "Arial Rounded MT Bold", "Arial Black", sans-serif';
  c.strokeText('SIK WAI SIN', 760, h * .56, 830); c.fillText('SIK WAI SIN', 760, h * .56, 830);
  emblem(c, 1795, h * .42, h * .3);
  c.font = '700 54px sans-serif'; c.fillStyle = '#ecc75a'; c.textAlign = 'right'; c.fillText('289', 2010, h * .84);
  world.panel(pt(sign.left, sign.out), pt(sign.right, sign.out), sign.bottom, sign.top, textured(canvas, .06));

  // Small red board over the shutter: 食為先大飯店 and SIK WAI SIN EATING HOUSE.
  const board = layout.board, boardCanvas = document.createElement('canvas');
  boardCanvas.width = 1024; boardCanvas.height = Math.round(1024 * (board.top - board.bottom) / (board.right - board.left));
  const bc = boardCanvas.getContext('2d')!, bh = boardCanvas.height;
  bc.fillStyle = '#b62a27'; bc.fillRect(0, 0, 1024, bh);
  bc.strokeStyle = '#efe4c6'; bc.lineWidth = 10; bc.strokeRect(10, 10, 1004, bh - 20);
  bc.fillStyle = '#efcf63'; bc.textAlign = 'center'; bc.textBaseline = 'middle';
  bc.font = '700 150px "Songti SC", "STSong", serif'; bc.fillText('食為先大飯店', 512, bh * .38, 940);
  bc.font = '700 74px sans-serif'; bc.fillStyle = '#f4efe2'; bc.fillText('SIK WAI SIN EATING HOUSE', 512, bh * .78, 940);
  world.panel(pt(board.left, board.out), pt(board.right, board.out), board.bottom, board.top, textured(boardCanvas));

  for (const r of sikWaiSinReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
