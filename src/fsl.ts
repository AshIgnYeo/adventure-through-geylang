import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { fsl, fslFrame, fslLayout, fslReviews, elevation } from './fsl-layout.mjs';

/** June 2024 exterior of No. 118 Sims Avenue, using the untouched source outline. */
export function buildFsl(world: World, id: string, poly: Point[]) {
  if (!fsl.buildingIds.includes(id)) return false;
  const frame = fslFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = fsl.height, wall = material('#dedad0'), layout = fslLayout(width);

  // The whole source outline is walled to the parapet; the street wall starts above the five-foot way.
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    world.panel(a, b, front ? elevation.ceiling : .13, H, wall);
  }
  world.mesh('FSL flat roof', poly.flatMap(p => [p[0], H - .2, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]),
    poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#8f8c86'));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`FSL ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Red signboard over the grille: white FSL then EW LED LIGHTING, redrawn originally.
  const sg = layout.sign, board = document.createElement('canvas');
  board.width = 1024; board.height = Math.round(1024 * (sg.top - sg.bottom) / (sg.right - sg.left));
  {
    const c = board.getContext('2d')!, h = board.height;
    c.fillStyle = '#b3241f'; c.fillRect(0, 0, 1024, h); c.strokeStyle = '#f2e9e3'; c.lineWidth = 6; c.strokeRect(6, 6, 1012, h - 12);
    c.textBaseline = 'middle'; c.fillStyle = '#ffffff';
    c.font = `900 ${h * .62}px "Arial Black", sans-serif`; c.textAlign = 'left'; c.fillText('FSL', 30, h * .54);
    c.font = `700 ${h * .42}px "Times New Roman", serif`; c.fillText('EW LED LIGHTING', 280, h * .45, 700);
    c.font = `600 ${h * .14}px sans-serif`; c.fillText('LIGHT UP THE WORLD', 470, h * .82, 360);
  }
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(board, .15));

  // Backlit white LED LIGHTING letters on the dark shop fascia.
  const lt = layout.lettering, letters = document.createElement('canvas');
  letters.width = 1024; letters.height = Math.round(1024 * (lt.top - lt.bottom) / (lt.right - lt.left));
  {
    const c = letters.getContext('2d')!, h = letters.height;
    c.fillStyle = '#262626'; c.fillRect(0, 0, 1024, h);
    c.fillStyle = '#f4f4f0'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `500 ${h * .82}px "Helvetica Neue", Arial, sans-serif`; c.fillText('LED LIGHTING', 512, h * .54, 1000);
  }
  world.panel(pt(lt.left, lt.out), pt(lt.right, lt.out), lt.bottom, lt.top, textured(letters, .5));

  // Orange FSL disc sign standing out from the No. 120 pier, lettered on both faces.
  const ds = layout.disc, disc = document.createElement('canvas'); disc.width = disc.height = 256;
  {
    const c = disc.getContext('2d')!;
    c.fillStyle = '#e8622c'; c.beginPath(); c.arc(128, 128, 126, 0, Math.PI * 2); c.fill();
    c.strokeStyle = '#f7c2a6'; c.lineWidth = 8; c.stroke();
    c.fillStyle = '#ffffff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '900 92px "Arial Black", sans-serif'; c.fillText('FSL', 128, 132);
  }
  const dm = textured(disc, .3); dm.opacityMap = dm.diffuseMap; dm.opacityMapChannel = 'a'; dm.alphaTest = .5; dm.update();
  const r = ds.diameter / 2;
  world.panel(pt(ds.u, ds.out - r), pt(ds.u, ds.out + r), ds.h - r, ds.h + r, dm);
  world.panel(pt(ds.u + .01, ds.out + r), pt(ds.u + .01, ds.out - r), ds.h - r, ds.h + r, dm);

  // Red blade lightbox on the No. 120 party line: FSL, LED, LIGHTING, LIGHT UP THE WORLD.
  const bl = layout.blade, bw = bl.out[1] - bl.out[0], bh = bl.h[1] - bl.h[0], blade = document.createElement('canvas');
  blade.width = 256; blade.height = Math.round(256 * bh / bw);
  {
    const c = blade.getContext('2d')!, W = blade.width, h = blade.height;
    c.fillStyle = '#c9cbcd'; c.fillRect(0, 0, W, h); c.fillStyle = '#c3221c'; c.fillRect(10, 10, W - 20, h - 20);
    c.fillStyle = '#ffffff'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = `900 ${W * .42}px "Times New Roman", serif`;
    ['FSL', 'LED'].forEach((t, i) => c.fillText(t, W / 2, h * (.1 + i * .14)));
    c.font = `700 ${W * .25}px "Times New Roman", serif`; c.fillText('LIGHTING', W / 2, h * .39, W - 30);
    c.font = `700 ${W * .15}px "Times New Roman", serif`;
    ['LIGHT UP', 'THE WORLD'].forEach((t, i) => c.fillText(t, W / 2, h * (.5 + i * .06), W - 30));
    c.fillStyle = '#f4d35e'; for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(W / 2, h * (.68 + i * .08), W * .1, 0, Math.PI * 2); c.fill(); }
  }
  const bm = textured(blade, .3);
  world.panel(pt(bl.u - .03, bl.out[1]), pt(bl.u - .03, bl.out[0]), bl.h[0], bl.h[1], bm);
  world.panel(pt(bl.u + .03, bl.out[0]), pt(bl.u + .03, bl.out[1]), bl.h[0], bl.h[1], bm);
  for (const y of [bl.h[0] + .3, bl.h[1] - .3]) {
    const p = pt(bl.u, bl.out[0] / 2);
    world.box('FSL blade sign bracket', p[0], y, p[1], .05, .05, bl.out[0] + .02, world.mat('#b3241f'), undefined, angle);
  }

  for (const rv of fslReviews(frame)) world.reviewSpawns.set(rv.id, { p: rv.p as Point, yaw: rv.yaw, pitch: rv.pitch });
  return true;
}
