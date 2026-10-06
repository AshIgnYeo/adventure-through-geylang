import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { FacadeFrame } from './landmark-models';
import { thyeSeng, thyeSengLayout, thyeSengReviews } from './thye-seng-layout.mjs';

export function buildThyeSeng(world: World, f: FacadeFrame) {
  const { a, dx, dz, nx, nz, width } = f;
  const pt = (u: number, out: number): Point => [a[0] + dx * u + nx * out, a[1] + dz * u + nz * out];
  const angle = Math.atan2(nx, nz) * 180 / Math.PI;
  world.panel(pt(0, 0), pt(width, 0), 3.30, thyeSeng.height, world.mat('#dfd9c9'));
  const { boxes, awning } = thyeSengLayout(width);
  for (const b of boxes) {
    const p = pt(b.u, b.out);
    world.box(`Thye Seng ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, angle);
  }
  const corners = [
    [awning.left, awning.back, awning.top], [awning.right, awning.back, awning.top],
    [awning.right, awning.front, awning.bottom], [awning.left, awning.front, awning.bottom],
  ];
  const mat = world.mat('#a84d43'); mat.cull = pc.CULLFACE_NONE; mat.update();
  world.mesh('Thye Seng estimated red awning', corners.flatMap(([u, out, y]) => {
    const p = pt(u, out); return [p[0], y, p[1]];
  }), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], mat);

  // Original typography for the observed bilingual fascia; no photo textures,
  // product adverts, stock, or unverified upper-storey organisation lettering.
  const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = 256;
  const c = canvas.getContext('2d')!;
  c.fillStyle = '#e6dcc1'; c.fillRect(0, 0, 2048, 256);
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillStyle = '#a23e38'; c.font = '700 111px serif';
  c.fillText('泰成五金企業私營有限公司', 1024, 79, 1920);
  c.fillStyle = '#273d61'; c.font = '700 81px serif';
  c.fillText('THYE SENG HARDWARE ENTERPRISE PTE LTD', 1024, 194, 1950);
  const sign = new pc.StandardMaterial(); sign.diffuseMap = world.texture(canvas); sign.cull = pc.CULLFACE_NONE; sign.update();
  world.panel(pt(width * .06, -1.303), pt(width * .94, -1.303), 2.73, 3.27, sign);
  for (const r of thyeSengReviews(f)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
