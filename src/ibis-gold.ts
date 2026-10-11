import type { World, Point } from './world';
import { ibisGold, ibisGoldUnit, ibisGoldFrame, ibisGoldLayout, ibisGoldReviews } from './ibis-gold-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** June 2024 exterior of ibis budget Singapore Gold over Nos. 121-127 Sims Avenue. */
export function buildIbisGold(world: World, id: string, poly: Point[]) {
  const index = ibisGold.buildingIds.indexOf(id);
  if (index < 0) return false;
  const frame = ibisGoldFrame(poly), unit = ibisGoldUnit(index), layout = ibisGoldLayout(index, frame.width) as any;
  const { pt, textured } = buildSimpleHouse(world, `${ibisGold.name} ${id}`, frame, poly, unit, layout);
  if (index === 0) {
    // The ibis budget GOLD board, redrawn in plain type over the hotel entrance.
    const c = document.createElement('canvas'); c.width = 1024; c.height = Math.round(1024 * .4 / 4.5);
    const g = c.getContext('2d')!; g.fillStyle = '#c9ced2'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#1f4fa0'; g.textBaseline = 'middle'; g.font = `italic 700 ${c.height * .7}px "Helvetica Neue", Arial, sans-serif`; g.fillText('ibis budget', c.width * .2, c.height * .52);
    g.fillStyle = '#7a6a3a'; g.font = `700 ${c.height * .38}px "Helvetica Neue", Arial, sans-serif`; g.fillText('GOLD', c.width * .7, c.height * .55);
    world.panel(pt(.5, .09), pt(5.0, .09), 2.55, 2.95, textured(c));
  }
  if (id === ibisGold.reviewBuildingId) for (const r of ibisGoldReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
