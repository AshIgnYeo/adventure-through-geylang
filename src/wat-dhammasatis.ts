import type { World, Point } from './world';
import { watDhammasatis, watDhammasatisFrame, watDhammasatisLayout, watDhammasatisReviews } from './wat-dhammasatis-layout.mjs';
import { buildSimpleHouse } from './simple-house';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'sans-serif', weight = '700', max?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, max);
};

/** June 2024 exterior of No. 233 Geylang Road, with Wat Dhammasatis upstairs. */
export function buildWatDhammasatis(world: World, id: string, poly: Point[]) {
  if (!watDhammasatis.buildingIds.includes(id)) return false;
  const frame = watDhammasatisFrame(poly), layout = watDhammasatisLayout(frame.width);
  buildSimpleHouse(world, 'Wat Dhammasatis', frame, poly, watDhammasatis, layout, {
    boards: [
      (c, w, h) => {
        c.fillStyle = '#15130f'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9a24a'; c.lineWidth = h * .03; c.strokeRect(4, 4, w - 8, h - 8);
        c.strokeStyle = '#d9b45a'; c.lineWidth = h * .05; c.beginPath(); c.arc(h * .5, h * .55, h * .32, 0, Math.PI * 2); c.stroke();
        text(c, 'OK', h * .5, h * .58, h * .2, '#d9b45a');
        text(c, 'Durian & Fruits Experience Centre', w * .58, h * .25, h * .15, '#f1e3b0', '"Helvetica Neue", sans-serif', '700', w * .7);
        text(c, '榴莲鲜果体验馆', w * .58, h * .58, h * .32, '#e8c160', '"Kaiti SC", serif', '900', w * .7);
        text(c, 'www.deluxefruits.com', w * .58, h * .86, h * .09, '#e8c160');
      },
      (c, w, h) => {
        c.fillStyle = '#8f3b3e'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f2e9e2'; c.lineWidth = h * .06; c.strokeRect(2, 2, w - 4, h - 4);
        text(c, 'WAT DHAMMASATIS', w / 2, h * .36, h * .38, '#f6f1ec', 'Georgia, serif', '700', w * .92);
        text(c, 'BUDDHIST CENTRE  วัดธรรมสาทิส', w / 2, h * .76, h * .24, '#f6f1ec', 'Georgia, serif', '700', w * .92);
      },
    ],
    awning: '#3a3d40',
    valance: (c, w, h) => { c.fillStyle = '#3a3d40'; c.fillRect(0, 0, w, h); for (let i = 0; i < 14; i++) { c.fillStyle = '#fff7d8'; c.beginPath(); c.arc(w * (i + .5) / 14, h * .7, h * .14, 0, Math.PI * 2); c.fill(); } },
  });
  for (const r of watDhammasatisReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
