import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { project, roadWidth, nearestOnSegment } from './geo.mjs';
import { alleyRoutes, alleyReviews, alleyElevations, alleyElevationFrame, alleyBins, alleyEntranceEnclosure, alleyFrame } from './temple-alley-layout.mjs';

/** Source-aligned paving. Separate from main roads so no lane markings or frontages migrate. */
export function buildAlleyGround(world: World) {
  for (const road of world.data.contextRoads) {
    const points = road.coordinates.map(p => project(p, world.data.origin) as Point);
    for (let i = 1; i < points.length; i++) {
      world.strip(points[i - 1], points[i], roadWidth(road) + 3, .04, world.mat('#939387'));
      world.strip(points[i - 1], points[i], roadWidth(road), .075, world.ground);
    }
  }
  for (const f of alleyRoutes(world.data)) {
    const p = (s: number, out = 0) => f.point(s, out) as Point;
    // Original concrete variation, no photographed pixels or painted traffic lanes.
    for (let s = 0; s < f.length; s += 3.2) {
      const end = Math.min(s + 3.2, f.length);
      const quad = [p(s, -f.widthAt(s) / 2), p(s, f.widthAt(s) / 2), p(end, f.widthAt(end) / 2), p(end, -f.widthAt(end) / 2)];
      const material = world.mat(['#97978a', '#929488', '#9b998c'][Math.floor(s / 3.2) % 3]);
      material.cull = pc.CULLFACE_NONE; material.update();
      world.mesh('alley tapered paving', quad.flatMap(p => [p[0], .125, p[1]]), quad.flatMap(p => p), [0, 1, 2, 0, 2, 3], material);
    }
    for (const side of [-1, 1]) {
      const offset = (s: number) => side * (f.widthAt(s) / 2 - .09);
      for (let s = 0; s < f.length; s += 1) {
        const end = Math.min(s + 1, f.length);
        world.strip(p(s, offset(s)), p(end, offset(end)), .15, .107, world.mat('#5a625d'));
      }
      for (let s = 2; s < f.length - 1; s += 7) {
        for (let k = 0; k < 7; k++) { const d = s + k * .085; world.strip(p(d, offset(d) - .072), p(d, offset(d) + .072), .03, .136, world.mat('#8b9289')); }
      }
    }
  }
  // Estimated hardstanding between the retained rear walls and narrow lane.
  // The source footprint setbacks are preserved even where imagery looks tighter.
  const routes = alleyRoutes(world.data);
  const paving = world.mat('#929184'); paving.cull = pc.CULLFACE_NONE; paving.update();
  for (const elevation of alleyElevations) {
    if (elevation.style === 'low') continue; // No broad forecourt at the narrow entrance.
    const f = alleyElevationFrame(world.data, elevation);
    const edge = [f.a, f.b], near = edge.map(p => routes.map(route => nearestOnSegment(p, route.a, route.b)).sort((a, b) => a.distance - b.distance)[0].point);
    const quad = [...edge, ...near.reverse()];
    world.mesh('alley estimated rear hardstanding', quad.flatMap(p => [p[0], .098, p[1]]), quad.flatMap(p => p), [0, 1, 2, 0, 2, 3], paving);
  }
  const footway = routes[1];
  world.strip(footway.point(0, -.8) as Point, footway.point(12, -.8) as Point, .3, .102, paving);
  // The two strips meet at their shared OSM node. Fill the small bend without a curb.
  const joint = alleyRoutes(world.data)[0].b as Point;
  world.box('alley pedestrian junction', joint[0], .102, joint[1], 1.42, .045, 1.42, world.mat('#929488'));
}

/** The small northern neighbour has a single-storey tiled roof in April 2024.
 * Preserve its whole source outline; attach no tenant or business identity. */
