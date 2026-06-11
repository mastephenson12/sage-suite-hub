import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Map, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const benefits = [
  {
    icon: Map,
    title: 'Fresh Arizona ideas',
    description: 'Get family-friendly places, easy trails, and weekend trip ideas without digging through the internet swamp.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety-first reminders',
    description: 'Heat, timing, water, shade, kid-fit notes, and backup plans stay front and center.',
  },
  {
    icon: Users,
    title: 'Built for real families',
    description: 'Trips are framed around bathrooms, food, drive time, and energy levels, the glamorous realities of parenthood.',
  },
];

const NewsletterConversionPanel: React.FC = () => {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-zinc-200 bg-gradient-to-br from-orange-50 via-white to-emerald-50 shadow-sm">
        <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-orange-600">
              <Sparkles className="h-4 w-4" />
              Keep the adventure going
            </div>

            <h2 className="text-3xl font-black tracking-tight text-zinc-950 md:text-5xl">
              Get Arizona family trip ideas before the weekend sneaks up like a tiny scheduling criminal.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">
              Sage helps with the plan. Health & Travels helps you keep finding new ideas:
              easy hikes, cooler escapes, food stops, places to stay, and practical family safety notes.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://healthandtravels.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('health_travels_ideas_click', {
                    label: 'Get Free Trip Ideas',
                    location: 'newsletter_conversion_panel',
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-zinc-800"
              >
                <Mail className="h-4 w-4" />
                Get Free Trip Ideas
              </a>

              <Link
                to="/trip-builder"
                onClick={() =>
                  trackEvent('plan_another_trip_click', {
                    label: 'Plan Another Trip',
                    location: 'newsletter_conversion_panel',
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-900 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
              >
                Plan Another Trip
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="rounded-3xl border border-zinc-200 bg-white/90 p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="mb-1 text-lg font-black text-zinc-950">{benefit.title}</h3>
                      <p className="text-sm leading-relaxed text-zinc-600">{benefit.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="rounded-3xl bg-zinc-950 p-5 text-white">
              <p className="text-sm font-semibold leading-relaxed text-zinc-200">
                Best placement: after someone understands Sage, not before. Asking too early is how websites become digital mall kiosks with a clipboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterConversionPanel;
