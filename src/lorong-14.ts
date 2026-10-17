import type { World, Point } from './world';
import { lorong14, lorong14Frame, lorong14Reviews } from './lorong-14-layout.mjs';
import { buildLaneHouse, text, sans, hei, kai, type Draws } from './lane-house';
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
// The Valu$ mark: a blue lozenge lettered Valu$ in white, with an orange swash.
const valuMark = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c.fillStyle = '#f2f2ee'; c.beginPath(); c.ellipse(x, y, r * 1.6, r, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = '#1e4aa8'; c.beginPath(); c.ellipse(x, y, r * 1.48, r * .88, 0, 0, Math.PI * 2); c.fill();
  text(c, 'Valu$', x, y + r * .05, r * .9, '#ffffff', 'italic 800', sans, r * 2.6);
};
const valuBoard = (marks: number): Draw => (c, w, h) => {
  c.fillStyle = '#d83a2a'; c.fillRect(0, 0, w, h); c.fillStyle = '#f2f2ee'; c.fillRect(0, h * .9, w, h * .1);
  if (marks > 1) { for (let i = 0; i < marks; i++) valuMark(c, w * (i + .5) / marks, h * .46, h * .3); return; }
  valuMark(c, w * .12, h * .46, h * .3);
  text(c, '超便宜生活超市', w * .6, h * .5, h * .58, '#ffffff', '700', hei, w * .74);
};
// Little Charcoal Stove's board: a YY mark, 小炭炉 in red over LITTLE CHARCOAL STOVE, a claypot, and 滋补鸡煲 over
// HERBAL CHICKEN CLAYPOT; the corner's shorter board has the characters and the pot only.
const charcoalBoard = (long: boolean): Draw => (c, w, h) => {
  c.fillStyle = '#f6f0e6'; c.fillRect(0, 0, w, h);
  const pot = (x: number) => { c.fillStyle = '#d8783a'; c.beginPath(); c.ellipse(x, h * .55, h * .3, h * .2, 0, 0, Math.PI * 2); c.fill(); c.fillRect(x - h * .2, h * .22, h * .4, h * .1); };
  if (long) {
    text(c, 'YY', w * .05, h * .3, h * .22, '#c8302a', '800', sans);
    text(c, '小炭炉', w * .25, h * .42, h * .5, '#c8302a', '700', kai, w * .26); text(c, 'LITTLE CHARCOAL STOVE', w * .25, h * .82, h * .12, '#c8302a', '700', sans, w * .28);
    pot(w * .46);
    text(c, '滋补鸡煲', w * .72, h * .42, h * .5, '#c8302a', '700', kai, w * .34); text(c, 'HERBAL CHICKEN CLAYPOT', w * .72, h * .82, h * .12, '#c8302a', '700', sans, w * .34);
  } else {
    pot(w * .25);
    text(c, '小炭炉', w * .68, h * .32, h * .3, '#c8302a', '700', kai, w * .5); text(c, '滋补鸡煲', w * .68, h * .7, h * .3, '#c8302a', '700', kai, w * .55);
  }
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
  // Copper script reading The Amazing Inn either side of the door's arch, with the 1 in the arch.
  'amazing-inn': {
    boards: [(c, w, h) => {
      const script = 'italic 600 ' + Math.round(h * .3) + 'px "Brush Script MT", "Snell Roundhand", cursive';
      c.fillStyle = '#c88a6a'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.font = script; c.fillText('The', w * .14, h * .55); c.fillText('Inn', w * .86, h * .55);
      c.save(); c.translate(w / 2, h * 1.05); for (const [i, ch] of [...'Amazing'].entries()) { c.save(); c.rotate((i - 3) * .17); c.fillText(ch, 0, -h * .82); c.restore(); } c.restore();
      text(c, '1', w * .5, h * .62, h * .34, '#d8a888', '700', 'Georgia, "Times New Roman", serif');
    }],
  },
  // Little Charcoal Stove: red characters and a claypot on a cream board, the English names under them.
  'little-charcoal-stove@0': { boards: [charcoalBoard(true)] },
  'little-charcoal-stove@4': { boards: [charcoalBoard(false)] },
  // Sea Mu To: gold 中醫推拿養生堂 on black beside a 水木堂 mark; the lightbox; the vertical board with its number.
  'sea-mu-to': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1e1c1a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c8a050'; c.lineWidth = h * .05; c.strokeRect(h * .06, h * .06, w - h * .12, h - h * .12);
      c.fillStyle = '#c8a050'; c.fillRect(w * .03, h * .18, h * .64, h * .64); text(c, '水木堂', w * .03 + h * .32, h * .5, h * .18, '#1e1c1a', '700', kai);
      text(c, '中醫推拿養生堂', w * .56, h * .54, h * .6, '#d8b060', '700', kai, w * .74);
    }, (c, w, h) => {
      c.fillStyle = '#1e1c1a'; c.fillRect(0, 0, w, h);
      text(c, 'SEA MU TO TCM', w * .58, h * .32, h * .3, '#f2f0ea', '700', sans, w * .7);
      text(c, 'WELLNESS', w * .58, h * .7, h * .3, '#f2f0ea', '700', sans, w * .5);
      c.fillStyle = '#c8a050'; c.beginPath(); c.arc(w * .1, h * .5, h * .3, 0, Math.PI * 2); c.fill(); text(c, '水', w * .1, h * .52, h * .36, '#1e1c1a', '700', kai);
    }, (c, w, h) => {
      c.fillStyle = '#1e1c1a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c8a050'; c.lineWidth = w * .05; c.strokeRect(w * .06, w * .06, w - w * .12, h - w * .12);
      [...'中醫推拿養生堂'].forEach((ch, i) => text(c, ch, w * .5, h * (.09 + i * .118), w * .6, '#d8b060', '700', kai));
      text(c, '286', w * .5, h * .95, w * .3, '#d8b060', '600', sans);
    }],
  },
  // Em Salon Spa in gold script on black, and the vertical 暹羅指壓 THAI MASSAGE board.
  'em-salon-spa': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1a1a1c'; c.fillRect(0, 0, w, h);
      text(c, 'Em', w * .3, h * .55, h * .7, '#d8b878', 'italic 700', 'Georgia, "Times New Roman", serif');
      text(c, 'Salon Spa', w * .64, h * .58, h * .42, '#d8b878', 'italic 600', '"Snell Roundhand", "Brush Script MT", cursive', w * .5);
    }, (c, w, h) => {
      c.fillStyle = '#1a1a1c'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c8a050'; c.lineWidth = w * .05; c.strokeRect(w * .05, w * .05, w - w * .1, h - w * .1);
      text(c, 'THAI', w * .5, h * .06, w * .26, '#f2f0ea', '700', sans); text(c, 'MASSAGE', w * .5, h * .1, w * .17, '#f2f0ea', '700', sans);
      [...'暹羅指壓'].forEach((ch, i) => text(c, ch, w * .5, h * (.22 + i * .17), w * .62, '#d8b060', '700', kai));
      text(c, '288', w * .5, h * .9, w * .24, '#d8b060', '600', sans); text(c, 'Since 1992', w * .5, h * .955, w * .16, '#f2f0ea', '500', sans);
    }],
  },
  // Valu$: a red board with the blue Valu$ mark and 超便宜生活超市 in white.
  'valu': { boards: [valuBoard(1)] },
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
  // Review starts are set here, so that a face running on past the corridor can have one opposite its walkable part. A
  // place over several buildings may give one of them its own signs (`id:building` in draws).
  buildLaneHouse(world, { ...spec, noReview: true }, poly, { ...draws, [place.id]: draws[`${place.id}:${id}`] ?? draws[place.id] });
  if (!spec.noReview) for (const r of lorong14Reviews(spec, lorong14Frame(poly, spec)) as any[]) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
