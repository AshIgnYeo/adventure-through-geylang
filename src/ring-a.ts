import type { World, Point } from './world';
import { ringA, ringAFrame, ringALayout, ringAReviews, ringASides } from './ring-a-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const canvasFor = (w: number, h: number, base: number, fn: Draw) => {
  const canvas = document.createElement('canvas'); canvas.width = base; canvas.height = Math.max(16, Math.round(base * h / w));
  fn(canvas.getContext('2d')!, canvas.width, canvas.height); return canvas;
};
const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
// Named places only: original lettering after the photographed board.
// Neon-style strokes: a soft glow under a bright core.
const neon = (c: CanvasRenderingContext2D, colour: string, width: number, draw: () => void) => {
  c.save(); c.strokeStyle = colour; c.fillStyle = colour; c.shadowColor = colour; c.shadowBlur = width * 3; c.lineWidth = width; draw(); c.restore();
};
const bamboo = (c: CanvasRenderingContext2D, x: number, h: number, colour: string) => neon(c, colour, h * .025, () => {
  for (const [dx, top] of [[0, .12], [h * .12, .2], [h * .24, .08]] as const) {
    c.beginPath(); c.moveTo(x + dx, h * .9); c.lineTo(x + dx, h * top); c.stroke();
    for (let y = h * (top + .15); y < h * .85; y += h * .22) { c.beginPath(); c.moveTo(x + dx, y); c.quadraticCurveTo(x + dx + h * .1, y - h * .05, x + dx + h * .16, y - h * .14); c.stroke(); }
  }
});
// Sheng Siong's mark: a ring holding 昇, as on the window banners and valances.
const shengSiongMark = (c: CanvasRenderingContext2D, x: number, y: number, r: number, colour: string) => {
  c.save(); c.strokeStyle = colour; c.lineWidth = r * .16; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.stroke(); c.restore();
  text(c, '昇', x, y + r * .05, r * 1.25, colour, '700', '"PingFang SC", "Heiti SC", sans-serif');
};
const valance = (labels: string[]): Draw => (c, w, h) => {
  c.fillStyle = '#3b2a24'; c.fillRect(0, 0, w, h);
  labels.forEach((t, i) => {
    const x = w * (i + .5) / labels.length;
    if (t === 'mark') shengSiongMark(c, x, h * .5, h * .3, '#f4f1ea');
    else text(c, t, x, h * .54, h * .5, '#f4f1ea', '600', '"Helvetica Neue", Arial, "PingFang SC", sans-serif', w / labels.length * .95);
  });
};
const draws: Record<string, { boards?: Draw[] }> = {
  'sheng-siong-301': { boards: [(c, w, h) => {
    c.fillStyle = '#d6ece2'; c.fillRect(0, 0, w, h); c.fillStyle = '#3f9a5a'; c.fillRect(0, 0, w * .045, h); c.fillRect(w * .955, 0, w * .045, h);
    shengSiongMark(c, w * .3, h * .5, h * .3, '#1f6f5c');
    text(c, 'SHENG SIONG', w * .56, h * .54, h * .5, '#1f6f5c', '700', '"Helvetica Neue", Arial, sans-serif', w * .42);
  }, valance(['24 Hours', 'mark', 'SHENG SIONG', 'mark', '昇菘超市', '24 Hours'])] },
  'bamboo-lounge': { boards: [(c, w, h) => {
    c.fillStyle = '#16191b'; c.fillRect(0, 0, w, h); c.strokeStyle = '#8a7a4a'; c.lineWidth = h * .025; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
    bamboo(c, w * .05, h, '#cfe9d8'); bamboo(c, w * .9, h, '#cfe9d8');
    neon(c, '#d8f0e2', h * .02, () => { c.font = `italic 600 ${Math.round(h * .42)}px "Snell Roundhand", "Brush Script MT", cursive`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('Bamboo', w * .37, h * .42, w * .4); });
    text(c, 'est.1976', w * .62, h * .28, h * .14, '#e0574a', '600', 'Georgia, serif');
    text(c, 'LOUNGE', w * .58, h * .7, h * .22, '#e8f2ec', '500', '"Helvetica Neue", Arial, sans-serif', w * .25);
    text(c, '竹屋', w * .78, h * .5, h * .4, '#e0574a', '500', '"Kaiti SC", "STKaiti", serif');
  }] },
  'bengal-kitchen': { boards: [(c, w, h) => {
    c.fillStyle = '#3f9b3a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#f2f0e6'; c.lineWidth = h * .04; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
    c.lineJoin = 'round'; c.lineWidth = h * .07; c.strokeStyle = '#7a1e1a'; c.font = `900 ${Math.round(h * .42)}px Georgia, "Times New Roman", serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.strokeText('BENGAL KITCHEN', w * .56, h * .3, w * .8); text(c, 'BENGAL KITCHEN', w * .56, h * .3, h * .42, '#f5d22e', '900', 'Georgia, "Times New Roman", serif', w * .8);
    text(c, 'বেঙ্গল কিচেন', w * .56, h * .66, h * .3, '#ffffff', '700', '"Bangla MN", "Kohinoor Bangla", sans-serif', w * .6);
    text(c, '2 Lorong 15 Geylang  Singapore 388596', w * .56, h * .89, h * .1, '#ffffff', '600', '"Helvetica Neue", Arial, sans-serif', w * .6);
  }] },
};

// Signs on a corner block's side faces, keyed by place and source edge.
const sideDraws: Record<string, { boards?: Draw[]; blades?: Draw[] }> = {
  'sheng-siong-301@3': {
    boards: [valance(['24 Hours', 'mark', 'SHENG SIONG', 'mark', '昇菘超市', '24 Hours', 'mark', 'SHENG SIONG', 'mark', '昇菘超市', '24 Hours'])],
    // Anytime Fitness: the running figure over ANYTIME FITNESS, reading upwards on a black blade.
    blades: [(c, w, h) => {
      c.fillStyle = '#141414'; c.fillRect(0, 0, w, h);
      c.save(); c.strokeStyle = '#7b4fd0'; c.lineWidth = w * .07; c.lineCap = 'round';
      const x = w / 2, y = h * .1, r = w * .2;
      for (const [a, b] of [[[-.9, .6], [0, -.4]], [[0, -.4], [.9, .6]], [[-.5, .1], [.5, .1]]]) { c.beginPath(); c.moveTo(x + a[0] * r, y + a[1] * r); c.lineTo(x + b[0] * r, y + b[1] * r); c.stroke(); }
      c.restore();
      c.save(); c.translate(w * .5, h * .57); c.rotate(-Math.PI / 2);
      text(c, 'ANYTIME FITNESS', 0, 0, w * .26, '#f4f4f4', '700', '"Helvetica Neue", Arial, sans-serif', h * .7);
      c.restore();
    }],
  },
  'sheng-siong-301@2': { boards: [(c, w, h) => {
    c.fillStyle = '#d6ece2'; c.fillRect(0, 0, w, h);
    shengSiongMark(c, w * .14, h * .5, h * .32, '#1f6f5c');
    text(c, '昇菘超市', w * .6, h * .54, h * .7, '#1f6f5c', '700', '"PingFang SC", "Heiti SC", sans-serif', w * .7);
  }] },
};

/** East of Lorong 15 and Sims Avenue Nos. 126-130, in the widened ring; named only where a listing and sign agree. */
export function buildRingA(world: World, id: string, poly: Point[]) {
  const place = ringA.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = ringAFrame(poly, place);
  const { textured } = buildSimpleHouse(world, place.name, frame, poly, place, ringALayout(place, frame.width) as any, draws[place.id] ?? {});
  // A corner block's other street faces: windows, bands and blank signs on their own source edges.
  for (const side of ringASides(place, poly) as any[]) {
    for (const b of side.boxes) {
      const p = side.frame.point(b.u, b.out) as Point;
      world.box(`${place.name} ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, side.frame.angle);
    }
    // Drawn signs on a side face: flat boards, and double-faced blades square to the wall.
    const sd = sideDraws[`${place.id}@${side.edge}`] ?? {}, pt = (u: number, out: number) => side.frame.point(u, out) as Point;
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
  for (const r of ringAReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
