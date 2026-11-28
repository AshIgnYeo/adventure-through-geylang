import * as pc from 'playcanvas';
import {project, roadWidth, studyArea} from './geo.mjs';
import { coreLandmarkFor as landmarkFor, landmarkReviewPoint } from './core-landmarks.mjs';
import { buildLandmark } from './landmark-models';
import { buildShanYuanTang } from './shan-yuan-tang';
import { buildLeongKeeRearContext } from './leong-kee-exterior';
import { buildMongkokCorner } from './mongkok';
import { thyeSengRoofTriangles } from './thye-seng-layout.mjs';
import { builderModule, loadBuilder, type Builder } from './builder-registry';
import { FootprintGrid, SegmentGrid } from './spatial-grid.mjs';
import { massingGeometry } from './massing.mjs';
import { buildAlleyGround, buildAlleyExteriors, buildAlleyLowContext } from './temple-alley';
export type Point = [number,number];
type Road = {id:string;name:string;oneway:string;lanes:number;coordinates:Point[]};
type Building = {id:string;levels:number|null;street:string|null;number:string|null;coordinates:Point[]};
export type MapData = {origin:Point;bounds:number[];corridors?:{name:string;halfWidth:number;path:Point[]}[];roads:Road[];buildings:Building[];contextRoads:Road[];paths:{id:string;highway:string;service:string|null;coordinates:Point[]}[]};
type Segment={a:Point;b:Point;width:number;name:string;oneway:string;length:number;dx:number;dz:number};
const palette=['#d4c7a4','#98a796','#c7ad7f','#bc9986','#c2c4b4','#a5b2b0'];
const fictional=['夜来香 · NIGHT BLOOM','LORONG COFFEE','新月 · NEW MOON','AFTER HOURS','南风 · SOUTH WIND','LUCKY ELEVEN','SILVER SPOON','永安 · EVER PEACE'];
const color=(hex:string)=>new pc.Color().fromString(hex);
export type Spawn={p:Point;yaw:number;pitch?:number};
/** The tile index scripts/build-tiles.mjs writes from a headless run of every builder (docs/loading-and-streaming-plan.md):
 * each unit's tile, the review spawns with the unit that sets them, footprints builders add, massing per footprint
 * (tile and height, in footprint order) and the colour materials some builder draws two-sided. */
export type TileIndex={tileSize:number;units:Record<string,string>;spawns:Record<string,[number,number,number,number|null,string]>;footprints:[string,Point[]][];massing:[string,number][];culled:string[]};
// Static geometry merges per tile. Each building's parts go to the tile of the building, so tiles load and unload whole.
const TILE=64;
// Passes over the whole lane that are not one building's. They build after the buildings, as units of their own.
const LANE_UNITS=['shan-yuan-tang','alley-exteriors'];
// Streaming distances, from the walker to the nearest point of a tile. Fog starts at 120 m by day.
const START_RADIUS=90,LOAD_RADIUS=180,UNLOAD_RADIUS=260;
type Tile={key:string;rect:number[];units:string[];modules:string[];built:number;parts:pc.MeshInstance[];batches:pc.Batch[];textures:pc.Texture[];massing:pc.MeshInstance|null;detail:boolean};
/** Review spawns. With a tile index they are all known before anything is built, and builders' own writes only check
 * it: when a unit finishes, its last write to each spawn it owns must match the index. */
