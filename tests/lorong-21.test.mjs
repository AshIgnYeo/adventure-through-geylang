import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 21 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 21 brings in its own buildings, its corners and the Sims Avenue houses back to Lorong 19', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const west = ['454254167', '1223524387', '1223524388', '1223524384', '1223524383', '1223524382', '1223524385', '1223524386', '454254329', '454254330'];
  const east = ['454254164', '454254165', '454254160', '454254144'];
  const sims = ['454254331', '454254332', '454254333', '454254334', '454254335', '454254336', '454254337', '454254338'];
  for (const id of [...west, ...east, ...sims]) assert.ok(ids.has(id), id);
  // The Lorong Bachok row, the block behind the Geylang Road corner and the part north of Sims Avenue wait.
  for (const id of ['454254328', '454254242', '454254353', '454254366']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 21 Geylang').length, 20);
});

test('Lorong 21 is walkable from the Geylang Road centreline to the Sims Avenue centreline, and back to Lorong 19 along both', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  for (const name of ['Geylang Road, Lorong 19 to Lorong 21', 'Sims Avenue, Lorong 19 to Lorong 21']) walkable(corridor(name).path.map(p => project(p, sourceMap.origin)), inStudy);
  // The backs of the blocks either side stay outside: between Lorong 19 and Lorong 21 (behind Bougainvilla, and the
  // back lane between the Lorong Bachok and Sims Avenue rows), and the HCSA compound east of the lane.
  for (const p of [[265, -40], [270, -125], [350, -60], [360, -120]]) assert.equal(inStudy(p, 0), false, `${p}`);
});
