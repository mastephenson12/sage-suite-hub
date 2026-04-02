import React, { useState } from 'react';

type ActivityType = 'hike' | 'relax' | 'explore';

const TripBuilder: React.FC = () => {
  const [location, setLocation] = useState('');
  const [hasKids, setHasKids] = useState('yes');
  const [activity, setActivity] = useState<ActivityType>('explore');
  const [result, setResult] = useState<string | null>(null);

  const handleBuildTrip = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanLocation = location.trim() || 'Arizona';

    const tripText = `Here’s a simple ${activity} plan for ${
      hasKids === 'yes' ? 'a family with kids' : 'adults'
    } near ${cleanLocation}.`;

    setResult(tripText);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">
            Trip Builder
          </p>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Tell Sage what kind of trip you want
          </h1>

          <p className="text-lg text-zinc-600">
            Start simple. We are helping real families find a real trip.
          </p>
        </div>

        <form
          onSubmit={handleBuildTrip}
          className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 md:p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold mb-2">
              Where do you want to go?
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Sedona, Flagstaff, Phoenix..."
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Are kids coming?
            </label>
            <select
              value={hasKids}
              onChange={(e) => setHasKids(e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="yes">Yes, kids are coming</option>
              <option value="no">No, adults only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              What kind of day do you want?
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityType)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-zinc-400"
            >
              <option value="hike">Hiking adventure</option>
              <option value="explore">Explore a town / mixed day</option>
              <option value="relax">Easy scenic day</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto inline-flex items-center justify-center rounded-2xl px-8 py-4 text-lg font-semibold bg-black text-white hover:opacity-90 transition"
          >
            Build My Trip
          </button>
        </form>

        {result && (
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">Your Starter Plan</h2>
            <p className="text-zinc-700 text-lg mb-6">{result}</p>

            <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5">
              <h3 className="text-lg font-bold mb-2">Want the full version?</h3>
              <p className="text-zinc-700 mb-4">
                Get the full trip plan, stops, and packing ideas sent to your email.
              </p>

              <button className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold bg-orange-500 text-white hover:opacity-90 transition">
                Email Me the Full Plan
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default TripBuilder;
