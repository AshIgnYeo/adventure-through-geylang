import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { ringWest, ringWestFrame, ringWestLayout, ringWestReviews } from './ring-west-layout.mjs';
import { ringSouth } from './ring-south-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const text = (c: CanvasRenderingContext2D, t: string, x: number, y: number, size: number, colour: string, weight: string, family: string, maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${Math.round(size)}px ${family}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y, maxWidth);
};
// Named places only: original lettering after the photographed boards.
const rozelBoard: Draw = (c, w, h) => {
  c.fillStyle = '#6e1f26'; c.fillRect(0, 0, w, h); c.strokeStyle = '#d9c9b0'; c.lineWidth = h * .03; c.strokeRect(h * .04, h * .04, w - h * .08, h * .62);
  text(c, 'Rozel', w / 2, h * .3, h * .38, '#f2ece2', '700', 'Georgia, "Times New Roman", serif', w * .8);
  text(c, 'furniture', w / 2, h * .55, h * .12, '#f2ece2', '400', 'Georgia, serif');
  text(c, '一站式家具广场', w / 2, h * .82, h * .15, '#f2ece2', '600', '"PingFang SC", "Heiti SC", sans-serif', w * .9);
};
// Lex Hotel: orange characters standing on the canopy over the blue fascia lettering.
const lexBoard: Draw = (c, w, h) => {
  c.clearRect(0, 0, w, h); const band = h * .35;
  c.fillStyle = '#2f6fb8'; c.fillRect(0, h - band, w, band);
  text(c, 'LEX HOTEL LORONG 8', w / 2, h - band / 2, band * .62, '#f4f6fa', '700', '"Helvetica Neue", Arial, sans-serif', w * .94);
  c.lineWidth = h * .025; c.strokeStyle = '#f4f6fa'; c.font = `900 ${Math.round(h * .5)}px "PingFang SC", "Heiti SC", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.strokeText('樂斯旅店', w * .36, h * .33, w * .6); text(c, '樂斯旅店', w * .36, h * .33, h * .5, '#ef9a2a', '900', '"PingFang SC", "Heiti SC", sans-serif', w * .6);
};
// Raised gold characters on the lowest balcony of the Lorong 8 block.
const merchantsBoard: Draw = (c, w, h) => {
  c.clearRect(0, 0, w, h); c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowOffsetY = h * .05;
  text(c, [...'新加坡機器廠商公會'].join(' '), w / 2, h * .52, h * .62, '#d9a93a', '700', '"Songti SC", "STSong", serif', w * .98);
};
// White script and numerals on the grey boundary wall.
const crystalBoard: Draw = (c, w, h) => {
  c.clearRect(0, 0, w, h);
  text(c, 'Crystal Mansions', w / 2, h * .32, h * .4, '#f2f2ee', 'italic 600', '"Snell Roundhand", "Apple Chancery", cursive', w * .96);
  text(c, '3 LOR 6', w * .32, h * .76, h * .24, '#f2f2ee', '600', 'Georgia, "Times New Roman", serif');
};
const draws: Record<string, { boards?: Draw[] }> = {
  'rozel-furniture': { boards: [rozelBoard, rozelBoard] }, 'lex-hotel': { boards: [lexBoard] },
  'engineering-merchants': { boards: [merchantsBoard] }, 'crystal-mansions': { boards: [crystalBoard] },
};

/** June 2024 exteriors at the west end of the widened study area, and on Lorongs 6 and 8 to its south. */
export function buildRingWest(world: World, id: string, poly: Point[]) {
  // The Lorong 6 and 8 exteriors (ring-south-layout) share this builder.
  const place = [...ringWest, ...ringSouth].find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  if (place.massing) {
    // Plain walls and a flat roof, with no shopfront dressing.
    const wall = world.mat(place.colour); wall.cull = pc.CULLFACE_NONE; wall.update();
    for (let i = 0; i < poly.length; i++) world.panel(poly[i], poly[(i + 1) % poly.length], 0, place.height, wall);
    const roof = world.mat('#9a9893'); roof.cull = pc.CULLFACE_NONE; roof.update();
    const indices: number[] = []; for (let k = 1; k < poly.length - 1; k++) indices.push(0, k, k + 1);
    world.mesh(`${place.name} roof`, poly.flatMap(p => [p[0], place.height, p[1]]), poly.flatMap(() => [0, 0]), indices, roof);
    return true;
  }
  const frame = ringWestFrame(poly, place);
  buildSimpleHouse(world, place.name, frame, poly, place, ringWestLayout(place, frame.width) as any, draws[place.id] ?? {});
  for (const r of ringWestReviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
