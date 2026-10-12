import type { World, Point } from './world';
import { lorong19, geylangRow19 } from './lorong-19-layout.mjs';
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
  // B&S's board without the paint brand's mark, and The Primero's raised lettering on the grey beam.
  'the-primero': {
    boards: [(c, w, h) => {
      const g = c.createLinearGradient(0, 0, w, 0); g.addColorStop(0, '#e8682a'); g.addColorStop(.55, '#f08a2c'); g.addColorStop(1, '#f6c43c'); c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = '#5a5e66'; c.beginPath(); c.moveTo(w * .3, h); c.lineTo(w * .36, h * .3); c.lineTo(w, h * .1); c.lineTo(w, h * .22); c.lineTo(w * .4, h * .42); c.lineTo(w * .35, h); c.fill();
      text(c, 'B&S (2017) PTE LTD', w * .66, h * .62, h * .42, '#1d1d1d', '800', sans, w * .55);
      text(c, '#01-01', w * .93, h * .2, h * .16, '#1d1d1d', '700', sans);
    }, (c, w, h) => {
      c.fillStyle = '#b8b1a6'; c.fillRect(0, 0, w, h);
      text(c, 'THE PRIMERO', w * .5, h * .55, h * .62, '#6d6a66', '700', 'Georgia, "Times New Roman", serif', w * .94);
    }],
  },
  // The clan board in red on white, and the white panel with the clan's surname in red.
  'nanyang-chee': {
    boards: [(c, w, h) => {
      c.fillStyle = '#f2f2ee'; c.fillRect(0, 0, w, h); c.fillStyle = '#9fb6c8'; c.fillRect(0, h * .9, w, h * .1);
      text(c, 'NANYANG CHEE CLAN ASSOCIATION', w * .33, h * .5, h * .62, '#c4161c', '700', sans, w * .6);
      text(c, '南洋徐氏總會', w * .82, h * .5, h * .66, '#c4161c', '700', kai, w * .32);
    }, (c, w, h) => {
      c.fillStyle = '#f4f3ef'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c4161c'; c.lineWidth = w * .03; c.strokeRect(w * .06, w * .06, w - w * .12, h - w * .12);
      text(c, '徐', w * .5, h * .2, w * .62, '#c4161c', '700', kai);
      text(c, 'XU', w * .5, h * .4, w * .26, '#c4161c', '700', sans);
      text(c, '21', w * .5, h * .52, w * .2, '#1d1d1d', '700', sans);
    }],
  },
  'chee-hoe-hong': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1e4f9a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e8eef6'; c.lineWidth = h * .04; c.strokeRect(h * .05, h * .05, w - h * .1, h - h * .1);
      text(c, '志和行(私人)有限公司', w * .5, h * .34, h * .36, '#f4f4f0', '700', kai, w * .9);
      text(c, 'CHEE HOE HONG (PTE) LTD', w * .5, h * .74, h * .26, '#f4f4f0', '700', sans, w * .9);
    }],
  },
  // The large characters on the central windows: white, edged in grey, read top to bottom.
  'lei-zang-si': {
    boards: [(c, w, h) => {
      c.fillStyle = '#5b6a6c'; c.fillRect(0, 0, w, h);
      [...'雷藏寺'].forEach((ch, i) => { text(c, ch, w * .52, h * (.18 + i * .32), w * .82, '#4a4a4a', '700', kai); text(c, ch, w * .5, h * (.17 + i * .32), w * .8, '#f6f6f2', '700', kai); });
    }],
  },
  // Starlon's black salon board, and Tektron Pacific's white boards with a green panel.
  'starlon-tektron': {
    boards: [(c, w, h) => {
      c.fillStyle = '#231c19'; c.fillRect(0, 0, w, h);
      text(c, 'Starlon & Spa', w * .4, h * .12, h * .14, '#e8d9b0', 'italic 600', 'Georgia, "Times New Roman", serif', w * .5);
      for (let i = 0; i < 9; i++) { c.fillStyle = '#d9cfb8'; c.fillRect(w * .05, h * (.25 + i * .07), w * (.16 + (i % 3) * .03), h * .025); c.fillRect(w * .5, h * (.25 + i * .07), w * (.14 + (i % 2) * .04), h * .025); }
      for (const [x, colour] of [[.3, '#b46a5a'], [.43, '#c9a27a'], [.68, '#c08a7a'], [.82, '#8a6a8a']] as const) { c.fillStyle = colour; c.fillRect(w * x, h * .2, w * .09, h * .3); }
      text(c, '33 Lorong 19 Geylang #01-05', w * .3, h * .92, h * .07, '#e8e2d0', '600', sans, w * .45);
    }, ...Array(2).fill((c: CanvasRenderingContext2D, w: number, h: number) => {
      c.fillStyle = '#f4f4f0'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8b8b0'; c.lineWidth = h * .03; c.strokeRect(0, 0, w, h);
      c.fillStyle = '#3f9a4a'; c.fillRect(w * .18, h * .1, w * .26, h * .42);
      text(c, 'tektron', w * .31, h * .32, h * .3, '#f4f4f0', '700', sans, w * .24);
      text(c, 'pacific', w * .6, h * .32, h * .32, '#2a5a3a', '700', sans, w * .3);
      text(c, 'The sticker & signage workshop', w * .5, h * .74, h * .22, '#1d1d1d', '500', sans, w * .9);
    })],
  },
  // The corner's dark wooden board with 和平 in white brush lettering.
  'he-ping': {
    boards: [(c, w, h) => {
      c.fillStyle = '#3a2a20'; c.beginPath(); c.ellipse(w / 2, h / 2, w * .48, h * .48, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = '#a88a5a'; c.lineWidth = w * .02; c.stroke();
      text(c, '和', w * .5, h * .33, h * .32, '#f4efe2', '700', kai); text(c, '平', w * .5, h * .64, h * .32, '#f4efe2', '700', kai);
    }],
  },
  // The Lorong Bachok entrance board, and the pediment's lettering in red over the date.
  'kang-ha-pheng@0': {
    boards: [(c, w, h) => {
      c.fillStyle = '#2a1c16'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8924a'; c.lineWidth = h * .05; c.strokeRect(h * .05, h * .05, w - h * .1, h - h * .1);
      text(c, '江夏平心阁', w * .5, h * .4, h * .44, '#e9c25a', '700', kai, w * .86);
      text(c, 'KANG HA PHENG SIM KOK', w * .5, h * .8, h * .2, '#e9c25a', '700', sans, w * .86);
    }, (c, w, h) => {
      c.fillStyle = '#efe3c0'; c.fillRect(0, 0, w, h);
      text(c, '江  夏', w * .5, h * .22, h * .24, '#b8241c', '700', kai, w * .5);
      text(c, '平 心 閣', w * .5, h * .5, h * .2, '#b8241c', '700', kai, w * .6);
      text(c, '1929', w * .5, h * .8, h * .18, '#3a3a3a', '700', 'Georgia, "Times New Roman", serif');
    }],
  },
  // The lobby's raised lettering: a serif capital name over a smaller script line.
  'bougainvilla': {
    boards: [(c, w, h) => {
      c.fillStyle = '#e3d6b4'; c.fillRect(0, 0, w, h);
      text(c, 'BOUGAINVILLA', w * .5, h * .4, h * .46, '#6a5a44', 'italic 700', 'Georgia, "Times New Roman", serif', w * .92);
      text(c, 'Apartments', w * .62, h * .8, h * .24, '#6a5a44', 'italic 500', 'Georgia, "Times New Roman", serif', w * .5);
    }],
  },
  // The raised lettering on the boundary wall's panel.
  'sims-point@7': {
    boards: [(c, w, h) => {
      c.fillStyle = '#d8c08a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b8a06a'; c.lineWidth = h * .05; c.strokeRect(h * .1, h * .1, w - h * .2, h - h * .2);
      text(c, 'SIMS POINT', w * .5, h * .55, h * .42, '#6a5a3a', '700', 'Georgia, "Times New Roman", serif', w * .84);
    }],
  },
  // On Geylang Road: Romance Adult Shop's lit board, Nanyang Hardware's board (without the paint brand) and Straits
  // Laundry's board.
  'straits-laundry-331@10': {
    boards: [(c, w, h) => {
      c.fillStyle = '#231c2a'; c.fillRect(0, 0, w, h);
      text(c, 'ROMANCE ADULT SHOP', w * .5, h * .32, h * .3, '#f0e8f0', '700', 'Georgia, "Times New Roman", serif', w * .9);
      text(c, '情趣商店', w * .5, h * .72, h * .38, '#f0e8f0', '700', kai, w * .6);
      for (let i = 0; i < 12; i++) { c.fillStyle = '#e8508a'; c.beginPath(); c.arc(w * (.04 + i * .084), h * (i % 2 ? .1 : .9), h * .03, 0, Math.PI * 2); c.fill(); }
    }, (c, w, h) => {
      c.fillStyle = '#f2e8c8'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c8302a'; c.lineWidth = h * .06; c.strokeRect(0, 0, w, h);
      text(c, '南洋', w * .12, h * .52, h * .62, '#c8302a', '800', kai);
      text(c, 'NANYANG HARDWARE PTE LTD', w * .6, h * .52, h * .4, '#1d3f8f', '800', sans, w * .74);
    }, (c, w, h) => {
      c.fillStyle = '#d8402e'; c.fillRect(0, 0, w, h);
      text(c, 'STRAITS LAUNDRY', w * .5, h * .55, h * .58, '#3a7ad8', '800', sans, w * .94);
    }],
  },
};

/** Lorong 19 between Geylang Road and Sims Avenue, and the Geylang Road row back to Lorong 17; named only where a
 * listing and a photographed sign agree. */
export function buildLorong19(world: World, id: string, poly: Point[]) {
  const place = [...lorong19, ...geylangRow19].find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  buildLaneHouse(world, place, poly, draws);
  return true;
}
