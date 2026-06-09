import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Trees,
  Users,
} from 'lucide-react';
import PopularArizonaGuides from '../components/PopularArizonaGuides';
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

const TripBuilder: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialLocation = fromSlug(searchParams.get('location'));

  const [location, setLocation] = useState(initialLocation);
  const [hasKids, setHasKids] = useState('yes');
  const [activity, setActivity] = useState<ActivityType>('explore');
  const [length, setLength] = useState<TripLength>('full-day');
  const [season, setSeason] = useState<TripSeason>('spring');
  const [kidAgeGroup, setKidAgeGroup] = useState<KidAgeGroup>('elementary');
  const [wantsShade, setWantsShade] = useState(true);
  const [needsBathrooms, setNeedsBathrooms] = useState(true);
  const [needsStrollerAccess, setNeedsStrollerAccess] = useState(false);
  const [maxDriveMinutes, setMaxDriveMinutes] = useState(90);
  const [submitted, setSubmitted] = useState(false);

  const plan = useMemo(() => {
    return buildTripPlan(location, hasKids, activity, length, season);
  }, [location, hasKids, activity, length, season]);

  const familyMatches = useMemo(() => {
    return getFamilyAdventureMatches({
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
  }, [
    location,
    hasKids,
    activity,
    length,
    season,
    kidAgeGroup,
    wantsShade,
    needsBathrooms,
    needsStrollerAccess,
    maxDriveMinutes,
  ]);

  const tripSlug = toTripSlug(location);

  const handleBuildTrip = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-orange-500" />
                    Who is coming?
                  </label>
                  <select
                    value={hasKids}
                    onChange={(e) => setHasKids(e.target.value)}
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
                      href="https://healthandtravels.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Get Trip Ideas by Email
                    </a>

                    <Link
                      to="/community"
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Join Arizona Hikers
                    </Link>
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
