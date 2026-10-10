import type { World, Point } from './world';
import { geylangSouth, geylangSouthFrame, geylangSouthLayout, geylangSouthReviews } from './geylang-south-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = '"Helvetica Neue", Arial, sans-serif', weight = '700', maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, maxWidth);
};
const plain = (colour: string): Draw => (c, w, h) => { c.fillStyle = colour; c.fillRect(0, 0, w, h); };

const draws: Record<string, { boards?: Draw[]; blades?: Draw[]; awning?: string; valance?: Draw }> = {
  'monster-ink': {
    boards: [
      (c, w, h) => {
        c.fillStyle = '#f4f4f1'; c.fillRect(0, 0, w, h);
        c.fillStyle = '#151515'; for (const x of [.1, .2]) { c.beginPath(); c.arc(w * x, h * .3, h * .14, 0, Math.PI * 2); c.fill(); }
        c.beginPath(); c.arc(w * .15, h * .5, h * .2, 0, Math.PI * 2); c.fill();
        text(c, 'MONSTER INK', w * .58, h * .45, h * .45, '#151515', '"Arial Black", sans-serif', '900', w * .7);
        text(c, 'TATTOO', w * .58, h * .82, h * .16, '#151515'); text(c, '240', w * .93, h * .82, h * .14, '#555');
      },
      (c, w, h) => { c.clearRect(0, 0, w, h); text(c, 'DOUBBLE', w / 2, h * .55, h * .8, '#f4f4f1', '"Didot", "Times New Roman", serif', '500', w * .95); },
    ],
  },
  'shadow-tattoo': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1b1b1c'; c.fillRect(0, 0, w, h);
      text(c, 'SHADOW TATTOO', w / 2, h * .38, h * .42, '#f2f2ee', '"Helvetica Neue", Arial, sans-serif', '400', w * .94);
      text(c, '皮影刺青', w * .4, h * .8, h * .22, '#f2f2ee', '"Songti SC", serif', '700'); text(c, '· ACADEMY', w * .62, h * .8, h * .12, '#d9b44a');
    }],
    blades: [(c, w, h) => {
      c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h);
      [...'TATTOO'].forEach((ch, i) => text(c, ch, w / 2, h * (.08 + i * .12), w * .6, '#151515', '"Arial Black", sans-serif', '900'));
      text(c, '刺', w / 2, h * .82, w * .5, '#151515', '"Songti SC", serif', '900'); text(c, '青', w / 2, h * .93, w * .5, '#151515', '"Songti SC", serif', '900');
    }],
  },
  'nanyang-lian': {
    boards: [
      (c, w, h) => {
        c.fillStyle = '#e8c33a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8942a'; c.lineWidth = h * .05; c.strokeRect(0, 0, w, h);
        text(c, '南 洋 連 氏 公 會', w / 2, h * .38, h * .5, '#b0272a', '"Kaiti SC", "STKaiti", serif', '900', w * .9);
        text(c, 'NANYANG LIAN CLAN ASSOCIATION', w / 2, h * .82, h * .2, '#b0272a', '"Helvetica Neue", Arial, sans-serif', '700', w * .9);
      },
      (c, w, h) => {
        c.fillStyle = '#1f4f9a'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8322d'; c.fillRect(0, h * .82, w, h * .18);
        text(c, 'BKK FOREX PTE LTD', w * .58, h * .25, h * .22, '#f4f4ef', '"Helvetica Neue", Arial, sans-serif', '800', w * .7);
        text(c, '鹏泰集团外币汇换', w * .58, h * .5, h * .2, '#f4f4ef', '"Songti SC", serif', '700', w * .7);
        text(c, 'REMITTANCE & MONEY EXCHANGE', w / 2, h * .91, h * .11, '#f4f4ef', 'Arial, sans-serif', '700', w * .9);
        text(c, 'no 248', w * .93, h * .7, h * .1, '#f4f4ef');
        c.fillStyle = '#f4f4ef'; c.beginPath(); c.ellipse(w * .12, h * .4, h * .26, h * .2, 0, 0, Math.PI * 2); c.fill();
      },
    ],
    awning: '#c8463a', valance: plain('#b23c32'),
  },
  'gr-238': { awning: '#a85a4c', valance: plain('#934c40') },
  'gr-242': { awning: '#7a2a28', valance: plain('#6a2422') },
  'gr-250': { awning: '#5b6a5a', valance: plain('#4c5a4b') },
};

/** June 2024 exteriors on the split south-side block, Geylang Road Nos. 236-250. */
export function buildGeylangSouth(world: World, id: string, poly: Point[]) {
  const place = geylangSouth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = geylangSouthFrame(poly, place), layout = geylangSouthLayout(place, frame.width) as any;
  buildSimpleHouse(world, place.name, frame, poly, place, layout, draws[place.id] ?? {});
  for (const r of geylangSouthReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
