import type { World, Point } from './world';
import { lorong21 } from './lorong-21-layout.mjs';
import { buildLaneHouse, text, sans, kai, type Draws } from './lane-house';
import type { Draw } from './simple-house';

// Named places only: original lettering after the photographed boards.
// Cheng Yi's six dish boards at the corner: white-edged, each a colour, the dish read top to bottom.
const dishBoard = (dish: string, colour: string, foot?: string): Draw => (c, w, h) => {
  c.fillStyle = '#f4f4f0'; c.fillRect(0, 0, w, h); c.fillStyle = colour; c.fillRect(w * .1, w * .1, w * .8, h - w * .2);
  const chars = [...dish], step = (h - w * .5 - (foot ? h * .12 : 0)) / chars.length;
  chars.forEach((ch, i) => text(c, ch, w * .5, w * .25 + step * (i + .5), Math.min(w * .6, step * .86), '#f8f6ee', '700', kai));
  if (foot) text(c, foot, w * .5, h - w * .1 - h * .07, w * .3, '#f8f6ee', '800', sans, w * .7);
};
const draws: Draws = {
  'cheng-yi@9': {
    boards: [(c, w, h) => {
      c.fillStyle = '#2a2c2a'; c.fillRect(0, 0, w, h);
      text(c, 'CHENG YI COFFEE SHOP', w * .5, h * .56, h * .72, '#f0c63a', '800', sans, w * .94);
    },
    dishBoard('煮炒', '#c8302a'), dishBoard('炖汤', '#2a62c8'), dishBoard('杂菜饭', '#d8502a'), dishBoard('田鸡粥', '#7a2a8a'),
    dishBoard('肉骨茶', '#e8902a'), dishBoard('海鲜烧烤', '#2e8a3a', 'BBQ')],
  },
};

/** Lorong 21 between Geylang Road and Sims Avenue, with the Sims Avenue houses back to Lorong 19; named only where a
 * listing and a photographed sign agree. */
export function buildLorong21(world: World, id: string, poly: Point[]) {
  const place = lorong21.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
