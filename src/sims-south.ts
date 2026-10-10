import type { World, Point } from './world';
import { simsSouth, simsSouthFrame, simsSouthLayout, simsSouthReviews } from './sims-south-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const bsBoard: Draw = (c, w, h) => {
  c.fillStyle = '#2f7262'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#f1d27a'; c.font = `900 ${h * .5}px "Arial Black", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BUILDERSmart', w * .55, h * .42, w * .78);
  c.fillStyle = '#f4f4ef'; c.font = `700 ${h * .2}px Arial, sans-serif`; c.fillText('www.buildersmart.com.sg', w * .55, h * .82, w * .7);
  c.fillStyle = '#f1d27a'; c.font = `900 ${h * .3}px "Songti SC", serif`; c.fillText('魯班行', w * .08, h * .5, w * .14);
};
const bsBlade: Draw = (c, w, h) => { c.fillStyle = '#2f7262'; c.fillRect(0, 0, w, h); c.fillStyle = '#f1d27a'; c.font = `900 ${w * .5}px "Songti SC", serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; ['魯', '班', '行'].forEach((ch, i) => c.fillText(ch, w / 2, h * (.2 + i * .3))); };
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
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'yap-sun' ? { awning: '#1f4f9a', valance: yapSunValance }
    : place.id === 'buildersmart-sims' ? { boards: [bsBoard], blades: [bsBlade], awning: '#2f7262', valance: (c, w, h) => { c.fillStyle = '#2f7262'; c.fillRect(0, 0, w, h); c.fillStyle = '#f1d27a'; c.font = `900 ${h * .55}px "Arial Black", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('BUILDERSmart  www.buildersmart.com.sg  67413639', w / 2, h * .52, w * .95); } }
    : place.id === 'sa-98' ? { awning: '#2f62a8', valance: (c, w, h) => { c.fillStyle = '#2f62a8'; c.fillRect(0, 0, w, h); } }
    : place.awning ? { awning: '#b3463c', valance: (c, w, h) => { c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#b3463c'; for (let x = 0; x < w; x += w / 16) c.fillRect(x, 0, w / 32, h); } } : {});
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
