import * as pc from 'playcanvas';
import type { Point, World } from './world';
import { leongKeeExterior as layout, leongKeeSideEdges, leongKeeRearUpper, sideFrame } from './leong-kee-layout.mjs';

const plaster = '#e0dccb', trim = '#b29a70', dark = '#353c39';

/** Publicly visible dining furniture. Dimensions and arrangement are estimates. */
export function leongKeeTable(world: World, point: (u: number, d: number) => Point, u: number, d: number, angle: number) {
  const box = (name: string, x: number, y: number, z: number, w: number, h: number, depth: number, colour: string) => {
    const p = point(x, z); world.box(name, p[0], y, p[1], w, h, depth, world.mat(colour), undefined, angle);
  };
  box('coffeeshop pale table top', u, .91, d, .78, .055, .72, '#d9d9cd');
  box('coffeeshop table pedestal', u, .52, d, .075, .74, .075, '#717b77');
  box('coffeeshop table foot', u, .20, d, .56, .055, .42, '#717b77');
  for (const side of [-1, 1]) {
    const x = u + side * .70;
    box('coffeeshop dark stool seat', x, .60, d, .36, .075, .36, '#44453e');
    for (const sx of [-.13, .13]) for (const sz of [-.13, .13]) box('coffeeshop stool leg', x + sx, .38, d + sz, .043, .40, .043, '#626861');
  }
}

function sideTools(world: World, edge: Point[]) {
  const f = sideFrame([edge[0], edge[1]]), point = (s: number, out = 0) => f.point(s, out) as Point;
  const box = (name: string, s: number, y: number, out: number, w: number, h: number, depth: number, colour: string) => {
    const p = point(s, out); return world.box(name, p[0], y, p[1], w, h, depth, world.mat(colour), undefined, f.angle);
  };
  const panel = (start: number, end: number, base: number, top: number, out: number, colour: string) => world.panel(point(end, out), point(start, out), base, top, world.mat(colour));
  const arch = (s: number, span: number, base: number, rise: number, out: number, colour: string) => {
    const p = point(s, out), positions = [p[0], base, p[1]], indices: number[] = [];
    for (let i = 0; i <= 16; i++) {
      const q = point(s + Math.cos(i * Math.PI / 16) * span / 2, out);
      positions.push(q[0], base + Math.sin(i * Math.PI / 16) * rise, q[1]);
      if (i) indices.push(0, i, i + 1);
    }
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update();
    world.mesh('coffeeshop side arch', positions, Array(positions.length / 3 * 2).fill(0), indices, mat);
  };
  const shutter = (s: number, span: number, ornate: boolean, base = 4.08, top = 5.91) => {
    panel(s - span / 2 - .10, s + span / 2 + .10, base - .08, top + .02, .05, trim);
    panel(s - span / 2, s + span / 2, base, top, .11, dark);
    for (let row = 0; row < 16; row++) box('coffeeshop side louvre', s, base + .09 + row * (top - base - .18) / 15, .16, span - .09, .026, .04, '#555951');
    box('coffeeshop paired shutter stile', s, (base + top) / 2, .18, .052, top - base, .05, '#6c6c5b');
    arch(s, span + .38, top, .36, .08, trim);
    arch(s, span + .06, top, .23, .12, ornate ? '#95815f' : plaster);
    if (ornate) {
      for (const x of [-.3, 0, .3]) box('coffeeshop fanlight perforation', s + x * span, top + .09, .16, .045, .06, .025, dark);
      box('coffeeshop ornate window head', s, top - .10, .13, span + .46, .16, .20, trim);
      for (const x of [-1, 1]) {
        const t = s + x * (span / 2 + .36);
        panel(t - .13, t + .13, base + .23, top - .33, .08, '#709a8c');
        for (let row = 0; row < 5; row++) box('coffeeshop ivory tile motif', t, base + .34 + row * .22, .13, .10, .10, .025, '#eee6ce').rotateLocal(0, 0, 45);
      }
    }
    box('coffeeshop side window sill', s, base - .08, .14, span + .28, .09, .28, trim);
  };
  return { ...f, point, box, panel, arch, shutter };
}

