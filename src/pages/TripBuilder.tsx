import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type ActivityType = 'hike' | 'relax' | 'explore';
type TripLength = 'half-day' | 'full-day' | 'weekend';

type TripPlan = {
  title: string;
  intro: string;
  morning: string;
  midday: string;
  afternoon: string;
  extras: string[];
};

const activityLabels: Record<ActivityType, string> = {
  hike: 'Hiking adventure',
  explore: 'Explore a town / mixed day',
  relax: 'Easy scenic day',
};

const tripLengthLabels: Record<TripLength, string> = {
  'half-day': 'Half day',
  'full-day': 'Full day',
  weekend: 'Weekend',
};

function toTripSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildTripPlan(
  location: string,
  hasKids: string,
  activity: ActivityType,
  length: TripLength
): TripPlan {
  const cleanLocation = location.trim() || 'Arizona';
  const audience = hasKids === 'yes' ? 'a family with kids' : 'adults';

  const baseTitle =
    activity === 'hike'
      ? `A simple hiking plan for ${cleanLocation}`
      : activity === 'relax'
      ? `An easy scenic plan for ${cleanLocation}`
      : `A balanced explore day for ${cleanLocation}`;

  const intro = `Here is a simple ${tripLengthLabels[length].toLowerCase()} plan for ${audience} near ${cleanLocation}. It is built to keep the day realistic, enjoyable, and easier to follow without overplanning everything.`;

  if (activity === 'hike') {
    return {
      title: baseTitle,
      intro,
      morning: `Start early and pick one family-friendly trail or scenic walking area near ${cleanLocation}. Keep the first stop simple so the day starts with a win instead of stress.`,
      midday: `Plan a relaxed lunch break after the hike. Look for a casual local food stop, a shady picnic area, or a place where everyone can reset before the second half of the day.`,
      afternoon: `After lunch, choose one light extra stop like a scenic overlook, visitor center, small downtown walk, or easy nature area instead of trying to cram in too much.`,
      extras: [
        'Bring more water than you think you need',
        hasKids === 'yes'
          ? 'Pack simple snacks and a backup change of clothes for kids'
          : 'Wear comfortable shoes and keep the pace realistic',
        length === 'weekend'
          ? 'Save one major activity for the next morning instead of doing everything on day one'
          : 'Leave margin in the schedule so the day still feels fun',
      ],
    };
  }

  if (activity === 'relax') {
    return {
      title: baseTitle,
      intro,
      morning: `Start with a scenic drive, overlook, lake area, or peaceful outdoor stop near ${cleanLocation}. The goal is a low-pressure beginning that still feels memorable.`,
      midday: `Pick a lunch spot with easy parking and a relaxed atmosphere. If kids are coming, bonus points if there is room to move around without everyone feeling trapped.`,
      afternoon: `Keep the afternoon light with one simple stop like a short walk, downtown browsing, a coffee stop, or a scenic sunset spot instead of turning this into a marathon.`,
      extras: [
        'Think comfort first, not maximum productivity',
        hasKids === 'yes'
          ? 'Choose easy stops with bathrooms and snack options nearby'
          : 'Leave room for a slower meal or a scenic pause',
        length === 'weekend'
          ? 'Book lodging close to your main activity so driving stays easy'
          : 'End earlier than you think you need to',
      ],
    };
  }

  return {
    title: baseTitle,
    intro,
    morning: `Start with one anchor stop near ${cleanLocation}, like a downtown walk, outdoor attraction, trail, or family activity that gives the day a clear beginning.`,
    midday: `Build in a lunch stop and one second activity that fits the energy of the group. This keeps the day feeling full without turning into chaos.`,
    afternoon: `Wrap up with something easy and memorable, like dessert, a scenic stop, a short walk, or a local attraction that does not require a huge commitment.`,
    extras: [
      'Pick one must-do and let the rest stay flexible',
      hasKids === 'yes'
        ? 'Plan around attention span, not fantasy schedules'
        : 'Keep transitions simple so the day flows better',
      length === 'weekend'
        ? 'Split bigger experiences across two days'
        : 'Do less, but do it better',
    ],
  };
}

const TripBuilder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [hasKids, setHasKids] = useState('yes');
  const [activity, setActivity] = useState<ActivityType>('explore');
  const [length, setLength] = useState<TripLength>('full-day');
  const [submitted, setSubmitted] = useState(false);

  const plan = useMemo(() => {
    return buildTripPlan(location, hasKids, activity, length);
  }, [location, hasKids, activity, length]);

  const tripSlug = toTripSlug(location);

  const handleBuildTrip = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-orange-500">
            Sage Trip Planner
          </p>

          <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            Build a simpler Arizona trip in a few clicks
          </h1>

          <p className="text-lg leading-relaxed text-zinc-600 md:text-xl">
            Tell Sage what kind of day you want and get a practical starter plan
            built for real life, not some imaginary family with unlimited energy.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={handleBuildTrip}
            className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8"
          >
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Where do you want to go?
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Sedona, Flagstaff, Phoenix..."
                  className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
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
                <label className="mb-2 block text-sm font-semibold">
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
                <label className="mb-2 block text-sm font-semibold">
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
                className="inline-flex w-full items-center justify-center rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 md:w-auto"
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
                : 'Choose a location, trip style, and who is coming. Sage will create a simple starter plan you can actually use.'}
            </p>

            {!submitted && (
              <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-500">
                This is where your morning, midday, and afternoon plan will appear,
                along with a few practical tips to make the day easier.
              </div>
            )}

            {submitted && (
              <div className="mt-8 space-y-5">
                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Morning
                  </h3>
                  <p className="leading-relaxed text-zinc-700">{plan.morning}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Midday
                  </h3>
                  <p className="leading-relaxed text-zinc-700">{plan.midday}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="mb-2 text-sm font-black uppercase tracking-[0.15em] text-zinc-500">
                    Afternoon
                  </h3>
                  <p className="leading-relaxed text-zinc-700">{plan.afternoon}</p>
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
                  <h3 className="mb-2 text-xl font-black">Want the full version?</h3>
                  <p className="mb-4 leading-relaxed text-zinc-700">
                    Get the fuller trip version with extra stops, family-friendly
                    ideas, and planning inspiration from Health & Travels.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://healthandtravels.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                      Get Trip Ideas by Email
                    </a>

                    <Link
                      to={
                        tripSlug
                          ? `/chat?mode=arizona&trip=${tripSlug}`
                          : '/chat?mode=arizona'
                      }
                      className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-6 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
                    >
                      Refine This Trip With Sage AI
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TripBuilder;
