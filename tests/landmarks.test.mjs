import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { landmarks, landmarkFor, landmarkReviewPoint } from '../src/landmarks.mjs';
import { pointInPolygon, project, nearestOnSegment } from '../src/geo.mjs';
import { withAuthoredFootprints } from '../src/authored-footprints.mjs';

const sourceMap = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
// Landmarks are checked against the rendered map, with the owner-approved authored footprints applied.
const map = withAuthoredFootprints(sourceMap);

test('Masjid Haji Mohd Salleh stands on its authored No. 245 footprint, replacing the named source way', () => {
  const source = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
  const way = source.match(/<way id="454254204"[\s\S]*?<\/way>/)?.[0];
  assert.ok(way);
  assert.match(way, /<tag k="name" v="Masjid Haji Mohd Salleh"\/>/);
  assert.match(way, /<tag k="addr:housenumber" v="245"\/>/);
  assert.match(way, /<tag k="building" v="mosque"\/>/);
  const place = landmarks.find(p => p.id === 'haji-mohd-salleh-mosque');
  assert.deepEqual(place.buildingIds, ['gr-245']);
  assert.equal(place.address, '245 Geylang Road');
  assert.equal(place.frontEdge, 0);
  assert.ok(map.replacedBuildings.some(b => b.id === '454254204'));
  assert.equal(place.reviewRoad, 'Geylang Road');
  assert.equal(place.reviewOffset, 8);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.street, 'Geylang Road');
  assert.equal(building.number, '245');
  const poly = building.coordinates.slice(0, -1).map(p => project(p, map.origin));
  const frontWidth = Math.hypot(poly[1][0] - poly[0][0], poly[1][1] - poly[0][1]);
  assert.ok(Math.abs(frontWidth - 20.3) < .01);
  let a = poly[place.frontEdge], v = poly[(place.frontEdge + 1) % poly.length];
  const centre = [poly.reduce((sum, p) => sum + p[0], 0) / poly.length, poly.reduce((sum, p) => sum + p[1], 0) / poly.length];
  const mid = a.map((value, i) => (value + v[i]) / 2);
  let dx = (v[0] - a[0]) / frontWidth, dz = (v[1] - a[1]) / frontWidth;
  if (-dz * (mid[0] - centre[0]) + dx * (mid[1] - centre[1]) < 0) { [a, v] = [v, a]; dx = -dx; dz = -dz; }
  const segments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({name: r.name, a: project(r.coordinates[i], map.origin), b: project(p, map.origin)})));
  const road = landmarkReviewPoint(place, mid, segments);
  const review = [road[0] - dz * place.reviewOffset, road[1] + dx * place.reviewOffset];
  assert.ok(Math.hypot(review[0] - mid[0], review[1] - mid[1]) > 17);
  for (const candidate of map.buildings) assert.equal(pointInPolygon(review, candidate.coordinates.map(c => project(c, map.origin))), false);
  assert.equal(landmarkFor(building.id), place);
  assert.match(place.evidence, /June 2024 Street View shows four storeys/);
  assert.match(place.evidence, /authored footprint \(gr-245\)/);
  assert.match(place.evidence, /no interior is reconstructed/);
});

test('Leong Kee keeps the provisional three-bay corner assignment together without claiming the next unit', () => {
  const place = landmarks.find(p => p.id === 'leong-kee');
  assert.deepEqual(place.buildingIds, ['454254214', '454254213', '454254212']);
  const mappedPoint = [103.877248, 1.3124409];
  assert.equal(pointInPolygon(mappedPoint, map.buildings.find(b => b.id === '454254213').coordinates), true);
  assert.equal(pointInPolygon(mappedPoint, map.buildings.find(b => b.id === '454254214').coordinates), false);
  assert.equal(pointInPolygon(mappedPoint, map.buildings.find(b => b.id === '454254212').coordinates), false);
  for (const id of place.buildingIds) assert.equal(landmarkFor(id), place);
  assert.equal(landmarkFor('454254211'), undefined);
  assert.equal(place.frontEdge, 2);
  assert.match(place.evidence, /June 2024/);
  assert.match(place.evidence, /without asserting ownership/);
  assert.match(place.evidence, /middle one 梁记沙煲田鸡粥 LEONG KEE CLAYPOT FROG PORRIDGE/);
  assert.match(place.evidence, /provisional/);
  for (let i = 1; i < place.buildingIds.length; i++) {
    const a = map.buildings.find(b => b.id === place.buildingIds[i - 1]).coordinates.slice(0, -1);
    const b = map.buildings.find(b => b.id === place.buildingIds[i]).coordinates.slice(0, -1);
    assert.equal(a.filter(p => b.some(q => p[0] === q[0] && p[1] === q[1])).length, 2);
  }
});

