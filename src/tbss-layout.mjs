// April 2024 street exterior of No. 21 Lorong 11, on the owner-approved re-spaced footprint.
import { peranakan, peranakanFrame, peranakanLayout, facingReviews } from './peranakan-layout.mjs';

export const tbss = {
  id: 'tbss', buildingIds: ['l11w-21'], kind: 'tbss',
  name: 'Tibetan Buddhist Studies Society 藏密佛学研究会 (April 2024 exterior)', address: '21 Lorong 11 Geylang',
  ...peranakan, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'April 2024 Street View shows a red board reading 藏密佛学研究会 / Tibetan Buddhist Studies Society with TBSS.ORG and a mandala, under a ledge carrying a gilded Dharma wheel flanked by two deer, vases and dragon finials, on the white conserved shophouse with teal shutters at No. 21 Lorong 11, between Goodwood (No. 19) and the plain No. 23. Triangulated party lines put the frontage at about 5.2 m, so it stands on the owner-approved re-spaced No. 21 footprint (open question 1) rather than the 6.39 m source way 1223407883. No Google Maps listing was found for the society; the identity rests on its signage at a sourced street address, recorded in the queue on 9 October 2026. The upper storey matches its twin at No. 19. Heights come from an April 2024 frame rectified at the solved façade depth; the board and ornaments were read at full resolution. Fine stucco, the mandala and thangka artwork, vehicles and the interior are not reconstructed.',
  sources: [
    'https://www.openstreetmap.org/way/1223407883',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=250&pitch=12&fov=80',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=73intX-f7jQoMaTMSJ_4Mg&heading=230&pitch=12&fov=90',
  ],
};

export const tbssFrame = peranakanFrame;
export const colours = { wall: '#eeefea', trim: '#f4f4f0', shutter: '#d8d6c8', frame: '#5fa79b' };

// Metres from the No. 19 line, above the five-foot-way floor.
export const front = {
  ledge: [4.47, 4.53], board: [1.15, 3.97, 3.39, 4.1],
  ornaments: { wheel: 2.62, deer: [1.95, 3.3], vases: [1.35, 3.85], finials: [.62, 4.62] },
  awning: { from: .17, to: 5.15, wall: 3.36, front: 2.31, depth: 1.5 },
};

export function tbssLayout(width) {
  const base = peranakanLayout(width, colours), { add, back } = base, F = front, mid = (a, b) => (a + b) / 2;
  add('ornament ledge', width / 2, mid(...F.ledge), .35, width - .2, F.ledge[1] - F.ledge[0], .5, '#f4f4f0');
  for (const u of [.6, width - .6]) add('ledge bracket', u, F.ledge[0] - .12, .3, .08, .2, .4, '#f4f4f0');
  // Gilded roof ornaments: the Dharma wheel and deer, vases and dragon finials.
  const gold = '#d4a93a';
  add('Dharma wheel post', F.ornaments.wheel, F.ledge[1] + .18, .4, .06, .36, .06, gold, .15);
  for (const u of F.ornaments.deer) { add('gilded deer body', u, F.ledge[1] + .22, .4, .36, .18, .1, gold, .15); add('gilded deer neck', u + (u < F.ornaments.wheel ? .14 : -.14), F.ledge[1] + .38, .4, .07, .22, .07, gold, .15); }
  for (const u of F.ornaments.vases) { add('gilded vase', u, F.ledge[1] + .2, .4, .2, .3, .2, gold, .15); add('vase finial', u, F.ledge[1] + .42, .4, .06, .16, .06, gold, .15); }
  for (const u of F.ornaments.finials) add('gilded dragon finial', u, F.ledge[1] + .22, .4, .4, .2, .12, gold, .15);
  add('ground glazed screen', width / 2, 1.5, back, width - 1.4, 2.6, .03, '#3c4243');
  add('altar cabinet', 2.4, .9, back + .4, 1.6, 1.0, .5, '#7e2f25');
  return {
    ...base,
    board: { left: F.board[0], right: F.board[1], bottom: F.board[2], top: F.board[3], out: .12 },
    wheel: { u: F.ornaments.wheel, y: F.ledge[1] + .55, r: .2, out: .4 },
    awning: { ...F.awning },
  };
}

export const tbssReviews = frame => facingReviews(frame, 'tbss');
