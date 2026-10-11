import type { World, Point } from './world';
import { lorong9, lorong9Frame, lorong9Layout, lorong9Reviews, constructionSites } from './lorong-9-layout.mjs';
import { buildSimpleHouse, sliceBoxes as slice } from './simple-house';
import { project } from './geo.mjs';

/** June 2024 exteriors on the east side of Lorong 9. */
export function buildLorong9(world: World, id: string, poly: Point[]) {
  const site = constructionSites.find(p => p.buildingIds.includes(id));
  if (site) {
    // Hoarding on every edge, with scaffold sheeting above it and no roof.
    const hoard = world.mat('#eeeeea'), sheet = world.mat('#b9b2a2'), pole = world.mat('#8a8a86');
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      world.panel(a, b, 0, site.hoarding, hoard); world.panel(a, b, site.hoarding, site.sheeting, sheet);
      world.box('scaffold pole', a[0], site.sheeting / 2, a[1], .08, site.sheeting + .6, .08, pole);
    }
    return true;
  }
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
