// Owner-approved re-spacings and authored outlines (open questions settled on 10 October 2026).
// Each group replaces the listed source ways in the rendered and walkable map. The source ways stay
// in map.json and are kept as `replacedBuildings`, so their provenance is never lost.
import { project, unproject } from './geo.mjs';

const ORIGIN = [103.8773, 1.3131];
const at = (a, d, s) => [a[0] + d[0] * s, a[1] + d[1] * s];
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sourcePoint = (map, id, i) => project(map.buildings.find(b => b.id === id).coordinates[i], map.origin);

/**
 * A terrace re-spaced along an unchanged straight front line. `lines` are measured party-line
 * distances from the front start; the rear line keeps the source depth.
 */
function terrace(map, { frontStart, frontEnd, rear, lines, houses }) {
  const len = Math.hypot(frontEnd[0] - frontStart[0], frontEnd[1] - frontStart[1]);
  const e = [(frontEnd[0] - frontStart[0]) / len, (frontEnd[1] - frontStart[1]) / len];
  return houses.map((h, i) => {
    const f0 = at(frontStart, e, lines[i]), f1 = at(frontStart, e, lines[i + 1]);
    const outline = h.outline ? h.outline({ f0, f1, rear, e }) : [f0, f1, add(f1, rear), add(f0, rear)];
    return { ...h, outline };
  });
}

export const authoredFootprintGroups = [
  {
    id: 'lorong-11-west-row', question: 1, approved: '2026-10-10',
    evidence: 'Party lines measured on 10 October 2026 from eight April 2024 panoramas rectified at the 0.6 m façade depth solved for Nos. 27–33, each read from the most square-on panorama and checked against its neighbours (about ±0.3–0.5 m). The real row has twelve frontages, including No. 29A, where the source has eleven equal 6.4 m ways. The source front line, rear line and the No. 15 wrap behind Hotel 81 Joy are kept; only the party lines move.',
    replaces: ['1223407884', '1223407885', '1223407886', '1223407883', '1223407882', '1223407881', '1223407880', '1223407879', '1223407878', '1223407877', '1223407876'],
    build(map) {
      const frontStart = sourcePoint(map, '1223407884', 1), frontEnd = sourcePoint(map, '1223407876', 0);
      const rear = sub(sourcePoint(map, '1223407885', 2), sourcePoint(map, '1223407885', 1));
      const lines = [0, 9.3, 14.5, 19.8, 25.0, 31.0, 37.1, 44.3, 48.3, 54.2, 57.9, 64.2];
      lines.push(Math.hypot(frontEnd[0] - frontStart[0], frontEnd[1] - frontStart[1]));
      const no15 = map.buildings.find(b => b.id === '1223407884').coordinates.map(c => project(c, map.origin));
      const houses = ['15', '17', '19', '21', '23', '25', '27', '29', '29A', '31', '33', '35'].map(number => ({
        id: `l11w-${number.toLowerCase()}`, street: 'Lorong 11 Geylang', number, levels: null,
        // No. 15 keeps its source wrap behind Hotel 81 Joy (source vertices 1–4).
        outline: number === '15' ? ({ f1, rear }) => [f1, no15[1], no15[2], no15[3], no15[4], add(f1, rear)] : undefined,
      }));
      return terrace(map, { frontStart, frontEnd, rear, lines, houses });
    },
  },
];

const ring = (outline, origin) => {
  const c = outline.map(p => unproject(p, origin));
  return [...c, c[0]];
};

/** The map with every approved group applied. Authored buildings carry `geometrySource` and `replaces`. */
export function withAuthoredFootprints(map) {
  const replaced = new Set(authoredFootprintGroups.flatMap(g => g.replaces));
  const authored = authoredFootprintGroups.flatMap(g => g.build(map).map(h => ({
    id: h.id, levels: h.levels, street: h.street, number: h.number, coordinates: ring(h.outline, map.origin ?? ORIGIN),
    geometrySource: 'authored-estimate', group: g.id, replaces: g.replaces,
  })));
  return {
    ...map,
    buildings: [...map.buildings.filter(b => !replaced.has(b.id)), ...authored],
    replacedBuildings: map.buildings.filter(b => replaced.has(b.id)),
  };
}
