import React from 'react';
import { Link } from 'react-router-dom';
import {
  Baby,
  CalendarDays,
  Car,
  Clock3,
  CloudSun,
  Compass,
  Droplets,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

type ChoiceOption<T extends string> = {
  label: string;
  value: T;
  icon: LucideIcon;
};

type GuideResult = {
  title: string;
  description: string;
  to: string;
  label: string;
  icon: LucideIcon;
  helper: string;
};

type GroupValue = 'kids' | 'toddlers' | 'friends' | 'visitors' | 'adults';
type HeatValue = 'normal' | 'warm' | 'extreme';
type TimeValue = 'two-hours' | 'half-day' | 'full-day' | 'weekend';
type GoalValue = 'hike' | 'water' | 'pines' | 'food' | 'indoor';

const groupOptions: ChoiceOption<GroupValue>[] = [
  { label: 'Kids', value: 'kids', icon: Users },
  { label: 'Toddlers', value: 'toddlers', icon: Baby },
  { label: 'Friends', value: 'friends', icon: Sparkles },
  { label: 'Visitors', value: 'visitors', icon: MapPin },
  { label: 'Adults', value: 'adults', icon: Compass },
];

const heatOptions: ChoiceOption<HeatValue>[] = [
  { label: 'Normal', value: 'normal', icon: CloudSun },
  { label: 'Warm', value: 'warm', icon: Sun },
  { label: 'Extreme heat', value: 'extreme', icon: ShieldCheck },
];

const timeOptions: ChoiceOption<TimeValue>[] = [
  { label: '2 hours', value: 'two-hours', icon: Clock3 },
  { label: 'Half day', value: 'half-day', icon: Car },
  { label: 'Full day', value: 'full-day', icon: CalendarDays },
  { label: 'Weekend', value: 'weekend', icon: Trees },
];

const goalOptions: ChoiceOption<GoalValue>[] = [
  { label: 'Hike', value: 'hike', icon: Mountain },
  { label: 'Water', value: 'water', icon: Droplets },
  { label: 'Pines', value: 'pines', icon: Trees },
  { label: 'Food nearby', value: 'food', icon: MapPin },
  { label: 'Indoor backup', value: 'indoor', icon: ShieldCheck },
];

const fallbackGuides: GuideResult[] = [
  {
    title: 'Easy Arizona hikes with kids',
    description:
      'Start with short trails, bathroom realism, shade checks, early timing, and an easy turnaround point.',
    to: '/arizona/hikes-with-kids',
    label: 'Open hikes guide',
    icon: Mountain,
    helper: 'Best when the group wants to move but still needs a low-friction plan.',
  },
  {
    title: 'Cool Arizona summer trips',
    description:
      'Use elevation, pines, water, indoor anchors, and early starts when Phoenix is heating up.',
    to: '/arizona/cool-summer-trips-with-kids',
    label: 'Open heat-safe guide',
    icon: CloudSun,
    helper: 'Best when the weather matters more than the destination name.',
  },
  {
    title: 'Day trips from Phoenix',
    description:
      'Compare drive time, food stops, scenery, and simple family pacing for a no-hotel Arizona day.',
    to: '/arizona/day-trips-from-phoenix',
    label: 'Open day trips',
    icon: Car,
    helper: 'Best when visitors are in town or the weekend is already half gone.',
  },
];

function getRecommendedGuide(
  group: GroupValue,
  heat: HeatValue,
  time: TimeValue,
  goal: GoalValue
): GuideResult {
  if (time === 'weekend') {
    return {
      title: 'Arizona weekend trips',
      description:
        'Pick a better base for cabins, cooler air, red rocks, lakes, easy food, and group flexibility.',
      to: '/arizona/weekend-trips',
      label: 'Open weekend guide',
      icon: CalendarDays,
      helper: 'Best when the trip needs one strong anchor and a slower second morning.',
    };
  }

  if (heat === 'extreme' && (goal === 'indoor' || goal === 'food')) {
    return {
      title: 'Phoenix with kids when it is too hot',
      description:
        'Use early outdoor moments, indoor midday anchors, water resets, food breaks, and a realistic evening.',
      to: '/archive/phoenix-things-to-do-with-kids-when-hot',
      label: 'Open hot-day plan',
      icon: ShieldCheck,
      helper: 'Best when the safest answer is not another exposed trail.',
    };
  }

  if (heat === 'extreme' || goal === 'pines' || goal === 'water') {
    return {
      title: 'Cool Arizona summer trips',
      description:
        'Find cooler places like Payson, Flagstaff, Prescott, Show Low, Pinetop, lakes, and shaded resets.',
      to: '/arizona/cool-summer-trips-with-kids',
      label: 'Open cool-trip guide',
      icon: Trees,
      helper: 'Best when the plan should escape heat instead of fighting it.',
    };
  }

  if (goal === 'hike') {
    return {
      title: 'Arizona hikes with kids',
      description:
        'Choose trails by age, season, heat, shade, bathrooms, water, drive time, and family energy.',
      to: '/arizona/hikes-with-kids',
      label: 'Open hikes guide',
      icon: Mountain,
      helper: 'Best when the route needs to fit the actual people coming.',
    };
  }

  if (group === 'friends' || group === 'adults') {
    return {
      title: 'Arizona adventure finder',
      description:
        'Compare scenic stops, food towns, hikes, day trips, and flexible ideas for mixed-energy groups.',
      to: '/arizona/adventure-finder',
      label: 'Open adventure finder',
      icon: Sparkles,
      helper: 'Best when the group wants options without turning planning into homework.',
    };
  }

  if (group === 'visitors' || time === 'half-day') {
    return {
      title: 'Day trips from Phoenix',
      description:
        'Start with easy drive time, visitor-friendly views, simple parking, food nearby, and one backup.',
      to: '/arizona/day-trips-from-phoenix',
      label: 'Open Phoenix day trips',
      icon: Car,
      helper: 'Best when you want Arizona impact without overloading the day.',
    };
  }

  return fallbackGuides[0];
}

function buildTripBuilderUrl(
  group: GroupValue,
  heat: HeatValue,
  time: TimeValue,
  goal: GoalValue
) {
  const params = new URLSearchParams();
  params.set('plan', 'ready');
  params.set('location', goal === 'pines' || goal === 'water' ? 'payson' : 'arizona');
  params.set('kids', group === 'adults' ? 'no' : 'yes');
  params.set('group', group === 'friends' ? 'friends' : 'family');
  params.set('activity', goal === 'indoor' ? 'indoor-outdoor' : goal);
  params.set('length', time === 'two-hours' ? 'half-day' : time);
  params.set('season', heat === 'extreme' ? 'summer' : 'spring');
  params.set('ages', group === 'toddlers' ? 'toddlers' : group === 'adults' ? 'mixed' : group);
  params.set('shade', String(heat !== 'normal' || goal !== 'hike'));
  params.set('bathrooms', String(group === 'toddlers' || goal === 'food' || goal === 'indoor'));
  params.set('stroller', String(group === 'toddlers'));
  params.set('food', goal === 'food' ? 'nearby' : 'flexible');
  params.set('heat', heat);
  params.set('drive', time === 'two-hours' ? '45' : time === 'weekend' ? '180' : '120');

  return `/trip-builder?${params.toString()}`;
}

type ChoiceGroupProps<T extends string> = {
  title: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

function ChoiceGroup<T extends string>({ title, options, value, onChange }: ChoiceGroupProps<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-sm font-black text-zinc-950">{title}</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex min-h-[48px] items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-black uppercase tracking-wide transition ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50'
              }`}
              aria-pressed={isSelected}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="leading-tight">{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const StartHere: React.FC = () => {
  const [group, setGroup] = React.useState<GroupValue>('kids');
  const [heat, setHeat] = React.useState<HeatValue>('warm');
  const [time, setTime] = React.useState<TimeValue>('half-day');
  const [goal, setGoal] = React.useState<GoalValue>('hike');

  const recommendation = React.useMemo(
    () => getRecommendedGuide(group, heat, time, goal),
    [group, heat, time, goal]
  );
  const tripBuilderUrl = React.useMemo(
    () => buildTripBuilderUrl(group, heat, time, goal),
    [group, heat, time, goal]
  );
  const RecommendationIcon = recommendation.icon;

  const eventPayload = {
    group,
    heat,
    time,
    goal,
    recommendation: recommendation.title,
  };

  return (
    <section className="bg-zinc-50 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
              Start Here
            </p>

            <h2 className="text-4xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Tell Sage what kind of Arizona day this really is.
            </h2>

            <p className="mt-5 text-base leading-8 text-zinc-600 md:text-lg">
              Tap a few choices and Sage will point you to the strongest guide or
              build a starter trip with the right safety, food, shade, and drive-time assumptions.
            </p>

            <div className="mt-7 grid gap-3 rounded-lg border border-emerald-100 bg-white p-5">
              {[
                { icon: MapPin, text: 'One outdoor anchor keeps the day simple.' },
                { icon: Droplets, text: 'Food, water, bathrooms, and shade matter early.' },
                { icon: CloudSun, text: 'Heat, weather, and tired kids need a backup.' },
              ].map((rule) => {
                const Icon = rule.icon;
                return (
                  <div key={rule.text} className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                    <Icon className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                    <span>{rule.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm md:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <ChoiceGroup title="1. Who is going?" options={groupOptions} value={group} onChange={setGroup} />
              <ChoiceGroup title="2. How hot is it?" options={heatOptions} value={heat} onChange={setHeat} />
              <ChoiceGroup title="3. How much time?" options={timeOptions} value={time} onChange={setTime} />
              <ChoiceGroup title="4. What do you want?" options={goalOptions} value={goal} onChange={setGoal} />
            </div>

            <div className="mt-6 grid gap-4 rounded-lg border border-emerald-100 bg-emerald-50 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-700 text-white">
                    <RecommendationIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800">
                    Best next step
                  </p>
                </div>
                <h3 className="text-2xl font-black tracking-tight text-zinc-950">
                  {recommendation.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-zinc-700">{recommendation.description}</p>
                <p className="mt-3 text-xs font-bold leading-6 text-emerald-900">{recommendation.helper}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  to={recommendation.to}
                  onClick={() => trackEvent('start_here_recommended_guide_click', eventPayload)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-white transition hover:bg-emerald-800"
                >
                  {recommendation.label}
                </Link>
                <Link
                  to={tripBuilderUrl}
                  onClick={() => trackEvent('start_here_prefilled_trip_builder_click', eventPayload)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-3 text-center text-xs font-black uppercase tracking-widest text-zinc-900 transition hover:border-zinc-950"
                >
                  Build custom plan
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {fallbackGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.to}
                to={guide.to}
                className="group rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
              >
                <Icon className="mb-4 h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h3 className="text-lg font-black tracking-tight text-zinc-950">{guide.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{guide.helper}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-700">
                  Open guide <Compass className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StartHere;
