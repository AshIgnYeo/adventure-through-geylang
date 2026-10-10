import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong13, lorong13Frame, lorong13Layout, lorong13Reviews, thirteenBbq, builderSmart, teckHoe } from '../src/lorong-13-layout.mjs';
import { row13 } from '../src/row13-layout.mjs';
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
    if (place.row) {
      assert.ok(Math.abs(frame.width - 5.01) < .03, place.id);
      for (const [l, r, b, t] of place.bays.windows) assert.ok(l > 0 && r < frame.width && b >= row13.floor2 - .3 && t <= row13.fretwork[0], place.id);
      const p = place.bays.pilasters; assert.ok(p[0][0] === 0 && Math.abs(p.at(-1)[1] - frame.width) < .02, place.id);
    }
    if (place.board && place.ceiling > .5) assert.ok(place.board.h[0] >= place.ceiling - .01, place.id);
    if (place.roof?.ridge) assert.ok(place.roof.ridge > place.height, place.id);
    for (const r of place.rooftop ?? []) assert.ok(r.setback + r.depth < 6.1 && r.top > place.height, place.id);
    assertFittings(frame, poly, L.boxes, .12);
    const awning = L.awning ?? place.awning;
    assertClearOfCarriageway([...(L.blades ?? []).map(b => frame.point(b.u, b.out[1])), ...(awning ? [frame.point(awning.from, awning.depth), frame.point(awning.to, awning.depth)] : [])]);
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

test('unnamed Lorong 13 exteriors carry no business name and are not registered as landmarks', () => {
  for (const place of lorong13.filter(p => p.unnamed)) {
    assert.equal(landmarkFor(place.buildingIds[0]), undefined, place.id);
    assert.match(place.name, /occupant not identified/); assert.match(place.evidence, /no name is given/i);
    assert.equal(place.board, undefined); assert.ok(place.id.startsWith('l13-'));
  }
});

test('Teck Hoe is a dated exterior of the signed No. 11 house, with the listing conflict recorded', () => {
  assert.equal(building('1223773759').number, '11'); assert.equal(landmarkFor('1223773759').id, 'teck-hoe');
  assert.match(teckHoe.evidence, /8 Lor 15 Geylang/); assert.match(teckHoe.evidence, /open question 12/);
  const frame = lorong13Frame(outline('1223773759'), teckHoe);
  assert.ok(Math.abs(frame.width - 8.77) < .02);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
});

test('Lorong 13 review starts face their frontages and stay walkable', () => {
  for (const place of lorong13) { const frame = lorong13Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong13Reviews(place, frame)); }
  assert.equal(named.length, 3);
});
