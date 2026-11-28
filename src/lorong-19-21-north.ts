import type { World, Point } from './world';
import { lorong1921North } from './lorong-19-21-north-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorongs 19 and 21 north of Sims Avenue, with the road joining them: eleven plots as photographed massing. */
export function buildLorong1921North(world: World, id: string, poly: Point[]) {
  const place = lorong1921North.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
