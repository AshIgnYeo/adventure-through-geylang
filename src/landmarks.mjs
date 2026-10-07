// Deliberate identity-to-footprint matches. Never assign a real name randomly.
// Reference photographs are not guaranteed to depict the present-day tenancy.
import { nearestOnSegment } from './geo.mjs';
import { leongKeeExterior } from './leong-kee-layout.mjs';
import { mongkok } from './mongkok-layout.mjs';
import { frogPorridge } from './frog-porridge-layout.mjs';
import { amrise } from './amrise-layout.mjs';
import { thyeSeng } from './thye-seng-layout.mjs';
import { buddhistArtCentre } from './buddhist-art-centre-layout.mjs';
import { eatFirst } from './eat-first-layout.mjs';
import { kHotel } from './k-hotel-layout.mjs';
import { sikWaiSin } from './sik-wai-sin-layout.mjs';
import { rrMotor } from './rr-motor-layout.mjs';
import { goldenJade } from './golden-jade-layout.mjs';
import { ktv277 } from './ktv-277-layout.mjs';
import { lamClan } from './lam-clan-layout.mjs';
import { hainanLim } from './hainan-lim-layout.mjs';
import { suiYuanJu } from './sui-yuan-ju-layout.mjs';
import { chongMin } from './chong-min-layout.mjs';
export { authoredLandmarks } from './authored-sites.mjs';
// Partial-block identities deliberately stay out of whole-footprint lookup.
export const partialBlockLandmarks = [mongkok];
export const landmarks = [
  { ...chongMin },
  { ...suiYuanJu },
  { ...hainanLim },
  { ...lamClan },
  { ...ktv277 },
  { ...goldenJade },
  { ...rrMotor },
  { ...sikWaiSin },
  { ...kHotel },
  { ...eatFirst },
  { ...buddhistArtCentre },
  { ...thyeSeng, reviewOffset: 0, reviewBuildingId: '682928762' },
  { ...amrise, reviewOffset: 0, reviewBuildingId: '682928750' },
  { ...frogPorridge, frontEdge: 2, reviewRoad: 'Geylang Road', reviewOffset: 0, reviewBuildingId: '453797927' },
  {
    id: 'haji-mohd-salleh-mosque', buildingIds: ['454254204'], kind: 'mosque',
    name: 'Masjid Haji Mohd Salleh (Geylang)', address: '245 Geylang Road', height: 11.35,
    frontEdge: 2, reviewRoad: 'Geylang Road', reviewOffset: 6,
    evidence: 'MUIS confirms the mosque name, No. 245 address and present building, opened in 1999 after rebuilding. The retained source footprint independently carries the same name, address and mosque use. A licensed December 2020 front photograph and the LearnIslam exterior show the cream-and-green street elevation, central arch, four upper window bays, twin corner towers and central gable. Dimensions and fine ornament are estimated. The official four-storey description and mapped three-level tag are recorded without inventing an unseen floor division; no interior is reconstructed.',
    sources: [
      'https://www.muis.gov.sg/community/mosque/mosque-directory/haji-mohd-salleh--g/',
      'https://learnislam.sg/mosque/haji-mohd-salleh-mosque-geylang/',
      'https://commons.wikimedia.org/wiki/File:Masjid_Haji_Mohd_Salleh.jpg',
      'https://www.openstreetmap.org/way/454254204',
    ],
  },
  {
    id: 'leong-kee', buildingIds: ['454254214', '454254213', '454254212'], kind: 'leong-kee',
    name: 'Leong Kee (Klang) Bak Kut Teh (June 2024 exterior)', address: '251 Geylang Road', height: leongKeeExterior.eaves,
    frontEdge: 2, reviewBuildingId: '454254213', reviewRoad: 'Geylang Road',
    evidence: 'The operator website lists 251 Geylang Road. June 2024 Street View shows the corner coffeeshop and yellow fascias across three visible bays immediately east of Lorong 11, opposite Shan Yuan Tang; Leong Kee appears on the outer boards, while the middle board has different stall wording and is left neutral. The Google Maps place point lies inside middle source footprint 454254213. The three-bay visual assignment is provisional because source ways lack address tags; it does not establish that all three are numbered 251. Exterior reconstruction without asserting ownership, tenancy boundaries or private interior extent. Dimensions and fine ornament are estimated.',
    sources: [
      'https://leongkee.com.sg/',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=x9pb4XARIUjp2Lxgfw5uyg&heading=355&pitch=4&fov=75',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=Cyb90czsWHg-VlCqIznp5Q&heading=90&pitch=8&fov=80',
      'https://eatbook.sg/leong-kee-klang-bak-kut-teh/',
    ],
  },
  {
    id: 'hainan-goh', buildingIds: ['1223250202'], kind: 'hainan-goh',
    name: 'Hainan Goh Clan Association (April 2024 exterior)', address: '20C Lorong 11 Geylang, second storey', height: 7.7,
    evidence: 'SFCCA lists second-storey 20C. April 2024 Street View shows the association upper name and right entrance above/beside a visible No. 20B shop sign, supporting source footprint 1223250202 between Nos. 22 and 20. Association detail is limited to the upper storey and signed entrance; the separate ground-floor shop is neutral. Dimensions estimated. The displaced Maps pin is excluded; current condition and legal extent remain unverified.',
    sources: [
      'https://sfcca.sg/en/our-members/',
      'https://sfcca.sg/en/events/kueh-making-session-2026/',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=80&pitch=12&fov=75',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=83&pitch=0&fov=40',
    ],
  },
  {
    id: 'hotel-81-joy', buildingIds: ['454274491'], kind: 'hotel',
    name: 'Hotel 81 Joy', address: '11 Lorong 11 Geylang', height: 24.5,
    evidence: 'Official operator address and exterior photographs. Height estimated from photographs.',
    sources: ['https://www.wwhotels.com/hotel-81/joy/'],
  },
  {
    id: 'agape-centre', buildingIds: ['1223250213', '1223250216', '1223250217'], kind: 'agape',
    name: 'Agape Centre', address: '8 Lorong 11 Geylang', height: 7.8,
    evidence: 'Official address and three-unit history; URA façade photographs. Three-footprint extent is provisional: URA current and historic numbering differs from OSM.',
    sources: [
      'https://agapesingapore.com/contact/?lang=en',
      'https://agapesingapore.com/agape-full-history/?lang=en',
      'https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00316/',
      'https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00495/',
    ],
  },
  {
    id: 'hok-tek-chi', buildingIds: ['1223407885'], kind: 'association',
    name: 'Hok Tek Chi Loke Yah Teng Association', address: '17 Lorong 11 Geylang', height: 7.8,
    evidence: 'URA exterior photograph and 2026 reporting confirm a pink conserved shophouse. Reconstructed façade, not a freestanding temple.',
    sources: [
      'https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00334/',
      'https://www.zaobao.com.sg/news/singapore/story20260125-8151043',
    ],
  },
  {
    id: 'lok-fu', buildingIds: ['1223250209'], kind: 'eating-house',
    name: 'Lok Fu Lala Pot', address: '38 Lorong 11 Geylang', height: 7.2,
    evidence: 'Address and outdoor seating confirmed by restaurant listing. Exterior, colours, sign design and furniture layout remain illustrative pending street photographs.',
    sources: ['https://www.quandoo.sg/place/lok-fu-lala-pot-106960/about'],
  },
  {
    id: 'faith-mission-home', buildingIds: ['1223250210'], kind: 'faith-mission',
    name: 'Faith Mission Home', address: '12 Lorong 11 Geylang', height: 7.8,
    evidence: 'Official contact address and inspected exterior photograph; named OSM node 11346722109 lies inside the No. 12 footprint. Street frontage reconstructed with estimated dimensions; rear structure omitted. Third-party No. 14A listing remains unresolved and is not assigned.',
    sources: [
      'https://faithmissionhome.sg/contact/',
      'https://faithmissionhome.sg/wp-content/uploads/2025/07/FaithMissionHomeNight.jpg.webp',
      'https://www.openstreetmap.org/node/11346722109',
    ],
  },
  {
    id: 'ho-san-kong-hoey', buildingIds: ['1223250200'], kind: 'ho-san',
    name: 'Ho San Kong Hoey', address: '24/24A Lorong 11 Geylang', height: 7.4,
    evidence: 'SFCCA and SHHK addresses corroborated by inspected April 2024 Google Street View and a mapped place point inside No. 24. Single-frontage reconstruction with estimated dimensions; 24A is an entrance within this frontage, not an additional footprint. Current tenancy and legal boundaries are not asserted.',
    sources: [
      'https://sfcca.sg/en/our-members/',
      'https://www.shhk.com.sg/newsroom/shhk-family-day-2023-hokkien-clans-heritage-hunt/',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=15.18&pitch=4.91&fov=37.5',
    ],
  },
  {
    id: 'shg-engineering', buildingIds: ['1223250208'], kind: 'shg',
    name: 'SHG Engineering / Seng Hup Guan (April 2024 exterior)', address: '36 Lorong 11 Geylang', height: 7.7,
    evidence: 'Operator address and former name corroborated by the Seng Hup Guan mapped point within No. 36 and April 2024 Google Street View. Historical frontage with estimated dimensions; current occupancy unresolved because a third-party directory reports a later Ubi address. No neighbouring unit or private interior assigned.',
    sources: [
      'https://www.pump.com.sg/index_files/contact.htm',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=hHdVXQD79Suo5Y4VlonoNg&heading=76.07&pitch=15&fov=75',
      'https://recordowl.com/company/shg-engineering-pte-ltd',
    ],
  },
  {
    id: 'sm-khek-leow', buildingIds: ['1223250215'], kind: 'khek-leow',
    name: 'S.M. Khek Leow Clan Association', address: '4 Lorong 11 Geylang', height: 7.8,
    evidence: 'SFCCA address corroborated by the mapped association point inside No. 4 and its visible name in April 2024 Google Street View. Single-frontage reconstruction with estimated dimensions and simplified ornament. Current condition and legal extent unverified; neighbouring Agape footprints are excluded.',
    sources: [
      'https://sfcca.sg/en/our-members/',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=ifUFTPmGn1-kOv6waVHktw&heading=70&pitch=15&fov=75',
    ],
  },
  {
    id: 'canton-wong', buildingIds: ['1223407878'], kind: 'canton-wong',
    name: 'Canton Wong Clan Association (April 2024 exterior)', address: '31A Lorong 11 Geylang', height: 7.9,
    evidence: 'SFCCA lists 31A; April 2024 Street View shows the association upper-storey sign and stair entrance beside visible No. 29, supporting the No. 31 source footprint. Association-specific detail is limited to the upper storey and stair entrance; the separate ground-floor shop is neutral. Dimensions estimated. The displaced Maps place point is rejected; current condition and legal extent remain unverified.',
    sources: [
      'https://sfcca.sg/en/our-members/',
      'https://www.szetoclan.sg/wp-content/uploads/2025/02/V14_SFCCA-%E4%BC%9A%E5%91%98%E6%89%8B%E5%86%8C-2024-2027.pdf',
      'https://www.google.com/maps/@?api=1&map_action=pano&pano=QQNp4tBAf9BWzHrMOUczcw&heading=255&pitch=18&fov=60',
    ],
  },
];

export function landmarkFor(buildingId) {
  return landmarks.find(landmark => landmark.buildingIds.includes(buildingId));
}

// Corner buildings can be closer to a side road than the street their signs face.
export function landmarkReviewPoint(place, frontageMidpoint, segments) {
  const candidates = place.reviewRoad ? segments.filter(s => s.name === place.reviewRoad) : segments;
  return candidates.map(s => nearestOnSegment(frontageMidpoint, s.a, s.b)).sort((a, b) => a.distance - b.distance)[0].point;
}