test('Leong Kee front review uses Geylang Road even though Lorong 11 is closer', () => {
  const place = landmarks.find(p => p.id === 'leong-kee');
  const poly = map.buildings.find(b => b.id === place.reviewBuildingId).coordinates.map(p => project(p, map.origin));
  const mid = poly[place.frontEdge].map((v, i) => (v + poly[place.frontEdge + 1][i]) / 2);
  const segments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({name: r.name, a: project(r.coordinates[i], map.origin), b: project(p, map.origin)})));
  const nearestRoad = segments.map(s => ({...nearestOnSegment(mid, s.a, s.b), name: s.name})).sort((a,b) => a.distance - b.distance)[0];
  assert.equal(nearestRoad.name, 'Lorong 11 Geylang');
  const p = landmarkReviewPoint(place, mid, segments);
  assert.ok(segments.filter(s => s.name === 'Geylang Road').some(s => nearestOnSegment(p, s.a, s.b).distance < 1e-8));
  assert.ok(p[1] > mid[1], 'review sits south of the front-facing wall');
  for (const b of map.buildings) assert.equal(pointInPolygon(p, b.coordinates.map(c => project(c, map.origin))), false);
});

test('Hainan Goh uses the visibly numbered No. 20B frontage, excluding adjoining units and displaced pin', () => {
  const place = landmarks.find(p => p.id === 'hainan-goh');
  assert.deepEqual(place.buildingIds, ['1223250202']);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '20B');
  assert.equal(place.address, '20C Lorong 11 Geylang, second storey');
  for (const [id, number] of [['1223250203', '22'], ['1223250201', '20']]) {
    const neighbour = map.buildings.find(b => b.id === id);
    assert.equal(neighbour.number, number);
    assert.equal(building.coordinates.slice(0, -1).filter(p => neighbour.coordinates.some(q => p[0] === q[0] && p[1] === q[1])).length, 2);
    assert.notEqual(landmarkFor(id), place);
  }
  assert.equal(pointInPolygon([103.8772003, 1.3129254], building.coordinates), false);
  assert.match(place.evidence, /April 2024/);
  assert.match(place.evidence, /separate ground-floor shop is neutral/);
});

test('Canton Wong stays on No. 31, now the re-spaced footprint beside No. 29A, excluding the displaced Maps pin', () => {
  const place = landmarks.find(p => p.id === 'canton-wong');
  assert.deepEqual(place.buildingIds, ['l11w-31']);
  assert.equal(place.address, '31A Lorong 11 Geylang');
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '31'); assert.equal(building.geometrySource, 'authored-estimate');
  assert.ok(building.replaces.includes('1223407878'));
  const south = map.buildings.find(b => b.id === 'l11w-29a');
  assert.equal(south.number, '29A');
  assert.ok(south.coordinates.slice(0, -1).filter(p => building.coordinates.some(q => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-9)).length === 2, 'No. 31 meets No. 29A');
  const shared = building.coordinates.slice(0, -1).filter(p => south.coordinates.some(q => p[0] === q[0] && p[1] === q[1]));
  assert.equal(shared.length, 2, 'source No. 31 shares a boundary with visually identified No. 29');
  // The listing pin is displaced north; it must not determine the assignment.
  const listingPin = [103.8767557, 1.3134921];
  assert.equal(pointInPolygon(listingPin, building.coordinates), false);
  for (const id of ['1223407876', '1223407877', '1223407879']) assert.notEqual(landmarkFor(id), place);
  assert.match(place.evidence, /upper storey and stair entrance/);
  assert.match(place.evidence, /ground-floor shop is neutral/);
  assert.match(place.evidence, /April 2024/);
});

test('S.M. Khek Leow uses only No. 4, without expanding the adjacent Agape assignment', () => {
  const place = landmarks.find(p => p.id === 'sm-khek-leow');
  assert.deepEqual(place.buildingIds, ['1223250215']);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '4');
  // Association point in Google Maps, inspected 29 September 2026.
  const mappedPlace = [103.8771349, 1.3127035];
  assert.equal(pointInPolygon(mappedPlace, building.coordinates), true);
  const agape = landmarks.find(p => p.id === 'agape-centre');
  assert.deepEqual(agape.buildingIds, ['1223250213', '1223250216', '1223250217']);
  for (const id of ['1223250214', ...agape.buildingIds]) {
    assert.notEqual(landmarkFor(id), place);
    assert.equal(pointInPolygon(mappedPlace, map.buildings.find(b => b.id === id).coordinates), false);
  }
  assert.match(place.evidence, /April 2024/);
  assert.match(place.evidence, /simplified ornament/);
});

