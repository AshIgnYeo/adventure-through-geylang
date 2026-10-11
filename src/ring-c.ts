import type { World, Point } from './world';
import { ringC, ringCFrame, ringCLayout, ringCReviews } from './ring-c-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
// Named places only: original lettering after the photographed signs.
const raised = (t: string, family: string, weight = '700', spacing = '') => ((c, w, h) => {
  c.clearRect(0, 0, w, h); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowOffsetY = h * .04;
  text(c, spacing ? [...t].join(spacing) : t, w / 2, h * .55, h * .82, '#4a4a46', weight, family, w * .98);
}) as Draw;
const draws: Record<string, { boards?: Draw[] }> = {
  // White board with a gold clover and gold lettering on the green fascia.
  'dnova-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#f4f2ea'; c.fillRect(0, 0, w, h); c.fillStyle = '#b89140';
    for (const a of [0, 1, 2, 3]) { c.beginPath(); c.arc(h * .55 + Math.cos(a * Math.PI / 2) * h * .14, h * .5 + Math.sin(a * Math.PI / 2) * h * .14, h * .15, 0, Math.PI * 2); c.fill(); }
    text(c, "D'Nova Hotel", w * .58, h * .54, h * .62, '#b89140', '700', 'Georgia, "Times New Roman", serif', w * .74);
  }] },
  'jxin-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#2235b8'; c.fillRect(0, 0, w, h);
    text(c, '嘉鑫酒店', w * .2, h * .52, h * .5, '#f4f2ea', '700', '"Kaiti SC", "STKaiti", serif', w * .32);
    text(c, 'JXIN', w * .56, h * .52, h * .66, '#f2c21b', 'italic 900', '"Arial Black", "Helvetica Neue", sans-serif', w * .3);
    text(c, 'HOTEL', w * .85, h * .54, h * .4, '#f4f2ea', '700', '"Helvetica Neue", Arial, sans-serif', w * .24);
  }] },
  'jh-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#1f3a8c'; c.fillRect(0, 0, w, h);
    text(c, '嘉華酒店', w / 2, h * .36, h * .48, '#f4f2ea', '700', '"Kaiti SC", "STKaiti", serif', w * .9);
    text(c, 'JH HOTEL', w / 2, h * .8, h * .26, '#f4f2ea', '700', '"Helvetica Neue", Arial, sans-serif', w * .9);
  }] },
  'nanyang-fan-clan': { boards: [
    raised('南洋范氏總會', '"Songti SC", "STSong", serif', '900', ' '),
    raised('NANYANG FAN CLAN GENERAL ASSOCIATION', '"Helvetica Neue", Arial, sans-serif'),
    raised('旺源樓', '"Songti SC", "STSong", serif', '900', ' '),
  ] },
};

/** June 2024 exteriors on Lorong 10, south of Geylang Road, in the widened study area. */
export function buildRingC(world: World, id: string, poly: Point[]) {
  const place = ringC.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringCFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringCLayout(place, frame.width) as any, draws[place.id] ?? {});
  for (const r of ringCReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
