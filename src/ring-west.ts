import type { World, Point } from './world';
import { ringWest, ringWestFrame, ringWestLayout, ringWestReviews } from './ring-west-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exteriors at the west end of the widened study area. */
export function buildRingWest(world: World, id: string, poly: Point[]) {
  const place = ringWest.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringWestFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringWestLayout(place, frame.width) as any);
  for (const r of ringWestReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
