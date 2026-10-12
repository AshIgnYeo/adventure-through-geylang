import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 19 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 19 brings in its own buildings, its corners and the Geylang Road houses back to Lorong 17', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const west = ['454254263', '454254248', '476113985', '454254241', '476113983', '476113984', '454254239', '454254309', '454254310'];
  const east = ['454254168', '454254246', '1223524381', '454254247', '454254314', '454254339'];
  const geylangRoad = ['454254254', '454254256', '454254258', '454254260', '454254262'];
  for (const id of [...west, ...east, ...geylangRoad]) assert.ok(ids.has(id), id);
  // Sims Avenue Nos. 136-144 wait for their measurement (open question 43), and the Lorong Bachok row for a later pass.
  for (const id of ['682928736', '682928738', '682928739', '682928741', '682928744', '454254315', '454254245']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 19 Geylang').length, 7);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Lorong Bachok').map(r => r.id), ['23513607']);
});

test('Lorong 19 is walkable from the Geylang Road centreline to the Sims Avenue centreline, and back to Lorong 17 along both', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  // The links run from Lorong 17's junctions to past Lorong 19's, along the Geylang Road and Sims Avenue centrelines.
  for (const name of ['Geylang Road, Lorong 17 to Lorong 19', 'Sims Avenue, Lorong 17 to Lorong 19']) walkable(corridor(name).path.map(p => project(p, sourceMap.origin)), inStudy);
  // The backs of the blocks either side stay outside: between Lorong 17 and Lorong 19, and east towards Lorong 21.
  for (const p of [[188, -40], [195, 10], [262, -40], [265, 0]]) assert.equal(inStudy(p, 0), false, `${p}`);
});
