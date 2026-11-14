import type { World, Point } from './world';
import { lorong17North } from './lorong-17-north-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 17 north of Sims Avenue: four industrial plots as photographed massing. */
export function buildLorong17North(world: World, id: string, poly: Point[]) {
  const place = lorong17North.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
