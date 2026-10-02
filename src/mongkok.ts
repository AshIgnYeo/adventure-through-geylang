import * as pc from 'playcanvas';
import type { Point, World } from './world';
import { mongkok, mongkokFrame, mongkokLayout } from './mongkok-layout.mjs';

/** Only the corner receives the real identity. The remaining block stays generic. */
export function buildMongkokCorner(world: World, id: string, source: Point[]): Point[] | null {
  if (id !== mongkok.sourceBuildingId) return null;
  const { corner, remainder } = mongkokLayout(source) as { corner: Point[]; remainder: Point[] };
  const cream = '#e2dfd1', green = '#8ca62e', red = '#8e2737', dark = '#303c39';
  const letters = Array.from('旺角点心').map(letter => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
    const c = canvas.getContext('2d')!;
    c.fillStyle = cream; c.fillRect(0, 0, 256, 256); c.fillStyle = red;
    c.font = '700 205px sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(letter, 128, 137);
    const material = new pc.StandardMaterial(); material.diffuseMap = world.texture(canvas);
    material.cull = pc.CULLFACE_NONE; material.update(); return material;
  });
  const plaster = world.mat(cream); plaster.cull = pc.CULLFACE_NONE; plaster.update();
  for (let edge = 0; edge < corner.length; edge++) {
    world.panel(corner[edge], corner[(edge + 1) % corner.length], .13, mongkok.height, plaster);
  }
  const roof = world.mat('#aaa797'); roof.cull = pc.CULLFACE_NONE; roof.update();
  world.mesh('Mongkok flat roof', corner.flatMap(p => [p[0], mongkok.height, p[1]]), corner.flatMap(() => [0, 0]), [0, 1, 2, 0, 2, 3, 0, 3, 4], roof);

  // The Geylang return and chamfer are evidenced; the unseen rear stays plain.
  for (const edge of [0, 1]) {
    const f = mongkokFrame(corner, edge), w = f.width;
    const pt = (u: number, out = 0) => f.point(u, out) as Point;
    const box = (name: string, u: number, y: number, out: number, width: number, h: number, depth: number, colour: string) => {
      const p = pt(u, out);
      return world.box(`Mongkok ${name}`, p[0], y, p[1], width, h, depth, world.mat(colour), undefined, f.angle);
    };
    const panel = (u: number, width: number, base: number, top: number, out: number, colour: string) => world.panel(pt(u, out), pt(u + width, out), base, top, world.mat(colour));
    // A shallow concrete apron follows the frontage and stops clear of the road.
    const apron = [pt(0), pt(w), pt(w, 1.45), pt(0, 1.45)];
    const paving = world.mat('#92928a'); paving.cull = pc.CULLFACE_NONE; paving.update();
    world.mesh('Mongkok dining apron', apron.flatMap(p => [p[0], .13, p[1]]), [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], paving);
    // Shallow, opaque dining backdrop and public pavement furniture, no invented interior.
    panel(.12, w - .24, .15, 3.12, .035, dark);
    box('green lower beam', w / 2, 3.03, .18, w, .32, .36, green);
    for (const u of [.16, w - .16]) box('green column', u, 1.64, .35, .30, 3.0, .65, green);
    box('red canopy', w / 2, 3.29, mongkok.canopyDepth / 2, w, .12, mongkok.canopyDepth, red);
    box('canopy valance', w / 2, 3.19, mongkok.canopyDepth, w, .21, .06, red);
    box('canopy pale edge', w / 2, 3.31, mongkok.canopyDepth, w, .055, .075, '#d4d5c7');
    for (const y of edge === 1 ? [9.95] : [3.65, 6.78, 9.95]) box('storey band', w / 2, y, .065, w, .11, .13, '#d2c7bf');

    if (edge === 1) {
      for (const y of [5.14, 8.18]) {
        box('window surround', w * .55, y, .06, w * .39 + .12, 1.63, .12, '#bdbdaf');
        box('dark upper glazing', w * .55, y, .14, w * .39, 1.48, .035, '#364c55');
        for (const offset of [-.065, .065]) box('upper window mullion', w * (.55 + offset), y, .18, .04, 1.48, .035, '#626b65');
        box('upper window transom', w * .55, y + .40, .18, w * .39, .04, .035, '#626b65');
        box('small upper opening', w * .17, y + .12, .09, w * .14, .47, .08, '#2c393b');
        box('window sill', w * .55, y - .79, .16, w * .42, .09, .29, '#c5c3b3');
      }
      // Individual original glyphs avoid inventing a horizontal English shop sign.
      for (const [i, material] of letters.entries()) {
        world.panel(pt(w * .81, .085), pt(w * .94, .085), 8.64 - i * .97, 9.49 - i * .97, material);
        world.panel(pt(.34, .41), pt(.90, .41), 2.37 - i * .31, 2.68 - i * .31, material);
      }
    } else {
      for (const base of [4.02, 7.14]) {
        panel(.30, w - .60, base, base + 2.30, .04, '#4d4f47');
        box('balcony lower wall', w / 2, base + .24, .22, w - .46, .48, .30, '#d4c4bd');
        for (let u = .37; u < w - .3; u += .24) box('balcony railing', u, base + .85, .40, .026, .77, .035, '#dedbd0');
        box('balcony top rail', w / 2, base + 1.23, .40, w - .54, .047, .06, cream);
        box('balcony soffit', w / 2, base + 2.32, .25, w, .16, .55, '#d3c1ba');
      }
    }
    // Two sparse settings per frontage. Layout is illustrative, not a seating survey.
    for (const u of [w * .28, w * .70]) {
      box('pale table', u, .88, .90, .72, .06, .58, '#e4dfcf');
      box('table pedestal', u, .49, .90, .07, .72, .07, '#62645d');
      box('table base', u, .15, .90, .45, .05, .38, '#62645d');
      for (const side of [-1, 1]) {
        const seat = u + side * .62;
        box('chair seat', seat, .56, .87, .34, .065, .34, '#343936');
        box('chair back', seat, .84, 1.03, .34, .48, .045, '#343936');
        for (const x of [-.13, .13]) for (const z of [-.13, .13]) box('chair leg', seat + x, .32, .87 + z, .035, .43, .035, '#535953');
      }
    }
  }
  const front = mongkokFrame(corner, 1);
  world.reviewSpawns.set(mongkok.id, { p: front.point(front.width / 2, 14) as Point, yaw: front.angle });
  const side = mongkokFrame(corner, 0);
  world.reviewSpawns.set('mongkok-dim-sum-side', { p: side.point(side.width / 2, 12) as Point, yaw: side.angle });
  return remainder;
}
