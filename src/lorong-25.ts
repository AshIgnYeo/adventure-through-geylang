import type { World, Point } from './world';
import { lorong25 } from './lorong-25-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 25 from Geylang Road to Sims Avenue (open question 105). */
export function buildLorong25(world: World, id: string, poly: Point[]) {
  const place = lorong25.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
