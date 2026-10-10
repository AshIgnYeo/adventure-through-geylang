import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { geylangRow, geylangRowFrame, geylangRowLayout, geylangRowReviews } from './geylang-row-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'sans-serif', weight = '700', maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, maxWidth);
};
const vertical = (bg: string, fg: string, chars: string, foot = '', edge = bg): Draw => (c, w, h) => {
  c.fillStyle = edge; c.fillRect(0, 0, w, h); c.fillStyle = bg; c.fillRect(10, 10, w - 20, h - 20);
  [...chars].forEach((ch, i) => text(c, ch, w / 2, h * (.16 + i * .24), w * .6, fg, '"Kaiti SC", "STKaiti", serif', '900'));
  if (foot) text(c, foot, w / 2, h * .9, w * .22, fg);
};

const draws: Record<string, { boards?: Draw[]; blades?: Draw[]; awning?: string; valance?: Draw }> = {
  'ting-yu-xuan': {
    boards: [(c, w, h) => {
      c.fillStyle = '#efe6cf'; c.fillRect(0, 0, w, h);
      for (const x of [0, w * .86]) { c.fillStyle = '#c99f86'; c.fillRect(x, 0, w * .14, h); }
      c.strokeStyle = '#a58a5a'; c.lineWidth = 3; c.beginPath(); c.moveTo(w * .18, h * .5); c.bezierCurveTo(w * .3, h * .1, w * .38, h * .9, w * .5, h * .5); c.bezierCurveTo(w * .62, h * .1, w * .7, h * .9, w * .82, h * .5); c.stroke();
      text(c, '听 雨 轩', w / 2, h * .42, h * .5, '#5b3a22', '"Kaiti SC", "STKaiti", serif', '900');
      text(c, 'Ting Yu Xuan', w / 2, h * .82, h * .15, '#5b3a22', 'Georgia, serif', 'italic 400');
      text(c, '255', w * .83, h * .14, h * .12, '#3a3a3a');
    }],
    blades: [vertical('#f3f1ea', '#3b2f26', '听雨轩', '', '#c9c4b8'), (c, w, h) => { c.fillStyle = '#2f6f78'; c.fillRect(0, 0, w, h); }],
  },
  'ke-lai-shun': {
    boards: [(c, w, h) => {
      c.fillStyle = '#d42a2b'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#ffffff'; c.lineWidth = h * .05; c.beginPath(); c.arc(h * .55, h * .5, h * .38, 0, Math.PI * 2); c.stroke();
      c.fillStyle = '#ffffff'; c.beginPath(); c.ellipse(h * .55, h * .55, h * .2, h * .1, 0, 0, Math.PI * 2); c.fill();
      text(c, '客 来 顺', w * .52, h * .38, h * .5, '#ffffff', '"Kaiti SC", "STKaiti", serif', '900');
      text(c, 'KE LAI SHUN RESTAURANT', w * .52, h * .8, h * .17, '#ffffff');
      text(c, '川東北菜', w * .91, h * .45, h * .2, '#ffffff', 'serif', '700', w * .14);
    }],
    blades: [vertical('#d42a2b', '#ffffff', '客来顺', '259', '#f2f2ee')],
  },
  instyle: {
    boards: [(c, w, h) => {
      c.fillStyle = '#5d6469'; c.fillRect(0, 0, w, h); c.strokeStyle = '#8c9296'; c.lineWidth = h * .04; c.strokeRect(h * .04, h * .04, w - h * .08, h - h * .08);
      text(c, 'INSTYLE', w / 2, h * .42, h * .44, '#e9ebe8', '"Trajan Pro", "Times New Roman", serif', '500', w * .8);
      text(c, 'HAIR SALON', w * .7, h * .78, h * .17, '#e9ebe8', '"Times New Roman", serif', '500');
    }],
  },
  'mobile-time': {
    boards: [(c, w, h) => {
      c.fillStyle = '#1e2021'; c.fillRect(0, 0, w, h);
      text(c, 'SAMSUNG', w * .3, h * .5, h * .38, '#ffffff', '"Helvetica Neue", Arial, sans-serif', '800', w * .45);
      text(c, 'Mobile Time', w * .78, h * .5, h * .26, '#ffffff', '"Helvetica Neue", Arial, sans-serif', '500', w * .36);
      text(c, '263', w * .92, h * .85, h * .1, '#d0d0d0');
    }],
    awning: '#5b2f63',
    valance: (c, w, h) => { c.fillStyle = '#5b2f63'; c.fillRect(0, 0, w, h); for (let i = 0; i < 6; i++) text(c, 'SIMBA', w * (i + .5) / 6, h * .5, h * .45, '#ffffff', 'sans-serif', '800', w / 7); },
  },
  'shi-hao': {
    boards: [(c, w, h) => {
      c.fillStyle = '#3b3c3d'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#f4f4f0'; c.lineWidth = h * .05; c.beginPath(); c.arc(h * .6, h * .45, h * .3, 0, Math.PI * 2); c.stroke();
      text(c, '食', h * .6, h * .47, h * .34, '#f4f4f0', 'serif', '900');
      text(c, 'SHI HAO', h * .6, h * .88, h * .1, '#f4f4f0');
      text(c, '食好火锅烧烤', w * .45, h * .5, h * .46, '#f4f4f0', '"Kaiti SC", "STKaiti", serif', '900', w * .52);
      text(c, 'SHI HAO', w * .82, h * .36, h * .2, '#f4f4f0', '"Helvetica Neue", sans-serif', '700');
      text(c, 'Hot Pot BBQ', w * .82, h * .66, h * .2, '#f4f4f0', '"Helvetica Neue", sans-serif', '700');
    }],
    blades: [
      (c, w, h) => { c.fillStyle = '#151515'; c.fillRect(0, 0, w, h); text(c, 'CHOK', w / 2, h * .38, w * .32, '#f2f2ee'); text(c, 'DEE', w / 2, h * .52, w * .32, '#f2f2ee'); },
      (c, w, h) => {
        c.fillStyle = '#151515'; c.fillRect(0, 0, w, h); c.fillStyle = '#f2f2ee'; c.beginPath(); c.arc(w / 2, h * .08, w * .3, 0, Math.PI * 2); c.fill();
        text(c, 'RISING', w / 2, h * .2, w * .22, '#f2f2ee'); text(c, 'SUN', w / 2, h * .27, w * .22, '#f2f2ee');
        [...'TATTOOS'].forEach((ch, i) => text(c, ch, w / 2, h * (.37 + i * .085), w * .3, '#f2f2ee'));
      },
    ],
  },
};

