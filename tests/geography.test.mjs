import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {project,pointInPolygon,nearestOnSegment} from '../src/geo.mjs';
const map=JSON.parse(fs.readFileSync(new URL('../public/map.json',import.meta.url),'utf8'));
test('projection preserves metre scale against an independent haversine baseline',()=>{
  const a=[103.8767515,1.313754],b=[103.8772165,1.3122642];
  const r=Math.PI/180,dlat=(b[1]-a[1])*r,dlon=(b[0]-a[0])*r;
  const h=Math.sin(dlat/2)**2+Math.cos(a[1]*r)*Math.cos(b[1]*r)*Math.sin(dlon/2)**2;
  const distance=6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
  const p=project(a,map.origin),q=project(b,map.origin);
  assert.ok(Math.abs(Math.hypot(p[0]-q[0],p[1]-q[1])-distance)/distance<.006);
});
test('both lorongs are connected end to end with opposing sourced one-way directions',()=>{
  for(const [name,sign] of [['Lorong 11 Geylang',-1],['Lorong 13 Geylang',1]]){
    const roads=map.roads.filter(r=>r.name===name);assert.ok(roads.length);
    const edges=roads.flatMap(r=>r.coordinates.slice(1).map((p,i)=>[r.coordinates[i],p]));
    const graph=new Map();for(const [a,b] of edges){const ka=a.join(','),kb=b.join(',');if(!graph.has(ka))graph.set(ka,[]);if(!graph.has(kb))graph.set(kb,[]);graph.get(ka).push(kb);graph.get(kb).push(ka);}
    const visited=new Set(),queue=[graph.keys().next().value];while(queue.length){const n=queue.pop();if(visited.has(n))continue;visited.add(n);queue.push(...graph.get(n));}assert.equal(visited.size,graph.size);
    for(const road of roads){assert.equal(road.oneway,'yes');assert.ok((road.coordinates.at(-1)[1]-road.coordinates[0][1])*sign>0);}
  }
});
test('building footprints block interiors and nearest-segment clamps to endpoints',()=>{
  const poly=[[0,0],[5,0],[5,5],[0,5]];assert.equal(pointInPolygon([2,2],poly),true);assert.equal(pointInPolygon([6,2],poly),false);assert.deepEqual(nearestOnSegment([8,0],[0,0],[5,0]).point,[5,0]);
});
