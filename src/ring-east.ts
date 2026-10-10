import type { World, Point } from './world';
import { ringEast, ringEastFrame, ringEastLayout, ringEastReviews } from './ring-east-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exteriors at the east end of the widened study area. */
export function buildRingEast(world: World, id: string, poly: Point[]) {
  const place = ringEast.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringEastFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringEastLayout(place, frame.width) as any);
  for (const r of ringEastReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
