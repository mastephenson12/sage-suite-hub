import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CalendarDays,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import PopularArizonaGuides from '../components/PopularArizonaGuides';
import {
  ActivityType,
  TripLength,
  TripSeason,
  activityLabels,
  buildTripPlan,
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

const TripBuilder: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialLocation = fromSlug(searchParams.get('location'));

  const [location, setLocation] = useState(initialLocation);
  const [hasKids, setHasKids] = useState('yes');
  const [activity, setActivity] = useState<ActivityType>('explore');
  const [length, setLength] = useState<TripLength>('full-day');
  const [season, setSeason] = useState<TripSeason>('spring');
  const [submitted, setSubmitted] = useState(false);

  const plan = useMemo(() => {
    return buildTripPlan(location, hasKids, activity, length, season);
  }, [location, hasKids, activity, length, season]);

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
            timing, safety notes, and next steps that do not require a travel
            committee, because civilization has suffered enough.
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
                : 'Choose a location, trip style, season, and who is coming. Sage will create a simple starter plan you can actually use.'}
            </p>

            {!submitted && (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-500">
                Your plan will include a morning flow, midday reset, afternoon
                idea, safety notes, helpful extras, and a next step for refining
                the trip.
              </div>
            )}

            {submitted && (
              <div className="mt-8 space-y-5">
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