export function buildAlleyLowContext(world: World, id: string, poly: Point[]) {
  if (id !== '1223407890') return false;
  const wall = world.mat('#d5d0bc'); wall.cull = pc.CULLFACE_NONE; wall.update();
  for (let i = 0; i < poly.length; i++) world.panel(poly[i], poly[(i + 1) % poly.length], .13, 3.35, wall);
  const mid = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const east = mid(poly[0], poly[1]), west = mid(poly[2], poly[3]);
  const roof = world.mat('#986c50'); roof.cull = pc.CULLFACE_NONE; roof.update();
  const seam = world.mat('#b18864'); seam.cull = pc.CULLFACE_NONE; seam.update();
  const face = (points: Point[], heights: number[], material: pc.Material) => {
    const indices = points.length === 3 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3];
    world.mesh('alley low neighbour roof', points.flatMap((p, i) => [p[0], heights[i], p[1]]), points.flatMap(p => p), indices, material);
  };
  face([poly[1], poly[2], west, east], [3.37, 3.37, 4.45, 4.45], roof);
  face([poly[3], poly[0], east, west], [3.37, 3.37, 4.45, 4.45], roof);
  face([poly[0], poly[1], east], [3.35, 3.35, 4.45], wall);
  face([poly[2], poly[3], west], [3.35, 3.35, 4.45], wall);
  // Original tile seams across each slope, estimated spacing and ridge height.
  for (let t = 0; t <= 1; t += .018) {
    const mix = (a: Point, b: Point): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const ridge = mix(east, west);
    for (const [a, b] of [[poly[1], poly[2]], [poly[0], poly[3]]]) {
      const eave = mix(a, b), across = .026;
      world.mesh('alley tile seam', [eave[0] - across, 3.39, eave[1], eave[0] + across, 3.39, eave[1], ridge[0] + across, 4.47, ridge[1], ridge[0] - across, 4.47, ridge[1]], [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], seam);
    }
  }
  // Separate authored side enclosure follows the close wall seen in the supplied
  // Street View. Its estimated lean-to closes the 6–7 m gap in the first pass.
  const enclosure = alleyEntranceEnclosure(world.data);
  const outline = enclosure.outline as Point[];
  world.footprints.push(outline);
  for (let i = 1; i < outline.length; i++) {
    world.panel(outline[i], outline[(i + 1) % outline.length], .13, enclosure.eaves, wall);
  }
  face(outline, [enclosure.sourceEaves, enclosure.sourceEaves, enclosure.eaves, enclosure.eaves], roof);
  face([outline[1], outline[2], outline[1]], [enclosure.eaves, enclosure.eaves, enclosure.sourceEaves], wall);
  face([outline[0], outline[3], outline[0]], [enclosure.eaves, enclosure.eaves, enclosure.sourceEaves], wall);
  // One neutral shutter faces Lorong 11, as in the supplied photograph.
  const front = alleyFrame(outline[2], outline[1]), frontWidth = Math.min(2.4, front.length - .8);
  const frontBox = (name: string, y: number, w: number, h: number, out: number, colour: string) => {
    const p = front.point(front.length / 2, out);
    world.box(`alley entrance front ${name}`, p[0], y, p[1], w, h, .05, world.mat(colour), undefined, front.angle);
  };
  frontBox('frame', 1.4, frontWidth + .18, 2.62, .025, '#c0bba6');
  frontBox('opaque shutter', 1.4, frontWidth, 2.44, .065, '#989e91');
  for (let y = .25; y < 2.6; y += .13) frontBox('shutter rib', y, frontWidth, .022, .095, '#b6b9a9');
  const side = enclosure.wall;
  const box = (name: string, s: number, y: number, w: number, h: number, depth: number, colour: string) => {
    const p = side.point(s, .035);
    world.box(`alley entrance ${name}`, p[0], y, p[1], w, h, depth, world.mat(colour), undefined, side.angle);
  };
  box('weathered plinth', 6, .38, 12, .5, .06, '#999b89');
  box('green gutter', 6, 3.04, 12, .13, .18, '#637b63');
  // Plain opaque side treatment, with a small service panel and drainpipes.
  // Remove the previous full-length row of invented roller shutters here.
  box('closed service panel', 3.3, 1.24, .75, 2.15, .055, '#989e91');
  for (const s of [.5, 10.8]) box('downpipe', s, 1.57, .065, 2.85, .065, '#b6b9a9');
  for (let t = 0; t <= 1; t += .025) {
    const a: Point = [outline[0][0] + (outline[1][0] - outline[0][0]) * t, outline[0][1] + (outline[1][1] - outline[0][1]) * t];
    const b: Point = [outline[3][0] + (outline[2][0] - outline[3][0]) * t, outline[3][1] + (outline[2][1] - outline[3][1]) * t];
    world.mesh('alley entrance roof seam', [a[0] - .025, 3.38, a[1], a[0] + .025, 3.38, a[1], b[0] + .025, 3.08, b[1], b[0] - .025, 3.08, b[1]], [0, 0, 1, 0, 1, 1, 0, 1], [0, 1, 2, 0, 2, 3], seam);
  }
  return true;
}

