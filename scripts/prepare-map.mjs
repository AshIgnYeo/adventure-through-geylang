import fs from 'node:fs';
const xml = fs.readFileSync(new URL('../public/osm-source.osm', import.meta.url), 'utf8');
const attrs = text => Object.fromEntries([...text.matchAll(/([\w:]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const nodes = new Map([...xml.matchAll(/<node\b[^>]*>/g)].map(([s]) => { const a=attrs(s); return [a.id, [+a.lon, +a.lat]]; }));
const names = ['Lorong 11 Geylang', 'Lorong 13 Geylang', 'Geylang Road', 'Sims Avenue'];
const bounds = [103.87625, 1.31195, 103.8783, 1.31425];
const inside = ([lon,lat]) => lon>=bounds[0] && lon<=bounds[2] && lat>=bounds[1] && lat<=bounds[3];
const roads=[], buildings=[];
for (const [text] of xml.matchAll(/<way\b[^>]*>[\s\S]*?<\/way>/g)) {
  const id=attrs(text.slice(0,text.indexOf('>'))).id;
  const tags=Object.fromEntries([...text.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)].map(m=>[m[1],m[2].replaceAll('&amp;','&')]));
  const coordinates=[...text.matchAll(/<nd ref="(\d+)"/g)].map(m=>nodes.get(m[1]));
  if (coordinates.some(c=>!c) || !coordinates.some(inside)) continue;
  if(tags.highway && names.includes(tags.name)) roads.push({id,name:tags.name,oneway:tags.oneway??'unknown',lanes:Number(tags.lanes)||1,coordinates});
  if(tags.building && coordinates.length>3) buildings.push({id,levels:Number(tags['building:levels'])||null,street:tags['addr:street']??null,number:tags['addr:housenumber']??null,coordinates});
}
const map={origin:[103.8773,1.3131],bounds,source:'https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155',retrieved:'2026-09-28',licence:'ODbL-1.0',roads,buildings};
fs.writeFileSync(new URL('../public/map.json',import.meta.url),JSON.stringify(map));
console.log(JSON.stringify({roads:roads.length,buildings:buildings.length,lorongs:roads.filter(r=>r.name.startsWith('Lorong')).map(r=>({id:r.id,name:r.name,oneway:r.oneway}))},null,2));
