import type { World, Point } from './world';
import { hotel81Spring, hotel81SpringFrame, hotel81SpringLayout, hotel81SpringReviews } from './hotel-81-spring-layout.mjs';
import { buildSimpleHouse } from './simple-house';

/** April 2024 exterior of Hotel 81 Spring, 22 Lorong 15 Geylang. */
export function buildHotel81Spring(world: World, id: string, poly: Point[]) {
  if (!hotel81Spring.buildingIds.includes(id)) return false;
  const frame = hotel81SpringFrame(poly), layout = hotel81SpringLayout(frame.width);
  buildSimpleHouse(world, 'Hotel 81 Spring', frame, poly, hotel81Spring, layout, {
    boards: [
      (c, w, h) => { c.fillStyle = '#eef2f4'; c.fillRect(0, 0, w, h); c.strokeStyle = '#9fb3c7'; c.lineWidth = h * .06; c.strokeRect(2, 2, w - 4, h - 4); c.fillStyle = '#2f8f8c'; c.font = `900 ${h * .78}px "Arial Black", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HOTEL 81', w / 2, h * .54, w * .92); },
      (c, w, h) => { c.fillStyle = '#ffffff'; c.fillRect(0, 0, w, h); c.fillStyle = '#2b4a6e'; c.font = `700 ${h * .8}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SPRING', w / 2, h * .55, w * .9); },
    ],
  });
  for (const r of hotel81SpringReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
