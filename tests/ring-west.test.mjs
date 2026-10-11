import test from 'node:test';
import assert from 'node:assert/strict';
import { ringWest, ringWestFrame, ringWestLayout, ringWestReviews, rozel, gongHeGuan } from '../src/ring-west-layout.mjs';
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

test('only Rozel Furniture and Gong He Guan carry names; the rest are unnamed or massing only', () => {
  for (const place of ringWest) {
    if (place === rozel || place === gongHeGuan) continue;
    assert.equal(place.unnamed, true);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
  }
  assert.equal(landmarkFor('439168683').id, rozel.id);
  // The Maps point for Rozel Furniture Sims Avenue lies inside its way.
  assert.equal(pointInPolygon(project([103.8759601, 1.313617], map.origin), outline('439168683')), true);
  assert.equal(building('439168683').street, null);
});

test('Nos. 217-227 stand on the re-cut strips at the triangulated party lines; Gong He Guan is named from its point', () => {
  const widths = ['gr-217', 'gr-219', 'gr-221', 'gr-223', 'gr-225', 'gr-227', 'gr-229-west'].map(id => ringWestFrame(outline(id), { frontEdge: 0 }).width);
  [6.2, 4.2, 4.8, 5.0, 4.7, 4.45, 4.87].forEach((w, i) => assert.ok(Math.abs(widths[i] - w) < .02, `${i}: ${widths[i]}`));
  assert.equal(landmarkFor('gr-217').id, 'gong-he-guan');
  assert.equal(pointInPolygon(project([103.8760982, 1.3119942], map.origin), outline('gr-217')), true);
  // The Gong He Guan board is drawn; the BBQ Home board on No. 219 stays blank (the listing is permanently closed).
  assert.ok(gongHeGuan.board && !gongHeGuan.blocks.some(b => b.name === 'blank red board'));
  assert.equal(landmarkFor('gr-219'), undefined);
});
