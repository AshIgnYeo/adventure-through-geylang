import * as pc from 'playcanvas';
import {project, nearestOnSegment, roadWidth, pointInPolygon} from './geo.mjs';
import { landmarkFor, landmarkReviewPoint } from './landmarks.mjs';
import { buildLandmark } from './landmark-models';
import { buildShanYuanTang } from './shan-yuan-tang';
import { buildLeongKeeRearContext } from './leong-kee-exterior';
import { buildMongkokCorner } from './mongkok';
import { buildFrogPorridge } from './frog-porridge';
import { buildAlleyGround, buildAlleyExteriors, buildAlleyLowContext } from './temple-alley';
export type Point = [number,number];
type Road = {id:string;name:string;oneway:string;lanes:number;coordinates:Point[]};
type Building = {id:string;levels:number|null;street:string|null;number:string|null;coordinates:Point[]};
export type MapData = {origin:Point;bounds:number[];roads:Road[];buildings:Building[];contextRoads:Road[];paths:{id:string;highway:string;service:string|null;coordinates:Point[]}[]};
type Segment={a:Point;b:Point;width:number;name:string;oneway:string;length:number;dx:number;dz:number};
const palette=['#d4c7a4','#98a796','#c7ad7f','#bc9986','#c2c4b4','#a5b2b0'];
const fictional=['夜来香 · NIGHT BLOOM','LORONG COFFEE','新月 · NEW MOON','AFTER HOURS','南风 · SOUTH WIND','LUCKY ELEVEN','SILVER SPOON','永安 · EVER PEACE'];
const color=(hex:string)=>new pc.Color().fromString(hex);
export class World {
  app:pc.AppBase;data:MapData; segments:Segment[]=[]; footprints:Point[][]=[];
  bounds:number[]; lamps:pc.Entity[]=[]; emissives:pc.StandardMaterial[]=[];
  sun:pc.Entity; camera:pc.Entity; ground:pc.StandardMaterial;
  private materials=new Map<string,pc.StandardMaterial>();
  private batch=-1;
  reviewSpawns = new Map<string, {p: Point; yaw: number}>();
  constructor(app:pc.AppBase,data:MapData,camera:pc.Entity){
    this.app=app;this.data=data;this.camera=camera;
    const low=project([data.bounds[0],data.bounds[1]],data.origin), high=project([data.bounds[2],data.bounds[3]],data.origin);
    this.bounds=[low[0],high[1],high[0],low[1]];
    this.ground=this.mat('#434948');
    this.box('ground',0,-.14,0,1200,.25,1200,this.mat('#454c43'));
    this.sun=new pc.Entity('Evening light');this.sun.addComponent('light',{type:'directional',color:color('#c0d1e4'),intensity:1.1,castShadows:true,shadowDistance:110,shadowResolution:1024,shadowBias:.15,normalOffsetBias:.04});this.sun.setEulerAngles(43,-25,0);app.root.addChild(this.sun);
    for(const r of data.roads)for(let i=1;i<r.coordinates.length;i++){
      const a=project(r.coordinates[i-1],data.origin) as Point,b=project(r.coordinates[i],data.origin) as Point;
      const len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(len<.1)continue;
      this.segments.push({a,b,width:roadWidth(r),name:r.name,oneway:r.oneway,length:len,dx:(b[0]-a[0])/len,dz:(b[1]-a[1])/len});
    }
  }
  mat(hex:string,glow=0){const key=hex+glow;if(this.materials.has(key))return this.materials.get(key)!;const m=new pc.StandardMaterial();m.diffuse=color(hex);m.useMetalness=true;m.metalness=.04;m.gloss=glow?.45:.2;if(glow){m.emissive=color(hex);m.emissiveIntensity=glow;this.emissives.push(m);}m.update();this.materials.set(key,m);return m;}
  box(name:string,x:number,y:number,z:number,w:number,h:number,d:number,mat:pc.Material,parent?:pc.Entity,angle=0){const e=new pc.Entity(name);e.addComponent('render',{type:'box',material:mat,castShadows:h>.5,receiveShadows:true,batchGroupId:parent?-1:this.batch});e.setLocalPosition(x,y,z);e.setLocalScale(w,h,d);e.setLocalEulerAngles(0,angle,0);(parent??this.app.root).addChild(e);return e;}
  strip(a:Point,b:Point,width:number,y:number,mat:pc.Material){const dx=b[0]-a[0],dz=b[1]-a[1];return this.box('street surface',(a[0]+b[0])/2,y,(a[1]+b[1])/2,width,.045,Math.hypot(dx,dz)+.06,mat,undefined,Math.atan2(dx,dz)*180/Math.PI);}
  mesh(name:string,positions:number[],uvs:number[],indices:number[],mat:pc.Material){const mesh=new pc.Mesh(this.app.graphicsDevice);mesh.setPositions(positions);mesh.setNormals(pc.calculateNormals(positions,indices));mesh.setUvs(0,uvs);mesh.setIndices(indices);mesh.update();const e=new pc.Entity(name);e.addComponent('render',{meshInstances:[new pc.MeshInstance(mesh,mat)],castShadows:true,batchGroupId:this.batch});this.app.root.addChild(e);return e;}
  panel(a:Point,b:Point,base:number,top:number,mat:pc.Material,uv=[0,0,1,1]){const p=[a[0],base,a[1],b[0],base,b[1],b[0],top,b[1],a[0],top,a[1]];return this.mesh('facade',p,[uv[0],uv[3],uv[2],uv[3],uv[2],uv[1],uv[0],uv[1]],[0,1,2,0,2,3],mat);}
  texture(canvas:HTMLCanvasElement){const t=new pc.Texture(this.app.graphicsDevice,{width:canvas.width,height:canvas.height,mipmaps:true,minFilter:pc.FILTER_LINEAR_MIPMAP_LINEAR,magFilter:pc.FILTER_LINEAR,anisotropy:4});t.setSource(canvas);return t;}
  textMaterial(text:string,bg:string,fg:string,glow=.3,aspect=1024/192){
    const canvas=document.createElement('canvas');canvas.width=Math.min(4096,Math.max(128,Math.round(192*aspect)));canvas.height=Math.round(canvas.width/aspect);
    const c=canvas.getContext('2d')!,w=canvas.width,h=canvas.height,pad=h*.065;
    c.fillStyle=bg;c.fillRect(0,0,w,h);c.strokeStyle=fg;c.lineWidth=2;c.strokeRect(pad,pad,w-pad*2,h-pad*2);c.fillStyle=fg;
    const fontSize=h*.58;c.font=`600 ${fontSize}px sans-serif`;const measured=c.measureText(text).width;c.font=`600 ${fontSize*Math.min(1,(w-pad*4)/measured)}px sans-serif`;
    c.textAlign='center';c.textBaseline='middle';c.fillText(text,w/2,h*.52);
    const t=this.texture(canvas),m=new pc.StandardMaterial();m.diffuseMap=t;m.emissiveMap=t;m.emissive=new pc.Color(1,1,1);m.emissiveIntensity=glow;m.cull=pc.CULLFACE_NONE;m.update();return m;
  }
  async build(){
    const batch=this.app.batcher!;const group=batch.addGroup('Street architecture',false,35);this.batch=group.id;
    const asset=new pc.Asset('Shophouse textures','texture',{url:'/shophouse-atlas.png'});this.app.assets.add(asset);
    const atlas=await new Promise<pc.Texture>((resolve,reject)=>{asset.ready(()=>resolve(asset.resource as pc.Texture));asset.on('error',reject);this.app.assets.load(asset);});atlas.anisotropy=4;
    const facade=new pc.StandardMaterial();facade.diffuseMap=atlas;facade.diffuse=new pc.Color(.94,.94,.94);facade.cull=pc.CULLFACE_NONE;facade.gloss=.12;facade.update();
    const heritageAsset=new pc.Asset('Lorong 11 reference-led heritage','texture',{url:'/lorong-11-heritage-atlas.png'});this.app.assets.add(heritageAsset);
    const heritageTexture=await new Promise<pc.Texture>((resolve,reject)=>{heritageAsset.ready(()=>resolve(heritageAsset.resource as pc.Texture));heritageAsset.on('error',reject);this.app.assets.load(heritageAsset);});heritageTexture.anisotropy=4;
    const heritage=new pc.StandardMaterial();heritage.diffuseMap=heritageTexture;heritage.cull=pc.CULLFACE_NONE;heritage.gloss=.12;heritage.update();
    // Texture colour variation and aggregate are generated deterministically at load time.
    const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d')!;const pixels=c.createImageData(512,512);let rng=731;for(let i=0;i<pixels.data.length;i+=4){rng=(Math.imul(rng,1664525)+1013904223)>>>0;const n=67+(rng%28);pixels.data.set([n,n+3,n+4,255],i);}c.putImageData(pixels,0,0);this.ground.diffuse=new pc.Color(.85,.85,.85);this.ground.diffuseMap=this.texture(canvas);this.ground.diffuseMapTiling.set(2,12);this.ground.update();
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
    const signMaterials=fictional.map((text,i)=>this.textMaterial(text,['#254337','#652f2a','#243c4a','#775926'][i%4],['#ecdcb9','#eee0ae','#c8e0d8'][i%3]));
    for(let index=0;index<this.data.buildings.length;index++){
      const b=this.data.buildings[index];let poly=b.coordinates.map(p=>project(p,this.data.origin) as Point);if(poly.length>1&&Math.hypot(poly[0][0]-poly.at(-1)![0],poly[0][1]-poly.at(-1)![1])<.1)poly.pop();if(poly.length<3)continue;
      this.footprints.push(poly);
      if(buildFrogPorridge(this,b.id,poly))continue;
      // Split only the rendered corner. Source outline and collision stay intact.
      const mongkokRemainder=buildMongkokCorner(this,b.id,poly);if(mongkokRemainder)poly=mongkokRemainder;
      if(buildAlleyLowContext(this,b.id,poly))continue;
      if(buildLeongKeeRearContext(this,b.id,poly))continue;
      const centre:Point=[poly.reduce((s,p)=>s+p[0],0)/poly.length,poly.reduce((s,p)=>s+p[1],0)/poly.length];
      const landmark=landmarkFor(b.id);
      let front=0,best=Infinity;
      for(let i=0;i<poly.length;i++){const a=poly[i],c=poly[(i+1)%poly.length],mid:Point=[(a[0]+c[0])/2,(a[1]+c[1])/2];const d=this.nearest(mid).distance;if(d<best && Math.hypot(c[0]-a[0],c[1]-a[1])>3){best=d;front=i;}}
      if(landmark?.frontEdge!==undefined){front=landmark.frontEdge;const a=poly[front],c=poly[(front+1)%poly.length],mid:Point=[(a[0]+c[0])/2,(a[1]+c[1])/2];best=this.nearest(mid).distance;}
      const levels=Math.min(8,b.levels??(b.street==='Lorong 11 Geylang'?2:index%11===0?4:2));const height=landmark?.height??levels*3.35;
      const material=this.mat(landmark?.kind==='hotel'?'#a9c9df':landmark?.kind==='association'?'#e3bdba':landmark?.kind==='agape'?'#c9d9b6':landmark?.kind==='faith-mission'?'#dddcd3':landmark?.kind==='ho-san'?'#deded4':landmark?.kind==='shg'?'#c2d0c4':landmark?.kind==='khek-leow'?'#dedec3':landmark?.kind==='canton-wong'?'#e1e1d8':landmark?.kind==='hainan-goh'?'#b4a9bc':landmark?.kind==='leong-kee'?'#d8c9aa':landmark?.kind==='mosque'?'#ddd6b8':palette[index%palette.length]);material.cull=pc.CULLFACE_NONE;material.update();
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
      const roofPositions=poly.flatMap(p=>[p[0],height+.05,p[1]]),indices=[];for(let k=1;k<poly.length-1;k++)indices.push(0,k,k+1);const roofMat=this.mat('#754c3b');roofMat.cull=pc.CULLFACE_NONE;roofMat.update();this.mesh('roof',roofPositions,poly.flatMap(p=>[p[0]/4,p[1]/4]),indices,roofMat);
      if(landmark){
        const road=landmarkReviewPoint(landmark,mid,this.segments) as Point;
        const review=landmark.reviewOffset ? [road[0]+nx*landmark.reviewOffset,road[1]+nz*landmark.reviewOffset] as Point : road;
        if(!this.reviewSpawns.has(landmark.id)||b.id==='1223250216'||b.id===landmark.reviewBuildingId)this.reviewSpawns.set(landmark.id,{p:review,yaw:Math.atan2(nx,nz)*180/Math.PI});
        if(buildLandmark(this,b.id,{a,dx,dz,nx,nz,width},heritage))continue;
      }
      if(best>27)continue;
      const bays=Math.max(1,Math.round(width/5.5));
      for(let bay=0;bay<bays;bay++){
        const p:Point=[a[0]+dx*width*bay/bays+nx*.025,a[1]+dz*width*bay/bays+nz*.025];const q:Point=[a[0]+dx*width*(bay+1)/bays+nx*.025,a[1]+dz*width*(bay+1)/bays+nz*.025];
        if(levels<=3){const tile=(index+bay)%4;this.panel(p,q,.14,height,facade,[tile/4+.007,.025,(tile+1)/4-.007,.972]);}
        else {for(let floor=1;floor<levels;floor++){const cx=(p[0]+q[0])/2+nx*.07,cz=(p[1]+q[1])/2+nz*.07;this.box('window',cx,floor*3.35+1.5,cz,width/bays*.65,1.6,.14,this.mat(index%2?'#263d43':'#d5ba79',index%2?0:.25),undefined,Math.atan2(nx,nz)*180/Math.PI);}}
        const bw=width/bays,cx=(p[0]+q[0])/2,cz=(p[1]+q[1])/2,angle=Math.atan2(nx,nz)*180/Math.PI;
        this.box('cornice',cx+nx*.12,3.5,cz+nz*.12,bw,.22,.4,this.mat('#c7c3aa'),undefined,angle);
        this.box('roof cornice',cx+nx*.1,height-.15,cz+nz*.1,bw,.25,.5,this.mat('#c7c3aa'),undefined,angle);
        if((index+bay)%3!==0){if(b.street!=='Lorong 11 Geylang')this.panel([p[0]+nx*.1+dx*.2,p[1]+nz*.1+dz*.2],[q[0]+nx*.1-dx*.2,q[1]+nz*.1-dz*.2],2.65,3.35,signMaterials[(index+bay)%signMaterials.length]);
          const awning=this.box('canvas awning',cx+nx*.95,2.57,cz+nz*.95,bw-.1,.12,1.8,this.mat(['#386155','#994d3c','#b29863'][index%3]),undefined,angle);awning.rotateLocal(9,0,0);
          for(const end of [p,q])this.box('five foot way column',end[0]+nx*1.6,1.3,end[1]+nz*1.6,.2,2.6,.2,this.mat('#c7c3aa'));
          this.box('warm shop light',cx+nx*.2,2.3,cz+nz*.2,bw*.65,.09,.12,this.mat('#f8dc96',1.8),undefined,angle);
        }
        if(b.number&&bay===0){const m=this.textMaterial(b.number,'#143e38','#eee8cf',0);this.panel([p[0]+nx*.12+dx*.25,p[1]+nz*.12+dz*.25],[p[0]+nx*.12+dx*.85,p[1]+nz*.12+dz*.85],1.9,2.2,m);}
        if((index+bay)%5===0){this.box('air conditioner',cx+nx*.4,4.05,cz+nz*.4,.85,.52,.5,this.mat('#a5aaa3'),undefined,angle);for(let l=0;l<5;l++)this.box('air vent',cx+nx*.67,3.87+l*.065,cz+nz*.67,.68,.024,.025,this.mat('#596969'),undefined,angle);}
      }
      if(index%13===0)this.planter(mid[0]+nx*1.2,mid[1]+nz*1.2);
    }
    buildShanYuanTang(this);
    buildAlleyExteriors(this);
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
    batch.generate();this.setLight('day');
  }
  nearest(p:Point){let distance=Infinity,segment=this.segments[0],point:Point=[0,0];for(const s of this.segments){const n=nearestOnSegment(p,s.a,s.b);if(n.distance<distance){distance=n.distance;segment=s;point=n.point as Point;}}return{distance,segment,point};}
  canWalk(p:Point){if(p[0]<this.bounds[0]+3||p[0]>this.bounds[2]-3||p[1]<this.bounds[1]+3||p[1]>this.bounds[3]-3)return false;for(const poly of this.footprints){if(pointInPolygon(p,poly))return false;for(let i=0;i<poly.length;i++)if(nearestOnSegment(p,poly[i],poly[(i+1)%poly.length]).distance<.28)return false;}return true;}
  spawn(){const s=this.segments.find(s=>s.name==='Lorong 11 Geylang'&&s.length>30)!;const p:Point=[s.b[0]-s.dx*16+s.dz*2.1,s.b[1]-s.dz*16-s.dx*2.1];return{p,yaw:Math.atan2(-s.dx,-s.dz)*180/Math.PI+180};}
  lamp(x:number,z:number){this.box('lamp post',x,3.9,z,.1,7.8,.1,this.mat('#6c7976'));this.box('lamp arm',x+.75,7.75,z,1.6,.09,.09,this.mat('#6c7976'));this.box('lamp head',x+1.45,7.69,z,.6,.12,.32,this.mat('#ffdfaa',2));if(this.lamps.length<12){const e=new pc.Entity('street light');e.addComponent('light',{type:'omni',color:color('#ffd393'),intensity:.7,range:13,castShadows:false});e.setPosition(x+1.45,6.8,z);this.app.root.addChild(e);this.lamps.push(e);}}
  planter(x:number,z:number){
    const pot=new pc.Entity('terracotta pot');pot.addComponent('render',{type:'cylinder',material:this.mat('#977665'),batchGroupId:this.batch});pot.setPosition(x,.22,z);pot.setLocalScale(.38,.44,.38);this.app.root.addChild(pot);
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
