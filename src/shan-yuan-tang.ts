import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { authoredSiteFrame, shanYuanTang as site } from './authored-sites.mjs';

type Vertex = [number, number, number];

/** Original exterior geometry. All site dimensions are documented estimates. */
export function buildShanYuanTang(world: World) {
  const frame = authoredSiteFrame(site, world.data.origin);
  // Fit the drafted proportions to the estimated 10.4 m site width.
  // The geographic frame and depth remain in metres.
  const across = site.width / 11.8;
  const point = (u: number, v: number) => frame.point([u * across, v]) as Point;
  const red = '#a94039', cream = '#e5dbbe', green = '#20564c';
  const box = (name: string, u: number, y: number, v: number, w: number, h: number, d: number, colour: string) => {
    const p = point(u, v);
    return world.box(`shan ${name}`, p[0], y, p[1], w * across, h, d, world.mat(colour), undefined, site.rotation);
  };
  const panel = (a: Point, b: Point, base: number, top: number, material: pc.Material) => world.panel(point(...a), point(...b), base, top, material);
  const sign = (text: string, a: Point, b: Point, base: number, height: number, bg: string, fg: string) => {
    const width = Math.hypot((b[0] - a[0]) * across, b[1] - a[1]);
    panel(a, b, base, base + height, world.textMaterial(text, bg, fg, 0, width / height));
  };

  // A small set of shared meshes keeps tiled roofs from becoming thousands of entities.
  const surfaces = new Map<string, { positions: number[]; indices: number[] }>();
  const meshFor = (colour: string) => {
    if (!surfaces.has(colour)) surfaces.set(colour, { positions: [], indices: [] });
    return surfaces.get(colour)!;
  };
  const face = (vertices: Vertex[], colour: string) => {
    const mesh = meshFor(colour), offset = mesh.positions.length / 3;
    for (const [u, y, v] of vertices) { const p = point(u, v); mesh.positions.push(p[0], y, p[1]); }
    for (let i = 1; i < vertices.length - 1; i++) mesh.indices.push(offset, offset + i, offset + i + 1);
  };
  const mix = (a: Vertex, b: Vertex, t: number): Vertex => a.map((v, i) => v + (b[i] - v) * t) as Vertex;
  // Low-poly round tile ridges, including capped eave ends.
  const tube = (a: Vertex, b: Vertex, radius: number, colour: string) => {
    const direction = new pc.Vec3(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize();
    const normal = new pc.Vec3().cross(direction, Math.abs(direction.y) > .9 ? pc.Vec3.RIGHT : pc.Vec3.UP).normalize();
    const binormal = new pc.Vec3().cross(direction, normal).normalize();
    const ring = (p: Vertex, i: number): Vertex => {
      const t = i * Math.PI / 3;
      return [p[0] + radius * (normal.x * Math.cos(t) + binormal.x * Math.sin(t)), p[1] + radius * (normal.y * Math.cos(t) + binormal.y * Math.sin(t)), p[2] + radius * (normal.z * Math.cos(t) + binormal.z * Math.sin(t))];
    };
    for (let i = 0; i < 6; i++) face([ring(a, i), ring(a, i + 1), ring(b, i + 1), ring(b, i)], colour);
    face(Array.from({ length: 6 }, (_, i) => ring(a, i)), colour);
    face(Array.from({ length: 6 }, (_, i) => ring(b, 5 - i)), colour);
  };

  /** Curved hip roof, four slopes with original tile seams and round caps. */
  const roof = (u: number, v: number, width: number, depth: number, eave: number, rise: number, fine = false) => {
    const x0 = u - width / 2, x1 = u + width / 2, z0 = v - depth / 2, z1 = v + depth / 2;
    const ridgeHalf = Math.abs(width - depth) / 2;
    const r0: Vertex = width >= depth ? [u - ridgeHalf, eave + rise, v] : [u, eave + rise, v - ridgeHalf];
    const r1: Vertex = width >= depth ? [u + ridgeHalf, eave + rise, v] : [u, eave + rise, v + ridgeHalf];
    const corners: Vertex[] = [[x0, eave, z0], [x1, eave, z0], [x1, eave, z1], [x0, eave, z1]];
    const ridges = width >= depth ? [[r0, r1], [r1, r1], [r1, r0], [r0, r0]] : [[r0, r0], [r0, r1], [r1, r1], [r1, r0]];
    const colours = fine ? ['#286751', '#34755c', '#215d4c'] : ['#446c50', '#527956', '#3c644b'];
    for (let side = 0; side < 4; side++) {
      const a = corners[side], b = corners[(side + 1) % 4], [ra, rb] = ridges[side];
      const count = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[2] - a[2]) / (fine ? .23 : .32)));
      const rows = Math.max(2, Math.round(Math.min(width, depth) / .65));
      const surface = (across: number, up: number): Vertex => {
        const edge = mix(a, b, across), ridge = mix(ra, rb, across), p = mix(edge, ridge, up);
        p[1] = eave + rise * (.48 * up + .52 * up * up) + .07 * Math.pow(1 - up, 5);
        return p;
      };
      for (let col = 0; col < count; col++) {
        for (let row = 0; row < rows; row++) {
          const left = col / count, right = (col + 1) / count, low = row / rows, high = (row + 1) / rows;
          // Skip a collapsed final quad on triangular hip ends.
          const p = [surface(left, low), surface(right, low), surface(right, high), surface(left, high)];
          if (ra === rb && row === rows - 1) p.pop();
          face(p, colours[(col * 7 + row * 3 + side) % colours.length]);
          const c = surface(left, low), d = surface(right, low); c[1] += .023; d[1] += .023;
          tube(c, d, .023, colours[1]);
        }
      }
      for (let col = 0; col <= count; col++) {
        for (let row = 0; row < rows; row++) {
          const a = surface(col / count, row / rows), b = surface(col / count, (row + 1) / rows);
          a[1] += .035; b[1] += .035;
          if (Math.hypot(b[0] - a[0], b[2] - a[2]) > .025) tube(a, b, fine ? .057 : .043, colours[1]);
        }
      }
      tube(a, b, .08, colours[0]);
    }
    if (ridgeHalf > .01) tube(r0, r1, .12, fine ? '#46816a' : '#668368');
    // Plain ridge caps retain silhouette; no invented religious figures.
    for (const r of [r0, r1]) tube([r[0], r[1], r[2]], [r[0], r[1] + .15, r[2]], .11, '#758b70');
  };

  world.footprints.push(frame.outline as Point[]);
  // A solid, closed site is intentional: only exterior viewing is supported.
  face(site.outline.map(([u, v]) => [u / across, .12, v] as Vertex), '#978a74');
  for (const review of site.reviews) {
    const p = frame.point(review.position as Point) as Point, target = frame.point(review.target as Point);
    world.reviewSpawns.set(review.id, { p, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI });
  }

  // Cream upper mass is stepped in plan, as visible from Lorong 11.
  box('main hall', 5.9, 3.18, 12.25, 9.7, 6.1, 15.9, cream);
  box('front wing', 5.9, 2.87, 4.25, 9.7, 5.5, 3.1, cream);
  box('rear return', 8.65, 3.23, 21.45, 4.2, 6.2, 3.4, cream);
  box('main fascia', 5.9, 6.27, 12.25, 10.2, .22, 16.4, red);
  roof(5.9, 12.25, 10.7, 17.0, 6.36, 1.65);
  box('front fascia', 5.9, 5.60, 4.15, 10.15, .20, 3.7, red);
  roof(5.9, 4.15, 10.6, 4.15, 5.70, .88);
  box('rear fascia', 8.65, 6.34, 21.5, 4.65, .20, 3.85, red);
  roof(8.65, 21.5, 5.05, 4.2, 6.44, 1.0);

  // Framed, opaque shuttered windows on front and Lorong 11 elevations.
  const shutter = (u: number, v: number, y: number, side = false, width = 1.08) => {
    const faceBox = (name: string, horizontal: number, vertical: number, w: number, h: number, depth: number, colour: string) => {
      if (side) box(name, u + depth, y + vertical, v + horizontal, .07, h, w, colour);
      else box(name, u + horizontal, y + vertical, v - depth, w, h, .07, colour);
    };
    faceBox('window relief', 0, 0, width + .30, 1.90, .035, '#f0e5cd');
    faceBox('window red frame', 0, 0, width, 1.60, .08, red);
    for (const x of [-width / 4, width / 4]) {
      faceBox('window transom pane', x, .53, width * .32, .32, .13, '#3b5350');
      faceBox('shutter panel', x, -.23, width * .32, .95, .13, '#e4d8bc');
      for (let i = 0; i < 8; i++) faceBox('shutter louvre', x, -.65 + i * .12, width * .32, .026, .17, '#b6b5a0');
    }
    faceBox('window sill', 0, -.86, width + .33, .10, .19, '#f0e5cd');
  };
  for (const u of [2.65, 6.0, 9.15]) shutter(u, 2.68, 4.35);
  for (const [v, y] of [[4.4, 4.35], [9.2, 4.91], [14.1, 4.91]]) shutter(10.76, v, y, true);
  // Broad group of red framed panes at the rear of the side elevation.
  panel([10.80, 16.55], [10.80, 20.0], 4.04, 5.58, world.mat('#ddd9be'));
  for (let i = 0; i <= 5; i++) box('side window mullion', 10.86, 4.81, 16.55 + 3.45 * i / 5, .10, 1.66, .07, red);
  for (const y of [4.0, 5.20, 5.62]) box('side window rail', 10.86, y, 18.275, .10, .07, 3.58, red);
  panel([10.87, 16.55], [10.87, 20.0], 5.24, 5.56, world.mat('#405750'));

  // Low roof over the wall-side gallery, with the upper house rising behind it.
  roof(5.9, 2.35, 10.6, 2.25, 3.0, .7);
  roof(10.7, 11.0, 2.2, 17.4, 2.92, .73);

  // Dark green walls with red piers and plain framed insets. The photographed
  // narrative murals are intentionally left blank, not invented or copied.
  const wall = (a: Point, b: Point, bays: number, insets: boolean) => {
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const dx = (b[0] - a[0]) / length, dv = (b[1] - a[1]) / length;
    const nx = dv, nv = -dx;
    panel(a, b, .15, 2.30, world.mat(green));
    for (let i = 0; i <= bays; i++) {
      const u = a[0] + dx * length * i / bays, v = a[1] + dv * length * i / bays;
      box('boundary pier', u, 1.28, v, .30, 2.3, .30, red);
    }
    for (let i = 0; i < bays; i++) {
      const start = length * i / bays + .42, end = length * (i + 1) / bays - .42;
      if (!insets || end - start < .7) continue;
      const at = (d: number, offset: number): Point => [a[0] + dx * d + nx * offset, a[1] + dv * d + nv * offset];
      panel(at(start - .05, .025), at(end + .05, .025), .66, 1.92, world.mat('#b4ab85'));
      panel(at(start, .04), at(end, .04), .71, 1.87, world.mat('#d5ccb2'));
    }
    // Twin roof slopes and regular round eave ends along the wall.
    const left = (d: number, offset: number, y: number): Vertex => [a[0] + dx * d + nx * offset, y, a[1] + dv * d + nv * offset];
    const rows = Math.max(1, Math.round(length / .22));
    for (let i = 0; i < rows; i++) {
      const s = length * i / rows, e = length * (i + 1) / rows;
      for (const direction of [-1, 1]) {
        face([left(s, direction * .48, 2.31), left(e, direction * .48, 2.31), left(e, 0, 2.64), left(s, 0, 2.64)], '#26654f');
        tube(left(s, direction * .49, 2.34), left(s, 0, 2.67), .07, '#43816a');
      }
    }
    tube(left(0, 0, 2.66), left(length, 0, 2.66), .085, '#386e55');
  };
  wall([0, 0], [3.8, 0], 2, true);
  wall([7.45, 0], [10.6, 0], 2, true);
  wall([10.6, 0], [11.8, 1.2], 1, true);
  wall([11.8, 1.2], [11.8, 24.6], 7, false);
  wall([0, 25.5], [0, 0], 7, false);
  box('alley cream corner return', 11.70, 1.62, 25.05, .18, 2.98, .9, cream);
  // Q10: April 2024 view along the rear passage shows cream plaster, small
  // red-framed openings and a shallow green shade. Retain the estimated site.
  box('alley rear wall', 5.9, 1.62, 25.40, 11.8, 2.98, .18, cream);
  box('alley rear fascia', 5.9, 3.21, 25.44, 11.8, .16, .26, red);
  for (const u of [2.1, 4.4, 6.7, 9.0]) {
    box('alley window frame', u, 2.62, 25.515, 1.35, .64, .05, red);
    box('alley opaque window', u, 2.62, 25.548, 1.13, .46, .035, '#55615a');
    box('alley window mullion', u, 2.62, 25.577, .045, .48, .025, red);
  }
  // Shallow roof stays above head height and clear of the footway centreline.
  face([[0, 3.27, 25.05], [11.8, 3.27, 25.05], [11.8, 3.08, 25.82], [0, 3.08, 25.82]], '#396d50');
  for (let u = 0; u <= 11.8; u += .25) tube([u, 3.29, 25.05], [u, 3.10, 25.82], .045, '#608467');

  // Compact red entrance pavilion, closed with an opaque grille backing.
  const gate = 5.625;
  box('gate left pier', 4.03, 1.98, .10, .55, 3.70, .70, red);
  box('gate right pier', 7.22, 1.98, .10, .55, 3.70, .70, red);
  box('gate lintel', gate, 3.43, .10, 3.73, .77, .70, red);
  box('closed gate backing', gate, 1.53, .20, 2.66, 2.78, .12, '#5c2827');
  for (let i = 0; i <= 16; i++) box('gate upright', 4.31 + 2.63 * i / 16, 1.56, -.05, .030, 2.82, .04, '#c57e61');
  for (let i = 0; i <= 13; i++) box('gate rail', gate, .20 + i * .208, -.06, 2.68, .027, .04, '#c57e61');
  box('gate centre stile', gate, 1.58, -.08, .09, 2.85, .06, red);
  sign('堂 緣 善', [4.34, -.265], [6.91, -.265], 3.08, .65, '#222a27', '#d8bc72');
  sign('249', [7.0, -.265], [7.43, -.265], 2.47, .20, red, '#dec69b');
  box('gate cornice', gate, 3.94, .08, 4.1, .24, 1.2, '#af4d40');
  roof(gate, .08, 4.7, 2.35, 4.08, 1.12, true);
  // Subtle original tile joints on the gate piers, count and spacing estimated.
  for (const u of [4.03, 7.22]) for (let y = .35; y < 3.06; y += .22) box('gate tile joint', u, y, -.257, .54, .008, .008, '#b65349');

  for (const [colour, data] of surfaces) {
    const material = world.mat(colour); material.cull = pc.CULLFACE_NONE; material.update();
    world.mesh('shan tiled roof and site', data.positions, Array(data.positions.length / 3 * 2).fill(0), data.indices, material);
  }
}
