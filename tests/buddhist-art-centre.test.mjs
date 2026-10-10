import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buddhistArtCentre, artCentreFrame, artCentreLayout, artCentreRoof, artCentreReviews } from '../src/buddhist-art-centre-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '454254227');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = artCentreFrame(poly);
const area = points => Math.abs(points.reduce((sum, p, i) => {
  const q = points[(i + 1) % points.length]; return sum + p[0] * q[1] - q[0] * p[1];
}, 0)) / 2;
const nodePoint = id => {
  const n = xml.match(new RegExp('<node\\b[^>]*id="' + id + '"[^>]*>'))[0];
  return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])];
};
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Buddhist Art Centre keeps the single No. 285 outline containing its named source point', () => {
  const node = xml.match(/<node\b[^>]*id="4689499461"[^>]*>[\s\S]*?<\/node>/)[0];
  assert.match(node, /name" v="Buddhist Art Centre"/);
  assert.equal(pointInPolygon(nodePoint('4689499461'), source.coordinates), true);
  // The adjacent Sik Wai Sin point belongs to the next footprint, not No. 285.
  assert.equal(pointInPolygon(nodePoint('4689499460'), source.coordinates), false);
  assert.equal(pointInPolygon(nodePoint('4689499460'), map.buildings.find(b => b.id === '454254228').coordinates), true);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['454254226', '454254228']) assert.notEqual(landmarkFor(id)?.id, buddhistArtCentre.id);
  const way = xml.match(/<way\b[^>]*id="454254227"[^>]*>[\s\S]*?<\/way>/)[0];
  assert.deepEqual(source.coordinates, [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => nodePoint(id)));
  assert.equal(source.number, null, 'the operator address is provenance, not a source-map edit');
  assert.ok(Math.abs(frame.width - 5.13) < .02);
  // The assigned frontage faces Geylang Road, and u = 0 is the No. 283 side.
  const nearest = p => roadSegments.map(s => ({ ...nearestOnSegment(p, s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest(frame.point(frame.width / 2)).name, 'Geylang Road');
  assert.ok(nearest(frame.point(frame.width / 2, 1)).distance < nearest(frame.point(frame.width / 2)).distance);
  const west = map.buildings.find(b => b.id === '454254226').coordinates.slice(0, -1).map(p => project(p, map.origin));
  assert.ok(west.some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < 1e-9));
});

test('Buddhist Art Centre fittings and chandeliers stay within the frontage and clear the carriageway', () => {
  const { boxes, chandeliers, awning, sign } = artCentreLayout(frame.width);
  const D = buddhistArtCentre.fiveFootWay;
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    assert.ok(box.w > 0 && box.h > 0 && box.depth > 0, box.name);
    // Piers meet the street wall line, which pointInPolygon treats as outside: test 1 mm in.
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  assert.equal(chandeliers.length, 2);
  for (const ch of chandeliers) {
    assert.ok(ch.out > -D && ch.out < 0, 'chandeliers hang in the five-foot way');
    assert.ok(ch.rod[1] <= 3.45 && Math.min(...ch.tiers.map(([y, , h]) => y - h / 2)) > 2);
    const reach = Math.max(...ch.tiers.map(([, d]) => d / 2), ...ch.drops.map(([, r]) => r + .025));
    for (const [du, dout] of [[-reach, 0], [reach, 0], [0, -reach], [0, reach]]) assert.equal(pointInPolygon(frame.point(ch.u + du, ch.out + dout), poly), true);
  }
  assert.ok(awning.bottom > 3 && awning.left > 0 && awning.right < frame.width);
  assert.ok(sign.left > 0 && sign.right < frame.width && sign.bottom > 3.45);
  const protrusions = [
    ...boxes.filter(b => b.out + b.depth / 2 > 0).flatMap(b => [-1, 1].map(s => frame.point(b.u + s * b.w / 2, b.out + b.depth / 2))),
    frame.point(awning.left, awning.front), frame.point(awning.right, awning.front),
    frame.point(0, buddhistArtCentre.eavesOverhang), frame.point(frame.width, buddhistArtCentre.eavesOverhang),
  ];
  for (const s of roadSegments) for (const p of protrusions) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
});

test('Buddhist Art Centre roof covers the source outline with a street-facing ridge', () => {
  const roof = artCentreRoof(frame), o = buddhistArtCentre.eavesOverhang;
  const flat = roof.slopes.map(t => t.map(i => [roof.vertices[i][0], roof.vertices[i][2]]));
  // The overhang follows the wall normal; the slightly skewed party walls leave a sliver under 0.01 m².
  assert.ok(Math.abs(flat.reduce((s, t) => s + area(t), 0) - area(poly) - frame.width * o) < .01);
  // Ridge ends sit on the party walls, a third of the way back.
  for (const [p, wall] of [[roof.ridge[0], [frame.a, frame.rearA]], [roof.ridge[1], [frame.b, frame.rearB]]]) {
    assert.ok(nearestOnSegment(p, ...wall).distance < 1e-9);
    assert.ok(Math.abs(nearestOnSegment(p, ...wall).t - buddhistArtCentre.ridgeDepth) < 1e-9);
  }
  for (const v of [roof.vertices[4], roof.vertices[5]]) assert.ok(poly.some(p => Math.hypot(p[0] - v[0], p[1] - v[2]) < 1e-9));
  assert.ok(roof.pitch > 20 && roof.pitch < 35, `front pitch ${roof.pitch}`);
  for (const [a, b, c] of roof.slopes.map(t => t.map(i => roof.vertices[i]))) {
    const ny = (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]);
    assert.ok(ny > 0, 'roof normals face upwards');
  }
});

test('Buddhist Art Centre review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  const reviews = artCentreReviews(frame);
  assert.deepEqual(reviews.map(r => r.id), ['buddhist-art-centre', 'buddhist-art-centre-oblique', 'buddhist-art-centre-five-foot-way', 'buddhist-art-centre-upper']);
  for (const { p, yaw, pitch } of reviews) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    assert.ok(pitch > 0 && pitch < 30);
    const centre = frame.point(frame.width / 2, -.5);
    const facing = Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180);
    assert.ok(facing > .97, 'review looks towards the frontage');
    for (const building of map.buildings) {
      const outline = building.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, outline), false);
      for (let i = 0; i < outline.length; i++) assert.ok(nearestOnSegment(p, outline[i], outline[(i + 1) % outline.length]).distance > .28);
    }
  }
});
