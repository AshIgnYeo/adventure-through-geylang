import type { World, Point } from './world';
import { mingLi, mingLiFrame, mingLiLayout, mingLiReviews, elevation, sideBays } from './ming-li-layout.mjs';
import { buildSimpleHouse } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'sans-serif', weight = '700', max?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, max);
};

/** June 2024 exterior of Ming Li's Eating House at the Sims Avenue / Lorong 15 corner. */
export function buildMingLi(world: World, id: string, poly: Point[]) {
  if (!mingLi.buildingIds.includes(id)) return false;
  const frame = mingLiFrame(poly), layout = mingLiLayout(frame.width), E = elevation;
  const { textured } = buildSimpleHouse(world, "Ming Li's", frame, poly, mingLi, layout, {
    boards: [(c, w, h) => { c.fillStyle = '#efe6d3'; c.fillRect(0, 0, w, h); for (let i = 0; i < 9; i++) { c.fillStyle = ['#b5542f', '#d9a441', '#8a3b2a', '#6e8a3a'][i % 4]; c.fillRect(w * (.02 + i * .108), h * .12, w * .095, h * .76); } }],
    awning: '#2f4f8a', valance: (c, w, h) => { c.fillStyle = '#2f4f8a'; c.fillRect(0, 0, w, h); },
  });
  for (const [edge, fractions] of [[1, sideBays.chamfer], [2, sideBays.lorong15]] as const) {
    const f = frontageFrame(poly, edge), p = (u: number, out = 0) => f.point(u, out) as Point;
    const box = (name: string, u: number, y: number, out: number, w: number, h: number, d: number, colour: string, glow = 0) => { const q = p(u, out); world.box(`Ming Li's ${name}`, q[0], y, q[1], w, h, d, world.mat(colour, glow), undefined, f.angle); };
    for (const fr of fractions) for (const h of [E.floor2.h, E.floor3.h]) {
      const u = f.width * fr, w = edge === 1 ? 2.6 : 1.5;
      box('side window', u, (h[0] + h[1]) / 2, .04, w, h[1] - h[0], .04, '#55606a');
      box('side window frame', u, (h[0] + h[1]) / 2, .07, .05, h[1] - h[0], .02, '#3c4043');
    }
    for (const [b, t, d] of [[11.3, 11.4, .25], [7.15, 7.3, .5], [11.0, 11.12, .6]] as const) box('side band', f.width / 2, (b + t) / 2, d / 2, f.width, t - b, d, '#f6f5f1');
    box('side ground storey', f.width / 2, 1.7, .03, f.width, 3.4, .04, '#4a4540', .05);
    if (edge === 1) {
      const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.round(1024 * 1.2 / (f.width - .2));
      const c = canvas.getContext('2d')!, w = canvas.width, h = canvas.height;
      c.fillStyle = '#f7f6f2'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f4f8a'; c.beginPath(); c.arc(h * .55, h * .5, h * .38, 0, Math.PI * 2); c.fill();
      text(c, '明利', h * .55, h * .5, h * .3, '#f7f6f2', 'serif', '900');
      text(c, '明利美食阁', w * .6, h * .38, h * .38, '#c0392b', '"Kaiti SC", serif', '900', w * .6);
      text(c, "MING LI'S EATING HOUSE", w * .6, h * .78, h * .17, '#2f4f8a', 'sans-serif', '800', w * .62);
      world.panel(p(.1, .06), p(f.width - .1, .06), E.cornerBoard.h[0], E.cornerBoard.h[1], textured(canvas));
    } else {
      const corners = [p(.2, 0), p(f.width - .2, 0), p(f.width - .2, 1.4), p(.2, 1.4)];
      world.mesh("Ming Li's SingGas awning", corners.flatMap((q, i) => [q[0], i < 2 ? 3.3 : 2.5, q[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], world.mat('#2c4a7e'));
      const v = document.createElement('canvas'); v.width = 1024; v.height = 40;
      { const c = v.getContext('2d')!; c.fillStyle = '#2c4a7e'; c.fillRect(0, 0, 1024, 40); for (let i = 0; i < 4; i++) text(c, 'SingGas', 1024 * (i + .5) / 4, 22, 22, '#ffffff'); }
      world.panel(p(.2, 1.4), p(f.width - .2, 1.4), 2.25, 2.5, textured(v));
    }
  }
  for (const r of mingLiReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
