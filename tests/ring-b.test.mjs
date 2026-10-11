import test from 'node:test';
import assert from 'node:assert/strict';
import { ringB, ringBFrame, ringBLayout, ringBReviews } from '../src/ring-b-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { assertFittings, assertReviews, outline, map } from './helpers.mjs';
import { pointInPolygon, project } from '../src/geo.mjs';

test('the Lorong 12 exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringB) {
    const poly = outline(place.buildingIds[0]), frame = ringBFrame(poly, place);
    assertFittings(frame, poly, ringBLayout(place, frame.width).boxes);
    assertReviews(frame, ringBReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
    assert.ok(place.sources.some(s => s.includes(`openstreetmap.org/way/${place.buildingIds[0]}`)));
    if (place.id === 'yaju-hotel') continue;
    // Unnamed exteriors carry no registered identity.
    assert.equal(place.unnamed, true);
    assert.equal(place.kind, 'unnamed');
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
});

test('every Lorong 12 front faces Lorong 12, and each source way is used once', () => {
  const ids = ringB.flatMap(p => p.buildingIds);
  assert.equal(new Set(ids).size, ids.length);
  for (const place of ringB) {
    const frame = ringBFrame(outline(place.buildingIds[0]), place);
    // Outward normals point west on the east side and east on the west side.
    assert.ok(Math.abs(frame.nx) > .95, place.id);
    assert.equal(place.reviewRoad, 'Lorong 12 Geylang');
  }
});

test('No. 12 is framed along both collinear source edges of its front', () => {
  const place = ringB.find(p => p.id === 'yaju-hotel'), poly = outline('121873031'), frame = ringBFrame(poly, place);
  assert.ok(Math.abs(frame.width - 43.5) < .1);
  // The dropped vertex lies on the front line, so the footprint is unchanged.
  const mid = poly[2], off = (mid[0] - frame.a[0]) * frame.nx + (mid[1] - frame.a[1]) * frame.nz;
  assert.ok(Math.abs(off) < .05);
});

test('the tower rises over the north end of its way and the hotel keeps the south end', () => {
  const place = ringB.find(p => p.id === 'l12-tower-hotel'), frame = ringBFrame(outline('454438320'), place);
  // The frame runs south from the back-lane corner.
  assert.ok(frame.a[1] < frame.b[1]);
  const tower = place.blocks.find(b => b.name === 'tower upper storeys'), hotel = place.blocks.find(b => b.name === 'blue hotel wall');
  assert.ok(tower.u[1] <= hotel.u[0] && tower.h[1] > 2 * place.height - 5);
});

test('Ya Ju Hotel is named from a listing point inside No. 12; the shared ways stay unnamed', () => {
  assert.equal(landmarkFor('121873031').id, 'yaju-hotel');
  assert.equal(pointInPolygon(project([103.8780663, 1.3114895], map.origin), outline('121873031')), true);
  // Hotel 81 Cherry and the two associations are listed in ways they share with other buildings.
  for (const id of ['454438320', '454438319']) assert.equal(landmarkFor(id), undefined);
});
