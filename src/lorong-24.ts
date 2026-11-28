import type { World, Point } from './world';
import { lorong24 } from './lorong-24-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong 24 from Geylang Road to Guillemard Road, with Jalan Suka and Jalan Molek. */
export function buildLorong24(world: World, id: string, poly: Point[]) {
  const place = lorong24.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
