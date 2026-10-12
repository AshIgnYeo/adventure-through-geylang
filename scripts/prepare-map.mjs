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
// buildings with the corners at both ends, and the Geylang Road houses between Lorong 17 and Lorong 19 that line the
// Geylang Road link (open question 43). Sims Avenue Nos. 136-144 wait until the row is measured: No. 134's outline,
// moved under open question 39, overlaps No. 136's source outline. Lorong Bachok's mouth is kept as road surface.
const lorong19 = {
  buildings: [
    '454254263', '454254248', '476113985', '454254241', '476113983', '476113984', '454254239', '454254309', '454254310',
    '454254168', '454254246', '1223524381', '454254247', '454254314', '454254339',
    '454254254', '454254256', '454254258', '454254260', '454254262',
  ],
  // The lane's ways run south, so they are listed from Sims Avenue to Geylang Road; the corridor reverses them.
  lane: ['23513604', '476106528', '666818478', '476106525', '666818477', '666818476', '476106529'],
  links: ['666814409', '475136317', '659861350', '659861351'],
  bachok: ['23513607'],
};
const wayCoordinates = new Map();
const roads=[], buildings=[], paths=[], contextRoads=[];
for (const [text] of xml.matchAll(/<way\b[^>]*>[\s\S]*?<\/way>/g)) {
  const id=attrs(text.slice(0,text.indexOf('>'))).id;
  const tags=Object.fromEntries([...text.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)].map(m=>[m[1],m[2].replaceAll('&amp;','&')]));
  const coordinates=[...text.matchAll(/<nd ref="(\d+)"/g)].map(m=>nodes.get(m[1]));
  if (coordinates.some(c=>!c)) continue;
  wayCoordinates.set(id, coordinates);
  const extra = [...lorong17.buildings, ...lorong17.lane, ...lorong17.links, ...Object.values(lorong19).flat()].includes(id);
  if (!coordinates.some(inside) && !extra) continue;
  if(tags.highway && (names.includes(tags.name) || [...lorong17.lane, ...lorong19.lane, ...lorong19.bachok].includes(id))) roads.push({id,name:tags.name,oneway:tags.oneway??'unknown',lanes:Number(tags.lanes)||1,coordinates});
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
];
const map={origin:[103.8773,1.3131],bounds,corridors,source:'https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155',retrieved:'2026-09-28',licence:'ODbL-1.0',roads,buildings,paths,contextRoads};
fs.writeFileSync(new URL('../public/map.json',import.meta.url),JSON.stringify(map));
console.log(JSON.stringify({roads:roads.length,buildings:buildings.length,lorongs:roads.filter(r=>r.name.startsWith('Lorong')).map(r=>({id:r.id,name:r.name,oneway:r.oneway}))},null,2));
