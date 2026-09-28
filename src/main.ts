import * as pc from 'playcanvas';
import {World, type MapData, type Point} from './world';
import './style.css';
const el=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const canvas=el<HTMLCanvasElement>('scene');const enter=el<HTMLButtonElement>('enter');
let active=false,paused=false;let yaw=0,pitch=0;let noticeTimer:number;
const keys=new Set<string>();let moveX=0,moveZ=0;
function notice(text:string){el('notice').textContent=text;el('notice').classList.add('visible');clearTimeout(noticeTimer);noticeTimer=window.setTimeout(()=>el('notice').classList.remove('visible'),2800);}
async function start(){
  const device=await pc.createGraphicsDevice(canvas,{deviceTypes:[pc.DEVICETYPE_WEBGL2],antialias:true});
  device.maxPixelRatio=Math.min(window.devicePixelRatio,1.5);
  const options=new pc.AppOptions();options.graphicsDevice=device;options.batchManager=pc.BatchManager;options.componentSystems=[pc.RenderComponentSystem,pc.CameraComponentSystem,pc.LightComponentSystem];options.resourceHandlers=[pc.TextureHandler];
  const app=new pc.AppBase(canvas);app.init(options);app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);app.setCanvasResolution(pc.RESOLUTION_AUTO);
  const camera=new pc.Entity('First person');camera.addComponent('camera',{fov:65,nearClip:.08,farClip:600,clearColor:new pc.Color(.25,.35,.4),toneMapping:pc.TONEMAP_ACES});app.root.addChild(camera);
  const response=await fetch('/map.json');if(!response.ok)throw new Error('Street data could not be loaded');const data=await response.json() as MapData;
  const world=new World(app,data,camera);await world.build();let pos:Point=[0,0];
  function reset(){const spawn=world.spawn();pos=[...spawn.p];yaw=spawn.yaw;pitch=-2;camera.setPosition(pos[0],1.68,pos[1]);camera.setEulerAngles(pitch,yaw,0);}
  reset();app.start();world.update(0);
  el('loading').textContent='LORONG 11 / LORONG 13 · SINGAPORE';enter.disabled=false;enter.innerHTML='Explore the streets <span>↗</span>';
  window.addEventListener('resize',()=>app.resizeCanvas());
  function menu(open:boolean){paused=open;el('settings').hidden=!open;keys.clear();moveX=moveZ=0;if(open&&document.pointerLockElement)document.exitPointerLock();}
  enter.addEventListener('click',()=>{active=true;document.body.classList.add('playing');el('welcome').hidden=true;el('hud').hidden=false;el('crosshair').hidden=false;el('touch-controls').hidden=!matchMedia('(pointer:coarse)').matches;notice(matchMedia('(pointer:coarse)').matches?'Left thumb to walk · Drag right to look':'WASD to walk · Drag to look');});
  el('menu').onclick=()=>menu(!paused);el('close').onclick=()=>menu(false);el('restart').onclick=()=>{reset();menu(false);notice('Back at Lorong 11');};
  el('about').onclick=()=>{menu(true);el('settings').hidden=true;el<HTMLDialogElement>('credits').showModal();};el('credits').addEventListener('close',()=>menu(false));
  el<HTMLSelectElement>('light').onchange=e=>world.setLight((e.target as HTMLSelectElement).value);
  el<HTMLInputElement>('touch-toggle').checked=matchMedia('(pointer:coarse)').matches;
  el<HTMLInputElement>('touch-toggle').onchange=e=>{el('touch-controls').hidden=!(e.target as HTMLInputElement).checked;};
  el<HTMLSelectElement>('quality').onchange=e=>{const q=(e.target as HTMLSelectElement).value;device.maxPixelRatio=q==='high'?Math.min(devicePixelRatio,2):q==='low'?1:Math.min(devicePixelRatio,1.5);world.sun.light!.castShadows=q!=='low';app.resizeCanvas();};
  window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(paused)menu(false);return;}if(!active||paused||e.target instanceof HTMLSelectElement)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys.add(e.code);});window.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',()=>{keys.clear();moveX=moveZ=0;});document.addEventListener('visibilitychange',()=>{keys.clear();moveX=moveZ=0;});
  let looking:number|null=null,lastX=0,lastY=0;
  canvas.addEventListener('pointerdown',e=>{if(!active||paused)return;if(e.pointerType==='touch'&&e.clientX<innerWidth*.38)return;looking=e.pointerId;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!active||paused)return;if(document.pointerLockElement===canvas){yaw-=e.movementX*.13;pitch-=e.movementY*.13;}else if(looking===e.pointerId){yaw-=(e.clientX-lastX)*.18;pitch-=(e.clientY-lastY)*.18;lastX=e.clientX;lastY=e.clientY;}pitch=Math.max(-65,Math.min(65,pitch));});
  const endLook=()=>{looking=null;};canvas.addEventListener('pointerup',endLook);canvas.addEventListener('pointercancel',endLook);
  canvas.addEventListener('dblclick',()=>{if(active&&!paused&&canvas.requestPointerLock)canvas.requestPointerLock()?.catch(()=>{});});
  const stick=el('stick'),knob=el('knob');let joystick:number|null=null;
  function moveStick(e:PointerEvent){if(joystick!==e.pointerId)return;const r=stick.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,z=e.clientY-r.top-r.height/2;const len=Math.max(35,Math.hypot(x,z));moveX=x/len;moveZ=-z/len;knob.style.transform=`translate(${moveX*30}px,${-moveZ*30}px)`;}
  stick.addEventListener('pointerdown',e=>{if(paused)return;joystick=e.pointerId;stick.setPointerCapture(e.pointerId);moveStick(e);});stick.addEventListener('pointermove',moveStick);const endStick=()=>{joystick=null;moveX=moveZ=0;knob.style.transform='';};stick.addEventListener('pointerup',endStick);stick.addEventListener('pointercancel',endStick);
  let lastBoundary=0;
  app.on('update',(elapsed:number)=>{const dt=Math.min(elapsed,.05);world.update(dt);if(!active||paused||document.hidden)return;
    let x=moveX+(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0);let z=moveZ+(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0);const length=Math.max(1,Math.hypot(x,z));x/=length;z/=length;const rad=yaw*Math.PI/180,speed=keys.has('ShiftLeft')?2.5:1.65;
    const dx=(Math.cos(rad)*x-Math.sin(rad)*z)*speed*dt,dz=(-Math.sin(rad)*x-Math.cos(rad)*z)*speed*dt;
    if(world.canWalk([pos[0]+dx,pos[1]]))pos[0]+=dx;
    if(world.canWalk([pos[0],pos[1]+dz]))pos[1]+=dz;
    if((Math.abs(dx)+Math.abs(dz)>.005)&&!world.canWalk([pos[0]+dx,pos[1]+dz])&&Date.now()-lastBoundary>5000){if(pos[0]<world.bounds[0]+5||pos[0]>world.bounds[2]-5||pos[1]<world.bounds[1]+5||pos[1]>world.bounds[3]-5){notice('Edge of this street study · Turn back to explore the lorongs');lastBoundary=Date.now();}}
    camera.setPosition(pos[0],1.68,pos[1]);camera.setEulerAngles(pitch,yaw,0);
  });
}
start().catch(error=>{console.error(error);enter.disabled=true;enter.textContent='Unable to open the street';el('loading').textContent='Please reload in a browser with WebGL 2 support.';notice('The 3D scene could not load. Try reloading or another browser.');});
