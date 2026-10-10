import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { suiYuanJu, suiYuanJuFrame, suiYuanJuLayout, suiYuanJuReviews, levels } from '../src/sui-yuan-ju-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const sources = suiYuanJu.buildingIds.map(id => map.buildings.find(b => b.id === id));
const polys = sources.map(b => b.coordinates.slice(0, -1).map(p => project(p, map.origin)));
const frames = polys.map(suiYuanJuFrame);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Sui Yuan Ju takes the addressed Nos. 4 and 2 Lorong 13, adjacent and facing Lorong 13', () => {
  assert.deepEqual(sources.map(b => b.number), ['4', '2']);
  for (const b of sources) {
    assert.equal(b.street, 'Lorong 13 Geylang'); assert.equal(landmarkFor(b.id).id, 'sui-yuan-ju');
    const way = xml.match(new RegExp('<way id="' + b.id + '"[^>]*>[\\s\\S]*?</way>'))[0];
    const nodes = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => { const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0]; return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])]; });
    assert.deepEqual(b.coordinates, nodes);
  }
  assert.equal(landmarkFor('452646018'), undefined, 'No. 6A stays generic');
  assert.ok(Math.hypot(frames[0].b[0] - frames[1].a[0], frames[0].b[1] - frames[1].a[1]) < 1e-9, 'No. 4 meets No. 2');
  for (const f of frames) {
    assert.ok(Math.abs(f.width - 5.81) < .02);
    const nearest = roadSegments.map(s => ({ ...nearestOnSegment(f.point(f.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
    assert.equal(nearest.name, 'Lorong 13 Geylang');
  }
  assert.match(suiYuanJu.address, /^4 Lorong 13 Geylang/);
  assert.match(suiYuanJu.evidence, /provisional/);
});

test('Sui Yuan Ju fittings stay in their frontages and awnings clear the Lorong 13 carriageway', () => {
  frames.forEach((frame, unit) => {
    const { boxes, awning, sign, porch, pilasters } = suiYuanJuLayout(frame.width, unit);
    for (const box of boxes) {
      assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
      if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
        assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), polys[unit]), true, box.name);
      }
    }
    // The shared central pilaster is split between the two units.
    const party = unit ? pilasters[0] : pilasters.at(-1);
    assert.ok(Math.abs((unit ? party.u - party.w / 2 : party.u + party.w / 2) - (unit ? 0 : frame.width)) < .03);
    assert.equal(!!sign, unit === 0); assert.equal(!!porch, unit === 1);
    if (sign) assert.ok(sign.bottom > awning.top, 'signboard above the awning');
    if (porch) assert.ok(porch.ridge < levels.tiles[0] && porch.eave > awning.top);
    const reach = [frame.point(awning.left, awning.front), frame.point(awning.right, awning.front)];
    for (const s of roadSegments) for (const p of reach) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
  });
});

test('Sui Yuan Ju review starts face the pair and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  const reviews = suiYuanJuReviews(frames[0]);
  assert.deepEqual(reviews.map(r => r.id), ['sui-yuan-ju', 'sui-yuan-ju-upper', 'sui-yuan-ju-porch']);
  for (const { p } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
