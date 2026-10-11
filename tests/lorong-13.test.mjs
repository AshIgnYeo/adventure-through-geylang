import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lorong13, lorong13Frame, lorong13Layout, lorong13Reviews, lorong13Outline, thirteenBbq, builderSmart, teckHoe } from '../src/lorong-13-layout.mjs';
import { frontageFrame } from '../src/gable-roof-layout.mjs';
import { row13 } from '../src/row13-layout.mjs';
import { singleRow } from '../src/single-row-layout.mjs';
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
    const source = outline(place.buildingIds[0]), poly = lorong13Outline(source, place), frame = lorong13Frame(source, place), L = lorong13Layout(place, frame.width);
    for (const w of place.windows ?? []) assert.ok(w.u[0] > 0 && w.u[1] < frame.width && w.h[0] > place.ceiling && w.h[1] < place.height, place.id);
    if (place.row) {
      assert.ok(Math.abs(frame.width - 5.01) < .03, place.id);
      for (const [l, r, b, t] of place.bays.windows) assert.ok(l > 0 && r < frame.width && b >= row13.floor2 - .3 && t <= row13.fretwork[0], place.id);
      const p = place.bays.pilasters; assert.ok(p[0][0] === 0 && Math.abs(p.at(-1)[1] - frame.width) < .02, place.id);
    }
    if (place.board && place.ceiling > .5) assert.ok(place.board.h[0] >= place.ceiling - .01, place.id);
    if (place.roof?.ridge) assert.ok(place.roof.ridge > place.height, place.id);
    for (const r of place.rooftop ?? []) assert.ok(r.setback + r.depth < 6.1 && r.top > place.height, place.id);
    if (place.buildingIds.length > 1) {
      // One elevation over adjoining ways: every box lies within their combined frontage.
      const total = place.buildingIds.reduce((sum, id) => sum + lorong13Frame(outline(id), place).width, 0), W = lorong13Layout(place, total);
      for (const b of W.boxes) assert.ok(b.u - b.w / 2 >= -.12 && b.u + b.w / 2 <= total + .12, `${place.id} ${b.name}`);
      continue;
    }
    assertFittings(frame, poly, L.boxes, .12);
    const awning = L.awning ?? place.awning;
    assertClearOfCarriageway([...(L.blades ?? []).map(b => frame.point(b.u, b.out[1])), ...(awning ? [frame.point(awning.from, awning.depth), frame.point(awning.to, awning.depth)] : [])]);
    if (place.side) {
      const side = lorong13Frame(poly, { frontEdge: place.side.edge });
      for (const b of place.side.blocks ?? []) assert.ok(b.u[0] >= 0 && b.u[1] <= side.width + .01, `${place.id} ${b.name}`);
      if (place.side.awning) {
        assert.ok(place.side.awning.to <= side.width);
        assertClearOfCarriageway([side.point(place.side.awning.from, place.side.awning.depth), side.point(place.side.awning.to, place.side.awning.depth)]);
      }
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
    assert.equal(place.board, undefined); assert.equal(place.kind, 'unnamed');
  }
});

test('Teck Hoe is a dated exterior of the signed No. 11 house, with the listing conflict recorded', () => {
  assert.equal(building('1223773759').number, '11'); assert.equal(landmarkFor('1223773759').id, 'teck-hoe');
  assert.match(teckHoe.evidence, /8 Lor 15 Geylang/); assert.match(teckHoe.evidence, /open question 12/);
  const frame = lorong13Frame(outline('1223773759'), teckHoe);
  assert.ok(Math.abs(frame.width - 8.77) < .02);
  assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
});

test('the single-storey row houses share No. 22\'s form and the source spacing', () => {
  for (const place of lorong13.filter(p => p.single)) {
    const poly = outline(place.buildingIds[0]), frame = lorong13Frame(poly, place);
    assert.ok(Math.abs(frame.width - 5.81) < .02, place.id); assert.equal(place.height, 4.31);
    assert.equal(nearestRoad(frame.point(frame.width / 2)).name, 'Lorong 13 Geylang');
    for (const f of place.front ?? []) assert.ok(f.h[1] < singleRow.canopy.inner, place.id);
  }
  // Copings recur every second party line: 28|26, 24|22 (drawn by Plus Mobile) and the end of No. 20.
  assert.deepEqual(lorong13.filter(p => p.single && p.coping).map(p => p.id), ['l13-28', 'l13-20']);
  assert.match(lorong13.find(p => p.id === 'wunderfolks').evidence, /Time Out \(27 September 2023\)/);
});

test('set-back houses keep their upper block inside the source outline and their strip inside the frontage', () => {
  for (const place of lorong13.filter(p => p.setback)) {
    const source = outline(place.buildingIds[0]), inner = lorong13Outline(source, place), f = frontageFrame(source, place.frontEdge), S = place.setback;
    const c = [0, 1].map(k => source.reduce((sum, p) => sum + p[k], 0) / source.length);
    for (const p of inner) { const d = Math.hypot(c[0] - p[0], c[1] - p[1]); assert.equal(pointInPolygon([p[0] + (c[0] - p[0]) * .05 / d, p[1] + (c[1] - p[1]) * .05 / d], source), true, place.id); }
    assert.ok(Math.abs(lorong13Frame(source, place).width - f.width) < .01, place.id);
    for (const b of S.front ?? []) assert.ok(b.u[0] >= 0 && b.u[1] <= f.width + .01 && b.h[0] >= 0, `${place.id} ${b.name}`);
    for (const r of [S.leanTo, S.canopy].filter(Boolean)) assert.ok(r.u[0] >= 0 && r.u[1] <= f.width + .01, place.id);
    if (S.leanTo) assert.ok(S.leanTo.high > S.leanTo.low && S.leanTo.high < place.height, place.id);
    if (S.canopy) assertClearOfCarriageway(S.canopy.u.map(u => f.point(u, S.canopy.out - S.depth)));
  }
});

test('Lorong 13 review starts face their frontages and stay walkable', () => {
  for (const place of lorong13) { const frame = lorong13Frame(outline(place.buildingIds[0]), place); assertReviews(frame, lorong13Reviews(place, frame)); }
  assert.ok(lorong13.length >= 13);
  assert.equal(named.length, 4);
});
