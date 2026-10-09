import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { jiangsu, jiangsuFrame, jiangsuLayout, jiangsuReviews } from './jiangsu-layout.mjs';

/** April 2024 exterior of No. 20 Lorong 11, using the untouched source outline. */
export function buildJiangsu(world: World, id: string, poly: Point[]) {
  if (!jiangsu.buildingIds.includes(id)) return false;
  const frame = jiangsuFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, glow = 0, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (glow) { mat.emissiveMap = mat.diffuseMap; mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = glow; }
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const layout = jiangsuLayout(width);
  const white = material('#efeeea'), H = jiangsu.height;

  // Street wall above the five-foot way, party and rear walls, and the flat roof behind the parapet.
  world.panel(pt(0), pt(width), 3.2, H, white);
  world.panel(frame.a, frame.rearA, 0, H, white);
  world.panel(frame.b, frame.rearB, 0, H, white);
  world.panel(frame.rearA, frame.rearB, 0, jiangsu.roofHeight, white);
  world.panel(frame.rearA, frame.rearB, jiangsu.roofHeight, H, white);
  const roof = [frame.a, frame.b, frame.rearB, frame.rearA];
  world.mesh('JiangSu estimated flat roof', roof.flatMap(p => [p[0], jiangsu.roofHeight, p[1]]), roof.flatMap(p => [p[0] / 3, p[1] / 3]), [0, 1, 2, 0, 2, 3], material('#8e8f8b'));

  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    world.box(`JiangSu ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  const text = (c: CanvasRenderingContext2D, chars: string, at: (i: number) => [number, number], size: number, fill: string, stroke?: string) => {
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `700 ${size}px "Kaiti SC", "STKaiti", "Songti SC", serif`;
    [...chars].forEach((ch, i) => { const [x, y] = at(i); if (stroke) { c.strokeStyle = stroke; c.lineWidth = size * .08; c.strokeText(ch, x, y); } c.fillStyle = fill; c.fillText(ch, x, y); });
  };
  const canvasFor = (w: number, h: number, long = 1024) => {
    const canvas = document.createElement('canvas');
    if (w >= h) { canvas.width = long; canvas.height = Math.max(32, Math.round(long * h / w)); } else { canvas.height = long; canvas.width = Math.max(32, Math.round(long * w / h)); }
    return canvas;
  };

  // Blue lightbox board above the awning: cream characters with a red outline inside a pale border. Redrawn originally.
  const bd = layout.board, boardCanvas = canvasFor(bd.right - bd.left, bd.top - bd.bottom);
  {
    const c = boardCanvas.getContext('2d')!, W = boardCanvas.width, Hh = boardCanvas.height;
    c.fillStyle = '#2c62ad'; c.fillRect(0, 0, W, Hh);
    c.strokeStyle = '#a9c6e8'; c.lineWidth = 8; c.strokeRect(10, 10, W - 20, Hh - 20);
    c.strokeStyle = 'rgba(169,198,232,.35)'; c.lineWidth = 2;
    for (let x = 30; x < W; x += 34) { c.beginPath(); c.moveTo(x, 18); c.lineTo(x, Hh - 18); c.stroke(); }
    text(c, '江苏酒家', i => [W * (.17 + i * .22), Hh * .53], Hh * .7, '#f3e7b8', '#b5372f');
  }
  world.panel(pt(bd.left, bd.out), pt(bd.right, bd.out), bd.bottom, bd.top, textured(boardCanvas, .3));
  const sideA = pt(bd.left, bd.out / 2), sideB = pt(bd.right, bd.out / 2);
  for (const s of [sideA, sideB]) world.box('JiangSu board end', s[0], (bd.bottom + bd.top) / 2, s[1], .03, bd.top - bd.bottom, bd.out, world.mat('#2c62ad'), undefined, angle);

  // The restaurant's lit sign at the head of the glazing: red characters on dark blue.
  const ls = layout.litSign, litCanvas = canvasFor(ls.right - ls.left, ls.top - ls.bottom);
  {
    const c = litCanvas.getContext('2d')!, W = litCanvas.width, Hh = litCanvas.height;
    c.fillStyle = '#1a2850'; c.fillRect(0, 0, W, Hh);
    text(c, '江苏酒家', i => [W * (.17 + i * .22), Hh * .52], Hh * .75, '#e8333d');
  }
  world.panel(pt(ls.left, ls.out), pt(ls.right, ls.out), ls.bottom, ls.top, textured(litCanvas, .9));

  // Shallow dark awning with a pale valance, sloping out from the beam.
  const aw = layout.awning, corners = [pt(aw.from, 0), pt(aw.to, 0), pt(aw.to, aw.depth), pt(aw.from, aw.depth)];
  const ys = [aw.wall, aw.wall, aw.front, aw.front];
  world.mesh('JiangSu awning', corners.flatMap((p, i) => [p[0], ys[i], p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#2e3133'));
  const val = pt(width / 2, aw.depth);
  world.box('JiangSu awning valance', val[0], aw.front - .07, val[1], aw.to - aw.from, .14, .03, world.mat('#c9cbc6'), undefined, angle);

  // Vertical neon blade sign on the party line: 江苏酒家 in red on dark navy with a blue border, on both faces.
  const bl = layout.blade, bw = bl.out[1] - bl.out[0], bh = bl.h[1] - bl.h[0], bladeCanvas = canvasFor(bw, bh);
  {
    const c = bladeCanvas.getContext('2d')!, W = bladeCanvas.width, Hh = bladeCanvas.height;
    c.fillStyle = '#18234a'; c.fillRect(0, 0, W, Hh);
    c.strokeStyle = '#4f86ff'; c.lineWidth = W * .05; c.strokeRect(W * .06, W * .06, W * .88, Hh - W * .12);
    text(c, '江苏酒家', i => [W / 2, Hh * (.15 + i * .235)], W * .72, '#ff4b6e', '#ffd2dc');
  }
  const bladeMat = textured(bladeCanvas, .6);
  world.panel(pt(bl.u - .015, bl.out[1]), pt(bl.u - .015, bl.out[0]), bl.h[0], bl.h[1], bladeMat);
  world.panel(pt(bl.u + .015, bl.out[0]), pt(bl.u + .015, bl.out[1]), bl.h[0], bl.h[1], bladeMat);
  for (const y of [bl.h[0] + .45, bl.h[1] - .45]) {
    const p = pt(bl.u, bl.out[0] / 2);
    world.box('JiangSu blade sign arm', p[0], y, p[1], .04, .04, bl.out[0] + .02, world.mat('#2a2a2a'), undefined, angle);
  }

  for (const r of jiangsuReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
