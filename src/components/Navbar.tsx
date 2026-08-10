import React from "react";
import { MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import { BRAND_NAME, SUBSCRIBE_URL, LOGO_DATA_URL } from "../constants";
import BrandNetworkBar from "./BrandNetworkBar";
import { buildCrossSiteUrl } from "../utils/crossSiteLinks";
import { trackEvent } from "../utils/analytics";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 backdrop-blur-md">
      <BrandNetworkBar />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3">
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-110">
              <img
                src={LOGO_DATA_URL}
                alt={BRAND_NAME}
                className="h-full w-full object-contain"
              />
            </div>

            <span className="hidden sm:block">
              <span className="block text-xl font-[900] uppercase leading-none tracking-tighter text-black">
                {BRAND_NAME}
              </span>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.18em] text-teal-700">
                Sage family trip planner
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 text-[12px] font-bold uppercase tracking-widest text-zinc-500 xl:gap-6 lg:flex">
            <Link to="/start-here" className="transition-colors hover:text-black">
              Start Here
            </Link>

            <Link to="/explore" className="transition-colors hover:text-black">
              Explore
            </Link>

            <Link
              to="/trail-guides"
              className="transition-colors hover:text-black"
            >
              Trail Guides
            </Link>

            <Link to="/arizona" className="transition-colors hover:text-black">
              Arizona
            </Link>

            <Link
              to="/arizona/plan-by-situation"
              className="transition-colors hover:text-black"
            >
              Plan
            </Link>

            <Link to="/community" className="transition-colors hover:text-black">
              Community
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 lg:ml-8 xl:ml-12">
          <Link
            to="/my-trips"
            aria-label="Open saved trips"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-800 transition-colors hover:bg-emerald-100"
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden xl:inline">My Trips</span>
          </Link>

          <Link
            to="/chat"
            className="hidden rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-zinc-800 transition-colors hover:bg-zinc-100 md:block"
          >
            Sage AI Planner
          </Link>

          <Link
            to="/trip-builder"
            className="hidden rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-emerald-800 transition-colors hover:bg-emerald-100 sm:block"
          >
            Build My Trip
          </Link>

          <a
            href={buildCrossSiteUrl({
              destination: 'subscribe',
              medium: 'cta',
              campaign: 'sage_navigation',
              content: 'navbar_get_trip_ideas',
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('sage_to_newsletter', {
                location: 'navbar',
                destination_url: SUBSCRIBE_URL,
              })
            }
            className="rounded-lg bg-brand-primary px-5 py-2.5 text-[12px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-900/10 transition-all hover:bg-brand-dark active:scale-95 md:px-6 md:text-[13px]"
          >
            Get Trip Ideas
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
