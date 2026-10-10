import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong13, lorong13Frame, lorong13Layout, lorong13Reviews, thirteenBbq, builderSmart } from '../src/lorong-13-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon } from '../src/geo.mjs';
import { map, building, outline, nearestRoad, assertFittings, assertClearOfCarriageway, assertReviews } from './helpers.mjs';

const named = lorong13.filter(p => landmarkFor(p.buildingIds[0])?.id === p.id);

test('Thirteen BBQ and BUILDERSmart take the two Sims Avenue end ways that contain their listed points', () => {
  for (const [place, id, point] of [[thirteenBbq, '1223454595', [103.8772851, 1.3137204]], [builderSmart, '1223454594', [103.877235, 1.3138017]]]) {
    assert.deepEqual(place.buildingIds, [id]); assert.equal(landmarkFor(id).id, place.id);
    assert.equal(pointInPolygon(project(point, map.origin), outline(id)), true);
    assert.equal(building(id).number, null);
  }
  assert.match(thirteenBbq.address, /^27 Lorong 13/); assert.match(builderSmart.address, /^29 Lorong 13/);
  const frame = lorong13Frame(outline('1223454595'), thirteenBbq);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
  const corner = lorong13Frame(outline('1223454594'), builderSmart);
  assert.equal(nearestRoad(corner.point(corner.width / 2, 3)).name, 'Sims Avenue');
  assert.match(thirteenBbq.evidence, /open question 20/);
});

test('each Lorong 13 elevation is ordered and keeps its fittings in the frontage', () => {
  for (const place of lorong13) {
    const poly = outline(place.buildingIds[0]), frame = lorong13Frame(poly, place), L = lorong13Layout(place, frame.width);
    for (const w of place.windows ?? []) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[0] > place.ceiling && w.h[1] < place.height, place.id);
    if (place.board) assert.ok(place.board.h[0] >= place.ceiling - .01, place.id);
    if (place.roof?.ridge) assert.ok(place.roof.ridge > place.height, place.id);
    for (const r of place.rooftop ?? []) assert.ok(r.setback + r.depth < 6.1 && r.top > place.height, place.id);
    assertFittings(frame, poly, L.boxes, .12);
    assertClearOfCarriageway([...L.blades.map(b => frame.point(b.u, b.out[1])), ...(L.awning ? [frame.point(L.awning.from, L.awning.depth), frame.point(L.awning.to, L.awning.depth)] : [])]);
    if (place.side) {
      const side = lorong13Frame(poly, { frontEdge: place.side.edge });
      assert.ok(place.side.awning.to <= side.width);
      assertClearOfCarriageway([side.point(place.side.awning.from, place.side.awning.depth), side.point(place.side.awning.to, place.side.awning.depth)]);
    }
  }
});

test('Thirteen BBQ measures 6.1 m on its source way, with its stepped parapet above the gable eaves', () => {
  const frame = lorong13Frame(outline('1223454595'), thirteenBbq);
  assert.ok(Math.abs(frame.width - 6.1) < .05);
  const parapets = thirteenBbq.blocks.filter(b => b.name === 'stepped parapet');
  assert.ok(parapets.every(b => b.h[0] === thirteenBbq.height && b.h[1] > thirteenBbq.height));
});

test('Lorong 13 review starts face their frontages and stay walkable', () => {
  for (const place of lorong13) { const frame = lorong13Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong13Reviews(place, frame)); }
  assert.equal(named.length, 2);
});
