import test from 'node:test';
import assert from 'node:assert/strict';
import { ringA, ringAFrame, ringALayout, ringAReviews, ringASides } from '../src/ring-a-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { assertFittings, assertReviews, assertClearOfCarriageway, building, outline, map } from './helpers.mjs';
import { pointInPolygon, project } from '../src/geo.mjs';

test('the ring A exteriors fit their outlines and keep their review starts clear', () => {
  for (const place of ringA) {
    const poly = outline(place.buildingIds[0]), frame = ringAFrame(poly, place), boxes = ringALayout(place, frame.width).boxes;
    assertFittings(frame, poly, boxes);
    for (const side of ringASides(place, poly)) assertFittings(side.frame, poly, side.boxes);
    assertReviews(frame, ringAReviews(place, frame));
    assert.match(place.evidence, /(April|June) 2024/);
    assert.ok(place.sources.some(s => s.includes(`way/${place.buildingIds[0]}`)));
    if (place.id === 'bengal-kitchen') continue;
    // Unnamed exteriors carry no registered identity, and every sign is a blank block.
    assert.equal(place.kind, 'unnamed'); assert.equal(place.unnamed, true);
    assert.equal(landmarkFor(place.buildingIds[0]), undefined);
    assert.equal(place.board, undefined); assert.equal(place.boards, undefined); assert.equal(place.blades, undefined);
  }
});

test('street-level projections stay clear of the modelled carriageways', () => {
  for (const place of ringA) {
    const poly = outline(place.buildingIds[0]), frame = ringAFrame(poly, place);
    const faces = [{ frame, blocks: place.blocks ?? [] }, ...(place.sides ?? []).map((s, i) => ({ frame: ringASides(place, poly)[i].frame, blocks: s.blocks ?? [] }))];
    for (const { frame: f, blocks } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      // No. 2's source front itself reaches into the estimated Lorong 15 carriageway at its south end, so its
      // board, valance and awning are held within 0.25 m of the front instead.
      if (place.id === 'bengal-kitchen') { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); assert.ok(place.board.out <= .25); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
  }
});

test('each exterior stays on its source way and faces its street', () => {
  assert.deepEqual(ringA.map(p => p.buildingIds[0]), ['454254264', '454254234', '454254235', '454254265', '454254266', '454254267', '682928764', '682928765', '682928766']);
  for (const id of ['682928764', '682928765', '682928766']) assert.equal(ringA.find(p => p.buildingIds[0] === id).address, `${building(id).number} Sims Avenue${id === '682928766' ? ' (Lorong 17 corner)' : ''}`);
  // Sims Avenue frames run west from the east party line; the Lorong 15 frames run south.
  const sims = ringA.find(p => p.id === 'sims-130'), f = ringAFrame(outline('682928766'), sims);
  assert.ok(f.dx < 0 && f.nz < 0);
  const row = ringA.find(p => p.id === 'l15-east-row'), g = ringAFrame(outline('454254235'), row);
  assert.ok(g.dz > 0 && g.nx < 0);
  // The corner block's front is its splayed corner; the Geylang Road and Lorong 15 faces are side faces.
  const corner = ringA.find(p => p.id === 'gr-301');
  assert.deepEqual(ringASides(corner, outline('454254264')).map(s => s.edge), [3, 5]);
});

test('Bengal Kitchen is named from a listing point inside No. 2 and its photographed board', () => {
  assert.equal(landmarkFor('454254234').id, 'bengal-kitchen');
  assert.equal(pointInPolygon(project([103.8784329, 1.3129267], map.origin), outline('454254234')), true);
});
