import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { kHotel, kHotelFrame, kHotelLayout, kHotelReviews, step, floors } from '../src/k-hotel-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '1223539238');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = kHotelFrame(poly);
const nodePoint = id => {
  const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0];
  return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])];
};
const others = map.buildings.filter(b => b.id !== source.id).map(b => b.coordinates.slice(0, -1).map(p => project(p, map.origin)));

test('K Hotel 1515 keeps the addressed No. 15 outline and drops the stale source name', () => {
  const node = xml.match(/<node id="4302905933"[^>]*>[\s\S]*?<\/node>/)[0];
  assert.match(node, /name" v="Chang Ziang Hotel"/);
  assert.match(node, /addr:housenumber" v="15"/);
  assert.equal(pointInPolygon(nodePoint('4302905933'), source.coordinates), true);
  assert.equal(source.number, '15'); assert.equal(source.street, 'Lorong 15 Geylang');
  assert.doesNotMatch(kHotel.name + kHotel.address, /Chang Ziang/);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['1223539237', '1223539241']) assert.equal(landmarkFor(id), undefined, `neighbour ${id}`);
  const way = xml.match(/<way id="1223539238"[^>]*>[\s\S]*?<\/way>/)[0];
  assert.deepEqual(source.coordinates, [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => nodePoint(id)));
  assert.ok(Math.abs(frame.width - 11.55) < .02);
  // The frontage faces Lorong 15, retained in the source extract but outside the rendered road set.
  const lorong15 = [...xml.matchAll(/<way id="\d+"[^>]*>([\s\S]*?)<\/way>/g)].filter(([, body]) => /k="highway"/.test(body) && /k="name" v="Lorong 15 Geylang"/.test(body))
    .map(([, body]) => [...body.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => project(nodePoint(id), map.origin)));
  assert.ok(lorong15.length > 5);
  assert.equal(map.roads.some(r => r.name === 'Lorong 15 Geylang'), false);
  const toRoad = p => Math.min(...lorong15.flatMap(w => w.slice(1).map((q, i) => nearestOnSegment(p, w[i], q).distance)));
  assert.ok(toRoad(frame.point(frame.width / 2)) < toRoad(frame.point(frame.width / 2, -10)));
  assert.ok(frame.a[1] > frame.b[1], 'u runs north');
});

test('K Hotel geometry stays in its footprint except the forecourt fittings, which clear every other building', () => {
  const { boxes, prisms, columns, apron, sign, lollipop } = kHotelLayout(frame.width);
  const inside = (u, out) => pointInPolygon(frame.point(u, out), poly);
  for (const b of boxes) {
    assert.ok(b.w > 0 && b.h > 0 && b.depth > 0, b.name);
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.ok(inside(b.u + x * (b.w / 2 - .001), b.out + z * (b.depth / 2 - .001)), b.name);
  }
  // Above ground, nothing in the north half projects more than 0.6 m in front of its set-back wall.
  for (const b of boxes.filter(b => b.u - b.w / 2 >= step.u && b.y - b.h / 2 > .2)) assert.ok(b.out + b.depth / 2 <= -step.depth + .6 + 1e-9, b.name);
  for (const p of prisms.filter(p => p.plan.every(([u]) => u >= step.u))) for (const [, out] of p.plan) assert.ok(out <= -step.depth + .7, p.name);
  const forecourt = [...boxes.filter(b => b.out + b.depth / 2 > 0).flatMap(b => [-1, 1].map(s => [b.u + s * b.w / 2, b.out + b.depth / 2])),
    ...prisms.flatMap(p => p.plan), ...columns.map(c => [c.u, c.out + c.d / 2]), [sign.left, sign.out], [sign.right, sign.out], [lollipop.u + lollipop.r, lollipop.out],
    [apron.u0, apron.out1], [apron.u1, apron.out1]];
  for (const [u, out] of forecourt) {
    assert.ok(out <= apron.out1 + 1e-9 && u >= -1e-9 && u <= frame.width + 1e-9);
    for (const o of others) assert.equal(pointInPolygon(frame.point(u, Math.max(out, 0)), o), false);
  }
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const p of [frame.point(apron.u0, apron.out1), frame.point(apron.u1, apron.out1)]) assert.ok(p[0] < high[0] && p[1] > high[1] && p[1] < low[1]);
});

test('K Hotel storeys follow the measured 3 m rhythm under a turret and pediment', () => {
  const { bays, turret, pediment, columns } = kHotelLayout(frame.width);
  assert.equal(bays.length, 16, 'four bays on each of four storeys');
  const levels = [...new Set(bays.map(b => b.window[0]))];
  for (let i = 1; i < levels.length; i++) assert.ok(Math.abs(levels[i] - levels[i - 1] - 3.0) < 1e-9);
  assert.ok(Math.abs(levels[0] - 10.5) < .05, 'first tower window bottom, measured 10.51 m');
  for (const b of bays) assert.ok(b.ledge[1] <= floors.beam[0] && b.panel[0] >= floors.band[1] - 1e-9);
  assert.ok(turret.apex >= 26.2 && turret.apex <= 28.1, 'within the measured turret apex range');
  assert.ok(pediment.apex > pediment.base && pediment.base >= kHotel.height);
  for (const c of columns) assert.ok(c.bottom === floors.band[1] && c.top === floors.beam[0]);
});

test('K Hotel review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  const reviews = kHotelReviews(frame);
  assert.deepEqual(reviews.map(r => r.id), ['k-hotel-1515', 'k-hotel-1515-oblique', 'k-hotel-1515-forecourt', 'k-hotel-1515-top']);
  for (const { p, yaw, pitch } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    assert.ok(pitch > 0 && pitch <= 60);
    const centre = frame.point(frame.width / 2, -.5);
    const facing = Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180);
    assert.ok(facing > .9, 'review looks towards the frontage');
    for (const building of map.buildings) {
      const outline = building.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
