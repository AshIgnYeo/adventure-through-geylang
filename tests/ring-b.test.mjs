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
    // Authored strips cite the source way they were cut from.
    const ways = map.buildings.find(b => b.id === place.buildingIds[0]).replaces ?? place.buildingIds;
    assert.ok(place.sources.some(s => ways.some(w => s.includes(`openstreetmap.org/way/${w}`))), place.id);
    if (!place.unnamed) continue;
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

test('the tower and Hotel 81 Cherry split way 454438320 at 10.5 m, and the pair splits at its party pier', () => {
  const tower = ringB.find(p => p.id === 'l12-tower'), hotel = ringB.find(p => p.id === 'hotel-81-cherry');
  const ft = ringBFrame(outline('l12-tower'), tower), fh = ringBFrame(outline('l12-hotel'), hotel);
  // Both frames run south from the back-lane end, and the hotel starts where the tower ends.
  assert.ok(ft.a[1] < ft.b[1]); assert.ok(Math.abs(ft.width - 10.5) < .01); assert.ok(Math.hypot(fh.a[0] - ft.b[0], fh.a[1] - ft.b[1]) < .01);
  assert.ok(tower.height > 2 * hotel.height - 1);
  const north = ringBFrame(outline('l12-pair-north'), { frontEdge: 0 }), south = ringBFrame(outline('l12-pair-south'), { frontEdge: 0 });
  assert.ok(Math.abs(north.width - 4.46) < .01 && Math.abs(north.width + south.width - 9.05) < .02);
});

test('Ya Ju Hotel is named from a listing point inside No. 12; Hotel 81 Cherry and the two associations after the split', () => {
  assert.equal(landmarkFor('121873031').id, 'yaju-hotel');
  assert.equal(pointInPolygon(project([103.8780663, 1.3114895], map.origin), outline('121873031')), true);
  assert.equal(landmarkFor('l12-hotel').id, 'hotel-81-cherry');
  assert.equal(pointInPolygon(project([103.8784172, 1.311987], map.origin), outline('l12-hotel')), true);
  assert.equal(landmarkFor('l12-tower'), undefined);
  assert.equal(landmarkFor('l12-pair-north').id, 'master-tailors');
  assert.equal(landmarkFor('l12-pair-south').id, 'chinese-eating-house-owners');
  // Both association points lie in the pair's source way, south of the party pier.
  const pair = [...outline('l12-pair-north'), ...outline('l12-pair-south')];
  for (const p of [[103.8783887, 1.311878], [103.878393, 1.3118533]]) assert.ok(pointInPolygon(project(p, map.origin), outline('l12-pair-south')));
  assert.ok(pair.length >= 8);
});

test('Summer View and Vintage & Vine are named from listing points inside their ways', () => {
  assert.equal(landmarkFor('121873028').id, 'summer-view');
  assert.equal(pointInPolygon(project([103.8784113, 1.3117243], map.origin), outline('121873028')), true);
  assert.equal(landmarkFor('1223129485').id, 'vintage-and-vine');
  assert.equal(pointInPolygon(project([103.8781622, 1.311657], map.origin), outline('1223129485')), true);
});
