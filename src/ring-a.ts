import type { World, Point } from './world';
import { ringA, ringAFrame, ringALayout, ringAReviews, ringASides } from './ring-a-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
// Named places only: original lettering after the photographed board.
const draws: Record<string, { boards?: Draw[] }> = {
  'bengal-kitchen': { boards: [(c, w, h) => {
    c.fillStyle = '#3f9b3a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f2f0e6'; c.lineWidth = h * .04; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
    c.lineJoin = 'round'; c.lineWidth = h * .07; c.strokeStyle = '#7a1e1a'; c.font = `900 ${Math.round(h * .42)}px Georgia, "Times New Roman", serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.strokeText('BENGAL KITCHEN', w * .56, h * .3, w * .8); text(c, 'BENGAL KITCHEN', w * .56, h * .3, h * .42, '#f5d22e', '900', 'Georgia, "Times New Roman", serif', w * .8);
    text(c, 'বেঙ্গল কিচেন', w * .56, h * .66, h * .3, '#ffffff', '700', '"Bangla MN", "Kohinoor Bangla", sans-serif', w * .6);
    text(c, '2 Lorong 15 Geylang  Singapore 388596', w * .56, h * .89, h * .1, '#ffffff', '600', '"Helvetica Neue", Arial, sans-serif', w * .6);
  }] },
};

/** East of Lorong 15 and Sims Avenue Nos. 126-130, in the widened ring; named only where a listing and sign agree. */
export function buildRingA(world: World, id: string, poly: Point[]) {
  const place = ringA.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringAFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringALayout(place, frame.width) as any, draws[place.id] ?? {});
  // A corner block's other street faces: windows, bands and blank signs on their own source edges.
  for (const side of ringASides(place, poly) as any[]) for (const b of side.boxes) {
    const p = side.frame.point(b.u, b.out) as Point;
    world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, side.frame.angle);
  }
  for (const r of ringAReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
