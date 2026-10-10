import type { World, Point } from './world';
import { ringA, ringAFrame, ringALayout, ringAReviews, ringASides } from './ring-a-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** Unnamed exteriors east of Lorong 15 and on Sims Avenue Nos. 126-130, in the widened ring. */
export function buildRingA(world: World, id: string, poly: Point[]) {
  const place = ringA.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringAFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringALayout(place, frame.width) as any);
  // A corner block's other street faces: windows, bands and blank signs on their own source edges.
  for (const side of ringASides(place, poly) as any[]) for (const b of side.boxes) {
    const p = side.frame.point(b.u, b.out) as Point;
    world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, side.frame.angle);
  }
  for (const r of ringAReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
