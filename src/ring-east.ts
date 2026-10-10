import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { ringEast, ringEastFrame, ringEastLayout, ringEastReviews } from './ring-east-layout.mjs';
import { buildSimpleHouse } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

/** June 2024 exteriors at the east end of the widened study area. */
export function buildRingEast(world: World, id: string, poly: Point[]) {
  const place = ringEast.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  if (place.massing) {
    // Plain walls and a flat roof, with only the photographed awnings.
    const wall = world.mat(place.colour); wall.cull = pc.CULLFACE_NONE; wall.update();
    for (let i = 0; i < poly.length; i++) world.panel(poly[i], poly[(i + 1) % poly.length], 0, place.height, wall);
    const roof = world.mat('#9a9893'); roof.cull = pc.CULLFACE_NONE; roof.update();
    const indices: number[] = []; for (let k = 1; k < poly.length - 1; k++) indices.push(0, k, k + 1);
    world.mesh(`${place.name} roof`, poly.flatMap(p => [p[0], place.height, p[1]]), poly.flatMap(() => [0, 0]), indices, roof);
    const A = place.awning;
    for (const [edge, from, to] of place.awnings ?? []) {
      const f = frontageFrame(poly, edge), p = f.point((from + to) / 2, A.depth / 2) as Point;
      world.box(`${place.name} awning`, p[0], A.wall - .1, p[1], to - from, .12, A.depth, world.mat(A.colour), undefined, f.angle).rotateLocal(10, 0, 0);
      const v = f.point((from + to) / 2, A.depth) as Point;
      world.box(`${place.name} awning valance`, v[0], A.wall - .2 - A.drop / 2, v[1], to - from, A.drop, .04, world.mat(A.colour), undefined, f.angle);
    }
    return true;
  }
  const frame = ringEastFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringEastLayout(place, frame.width) as any);
  for (const r of ringEastReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
