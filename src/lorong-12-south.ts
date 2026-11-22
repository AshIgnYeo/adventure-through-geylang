import type { World, Point } from './world';
import { lorong12South } from './lorong-12-south-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 12 south to Guillemard Road (open question 96). */
export function buildLorong12South(world: World, id: string, poly: Point[]) {
  const place = lorong12South.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
