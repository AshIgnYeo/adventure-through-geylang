import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { buddhistArtCentre, artCentreFrame, artCentreLayout, artCentreRoof, artCentreReviews } from './buddhist-art-centre-layout.mjs';
import { buildGableRoof } from './gable-roof';

/** June 2024 exterior of No. 285, using the untouched source outline. */
export function buildBuddhistArtCentre(world: World, id: string, poly: Point[]) {
  if (!buddhistArtCentre.buildingIds.includes(id)) return false;
  const frame = artCentreFrame(poly), { width, angle } = frame;
  const pt = (u: number, out = 0) => frame.point(u, out) as Point;
  const material = (colour: string, glow = 0) => {
    const mat = world.mat(colour, glow); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  const { height } = buddhistArtCentre, wallTop = height + .08, cream = '#eee6cf';

  // Party and rear walls close the volume; the street wall starts above the five-foot way.
  world.panel(frame.a, frame.rearA, .13, wallTop, material(cream));
  world.panel(frame.b, frame.rearB, .13, wallTop, material(cream));
  world.panel(frame.rearA, frame.rearB, .13, wallTop, material(cream));
  world.panel(pt(0), pt(width), 3.45, wallTop, material(cream));

  const layout = artCentreLayout(width);
  for (const b of layout.boxes) {
    const p = pt(b.u, b.out);
    const e = world.box(`Buddhist Art Centre ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
    if (b.roll) e.rotateLocal(0, 0, b.roll);
  }

  // Flat façade shapes in (u, y), placed at a fixed distance from the wall.
  const shape = (name: string, points: number[][], out: number, colour: string, indices: number[]) => {
    const positions = points.flatMap(([u, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; });
    world.mesh(`Buddhist Art Centre ${name}`, positions, points.flatMap(([u, y]) => [u, y]), indices, material(colour));
  };
  const strip = (pairs: number[][][]) => {
    const indices: number[] = [];
    for (let i = 1; i < pairs.length; i++) { const k = i * 2; indices.push(k - 2, k - 1, k + 1, k - 2, k + 1, k); }
    return { points: pairs.flat(), indices };
  };

  // Segmental arches: painted bands follow the intrados and drop to the springing.
  for (const arch of layout.arches) {
    const half = arch.span / 2, R = (half * half + arch.rise * arch.rise) / (2 * arch.rise);
    const cy = arch.springing + arch.rise - R, phi0 = Math.asin(half / R), steps = 18;
    const at = (r: number, phi: number) => [arch.u + r * Math.sin(phi), cy + r * Math.cos(phi)];
    const arc = (r: number) => Array.from({ length: steps + 1 }, (_, i) => at(r, -phi0 + 2 * phi0 * i / steps));
    for (const [d0, d1, colour] of arch.bands as [number, number, string][]) {
      const inner = arc(R + d0), outer = arc(R + d1);
      const foot = (p: number[]) => [p[0], arch.springing];
      const { points, indices } = strip([[foot(inner[0]), foot(outer[0])], ...inner.map((p, i) => [p, outer[i]]), [foot(inner[steps]), foot(outer[steps])]]);
      shape('arch band', points, .035, colour, indices);
    }
    const fan = [[arch.u, arch.glassTop], [arch.u - half, arch.glassTop], [arch.u - half, arch.springing], ...arc(R), [arch.u + half, arch.springing], [arch.u + half, arch.glassTop]];
    shape('fanlight', fan, .03, arch.fan as string, fan.slice(1, -1).flatMap((_, i) => [0, i + 1, i + 2]));
  }

  // Original drawing of the red relief scrolls, shaded to read as raised plaster.
  const fz = layout.frieze, friezeCanvas = document.createElement('canvas');
  friezeCanvas.width = 2048; friezeCanvas.height = Math.round(2048 * (fz.top - fz.bottom) / width);
  const f = friezeCanvas.getContext('2d')!, H = friezeCanvas.height;
  const fx = (u: number) => u / width * 2048, fy = (y: number) => (fz.top - y) / (fz.top - fz.bottom) * H;
  f.fillStyle = '#f2ede2'; f.fillRect(0, 0, 2048, H);
  const scroll = (u: number, y: number, size: number, dir: number) => {
    const x = fx(u), cy = fy(y), s = size / width * 2048;
    const path = () => {
      f.beginPath(); f.moveTo(x - dir * s * 1.1, cy + s * .25);
      f.bezierCurveTo(x - dir * s * .5, cy - s * .55, x + dir * s * .3, cy + s * .45, x + dir * s * .9, cy - s * .05);
      f.arc(x + dir * s * .7, cy - s * .12, s * .22, 0.3, Math.PI * 1.9, dir < 0);
    };
    f.lineCap = 'round'; f.lineJoin = 'round';
    path(); f.strokeStyle = '#7a1f1b'; f.lineWidth = s * .42; f.stroke();
    path(); f.strokeStyle = '#c43a33'; f.lineWidth = s * .3; f.stroke();
    for (let i = 0; i < 4; i++) {
      const t = i / 3, lx = x - dir * s * (1 - 1.7 * t), ly = cy + s * (.2 - .25 * Math.sin(t * Math.PI));
      f.save(); f.translate(lx, ly); f.rotate(dir * (-.9 + t * 1.2));
      f.beginPath(); f.ellipse(0, -s * .24, s * .19, s * .34, 0, 0, Math.PI * 2);
      f.fillStyle = '#7a1f1b'; f.fill(); f.beginPath(); f.ellipse(0, -s * .24, s * .14, s * .28, 0, 0, Math.PI * 2);
      f.fillStyle = '#c43a33'; f.fill(); f.restore();
    }
    path(); f.strokeStyle = '#e57063'; f.lineWidth = s * .07; f.stroke();
  };
  // Large pairs in the spandrels, smaller pairs along the band above the crowns.
  for (const p of layout.pilasters) if (p.kind !== 'tall') for (const dir of [-1, 1]) scroll(p.u + dir * .2, 7.2, .25, dir);
  for (const w of layout.windows) for (const dir of [-1, 1]) scroll(w.u + dir * .3, 7.38, .17, dir);
  const frieze = new pc.StandardMaterial(); frieze.diffuseMap = world.texture(friezeCanvas); frieze.cull = pc.CULLFACE_NONE; frieze.update();
  world.panel(pt(0, fz.out), pt(width, fz.out), fz.bottom, fz.top, frieze);

  // Original typography for the observed teal signboard, with studded letters
  // and border. The telephone line and unreadable small text are omitted.
  const sign = layout.sign, signWidth = sign.right - sign.left;
  const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = Math.round(2048 * (sign.top - sign.bottom) / signWidth);
  const c = canvas.getContext('2d')!, h = canvas.height;
  const fill = c.createLinearGradient(0, 0, 0, h); fill.addColorStop(0, '#58aaa9'); fill.addColorStop(1, '#3f9294');
  c.fillStyle = fill; c.fillRect(0, 0, 2048, h);
  let seed = 285;
  for (let i = 0; i < 2600; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    c.fillStyle = seed % 2 ? 'rgba(30,80,80,.10)' : 'rgba(220,240,230,.08)';
    c.fillRect(seed % 2048, (seed >>> 11) % h, 6 + seed % 9, 4 + (seed >>> 5) % 7);
  }
  c.strokeStyle = '#2c6c70'; c.lineWidth = 10; c.strokeRect(14, 14, 2020, h - 28);
  for (let x = 40; x < 2020; x += 34) for (const y of [36, h - 36]) { c.beginPath(); c.arc(x, y, 7, 0, Math.PI * 2); c.fillStyle = '#e6d8ac'; c.fill(); }
  for (let y = 70; y < h - 50; y += 34) for (const x of [36, 2012]) { c.beginPath(); c.arc(x, y, 7, 0, Math.PI * 2); c.fill(); }
  const letters = document.createElement('canvas'); letters.width = 2048; letters.height = h;
  const l = letters.getContext('2d')!;
  l.textAlign = 'center'; l.textBaseline = 'middle'; l.font = '700 168px Georgia, serif';
  l.fillStyle = '#f1e3b8'; l.fillText('BUDDHIST ART CENTRE', 1024, h * .3, 1880);
  l.globalCompositeOperation = 'source-atop'; l.fillStyle = '#c4a96d';
  for (let x = 6; x < 2048; x += 15) for (let y = 6; y < h; y += 15) { l.beginPath(); l.arc(x, y, 3, 0, Math.PI * 2); l.fill(); }
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = '700 168px Georgia, serif'; c.lineWidth = 10; c.strokeStyle = '#6a5530';
  c.strokeText('BUDDHIST ART CENTRE', 1024, h * .3, 1880); c.drawImage(letters, 0, 0);
  c.fillStyle = '#1f4f63'; c.font = '600 150px serif'; c.fillText('世界佛教文物流通中心', 1060, h * .7, 1400);
  c.fillStyle = '#1d3d6b'; c.font = '700 72px sans-serif'; c.fillText('NO:285', 1880, h * .76);
  const signMat = new pc.StandardMaterial(); signMat.diffuseMap = world.texture(canvas); signMat.emissiveMap = signMat.diffuseMap;
  signMat.emissive = new pc.Color(1, 1, 1); signMat.emissiveIntensity = .08; signMat.cull = pc.CULLFACE_NONE; signMat.update();
  world.panel(pt(sign.left, sign.out), pt(sign.right, sign.out), sign.bottom, sign.top, signMat);

  // Left vertical sign: yellow-to-orange face in a black frame, with a strip
  // of green LED dots. Its characters and numbers are not reproduced.
  const vs = layout.verticalSign, vCanvas = document.createElement('canvas'); vCanvas.width = 128; vCanvas.height = 1024;
  const vc = vCanvas.getContext('2d')!, vFill = vc.createLinearGradient(0, 0, 0, 870);
  vFill.addColorStop(0, '#f6cb4e'); vFill.addColorStop(1, '#e8742c');
  vc.fillStyle = vFill; vc.fillRect(0, 0, 128, 870);
  vc.strokeStyle = '#b8322c'; vc.lineWidth = 6; vc.strokeRect(8, 8, 112, 854);
  vc.fillStyle = '#1d1b19'; vc.fillRect(0, 870, 128, 154);
  vc.fillStyle = '#57d36a';
  for (let x = 22; x < 110; x += 14) for (const y of [918, 966]) { vc.beginPath(); vc.arc(x, y, 4, 0, Math.PI * 2); vc.fill(); }
  const vMat = new pc.StandardMaterial(); vMat.diffuseMap = world.texture(vCanvas); vMat.emissiveMap = vMat.diffuseMap;
  vMat.emissive = new pc.Color(1, 1, 1); vMat.emissiveIntensity = .25; vMat.cull = pc.CULLFACE_NONE; vMat.update();
  world.panel(pt(vs.left, vs.out), pt(vs.right, vs.out), vs.bottom, vs.top, vMat);

  // Faded red awning across the five-foot way opening.
  const aw = layout.awning;
  const corners = [[aw.left, aw.back, aw.top], [aw.right, aw.back, aw.top], [aw.right, aw.front, aw.bottom], [aw.left, aw.front, aw.bottom]];
  world.mesh('Buddhist Art Centre faded red awning', corners.flatMap(([u, out, y]) => { const p = pt(u, out); return [p[0], y, p[1]]; }),
    [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#8b4a47'));
  const valance = pt((aw.left + aw.right) / 2, aw.front);
  world.box('Buddhist Art Centre awning valance', valance[0], aw.bottom - .07, valance[1], aw.right - aw.left, .16, .03, world.mat('#7a3d3b'), undefined, angle);

  // Gilded lotus-tier chandeliers, lit as they appear in the reference.
  const goldMat = world.mat('#c8962e', .5), dropMat = world.mat('#fff1c9', 1);
  for (const ch of layout.chandeliers) {
    const p = pt(ch.u, ch.out);
    world.box('Buddhist Art Centre chandelier rod', p[0], (ch.rod[0] + ch.rod[1]) / 2, p[1], .025, ch.rod[1] - ch.rod[0], .025, world.mat('#8c7442'));
    for (const [y, d, th] of ch.tiers) world.cylinder('Buddhist Art Centre chandelier tier', p[0], y, p[1], d, th, goldMat);
    for (const [y, radius, count] of ch.drops) for (let i = 0; i < count; i++) {
      const t = Math.PI * 2 * i / count, q = pt(ch.u + Math.cos(t) * radius, ch.out + Math.sin(t) * radius);
      world.box('Buddhist Art Centre chandelier drop', q[0], y, q[1], .035, .14, .035, dropMat, undefined, angle);
    }
  }

  // Weathered tiled gable roof, tile courses and raised party-wall copings.
  buildGableRoof(world, 'Buddhist Art Centre', frame, artCentreRoof(frame),
    { tile: '#8f5a47', course: '#a86a52', coping: '#7a4a3b', gable: cream, copingHeight: .09, copingWidth: .18 });

  for (const r of artCentreReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
