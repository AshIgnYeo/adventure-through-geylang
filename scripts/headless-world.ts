// Runs the real World and every builder in Node, on PlayCanvas's null graphics device, so the tile index can be
// measured from exactly what the viewer builds. scripts/build-tiles.mjs bundles this file and supplies the DOM shims.
import * as pc from 'playcanvas';
import { World, type MapData, type TileIndex } from '../src/world';
import { withAuthoredFootprints } from '../src/authored-footprints.mjs';
import { builderModule } from '../src/builder-registry';

export type Part = { unit: string; name: string; min: number[]; max: number[]; material: string };

function app() {
  const canvas = { width: 960, height: 540, style: {}, addEventListener() {}, removeEventListener() {}, getBoundingClientRect: () => ({ left: 0, top: 0, width: 960, height: 540 }) } as unknown as HTMLCanvasElement;
  const device = new pc.NullGraphicsDevice(canvas);
  const options = new pc.AppOptions(); options.graphicsDevice = device; options.batchManager = pc.BatchManager;
  options.componentSystems = [pc.RenderComponentSystem, pc.CameraComponentSystem, pc.LightComponentSystem]; options.resourceHandlers = [pc.TextureHandler];
  const application = new pc.AppBase(canvas); application.init(options);
  const camera = new pc.Entity('camera'); camera.addComponent('camera', {}); application.root.addChild(camera);
  return { application, camera, device };
}

const round = (v: number) => Math.round(v * 1e5) / 1e5;
// What a part's material looks like, leaving out culling: a colour's culling is fixed for the whole map (see `culled`).
function materialSignature(m: pc.Material) {
  const s = m as pc.StandardMaterial, c = (x?: pc.Color) => x ? [x.r, x.g, x.b].map(round).join(',') : '';
  return [m.constructor.name, c(s.diffuse), c(s.emissive), round(s.emissiveIntensity ?? 0), round(s.gloss ?? 0), round(s.opacity ?? 1), m.blendType, !!s.diffuseMap, !!s.opacityMap, round(s.alphaTest ?? 0)].join('|');
}

/** Builds the map headlessly. Without an index it runs the full build in map order and records every part. With an
 * index it streams instead, sweeping the walker along `sweep`, so tiles build nearest first and unload behind. */
export async function headlessBuild(raw: unknown, options: { index?: TileIndex; sweep?: [number, number][] } = {}) {
  const { application, camera, device } = app();
  const world = new World(application, withAuthoredFootprints(raw) as MapData, camera, options.index);
  (world as unknown as { loadTexture: () => Promise<pc.Texture> }).loadTexture = async () => new pc.Texture(device, { width: 4, height: 4 });
  const parts: Part[] = []; let builds = 0;
  world.onUnit = (unit, list) => {
    builds++;
    for (const mi of list) {
      const box = mi.aabb, min = box.getMin(), max = box.getMax();
      parts.push({ unit, name: mi.node.name, min: [min.x, min.y, min.z].map(round), max: [max.x, max.y, max.z].map(round), material: materialSignature(mi.material) });
    }
  };
  if (!options.index) await world.build();
  else {
    const sweep = options.sweep ?? [[0, 0]];
    await (world as unknown as { loadModules: (m: string[]) => Promise<void> }).loadModules([...new Set(world.units.map(u => builderModule.get(u)).filter((m): m is string => !!m))]);
    await world.start(sweep[0]);
    // Each call unloads at most one tile left behind, so a few calls per stop let the walker shed what it passed.
    for (const focus of sweep) for (let k = 0; k < 30; k++) world.stream(focus, Infinity);
  }
  const culled = [...world.colourMaterials()].filter(([, m]) => m.cull === pc.CULLFACE_NONE).map(([key]) => key).sort();
  return { world, parts, culled, builds, unitTile: (unit: string) => (world as unknown as { unitTileOf: (u: string) => string | null }).unitTileOf(unit) };
}