/** Four unequal bays, two on the corner and two on the source rear context. */
function sideElevation(world: World, edge: Point[], rear: boolean) {
  const { length: len, point, angle, box, panel, shutter } = sideTools(world, edge);
  panel(0, len, 3.12, layout.eaves, .02, plaster);
  // Shallow sheltered exterior only, with an opaque back wall hiding private space.
  panel(0, len, .15, 3.13, -layout.recess, '#777b70');
  const floorDepth = layout.recess + layout.pavementOuter;
  box('coffeeshop sheltered pavement', len / 2, .13, (layout.pavementOuter - layout.recess) / 2, len, .16, floorDepth, '#a6a89b');
  box('coffeeshop portico soffit', len / 2, 3.12, -.8, len, .12, 2.0, '#c3c2af');
  const split = len * .52;
  for (const s of [.17, split, len - .17]) {
    box('coffeeshop side pilaster', s, 5.07, .09, .28, 3.75, .22, trim);
    box('coffeeshop side capital', s, 6.53, .19, .48, .25, .33, trim);
    box('coffeeshop side column', s, 1.65, .02, .34, 2.96, .44, plaster);
    box('coffeeshop column plinth', s, .45, .06, .52, .55, .58, '#c4c4b2');
    box('coffeeshop column capital', s, 2.85, .06, .55, .22, .57, '#cecdbb');
    for (const t of [-.10, .10]) box('coffeeshop column flute', s + t, 1.8, .26, .035, 1.73, .025, trim);
  }
  if (rear) {
    for (const t of [.17, .30, .43]) shutter(len * t, 1.06, false);
    const s = len * .77;
    panel(s - .28, s + .28, 4.93, 5.49, .10, '#789486');
    for (const x of [-.13, .13]) for (const y of [5.07, 5.33]) box('coffeeshop square vent opening', s + x, y, .13, .12, .12, .035, dark);
  } else {
    for (const t of [.17, .36, .68, .87]) shutter(len * t, 1.26, true);
  }
  for (const [start, end] of [[.4, split - .3], [split + .3, len - .4]]) {
    panel(start, end, 3.43, 3.92, .10, '#eeead8');
    // Original low-relief geometry suggests the observed bands without copying sculpture.
    for (let s = start + .28; s < end - .20; s += .5) {
      box('coffeeshop relief lozenge', s, 3.68, .13, .19, .07, .035, '#d4d4bf').rotateLocal(0, 0, 28);
      box('coffeeshop relief leaf', s + .14, 3.74, .14, .10, .055, .035, '#d4d4bf').rotateLocal(0, 0, -35);
    }
  }
  for (const [y, h, depth] of [[3.23, .12, .40], [3.34, .06, .33], [4.0, .09, .25], [6.66, .17, .43], [6.87, .10, .50]]) box('coffeeshop side cornice', len / 2, y, .14, len, h, depth, trim);
  for (let s = .16; s < len; s += .26) box('coffeeshop side dentil', s, 6.78, .22, .10, .14, .28, trim);
  if (!rear) box('coffeeshop side roof eave', len / 2, 7.07, .40, len + .15, .13, .93, '#785646');
  // A mesh fixes the slope explicitly: high at the wall, low towards the street.
  const canopyVertices = [[0, .02, 3.27], [len, .02, 3.27], [len, layout.canopyOutset, 2.79], [0, layout.canopyOutset, 2.79]];
  const mat = world.mat('#655858'); mat.cull = pc.CULLFACE_NONE; mat.update();
  world.mesh('coffeeshop sloping brown canopy', canopyVertices.flatMap(([s, out, y]) => {const p = point(s, out); return [p[0], y, p[1]];}), [0,0,1,0,1,1,0,1], [0,1,2,0,2,3], mat);
  box('coffeeshop canopy pale edging', len / 2, 2.79, layout.canopyOutset, len, .045, .04, '#c6c2b1');
  for (let s = .11; s < len; s += .22) box('coffeeshop canopy scalloped valance', s, 2.735 + .015 * Math.cos(s * 8), layout.canopyOutset, .215, .10, .035, '#716360');
  for (const t of layout.tables) {
    // Furniture stays inside the mapped footprint, visible through the open edge.
    leongKeeTable(world, point, len * t, layout.tableOffset, angle);
  }
  for (const [start, end] of [[.4, split - .7], [split + .7, len - .4]]) {
    for (const s of [start, end]) box('coffeeshop railing upright', s, .66, -.35, .045, 1.03, .045, '#9da5a0');
    for (const y of [.63, 1.14]) box('coffeeshop railing', (start + end) / 2, y, -.35, end - start, .04, .045, '#9da5a0');
  }
  for (const s of [.22, len - .24]) box('coffeeshop rainwater pipe', s, 5.13, .33, .07, 3.74, .07, '#c7c7b9');
}

