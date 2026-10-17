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
  assert.equal(source.buildings.length, 296, 'map.json itself is unchanged (206 since the open question 26 widening, 217 with Lorong 17, 242 with Lorong 19, 264 with Lorong 21, 296 with Lorong 16)');
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

test('No. 237 is split at the step into the Lorong 9 corner building and an annex flush with Chen Hing', () => {
  const corner = poly(map.buildings.find(b => b.id === 'gr-237')), annex = poly(map.buildings.find(b => b.id === 'gr-237-annex'));
  const chenHing = poly(map.buildings.find(b => b.id === '475158359'));
  const shared = (p, q) => p.filter(a => q.some(b => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6)).length;
  assert.equal(shared(corner, annex), 2, 'the split wall');
  assert.ok(shared(annex, chenHing) >= 2, 'the annex meets Chen Hing');
  const before = area(poly(source.buildings.find(b => b.id === '454274485')));
  // The pair covers the source way plus the filled front step, less the corner chamfer.
  assert.ok(area(corner) + area(annex) > before + 30 && area(corner) + area(annex) < before + 45, "the filled front step adds about 39 m²");
  const front = Math.hypot(corner[1][0] - corner[0][0], corner[1][1] - corner[0][1]);
  assert.ok(Math.abs(front - (10.23 - 2.6 / Math.SQRT2)) < .05, `${front}`);
});

test('the 229–233 block is split by measured widths into three strips that tile the source outline', () => {
  const ids = ['gr-233', 'gr-231', 'gr-229'], parts = ids.map(id => poly(map.buildings.find(b => b.id === id)));
  const before = area(poly(source.buildings.find(b => b.id === '475158360')));
  assert.ok(Math.abs(parts.reduce((s, p) => s + area(p), 0) - before) < .01, 'the strips tile the source outline');
  const fronts = parts.map(p => Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]));
  [6.15, 4.3, 5.33].forEach((w, i) => assert.ok(Math.abs(fronts[i] - w) < .03, `${ids[i]}: ${fronts[i]}`));
  // No. 233 keeps the shared wall with the Frog Porridge corner.
  const frog = poly(map.buildings.find(b => b.id === '453797927'));
  assert.ok(parts[0].filter(a => frog.some(b => Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6)).length >= 4);
});

test('Sims Avenue Nos. 106–110 are re-spaced at the measured 106/108 pier, joining 108 and 110 into one unit', () => {
  const a = poly(map.buildings.find(b => b.id === 'sa-106')), b = poly(map.buildings.find(b => b.id === 'sa-108'));
  const before = ['682928753', '682928752', '682928751'].reduce((s, id) => s + area(poly(source.buildings.find(x => x.id === id))), 0);
  assert.ok(Math.abs(area(a) + area(b) - before) < 1.5, 'the pair keeps the source plan area');
  const front = o => Math.hypot(o[1][0] - o[0][0], o[1][1] - o[0][1]);
  assert.ok(Math.abs(front(a) - 8.71) < .03 && Math.abs(front(b) - 12.17) < .03, `${front(a)} ${front(b)}`);
  for (const id of ['682928754', '682928750']) assert.ok(map.buildings.some(x => x.id === id), 'Fok Wai Kee and Amrise keep their source ways');
});

test('the merged Lorong 15 block is split around the measured Hotel 81 Spring frontage', () => {
  const parts = ['l15-28a', 'l15-26a', 'l15-22', 'l15-20e', 'l15-20', 'l15-shed'].map(id => poly(map.buildings.find(b => b.id === id)));
  const before = area(poly(source.buildings.find(b => b.id === '454254281')));
  assert.ok(Math.abs(parts.reduce((s, p) => s + area(p), 0) - before) < .01, 'the strips tile the source block');
  const hotel = parts[2], frontLen = Math.hypot(hotel[3][0] - hotel[2][0], hotel[3][1] - hotel[2][1]);
  assert.ok(Math.abs(frontLen - 16.2) < .02, `${frontLen}`);
});

test('Lorong 11 Nos. 1–7 are merged behind a 5 m forecourt', () => {
  const o = poly(map.buildings.find(b => b.id === 'l11-1-7'));
  const before = ['1223407887', '1223407888', '1223407889', '1223407890'].reduce((s, id) => s + area(poly(source.buildings.find(b => b.id === id))), 0);
  assert.ok(Math.abs(area(o) - (before - 21.07 * 5)) < 2, `${area(o)} vs ${before}`);
  assert.equal(o.length, 4);
});

test('Gems Ville replaces the older 6A way with a 27.4 × 26 m footprint that meets Sui Yuan Ju', () => {
  const o = poly(map.buildings.find(b => b.id === 'l13-8'));
  assert.ok(Math.abs(area(o) - 27.4 * 26) < 1, `${area(o)}`);
  const no4 = poly(map.buildings.find(b => b.id === '1223454593'));
  const near = p => Math.min(...no4.map((q, i) => nearestOnSegment(p, q, no4[(i + 1) % no4.length]).distance));
  assert.ok(near(o[1]) < .4, 'its south front corner meets the No. 4 party line');
});
