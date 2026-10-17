import test from 'node:test';
import assert from 'node:assert/strict';
import { project, studyArea, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';
import { lorong14, lorong14Frame, lorong14Layout, lorong14Reviews, lorong14Sides, lorong14Upper } from '../src/lorong-14-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { sourceMap, assertFittings, assertReviews, assertClearOfCarriageway, outline, map, building } from './helpers.mjs';

const corridor = name => sourceMap.corridors.find(c => c.name === name);
const lane = corridor('Lorong 14 Geylang');
const lanePath = lane.path.map(p => project(p, sourceMap.origin)), laneSegments = lanePath.slice(1).map((b, i) => [lanePath[i], b]);
const roadPath = name => sourceMap.roads.filter(r => r.name === name).flatMap(r => r.coordinates.slice(1).map((p, i) => [project(r.coordinates[i], sourceMap.origin), project(p, sourceMap.origin)]));
// Every metre along a path keeps the 3 m walking margin.
const walkable = (path, inStudy) => {
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]));
    for (let k = 0; k <= n; k++) assert.ok(inStudy([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n], 3));
  }
};
const west = ['121872892', '764372595'];
const east = ['454274618', '454274615', '454274614', '454274611', '454274608', '764372579', '764372578', '454274677', '764372577', '476141643'];
const corner = ['454254175', '454254174', '454254173', '454254172'];
const geylangRow = ['454254171', '454254170', '454254169', '764372576', '475173286', '764372575', '764372574', '764372572', '764372573'];

test('Lorong 14 brings in its own buildings, its east corner block and the Geylang Road row east to Lorong 16', () => {
  const ids = new Set(sourceMap.buildings.map(b => b.id));
  for (const id of [...west, ...east, ...corner, ...geylangRow]) assert.ok(ids.has(id), id);
  // Lorong 16's corner (Nos. 310-314) and its west side are walked with Lorong 16, not here; the Talma Road row waits.
  const claimed = new Set(lorong14.flatMap(p => p.buildingIds));
  for (const id of ['764372570', '764372571', '764372569', '763764689', '763764687']) assert.equal(claimed.has(id), false, id);
  for (const id of ['454438325', '454438317']) assert.equal(ids.has(id), false, id);
  assert.equal(sourceMap.roads.filter(r => r.name === 'Lorong 14 Geylang').length, 13);
  // Talma Road's east mouth is kept as road.
  assert.deepEqual(sourceMap.roads.filter(r => r.name === 'Talma Road').map(r => r.id), ['644896804']);
});

test('Lorong 14 is walkable from the Geylang Road centreline to the edge of the extract, and along the forecourt of Nos. 302-308', () => {
  const inStudy = studyArea(sourceMap);
  const shares = (name, end) => sourceMap.roads.some(r => r.name === name && r.coordinates.some(c => c[0] === end[0] && c[1] === end[1]));
  // The mouth shares Lorong 17's node on the Geylang Road centreline; the lane ends where the extract's last way does.
  assert.ok(shares('Geylang Road', lane.path[0]) && shares('Lorong 17 Geylang', lane.path[0]));
  assert.ok(shares('Talma Road', sourceMap.roads.find(r => r.id === '644896804').coordinates.at(-1)) && lane.path.some(p => shares('Talma Road', p)));
  walkable(lane.path.map(p => project(p, sourceMap.origin)), inStudy);
  walkable(corridor('Geylang Road, the forecourt of Nos. 302-308').path.map(p => project(p, sourceMap.origin)), inStudy);
  // The Geylang Road faces from No. 284 to No. 308 are inside the corridors, a metre in front of each.
  for (const id of [...corner, ...geylangRow]) {
    const o = outline(id), [a, b] = o.map((p, i) => [p, o[(i + 1) % o.length]]).sort((x, y) => Math.min(x[0][1], x[1][1]) + Math.max(x[0][1], x[1][1]) - Math.min(y[0][1], y[1][1]) - Math.max(y[0][1], y[1][1]))[0];
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 1];
    assert.ok(inStudy(mid, 0), id);
  }
  // The backs of the blocks either side stay outside: behind the east side towards Lorong 16, behind Wing Fong Court
  // and Wing Fong Mansions towards Lorong 12, and the back lane behind the Geylang Road row.
  for (const p of [[245, 150], [240, 212], [150, 140], [165, 262], [240, 95]]) assert.equal(inStudy(p, 0), false, `${p}`);
  // The lane's last way ends at the extract's edge, about 1.3108 N; the lane runs on south beyond it (question 52).
  assert.ok(Math.abs(lane.path.at(-1)[1] - 1.3108) < .0002);
});

