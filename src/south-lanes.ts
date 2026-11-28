import type { World, Point } from './world';
import { southLanes } from './south-lanes-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorongs 4, 6 and 8 south to Guillemard Road (open question 101). */
export function buildSouthLanes(world: World, id: string, poly: Point[]) {
  const place = southLanes.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
