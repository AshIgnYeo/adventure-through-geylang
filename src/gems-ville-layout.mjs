// April 2024 exterior of Gems Ville, 8 Lorong 13 Geylang, on its owner-approved authored footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=25&fov=100`;
export const gemsVille = {
  id: 'gems-ville', buildingIds: ['l13-8'], kind: 'gems-ville',
  name: 'Gems Ville (April 2024 exterior, nearing completion)', address: '8 Lorong 13 Geylang',
  height: 26.4, ceiling: 0, frontEdge: 0, reviewRoad: 'Lorong 13 Geylang', roof: { type: 'flat', colour: '#8d8c88' },
  colours: { wall: '#4a4b4c' },
  evidence: 'Google Maps lists Gems Ville, a condominium, at 8 Lor 13 Geylang; listing records describe a seven-storey, 24-unit boutique development with a brise-soleil façade on a 731 m² lot, completed in 2025 by East Asia Geylang Development. April 2024 Street View shows the nearly finished building with GEMS VILLE lettering on its dark podium, a boom lift still at work: bronze vertical fins framing balcony bays with grey railings on six residential storeys, and a deep louvre screen at the top. It stands on an owner-approved authored footprint (open question 6) that replaces the older 6A source way. Positions were read on frames rectified at the old source front and corrected for the measured 1 m setback; heights carry a few per cent of uncertainty. The boom lift, interiors and rooftop are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Gems+Ville+8+Lorong+13+Geylang', 'https://www.propertyguru.com.sg/listing/for-sale-gems-ville-500169325', 'https://www.openstreetmap.org/way/452646018', pano('HaY-y7EfW3SXOm-83rKMAw', 75), pano('uh9Y_1rGJSeI8vjJVZDDHg', 80)],
};

export const gemsVilleFrame = poly => frontageFrame(poly, gemsVille.frontEdge);
// u runs north to south along Lorong 13 from the north corner; heights above the pavement.
export const elevation = {
  fins: [.2, 3.25, 7.8, 13.1, 16.05, 21.2, 25.2], podium: 5.6,
  slabs: [5.85, 8.7, 11.5, 14.35, 17.2, 20.1], topStorey: 22.6, louvres: [22.6, 26.3],
  balconyBays: [3.25, 25.2], lettering: { u: [6.3, 8.4], h: [4.55, 4.95] },
  entrance: { u: [1.0, 3.6], h: [0, 3.6] }, gate: { u: [13.1, 20.4], h: [0, 3.9] }, fence: { out: 2.5, h: 1.4 },
};

export function gemsVilleLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, bronze = '#a68c74', rail = '#8f9394', glass = '#2c3336';
  add('podium wall', width / 2, E.podium / 2, .03, width, E.podium, .06, '#4c4e4f');
  add('residential glazing', width / 2, (E.podium + E.topStorey) / 2, -.6, width - .2, E.topStorey - E.podium, .05, glass, .03);
  for (const y of [...E.slabs, E.topStorey]) add('floor slab', width / 2, y, .2, width, .22, .9, '#5b5c5d');
  for (const y of E.slabs) {
    add('balcony railing', (E.balconyBays[0] + E.balconyBays[1]) / 2, y + .6, .62, E.balconyBays[1] - E.balconyBays[0], .95, .04, rail);
    for (let u = E.balconyBays[0] + .15; u < E.balconyBays[1]; u += .12) add('railing slat', u, y + .6, .64, .03, .9, .02, '#a3a7a8');
  }
  for (const u of [...E.fins, width - .1]) add('bronze fin', u, (E.podium + E.louvres[0]) / 2, .45, .22, E.louvres[0] - E.podium, .9, bronze);
  // The deep louvre screen at the top, its vertical blades closely spaced.
  add('louvre screen backing', width / 2, (E.louvres[0] + E.louvres[1]) / 2, .1, width, E.louvres[1] - E.louvres[0], .1, '#3c3d3e');
  for (let u = .08; u < width; u += .18) add('louvre blade', u, (E.louvres[0] + E.louvres[1]) / 2, .3, .05, E.louvres[1] - E.louvres[0], .3, '#77736d');
  add('parapet', width / 2, gemsVille.height - .05, .2, width, .1, .5, '#6a6864');
  // Podium: glazed lobby entrance, the slatted gate and a planted strip behind the front fence.
  const mid = (a, b) => (a + b) / 2;
  add('lobby glazing', mid(...E.entrance.u), mid(...E.entrance.h), .07, E.entrance.u[1] - E.entrance.u[0], E.entrance.h[1] - E.entrance.h[0], .02, '#39474b', .1);
  for (let u = E.gate.u[0]; u < E.gate.u[1]; u += .14) add('gate slat', u, mid(...E.gate.h), .08, .05, E.gate.h[1] - E.gate.h[0], .04, '#2d2b29');
  add('garden strip', width / 2, .25, 1.5, width, .5, 1.8, '#4f6a3e');
  for (let u = .4; u < width; u += 1.6) add('shrub', u, .9, 1.4, .9, .9, .9, '#3f5e35');
  add('front fence rail', width / 2, E.fence.h, E.fence.out, width, .06, .06, '#3a3a3a');
  for (let u = .1; u < width; u += .16) add('fence bar', u, E.fence.h / 2, E.fence.out, .03, E.fence.h, .03, '#3a3a3a');
  return { boxes, back: 0, board: { left: E.lettering.u[0], right: E.lettering.u[1], bottom: E.lettering.h[0], top: E.lettering.h[1], out: .08 }, boards: [], blades: [], awning: undefined };
}

export const gemsVilleReviews = frame => facing(frame, 'gems-ville', 12, 24);
