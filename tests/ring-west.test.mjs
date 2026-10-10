import test from 'node:test';
import assert from 'node:assert/strict';
import { ringWest, ringWestFrame, ringWestLayout, ringWestReviews, rozel } from '../src/ring-west-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { pointInPolygon, project } from '../src/geo.mjs';
import { assertFittings, assertReviews, outline, building, map } from './helpers.mjs';

test('the west-ring exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringWest.filter(p => !p.massing)) {
    const poly = outline(place.buildingIds[0]), frame = ringWestFrame(poly, place);
    assertFittings(frame, poly, ringWestLayout(place, frame.width).boxes);
    assertReviews(frame, ringWestReviews(place, frame));
    assert.match(place.evidence, /June 2024/);
  }
});

test('only Rozel Furniture carries a name; the rest are unnamed or massing only', () => {
  for (const place of ringWest) {
    if (place === rozel) continue;
    assert.equal(place.unnamed, true);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
  assert.equal(landmarkFor('439168683').id, rozel.id);
  // The Maps point for Rozel Furniture Sims Avenue lies inside its way.
  assert.equal(pointInPolygon(project([103.8759601, 1.313617], map.origin), outline('439168683')), true);
  assert.equal(building('439168683').street, null);
});
