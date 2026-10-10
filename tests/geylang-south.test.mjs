import { test } from 'node:test';
import assert from 'node:assert/strict';
import { geylangSouth, geylangSouthFrame, geylangSouthLayout, geylangSouthReviews, monsterInk, shadowTattoo, nanyangLian } from '../src/geylang-south-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project } from '../src/geo.mjs';
import { map, sourceMap, building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const area = o => Math.abs(o.reduce((s, p, i) => { const q = o[(i + 1) % o.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2);

test('block 454438330 is split into eight strips that tile it, numbered 236 to 250', () => {
  const src = sourceMap.buildings.find(b => b.id === '454438330').coordinates.slice(0, -1).map(c => project(c, sourceMap.origin));
  const ids = ['236', '238', '240', '242', '244', '246', '248', '250'].map(n => `gr-${n}`);
  assert.ok(Math.abs(ids.reduce((s, id) => s + area(outline(id)), 0) - area(src)) < .5);
  for (const id of ids) { assert.equal(building(id).geometrySource, 'authored-estimate'); assert.ok(building(id).replaces.includes('454438330')); }
  assert.equal(map.buildings.find(b => b.id === '454438330'), undefined);
});

test('named units are Tian Tian, TakeToys, Monster Ink, Shadow Tattoo and the Nanyang Lian building; the rest are unnamed', () => {
  assert.equal(landmarkFor('gr-220').id, 'tian-tian'); assert.equal(landmarkFor('gr-222').id, 'taketoys');
  assert.equal(landmarkFor('gr-240').id, monsterInk.id); assert.equal(landmarkFor('gr-244').id, shadowTattoo.id); assert.equal(landmarkFor('gr-248').id, nanyangLian.id);
  assert.match(shadowTattoo.evidence, /open question 12/);
  for (const place of geylangSouth.filter(p => p.unnamed)) { assert.equal(landmarkFor(place.buildingIds[0]), undefined); assert.match(place.evidence, /no name is given/); }
});

test('each south-side unit faces Geylang Road with its fittings in the frontage and clear of the road', () => {
  for (const place of geylangSouth) {
    const poly = outline(place.buildingIds[0]), frame = geylangSouthFrame(poly, place), L = geylangSouthLayout(place, frame.width);
    if (place.id === 'chongqing-xiaomian') assert.ok(frame.nx < 0, 'the corner faces west onto Lorong 12');
    else { assert.equal(nearestRoad(frame.point(frame.width / 2, 3)).name, 'Geylang Road', place.id); assert.ok(frame.nz < 0, `${place.id} faces north`); }
    for (const w of place.windows) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[1] < place.height, place.id);
    assertFittings(frame, poly, L.boxes, .12);
    const pts = [...L.blades.map(b => frame.point(b.u, b.out[1])), ...(place.awning ? [frame.point(place.awning.from, place.awning.depth), frame.point(place.awning.to, place.awning.depth)] : [])];
    assertClearOfCarriageway(pts);
  }
});

test('south-side review starts stay walkable', () => {
  // The ChongQingXiaoMian corner lies at the study's east edge, beyond the walkable bounds.
  for (const place of geylangSouth.filter(p => p.id !== 'chongqing-xiaomian')) { const frame = geylangSouthFrame(outline(place.buildingIds[0]), place); assertReviews(frame, geylangSouthReviews(place, frame)); }
});
