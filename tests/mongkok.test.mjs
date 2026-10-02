import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { mongkok, mongkokLayout, mongkokFrame } from '../src/mongkok-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === mongkok.sourceBuildingId);
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const area = points => Math.abs(points.reduce((s, p, i) => {
  const q = points[(i + 1) % points.length]; return s + p[0] * q[1] - p[1] * q[0];
}, 0)) / 2;

test('Mongkok occupies an estimated corner within the source block, never the whole way', () => {
  const original = structuredClone(poly), { corner, remainder } = mongkokLayout(poly);
  assert.deepEqual(poly, original);
  assert.equal(landmarkFor(source.id), undefined);
  assert.ok(Math.abs(area(corner) + area(remainder) - area(poly)) < 1e-8);
  assert.ok(area(corner) < area(poly) * .55);
  for (const p of corner) assert.ok(poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < 1e-8));
  const namePoint = project([103.8768536, 1.3119953], map.origin);
  assert.equal(pointInPolygon(namePoint, corner), true);
  assert.equal(pointInPolygon(namePoint, remainder), false);
  assert.deepEqual(corner.slice(1, 4), poly.slice(3, 6));
  assert.ok(Math.abs(mongkokFrame(corner, 1).width - 7.244) < .01);
});

test('Mongkok review cameras and canopy remain outside buildings and away from the carriageway', () => {
  const { corner } = mongkokLayout(poly);
  for (const [edge, offset] of [[1, 14], [0, 12]]) {
    const f = mongkokFrame(corner, edge), camera = f.point(f.width / 2, offset);
    const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
    assert.ok(camera[0] > low[0] + 3 && camera[0] < high[0] - 3 && camera[1] > high[1] + 3 && camera[1] < low[1] - 3);
    for (const b of map.buildings) assert.equal(pointInPolygon(camera, b.coordinates.map(p => project(p, map.origin))), false);
    for (const u of [.2, f.width / 2, f.width - .2]) {
      const p = f.point(u, 1.5); // Includes the 1.45 m dining apron.
      assert.equal(pointInPolygon(p, poly), false);
      for (const road of map.roads) for (let i = 1; i < road.coordinates.length; i++) {
        const distance = nearestOnSegment(p, project(road.coordinates[i - 1], map.origin), project(road.coordinates[i], map.origin)).distance;
        assert.ok(distance > roadWidth(road) / 2 + .5, 'canopy stays beyond the estimated road edge');
      }
    }
  }
});