test('SHG historical frontage uses No. 36 and excludes the adjoining buildings', () => {
  const place = landmarks.find(p => p.id === 'shg-engineering');
  assert.deepEqual(place.buildingIds, ['1223250208']);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '36');
  // Seng Hup Guan place point in Google Maps, inspected 29 September 2026.
  const mappedPlace = [103.8768642, 1.3136079];
  assert.equal(pointInPolygon(mappedPlace, building.coordinates), true);
  for (const id of ['1223250206', 'l11-38']) {
    assert.notEqual(landmarkFor(id), place);
    assert.equal(pointInPolygon(mappedPlace, map.buildings.find(b => b.id === id).coordinates), false);
  }
  assert.match(place.evidence, /April 2024/);
  assert.match(place.evidence, /current occupancy unresolved/);
});

test('Ho San Kong Hoey uses only No. 24 containing the corroborating mapped place point', () => {
  const place = landmarks.find(p => p.id === 'ho-san-kong-hoey');
  assert.deepEqual(place.buildingIds, ['1223250200']);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '24');
  // Coordinates displayed by Google Maps for the association, inspected 29 Sep 2026.
  const mappedPlace = [103.8769864, 1.3132484];
  assert.equal(pointInPolygon(mappedPlace, building.coordinates), true);
  for (const id of ['1223250203', '1223250204']) {
    assert.notEqual(landmarkFor(id), place);
    assert.equal(pointInPolygon(mappedPlace, map.buildings.find(b => b.id === id).coordinates), false);
  }
  assert.match(place.evidence, /April 2024/);
  assert.match(place.evidence, /estimated/);
  assert.match(place.evidence, /not an additional footprint/);
});

test('Faith Mission Home matches the named source point inside No. 12 without claiming adjoining units', () => {
  const source = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
  const node = source.match(/<node\b[^>]*id="11346722109"[^>]*>[\s\S]*?<\/node>/)?.[0];
  assert.ok(node);
  assert.match(node, /<tag k="name" v="Faith Mission Home"\/>/);
  assert.match(node, /<tag k="addr:housenumber" v="12"\/>/);
  const place = landmarks.find(p => p.id === 'faith-mission-home');
  assert.deepEqual(place.buildingIds, ['1223250210']);
  const building = map.buildings.find(b => b.id === place.buildingIds[0]);
  assert.equal(building.number, '12');
  const point = [Number(node.match(/lon="([^"]+)"/)[1]), Number(node.match(/lat="([^"]+)"/)[1])];
  assert.equal(pointInPolygon(point, building.coordinates), true);
  assert.notEqual(landmarkFor('1223250211'), place);
  assert.notEqual(landmarkFor('1223250217'), place);
});

