import type { World, Point } from './world';
import { ringB, ringBFrame, ringBLayout, ringBReviews } from './ring-b-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

// Named places only: original lettering after the photographed sign.
const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
// The Hotel 81 mark: teal panel with white lettering beside a white box with teal numerals.
const hotel81 = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
  c.fillStyle = '#1f9aa3'; c.fillRect(x, y, w * .72, h); c.fillStyle = '#f4f6f6'; c.fillRect(x + w * .72, y, w * .28, h);
  text(c, 'HOTEL', x + w * .36, y + h * .54, h * .72, '#f4f6f6', '700', '"Helvetica Neue", Arial, sans-serif', w * .66);
  text(c, '81', x + w * .86, y + h * .54, h * .8, '#1f9aa3', '700', '"Helvetica Neue", Arial, sans-serif', w * .26);
};
const draws: Record<string, { boards?: Draw[]; blades?: Draw[] }> = {
  'hotel-81-cherry': {
    boards: [
      (c, w, h) => { c.fillStyle = '#f1f0ec'; c.fillRect(0, 0, w, h); hotel81(c, w * .04, h * .12, w * .92, h * .76); },
      (c, w, h) => { c.clearRect(0, 0, w, h); hotel81(c, 0, 0, w, h * .55); text(c, 'Cherry', w * .45, h * .8, h * .3, '#d6335a', 'italic 700', 'Georgia, "Times New Roman", serif'); },
    ],
    blades: [(c, w, h) => {
      c.fillStyle = '#f1f0ec'; c.fillRect(0, 0, w, h); c.fillStyle = '#1f9aa3'; c.fillRect(w * .08, h * .02, w * .84, h * .6);
      [...'HOTEL'].forEach((ch, i) => text(c, ch, w / 2, h * (.08 + i * .115), w * .62, '#f4f6f6', '700', '"Helvetica Neue", Arial, sans-serif'));
      text(c, '81', w / 2, h * .74, w * .7, '#1f9aa3', '700', '"Helvetica Neue", Arial, sans-serif', w * .9);
      c.fillStyle = '#2b4fa8'; c.fillRect(w * .08, h * .86, w * .84, h * .11);
      text(c, 'CHERRY', w / 2, h * .915, w * .2, '#f4f6f6', '700', 'Georgia, serif', w * .8);
    }],
  },
  'master-tailors': { boards: [(c, w, h) => {
    c.fillStyle = '#f4f3ef'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8b4aa'; c.lineWidth = h * .03; c.strokeRect(0, 0, w, h);
    c.fillStyle = '#c0392b'; c.beginPath(); c.arc(h * .48, h * .5, h * .36, 0, Math.PI * 2); c.fill(); c.fillStyle = '#f4f3ef'; c.beginPath(); c.arc(h * .48, h * .5, h * .27, 0, Math.PI * 2); c.fill();
    text(c, '新加坡軒轅洋服商會', w * .56, h * .32, h * .36, '#c0392b', '700', '"Songti SC", "STSong", serif', w * .8);
    text(c, "SINGAPORE MASTER TAILORS' ASSOCIATION", w * .56, h * .75, h * .2, '#1f1f1f', '700', '"Helvetica Neue", Arial, sans-serif', w * .8);
  }] },
  'chinese-eating-house-owners': { boards: [(c, w, h) => {
    c.fillStyle = '#4a2a26'; c.fillRect(0, 0, w, h); c.strokeStyle = '#d8d2c4'; c.lineWidth = h * .025; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
    text(c, [...'華人飯商公會'].join(' '), w / 2, h * .36, h * .42, '#f4f1ea', '700', '"Songti SC", "STSong", serif', w * .9);
    text(c, "CHINESE EATING HOUSE OWNER'S ASSOCIATION", w / 2, h * .78, h * .2, '#f4f1ea', '700', '"Helvetica Neue", Arial, sans-serif', w * .92);
  }] },
  // Raised bronze letters on the mauve podium.
  'summer-view': { boards: [(c, w, h) => {
    c.clearRect(0, 0, w, h); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowOffsetY = h * .06;
    text(c, 'SUMMER  VIEW', w / 2, h * .55, h * .78, '#5a4a3a', '700', 'Georgia, "Times New Roman", serif', w * .98);
  }] },
  // Pale board with serif lettering beside a line drawing of bottles and glasses.
  'vintage-and-vine': { boards: [(c, w, h) => {
    c.fillStyle = '#ecebe7'; c.fillRect(0, 0, w, h); c.strokeStyle = '#2b2b2b'; c.lineWidth = h * .025;
    for (const [x, top, r] of [[.1, .3, .045], [.15, .2, .04], [.2, .35, .035], [.25, .25, .04]] as const) {
      c.beginPath(); c.moveTo(w * x - h * r, h * .85); c.lineTo(w * x - h * r, h * top + h * .2); c.lineTo(w * x, h * top); c.lineTo(w * x + h * r, h * top + h * .2); c.lineTo(w * x + h * r, h * .85); c.stroke();
    }
    text(c, 'VINTAGE & VINE', w * .62, h * .44, h * .32, '#1f1f1f', '600', 'Georgia, "Times New Roman", serif', w * .6);
    text(c, 'FINE WINE & SPIRITS', w * .62, h * .74, h * .12, '#1f1f1f', '600', '"Helvetica Neue", Arial, sans-serif', w * .4);
  }] },
  'yaju-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#7a2e2a'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `700 ${Math.round(h * .46)}px "Kaiti SC", "STKaiti", serif`; c.fillText('雅居酒店', w / 2, h * .34, w * .9);
    c.font = `700 ${Math.round(h * .26)}px "Helvetica Neue", Arial, sans-serif`; c.fillText('YA JU HOTEL', w / 2, h * .78, w * .9);
  }] },
};

/** June 2024 exteriors on Lorong 12 south of Geylang Road. */
export function buildRingB(world: World, id: string, poly: Point[]) {
  const place = ringB.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringBFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringBLayout(place, frame.width) as any, draws[place.id] ?? {});
  for (const r of ringBReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