export function buildLeongKeeSide(world: World) {
  const edges = leongKeeSideEdges(world.data);
  sideElevation(world, edges.corner as Point[], false);
  // Source polygons leave a small gap. This shallow, explicitly estimated visual
  // continuation joins the observed canopy; source and collision outlines stay intact.
  const join = sideTools(world, edges.join as Point[]);
  join.panel(0, join.length, 3.12, layout.eaves, .02, plaster);
  join.box('coffeeshop joining cornice', join.length / 2, 6.87, .14, join.length, .10, .50, trim);
  join.box('coffeeshop joining canopy', join.length / 2, 3.03, .69, join.length, .075, 1.46, '#655858').rotateLocal(19, 0, 0);
  // Close only the shallow portico back, leaving the source gap unoccupied.
  join.panel(0, join.length, .15, 3.12, -layout.recess, '#777b70');
}

/** Adjacent visible architecture only, no extension of the Leong Kee identity. */
export function buildLeongKeeRearContext(world: World, id: string, poly: Point[]) {
  if (id !== layout.rearContextId) return false;
  const upper = leongKeeRearUpper(poly) as Point[];
  const faceMat = world.mat(plaster); faceMat.cull = pc.CULLFACE_NONE; faceMat.update();
  const cap = (outline: Point[], y: number, colour: string) => {
    const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update();
    world.mesh('coffeeshop rear context roof', outline.flatMap(p => [p[0], y, p[1]]), outline.flatMap(() => [0,0]), [0,1,2,0,2,3], mat);
  };
  for (let i = 0; i < poly.length; i++) {
    if (i !== 0) world.panel(poly[i], poly[(i + 1) % poly.length], .15, layout.eaves, faceMat);
    world.panel(upper[i], upper[(i + 1) % upper.length], layout.eaves, layout.rearTop, faceMat);
  }
  cap(poly, layout.eaves, '#b9b6a8'); cap(upper, layout.rearTop, '#a9a698');
  sideElevation(world, [poly[0], poly[1]], true);
  const side = sideTools(world, [upper[0], upper[1]]);
  for (const [base, top] of [[7.66, 9.16], [10.15, 11.65]]) {
    for (const t of [.22, .39]) side.shutter(side.length * t, .98, false, base, top);
    const s = side.length * .78;
    side.panel(s - .24, s + .24, base + .6, base + 1.08, .08, '#788c7c');
    for (const x of [-.11, .11]) for (const y of [base + .71, base + .96]) side.box('rear context vent', s + x, y, .13, .10, .10, .025, dark);
    side.box('rear context storey course', side.length / 2, top + .58, .06, side.length, .11, .25, trim);
  }
  return true;
}
