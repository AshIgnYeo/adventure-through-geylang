import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { authoredFootprintGroups, withAuthoredFootprints } from '../src/authored-footprints.mjs';
import { project, unproject, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const source = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const map = withAuthoredFootprints(source);
const poly = b => b.coordinates.slice(0, -1).map(c => project(c, map.origin));
const area = o => Math.abs(o.reduce((s, p, i) => { const q = o[(i + 1) % o.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0)) / 2;
const authored = map.buildings.filter(b => b.geometrySource === 'authored-estimate');

test('unproject inverts project to well under a millimetre', () => {
  for (const p of [[-38.26, 19.94], [111.3, -127.2], [0, 0]]) {
    const q = project(unproject(p, map.origin), map.origin);
    assert.ok(Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6);
  }
});

test('authored groups replace existing source ways, keep them for provenance and use fresh ids', () => {
  const sourceIds = new Set(source.buildings.map(b => b.id));
  for (const g of authoredFootprintGroups) {
    assert.ok(g.approved && g.question && g.evidence.length > 40, g.id);
    for (const id of g.replaces) { assert.ok(sourceIds.has(id), id); assert.ok(map.replacedBuildings.some(b => b.id === id)); assert.equal(map.buildings.some(b => b.id === id), false); }
  }
  for (const b of authored) assert.equal(sourceIds.has(b.id), false, b.id);
  assert.equal(new Set(map.buildings.map(b => b.id)).size, map.buildings.length);
  assert.equal(source.buildings.length, 154, 'map.json itself is unchanged');
});

test('authored outlines stay off the roads and clear of the buildings they do not replace', () => {
  const kept = map.buildings.filter(b => !b.geometrySource).map(poly);
  const segments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => [project(r.coordinates[i], map.origin), project(p, map.origin)]));
  for (const b of authored) {
    const o = poly(b), c = o.reduce((s, p) => [s[0] + p[0] / o.length, s[1] + p[1] / o.length], [0, 0]);
    assert.ok(area(o) > 10, b.id);
    for (const k of kept) assert.equal(pointInPolygon(c, k), false, `${b.id} centre inside another building`);
    for (const p of o) for (const [a, q] of segments) assert.ok(nearestOnSegment(p, a, q).distance > 2.5, `${b.id} corner on a carriageway`);
  }
});

test('the Lorong 11 west row is re-spaced into twelve measured frontages along the source front', () => {
  const row = authored.filter(b => b.group === 'lorong-11-west-row');
  assert.deepEqual(row.map(b => b.number), ['15', '17', '19', '21', '23', '25', '27', '29', '29A', '31', '33', '35']);
  const replaced = map.replacedBuildings.filter(b => authoredFootprintGroups[0].replaces.includes(b.id));
  const total = row.reduce((s, b) => s + area(poly(b)), 0), before = replaced.reduce((s, b) => s + area(poly(b)), 0);
  // The plan area grows only by the 0.66 m end extension at the source depth.
  assert.ok(Math.abs(total - before - .66 * 24.32) < 1, `${total - before}`);
  // Front widths match the measured party lines.
  const widths = row.map(b => { const o = poly(b); return Math.hypot(o[1][0] - o[0][0], o[1][1] - o[0][1]); });
  const expected = [9.3, 5.2, 5.3, 5.2, 6.0, 6.1, 7.2, 4.0, 5.9, 3.7, 6.3, 6.9];
  expected.forEach((w, i) => assert.ok(Math.abs(widths[i] - w) < .02, `${row[i].number}: ${widths[i]}`));
  // Neighbours share their party-line corners exactly.
  for (let i = 1; i < row.length; i++) {
    const a = poly(row[i - 1]), b = poly(row[i]);
    assert.equal(b.filter(p => a.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6)).length, 2, row[i].number);
  }
  for (const b of row) assert.equal(b.street, 'Lorong 11 Geylang');
});

test('Geylang Road Nos. 255–267 are re-spaced on the source front, leaving Leong Kee untouched', () => {
  const row = authored.filter(b => b.group === 'geylang-253-267');
  assert.deepEqual(row.map(b => b.number), ['255', '257', '259', '261', '263', '267']);
  for (const id of ['454254212', '454254213', '454254214']) assert.ok(map.buildings.some(b => b.id === id), 'Leong Kee keeps its source ways');
  const leongKee = poly(map.buildings.find(b => b.id === '454254212')), first = poly(row[0]);
  assert.equal(first.filter(p => leongKee.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6)).length, 2, 'No. 255 meets Leong Kee');
  const widths = row.slice(0, 5).map(b => { const o = poly(b); return Math.hypot(o[1][0] - o[0][0], o[1][1] - o[0][1]); });
  [5.18, 5.2, 5.25, 5.85, 5.4].forEach((w, i) => assert.ok(Math.abs(widths[i] - w) < .02, `${row[i].number}: ${widths[i]}`));
  for (let i = 1; i < row.length; i++) assert.equal(poly(row[i]).filter(p => poly(row[i - 1]).some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6)).length, 2, row[i].number);
  // The chamfered Shi Hao corner reaches about 2.1 m past the source east edge and stays clear of Lorong 13.
  const corner = poly(row[5]), sourceEast = project(source.buildings.find(b => b.id === '454254205').coordinates[2], map.origin);
  assert.equal(corner.length, 5);
  const reach = Math.max(...corner.map(p => (p[0] - sourceEast[0]) * .9857 + (p[1] - sourceEast[1]) * -.1684));
  assert.ok(Math.abs(reach - 2.09) < .1, `${reach}`);
});
