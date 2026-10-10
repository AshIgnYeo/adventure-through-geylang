import type { World, Point } from './world';
import { lorong11, lorong11Frame, lorong11RoofFrame, lorong11Layout, lorong11Reviews } from './lorong-11-layout.mjs';
import { buildPeranakanHouse } from './peranakan';

/** Lorong 11 exteriors from the street module, starting with the unnamed west-row houses. */
export function buildLorong11(world: World, id: string, poly: Point[]) {
  const place = lorong11.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong11Frame(poly, place), layout = lorong11Layout(place, frame.width);
  // The roof spans to the deepest corners, so an outline that wraps behind a neighbour still gets one roof.
  buildPeranakanHouse(world, place.name, lorong11RoofFrame(poly, place) as typeof frame, layout, place.colours.wall, poly.length > 4 ? poly : undefined);
  for (const r of lorong11Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
