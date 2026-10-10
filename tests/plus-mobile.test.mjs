import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { plusMobile, plusMobileFrame, plusMobileLayout, plusMobileReviews, elevation } from '../src/plus-mobile-layout.mjs';
import { gableRoof } from '../src/gable-roof-layout.mjs';
import { landmarkFor } from '../src/landmarks.mjs';
import { project, pointInPolygon, nearestOnSegment, roadWidth } from '../src/geo.mjs';

const map = JSON.parse(fs.readFileSync(new URL('../public/map.json', import.meta.url), 'utf8'));
const source = map.buildings.find(b => b.id === '1223454587');
const poly = source.coordinates.slice(0, -1).map(p => project(p, map.origin));
const frame = plusMobileFrame(poly);
const roadSegments = map.roads.flatMap(r => r.coordinates.slice(1).map((p, i) => ({ road: r, a: project(r.coordinates[i], map.origin), b: project(p, map.origin) })));

test('Plus Mobile keeps the addressed No. 22 Lorong 13 outline containing its mapped point', () => {
  assert.equal(source.number, '22'); assert.equal(source.street, 'Lorong 13 Geylang');
  assert.equal(pointInPolygon([103.8775098, 1.3134628], source.coordinates), true);
  assert.deepEqual(landmarkFor(source.id).buildingIds, [source.id]);
  for (const id of ['1223454588', '1223454586']) assert.equal(landmarkFor(id), undefined, `neighbour ${id} stays generic`);
  assert.ok(Math.abs(frame.width - 5.81) < .02);
  // The frame runs north to south along the Lorong 13 front, facing the lane.
  const nearest = roadSegments.map(s => ({ ...nearestOnSegment(frame.point(frame.width / 2), s.a, s.b), name: s.road.name })).sort((x, y) => x.distance - y.distance)[0];
  assert.equal(nearest.name, 'Lorong 13 Geylang');
  const toLane = roadSegments.filter(s => s.road.name === 'Lorong 13 Geylang').map(s => nearestOnSegment(frame.point(frame.width / 2, 3), s.a, s.b).distance);
  const fromLane = roadSegments.filter(s => s.road.name === 'Lorong 13 Geylang').map(s => nearestOnSegment(frame.point(frame.width / 2, -3), s.a, s.b).distance);
  assert.ok(Math.min(...toLane) < Math.min(...fromLane), 'out points towards the lane');
});

test('Plus Mobile is a single storey with a short tiled front slope', () => {
  const roof = gableRoof(frame, plusMobile);
  // The coping peak was triangulated about 3.4 m behind the wall, at about 6.3 m.
  assert.ok(Math.abs(roof.run - 3.35) < .1 && plusMobile.ridgeHeight > 6.1 && plusMobile.ridgeHeight < 6.5);
  assert.ok(roof.pitch > 28 && roof.pitch < 35);
  assert.ok(plusMobile.height < 4.5, 'single storey');
});

test('Plus Mobile fittings stay in the frontage and follow the measured order', () => {
  const { boxes, sign, advert, serviceBoard, plate, canopy } = plusMobileLayout(frame.width);
  for (const b of boxes) assert.ok(b.u - b.w / 2 >= -1e-8 && b.u + b.w / 2 <= frame.width + 1e-8, b.name);
  const E = elevation;
  assert.ok(E.leftShutter[1] < serviceBoard.left && serviceBoard.right < E.rightShutter[0], 'the service board sits between the shutters');
  assert.ok(plate.left >= serviceBoard.left && plate.bottom > serviceBoard.top, 'the door plate is above the service board');
  assert.ok(sign.bottom > E.leftShutter[2] && advert.bottom > E.rightShutter[2] && canopy.inner > Math.max(sign.top, advert.top));
  assert.ok(canopy.inner < plusMobile.height && canopy.outer > canopy.inner);
  // The canopy and its walkway stay clear of the estimated Lorong 13 carriageway, about 3.2 m from the wall.
  for (const s of roadSegments) for (const u of [0, frame.width]) assert.ok(nearestOnSegment(frame.point(u, canopy.depth), s.a, s.b).distance > roadWidth(s.road) / 2 + 1);
});

test('Plus Mobile review starts face the frontage and stay walkable', () => {
  const low = project(map.bounds.slice(0, 2), map.origin), high = project(map.bounds.slice(2), map.origin);
  for (const { p, yaw } of plusMobileReviews(frame)) {
    assert.ok(p[0] > low[0] + 3 && p[0] < high[0] - 3 && p[1] > high[1] + 3 && p[1] < low[1] - 3);
    const centre = frame.point(frame.width / 2, 0);
    assert.ok(Math.cos((yaw - Math.atan2(p[0] - centre[0], p[1] - centre[1]) * 180 / Math.PI) * Math.PI / 180) > .9);
    for (const b of map.buildings) {
      const o = b.coordinates.slice(0, -1).map(c => project(c, map.origin));
      assert.equal(pointInPolygon(p, o), false);
      for (let i = 0; i < o.length; i++) assert.ok(nearestOnSegment(p, o[i], o[(i + 1) % o.length]).distance > .28);
    }
  }
});
