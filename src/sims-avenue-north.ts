import type { World, Point } from './world';
import { simsAvenueNorth } from './sims-avenue-north-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this walk is unnamed for now (open question 84), so no board or blade is drawn; No. 147's awnings
// are the only drawn pieces.
const draws: Draws = { 'sa-147': { awning: '#3a3c40' } } as Draws;

/** The north side of Sims Avenue from No. 135 to No. 205, walked from KartaView's May 2023 panoramas. */
export function buildSimsAvenueNorth(world: World, id: string, poly: Point[]) {
  const place = simsAvenueNorth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
