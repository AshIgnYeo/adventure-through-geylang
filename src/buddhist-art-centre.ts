import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { buddhistArtCentre, artCentreFrame, artCentreLayout, artCentreRoof, artCentreReviews } from './buddhist-art-centre-layout.mjs';

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
    world.box(`Buddhist Art Centre ${b.name}`, p[0], b.y, p[1], b.w, b.h, b.depth, world.mat(b.colour, b.glow), undefined, angle);
  }

  // Arched window heads in three painted layers, as in the reference.
  const archFan = (name: string, centre: number, span: number, base: number, rise: number, out: number, colour: string) => {
    const c = pt(centre, out), positions = [c[0], base, c[1]], indices: number[] = [];
    for (let i = 0; i <= 20; i++) {
      const t = Math.PI * i / 20, q = pt(centre + Math.cos(t) * span / 2, out);
      positions.push(q[0], base + Math.sin(t) * rise, q[1]);
      if (i) indices.push(0, i, i + 1);
    }
    world.mesh(`Buddhist Art Centre ${name}`, positions, Array(positions.length / 3 * 2).fill(0), indices, material(colour));
  };
  for (const arch of layout.arches) {
    archFan('blue arch band', arch.u, arch.span + .24, arch.base, arch.rise + .12, .05, '#2f58a8');
    archFan('orange arch lining', arch.u, arch.span + .10, arch.base, arch.rise + .05, .06, '#e2a640');
    archFan('arched fanlight', arch.u, arch.span - .02, arch.base, arch.rise, .07, '#40624f');
  }

  // Original drawing of the red scroll frieze, not a copied photograph.
  const friezeCanvas = document.createElement('canvas'); friezeCanvas.width = 2048; friezeCanvas.height = 256;
  const f = friezeCanvas.getContext('2d')!;
  f.fillStyle = '#f1ece0'; f.fillRect(0, 0, 2048, 256);
  f.fillStyle = '#2f58a8'; f.fillRect(0, 0, 2048, 14);
  f.fillStyle = '#e2ad3a'; f.fillRect(0, 14, 2048, 8);
  f.lineCap = 'round';
  for (let i = 0; i < 9; i++) {
    const x = 114 + i * 227, y = 132;
    f.strokeStyle = '#c13b36'; f.lineWidth = 15;
    for (const side of [-1, 1]) {
      f.beginPath(); f.arc(x + side * 46, y, 40, side > 0 ? Math.PI : 0, side > 0 ? Math.PI * 2.6 : Math.PI * 1.6, side > 0); f.stroke();
      f.beginPath(); f.arc(x + side * 46, y + 4, 16, 0, Math.PI * 2); f.stroke();
    }
    f.beginPath(); f.moveTo(x - 92, y + 52); f.quadraticCurveTo(x, y + 96, x + 92, y + 52); f.stroke();
    f.fillStyle = '#3d8a56'; f.beginPath(); f.ellipse(x, y - 58, 30, 13, 0, 0, Math.PI * 2); f.fill();
  }
  const frieze = new pc.StandardMaterial(); frieze.diffuseMap = world.texture(friezeCanvas); frieze.cull = pc.CULLFACE_NONE; frieze.update();
  world.panel(pt(0, layout.frieze.out), pt(width, layout.frieze.out), layout.frieze.bottom, layout.frieze.top, frieze);

  // Original typography for the observed teal signboard. The small line
  // left of the Chinese name was unreadable in the reference and is omitted.
  const sign = layout.sign, signWidth = sign.right - sign.left;
  const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = Math.round(2048 * (sign.top - sign.bottom) / signWidth);
  const c = canvas.getContext('2d')!, h = canvas.height;
  const fill = c.createLinearGradient(0, 0, 0, h); fill.addColorStop(0, '#58aaa9'); fill.addColorStop(1, '#3f9294');
  c.fillStyle = fill; c.fillRect(0, 0, 2048, h);
  c.strokeStyle = '#2c6c70'; c.lineWidth = 10; c.strokeRect(14, 14, 2020, h - 28);
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = '700 168px Georgia, serif'; c.lineWidth = 10; c.strokeStyle = '#6a5530';
  c.strokeText('BUDDHIST ART CENTRE', 1024, h * .3, 1900); c.fillStyle = '#efe1b9'; c.fillText('BUDDHIST ART CENTRE', 1024, h * .3, 1900);
  c.fillStyle = '#1f4f63'; c.font = '600 150px serif'; c.fillText('世界佛教文物流通中心', 960, h * .7, 1500);
  c.fillStyle = '#1d3d6b'; c.font = '700 72px sans-serif'; c.fillText('NO:285', 1870, h * .78);
  const signMat = new pc.StandardMaterial(); signMat.diffuseMap = world.texture(canvas); signMat.emissiveMap = signMat.diffuseMap;
  signMat.emissive = new pc.Color(1, 1, 1); signMat.emissiveIntensity = .08; signMat.cull = pc.CULLFACE_NONE; signMat.update();
  world.panel(pt(sign.left, sign.out), pt(sign.right, sign.out), sign.bottom, sign.top, signMat);

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
  const roof = artCentreRoof(frame), tile = material('#8f5a47'), course = material('#a86a52'), coping = material('#7a4a3b');
  world.mesh('Buddhist Art Centre estimated tiled roof', roof.vertices.flat(), roof.vertices.flatMap(v => [v[0] / 3, v[2] / 3]), roof.slopes.flat(), tile);
  for (const g of roof.gables) world.mesh('Buddhist Art Centre gable wall', g.flat(), [0, 0, 1, 0, .5, 1], [0, 1, 2], material(cream));
  const lerp = (p: number[], q: number[], t: number) => p.map((v, i) => v + (q[i] - v) * t);
  const v = roof.vertices;
  for (const [e0, e1] of [[v[0], v[1]], [v[4], v[5]]]) {
    for (let t = .04; t < .98; t += .05) {
      const quad = [lerp(e0, v[2], t), lerp(e1, v[3], t), lerp(e1, v[3], t + .012), lerp(e0, v[2], t + .012)];
      world.mesh('Buddhist Art Centre tile course', quad.flatMap(p => [p[0], p[1] + .015, p[2]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], course);
    }
  }
  for (const [eave, rear, ridge, inward] of [[v[0], v[4], v[2], 1], [v[1], v[5], v[3], -1]] as const) {
    for (const [p, q] of [[eave, ridge], [ridge, rear]]) {
      const shift = (s: number[]) => [s[0] + frame.dx * .18 * inward, s[1], s[2] + frame.dz * .18 * inward];
      const top = [p, q, shift(q), shift(p)].map(s => [s[0], s[1] + .09, s[2]]);
      world.mesh('Buddhist Art Centre party-wall coping', top.flat(), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], coping);
      const face = [shift(p), shift(q), top[2], top[3]];
      world.mesh('Buddhist Art Centre coping face', face.flat(), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], coping);
    }
  }

  for (const r of artCentreReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
