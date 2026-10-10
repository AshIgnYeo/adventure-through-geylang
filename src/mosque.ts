import * as pc from 'playcanvas';
import type { World, Point } from './world';
import type { FacadeFrame } from './landmark-models';
import { mosqueElevation as M, mosqueLayout } from './mosque-layout.mjs';

/**
 * Masjid Haji Mohd Salleh's June 2024 street elevation on the source front: four storeys in an orange
 * frame with cream panels, the lettered second-storey arch, side screens, and the set-back towers and
 * tiled gable above the parapet. Lettering and calligraphy are redrawn in original canvas typography.
 */
export function buildMosque(world: World, f: FacadeFrame) {
  const { a, dx, dz, nx, nz, width } = f, C = M.colours;
  const pt = (u: number, out: number): Point => [a[0] + dx * u + nx * out, a[1] + dz * u + nz * out];
  const angle = Math.atan2(nx, nz) * 180 / Math.PI;
  const mat = (colour: string) => { const m = world.mat(colour); m.cull = pc.CULLFACE_NONE; m.update(); return m; };
  const textured = (canvas: HTMLCanvasElement) => {
    const m = new pc.StandardMaterial(); m.diffuseMap = world.texture(canvas); m.cull = pc.CULLFACE_NONE; m.update(); return m;
  };
  const canvas = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
    const el = document.createElement('canvas'); el.width = w; el.height = h; draw(el.getContext('2d')!); return el;
  };
  const vertex = (u: number, out: number, y: number) => { const p = pt(u, out); return [p[0], y, p[1]]; };
  // A half-disc or full disc fan in a plane parallel to the front.
  const fan = (name: string, u: number, out: number, base: number, radius: number, rise: number, colour: string, full = false) => {
    const positions = vertex(u, out, base), indices: number[] = [], n = full ? 32 : 20;
    for (let i = 0; i <= n; i++) {
      const t = (full ? 2 : 1) * Math.PI * i / n;
      positions.push(...vertex(u + Math.cos(t) * radius, out, base + Math.sin(t) * rise));
      if (i) indices.push(0, i, i + 1);
    }
    world.mesh(name, positions, Array(positions.length / 3 * 2).fill(0), indices, mat(colour));
  };

  // The orange frame above the ground floor, open over the recessed stair bay, and a plain return wall
  // over the source strip east of the photographed front.
  const frame = mat(C.orange), [sl0, sr0] = M.stair.u, [sb0, st0] = M.stair.h;
  world.panel(pt(0, 0), pt(sl0, 0), M.ground.openingTop + .28, M.parapet, frame);
  world.panel(pt(sr0, 0), pt(M.facade, 0), M.ground.openingTop + .28, M.parapet, frame);
  world.panel(pt(sl0, 0), pt(sr0, 0), M.ground.openingTop + .28, sb0, frame);
  world.panel(pt(sl0, 0), pt(sr0, 0), st0, M.parapet, frame);
  for (const u of [sl0, sr0]) world.panel(pt(u, 0), pt(u, -.6), sb0, st0, frame);
  if (width > M.facade + .05) {
    world.panel(pt(M.facade, -.3), pt(width, -.3), .15, M.parapet - .3, mat('#e6dfc8'));
    world.panel(pt(M.facade, 0), pt(M.facade, -.3), .15, M.parapet, mat(C.orange));
    const gate = pt((M.facade + width) / 2, -.28);
    world.box('mosque east yard opening', gate[0], 1.3, gate[1], width - M.facade - .3, 2.3, .04, world.mat('#3b4240'), undefined, angle);
  }
  for (const b of mosqueLayout()) {
    const p = pt(b.u, b.out);
    world.box(`mosque ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, angle);
  }

  // Second storey: the central cream panel carries the arched lettering; the glazed arch sits in front.
  const [pl, pr] = M.second.panel, [sb, st] = M.storeys.second, arch = M.second.arch, ppm = 170;
  const lettered = canvas(Math.round((pr - pl) * ppm), Math.round((st - sb) * ppm), c => {
    const W = c.canvas.width, H = c.canvas.height;
    c.fillStyle = C.cream; c.fillRect(0, 0, W, H);
    c.fillStyle = C.letters; c.font = `700 ${Math.round(.42 * ppm)}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    const cx = (M.centre - pl) * ppm, cy = H - (arch.base - sb) * ppm, r = 2.47 * ppm, letters = [...'MASJID HAJI MOHD SALLEH'];
    letters.forEach((ch, i) => {
      const t = Math.PI * (162 - 144 * i / (letters.length - 1)) / 180;
      c.save(); c.translate(cx + Math.cos(t) * r, cy - Math.sin(t) * r); c.rotate(Math.PI / 2 - t); c.fillText(ch, 0, 0); c.restore();
    });
  });
  world.panel(pt(pl, .02), pt(pr, .02), sb, st, textured(lettered));
  fan('mosque arch surround', M.centre, .05, arch.base, arch.radius + .16, arch.radius + .16, '#f1ece0');
  fan('mosque arch glazing', M.centre, .08, arch.base, arch.radius, arch.radius, C.glass);
  for (const k of [-2, -1, 0, 1, 2]) {
    const u = M.centre + k * arch.radius / 3, h = Math.sqrt(arch.radius ** 2 - (u - M.centre) ** 2), p = pt(u, .1);
    world.box('mosque arch mullion', p[0], arch.base + h / 2, p[1], .06, h, .03, world.mat(C.frame), undefined, angle);
  }
  for (const y of [.95, 1.75]) {
    const half = Math.sqrt(arch.radius ** 2 - y ** 2), p = pt(M.centre, .1);
    world.box('mosque arch transom', p[0], arch.base + y, p[1], 2 * half, .06, .03, world.mat(C.frame), undefined, angle);
  }
  // Fourth-storey fanlights.
  for (const u of M.windows) {
    fan('mosque fanlight surround', u, .06, M.fourth.fanBase, M.windowWidth / 2 + .12, M.windowWidth / 2 + .12, '#f1ece0');
    fan('mosque fanlight', u, .1, M.fourth.fanBase, M.windowWidth / 2, M.windowWidth / 2, '#4b8c86');
  }

  // Arabic name on the band above the arch, and the English signboard.
  const [cl, cr] = M.calligraphy.u, [cb, ct] = M.calligraphy.h;
  const script = canvas(1024, Math.round(1024 * (ct - cb) / (cr - cl)), c => {
    c.fillStyle = C.orange; c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    c.fillStyle = C.letters; c.font = `600 ${Math.round(c.canvas.height * .8)}px serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.direction = 'rtl'; c.fillText('مسجد حاج محمد صالح', 512, c.canvas.height / 2, 1000);
  });
  world.panel(pt(cl, .02), pt(cr, .02), cb, ct, textured(script));
  const [sl, sr] = M.sign.u, [gb, gt] = M.sign.h;
  world.panel(pt(sl, .245), pt(sr, .245), gb, gt, world.textMaterial('Masjid Haji Mohd Salleh', '#1f3326', '#d8de86', .15, (sr - sl) / (gt - gb)));

  // Towers behind the parapet, each with a calligraphy medallion, a cap, a dome and a finial.
  const T = M.tower, back = -(T.setback + T.size / 2);
  for (const tower of M.towers) {
    const p = pt(tower.u, back);
    world.box('mosque tower', p[0], (M.parapet + T.top) / 2, p[1], T.size, T.top - M.parapet, T.size, world.mat(C.tower), undefined, angle);
    world.box('mosque tower cap', p[0], T.top + .1, p[1], T.size + .24, .2, T.size + .24, world.mat('#efe9da'), undefined, angle);
    const medallion = canvas(512, 512, c => {
      c.fillStyle = C.tower; c.fillRect(0, 0, 512, 512);
      c.fillStyle = C.letters; c.beginPath(); c.arc(256, 256, 250, 0, Math.PI * 2); c.fill();
      c.fillStyle = '#d9e6df'; c.beginPath(); c.arc(256, 256, 214, 0, Math.PI * 2); c.fill();
      c.fillStyle = C.letters; c.font = '600 190px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.direction = 'rtl';
      c.fillText(tower.script, 256, 270, 380);
    });
    const r = T.medallion.radius;
    world.panel(pt(tower.u - r, -T.setback + .02), pt(tower.u + r, -T.setback + .02), T.medallion.y - r, T.medallion.y + r, textured(medallion));
    // Dome: latitude rings on the cap.
    const D = T.dome, rings = 6, segs = 20, positions: number[] = [], indices: number[] = [];
    for (let j = 0; j <= rings; j++) for (let k = 0; k <= segs; k++) {
      const phi = Math.PI / 2 * j / rings, th = Math.PI * 2 * k / segs, rr = D.radius * Math.cos(phi);
      positions.push(...vertex(tower.u + rr * Math.cos(th), back + rr * Math.sin(th), T.top + .2 + D.rise * Math.sin(phi)));
      if (j < rings && k < segs) { const i = j * (segs + 1) + k; indices.push(i, i + segs + 1, i + 1, i + 1, i + segs + 1, i + segs + 2); }
    }
    world.mesh('mosque tower dome', positions, Array(positions.length / 3 * 2).fill(0), indices, mat(C.dome));
    world.box('mosque dome finial', p[0], T.top + .2 + D.rise + .2, p[1], .07, .4, .07, world.mat(C.gold), undefined, angle);
  }

  // The tiled gable roof, its ridge running back from a cream gable face with a green arched vent.
  const G = M.gable, l = M.centre - G.halfWidth, r = M.centre + G.halfWidth;
  const front = [vertex(l, -G.setback, G.eaves), vertex(r, -G.setback, G.eaves), vertex(M.centre, -G.setback, G.peak)];
  const rear = [vertex(l, -G.back, G.eaves), vertex(r, -G.back, G.eaves), vertex(M.centre, -G.back, G.peak)];
  for (const face of [front, rear]) world.mesh('mosque gable face', face.flat(), [0, 1, 1, 1, .5, 0], [0, 1, 2], mat(C.tower));
  const roof = mat(C.roof);
  world.mesh('mosque roof slope', [front[0], front[2], rear[2], rear[0]].flat(), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], roof);
  world.mesh('mosque roof slope', [front[1], front[2], rear[2], rear[1]].flat(), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], roof);
  // Bargeboards along the front gable, and the crescent finial on its peak.
  const slope = Math.atan2(G.peak - G.eaves, G.halfWidth) * 180 / Math.PI, run = Math.hypot(G.peak - G.eaves, G.halfWidth);
  for (const side of [-1, 1]) {
    const p = pt(M.centre + side * G.halfWidth / 2, -G.setback + .1);
    world.box('mosque bargeboard', p[0], (G.peak + G.eaves) / 2, p[1], run + .2, .25, .12, world.mat('#a4532f'), undefined, angle)
      .rotateLocal(0, 0, side * -slope);
  }
  fan('mosque gable vent surround', M.centre, -G.setback + .03, G.vent.base, G.vent.radius + .12, G.vent.radius + .12, '#f1ece0');
  fan('mosque gable vent', M.centre, -G.setback + .05, G.vent.base, G.vent.radius, G.vent.radius, '#4b8c86');
  const finial = pt(M.centre, -G.setback);
  world.box('mosque gable finial pole', finial[0], G.peak + .6, finial[1], .07, 1.2, .07, world.mat('#4d5a58'), undefined, angle);
  for (let i = 0; i <= 6; i++) {
    const t = Math.PI * (.15 + .7 * i / 6), p = pt(M.centre + Math.cos(t) * .28, -G.setback);
    world.box('mosque crescent', p[0], G.peak + 1.45 - Math.sin(t) * .28, p[1], .09, .09, .05, world.mat('#4d5a58'), undefined, angle);
  }
  return true;
}
