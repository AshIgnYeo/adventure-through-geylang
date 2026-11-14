import type { World, Point } from './world';
import { lorongBachok } from './lorong-bachok-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every house in the row is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Lorong Bachok's north row between Nos. 1 and 29, one elevation sliced across its twelve outlines (open question 93). */
export function buildLorongBachok(world: World, id: string, poly: Point[]) {
  const place = lorongBachok.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
