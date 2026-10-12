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
    if (['bengal-kitchen', 'bamboo-lounge', 'sheng-siong-301'].includes(place.id)) continue;
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
  // The corner block's front is its Lorong 15 splayed corner; Geylang Road, Lorong 15, the Lorong 17 splay and
  // the Lorong 17 face are side faces.
  const corner = ringA.find(p => p.id === 'sheng-siong-301');
  assert.deepEqual(ringASides(corner, outline('454254264')).map(s => s.edge), [3, 5, 2, 1]);
});

test('the corner block is named after its two listed tenants, and its Lorong 17 faces face Lorong 17', () => {
  const corner = ringA.find(p => p.id === 'sheng-siong-301'), poly = outline('454254264');
  assert.equal(landmarkFor('454254264').id, corner.id);
  // Sheng Siong (#01-02) and Anytime Fitness (#04-01) share one listing point inside the way.
  assert.equal(pointInPolygon(project([103.878652, 1.3127734], map.origin), poly), true);
  const sides = ringASides(corner, poly), splay = sides.find(s => s.edge === 2), face = sides.find(s => s.edge === 1);
  // Both Lorong 17 faces look east, towards the lane; the face runs north from the splay.
  for (const s of [splay, face]) assert.ok(s.frame.nx > .5);
  assert.ok(face.frame.dz < -.95);
  assert.equal(splay.boards.length, 1); assert.equal(face.boards.length, 0);
  // The closed Bee Cheng Hiang shop keeps blank boards; only the supermarket and the gym are drawn.
  assert.ok(splay.boxes.some(b => b.name === 'blank yellow board'));
  assert.equal(sides.find(s => s.edge === 3).blades.length, 1);
});

test('Bengal Kitchen is named from a listing point inside No. 2 and its photographed board', () => {
  assert.equal(landmarkFor('454254234').id, 'bengal-kitchen');
  assert.equal(pointInPolygon(project([103.8784329, 1.3129267], map.origin), outline('454254234')), true);
});

test('Bamboo Lounge is named on No. 128, its sign, with its listing point in No. 126 next door', () => {
  assert.equal(landmarkFor('682928765').id, 'bamboo-lounge');
  assert.equal(pointInPolygon(project([103.8783786, 1.3140915], map.origin), outline('682928764')), true);
  assert.equal(landmarkFor('682928764'), undefined);
});
