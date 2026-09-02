import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import { arizonaFamilyDestinations } from '../data/sage/arizonaFamilyDestinations';
import {
  ActivityType,
  KidAgeGroup,
  SageDestination,
  SageDestinationMatch,
  TripLength,
  TripSeason,
  scoreFamilyAdventure,
} from '../utils/sage';
import { trackEvent } from '../utils/analytics';

type Origin = 'phoenix' | 'tucson' | 'flagstaff' | 'sedona' | 'prescott';
type Group = 'couple' | 'young-family' | 'older-family' | 'friends' | 'adults';
type Interest = 'hike' | 'water' | 'wildlife' | 'scenic' | 'town' | 'surprise';
type Priority = 'shade' | 'bathrooms' | 'easy' | 'cooler' | 'short-drive';

type PlannerAnswers = {
  origin: Origin;
  group: Group;
  length: TripLength;
  interest: Interest;
  priority: Priority;
};

type PlannerMatch = SageDestinationMatch & {
  estimatedDriveMinutes: number;
};

const origins: Array<{ value: Origin; label: string }> = [
  { value: 'phoenix', label: 'Phoenix metro' },
  { value: 'tucson', label: 'Tucson' },
  { value: 'flagstaff', label: 'Flagstaff / Northern Arizona' },
  { value: 'sedona', label: 'Sedona / Verde Valley' },
  { value: 'prescott', label: 'Prescott' },
];

const groups: Array<{ value: Group; label: string }> = [
  { value: 'young-family', label: 'Family with young kids' },
  { value: 'older-family', label: 'Family with older kids' },
  { value: 'couple', label: 'Couple' },
  { value: 'friends', label: 'Friends / small group' },
  { value: 'adults', label: 'Adults or grandparents' },
];

const lengths: Array<{ value: TripLength; label: string; note: string }> = [
  { value: 'half-day', label: '2–4 hours', note: 'Keep it close and simple' },
  { value: 'full-day', label: 'Day trip', note: 'One strong Arizona day' },
  { value: 'weekend', label: 'Weekend', note: 'Room to explore and stay' },
];

const interests: Array<{ value: Interest; label: string }> = [
  { value: 'hike', label: 'Hiking' },
  { value: 'water', label: 'Water or lakes' },
  { value: 'wildlife', label: 'Nature & wildlife' },
  { value: 'scenic', label: 'Scenic views' },
  { value: 'town', label: 'Small towns' },
  { value: 'surprise', label: 'Surprise me' },
];

const priorities: Array<{ value: Priority; label: string }> = [
  { value: 'shade', label: 'Shade' },
  { value: 'bathrooms', label: 'Bathrooms' },
  { value: 'easy', label: 'Easy walking' },
  { value: 'cooler', label: 'Cooler weather' },
  { value: 'short-drive', label: 'Short drive' },
];

