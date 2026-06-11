import React from 'react';
import { AlertTriangle, CheckCircle2, Clock3, Sandwich, ShieldCheck } from 'lucide-react';

interface ParentRealityCheckCardProps {
  hasKids: boolean;
  season: string;
  tripLength: string;
  wantsShade: boolean;
  needsBathrooms: boolean;
}

const ParentRealityCheckCard: React.FC<ParentRealityCheckCardProps> = ({
  hasKids,
  season,
  tripLength,
  wantsShade,
  needsBathrooms,
}) => {
  const isWarmSeason = ['Spring', 'Summer', 'Fall'].includes(season);
  const isLongTrip = tripLength === 'Full Day' || tripLength === 'Weekend';

  const realityNotes = [
    {
      icon: Clock3,
      title: 'Best start time',
      detail: isWarmSeason
        ? 'Start early and keep the hottest part of the day flexible.'
        : 'A mid-morning start usually gives you a calmer pace and better light.',
    },
    {
      icon: ShieldCheck,
      title: hasKids ? 'Kid energy warning' : 'Energy pacing',
      detail: hasKids
        ? 'Make the first outdoor stop short, rewarding, and easy to bail out of.'
        : 'Keep one low-effort scenic stop ready in case the day runs long.',
    },
    {
      icon: AlertTriangle,
      title: 'Bathroom reality',
      detail: needsBathrooms
        ? 'Confirm bathrooms before leaving. Desert confidence is not a restroom strategy.'
        : 'Bathrooms are not the main priority here, but still check before committing.',
    },
    {
      icon: Sandwich,
      title: 'Snack strategy',
      detail: hasKids
        ? 'Pack food before anyone becomes a tiny courtroom attorney with low blood sugar.'
        : 'Bring easy snacks so the trip does not become a gas-station nutrition documentary.',
    },
    {
      icon: CheckCircle2,
      title: 'Backup move',
      detail: isLongTrip || wantsShade
        ? 'Have one shaded, indoor, or easier stop ready before you need it.'
        : 'Pick one easier backup stop nearby so the day can still feel like a win.',
    },
  ];

  return (
    <article className="rounded-3xl border border-sky-200 bg-sky-50 p-5 text-zinc-950">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-sky-700">
            Parent reality check
          </p>
          <h3 className="text-xl font-black">Will this still feel good at 11:30?</h3>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {realityNotes.map((note) => {
          const Icon = note.icon;

          return (
            <div key={note.title} className="rounded-2xl border border-sky-100 bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-sky-700" />
                <p className="font-black text-zinc-950">{note.title}</p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">{note.detail}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default ParentRealityCheckCard;
