import type { World, Point } from './world';
import { simsNorthRow, simsNorthRowFrame, simsNorthRowLayout, simsNorthRowReviews, yiXiu, yiXiuBands } from './sims-north-row-layout.mjs';
import { frontageFrame } from './gable-roof-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const davco: { boards: Draw[]; awning: string; valance: Draw } = {
  boards: [(c, w, h) => {
    c.fillStyle = '#f4f2ec'; c.fillRect(0, 0, w, h); c.fillStyle = '#d2302c'; c.beginPath(); c.arc(w / 2, h * .42, Math.min(w, h) * .3, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1f2f6a'; c.font = `800 ${h * .16}px Arial, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Davco', w / 2, h * .85);
  }],
  awning: '#e2b43a',
  valance: (c, w, h) => { c.fillStyle = '#e2b43a'; c.fillRect(0, 0, w, h); c.fillStyle = '#c42b2b'; c.beginPath(); c.moveTo(w * .78, h * .1); c.lineTo(w * .9, h * .9); c.lineTo(w * .66, h * .9); c.closePath(); c.fill(); },
};

/** June 2024 exteriors on the north side of Sims Avenue, west of ibis budget Gold. */
export function buildSimsNorthRow(world: World, id: string, poly: Point[]) {
  if (yiXiu.buildingIds.includes(id)) return buildYiXiu(world, poly);
  const place = simsNorthRow.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = simsNorthRowFrame(poly, place), layout = simsNorthRowLayout(place, frame.width) as any;
  const stripes: Draw = (c, w, h) => { c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#2f62a8'; for (let x = 0; x < w; x += w / 14) c.fillRect(x, 0, w / 28, h); };
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'red-flag-davco' ? davco : place.id.startsWith('sa-77') && place.awning ? { awning: '#2f62a8', valance: stripes } : {});
  for (const r of simsNorthRowReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}

/** Yi Xiu Factory Building: the whole outline walled to the roof, with window bands on its two street faces. */
function buildYiXiu(world: World, poly: Point[]) {
  const P = yiXiu, wall = world.mat(P.colours.wall);
  for (let i = 0; i < poly.length; i++) world.panel(poly[i], poly[(i + 1) % poly.length], .13, P.height, wall);
  world.mesh('Yi Xiu flat roof', poly.flatMap(p => [p[0], P.height - .05, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]), poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), world.mat('#9a9893'));
  for (const edge of [5, 3, 4, 6]) {
    const f = frontageFrame(poly, edge);
    for (const b of yiXiuBands(f.width)) { const p = f.point(b.u, b.out) as Point; world.box(`Yi Xiu ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, f.angle); }
    if (edge === 5 || edge === 3) {
      // Ground storey: loading bays and a shop front under a canopy.
      const g = f.point(f.width / 2, .03) as Point; world.box('Yi Xiu ground storey', g[0], 2.6, g[1], f.width - 1, 5.0, .05, world.mat('#3a3532'), undefined, f.angle);
      const c = f.point(f.width / 2, .8) as Point; world.box('Yi Xiu canopy', c[0], 5.6, c[1], f.width, .2, 1.6, world.mat('#8a8a86'), undefined, f.angle);
    }
  }
  // The pale stair core with its vertical lettering, near the east end of the Sims face.
  const front = frontageFrame(poly, 5), core = front.point(front.width - 4.5, .35) as Point;
  world.box('Yi Xiu stair core', core[0], P.height / 2 + .5, core[1], 3.2, P.height + 1, .7, world.mat('#f0a585'), undefined, front.angle);
  const lettering = document.createElement('canvas'); lettering.width = 128; lettering.height = 640; const g = lettering.getContext('2d')!;
  g.fillStyle = '#f0a585'; g.fillRect(0, 0, 128, 640); g.fillStyle = '#a8322e'; g.font = '900 96px "Songti SC", serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  // Only the characters read in the photograph; those above them were hidden by the tree and are left blank.
  ['厂', '大', '厦'].forEach((ch, i) => g.fillText(ch, 64, 373 + i * 106));
  const m = new (world.mat('#ffffff').constructor as any)(); m.diffuseMap = world.texture(lettering); m.update();
  world.panel(front.point(front.width - 5.2, .71) as Point, front.point(front.width - 3.8, .71) as Point, 18, 31, m);
  const sign = document.createElement('canvas'); sign.width = 1024; sign.height = 96; const s2 = sign.getContext('2d')!;
  s2.fillStyle = '#c95a4d'; s2.fillRect(0, 0, 1024, 96); s2.fillStyle = '#a8322e'; s2.font = '800 72px Arial, sans-serif'; s2.textAlign = 'center'; s2.textBaseline = 'middle'; s2.fillText('YI XIU FACTORY BUILDING', 512, 50, 1000);
  const ms = new (world.mat('#ffffff').constructor as any)(); ms.diffuseMap = world.texture(sign); ms.update();
  world.panel(front.point(2, .21) as Point, front.point(22, .21) as Point, 35.2, 35.9, ms);
  const r = simsNorthRowReviews({ id: P.id }, front)[0]; world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: 28 });
  return true;
}
