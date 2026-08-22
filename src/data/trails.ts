export interface Trail {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  distance: string;
  elevationGain: string;
  time: string;
  rating: number;
  image?: string;
  description: string;
  intel: string;
  allTrailsUrl?: string;
  allTrailsTrailId?: number;
}

export const trails: Trail[] = [
  {
    id: 'papago-park',
    name: 'Hole-in-the-Rock at Papago Park',
    location: 'Phoenix, AZ',
    difficulty: 'Easy',
    distance: 'About 0.3 miles round trip',
    elevationGain: 'About 30 ft',
    time: '30-60 minutes',
    rating: 4.7,
    image: '/images/papago-hole-in-the-rock-family-trail.avif',
    description: 'A short, exposed desert walk with a memorable rock opening and broad Phoenix views. The mileage is small, but heat, uneven rock, drop-offs, and family energy still decide whether it is a good choice.',
    intel: `
# Plan this stop around your family, not the mileage

Hole-in-the-Rock is a practical Phoenix-area win when everyone wants a clear payoff without a long hike. The best family version is usually one short outdoor anchor, followed by water, food, shade, or a nearby indoor plan.

![Families visible for scale on the Hole-in-the-Rock formation at Papago Park](/images/papago-hole-in-the-rock-trail-sign.avif)

*Original Health & Travels photo from June 30, 2026. The people on the formation show the scale and exposed terrain.*

## Choose the right version

| Your group | Best plan | Turnaround rule |
| --- | --- | --- |
| Toddlers or low energy | View the formation, walk only as far as footing feels comfortable, then return | Turn around at the first climbing, heat, or hand-holding problem |
| Elementary-age kids | Short walk to the opening with an adult close beside each child | Do not let the view turn into unsupervised scrambling |
| Teens or energetic adults | Add a longer Papago walk only when temperature and daylight are forgiving | Keep the easy exit; do not add mileage just because the first stop felt short |
| Mixed ages | Make the opening optional and give non-climbers a clear waiting plan | The least heat-tolerant person sets the schedule |

## Heat and shade check

This is exposed desert terrain. Start around sunrise or choose another day when the forecast removes your safe margin. Rock and pavement continue radiating heat, and a short route is not automatically a safe summer route. Carry water from the vehicle, use sun protection, and leave before anyone develops headache, dizziness, nausea, unusual fatigue, confusion, or poor coordination.

The trailhead sign photographed here also warns that Phoenix mountain trails close to dogs at **100°F and above**. Confirm current City of Phoenix rules and closures before bringing a dog.

![Hole-in-the-Rock trail sign and exposed approach at Papago Park](/images/papago-hole-in-the-rock-trail-sign.avif)

## Parking, bathrooms, food, and backup

- **Parking:** Arrive early and note which lot you used; Papago has several attractions and access points.
- **Bathrooms:** Do not assume a restroom is beside the exact trail start. Use a known facility before the walk and keep a backup stop in the plan.
- **Food:** Bring water and a familiar snack. Save a restaurant decision for after everyone is cool and seated.
- **Backup:** If heat, crowds, or energy make the trail a bad fit, use a photo stop and move to an air-conditioned activity.

![Sunrise over the Papago Park area parking lots](/images/papago-park-sunrise.avif)

## Pairing it with Phoenix Zoo

Phoenix Zoo is nearby and can become the main family anchor, but it is still a large outdoor property. Check current hours, tickets, weather policies, shade options, and attraction availability on the official zoo site. The seasonal hours shown in a photograph are a dated field observation, not today's schedule.

![Phoenix Zoo entrance near Papago Park](/images/phoenix-zoo-entrance.avif)

## A low-stress flow

1. Check the hourly forecast and official park notices.
2. Arrive early, use the bathroom, and fill water before walking.
3. Do Hole-in-the-Rock as the only required outdoor objective.
4. Reassess heat and energy back at the vehicle.
5. Choose food, Phoenix Zoo, Desert Botanical Garden, or an indoor backup only after that reset.

## Read the discovery guide

[Open the complete Papago Park family guide on Health & Travels](https://healthandtravels.com/papago-park-with-kids) for original photos, firsthand arrival notes, safety guidance, and ideas for building the rest of the day.

## Verify before leaving

- [City of Phoenix Papago Park trails](https://www.phoenix.gov/administration/departments/parks/activities-facilities/trails/papago-park/papago-trails.html)
- [Phoenix Zoo visitor information](https://www.phoenixzoo.org/visit/)
    `
  },
  {
    id: 'devils-bridge',
    name: "Devil's Bridge",
    location: 'Sedona, AZ',
    difficulty: 'Moderate',
    distance: '4.2 miles',
    elevationGain: '564 ft',
    time: '2-3 hours',
    rating: 4.8,
    image: '/images/devils-bridge.avif',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/arizona/devils-bridge-trail',
    allTrailsTrailId: 10031989,
    description: 'The largest natural sandstone arch in the Sedona area. A must-see for any explorer visiting the Red Rock Country.',
    intel: `
# Devil's Bridge Intel Report

Devil's Bridge is one of the most iconic natural formations in Sedona. While the hike is relatively short, the final ascent to the bridge requires some minor rock scrambling.

## Strategic Approach:
- **Timing**: Arrive at the trailhead before 7:00 AM. The parking lot fills up instantly, and the "photo queue" on the bridge can exceed 60 minutes by mid-morning.
- **Access**: If you don't have a high-clearance 4WD vehicle, park at the Dry Creek Vista Trailhead and hike the Chuckwagon Trail to the bridge.

## Wellness Protocol:
The energy at the bridge is intense. Spend 5 minutes at the base of the arch before climbing up. The sandstone here is rich in iron, providing a unique grounding experience.
    `
  },
  {
    id: 'camelback-mountain',
    name: 'Camelback Mountain',
    location: 'Phoenix, AZ',
    difficulty: 'Hard',
    distance: '2.5 miles',
    elevationGain: '1,420 ft',
    time: '2-4 hours',
    rating: 4.7,
    image: '/images/camelback-mountain.avif',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/arizona/camelback-mountain-via-echo-canyon-trail',
    allTrailsTrailId: 10027407,
    description: 'A challenging climb to the highest point in Phoenix. Offers 360-degree views of the Valley of the Sun.',
    intel: `
# Camelback Mountain Intel Report

This is not a casual stroll. Camelback is a steep, rocky climb that requires both hands in several sections.

## Strategic Approach:
- **Hydration**: This is the #1 site for rescues in Phoenix. Carry at least 2 liters of water, even in winter.
- **Echo Canyon vs Cholla**: Echo Canyon is steeper and more "scrambly," while Cholla is longer but slightly more gradual until the very end.

## Wellness Protocol:
The summit is a perfect place for "horizon scanning"—a technique used to reduce cortisol by focusing on the furthest visible point for 2 minutes.
    `
  },
  {
    id: 'humphreys-peak',
    name: 'Humphreys Peak',
    location: 'Flagstaff, AZ',
    difficulty: 'Extreme',
    distance: '10.7 miles',
    elevationGain: '3,391 ft',
    time: '6-8 hours',
    rating: 4.9,
    image: '/images/humphreys-peak.avif',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/arizona/humphreys-peak',
    allTrailsTrailId: 10028575,
    description: 'The highest point in Arizona. An alpine adventure that takes you above the tree line into a different world.',
    intel: `
# Humphreys Peak Intel Report

Humphreys is a serious mountain. You will be hiking at altitudes where oxygen is significantly thinner.

## Strategic Approach:
- **Weather**: Storms move in fast. If you see clouds building by noon, turn back. Lightning above the tree line is a lethal threat.
- **Acclimatization**: If you're coming from the valley, spend a night in Flagstaff before attempting the summit.

## Wellness Protocol:
The alpine tundra at the top is one of the few places in the Southwest where you can experience true "silence." Practice 10 minutes of silent meditation at the summit.
    `
  },
  {
    id: 'flatiron',
    name: 'The Flatiron',
    location: 'Apache Junction, AZ',
    difficulty: 'Extreme',
    distance: '6.2 miles',
    elevationGain: '2,900 ft',
    time: '4-6 hours',
    rating: 4.9,
    image: '/images/flatiron.avif',
    allTrailsUrl: 'https://www.alltrails.com/trail/us/arizona/flatiron-via-siphon-draw-trail',
    allTrailsTrailId: 10244443,
    description: 'A legendary climb in the Superstition Mountains. A sheer rock face that rewards you with the best views in the state.',
    intel: `
# Flatiron Intel Report

The Flatiron is more of a "climb" than a "hike." You will be ascending Siphon Draw, which is a steep, rocky drainage.

## Strategic Approach:
- **Footwear**: High-traction boots are mandatory. The smooth rock in Siphon Draw can be incredibly slippery when dusty.
- **Navigation**: It's easy to lose the "trail" in the boulder field. Look for the white spray-painted arrows, but rely on your GPS.

## Wellness Protocol:
The Superstitions are steeped in legend. Use the ascent as a "moving meditation," focusing entirely on the placement of each foot and hand.
    `
  }
];
