import type { World, Point } from './world';
import { lorong14, lorong14Frame, lorong14Reviews } from './lorong-14-layout.mjs';
import { buildLaneHouse, text, sans, kai, type Draws } from './lane-house';
import type { Draw } from './simple-house';

// Named places only: original lettering after the photographed boards.
// A granite panel set in a boundary wall: Chinese in bronze down its left, the English name in script beside it.
const granitePanel = (chinese: string, english: string, ground: string) => (c: CanvasRenderingContext2D, w: number, h: number) => {
  c.fillStyle = ground; c.fillRect(0, 0, w, h);
  const x0 = w * .1, y0 = h * .28, pw = w * .82, ph = h * .5;
  c.fillStyle = '#b8b6b0'; c.fillRect(x0, y0, pw, ph); c.fillStyle = '#cac8c2';
  for (let i = 0; i < 700; i++) c.fillRect(x0 + (i * 97) % pw, y0 + (i * 61) % ph, 3, 3);
  [...chinese].forEach((ch, i) => text(c, ch, x0 + pw * .1, y0 + ph * (.2 + i * .3), ph * .24, '#6a5434', '700', kai));
  text(c, english, x0 + pw * .58, y0 + ph * .45, ph * .26, '#6a5434', 'italic 600', 'Georgia, "Times New Roman", serif', pw * .76);
};
// The ibis budget sign: a blue cushion with white lowercase lettering.
const ibisSign: Draw = (c, w, h) => {
  c.fillStyle = '#2a6ac8'; c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(w / 2, h * .08, w, 0); c.quadraticCurveTo(w * .92, h / 2, w, h);
  c.quadraticCurveTo(w / 2, h * .92, 0, h); c.quadraticCurveTo(w * .08, h / 2, 0, 0); c.fill();
  text(c, 'ibis', w * .5, h * .34, h * .3, '#ffffff', '700', sans, w * .6);
  text(c, 'budget', w * .5, h * .58, h * .2, '#ffffff', '400', sans, w * .8);
  text(c, 'HOTELS', w * .5, h * .76, h * .07, '#ffffff', '600', sans, w * .4);
};
const draws: Draws = {
  // The granite panel on the boundary wall at the Talma Road corner: 永豐閣 in bronze down its left, Wing Fong Court in
  // script beside it.
  'wing-fong-court@1': {
    boards: [granitePanel('永豐閣', 'Wing Fong Court', '#f2f2ee')],
  },
  // The same on Wing Fong Mansions' corner wall: 永豐樓 Wing Fong Mansions.
  'wing-fong-mansions@74': { boards: [granitePanel('永豐樓', 'Wing Fong Mansions', '#f0e8d6')] },
  // The red board across the forecourt canopy: HAPPY in white, 31 in red on a cream panel, 乐缘 in white.
  'ibis-budget-pearl': {
    boards: [ibisSign, (c, w, h) => {
      c.fillStyle = '#ece2bc'; c.fillRect(0, 0, w, h);
      text(c, 'PEARL', w * .5, h * .55, h * .6, '#2a5ab8', 'italic 800', sans, w * .7);
    }],
  },
  // The grey name board: a maroon swoosh over CENTRAL in grey capitals and IMPERIAL in maroon, the address under a rule.
  'central-imperial': {
    boards: [(c, w, h) => {
      c.fillStyle = '#a8aaaa'; c.beginPath(); c.moveTo(0, h * .12); c.quadraticCurveTo(w * .35, -h * .05, w * .6, h * .2); c.quadraticCurveTo(w * .8, h * .32, w, h * .2);
      c.lineTo(w, h); c.lineTo(0, h); c.fill();
      c.strokeStyle = '#7a2a3a'; c.lineWidth = h * .04; c.beginPath(); c.moveTo(w * .12, h * .22); c.quadraticCurveTo(w * .3, h * .16, w * .45, h * .28); c.stroke();
      text(c, 'CENTRAL', w * .5, h * .45, h * .2, '#d8d8d4', '600', 'Georgia, "Times New Roman", serif', w * .8);
      text(c, 'IMPERIAL', w * .5, h * .66, h * .2, '#8a2a3e', '700', 'Georgia, "Times New Roman", serif', w * .84);
      c.fillStyle = '#e8e8e4'; c.fillRect(w * .1, h * .78, w * .8, h * .012);
      text(c, '3 LORONG 14 GEYLANG', w * .5, h * .87, h * .08, '#e8e8e4', '600', sans, w * .7);
    }],
  },
  'le-yuan': {
    boards: [(c, w, h) => {
      c.fillStyle = '#c8282a'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#efe4c8'; c.fillRect(w * .38, h * .1, w * .2, h * .8);
      text(c, 'HAPPY', w * .19, h * .55, h * .66, '#f8f4ee', '700', sans, w * .34);
      text(c, '31', w * .48, h * .55, h * .66, '#c8282a', '800', sans, w * .16);
      text(c, '乐缘', w * .78, h * .55, h * .66, '#f8f4ee', '700', kai, w * .3);
    }],
  },
};

/** Lorong 14 from Geylang Road to the edge of the extract, with the Geylang Road row east to Lorong 16; named only
 * where a listing and a photographed sign agree. */
export function buildLorong14(world: World, id: string, poly: Point[]) {
  const place = (lorong14 as any[]).find(p => p.buildingIds.includes(id));
  if (!place) return false;
  const spec = place.parts ? { ...place, ...place.parts[id] } : place;
  // Review starts are set here, so that a face running on past the corridor can have one opposite its walkable part.
  buildLaneHouse(world, { ...spec, noReview: true }, poly, draws);
  if (!spec.noReview) for (const r of lorong14Reviews(spec, lorong14Frame(poly, spec)) as any[]) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
