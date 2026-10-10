import type { World, Point } from './world';
import { kGroup, kGroupFrame, kGroupLayout, kGroupReviews } from './k-group-layout.mjs';
import { buildRow13House } from './row13';

/** April 2024 exterior of No. 5 Lorong 13, using the untouched source outline. */
export function buildKGroup(world: World, id: string, poly: Point[]) {
  if (!kGroup.buildingIds.includes(id)) return false;
  const frame = kGroupFrame(poly), { width } = frame;
  const layout = kGroupLayout(width);
  const { pt, textured } = buildRow13House(world, 'K Group', frame, layout);

  // Black board with a mirrored-K logo and K Group Pte Ltd, redrawn originally.
  const bd = layout.board, canvas = document.createElement('canvas');
  canvas.width = 1024; canvas.height = Math.round(1024 * (bd.top - bd.bottom) / (bd.right - bd.left));
  const c = canvas.getContext('2d')!, h = canvas.height;
  c.fillStyle = '#141414'; c.fillRect(0, 0, 1024, h);
  const g = c.createLinearGradient(380, 0, 640, 0); g.addColorStop(0, '#c99a4a'); g.addColorStop(.5, '#e6c983'); g.addColorStop(1, '#b0573e');
  c.fillStyle = g; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `900 ${h * .62}px "Times New Roman", serif`;
  c.save(); c.translate(470, h * .42); c.scale(-1, 1); c.fillText('K', 0, 0); c.restore();
  c.fillText('K', 555, h * .42);
  c.fillStyle = '#cfc6b4'; c.font = `500 ${h * .16}px Georgia, serif`; c.fillText('K Group Pte Ltd', 512, h * .85);
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(canvas, { glow: .05 }));

  for (const r of kGroupReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
