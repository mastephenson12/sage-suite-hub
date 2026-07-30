import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface TripConfidenceBreakdownCardProps {
  hasKids: boolean;
  wantsShade: boolean;
  needsBathrooms: boolean;
  tripLength: string;
  season: string;
}

const TripConfidenceBreakdownCard: React.FC<TripConfidenceBreakdownCardProps> = ({
  hasKids,
  wantsShade,
  needsBathrooms,
  tripLength,
  season,
}) => {
  const isWarmSeason = ['Spring', 'Summer', 'Fall'].includes(season);
  const isLongTrip = tripLength === 'Full Day' || tripLength === 'Weekend';

  const breakdown = [
    {
      label: 'Kid-fit',
      status: hasKids ? 'Strong' : 'Not kid-focused',
      caution: false,
    },
    {
      label: 'Shade',
      status: wantsShade ? 'Prioritized' : 'Flexible',
      caution: !wantsShade && isWarmSeason,
    },
    {
      label: 'Bathrooms',
      status: needsBathrooms ? 'Prioritized' : 'Confirm before leaving',
      caution: !needsBathrooms,
    },
    {
      label: 'Drive time',
      status: isLongTrip ? 'Plan breaks' : 'Reasonable',
      caution: isLongTrip,
    },
    {
      label: 'Heat risk',
      status: isWarmSeason ? 'Watch afternoon timing' : 'Lower risk',
      caution: isWarmSeason,
    },
  ];

  return (
    <article className="rounded-3xl border border-white/10 bg-white p-5 text-zinc-950">
      <div className="mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">
          Trip confidence breakdown
        </p>
        <h3 className="mt-1 text-xl font-black">Why this plan scores well</h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {breakdown.map((item) => {
          const Icon = item.caution ? AlertTriangle : CheckCircle2;

          return (
            <div key={item.label} className="flex gap-3 rounded-2xl bg-zinc-50 p-3">
              <Icon
                className={`mt-[2px] h-4 w-4 flex-shrink-0 ${
                  item.caution ? 'text-orange-500' : 'text-emerald-600'
                }`}
              />
              <div>
                <p className="text-sm font-black text-zinc-950">{item.label}</p>
                <p className="text-sm leading-relaxed text-zinc-600">{item.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default TripConfidenceBreakdownCard;
