import React, { useMemo, useState } from 'react';
import { ExternalLink, MapPin, PhoneCall, Search, Share2, ShoppingBasket } from 'lucide-react';
import SEOJsonLd from '../components/SEOJsonLd';
import { trackEvent } from '../utils/analytics';

const destinations = ['Phoenix', 'Scottsdale', 'Tucson', 'Sedona', 'Flagstaff', 'Payson', 'Prescott', 'Yuma', 'Lake Havasu City', 'Show Low', 'Pinetop-Lakeside', 'Bisbee', 'Williams', 'Cottonwood', 'Jerome', 'Page', 'Grand Canyon Village', 'Oro Valley'];
const needs = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut allergy', 'Egg allergy', 'Halal', 'Kosher'];
const meals = ['Sit-down meal', 'Quick stop', 'Breakfast', 'Grocery or picnic'];

const mapsUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export default function ArizonaFoodStopFinder() {
  const params = new URLSearchParams(window.location.search);
  const [location, setLocation] = useState(params.get('location') || '');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(params.get('needs')?.split(',').filter((need) => needs.includes(need)) || []);
  const [meal, setMeal] = useState(params.get('meal') || meals[0]);
  const [showResults, setShowResults] = useState(Boolean(params.get('location')));
  const [copied, setCopied] = useState('');

  const needText = selectedNeeds.length ? selectedNeeds.join(' and ') : 'family-friendly';
  const restaurantQuery = `${needText} ${meal.toLowerCase()} in ${location || 'Arizona'}`;
  const groceryQuery = `${needText} grocery store in ${location || 'Arizona'}`;
  const callScript = useMemo(() => {
    const restriction = selectedNeeds.length ? selectedNeeds.join(', ') : 'our family’s dietary needs';
    return `Hi, we’re traveling with ${restriction}. Before we come in, can you tell me which menu items may work, whether you use shared fryers or grills, and what steps you take to reduce cross-contact?`;
  }, [selectedNeeds]);

  const updateNeed = (need: string) => setSelectedNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need]);
  const buildPlan = (event: React.FormEvent) => {
    event.preventDefault();
    setShowResults(true);
    const next = new URL(window.location.href);
    next.searchParams.set('location', location.trim());
    next.searchParams.set('meal', meal);
    selectedNeeds.length ? next.searchParams.set('needs', selectedNeeds.join(',')) : next.searchParams.delete('needs');
    window.history.replaceState({}, '', next);
    trackEvent('food_stop_finder_submit', { location: location.trim(), dietary_needs: selectedNeeds.join('|') || 'none', meal_type: meal });
  };
  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(''), 1800);
  };

  return (
    <>
      <SEOJsonLd
        title="Arizona Family Food Stop Finder | Sage"
        description="Find useful Arizona restaurant and grocery searches for your family's dietary needs, plus questions to ask before you eat."
        url="https://sage.healthandtravels.com/arizona/food-stop-finder"
        faqs={[
          { question: 'Does a dietary label guarantee a restaurant is allergy-safe?', answer: 'No. Menus and search labels can be incomplete. Contact the restaurant directly about ingredients, preparation, shared equipment, and cross-contact.' },
          { question: 'What should families ask before choosing a food stop?', answer: 'Ask about current ingredients, substitutions, shared fryers or grills, separate preparation space, and whether staff can reliably accommodate the specific need.' },
        ]}
      />
      <div className="bg-amber-50/60">
        <header className="mx-auto max-w-5xl px-6 pb-10 pt-14 text-center md:pt-20">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-700">Arizona family travel tool</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 md:text-6xl">Find a food stop that fits your family.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-zinc-600">Build focused live searches, then use a simple call-ahead script to verify what matters before everyone gets hungry.</p>
        </header>

        <main className="mx-auto max-w-5xl px-6 pb-20">
          <form onSubmit={buildPlan} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm md:p-9">
            <label htmlFor="food-location" className="block text-sm font-black uppercase tracking-wider text-zinc-800">Where in Arizona?</label>
            <input id="food-location" list="arizona-food-destinations" required value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Try Sedona, Tucson, or Flagstaff" className="mt-2 w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
            <datalist id="arizona-food-destinations">{destinations.map((destination) => <option key={destination} value={destination} />)}</datalist>

            <fieldset className="mt-7">
              <legend className="text-sm font-black uppercase tracking-wider text-zinc-800">Dietary needs (choose all that apply)</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-4">{needs.map((need) => <label key={need} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-bold ${selectedNeeds.includes(need) ? 'border-emerald-600 bg-emerald-50 text-emerald-900' : 'border-zinc-200 text-zinc-700'}`}><input type="checkbox" checked={selectedNeeds.includes(need)} onChange={() => updateNeed(need)} className="mr-2 accent-emerald-700" />{need}</label>)}</div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="text-sm font-black uppercase tracking-wider text-zinc-800">What kind of stop?</legend>
              <div className="mt-3 flex flex-wrap gap-2">{meals.map((option) => <label key={option} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-bold ${meal === option ? 'border-blue-700 bg-blue-50 text-blue-900' : 'border-zinc-200 text-zinc-700'}`}><input type="radio" name="meal" value={option} checked={meal === option} onChange={() => setMeal(option)} className="sr-only" />{option}</label>)}</div>
            </fieldset>

            <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-emerald-800 sm:w-auto"><Search className="h-5 w-5" />Build my food-stop plan</button>
          </form>

          {showResults && location.trim() && <section aria-live="polite" className="mt-8 space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <a href={mapsUrl(restaurantQuery)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('food_stop_maps_click', { search_type: 'restaurant', location })} className="rounded-2xl bg-blue-900 p-6 text-white transition hover:bg-blue-950"><MapPin className="h-7 w-7" /><h2 className="mt-4 text-xl font-black">Search restaurants</h2><p className="mt-2 text-sm leading-6 text-blue-100">Open a focused Google Maps search for {restaurantQuery}.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">Open live results <ExternalLink className="h-4 w-4" /></span></a>
              <a href={mapsUrl(groceryQuery)} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('food_stop_maps_click', { search_type: 'grocery', location })} className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-950 transition hover:border-emerald-400"><ShoppingBasket className="h-7 w-7 text-emerald-700" /><h2 className="mt-4 text-xl font-black">Find backup groceries</h2><p className="mt-2 text-sm leading-6 text-zinc-600">A picnic or familiar packaged food can be the easier backup when a restaurant cannot confirm your needs.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">Open grocery results <ExternalLink className="h-4 w-4" /></span></a>
            </div>
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6">
              <div className="flex items-center gap-3"><PhoneCall className="h-6 w-6 text-amber-800" /><h2 className="text-xl font-black text-zinc-950">Call before you count on it</h2></div>
              <p className="mt-4 rounded-xl bg-white p-4 text-sm leading-7 text-zinc-700">“{callScript}”</p>
              <button type="button" onClick={() => copy(callScript, 'script')} className="mt-3 text-sm font-black text-amber-900 underline">{copied === 'script' ? 'Copied!' : 'Copy call-ahead script'}</button>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-zinc-700 md:grid-cols-2"><li>• Confirm the ingredients are current.</li><li>• Ask about shared fryers, grills, and utensils.</li><li>• Ask whether substitutions are actually available.</li><li>• Save a grocery or packed-food backup.</li></ul>
            </div>
            <div className="rounded-2xl border border-red-200 bg-white p-6 text-sm leading-6 text-zinc-700"><strong className="text-zinc-950">Important:</strong> Search results, reviews, and menu labels do not prove a kitchen is allergy-safe. For a severe allergy, confirm details directly, carry prescribed emergency medication and safe backup food, and skip the stop if you cannot verify it.</div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => copy(window.location.href, 'link')} className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-black"><Share2 className="h-4 w-4" />{copied === 'link' ? 'Link copied!' : 'Copy this plan'}</button>
              <a href={`https://healthandtravels.com/arizona-family-food-stops-dietary-needs.html?location=${encodeURIComponent(location)}&needs=${encodeURIComponent(selectedNeeds.join(','))}&meal=${encodeURIComponent(meal)}&utm_source=sage&utm_medium=planner&utm_campaign=arizona_food_stops`} className="inline-flex items-center rounded-xl px-5 py-3 text-sm font-black text-blue-900 underline">Read the family food-stop guide</a>
            </div>
          </section>}
        </main>
      </div>
    </>
  );
}
