import type { World, Point } from './world';
import { guillemardRoad } from './guillemard-road-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Guillemard Road between Lorongs 16 and 20 (open question 100). */
export function buildGuillemardRoad(world: World, id: string, poly: Point[]) {
  const place = guillemardRoad.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
