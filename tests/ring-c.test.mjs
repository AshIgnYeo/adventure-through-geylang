import test from 'node:test';
import assert from 'node:assert/strict';
import { ringC, ringCFrame, ringCLayout, ringCReviews } from '../src/ring-c-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { assertFittings, assertReviews, outline, nearestRoad, map } from './helpers.mjs';
import { pointInPolygon, project } from '../src/geo.mjs';

const byId = id => ringC.find(p => p.id === id);
// Named where a current listing's point lies in the way and the photographed sign agrees.
const named = ['jh-hotel', 'nanyang-fan-clan'];
const fitted = place => { const poly = outline(place.buildingIds[0]), frame = ringCFrame(poly, place); return { poly, frame, layout: ringCLayout(place, frame.width) }; };

test('the Lorong 10 exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringC) {
    const { poly, frame, layout } = fitted(place);
    assertFittings(frame, poly, layout.boxes);
    assertReviews(frame, ringCReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
    if (named.includes(place.id)) continue;
    // Unnamed exteriors carry no registered identity, and signs stay blank.
    assert.equal(place.unnamed, true); assert.equal(place.kind, 'unnamed');
    assert.match(place.name, /June 2024 exterior, occupants? not identified/); assert.match(place.evidence, /no name is given/);
    assert.doesNotMatch(place.name, /ibis|Nova|Jixin|JH|Fan Clan/i);
    assert.equal(place.board, undefined);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
});

test('each exterior keeps its source way and fronts Lorong 10', () => {
  assert.deepEqual(ringC.map(p => p.buildingIds[0]).sort(), ['1223401721', '1223401722', '1223401723', '454438323', '454438326', '454438331', '454438332']);
  for (const place of ringC) {
    const { frame } = fitted(place), road = nearestRoad(frame.point(frame.width / 2, 0));
    assert.equal(road.name, 'Lorong 10 Geylang', place.id);
    assert.ok(road.distance < 27, place.id);
  }
});

test('measured runs land the right way round on their frames', () => {
  // The west row was measured from its north end but its frame runs north from the south corner, so the
  // southern parapet starts at u = 0 and the lower northern unit (no parapet block) takes the far end.
  const row = byId('l10-west-row'), r = fitted(row);
  const south = r.layout.boxes.find(b => b.name === 'southern parapet'), middle = r.layout.boxes.find(b => b.name === 'raised middle parapet');
  assert.ok(Math.abs(south.u - south.w / 2) < 1e-9 && middle.u > south.u && middle.u + middle.w / 2 < r.frame.width - 4);
  // The hotel row's frame runs south from its north corner: the taupe block first, the white block last.
  const hotels = byId('l10-hotel-row'), h = fitted(hotels);
  const at = name => h.layout.boxes.filter(b => b.name === name).map(b => b.u);
  assert.ok(Math.max(...at('taupe wall')) < 6 && Math.min(...at('white wall')) > 40);
  // The white block's upper floors rise above the shell to its 29.1 m roof, inside the outline.
  const upper = h.layout.boxes.find(b => b.name === 'white block upper floors');
  assert.ok(Math.abs(upper.y + upper.h / 2 - 29.1) < 1e-9 && upper.out + upper.depth / 2 <= 0);
});

test('JH Hotel and the Nanyang Fan Clan hall are named from listing points inside their ways', () => {
  for (const [id, way, point] of [['jh-hotel', '1223401721', [103.8774994, 1.3116221]], ['nanyang-fan-clan', '454438323', [103.8778339, 1.3114626]]]) {
    const place = byId(id);
    assert.deepEqual(place.buildingIds, [way]);
    assert.equal(landmarkFor(way).id, id);
    assert.equal(pointInPolygon(project(point, map.origin), outline(way)), true);
    assert.match(place.evidence, /Google Maps lists/);
    assert.ok(fitted(place).layout.boards.length > 0);
  }
  // The ibis signs conflict with current listings at their points (Tulip, Olive), so those stay unnamed.
  for (const id of ['l10-yellow-block', 'l10-hotel-row']) assert.equal(landmarkFor(byId(id).buildingIds[0]), undefined);
});
