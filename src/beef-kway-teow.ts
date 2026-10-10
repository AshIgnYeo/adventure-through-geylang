import type { World, Point } from './world';
import { beefKwayTeow, beefKwayTeowFrame, beefKwayTeowLayout, beefKwayTeowReviews, floors, sideBays } from './beef-kway-teow-layout.mjs';
import { buildSimpleHouse } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'sans-serif', weight = '700', max?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, max);
};
const board = (zh: string): ((c: CanvasRenderingContext2D, w: number, h: number) => void) => (c, w, h) => {
  c.fillStyle = '#c8302c'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f3e6c8'; c.lineWidth = h * .05; c.strokeRect(h * .05, h * .05, w - h * .1, h - h * .1);
  text(c, zh, w / 2, h * .38, h * .44, '#f8f1dc', '"Kaiti SC", "STKaiti", serif', '900', w * .9);
  text(c, zh.length > 5 ? 'GEYLANG LOR 9 BEEF KWAY TEOW' : 'LOR 9 BEEF KWAY TEOW', w / 2, h * .8, h * .2, '#f8f1dc', 'sans-serif', '700', w * .9);
};

/** June 2024 exterior of the Lorong 9 corner building at 237 Geylang Road. */
export function buildBeefKwayTeow(world: World, id: string, poly: Point[]) {
  if (!beefKwayTeow.buildingIds.includes(id)) return false;
  const frame = beefKwayTeowFrame(poly), layout = beefKwayTeowLayout(frame.width);
  const { textured } = buildSimpleHouse(world, 'Lor 9 Beef Kway Teow', frame, poly, beefKwayTeow, layout, {
    boards: [board('芽龍九巷牛肉河粉')],
    blades: [(c, w, h) => { c.fillStyle = '#c8302c'; c.fillRect(0, 0, w, h); [...'牛河大王'].forEach((ch, i) => text(c, ch, w / 2, h * (.14 + i * .24), w * .62, '#f8f1dc', '"Kaiti SC", serif', '900')); }],
  });
  // The chamfer and the Lorong 9 face: red ground storey, windows with vents and hoods.
  for (const [edge, fractions] of [[1, sideBays.chamfer], [2, sideBays.lorong9]] as const) {
    const f = frontageFrame(poly, edge), p = (u: number, out = 0) => f.point(u, out) as Point, box = (name: string, u: number, y: number, out: number, w: number, h: number, d: number, colour: string) => {
      const q = p(u, out); world.box(`Lor 9 Beef Kway Teow ${name}`, q[0], y, q[1], w, h, d, world.mat(colour), undefined, f.angle);
    };
    box('red ground storey', f.width / 2, 2.4, .04, f.width, 4.7, .08, '#b9493a');
    for (const fr of fractions) {
      const u = f.width * fr;
      for (const [b, t] of [floors.lower, floors.upper]) {
        box('side window', u, (b + t) / 2, .04, 1.1, t - b, .04, '#4f9a87');
        box('side window frame', u, (b + t) / 2, .07, .05, t - b, .02, '#3d7a6a');
      }
      for (const h of floors.hoods) box('side hood', u, h + .06, .3, 1.4, .12, .6, '#f3e3df');
      if (edge === 2) box('side doorway', u, 1.35, .05, 1.4, 2.6, .03, '#3a332f');
    }
    if (edge === 1) {
      const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = Math.round(512 * .7 / (f.width - .2));
      board('九巷牛河')(canvas.getContext('2d')!, canvas.width, canvas.height);
      world.panel(p(.1, .09), p(f.width - .1, .09), 2.4, 3.1, textured(canvas, .1));
      const top = document.createElement('canvas'); top.width = 512; top.height = Math.round(512 * .6 / (f.width - .4));
      { const c = top.getContext('2d')!; c.fillStyle = '#b9493a'; c.fillRect(0, 0, top.width, top.height); text(c, '勝 捷', top.width / 2, top.height / 2, top.height * .7, '#f3e6c8', 'serif', '900'); }
      world.panel(p(.2, .09), p(f.width - .2, .09), 3.85, 4.45, textured(top));
    }
  }
  for (const r of beefKwayTeowReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
