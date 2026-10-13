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
  // The cream vertical board with its emblem, and the framed board over the door, its Tibetan line drawn plain.
  'nyingma-kathok': {
    boards: [(c, w, h) => {
      c.fillStyle = '#efe4c8'; c.fillRect(0, 0, w, h); c.strokeStyle = '#b89a5a'; c.lineWidth = w * .04; c.strokeRect(w * .04, w * .04, w - w * .08, h - w * .08);
      c.fillStyle = '#c89a3a'; c.beginPath(); c.arc(w * .5, h * .11, w * .2, 0, Math.PI * 2); c.fill();
      [...'宁玛噶陀'].forEach((ch, i) => text(c, ch, w * .5, h * (.27 + i * .15), w * .58, '#8a2a1e', '700', kai));
      text(c, 'NYINGMA', w * .5, h * .88, w * .2, '#5a3a1e', '700', 'Georgia, "Times New Roman", serif', w * .86);
      text(c, 'KATHOK', w * .5, h * .93, w * .2, '#5a3a1e', '700', 'Georgia, "Times New Roman", serif', w * .86);
    }, (c, w, h) => {
      c.fillStyle = '#5a4630'; c.fillRect(0, 0, w, h); c.fillStyle = '#efe4c8'; c.fillRect(h * .08, h * .08, w - h * .16, h - h * .16);
      c.fillStyle = '#c89a3a'; c.fillRect(w * .1, h * .2, w * .8, h * .1);
      text(c, '宁玛噶陀佛学会', w * .55, h * .5, h * .22, '#5a3a1e', '700', kai, w * .6);
      text(c, 'NYINGMA KATHOK BUDDHIST CENTRE', w * .55, h * .74, h * .13, '#5a3a1e', '700', sans, w * .7);
    }],
  },
  // The red banner naming the temple's deity, and a red lantern lettered with the temple's name.
  'bei-chen-gong': {
    boards: [(c, w, h) => {
      c.fillStyle = '#c8302a'; c.fillRect(0, 0, w, h);
      [...'玄天上帝'].forEach((ch, i) => text(c, ch, w * (.2 + i * .2), h * .52, h * .62, '#f0c64a', '700', kai));
    }, (c, w, h) => {
      c.fillStyle = '#d42a22'; c.beginPath(); c.ellipse(w / 2, h / 2, w * .48, h * .46, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#e8b830'; c.fillRect(w * .3, 0, w * .4, h * .06); c.fillRect(w * .3, h * .94, w * .4, h * .06);
      [...'北辰宫'].forEach((ch, i) => text(c, ch, w * .5, h * (.27 + i * .23), w * .36, '#f0c64a', '700', kai));
    }],
  },
  // The red-framed corner board: 陳生成 over the English name, with SINCE 1946 in a red box.
  'tan-ser-seng': {
    boards: [(c, w, h) => {
      c.fillStyle = '#b8242a'; c.fillRect(0, 0, w, h); c.fillStyle = '#f6e6e2'; c.fillRect(w * .06, h * .06, w * .88, h * .88);
      text(c, '陳生成', w * .5, h * .38, h * .4, '#c8242a', '800', kai, w * .8);
      text(c, 'TAN SER SENG HERBAL SOUP', w * .5, h * .68, h * .09, '#c8242a', '800', sans, w * .82);
      c.fillStyle = '#c8242a'; c.fillRect(w * .32, h * .76, w * .36, h * .1);
      text(c, 'SINCE 1946', w * .5, h * .81, h * .07, '#f6e6e2', '700', sans, w * .32);
    }],
  },
  // The gateway's board: the organisation's mark and HCSA COMMUNITY SERVICES in dark capitals on cream.
  'hcsa-community-services@2': {
    blades: [(c, w, h) => {
      c.fillStyle = '#ece4d0'; c.fillRect(0, 0, w, h); c.strokeStyle = '#3a3c3e'; c.lineWidth = h * .06; c.strokeRect(0, 0, w, h);
      text(c, 'HCSA', w * .1, h * .42, h * .42, '#c8302a', '900', sans, w * .14);
      text(c, 'COMMUNITY SERVICES', w * .1, h * .76, h * .12, '#3a3c3e', '700', sans, w * .15);
      text(c, 'HCSA COMMUNITY SERVICES', w * .6, h * .55, h * .5, '#3a2c2a', '800', sans, w * .74);
    }],
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
