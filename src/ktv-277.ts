import type { World, Point } from './world';
import { ktv277, ktvFrame, ktvLayout, ktvReviews } from './ktv-277-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

const canvases = new Map<string, HTMLCanvasElement>();

/** June 2024 exterior of the 277 KTV pair, one source outline at a time. */
export function buildKtv277(world: World, id: string, poly: Point[]) {
  const unit = ktv277.buildingIds.indexOf(id);
  if (unit < 0) return false;
  const frame = ktvFrame(poly), { width } = frame;
  const layout = ktvLayout(width, unit);
  const { pt, textured } = buildPairedShophouse(world, '277 KTV', frame, layout, ktv277, {
    tile: unit ? '#c56a4c' : '#cf7552', course: '#a9573d', coping: '#c98d7b', gable: '#cfa69b', copingHeight: .25, copingWidth: .2, frontCap: { length: .45, height: .3 },
  });

  // Original redrawings of the two boards; brand panels and cartoon figures are omitted.
  const board = (key: string, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, b: { from: number; to: number; bottom: number; top: number }) => {
    if (!canvases.has(key)) {
      const canvas = document.createElement('canvas'); canvas.width = 4096; canvas.height = Math.round(4096 * (b.top - b.bottom) / (b.to - b.from));
      const c = canvas.getContext('2d')!; c.fillStyle = '#111111'; c.fillRect(0, 0, 4096, canvas.height);
      draw(c, 4096, canvas.height); canvases.set(key, canvas);
    }
    return canvases.get(key)!;
  };
  const gilt = (c: CanvasRenderingContext2D) => { const g = c.createLinearGradient(0, 0, 0, 300); g.addColorStop(0, '#f2c95c'); g.addColorStop(1, '#d58a2c'); return g; };
  const signboard = board('signboard', (c, w, h) => {
    c.textBaseline = 'middle'; c.strokeStyle = '#7a2a1c'; c.lineWidth = 10;
    c.font = '700 270px "Songti SC", "STSong", serif'; c.fillStyle = gilt(c);
    for (const [t, x] of [['芽', 560], ['笼', 840], ['醉', 3260], ['好', 3540]] as const) { c.strokeText(t, x, h * .52); c.fillText(t, x, h * .52); }
    c.font = '900 300px "Arial Black", sans-serif'; c.fillStyle = '#f3d54a'; c.fillText('277', 1180, h * .52);
    c.font = '700 170px Georgia, serif'; c.fillStyle = '#e9e7e0'; c.fillText('KTV', 1760, h * .6);
  }, ktv277.signboard);
  const lower = board('lowerBoard', (c, w, h) => {
    c.textBaseline = 'middle'; c.textAlign = 'center';
    for (const [x, text] of [[520, '醉好'], [1700, '277'], [3060, '醉好']] as const) {
      if (text === '277') { c.font = '900 190px "Arial Black", sans-serif'; c.fillStyle = '#e8c04e'; c.fillText('277', x, h * .36); c.font = '700 150px Georgia, serif'; c.fillStyle = '#e9e7e0'; c.fillText('KTV', x, h * .78); }
      else { c.font = '700 230px "Songti SC", "STSong", serif'; c.fillStyle = '#c9a25a'; c.fillText(text, x, h * .55); }
    }
  }, ktv277.lowerBoard);
  for (const s of layout.shares) {
    world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, textured(s.key === 'signboard' ? signboard : lower, s.key === 'signboard' ? .12 : .05), [s.uv[0], 0, s.uv[1], 1]);
  }

  // Black diamond-quilted wall with studs; the west unit carries the star and microphone.
  const q = layout.quilt, qc = document.createElement('canvas'); qc.width = 1024; qc.height = Math.round(1024 * (q.top - q.bottom) / (q.right - q.left));
  const c = qc.getContext('2d')!, H = qc.height, cell = 1024 / ((q.right - q.left) / .32);
  c.fillStyle = '#151515'; c.fillRect(0, 0, 1024, H);
  c.strokeStyle = '#3a3a3a'; c.lineWidth = 4;
  for (let x = -H; x < 1024 + H; x += cell) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + H, H); c.stroke(); c.beginPath(); c.moveTo(x, H); c.lineTo(x + H, 0); c.stroke(); }
  c.fillStyle = '#8c8471';
  for (let x = 0; x < 1024 + cell; x += cell / 2) for (let y = 0; y < H + cell; y += cell / 2) if ((Math.round(x / (cell / 2)) + Math.round(y / (cell / 2))) % 2 === 0) { c.beginPath(); c.arc(x, y, 4, 0, Math.PI * 2); c.fill(); }
  if (q.star) {
    const sx = 300, sy = H * .5, R = 170;
    c.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? R * .45 : R; c.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r); } c.closePath();
    c.lineWidth = 18; c.strokeStyle = '#d6a640'; c.stroke();
    c.fillStyle = '#9da3a8'; c.beginPath(); c.ellipse(sx, sy - 40, 38, 52, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#6f757a'; c.fillRect(sx - 12, sy + 10, 24, 120);
  }
  world.panel(pt(q.left, q.out), pt(q.right, q.out), q.bottom, q.top, textured(qc));

  if (unit === 0) for (const r of ktvReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
