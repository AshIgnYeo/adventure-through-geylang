import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { landmarks, landmarkFor } from '../src/landmarks.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));

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
