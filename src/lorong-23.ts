import type { World, Point } from './world';
import { lorong23 } from './lorong-23-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 23 from Geylang Road to Sims Avenue (open question 97). */
export function buildLorong23(world: World, id: string, poly: Point[]) {
  const place = lorong23.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
