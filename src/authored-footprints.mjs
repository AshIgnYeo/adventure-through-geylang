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
    evidence: 'Party lines measured on 10 October 2026 from eight April 2024 panoramas rectified at the 0.6 m façade depth solved for Nos. 27–33, each read from the most square-on panorama and checked against its neighbours (about ±0.3–0.5 m). The real row has twelve frontages, including No. 29A, where the source has eleven equal 6.4 m ways. The source front line, rear line and the No. 15 wrap behind Hotel 81 Joy are kept; the party lines move, and the row end moves 0.66 m north to the measured end pier of No. 35 on open ground.',
    replaces: ['1223407884', '1223407885', '1223407886', '1223407883', '1223407882', '1223407881', '1223407880', '1223407879', '1223407878', '1223407877', '1223407876'],
    build(map) {
      const frontStart = sourcePoint(map, '1223407884', 1), frontEnd = sourcePoint(map, '1223407876', 0);
      const rear = sub(sourcePoint(map, '1223407885', 2), sourcePoint(map, '1223407885', 1));
      // The row ends at its measured end pier, 0.66 m past the source end (70.44 m), on open ground.
      const lines = [0, 9.3, 14.5, 19.8, 25.0, 31.0, 37.1, 44.3, 48.3, 54.2, 57.9, 64.2, 71.1];
      const no15 = map.buildings.find(b => b.id === '1223407884').coordinates.map(c => project(c, map.origin));
      const houses = ['15', '17', '19', '21', '23', '25', '27', '29', '29A', '31', '33', '35'].map(number => ({
        id: `l11w-${number.toLowerCase()}`, street: 'Lorong 11 Geylang', number, levels: null,
        // No. 15 keeps its source wrap behind Hotel 81 Joy (source vertices 1–4).
        outline: number === '15' ? ({ f1, rear }) => [f1, no15[1], no15[2], no15[3], no15[4], add(f1, rear)] : undefined,
      }));
      return terrace(map, { frontStart, frontEnd, rear, lines, houses });
    },
  },
  {
    id: 'geylang-253-267', question: 2, approved: '2026-10-10',
    evidence: 'Party lines measured on 10 October 2026 from six June 2024 far-side panoramas rectified on the source street front, where they agree with the façade about 0.5 m behind it. Measured along the front from the Leong Kee corner: 听雨轩 / 新福興 19.7 m, 新福興 / 客来顺 24.9 m, 客来顺 / Instyle 30.15 m, Instyle / Mobile Time 36.0 m and Mobile Time / Shi Hao 41.4 m, against source bays every 4.85 m. The Leong Kee / 听雨轩 line measured 14.1 m and keeps the source 14.52 m, within the measurement spread, so the existing Leong Kee model is unchanged. The Shi Hao corner block was measured from both streets: its Lorong 13 face stands about 2.1 m east of the source east edge, consistent across three Lorong 13 panoramas, with an estimated 1.4 m chamfer at the corner. It keeps the source rear line; a possible rear annex with a blue side door, about 2 m further north, is not drawn.',
    replaces: ['454254211', '454254210', '454254209', '454254208', '454254207', '454254206', '454254205'],
    build(map) {
      const frontStart = sourcePoint(map, '454254211', 3), frontEnd = sourcePoint(map, '454254205', 2);
      const rear = sub(sourcePoint(map, '454254205', 1), frontEnd);
      const lines = [0, 5.18, 10.38, 15.63, 21.48, 26.88, 36.03];
      const depth = Math.hypot(rear[0], rear[1]), back = [rear[0] / depth, rear[1] / depth], chamfer = 1.4;
      const houses = ['255', '257', '259', '261', '263', '267'].map(number => ({
        id: `gr-${number}`, street: 'Geylang Road', number, levels: null,
        outline: number === '267' ? ({ f0, f1, rear: r, e }) => [f0, at(f0, e, lines[6] - lines[5] - chamfer), at(f1, back, chamfer), add(f1, r), add(f0, r)] : undefined,
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
