import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { chongMin, chongMinFrame, chongMinLayout, chongMinReviews } from './chong-min-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** April 2024 exterior of the 15-C frontage, using the untouched source outline. */
export function buildChongMin(world: World, id: string, poly: Point[]) {
  if (!chongMin.buildingIds.includes(id)) return false;
  const frame = chongMinFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const white = material('#ebe8df'), wallTop = chongMin.height + .08;
  world.panel(frame.a, frame.rearA, .13, wallTop, white);
  world.panel(frame.b, frame.rearB, .13, wallTop, white);
  world.panel(frame.rearA, frame.rearB, .13, wallTop, white);
  world.panel(pt(0), pt(width), 3.5, chongMin.height + .55, white);

  const layout = chongMinLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Chong Min ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Two white boards redrawn with original typography: red Chinese over blue English,
  // each with a simplified crest at the left end.
  const crest = (c: CanvasRenderingContext2D, x: number, y: number, s: number, kind: string) => {
    c.save(); c.translate(x, y);
    if (kind === 'chong') { c.fillStyle = '#b8262b'; c.fillRect(-s * .5, -s * .35, s, s * .7); c.fillStyle = '#ffffff'; c.fillRect(-s * .38, -s * .1, s * .76, s * .2); }
    else {
      c.beginPath(); c.moveTo(-s * .4, -s * .45); c.lineTo(s * .4, -s * .45); c.lineTo(s * .4, s * .1); c.quadraticCurveTo(0, s * .55, -s * .4, s * .1); c.closePath();
      c.fillStyle = '#ffffff'; c.fill(); c.lineWidth = s * .08; c.strokeStyle = '#2d3f8f'; c.stroke();
      c.fillStyle = '#b8262b'; c.beginPath(); c.arc(0, -s * .05, s * .14, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  };
  const lines: Record<string, [string, string]> = {
    chong: ['新 加 坡 眾 民 聯 誼 會', 'SINGAPORE CHONG MIN ASSOCIATION'],
    yunteck: ['運 德 善 堂 同 心 社', 'YUN TECK SIAN TNG THONG SIN SIA'],
  };
  for (const bd of layout.boards) {
    const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = Math.round(2048 * (bd.top - bd.bottom) / (bd.right - bd.left));
    const c = canvas.getContext('2d')!, h = canvas.height;
    c.fillStyle = '#f6f5f1'; c.fillRect(0, 0, 2048, h);
    c.strokeStyle = '#c9c7c0'; c.lineWidth = 8; c.strokeRect(4, 4, 2040, h - 8);
    crest(c, 140, h / 2, h * .8, bd.key);
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillStyle = '#c4262c'; c.font = `700 ${h * .42}px "Songti SC", "STSong", serif`; c.fillText(lines[bd.key][0], 1120, h * .3, 1700);
    c.fillStyle = '#2a3c91'; c.font = `${bd.key === 'yunteck' ? 'italic ' : ''}700 ${h * .3}px "Helvetica Neue", Arial, sans-serif`; c.fillText(lines[bd.key][1], 1120, h * .74, 1700);
    world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(canvas, .05));
  }
  const np = layout.numberPlate;
  world.panel(pt(np.u - np.w / 2, np.out), pt(np.u + np.w / 2, np.out), np.bottom, np.top, world.textMaterial('15-C', '#ecebe6', '#c4342c', 0, np.w / (np.top - np.bottom)));

  // Maroon awning with a white roller and red ribbon bows at both ends.
  const aw = layout.awning;
  const corners = [[aw.left, aw.back, aw.top], [aw.right, aw.back, aw.top], [aw.right, aw.front, aw.bottom], [aw.left, aw.front, aw.bottom]];
  world.mesh('Chong Min awning', corners.flatMap(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; }), [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#8e2a2e'));
  const front = pt((aw.left + aw.right) / 2, aw.front);
  world.box('Chong Min awning valance', front[0], aw.bottom - .09, front[1], aw.right - aw.left, .18, .03, world.mat('#7d2428'), undefined, angle);
  world.box('Chong Min awning roller', front[0], aw.bottom + .02, front[1], aw.right - aw.left, .05, .06, world.mat('#eeeae2'), undefined, angle);
  for (const u of [aw.left + .1, aw.right - .1]) {
    const p = pt(u, aw.front - .05);
    world.box('Chong Min ribbon bow', p[0], aw.bottom - .2, p[1], .28, .28, .1, world.mat('#c8202a'), undefined, angle).rotateLocal(0, 0, 45);
    world.box('Chong Min ribbon tail', p[0], aw.bottom - .75, p[1], .08, .9, .04, world.mat('#c8202a'), undefined, angle);
  }

  buildGableRoof(world, 'Chong Min', frame, gableRoof(frame, chongMin), {
    tile: '#a15a3e', course: '#8b4c35', coping: '#d9d5ca', gable: '#ebe8df', copingHeight: .1, copingWidth: .12,
  });

  for (const r of chongMinReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
