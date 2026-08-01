import { Link } from 'react-router-dom';

const proofPoints = [
  'Arizona family travel guides are organized by drive time, season, shade, bathrooms, food, water, and backup options.',
  'Sage connects the Health & Travels travel journal, practical Arizona guides, and the AI trip planner into one planning path.',
  'Guide pages are written for parents, grandparents, visiting families, and groups who need realistic logistics before they leave home.',
];

const standards = [
  'Family logistics snapshot',
  'Heat and season notes',
  'Bathroom and shade reality check',
  'Food and water planning',
  'Backup safety plan',
  'Clear links to related guides',
];

export default function AuthorityTrustPanel() {
  return (
    <section className="border-y border-zinc-100 bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-brand-primary">
            Health & Travels Ecosystem
          </p>
          <h2 className="mb-6 text-4xl font-black uppercase tracking-tighter text-zinc-950 md:text-5xl">
            Built to answer the questions Arizona families ask before they go.
          </h2>
          <p className="max-w-xl text-base leading-8 text-zinc-600">
            Sage is the planning side of Health & Travels. The goal is not just
            to list pretty places. It is to help families decide if an outing is
            realistic today, what to bring, when to go, and what to do if the
            original plan stops making sense.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="rounded-lg bg-zinc-950 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-zinc-800"
            >
              About Sage
            </Link>
            <Link
              to="/editorial-standards"
              className="rounded-lg border border-zinc-200 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-800 transition-colors hover:border-zinc-400"
            >
              Editorial Standards
            </Link>
            <Link
              to="/author/mark-stephenson"
              className="rounded-lg border border-zinc-200 px-5 py-3 text-[11px] font-black uppercase tracking-widest text-zinc-800 transition-colors hover:border-zinc-400"
            >
              Author Profile
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-6">
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-zinc-500">
              What We Verify
            </h3>
            <div className="grid gap-3">
              {standards.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white bg-white px-4 py-3 text-sm font-bold text-zinc-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-100 bg-zinc-950 p-6 text-white">
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-zinc-400">
              Why This Helps
            </h3>
            <div className="space-y-5">
              {proofPoints.map((point) => (
                <p key={point} className="text-sm leading-7 text-zinc-300">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
