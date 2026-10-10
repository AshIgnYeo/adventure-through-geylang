import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { lorong13, lorong13Frame, lorong13Layout, lorong13Reviews } from './lorong-13-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';
import { frontageFrame } from './gable-roof-layout.mjs';
import { buildRow13House } from './row13';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = 'sans-serif', weight = '700', maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, maxWidth);
};
const brush = '"Kaiti SC", "STKaiti", "Songti SC", serif';
const thirteenLogo = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c.fillStyle = '#f4f1ea'; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
  c.strokeStyle = '#c8404a'; c.lineWidth = r * .08; c.beginPath(); c.arc(x, y, r * .78, 0, Math.PI * 2); c.stroke();
  text(c, '烤', x - r * .2, y - r * .18, r * .5, '#2d2b2b', brush, '900'); text(c, '吧', x + r * .2, y + r * .25, r * .5, '#2d2b2b', brush, '900');
  c.strokeStyle = '#2d2b2b'; c.lineWidth = r * .05; c.beginPath(); c.moveTo(x - r * .5, y - r * .55); c.lineTo(x + r * .45, y + r * .6); c.stroke();
};

const draws: Record<string, { boards?: Draw[]; blades?: Draw[]; awning?: string; valance?: Draw }> = {
  'thirteen-bbq': {
    boards: [(c, w, h) => {
      c.fillStyle = '#c8404a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e8d7d2'; c.lineWidth = h * .03; c.strokeRect(h * .03, h * .03, w - h * .06, h - h * .06);
      text(c, '十 三 烤 吧', w * .35, h * .42, h * .58, '#f6f1ec', brush, '900', w * .6);
      text(c, '—— THIRTEEN BBQ & BAR', w * .4, h * .84, h * .13, '#f6f1ec', '"Helvetica Neue", Arial, sans-serif', '600');
      c.fillStyle = '#f6f1ec'; c.fillRect(w * .73, h * .15, w * .004, h * .7);
      thirteenLogo(c, w * .82, h * .5, h * .38);
      [...'正宗烤串'].forEach((ch, i) => text(c, ch, w * .95, h * (.17 + i * .22), h * .17, '#f6f1ec', brush, '900'));
    }],
    blades: [(c, w, h) => {
      c.fillStyle = '#26315a'; c.fillRect(0, 0, w, h); c.fillStyle = '#c8404a'; c.fillRect(w * .1, h * .02, w * .8, h * .96);
      [...'十三烤吧'].forEach((ch, i) => text(c, ch, w / 2, h * (.1 + i * .14), w * .62, '#f6f1ec', brush, '900'));
      thirteenLogo(c, w / 2, h * .7, w * .3);
      text(c, 'THIRTEEN', w / 2, h * .86, w * .17, '#f6f1ec'); text(c, 'BBQ & BAR', w / 2, h * .92, w * .13, '#f6f1ec');
    }],
    awning: '#3a3b40',
    valance: (c, w, h) => { c.fillStyle = '#3a3b40'; c.fillRect(0, 0, w, h); text(c, 'B I S T R O   &   B A R', w * .5, h * .5, h * .42, '#f2f2ee', '"Helvetica Neue", Arial, sans-serif', '500'); },
  },
  'teck-hoe': {
    boards: [(c, w, h) => {
      c.clearRect(0, 0, w, h);
      text(c, 'TECK HOE AIRCONDITIONING PARTS PTE LTD', w / 2, h * .32, h * .42, '#3a3c3c', '"Arial Narrow", "Helvetica Neue", Arial, sans-serif', '700', w * .98);
      text(c, '11', w * .47, h * .82, h * .26, '#3a3c3c', 'Arial, sans-serif', '700');
    }],
  },
  buildersmart: {
    boards: [(c, w, h) => {
      c.fillStyle = '#e4dcc4'; c.fillRect(0, 0, w, h); c.strokeStyle = '#7c6f4f'; c.lineWidth = h * .06; c.strokeRect(0, 0, w, h);
      text(c, 'BUILDERSmart', w / 2, h * .54, h * .62, '#2f6b45', '"Arial Black", "Helvetica Neue", sans-serif', '900', w * .92);
    }],
    awning: '#2f7262',
    valance: (c, w, h) => {
      c.fillStyle = '#2f7262'; c.fillRect(0, 0, w, h);
      text(c, '魯班行', w * .1, h * .5, h * .62, '#f1d27a', brush, '900'); text(c, 'BUILDERSmart', w * .2, h * .52, h * .55, '#f1d27a', '"Arial Black", sans-serif', '900');
      text(c, 'www.buildersmart.com.sg', w * .72, h * .52, h * .55, '#f4f4ef', '"Helvetica Neue", Arial, sans-serif', '700');
    },
  },
};

