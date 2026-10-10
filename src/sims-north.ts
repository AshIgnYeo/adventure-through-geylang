import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { project } from './geo.mjs';
import { gableRoof, frontageFrame } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';
import { normalStainless, qianjing, pairFrame, pairLayout, pairReviews, measuredSplit } from './sims-north-layout.mjs';

/** Nos. 131 and 133 Sims Avenue. The No. 131 call builds the measured street front
 *  across both; each call closes its own source outline and roof. */
export function buildSimsNorthPair(world: World, id: string, poly: Point[]) {
  const ids = [...normalStainless.buildingIds, ...qianjing.buildingIds];
  const unit = ids.indexOf(id);
  if (unit < 0) return false;
  const outline = (wayId: string) => world.data.buildings.find(b => b.id === wayId)!.coordinates.slice(0, -1).map(p => project(p, world.data.origin) as Point);
  const frame = pairFrame(outline(ids[0]), outline(ids[1]));
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };

  // Each building's volume follows its measured span along the pair: No. 131 to the
  // 6.36 m party wall, No. 133 beyond it. Source outlines and collision are unchanged.
  const rear = (u: number) => {
    const t = u / frame.width;
    return [frame.rearA[0] + (frame.rearB[0] - frame.rearA[0]) * t, frame.rearA[1] + (frame.rearB[1] - frame.rearA[1]) * t] as Point;
  };
  const [u0, u1] = unit ? [measuredSplit, frame.width] : [0, measuredSplit];
  const span = [pt(u0), pt(u1), rear(u1), rear(u0)];
  const top = unit ? qianjing.height : normalStainless.height, wall = material(unit ? '#efeee9' : '#6f7477');
  world.panel(span[0], span[3], .13, top + .08, wall);
  world.panel(span[1], span[2], .13, top + .08, wall);
  world.panel(span[3], span[2], .13, top + .08, wall);
  if (unit) {
    const own = frontageFrame(span, 0);
    buildGableRoof(world, 'QianJing', own, gableRoof(own, qianjing), {
      tile: '#9c5b45', course: '#86493a', coping: '#d8d6cf', gable: '#efeee9', copingHeight: .1, copingWidth: .12,
    });
    return true;
  }
  world.mesh('Normal Stainless roof', span.flatMap(p => [p[0], top - .05, p[1]]), span.flatMap(p => [p[0] / 4, p[1] / 4]), [0, 1, 2, 0, 2, 3], material('#8f8b84'));

  const layout = pairLayout(frame.width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Sims 131-133 ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, frame.angle);
  }

  // Normal Stainless Steel fascia: red Chinese and English on cream, redrawn originally.
  const ns = layout.nssSign, nc = document.createElement('canvas');
  nc.width = 2048; nc.height = Math.round(2048 * (ns.top - ns.bottom) / (ns.right - ns.left));
  const n = nc.getContext('2d')!, nh = nc.height;
  const g = n.createLinearGradient(0, 0, 0, nh); g.addColorStop(0, '#f1dfa8'); g.addColorStop(1, '#e2c27a');
  n.fillStyle = g; n.fillRect(0, 0, 2048, nh); n.strokeStyle = '#b48d43'; n.lineWidth = 10; n.strokeRect(5, 5, 2038, nh - 10);
  n.textAlign = 'center'; n.textBaseline = 'middle';
  n.fillStyle = '#b8322c'; n.font = `700 ${nh * .42}px "Songti SC", "STSong", serif`; n.fillText('普 通 白 钢 有 限 公 司', 1024, nh * .33, 1500);
  n.fillStyle = '#b8322c'; n.font = `700 ${nh * .26}px "Helvetica Neue", Arial, sans-serif`; n.fillText('NORMAL STAINLESS STEEL PTE LTD', 1024, nh * .76, 1500);
  n.strokeStyle = '#b8322c'; n.lineWidth = 8; n.beginPath(); n.arc(130, nh / 2, nh * .3, 0, Math.PI * 2); n.stroke();
  world.panel(pt(ns.left, ns.out), pt(ns.right, ns.out), ns.bottom, ns.top, textured(nc, .05));

  // QianJing signboard: a dragon roundel and serif lettering in black on white.
  const qs = layout.qjSign, qc = document.createElement('canvas');
  qc.width = 2048; qc.height = Math.round(2048 * (qs.top - qs.bottom) / (qs.right - qs.left));
  const q = qc.getContext('2d')!, qh = qc.height;
  q.fillStyle = '#f7f7f4'; q.fillRect(0, 0, 2048, qh); q.strokeStyle = '#d0cfca'; q.lineWidth = 10; q.strokeRect(5, 5, 2038, qh - 10);
  const cx = 380, cy = qh / 2, r = qh * .32;
  q.fillStyle = '#1b1b1b'; q.beginPath(); q.arc(cx, cy, r, 0, Math.PI * 2); q.fill();
  q.strokeStyle = '#f7f7f4'; q.lineWidth = r * .09; q.lineCap = 'round';
  q.beginPath(); q.arc(cx, cy, r * .62, Math.PI * .2, Math.PI * 1.75); q.stroke();
  q.beginPath(); q.moveTo(cx - r * .3, cy + r * .1); q.bezierCurveTo(cx - r * .1, cy - r * .4, cx + r * .3, cy + r * .4, cx + r * .45, cy - r * .2); q.stroke();
  q.fillStyle = '#f7f7f4'; q.font = `700 ${r * .7}px "Songti SC", serif`; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText('千晶', cx, cy + r * .1);
  q.fillStyle = '#1b1b1b'; q.textAlign = 'left'; q.font = `500 ${qh * .2}px "Didot", "Times New Roman", serif`; q.fillText('QIANJING', 720, qh * .45, 1250);
  q.font = `500 ${qh * .08}px "Didot", "Times New Roman", serif`; q.fillText('CRYSTALS  &  LIFESTYLE', 900, qh * .64, 1000);
  world.panel(pt(qs.left, qs.out), pt(qs.right, qs.out), qs.bottom, qs.top, textured(qc, .05));
  const ss = layout.qjSmallSign;
  world.panel(pt(ss.left, ss.out), pt(ss.right, ss.out), ss.bottom, ss.top, world.textMaterial('QIANJING CRYSTAL', '#f2f1ec', '#8a6a3a', 0, (ss.right - ss.left) / (ss.top - ss.bottom)));

  for (const rv of pairReviews(frame)) world.reviewSpawns.set(rv.id, { p: rv.p as Point, yaw: rv.yaw, pitch: rv.pitch });
  return true;
}
