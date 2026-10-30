// Shared by the Trip Builder and server planner. Companion guide boxes use this same reviewed snapshot.
export type FamilyTripFacts = { id: string; aliases: string[]; name: string; guide: string; reviewed: string; reviewNote: string; facts: string[][]; sources: {label: string; url: string}[]; caution: string };
export const familyTripFacts: FamilyTripFacts[] = [
  {
    "id": "papago-park",
    "aliases": [
      "papago",
      "papago park",
      "hole in the rock"
    ],
    "name": "Papago Park: Hole-in-the-Rock",
    "guide": "https://healthandtravels.com/papago-park-with-kids",
    "reviewed": "2026-09-09",
    "reviewNote": "City trail details checked September 9, 2026. Timing and suitability are planning judgments; current fees were not confirmed.",
    "facts": [
      [
        "Distance",
        "City lists 0.2 miles; it does not specify round trip. Add the return and parking approach."
      ],
      [
        "Terrain",
        "Dirt, steps and uneven rock. Closely supervise children near exposed edges."
      ],
      [
        "Bathrooms",
        "City lists public restrooms by the Visitor Center / Ranger Office Loop; check access on arrival."
      ],
      [
        "Shade",
        "Limited on the approach; do not count on continuous shade."
      ],
      [
        "Stroller / mobility",
        "The stepped rock approach is not stroller suitable. Choose an alternative if anyone needs a smooth, step-free route."
      ],
      [
        "Cost",
        "Current park/parking charge not confirmed in this check. Zoo and other attractions require separate budgeting."
      ],
      [
        "Parking",
        "625 N. Galvin Parkway, east side. Follow signs to the Visitor Center and Hole-in-the-Rock; check gate hours."
      ],
      [
        "Time",
        "Allow 45–90 minutes for the outing as a planning estimate, adjusted to your group."
      ],
      [
        "Choose another outing if",
        "Heat, steps, exposed edges or supervision needs do not suit the group."
      ]
    ],
    "sources": [
      {
        "label": "City trail descriptions and access",
        "url": "https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/papago-park/papago-trails.html"
      }
    ],
    "caution": "A short trail can still be unsuitable in heat or for visitors who need step-free access."
  },
  {
    "id": "wet-beaver-creek",
    "aliases": [
      "wet beaver creek",
      "the crack",
      "bell trail",
      "the crack at wet beaver creek"
    ],
    "name": "The Crack at Wet Beaver Creek",
    "guide": "https://healthandtravels.com/the-crack-wet-beaver-creek-hike",
    "reviewed": "2026-09-09",
    "reviewNote": "Guide reviewed September 9, 2026. Distance and terrain retain the published trail report; the Forest Service page could not be rechecked. Current fees, toilets and access remain unconfirmed.",
    "facts": [
      [
        "Distance",
        "About 7 miles round trip to The Crack via Bell Trail, as described in the published guide."
      ],
      [
        "Terrain",
        "Rocky, uneven and exposed; the return hike is just as long as the approach."
      ],
      [
        "Bathrooms",
        "Current trailhead toilet availability unconfirmed. Do not plan around toilets along the hike."
      ],
      [
        "Shade",
        "Limited along the exposed route; creek vegetation does not shade the whole hike."
      ],
      [
        "Stroller / mobility",
        "Not a stroller or step-free outing. Everyone must manage the rocky return."
      ],
      [
        "Cost",
        "Current pass requirement unconfirmed. The guide's photographed $5 day / $15 week prices are historical, not a current quote."
      ],
      [
        "Parking",
        "Use Bell Trailhead and verify its current access and pass rules. A space is not guaranteed."
      ],
      [
        "Time",
        "Reserve a full hiking day with daylight margin; pace, breaks and conditions determine duration."
      ],
      [
        "Choose another outing if",
        "Anyone cannot comfortably manage the long rocky return, or heat or storms make the canyon unsuitable."
      ]
    ],
    "sources": [
      {
        "label": "Forest Service Bell Trail (recheck before departure)",
        "url": "https://www.fs.usda.gov/r03/coconino/recreation/trails/bell-trail-no-13"
      },
      {
        "label": "Coconino Forest alerts",
        "url": "https://www.fs.usda.gov/r03/coconino/alerts"
      }
    ],
    "caution": "Do not jump or dive from cliffs. Do not treat this as a short roadside swimming stop."
  },
  {
    "id": "estrella-mountain",
    "aliases": [
      "estrella mountain",
      "estrella mountain regional park"
    ],
    "name": "Estrella Mountain Regional Park",
    "guide": "https://healthandtravels.com/estrella-mountain-regional-park-family-guide",
    "reviewed": "2026-10-24",
    "reviewNote": "County alert, trail listing and fees checked October 24, 2026 online. This is not a field inspection; confirm current conditions before travel.",
    "facts": [
      [
        "Distance",
        "Gila is listed as an easy 0.5-mile loop. The reopened one-mile pathway offers another option; choose a shorter out-and-back if needed."
      ],
      [
        "Terrain",
        "Desert trails and a developed pathway. Confirm the current surface and access for your chosen route."
      ],
      [
        "Bathrooms",
        "Current toilet availability and accessibility are not confirmed in the latest alert. Ask staff for the nearest open restroom before starting."
      ],
      [
        "Shade",
        "Desert routes are exposed. Some ramadas have reopened, but ramadas 7, 10 and 11 remain closed; do not rely on trail shade."
      ],
      [
        "Stroller / mobility",
        "The one-mile pathway has reopened. Confirm its current surface and the route from parking with staff before relying on step-free access."
      ],
      [
        "Cost",
        "County lists $10 vehicle entry or $5 hike/bike/equestrian entry. Rentals and other activities may cost extra."
      ],
      [
        "Parking",
        "Loop drive is listed as reopened. Confirm the parking area serving your chosen route; do not enter signed closures."
      ],
      [
        "Time",
        "Allow 30–45 minutes for the short Gila walk with breaks (planning estimate), plus arrival and snacks."
      ],
      [
        "Choose another outing if",
        "Your visit requires a playground, continuous shade or facilities you cannot confirm. For summer, choose a cooler or indoor alternative."
      ]
    ],
    "sources": [
      {
        "label": "County Gila trail distance and rating",
        "url": "https://www.maricopa.gov/6685/Bark-Ranger"
      },
      {
        "label": "Official park trail map",
        "url": "https://www.maricopacountyparks.net/assets/1/6/estrella-8x11.pdf"
      },
      {
        "label": "County current park alert",
        "url": "https://www.maricopacountyparks.net/estrella---temporary-playground-and-ramada-closures/"
      },
      {
        "label": "County current fees",
        "url": "https://www.maricopacountyparks.net/park-locator/estrella-mountain-regional-park/fees/"
      }
    ],
    "caution": "Playground and ramadas 7, 10 and 11 remain closed. Turf area, one-mile pathway and loop drive have reopened. Nature Center is closed Sunday–Tuesday through November 1, 2026."
  }
];
export function getFamilyTripFacts(destination: string): FamilyTripFacts | undefined {
 const key = destination.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
 return familyTripFacts.find(item => [item.id.replace(/-/g, ' '), ...item.aliases].includes(key));
}
export function formatFamilyTripFacts(item: FamilyTripFacts): string {
 return [item.name + ' — At a glance', item.reviewNote, item.caution, ...item.facts.map(([label,value]) => label + ': ' + value), 'Full guide: ' + item.guide, ...item.sources.map(source => source.label + ': ' + source.url)].join('\n');
}


