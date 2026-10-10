import type { World, Point } from './world';
import { ringC, ringCFrame, ringCLayout, ringCReviews } from './ring-c-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exteriors on Lorong 10, south of Geylang Road, in the widened study area. */
export function buildRingC(world: World, id: string, poly: Point[]) {
  const place = ringC.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringCFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringCLayout(place, frame.width) as any);
  for (const r of ringCReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
