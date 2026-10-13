// Shared by the lane walks (Lorong 17, Lorong 19): a measured elevation laid on one edge of a footprint, with side
// faces on other edges, raised upper volumes and review starts. Each place is a simpleHouseLayout spec plus
// `frontEdge`, optional `sides` and `upper`, and a `review` distance and pitch.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

export const pano = (id, heading, pitch = 12, fov = 90) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=${pitch}&fov=${fov}`;
export const way = id => `https://www.openstreetmap.org/way/${id}`;
export const search = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q).replaceAll('%20', '+')}`;

/** A photographed span [a, b] in metres, laid proportionally on a source edge: u = (s - s0) * k. */
export const lay = (s0, k) => ([a, b]) => [+((a - s0) * k).toFixed(2), +((b - s0) * k).toFixed(2)];

/** Keep the part of a measured elevation between u0 and u1 of its frontage, re-based at u0: a way split later. */
export function sliceSpec(spec, u0, u1) {
  const keep = ([a, b]) => { const l = Math.max(a, u0), r = Math.min(b, u1); return r - l > .02 ? [+(l - u0).toFixed(3), +(r - u0).toFixed(3)] : null; };
  const cut = xs => xs?.flatMap(x => { const u = keep(x.u); return u ? [{ ...x, u }] : []; });
  return { ...spec, windows: cut(spec.windows), vents: cut(spec.vents), blocks: cut(spec.blocks), backFittings: cut(spec.backFittings), piers: spec.piers?.map(keep).filter(Boolean) };
}

export const laneFrame = (poly, place) => frontageFrame(poly, place.frontEdge);
export const laneLayout = (place, width) => simpleHouseLayout(width, place);
const shell = new Set(['upper wall', 'five-foot way floor', 'five-foot way ceiling', 'five-foot way return', 'back wall']);
// Upper volumes over part of a footprint: an outline in the front frame, raised from `from` to `to`, with their own
// fittings on the front edge (the outline's first edge, which lies on the front).
export const laneUpper = (place, frame) => (place.upper ?? []).map(up => ({
  ...up, points: up.outline.map(([u, out]) => frame.point(u, out)),
  boxes: simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: up.windows, vents: up.vents, blocks: up.blocks }).boxes
    .filter(b => !shell.has(b.name)),
}));
export const laneReviews = (place, frame) => facing(frame, place.id, place.review?.distance ?? 8, place.review?.pitch ?? 18);
// Side faces: windows, vents, bands, blocks and drawn signs on another source edge, with no five-foot way.
export const laneSides = (place, poly) => (place.sides ?? []).map(side => {
  const frame = frontageFrame(poly, side.edge);
  const { boxes, boards, blades } = simpleHouseLayout(frame.width, { height: 0, ceiling: 0, fiveFootWay: 0, colours: place.colours, windows: side.windows, vents: side.vents, blocks: side.blocks, bands: side.bands, boards: side.boards, blades: side.blades });
  return { edge: side.edge, frame, boxes: boxes.filter(b => !shell.has(b.name)), boards, blades };
});
