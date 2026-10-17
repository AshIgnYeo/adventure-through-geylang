import type { World, Point } from './world';
import { lorong18 } from './lorong-18-layout.mjs';
import { buildLaneHouse, text, sans, type Draws } from './lane-house';
import type { Draw } from './simple-house';

// A perforated grey screen with dark triangular openings and coloured strips laid across it, all in fractions of the
// board (x across, y down), after Le Regal's three screens.
type Strip = [number, number, number, number, string];
const screen = (holes: number[][][], strips: Strip[]): Draw => (c, w, h) => {
  c.fillStyle = '#b9bbbc'; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(80, 84, 86, .25)';
  for (let y = 4; y < h; y += 9) for (let x = (y / 9) % 2 ? 4 : 8.5; x < w; x += 9) c.fillRect(x, y, 2, 2);
  c.fillStyle = '#4a4e52';
  for (const t of holes) { c.beginPath(); t.forEach(([x, y], i) => i ? c.lineTo(x * w, y * h) : c.moveTo(x * w, y * h)); c.closePath(); c.fill(); }
  c.lineCap = 'butt';
  for (const [x0, y0, x1, y1, colour] of strips) { c.strokeStyle = colour; c.lineWidth = Math.min(w, h) * .035; c.beginPath(); c.moveTo(x0 * w, y0 * h); c.lineTo(x1 * w, y1 * h); c.stroke(); }
  c.strokeStyle = '#e4d27a'; c.lineWidth = Math.min(w, h) * .03; c.strokeRect(0, 0, w, h);
};
const Y = '#e4d27a', P = '#d27aa8';

// Named places only: original lettering after the photographed boards.
const draws: Draws = {
  'le-regal': {
    boards: [
      // Over the top two floors near the lane corner: a great X of yellow and pink strips.
      screen([[[.1, .05], [.45, .5], [.1, .9]], [[.55, .5], [.92, .1], [.9, .95]], [[.3, .02], [.7, .02], [.5, .35]]],
        [[0, 0, 1, 1, Y], [1, 0, 0, 1, Y], [.15, 0, .75, 1, P], [.85, 0, .25, 1, P], [0, .3, 1, .55, Y]]),
      // Full height: strips zigzagging across a tall, narrow panel round a chain of diamond openings.
      screen([0, 1, 2, 3, 4, 5].map(k => [[.5, k / 6 + .02], [.8, k / 6 + .083], [.5, k / 6 + .147], [.2, k / 6 + .083]]),
        [0, 1, 2, 3, 4, 5].flatMap(k => [[0, k / 6, 1, (k + 1) / 6, Y], [1, k / 6, 0, (k + 1) / 6, Y], [.1, k / 6 + .04, .9, (k + 1) / 6 + .04, P]] as Strip[])),
      // From the bridge stair to the roof: facets of triangles under long yellow strips.
      screen([[[.05, .05], [.4, .1], [.15, .4]], [[.5, .15], [.9, .05], [.7, .45]], [[.2, .55], [.55, .45], [.35, .85]], [[.6, .6], [.95, .5], [.85, .95]], [[.05, .7], [.2, .95], [.02, .98]]],
        [[0, .32, 1, .08, Y], [0, .28, 1, .78, Y], [.3, 0, .62, 1, Y], [.05, 1, .92, 0, Y], [0, .62, .6, 1, P], [.4, 0, 1, .4, P]]),
      // LE REGAL in dark capitals under a leaf mark, on the lobby wall.
      (c, w, h) => {
        c.fillStyle = '#c9cbcc'; c.fillRect(0, 0, w, h);
        c.fillStyle = '#2a2c2e'; c.beginPath(); c.ellipse(w * .7, h * .22, w * .05, h * .14, -.6, 0, Math.PI * 2); c.fill();
        c.strokeStyle = '#2a2c2e'; c.lineWidth = h * .025; c.beginPath(); c.moveTo(w * .08, h * .82); c.quadraticCurveTo(w * .5, h * .62, w * .92, h * .78); c.stroke();
        text(c, 'LE REGAL', w * .48, h * .5, h * .34, '#2a2c2e', '600', 'Georgia, "Times New Roman", serif', w * .9);
      },
    ],
  },
  // BudgetOne Hotel in blue with an orange O and a pink Hotel, and the red oyo board over the stair strip.
  'budgetone-hotel': {
    boards: [(c, w, h) => {
      c.font = `italic 800 ${Math.round(h * .8)}px ${sans}`; c.textBaseline = 'middle'; c.textAlign = 'left';
      const parts: [string, string][] = [['Budget', '#2a3a9a'], ['O', '#e8782a'], ['ne ', '#2a3a9a'], ['Hotel', '#d8506a']];
      const total = parts.reduce((s, [t]) => s + c.measureText(t).width, 0), k = Math.min(1, w * .96 / total);
      c.setTransform(k, 0, 0, 1, w * .02, 0); let x = 0;
      for (const [t, colour] of parts) { c.fillStyle = colour; c.fillText(t, x, h * .55); x += c.measureText(t).width; }
      c.setTransform(1, 0, 0, 1, 0, 0);
    }, (c, w, h) => {
      c.fillStyle = '#d8403a'; c.fillRect(0, 0, w, h);
      ['o', 'y', 'o'].forEach((ch, i) => text(c, ch, w * .5, h * (.2 + i * .3), w * .7, '#f8f4f0', '800', sans));
    }],
  },
  // The number 340 on the corner's fascia.
  'le-regal@8': {
    boards: [(c, w, h) => { c.fillStyle = '#6a6d70'; c.fillRect(0, 0, w, h); text(c, '340', w * .5, h * .55, h * .78, '#f0f0ec', '700', sans, w * .9); }],
  },
};

/** Lorong 18 between Geylang Road and Westerhout Road, with the Geylang Road block back to Lorong 16; named only where a
 * listing and a photographed sign agree. */
export function buildLorong18(world: World, id: string, poly: Point[]) {
  const place = lorong18.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
