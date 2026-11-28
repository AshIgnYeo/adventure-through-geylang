import type { World, Point } from './world';
import { aljuniedRoad } from './aljunied-road-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Aljunied Road between Geylang Road and Lorong 23 (open question 102). */
export function buildAljuniedRoad(world: World, id: string, poly: Point[]) {
  const place = aljuniedRoad.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
