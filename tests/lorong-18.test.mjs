import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 18 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 18 brings in its own buildings, its corners and the Geylang Road block back to Lorong 16', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const geylang = ['541941365'];
  const west = ['454274650', '454274632', '764372568', '764372567', '764372566', '454274634', '764372565', '454274635', '454274637',
    '454274639', '454274640', '764372564', '764372563', '454274642', '764372562', '454274643', '764372561', '454274645'];
  const east = ['454438314', '764372560', '764372559', '1470917582', '764372541', '121872891', '764372540'];
  for (const id of [...geylang, ...west, ...east]) assert.ok(ids.has(id), id);
  // Geylang Road east of No. 350, the Westerhout Road row, the stub south of it and the Lorong 16 rows wait.
  for (const id of ['764372558', '454438307', '764372539', '454274544', '764372525', '763764683', '121872890', '763764666']) assert.equal(ids.has(id), false, id);
  // The lane's eight ways, Westerhout Road's mouths either side of it, and Geylang Road on past the junction.
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 18 Geylang').length, 8);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Westerhout Road').map(r => r.id).sort(), ['23513327', '644902167']);
  for (const id of ['660071186', '666816964']) assert.equal(sourceMap.roads.find(r => r.id === id)?.name, 'Geylang Road', id);
});

test('Lorong 18 is walkable from the Geylang Road centreline to the Westerhout Road centreline, and back to Lorong 21 along Geylang Road', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Westerhout Road', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  const link = corridor('Geylang Road, Lorong 21 to Lorong 18');
  walkable(link.path.map(p => project(p, sourceMap.origin)), inStudy);
  // The link meets the Lorong 21 link where it starts, 17 m east of Lorong 21's junction.
  assert.deepEqual(link.path.at(-1), corridor('Geylang Road, Lorong 19 to Lorong 21').path[0]);
  // The backs of the blocks either side stay outside: the service lane behind the west row, the back of the Geylang Road
  // block, the service road behind the east side, and the stub south of Westerhout Road.
  for (const p of [[330, 150], [305, 70], [410, 120], [390, 275]]) assert.equal(inStudy(p, 0), false, `${p}`);
});