test('real landmark identities have unique, existing street-study footprints and provenance', () => {
  const ids = new Set();
  for (const place of landmarks) {
    assert.ok(place.sources.length > 0);
    assert.ok(place.evidence.length > 30);
    // The tallest landmark is the ten-storey Yi Xiu Factory Building, about 36 m.
    assert.ok(place.height > 3 && place.height < 40);
    for (const id of place.buildingIds) {
      assert.equal(ids.has(id), false, `${id} assigned twice`);
      ids.add(id);
      const building = map.buildings.find(b => b.id === id);
      if (['leong-kee', 'buddhist-art-centre', 'eat-first', 'sik-wai-sin', 'rr-motor', 'golden-jade', 'ktv-277', 'eros', 'rozel-furniture', 'jh-hotel', 'nanyang-fan-clan', 'vintage-and-vine', 'dnova-hotel', 'jxin-hotel', 'bright-star-hotel', 'cheng-yi', 'tan-ser-seng', 'hcsa-community-services'].includes(place.id)) assert.equal(building?.street, null);
      else if (['feng-shang', 'true-jesus-mission', 'yang-clan', 'gyaltsap-tashi-ling', 'rattan-association', 'chinaware-merchants'].includes(place.id)) assert.equal(building?.street, 'Lorong 17 Geylang');
      else if (['nanyang-chee', 'chee-hoe-hong', 'kang-ha-pheng', 'bougainvilla', 'sims-point', 'the-primero', 'lei-zang-si', 'starlon-tektron'].includes(place.id)) assert.equal(building?.street, 'Lorong 19 Geylang');
      else if (['nyingma-kathok', 'bei-chen-gong'].includes(place.id)) assert.equal(building?.street, 'Lorong 21 Geylang');
      else if (['chang-jiang-g1', 'bs-mini-mart', 'hotel-81-geylang', 'then-shen-temple', 'crystal-lodge', 'poh-clan', 'soon-clan'].includes(place.id)) assert.equal(building?.street, null);
      else if (['yaju-hotel', 'summer-view', 'hotel-81-cherry', 'master-tailors', 'chinese-eating-house-owners'].includes(place.id)) assert.equal(building?.street, 'Lorong 12 Geylang');
      else if (['lex-hotel', 'engineering-merchants'].includes(place.id)) assert.equal(building?.street, 'Lorong 8 Geylang');
      else if (['crystal-mansions'].includes(place.id)) assert.equal(building?.street, 'Lorong 6 Geylang');
      else if (['hainan-lim', 'sui-yuan-ju', 'chong-min', 'foo-hui', 'siaw-lim', 'hong-ye-chen', 'plus-mobile', 'k-group', 'muhammadiyah-college', 'bar-lorong-13', 'mister-contracts', 'gems-ville', 'thirteen-bbq', 'buildersmart', 'teck-hoe', 'wunderfolks'].includes(place.id)) assert.equal(building?.street, 'Lorong 13 Geylang');
      else if (['amrise-hotel', 'thye-seng', 'normal-stainless', 'qianjing', 'fok-wai-kee', 'fsl-led-lighting', 'red-dot-running', 'ming-li', 'yap-sun', 'buildersmart-sims', 'ibis-budget-gold', 'red-flag-davco', 'yi-xiu-factory-building', 'shi-cheng-temple', 'bamboo-lounge', 'he-ping', 'lefon-sewing', 'guangxi-gaozhou', 'bike-mart', 'vietsea-ii'].includes(place.id)) assert.equal(building?.street, 'Sims Avenue');
      else if (['k-hotel-1515', 'lam-clan', 'hotel-81-spring', 'sin-chew-tan', 'teck-keow', 'hong-sheng-koon', 'ship-chandlers', 'aecc-jmas', 'bengal-kitchen'].includes(place.id)) assert.equal(building?.street, 'Lorong 15 Geylang');
      else if (['public-free-clinic-society', 'ywam-singapore', 'kim-court', 'the-diamond'].includes(place.id)) assert.equal(building?.street, 'Lorong 9 Geylang');
      else if (['gong-he-guan', 'haji-mohd-salleh-mosque', 'lor-9-frog-porridge', 'chen-hing', 'ting-yu-xuan', 'ke-lai-shun', 'instyle', 'mobile-time', 'shi-hao', 'lor-9-beef-kway-teow', 'wat-dhammasatis', 'lian-seng', 'monster-ink', 'shadow-tattoo', 'nanyang-lian', 'tian-tian', 'taketoys', 'chongqing-xiaomian', 'sheng-siong-301', 'eminent-frog-porridge', 'straits-laundry-331', 'mary-hair-salon', 'scarlett-supermarket'].includes(place.id)) assert.equal(building?.street, 'Geylang Road');
      else assert.equal(building?.street, 'Lorong 11 Geylang');
      assert.equal(landmarkFor(id), place);
    }
  }
  assert.equal(landmarkFor('unknown'), undefined);
});

test('provisional appearance and historical address matches stay explicitly documented', () => {
  assert.equal(landmarks.find(p => p.id === 'lok-fu'), undefined, 'C4 was re-identified as the Guan Keat coffeeshop');
  assert.match(landmarks.find(p => p.id === 'guan-keat').evidence, /Lok Fu was a stall here/);
  assert.match(landmarks.find(p => p.id === 'agape-centre').evidence, /provisional/);
  assert.equal(map.buildings.find(b => b.id === landmarks.find(p => p.id === 'hotel-81-joy').buildingIds[0]).number, '11');
  assert.equal(map.buildings.find(b => b.id === landmarkFor('l11w-17').buildingIds[0]).number, '17');
  assert.equal(landmarkFor('1223407885'), undefined, 'the replaced source way is not rendered');
});
