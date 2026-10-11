import type { World, Point } from './world';
import { geylangNorth, geylangNorthFrame, geylangNorthLayout, geylangNorthReviews } from './geylang-north-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const lianSengBoard: Draw = (c, w, h) => {
  c.fillStyle = '#18191a'; c.fillRect(0, 0, w, h); c.textBaseline = 'middle';
  c.fillStyle = '#e9e6dc'; c.textAlign = 'left'; c.font = `700 ${h * .32}px "Songti SC", serif`; c.fillText('聯 成 衡 器', w * .04, h * .3, w * .3);
  c.textAlign = 'center'; c.font = `italic 600 ${h * .3}px Georgia, serif`; c.fillText('Lian Seng Weighing Scale Co.', w * .62, h * .3, w * .64);
  c.fillStyle = '#262728'; c.fillRect(0, h * .58, w, h * .42);
  c.fillStyle = '#e9e6dc'; c.font = `700 ${h * .22}px Arial, sans-serif`; c.fillText('LIAN SENG WEIGHING SCALE CO', w / 2, h * .8, w * .9);
};

/** June 2024 infill on the north side of Geylang Road beside Wat Dhammasatis. */
export function buildGeylangNorth(world: World, id: string, poly: Point[]) {
  const place = geylangNorth.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = geylangNorthFrame(poly, place), layout = geylangNorthLayout(place, frame.width) as any;
  buildSimpleHouse(world, place.name, frame, poly, place, layout, place.id === 'lian-seng' ? { boards: [lianSengBoard] } : {});
  for (const r of geylangNorthReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
