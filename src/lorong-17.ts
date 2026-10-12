import type { World, Point } from './world';
import * as pc from 'playcanvas';
import { lorong17, lorong17Frame, lorong17Layout, lorong17Reviews, lorong17Sides, lorong17Upper } from './lorong-17-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const canvasFor = (w: number, h: number, base: number, fn: Draw) => {
  const canvas = document.createElement('canvas'); canvas.width = base; canvas.height = Math.max(16, Math.round(base * h / w));
  fn(canvas.getContext('2d')!, canvas.width, canvas.height); return canvas;
};
const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
const sans = '"Helvetica Neue", Arial, sans-serif', hei = '"PingFang SC", "Heiti SC", sans-serif';

// Named places only: original lettering after the photographed boards.
// Feng Shang's mark: a swirl of white strokes, like a flame or a lock of hair.
const fengShangMark = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c.save(); c.strokeStyle = '#f2f2f2'; c.lineWidth = r * .14; c.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const a = -1.1 + i * .45; c.beginPath(); c.moveTo(x + Math.cos(a) * r * .2, y + Math.sin(a) * r * .2); c.quadraticCurveTo(x + Math.cos(a + .6) * r, y + Math.sin(a + .6) * r, x + Math.cos(a + 1.2) * r * .9, y + Math.sin(a + 1.2) * r * .9); c.stroke(); }
  c.restore();
};
const fengShangBoard: Draw = (c, w, h) => {
  c.fillStyle = '#16181a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e8e8e8'; c.lineWidth = h * .03; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
  fengShangMark(c, w * .14, h * .42, h * .3);
  text(c, '峰尚', w * .37, h * .4, h * .42, '#f2f2f2', '600', '"Kaiti SC", "STKaiti", serif');
  text(c, '造型', w * .66, h * .4, h * .34, '#f2f2f2', '600', '"Kaiti SC", "STKaiti", serif');
  text(c, 'HAIR SALON', w * .66, h * .78, h * .16, '#f2f2f2', '700', 'Georgia, "Times New Roman", serif', w * .4);
};
const draws: Record<string, { boards?: Draw[]; blades?: Draw[] }> = {
  'feng-shang': { boards: [fengShangBoard, (c, w, h) => {
    c.fillStyle = '#1a1714'; c.fillRect(0, 0, w, h);
    text(c, '峰尚', w * .1, h * .52, h * .7, '#e07a2a', '700', hei);
    text(c, '造型', w * .2, h * .56, h * .45, '#e8d9a8', '600', hei);
    text(c, 'Feng Shang', w * .52, h * .52, h * .72, '#d8b24a', 'italic 700', 'Georgia, "Times New Roman", serif', w * .38);
    text(c, 'Hair Salon', w * .84, h * .52, h * .5, '#e8e2d0', 'italic 500', 'Georgia, "Times New Roman", serif', w * .26);
  }] },
  'feng-shang@2': { boards: [fengShangBoard] },
  'yang-clan': { boards: [(c, w, h) => {
    c.fillStyle = '#b3261e'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e9d9a0'; c.lineWidth = h * .04; c.strokeRect(h * .04, h * .04, w - h * .08, h - h * .08);
    c.fillStyle = '#f3efe3'; c.beginPath(); c.arc(h * .55, h * .5, h * .34, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#2b3a6b'; c.lineWidth = h * .05; c.beginPath(); c.arc(h * .55, h * .5, h * .24, 0, Math.PI * 2); c.stroke();
    text(c, '楊氏總會', w * .55, h * .33, h * .42, '#f6f1e4', '700', '"Kaiti SC", "STKaiti", serif', w * .7);
    text(c, 'YANG CLAN GENERAL ASSOCIATION', w * .55, h * .76, h * .24, '#f6f1e4', '700', sans, w * .8);
  }] },
  'gyaltsap-tashi-ling': { boards: [(c, w, h) => {
    c.fillStyle = '#3d2a1c'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9a24a'; c.lineWidth = h * .05; c.strokeRect(h * .04, h * .04, w - h * .08, h - h * .08);
    // The orange disc with its blue vajra mark, then gold lotuses either side of the lettering.
    c.fillStyle = '#e07a34'; c.beginPath(); c.arc(h * .62, h * .5, h * .36, 0, Math.PI * 2); c.fill();
    c.fillStyle = '#2c4f9a'; c.fillRect(h * .55, h * .24, h * .14, h * .52);
    for (const x of [w * .14, w * .93]) for (let k = 0; k < 6; k++) { c.fillStyle = '#d6b25a'; c.beginPath(); c.ellipse(x + Math.cos(k * 1.05) * h * .12, h * .5 + Math.sin(k * 1.05) * h * .12, h * .1, h * .05, k * 1.05, 0, Math.PI * 2); c.fill(); }
    text(c, 'Gyaltsap Tashi Ling Buddhist Society', w * .54, h * .5, h * .5, '#d9b45a', '700', 'Georgia, "Times New Roman", serif', w * .72);
  }] },
  'bright-star-hotel': { boards: [(c, w, h) => {
    c.fillStyle = '#d2463c'; c.fillRect(0, 0, w, h);
    text(c, 'BRIGHT STAR HOTEL', w * .5, h * .1, h * .1, '#f6efe0', '700', sans, w * .6);
    text(c, 'SPECIAL PROMOTION', w * .5, h * .25, h * .16, '#f3e6b8', '900', sans, w * .9);
    text(c, '特别促销', w * .5, h * .45, h * .18, '#f6efe0', '700', hei, w * .5);
    for (const [x, t, unit] of [[.27, '$80', 'nett/night'], [.67, '$20', 'nett/hour']] as const) {
      c.fillStyle = '#f2d35a'; c.beginPath(); c.arc(w * x - w * .04, h * .72, h * .14, 0, Math.PI * 2); c.fill();
      text(c, t, w * x - w * .04, h * .72, h * .2, '#1c1c1c', '900', sans);
      text(c, unit, w * x + w * .12, h * .74, h * .09, '#f6efe0', '700', sans);
    }
    text(c, 'Tel: 6742 7666', w * .5, h * .93, h * .07, '#f6efe0', '600', sans);
  }] },
  // Dark slate lettering on white: the parapet reads right to left, the ground-floor board left to right.
  'true-jesus-mission': {
    boards: [(c, w, h) => {
      c.fillStyle = '#f4f4f1'; c.fillRect(0, 0, w, h);
      text(c, '會總會教穌耶眞', w * .5, h * .34, h * .44, '#2f4650', '700', '"Kaiti SC", "STKaiti", serif', w * .9);
      text(c, 'GENERAL BOARD OF TRUE JESUS MISSION', w * .5, h * .77, h * .2, '#2f4650', '700', sans, w * .9);
    }, (c, w, h) => {
      c.fillStyle = '#f4f4f1'; c.fillRect(0, 0, w, h);
      text(c, '眞耶穌教會總會', w * .5, h * .32, h * .42, '#2a2a2a', '700', '"Kaiti SC", "STKaiti", serif', w * .8);
      text(c, 'GENERAL BOARD OF TRUE JESUS MISSION', w * .5, h * .76, h * .24, '#2a2a2a', '700', sans, w * .9);
    }],
    blades: [(c, w, h) => {
      c.fillStyle = '#f4f4f1'; c.fillRect(0, 0, w, h); c.strokeStyle = '#2f4650'; c.lineWidth = w * .03; c.strokeRect(w * .04, w * .04, w - w * .08, h - w * .08);
      [...'眞耶穌教會總會'].forEach((ch, i) => text(c, ch, w * .5, h * (.08 + i * .1), w * .5, '#2f4650', '700', '"Kaiti SC", "STKaiti", serif'));
      text(c, 'TRUE JESUS', w * .5, h * .83, w * .14, '#2f4650', '700', sans, w * .85);
      text(c, 'MISSION', w * .5, h * .89, w * .14, '#2f4650', '700', sans, w * .85);
    }],
  },
};

/** Lorong 17 between Geylang Road and Sims Avenue; named only where a listing and a photographed sign agree. */
export function buildLorong17(world: World, id: string, poly: Point[]) {
  const place = lorong17.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong17Frame(poly, place);
  const { textured } = buildSimpleHouse(world, place.name, frame, poly, place, lorong17Layout(place, frame.width) as any, draws[place.id] ?? {});
  for (const side of lorong17Sides(place, poly) as any[]) {
    for (const b of side.boxes) {
      const p = side.frame.point(b.u, b.out) as Point;
      world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, side.frame.angle);
    }
    const sd = draws[`${place.id}@${side.edge}`] ?? {}, pt = (u: number, out: number) => side.frame.point(u, out) as Point;
    side.boards.forEach((s: any, i: number) => {
      const fn = sd.boards?.[i]; if (!fn) return;
      world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, textured(canvasFor(s.right - s.left, s.top - s.bottom, 1024, fn), .1));
    });
    side.blades.forEach((bl: any, i: number) => {
      const fn = sd.blades?.[i]; if (!fn) return;
      const m = textured(canvasFor(bl.out[1] - bl.out[0], bl.h[1] - bl.h[0], 256, fn), .2);
      world.panel(pt(bl.u - .03, bl.out[0]), pt(bl.u - .03, bl.out[1]), bl.h[0], bl.h[1], m);
      world.panel(pt(bl.u + .03, bl.out[1]), pt(bl.u + .03, bl.out[0]), bl.h[0], bl.h[1], m);
    });
  }
  // Upper volumes: walls round their outline, a flat roof, and their fittings on the front.
  for (const up of lorong17Upper(place, frame) as any[]) {
    const wall = world.mat(up.colour); wall.cull = pc.CULLFACE_NONE; wall.update();
    const pts = up.points as Point[];
    for (let i = 0; i < pts.length; i++) world.panel(pts[i], pts[(i + 1) % pts.length], up.from, up.to, wall);
    const roof = world.mat(up.roof); roof.cull = pc.CULLFACE_NONE; roof.update();
    const indices: number[] = []; for (let k = 1; k < pts.length - 1; k++) indices.push(0, k, k + 1);
    world.mesh(`${place.name} upper roof`, pts.flatMap(p => [p[0], up.to, p[1]]), pts.flatMap(() => [0, 0]), indices, roof);
    for (const b of up.boxes) {
      const p = frame.point(b.u, b.out) as Point;
      world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, frame.angle);
    }
  }
  for (const r of lorong17Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
