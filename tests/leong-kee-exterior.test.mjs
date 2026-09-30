import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { landmarkFor } from '../src/landmarks.mjs';
import { leongKeeExterior as layout, leongKeeSideEdges, leongKeeRearUpper, sideFrame } from '../src/leong-kee-layout.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';
import { authoredSiteFrame, shanYuanTang } from '../src/authored-sites.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const polygon = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const roads = map.roads.flatMap(r => r.coordinates.slice(1).map((b, i) => ({a: project(r.coordinates[i], map.origin), b: project(b, map.origin), width: roadWidth(r)})));

test('Leong Kee side follows the retained outlines and keeps rear context separate from the named premises', () => {
  const original = JSON.stringify(map), edges = leongKeeSideEdges(map);
  const corner = polygon(layout.cornerId), rear = polygon(layout.rearContextId);
  assert.deepEqual(edges.corner, [corner[3], corner[0]]);
  assert.deepEqual(edges.rear, [rear[0], rear[1]]);
  assert.deepEqual(edges.join, [corner[0], rear[0]]);
  const upper = leongKeeRearUpper(rear);
  assert.ok(upper.every(p => pointInPolygon(p, rear)));
  assert.equal(landmarkFor(layout.rearContextId), undefined, 'context does not establish coffee shop tenancy');
  assert.equal(JSON.stringify(map), original);
});

test('side dining furniture clears opaque backing, source boundaries and carriageways', () => {
  const edges = leongKeeSideEdges(map);
  for (const [key, id] of [['corner', layout.cornerId], ['rear', layout.rearContextId]]) {
    const f = sideFrame(edges[key]), poly = polygon(id);
    for (const t of layout.tables) {
      // Envelope includes table and both stools, in the rendered side frame.
      for (const along of [-.9, .9]) for (const across of [-.37, .37]) {
        const out = layout.tableOffset + across, p = f.point(t * f.length + along, out);
        assert.ok(out > -layout.recess && out < layout.pavementOuter);
        assert.ok(pointInPolygon(p, poly), `${key}: furniture stays inside source outline`);
        for (const road of roads) assert.ok(nearestOnSegment(p, road.a, road.b).distance > road.width / 2, `${key}: furniture clears road`);
      }
    }
  }
});

test('all coffeeshop inspection starts clear the temple and retained building collisions', () => {
  const poly = polygon(layout.cornerId), a = poly[3], b = poly[2], w = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const dx = (b[0] - a[0]) / w, dz = (b[1] - a[1]) / w;
  const outlines = [...map.buildings.map(b => polygon(b.id)), authoredSiteFrame(shanYuanTang, map.origin).outline];
  for (const { id, position: [u, d] } of layout.reviews) {
    const p = [a[0] + dx * u - dz * d, a[1] + dz * u + dx * d];
    for (const outline of outlines) {
      assert.equal(pointInPolygon(p, outline), false, id);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28, id);
    }
  }
});