export class SpawnTable extends Map<string,Spawn>{
  owners=new Map<string,string>();unit:string|null=null;sealed=false;stale=new Set<string>();private writes=new Map<string,Spawn>();
  override set(id:string,s:Spawn){
    if(!this.sealed){super.set(id,s);if(this.unit)this.owners.set(id,this.unit);}
    else if(!this.owners.has(id)||this.owners.get(id)===this.unit)this.writes.set(id,s);
    return this;
  }
  endUnit(){
    for(const [id,s] of this.writes){
      const known=super.get(id);
      if(!known){super.set(id,s);this.stale.add(id);}
      // Node and the browser can differ in the last digit of trigonometry, so allow a hair's breadth.
      else if(Math.abs(known.p[0]-s.p[0])>1e-6||Math.abs(known.p[1]-s.p[1])>1e-6||Math.abs(known.yaw-s.yaw)>1e-6||(known.pitch??null)!==(s.pitch??null))this.stale.add(id);
    }
    this.writes.clear();
  }
}
export class World {
  app:pc.AppBase;data:MapData; segments:Segment[]=[]; footprints:Point[][]=[];
  bounds:number[]; inStudy:(p:Point,margin?:number)=>boolean; lamps:pc.Entity[]=[]; emissives:pc.StandardMaterial[]=[];
  sun:pc.Entity; camera:pc.Entity; ground:pc.StandardMaterial;
  /** Building ids in map order, then the lane passes: the order a full build runs in. */
  units:string[]=[];
  reviewSpawns=new SpawnTable();
  /** Outlines builders added for collision, with the unit that added them. Recorded only without a tile index. */
  addedFootprints:[string,Point[]][]=[];
  /** Called after each unit builds, with the parts it placed. scripts/build-tiles.mjs measures units with it. */
  onUnit?:(unit:string,parts:pc.MeshInstance[])=>void;
  private index:TileIndex|null;private culled:Set<string>;
  private materials=new Map<string,pc.StandardMaterial>();
  private polys=new Map<string,Point[]>();private order=new Map<string,number>();
  private tiles=new Map<string,Tile>();private merging=false;
  private unit:string|null=null;private unitTile:string|null=null;private unitParts:pc.MeshInstance[]|null=null;private primitives=new Map<string,pc.Mesh>();
  // Plain colours, keyed by their material, and the few materials they share once merged (loading plan step 6).
  private colours=new Map<pc.Material,{hex:string;glow:number;linear:number[]}>();private sharedColours=new Map<string,pc.StandardMaterial>();private coloured=new WeakSet<pc.Mesh>();private tileTextures:pc.Texture[]|null=null;
  private builders=new Map<string,Builder>();private loading=new Map<string,Promise<void>>();
  private facade!:pc.StandardMaterial;private heritage!:pc.StandardMaterial;private signMaterials:pc.StandardMaterial[]=[];
  private focus:Point|null=null;private queue:Tile[]=[];private far:Tile[]=[];private warned=false;
  // Collision and road lookups test only nearby footprints and segments, so they stay flat as the map grows.
  private walkGrid=new FootprintGrid(.28);private roadGrid:SegmentGrid;
  constructor(app:pc.AppBase,data:MapData,camera:pc.Entity,index?:TileIndex){
    this.app=app;this.data=data;this.camera=camera;
    this.index=index??null;this.culled=new Set(index?.culled);
    if(index&&index.tileSize!==TILE)throw new Error(`tiles.json uses ${index.tileSize} m tiles, not ${TILE} m`);
    const low=project([data.bounds[0],data.bounds[1]],data.origin), high=project([data.bounds[2],data.bounds[3]],data.origin);
    this.bounds=[low[0],high[1],high[0],low[1]];this.inStudy=studyArea(data);
    this.ground=this.mat('#434948');
    this.box('ground',0,-.14,0,1200,.25,1200,this.mat('#454c43'));
    this.sun=new pc.Entity('Evening light');this.sun.addComponent('light',{type:'directional',color:color('#c0d1e4'),intensity:1.1,castShadows:true,shadowDistance:110,shadowResolution:1024,shadowBias:.15,normalOffsetBias:.04});this.sun.setEulerAngles(43,-25,0);app.root.addChild(this.sun);
    for(const r of data.roads)for(let i=1;i<r.coordinates.length;i++){
      const a=project(r.coordinates[i-1],data.origin) as Point,b=project(r.coordinates[i],data.origin) as Point;
      const len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<.1)continue;
      this.segments.push({a,b,width:roadWidth(r),name:r.name,oneway:r.oneway,length:len,dx:(b[0]-a[0])/len,dz:(b[1]-a[1])/len});
    }
    this.roadGrid=new SegmentGrid(this.segments);
    // Every outline blocks walking from the start, built or not.
    for(let index=0;index<data.buildings.length;index++){
      const b=data.buildings[index];const poly=b.coordinates.map(p=>project(p,data.origin) as Point);if(poly.length>1&&Math.hypot(poly[0][0]-poly.at(-1)![0],poly[0][1]-poly.at(-1)![1])<.1)poly.pop();if(poly.length<3)continue;
      this.polys.set(b.id,poly);this.order.set(b.id,index);this.footprints.push(poly);this.units.push(b.id);
    }
    this.units.push(...LANE_UNITS);
    if(index){
      for(const [,poly] of index.footprints)this.footprints.push(poly);
      for(const [id,[x,z,yaw,pitch,unit]] of Object.entries(index.spawns)){this.reviewSpawns.set(id,pitch===null?{p:[x,z],yaw}:{p:[x,z],yaw,pitch});this.reviewSpawns.owners.set(id,unit);}
      this.reviewSpawns.sealed=true;
      for(const unit of this.units){const key=this.unitTileOf(unit);if(key)this.tile(key).units.push(unit);}
      for(const t of this.tiles.values())t.modules=[...new Set(t.units.map(u=>builderModule.get(u)).filter((m):m is string=>!!m))];
    }
  }
  mat(hex:string,glow=0){const key=hex+glow;if(this.materials.has(key))return this.materials.get(key)!;const m=new pc.StandardMaterial();m.diffuse=color(hex);m.useMetalness=true;m.metalness=.04;m.gloss=glow?.45:.2;if(glow){m.emissive=color(hex);m.emissiveIntensity=glow;this.emissives.push(m);}
    // Colours some builder draws two-sided are two-sided from the start, so the result does not depend on build order.
    if(this.culled.has(key))m.cull=pc.CULLFACE_NONE;
    m.update();this.materials.set(key,m);const c=new pc.Color().linear(color(hex));this.colours.set(m,{hex,glow,linear:[c.r,c.g,c.b,1]});return m;}
  /** The shared colour materials, by colour and glow. */
  colourMaterials():ReadonlyMap<string,pc.StandardMaterial>{return this.materials;}
  /** Adds collision for an outline a builder draws beyond the map's footprints. A tile index already holds these. */
  addFootprint(poly:Point[]){if(this.index)return;this.footprints.push(poly);this.addedFootprints.push([this.unit??'',poly]);}
  // Parts to merge are a transform and a mesh instance, with no entity or render component: they are only ever drawn
  // through their tile's batches, and entities would cost far more to create and to drop. A building's parts go to its
  // own tile. Roads and the lane's other shared ground go by position, into base tiles that stay loaded.
  private part(name:string,mesh:pc.Mesh,mat:pc.Material,castShadows:boolean,x:number,z:number){
    const node=new pc.GraphNode(name),mi=new pc.MeshInstance(mesh,mat,node);mi.castShadow=castShadows;mi.receiveShadow=true;mi.shadowCascadeMask=pc.SHADOW_CASCADE_ALL;
    this.tile(this.unitTile??`base ${Math.floor(x/TILE)},${Math.floor(z/TILE)}`).parts.push(mi);this.unitParts?.push(mi);return node;
  }
  // Parts drawn on their own, outside the merge.
  private entity(name:string,data:object,parent?:pc.Entity){const e=new pc.Entity(name);e.addComponent('render',data);(parent??this.app.root).addChild(e);return e;}
  // The engine's own unit box and cylinder, so merged primitives match the render component's exactly.
  // A plain colour also goes into each part's vertices, as the same linear float the material would pass, so merged parts
  // can share one material per culling and glow and still draw exactly the same colour.
  private primitive(type:'box'|'cylinder',mat:pc.Material){
    const c=this.colours.get(mat),key=c?`${type} ${c.hex}`:type;let m=this.primitives.get(key);if(m)return m;
    const g=type==='box'?new pc.BoxGeometry():new pc.CylinderGeometry({radius:.5,height:1});
    if(c){m=new pc.Mesh(this.app.graphicsDevice);m.setPositions(g.positions);m.setNormals(g.normals!);m.setUvs(0,g.uvs!);this.colour(m,g.positions.length/3,c.linear);m.setIndices(g.indices!);m.update();}
    else m=pc.Mesh.fromGeometry(this.app.graphicsDevice,g);
    m.incRefCount();this.primitives.set(key,m);return m;
  }
  private colour(mesh:pc.Mesh,count:number,linear:number[]){const colours=new Array(count*4);for(let i=0;i<count*4;i++)colours[i]=linear[i%4];mesh.setColors(colours);this.coloured.add(mesh);}
  // Whether a colour material is still just its colour: builders may make one two-sided, but nothing else.
  private plain(m:pc.StandardMaterial,c:{hex:string;glow:number}){
    const d=color(c.hex),e=c.glow?d:new pc.Color(0,0,0),same=(a:pc.Color,b:pc.Color)=>a.r===b.r&&a.g===b.g&&a.b===b.b;
    return !m.diffuseMap&&!m.emissiveMap&&!m.opacityMap&&!m.normalMap&&m.opacity===1&&m.blendType===pc.BLEND_NONE&&m.alphaTest===0&&m.depthWrite&&m.useMetalness&&m.metalness===.04&&m.gloss===(c.glow?.45:.2)&&m.emissiveIntensity===(c.glow||1)&&same(m.diffuse,d)&&same(m.emissive,e);
  }
  private sharedColour(cull:number,glow:number){
    const key=`${cull} ${glow}`;let m=this.sharedColours.get(key);if(m)return m;
    m=new pc.StandardMaterial();m.diffuseVertexColor=true;m.useMetalness=true;m.metalness=.04;m.gloss=glow?.45:.2;m.cull=cull;
    if(glow){m.emissive=new pc.Color(1,1,1);m.emissiveVertexColor=true;m.emissiveIntensity=glow;}
    m.update();this.sharedColours.set(key,m);return m;
  }
  private tile(key:string){
    let t=this.tiles.get(key);if(t)return t;
    const [tx,tz]=key.replace('base ','').split(',').map(Number);
    t={key,rect:[tx*TILE,tz*TILE,(tx+1)*TILE,(tz+1)*TILE],units:[],modules:[],built:0,parts:[],batches:[],textures:[],massing:null,detail:false};this.tiles.set(key,t);return t;
  }
  private unitTileOf(unit:string){const poly=this.polys.get(unit);return this.index?.units[unit]??(poly?`${Math.floor(poly.reduce((s,p)=>s+p[0],0)/poly.length/TILE)},${Math.floor(poly.reduce((s,p)=>s+p[1],0)/poly.length/TILE)}`:null);}
  // One merge pass per tile. Engine batch groups would rebatch the whole scene again on the first frame.
  private mergeTile(t:Tile){
    const batcher=this.app.batcher!;
    // Plain colours merge under a few shared materials. Their culling is final by now, whatever order the tiles built in.
    for(const mi of t.parts){const c=this.colours.get(mi.material),m=mi.material as pc.StandardMaterial;if(c&&this.coloured.has(mi.mesh)&&this.plain(m,c))mi.material=this.sharedColour(m.cull,c.glow);}
    for(const list of batcher.prepare(t.parts,false,35,false)){const batch=batcher.create(list,false);if(batch){batch.addToLayers(this.app.scene,[pc.LAYERID_WORLD]);t.batches.push(batch);}}
    // Only the merged copies are drawn, so the parts' own meshes are freed. The shared primitives hold a reference of their own.
    for(const mi of t.parts)mi.destroy();t.parts=[];
    t.detail=true;this.showMassing(t,false);
  }
  private unloadTile(t:Tile){
    for(const batch of t.batches)batch.destroy(this.app.scene,[pc.LAYERID_WORLD]);
    // The batch manager keeps every batch it made in a private list; drop these so it does not hold them.
    const gone=new Set(t.batches),batcher=this.app.batcher as unknown as {_batchList:pc.Batch[]};batcher._batchList=batcher._batchList.filter(b=>!gone.has(b));
    for(const texture of t.textures)texture.destroy();
    t.batches=[];t.textures=[];t.built=0;t.detail=false;this.showMassing(t,true);
  }
  private showMassing(t:Tile,show:boolean){if(!t.massing)return;const layer=this.app.scene.layers.getLayerById(pc.LAYERID_WORLD)!;if(show)layer.addMeshInstances([t.massing]);else layer.removeMeshInstances([t.massing]);}
  private buildMassing(){
    const index=this.index!,byTile=new Map<string,number[]>();index.massing.forEach(([key],i)=>{if(!byTile.has(key))byTile.set(key,[]);byTile.get(key)!.push(i);});
    const material=new pc.StandardMaterial();material.diffuse=color('#c3bcad');material.useMetalness=true;material.metalness=.04;material.gloss=.2;material.cull=pc.CULLFACE_NONE;material.update();
    for(const [key,list] of byTile){
      const g=massingGeometry(list.map(i=>this.footprints[i]),list.map(i=>index.massing[i][1]));if(!g.indices.length)continue;
      const mesh=new pc.Mesh(this.app.graphicsDevice);mesh.setPositions(g.positions);mesh.setNormals(g.normals);mesh.setIndices(g.indices);mesh.update();
      const t=this.tile(key);t.massing=new pc.MeshInstance(mesh,material,this.app.root);t.massing.castShadow=false;if(!t.detail)this.showMassing(t,true);
    }
  }
  private loadTexture(name:string,url:string){const asset=new pc.Asset(name,'texture',{url});this.app.assets.add(asset);return new Promise<pc.Texture>((resolve,reject)=>{asset.ready(()=>resolve(asset.resource as pc.Texture));asset.on('error',reject);this.app.assets.load(asset);});}
  box(name:string,x:number,y:number,z:number,w:number,h:number,d:number,mat:pc.Material,parent?:pc.Entity,angle=0):pc.GraphNode{const e=!parent&&this.merging?this.part(name,this.primitive('box',mat),mat,h>.5,x,z):this.entity(name,{type:'box',material:mat,castShadows:h>.5,receiveShadows:true},parent);e.setLocalPosition(x,y,z);e.setLocalScale(w,h,d);e.setLocalEulerAngles(0,angle,0);return e;}
  cylinder(name:string,x:number,y:number,z:number,diameter:number,h:number,mat:pc.Material,castShadows=false):pc.GraphNode{const e=this.merging?this.part(name,this.primitive('cylinder',mat),mat,castShadows,x,z):this.entity(name,{type:'cylinder',material:mat,castShadows,receiveShadows:true});e.setLocalPosition(x,y,z);e.setLocalScale(diameter,h,diameter);return e;}
  strip(a:Point,b:Point,width:number,y:number,mat:pc.Material){const dx=b[0]-a[0],dz=b[1]-a[1];return this.box('street surface',(a[0]+b[0])/2,y,(a[1]+b[1])/2,width,.045,Math.hypot(dx,dz)+.06,mat,undefined,Math.atan2(dx,dz)*180/Math.PI);}
  mesh(name:string,positions:number[],uvs:number[],indices:number[],mat:pc.Material){const mesh=new pc.Mesh(this.app.graphicsDevice);mesh.setPositions(positions);mesh.setNormals(pc.calculateNormals(positions,indices));mesh.setUvs(0,uvs);const c=this.colours.get(mat);if(c)this.colour(mesh,positions.length/3,c.linear);mesh.setIndices(indices);mesh.update();return this.merging?this.part(name,mesh,mat,true,positions[0],positions[2]):this.entity(name,{meshInstances:[new pc.MeshInstance(mesh,mat)],castShadows:true});}
  panel(a:Point,b:Point,base:number,top:number,mat:pc.Material,uv=[0,0,1,1]){const p=[a[0],base,a[1],b[0],base,b[1],b[0],top,b[1],a[0],top,a[1]];return this.mesh('facade',p,[uv[0],uv[3],uv[2],uv[3],uv[2],uv[1],uv[0],uv[1]],[0,1,2,0,2,3],mat);}
  texture(canvas:HTMLCanvasElement){const t=new pc.Texture(this.app.graphicsDevice,{width:canvas.width,height:canvas.height,mipmaps:true,minFilter:pc.FILTER_LINEAR_MIPMAP_LINEAR,magFilter:pc.FILTER_LINEAR,anisotropy:4});t.setSource(canvas);this.tileTextures?.push(t);return t;}
  textMaterial(text:string,bg:string,fg:string,glow=.3,aspect=1024/192){
    const canvas=document.createElement('canvas');canvas.width=Math.min(4096,Math.max(128,Math.round(192*aspect)));canvas.height=Math.round(canvas.width/aspect);
    const c=canvas.getContext('2d')!,w=canvas.width,h=canvas.height,pad=h*.065;
    c.fillStyle=bg;c.fillRect(0,0,w,h);c.strokeStyle=fg;c.lineWidth=2;c.strokeRect(pad,pad,w-pad*2,h-pad*2);c.fillStyle=fg;
    const fontSize=h*.58;c.font=`600 ${fontSize}px sans-serif`;const measured=c.measureText(text).width;c.font=`600 ${fontSize*Math.min(1,(w-pad*4)/measured)}px sans-serif`;
    c.textAlign='center';c.textBaseline='middle';c.fillText(text,w/2,h*.52);
    const t=this.texture(canvas),m=new pc.StandardMaterial();m.diffuseMap=t;m.emissiveMap=t;m.emissive=new pc.Color(1,1,1);m.emissiveIntensity=glow;m.cull=pc.CULLFACE_NONE;m.update();return m;
  }
  private loadModules(modules:string[]){return Promise.all(modules.map(m=>{let p=this.loading.get(m);if(!p){p=loadBuilder.get(m)!().then(b=>{this.builders.set(m,b);});this.loading.set(m,p);}return p;}));}
  // Atlases, shared materials and the builder modules asked for, loaded together.
  private async prepare(modules:string[]){
    const [atlas,heritageTexture]=await Promise.all([this.loadTexture('Shophouse textures','/shophouse-atlas.webp'),this.loadTexture('Lorong 11 reference-led heritage','/lorong-11-heritage-atlas.webp'),this.loadModules(modules)]);atlas.anisotropy=4;heritageTexture.anisotropy=4;
    const facade=new pc.StandardMaterial();facade.diffuseMap=atlas;facade.diffuse=new pc.Color(.94,.94,.94);facade.cull=pc.CULLFACE_NONE;facade.gloss=.12;facade.update();this.facade=facade;
    const heritage=new pc.StandardMaterial();heritage.diffuseMap=heritageTexture;heritage.cull=pc.CULLFACE_NONE;heritage.gloss=.12;heritage.update();this.heritage=heritage;
    // Texture colour variation and aggregate are generated deterministically at load time.
    const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d')!;const pixels=c.createImageData(512,512);let rng=731;for(let i=0;i<pixels.data.length;i+=4){rng=(Math.imul(rng,1664525)+1013904223)>>>0;const n=67+(rng%28);pixels.data.set([n,n+3,n+4,255],i);}c.putImageData(pixels,0,0);this.ground.diffuse=new pc.Color(.85,.85,.85);this.ground.diffuseMap=this.texture(canvas);this.ground.diffuseMapTiling.set(2,12);this.ground.update();
    this.signMaterials=fictional.map((text,i)=>this.textMaterial(text,['#254337','#652f2a','#243c4a','#775926'][i%4],['#ecdcb9','#eee0ae','#c8e0d8'][i%3]));
  }
  // Roads, lamps, the lane's paving and the street plates: shared ground that stays loaded.
  private buildBase(){
    for(const s of this.segments){this.strip(s.a,s.b,s.width+4,.04,this.mat('#939387'));}
    for(const s of this.segments){this.strip(s.a,s.b,s.width,.075,this.ground);}
    for(const s of this.segments){
      for(const side of [-1,1]){
        const offset=s.width/2-.18;const a:Point=[s.a[0]+s.dz*offset*side,s.a[1]-s.dx*offset*side],b:Point=[s.b[0]+s.dz*offset*side,s.b[1]-s.dx*offset*side];
        this.strip(a,b,.085,.106,this.mat('#d4b65b'));
      }
      const lanes=s.name.startsWith('Lorong')?1:Math.round(s.width/3.2);
      for(let lane=1;lane<lanes;lane++)for(let d=3;d<s.length-3;d+=8){const off=-s.width/2+lane*s.width/lanes;const a:Point=[s.a[0]+s.dx*d+s.dz*off,s.a[1]+s.dz*d-s.dx*off];const b:Point=[a[0]+s.dx*3,a[1]+s.dz*3];this.strip(a,b,.12,.11,this.mat('#c6c7b9'));}
      if(s.length>22){
        for(let d=12;d<s.length;d+=32){const x=s.a[0]+s.dx*d+s.dz*(s.width/2+1.15),z=s.a[1]+s.dz*d-s.dx*(s.width/2+1.15);this.lamp(x,z);}
      }
    }
    buildAlleyGround(this);
    // Street plates at the observed ends of each lorong, readable in-world only.
    for(const name of ['Lorong 11 Geylang','Lorong 13 Geylang']){
      const segments=this.segments.filter(s=>s.name===name);const points=segments.flatMap(s=>[s.a,s.b]).sort((a,b)=>a[1]-b[1]);
      for(const p of [points[0],points.at(-1)!]){const s=this.nearest(p).segment;const x=p[0]+s.dz*4.6,z=p[1]-s.dx*4.6;this.box('sign post',x,1.6,z,.065,3.2,.065,this.mat('#858e84'));const m=this.textMaterial(name.toUpperCase(),'#125b45','#f5f3de',.05);
        this.box('street sign backing',x,2.95,z,2.65,.5,.065,this.mat('#125b45'));
        // Separate outward-facing sides keep lettering readable from either approach.
        this.panel([x-1.325,z+.034],[x+1.325,z+.034],2.7,3.2,m);
        this.panel([x+1.325,z-.034],[x-1.325,z-.034],2.7,3.2,m);
      }
    }
  }
  /** Builds one unit: a building by id, or one of the lane passes. */
  buildUnit(unit:string){
    this.unit=this.reviewSpawns.unit=unit;this.unitTile=this.unitTileOf(unit);const parts:pc.MeshInstance[]=[];this.unitParts=parts;
    if(unit==='shan-yuan-tang')buildShanYuanTang(this);else if(unit==='alley-exteriors')buildAlleyExteriors(this);else this.buildBuilding(unit);
    this.reviewSpawns.endUnit();this.unit=this.reviewSpawns.unit=null;this.unitTile=null;this.unitParts=null;this.onUnit?.(unit,parts);
  }
  private buildBuilding(id:string){
    const index=this.order.get(id)!,b=this.data.buildings[index];let poly=this.polys.get(id)!;
    // Buildings with their own modules, looked up by id. A builder that declines falls through to the shared paths below.
    const module=builderModule.get(b.id);if(module&&this.builders.get(module)!(this,b.id,poly))return;
    // Split only the rendered corner. Source outline and collision stay intact.
    const mongkokRemainder=buildMongkokCorner(this,b.id,poly);if(mongkokRemainder)poly=mongkokRemainder;
    if(buildAlleyLowContext(this,b.id,poly))return;
    if(buildLeongKeeRearContext(this,b.id,poly))return;
    const centre:Point=[poly.reduce((s,p)=>s+p[0],0)/poly.length,poly.reduce((s,p)=>s+p[1],0)/poly.length];
    const landmark=landmarkFor(b.id);
    let front=0,best=Infinity;
    for(let i=0;i<poly.length;i++){const a=poly[i],c=poly[(i+1)%poly.length],mid:Point=[(a[0]+c[0])/2,(a[1]+c[1])/2];const d=this.nearest(mid).distance;if(d<best && Math.hypot(c[0]-a[0],c[1]-a[1])>3){best=d;front=i;}}
    if(landmark?.frontEdge!==undefined){front=landmark.frontEdge;const a=poly[front],c=poly[(front+1)%poly.length],mid:Point=[(a[0]+c[0])/2,(a[1]+c[1])/2];best=this.nearest(mid).distance;}
    const levels=Math.min(8,b.levels??(b.street==='Lorong 11 Geylang'?2:index%11===0?4:2));const height=landmark?.height??levels*3.35;
    const material=this.mat(landmark?.kind==='thye-seng'?'#dfd9c9':landmark?.kind==='amrise'?'#e3bdc3':landmark?.kind==='hotel'?'#a9c9df':landmark?.kind==='association'?'#e3bdba':landmark?.kind==='agape'?'#c9d9b6':landmark?.kind==='faith-mission'?'#dddcd3':landmark?.kind==='ho-san'?'#deded4':landmark?.kind==='shg'?'#c2d0c4':landmark?.kind==='khek-leow'?'#dedec3':landmark?.kind==='canton-wong'?'#e1e1d8':landmark?.kind==='hainan-goh'?'#b4a9bc':landmark?.kind==='leong-kee'?'#d8c9aa':landmark?.kind==='mosque'?'#ddd6b8':palette[index%palette.length]);material.cull=pc.CULLFACE_NONE;material.update();
    let a=poly[front],v=poly[(front+1)%poly.length];const width=Math.hypot(v[0]-a[0],v[1]-a[1]);let dx=(v[0]-a[0])/width,dz=(v[1]-a[1])/width;
    const mid:Point=[(a[0]+v[0])/2,(a[1]+v[1])/2];
    // Keep the textured face outward regardless of the source polygon winding.
    if(-dz*(mid[0]-centre[0])+dx*(mid[1]-centre[1])<0){[a,v]=[v,a];dx=-dx;dz=-dz;}
    const nx=-dz,nz=dx;
    for(let i=0;i<poly.length;i++)if(i!==front || (!landmark&&(best>27||levels>3))){
      // The corner's west wall opens onto the shallow public dining edge.
      const base=b.id==='454254214'&&i===3?3.12:.13;
      this.panel(poly[i],poly[(i+1)%poly.length],base,height,material);
    }
    const roofPositions=poly.flatMap(p=>[p[0],height+.05,p[1]]),indices=[];
    if(landmark?.kind==='thye-seng')indices.push(...thyeSengRoofTriangles.flat());
    else for(let k=1;k<poly.length-1;k++)indices.push(0,k,k+1);
    const roofMat=this.mat('#754c3b');roofMat.cull=pc.CULLFACE_NONE;roofMat.update();this.mesh('roof',roofPositions,poly.flatMap(p=>[p[0]/4,p[1]/4]),indices,roofMat);
    if(landmark){
      const road=landmarkReviewPoint(landmark,mid,this.segments) as Point;
      const review=landmark.reviewOffset ? [road[0]+nx*landmark.reviewOffset,road[1]+nz*landmark.reviewOffset] as Point : road;
      if(!this.reviewSpawns.has(landmark.id)||b.id==='1223250216'||b.id===landmark.reviewBuildingId)this.reviewSpawns.set(landmark.id,{p:review,yaw:Math.atan2(nx,nz)*180/Math.PI});
      if(buildLandmark(this,b.id,{a,dx,dz,nx,nz,width},this.heritage))return;
    }
    if(best>27)return;
    const bays=Math.max(1,Math.round(width/5.5));
    for(let bay=0;bay<bays;bay++){
      const p:Point=[a[0]+dx*width*bay/bays+nx*.025,a[1]+dz*width*bay/bays+nz*.025];const q:Point=[a[0]+dx*width*(bay+1)/bays+nx*.025,a[1]+dz*width*(bay+1)/bays+nz*.025];
      if(levels<=3){const tile=(index+bay)%4;this.panel(p,q,.14,height,this.facade,[tile/4+.007,.025,(tile+1)/4-.007,.972]);}
      else {for(let floor=1;floor<levels;floor++){const cx=(p[0]+q[0])/2+nx*.07,cz=(p[1]+q[1])/2+nz*.07;this.box('window',cx,floor*3.35+1.5,cz,width/bays*.65,1.6,.14,this.mat(index%2?'#263d43':'#d5ba79',index%2?0:.25),undefined,Math.atan2(nx,nz)*180/Math.PI);}}
      const bw=width/bays,cx=(p[0]+q[0])/2,cz=(p[1]+q[1])/2,angle=Math.atan2(nx,nz)*180/Math.PI;
      this.box('cornice',cx+nx*.12,3.5,cz+nz*.12,bw,.22,.4,this.mat('#c7c3aa'),undefined,angle);
      this.box('roof cornice',cx+nx*.1,height-.15,cz+nz*.1,bw,.25,.5,this.mat('#c7c3aa'),undefined,angle);
      if((index+bay)%3!==0){if(b.street!=='Lorong 11 Geylang')this.panel([p[0]+nx*.1+dx*.2,p[1]+nz*.1+dz*.2],[q[0]+nx*.1-dx*.2,q[1]+nz*.1-dz*.2],2.65,3.35,this.signMaterials[(index+bay)%this.signMaterials.length]);
        const awning=this.box('canvas awning',cx+nx*.95,2.57,cz+nz*.95,bw-.1,.12,1.8,this.mat(['#386155','#994d3c','#b29863'][index%3]),undefined,angle);awning.rotateLocal(9,0,0);
        for(const end of [p,q])this.box('five foot way column',end[0]+nx*1.6,1.3,end[1]+nz*1.6,.2,2.6,.2,this.mat('#c7c3aa'));
        this.box('warm shop light',cx+nx*.2,2.3,cz+nz*.2,bw*.65,.09,.12,this.mat('#f8dc96',1.8),undefined,angle);
      }
      if(b.number&&bay===0){const m=this.textMaterial(b.number,'#143e38','#eee8cf',0);this.panel([p[0]+nx*.12+dx*.25,p[1]+nz*.12+dz*.25],[p[0]+nx*.12+dx*.85,p[1]+nz*.12+dz*.85],1.9,2.2,m);}
      if((index+bay)%5===0){this.box('air conditioner',cx+nx*.4,4.05,cz+nz*.4,.85,.52,.5,this.mat('#a5aaa3'),undefined,angle);for(let l=0;l<5;l++)this.box('air vent',cx+nx*.67,3.87+l*.065,cz+nz*.67,.68,.024,.025,this.mat('#596969'),undefined,angle);}
    }
    if(index%13===0)this.planter(mid[0]+nx*1.2,mid[1]+nz*1.2);
  }
  /** Builds everything at once, as before streaming. Used without a tile index, and by scripts/build-tiles.mjs. */
  async build(){
    await this.prepare([...new Set(this.units.map(u=>builderModule.get(u)).filter((m):m is string=>!!m))]);
    this.merging=true;this.buildBase();for(const unit of this.units)this.buildUnit(unit);
    this.merging=false;for(const t of this.tiles.values())this.mergeTile(t);this.setLight('day');
  }
  private distance(t:Tile,p:Point){return Math.hypot(Math.max(t.rect[0]-p[0],0,p[0]-t.rect[2]),Math.max(t.rect[1]-p[1],0,p[1]-t.rect[3]));}
  private unitTiles(){return [...this.tiles.values()].filter(t=>t.units.length);}
  /** Builds the ground, massing for every footprint and detail near `focus`. Further tiles stream in through `stream`. */
  async start(focus:Point){
    if(!this.index)return this.build();
    const near=this.unitTiles().filter(t=>this.distance(t,focus)<START_RADIUS).sort((a,b)=>this.distance(a,focus)-this.distance(b,focus));
    await this.prepare([...new Set(near.flatMap(t=>t.modules))]);
    this.merging=true;this.buildBase();this.merging=false;
    for(const t of [...this.tiles.values()])if(t.key.startsWith('base '))this.mergeTile(t);
    this.buildMassing();
    for(const t of near){while(t.built<t.units.length)this.buildNext(t);this.mergeTile(t);}
    this.plan(focus);this.setLight('day');
  }
  private buildNext(t:Tile){this.merging=true;this.tileTextures=t.textures;this.buildUnit(t.units[t.built++]);this.tileTextures=null;this.merging=false;}
  // Which tiles to build, nearest first, and which have been left far enough behind to drop.
  private plan(focus:Point){
    this.focus=focus;const tiles=this.unitTiles();
    this.queue=tiles.filter(t=>!t.detail&&this.distance(t,focus)<LOAD_RADIUS).sort((a,b)=>this.distance(a,focus)-this.distance(b,focus));
    this.far=tiles.filter(t=>t.detail&&this.distance(t,focus)>UNLOAD_RADIUS);
    for(const t of this.queue)this.loadModules(t.modules);
  }
  /** True once every tile within reach of the walker is built in detail. */
  get settled(){return !this.index||this.queue.length===0;}
  /** Streams detail around the walker for up to `budgetMs`: a building at a time, nearest tile first, then a tile's merge. */
  stream(focus:Point,budgetMs:number){
    if(!this.index)return;
    if(!this.focus||Math.hypot(focus[0]-this.focus[0],focus[1]-this.focus[1])>8)this.plan(focus);
    const far=this.far.pop();if(far?.detail&&this.distance(far,focus)>UNLOAD_RADIUS)this.unloadTile(far);
    const start=performance.now();
    while(this.queue.length&&performance.now()-start<budgetMs){
      const t=this.queue.find(t=>t.modules.every(m=>this.builders.has(m)));if(!t)break;
      if(t.built<t.units.length){this.buildNext(t);continue;}
      this.mergeTile(t);this.queue.splice(this.queue.indexOf(t),1);
    }
    if(this.reviewSpawns.stale.size&&!this.warned){this.warned=true;console.warn(`tiles.json is out of date for ${[...this.reviewSpawns.stale].join(', ')}. Run npm run tiles.`);}
  }
  nearest(p:Point){const n=this.roadGrid.nearest(p);return{distance:n.distance,segment:this.segments[n.index],point:n.point as Point};}
  // Footprints are only ever appended, during build and by the authored sites, so new ones are filed on the next query.
  canWalk(p:Point){if(!this.inStudy(p,3))return false;while(this.walkGrid.count<this.footprints.length)this.walkGrid.add(this.footprints[this.walkGrid.count]);return !this.walkGrid.blocked(p);}
  spawn(){const s=this.segments.find(s=>s.name==='Lorong 11 Geylang'&&s.length>30)!;const p:Point=[s.b[0]-s.dx*16+s.dz*2.1,s.b[1]-s.dz*16-s.dx*2.1];return{p,yaw:Math.atan2(-s.dx,-s.dz)*180/Math.PI+180};}
  lamp(x:number,z:number){this.box('lamp post',x,3.9,z,.1,7.8,.1,this.mat('#6c7976'));this.box('lamp arm',x+.75,7.75,z,1.6,.09,.09,this.mat('#6c7976'));this.box('lamp head',x+1.45,7.69,z,.6,.12,.32,this.mat('#ffdfaa',2));if(this.lamps.length<12){const e=new pc.Entity('street light');e.addComponent('light',{type:'omni',color:color('#ffd393'),intensity:.7,range:13,castShadows:false});e.setPosition(x+1.45,6.8,z);this.app.root.addChild(e);this.lamps.push(e);}}
  planter(x:number,z:number){
    this.cylinder('terracotta pot',x,.22,z,.38,.44,this.mat('#977665'),true);
    // Thin curved fronds instead of the original spherical foliage placeholders.
    for(let i=0;i<11;i++){
      const angle=i*2.399,length=.35+(i%4)*.075,base=.4,tip=.65+(i%3)*.14;
      const vx=Math.cos(angle),vz=Math.sin(angle),positions:number[]=[],uvs:number[]=[],indices:number[]=[];
      for(let j=0;j<=5;j++){const t=j/5,reach=length*t,y=base+(tip-base)*t+.2*Math.sin(t*Math.PI),half=.04*Math.sin(Math.PI*t);positions.push(x+vx*reach-vz*half,y,z+vz*reach+vx*half,x+vx*reach+vz*half,y,z+vz*reach-vx*half);uvs.push(0,t,1,t);if(j<5){const k=j*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
      const leaf=this.mat(['#3e5b3b','#57704c','#6b8057'][i%3]);leaf.cull=pc.CULLFACE_NONE;leaf.update();this.mesh('palm frond',positions,uvs,indices,leaf);
    }
  }
  setLight(mode:string){const day=mode==='day',night=mode==='night';const sky=day?'#a4b9b9':night?'#101d29':'#526e7c';this.camera.camera!.clearColor=color(sky);this.app.scene.ambientLight=color(day?'#b8b8a3':night?'#485b66':'#7d939a');this.sun.light!.intensity=day?1.6:night?.28:1;this.sun.light!.color=color(day?'#fff0d0':'#cad8e2');this.app.scene.fog.type=pc.FOG_LINEAR;this.app.scene.fog.color=color(sky);this.app.scene.fog.start=day?120:65;this.app.scene.fog.end=day?430:260;for(const light of this.lamps)light.light!.intensity=day?.03:night?1.3:.7;}
}
