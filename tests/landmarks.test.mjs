import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { landmarks, landmarkFor } from '../src/landmarks.mjs';
import { pointInPolygon } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));

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

test('real landmark identities have unique, existing Lorong 11 footprints and provenance', () => {
  const ids = new Set();
  for (const place of landmarks) {
    assert.ok(place.sources.length > 0);
    assert.ok(place.evidence.length > 30);
    assert.ok(place.height > 3 && place.height < 35);
    for (const id of place.buildingIds) {
      assert.equal(ids.has(id), false, `${id} assigned twice`);
      ids.add(id);
      const building = map.buildings.find(b => b.id === id);
      assert.equal(building?.street, 'Lorong 11 Geylang');
      assert.equal(landmarkFor(id), place);
    }
  }
  assert.equal(landmarkFor('unknown'), undefined);
});

test('provisional appearance and historical address matches stay explicitly documented', () => {
  assert.match(landmarks.find(p => p.id === 'lok-fu').evidence, /illustrative/);
  assert.match(landmarks.find(p => p.id === 'agape-centre').evidence, /provisional/);
  assert.equal(map.buildings.find(b => b.id === landmarks[0].buildingIds[0]).number, '11');
  assert.equal(map.buildings.find(b => b.id === landmarkFor('1223407885').buildingIds[0]).number, '17');
});
