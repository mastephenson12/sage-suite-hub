import React from "react";
import { Link } from "react-router-dom";
import { BRAND_NAME, SUBSCRIBE_URL, LOGO_DATA_URL } from "../constants";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/95 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-110">
              <img
                src={LOGO_DATA_URL}
                alt={BRAND_NAME}
                className="h-full w-full object-contain"
              />
            </div>

            <span className="hidden text-xl font-[900] uppercase tracking-tighter text-black sm:block">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-[12px] font-bold uppercase tracking-widest text-zinc-500 xl:gap-7 lg:flex">
            <Link to="/explore" className="transition-colors hover:text-black">
              Explore
            </Link>

            <Link to="/archive" className="transition-colors hover:text-black">
              Archive
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
              to="/arizona/hikes-with-kids"
              className="transition-colors hover:text-black"
            >
              Kids Hikes
            </Link>

            <Link to="/community" className="transition-colors hover:text-black">
              Community
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 lg:ml-8 xl:ml-12">
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
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-brand-primary px-5 py-2.5 text-[12px] font-black uppercase tracking-wider text-white shadow-lg shadow-brand-primary/10 transition-all hover:bg-brand-dark active:scale-95 md:px-6 md:text-[13px]"
          >
            Get Trip Ideas
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
