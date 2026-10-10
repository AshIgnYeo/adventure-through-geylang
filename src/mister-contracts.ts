import type { World, Point } from './world';
import { misterContracts, misterContractsFrame, misterContractsLayout, misterContractsReviews } from './mister-contracts-layout.mjs';
import { buildRow13House } from './row13';

/** April 2024 exterior of the northern No. 9 Lorong 13 house, using the untouched source outline. */
export function buildMisterContracts(world: World, id: string, poly: Point[]) {
  if (!misterContracts.buildingIds.includes(id)) return false;
  const frame = misterContractsFrame(poly), { width } = frame;
  const layout = misterContractsLayout(width);
  const { pt, textured } = buildRow13House(world, 'Mister Contracts', frame, layout);

  // Navy signboard with a yellow MC panel, white MISTER CONTRACTS PTE. LTD. and yellow MC MULTI SKILLS line, redrawn originally.
  const bd = layout.board, canvas = document.createElement('canvas');
  canvas.width = 2048; canvas.height = Math.round(2048 * (bd.top - bd.bottom) / (bd.right - bd.left));
  const c = canvas.getContext('2d')!, w = canvas.width, h = canvas.height;
  c.fillStyle = '#16304a'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#e7c62e'; c.beginPath(); c.moveTo(0, 0); c.lineTo(w * .1, 0); c.lineTo(w * .06, h); c.lineTo(0, h); c.fill();
  c.fillStyle = '#16304a'; c.font = `900 ${h * .3}px "Arial Black", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('MC', w * .045, h * .5);
  c.fillStyle = '#ffffff'; c.font = `800 ${h * .36}px "Avenir Next", "Helvetica Neue", sans-serif`; c.fillText('MISTER CONTRACTS PTE. LTD.', w * .55, h * .24, w * .86);
  c.fillStyle = '#e7c62e'; c.font = `700 ${h * .17}px "Avenir Next", "Helvetica Neue", sans-serif`; c.fillText('MC MULTI SKILLS TRAINING CONSULTANCY.', w * .52, h * .52, w * .7);
  c.fillStyle = '#f1f1ea'; for (const [x, label] of [[.2, 'CORETRADE'], [.36, 'MULTI SKILL'], [.52, 'CONSTRUCTION SKILL']] as const) { c.fillRect(w * (x - .07), h * .66, w * .14, h * .26); c.fillStyle = '#16304a'; c.font = `700 ${h * .1}px sans-serif`; c.fillText(label, w * x, h * .79, w * .13); c.fillStyle = '#f1f1ea'; }
  c.font = `600 ${h * .09}px sans-serif`; c.textAlign = 'left';
  ['+65 8321 9320', '+65 8383 9340', '+65 8177 8748'].forEach((t, i) => c.fillText(t, w * .66, h * (.68 + i * .1)));
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(canvas, { glow: .05 }));

  for (const r of misterContractsReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