const originDriveMinutes: Record<Origin, Partial<Record<string, number>>> = {
  phoenix: {},
  tucson: {
    'red-rock-state-park': 230,
    'bell-rock-pathway': 220,
    'crescent-moon-picnic-site': 235,
    'papago-park': 115,
    'victory-steps-verrado': 150,
    'white-tank-mountain-regional-park': 150,
    'estrella-mountain-regional-park': 125,
    'lake-pleasant-regional-park': 150,
    'boyce-thompson-arboretum': 85,
    'tonto-natural-bridge-state-park': 200,
    'kartchner-caverns-state-park': 55,
    'watson-lake-park': 225,
    'buffalo-park-flagstaff': 260,
    'cave-creek-regional-park': 145,
    'pinetop-lakeside': 260,
  },
  flagstaff: {
    'red-rock-state-park': 55,
    'bell-rock-pathway': 50,
    'crescent-moon-picnic-site': 55,
    'papago-park': 145,
    'victory-steps-verrado': 170,
    'white-tank-mountain-regional-park': 165,
    'estrella-mountain-regional-park': 170,
    'lake-pleasant-regional-park': 145,
    'boyce-thompson-arboretum': 180,
    'tonto-natural-bridge-state-park': 110,
    'kartchner-caverns-state-park': 240,
    'watson-lake-park': 100,
    'buffalo-park-flagstaff': 10,
    'cave-creek-regional-park': 130,
    'pinetop-lakeside': 130,
  },
  sedona: {
    'red-rock-state-park': 15,
    'bell-rock-pathway': 15,
    'crescent-moon-picnic-site': 15,
    'papago-park': 120,
    'victory-steps-verrado': 145,
    'white-tank-mountain-regional-park': 140,
    'estrella-mountain-regional-park': 145,
    'lake-pleasant-regional-park': 115,
    'boyce-thompson-arboretum': 155,
    'tonto-natural-bridge-state-park': 90,
    'kartchner-caverns-state-park': 220,
    'watson-lake-park': 70,
    'buffalo-park-flagstaff': 50,
    'cave-creek-regional-park': 110,
    'pinetop-lakeside': 165,
  },
  prescott: {
    'red-rock-state-park': 70,
    'bell-rock-pathway': 80,
    'crescent-moon-picnic-site': 70,
    'papago-park': 105,
    'victory-steps-verrado': 105,
    'white-tank-mountain-regional-park': 95,
    'estrella-mountain-regional-park': 110,
    'lake-pleasant-regional-park': 75,
    'boyce-thompson-arboretum': 145,
    'tonto-natural-bridge-state-park': 90,
    'kartchner-caverns-state-park': 220,
    'watson-lake-park': 10,
    'buffalo-park-flagstaff': 100,
    'cave-creek-regional-park': 85,
    'pinetop-lakeside': 180,
  },
};

const guideLinks: Array<{ pattern: RegExp; href: string }> = [
  { pattern: /sedona|red rock|bell rock|crescent moon/i, href: 'https://healthandtravels.com/sedona-with-kids-family-trip-guide' },
  { pattern: /payson|tonto natural bridge|pinetop/i, href: 'https://healthandtravels.com/payson-mogollon-rim-family-weekend-guide' },
  { pattern: /papago/i, href: 'https://healthandtravels.com/papago-park-with-kids' },
  { pattern: /estrella/i, href: 'https://healthandtravels.com/estrella-mountain-regional-park-family-guide' },
];

const plannerFaqs = [
  {
    question: 'How does Sage choose my three Arizona adventure matches?',
    answer: 'Sage compares your starting point, group, available time, preferred activity, practical priority, current season, drive time, shade, bathrooms, difficulty, nearby food, and backup-plan quality.',
  },
  {
    question: 'Do I need an account to use the Arizona adventure planner?',
    answer: 'No. You can get three recommendations and continue into the detailed Sage trip builder without creating an account.',
  },
  {
    question: 'Are drive times and conditions guaranteed?',
    answer: 'No. Drive times are planning estimates. Weather, traffic, closures, wildfire restrictions, road access, fees, and facilities can change, so verify current conditions before leaving.',
  },
];

