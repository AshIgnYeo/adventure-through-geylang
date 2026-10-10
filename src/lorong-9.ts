import type { World, Point } from './world';
import { lorong9, lorong9Frame, lorong9Layout, lorong9Reviews } from './lorong-9-layout.mjs';
import { buildSimpleHouse } from './simple-house';
import { project } from './geo.mjs';

type Box = { u: number; w: number };

/** Keep the part of each box between `from` and `to` along the frontage, re-based at `from`. */
function slice<T extends Box>(boxes: T[], from: number, to: number): T[] {
  return boxes.flatMap(b => {
    const l = Math.max(b.u - b.w / 2, from), r = Math.min(b.u + b.w / 2, to);
    return r - l > .005 ? [{ ...b, u: (l + r) / 2 - from, w: r - l }] : [];
  });
}

/** June 2024 exteriors on the east side of Lorong 9. */
export function buildLorong9(world: World, id: string, poly: Point[]) {
  const place = lorong9.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong9Frame(poly, place);
  let layout = lorong9Layout(place, frame.width) as any;
  if (place.buildingIds.length > 1) {
    // One elevation across adjoining ways: lay it out over their combined width, then give each way its slice.
    const widths = place.buildingIds.map((bid: string) => {
      const b = world.data.buildings.find(x => x.id === bid)!, o = b.coordinates.slice(0, -1).map(c => project(c, world.data.origin) as Point);
      return lorong9Frame(o, place).width;
    });
    const index = place.buildingIds.indexOf(id), from = widths.slice(0, index).reduce((s: number, w: number) => s + w, 0);
    const whole = lorong9Layout(place, widths.reduce((s: number, w: number) => s + w, 0)) as any;
    layout = { ...whole, boxes: slice(whole.boxes, from, from + frame.width), board: undefined, boards: [], blades: [], awning: undefined };
    if (index === 0) for (const r of lorong9Reviews(place, { ...frame, width: widths[0] + widths[1] } as any)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  } else {
    for (const r of lorong9Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  }
  buildSimpleHouse(world, `${place.name} ${id}`, frame, poly, place, layout);
  return true;
}
