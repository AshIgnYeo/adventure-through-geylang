import type { World, Point } from './world';
import { lorong14 } from './lorong-14-layout.mjs';
import { buildLaneHouse, text, sans, kai, type Draws } from './lane-house';

// Named places only: original lettering after the photographed boards.
const draws: Draws = {
  // The granite panel on the boundary wall at the Talma Road corner: 永豐閣 in bronze down its left, Wing Fong Court in
  // script beside it.
  'wing-fong-court@1': {
    boards: [(c, w, h) => {
      c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h);
      const x0 = w * .1, y0 = h * .28, pw = w * .82, ph = h * .5;
      c.fillStyle = '#b8b6b0'; c.fillRect(x0, y0, pw, ph); c.fillStyle = '#cac8c2';
      for (let i = 0; i < 700; i++) c.fillRect(x0 + (i * 97) % pw, y0 + (i * 61) % ph, 3, 3);
      [...'永豐閣'].forEach((ch, i) => text(c, ch, x0 + pw * .12, y0 + ph * (.2 + i * .3), ph * .24, '#6a5434', '700', kai));
      text(c, 'Wing Fong Court', x0 + pw * .6, y0 + ph * .45, ph * .24, '#6a5434', 'italic 600', 'Georgia, "Times New Roman", serif', pw * .7);
    }],
  },
};

/** Lorong 14 from Geylang Road to the edge of the extract, with the Geylang Road row east to Lorong 16; named only
 * where a listing and a photographed sign agree. */
export function buildLorong14(world: World, id: string, poly: Point[]) {
  const place = (lorong14 as any[]).find(p => p.buildingIds.includes(id));
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
