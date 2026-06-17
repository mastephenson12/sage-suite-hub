import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Coffee, Map, ShieldCheck, Users } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import RelatedArizonaGuides from '../components/RelatedArizonaGuides';
import { getAllArizonaDestination } from '../data/allArizonaDestinations';

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm leading-6 text-zinc-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[7px] h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type Destination = NonNullable<ReturnType<typeof getAllArizonaDestination>>;

function getDestinationFitSnapshot(destination: Destination) {
  const combinedText = [
    destination.tagline,
    destination.intro,
    ...destination.bestFor,
    ...destination.outdoorActivities,
    ...destination.easyTrails,
    ...destination.safetyTips,
  ]
    .join(' ')
    .toLowerCase();

  const hasCoolWeather =
    combinedText.includes('cool') ||
    combinedText.includes('pine') ||
    combinedText.includes('forest') ||
    combinedText.includes('mountain') ||
    combinedText.includes('higher elevation');
  const hasWater =
    combinedText.includes('lake') ||
    combinedText.includes('creek') ||
    combinedText.includes('river') ||
    combinedText.includes('water');
  const hasTown =
    combinedText.includes('downtown') ||
    combinedText.includes('town') ||
    combinedText.includes('food') ||
    combinedText.includes('walkable');
  const hasHeatRisk =
    combinedText.includes('heat') ||
    combinedText.includes('exposed') ||
    combinedText.includes('summer') ||
    combinedText.includes('desert');

  const groupFit = hasTown
    ? 'Mixed-interest groups'
    : hasCoolWeather
      ? 'Summer escape groups'
      : hasWater
        ? 'Families who need an easy reset'
        : 'First-time Arizona visitors';

  const easyWin =
    destination.easyTrails[0] ?? destination.outdoorActivities[0] ?? `${destination.name} scenic stop`;
  const resetStop = destination.eatNearby[0] ?? `${destination.name} food stop`;
  const watchOut = hasHeatRisk
    ? 'Plan early, protect shade time, and avoid exposed midday outdoor plans.'
    : destination.safetyTips[0] ?? 'Keep timing flexible and check conditions before leaving.';
  const bestUse = destination.bestFor[0] ?? 'Flexible Arizona day';

  return [
    {
      label: 'Best fit',
      value: groupFit,
      detail: `A strong match for ${bestUse.toLowerCase()} without overcomplicating the day.`,
      icon: Users,
    },
    {
      label: 'Easiest win',
      value: easyWin,
      detail: 'Start here when the group needs a simple first stop.',
      icon: Map,
    },
    {
      label: 'Reset stop',
      value: resetStop,
      detail: 'Use food or coffee as the pressure-release valve for the day.',
      icon: Coffee,
    },
    {
      label: 'Watch-out',
      value: hasHeatRisk ? 'Heat and timing' : 'Pacing and conditions',
      detail: watchOut,
      icon: ShieldCheck,
    },
  ];
}

