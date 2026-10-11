// April 2024 street exterior of No. 35 Lorong 11, on the owner-approved re-spaced footprint.
import { frontageFrame } from './gable-roof-layout.mjs';

export const zhengLi = {
  id: 'zheng-li', buildingIds: ['l11w-35'], kind: 'zheng-li',
  name: 'Zheng Li Hearty Kitchen 正利心厨 (April 2024 exterior)', address: '35 Lorong 11 Geylang',
  height: 9.2, frontEdge: 0, fiveFootWay: 2.0, reviewRoad: 'Lorong 11 Geylang',
  evidence: 'Google Maps lists Zheng Li Hearty Kitchen at 35 Lor 11 Geylang, open in October 2026, and ACRA-derived records at No. 35 are mostly eating houses. April 2024 Street View shows a tall navy blade sign reading 正利心厨 ZHENG LI HEARTY KITCHEN 东海人家 on the end pier of the last house of the Lorong 11 west row, before the open corner at Sims Avenue, with an open restaurant under a blue lager awning, red lanterns and long tables. The square-on frame puts the frontage at about 6.9 m from the No. 33 pier to the end pier, so it stands on the owner-approved re-spaced No. 35 footprint (open question 1), which ends 0.66 m past the source end of way 1223407876. The plain upper storeys have a four-pane window under vents and a large projecting window under a deep hood. Heights come from the square-on frame at the solved 0.6 m façade depth, with the readings of the projecting bay corrected for its 0.45 m projection. Beer advertising on the awning is shown as plain lettering bands; furniture, crates and the interior are not reconstructed.',
  sources: [
    'https://www.google.com/maps/search/?api=1&query=Zheng+Li+Hearty+Kitchen+35+Lorong+11+Geylang',
    'https://www.openstreetmap.org/way/1223407876',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=aHF7c6gZTF_nwgN7N0wTwg&heading=252&pitch=10&fov=90',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=hHdVXQD79Suo5Y4VlonoNg&heading=215&pitch=12&fov=80',
  ],
};

// u runs south (the No. 33 pier) to north (the end pier); out runs east to Lorong 11.
export const zhengLiFrame = poly => frontageFrame(poly, zhengLi.frontEdge);

export const elevation = {
  slab: [9.06, 9.3], smallWindow: { u: [.88, 2.88], h: [5.45, 6.45] }, vents: { u: [1.0, 2.8], h: [6.9, 7.1] },
  // The bay projects 0.45 m, so its façade-plane readings were scaled back to that depth (factor 0.915 about the camera).
  bigWindow: { u: [3.51, 6.17], h: [5.66, 6.75] }, bay: { u: [3.28, 6.4], h: [5.02, 7.3], depth: .45 },
  sill: [5.25, 5.35], band: [3.7, 4.0], awning: { from: 0, to: 6.9, top: 3.6, bottom: 3.0, depth: 1.2 },
  ceiling: 3.0, piers: [[.06, .81], [6.15, 6.9]], sideDoor: { u: [.85, 1.44], h: [.1, 2.6] },
  lanterns: [2.85, 5.1], blade: { u: 6.0, out: [.2, 1.0], h: [3.9, 8.0] },
};

export function zhengLiLayout(width) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const E = elevation, D = zhengLi.fiveFootWay, white = '#ecebe6', shade = '#d6d5cf', mid = (a, b) => (a + b) / 2, frame = '#2e3335';
  add('roof slab', width / 2, mid(...E.slab), .2, width, E.slab[1] - E.slab[0], .4, shade);
  add('upper wall', width / 2, mid(E.band[1], E.slab[0]), -.05, width, E.slab[0] - E.band[1], .04, white);
  const win = ({ u: [l, r], h: [b, t] }, panes, out) => {
    add('window glazing', mid(l, r), mid(b, t), out, r - l, t - b, .02, '#7f8d92');
    for (let i = 0; i <= panes; i++) add('window frame', l + (r - l) * i / panes, mid(b, t), out + .02, .045, t - b, .03, frame);
    for (const y of [b, t]) add('window rail', mid(l, r), y, out + .02, r - l, .045, .03, frame);
  };
  win(E.smallWindow, 4, .0);
  add('small window surround', mid(...E.smallWindow.u), mid(...E.smallWindow.h), -.02, E.smallWindow.u[1] - E.smallWindow.u[0] + .3, E.smallWindow.h[1] - E.smallWindow.h[0] + .3, .03, shade);
  for (let k = 0; k < 4; k++) add('vent block', E.vents.u[0] + .2 + k * (E.vents.u[1] - E.vents.u[0] - .4) / 3, mid(...E.vents.h), .02, .16, .16, .03, '#9fa19c');
  // Projecting bay around the large window, with its deep hood.
  const B = E.bay;
  add('bay cheek', B.u[0] + .06, mid(...B.h), B.depth / 2, .12, B.h[1] - B.h[0], B.depth, white);
  add('bay cheek', B.u[1] - .06, mid(...B.h), B.depth / 2, .12, B.h[1] - B.h[0], B.depth, white);
  add('bay hood', mid(...B.u), B.h[1] - .1, B.depth / 2 + .1, B.u[1] - B.u[0] + .1, .2, B.depth + .2, shade);
  add('bay apron', mid(...B.u), B.h[0] + .2, B.depth / 2, B.u[1] - B.u[0], .4, B.depth, white);
  win(E.bigWindow, 5, B.depth - .05);
  add('sill band', width / 2, mid(...E.sill), .06, width, E.sill[1] - E.sill[0], .12, shade);
  for (const u of [1.3, 2.6]) add('condenser', u, 4.65, .2, .8, .55, .32, '#e5e5e1');
  add('fascia band', width / 2, mid(...E.band), .05, width, E.band[1] - E.band[0], .14, white);
  for (const [l, r] of E.piers) add('pier', mid(l, r), E.ceiling / 2, -.2, r - l, E.ceiling, .4, white);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, '#8f8c86');
  add('five-foot way ceiling', width / 2, E.ceiling + .03, -D / 2, width - .04, .06, D, '#dedcd5');
  for (const u of [.02, width - .02]) add('five-foot way return', u, E.ceiling / 2, -D / 2, .03, E.ceiling, D, white);
  const back = -D + .04;
  add('restaurant interior', mid(1.44, 6.15), 1.5, back, 6.15 - 1.44, 3.0, .03, '#3a3633');
  add('side door', mid(...E.sideDoor.u), mid(...E.sideDoor.h), -.18, E.sideDoor.u[1] - E.sideDoor.u[0], E.sideDoor.h[1] - E.sideDoor.h[0], .04, '#a1764a');
  for (const u of [2.4, 4.6]) { add('long table', u, .75, -.9, 1.6, .05, .6, '#dad6cc'); add('table legs', u, .37, -.9, 1.4, .72, .04, '#3a3d3e'); }
  for (const u of [5.6]) add('drink crates', u, .5, back + .4, .5, 1.0, .4, '#b8352e');
  return {
    boxes,
    awning: { ...E.awning, to: Math.min(E.awning.to, width) },
    lanterns: E.lanterns, blade: { ...E.blade },
  };
}

export function zhengLiReviews(frame) {
  const { point, width } = frame;
  return [
    { id: 'zheng-li', p: point(width / 2, 7.4), target: point(width / 2, 0), pitch: 16 },
    { id: 'zheng-li-blade', p: point(width + 4.5, 5.5), target: point(width - .9, .6), pitch: 20 },
  ].map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
}
