import type { World, Point } from './world';
import { lorong17, lorong17Frame, lorong17Layout, lorong17Reviews, lorong17Sides } from './lorong-17-layout.mjs';
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
  for (const r of lorong17Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
