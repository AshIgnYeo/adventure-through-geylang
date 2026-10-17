import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea } from '../src/geo.mjs';
import { sourceMap } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 16 Geylang');
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 16 brings in its own buildings, its west corner on Geylang Road and the south-east corner', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const corner = ['764372570', '764372571', '764372569'];
  const west = ['763764689', '763764687', '763764688', '763764676', '764372580', '763764654'];
  const southEast = ['763764666', '763764665', '763764664'];
  const east = [
    '763764667', '763764668', '454274647', '763764669', '763764670', '763764671', '763764673', '763764672', '763764674', '763764675',
    '121872890', '763764678', '763764679', '763764680', '763764681', '763764682', '763764686', '763764685', '763764684', '763764683',
  ];
  for (const id of [...corner, ...west, ...southEast, ...east]) assert.ok(ids.has(id), id);
  // The Geylang Road row back to Lorong 14 (walked with Lorong 14), the block east of the lane and the Lorong 18 houses
  // (walked with Lorong 18) stay out of this lane's list.
  for (const id of ['764372573', '454254171', '541941365', '454274650', '764372561']) assert.equal(ids.has(id), false, id);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Lorong 16 Geylang').map(r => r.id).sort(), ['23513325', '632249196', '666011790', '666011791', '776937485']);
});

test('Lorong 16 is walkable from the Geylang Road centreline to the end of its last way in the extract', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Lorong 16 Geylang', lane.path.at(-1)));
  const path = lane.path.map(p => project(p, sourceMap.origin));
  walkable(path, inStudy);
  // The lane runs south, about 190 m to the extract's edge.
  assert.ok(path.at(-1)[1] - path[0][1] > 185);
  // Its junction lies on the Geylang Road corridor from Lorong 19 to Lorong 21, which reaches the west corner's front.
  walkable(corridor('Geylang Road, Lorong 19 to Lorong 21').path.map(p => project(p, sourceMap.origin)), inStudy);
  assert.ok(inStudy([262, 56], 3));
  // The backs of the blocks either side stay outside: the Lorong 14 houses to the west and the Lorong 18 houses to the east.
  for (const p of [[225, 190], [235, 120], [350, 120], [355, 200]]) assert.equal(inStudy(p, 0), false, `${p}`);
});
