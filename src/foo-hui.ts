import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { project } from './geo.mjs';
import { fooHui, siawLim, twinFrame, twinLayout, twinReviews } from './foo-hui-layout.mjs';

/** The two-bay building at Nos. 13 and 15 Lorong 13. The No. 13 call builds the whole
 *  street front across both bays; each call closes its own source outline. */
export function buildFooHuiSiawLim(world: World, id: string, poly: Point[]) {
  const ids = [...fooHui.buildingIds, ...siawLim.buildingIds];
  const unit = ids.indexOf(id);
  if (unit < 0) return false;
  const outline = (wayId: string) => world.data.buildings.find(b => b.id === wayId)!.coordinates.slice(0, -1).map(p => project(p, world.data.origin) as Point);
  const frame = twinFrame(outline(ids[0]), outline(ids[1]));
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const textured = (canvas: HTMLCanvasElement, cutout = false) => {
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas);
    if (cutout) { mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; }
    mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const white = material('#ebe8e1'), H = fooHui.height;

  // This unit's party, rear and roof surfaces; the shared party wall is drawn once.
  const n = poly.length, ring = [...poly];
  for (let i = 0; i < n; i++) {
    const a = ring[i], b = ring[(i + 1) % n];
    const mid: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const front = Math.abs((mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz) < .05;
    if (!front) world.panel(a, b, .13, H + .17, white);
  }
  world.mesh('Foo Hui flat roof', ring.flatMap(p => [p[0], H - .05, p[1]]), ring.flatMap(p => [p[0] / 4, p[1] / 4]), ring.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]), material('#bdbab2'));
  if (unit === 1) return true;

  const layout = twinLayout(frame.width, frame.split);
  world.panel(pt(0), pt(frame.width), 2.78, H, white);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`Foo Hui ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, frame.angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  // Pink-red awnings with scalloped valances; the No. 15 awning carries gold tassels.
  for (const aw of layout.awnings) {
    const corners = [[aw.left, aw.back, aw.top], [aw.right, aw.back, aw.top], [aw.right, aw.front, aw.bottom], [aw.left, aw.front, aw.bottom]];
    world.mesh('Foo Hui awning', corners.flatMap(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; }), [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#c74a5b'));
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = 64;
    const c = canvas.getContext('2d')!, step = 1024 / Math.round((aw.right - aw.left) / .45);
    c.fillStyle = '#b43f50';
    c.fillRect(0, 0, 1024, 30);
    for (let x = 0; x < 1024; x += step) { c.beginPath(); c.moveTo(x, 28); c.arc(x + step / 2, 28, step / 2, Math.PI, 0, true); c.fill(); }
    world.panel(pt(aw.left, aw.front), pt(aw.right, aw.front), aw.valance, aw.bottom, textured(canvas, true));
    const roller = pt((aw.left + aw.right) / 2, aw.front + .02);
    world.box('Foo Hui awning roller', roller[0], aw.bottom + .01, roller[1], aw.right - aw.left, .05, .05, world.mat('#f1efea'), undefined, frame.angle);
    if (aw.tassels) for (let u = aw.left + .3; u < aw.right; u += .9) {
      const p = pt(u, aw.front + .03);
      world.box('Foo Hui tassel knot', p[0], aw.valance - .04, p[1], .1, .1, .04, world.mat('#c62d2d'), undefined, frame.angle).rotateLocal(0, 0, 45);
      world.box('Foo Hui tassel', p[0], aw.valance - .2, p[1], .06, .22, .03, world.mat('#d8b23c'), undefined, frame.angle);
    }
  }

  // Purple Chinese and blue italic English lettering for Foo Hui, redrawn originally.
  const fs = layout.fooHuiSign, sc = document.createElement('canvas');
  sc.width = 2048; sc.height = Math.round(2048 * (fs.top - fs.bottom) / (fs.right - fs.left));
  const s = sc.getContext('2d')!, sh = sc.height;
  s.textAlign = 'center'; s.textBaseline = 'middle';
  s.fillStyle = '#8a2a63'; s.font = `900 ${sh * .56}px "Kaiti SC", "STKaiti", serif`; s.fillText('福 慧 净 修 中 心', 1024, sh * .3, 1300);
  s.fillStyle = '#2b3f8c'; s.font = `italic 900 ${sh * .38}px Georgia, serif`; s.fillText('FOO HUI GING XIU CENTRE', 1024, sh * .78, 1900);
  world.panel(pt(fs.left, fs.out), pt(fs.right, fs.out), fs.bottom, fs.top, textured(sc, true));
  const pl = layout.plate, pc2 = document.createElement('canvas'); pc2.width = 128; pc2.height = 160;
  const p2 = pc2.getContext('2d')!;
  p2.fillStyle = '#ecebe6'; p2.fillRect(0, 0, 128, 160); p2.fillStyle = '#2a2a2a'; p2.textAlign = 'center'; p2.font = '600 56px sans-serif';
  p2.fillText('13', 64, 62); p2.fillText('13A', 64, 130);
  world.panel(pt(pl.u - pl.w / 2, pl.out), pt(pl.u + pl.w / 2, pl.out), pl.bottom, pl.top, textured(pc2));

  // Black board with gold 少林佛山堂 SIAW LIM HOOD SUN THONG over the No. 15 doorway.
  const sb = layout.siawLimBoard, bc = document.createElement('canvas');
  bc.width = 1024; bc.height = Math.round(1024 * (sb.top - sb.bottom) / (sb.right - sb.left));
  const b2 = bc.getContext('2d')!, bh = bc.height;
  b2.fillStyle = '#1a1716'; b2.fillRect(0, 0, 1024, bh); b2.strokeStyle = '#a3282a'; b2.lineWidth = 14; b2.strokeRect(7, 7, 1010, bh - 14);
  b2.textAlign = 'center'; b2.textBaseline = 'middle'; b2.fillStyle = '#d4ab4f';
  b2.font = `700 ${bh * .4}px "Kaiti SC", "STKaiti", serif`; b2.fillText('少 林 佛 山 堂', 512, bh * .35, 900);
  b2.font = `700 ${bh * .2}px "Helvetica Neue", Arial, sans-serif`; b2.fillText('SIAW LIM HOOD SUN THONG', 512, bh * .75, 900);
  world.panel(pt(sb.left, sb.out), pt(sb.right, sb.out), sb.bottom, sb.top, textured(bc));

  for (const r of twinReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
