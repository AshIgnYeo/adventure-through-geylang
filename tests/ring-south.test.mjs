import test from 'node:test';
import assert from 'node:assert/strict';
import { ringSouth, lexHotel, creamNorth, creamMiddle, creamSouth } from '../src/ring-south-layout.mjs';
import { ringWestFrame, ringWestLayout, ringWestReviews } from '../src/ring-west-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { pointInPolygon, project } from '../src/geo.mjs';
import { assertFittings, assertReviews, outline, map } from './helpers.mjs';

test('the Lorong 6 and 8 exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringSouth) {
    const poly = outline(place.buildingIds[0]), frame = ringWestFrame(poly, place);
    assertFittings(frame, poly, ringWestLayout(place, frame.width).boxes);
    assertReviews(frame, ringWestReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
    assert.ok(place.sources.some(s => s.includes(`openstreetmap.org/way/${place.buildingIds[0]}`)));
  }
});

test('each source way is used once, and every front faces its lane', () => {
  const ids = ringSouth.flatMap(p => p.buildingIds);
  assert.equal(new Set(ids).size, ids.length);
  for (const place of ringSouth) {
    const frame = ringWestFrame(outline(place.buildingIds[0]), place);
    // Both lanes run nearly north-south: east-side fronts face west and west-side fronts face east.
    assert.ok(Math.abs(frame.nx) > .95, place.id);
    assert.ok(['Lorong 8 Geylang', 'Lorong 6 Geylang'].includes(place.reviewRoad), place.id);
  }
});

test('the cream block is one elevation cut at the party walls of its three ways', () => {
  const units = [creamNorth, creamMiddle, creamSouth];
  // Every way's frame runs south from its north end, so the cut points chain along the row.
  for (const unit of units) {
    const frame = ringWestFrame(outline(unit.buildingIds[0]), unit);
    assert.ok(frame.b[1] > frame.a[1], unit.id);
  }
  const awnings = units.flatMap(u => u.blocks.filter(b => b.name === 'red-brown awning'));
  assert.equal(awnings.length, 12);
  assert.ok(creamSouth.blocks.some(b => b.name === 'balcony front') && !creamNorth.blocks.some(b => b.name === 'balcony front'));
});

test('only Lex Hotel carries a name, from a listing point inside No. 1 and its photographed sign', () => {
  assert.equal(landmarkFor('454438339').id, lexHotel.id);
  assert.equal(pointInPolygon(project([103.8771744, 1.3118091], map.origin), outline('454438339')), true);
  for (const place of ringSouth) {
    if (place === lexHotel) continue;
    assert.equal(place.unnamed, true);
    assert.equal(place.kind, 'unnamed');
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
  // The engineering merchants' association and Crystal Mansions are listed at points outside their ways.
  assert.equal(pointInPolygon(project([103.8770762, 1.3114672], map.origin), outline('454438338')), false);
  assert.equal(pointInPolygon(project([103.8765482, 1.3115573], map.origin), outline('454274483')), false);
});
