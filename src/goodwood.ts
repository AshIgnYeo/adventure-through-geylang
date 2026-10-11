import type { World, Point } from './world';
import { goodwood, goodwoodFrame, goodwoodLayout, goodwoodReviews, colours } from './goodwood-layout.mjs';
import { buildPeranakanHouse } from './peranakan';

/** April 2024 exterior of No. 19 Lorong 11, on its re-spaced footprint. */
export function buildGoodwood(world: World, id: string, poly: Point[]) {
  if (!goodwood.buildingIds.includes(id)) return false;
  const frame = goodwoodFrame(poly), layout = goodwoodLayout(frame.width);
  const { textured, panel } = buildPeranakanHouse(world, 'Goodwood', frame, layout, colours.wall);
  // Black board with white 良木林 and gold Goodwood, redrawn originally.
  const bd = layout.board, canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = Math.round(512 * (bd.top - bd.bottom) / (bd.right - bd.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#1b1d1e'; c.fillRect(0, 0, 512, h); c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillStyle = '#f2f2ee'; c.font = `700 ${h * .5}px "Kaiti SC", "STKaiti", serif`; c.fillText('良 木 林', 256, h * .38);
  c.fillStyle = '#d9c18a'; c.font = `italic 700 ${h * .26}px Georgia, serif`; c.fillText('Goodwood', 256, h * .8);
  panel(bd, textured(canvas));
  for (const r of goodwoodReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
