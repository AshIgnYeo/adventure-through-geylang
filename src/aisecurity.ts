import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { aiSecurity, aiSecurityFrame, aiSecurityLayout, aiSecurityReviews, elevation } from './aisecurity-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** April 2024 exterior of No. 2 Lorong 11, using the untouched source outline. */
export function buildAiSecurity(world: World, id: string, poly: Point[]) {
  if (!aiSecurity.buildingIds.includes(id)) return false;
  const frame = aiSecurityFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = aiSecurity.height, E = elevation, grey = material('#5f6468'), layout = aiSecurityLayout(width);

  // Party and rear walls to the eaves; the street wall starts above the five-foot way.
  world.panel(pt(0), pt(width), E.ceiling, H, grey);
  world.panel(frame.a, frame.rearA, 0, H, grey);
  world.panel(frame.b, frame.rearB, 0, H, grey);
  world.panel(frame.rearA, frame.rearB, 0, H, grey);
  buildGableRoof(world, 'No. 2 Lorong 11', frame, gableRoof(frame, aiSecurity), {
    tile: '#b0624a', course: '#93503d', coping: '#5f6468', gable: '#5f6468', copingHeight: .12, copingWidth: .14,
  });

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`No. 2 Lorong 11 ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  const panel = (s: { left: number; right: number; bottom: number; top: number; out: number }, mat: pc.Material) =>
    world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, mat);
  const canvasFor = (s: { left: number; right: number; bottom: number; top: number }, w = 1024) => {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = Math.round(w * (s.top - s.bottom) / (s.right - s.left)); return canvas;
  };

  // The leftover board of the closed Wina Salon: copper ground, 薇娜 and WINA SALON, a portrait panel left blank.
  const bd = layout.board, board = canvasFor(bd);
  {
    const c = board.getContext('2d')!, w = board.width, h = board.height;
    const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#6e3f2a'); g.addColorStop(1, '#8c5a3e');
    c.fillStyle = g; c.fillRect(0, 0, w, h); c.strokeStyle = '#e8e2d4'; c.lineWidth = 8; c.strokeRect(4, 4, w - 8, h - 8);
    c.fillStyle = '#9a6b4e'; c.fillRect(w * .66, h * .08, w * .3, h * .84);
    c.fillStyle = '#d8b98a'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `300 ${h * .36}px "Didot", "Times New Roman", serif`; c.fillText('WINA SALON', w * .34, h * .55, w * .58);
    c.font = `400 ${h * .16}px "Songti SC", serif`; c.fillText('薇 娜', w * .34, h * .22);
  }
  panel(bd, textured(board));

  // Lit SUPPLY / INSTALL / WHOLESALE / CCTV lettering in the glazed door.
  const cs = layout.cctv, cctv = canvasFor(cs, 512);
  {
    const c = cctv.getContext('2d')!, w = cctv.width, h = cctv.height;
    c.fillStyle = '#1d2424'; c.fillRect(0, 0, w, h); c.fillStyle = '#f4f4ee'; c.textAlign = 'left'; c.textBaseline = 'middle';
    c.font = `600 ${h * .11}px "Helvetica Neue", sans-serif`;
    ['SUPPLY', 'INSTALL', 'WHOLESALE'].forEach((t, i) => c.fillText(t, w * .08, h * (.12 + i * .14)));
    c.strokeStyle = '#f2df7a'; c.lineWidth = h * .025; c.strokeRect(w * .08, h * .5, w * .72, h * .2);
    c.fillStyle = '#f2df7a'; c.font = `600 ${h * .15}px "Helvetica Neue", sans-serif`; c.fillText('CCTV', w * .15, h * .6);
    c.strokeRect(w * .3, h * .78, w * .2, h * .13);
  }
  panel(cs, textured(cctv, .6));

  for (const r of aiSecurityReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
