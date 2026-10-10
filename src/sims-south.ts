import type { World, Point } from './world';
import { simsSouth, simsSouthFrame, simsSouthLayout, simsSouthReviews } from './sims-south-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const yapSunValance: Draw = (c, w, h) => {
  c.fillStyle = '#1f4f9a'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#f4f4ef'; c.font = `700 ${h * .55}px "Helvetica Neue", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText('YAP SUN HARDWARE', w / 2, h * .52, w * .9);
};

/** June 2024 infill on the Sims Avenue south row. */
export function buildSimsSouth(world: World, id: string, poly: Point[]) {
  const place = simsSouth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = simsSouthFrame(poly, place), layout = simsSouthLayout(place, frame.width) as any;
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'yap-sun' ? { awning: '#1f4f9a', valance: yapSunValance } : {});
  for (const r of simsSouthReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
