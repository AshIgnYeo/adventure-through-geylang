import type { World, Point } from './world';
import { lorong20 } from './lorong-20-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 20 from Geylang Road to Guillemard Road (open question 81). */
export function buildLorong20(world: World, id: string, poly: Point[]) {
  const place = lorong20.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
