import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { rrMotor, rrMotorFrame, rrMotorLayout, rrMotorReviews } from '../src/rr-motor-layout.mjs';
import { artCentreFrame } from '../src/buddhist-art-centre-layout.mjs';
import { eatFirst } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const polys = rrMotor.buildingIds.map(outline), frames = polys.map(rrMotorFrame);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('RR Motor holds the two unnumbered frontages west of the Buddhist Art Centre, in order', () => {
  for (const id of rrMotor.buildingIds) assert.equal(landmarkFor(id), landmarkFor(rrMotor.buildingIds[0]));
  assert.equal(landmarkFor('454254224').id, 'eros', 'No. 279 west of RR Motor is the separately signed Eros frontage');
  // No. 281 meets No. 283, and No. 283 meets the Buddhist Art Centre.
  assert.ok(Math.hypot(frames[0].b[0] - frames[1].a[0], frames[0].b[1] - frames[1].a[1]) < 1e-9);
  const bac = artCentreFrame(outline('454254227'));
  assert.ok(Math.hypot(frames[1].b[0] - bac.a[0], frames[1].b[1] - bac.a[1]) < 1e-9);
  for (const f of frames) assert.ok(Math.abs(f.width - 5.13) < .02);
  // The 2017 Eros point is inside No. 281's way but is documented as stale, not used.
  const node = xml.match(/<node id="4689499462"[^>]*>[\s\S]*?<\/node>/)[0];
  assert.match(node, /name" v="Eros"/);
  assert.match(rrMotor.evidence, /Eros point inside way 454254225 is stale/);
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(rrMotor[k], eatFirst[k]);
});

test('RR Motor fittings stay inside each frontage and the signboard is continuous', () => {
  const sb = rrMotor.signboard, spans = [];
  frames.forEach((frame, unit) => {
    const { boxes, sign, downpipeOffset } = rrMotorLayout(frame.width, unit);
    assert.equal(downpipeOffset, null);
    for (const box of boxes) {
      assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
      if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
        assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), polys[unit]), true, box.name);
      }
    }
    // Geylang Road's estimated carriageway edge runs along this pair's pier line, so
    // cornices and eaves overhang the kerb as they do in reality; only fittings within
    // reach of traffic must clear it.
    const protrusions = boxes.filter(b => b.out + b.depth / 2 > 0 && b.y - b.h / 2 < 3).flatMap(b => [-1, 1].map(s => frame.point(b.u + s * b.w / 2, b.out + b.depth / 2)));
    const kerb = Math.min(...roadSegments.filter(s => s.road.name === 'Geylang Road').map(s => nearestOnSegment(frame.point(frame.width / 2), s.a, s.b).distance));
    assert.ok(kerb > 7.9 && kerb < 8.3, `pier line ${kerb.toFixed(2)} m from the centreline`);
    for (const s of roadSegments) for (const p of protrusions) assert.ok(nearestOnSegment(p, s.a, s.b).distance > roadWidth(s.road) / 2);
    spans.push([sign.left + unit * frame.width, sign.right + unit * frame.width, sign.uv]);
    assert.ok(sign.out < -.55, 'hung behind the pier fronts');
  });
  // Texture coordinates continue across the central pier without a jump.
  const scale = sb.to - sb.from;
  for (const [a, b, uv] of spans) assert.ok(Math.abs((a - sb.from) / scale - uv[0]) < 1e-9 && Math.abs((b - sb.from) / scale - uv[1]) < 1e-9);
});

test('RR Motor review starts face the pair and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of rrMotorReviews(frames[0])) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frames[0].point(frames[0].width, -.5);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
