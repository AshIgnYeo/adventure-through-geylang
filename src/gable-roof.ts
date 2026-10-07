import * as pc from 'playcanvas';
import type { World } from './world';
import type { gableRoof, frontageFrame } from './gable-roof-layout.mjs';

type Frame = ReturnType<typeof frontageFrame>;
type Roof = ReturnType<typeof gableRoof>;
export type RoofFinish = {
  tile: string; course: string; coping: string; gable: string;
  // Raised party-wall copings: height above the tiles, width inside the frontage,
  // and an optional end block where each coping meets the front eaves.
  copingHeight: number; copingWidth: number; frontCap?: { length: number; height: number };
};

/** Tiled slopes, tile courses, gable walls and party-wall copings. */
export function buildGableRoof(world: World, name: string, frame: Frame, roof: Roof, finish: RoofFinish) {
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const tile = material(finish.tile), course = material(finish.course), coping = material(finish.coping);
  world.mesh(`${name} estimated tiled roof`, roof.vertices.flat(), roof.vertices.flatMap(v => [v[0] / 3, v[2] / 3]), roof.slopes.flat(), tile);
  for (const g of roof.gables) world.mesh(`${name} gable wall`, g.flat(), [0, 0, 1, 0, .5, 1], [0, 1, 2], material(finish.gable));
  const lerp = (p: number[], q: number[], t: number) => p.map((v, i) => v + (q[i] - v) * t);
  const quad = [0, 0, 1, 0, 1, 1, 0, 1], quadIndices = [0, 1, 2, 0, 2, 3];
  const v = roof.vertices;
  for (const [e0, e1] of [[v[0], v[1]], [v[4], v[5]]]) {
    for (let t = .04; t < .98; t += .05) {
      const q = [lerp(e0, v[2], t), lerp(e1, v[3], t), lerp(e1, v[3], t + .012), lerp(e0, v[2], t + .012)];
      world.mesh(`${name} tile course`, q.flatMap(p => [p[0], p[1] + .015, p[2]]), quad, quadIndices, course);
    }
  }
  const { copingHeight: h, copingWidth: w } = finish;
  for (const [eave, rear, ridge, inward] of [[v[0], v[4], v[2], 1], [v[1], v[5], v[3], -1]] as const) {
    const shift = (s: number[]) => [s[0] + frame.dx * w * inward, s[1], s[2] + frame.dz * w * inward];
    for (const [p, q] of [[eave, ridge], [ridge, rear]]) {
      const top = [p, q, shift(q), shift(p)].map(s => [s[0], s[1] + h, s[2]]);
      world.mesh(`${name} party-wall coping`, top.flat(), quad, quadIndices, coping);
      const face = [shift(p), shift(q), top[2], top[3]];
      world.mesh(`${name} coping face`, face.flat(), quad, quadIndices, coping);
    }
    if (finish.frontCap) {
      // The block sits on the coping at the eaves, its long side running inland.
      const { length, height } = finish.frontCap, run = Math.hypot(ridge[0] - eave[0], ridge[2] - eave[2]);
      const k = length / 2 / run, c = lerp(eave, ridge, k), m = shift(c);
      const x = (c[0] + m[0]) / 2, z = (c[2] + m[2]) / 2;
      world.box(`${name} coping end block`, x, c[1] + h + height / 2 - .05, z, w, height, length, coping, undefined, frame.angle);
    }
  }
}
