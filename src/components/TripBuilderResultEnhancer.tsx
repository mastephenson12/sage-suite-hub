import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SaveTripPlanCard from './SaveTripPlanCard';
import ParentRealityCheckCard from './ParentRealityCheckCard';
import { getFamilyTripFacts, formatFamilyTripFacts } from '../data/familyTripFacts';
import { SavedTripSection } from '../utils/savedTrips';
import { trackEvent } from '../utils/analytics';

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

type Props = { itinerary: Array<{time: string; title: string; description: string}>; sections?: SavedTripSection[]; personalizing?: boolean };
export default function TripBuilderResultEnhancer({ itinerary, sections = [], personalizing = false }: Props) {
  const [params] = useSearchParams();
  const [checkedItems, setCheckedItems] = React.useState<string[]>([]);
  const [includeToddlers, setIncludeToddlers] = React.useState(false);
  const pretty = (value: string | null, fallback: string) => value ? value.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : fallback;
  const location = pretty(params.get('location'), 'Arizona');
  const season = pretty(params.get('season'), 'Your season');
  const tripLength = pretty(params.get('length'), 'Day trip');
  const hasKids = params.get('kids') !== 'no';
  const groupLabel = hasKids ? pretty(params.get('ages'), 'Mixed ages') : 'Adults only';
  const wantsShade = params.get('shade') !== 'false';
  const needsBathrooms = params.get('bathrooms') !== 'false';
  const facts = getFamilyTripFacts(location);
  const packingItems = buildPackingItems({ hasKids, wantsShade, needsBathrooms, season, includeToddlers });
  const checkedCount = packingItems.filter(item => checkedItems.includes(item.id)).length;
  const key = params.toString();
  React.useEffect(() => {
    const eventKey = `sage.trip-pack-generated:${key}`;
    if (window.sessionStorage.getItem(eventKey)) return;
    trackEvent('trip_pack_generated', { destination: location, trip_length: tripLength, group: groupLabel, source: params.get('source') || 'sage' });
    if (params.get('source') === 'health-travels-matcher') trackEvent('health_matcher_to_sage', { destination: location });
    window.sessionStorage.setItem(eventKey, '1');
  }, [key, location, tripLength, groupLabel, params]);
  const foodParams = new URLSearchParams({location, meal: 'Sit-down meal'});
  if (params.get('needs')) foodParams.set('needs', params.get('needs')!);
  const chatParams = new URLSearchParams({ mode: 'arizona', trip: params.get('location') || 'arizona', prompt: `Help me refine this ${location} plan for ${groupLabel}, ${tripLength}, ${season}. Preserve my shade and bathroom preferences and help me check current conditions.` });
  const savedItinerary = [
    ...(facts ? [{ title: 'Destination details', description: formatFamilyTripFacts(facts) }] : []),
    ...sections,
    ...itinerary.map(item => ({ title: `${item.time} — ${item.title}`, description: item.description })),
  ];
  return <section className="mt-8 space-y-6" aria-label="Keep and prepare your plan">
    <SaveTripPlanCard key={key} destination={location} season={season} tripLength={tripLength} groupLabel={groupLabel} wantsShade={wantsShade} needsBathrooms={needsBathrooms} dietaryNeeds={pretty(params.get('needs'), 'No special request')} tripUrl={`${window.location.origin}/trip-builder?${key}`} itinerary={savedItinerary} packingItems={packingItems.map(item => ({id:item.id,label:item.label,helper:item.helper,packed:checkedItems.includes(item.id)}))} personalizing={personalizing} />
    <details className="journey-disclosure"><summary>Before you leave · packing checklist ({checkedCount}/{packingItems.length})</summary>
      {hasKids && <label className="mb-5 flex gap-3 rounded-xl bg-slate-50 p-4"><input type="checkbox" checked={includeToddlers} onChange={e => setIncludeToddlers(e.target.checked)} /><span>Add toddler clothes and a carrier / stroller reminder</span></label>}
      <ul className="grid gap-3 sm:grid-cols-2">{packingItems.map(item => <li key={item.id}><label className="flex h-full cursor-pointer gap-3 rounded-xl border border-slate-200 p-4"><input type="checkbox" checked={checkedItems.includes(item.id)} onChange={() => {setCheckedItems(current => current.includes(item.id) ? current.filter(id => id !== item.id) : [...current,item.id]); trackEvent('packing_checklist_toggle', {destination:location,item:item.id});}} /><span><strong className="block">{item.label}</strong><span className="text-sm text-slate-600">{item.helper}</span></span></label></li>)}</ul>
    </details>
    <details className="journey-disclosure"><summary>Family pacing and backup reminders</summary><ParentRealityCheckCard hasKids={hasKids} season={season} tripLength={tripLength} wantsShade={wantsShade} needsBathrooms={needsBathrooms} /></details>
    <details className="journey-disclosure"><summary>Refine this plan or find food nearby</summary><div className="flex flex-wrap gap-4"><Link className="font-bold text-blue-900 underline" to={`/chat?${chatParams}`}>Refine with Sage</Link><Link className="font-bold text-blue-900 underline" to={`/arizona/food-stop-finder?${foodParams}`}>Find food nearby</Link><a className="font-bold text-blue-900 underline" href="https://healthandtravels.com/arizona">Explore more Arizona guides</a></div></details>
  </section>;
}
