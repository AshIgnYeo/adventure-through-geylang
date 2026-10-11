import type { World, Point } from './world';
import { lorong11, lorong11Frame, lorong11RoofFrame, lorong11Layout, lorong11Reviews } from './lorong-11-layout.mjs';
import { buildPeranakanHouse } from './peranakan';
import { buildSimpleHouse } from './simple-house';

const awningColours: Record<string, string> = { 'l11-22': '#a2302f', 'l11-28': '#2f63b3', 'l11-30-32': '#e99a7c' };

/** Lorong 11 exteriors from the street module, starting with the unnamed west-row houses. */
export function buildLorong11(world: World, id: string, poly: Point[]) {
  const place = lorong11.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong11Frame(poly, place), layout = lorong11Layout(place, frame.width) as any;
  if (place.style === 'simple') {
    const colour = awningColours[place.id] ?? '#24304a';
    buildSimpleHouse(world, place.name, frame, poly, place, layout, place.awning ? { awning: colour, valance: (c, w, h) => { c.fillStyle = colour; c.fillRect(0, 0, w, h); if (place.id === 'l11-28') { c.fillStyle = '#f2f2ee'; for (let x = 0; x < w; x += w / 24) c.fillRect(x, 0, w / 48, h); } } } : {});
    for (const r of lorong11Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
    return true;
  }
  // The roof spans to the deepest corners, so an outline that wraps behind a neighbour still gets one roof.
  buildPeranakanHouse(world, place.name, lorong11RoofFrame(poly, place) as typeof frame, layout, place.colours.wall, poly.length > 4 ? poly : undefined);
  for (const r of lorong11Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
