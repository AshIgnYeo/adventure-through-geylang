import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hainanLim, hainanLimFrame, hainanLimLayout, hainanLimReviews, storeys } from '../src/hainan-lim-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '1223773760');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = hainanLimFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('No. 19 Lorong 13 is the unnumbered way directly north of the addressed No. 17', () => {
  assert.equal(source.street, 'Lorong 13 Geylang'); assert.equal(source.number, null);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  const no17 = map.buildings.find(b => b.id === '454254295');
  assert.equal(no17.number, '17'); assert.equal(landmarkFor(no17.id).id, 'muhammadiyah-college');
  // No. 17 is the next footprint south: the source ways are not snapped, but no
  // other building lies between them along Lorong 13.
  const p17 = no17.coordinates.slice(0, -1).map(p => project(p, map.origin));
  const gap = Math.min(...p17.map(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1])));
  assert.ok(gap < 2.5, `gap ${gap.toFixed(2)} m`);
  const between = frame.point(-gap / 2, -1);
  for (const b of map.buildings) assert.equal(pointInPolygon(between, b.coordinates.slice(0, -1).map(p => project(p, map.origin))), false);
  const way = xml.match(/<way id="1223773760"[^>]*>[\s\S]*?<\/way>/)[0];
  const nodes = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => { const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0]; return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])]; });
  assert.deepEqual(source.coordinates, nodes);
  assert.ok(Math.abs(frame.width - 14.17) < .02);
  const nearest = p => roadSegments.map(s => ({ ...nearestOnSegment(p, s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
  assert.match(hainanLim.address, /#04-01/);
});

test('No. 19 storeys follow the measured rhythm and fittings stay in the footprint', () => {
  const order = Object.values(storeys);
  for (let i = 1; i < order.length; i++) assert.ok(Math.abs(order[i][0] - order[i - 1][1]) < 1e-9, 'bands stack without gaps');
  assert.ok(Math.abs(storeys.windows3[0] - storeys.windows2[0] - 3.36) < .01, '3.36 m storey');
  assert.equal(order.at(-1)[1], hainanLim.height);
  const { boxes } = hainanLimLayout(frame.width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  // Only the car-park barrier arm stands forward of the façade, and it clears the carriageway.
  for (const b of boxes.filter(b => b.out + b.depth / 2 > 0)) for (const s of [-1, 1]) {
    const p = frame.point(b.u + s * b.w / 2, b.out + b.depth / 2);
    for (const r of roadSegments) assert.ok(nearestOnSegment(p, r.a, r.b).distance > roadWidth(r.road) / 2, b.name);
  }
});

test('No. 19 review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of hainanLimReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.3);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
