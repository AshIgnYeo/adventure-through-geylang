import type { World, Point } from './world';
import { lorong21aNorth } from './lorong-21a-north-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 21A north of Sims Avenue: five plots as photographed massing. */
export function buildLorong21aNorth(world: World, id: string, poly: Point[]) {
  const place = lorong21aNorth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
