import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { tbss, tbssFrame, tbssLayout, tbssReviews, colours } from './tbss-layout.mjs';
import { buildPeranakanHouse } from './peranakan';

/** April 2024 exterior of No. 21 Lorong 11, on its re-spaced footprint. */
export function buildTbss(world: World, id: string, poly: Point[]) {
  if (!tbss.buildingIds.includes(id)) return false;
  const frame = tbssFrame(poly), layout = tbssLayout(frame.width);
  const { pt, textured, panel } = buildPeranakanHouse(world, 'TBSS', frame, layout, colours.wall);
  // Red board: a Tibetan-script line, 藏密佛学研究会 and Tibetan Buddhist Studies Society, with a mandala roundel, redrawn originally.
  const bd = layout.board, canvas = document.createElement('canvas');
  canvas.width = 1536; canvas.height = Math.round(1536 * (bd.top - bd.bottom) / (bd.right - bd.left));
  {
    const c = canvas.getContext('2d')!, w = canvas.width, h = canvas.height;
    c.fillStyle = '#c4222a'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#e9d7b8'; c.fillRect(0, 0, w * .19, h); c.fillStyle = '#2f5e93'; c.font = `700 ${h * .09}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('TBSS.ORG', w * .095, h * .1);
    c.fillStyle = '#b13a2e'; c.beginPath(); c.arc(w * .095, h * .55, h * .28, 0, Math.PI * 2); c.fill();
    const g = c.createRadialGradient(w * .89, h * .5, 4, w * .89, h * .5, h * .45); g.addColorStop(0, '#e9c46a'); g.addColorStop(.6, '#c0392b'); g.addColorStop(1, '#e9a23b');
    c.fillStyle = g; c.beginPath(); c.arc(w * .89, h * .5, h * .44, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffe9a8'; c.font = `500 ${h * .12}px serif`; c.fillText('༄༅། །བོད་ཀྱི་ནང་བསྟན་ཞིབ་འཇུག་ཚོགས་པ། །', w * .53, h * .14, w * .6);
    c.fillStyle = '#fff1c4'; c.font = `700 ${h * .32}px "Kaiti SC", "STKaiti", serif`; c.fillText('藏 密 佛 学 研 究 会', w * .53, h * .45, w * .62);
    c.fillStyle = '#ffffff'; c.font = `500 ${h * .14}px "Helvetica Neue", sans-serif`; c.fillText('Tibetan Buddhist Studies Society', w * .53, h * .7, w * .6);
    for (let i = 0; i < 8; i++) { c.fillStyle = ['#2c4f7c', '#d9a43c', '#6a2c70'][i % 3]; c.fillRect(w * (.22 + i * .075), h * .8, w * .06, h * .16); }
  }
  panel(bd, textured(canvas, .08));
  // Gilded Dharma wheel, both faces.
  const wh = layout.wheel, wc = document.createElement('canvas'); wc.width = wc.height = 256;
  {
    const c = wc.getContext('2d')!; c.strokeStyle = '#d9ad3c'; c.fillStyle = '#d9ad3c'; c.lineWidth = 16;
    c.beginPath(); c.arc(128, 128, 104, 0, Math.PI * 2); c.stroke(); c.beginPath(); c.arc(128, 128, 30, 0, Math.PI * 2); c.fill();
    c.lineWidth = 10; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; c.beginPath(); c.moveTo(128 + Math.cos(a) * 30, 128 + Math.sin(a) * 30); c.lineTo(128 + Math.cos(a) * 100, 128 + Math.sin(a) * 100); c.stroke(); }
  }
  const wm = textured(wc, .2, true);
  for (const d of [-.01, .01]) world.panel(pt(wh.u - wh.r, wh.out + d), pt(wh.u + wh.r, wh.out + d), wh.y - wh.r, wh.y + wh.r, wm);
  // Red retractable awning over the five-foot way.
  const aw = layout.awning, corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)], ys = [aw.wall, aw.wall, aw.front, aw.front];
  const red = world.mat('#a52a33'); red.cull = pc.CULLFACE_NONE; red.update();
  world.mesh('TBSS awning', corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], red);
  world.panel(pt(aw.from, aw.depth), pt(aw.to, aw.depth), aw.front - .18, aw.front, red);
  for (const r of tbssReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