function currentSeason(): TripSeason {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

function groupSettings(group: Group): { hasKids: boolean; kidAgeGroup: KidAgeGroup } {
  if (group === 'young-family') return { hasKids: true, kidAgeGroup: 'toddlers' };
  if (group === 'older-family') return { hasKids: true, kidAgeGroup: 'teens' };
  return { hasKids: false, kidAgeGroup: 'mixed' };
}

function activityForInterest(interest: Interest): ActivityType {
  if (interest === 'hike') return 'hike';
  if (interest === 'water') return 'relax';
  return 'explore';
}

function driveLimit(length: TripLength): number {
  if (length === 'half-day') return 60;
  if (length === 'full-day') return 165;
  return 300;
}

function estimatedDrive(origin: Origin, destination: SageDestination): number {
  return originDriveMinutes[origin][destination.slug] ?? destination.driveMinutesFromPhoenix;
}

function interestBoost(interest: Interest, destination: SageDestination): number {
  if (interest === 'surprise') return 0;
  const searchable = `${destination.name} ${destination.region} ${destination.bestFor.join(' ')}`.toLowerCase();
  const patterns: Record<Exclude<Interest, 'surprise'>, RegExp> = {
    hike: /hike|trail|steps|petroglyph|mountain/,
    water: /lake|creek|water|picnic|bridge/,
    wildlife: /nature|park|forest|arboretum|lake|cavern/,
    scenic: /view|red rock|granite|rim|mountain|forest|canyon|lake/,
    town: /sedona|payson|prescott|flagstaff|pinetop|verrado|cave creek/,
  };
  return patterns[interest].test(searchable) ? 12 : 0;
}

function priorityBoost(priority: Priority, destination: SageDestination, driveMinutes: number): number {
  if (priority === 'shade') return destination.shadeScore * 1.4;
  if (priority === 'bathrooms') return destination.bathroomScore * 1.4;
  if (priority === 'easy') return destination.kidDifficultyScore * 1.4;
  if (priority === 'cooler') return (10 - destination.heatRiskScore) * 1.6;
  return Math.max(0, 14 - driveMinutes / 15);
}

function buildMatches(answers: PlannerAnswers): PlannerMatch[] {
  const group = groupSettings(answers.group);
  const maxDriveMinutes = driveLimit(answers.length);

  return arizonaFamilyDestinations
    .map((destination) => {
      const base = scoreFamilyAdventure(
        {
          location: '',
          hasKids: group.hasKids,
          activity: activityForInterest(answers.interest),
          length: answers.length,
          season: currentSeason(),
          kidAgeGroup: group.kidAgeGroup,
          wantsShade: answers.priority === 'shade',
          needsBathrooms: answers.priority === 'bathrooms',
          needsStrollerAccess: answers.priority === 'easy' && answers.group === 'young-family',
          maxDriveMinutes: 300,
        },
        destination
      );
      const travelMinutes = estimatedDrive(answers.origin, destination);
      const overLimit = Math.max(0, travelMinutes - maxDriveMinutes);
      const adjustedScore = Math.max(
        0,
        Math.min(
          100,
          Math.round(base.score + interestBoost(answers.interest, destination) + priorityBoost(answers.priority, destination, travelMinutes) - Math.min(32, overLimit / 5))
        )
      );

      return {
        ...base,
        score: adjustedScore,
        estimatedDriveMinutes: travelMinutes,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function guideFor(destination: SageDestination): string {
  const searchable = `${destination.name} ${destination.region}`;
  return guideLinks.find((guide) => guide.pattern.test(searchable))?.href ?? 'https://healthandtravels.com/arizona';
}

function builderHref(match: PlannerMatch, answers: PlannerAnswers): string {
  const group = groupSettings(answers.group);
  const params = new URLSearchParams({
    location: match.slug,
    kids: group.hasKids ? 'yes' : 'no',
    activity: activityForInterest(answers.interest),
    length: answers.length,
    season: currentSeason(),
    ages: group.kidAgeGroup,
    shade: String(answers.priority === 'shade'),
    bathrooms: String(answers.priority === 'bathrooms'),
    stroller: String(answers.priority === 'easy' && answers.group === 'young-family'),
    drive: String(driveLimit(answers.length)),
    utm_source: 'sage',
    utm_medium: 'planner',
    utm_campaign: 'plan_my_arizona_adventure',
    utm_content: match.slug,
  });
  return `/trip-builder?${params.toString()}`;
}

function formatDrive(minutes: number): string {
  if (minutes < 60) return `About ${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `About ${hours} hr ${remainder} min` : `About ${hours} hr`;
}

const PlanArizonaAdventure: React.FC = () => {
  const [answers, setAnswers] = useState<PlannerAnswers>({
    origin: 'phoenix',
    group: 'young-family',
    length: 'full-day',
    interest: 'scenic',
    priority: 'bathrooms',
  });
  const [submitted, setSubmitted] = useState(false);
  const matches = useMemo(() => buildMatches(answers), [answers]);
  const topMatch = matches[0];

  const update = <K extends keyof PlannerAnswers>(key: K, value: PlannerAnswers[K]) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    trackEvent('adventure_planner_completed', {
      origin: answers.origin,
      group: answers.group,
      trip_length: answers.length,
      interest: answers.interest,
      priority: answers.priority,
      top_match: matches[0]?.slug,
    });
    window.setTimeout(() => document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <SEOJsonLd
        title="Plan My Arizona Adventure | Sage"
        description="Answer five quick questions and get three Arizona adventure recommendations matched to your starting point, group, available time, interests, and practical needs."
        url="https://sage.healthandtravels.com/plan"
        faqs={plannerFaqs}
        breadcrumbs={[
          { name: 'Sage', url: 'https://sage.healthandtravels.com/' },
          { name: 'Plan My Arizona Adventure', url: 'https://sage.healthandtravels.com/plan' },
        ]}
      />

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-14 text-white md:py-20">
        <div className="absolute inset-0 opacity-25">
          <img src="/images/payson-rim-overlook.avif" alt="" className="h-full w-full object-cover" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/50" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-emerald-300">Five quick questions · no account needed</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">Plan your Arizona adventure</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 md:text-xl">Tell Sage who is going, where you are starting, and what matters today. You will get three realistic matches—not 47 tabs and a fresh family argument.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-16">
        <form onSubmit={submit} className="space-y-8" aria-label="Arizona adventure questions">
          <ChoiceGroup number="1" icon={MapPin} title="Where are you starting from?">
            {origins.map((option) => <ChoiceButton key={option.value} selected={answers.origin === option.value} onClick={() => update('origin', option.value)}>{option.label}</ChoiceButton>)}
          </ChoiceGroup>

          <ChoiceGroup number="2" icon={Users} title="Who is going?">
            {groups.map((option) => <ChoiceButton key={option.value} selected={answers.group === option.value} onClick={() => update('group', option.value)}>{option.label}</ChoiceButton>)}
          </ChoiceGroup>

          <ChoiceGroup number="3" icon={CalendarDays} title="How much time do you have?">
            {lengths.map((option) => <ChoiceButton key={option.value} selected={answers.length === option.value} onClick={() => update('length', option.value)} note={option.note}>{option.label}</ChoiceButton>)}
          </ChoiceGroup>

          <ChoiceGroup number="4" icon={Compass} title="What sounds good?">
            {interests.map((option) => <ChoiceButton key={option.value} selected={answers.interest === option.value} onClick={() => update('interest', option.value)}>{option.label}</ChoiceButton>)}
          </ChoiceGroup>

          <ChoiceGroup number="5" icon={ShieldCheck} title="What matters most today?">
            {priorities.map((option) => <ChoiceButton key={option.value} selected={answers.priority === option.value} onClick={() => update('priority', option.value)}>{option.label}</ChoiceButton>)}
          </ChoiceGroup>

          <button type="submit" className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-7 py-4 text-base font-black uppercase tracking-wider text-white shadow-lg transition hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200">
            Show My Three Adventures <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-zinc-50 p-6 lg:sticky lg:top-28">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">What Sage checks</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">A useful answer in about one minute</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-600">
            {['Realistic drive time from your starting area', 'Family fit, walking difficulty, shade and bathrooms', 'Current-season heat and weather fit', 'Nearby food and a backup plan'].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
          <p className="mt-5 border-t border-zinc-200 pt-5 text-xs leading-5 text-zinc-500">Drive times are planning estimates. Always verify current weather, roads, closures, fees, wildfire restrictions, and facilities before leaving.</p>
        </aside>
      </section>

      {submitted && topMatch && (
        <section id="recommendations" className="scroll-mt-24 border-y border-emerald-100 bg-emerald-50 px-6 py-14" aria-live="polite">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-700">Your Arizona matches</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Start with {topMatch.name}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-700">These three options best match your group, time, starting point, interests, and practical priority. Pick one to turn it into a fuller day plan.</p>

            <div className="mt-9 grid gap-6 lg:grid-cols-3">
              {matches.map((match, index) => (
                <article key={match.slug} className={`flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ${index === 0 ? 'border-2 border-emerald-500' : 'border border-zinc-200'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">{index === 0 ? 'Best match' : `Match ${index + 1}`}</p><h3 className="mt-2 text-2xl font-black tracking-tight">{match.name}</h3><p className="mt-1 text-sm font-semibold text-zinc-500">{match.region}</p></div>
                    <span className="rounded-full bg-zinc-950 px-3 py-2 text-xs font-black text-white">{match.score}%</span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold text-zinc-600">
                    <span className="rounded-xl bg-zinc-100 px-3 py-2"><Car className="mr-1 inline h-3.5 w-3.5" />{formatDrive(match.estimatedDriveMinutes)}</span>
                    <span className="rounded-xl bg-zinc-100 px-3 py-2">Bathrooms {match.bathroomScore}/10</span>
                    <span className="rounded-xl bg-zinc-100 px-3 py-2">Shade {match.shadeScore}/10</span>
                    <span className="rounded-xl bg-zinc-100 px-3 py-2">Easy fit {match.kidDifficultyScore}/10</span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm leading-6 text-zinc-700">
                    {match.reasons.slice(0, 3).map((reason) => <li key={reason} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" /><span>{reason}</span></li>)}
                  </ul>

                  <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-950"><strong className="block">Watch for</strong>{match.caution}</div>

                  <div className="mt-5 border-t border-zinc-100 pt-5 text-sm leading-6 text-zinc-700">
                    <p><strong>Morning:</strong> {match.name}</p>
                    <p><strong>Lunch:</strong> {match.nearbyFood[0]}</p>
                    <p><strong>Afternoon:</strong> {match.backupPlans[0]}</p>
                    <p><strong>Backup:</strong> {match.backupPlans[1] ?? match.backupPlans[0]}</p>
                  </div>

                  <div className="mt-auto space-y-3 pt-6">
                    <Link to={builderHref(match, answers)} onClick={() => trackEvent('adventure_planner_build_trip_click', { destination: match.slug, rank: index + 1 })} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-zinc-700">Build This Trip <ArrowRight className="h-4 w-4" /></Link>
                    <a href={guideFor(match)} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-black text-zinc-700 transition hover:border-emerald-400 hover:text-emerald-800">Read the Health &amp; Travels guide</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-3xl bg-zinc-950 p-7 text-white md:p-10">
          <div className="flex items-start gap-4"><Sparkles className="mt-1 h-7 w-7 shrink-0 text-emerald-300" /><div><h2 className="text-2xl font-black tracking-tight md:text-3xl">Useful first. Account later.</h2><p className="mt-3 max-w-3xl leading-7 text-zinc-300">This first version gives you real recommendations without asking for an email or login. Saving adventures across devices can come after we see how people use the planner.</p></div></div>
        </div>
      </section>
    </main>
  );
};

type ChoiceGroupProps = {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
};

function ChoiceGroup({ number, icon: Icon, title, children }: ChoiceGroupProps) {
  return <fieldset className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8"><legend className="sr-only">{title}</legend><div className="mb-5 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">{number}</span><Icon className="h-5 w-5 text-emerald-700" aria-hidden="true" /><h2 className="text-xl font-black tracking-tight md:text-2xl">{title}</h2></div><div className="grid gap-3 sm:grid-cols-2">{children}</div></fieldset>;
}

type ChoiceButtonProps = {
  selected: boolean;
  onClick: () => void;
  note?: string;
  children: React.ReactNode;
};

function ChoiceButton({ selected, onClick, note, children }: ChoiceButtonProps) {
  return <button type="button" aria-pressed={selected} onClick={onClick} className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus:ring-4 focus:ring-emerald-100 ${selected ? 'border-emerald-500 bg-emerald-50 text-emerald-950' : 'border-zinc-200 bg-white text-zinc-700 hover:border-emerald-300'}`}><span><strong className="block text-sm">{children}</strong>{note && <span className="mt-1 block text-xs text-zinc-500">{note}</span>}</span>{selected && <Check className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />}</button>;
}

export default PlanArizonaAdventure;
