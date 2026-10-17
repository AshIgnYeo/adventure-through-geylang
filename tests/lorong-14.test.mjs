import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap, outline } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 14 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};
const west = ['121872892', '764372595'];
const east = ['454274618', '454274615', '454274614', '454274611', '454274608', '764372579', '764372578', '454274677', '764372577', '476141643'];
const corner = ['454254175', '454254174', '454254173', '454254172'];
const geylangRow = ['454254171', '454254170', '454254169', '764372576', '475173286', '764372575', '764372574', '764372572', '764372573'];

test('Lorong 14 brings in its own buildings, its east corner block and the Geylang Road row east to Lorong 16', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of [...west, ...east, ...corner, ...geylangRow]) assert.ok(ids.has(id), id);
  // Lorong 16's corner (Nos. 310-314), its west side and the Talma Road row wait for their own walks.
  for (const id of ['764372570', '764372571', '764372569', '763764689', '763764687', '454438325', '454438317']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 14 Geylang').length, 13);
  // Talma Road's east mouth is kept as road.
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Talma Road').map(r => r.id), ['644896804']);
});

test('Lorong 14 is walkable from the Geylang Road centreline to the edge of the extract, and along the forecourt of Nos. 302-308', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  // The mouth shares Lorong 17's node on the Geylang Road centreline; the lane ends where the extract's last way does.
  assert.ok(shares('Geylang Road', lane.path[0]) && shares('Lorong 17 Geylang', lane.path[0]));
  assert.ok(shares('Talma Road', sourceMap.roads.find(r => r.id === '644896804').coordinates.at(-1)) && lane.path.some(p => shares('Talma Road', p)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  walkable(corridor('Geylang Road, the forecourt of Nos. 302-308').path.map(p => project(p, sourceMap.origin)), inStudy);
  // The Geylang Road faces from No. 284 to No. 308 are inside the corridors, a metre in front of each.
  for (const id of [...corner, ...geylangRow]) {
    const o = outline(id), [a, b] = o.map((p, i) => [p, o[(i + 1) % o.length]]).sort((x, y) => Math.min(x[0][1], x[1][1]) + Math.max(x[0][1], x[1][1]) - Math.min(y[0][1], y[1][1]) - Math.max(y[0][1], y[1][1]))[0];
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 1];
    assert.ok(inStudy(mid, 0), id);
  }
  // The backs of the blocks either side stay outside: behind the east side towards Lorong 16, behind Wing Fong Court
  // and Wing Fong Mansions towards Lorong 12, and the back lane behind the Geylang Road row.
  for (const p of [[245, 150], [240, 212], [150, 140], [165, 262], [240, 95]]) assert.equal(inStudy(p, 0), false, `${p}`);
  // The lane's last way ends at the extract's edge, about 1.3108 N; the lane runs on south beyond it (question 52).
  assert.ok(Math.abs(lane.path.at(-1)[1] - 1.3108) < .0002);
});