test('the Lorong 14 exteriors fit their outlines, face their streets and keep their review starts clear', () => {
  // Each building, with a place over several buildings built from its parts.
  const houses = lorong14.flatMap(place => place.buildingIds.map(id => ({ id, place, spec: place.parts ? { ...place, ...place.parts[id] } : place })));
  for (const { id, place, spec } of houses) {
    const poly = outline(id), frame = lorong14Frame(poly, spec);
    assertFittings(frame, poly, lorong14Layout(spec, frame.width).boxes);
    for (const side of lorong14Sides(spec, poly)) assertFittings(side.frame, poly, side.boxes);
    if (!spec.noReview && spec.review?.at === undefined) assertReviews(frame, lorong14Reviews(spec, frame));
    // A face running on past the corridor has its review start opposite a point of its walkable part.
    if (!spec.noReview && spec.review?.at !== undefined) {
      const [r] = lorong14Reviews(spec, frame), inStudy = studyArea(map), t = frame.point(spec.review.at, 0);
      assert.ok(inStudy(r.p, 3), id);
      for (const b of map.buildings) assert.equal(pointInPolygon(r.p, b.coordinates.slice(0, -1).map(c => project(c, map.origin))), false, b.id);
      assert.ok(Math.cos((r.yaw - Math.atan2(r.p[0] - t[0], r.p[1] - t[1]) * 180 / Math.PI) * Math.PI / 180) > .99);
    }
    assert.match(spec.evidence, /June 2024/);
    const ways = [id, ...(building(id).replaces ?? [])];
    assert.ok(spec.sources.some(s => ways.some(w => s.includes(`way/${w}`))), id);
    // Every front looks across its street: its outward normal points at the nearest point of the street's centreline.
    const segments = spec.reviewRoad === 'Lorong 14 Geylang' ? laneSegments : roadPath(spec.reviewRoad);
    const centre = frame.point(frame.width / 2, 0), streetPoint = segments.map(([a, b]) => nearestOnSegment(centre, a, b)).sort((x, y) => x.distance - y.distance)[0].point;
    assert.ok((streetPoint[0] - centre[0]) * frame.nx + (streetPoint[1] - centre[1]) * frame.nz > 0, id);
    // Street-level pieces stay clear of the modelled carriageways, or within 0.25 m of a face flagged heldFlat.
    const faces = [{ frame, blocks: spec.blocks ?? [], heldFlat: spec.heldFlat }, ...lorong14Sides(spec, poly).map((side, i) => ({ frame: side.frame, blocks: spec.sides[i].blocks ?? [], heldFlat: spec.sides[i].heldFlat ?? spec.heldFlat }))];
    for (const { frame: f, blocks, heldFlat } of faces) {
      const out = blocks.filter(b => b.out > 0 && b.h[0] < 5);
      if (heldFlat) { for (const b of out) assert.ok(b.out + b.depth / 2 <= .25, b.name); continue; }
      assertClearOfCarriageway(out.flatMap(b => [f.point(b.u[0], b.out + b.depth / 2), f.point(b.u[1], b.out + b.depth / 2)]));
    }
    // Upper volumes stand inside the footprint.
    for (const up of lorong14Upper(spec, frame)) for (const p of up.points) assert.ok(pointInPolygon(p, poly) || poly.some((a, i) => nearestOnSegment(p, a, poly[(i + 1) % poly.length]).distance < .05), id);
    if (place.unnamed) {
      assert.equal(landmarkFor(id), undefined);
      assert.equal(spec.boards, undefined); assert.equal(spec.blades, undefined);
      for (const side of spec.sides ?? []) { assert.equal(side.boards, undefined); assert.equal(side.blades, undefined); }
    } else assert.equal(landmarkFor(id).id, place.id);
  }
  for (const place of lorong14.filter(p => p.parts)) assert.equal(place.buildingIds.filter(id => !place.parts[id].noReview).length, 1, place.id);
});

