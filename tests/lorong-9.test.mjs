import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong9, lorong9Frame, lorong9Layout, lorong9Reviews, ywam, greyBuilding, kimCourt, theDiamond, constructionSites } from '../src/lorong-9-layout.mjs';
import { project, pointInPolygon } from '../src/geo.mjs';
import { map } from './helpers.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, assertFittings, assertReviews, sharesCorners } from './helpers.mjs';

test('YWAM takes the way tagged No. 4, where its plaque hangs; the others are unnamed', () => {
  assert.equal(building('453797939').number, '4'); assert.equal(landmarkFor('453797939').id, ywam.id);
  assert.match(ywam.evidence, /4 LORONG 9 GEYLANG/); assert.match(ywam.evidence, /open question 12/);
  for (const place of lorong9.filter(p => p.unnamed)) for (const id of place.buildingIds) assert.equal(landmarkFor(id), undefined);
  assert.equal(sharesCorners(outline(greyBuilding.buildingIds[0]), outline(greyBuilding.buildingIds[1])), 2, 'the grey building spans two adjoining ways');
});

test('Lorong 9 frames face west and keep their fittings in the frontage', () => {
  for (const place of lorong9) {
    const poly = outline(place.buildingIds[0]), frame = lorong9Frame(poly, place);
    assert.ok(['kim-court', 'the-diamond', 'l9-7a'].includes(place.id) ? frame.nx > 0 : frame.nx < 0, `${place.id} faces Lorong 9`);
    if (place.buildingIds.length === 1) assertFittings(frame, poly, lorong9Layout(place, frame.width).boxes, .12);
  }
});

test('Lorong 9 review starts stay walkable', () => {
  // West-side blocks straddle the study's west edge, so only east-side review starts are checked here.
  for (const place of lorong9.filter(p => p.buildingIds.length === 1 && ['l9-12', 'ywam-singapore'].includes(p.id))) { const frame = lorong9Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong9Reviews(place, frame)); }
});

test('Kim Court and The Diamond take the ways whose numbers their listings and plates carry', () => {
  assert.equal(building('453797935').number, '11'); assert.equal(landmarkFor('453797935').id, kimCourt.id);
  assert.equal(building('453797934').number, '17'); assert.equal(landmarkFor('453797934').id, theDiamond.id);
  // The triangulated KIM COURT / 11 pillar lies inside the way tagged 11.
  assert.equal(pointInPolygon([-112.93, 28.79], outline('453797935')), true);
  for (const s of constructionSites) { assert.equal(landmarkFor(s.buildingIds[0]), undefined); assert.ok(s.sheeting > s.hoarding); }
});

