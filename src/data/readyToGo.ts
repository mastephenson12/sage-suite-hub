export type ReadyToGoCard = {
  id: string;
  title: string;
  reviewed: string;
  summary: string;
  facts: [string, string][];
  links: { label: string; url: string }[];
  checklist: string[];
  backup: string;
  backupUrl: string;
  reminder: string;
};

export const papagoReadyToGo: ReadyToGoCard = {
  id: 'papago-park',
  title: 'Papago Park: Ready to Go',
  reviewed: 'November 15, 2026',
  summary: 'One short outdoor stop, a snack and permission to finish early. Allow 45–90 minutes as a planning estimate; adjust to your group.',
  facts: [
    ['Park & arrive', 'Use the east-side entrance at 625 N. Galvin Parkway, Phoenix, AZ 85008. Follow signs toward the Visitor Center and Hole-in-the-Rock and use signed park parking. Check the map pin and posted gate signs; the zoo lot is a different destination.'],
    ['Walk & turnaround', 'The city lists Hole-in-the-Rock at 0.2 miles without specifying round trip. Include your return and parking approach. Expect dirt, steps, uneven rock and exposed edges. Reassess before the steps; turn back if footing, heat or confidence does not suit everyone.'],
    ['Bathrooms & shade', 'The city documents public restrooms by the Visitor Center / Ranger Office Loop. Check they are open before starting. The approach has limited shade; do not count on shade or water refills.'],
    ['Strollers & easier walking', 'Hole-in-the-Rock is not a stroller or step-free route. The city lists a 0.6-mile paved Ranger Office Loop along the roadway; check suitability and watch for vehicles. Pavement does not guarantee accessibility or shade.'],
    ['Hours & cost', 'The city lists east-side park / trailhead access as 5 a.m.–7 p.m. Later trail hours do not keep parking gates open. Confirm current hours, closures and any park or parking charges; fees were not confirmed. Paid attractions are separate.'],
    ['Food & finish', 'Bring familiar snacks and water. After the walk, pause, eat and reassess energy. A snack and heading home can be the whole plan.'],
  ],
  links: [
    { label: 'Trailhead map search — compare with city map', url: 'https://www.google.com/maps/search/?api=1&query=Hole-in-the-Rock+Trailhead+Papago+Park+Phoenix+AZ' },
    { label: 'Official park hours, access & trail notices', url: 'https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/papago-park.html' },
    { label: 'Official park map — parking & facilities', url: 'https://www.phoenix.gov/content/dam/phoenix/parkssite/documents/pks_nrd/papagodetailed.pdf' },
    { label: 'National Weather Service forecast & alerts', url: 'https://forecast.weather.gov/MapClick.php?lat=33.459&lon=-111.949' },
    { label: 'Arizona 511 road conditions', url: 'https://www.az511.gov/' },
  ],
  checklist: [
    'Check the hourly forecast, official notices, gate hours and route before leaving.',
    'Pack water for everyone plus extra for delays; do not rely on a refill.',
    'Pack snacks, hats, sunscreen and layers for the forecast.',
    'Bring first aid, personal medicines, a charged phone, backup power and a light.',
    'Save the area / route in your maps app and note where you parked.',
    'Tell a trusted person the route and expected return; agree on a turnaround time.',
    'Use the restroom on arrival and keep children beside an adult near steps and edges.',
  ],
  backup: 'Arizona Science Center, 600 E. Washington Street, downtown Phoenix: an indoor alternative requiring a separate drive and admission budget. Check opening hours, tickets and parking before committing; it normally closes Mondays. If no option fits, end the outing. Travel only when the route is safe.',
  backupUrl: 'https://www.azscience.org/visit/plan-your-visit',
  reminder: 'A planning snapshot, not live conditions or a navigation map. Choose another plan when heat, storms, closures or your group make the walk unsuitable. For an emergency, call 911.',
};

export function escapeCardHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));
}

// Self-contained: no fonts, scripts, images or network requests are required to read it.
export function buildReadyToGoDocument(card: ReadyToGoCard, checked: boolean[] = []): string {
  const e = escapeCardHtml;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(card.title)}</title><style>
  *{box-sizing:border-box}body{margin:0 auto;max-width:850px;padding:24px;color:#183c37;background:#fff;font:16px/1.5 system-ui,sans-serif}h1{font-size:2rem;line-height:1.15}h2{font-size:1.1rem;margin:24px 0 8px}dt{font-weight:700;margin-top:14px}dd{margin:3px 0 0}a{color:#00695c;overflow-wrap:anywhere}li{margin:8px 0}.note{border-left:4px solid #00695c;padding:12px;background:#eff8f4}.check{display:block;margin:10px 0}.check input{width:18px;height:18px;vertical-align:middle}.url{display:block;font-size:.8rem}footer{font-size:.85rem;border-top:1px solid #aaa;margin-top:20px;padding-top:10px}@media print{body{font-size:10pt;padding:0;max-width:none}h1{font-size:22pt}h2{break-after:avoid}dt{break-after:avoid}dd,li,.check{break-inside:avoid}.url{font-size:8pt}.note{background:white}}
  </style></head><body><p>Health &amp; Travels · Sage</p><h1>${e(card.title)}</h1><p>${e(card.summary)}</p><p class="note">${e(card.reminder)}</p><dl>${card.facts.map(([label, value]) => `<dt>${e(label)}</dt><dd>${e(value)}</dd>`).join('')}</dl><h2>Check before leaving — internet needed for links</h2><ul>${card.links.map(link => `<li><a href="${e(link.url)}">${e(link.label)}</a><span class="url">${e(link.url)}</span></li>`).join('')}</ul><h2>Pack &amp; prepare</h2>${card.checklist.map((item, index) => `<label class="check"><input type="checkbox"${checked[index] ? ' checked' : ''}> ${e(item)}</label>`).join('')}<h2>Plan B: an indoor reset</h2><p>${e(card.backup)}</p><p><a href="${e(card.backupUrl)}">Official backup visit details</a><span class="url">${e(card.backupUrl)}</span></p><footer>Sources checked online ${e(card.reviewed)}. No new field visit. Timing and family fit are planning judgments; facilities and fees are not confirmed for your visit. This card contains the reviewed outing basics, not your full personalized Sage itinerary. Save that itinerary separately.<br>Full guide: https://healthandtravels.com/papago-park-with-kids<br>Download the area in your maps app separately; this file does not contain offline maps. Checkmarks reflect your selections when exported.</footer></body></html>`;
}
