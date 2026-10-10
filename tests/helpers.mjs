// Shared checks for models, against the rendered map (authored footprints applied).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { withAuthoredFootprints } from '../src/authored-footprints.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

export const sourceMap = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
export const map = withAuthoredFootprints(sourceMap);
export const building = id => map.buildings.find(b => b.id === id);
export const outline = id => building(id).coordinates.slice(0, -1).map(p => project(p, map.origin));
export const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));
export const nearestRoad = p => roadSegments.map(s => ({ ...nearestOnSegment(p, s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
export const sharesCorners = (p, q) => p.filter(a => q.some(b => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6)).length;

/** Boxes stay within the frontage; anything behind the front line stays inside the outline. */
export function assertFittings(frame, poly, boxes, slack = 1e-8) {
  for (const b of boxes) {
    if (!b.roll) assert.ok(b.u - b.w / 2 >= -slack && b.u + b.w / 2 <= frame.width + slack, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.equal(pointInPolygon(frame.point(b.u + x * (b.w / 2 - .01), b.out + z * (b.depth / 2 - .001)), poly), true, b.name);
  }
}

/** Points that project over the street stay clear of the estimated carriageway. */
export function assertClearOfCarriageway(points) {
  for (const s of roadSegments) for (const p of points) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
}

/** Review starts are inside the study margins, outside every rendered footprint, and the first faces the frontage. */
export function assertReviews(frame, reviews) {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false, b.id);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28, b.id);
    }
    assert.ok(Number.isFinite(yaw));
  }
  const [front] = reviews, centre = frame.point(frame.width / 2, 0);
  assert.ok(Math.cos((front.yaw - Math.atan2(front.p[0] - centre[0], front.p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
}
