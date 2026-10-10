import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { hainanLim, hainanLimFrame, hainanLimLayout, hainanLimReviews, storeys } from './hainan-lim-layout.mjs';

/** April 2024 exterior of No. 19 Lorong 13, using the untouched source outline. */
export function buildHainanLim(world: World, id: string, poly: Point[]) {
  if (!hainanLim.buildingIds.includes(id)) return false;
  const frame = hainanLimFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = hainanLim.height, side = material('#ddd6c6');

  // Party, rear and ground-floor walls, and a flat roof with a low parapet.
  world.panel(frame.a, frame.rearA, 0, H, side);
  world.panel(frame.b, frame.rearB, 0, H, side);
  world.panel(frame.rearA, frame.rearB, 0, H, side);
  const ring = [frame.a, frame.b, frame.rearB, frame.rearA];
  world.mesh('Hainan Lim roof', ring.flatMap(p => [p[0], H - .4, p[1]]), ring.flatMap(p => [p[0] / 4, p[1] / 4]), [0, 1, 2, 0, 2, 3], material('#8a6e5a'));
  const layout = hainanLimLayout(width);
  for (const [u0, u1] of [[0, layout.park[0]], [layout.park[1], width]]) world.panel(pt(u0), pt(u1), 0, storeys.carport[1], side);

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`Hainan Lim ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour), undefined, angle);
  }

  // Beige mosaic tiles, with raised bronze lettering redrawn in original typefaces.
  for (const t of layout.tiles) {
    const [bottom, top] = t.range, canvas = document.createElement('canvas');
    canvas.width = 2048; canvas.height = Math.round(2048 * (top - bottom) / width);
    const c = canvas.getContext('2d')!, h = canvas.height, cell = 2048 / (width / .05);
    c.fillStyle = '#e2dccd'; c.fillRect(0, 0, 2048, h);
    let seed = 19;
    for (let x = 0; x < 2048; x += cell) for (let y = 0; y < h; y += cell) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const g = 214 + seed % 18; c.fillStyle = `rgb(${g},${g - 6},${g - 20})`; c.fillRect(x + 1, y + 1, cell - 2, cell - 2);
    }
    c.fillStyle = 'rgba(80,70,55,.35)'; c.fillRect(0, h - 6, 2048, 6);
    for (const [text, at, size] of (t.lines ?? []) as [string, number, number][]) {
      const latin = /^[\x20-\x7e]+$/.test(text);
      c.font = latin ? `700 ${h * size}px "Arial Black", "Helvetica Neue", sans-serif` : `700 ${h * size}px "Kaiti SC", "STKaiti", "Songti SC", serif`;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      const spaced = latin ? text : [...text].join('  ');
      c.fillStyle = 'rgba(60,45,25,.55)'; c.fillText(spaced, 1030, h * (1 - at) + 6, 1700);
      c.fillStyle = '#b08b52'; c.fillText(spaced, 1024, h * (1 - at), 1700);
    }
    if (t.number) { c.font = `700 ${h * .2}px sans-serif`; c.fillStyle = '#3d3a35'; c.textAlign = 'center'; c.fillText('19', 2048 * 7.2 / width, h * .78); }
    world.panel(pt(0, t.out + .005), pt(width, t.out + .005), bottom, top, textured(canvas));
    // Slab nosing along the top of each tiled band.
    const p = pt(width / 2, t.out - .05);
    world.box('Hainan Lim slab nosing', p[0], top - .03, p[1], width, .06, .14, world.mat('#cfc8b5'), undefined, angle);
  }

  // RAVE AUTO S.C in white letters on the second-storey glazing.
  const rv = layout.rave, rc = document.createElement('canvas'); rc.width = 2048; rc.height = Math.round(2048 * (rv.top - rv.bottom) / (rv.right - rv.left));
  const r = rc.getContext('2d')!;
  r.font = `800 ${rc.height * .8}px "Arial Black", sans-serif`; r.textAlign = 'center'; r.textBaseline = 'middle'; r.fillStyle = '#efeae0';
  r.fillText('RAVE AUTO S.C', 1024, rc.height * .55, 2000);
  const raveMat = textured(rc); raveMat.opacityMap = raveMat.diffuseMap; raveMat.opacityMapChannel = 'a'; raveMat.alphaTest = .5; raveMat.update();
  world.panel(pt(rv.left, rv.out), pt(rv.right, rv.out), rv.bottom, rv.top, raveMat);

  for (const rr of hainanLimReviews(frame)) world.reviewSpawns.set(rr.id, { p: rr.p as Point, yaw: rr.yaw, pitch: rr.pitch });
  return true;
}
