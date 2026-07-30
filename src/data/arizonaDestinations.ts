export type ArizonaDestination = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  bestFor: string[];
  outdoorActivities: string[];
  easyTrails: string[];
  eatNearby: string[];
  stayIdeas: string[];
  safetyTips: string[];
  faqs: { question: string; answer: string }[];
};

export const arizonaDestinations: ArizonaDestination[] = [
  {
    slug: 'sedona',
    name: 'Sedona',
    tagline: 'Red rocks, creek time, easy overlooks, and family hikes that feel bigger than the effort.',
    intro:
      'Sedona is one of the best Arizona bases for families who want dramatic scenery without needing to train like alpine goats. Start early, keep hikes short, and build in food and shade breaks before everyone becomes a sun-baked crank goblin.',
    bestFor: ['Red rock views', 'Beginner hikes', 'Creek stops', 'Scenic drives'],
    outdoorActivities: [
      'Walk a short red rock trail in the morning before parking and heat become annoying little villains.',
      'Drive Oak Creek Canyon for cooler air, shade, and easy pullouts.',
      'Visit a scenic overlook near sunset for big views without a big hike.',
      'Use Sage to build a half-day plan if you have younger kids or limited patience for logistics.',
    ],
    easyTrails: ['Bell Rock Pathway', 'Fay Canyon Trail', 'West Fork starter section', 'Airport Mesa overlook area'],
    eatNearby: ['Casual cafes in West Sedona', 'Picnic supplies before Oak Creek', 'Family-friendly restaurants near Uptown', 'Early dinner after sunset views'],
    stayIdeas: ['West Sedona for easier access', 'Oak Creek area for quieter stays', 'Village of Oak Creek for Bell Rock access', 'Cabin-style stays for families'],
    safetyTips: [
      'Start hikes early, especially from late spring through early fall.',
      'Parking fills fast near popular trailheads, because apparently everyone had the same brilliant idea.',
      'Bring more water than you think and avoid exposed midday hiking.',
      'Watch slick rock and cliff edges with kids.',
    ],
    faqs: [
      {
        question: 'Is Sedona good for beginner family hikes?',
        answer: 'Yes. Choose shorter trails, start early, and avoid trying to cram three famous hikes into one day like a tourist with a clipboard.',
      },
      {
        question: 'What is the easiest way to plan Sedona with kids?',
        answer: 'Pick one morning trail, one food stop, one scenic stop, and leave space for creek time or rest.',
      },
    ],
  },
  {
    slug: 'flagstaff',
    name: 'Flagstaff',
    tagline: 'Cool pine air, lava caves, mountain walks, and summer relief from Arizona’s oven setting.',
    intro:
      'Flagstaff is a strong family base when Phoenix is attempting to roast everyone into trail jerky. It works well for easy forest walks, day trips, stargazing, and cooler weekend escapes.',
    bestFor: ['Cool summer weather', 'Forest walks', 'Weekend escapes', 'Day trips'],
    outdoorActivities: [
      'Walk an easy forest trail in the morning and save town exploring for later.',
      'Visit lava flow or volcanic landscapes for a kid-friendly geology day.',
      'Plan a picnic under the pines when lower Arizona is spiritually unavailable.',
      'Use Flagstaff as a base for Grand Canyon or Williams day trips.',
    ],
    easyTrails: ['Buffalo Park Loop', 'Lava Flow Trail', 'Fatmans Loop', 'Picture Canyon Natural and Cultural Preserve'],
    eatNearby: ['Downtown Flagstaff casual restaurants', 'Coffee shops before trail time', 'Pizza or burgers after hiking', 'Picnic supplies for forest days'],
    stayIdeas: ['Downtown for walkability', 'East Flagstaff for easier road access', 'Cabins near the pines', 'Family-friendly hotels near Route 66'],
    safetyTips: [
      'Flagstaff sits at higher elevation, so take it easier on the first day.',
      'Afternoon storms can roll in during monsoon season.',
      'Bring layers, even when the desert below is acting ridiculous.',
      'Check trail conditions in winter and early spring.',
    ],
    faqs: [
      {
        question: 'Is Flagstaff good for summer family trips?',
        answer: 'Yes. It is one of Arizona’s best summer escapes because the elevation brings cooler weather and pine forest options.',
      },
      {
        question: 'Can Flagstaff work for a weekend trip?',
        answer: 'Absolutely. Build one forest day, one food-and-town day, and one scenic side trip if your family still has battery life.',
      },
    ],
  },
  {
    slug: 'payson',
    name: 'Payson',
    tagline: 'Creeks, forest roads, rim country, and easy outdoor weekends close to Phoenix.',
    intro:
      'Payson is a practical Arizona family escape when you want pine air, creek stops, and rim country without driving forever. It is especially useful for families who want nature but not a logistical hostage situation.',
    bestFor: ['Phoenix weekend escapes', 'Creek time', 'Rim country', 'Casual exploring'],
    outdoorActivities: [
      'Explore shaded creek areas early in the day.',
      'Drive toward the Mogollon Rim for big views and cooler air.',
      'Plan a picnic and easy nature walk instead of overbuilding the day.',
      'Use Sage to choose between a half-day, full-day, or weekend flow.',
    ],
    easyTrails: ['Green Valley Park paths', 'Water Wheel area', 'Horton Creek starter section', 'Mogollon Rim viewpoints'],
    eatNearby: ['Casual diners in Payson', 'Coffee before the Rim drive', 'Picnic supplies for creek days', 'Family restaurants after exploring'],
    stayIdeas: ['Payson hotels for convenience', 'Cabins near the forest', 'Rim-area camping when weather allows', 'Weekend rentals for families'],
    safetyTips: [
      'Creek rocks can be slick, because nature enjoys comedy at ankles’ expense.',
      'Storms can change water conditions quickly.',
      'Bring layers if heading toward the Rim.',
      'Avoid remote forest roads unless your vehicle and cell-service expectations are realistic.',
    ],
    faqs: [
      {
        question: 'Is Payson good for kids?',
        answer: 'Yes. Keep the plan simple: one creek stop, one scenic area, one meal, and enough room for tired humans.',
      },
      {
        question: 'Is Payson a good Phoenix day trip?',
        answer: 'Yes, especially when you want cooler air and a nature reset without committing to a huge drive.',
      },
    ],
  },
  {
    slug: 'prescott',
    name: 'Prescott',
    tagline: 'Granite boulders, lake loops, pine air, and a downtown that makes weekend trips easy.',
    intro:
      'Prescott is one of Arizona’s easiest family weekend bases because outdoor time and food stops sit close together. Revolutionary concept: do the hike, then eat nearby, instead of driving across creation for lunch.',
    bestFor: ['Lake walks', 'Boulder scenery', 'Weekend trips', 'Historic downtown'],
    outdoorActivities: [
      'Walk around Watson Lake or Lynx Lake for scenic but manageable outdoor time.',
      'Explore granite boulder views without needing a long hike.',
      'Pair a morning trail with downtown food and shops.',
      'Use Prescott as a cooler escape from the Valley.',
    ],
    easyTrails: ['Watson Lake Loop sections', 'Lynx Lake Recreation Trail', 'Thumb Butte shorter sections', 'Granite Gardens area'],
    eatNearby: ['Downtown Prescott restaurants', 'Picnic near the lakes', 'Coffee before a lake walk', 'Casual dinner after trail time'],
    stayIdeas: ['Downtown hotels for walkability', 'Cabins near Prescott National Forest', 'Family-friendly hotels near main roads', 'Lake-area stays when available'],
    safetyTips: [
      'Watch kids carefully around lake edges and granite boulders.',
      'Bring sun protection even when temperatures feel mild.',
      'Monsoon storms can change plans fast.',
      'Some trails have rocky footing, so wear real shoes, not optimism with straps.',
    ],
    faqs: [
      {
        question: 'Is Prescott good for a family weekend?',
        answer: 'Yes. It has outdoor variety, a useful downtown, and enough easy options for mixed-age groups.',
      },
      {
        question: 'What is a simple Prescott plan?',
        answer: 'Start with Watson Lake or Lynx Lake, eat downtown, then add a short scenic stop before heading back.',
      },
    ],
  },
  {
    slug: 'cave-creek',
    name: 'Cave Creek',
    tagline: 'Desert trails, cowboy-town energy, big sunsets, and easy outdoor time near Phoenix.',
    intro:
      'Cave Creek is a great near-Phoenix choice when you want desert views, trail time, and food nearby without turning the day into a survival documentary.',
    bestFor: ['Phoenix-area day trips', 'Desert hikes', 'Sunset views', 'Casual food stops'],
    outdoorActivities: [
      'Start with an easy desert trail before the day heats up.',
      'Explore Cave Creek Regional Park for family-friendly desert scenery.',
      'Plan a sunset stop if hiking midday would be a terrible little idea.',
      'Pair outdoor time with a casual meal in town.',
    ],
    easyTrails: ['Nature Trail at Cave Creek Regional Park', 'Slate Trail sections', 'Go John Trail shorter sections', 'Black Mountain views from town'],
    eatNearby: ['Casual Cave Creek restaurants', 'Coffee before the park', 'Family-friendly patios', 'Early dinner after sunset'],
    stayIdeas: ['North Scottsdale resorts', 'Cave Creek vacation rentals', 'Carefree-area stays', 'Phoenix base with Cave Creek day trip'],
    safetyTips: [
      'Avoid exposed desert hiking during hot afternoons.',
      'Watch for cactus, loose rock, and desert wildlife.',
      'Bring water even for short trails, because the desert does not care about your confidence.',
      'Sunset is beautiful, but bring a light if you may finish late.',
    ],
    faqs: [
      {
        question: 'Is Cave Creek good for beginner hikers?',
        answer: 'Yes, especially if you pick shorter park trails and avoid the hottest part of the day.',
      },
      {
        question: 'Can Cave Creek be a half-day trip?',
        answer: 'Yes. A short morning hike plus lunch or dinner in town is a simple, useful plan.',
      },
    ],
  },
  {
    slug: 'page',
    name: 'Page',
    tagline: 'Desert views, Lake Powell scenery, slot canyon energy, and big photo-stop family days.',
    intro:
      'Page works best when you plan around reservations, heat, and driving time. The scenery is huge, but the logistics can bite if you wander in like the universe owes you parking.',
    bestFor: ['Scenic overlooks', 'Lake Powell views', 'Photo stops', 'Northern Arizona road trips'],
    outdoorActivities: [
      'Visit a major overlook early or late for better light and less heat.',
      'Plan lake-view stops with plenty of water and sun protection.',
      'Book guided experiences ahead when needed.',
      'Use Page as part of a northern Arizona road trip route.',
    ],
    easyTrails: ['Horseshoe Bend overlook walk', 'Rim View Trail sections', 'Lake Powell shoreline viewpoints', 'Glen Canyon Dam overlook area'],
    eatNearby: ['Casual restaurants in Page', 'Picnic supplies before scenic stops', 'Early dinner after overlook time', 'Coffee before morning exploring'],
    stayIdeas: ['Hotels in Page for convenience', 'Lake Powell-area stays', 'Family-friendly road trip hotels', 'Campground options when weather allows'],
    safetyTips: [
      'Expect exposed sun at many viewpoints.',
      'Stay back from cliff edges and keep kids close.',
      'Reserve guided canyon experiences ahead when required.',
      'Wind, heat, and crowds can change the feel of the day quickly.',
    ],
    faqs: [
      {
        question: 'Is Page good for families?',
        answer: 'Yes, if you plan around heat, cliff safety, reservations, and realistic pacing.',
      },
      {
        question: 'What is the easiest Page stop?',
        answer: 'Horseshoe Bend is a classic short walk, but it is exposed, so go prepared and avoid peak heat.',
      },
    ],
  },
  {
    slug: 'tucson',
    name: 'Tucson',
    tagline: 'Saguaro views, desert museums, mountain drives, and winter hiking that makes sense.',
    intro:
      'Tucson is excellent for families who want Sonoran Desert beauty, easier winter hikes, and a mix of nature, food, and learning stops. It is less excellent if you ignore summer heat, but humans keep testing that for some reason.',
    bestFor: ['Winter hikes', 'Saguaro scenery', 'Food stops', 'Desert learning'],
    outdoorActivities: [
      'Visit Saguaro National Park early for scenic desert walks.',
      'Drive toward Mount Lemmon for cooler air and changing scenery.',
      'Pair outdoor time with a museum or food stop for an easier family day.',
      'Use Tucson for winter and shoulder-season hiking plans.',
    ],
    easyTrails: ['Valley View Overlook Trail', 'Desert Ecology Trail', 'Mica View area', 'Sabino Canyon easier sections'],
    eatNearby: ['Local Tucson restaurants after hiking', 'Coffee before Saguaro stops', 'Picnic supplies for park days', 'Casual family dinner near central Tucson'],
    stayIdeas: ['Central Tucson for food access', 'Resorts near the foothills', 'Family hotels near main roads', 'Vacation rentals for longer stays'],
    safetyTips: [
      'Summer desert hiking should be extremely early or skipped for cooler options.',
      'Cactus spines are not souvenirs. Keep kids on trail.',
      'Bring water and sun protection even in winter.',
      'Watch for flash flooding during storms.',
    ],
    faqs: [
      {
        question: 'Is Tucson good for winter hiking?',
        answer: 'Yes. Tucson is one of Arizona’s best winter hiking bases, especially for families who want desert scenery.',
      },
      {
        question: 'What should families do first in Tucson?',
        answer: 'Start with a short Saguaro National Park walk, add food, then choose either Sabino Canyon or a Mount Lemmon drive.',
      },
    ],
  },
  {
    slug: 'grand-canyon',
    name: 'Grand Canyon',
    tagline: 'Big views, rim walks, shuttle strategy, and a family day that should not be rushed.',
    intro:
      'Grand Canyon works best when you keep the plan simple. Pick rim views, short walks, food timing, and safety boundaries. Do not try to conquer the canyon in one day unless your hobby is regrettable ambition.',
    bestFor: ['Iconic views', 'Rim walks', 'First Arizona trips', 'Family photos'],
    outdoorActivities: [
      'Walk short sections of the Rim Trail instead of forcing a long hike.',
      'Use shuttle stops to see multiple viewpoints with less parking chaos.',
      'Plan sunrise or sunset if your family can handle the timing.',
      'Build in snack and rest breaks before everyone turns dramatic.',
    ],
    easyTrails: ['Rim Trail sections', 'Mather Point area', 'Yavapai Point area', 'Trail of Time sections'],
    eatNearby: ['Village area food stops', 'Packable snacks for viewpoint time', 'Early meal before sunset', 'Simple picnic options'],
    stayIdeas: ['Inside-the-park lodges when available', 'Tusayan hotels', 'Williams as a road trip base', 'Flagstaff for a longer day trip'],
    safetyTips: [
      'Stay behind railings and keep kids close near edges.',
      'Do not hike below the rim casually without preparation.',
      'Weather changes fast across seasons and elevation.',
      'Hydrate and pace the day even when you are mostly walking viewpoints.',
    ],
    faqs: [
      {
        question: 'Is Grand Canyon good with kids?',
        answer: 'Yes, if you stick to rim walks, viewpoints, shuttle stops, and clear edge safety rules.',
      },
      {
        question: 'Should beginners hike into the Grand Canyon?',
        answer: 'Not casually. Most families should start with rim walks and viewpoints before considering below-rim trails.',
      },
    ],
  },
];

export function getArizonaDestination(slug: string | undefined) {
  return arizonaDestinations.find((destination) => destination.slug === slug);
}
