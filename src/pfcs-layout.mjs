// June 2024 exterior of the Public Free Clinic Society headquarters, 10 Lorong 9, on its set-back footprint.
import { frontageFrame } from './gable-roof-layout.mjs';
import { simpleHouseLayout, facing } from './simple-house-layout.mjs';

const pano = (id, heading) => `https://www.google.com/maps/@?api=1&map_action=pano&pano=${id}&heading=${heading}&pitch=25&fov=100`;
export const pfcs = {
  id: 'public-free-clinic-society', buildingIds: ['l9-10'], kind: 'public-free-clinic-society',
  name: 'Public Free Clinic Society 大眾醫院 headquarters (June 2024 exterior)', address: '10 Lorong 9 Geylang',
  height: 26.2, ceiling: 4.3, fiveFootWay: 1.2, frontEdge: 3, reviewRoad: 'Lorong 9 Geylang',
  evidence: 'Google Maps lists Public Free Clinic Society Headquarters (Geylang HQ), a free clinic, at 10 Lor 9 Geylang, Singapore 388758, with its point inside the source way tagged No. 10; the Institute of Chinese Medical Studies is also listed there. June 2024 Street View shows the green glass curtain-wall tower with 大眾醫院 in red on its white top band and 大眾醫院 / Public Free Clinic Society lettering over the ground-floor entrance, behind a forecourt where the society\'s vans park. Three Lorong 9 panoramas agree on the tower only on a plane about 8 m behind the source front, where it spans the full 13.1 m frontage, so it stands on an owner-approved set-back footprint (open question 11) with the forecourt left open. Heights were read on that plane: a 4.3 m ground storey, the curtain wall to 24.4 m and the lettered band to 26.2 m. The curtain-wall mullion pattern is simplified; vans, the flagpole and the interior are not reconstructed.',
  sources: ['https://www.google.com/maps/search/?api=1&query=Public+Free+Clinic+Society+10+Lorong+9+Geylang', 'https://www.openstreetmap.org/way/1223603460', pano('N-T15W1WRThGKvX1Uv669w', 75), pano('CCVSJEitT2kunabTWNPGyQ', 40), pano('hv2-NbixqeoRs-wcFG5zEA', 110)],
  colours: { wall: '#e4e3dd', trim: '#f2f2ee', frame: '#5d8f86', glass: '#7fbcb0', back: '#3c4a48', floor: '#a7a39a', pier: '#dedcd5' },
  bands: [[24.4, 26.2, .1, '#f4f4f0'], [4.3, 4.6, .25]],
};

export const pfcsFrame = poly => frontageFrame(poly, pfcs.frontEdge);
export const elevation = { glass: [4.6, 24.4], floor: 2.65, label: [24.6, 25.9], entranceSign: { u: [5.0, 12.9], h: [3.3, 4.0] } };

export function pfcsLayout(width) {
  const E = elevation;
  const layout = simpleHouseLayout(width, {
    ...pfcs,
    piers: [[0, .4], [width - .4, width]],
    boards: [{ u: [.6, width - .6], h: E.label, out: .06 }, { ...E.entranceSign, out: .04 }],
    backFittings: [{ name: 'clinic entrance glazing', u: [1.0, width - 1.0], h: [.1, 3.3], colour: '#55706c', glow: .1 }],
  });
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => layout.boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const [g0, g1] = E.glass;
  add('curtain wall glazing', width / 2, (g0 + g1) / 2, .02, width - .2, g1 - g0, .04, '#79b7ab', .05);
  for (let y = g0; y <= g1 + 1e-6; y += E.floor) add('curtain wall transom', width / 2, y, .06, width - .2, .08, .04, '#d9e6e2');
  for (let u = .1; u <= width - .1 + 1e-6; u += (width - .2) / 10) add('curtain wall mullion', u, (g0 + g1) / 2, .06, .06, g1 - g0, .04, '#d9e6e2');
  for (const [u, y] of [[2.2, 6.0], [3.6, 8.6], [2.2, 11.3], [3.6, 16.6], [2.2, 19.2]]) add('opening window', u, y, .08, .6, .5, .06, '#5a8b80');
  return layout;
}

// The forecourt in front of the tower, from the source front to the set-back line, stays open.
export const pfcsReviews = frame => facing(frame, 'public-free-clinic-society', 14, 40);
