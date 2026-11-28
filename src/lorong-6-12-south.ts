import type { World, Point } from './world';
import { lorong612South } from './lorong-6-12-south-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorongs 6, 8, 10 and 12 south of the study rectangle: twenty plots as photographed massing. */
export function buildLorong612South(world: World, id: string, poly: Point[]) {
  const place = lorong612South.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
