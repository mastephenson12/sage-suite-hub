import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  CheckCircle2,
  Copy,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import PopularArizonaGuides from '../components/PopularArizonaGuides';
import {
  generateSageTripPlan,
  SageAiTripPlan,
} from '../services/tripPlanService';
import CloudinaryImage from '../components/CloudinaryImage';
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

const driveTimeOptions = [30, 60, 90, 120, 180, 240];

const activityOptions: ActivityType[] = ['hike', 'explore', 'relax'];
const tripLengthOptions: TripLength[] = ['half-day', 'full-day', 'weekend'];
const seasonOptions: TripSeason[] = ['spring', 'summer', 'fall', 'winter'];
const kidAgeGroupOptions: KidAgeGroup[] = [
  'toddlers',
  'elementary',
  'mixed',
  'teens',
];

const tripBuilderPhotos = {
  sedona: { src: '/images/sedona-canyon.avif', alt: 'Red rock canyon scenery in Sedona, Arizona' },
  flagstaff: { src: '/images/flagstaff-family-adventure.avif', alt: 'Family exploring the pine forests near Flagstaff, Arizona' },
  payson: { src: '/images/payson-lake-through-pines.avif', alt: 'Woods Canyon Lake framed by pine trees near Payson, Arizona' },
  phoenix: { src: '/images/phoenix-sunset-hike.avif', alt: 'Sunset over a desert hiking trail near Phoenix, Arizona' },
  default: { src: '/images/grand-canyon.avif', alt: 'Wide view across the Grand Canyon in Arizona' },
};

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
  const [copied, setCopied] = useState(false);
  const [aiPlan, setAiPlan] = useState<SageAiTripPlan | null>(null);
  const [aiPlanStatus, setAiPlanStatus] = useState<'idle' | 'loading' | 'ready' | 'fallback'>('idle');
  const isGeneratedPlan = searchParams.get('plan') === 'ready';

  React.useEffect(() => {
    if (searchParams.get('utm_source') !== 'healthandtravels') return;
    const eventKey = `sage-handoff:${window.location.pathname}${window.location.search}`;
    if (window.sessionStorage.getItem(eventKey)) return;

    trackEvent('health_article_to_sage', {
      destination: initialLocation || 'Arizona',
      campaign: searchParams.get('utm_campaign') || 'unspecified',
      medium: searchParams.get('utm_medium') || 'referral',
      plan_ready: isGeneratedPlan,
    });
    window.sessionStorage.setItem(eventKey, 'tracked');
  }, [initialLocation, isGeneratedPlan, searchParams]);

  React.useEffect(() => {
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const existingCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousRobotsContent = existingRobots?.content;
    const previousCanonicalHref = existingCanonical?.href;
    const robots = existingRobots ?? document.createElement('meta');
    const canonical = existingCanonical ?? document.createElement('link');

    if (!existingRobots) {
      robots.name = 'robots';
      document.head.appendChild(robots);
    }

    if (!existingCanonical) {
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    robots.content = isGeneratedPlan ? 'noindex, follow' : 'index, follow';
    canonical.href = 'https://sage.healthandtravels.com/trip-builder';

    return () => {
      if (existingRobots && previousRobotsContent !== undefined) {
        existingRobots.content = previousRobotsContent;
      } else {
        robots.remove();
      }

      if (existingCanonical && previousCanonicalHref !== undefined) {
        existingCanonical.href = previousCanonicalHref;
      } else {
        canonical.remove();
      }
    };
  }, [isGeneratedPlan]);

  const plan = buildTripPlan(location, hasKids, activity, length, season);

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
  const normalizedLocation = location.trim().toLowerCase();
  const companionGuide = normalizedLocation.includes('sedona')
    ? {
        href: 'https://healthandtravels.com/sedona-with-kids-family-trip-guide?utm_source=sage&utm_medium=plan_result&utm_campaign=sedona_kids_guide',
        label: 'Read the Sedona Family Guide',
      }
    : {
        href: 'https://healthandtravels.com/?utm_source=sage&utm_medium=plan_result&utm_campaign=trip_builder',
        label: 'Explore Health & Travels Guides',
      };
  const tripPhoto = normalizedLocation.includes('sedona')
    ? tripBuilderPhotos.sedona
    : normalizedLocation.includes('flagstaff')
      ? tripBuilderPhotos.flagstaff
      : normalizedLocation.includes('payson') || normalizedLocation.includes('rim')
        ? tripBuilderPhotos.payson
        : normalizedLocation.includes('phoenix') || normalizedLocation.includes('scottsdale')
          ? tripBuilderPhotos.phoenix
          : tripBuilderPhotos.default;

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

  const sharePath = `/trip-builder?${shareParams.toString()}`;

  const tripBrief = (() => {
    const topMatches = familyMatches
      .map(
        (match, index) =>
          `${index + 1}. ${match.name} (${match.score}%): ${match.parentTip}`
      )
      .join('\n');

    const personalizedBrief = aiPlan
      ? [
          `Sage personalized plan: ${aiPlan.title}`,
          aiPlan.summary,
          `Outdoor anchor: ${aiPlan.outdoorAnchor.name} — ${aiPlan.outdoorAnchor.description}`,
          `Drive from Phoenix: ${aiPlan.driveFromPhoenix}`,
          `Food: ${aiPlan.foodStop.name} — ${aiPlan.foodStop.description}`,
          `Restrooms: ${aiPlan.facilities.restrooms}`,
          `Shade: ${aiPlan.facilities.shade}`,
          `Backup: ${aiPlan.backupPlan}`,
          `Verify before leaving: ${aiPlan.verificationNote}`,
        ].join('\n')
      : '';

    return [
      personalizedBrief,
      plan.title,
      plan.intro,
      `Safety: ${plan.safety.title} — ${plan.safety.suggestion}`,
      `Morning: ${plan.morning}`,
      `Midday: ${plan.midday}`,
      `Afternoon: ${plan.afternoon}`,
      `Top Sage matches:\n${topMatches}`,
      `Helpful extras: ${plan.extras.join(' | ')}`,
    ].filter(Boolean).join('\n\n');
  })();

  const handleBuildTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('trip_builder_submit', {
      destination: location.trim() || 'Arizona',
      has_kids: hasKids === 'yes',
      activity,
      trip_length: length,
      season,
      inbound_campaign: searchParams.get('utm_campaign') || undefined,
    });
    setSubmitted(true);
    setAiPlan(null);
    setAiPlanStatus('loading');
    setSearchParams(shareParams, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });

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

  const handleCopyTripBrief = async () => {
    const url = `${window.location.origin}${sharePath}`;

    await navigator.clipboard.writeText(
      `${tripBrief}\n\nOpen this Sage plan: ${url}`
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
            Sage Trip Builder
          </p>

          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            Build a safer Arizona adventure plan in a few clicks
          </h1>

          <p className="text-lg leading-relaxed text-zinc-600 md:text-xl">
            Tell Sage where you want to go, who is coming, and what kind of day
            you want. You will get a simple starter plan with outdoor flow, food
            timing, safety notes, and parent-friendly destination matches. Yes,
            the bar really is “does this help before the kids revolt?”
          </p>
        </div>

        <figure className="mb-10 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm">
          <CloudinaryImage
            src={tripPhoto.src}
            alt={tripPhoto.alt}
            className="h-56 w-full object-cover md:h-80"
            sizes="(min-width: 1024px) 1152px, 100vw"
            widthHint={1600}
            crop="fill"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption className="px-5 py-3 text-sm text-zinc-500">
            Your destination changes the plan. Sage uses the place, season and family filters together—not the photo alone.
          </figcaption>
        </figure>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleBuildTrip}
            className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Sedona, Flagstaff, Phoenix, Payson..."
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  {destinationPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
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
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-orange-500" />
                    Who is coming?
                  </label>
                  <select
                    value={hasKids}
                    onChange={(e) => setHasKids(e.target.value as 'yes' | 'no')}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="yes">Family with kids</option>
                    <option value="no">Adults only</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Baby className="h-4 w-4 text-orange-500" />
                    Kids' ages
                  </label>
                  <select
                    value={kidAgeGroup}
                    onChange={(e) => setKidAgeGroup(e.target.value as KidAgeGroup)}
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
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Mountain className="h-4 w-4 text-orange-500" />
                    What kind of day do you want?
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value as ActivityType)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="hike">{activityLabels.hike}</option>
                    <option value="explore">{activityLabels.explore}</option>
                    <option value="relax">{activityLabels.relax}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    How long should this trip be?
                  </label>
                  <select
                    value={length}
                    onChange={(e) => setLength(e.target.value as TripLength)}
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
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <CalendarDays className="h-4 w-4 text-orange-500" />
                    When are you going?
                  </label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(e.target.value as TripSeason)}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="spring">{seasonLabels.spring}</option>
                    <option value="summer">{seasonLabels.summer}</option>
                    <option value="fall">{seasonLabels.fall}</option>
                    <option value="winter">{seasonLabels.winter}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Car className="h-4 w-4 text-orange-500" />
                    Max drive from Phoenix
                  </label>
                  <select
                    value={maxDriveMinutes}
                    onChange={(e) => setMaxDriveMinutes(Number(e.target.value))}
                    className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                  >
                    {driveTimeOptions.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {minutes >= 240 ? '4 hours or more' : `${minutes} minutes`}
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
                      onChange={(e) => setWantsShade(e.target.checked)}
                      className="mt-1"
                    />
                    <span>Shade matters</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-3 text-sm font-semibold transition hover:border-zinc-400">
                    <input
                      type="checkbox"
                      checked={needsBathrooms}
                      onChange={(e) => setNeedsBathrooms(e.target.checked)}
                      className="mt-1"
                    />
                    <span>Need bathrooms</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 p-3 text-sm font-semibold transition hover:border-zinc-400">
                    <input
                      type="checkbox"
                      checked={needsStrollerAccess}
                      onChange={(e) => setNeedsStrollerAccess(e.target.checked)}
                      className="mt-1"
                    />
                    <span>Stroller access</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
              >
                Build My Trip
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
            <p className="mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Preview
            </p>

            <h2 className="mb-3 text-2xl font-black tracking-tight md:text-3xl">
              {submitted ? plan.title : 'Your trip plan will show up here'}
            </h2>

            <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
              {submitted
                ? plan.intro
                : 'Choose a location, trip style, season, and family filters. Sage will create a simple starter plan and recommend the best Arizona matches from its local family-adventure brain.'}
            </p>

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
                      <h3 className="text-xl font-black text-emerald-950">Adding current trip context…</h3>
                      <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                        Your instant local plan is ready below. Sage is adding a specific outdoor anchor, food stop, facilities check, and backup plan.
                      </p>
                    </div>
                  )}

                  {aiPlanStatus === 'fallback' && (
                    <div>
                      <h3 className="text-xl font-black text-emerald-950">Your reliable local plan is ready</h3>
                      <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                        Live personalization is temporarily unavailable, so Sage kept the fast local plan and destination matches below instead of leaving you stuck.
                      </p>
                    </div>
                  )}

                  {aiPlanStatus === 'ready' && aiPlan && (
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

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                        Shareable plan
                      </p>
                      <p className="text-sm font-semibold text-zinc-600">
                        Save the link or copy the trip brief for your group chat.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyTripBrief}
                      className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-white transition hover:bg-zinc-700"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy brief
                        </>
                      )}
                    </button>
                  </div>

                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-600">
                    {sharePath}
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Sage's best matches
                      </p>
                      <h3 className="text-xl font-black tracking-tight">
                        Top family adventure options
                      </h3>
                    </div>
                    <span className="rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-white">
                      {familyMatches[0]?.score ?? 0}% match
                    </span>
                  </div>

                  <div className="space-y-4">
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
                </div>

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

                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Morning outdoor flow
                  </h3>
                  <p className="leading-relaxed text-zinc-700">{plan.morning}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Midday food and reset
                  </h3>
                  <p className="leading-relaxed text-zinc-700">{plan.midday}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Afternoon option
                  </h3>
                  <p className="leading-relaxed text-zinc-700">
                    {plan.afternoon}
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
                  <h3 className="mb-3 text-sm font-black uppercase tracking-[0.15em] text-orange-700">
                    Helpful extras
                  </h3>

                  <ul className="space-y-2 text-zinc-700">
                    {plan.extras.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[2px] text-orange-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-black">
                    Make this trip easier to finish
                  </h3>
                  <p className="mb-4 leading-relaxed text-zinc-700">
                    Use Sage AI to refine the plan, get more Health & Travels trip
                    ideas by email, or join the Arizona Hikers Association if you
                    want monthly ideas, community, and more reasons to get outside.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <Link
                      to={
                        tripSlug
                          ? `/chat?mode=arizona&trip=${tripSlug}`
                          : '/chat?mode=arizona'
                      }
                      className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-5 py-3 text-center text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                    >
                      Refine With Sage AI
                    </Link>

                    <a
                      href={companionGuide.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('health_travels_ideas_click', {
                          destination: location.trim() || 'Arizona',
                          link_url: companionGuide.href,
                          placement: 'trip_builder_result',
                        })
                      }
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      {companionGuide.label}
                    </a>

                    <a
                      href="https://join.arizonahikersassociation.org/join"
                target="_blank"
                rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                Join Arizona Hikers
              </a>
                  </div>
                </div>
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
