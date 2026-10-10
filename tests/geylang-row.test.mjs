import { test } from 'node:test';
import assert from 'node:assert/strict';
import { geylangRow, geylangRowFrame, geylangRowLayout, geylangRowReviews } from '../src/geylang-row-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const numbers = { 'ting-yu-xuan': '255', 'ke-lai-shun': '259', 'mobile-time': '263', 'shi-hao': '267' };

test('the Geylang Road row places take their re-spaced footprints, leaving Nos. 257 and 261 generic', () => {
  for (const place of geylangRow) {
    const [id] = place.buildingIds, b = building(id);
    assert.equal(b.number, numbers[place.id]); assert.equal(b.geometrySource, 'authored-estimate');
    assert.equal(landmarkFor(id).id, place.id);
    const frame = geylangRowFrame(outline(id));
    assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Geylang Road');
    assert.ok(place.address.startsWith(numbers[place.id]));
  }
  for (const id of ['gr-257', 'gr-261']) assert.equal(landmarkFor(id), undefined);
  assert.match(geylangRow.find(p => p.id === 'ke-lai-shun').evidence, /新福興 \(No\. 257, listed permanently closed\)/);
});

test('each row elevation is ordered and keeps its fittings in the frontage', () => {
  for (const place of geylangRow) {
    const poly = outline(place.buildingIds[0]), frame = geylangRowFrame(poly), L = geylangRowLayout(place, frame.width);
    assert.ok(place.ceiling <= place.board.h[0] && place.board.h[1] < Math.min(...place.windows.map(w => w.h[0])), place.id);
    assert.ok(Math.max(...place.windows.map(w => w.h[1])) < place.height, place.id);
    for (const w of place.windows) assert.ok(w.u[0] > 0 && w.u[1] < frame.width, place.id);
    for (const v of place.vents ?? []) assert.ok(v.h[0] > Math.max(...place.windows.map(w => w.h[1])) && v.h[1] < place.height);
    if (place.roof) assert.ok(place.roof.ridge > place.height);
    assertFittings(frame, poly, L.boxes, .12);
    assertClearOfCarriageway([...L.blades.map(b => frame.point(b.u, b.out[1])), ...(L.awning ? [frame.point(L.awning.to, L.awning.depth)] : [])]);
  }
});

test('row review starts face their frontages and stay walkable', () => {
  for (const place of geylangRow) { const frame = geylangRowFrame(outline(place.buildingIds[0])); assertReviews(frame, geylangRowReviews(place, frame)); }
});