/** June 2024 exteriors on the re-spaced Geylang Road row, Nos. 255–267. */
export function buildGeylangRow(world: World, id: string, poly: Point[]) {
  const place = geylangRow.find(p => p.buildingIds.includes(id));
  if (!place) return false;
  const frame = geylangRowFrame(poly), layout = geylangRowLayout(place, frame.width);
  const { textured } = buildSimpleHouse(world, place.name, frame, poly, place, layout, draws[place.id]);
  if (place.id === 'shi-hao') {
    // Lorong 13 face, from the chamfer to the rear: the same board and four arched windows, from oblique views.
    const side = frontageFrame(poly, 2), sp = (u: number, out = 0) => side.point(u, out) as Point;
    const L = side.width, board = document.createElement('canvas'); board.width = 1024; board.height = Math.round(1024 * 1.35 / (L - 1.4));
    draws['shi-hao'].boards![0](board.getContext('2d')!, board.width, board.height);
    world.panel(sp(.7, .03), sp(L - .7, .03), 2.39, 3.74, textured(board, .1));
    for (let k = 0; k < 4; k++) {
      const u = L * (k + .5) / 4, p = sp(u, .03);
      world.box('Shi Hao side window', p[0], 4.93, p[1], .94, 1.57, .05, world.mat('#3b4448'), undefined, side.angle);
      const q = sp(u, .06); world.box('Shi Hao side arch', q[0], 5.81, q[1], 1.1, .2, .08, world.mat('#d9cdb8'), undefined, side.angle);
    }
    for (const [b, t] of [[7.05, 7.25], [3.75, 3.9]]) { const p = sp(L / 2, .15); world.box('Shi Hao side band', p[0], (b + t) / 2, p[1], L, t - b, .3, world.mat('#d9cdb8'), undefined, side.angle); }
    const cm = world.mat('#3b3c3d'); cm.cull = pc.CULLFACE_NONE; cm.update();
    world.panel(poly[1], poly[2], 2.39, 3.74, cm);
  }
  for (const r of geylangRowReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
