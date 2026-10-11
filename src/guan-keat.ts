import type { World, Point } from './world';
import { guanKeat, guanKeatFrame, guanKeatLayout, guanKeatReviews, elevation } from './guan-keat-layout.mjs';
import { buildSimpleHouse } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const valance = (c: CanvasRenderingContext2D, w: number, h: number) => {
  c.fillStyle = '#c47a5c'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#f2e7da'; c.font = `700 ${h * .5}px "Helvetica Neue", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText('GUAN KEAT PTE LTD        TEL: 6767 0808        HP: 9011 3039', w / 2, h * .55, w * .9);
};

/** June 2024 exterior of the Guan Keat coffeeshop corner block, No. 38 Lorong 11. */
export function buildGuanKeat(world: World, id: string, poly: Point[]) {
  if (!guanKeat.buildingIds.includes(id)) return false;
  const frame = guanKeatFrame(poly), layout = guanKeatLayout(frame.width);
  const { textured } = buildSimpleHouse(world, 'Guan Keat', frame, poly, guanKeat, layout, { awning: '#b9765e', valance });
  // The chamfer and the Lorong 11 face: windows on both upper floors, the awning continuing round the corner.
  const E = elevation;
  for (const edge of [3, 2]) {
    const f = frontageFrame(poly, edge), p = (u: number, out = 0) => f.point(u, out) as Point;
    const box = (name: string, u: number, y: number, out: number, w: number, h: number, d: number, colour: string) => { const q = p(u, out); world.box(`Guan Keat ${name}`, q[0], y, q[1], w, h, d, world.mat(colour), undefined, f.angle); };
    for (const [b, t] of [[E.floor2[0], E.vents[0][0]], [E.floor3[0], E.vents[1][0]]]) {
      box('side window', f.width / 2, (b + t) / 2, .04, Math.min(2.2, f.width - .6), t - b, .04, '#3a4a4d');
      box('side vent strip', f.width / 2, t + .19, .04, Math.min(2.2, f.width - .6), .36, .04, '#d6ece1');
    }
    for (const [b, t] of [[11.97, 12.07], [7.47, 7.74]]) box('side band', f.width / 2, (b + t) / 2, .15, f.width, t - b, .3, '#d6ece1');
    const c0 = p(0, 0), c1 = p(f.width, 0), c2 = p(f.width, E.awning.depth), c3 = p(0, E.awning.depth);
    world.mesh('Guan Keat side awning', [c0, c1, c2, c3].flatMap((q, i) => [q[0], i < 2 ? E.awning.wall : E.awning.front, q[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], world.mat('#b9765e'));
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 32; valance(canvas.getContext('2d')!, 512, 32);
    world.panel(p(0, E.awning.depth), p(f.width, E.awning.depth), E.awning.front - E.awning.valance, E.awning.front, textured(canvas));
  }
  for (const r of guanKeatReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
