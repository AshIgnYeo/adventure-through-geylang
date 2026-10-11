import type { World, Point } from './world';
import { ringB, ringBFrame, ringBLayout, ringBReviews } from './ring-b-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exteriors on Lorong 12 south of Geylang Road. */
export function buildRingB(world: World, id: string, poly: Point[]) {
  const place = ringB.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringBFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringBLayout(place, frame.width) as any);
  for (const r of ringBReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
