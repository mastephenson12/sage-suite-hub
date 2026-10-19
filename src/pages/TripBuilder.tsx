import { getFamilyTripFacts } from '../data/familyTripFacts';
import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import PlanningJourney from '../components/PlanningJourney';
import TripBuilderResultEnhancer from '../components/TripBuilderResultEnhancer';
import PopularArizonaGuides from '../components/PopularArizonaGuides';
import SEOJsonLd from '../components/SEOJsonLd';
import {
  generateSageTripPlan,
  SageAiTripPlan,
} from '../services/tripPlanService';
import { trackEvent } from '../utils/analytics';
import {
  ActivityType,
  KidAgeGroup,
  TripLength,
  TripSeason,
  activityLabels,
  buildTripPlan,
  getFamilyAdventureMatches,
  getSafetyBadgeClasses,
  getSafetyCardClasses,
  seasonLabels,
  toTripSlug,
  tripLengthLabels,
} from '../utils/sage';

function fromSlug(value: string | null): string {
  if (!value) return '';

  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const kidAgeGroupLabels: Record<KidAgeGroup, string> = {
  toddlers: 'Toddlers / preschoolers',
  elementary: 'Elementary-age kids',
  mixed: 'Mixed ages',
  teens: 'Tweens / teens',
};

const driveTimeOptions = [30, 60, 90, 120, 165, 180, 240, 300];

const activityOptions: ActivityType[] = ['hike', 'explore', 'relax'];
const tripLengthOptions: TripLength[] = ['half-day', 'full-day', 'weekend'];
const seasonOptions: TripSeason[] = ['spring', 'summer', 'fall', 'winter'];
const kidAgeGroupOptions: KidAgeGroup[] = [
  'toddlers',
  'elementary',
  'mixed',
  'teens',
];

const destinationPresets = [
  {
    label: 'Sedona with kids',
    location: 'Sedona',
    activity: 'explore' as ActivityType,
    season: 'spring' as TripSeason,
  },
  {
    label: 'Cool Flagstaff day',
    location: 'Flagstaff',
    activity: 'hike' as ActivityType,
    season: 'summer' as TripSeason,
  },
  {
    label: 'Phoenix easy morning',
    location: 'Phoenix',
    activity: 'relax' as ActivityType,
    season: 'winter' as TripSeason,
  },
  {
    label: 'Payson weekend',
    location: 'Payson',
    activity: 'explore' as ActivityType,
    season: 'summer' as TripSeason,
  },
];

function readChoice<T extends string>(
  value: string | null,
  options: readonly T[],
  fallback: T
): T {
  return value && options.includes(value as T) ? (value as T) : fallback;
}

function readBoolean(value: string | null, fallback: boolean): boolean {
  if (value === 'true') return true;
  if (value === 'false') return false;

  return fallback;
}

function readDriveMinutes(value: string | null): number {
  const parsed = Number(value);

  return driveTimeOptions.includes(parsed) ? parsed : 90;
}

const TripBuilder: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialLocation = fromSlug(searchParams.get('location'));

  const [location, setLocation] = useState(initialLocation);
  const [hasKids, setHasKids] = useState(
    readChoice(searchParams.get('kids'), ['yes', 'no'], 'yes')
  );
  const [activity, setActivity] = useState<ActivityType>(
    readChoice(searchParams.get('activity'), activityOptions, 'explore')
  );
  const [length, setLength] = useState<TripLength>(
    readChoice(searchParams.get('length'), tripLengthOptions, 'full-day')
  );
  const [season, setSeason] = useState<TripSeason>(
    readChoice(searchParams.get('season'), seasonOptions, 'spring')
  );
  const [kidAgeGroup, setKidAgeGroup] = useState<KidAgeGroup>(
    readChoice(searchParams.get('ages'), kidAgeGroupOptions, 'elementary')
  );
  const [wantsShade, setWantsShade] = useState(
    readBoolean(searchParams.get('shade'), true)
  );
  const [needsBathrooms, setNeedsBathrooms] = useState(
    readBoolean(searchParams.get('bathrooms'), true)
  );
  const [needsStrollerAccess, setNeedsStrollerAccess] = useState(
    readBoolean(searchParams.get('stroller'), false)
  );
  const [maxDriveMinutes, setMaxDriveMinutes] = useState(
    readDriveMinutes(searchParams.get('drive'))
  );
  const [submitted, setSubmitted] = useState(
    searchParams.get('plan') === 'ready'
  );
  const [aiPlan, setAiPlan] = useState<SageAiTripPlan | null>(null);
  const [aiPlanStatus, setAiPlanStatus] = useState<'idle' | 'loading' | 'ready' | 'fallback'>('idle');
  const isGeneratedPlan = searchParams.get('plan') === 'ready';

  React.useEffect(() => {
    if (searchParams.get('source') !== 'health-travels-matcher') return;

    const funnelPayload = {
      funnel_name: 'adventure_to_email',
      destination: initialLocation || 'Arizona',
      referral_source: 'healthandtravels',
    };
    trackEvent('adventure_funnel_step', {
      ...funnelPayload,
      funnel_step: 2,
      funnel_step_name: 'sage_opened',
    });
    if (searchParams.get('plan') === 'ready') {
      trackEvent('adventure_funnel_step', {
        ...funnelPayload,
        funnel_step: 3,
        funnel_step_name: 'plan_generated',
      });
    }
    // The handoff parameters are intentionally captured only on the initial landing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => () => {
    // Do not leave a saved plan's noindex directive on the next route.
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (robots) robots.content = 'index, follow';
  }, []);
  const resultKey = searchParams.toString();
  React.useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => {
      const result = document.getElementById('trip-results');
      result?.focus({ preventScroll: true });
      result?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [submitted, resultKey]);
  const destinationFacts = getFamilyTripFacts(location);
  const basePlan = buildTripPlan(location, hasKids, activity, length, season);
  const plan = destinationFacts?.id === 'estrella-mountain' ? {
    ...basePlan,
    title: 'Estrella Mountain: a short family morning',
    intro: 'A practical cool-weather Gila Trail visit, with current closure constraints and an early finish. Confirm access before leaving; the schedule below is a researched starting point.',
    morning: season === 'summer' ? 'Choose an indoor outing instead of this exposed desert trail in summer.' : 'Walk the county-listed easy 0.5-mile Gila loop only after confirming current access. Allow 30–45 minutes with breaks.',
    midday: 'Bring a packed lunch to eat at home or your accommodation after leaving the park.',
    afternoon: 'Keep the afternoon indoors. The playground, concrete path and Nature Center are closed in the reviewed alert.',
    extras: ['Water, snacks and packed lunch', 'Hats, sunscreen and closed-toe shoes', 'Hand sanitizer, charged phone and downloaded park map', 'Confirm parking, portable toilets and route access with staff'],
  } : basePlan;

  const isEstrella = destinationFacts?.id === 'estrella-mountain';
  const estrellaSchedule = [
    { time: 'Before leaving', title: 'Check access before committing', description: 'Read the county closure notice and check the forecast. Call 602-506-2930 ext. 6 to confirm Gila trail access, parking and portable restroom locations. Choose another outing if your family needs reliable shade, regular toilets or confirmed stroller access.' },
    { time: '8:00 AM', title: 'Arrive at Estrella Mountain Regional Park', description: 'Enter at 14805 W. Vineyard Ave., Goodyear. Ask staff for the current route to Gila trailhead; do not navigate through closed roads or assume Loop Drive parking has reopened. Budget $10 per vehicle and confirm current fees.' },
    { time: '8:30 AM', title: 'Gila Trail: a short desert loop', description: 'The county lists Gila as an easy 0.5-mile loop. Allow 30–45 minutes with observation and water breaks; this is a planning estimate. Stay on the signed route and turn back if the surface or heat does not suit your group. Its usual barrier-free rating does not confirm current stroller conditions.' },
    { time: '9:15 AM', title: 'Water, snacks and an energy check', description: 'Bring your own drinking water and snacks. Regular restrooms are unavailable in the reviewed alert; portable toilets are provided, but confirm their location and accessibility. Do not count on trail shade, a playground visit or the Nature Center.' },
    { time: '9:45 AM', title: 'Shorter finish or head home', description: 'For tired kids, skip the full loop and use a brief out-and-back on the confirmed open portion of Gila, returning the same way. Do not add a midday desert hike. If access or heat is unsuitable, skip the trail entirely.' },
    { time: 'Lunch', title: 'Packed lunch after leaving the park', description: 'Pack sandwiches, fruit and extra water for a simple lunch at home or your accommodation after the morning visit. This avoids depending on unconfirmed ramadas or restaurant hours. Keep the rest of a full day indoors; this park visit is a morning outing, not a full-day or weekend itinerary.' },
  ];

  const hourlyItinerary = (() => {
    if (isEstrella) return season === 'summer'
      ? [{ time: 'Before leaving', title: 'Choose an indoor summer alternative', description: 'This exposed desert route is not the family summer itinerary. Keep lunch and activities at home or your accommodation; plan the Gila visit for cooler weather after checking closures.' }]
      : estrellaSchedule;
    const summer = season === 'summer';

    if (length === 'half-day') {
      return [
        {
          time: summer ? '6:30 AM' : '8:00 AM',
          title: 'Arrive and get settled',
          description:
            'Park, confirm bathrooms and trail access, apply sunscreen, and get everyone ready before starting.',
        },
        {
          time: summer ? '7:00 AM' : '8:30 AM',
          title: 'Main outdoor adventure',
          description: plan.morning,
        },
        {
          time: summer ? '8:30 AM' : '10:00 AM',
          title: 'Water and snack break',
          description:
            hasKids === 'yes'
              ? 'Pause for water, snacks, bathrooms, and a quick kid-energy check before deciding whether to continue.'
              : 'Pause for water and a quick reset before continuing.',
        },
        {
          time: summer ? '9:00 AM' : '10:30 AM',
          title: 'Short bonus stop or easy finish',
          description: plan.afternoon,
        },
        {
          time: summer ? '10:30 AM' : '12:00 PM',
          title: 'Food and head out',
          description: plan.midday,
        },
      ];
    }

    if (length === 'weekend') {
      return [
        {
          time: 'Day 1 • 8:00 AM',
          title: 'Start with the main adventure',
          description: plan.morning,
        },
        {
          time: 'Day 1 • 11:30 AM',
          title: 'Lunch and reset',
          description: plan.midday,
        },
        {
          time: 'Day 1 • 1:00 PM',
          title: 'Easy afternoon option',
          description: plan.afternoon,
        },
        {
          time: 'Day 1 • 4:00 PM',
          title: 'Check in and slow down',
          description:
            'Give everyone downtime, refill water, check tomorrow’s weather, and keep dinner simple.',
        },
        {
          time: 'Day 2 • 8:00 AM',
          title: 'Second outdoor stop',
          description:
            'Choose a shorter trail, scenic stop, lake visit, or family-friendly attraction that complements day one.',
        },
        {
          time: 'Day 2 • 11:30 AM',
          title: 'Lunch before heading home',
          description:
            'Finish with an easy food stop and leave some margin in the schedule for traffic, weather, or tired kids.',
        },
      ];
    }

    return [
      {
        time: summer ? '6:30 AM' : '8:00 AM',
        title: 'Arrive and get ready',
        description:
          'Park, confirm bathrooms and current access, fill water bottles, apply sunscreen, and get everyone ready.',
      },
      {
        time: summer ? '7:00 AM' : '8:30 AM',
        title: 'Main outdoor adventure',
        description: plan.morning,
      },
      {
        time: summer ? '9:00 AM' : '10:30 AM',
        title: 'Snack, water, and bathroom reset',
        description:
          hasKids === 'yes'
            ? 'Take a real break before anyone gets tired, hungry, or mysteriously opposed to walking another twelve feet.'
            : 'Take a water and snack break before continuing.',
      },
      {
        time: summer ? '10:00 AM' : '11:30 AM',
        title: 'Lunch and cool-down',
        description: plan.midday,
      },
      {
        time: summer ? '11:30 AM' : '1:00 PM',
        title: 'Flexible afternoon stop',
        description: plan.afternoon,
      },
      {
        time: summer ? '1:00 PM' : '2:30 PM',
        title: 'Wrap up the adventure',
        description:
          'Start heading back while everyone still has some energy. Keep your backup option available if weather or family energy changes.',
      },
    ];
  })();

  const familyMatches = getFamilyAdventureMatches({
    location,
    hasKids: hasKids === 'yes',
    activity,
    length,
    season,
    kidAgeGroup,
    wantsShade,
    needsBathrooms,
    needsStrollerAccess,
    maxDriveMinutes,
  });

  const tripSlug = toTripSlug(location);
  const shareParams = new URLSearchParams();
  shareParams.set('plan', 'ready');
  if (tripSlug) shareParams.set('location', tripSlug);
  shareParams.set('kids', hasKids);
  shareParams.set('activity', activity);
  shareParams.set('length', length);
  shareParams.set('season', season);
  shareParams.set('ages', kidAgeGroup);
  shareParams.set('shade', String(wantsShade));
  shareParams.set('bathrooms', String(needsBathrooms));
  shareParams.set('stroller', String(needsStrollerAccess));
  shareParams.set('drive', String(maxDriveMinutes));
  ['source', 'needs', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
    const value = searchParams.get(key);
    if (value) shareParams.set(key, value);
  });

  const handleBuildTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('trip_builder_submit', {
      destination: location.trim() || 'Arizona',
      has_kids: hasKids === 'yes',
      activity,
      trip_length: length,
      season,
    });
    trackEvent('adventure_funnel_step', {
      funnel_name: 'adventure_to_email',
      funnel_step: 3,
      funnel_step_name: 'plan_generated',
      destination: location.trim() || 'Arizona',
      referral_source: searchParams.get('source') || 'direct',
    });
    setSubmitted(true);
    setAiPlan(null);
    setAiPlanStatus('loading');
    setSearchParams(shareParams, { replace: true });

    if (isEstrella) {
      setAiPlanStatus('idle');
      return;
    }

    try {
      const personalizedPlan = await generateSageTripPlan({
        destination: location.trim() || 'Arizona',
        group: hasKids === 'yes' ? 'Family with kids' : 'Adults only',
        activity,
        length,
        season,
        kidAgeGroup: hasKids === 'yes' ? kidAgeGroup : 'not applicable',
        wantsShade,
        needsBathrooms,
        needsStrollerAccess,
        maxDriveMinutes,
      });
      setAiPlan(personalizedPlan);
      setAiPlanStatus('ready');
    } catch (error) {
      console.warn('Personalized Sage plan unavailable; showing local plan.', error);
      setAiPlanStatus('fallback');
    }
  };

  return (
    <main className="planning-page min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title="Arizona Family Trip Planner: Build Your Itinerary | Sage"
        description="Build an Arizona family itinerary around your destination, kids’ ages, season, shade and bathrooms. Save, print or email your trip pack with Sage."
        url="https://sage.healthandtravels.com/trip-builder"
        robots={isGeneratedPlan ? 'noindex, follow' : 'index, follow'}
      />
      <PlanningJourney step={submitted ? 3 : 2} title={submitted ? `Your ${location || 'Arizona'} plan` : location ? `Make ${location} your kind of day` : 'Personalize your Arizona day'} description={submitted ? 'Review your day, check the practical details, and keep your plan before you go.' : 'Your choices are filled in below. Confirm the details that matter, then build your plan.'} context={[hasKids === 'yes' ? kidAgeGroupLabels[kidAgeGroup] : 'Adults only', tripLengthLabels[length], seasonLabels[season], `Up to ${maxDriveMinutes} min from Phoenix`, ...(wantsShade ? ['Shade matters'] : []), ...(needsBathrooms ? ['Bathrooms matter'] : [])]} />
      <section className="mx-auto max-w-6xl px-6 py-8 md:py-10">
        <div className="space-y-8">
          <details id="trip-preferences" className="journey-disclosure" open={!submitted}>
            <summary>{submitted ? 'Edit your trip preferences' : 'Your trip preferences'}</summary>
          <form
            onSubmit={handleBuildTrip}
            className="min-w-0"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="trip-location" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Where do you want to go?
                </label>
                <input
                    id="trip-location"
                  type="text"
                  value={location}
                  onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setLocation(e.target.value); }}
                  placeholder="Sedona, Flagstaff, Phoenix, Payson..."
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {destinationPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setAiPlan(null);
                        setAiPlanStatus('idle');
                        setLocation(preset.location);
                        setActivity(preset.activity);
                        setSeason(preset.season);
                      }}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-600 transition hover:border-orange-300 hover:text-orange-600"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="trip-group" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-orange-500" />
                    Who is coming?
                  </label>
                  <select
                    id="trip-group"
                    value={hasKids}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setHasKids(e.target.value as 'yes' | 'no'); }}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="yes">Family with kids</option>
                    <option value="no">Adults only</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="trip-ages" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Baby className="h-4 w-4 text-orange-500" />
                    Kids' ages
                  </label>
                  <select
                    id="trip-ages"
                    value={kidAgeGroup}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setKidAgeGroup(e.target.value as KidAgeGroup); }}
                    disabled={hasKids !== 'yes'}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400"
                  >
                    <option value="toddlers">{kidAgeGroupLabels.toddlers}</option>
                    <option value="elementary">{kidAgeGroupLabels.elementary}</option>
                    <option value="mixed">{kidAgeGroupLabels.mixed}</option>
                    <option value="teens">{kidAgeGroupLabels.teens}</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="trip-activity" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Mountain className="h-4 w-4 text-orange-500" />
                    What kind of day do you want?
                  </label>
                  <select
                    id="trip-activity"
                    value={activity}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setActivity(e.target.value as ActivityType); }}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="hike">{activityLabels.hike}</option>
                    <option value="explore">{activityLabels.explore}</option>
                    <option value="relax">{activityLabels.relax}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="trip-length" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    How long should this trip be?
                  </label>
                  <select
                    id="trip-length"
                    value={length}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setLength(e.target.value as TripLength); }}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="half-day">{tripLengthLabels['half-day']}</option>
                    <option value="full-day">{tripLengthLabels['full-day']}</option>
                    <option value="weekend">{tripLengthLabels.weekend}</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="trip-season" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="h-4 w-4 text-orange-500" />
                    When are you going?
                  </label>
                  <select
                    id="trip-season"
                    value={season}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setSeason(e.target.value as TripSeason); }}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="spring">{seasonLabels.spring}</option>
                    <option value="summer">{seasonLabels.summer}</option>
                    <option value="fall">{seasonLabels.fall}</option>
                    <option value="winter">{seasonLabels.winter}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="trip-drive" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Car className="h-4 w-4 text-orange-500" />
                    Max drive from Phoenix
                  </label>
                  <select
                    id="trip-drive"
                    value={maxDriveMinutes}
                    onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setMaxDriveMinutes(Number(e.target.value)); }}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    {driveTimeOptions.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {`${minutes} minutes`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                  <Trees className="h-4 w-4 text-emerald-600" />
                  Parent filters
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-3 text-sm font-semibold transition hover:border-zinc-400">
                    <input
                      type="checkbox"
                      checked={wantsShade}
                      onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setWantsShade(e.target.checked); }}
                      className="mt-1"
                    />
                    <span>Shade matters</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-3 text-sm font-semibold transition hover:border-zinc-400">
                    <input
                      type="checkbox"
                      checked={needsBathrooms}
                      onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setNeedsBathrooms(e.target.checked); }}
                      className="mt-1"
                    />
                    <span>Need bathrooms</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-3 text-sm font-semibold transition hover:border-zinc-400">
                    <input
                      type="checkbox"
                      checked={needsStrollerAccess}
                      onChange={(e) => { setSubmitted(false); setAiPlan(null); setAiPlanStatus('idle'); setNeedsStrollerAccess(e.target.checked); }}
                      className="mt-1"
                    />
                    <span>Stroller access</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                aria-describedby={submitted ? 'trip-builder-status' : undefined}
                className="md:col-span-2 inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
              >
                {submitted ? 'Update My Plan' : 'Build My Plan'}
              </button>

              {submitted && (
                <p id="trip-builder-status" className="text-center text-sm font-bold text-emerald-800" role="status">
                  Your plan is ready below. Review the details and save it before leaving.
                </p>
              )}
            </div>
          </form>
          </details>

          <div id={submitted ? 'trip-results' : undefined} tabIndex={submitted ? -1 : undefined} className="min-w-0 scroll-mt-6 outline-none">
            {submitted && <div className="journey-plan-actions"><a className="journey-primary" href="#keep-trip-plan">Keep My Plan</a><a href="#trip-preferences" onClick={() => { const details = document.getElementById('trip-preferences') as HTMLDetailsElement | null; if(details) details.open = true; }}>Edit preferences</a></div>}
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
              {submitted ? 'Your adventure' : 'What to expect'}
            </p>

            <h2 className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
              {submitted ? plan.title : 'A practical plan for your group'}
            </h2>

            <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
              {submitted
                ? plan.intro
                : 'Your plan will bring together your main outdoor stop, realistic timing, food, bathrooms, shade and a backup option.'}
            </p>

            {destinationFacts && (
              <section className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5" aria-label="Destination at a glance">
                <h3 className="text-xl font-black">{destinationFacts.name}: At a glance</h3>
                <p className="mt-3 font-semibold">{destinationFacts.caution}</p>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  {destinationFacts.facts.map(([label, value]) => <div key={label}><dt className="font-bold">{label}</dt><dd className="mt-1 text-sm leading-relaxed">{value}</dd></div>)}
                </dl>
                <p className="mt-4 text-sm">{destinationFacts.reviewNote}</p>
                <a className="mt-3 block font-bold underline" href={destinationFacts.guide}>Read the full Health &amp; Travels guide</a>
                <ul className="mt-3 space-y-2 text-sm">{destinationFacts.sources.map(source => <li key={source.url}><a className="underline" href={source.url}>{source.label}</a></li>)}</ul>
              </section>
            )}

            {!submitted && (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-500">
                Your plan will include a morning flow, midday reset, afternoon
                idea, safety notes, helpful extras, top destination matches,
                bathroom and shade fit, food nearby, and backup plans.
              </div>
            )}

            {submitted && (
              <div className="mt-8 space-y-5">
                <section
                  className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5"
                  aria-live="polite"
                  aria-busy={aiPlanStatus === 'loading'}
                >
                  <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                    Personalized by Sage
                  </p>

                  {aiPlanStatus === 'loading' && (
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">Personalizing your trip…</h3>
                      <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                        Your instant local plan is ready below. Sage is adding a specific outdoor anchor, food stop, facilities check, and backup plan.
                      </p>
                    </div>
                  )}

                  {aiPlanStatus === 'fallback' && (
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">Your starter plan is ready</h3>
                      <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                        Personalization is temporarily unavailable. Use the starter schedule below and confirm local details before leaving.
                      </p>
                    </div>
                  )}

                  {aiPlanStatus === 'ready' && aiPlan && !isEstrella && (
                    <div className="mt-3 space-y-4 text-emerald-950">
                      <div>
                        <h3 className="text-2xl font-black tracking-tight">{aiPlan.title}</h3>
                        <p className="mt-2 leading-relaxed">{aiPlan.summary}</p>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl bg-white p-4">
                          <p className="font-black">Main outdoor stop</p>
                          <p className="mt-1 font-semibold">{aiPlan.outdoorAnchor.name}</p>
                          <p className="mt-1 text-sm leading-relaxed">{aiPlan.outdoorAnchor.description}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4">
                          <p className="font-black">Estimated drive from Phoenix</p>
                          <p className="mt-1 text-sm leading-relaxed">{aiPlan.driveFromPhoenix}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4">
                          <p className="font-black">Kid-friendly food</p>
                          <p className="mt-1 font-semibold">{aiPlan.foodStop.name}</p>
                          <p className="mt-1 text-sm leading-relaxed">{aiPlan.foodStop.description}</p>
                        </div>
                        <div className="rounded-2xl bg-white p-4">
                          <p className="font-black">Restrooms and shade</p>
                          <p className="mt-1 text-sm leading-relaxed"><strong>Restrooms:</strong> {aiPlan.facilities.restrooms}</p>
                          <p className="mt-1 text-sm leading-relaxed"><strong>Shade:</strong> {aiPlan.facilities.shade}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-emerald-200 bg-white p-4">
                        <p className="font-black">Weather and heat backup</p>
                        <p className="mt-1 text-sm leading-relaxed">{aiPlan.backupPlan}</p>
                      </div>

                      {aiPlan.cautions.length > 0 && (
                        <div>
                          <p className="font-black">Before you go</p>
                          <ul className="mt-2 space-y-1 text-sm leading-relaxed">
                            {aiPlan.cautions.map((caution) => <li key={caution}>• {caution}</li>)}
                          </ul>
                        </div>
                      )}

                      <p className="text-xs leading-relaxed text-emerald-800">
                        {aiPlan.verificationNote}
                      </p>
                    </div>
                  )}
                </section>

                <details className="journey-disclosure"><summary>Other adventures within your drive limit</summary>
                  <div className="space-y-4">
                    {familyMatches.length === 0 && <p>No destinations in our catalog fit this drive limit from Phoenix. Increase the limit or choose a closer outing. A manually entered destination is not guaranteed to fit.</p>}
                    {familyMatches.map((match, index) => (
                      <article
                        key={match.slug}
                        className="rounded-2xl border border-zinc-200 bg-white p-5"
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
                              Match #{index + 1} • {match.region}
                            </p>
                            <h4 className="text-lg font-black">{match.name}</h4>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black">{match.score}</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
                              {match.fitLabel}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4 grid gap-2 text-xs font-bold text-zinc-600 sm:grid-cols-4">
                          <span className="rounded-full bg-zinc-100 px-3 py-2">
                            Shade {match.shadeScore}/10
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-2">
                            Bathrooms {match.bathroomScore}/10
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-2">
                            Stroller {match.strollerScore}/10
                          </span>
                          <span className="rounded-full bg-zinc-100 px-3 py-2">
                            Drive {match.driveMinutesFromPhoenix} min
                          </span>
                        </div>

                        <ul className="mb-4 space-y-2 text-sm leading-relaxed text-zinc-700">
                          {match.reasons.map((reason) => (
                            <li key={reason} className="flex gap-2">
                              <span className="mt-[2px] text-orange-500">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="grid gap-3 text-sm md:grid-cols-2">
                          <div className="rounded-2xl bg-orange-50 p-4 text-orange-950">
                            <p className="mb-1 font-black">Watch for</p>
                            <p className="leading-relaxed">{match.caution}</p>
                          </div>
                          <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-950">
                            <p className="mb-1 font-black">Parent tip</p>
                            <p className="leading-relaxed">{match.parentTip}</p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                          <div>
                            <p className="mb-2 font-black text-zinc-900">Food nearby</p>
                            <p className="text-zinc-600">{match.nearbyFood.join(' • ')}</p>
                          </div>
                          <div>
                            <p className="mb-2 font-black text-zinc-900">Backup plans</p>
                            <p className="text-zinc-600">{match.backupPlans.join(' • ')}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </details>

                <div
                  className={`rounded-2xl border p-5 ${getSafetyCardClasses(
                    plan.safety.level
                  )}`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${getSafetyBadgeClasses(
                        plan.safety.level
                      )}`}
                    >
                      {plan.safety.badge}
                    </span>

                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                      {plan.region}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-lg font-black">
                        {plan.safety.title}
                      </h3>
                      <p className="mb-2 leading-relaxed">
                        {plan.safety.message}
                      </p>
                      <p className="font-semibold leading-relaxed">
                        {plan.safety.suggestion}
                      </p>
                    </div>
                  </div>
                </div>

                <section className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Your day, hour by hour
                      </p>
                      <h3 className="text-xl font-black tracking-tight">
                        A realistic family schedule
                      </h3>
                    </div>
                  </div>

                  {isEstrella && <div className="mb-5 space-y-3 text-sm">
                    <p className="font-semibold">Cool-weather morning plan · researched October 7, 2026 · check conditions again before travel.</p>
                    <p>Pack water for everyone, snacks or lunch, hats, sunscreen, closed-toe shoes, hand sanitizer, a charged phone and a downloaded park map.</p>
                    <div className="flex flex-wrap gap-4">
                      <a className="font-bold underline" href="https://www.google.com/maps/search/?api=1&query=14805+W+Vineyard+Ave+Goodyear+AZ">Park entrance directions</a>
                      <a className="font-bold underline" href="https://www.maricopacountyparks.net/assets/1/6/estrella-8x11.pdf">Official trail map</a>
                      <a className="font-bold underline" href="https://www.maricopacountyparks.net/estrella---storm-damage-update-and-temporary-closures/">Check current closures</a>
                    </div>
                  </div>}
                  <div className="space-y-4">
                    {hourlyItinerary.map((item) => (
                      <div
                        key={`${item.time}-${item.title}`}
                        className="grid gap-2 rounded-2xl bg-zinc-50 p-4 sm:grid-cols-[110px_1fr]"
                      >
                        <div className="font-black text-orange-600">
                          {item.time}
                        </div>

                        <div>
                          <h4 className="font-black text-zinc-900">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                    Times are planning estimates, not reservations or live travel times.
                    Check current access, weather, operating hours, and driving conditions
                    before leaving.
                  </p>
                </section>

                <details className="journey-disclosure"><summary>More preparation tips</summary><ul className="space-y-2">{plan.extras.map(item => <li key={item}>{item}</li>)}</ul></details>
                <TripBuilderResultEnhancer itinerary={hourlyItinerary} personalizing={aiPlanStatus === 'loading'} sections={[
                  {title: 'Trip overview', description: plan.intro},
                  {title: 'Safety and conditions', description: `${plan.safety.title}: ${plan.safety.message} ${plan.safety.suggestion}`},
                  ...(!isEstrella && aiPlan ? [
                    {title: aiPlan.outdoorAnchor.name, description: aiPlan.outdoorAnchor.description},
                    {title: 'Estimated drive from Phoenix', description: aiPlan.driveFromPhoenix},
                    {title: aiPlan.foodStop.name, description: aiPlan.foodStop.description},
                    {title: 'Bathrooms and shade', description: `${aiPlan.facilities.restrooms} ${aiPlan.facilities.shade}`},
                    {title: 'Backup plan', description: aiPlan.backupPlan},
                    {title: 'Before you go', description: [...aiPlan.cautions, aiPlan.verificationNote].join(' ')},
                  ] : []),
                ]} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <PopularArizonaGuides compact />
        </div>
      </section>
    </main>
  );
};

export default TripBuilder;
