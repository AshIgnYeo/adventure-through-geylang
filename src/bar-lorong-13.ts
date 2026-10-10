import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { barLorong13, barLorong13Frame, barLorong13Layout, barLorong13Reviews, elevation } from './bar-lorong-13-layout.mjs';

/** April 2024 exterior of No. 1 Lorong 13, using the untouched source outline. */
export function buildBarLorong13(world: World, id: string, poly: Point[]) {
  if (!barLorong13.buildingIds.includes(id)) return false;
  const frame = barLorong13Frame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const H = barLorong13.height, TH = barLorong13.towerHeight, E = elevation, white = material('#ecebe6');
  const layout = barLorong13Layout(width);

  // The whole source outline is walled to the wing height; the street wall starts above the five-foot way.
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    world.panel(a, b, front ? E.ceiling : .13, H, white);
  }
  world.mesh('No. 1 Lorong 13 flat roof', poly.flatMap(p => [p[0], H - .1, p[1]]), poly.flatMap(p => [p[0] / 4, p[1] / 4]),
    poly.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#a9a8a2'));
  // The stair tower rises above the wings at the front; its depth behind the street wall is estimated.
  const [t0, t1] = E.tower, depth = 3.2;
  const corners = [pt(t0, 0), pt(t1, 0), pt(t1, -depth), pt(t0, -depth)];
  for (let i = 0; i < 4; i++) world.panel(corners[i], corners[(i + 1) % 4], H - .2, TH, white);
  world.mesh('No. 1 Lorong 13 tower roof', corners.flatMap(p => [p[0], TH, p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#a9a8a2'));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`No. 1 Lorong 13 ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  const panel = (s: { left: number; right: number; bottom: number; top: number; out: number }, mat: pc.Material) =>
    world.panel(pt(s.left, s.out), pt(s.right, s.out), s.bottom, s.top, mat);
  const canvasFor = (s: { left: number; right: number; bottom: number; top: number }, w = 1024) => {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = Math.round(w * (s.top - s.bottom) / (s.right - s.left)); return canvas;
  };

  // Yellow BAR@ / LORONG13 sign in thin tube lettering, redrawn originally.
  const sg = layout.sign, sign = canvasFor(sg);
  {
    const c = sign.getContext('2d')!, w = sign.width, h = sign.height;
    c.fillStyle = '#d9c25f'; c.fillRect(0, 0, w, h);
    c.strokeStyle = '#5b5446'; c.lineWidth = h * .022; c.lineJoin = 'round';
    c.font = `300 ${h * .44}px "Helvetica Neue", "Avenir Next", sans-serif`; c.textBaseline = 'middle'; c.textAlign = 'left';
    // Stretch each line to its photographed width: BAR@ over two thirds of the board, LORONG13 across it.
    for (const [text, y, span] of [['BAR@', .27, .66], ['LORONG13', .74, .97]] as const) {
      c.save(); c.translate(w * .015, h * y); c.scale(w * span / c.measureText(text).width, 1); c.strokeText(text, 0, 0); c.restore();
    }
  }
  panel(sg, textured(sign));

  // Raised dark characters on the tower cap, written right to left as 協華大厦.
  const lt = layout.lettering, letters = canvasFor(lt, 1024);
  {
    const c = letters.getContext('2d')!, w = letters.width, h = letters.height;
    c.fillStyle = '#e3e2dc'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#4f4d48'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `700 ${h * .8}px "Songti SC", "STSong", serif`;
    [...'協華大厦'].forEach((ch, i) => c.fillText(ch, w * (.875 - i * .25), h * .52));
  }
  panel(lt, textured(letters));

  // House number 1, with the two short bars painted below it.
  const pl = layout.plate, plate = canvasFor(pl, 128);
  {
    const c = plate.getContext('2d')!, w = plate.width, h = plate.height;
    c.fillStyle = '#e6e3dc'; c.fillRect(0, 0, w, h); c.fillStyle = '#2b2b2b';
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `500 ${h * .5}px sans-serif`; c.fillText('1', w / 2, h * .3);
    c.fillRect(w * .4, h * .72, w * .2, h * .04); c.fillRect(w * .4, h * .82, w * .2, h * .04);
  }
  panel(pl, textured(plate));

  // Small black restaurant board reading 忆滋味 in gold.
  const bd = layout.board, board = canvasFor(bd, 256);
  {
    const c = board.getContext('2d')!, w = board.width, h = board.height;
    c.fillStyle = '#1d1b19'; c.fillRect(0, 0, w, h); c.fillStyle = '#c9a85c';
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `700 ${h * .5}px "Kaiti SC", "STKaiti", serif`; c.fillText('忆滋味', w / 2, h * .52, w * .9);
  }
  panel(bd, textured(board));

  // Painted BAR @ LORONG THIRTEEN lettering on the bar's back wall.
  const wt = layout.wallText, wall = canvasFor(wt, 256);
  {
    const c = wall.getContext('2d')!, w = wall.width, h = wall.height;
    c.fillStyle = '#e6e3dc'; c.fillRect(0, 0, w, h); c.fillStyle = '#8a857a'; c.textAlign = 'left'; c.textBaseline = 'middle';
    c.font = `600 ${h * .2}px "Helvetica Neue", sans-serif`;
    ['BAR', '@LORONG', 'THIRTEEN'].forEach((t, i) => c.fillText(t, w * .05, h * (.22 + i * .26), w * .9));
  }
  panel(wt, textured(wall));

  for (const r of barLorong13Reviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
