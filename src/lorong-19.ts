import type { World, Point } from './world';
import { lorong19 } from './lorong-19-layout.mjs';
import { buildLaneHouse, text, sans, kai, type Draws } from './lane-house';
import type { Draw } from './simple-house';

// Named places only: original lettering after the photographed boards.
// Eminent's frog: a green body with two white eyes, after the mascot on its lightboxes.
const frog = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c.fillStyle = '#3f9a3a'; c.beginPath(); c.ellipse(x, y, r * .8, r, 0, 0, Math.PI * 2); c.fill();
  for (const dx of [-.42, .42]) {
    c.fillStyle = '#3f9a3a'; c.beginPath(); c.arc(x + dx * r, y - r * .85, r * .32, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.arc(x + dx * r, y - r * .87, r * .2, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#1b1b1b'; c.beginPath(); c.arc(x + dx * r, y - r * .85, r * .09, 0, Math.PI * 2); c.fill();
  }
  c.strokeStyle = '#1f5d1f'; c.lineWidth = r * .08; c.beginPath(); c.arc(x, y - r * .2, r * .35, .2, Math.PI - .2); c.stroke();
};
const frogLightbox: Draw = (c, w, h) => {
  const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#f6c63a'); g.addColorStop(1, '#ef8a2a'); c.fillStyle = g; c.fillRect(0, 0, w, h);
  frog(c, h * .55, h * .58, h * .32);
  text(c, '明輝田雞粥', w * .56, h * .36, h * .36, '#c4161c', '900', kai, w * .7);
  text(c, 'EMINENT FROG PORRIDGE SEAFOOD RESTAURANT', w * .56, h * .74, h * .13, '#1d3f8f', '800', sans, w * .76);
};
const draws: Draws = {
  'eminent-frog-porridge': {
    boards: [(c, w, h) => {
      c.fillStyle = '#efe6d2'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b9ae96'; c.lineWidth = h * .04; c.strokeRect(0, 0, w, h);
      text(c, '明輝', w * .12, h * .3, h * .3, '#b8241c', '800', kai);
      text(c, '田雞粥', w * .12, h * .64, h * .3, '#b8241c', '800', kai);
      text(c, 'EMINENT', w * .12, h * .88, h * .14, '#1d3f8f', '800', sans, w * .2);
      for (let i = 0; i < 4; i++) { c.fillStyle = ['#d9a65a', '#b8603a', '#e8d8b0', '#9a5a3a'][i]; c.beginPath(); c.ellipse(w * (.35 + i * .18), h * .52, h * .3, h * .24, 0, 0, Math.PI * 2); c.fill(); }
    }, (c, w, h) => {
      c.fillStyle = '#137a52'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f2f2ea'; c.lineWidth = h * .06; c.strokeRect(h * .08, h * .08, w - h * .16, h - h * .16);
      text(c, 'Lor 19 Geylang', w * .5, h * .54, h * .58, '#f4f4ec', '600', sans, w * .86);
    }],
    blades: [(c, w, h) => {
      c.fillStyle = '#16233f'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9a54a'; c.lineWidth = w * .05; c.strokeRect(w * .05, w * .05, w - w * .1, h - w * .1);
      [...'明輝田雞粥'].forEach((ch, i) => text(c, ch, w * .5, h * (.12 + i * .145), w * .62, '#f0c64a', '800', kai));
      text(c, 'EMINENT', w * .5, h * .86, w * .17, '#f0e6c8', '800', sans, w * .86);
      text(c, 'FROG PORRIDGE', w * .5, h * .9, w * .1, '#f0e6c8', '700', sans, w * .86);
      text(c, '323', w * .5, h * .95, w * .12, '#f0c64a', '800', sans);
    }],
  },
  'eminent-frog-porridge@0': {
    boards: [(c, w, h) => {
      c.fillStyle = '#3a2418'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9a54a'; c.lineWidth = h * .05; c.strokeRect(h * .05, h * .05, w - h * .1, h - h * .1);
      text(c, '明輝田雞粥海鮮煮炒店', w * .5, h * .38, h * .4, '#e9c25a', '800', kai, w * .9);
      text(c, 'EMINENT FROG PORRIDGE & SEAFOOD (LOR 19)', w * .5, h * .78, h * .2, '#e9c25a', '700', sans, w * .9);
    }, frogLightbox, frogLightbox],
  },
};

/** Lorong 19 between Geylang Road and Sims Avenue; named only where a listing and a photographed sign agree. */
export function buildLorong19(world: World, id: string, poly: Point[]) {
  const place = lorong19.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
