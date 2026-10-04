import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { frogPorridge, frogLayout } from './frog-porridge-layout.mjs';

/** Dated corner exterior, using the untouched seven-edge source outline. */
export function buildFrogPorridge(world: World, id: string, poly: Point[]) {
  if (!frogPorridge.buildingIds.includes(id)) return false;
  const { faces, roof, settings, reviews } = frogLayout(poly);
  const cream = '#d9d1b9', trim = '#ece4ce', grey = '#4c5960', red = '#b22e32';
  const material = (colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update(); return mat;
  };
  // Plain unseen elevations close the volume without attributing upstairs use.
  for (let edge = 0; edge < poly.length; edge++) {
    world.panel(poly[edge], poly[(edge + 1) % poly.length], faces.some(f => f.edge === edge) ? 4.06 : .13,
      frogPorridge.height, material(cream));
  }
  const indices = roof.triangles.flatMap(([a, b, c]) => [a, c, b]);
  world.mesh('Lor 9 estimated hip roof', roof.vertices.flat(), roof.vertices.flatMap(p => [p[0], p[2]]), indices, material('#665447'));
  // Fine raised courses are original geometry. Each triangle stays over its
  // footprint, including the west-side notch. They are a simplified tile field.
  for (const tri of roof.triangles) {
    const [a, b, c] = tri.map(i => roof.vertices[i]);
    for (let t = .12; t < 1; t += .12) {
      const lerp = (p: number[], q: number[], n: number) => p.map((v, i) => v + (q[i] - v) * n);
      const p = lerp(a, c, t), q = lerp(b, c, t), r = lerp(b, c, Math.min(t + .008, 1)), s = lerp(a, c, Math.min(t + .008, 1));
      world.mesh('Lor 9 tile course', [p, q, r, s].flatMap(v => [v[0], v[1] + .014, v[2]]),
        [0, 0, 1, 0, 1, 1, 0, 1], [0, 2, 1, 0, 3, 2], material('#887160'));
    }
  }

  // Typography is newly drawn. No photographed sign or food artwork is copied.
  const signMaterial = (width: number) => {
    const c = document.createElement('canvas'); c.width = Math.round(300 * width / .72); c.height = 300;
    const ctx = c.getContext('2d')!; ctx.fillStyle = red; ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#f1d6ad'; ctx.lineWidth = 5; ctx.strokeRect(9, 9, c.width - 18, 282);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff1d8';
    if (width > 8) {
      ctx.font = 'italic 600 148px Georgia'; ctx.fillText('Geylang Lor 9', c.width * .28, 108);
      ctx.font = '500 79px sans-serif'; ctx.fillText('Fresh Frog Porridge', c.width * .28, 225);
      ctx.fillStyle = '#f4cd67'; ctx.font = '600 110px sans-serif'; ctx.fillText('芽笼九巷活田鸡', c.width * .76, 157);
    } else {
      ctx.font = 'italic 600 180px Georgia'; ctx.fillText('Geylang Lor 9', c.width / 2, 105, c.width * .9);
      ctx.fillStyle = '#f4cd67'; ctx.font = '600 62px sans-serif'; ctx.fillText('芽笼九巷活田鸡', c.width * .30, 238);
      ctx.fillStyle = '#fff1d8'; ctx.font = '500 55px sans-serif'; ctx.fillText('Fresh Frog Porridge', c.width * .69, 238);
    }
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(c); mat.emissiveMap = mat.diffuseMap;
    mat.emissive = new pc.Color(1, 1, 1); mat.emissiveIntensity = .14; mat.cull = pc.CULLFACE_NONE; mat.update();
    return { mat, width };
  };

  for (const f of faces) {
    const w = f.width, pt = (u: number, out = 0) => f.point(u, out) as Point;
    const box = (name: string, u: number, y: number, out: number, width: number, h: number, depth: number, colour: string, glow = 0) => {
      const p = pt(u, out); return world.box(`Lor 9 ${name}`, p[0], y, p[1], width, h, depth, world.mat(colour, glow), undefined, f.angle);
    };
    const panel = (u: number, width: number, base: number, top: number, out: number, mat: pc.Material) =>
      world.panel(pt(u, out), pt(u + width, out), base, top, mat);
    // Source shell and the estimated road surface overlap at Lorong 9. Keep
    // the verandah floor, columns, canopy and furniture within the source edge.
    const apron = [pt(.28), pt(w - .28), pt(w - .28, -1.5), pt(.28, -1.5)];
    world.mesh('Lor 9 recessed verandah floor', apron.flatMap(p => [p[0], .135, p[1]]),
      [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], material('#aaa89b'));
    panel(.28, w - .56, .135, 3.16, -frogPorridge.verandahDepth, material('#55564e'));
    panel(.28, w - .56, 2.17, 3.16, -frogPorridge.verandahDepth + .012, material('#c9c9bb'));
    // Short opaque returns provide depth at each end without a view inside.
    for (const u of [.28, w - .28]) world.panel(pt(u), pt(u, -1.5), .135, 3.16, material('#c4bba4'));
    box('verandah soffit', w / 2, 3.12, -.78, w - .60, .13, 1.48, trim);
    box('red canopy', w / 2, 3.30, -.46, w - .60, .10, .9, red);
    box('awning valance', w / 2, 3.18, -.065, w - .60, .18, .06, '#76262b');
    box('fascia backing', w / 2, 3.67, -.07, w - .10, .79, .12, red);
    const boards = f.edge === 1 ? 2 : 1;
    for (let i = 0; i < boards; i++) {
      const boardWidth = w / boards - .16, sign = signMaterial(boardWidth);
      panel(i * w / boards + .08, sign.width, 3.31, 4.03, -.004, sign.mat);
    }
    box('upper sill band', w / 2, 4.13, -.035, w, .13, .10, trim);
    box('eaves cornice', w / 2, 7.54, -.035, w, .19, .10, trim);
    box('eaves lower moulding', w / 2, 7.35, -.035, w, .08, .10, '#b9b19b');
    for (let u = .16; u < w - .12; u += .25) box('eaves tile end', u, 7.73, -.10, .16, .065, .18, '#776354');

    for (const { u, corner } of f.piers) {
      box('square verandah pier', u, 1.71, -.23, corner ? .8 : .43, 3.15, .40, '#b6b6ad');
      box('pier tiled base', u, .67, -.235, corner ? .8 : .45, 1.08, .44, '#8d8273');
      box('blue grey pier capital', u, 2.9, -.235, corner ? .8 : .48, .72, .45, '#6d8b97');
      box('dark upper pilaster', u, 5.77, -.025, corner ? .8 : .40, 3.28, .09, grey);
      box('pilaster cap', u, 7.42, -.015, corner ? .8 : .53, .12, .10, grey);
    }
    for (let bay = 0; bay < f.bays; bay++) {
      const bw = w / f.bays, centre = (bay + .5) * bw;
      const windows = f.edge === 1 ? [[centre - bw * .22, bw * .18], [centre + bw * .18, bw * .38]] :
        [[centre - bw * .22, bw * .20], [centre + bw * .22, bw * .20]];
      for (const [u, span] of windows) {
        box('window surround', u, 5.40, .014, span + .15, 1.93, .055, trim);
        box('dark upper window', u, 5.40, .050, span, 1.78, .035, '#26302e');
        const panes = span > 1.4 ? 3 : 2;
        for (let j = 1; j < panes; j++) box('window mullion', u - span / 2 + span * j / panes, 5.4, .074, .045, 1.78, .035, '#7e8075');
        box('window transom', u, 5.94, .074, span, .035, .035, '#7e8075');
        box('window sill', u, 4.46, .034, span + .23, .09, .12, '#bdb69f');
      }
      if (f.edge === 1 && bay < 3) {
        box('condenser casing', centre - bw * .20, 4.55, .29, .78, .54, .56, '#bcbdb2');
        box('condenser grille', centre - bw * .20, 4.55, .578, .53, .42, .025, '#474e4c');
        for (let j = 0; j < 7; j++) box('condenser vent', centre - bw * .20, 4.39 + j * .052, .596, .49, .017, .025, '#92998e');
      }
      box('verandah strip light', centre, 3.02, -.62, Math.min(1.2, bw * .5), .055, .08, '#eee5c7', .8);
    }
    for (const setting of settings.filter(s => s.edge === f.edge)) {
      const { u, out } = setting;
      box('pavement table top', u, .89, out, .72, .065, .64, f.edge === 2 ? '#a5b54b' : '#c8413d');
      for (const x of [-.27, .27]) for (const z of [-.23, .23]) box('table leg', u + x, .5, out + z, .033, .73, .033, '#454947');
      for (const side of [-1, 1]) {
        const x = u + side * .64;
        box('black stool seat', x, .58, out, .34, .07, .34, '#292f2d');
        for (const sx of [-.12, .12]) for (const sz of [-.12, .12]) box('stool leg', x + sx, .35, out + sz, .034, .43, .034, '#383f3b');
      }
    }
  }
  for (const review of reviews) world.reviewSpawns.set(review.id, { p: review.p as Point, yaw: review.yaw });
  return true;
}
