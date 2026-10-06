import * as pc from 'playcanvas';
import {World, type MapData, type Point} from './world';
import './style.css';
const el=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const canvas=el<HTMLCanvasElement>('scene');const enter=el<HTMLButtonElement>('enter');
let active=false,paused=false;let yaw=0,pitch=0;let noticeTimer:number;
const keys=new Set<string>();let moveX=0,moveZ=0,walkSpeed=3.3;
let lookMode:'mouse'|'keyboard'='mouse';
function notice(text:string){el('notice').textContent=text;el('notice').classList.add('visible');clearTimeout(noticeTimer);noticeTimer=window.setTimeout(()=>el('notice').classList.remove('visible'),2800);}
async function start(){
  const device=await pc.createGraphicsDevice(canvas,{deviceTypes:[pc.DEVICETYPE_WEBGL2],antialias:true});
  device.maxPixelRatio=Math.min(window.devicePixelRatio,1.5);
  const options=new pc.AppOptions();options.graphicsDevice=device;options.batchManager=pc.BatchManager;options.componentSystems=[pc.RenderComponentSystem,pc.CameraComponentSystem,pc.LightComponentSystem];options.resourceHandlers=[pc.TextureHandler];
  const app=new pc.AppBase(canvas);app.init(options);app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);app.setCanvasResolution(pc.RESOLUTION_AUTO);
  const camera=new pc.Entity('First person');camera.addComponent('camera',{fov:65,nearClip:.08,farClip:600,clearColor:new pc.Color(.25,.35,.4),toneMapping:pc.TONEMAP_ACES});app.root.addChild(camera);
  const response=await fetch('/map.json');if(!response.ok)throw new Error('Street data could not be loaded');const data=await response.json() as MapData;
  const world=new World(app,data,camera);await world.build();let pos:Point=[0,0];
  function reset(){const review=new URLSearchParams(location.search).get('review');const spawn:{p:Point;yaw:number;pitch?:number}=(review&&world.reviewSpawns.get(review))||world.spawn();pos=[...spawn.p];yaw=spawn.yaw;pitch=spawn.pitch??(review?9:-2);camera.setPosition(pos[0],1.68,pos[1]);camera.setEulerAngles(pitch,yaw,0);}
  reset();app.start();
  el('loading').textContent='LORONG 11 · REFERENCE-LED STUDY';enter.disabled=false;enter.innerHTML='Explore the streets <span>↗</span>';
  window.addEventListener('resize',()=>app.resizeCanvas());
  function resetInput(){keys.clear();moveX=moveZ=0;}
  function controlText(){return lookMode==='keyboard'?'WASD to walk · Arrow keys to look':'WASD to walk · Mouse to look · Esc for menu';}
  function captureMouse(){if(active&&!paused&&lookMode==='mouse'&&canvas.requestPointerLock)canvas.requestPointerLock().catch(()=>notice('Click the street to capture the mouse'));}
  function menu(open:boolean){paused=open;el('settings').hidden=!open;resetInput();if(open&&document.pointerLockElement===canvas)document.exitPointerLock();}
  document.addEventListener('pointerlockchange',()=>{if(active&&!paused&&lookMode==='mouse'&&document.pointerLockElement!==canvas)menu(true);});
  enter.addEventListener('click',()=>{active=true;document.body.classList.add('playing');el('welcome').hidden=true;el('hud').hidden=false;el('crosshair').hidden=false;const touch=matchMedia('(pointer:coarse)').matches;el('touch-controls').hidden=!touch;notice(touch?'Left thumb to walk · Drag right to look':controlText());if(!touch)captureMouse();});
  el('menu').onclick=()=>menu(!paused);el('close').onclick=()=>menu(false);el('restart').onclick=()=>{reset();menu(false);notice('Back at Lorong 11');};
  el('about').onclick=()=>{menu(true);el('settings').hidden=true;el<HTMLDialogElement>('credits').showModal();};el('credits').addEventListener('close',()=>menu(false));
  el<HTMLSelectElement>('light').onchange=e=>world.setLight((e.target as HTMLSelectElement).value);
  el<HTMLInputElement>('touch-toggle').checked=matchMedia('(pointer:coarse)').matches;
  el<HTMLInputElement>('touch-toggle').onchange=e=>{el('touch-controls').hidden=!(e.target as HTMLInputElement).checked;};
  const lookSelect=el<HTMLSelectElement>('look-mode'),help=el('control-help');
  lookSelect.onchange=()=>{lookMode=lookSelect.value as 'mouse'|'keyboard';resetInput();if(document.pointerLockElement===canvas)document.exitPointerLock();help.textContent=lookMode==='keyboard'?'Walk with WASD. Use the arrow keys to look around.':'Click the street once, then use the mouse to look and WASD to walk. Press Escape for the menu.';notice(controlText());};
  const speedInput=el<HTMLInputElement>('walk-speed'),speedValue=el<HTMLOutputElement>('speed-value');
  speedInput.oninput=()=>{walkSpeed=Number(speedInput.value);speedValue.value=`${walkSpeed.toFixed(1)} m/s`;};
  el<HTMLSelectElement>('quality').onchange=e=>{const q=(e.target as HTMLSelectElement).value;device.maxPixelRatio=q==='high'?Math.min(devicePixelRatio,2):q==='low'?1:Math.min(devicePixelRatio,1.5);world.sun.light!.castShadows=q!=='low';app.resizeCanvas();};
  window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(active)menu(!paused);return;}if(!active||paused||e.target instanceof HTMLSelectElement)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys.add(e.code);});window.addEventListener('keyup',e=>keys.delete(e.code));
  window.addEventListener('blur',resetInput);document.addEventListener('visibilitychange',resetInput);
  let looking:number|null=null,lastX=0,lastY=0;
  canvas.addEventListener('pointerdown',e=>{if(!active||paused)return;if(e.pointerType!=='touch'){captureMouse();return;}if(e.clientX<innerWidth*.38)return;looking=e.pointerId;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!active||paused)return;if(e.pointerType!=='touch'&&lookMode==='mouse'&&document.pointerLockElement===canvas){
    yaw-=e.movementX*.13;pitch-=e.movementY*.13;
  }else if(e.pointerType==='touch'&&looking===e.pointerId){yaw-=(e.clientX-lastX)*.18;pitch-=(e.clientY-lastY)*.18;lastX=e.clientX;lastY=e.clientY;}pitch=Math.max(-65,Math.min(65,pitch));});
  const endLook=()=>{looking=null;};canvas.addEventListener('pointerup',endLook);canvas.addEventListener('pointercancel',endLook);
  const stick=el('stick'),knob=el('knob');let joystick:number|null=null;
  function moveStick(e:PointerEvent){if(joystick!==e.pointerId)return;const r=stick.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,z=e.clientY-r.top-r.height/2;const len=Math.max(35,Math.hypot(x,z));moveX=x/len;moveZ=-z/len;knob.style.transform=`translate(${moveX*30}px,${-moveZ*30}px)`;}
  stick.addEventListener('pointerdown',e=>{if(paused)return;joystick=e.pointerId;stick.setPointerCapture(e.pointerId);moveStick(e);});stick.addEventListener('pointermove',moveStick);const endStick=()=>{joystick=null;moveX=moveZ=0;knob.style.transform='';};stick.addEventListener('pointerup',endStick);stick.addEventListener('pointercancel',endStick);
  let lastBoundary=0;
  app.on('update',(elapsed:number)=>{const dt=Math.min(elapsed,.05);if(!active||paused||document.hidden)return;
    if(lookMode==='keyboard'){
      yaw+=((keys.has('ArrowLeft')?1:0)-(keys.has('ArrowRight')?1:0))*72*dt;
      pitch+=((keys.has('ArrowUp')?1:0)-(keys.has('ArrowDown')?1:0))*48*dt;
    }
    pitch=Math.max(-65,Math.min(65,pitch));
    let x=moveX+(keys.has('KeyD')?1:0)-(keys.has('KeyA')?1:0);let z=moveZ+(keys.has('KeyW')?1:0)-(keys.has('KeyS')?1:0);const length=Math.max(1,Math.hypot(x,z));x/=length;z/=length;const rad=yaw*Math.PI/180;
    const dx=(Math.cos(rad)*x-Math.sin(rad)*z)*walkSpeed*dt,dz=(-Math.sin(rad)*x-Math.cos(rad)*z)*walkSpeed*dt;
    if(world.canWalk([pos[0]+dx,pos[1]]))pos[0]+=dx;
    if(world.canWalk([pos[0],pos[1]+dz]))pos[1]+=dz;
    if((Math.abs(dx)+Math.abs(dz)>.005)&&!world.canWalk([pos[0]+dx,pos[1]+dz])&&Date.now()-lastBoundary>5000){if(pos[0]<world.bounds[0]+5||pos[0]>world.bounds[2]-5||pos[1]<world.bounds[1]+5||pos[1]>world.bounds[3]-5){notice('Edge of this street study · Turn back to explore the lorongs');lastBoundary=Date.now();}}
    camera.setPosition(pos[0],1.68,pos[1]);camera.setEulerAngles(pitch,yaw,0);
  });
}
start().catch(error=>{console.error(error);enter.disabled=true;enter.textContent='Unable to open the street';el('loading').textContent='Please reload in a browser with WebGL 2 support.';notice('The 3D scene could not load. Try reloading or another browser.');});
