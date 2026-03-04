export interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  image?: string;
}

export const articles: Article[] = [
  {
    id: 'sedona-vortex-protocol',
    title: 'The Sedona Vortex Protocol',
    date: 'Feb 12, 2026',
    category: 'Wellness',
    content: `
# The Sedona Vortex Protocol

Sedona is world-renowned for its "vortexes"—specific locations where the earth's energy is said to be exceptionally high. For the modern explorer, these sites offer more than just spiritual intrigue; they are perfect hubs for advanced wellness protocols.

## The Science of Stillness
While the term "vortex" is metaphysical, the physiological effects of these locations are measurable. The combination of high iron content in the red rocks and the specific electromagnetic properties of the area can induce a state of deep relaxation and heightened awareness.

## Protocol Steps:
1. **Hydration Phase**: Begin with 16oz of electrolyte-rich water. Desert air is deceptive; you are losing moisture even when you don't feel sweat.
2. **The Ascent**: Choose a vortex site like Cathedral Rock or Airport Mesa. The physical exertion of the climb prepares the nervous system for the subsequent "down-regulation."
3. **Grounding**: Once at the summit, remove footwear. Direct contact with the sandstone allows for electron transfer, reducing systemic inflammation.
4. **Breathwork**: Perform 4-7-8 breathing for 10 minutes. Inhale for 4, hold for 7, exhale for 8.

## Recommended Sites:
- **Cathedral Rock**: Best for "upward" energy and creative clarity.
- **Boynton Canyon**: Known for "balanced" energy, ideal for emotional regulation.
    `,
    image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80&auto=format&fit=crop&v=1'
  },
  {
    id: 'flagstaff-winter-survival',
    title: 'Flagstaff Winter Survival Guide',
    date: 'Jan 28, 2026',
    category: 'Expedition',
    content: `
# Flagstaff Winter Survival Guide

Flagstaff sits at 7,000 feet, making it a true alpine environment in the heart of Arizona. Winter expeditions here require a different set of intelligence than the desert floor.

## The Rule of Three
In survival situations, you can last 3 minutes without air, 3 hours without shelter in extreme cold, 3 days without water, and 3 weeks without food. In Flagstaff's winter, the "3 hours" rule is your primary concern.

## Essential Intel:
- **Layering**: Use the Base-Mid-Shell system. Avoid cotton at all costs—it absorbs moisture and kills. Synthetic or Merino wool is mandatory.
- **Sun Protection**: Snow reflects up to 80% of UV radiation. High-altitude sun is 25% more intense than at sea level.
- **Navigation**: Trails can disappear under 4 feet of powder in hours. Always carry a physical compass and topo map as backup to GPS.

## Gear Checklist:
- 4-season tent with snow stakes.
- MSR WhisperLite or similar liquid fuel stove (canisters fail in sub-zero temps).
- Emergency bivy sack.
    `,
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=800&q=80&auto=format&fit=crop&v=1'
  },
  {
    id: 'superstition-hidden-springs',
    title: 'Superstition Mountain Hidden Springs',
    date: 'Jan 15, 2026',
    category: 'Trails',
    content: `
# Superstition Mountain Hidden Springs

The Superstition Wilderness is a rugged, unforgiving landscape. Finding water here is the difference between an adventure and a rescue operation.

## The Secret Geography
While the range looks bone-dry, the volcanic geology creates natural catchments and hidden seeps. These "tinajas" are the lifeblood of the wilderness.

## Scouting Report:
- **Garden Valley**: After a heavy rain, the ephemeral pools here offer a brief oasis.
- **La Barge Canyon**: Contains several semi-permanent springs, though they require advanced filtration due to mineral content.
- **The Peralta Trail**: Look for damp sand in the drainage areas; water is often just 12 inches below the surface.

## Safety Warning:
Never rely on a spring being active. Always carry 1 gallon of water per person per day as your baseline. The "hidden" springs are a bonus, not a primary supply.
    `,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80&auto=format&fit=crop&v=1'
  },
  {
    id: 'desert-hydration-science',
    title: 'Desert Hydration: Advanced Science',
    date: 'Dec 20, 2025',
    category: 'Health',
    content: `
# Desert Hydration: Advanced Science

Hydration in the desert is not just about drinking water; it's about cellular retention and osmotic balance.

## The "Dry Heat" Trap
In Arizona, sweat evaporates instantly. You may feel dry while losing liters of fluid. This "insensible water loss" is the primary cause of heat exhaustion.

## The Protocol:
- **Pre-loading**: Drink 24oz of water with 500mg of sodium 2 hours before your hike. This increases plasma volume.
- **The 20-Minute Rule**: Sip 6-8oz every 20 minutes. The gut can only process about 1 liter per hour; "chugging" leads to bloating and malabsorption.
- **Electrolyte Ratios**: You need more than just salt. Potassium, Magnesium, and Calcium are critical for muscle firing in high heat.

## Signs of Failure:
- Dark urine (Level 1)
- Cessation of sweating (Level 2 - CRITICAL)
- Confusion or irritability (Level 3 - EVACUATE)
    `,
    image: 'https://images.unsplash.com/photo-1523214344605-236f0687f87f?w=800&q=80&auto=format&fit=crop&v=1'
  }
];
