import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Backpack,
  Baby,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Copy,
  Droplets,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ThermometerSun,
  Utensils,
} from 'lucide-react';
import ParentRealityCheckCard from './ParentRealityCheckCard';
import SaveTripPlanCard from './SaveTripPlanCard';
import TripConfidenceBreakdownCard from './TripConfidenceBreakdownCard';
import { trackEvent } from '../utils/analytics';

function prettify(value: string | null, fallback: string): string {
  if (!value) return fallback;

  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function buildChatLink(location: string, prompt: string): string {
  const params = new URLSearchParams();

  params.set('mode', 'arizona');
  params.set('trip', location.toLowerCase().replace(/\s+/g, '-'));
  params.set('prompt', prompt);

  return `/chat?${params.toString()}`;
}

type PackingItem = {
  id: string;
  label: string;
  helper: string;
  priority: 'core' | 'heat' | 'kids' | 'comfort';
};

function buildPackingItems({
  hasKids,
  wantsShade,
  needsBathrooms,
  season,
  includeToddlers,
}: {
  hasKids: boolean;
  wantsShade: boolean;
  needsBathrooms: boolean;
  season: string;
  includeToddlers: boolean;
}): PackingItem[] {
  const isHotSeason = /summer|july|august|june|hot|warm/i.test(season);

  const items: PackingItem[] = [
    {
      id: 'water',
      label: isHotSeason ? 'Extra water and electrolytes' : 'Water for every person',
      helper: isHotSeason
        ? 'Plan for more than you think you need, especially for Phoenix-area stops.'
        : 'Bring enough for the outing plus the ride back.',
      priority: isHotSeason ? 'heat' : 'core',
    },
    {
      id: 'snacks',
      label: 'Easy snacks',
      helper: 'Choose snacks that survive the car, heat, and kid negotiations.',
      priority: 'core',
    },
    {
      id: 'sun',
      label: 'Sun protection',
      helper: 'Hats, sunscreen, sunglasses, and light layers keep the day from turning sideways.',
      priority: wantsShade ? 'heat' : 'core',
    },
    {
      id: 'shoes',
      label: 'Shoes with grip',
      helper: 'Skip heroic flip-flops for rocky desert paths, creek edges, and stairs.',
      priority: 'core',
    },
    {
      id: 'offline-map',
      label: 'Screenshot or offline map',
      helper: 'Save the plan before leaving in case cell service drops.',
      priority: 'core',
    },
    {
      id: 'first-aid',
      label: 'Small first-aid kit',
      helper: 'Bandages, wipes, tweezers, and a trash bag handle most small trail problems.',
      priority: 'comfort',
    },
  ];

  if (needsBathrooms) {
    items.push({
      id: 'bathroom-reset',
      label: 'Bathroom reset kit',
      helper: 'Wipes, sanitizer, backup clothes, and a plastic bag are worth the tiny packing space.',
      priority: 'comfort',
    });
  }

  if (hasKids) {
    items.push({
      id: 'kid-reset',
      label: 'Kid reset item',
      helper: 'A small comfort item, mini game, or favorite snack can save the ride home.',
      priority: 'kids',
    });
  }

  if (includeToddlers) {
    items.push(
      {
        id: 'toddler-clothes',
        label: 'Toddler backup clothes',
        helper: 'Add socks, shirt, shorts, and a bag for wet or dusty clothes.',
        priority: 'kids',
      },
      {
        id: 'carrier-stroller',
        label: 'Carrier or rugged stroller plan',
        helper: 'Decide before you arrive so the trailhead does not become the planning meeting.',
        priority: 'kids',
      }
    );
  }

  return items;
}

const itineraryFlow = [
  {
    icon: Clock3,
    title: 'Morning: start outside first',
    description:
      'Use the cooler part of the day for the main outdoor activity, especially in desert areas or warmer months.',
  },
  {
    icon: CalendarCheck,
    title: 'Midday: food and reset',
    description:
      'Build in a real food stop, bathroom break, and shade or indoor pause before everyone starts negotiating with chaos.',
  },
  {
    icon: Sparkles,
    title: 'Afternoon: keep it flexible',
    description:
      'Choose an easier scenic stop, visitor center, short walk, or backup plan based on heat, energy, and kid patience.',
  },
];

const confidenceItems = [
  'Kid-fit checked against your selected age group',
  'Shade and bathroom preferences considered',
  'Drive time compared with your max travel window',
  'Season and Arizona heat context included',
];

const guidedSteps = [
  'Review the confidence score',
  'Choose one next action',
  'Copy or share the plan',
];

const TripBuilderResultEnhancer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = React.useState(false);
  const [checkedPackingItems, setCheckedPackingItems] = React.useState<string[]>([]);
  const [includeToddlers, setIncludeToddlers] = React.useState(false);
  const isReady = searchParams.get('plan') === 'ready';

  const location = prettify(searchParams.get('location'), 'Arizona');
  const season = prettify(searchParams.get('season'), 'Your Season');
  const tripLength = prettify(searchParams.get('length'), 'Family Outing');
  const hasKids = searchParams.get('kids') !== 'no';
  const ageGroup = prettify(searchParams.get('ages'), 'Mixed Ages');
  const groupLabel = hasKids ? ageGroup : 'Adults only';
  const wantsShade = searchParams.get('shade') !== 'false';
  const needsBathrooms = searchParams.get('bathrooms') !== 'false';
  const currentTripUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `/trip-builder?${searchParams.toString()}`;

  const confidenceScore =
    72 +
    (hasKids ? 6 : 0) +
    (wantsShade ? 7 : 0) +
    (needsBathrooms ? 7 : 0) +
    (tripLength === 'Half Day' ? 4 : 0);

  const safeConfidenceScore = Math.min(confidenceScore, 96);
  const packingItems = React.useMemo(
    () =>
      buildPackingItems({
        hasKids,
        wantsShade,
        needsBathrooms,
        season,
        includeToddlers,
      }),
    [hasKids, wantsShade, needsBathrooms, season, includeToddlers]
  );
  const checkedCount = checkedPackingItems.filter((itemId) =>
    packingItems.some((item) => item.id === itemId)
  ).length;
  const packingProgress = Math.round((checkedCount / packingItems.length) * 100);

  React.useEffect(() => {
    if (!isReady) return;

    const eventKey = `sage.trip-pack-generated:${window.location.search}`;
    if (window.sessionStorage.getItem(eventKey)) return;

    trackEvent('trip_pack_generated', {
      destination: location,
      trip_length: tripLength,
      group: groupLabel,
      source: searchParams.get('source') || 'sage',
    });

    if (searchParams.get('source') === 'health-travels-matcher') {
      trackEvent('health_matcher_to_sage', { destination: location });
    }

    window.sessionStorage.setItem(eventKey, '1');
  }, [groupLabel, isReady, location, searchParams, tripLength]);

  if (!isReady) return null;

  const togglePackingItem = (itemId: string) => {
    setCheckedPackingItems((currentItems) => {
      const isChecked = currentItems.includes(itemId);
      const nextItems = isChecked
        ? currentItems.filter((currentItem) => currentItem !== itemId)
        : [...currentItems, itemId];

      trackEvent('packing_checklist_toggle', {
        label: isChecked ? 'Uncheck Packing Item' : 'Check Packing Item',
        destination: location,
        item: itemId,
        location: 'trip_result_packing_checklist',
      });

      return nextItems;
    });
  };

  const nextActions = [
    {
      label: 'Simplify This Plan',
      description: 'Ask Sage to make the day easier and lower-stress.',
      prompt: `Simplify this ${location} family adventure plan. Make it easier, lower-stress, and realistic for ${ageGroup}.`,
    },
    {
      label: 'Make It Safer for Kids',
      description: 'Focus on heat, timing, shade, water, and kid-fit risks.',
      prompt: `Make this ${location} plan safer for kids. Give me heat, timing, shade, water, parking, bathroom, and backup safety changes.`,
    },
    {
      label: 'Find Food Nearby',
      description: 'Ask for nearby food stops that fit the plan.',
      prompt: `Find family-friendly food options near this ${location} adventure plan, including easy kid-friendly choices and good timing for lunch or snacks.`,
    },
    {
      label: 'Add Backup Ideas',
      description: 'Get easier, indoor, or weather-friendly alternatives.',
      prompt: `Give me backup ideas for this ${location} family plan if the weather, heat, parking, or kid energy does not cooperate.`,
    },
    {
      label: 'Turn Into Weekend Plan',
      description: 'Expand the outing into a fuller weekend itinerary.',
      prompt: `Turn this ${location} family adventure into a simple weekend itinerary with outdoor activities first, then places to eat, then places to stay.`,
    },
  ];

  const tripSummary = [
    `${location} family adventure plan`,
    `Timing: ${season}`,
    `Trip style: ${tripLength}`,
    `Group: ${groupLabel}`,
    `Confidence score: ${safeConfidenceScore}%`,
    wantsShade ? 'Shade: prioritized' : 'Shade: flexible',
    needsBathrooms ? 'Bathrooms: prioritized' : 'Bathrooms: optional',
    `Open plan: ${currentTripUrl}`,
  ].join('\n');

  const handleCopySummary = async () => {
    await navigator.clipboard.writeText(tripSummary);
    setCopied(true);
    trackEvent('plan_another_trip_click', {
      label: 'Copy Trip Summary',
      destination: location,
      location: 'trip_result_next_actions',
    });
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white px-6 pb-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-300">
              Polished itinerary view
            </p>

            <h2 className="text-3xl font-black tracking-tight md:text-5xl">
              Your {location} plan is ready to share, refine, and actually use.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-zinc-300 md:text-lg">
              This gives the plan a cleaner next-step layer: confidence score,
              flow of the day, packing checklist, and action buttons. Because a plan
              buried in cards is still technically a plan, the same way a junk drawer
              is technically storage.
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-200">
                Recommended path
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {guidedSteps.map((step, index) => (
                  <div key={step} className="rounded-2xl bg-white/10 p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                      Step {index + 1}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                  Destination
                </p>
                <p className="mt-2 text-xl font-black">{location}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                  Timing
                </p>
                <p className="mt-2 text-xl font-black">{season}</p>
              </div>
              <div className="rounded-3xl border border-orange-300/30 bg-orange-400/10 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-200">
                  Confidence
                </p>
                <p className="mt-2 text-3xl font-black">{safeConfidenceScore}%</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to={buildChatLink(
                  location,
                  `Help me refine this ${location} Arizona family adventure plan and make it more practical.`
                )}
                onClick={() =>
                  trackEvent('sage_ai_refine_click', {
                    label: 'Refine With Sage AI',
                    destination: location,
                    location: 'trip_result_enhancer',
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-orange-600"
              >
                <MessageCircle className="h-4 w-4" />
                Refine With Sage AI
              </Link>

              <a
                href="https://healthandtravels.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('health_travels_ideas_click', {
                    label: 'More Trip Ideas',
                    destination: location,
                    location: 'trip_result_enhancer',
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-zinc-950"
              >
                <MapPin className="h-4 w-4" />
                More Trip Ideas
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <ParentRealityCheckCard
              hasKids={hasKids}
              season={season}
              tripLength={tripLength}
              wantsShade={wantsShade}
              needsBathrooms={needsBathrooms}
            />

            <TripConfidenceBreakdownCard
              hasKids={hasKids}
              wantsShade={wantsShade}
              needsBathrooms={needsBathrooms}
              tripLength={tripLength}
              season={season}
            />

            <article className="rounded-3xl border border-white/10 bg-white p-5 text-zinc-950">
              <div className="mb-4 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-black">Family confidence check</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {confidenceItems.map((item) => (
                  <div key={item} className="flex gap-2 rounded-2xl bg-zinc-50 p-3 text-sm font-semibold text-zinc-700">
                    <CheckCircle2 className="mt-[1px] h-4 w-4 flex-shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm leading-relaxed text-orange-950">
                Built for {hasKids ? `${ageGroup} family planning` : 'adult adventure planning'} with
                {wantsShade ? ' shade preferences' : ' flexible shade preferences'} and
                {needsBathrooms ? ' bathroom access prioritized.' : ' bathroom access treated as optional.'}
              </p>
            </article>

            <article className="rounded-3xl border border-orange-300/30 bg-orange-50 p-5 text-zinc-950">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-700">
                    Next best actions
                  </p>
                  <h3 className="text-xl font-black">Tell Sage what to improve next</h3>
                </div>
              </div>

              <div className="mb-4 rounded-2xl border border-orange-200 bg-white p-4">
                <p className="text-sm font-bold leading-relaxed text-zinc-700">
                  Start with <span className="text-orange-700">Make It Safer for Kids</span> if children are coming.
                  Start with <span className="text-orange-700">Find Food Nearby</span> if the route already looks good.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {nextActions.map((action) => (
                  <Link
                    key={action.label}
                    to={buildChatLink(location, action.prompt)}
                    onClick={() =>
                      trackEvent('sage_ai_refine_click', {
                        label: action.label,
                        destination: location,
                        location: 'trip_result_next_actions',
                      })
                    }
                    className="rounded-2xl border border-orange-200 bg-white p-4 transition hover:-translate-y-1 hover:border-orange-400 hover:shadow-md"
                  >
                    <p className="font-black text-zinc-950">{action.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {action.description}
                    </p>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={handleCopySummary}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-zinc-800"
              >
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Trip Summary Copied' : 'Copy Trip Summary'}
              </button>
            </article>

            <SaveTripPlanCard
              destination={location}
              season={season}
              tripLength={tripLength}
              groupLabel={groupLabel}
              confidenceScore={safeConfidenceScore}
              wantsShade={wantsShade}
              needsBathrooms={needsBathrooms}
              tripUrl={currentTripUrl}
              itinerary={itineraryFlow.map(({ title, description }) => ({ title, description }))}
              packingItems={packingItems.map(({ id, label, helper }) => ({ id, label, helper, packed: checkedPackingItems.includes(id) }))}
            />

            <article className="rounded-3xl border border-white/10 bg-white p-5 text-zinc-950">
              <div className="mb-4 flex items-center gap-3">
                <CalendarCheck className="h-5 w-5 text-orange-500" />
                <h3 className="text-xl font-black">Simple day flow</h3>
              </div>

              <div className="space-y-3">
                {itineraryFlow.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.title} className="rounded-2xl border border-zinc-200 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <Icon className="h-4 w-4 text-orange-500" />
                        <h4 className="font-black">{item.title}</h4>
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white p-5 text-zinc-950">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <Backpack className="h-5 w-5 text-zinc-800" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
                      Before you leave
                    </p>
                    <h3 className="text-xl font-black">Pack-it prep checklist</h3>
                  </div>
                </div>

                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800">
                  {checkedCount}/{packingItems.length} ready
                </div>
              </div>

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${packingProgress}%` }}
                />
              </div>

              {hasKids && (
                <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4">
                  <input
                    type="checkbox"
                    checked={includeToddlers}
                    onChange={(event) => {
                      setIncludeToddlers(event.target.checked);
                      trackEvent('packing_checklist_toggle', {
                        label: event.target.checked ? 'Add Toddler Items' : 'Remove Toddler Items',
                        destination: location,
                        location: 'trip_result_packing_checklist',
                      });
                    }}
                    className="mt-1 h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-black text-orange-950">
                      <Baby className="h-4 w-4" />
                      Traveling with toddlers or little kids?
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-orange-950/75">
                      Add backup clothes, carrier or rugged stroller planning, and extra reset items.
                    </span>
                  </span>
                </label>
              )}

              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
                    <Droplets className="h-4 w-4 text-sky-600" />
                    Water
                  </div>
                  <p className="text-sm font-semibold text-zinc-700">
                    Bring extra for the ride back.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
                    <ThermometerSun className="h-4 w-4 text-orange-600" />
                    Heat
                  </div>
                  <p className="text-sm font-semibold text-zinc-700">
                    Start outdoor time early.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-zinc-500">
                    <Utensils className="h-4 w-4 text-emerald-600" />
                    Food
                  </div>
                  <p className="text-sm font-semibold text-zinc-700">
                    Pack snacks before hunger takes over.
                  </p>
                </div>
              </div>

              <ul className="grid gap-3 text-sm leading-relaxed text-zinc-700 sm:grid-cols-2">
                {packingItems.map((item) => (
                  <li key={item.id}>
                    <label className="flex h-full cursor-pointer gap-3 rounded-2xl border border-zinc-200 p-4 transition hover:border-orange-300 hover:bg-orange-50/70">
                      <input
                        type="checkbox"
                        checked={checkedPackingItems.includes(item.id)}
                        onChange={() => togglePackingItem(item.id)}
                        className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        <span className="block font-black text-zinc-950">{item.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-zinc-600">
                          {item.helper}
                        </span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripBuilderResultEnhancer;
