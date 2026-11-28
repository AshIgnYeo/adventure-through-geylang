import type { World, Point } from './world';
import { lorong22East } from './lorong-22-east-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 22's east side (open question 104). */
export function buildLorong22East(world: World, id: string, poly: Point[]) {
  const place = lorong22East.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
