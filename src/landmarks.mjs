// Deliberate identity-to-footprint matches. Never assign a real name randomly.
// Reference photographs are not guaranteed to depict the present-day tenancy.
export const landmarks = [
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
];

export function landmarkFor(buildingId) {
  return landmarks.find(landmark => landmark.buildingIds.includes(buildingId));
}
