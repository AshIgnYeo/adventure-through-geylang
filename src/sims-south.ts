import type { World, Point } from './world';
import { simsSouth, simsSouthFrame, simsSouthLayout, simsSouthReviews } from './sims-south-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const yapSunValance: Draw = (c, w, h) => {
  c.fillStyle = '#1f4f9a'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#f4f4ef'; c.font = `700 ${h * .55}px "Helvetica Neue", Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText('YAP SUN HARDWARE', w / 2, h * .52, w * .9);
};

/** June 2024 infill on the Sims Avenue south row. */
export function buildSimsSouth(world: World, id: string, poly: Point[]) {
  const place = simsSouth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = simsSouthFrame(poly, place), layout = simsSouthLayout(place, frame.width) as any;
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'yap-sun' ? { awning: '#1f4f9a', valance: yapSunValance } : place.awning ? { awning: '#b3463c', valance: (c, w, h) => { c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#b3463c'; for (let x = 0; x < w; x += w / 16) c.fillRect(x, 0, w / 32, h); } } : {});
  if (place.side) {
    // Windows on a corner's side face, at the front's heights.
    const side = frontageFrame(poly, place.side.edge);
    for (const u of place.side.windows) for (const [b, t] of [[4.69, 6.09], [7.95, 9.38]]) {
      if (u + 1 > side.width) continue;
      const p = side.point(u, .03) as Point;
      world.box(`${place.name} side window`, p[0], (b + t) / 2, p[1], 1.6, t - b, .05, world.mat('#4b585d'), undefined, side.angle);
      const q = side.point(u, .05) as Point;
      world.box(`${place.name} side window surround`, q[0], (b + t) / 2, q[1], 1.8, t - b + .2, .03, world.mat('#c8a36a'), undefined, side.angle);
    }
  }
  for (const r of simsSouthReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
