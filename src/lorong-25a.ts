import type { World, Point } from './world';
import { lorong25a } from './lorong-25a-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 25A from Sims Avenue to Geylang Road (open question 107). */
export function buildLorong25a(world: World, id: string, poly: Point[]) {
  const place = lorong25a.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
