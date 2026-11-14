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
// Lorong 14 from Geylang Road to the south edge of the extract (open question 51, 17 October 2026), taken as Lorong 21
// was: the lane's buildings, with the east corner block on Geylang Road and the Geylang Road row east to Lorong 16 (No.
// 292 to No. 308). The west corner on Geylang Road is a green with no building. Talma Road's east mouth is kept as road;
// the Talma Road row waits. The lane runs on south beyond the extract (open question 52).
const lorong14 = {
  buildings: [
    '121872892', '764372595',
    '454274618', '454274615', '454274614', '454274611', '454274608', '764372579', '764372578', '454274677', '764372577', '476141643',
    '454254175', '454254174', '454254173', '454254172',
    '454254171', '454254170', '454254169', '764372576', '475173286', '764372575', '764372574', '764372572', '764372573',
  ],
  // The lane's ways run south, from Geylang Road to the extract's edge.
  lane: ['23513328', '632264920', '666824710', '666824711', '666824717', '666824709', '666824712', '666824713', '666824714', '666824715', '666824716', '666037192', '762862447'],
  talma: ['644896804'],
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
// Lorong 18 between Geylang Road and Westerhout Road (open question 71, 17 October 2026), taken as Lorong 21 was: the
// lane's buildings with the corners at both ends of both sides. On Geylang Road the west corner block (way 541941365)
// runs back to Lorong 16's east corner and is taken whole. Westerhout Road's mouth is kept as road; the stub south of it,
// the Westerhout Road row and Geylang Road east of No. 350 wait.
const lorong18 = {
  buildings: [
    '541941365',
    '454274650', '454274632', '764372568', '764372567', '764372566', '454274634', '764372565', '454274635', '454274637',
    '454274639', '454274640', '764372564', '764372563', '454274642', '764372562', '454274643', '764372561', '454274645',
    '454438314', '764372560', '764372559', '1470917582', '764372541', '121872891', '764372540',
  ],
  // The lane's ways run north, so they are listed from the edge of the extract, south of Westerhout Road, to Geylang Road;
  // the corridor reverses them.
  lane: ['632503609', '23513324', '644899356', '666034824', '666034825', '776909653', '644898814', '639994433'],
  // Geylang Road runs west: on from 17 m east of Lorong 21's junction, past Lorong 18's.
  geylangRoad: ['660071186', '666816964'],
  westerhout: ['23513327', '644902167'],
};
// The north side of Sims Avenue from No. 135 to No. 205 (open question 83, 14 November 2026), taken as Lorong 21 was: its
// 29 buildings by id, west of Lorong 17 (Nos. 135-145), between Lorong 17 and Lorong 19 (Nos. 147-159), between Lorong
// 19 and Lorong 21 (Nos. 165-177) and between Lorong 21 and Lorong 21A (Nos. 183-205). The mouths of the four lanes
// north of the avenue are kept as road; the lanes themselves and the Buddhist Congress Center at Lorong 23 wait.
const simsNorth = {
  buildings: [
    '439168677', '439168816', '439168799', '439168674', '439168825', '439168849',
    '475918110', '475918111', '682928772', '682928771', '682928770', '682928769', '682928768',
    '682928722', '682937224', '454254365', '454254366',
    '454254353', '454254354', '454254355', '454254356', '454254357', '454254358', '454254359', '454254360', '454254361',
    '454254362', '454254363', '454254364',
    // No. 105, Chancerlodge Complex, set back behind Nos. 107-133 (open question 90).
    '439168666',
    // The Lorong 23 corner, east of Lorong 21A (open question 91).
    '541941379',
  ],
  // Sims Avenue on east of Lorong 21A, past the Lorong 23 corner (open question 91).
  avenueEast: ['475337630'],
  // Lorong 17, Lorong 19, Lorong 21 and Lorong 21A, each from the Sims Avenue centreline north to its first node.
  mouths: ['708456471', '666807374', '666807857', '666579841'],
};
// Geylang Road's south side from No. 352 to No. 364 (open question 86, 14 November 2026): the seven houses east of Lorong
// 18's east corner, held for Lorong 20 under question 71, taken by id with Geylang Road's two ways past them. No. 364 is
// Lorong 20's west corner; Lorong 20 itself lies outside the extract (open question 81).
const geylang352 = {
  buildings: ['764372558', '764372556', '764372557', '764372554', '764372555', '764372553', '764372552'],
  // Geylang Road runs west: from Lorong 20's junction to Lorong 18's.
  geylangRoad: ['632265797', '660071185'],
};
// Lorong 17 north of Sims Avenue (open question 87, 14 November 2026): its four set-back industrial plots and the lane's
// ways, from the mouth already taken with the avenue's north side to past the extract's north edge.
const lorong17North = {
  buildings: ['439168851', '439168795', '454254369', '454254368'],
  // The lane's ways run south, from beyond the extract's north edge to the avenue; 708456472 is the southbound twin of 708456470.
  lane: ['475948499', '632832138', '708456470', '708456472'],
};
// Lorongs 19 and 21 north of Sims Avenue, with the road joining them (open question 88, 14 November 2026): eleven
// buildings and the lanes' ways by id. The road between them is named Lorong 19 Geylang in the source.
const lorong1921North = {
  buildings: ['682937276', '541941370', '541941369', '452646019', '682937270', '682937272', '682937274', '454254367', '541941368', '454254350', '454254352'],
  // Lorong 19 north to south, the joining road west to east, and Lorong 21 south to north.
  lorong19: ['23513617', '666806810', '666806808', '1138183052', '643388132', '666807375'],
  joining: ['23514474'],
  lorong21: ['23513610', '666807856', '666807858', '632842877', '666807859'],
};
// Lorong 21A north of Sims Avenue (open question 89, 14 November 2026): its five plots and its ways beyond the mouth, which
// came in with the avenue's north side.
const lorong21aNorth = {
  buildings: ['541941378', '541941377', '454254347', '682937220', '454254349'],
  lane: ['465490349', '666579842', '666579843'],
};
// Lorongs 6, 8, 10 and 12 south of the study rectangle, with the service road between Lorongs 4 and 6 (open question 92,
// 14 November 2026): twenty plots and the lanes' ways by id. Lorongs 6 and 8 were never in the road set, so they are taken in
// whole; the service road's ways have no name in the source and are taken in as "Service road".
const southWest = {
  buildings: [
    '454274481', '454254191', '1223129486', '454254199', '454254198', '1236158086',
    '454274470', '454274479', '454274473', '454274475', '454274477', '454274466', '1223401724', '454438336', '121873782',
    '454438333', '454438325', '454438324', '454438322', '454438317',
  ],
  lorong6: ['666008222', '666007653', '666007652', '666007655', '666007651', '23513334'],
  lorong8: ['666008581', '23513331', '666008556'],
  lorong12: ['666011233', '666010666'],
  service: ['782605023', '111737898', '927016604'],
};
// Lorong Bachok between Lorongs 19 and 21 (open question 93, 14 November 2026): the twelve outlines of its north row and
// the lane's two middle ways, joining the mouths taken with Lorongs 19 and 21. The two blocks south of it (ways 454254245
// and 454254242) stand 35-75 m back behind a car park and wait for a walk that can photograph them.
const bachok = {
  buildings: [
    '454254315', '454254316', '454254318', '454254320', '454254321', '454254322', '454254323', '454254324', '454254325', '454254326',
    '454254327', '454254328',
  ],
  lane: ['666807846', '762269508'],
};
// Lorong 7 at the extract's west edge (open question 94, 14 November 2026): the plots on both sides not yet in the map,
// the lane's three ways, and Sims Avenue's way west of the study rectangle, which the two plots north of it face.
const lorong7 = {
  buildings: ['453797931', '453797933', '1223603462', '1223603463', '439168657'],
  lane: ['666812086', '634186084', '666812085'],
  sims: ['633797716'],
};
const wayCoordinates = new Map();
const roads=[], buildings=[], paths=[], contextRoads=[];
for (const [text] of xml.matchAll(/<way\b[^>]*>[\s\S]*?<\/way>/g)) {
  const id=attrs(text.slice(0,text.indexOf('>'))).id;
  const tags=Object.fromEntries([...text.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)].map(m=>[m[1],m[2].replaceAll('&amp;','&')]));
  const coordinates=[...text.matchAll(/<nd ref="(\d+)"/g)].map(m=>nodes.get(m[1]));
  if (coordinates.some(c=>!c)) continue;
  wayCoordinates.set(id, coordinates);
  const extra = [...lorong17.buildings, ...lorong17.lane, ...lorong17.links, ...Object.values(lorong19).flat(), ...Object.values(lorong21).flat(), ...Object.values(lorong14).flat(), ...Object.values(lorong16).flat(), ...Object.values(lorong18).flat(), ...Object.values(simsNorth).flat(), ...Object.values(geylang352).flat(), ...Object.values(lorong17North).flat(), ...Object.values(lorong1921North).flat(), ...Object.values(lorong21aNorth).flat(), ...Object.values(southWest).flat(), ...Object.values(bachok).flat(), ...Object.values(lorong7).flat()].includes(id);
  if (!coordinates.some(inside) && !extra) continue;
  if(tags.highway && (names.includes(tags.name) || [...lorong17.lane, ...lorong19.lane, ...lorong19.bachok, ...lorong21.lane, ...lorong21.bachok, ...lorong14.lane, ...lorong14.talma, ...lorong16.lane, ...lorong18.lane, ...lorong18.westerhout, ...simsNorth.mouths, ...simsNorth.avenueEast, ...geylang352.geylangRoad, ...lorong17North.lane, ...lorong1921North.lorong19, ...lorong1921North.joining, ...lorong1921North.lorong21, ...lorong21aNorth.lane, ...southWest.lorong6, ...southWest.lorong8, ...southWest.lorong12, ...southWest.service, ...bachok.lane, ...lorong7.lane, ...lorong7.sims].includes(id))) roads.push({id,name:tags.name??'Service road',oneway:tags.oneway??'unknown',lanes:Number(tags.lanes)||1,coordinates});
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
// The line through two points moved `metres` to its left (looking from the first to the second), in degrees scaled to
// local metres.
const shifted = (a, b, metres) => {
  const k = Math.cos(a[1] * Math.PI / 180), dx = (b[0] - a[0]) * k, dz = b[1] - a[1], length = Math.hypot(dx, dz);
  const o = [-dz / length * metres / k, dx / length * metres].map(v => v / 111320);
  return [a, b].map(p => [p[0] + o[0], p[1] + o[1]]);
};
// The point `metres` before a way's first point, on the line of its first segment: a lane run on past the extract's edge.
const before = (coordinates, metres) => {
  const [a, b] = coordinates, k = Math.cos(a[1] * Math.PI / 180), length = Math.hypot((a[0] - b[0]) * k, a[1] - b[1]) * 111320;
  return [a[0] + (a[0] - b[0]) * metres / length, a[1] + (a[1] - b[1]) * metres / length];
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
  // Lorong 14, from the Geylang Road centreline (its mouth is inside the Geylang Road corridors) to the extract's edge.
  // Nos. 302-308 Geylang Road stand about 7 m back from No. 300, beyond the Geylang Road corridor, so their forecourt
  // is a corridor of its own, 3 m in front of their faces.
  { name: 'Lorong 14 Geylang', halfWidth: 13, path: chain(lorong14.lane) },
  { name: 'Geylang Road, the forecourt of Nos. 302-308', halfWidth: 6, path: shifted(wayCoordinates.get('764372575')[0], wayCoordinates.get('764372573')[1], 3) },
  // Lorong 16, from the Geylang Road centreline to the end of its last way in the extract.
  { name: 'Lorong 16 Geylang', halfWidth: 13, path: chain(lorong16.lane).reverse() },
  // Lorong 18 from the Geylang Road centreline to the Westerhout Road centreline, and Geylang Road on from the Lorong 21
  // link, carried about 18 m past Lorong 18's junction to take in the east corner.
  { name: 'Lorong 18 Geylang', halfWidth: 13, path: chain(lorong18.lane.slice(1)).reverse() },
  { name: 'Geylang Road, Lorong 21 to Lorong 18', halfWidth: 13, path: [along([...wayCoordinates.get('660071186')].reverse(), 18), ...chain(['666816964'])] },
  // The north side of Sims Avenue: west from Lorong 17's junction past No. 135, and east from the Lorong 21 link to Lorong
  // 21A's junction, about 80 m along the way past Lorong 21.
  { name: 'Sims Avenue, No. 135 to Lorong 17', halfWidth: 12, path: chain(['649794626', '666804804', '475336751', '727628958']) },
  // Geylang Road on from the Lorong 18 link, east past No. 364 to about 4 m short of the extract's last Geylang Road node.
  { name: 'Geylang Road, Lorong 18 to No. 364', halfWidth: 13, path: [along(wayCoordinates.get('632265797'), 4), ...wayCoordinates.get('632265797').slice(1), ...wayCoordinates.get('660071185').slice(1), along([...wayCoordinates.get('660071186')].reverse(), 18)] },
  // Lorong 17 north of Sims Avenue, from the extract's north edge to the avenue's centreline.
  { name: 'Lorong 17 Geylang, north of Sims Avenue', halfWidth: 13, path: [along(wayCoordinates.get('475948499'), 14), ...chain(['475948499', '632832138', '708456470', '708456471']).slice(1)] },
  // Lorong 19 north of Sims Avenue from the extract's north edge to the avenue, the road east to Lorong 21, and Lorong 21
  // from the avenue to about 12 m past the extract's north edge, to take in the front of dMC (No. 51), which straddles it.
  { name: 'Lorong 19 Geylang, north of Sims Avenue', halfWidth: 13, path: chain([...lorong1921North.lorong19, '666807374']) },
  { name: 'Lorong 19 Geylang, the road to Lorong 21', halfWidth: 12, path: chain(lorong1921North.joining) },
  { name: 'Lorong 21 Geylang, north of Sims Avenue', halfWidth: 13, path: [...chain(['666807857', ...lorong1921North.lorong21.slice(0, -1)]), along(wayCoordinates.get('666807859'), 30)] },
  // Lorong 21A from Sims Avenue's centreline to about 12 m past the extract's north edge, to take in its plots' fronts.
  { name: 'Lorong 21A Geylang, north of Sims Avenue', halfWidth: 13, path: [...chain(['666579841', '465490349', '666579842']), along(wayCoordinates.get('666579843'), 38)] },
  // Carried on past Lorong 21A to the Lorong 23 corner, about 25 m along the next way (open question 91).
  // Lorongs 6, 8, 10 and 12 from the extract's south edge north into the study rectangle, and the service road from the
  // extract's edge to Lorong 6 (open question 92).
  // Lorongs 6 and 12 start about 15 and 12 m south of the extract's edge, to take in the fronts of the plots straddling it.
  { name: 'Lorong 6 Geylang, south', halfWidth: 12, path: [along([...wayCoordinates.get('666008221')].reverse(), 15), ...chain(['666008222', '666007653', '666007652', '666007655'])] },
  { name: 'Lorong 8 Geylang, south', halfWidth: 12, path: [along(wayCoordinates.get('666008581'), 10), wayCoordinates.get('666008581').at(-1)] },
  { name: 'Lorong 10 Geylang, south', halfWidth: 12, path: chain(['632263018']) },
  { name: 'Lorong 12 Geylang, south', halfWidth: 12, path: [along(wayCoordinates.get('666011234'), 12), ...chain(['666011233', '666010666', '666010667'])] },
  { name: 'Service road between Lorongs 4 and 6', halfWidth: 9, path: [along(wayCoordinates.get('782605023'), 22), ...wayCoordinates.get('782605023').slice(1), ...[...wayCoordinates.get('111737898')].reverse().slice(1)] },
  // Lorong Bachok from Lorong 19's junction to Lorong 21's (open question 93).
  { name: 'Lorong Bachok', halfWidth: 10, path: chain(['23513607', '666807846', '762269508', '666807847']) },
  // Lorong 7 runs on north past the extract's edge to Sims Avenue, as its ways point, to reach Winsome Apartments' front.
  { name: 'Lorong 7 Geylang', halfWidth: 10, path: [before(wayCoordinates.get('666812086'), 36), ...chain(lorong7.lane)] },
  { name: 'Sims Avenue, west of the study rectangle', halfWidth: 12, path: chain(lorong7.sims) },
  { name: 'Sims Avenue, Lorong 21 to Lorong 21A', halfWidth: 12, path: [along(wayCoordinates.get('632842880'), 10), ...wayCoordinates.get('632842880').slice(1), along(wayCoordinates.get('475337630'), 25)] },
];
const map={origin:[103.8773,1.3131],bounds,corridors,source:'https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155',retrieved:'2026-09-28',licence:'ODbL-1.0',roads,buildings,paths,contextRoads};
fs.writeFileSync(new URL('../public/map.json',import.meta.url),JSON.stringify(map));
console.log(JSON.stringify({roads:roads.length,buildings:buildings.length,lorongs:roads.filter(r=>r.name.startsWith('Lorong')).map(r=>({id:r.id,name:r.name,oneway:r.oneway}))},null,2));
