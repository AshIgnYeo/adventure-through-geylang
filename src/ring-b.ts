import type { World, Point } from './world';
import { ringB, ringBFrame, ringBLayout, ringBReviews } from './ring-b-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

// Named places only: original lettering after the photographed sign.
const draws: Record<string, { boards?: Draw[] }> = {
  'yaju-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#7a2e2a'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `700 ${Math.round(h * .46)}px "Kaiti SC", "STKaiti", serif`; c.fillText('雅居酒店', w / 2, h * .34, w * .9);
    c.font = `700 ${Math.round(h * .26)}px "Helvetica Neue", Arial, sans-serif`; c.fillText('YA JU HOTEL', w / 2, h * .78, w * .9);
  }] },
};

/** June 2024 exteriors on Lorong 12 south of Geylang Road. */
export function buildRingB(world: World, id: string, poly: Point[]) {
  const place = ringB.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringBFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringBLayout(place, frame.width) as any, draws[place.id] ?? {});
  for (const r of ringBReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
