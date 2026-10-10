import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { frontageFrame } from './gable-roof-layout.mjs';
import { gableRoof } from './gable-roof-layout.mjs';
import { buildGableRoof } from './gable-roof';
import { peranakan, type peranakanLayout } from './peranakan-layout.mjs';

type Frame = ReturnType<typeof frontageFrame>;

/** Party, rear and upper street walls, boxes and tiled roof shared by the measured Peranakan houses. */
export function buildPeranakanHouse(world: World, label: string, frame: Frame, layout: ReturnType<typeof peranakanLayout>, wall: string, poly?: Point[]) {
  const { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const m = world.mat(wall); m.cull = pc.CULLFACE_NONE; m.update();
  const top = peranakan.height + .06;
  if (poly) {
    // An irregular outline: wall every edge but the street front.
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], onFront = [a, b].every(p => Math.abs((p[0] - frame.a[0]) * frame.nx + (p[1] - frame.a[1]) * frame.nz) < .05);
      if (!onFront) world.panel(a, b, .13, top, m);
    }
  } else { world.panel(frame.a, frame.rearA, .13, top, m); world.panel(frame.b, frame.rearB, .13, top, m); world.panel(frame.rearA, frame.rearB, .13, top, m); }
  world.panel(pt(0), pt(width), peranakan.ceiling, top, m);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }
  buildGableRoof(world, label, frame, gableRoof(frame, peranakan), {
    tile: '#a3543f', course: '#8a4636', coping: '#e8e4da', gable: wall, copingHeight: .12, copingWidth: .14,
  });
  const textured = (canvas: HTMLCanvasElement, glow = 0, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const panel = (s: { left: number; right: number; bottom: number; top: number; out: number }, mat: pc.Material) => world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, mat);
  return { pt, textured, panel };
}
