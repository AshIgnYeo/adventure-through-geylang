import { project } from './geo.mjs';

// Explicitly authored, metre-scale estimates, separate from retained OSM ways.
// Relative placement approved by the user on 30 September 2026.
export const shanYuanTang = {
  id: 'shan-yuan-tang', name: 'Shan Yuan Tang / 善緣堂',
  address: '249 Geylang Road', geometrySource: 'authored-estimate',
  origin: [103.877055, 1.312332], rotation: 15.66,
  width: 10.4,
  outline: [[0, 0], [10.4 * 10.6 / 11.8, 0], [10.4, 1.2], [10.4, 25.5], [0, 25.5]],
  height: 8.15,
  evidence: 'June 2024 Geylang Road and April 2024 Lorong 11 Street View show No. 249, the named red gateway, green roofs and cream/red upper elevation. Site placement, outline and dimensions are estimates approved by the user; no temple footprint is present in retained OSM data. The neighbouring mosque is excluded. No surveyed boundary, current condition or private interior is asserted.',
  sources: [
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=7-UfHDndnVbmRSMy3AWU9w&heading=329.41&pitch=8&fov=50',
    'https://www.google.com/maps/@?api=1&map_action=pano&pano=Cyb90czsWHg-VlCqIznp5Q&heading=265&pitch=8&fov=75',
    'https://www.sbfc.org.sg/resources/ck/files/SBFC%20AGM%202025%20%28Book%29.pdf',
  ],
  // Positions in the authored frame, outside the enclosed site.
  reviews: [
    { id: 'shan-yuan-tang', position: [16.5, -10], target: [5.9, 7] },
    { id: 'shan-yuan-tang-side', position: [17.5, 15], target: [6, 15] },
  ],
};

export const authoredLandmarks = [shanYuanTang];

/** u runs towards Lorong 11; v runs inland, parallel to the mosque side. */
export function authoredSiteFrame(site, mapOrigin) {
  const origin = project(site.origin, mapOrigin);
  const angle = site.rotation * Math.PI / 180;
  const c = Math.cos(angle), s = Math.sin(angle);
  const point = ([u, v]) => [origin[0] + c * u - s * v, origin[1] - s * u - c * v];
  return { point, outline: site.outline.map(point) };
}
