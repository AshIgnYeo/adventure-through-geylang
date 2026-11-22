import type { World, Point } from './world';
import { lorong22 } from './lorong-22-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 22's west side (open question 98). */
export function buildLorong22(world: World, id: string, poly: Point[]) {
  const place = lorong22.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
