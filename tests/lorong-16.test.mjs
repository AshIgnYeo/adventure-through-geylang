import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong16, geylangRow16, lorong16Frame, lorong16Layout, lorong16Reviews, lorong16Sides, lorong16Upper } from '../src/lorong-16-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 16 Geylang');
const lanePath = lane.path.map(p => project(p, sourceMap.origin)), laneSegments = lanePath.slice(1).map((b, i) => [lanePath[i], b]);
const geylang = corridor('Geylang Road, Lorong 19 to Lorong 21').path.map(p => project(p, sourceMap.origin));
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};

test('Lorong 16 brings in its own buildings, its west corner on Geylang Road and the south-east corner', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  const corner = ['764372570', '764372571', '764372569'];
  const west = ['763764689', '763764687', '763764688', '763764676', '764372580', '763764654'];
  const southEast = ['763764666', '763764665', '763764664'];
  const east = [
    '763764667', '763764668', '454274647', '763764669', '763764670', '763764671', '763764673', '763764672', '763764674', '763764675',
    '121872890', '763764678', '763764679', '763764680', '763764681', '763764682', '763764686', '763764685', '763764684', '763764683',
  ];
  for (const id of [...corner, ...west, ...southEast, ...east]) assert.ok(ids.has(id), id);
  // The Geylang Road row back to Lorong 14 (walked with Lorong 14), the block east of the lane and the Lorong 18 houses
  // (walked with Lorong 18) stay out of this lane's list.
  for (const id of ['764372573', '454254171', '541941365', '454274650', '764372561']) assert.equal(ids.has(id), false, id);
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Lorong 16 Geylang').map(r => r.id).sort(), ['23513325', '632249196', '666011790', '666011791', '776937485']);
});

test('Lorong 16 is walkable from the Geylang Road centreline to the end of its last way in the extract', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  assert.ok(shares('Geylang Road', lane.path[0]));
  assert.ok(shares('Lorong 16 Geylang', lane.path.at(-1)));
  const path = lane.path.map(p => project(p, sourceMap.origin));
  walkable(path, inStudy);
  // The lane runs south, about 190 m to the extract's edge.
  assert.ok(path.at(-1)[1] - path[0][1] > 185);
  // Its junction lies on the Geylang Road corridor from Lorong 19 to Lorong 21, which reaches the west corner's front.
  walkable(corridor('Geylang Road, Lorong 19 to Lorong 21').path.map(p => project(p, sourceMap.origin)), inStudy);
  assert.ok(inStudy([262, 56], 3));
  // The backs of the blocks either side stay outside: the Lorong 14 houses to the west and the Lorong 18 houses to the east.
  for (const p of [[225, 190], [235, 120], [350, 120], [355, 200]]) assert.equal(inStudy(p, 0), false, `${p}`);
});

// Each building's front, sides, upper volumes, review start and naming; `faces` picks the road its front must look at.
const checkHouse = (id, place, spec, segments) => {
  const poly = outline(id), frame = lorong16Frame(poly, spec);
  assertFittings(frame, poly, lorong16Layout(spec, frame.width).boxes);
  for (const side of lorong16Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
  if (!spec.noReview) assertReviews(frame, lorong16Reviews(spec, frame));
  assert.match(spec.evidence, /(April|June) 2024/);
  // Sources cite the source way, or for an authored footprint one of the ways it replaces.
  const ways = [id, ...(building(id).replaces ?? [])];
  assert.ok(spec.sources.some(s => ways.some(w => s.includes(`way/${w}`))), id);
  // The front's outward normal points at the nearest point of its road's centreline.
  const centre = frame.point(frame.width / 2, 0), roadPoint = segments.map(([a, b]) => nearestOnSegment(centre, a, b)).sort((x, y) => x.distance - y.distance)[0].point;
  assert.ok((roadPoint[0] - centre[0]) * frame.nx + (roadPoint[1] - centre[1]) * frame.nz > 0, id);
  // Street-level pieces stay clear of the modelled carriageways, or within 0.25 m of a face flagged heldFlat.
  const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong16Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
  for (const { frame: f, blocks, heldFlat } of faces) {
    const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
    if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
    assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
  }
  // Upper volumes stand inside the footprint.
  for (const up of lorong16Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
  if (place.unnamed) {
    assert.equal(landmarkFor(id), undefined);
    assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
    for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
  } else assert.equal(landmarkFor(id).id, place.id);
};

test('the Lorong 16 exteriors fit their outlines, face the lane and keep their review starts clear', () => {
  for (const place of lorong16) for (const id of place.buildingIds) checkHouse(id, place, place.parts ? { ...place, ...place.parts[id] } : place, laneSegments);
  // One review start per place.
  for (const place of lorong16.filter(p => p.parts)) assert.equal(place.buildingIds.filter(id => !place.parts[id].noReview).length, 1, place.id);
});

test('the Geylang Road houses at the west corner face Geylang Road', () => {
  assert.deepEqual(geylangRow16.map(p => p.buildingIds[0]), ['764372571', '764372570']);
  for (const place of geylangRow16) {
    checkHouse(place.buildingIds[0], place, place, geylang.slice(1).map((b, i) => [geylang[i], b]));
    assert.ok(lorong16Frame(outline(place.buildingIds[0]), place).nz < -.95, place.id);
  }
});

test('Chang Jiang G1 Claypot Frog Porridge is named on the corner and B & S Mini Mart on No. 310, their listing points inside', () => {
  const corner = lorong16.find(p => p.id === 'chang-jiang-g1'), no310 = geylangRow16.find(p => p.id === 'bs-mini-mart');
  assert.equal(landmarkFor('764372569').id, corner.id);
  assert.equal(landmarkFor('764372570').id, no310.id);
  assert.equal(pointInPolygon(project([103.8796966, 1.3124982], map.origin), outline('764372569')), true);
  assert.equal(pointInPolygon(project([103.8796129, 1.3125245], map.origin), outline('764372570')), true);
  // The corner's lane face runs north along the lane; its boards hang on the splay and the Geylang Road front.
  const frame = lorong16Frame(outline('764372569'), corner);
  assert.ok(frame.dz < -.95 && Math.abs(frame.width - 16.18) < .01);
  assert.deepEqual(corner.sides.map(s => s.edge), [1, 0]);
  for (const side of corner.sides) for (const b of side.boards) assert.ok(b.u[0] >= 0 && b.u[1] <= lorong16Frame(outline('764372569'), { frontEdge: side.edge }).width, `${b.u}`);
  assert.equal(no310.boards.length, 1);
});

test('Hotel 81 Geylang is named on No. 20, its listing point inside, its blade between the middle bay and the stair tower', () => {
  const place = lorong16.find(p => p.id === 'hotel-81-geylang');
  assert.equal(landmarkFor('763764687').id, place.id);
  assert.equal(pointInPolygon(project([103.8797191, 1.3117788], map.origin), outline('763764687')), true);
  // The face is laid across its two collinear source edges, the blade on the northern one.
  assert.equal(place.frontEdge, 20);
  assert.deepEqual(place.sides.map(s => s.edge), [19]);
  const blade = place.sides[0].blades[0];
  assert.ok(blade.u > 0 && blade.u < 5.029 && blade.out[1] < 2);
});
