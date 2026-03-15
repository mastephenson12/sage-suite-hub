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
}

export const trails: Trail[] = [
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
    image: '/images/humphreys-peak.jpg',
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
    image: '/images/flatiron.jpg',
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
