import fs from 'node:fs';
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const attrs = text => Object.fromEntries([...text.matchAll(/([\w:]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const nodes = new Map([...xml.matchAll(/<node\b[^>]*>/g)].map(([s]) => { const a=attrs(s); return [a.id, [+a.lon, +a.lat]]; }));
// Lorong 15 was added on 10 October 2026 (open question 10), and Lorongs 9, 10 and 12 the same day (open question 24).
const names = ['Lorong 9 Geylang', 'Lorong 10 Geylang', 'Lorong 11 Geylang', 'Lorong 12 Geylang', 'Lorong 13 Geylang', 'Lorong 15 Geylang', 'Geylang Road', 'Sims Avenue'];
// Widened on 10 October 2026 (open question 26) to contain the five boundary blocks west, east and south.
const bounds = [103.87597, 1.31150, 103.87859, 1.31425];
const inside = ([lon,lat]) => lon>=bounds[0] && lon<=bounds[2] && lat>=bounds[1] && lat<=bounds[3];
// Lorong 17 between Geylang Road and Sims Avenue (open question 35, 12 October 2026): the lane's own buildings and
// road ways are taken by id rather than by widening the rectangle, which would also take in the backs of Lorong 19.
const lorong17 = {
  buildings: ['454254236', '454254237', '454254238', '454254240', '454254249', '454254250', '454254251', '454254252', '454254253', '454254307', '454254308'],
  // The lane from Geylang Road to Sims Avenue, in order, then the Geylang Road and Sims Avenue links to its junctions.
  lane: ['23513619', '666814499', '666814498', '632264504', '666814496', '1116853508', '666814497'],
  links: ['632255677', '660070909', '727628958', '75512569'],
};
// Lorong 19 between Geylang Road and Sims Avenue (open question 42, 12 October 2026), taken the same way: the lane's
// buildings with the corners at both ends, and the Geylang Road and Sims Avenue houses between Lorong 17 and Lorong 19
// that line the links (open question 43; Sims Avenue Nos. 136-144 stand on authored footprints, since No. 134's
// outline, moved under open question 39, overlaps No. 136's source outline). Lorong Bachok's mouth is kept as road.
const lorong19 = {
  buildings: [
    '454254263', '454254248', '476113985', '454254241', '476113983', '476113984', '454254239', '454254309', '454254310',
    '454254168', '454254246', '1223524381', '454254247', '454254314', '454254339',
    '454254254', '454254256', '454254258', '454254260', '454254262',
    '682928736', '682928738', '682928739', '682928741', '682928744',
  ],
  // The lane's ways run south, so they are listed from Sims Avenue to Geylang Road; the corridor reverses them.
  lane: ['23513604', '476106528', '666818478', '476106525', '666818477', '666818476', '476106529'],
  links: ['666814409', '475136317', '659861350', '659861351'],
  bachok: ['23513607'],
};
// Lorong 21 between Geylang Road and Sims Avenue (open question 47, 13 October 2026), taken as Lorong 19 was: the lane's
// buildings with the corners at both ends and at Lorong Bachok, and the Sims Avenue houses back to Lorong 19 (No. 150
// to No. 176), as question 43 did for Lorong 19. On Geylang Road the corner block runs back to Lorong 19's east corner.
// Lorong Bachok's east mouth is kept as road; the Bachok row and the part north of Sims Avenue wait.
const lorong21 = {
  buildings: [
    '454254167', '1223524387', '1223524388', '1223524384', '1223524383', '1223524382', '1223524385', '1223524386', '454254329', '454254330',
    '454254164', '454254165', '454254160', '454254144',
    '454254331', '454254332', '454254333', '454254334', '454254335', '454254336', '454254337', '454254338',
  ],
  // The lane's ways run north, from Geylang Road to Sims Avenue.
  lane: [
    '666022183', '666022182', '666022172', '666022181', '666022180', '666022179', '666022178', '666022177', '666022176', '666022175',
    '666022171', '23513608', '745691412', '666022173', '666022174', '666022170', '666022169', '666022168', '666022167', '666022166',
  ],
  // Geylang Road runs west and Sims Avenue east: from 17 m east of Lorong 21's junction to Lorong 19's, and on from
  // Lorong 19's junction past Lorong 21's.
  geylangRoad: ['660071012', '74719099', '666814636', '660071013', '660071015', '660071014', '475136316', '666814637', '660070911'],
  simsAvenue: ['632842878', '632842876', '632842880'],
  bachok: ['666807847'],
};
// Lorong 16 from Geylang Road to the south end of the extract (open question 61, 17 October 2026), taken as Lorong 21 was:
// the lane's buildings, with the west corner on Geylang Road (Nos. 310-314) and the south-east corner at the head of
// Westerhout Road. Its junction lies on the Geylang Road link from Lorong 19 to Lorong 21, so no new link is needed.
const lorong16 = {
  buildings: [
    '764372570', '764372571', '764372569', '763764689', '763764687', '763764688', '763764676', '764372580', '763764654',
    '763764666', '763764665', '763764664', '763764667', '763764668', '454274647', '763764669', '763764670', '763764671',
    '763764673', '763764672', '763764674', '763764675', '121872890', '763764678', '763764679', '763764680', '763764681',
    '763764682', '763764686', '763764685', '763764684', '763764683',
  ],
  // The lane's ways run north, so they are listed from the south end to Geylang Road; the corridor reverses them.
  lane: ['632249196', '666011790', '666011791', '776937485', '23513325'],
};
const wayCoordinates = new Map();
const roads=[], buildings=[], paths=[], contextRoads=[];
for (const [text] of xml.matchAll(/<way\b[^>]*>[\s\S]*?<\/way>/g)) {
  const id=attrs(text.slice(0,text.indexOf('>'))).id;
  const tags=Object.fromEntries([...text.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)].map(m=>[m[1],m[2].replaceAll('&amp;','&')]));
  const coordinates=[...text.matchAll(/<nd ref="(\d+)"/g)].map(m=>nodes.get(m[1]));
  if (coordinates.some(c=>!c)) continue;
  wayCoordinates.set(id, coordinates);
  const extra = [...lorong17.buildings, ...lorong17.lane, ...lorong17.links, ...Object.values(lorong19).flat(), ...Object.values(lorong21).flat(), ...Object.values(lorong16).flat()].includes(id);
  if (!coordinates.some(inside) && !extra) continue;
  if(tags.highway && (names.includes(tags.name) || [...lorong17.lane, ...lorong19.lane, ...lorong19.bachok, ...lorong21.lane, ...lorong21.bachok, ...lorong16.lane].includes(id))) roads.push({id,name:tags.name,oneway:tags.oneway??'unknown',lanes:Number(tags.lanes)||1,coordinates});
  // Q10: retain the alley AND its pedestrian continuation. These do not take
  // part in automatic street-front selection or inherit vehicle lane widths.
  if (['695010162', '1223458240'].includes(id)) paths.push({id,highway:tags.highway,service:tags.service??null,coordinates});
  if (id==='633797717') contextRoads.push({id,name:tags.name,oneway:tags.oneway??'unknown',lanes:Number(tags.lanes)||1,coordinates});
  if(tags.building && coordinates.length>3) buildings.push({id,levels:Number(tags['building:levels'])||null,street:tags['addr:street']??null,number:tags['addr:housenumber']??null,coordinates});
}
// Walkable corridors beyond the rectangle: within `halfWidth` metres of each path. The lane runs from the Geylang Road
// centreline to the Sims Avenue centreline; the two links reach back from its junctions into the rectangle.
const chain = ids => ids.flatMap((id, i) => wayCoordinates.get(id).slice(i ? 1 : 0));
// The point `metres` along a way, interpolated in degrees scaled to local metres.
const along = (coordinates, metres) => {
  const k = Math.cos(coordinates[0][1] * Math.PI / 180);
  for (let i = 1, left = metres; i < coordinates.length; i++) {
    const [a, b] = [coordinates[i - 1], coordinates[i]], length = Math.hypot((b[0] - a[0]) * k, b[1] - a[1]) * 111320;
    if (left <= length) return [a[0] + (b[0] - a[0]) * left / length, a[1] + (b[1] - a[1]) * left / length];
    left -= length;
  }
  return coordinates.at(-1);
};
const corridors = [
  { name: 'Lorong 17 Geylang', halfWidth: 13, path: chain(lorong17.lane) },
  { name: 'Geylang Road to Lorong 17', halfWidth: 13, path: [...chain(['632255677']).reverse(), wayCoordinates.get('660070909')[0]] },
  { name: 'Sims Avenue at Lorong 17', halfWidth: 12, path: chain(['727628958', '75512569']) },
  // Lorong 19, and the Geylang Road and Sims Avenue links from Lorong 17's junctions, each carried about 16-21 m past
  // Lorong 19's junction to take in the east corners' faces.
  { name: 'Lorong 19 Geylang', halfWidth: 13, path: chain(lorong19.lane).reverse() },
  { name: 'Geylang Road, Lorong 17 to Lorong 19', halfWidth: 13, path: [wayCoordinates.get('660070911')[0], ...chain(['475136317', '666814409', '660070909'])] },
  { name: 'Sims Avenue, Lorong 17 to Lorong 19', halfWidth: 12, path: [...chain(['75512569', '659861350', '659861351']), along(wayCoordinates.get('632842878'), 16)] },
  // Lorong 21, and the Geylang Road and Sims Avenue links from Lorong 19's junctions, carried about 17-18 m past
  // Lorong 21's junction to take in the east corners.
  { name: 'Lorong 21 Geylang', halfWidth: 13, path: chain(lorong21.lane) },
  { name: 'Geylang Road, Lorong 19 to Lorong 21', halfWidth: 13, path: chain(lorong21.geylangRoad) },
  { name: 'Sims Avenue, Lorong 19 to Lorong 21', halfWidth: 12, path: [...chain(['632842878', '632842876']), along(wayCoordinates.get('632842880'), 18)] },
  // Lorong 16, from the Geylang Road centreline to the end of its last way in the extract.
  { name: 'Lorong 16 Geylang', halfWidth: 13, path: chain(lorong16.lane).reverse() },
];
const map={origin:[103.8773,1.3131],bounds,corridors,source:'https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155',retrieved:'2026-09-28',licence:'ODbL-1.0',roads,buildings,paths,contextRoads};
fs.writeFileSync(new URL('../public/map.json',import.meta.url),JSON.stringify(map));
console.log(JSON.stringify({roads:roads.length,buildings:buildings.length,lorongs:roads.filter(r=>r.name.startsWith('Lorong')).map(r=>({id:r.id,name:r.name,oneway:r.oneway}))},null,2));
