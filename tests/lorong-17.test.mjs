import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap } from './helpers.mjs';

const lane = sourceMap.corridors.find(c => c.name === 'Lorong 17 Geylang');

test('Lorong 17 brings in its own buildings and road ways, not the backs of Lorong 19', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of ['454254236', '454254237', '454254238', '454254240', '454254249', '454254250', '454254251', '454254252', '454254253', '454254307', '454254308']) assert.ok(ids.has(id), id);
  // Lorong 19's west side, Sims Avenue No. 136 and the Geylang Road house east of the corner stay out.
  for (const id of ['454254241', '476113984', '454254239', '682928736', '454254254']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 17 Geylang').length, 7);
});

test('the lane is walkable from the Geylang Road centreline to the Sims Avenue centreline', () => {
  const inStudy = studyArea(sourceMap), path = lane.path.map(p => project(p, sourceMap.origin));
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Sims Avenue', lane.path.at(-1)));
  // Every metre along the lane, and the Geylang Road link back into the rectangle, keeps the 3 m margin.
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
  for (let x = 140; x <= 179; x++) assert.ok(inStudy([x, 60], 3), `Geylang Road at x ${x}`);
  // Lorong 19, about 45 m east of the lane, stays outside.
  assert.equal(inStudy([205, -40], 0), false);
  assert.equal(inStudy([215, 10], 0), false);
});
