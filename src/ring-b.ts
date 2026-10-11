import type { World, Point } from './world';
import { ringB, ringBFrame, ringBLayout, ringBReviews } from './ring-b-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

// Named places only: original lettering after the photographed sign.
const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
const draws: Record<string, { boards?: Draw[] }> = {
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