function DestinationFitSnapshot({ destination }: { destination: Destination }) {
  const snapshots = getDestinationFitSnapshot(destination);

  return (
    <section className="border-b border-zinc-100 bg-white px-6 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
              Quick fit check
            </p>
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
              Is {destination.name} a good match for your group?
            </h2>
          </div>
          <Link
            to={`/trip-builder?location=${destination.slug}`}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
          >
            Test it in Trip Builder
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {snapshots.map((snapshot) => {
            const Icon = snapshot.icon;

            return (
              <article
                key={snapshot.label}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-orange-600 shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-600">
                    {snapshot.label}
                  </p>
                </div>
                <h3 className="text-lg font-black leading-6 text-zinc-950">
                  {snapshot.value}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {snapshot.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ArizonaDestinationPage() {
  const { slug } = useParams();
  const destination = getAllArizonaDestination(slug);

  if (!destination) {
    return (
      <main className="min-h-screen bg-white px-6 py-20">
        <SEOJsonLd
          title="Arizona Guide Not Found | Sage Health and Travels"
          description="This Arizona destination guide is not available yet. Browse Sage Arizona guides or build a custom family trip plan."
          url="https://sage.healthandtravels.com/arizona"
        />
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            Trail marker missing
          </p>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-zinc-900 md:text-5xl">
            This Arizona guide is not built yet.
          </h1>
          <p className="mb-8 text-lg leading-8 text-zinc-600">
            The destination you are looking for wandered off trail. Very human of it.
          </p>
          <Link
            to="/arizona"
            className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
          >
            Back to Arizona Guides
          </Link>
        </section>
      </main>
    );
  }

  const pageTitle = `${destination.name} Family Adventure Guide | Sage Health and Travels`;
  const pageDescription = `Plan a family-friendly ${destination.name}, Arizona adventure with outdoor activities, easy trails, food ideas, places to stay, safety tips, and Sage trip planning help.`;
  const pageUrl = `https://sage.healthandtravels.com/arizona/${destination.slug}`;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <SEOJsonLd
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        faqs={destination.faqs}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              Arizona Destination Guide
            </p>
            <h1 className="mb-5 text-4xl font-black tracking-tight text-zinc-950 md:text-6xl">
              Plan a family adventure in {destination.name}
            </h1>
            <p className="mb-6 max-w-3xl text-xl font-serif italic leading-9 text-zinc-600">
              {destination.tagline}
            </p>
            <p className="max-w-3xl text-base leading-8 text-zinc-700 md:text-lg">
              {destination.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/trip-builder?location=${destination.slug}`}
                className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
              >
                Build This Trip
              </Link>
              <Link
                to={`/chat?mode=arizona&trip=${destination.slug}`}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                Ask Sage About {destination.name}
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              Best For
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {destination.bestFor.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-4 text-sm font-bold text-zinc-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DestinationFitSnapshot destination={destination} />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black tracking-tight">
              Best outdoor activities
            </h2>
            <BulletList items={destination.outdoorActivities} />
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black tracking-tight">
              Easy trails and scenic stops
            </h2>
            <BulletList items={destination.easyTrails} />
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black tracking-tight">
              Places to eat nearby
            </h2>
            <BulletList items={destination.eatNearby} />
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-black tracking-tight">
              Places to stay
            </h2>
            <BulletList items={destination.stayIdeas} />
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-6">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-orange-950">
            Family safety notes for {destination.name}
          </h2>
          <BulletList items={destination.safetyTips} />

          <div className="mt-6 rounded-2xl border border-orange-200 bg-white p-5">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">
              Desert Safety First
            </p>
            <h3 className="mb-2 text-xl font-black tracking-tight text-zinc-950">
              New to Arizona desert hiking?
            </h3>
            <p className="mb-4 text-sm leading-7 text-zinc-700">
              Review the Arizona Desert Hiking Safety Guide before you go. It covers
              water planning, heat warning signs, timing, kid rules, and essential
              gear so the desert does not become the trip planner.
            </p>
            <Link
              to="/arizona/desert-hiking-safety"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Read the Safety Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            FAQ
          </p>
          <h2 className="mb-8 text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
            Planning {destination.name} without making it weirdly complicated
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            {destination.faqs.map((faq) => (
              <div key={faq.question} className="rounded-3xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-black text-zinc-900">
                  {faq.question}
                </h3>
                <p className="text-sm leading-7 text-zinc-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArizonaGuides currentSlug={destination.slug} />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm md:p-12">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
            Ready to make this real?
          </p>
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-4xl">
            Turn {destination.name} into a simple Arizona trip plan
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-zinc-600">
            Start with Sage Trip Builder, refine it with Sage AI, then join Arizona
            Hikers Association for more local ideas and outdoor momentum. Look at
            us, building an actual path instead of another website cul-de-sac.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={`/trip-builder?location=${destination.slug}`}
              className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-orange-600"
            >
              Build This Trip
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-900 px-7 py-4 text-sm font-black uppercase tracking-widest text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              Join Arizona Hikers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
