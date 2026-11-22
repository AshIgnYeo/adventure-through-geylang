import type { World, Point } from './world';
import { westerhoutRoad } from './westerhout-road-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Westerhout Road from Lorong 16 to Lorong 20 (open question 72). */
export function buildWesterhoutRoad(world: World, id: string, poly: Point[]) {
  const place = westerhoutRoad.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
