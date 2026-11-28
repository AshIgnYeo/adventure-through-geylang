import type { World, Point } from './world';
import { lorong1416South } from './lorong-14-16-south-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorongs 14 and 16 south to Guillemard Road (open questions 52 and 62). */
export function buildLorong1416South(world: World, id: string, poly: Point[]) {
  const place = lorong1416South.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
