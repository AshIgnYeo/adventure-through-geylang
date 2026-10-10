import type { World, Point } from './world';
import { rrMotor, rrMotorFrame, rrMotorLayout, rrMotorReviews } from './rr-motor-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

let signCanvas: HTMLCanvasElement | null = null;

/** June 2024 exterior of the RR Motor pair, one source outline at a time. */
export function buildRrMotor(world: World, id: string, poly: Point[]) {
  const unit = rrMotor.buildingIds.indexOf(id);
  if (unit < 0) return false;
  const frame = rrMotorFrame(poly), { width } = frame;
  const layout = rrMotorLayout(width, unit);
  const roof = rrMotor.roofs[unit];
  const { pt, textured } = buildPairedShophouse(world, 'RR Motor', frame, layout, rrMotor, {
    tile: roof.tile, course: roof.course, coping: '#9a4f3c', gable: '#f1efe8', copingHeight: .25, copingWidth: .2, frontCap: { length: .45, height: .45 },
  });

  // One original redrawing of the shared signboard: the RR mark, the company name
  // and 专卖店. Product pictures, telephone numbers and the email address are omitted.
  if (!signCanvas) {
    const sb = rrMotor.signboard;
    signCanvas = document.createElement('canvas'); signCanvas.width = 4096; signCanvas.height = Math.round(4096 * (sb.top - sb.bottom) / (sb.to - sb.from));
    const c = signCanvas.getContext('2d')!, h = signCanvas.height;
    c.fillStyle = '#f2f1ec'; c.fillRect(0, 0, 4096, h);
    c.strokeStyle = '#c9cac5'; c.lineWidth = 12; c.strokeRect(6, 6, 4084, h - 12);
    c.save(); c.translate(120, h * .62); c.transform(1, 0, -.3, 1, 0, 0);
    c.font = '900 300px "Arial Black", sans-serif'; c.fillStyle = '#151515'; c.fillText('RR', 0, 0);
    c.fillStyle = '#c8302d'; c.fillRect(-20, 40, 560, 34); c.restore();
    c.font = '600 92px sans-serif'; c.fillStyle = '#7b7b7b'; c.fillText('rrmotor.com.sg', 140, h * .9);
    c.strokeStyle = '#2d4f8e'; c.lineWidth = 8; c.strokeRect(1880, h * .62, 1040, h * .26);
    c.font = '700 120px sans-serif'; c.fillStyle = '#2d4f8e'; c.textBaseline = 'middle'; c.fillText('RR MOTOR PTE LTD', 1920, h * .75, 960);
    c.font = '700 260px "Songti SC", "STSong", serif'; c.fillStyle = '#c8302d'; c.fillText('专卖店', 2350, h * .36);
  }
  const sg = layout.sign;
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(signCanvas), [sg.uv[0], 0, sg.uv[1], 1]);

  if (unit === 0) for (const r of rrMotorReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
