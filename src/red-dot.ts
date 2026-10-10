import type { World, Point } from './world';
import { redDot, redDotFrame, redDotLayout, redDotReviews } from './red-dot-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exterior of Red Dot Running Company, Sims Avenue Nos. 108–110. */
export function buildRedDot(world: World, id: string, poly: Point[]) {
  if (!redDot.buildingIds.includes(id)) return false;
  const frame = redDotFrame(poly), layout = redDotLayout(frame.width);
  buildSimpleHouse(world, 'Red Dot Running', frame, poly, redDot, layout, {
    boards: [(c, w, h) => { c.fillStyle = '#f1eeea'; c.fillRect(0, 0, w, h); c.fillStyle = '#26292b'; c.font = `900 ${h * .95}px "Futura", "Arial Black", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('108', w / 2, h * .54, w * .95); }],
  });
  for (const r of redDotReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