test('Wing Fong Court is named after the lettering on its corner wall, its listing at No. 12 recorded', () => {
  const place = lorong14.find(p => p.id === 'wing-fong-court');
  assert.equal(landmarkFor('121872892').id, place.id);
  assert.equal(building('121872892').number, '10');
  // Google Maps puts its listing (12 Lor 14 Geylang) inside Wing Fong Mansions, and geocodes No. 10 inside this outline.
  assert.equal(pointInPolygon(project([103.8790562, 1.3106506], map.origin), outline('764372595')), true);
  assert.equal(pointInPolygon(project([103.8788274, 1.3118668], map.origin), outline('121872892')), true);
  assert.match(place.address, /12 Lorong 14/);
  // The lane face runs north from the Talma Road end; six bays rise to dormers at about 27.3 m over a 24.8 m wall.
  const frame = lorong14Frame(outline('121872892'), place);
  assert.ok(frame.dz < -.95 && Math.abs(frame.width - 85.574) < .01);
  assert.equal(place.height, 24.8);
  assert.equal(place.blocks.filter(b => b.name === 'dormer apex').length, 11);
  // The corner panel hangs on the boundary wall on Talma Road, where it triangulates.
  const talma = place.sides.find(s => s.edge === 1), f = lorong14Frame(outline('121872892'), { frontEdge: 1 });
  assert.equal(talma.boards.length, 1);
  const p = f.point((talma.boards[0].u[0] + talma.boards[0].u[1]) / 2, talma.boards[0].out);
  assert.ok(Math.hypot(p[0] - 189.2, p[1] - 190.3) < 1.5, `${p}`);
});

test('Wing Fong Mansions is named after its corner panel and listing, its face running on past the extract', () => {
  const place = lorong14.find(p => p.id === 'wing-fong-mansions');
  assert.equal(landmarkFor('764372595').id, place.id);
  assert.equal(building('764372595').number, '12');
  // Its listing point lies inside the outline.
  assert.equal(pointInPolygon(project([103.8789011, 1.3109433], map.origin), outline('764372595')), true);
  // The lane face is 122 m long and runs south past the lane's last way; the review start is at its north end.
  const frame = lorong14Frame(outline('764372595'), place), end = lane.path.at(-1), south = frame.point(0, 0);
  assert.ok(Math.abs(frame.width - 122.353) < .01);
  assert.ok(south[1] - project(end, sourceMap.origin)[1] > 80);
  assert.ok(place.review.at > 100);
  // The eight-storey block is a raised volume over the four-storey annex's height.
  assert.equal(place.height, 14.3);
  assert.deepEqual([place.upper[0].from, place.upper[0].to], [14.3, 24.8]);
  // The panel on the corner wall stands where it triangulates, about (194.5, 212.4).
  const side = place.sides.find(s => s.edge === 74), f = lorong14Frame(outline('764372595'), { frontEdge: 74 });
  const p = f.point((side.boards[0].u[0] + side.boards[0].u[1]) / 2, side.boards[0].out);
  assert.ok(Math.hypot(p[0] - 194.5, p[1] - 212.4) < 1.5, `${p}`);
});

test('樂緣 is named after its board, its listing point inside No. 31 and its postal code recorded', () => {
  const place = lorong14.find(p => p.id === 'le-yuan');
  assert.equal(landmarkFor('454274611').id, place.id);
  assert.equal(building('454274611').number, '31');
  assert.equal(pointInPolygon(project([103.8793595, 1.3111851], map.origin), outline('454274611')), true);
  assert.match(place.address, /398933/);
  // The board hangs at the canopy's front, about 6 m out, within the house's photographed width.
  assert.equal(place.boards.length, 1);
  assert.ok(Math.abs(place.boards[0].out - 6.05) < .01);
  assert.ok(place.boards[0].u[0] >= 0 && place.boards[0].u[1] <= 6.862);
});

test('the ibis budget hotel is named after its sign and listing, its later name recorded', () => {
  const place = lorong14.find(p => p.id === 'ibis-budget-pearl');
  assert.equal(landmarkFor('454274677').id, place.id);
  assert.equal(building('454274677').number, '21');
  assert.equal(pointInPolygon(project([103.8792824, 1.3116125], map.origin), outline('454274677')), true);
  assert.match(place.evidence, /Vanda/);
  // Eight storeys: seven rows of windows over the ground floor, to a 29.6 m parapet.
  assert.equal(new Set(place.windows.map(w => w.h[0])).size, 7);
  assert.equal(place.height, 29.6);
  // The sign stands where it triangulates, about (214.5, 176.4).
  const f = lorong14Frame(outline('454274677'), place), b = place.boards[0], p = f.point((b.u[0] + b.u[1]) / 2, b.out);
  assert.ok(Math.hypot(p[0] - 214.5, p[1] - 176.4) < 1, `${p}`);
});

