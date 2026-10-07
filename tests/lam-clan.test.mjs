import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { lamClan, lamClanFrame, lamClanLayout, lamClanReviews } from '../src/lam-clan-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const source = map.buildings.find(b => b.id === '1223539233');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = lamClanFrame(poly);
const others = map.buildings.filter(b => b.id !== source.id).map(b => b.coordinates.slice(0, -1).map(p => project(p, map.origin)));

test('Lam Clan Association keeps the addressed No. 3 Lorong 15 outline between Nos. 1 and 5', () => {
  assert.equal(source.number, '3'); assert.equal(source.street, 'Lorong 15 Geylang');
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['1223539232', '1223539234']) assert.equal(landmarkFor(id), undefined);
  const way = xml.match(/<way id="1223539233"[^>]*>[\s\S]*?<\/way>/)[0];
  const nodes = [...way.matchAll(/<nd ref="(\d+)"/g)].map(([, id]) => { const n = xml.match(new RegExp('<node id="' + id + '"[^>]*>'))[0]; return [Number(n.match(/lon="([^"]+)"/)[1]), Number(n.match(/lat="([^"]+)"/)[1])]; });
  assert.deepEqual(source.coordinates, nodes);
  assert.ok(Math.abs(frame.width - 5.80) < .02);
  // The frontage faces east to Lorong 15, and u runs from No. 1 (south) to No. 5 (north).
  assert.ok(frame.nx > .95);
  const no1 = map.buildings.find(b => b.id === '1223539232').coordinates.slice(0, -1).map(p => project(p, map.origin));
  assert.ok(no1.some(p => Math.hypot(p[0] - frame.a[0], p[1] - frame.a[1]) < .5));
});

test('Lam Clan fittings stay in the footprint; the forecourt stays clear of other buildings and inside the study', () => {
  const { boxes, forecourt, lettering, board, band } = lamClanLayout(frame.width);
  for (const box of boxes) {
    assert.ok(box.u - box.w / 2 >= -1e-8 && box.u + box.w / 2 <= frame.width + 1e-8, box.name);
    if (box.out + box.depth / 2 <= 0) for (const x of [-1, 1]) for (const z of [-1, 1]) {
      assert.equal(pointInPolygon(frame.point(box.u + x * (box.w / 2 - .001), box.out + z * (box.depth / 2 - .001)), poly), true, box.name);
    }
  }
  assert.ok(lettering.bottom > band.top && lettering.top < lamClan.parapet && board.top < 3.05);
  const high = project(map.bounds.slice(2), map.origin);
  for (const u of [0, frame.width / 2, frame.width]) for (const out of [.1, forecourt.out]) {
    const p = frame.point(u, out);
    assert.ok(p[0] < high[0] - 3, 'inside the walkable study');
    for (const o of others) assert.equal(pointInPolygon(p, o), false);
  }
});

test('Lam Clan review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of lamClanReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, -.3);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .97);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