const sideValance: Draw = (c, w, h) => { c.fillStyle = '#2f7262'; c.fillRect(0, 0, w, h); text(c, 'www.buildersmart.com.sg', w / 2, h * .52, h * .55, '#f4f4ef', '"Helvetica Neue", Arial, sans-serif', '700'); };

// The tool-icon panel: nine black roundels with simple tool glyphs on white.
const iconPanel = (c: CanvasRenderingContext2D, w: number, h: number) => {
  c.fillStyle = '#f1f1ee'; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 9; i++) {
    const x = w * (.2 + (i % 3) * .3), y = h * (.18 + Math.floor(i / 3) * .31), r = Math.min(w, h) * .12;
    c.fillStyle = '#1d1d1d'; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#f1f1ee'; c.lineWidth = r * .18; c.beginPath(); c.moveTo(x - r * .5, y + r * .5); c.lineTo(x + r * .5, y - r * .5); c.stroke();
  }
};

/** Lorong 13 exteriors from the street module: named places and, later, unnamed ones. */
export function buildLorong13(world: World, id: string, poly: Point[]) {
  const place = lorong13.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong13Frame(poly, place), layout = lorong13Layout(place, frame.width) as any;
  if (place.row) {
    // A house of the conserved row at Nos. 3-9, on the shared row elevation.
    const { pt } = buildRow13House(world, place.name, frame, layout);
    const aw = place.awning;
    if (aw) {
      const m = world.mat(aw.colour); m.cull = pc.CULLFACE_NONE; m.update();
      const corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)], ys = [aw.wall, aw.wall, aw.front, aw.front];
      world.mesh(`${place.name} awning`, corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], m);
      world.panel(pt(aw.from, aw.depth), pt(aw.to, aw.depth), aw.front - .22, aw.front, m);
    }
    for (const r of lorong13Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
    return true;
  }
  const { pt, textured } = buildSimpleHouse(world, place.name, frame, poly, place, layout, draws[place.id] ?? {});
  if (place.id === 'buildersmart') {
    const panel = place.blocks.find((b: any) => b.name === 'tool-icon panel'), canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = Math.round(256 * (panel.h[1] - panel.h[0]) / (panel.u[1] - panel.u[0])); iconPanel(canvas.getContext('2d')!, canvas.width, canvas.height);
    world.panel(pt(panel.u[0], panel.out + .035), pt(panel.u[1], panel.out + .035), panel.h[0], panel.h[1], textured(canvas));
  }
  if (place.side) {
    // A second street face on a corner: an opening panel and its own awning, in that face's frame.
    const side = frontageFrame(poly, place.side.edge), sp = (u: number, out = 0) => side.point(u, out) as Point;
    const { opening: o, awning: aw } = place.side;
    const dark = world.mat('#2f2e2b'); world.panel(sp(o.u[0], .02), sp(o.u[1], .02), o.h[0], o.h[1], dark);
    const m = world.mat(draws[place.id]?.awning ?? '#555'); m.cull = pc.CULLFACE_NONE; m.update();
    const corners = [sp(aw.from, 0), sp(aw.to, 0), sp(aw.to, aw.depth), sp(aw.from, aw.depth)], ys = [aw.wall, aw.wall, aw.front, aw.front];
    world.mesh(`${place.name} side awning`, corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], m);
    const v = place.id === 'buildersmart' ? sideValance : draws[place.id]?.valance;
    if (v) { const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.round(1024 * aw.valance / (aw.to - aw.from)); v(canvas.getContext('2d')!, canvas.width, canvas.height); world.panel(sp(aw.from, aw.depth), sp(aw.to, aw.depth), aw.front - aw.valance, aw.front, textured(canvas)); }
  }
  for (const r of lorong13Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
