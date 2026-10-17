import type { World, Point } from './world';
import { lorong16, geylangRow16 } from './lorong-16-layout.mjs';
import { buildLaneHouse, text, sans, kai, type Draws } from './lane-house';

// Named places only: original lettering after the photographed boards.
const draws: Draws = {
  // The lit board along the lane, in green and gold dots on a dark crackled ground: FROG PORRIDGE, 长江1号 by a frog, 宫保田鸡粥.
  'chang-jiang-g1': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1c2420'; c.fillRect(0, 0, w, h);
      text(c, 'CHANG JIANG', w * .14, h * .2, h * .16, '#5ad86a', '800', sans, w * .24);
      text(c, 'FROG PORRIDGE', w * .14, h * .44, h * .2, '#5ad86a', '800', sans, w * .25);
      text(c, 'FROG FARM FRANCHISE', w * .14, h * .7, h * .11, '#5ad86a', '700', sans, w * .25);
      text(c, '长江', w * .32, h * .42, h * .42, '#e8b878', '800', kai);
      c.fillStyle = '#4ac85a'; c.beginPath(); c.ellipse(w * .405, h * .55, h * .2, h * .3, 0, 0, Math.PI * 2); c.fill();
      text(c, '1号', w * .47, h * .42, h * .42, '#e8b878', '800', kai);
      text(c, '宫保田鸡粥', w * .75, h * .36, h * .5, '#3ac85a', '800', kai, w * .44);
      c.fillStyle = '#e8e4d8'; c.fillRect(w * .53, h * .66, w * .13, h * .28); c.fillStyle = '#5a5e5c'; c.fillRect(w * .66, h * .7, w * .34, h * .22);
      text(c, 'SPECIAL OFFER', w * .595, h * .8, h * .1, '#3a3a36', '700', sans, w * .12);
      text(c, '3只 $12', w * .76, h * .81, h * .17, '#f0f0ea', '700', sans, w * .16);
    }],
  },
  // The splay's dark board: two gold claypots either side of 海鮮田鸡粥 and SEAFOOD & FROG PORRIDGE in green.
  'chang-jiang-g1@1': {
    boards: [(c, w, h) => {
      c.fillStyle = '#3a3a30'; c.fillRect(0, 0, w, h); c.strokeStyle = '#8a8268'; c.lineWidth = h * .04; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
      c.fillStyle = '#c8a050';
      c.beginPath(); c.ellipse(w * .13, h * .58, w * .09, h * .22, 0, 0, Math.PI * 2); c.fill(); c.fillRect(w * .07, h * .2, w * .12, h * .14);
      c.beginPath(); c.ellipse(w * .86, h * .58, w * .08, h * .24, 0, 0, Math.PI * 2); c.fill(); c.fillRect(w * .92, h * .5, w * .07, h * .08);
      text(c, '海鮮田鸡粥', w * .5, h * .48, h * .34, '#5ac85a', '700', kai, w * .5);
      text(c, 'SEAFOOD & FROG PORRIDGE', w * .5, h * .8, h * .13, '#e8d68a', '800', sans, w * .52);
    }],
  },
  // The vertical board by the splay: plates of dishes over the restaurant's name, 长江1号.
  'chang-jiang-g1@0': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1e1e1a'; c.fillRect(0, 0, w, h); c.fillStyle = '#d8c060'; c.fillRect(w * .06, w * .06, w * .88, h * .78);
      for (let i = 0; i < 4; i++) { c.fillStyle = ['#e8e0c8', '#d8a050', '#f0e8d8', '#c87040'][i]; c.beginPath(); c.arc(w * .5, h * (.13 + i * .18), w * .32, 0, Math.PI * 2); c.fill(); }
      text(c, '长江1号', w * .5, h * .92, w * .26, '#f0e0a0', '800', kai, w * .9);
    }],
  },
  // The white board over the car park: HOTEL 81 in teal capitals, the 81 in a darker block.
  'hotel-81-geylang': {
    boards: [(c, w, h) => {
      c.fillStyle = '#f2f4f2'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8ccd0'; c.fillRect(0, h * .88, w, h * .12);
      text(c, 'HOTEL', w * .38, h * .48, h * .62, '#1e8a8a', '900', sans, w * .5);
      c.fillStyle = '#1e8a8a'; c.fillRect(w * .68, h * .1, w * .22, h * .74);
      text(c, '81', w * .79, h * .48, h * .66, '#f2f4f2', '900', sans, w * .2);
    }],
  },
  // The blade between the middle bay and the tower: HOTEL 81 read downwards in white on teal, GEYLANG under it.
  'hotel-81-geylang@19': {
    blades: [(c, w, h) => {
      c.fillStyle = '#e8eef0'; c.fillRect(0, 0, w, h); c.fillStyle = '#1e8a8a'; c.fillRect(w * .1, w * .1, w * .8, h * .86);
      [...'HOTEL'].forEach((ch, i) => text(c, ch, w * .5, h * (.07 + i * .1), w * .62, '#f2f4f2', '900', sans));
      text(c, '81', w * .5, h * .66, w * .7, '#f2f4f2', '900', sans, w * .76);
      c.fillStyle = '#2a4aa8'; c.fillRect(w * .12, h * .82, w * .76, h * .1);
      text(c, 'GEYLANG', w * .5, h * .87, w * .17, '#f2f4f2', '800', sans, w * .72);
    }],
  },
  // The temple's board: 天善堂 in gold on black, read from right to left.
  'then-shen-temple': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1e1a18'; c.fillRect(0, 0, w, h); c.strokeStyle = '#a8803a'; c.lineWidth = h * .06; c.strokeRect(h * .05, h * .05, w - h * .1, h - h * .1);
      [...'天善堂'].forEach((ch, i) => text(c, ch, w * (.78 - i * .28), h * .54, h * .62, '#d8a848', '700', kai));
    }],
  },
  // Crystal Lodge's raised grey capitals on the boundary wall, its L lost, over the address.
  'crystal-lodge': {
    boards: [(c, w, h) => {
      c.fillStyle = '#ecebe6'; c.fillRect(0, 0, w, h);
      text(c, 'CRYSTAL', w * .5, h * .3, h * .36, '#5a5a56', '500', 'Georgia, "Times New Roman", serif', w * .9);
      text(c, 'ODGE', w * .56, h * .62, h * .3, '#5a5a56', '500', 'Georgia, "Times New Roman", serif', w * .5);
      text(c, '30 LORONG 16 GEYLANG', w * .5, h * .88, h * .1, '#5a5a56', '600', sans, w * .7);
    }],
  },
  // The red board: B & S MINIMART PRIVATE LTD. over a plain band for its Bengali line and the address.
  'bs-mini-mart': {
    boards: [(c, w, h) => {
      c.fillStyle = '#b8324a'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#f2f0ea'; c.fillRect(w * .02, h * .1, w * .11, h * .8); c.fillStyle = '#3a6a3a'; c.fillRect(w * .87, h * .08, w * .12, h * .84);
      text(c, 'B & S MINIMART PRIVATE LTD.', w * .5, h * .27, h * .26, '#f8f4ec', '800', sans, w * .7);
      c.fillStyle = 'rgba(248,244,236,.55)'; c.fillRect(w * .18, h * .5, w * .64, h * .1);
      text(c, '310, GEYLANG ROAD, SINGAPORE 389349', w * .5, h * .78, h * .14, '#f8f4ec', '700', sans, w * .66);
    }],
  },
};

/** Lorong 16 from Geylang Road to the edge of the extract, with its west corner on Geylang Road; named only where a
 * listing and a photographed sign agree. */
export function buildLorong16(world: World, id: string, poly: Point[]) {
  const place = [...lorong16, ...geylangRow16].find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place.parts ? { ...place, ...place.parts[id] } : place, poly, draws);
  return true;
}
