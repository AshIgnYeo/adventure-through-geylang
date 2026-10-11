import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { gableRoof, type frontageFrame } from './gable-roof-layout.mjs';

type Frame = ReturnType<typeof frontageFrame>;
type Box = { name: string; u: number; y: number; out: number; w: number; h: number; depth: number; colour: string; glow: number };
type Layout = { boxes: Box[]; canopy: { depth: number; inner: number; outer: number; from: number; to: number }; brackets: { u: number; wall: number[]; beam: number[] }[] };
type Spec = { height: number; ridgeHeight: number; ridgeDepth: number; eavesOverhang: number };

/**
 * A house of the single-storey row at Nos. 20-28 Lorong 13: walls, front fittings, the corrugated
 * canopy on its brackets, a short tiled front slope over a dark rear roof, and a salmon party-wall
 * coping on the given end ('a' or 'b'), which recurs every second party line.
 */
export function buildSingleRowHouse(world: World, label: string, frame: Frame, spec: Spec, layout: Layout, coping: 'a' | 'b' | null) {
  const { angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const board = (w: number, h: number, draw: (c: CanvasRenderingContext2D, W: number, H: number) => void) => {
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.max(64, Math.round(1024 * h / w));
    draw(canvas.getContext('2d')!, 1024, canvas.height); return canvas;
  };
  const white = material('#eeede8'), wallTop = spec.height + .08;

  // Party, rear and street walls of the single storey.
  world.panel(frame.a, frame.rearA, 0, wallTop, white);
  world.panel(frame.b, frame.rearB, 0, wallTop, white);
  world.panel(frame.rearA, frame.rearB, 0, wallTop, white);
  world.panel(pt(0), pt(frame.width), 0, wallTop, white);

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`${label} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Corrugated steel canopy, rising slightly towards the lane, on diagonal brackets.
  const cn = layout.canopy, corrugation = board(4, 1, (c, W, H) => {
    c.fillStyle = '#c3c6c2'; c.fillRect(0, 0, W, H);
    for (let x = 0; x < W; x += 16) { c.fillStyle = '#a9aeaa'; c.fillRect(x, 0, 6, H); }
  });
  const corners = [pt(cn.from, 0), pt(cn.to, 0), pt(cn.to, cn.depth), pt(cn.from, cn.depth)];
  const heights = [cn.inner, cn.inner, cn.outer, cn.outer];
  world.mesh(`${label} canopy sheet`, corners.flatMap((p, i) => [p[0], heights[i], p[1]]), [0, 0, 6, 0, 6, 1, 0, 1], [0, 1, 2, 0, 2, 3], textured(corrugation));
  for (const br of layout.brackets) {
    const [o0, y0] = br.wall, [o1, y1] = br.beam, mid = pt(br.u, (o0 + o1) / 2);
    world.box(`${label} canopy bracket`, mid[0], (y0 + y1) / 2, mid[1], .05, .05, Math.hypot(o1 - o0, y1 - y0), world.mat('#7f8482'), undefined, angle)
      .rotateLocal(-Math.atan2(y1 - y0, o1 - o0) * 180 / Math.PI, 0, 0);
    const tie = pt(br.u, (cn.depth - .06) / 2);
    world.box(`${label} canopy tie`, tie[0], (cn.inner + cn.outer) / 2 - .06, tie[1], .03, .03, cn.depth - .06, world.mat('#7f8482'), undefined, angle);
  }

  // Roof: a short tiled front slope with tile courses, a dark low rear roof, white gable walls.
  const roof = gableRoof(frame, spec), v = roof.vertices;
  const tile = material('#b8664a'), dark = material('#3d4042'), course = material('#9c5240'), copingMat = material('#cf8a74');
  const tri = (name: string, idx: number[][], mat: pc.Material) => world.mesh(name, idx.flat().flatMap(i => v[i]), idx.flat().flatMap(i => [v[i][0] / 3, v[i][2] / 3]), idx.flat().map((_, k) => k), mat);
  tri(`${label} tiled front slope`, roof.slopes.slice(0, 2), tile);
  tri(`${label} dark rear roof`, roof.slopes.slice(2), dark);
  for (const g of roof.gables) world.mesh(`${label} gable wall`, g.flat(), [0, 0, 1, 0, .5, 1], [0, 1, 2], white);
  const lerp = (p: number[], q: number[], t: number) => p.map((x, i) => x + (q[i] - x) * t);
  const quad = [0, 0, 1, 0, 1, 1, 0, 1], quadIndices = [0, 1, 2, 0, 2, 3];
  for (let t = .06; t < .97; t += .09) {
    const q = [lerp(v[0], v[2], t), lerp(v[1], v[3], t), lerp(v[1], v[3], t + .025), lerp(v[0], v[2], t + .025)];
    world.mesh(`${label} tile course`, q.flatMap(p => [p[0], p[1] + .015, p[2]]), quad, quadIndices, course);
  }
  if (coping) {
    // The raised coping on this end's party wall, stepping inwards from the end.
    const [eave, ridge, inward] = coping === 'a' ? [v[0], v[2], 1] : [v[1], v[3], -1];
    const ch = .25, cw = .22, shift = (s: number[]) => [s[0] + frame.dx * cw * inward, s[1], s[2] + frame.dz * cw * inward];
    const top = [eave, ridge, shift(ridge), shift(eave)].map(s => [s[0], s[1] + ch, s[2]]);
    world.mesh(`${label} party-wall coping`, top.flat(), quad, quadIndices, copingMat);
    world.mesh(`${label} coping face`, [shift(eave), shift(ridge), top[2], top[3]].flat(), quad, quadIndices, copingMat);
  }
  return { pt, textured, board };
}
