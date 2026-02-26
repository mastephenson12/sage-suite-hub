export interface Trail {
  id: string;
  name: string;
  location: string;
  rating: number;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Expert';
  distance: string;
  elevationGain: string;
  image: string;
  description: string;
  intel: string;
}

export const trails: Trail[] = [
  {
    id: 'devils-bridge',
    name: 'Devil\'s Bridge',
    location: 'Sedona, AZ',
    rating: 4.8,
    time: '2.5h',
    difficulty: 'Moderate',
    distance: '4.2 miles',
    elevationGain: '564 ft',
    image: 'https://images.unsplash.com/photo-1505245208761-ba872912fac0?auto=format&fit=crop&w=1200&q=80',
    description: 'The largest natural sandstone arch in the Sedona area. A must-see for any explorer visiting the Red Rock Country.',
    intel: `
# Devil's Bridge Intel Report

Devil's Bridge is one of Sedona's most iconic landmarks. It's a natural sandstone arch that offers breathtaking views of the surrounding red rock canyons.

## Tactical Overview
- **Trailhead**: Dry Creek Road or Mescal Trailhead.
- **Terrain**: Mostly flat until the final ascent to the bridge, which involves some steep natural rock stairs.
- **Crowd Alert**: This is a high-traffic trail. Expect queues for photos on the bridge during peak hours (10 AM - 4 PM).

## Scout Recommendations
1. **Timing**: Arrive at the trailhead before 6:30 AM to beat the crowds and catch the sunrise light hitting the arch.
2. **Parking**: The Dry Creek parking lot fills up fast. Consider using the Sedona Shuttle if visiting on weekends.
3. **Footwear**: While the trail is moderate, the final climb is slippery. Wear shoes with aggressive tread.
4. **Photography**: The best angle for the bridge is from the far side looking back towards the canyon.
    `
  },
  {
    id: 'camelback-mountain',
    name: 'Camelback Mountain',
    location: 'Phoenix, AZ',
    rating: 4.9,
    time: '3h',
    difficulty: 'Hard',
    distance: '2.5 miles',
    elevationGain: '1,420 ft',
    image: 'https://images.unsplash.com/photo-1523975335753-30474ac996aa?auto=format&fit=crop&w=1200&q=80',
    description: 'A challenging summit hike in the heart of Phoenix. Offers 360-degree views of the Valley of the Sun.',
    intel: `
# Camelback Mountain Intel Report

Camelback Mountain is the crown jewel of Phoenix hiking. It features two primary trails: Echo Canyon and Cholla. Both are extremely demanding.

## Tactical Overview
- **Echo Canyon**: Steeper, more technical, involves significant rock scrambling and use of handrails.
- **Cholla**: Longer but slightly less steep, though still very challenging with a narrow ridge near the summit.
- **Elevation**: You are climbing over 1,400 feet in just over a mile.

## Scout Recommendations
1. **Hydration**: This is a "dry" mountain. There is no water on the trail. Bring at least 2 liters per person.
2. **Heat Management**: Do not attempt this hike if the temperature is above 90°F. The rock radiates heat, making it feel 10-15 degrees hotter.
3. **Scrambling**: Use your hands. There are sections where you will need three points of contact for safety.
4. **Parking**: Parking is strictly enforced. Use the designated lots and do not park in residential areas.
    `
  },
  {
    id: 'humphreys-peak',
    name: 'Humphreys Peak',
    location: 'Flagstaff, AZ',
    rating: 4.7,
    time: '8h',
    difficulty: 'Expert',
    distance: '10.7 miles',
    elevationGain: '3,395 ft',
    image: 'https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&w=1200&q=80',
    description: 'The highest point in Arizona. An alpine expedition that takes you through diverse life zones to the 12,633-foot summit.',
    intel: `
# Humphreys Peak Intel Report

Humphreys Peak is the highest point in the San Francisco Peaks and the entire state of Arizona. It is a serious alpine undertaking.

## Tactical Overview
- **Trailhead**: Arizona Snowbowl.
- **Environment**: You will pass through Ponderosa Pine, Aspen, and eventually Alpine Tundra above the treeline.
- **Weather**: Conditions can change in minutes. Lightning is a lethal threat above the treeline.

## Scout Recommendations
1. **The Treeline Rule**: If you see clouds building, turn back. You do not want to be on the ridge during a storm.
2. **Altitude**: Be aware of Acute Mountain Sickness (AMS). If you feel dizzy or nauseous, descend immediately.
3. **Wind**: The saddle and ridge are notoriously windy. Bring a high-quality windshell even in mid-summer.
4. **False Summits**: There are three false summits before the true peak. Stay mentally prepared.
    `
  },
  {
    id: 'flatiron-siphon-draw',
    name: 'Flatiron via Siphon Draw',
    location: 'Apache Junction, AZ',
    rating: 4.9,
    time: '5h',
    difficulty: 'Hard',
    distance: '6.2 miles',
    elevationGain: '2,782 ft',
    image: 'https://images.unsplash.com/photo-1597167237494-21139050cd55?auto=format&fit=crop&w=1200&q=80',
    description: 'A rugged, vertical ascent in the Superstition Mountains. Not a formal trail, but a legendary desert scramble.',
    intel: `
# Flatiron Intel Report

The Flatiron is a massive rock formation in the Superstition Wilderness. The route via Siphon Draw is one of the most rewarding scrambles in the Southwest.

## Tactical Overview
- **Trailhead**: Lost Dutchman State Park.
- **The Basin**: The first 2 miles are a standard trail. After the basin, the "trail" becomes a vertical scramble up a boulder-filled canyon.
- **Navigation**: Follow the white paint markers and the most worn paths. It's easy to get "cliffed out" if you stray too far.

## Scout Recommendations
1. **Gloves**: Lightweight climbing or work gloves are highly recommended for the boulder scrambling sections.
2. **Leg Strength**: This hike is a "stairmaster from hell." Ensure your knees and quads are ready for the descent.
3. **The Summit**: The actual Flatiron is a flat plateau. Explore the edges for incredible views of the Phoenix valley.
4. **Wildlife**: Watch for rattlesnakes in the lower basin and Gila monsters in the rocky sections.
    `
  }
];