/** Conservative opaque rear treatments; exact openings and equipment are illustrative. */
export function buildAlleyExteriors(world: World) {
  for (const elevation of alleyElevations) {
    if (elevation.style === 'low') continue; // Authored enclosure replaces this exposed side.
    const f = alleyElevationFrame(world.data, elevation);
    const p = (s: number, out = 0) => f.point(s, out) as Point;
    const box = (name: string, s: number, y: number, w: number, h: number, d: number, out: number, colour: string) => {
      const q = p(s, out);
      return world.box(`alley ${name}`, q[0], y, q[1], w, h, d, world.mat(colour), undefined, f.angle);
    };
    const wall = world.mat(elevation.colour); wall.cull = pc.CULLFACE_NONE; wall.update();
    world.panel(p(0, .03), p(f.length, .03), .13, elevation.height, wall);
    box('wall plinth', f.length / 2, .34, f.length, .4, .075, .07, '#919486');
    box('eave coping', f.length / 2, elevation.height - .12, f.length, .2, .22, .09, '#c4c1ac');
    const bays = Math.max(2, Math.floor(f.length / 4.5));
    for (let bay = 0; bay < bays; bay++) {
      const s = (bay + .5) * f.length / bays, width = Math.min(2.7, f.length / bays - 1);
      if (elevation.style !== 'plain' || bay === 0) {
        box('closed service opening surround', s, 1.48, width + .15, 2.65, .09, .075, '#bdbdac');
        box('opaque shutter', s, 1.47, width, 2.5, .08, .13, '#8f9690');
        for (let row = 0; row < 19; row++) box('shutter rib', s, .3 + row * .127, width, .024, .026, .18, '#b2b6a9');
      }
      for (let floor = 1; elevation.style !== 'plain' && floor < elevation.floors; floor++) {
        const y = floor * 3.25 + 1.42;
        box('upper window surround', s, y, width + .18, 1.35, .09, .08, '#ece7d3');
        box('opaque upper pane', s, y, width, 1.17, .08, .14, '#56696a');
        for (const x of [-width / 6, width / 6]) box('window mullion', s + x, y, .05, 1.2, .045, .195, '#afb7b0');
        box('window shade', s, y + .77, width + .3, .09, .38, .19, '#d1ccb5');
      }
      // Only the visually inspected entrance buildings receive service equipment.
      if ((elevation.style === 'block' || elevation.style === 'shophouse') && bay % 2 === 0) {
        box('condenser housing', s + .65, 3.18, .85, .52, .36, .23, '#c7c9bc');
        for (let l = 0; l < 6; l++) box('condenser grille', s + .65, 2.99 + l * .069, .7, .022, .03, .427, '#727f7a');
      }
    }
    for (const s of [.35, f.length - .35]) {
      box('downpipe', s, elevation.height / 2, .075, elevation.height - .2, .075, .13, '#b2b6a8');
      for (let y = .9; y < elevation.height; y += 2.1) box('pipe bracket', s, y, .14, .055, .1, .13, '#777f76');
    }
    if (elevation.style === 'block' || elevation.style === 'shophouse') {
      box('wall light bracket', f.length * .6, 3.8, .065, .12, .45, .26, '#64726a');
      box('wall light', f.length * .6, 3.77, .42, .08, .2, .43, '#dfd5ad');
      box('utility cabinet', .95, 1.72, .46, .68, .18, .16, '#a1aaa3');
    }
  }
  for (const bin of alleyBins(world.data)) {
    const p = bin.p;
    world.box('alley unbranded bin', p[0], .54, p[1], .57, .84, .53, world.mat('#526d5c'), undefined, bin.angle);
    world.box('alley bin lid', p[0], .99, p[1], .64, .09, .6, world.mat('#778c72'), undefined, bin.angle);
    world.footprints.push(bin.outline as Point[]);
  }
  for (const {id, p, yaw} of alleyReviews(world.data)) world.reviewSpawns.set(id, {p: p as Point, yaw});
}
