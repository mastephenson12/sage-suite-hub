import React from 'react';
import { Link } from 'react-router-dom';

const Arizona: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">
          Arizona Adventures
        </p>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
          Explore Arizona
        </h1>

        <p className="text-lg text-zinc-500 mb-12 max-w-2xl">
          Choose a destination and let Sage help you plan the perfect trip.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-3xl">
            <h2 className="font-black text-xl mb-3">Sedona</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Red rock hikes, jeep tours, and family adventures.
            </p>
            <Link
  to="/archive/sedona-family-adventure"
  className="inline-flex items-center justify-center bg-brand-primary text-white px-5 py-3 rounded-xl font-black text-xs uppercase"
>
  View Sedona Guide
</Link>
          </div>

          <div className="p-6 border rounded-3xl opacity-60">
            <h2 className="font-black text-xl mb-3">Grand Canyon</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Scenic overlooks and epic canyon views.
            </p>
            <button disabled className="bg-zinc-200 px-5 py-3 rounded-xl text-xs uppercase font-black">
              Coming Soon
            </button>
          </div>

          <div className="p-6 border rounded-3xl opacity-60">
            <h2 className="font-black text-xl mb-3">Flagstaff</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Pines, mountains, and cooler summer hikes.
            </p>
            <button disabled className="bg-zinc-200 px-5 py-3 rounded-xl text-xs uppercase font-black">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arizona;