test('Central Imperial is named after its name board and listing, the board at the fence line', () => {
  const place = lorong14.find(p => p.id === 'central-imperial');
  assert.equal(landmarkFor('764372577').id, place.id);
  assert.equal(building('764372577').number, '3');
  assert.equal(pointInPolygon(project([103.8791573, 1.3119207], map.origin), outline('764372577')), true);
  const f = lorong14Frame(outline('764372577'), place), b = place.boards[0], p = f.point((b.u[0] + b.u[1]) / 2, b.out);
  assert.ok(Math.hypot(p[0] - 200.7, p[1] - 126.8) < 1, `${p}`);
  // Seven floors of balconies over the ground floor.
  assert.equal(new Set(place.blocks.filter(x => x.name === 'wavy balcony slab').map(x => x.h[1])).size, 7);
});

test('The Amazing Inn is named after its lettering and listing, its corner on the source corner', () => {
  const place = lorong14.find(p => p.id === 'amazing-inn');
  assert.equal(landmarkFor('476141643').id, place.id);
  assert.equal(building('476141643').number, '1');
  assert.equal(pointInPolygon(project([103.8790912, 1.3121824], map.origin), outline('476141643')), true);
  const frame = lorong14Frame(outline('476141643'), place);
  assert.ok(Math.abs(frame.width - 6.824) < .01 && frame.dz > .95);
  assert.equal(place.boards.length, 1);
});

test('the east corner block names its four signed tenants, Valu$ running on to No. 292', () => {
  const named = { '454254175': 'little-charcoal-stove', '454254174': 'sea-mu-to', '454254173': 'em-salon-spa', '454254172': 'valu' };
  for (const [id, place] of Object.entries(named)) assert.equal(landmarkFor(id).id, place, id);
  // Listing points: Sea Mu To and both No. 288 tenants inside their ways, Valu$ inside No. 292's, Little Charcoal Stove
  // just west of No. 284's source outline.
  assert.equal(pointInPolygon(project([103.8790479, 1.312413], map.origin), outline('454254174')), true);
  for (const p of [[103.8790838, 1.3124835], [103.8790906, 1.3125083]]) assert.equal(pointInPolygon(project(p, map.origin), outline('454254173')), true);
  assert.equal(pointInPolygon(project([103.8791616, 1.312518], map.origin), outline('454254171')), true);
  const stove = project([103.8789681, 1.3124911], map.origin), o = outline('454254175');
  assert.equal(pointInPolygon(stove, o), false);
  assert.ok(o.some((a, i) => nearestOnSegment(stove, a, o[(i + 1) % o.length]).distance < 1.6));
  // Every Geylang Road front carries its board on the front beam.
  for (const place of lorong14.filter(p => ['sea-mu-to', 'em-salon-spa'].includes(p.id))) assert.ok(place.boards[0].h[0] === 3.0);
});

test('the Geylang Road row east to Lorong 16 is modelled to No. 308, and leaves No. 310 to the Lorong 16 walk', () => {
  for (const id of geylangRow) assert.ok(lorong14.some(p => p.buildingIds.includes(id)), id);
  assert.equal(lorong14.some(p => p.buildingIds.includes('764372570')), false);
  // Named where a listing and a sign agree: Valu$ over Nos. 290-292, The Green Essential, 傅兴记 and B&S Food Corner
  // over the two houses of No. 302's building, and B&S hardware at No. 308.
  assert.equal(landmarkFor('454254171').id, 'valu');
  assert.equal(landmarkFor('454254169').id, 'green-essential');
  for (const id of ['764372575', '764372574']) assert.equal(landmarkFor(id).id, 'fu-xing-ji');
  assert.equal(landmarkFor('764372573').id, 'bs-hardware-lorong-16');
  for (const id of ['454254170', '764372576', '475173286', '764372572']) assert.equal(landmarkFor(id), undefined, id);
  // 傅兴记's listing point inside No. 302, and B&S hardware's inside No. 308.
  assert.equal(pointInPolygon(project([103.87943, 1.3124278], map.origin), outline('764372575')), true);
  assert.equal(pointInPolygon(project([103.8795678, 1.3124297], map.origin), outline('764372573')), true);
});
