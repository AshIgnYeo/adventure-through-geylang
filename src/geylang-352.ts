import type { World, Point } from './world';
import { geylang352 } from './geylang-352-layout.mjs';
import { buildLaneHouse, type Draws } from './lane-house';

// Every building on this row is unnamed for now (open question 84), so no board or blade is drawn.
const draws: Draws = {};

/** Geylang Road's south side from No. 352 to No. 364, walked from KartaView's May 2023 panoramas. */
export function buildGeylang352(world: World, id: string, poly: Point[]) {
  const place = geylang352.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
