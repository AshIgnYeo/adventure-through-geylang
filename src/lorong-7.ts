import type { World, Point } from './world';
import { lorong7 } from './lorong-7-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 7 at the extract's west edge and the two plots north of Sims Avenue beside it (open question 94). */
export function buildLorong7(world: World, id: string, poly: Point[]) {
  const place = lorong7.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
