import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { builderOwners, builderIndex } from '../src/builder-owners.mjs';
import { renderRegistry, registryPath } from '../scripts/build-registry.mjs';
import { withAuthoredFootprints } from '../src/authored-footprints.mjs';

const source = name => fs.readFileSync(new URL(`../src/${name}`, import.meta.url), 'utf8');
// The Lorong 11 corner, the temple lane's low neighbour and the coffeeshop's rear neighbour are built in world.ts itself.
const builtInWorld = ['leong-kee-exterior', 'mongkok', 'temple-alley'];

test('the committed builder registry matches src/builder-owners.mjs (run `npm run registry` if not)', () => {
  assert.equal(fs.readFileSync(registryPath, 'utf8'), renderRegistry());
});

test('no building is claimed by two builder modules', () => {
  assert.deepEqual([...builderIndex().shared], []);
});

test('every registered module exports its builder, and every claimed building is in the rendered map', () => {
  const map = withAuthoredFootprints(JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8')));
  const ids = new Set(map.buildings.map(b => b.id));
  for (const { module, build, ids: claimed } of builderOwners) {
    assert.match(source(`${module}.ts`), new RegExp(`export function ${build}\\(world: World, id: string, poly: Point\\[\\]\\)`), module);
    assert.ok(claimed.length, `${module} claims no buildings`);
    for (const id of claimed) assert.ok(ids.has(id), `${module} claims ${id}, which is not in the map`);
  }
});

test('every per-building builder module is registered, and world.ts loads none of them directly', () => {
  const registered = new Set(builderOwners.map(o => o.module));
  const world = source('world.ts');
  for (const file of fs.readdirSync(new URL('../src/', import.meta.url))) {
    if (!file.endsWith('.ts')) continue;
    const module = file.slice(0, -3);
    if (!/export function build[A-Za-z0-9]+\(world: World, id: string, (poly|source): Point\[\]\)/.test(source(file))) continue;
    if (builtInWorld.includes(module)) continue;
    assert.ok(registered.has(module), `${module} has a per-building builder but is not in src/builder-owners.mjs`);
    assert.doesNotMatch(world, new RegExp(`from '\\./${module}'`), `world.ts imports ${module} directly, which keeps it out of its own chunk`);
  }
});
