import React, { useMemo, useState } from 'react';
import {
  Accessibility,
  CalendarDays,
  Car,
  Dog,
  Footprints,
  Gem,
  IceCream,
  Map,
  MapPin,
  PiggyBank,
  RotateCcw,
  Snowflake,
  Sparkles,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import {
  getFamilyAdventureMatches,
  type KidAgeGroup,
  type SageDestinationMatch,
} from '../utils/sage/familyAdventureScoring';
import type { ActivityType, TripSeason } from '../utils/sage/heatSafety';
import type { TripLength } from '../utils/sage/familyTripRules';

type Starter = {
  key: string;
  label: string;
  description: string;
  icon: LucideIcon;
  activity: ActivityType;
  length: TripLength;
  wantsShade?: boolean;
  needsBathrooms?: boolean;
  needsStrollerAccess?: boolean;
};

const STARTERS: Starter[] = [
  { key: 'hikes', label: 'Easy family hikes', description: 'Gentle trails for kids and beginners', icon: Footprints, activity: 'hike', length: 'half-day', needsBathrooms: true },
  { key: 'cool', label: 'Cool off', description: 'Water, shade, and high-country escapes', icon: Snowflake, activity: 'relax', length: 'full-day', wantsShade: true },
  { key: 'weekend', label: 'Weekend trips', description: 'A realistic two- or three-day getaway', icon: Map, activity: 'explore', length: 'weekend' },
  { key: 'food', label: 'Local food', description: 'Memorable stops paired with adventure', icon: Utensils, activity: 'explore', length: 'full-day' },
  { key: 'dog', label: 'Dog friendly', description: 'Trails, patios, stays, and stops', icon: Dog, activity: 'hike', length: 'full-day' },
  { key: 'toddler', label: 'Toddler friendly', description: 'Short outings with practical details', icon: IceCream, activity: 'relax', length: 'half-day', wantsShade: true, needsBathrooms: true, needsStrollerAccess: true },
  { key: 'accessible', label: 'Accessible adventures', description: 'Options shaped around mobility needs', icon: Accessibility, activity: 'relax', length: 'half-day', needsBathrooms: true, needsStrollerAccess: true },
  { key: 'free', label: 'Free things to do', description: 'Ideas with little or no admission cost', icon: PiggyBank, activity: 'explore', length: 'half-day' },
  { key: 'hidden', label: 'Hidden gems', description: 'Quieter places beyond the obvious stops', icon: Gem, activity: 'explore', length: 'full-day' },
  { key: 'weekend-now', label: 'This weekend', description: 'Timely ideas shaped around your group', icon: CalendarDays, activity: 'explore', length: 'full-day' },
];

const GROUPS: Array<{ value: KidAgeGroup; label: string }> = [
  { value: 'toddlers', label: 'Toddlers / preschoolers' },
  { value: 'elementary', label: 'Elementary-age kids' },
  { value: 'mixed', label: 'Mixed ages' },
  { value: 'teens', label: 'Teens or adults' },
];

function seasonForDate(value: string): TripSeason {
  const month = value ? Number(value.split('-')[1]) : new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

function buildSagePrompt(starter: Starter, match: SageDestinationMatch, date: string, group: string, drive: number) {
  return `Build a practical ${starter.label.toLowerCase()} plan for ${group} traveling from the Phoenix area${date ? ` on ${date}` : ''}. We can drive up to ${drive} minutes. Start with ${match.name} in ${match.region}. Explain the best time to go, a realistic itinerary, safety and heat considerations, food nearby, costs to verify, and a backup plan. Confirm current weather, hours, fees, closures, dog rules, and accessibility details before presenting them as current facts.`;
}

interface ArizonaQuickFinderProps {
  disabled?: boolean;
  onPlan: (prompt: string) => void;
}

const ArizonaQuickFinder: React.FC<ArizonaQuickFinderProps> = ({ disabled = false, onPlan }) => {
  const [starter, setStarter] = useState<Starter | null>(null);
  const [startingArea, setStartingArea] = useState('Phoenix');
  const [group, setGroup] = useState<KidAgeGroup>('mixed');
  const [date, setDate] = useState('');
  const [maxDriveMinutes, setMaxDriveMinutes] = useState(120);
  const [showResults, setShowResults] = useState(false);

  const matches = useMemo(() => {
    if (!starter) return [];
    return getFamilyAdventureMatches({
      location: startingArea,
      hasKids: group !== 'teens',
      activity: starter.activity,
      length: starter.length,
      season: seasonForDate(date),
      kidAgeGroup: group,
      wantsShade: Boolean(starter.wantsShade),
      needsBathrooms: Boolean(starter.needsBathrooms),
      needsStrollerAccess: Boolean(starter.needsStrollerAccess),
      maxDriveMinutes,
    });
  }, [date, group, maxDriveMinutes, starter, startingArea]);

  const reset = () => {
    setStarter(null);
    setShowResults(false);
  };

  return (
    <section aria-labelledby="arizona-finder-title" className="border-b border-zinc-200 bg-gradient-to-br from-amber-50 via-white to-emerald-50/70 px-4 py-6 md:px-6 md:py-7">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-primary">Start exploring Arizona</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="arizona-finder-title" className="mt-2 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl">
              {starter ? `Find your best ${starter.label.toLowerCase()}` : 'What kind of adventure are you looking for?'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 md:text-base">
              {starter ? 'Four quick details help Sage rank options that fit your actual day.' : 'Choose a starting point for personalized Phoenix-area recommendations.'}
            </p>
          </div>
          {starter && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 self-start rounded-full border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-50">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Change adventure
            </button>
          )}
        </div>

        {!starter ? (
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {STARTERS.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.key} type="button" onClick={() => setStarter(item)} disabled={disabled} aria-label={`${item.label}: ${item.description}`} className="group flex min-h-[104px] items-start gap-3 rounded-2xl border border-zinc-200/90 bg-white/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white"><Icon className="h-4.5 w-4.5" strokeWidth={2.25} /></span>
                  <span><span className="block text-sm font-bold leading-5 text-zinc-900">{item.label}</span><span className="mt-1 block text-xs leading-4 text-zinc-500">{item.description}</span></span>
                </button>
              );
            })}
          </div>
        ) : !showResults ? (
          <form className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:p-5" onSubmit={(event) => { event.preventDefault(); setShowResults(true); }}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm font-bold text-zinc-800"><span className="mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-primary" />Starting area</span><select value={startingArea} onChange={(event) => setStartingArea(event.target.value)} className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-normal"><option>Phoenix</option><option>East Valley</option><option>West Valley</option><option>North Valley</option></select></label>
              <label className="text-sm font-bold text-zinc-800"><span className="mb-2 block">Who is going?</span><select value={group} onChange={(event) => setGroup(event.target.value as KidAgeGroup)} className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-normal">{GROUPS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
              <label className="text-sm font-bold text-zinc-800"><span className="mb-2 flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brand-primary" />When?</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-normal" /></label>
              <label className="text-sm font-bold text-zinc-800"><span className="mb-2 flex items-center gap-2"><Car className="h-4 w-4 text-brand-primary" />Maximum drive</span><select value={maxDriveMinutes} onChange={(event) => setMaxDriveMinutes(Number(event.target.value))} className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 font-normal"><option value={45}>45 minutes</option><option value={90}>90 minutes</option><option value={120}>2 hours</option><option value={180}>3 hours</option><option value={240}>4 hours</option></select></label>
            </div>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 font-bold text-white hover:bg-brand-primary sm:w-auto"><Sparkles className="h-4 w-4" />Show my best matches</button>
          </form>
        ) : (
          <div className="mt-5" aria-live="polite">
            <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-bold text-zinc-800">Top matches for your group</p><button type="button" onClick={() => setShowResults(false)} className="text-xs font-bold text-brand-primary hover:underline">Edit answers</button></div>
            <div className="grid gap-3 lg:grid-cols-3">
              {matches.map((match) => (
                <article key={match.slug} className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wide text-brand-primary">{match.fitLabel}</p><h3 className="mt-1 text-lg font-black text-zinc-950">{match.name}</h3><p className="mt-1 text-xs text-zinc-500">{match.region} · about {match.driveMinutesFromPhoenix} min from Phoenix</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">{match.score}% fit</span></div>
                  <ul className="mt-4 space-y-2 text-sm leading-5 text-zinc-700">{match.reasons.slice(0, 3).map((reason) => <li key={reason} className="flex gap-2"><span className="text-emerald-600">✓</span><span>{reason}</span></li>)}</ul>
                  <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-950"><strong>Plan around:</strong> {match.caution}</div>
                  <p className="mt-3 text-xs leading-5 text-zinc-600"><strong>Food nearby:</strong> {match.nearbyFood.join(', ')}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-600"><strong>Backup:</strong> {match.backupPlans[0]}</p>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-4"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${match.name}, Arizona`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-3 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-50">Open map</a><button type="button" disabled={disabled} onClick={() => onPlan(buildSagePrompt(starter, match, date, GROUPS.find((item) => item.value === group)?.label || group, maxDriveMinutes))} className="rounded-xl bg-zinc-950 px-3 py-2.5 text-xs font-bold text-white hover:bg-brand-primary disabled:opacity-50">Plan with Sage</button></div>
                </article>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-zinc-500">Fit scores use Sage’s destination data and seasonal safety rules. Verify live weather, closures, hours, fees, and access conditions before leaving.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArizonaQuickFinder;
