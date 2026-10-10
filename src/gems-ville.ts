import type { World, Point } from './world';
import { gemsVille, gemsVilleFrame, gemsVilleLayout, gemsVilleReviews } from './gems-ville-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** April 2024 exterior of Gems Ville, 8 Lorong 13 Geylang. */
export function buildGemsVille(world: World, id: string, poly: Point[]) {
  if (!gemsVille.buildingIds.includes(id)) return false;
  const frame = gemsVilleFrame(poly), layout = gemsVilleLayout(frame.width);
  buildSimpleHouse(world, 'Gems Ville', frame, poly, gemsVille, layout as any, {
    boards: [(c, w, h) => { c.clearRect(0, 0, w, h); c.fillStyle = '#d9d9d6'; c.font = `500 ${h * .72}px "Didot", "Times New Roman", serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('G E M S', w / 2, h * .42, w * .95); c.font = `400 ${h * .22}px sans-serif`; c.fillText('V I L L E', w / 2, h * .88, w * .5); }],
  });
  for (const r of gemsVilleReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
