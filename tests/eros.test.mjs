import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { eros, erosFrame, erosLayout, erosReviews } from '../src/eros-layout.mjs';
import { ktvFrame } from '../src/ktv-277-layout.mjs';
import { rrMotorFrame } from '../src/rr-motor-layout.mjs';
import { eatFirst } from '../src/eat-first-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const poly = outline('454254224'), frame = erosFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Eros takes No. 279, between the 277 KTV pair and RR Motor at No. 281', () => {
  assert.deepEqual(landmarkFor('454254224').buildingIds, ['454254224']);
  assert.equal(landmarkFor('454254221'), undefined, 'the closed Zui Xiang frontage at No. 273 stays generic');
  // No. 277 (the KTV pair's east unit) meets No. 279, and No. 279 meets No. 281.
  const ktv = ktvFrame(outline('454254223')), rr = rrMotorFrame(outline('454254225'));
  assert.ok(Math.hypot(ktv.b[0] - frame.a[0], ktv.b[1] - frame.a[1]) < 1e-9);
  assert.ok(Math.hypot(frame.b[0] - rr.a[0], frame.b[1] - rr.a[1]) < 1e-9);
  assert.ok(Math.abs(frame.width - 5.13) < .02);
  // Its Maps point lies behind the row and is not used for the assignment.
  assert.equal(pointInPolygon([103.8781466, 1.3127085], map.buildings.find(b => b.id === '454254224').coordinates), false);
  assert.match(eros.evidence, /displaced behind the row and is not used/);
  for (const k of ['height', 'ridgeHeight', 'ridgeDepth', 'eavesOverhang', 'fiveFootWay']) assert.equal(eros[k], eatFirst[k]);
});

test('Eros fittings stay within the frontage and follow the measured order', () => {
  const { boxes, sign, led, quilt, blade } = erosLayout(frame.width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  // The signboard is proud of the cornice; the lit board, glass door and timber door run west to east on the back wall.
  assert.ok(sign.out > .24 && sign.left > 0 && sign.right < frame.width && sign.top < 4.26);
  assert.ok(led.right < eros.glassDoor[0] + .01 && eros.display[1] < eros.glassDoor[0] && eros.glassDoor[1] < eros.timberDoor[0]);
  assert.ok(led.bottom > eros.doorHead && led.top < 3.62, 'the lit board sits between the door heads and the ceiling');
  assert.ok(quilt.u > 0 && quilt.from < quilt.to && quilt.to <= -.55, 'the quilted return stays behind the west pier');
  // The triangulated blade sign hangs on the party pilaster, high above the pavement. The estimated
  // carriageway edge here is only about 0.33 m in front of the façade, while the photographed pavement
  // is about 2 m deep, so the sign keeps its measured 1.0 m projection and is checked by height instead.
  assert.ok(blade.u > 0 && blade.u < .2 && blade.bottom > 4 && blade.top < eros.height && blade.from > 0 && blade.to <= 1.0);
  const edge = Math.min(...roadSegments.map(s => nearestOnSegment(frame.point(frame.width / 2), s.a, s.b).distance - roadWidth(s.road) / 2));
  assert.ok(edge > .3 && edge < .4, 'the estimated carriageway edge documented above');
  assert.ok(pointInPolygon(frame.point(blade.u, blade.to), poly) === false && blade.bottom > 4);
});

test('Eros review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of erosReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.5);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
