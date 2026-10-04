import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { FacadeFrame } from './landmark-models';
import { amrise, amriseLayout, amriseObliqueReview } from './amrise-layout.mjs';

/** One dated street elevation, within the source No. 112 frontage. */
export function buildAmrise(world: World, f: FacadeFrame) {
  const { a, dx, dz, nx, nz, width } = f;
  const pt = (u: number, out: number): Point => [a[0] + dx * u + nx * out, a[1] + dz * u + nz * out];
  const angle = Math.atan2(nx, nz) * 180 / Math.PI;
  world.panel(pt(0, 0), pt(width, 0), 3.35, amrise.height, world.mat('#e3bdc3'));
  const { boxes, blade } = amriseLayout(width);
  for (const b of boxes) {
    const p = pt(b.u, b.out);
    world.box(`Amrise ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, angle);
  }
  // Original typography on an oval mesh, based on the observed vertical sign.
  // Two separately mapped sides keep the lettering readable in both directions.
  const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 1024;
  const c = canvas.getContext('2d')!;
  c.fillStyle = '#f1e5d9'; c.fillRect(0, 0, 256, 1024);
  c.strokeStyle = '#a7343c'; c.lineWidth = 15; c.beginPath(); c.ellipse(128, 512, 119, 499, 0, 0, Math.PI * 2); c.stroke();
  c.fillStyle = '#a7343c'; c.font = 'italic 700 125px Georgia'; c.textAlign = 'center'; c.textBaseline = 'middle';
  [...'Amrise'].forEach((letter, i) => c.fillText(letter, 128, 193 + i * 124));
  const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas); mat.cull = pc.CULLFACE_NONE; mat.update();
  for (const side of [-1, 1]) {
    const centre = pt(blade.u + side * blade.thickness / 2, blade.out);
    const positions = [centre[0], blade.y, centre[1]], uv = [.5, .5], indices: number[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = Math.PI * 2 * i / 40, x = Math.cos(t), y = Math.sin(t);
      const p = pt(blade.u + side * blade.thickness / 2, blade.out + x * blade.depth / 2);
      positions.push(p[0], blade.y + y * blade.height / 2, p[1]);
      uv.push(.5 + side * x / 2, .5 - y / 2);
      if (i) indices.push(0, i, i + 1);
    }
    world.mesh('Amrise oval blade sign', positions, uv, indices, mat);
  }
  for (const y of [blade.y - .8, blade.y + .8]) {
    const p = pt(blade.u, .27);
    world.box('Amrise sign bracket', p[0], y, p[1], .06, .055, .6, world.mat('#716c63'), undefined, angle);
  }
  // A second inspection angle reveals the entrance recess and blade sign.
  const review = amriseObliqueReview(f);
  world.reviewSpawns.set('amrise-hotel-oblique', { p: review.p as Point, yaw: review.yaw });
  return true;
}
