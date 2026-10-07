import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { normalStainless, qianjing, pairFrame, pairLayout, pairReviews, measuredSplit } from '../src/sims-north-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const outline = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(p => project(p, map.origin));
const p131 = outline('439168811'), p133 = outline('439168787');
const frame = pairFrame(p131, p133);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Nos. 131 and 133 Sims Avenue each carry their listed identity on the tagged way', () => {
  for (const [place, id, number] of [[normalStainless, '439168811', '131'], [qianjing, '439168787', '133']]) {
    const b = map.buildings.find(b => b.id === id);
    assert.equal(b.number, number); assert.equal(b.street, 'Sims Avenue');
    assert.equal(landmarkFor(id).id, place.id);
  }
  // QianJing's point is inside No. 133; the displaced Normal Stainless point falls in No. 127 and is not used.
  assert.equal(pointInPolygon([103.8779886, 1.3142791], map.buildings.find(b => b.id === '439168787').coordinates), true);
  assert.equal(pointInPolygon([103.8779151, 1.3142433], map.buildings.find(b => b.id === '439168660').coordinates), true);
  assert.equal(landmarkFor('439168660'), undefined);
  assert.match(normalStainless.evidence, /displaced into No\. 127/);
  assert.ok(Math.abs(frame.width - 11.02) < .03 && Math.abs(frame.split - 5.51) < .02);
  // The measured party wall sits east of the equal source split, inside No. 133's way.
  assert.ok(measuredSplit > frame.split && measuredSplit < frame.width);
});

test('Sims pair fittings stay inside the two outlines and clear the carriageway', () => {
  const { boxes, nssSign, qjSign } = pairLayout(frame.width);
  const inside = (u, out) => pointInPolygon(frame.point(u, out), p131) || pointInPolygon(frame.point(u, out), p133);
  for (const b of boxes) {
    assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
    if (b.out + b.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) assert.ok(inside(b.u + x * (b.w / 2 - .03), b.out + z * (b.depth / 2 - .001)), b.name);
  }
  assert.ok(nssSign.right < measuredSplit && qjSign.left > measuredSplit);
  for (const b of boxes.filter(b => b.out + b.depth / 2 > 0)) for (const s of [-1, 1]) {
    const p = frame.point(b.u + s * b.w / 2, b.out + b.depth / 2);
    for (const r of roadSegments) assert.ok(nearestOnSegment(p, r.a, r.b).distance > roadWidth(r.road) / 2, b.name);
  }
});

test('Sims pair review starts stand inside the study, south of the boundary-straddling frontages', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of pairReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
    }
    assert.ok(Math.abs(yaw) < 40 || Math.abs(yaw) > 320, 'looking north');
  }
});
