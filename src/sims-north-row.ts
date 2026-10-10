import type { World, Point } from './world';
import { simsNorthRow, simsNorthRowFrame, simsNorthRowLayout, simsNorthRowReviews } from './sims-north-row-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const davco: { boards: Draw[]; awning: string; valance: Draw } = {
  boards: [(c, w, h) => {
    c.fillStyle = '#f4f2ec'; c.fillRect(0, 0, w, h); c.fillStyle = '#d2302c'; c.beginPath(); c.arc(w / 2, h * .42, Math.min(w, h) * .3, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1f2f6a'; c.font = `800 ${h * .16}px Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Davco', w / 2, h * .85);
  }],
  awning: '#e2b43a',
  valance: (c, w, h) => { c.fillStyle = '#e2b43a'; c.fillRect(0, 0, w, h); c.fillStyle = '#c42b2b'; c.beginPath(); c.moveTo(w * .78, h * .1); c.lineTo(w * .9, h * .9); c.lineTo(w * .66, h * .9); c.closePath(); c.fill(); },
};

/** June 2024 exteriors on the north side of Sims Avenue, west of ibis budget Gold. */
export function buildSimsNorthRow(world: World, id: string, poly: Point[]) {
  const place = simsNorthRow.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = simsNorthRowFrame(poly, place), layout = simsNorthRowLayout(place, frame.width) as any;
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'red-flag-davco' ? davco : {});
  for (const r of simsNorthRowReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
