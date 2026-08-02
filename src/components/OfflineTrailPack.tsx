import React from 'react';
import { Download, ExternalLink, MapPin, Printer, WifiOff } from 'lucide-react';
import type { Trail } from '../data/trails';

type OfflineTrailPackProps = {
  trail: Trail;
  safetyTitle?: string;
  safetyMessage?: string;
  safetySuggestion?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripMarkdown(value: string): string {
  return value
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*/g, '')
    .replace(/^- /gm, '- ')
    .trim();
}

function buildOfflineNotes({
  trail,
  safetyTitle,
  safetyMessage,
  safetySuggestion,
}: OfflineTrailPackProps): string {
  const mapLink =
    trail.allTrailsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${trail.name} ${trail.location}`)}`;

  return [
    `${trail.name} Offline Trail Pack`,
    '',
    `Location: ${trail.location}`,
    `Difficulty: ${trail.difficulty}`,
    `Distance: ${trail.distance}`,
    `Elevation gain: ${trail.elevationGain}`,
    `Estimated time: ${trail.time}`,
    `Map link to open before leaving service: ${mapLink}`,
    '',
    'Before You Go',
    '- Download the area in your preferred maps app before driving to the trailhead.',
    '- Take a screenshot of the route, parking lot, and return path.',
    '- Tell someone where you are going and when you expect to be back.',
    '- Bring more water than you think you need.',
    '- Turn around early if heat, storms, daylight, or kid energy changes.',
    '',
    'Sage Safety Note',
    safetyTitle ? `${safetyTitle}` : 'Check weather, water, daylight, and parking before you start.',
    safetyMessage ? safetyMessage : '',
    safetySuggestion ? safetySuggestion : '',
    '',
    'Trail Notes',
    trail.description,
    '',
    stripMarkdown(trail.intel),
    '',
    'Emergency Reminder',
    'If someone is injured, lost, overheated, or in danger, call 911. Do not rely on this file as your only navigation source.',
  ]
    .filter((line) => line !== undefined)
    .join('\n');
}

const OfflineTrailPack: React.FC<OfflineTrailPackProps> = ({
  trail,
  safetyTitle,
  safetyMessage,
  safetySuggestion,
}) => {
  const mapUrl =
    trail.allTrailsUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${trail.name} ${trail.location}`)}`;

  const handleDownload = () => {
    const notes = buildOfflineNotes({ trail, safetyTitle, safetyMessage, safetySuggestion });
    const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${slugify(trail.name)}-offline-trail-pack.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="border-y border-zinc-200 bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
            <WifiOff className="h-4 w-4" aria-hidden="true" />
            Offline safety pack
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Save the basics before service gets spotty
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">
            Download a simple offline note for {trail.name} with distance, elevation,
            timing, safety reminders, and map links to open before you leave signal.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-zinc-950 transition hover:bg-zinc-200"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download pack
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/20"
          >
            <Printer className="h-4 w-4" aria-hidden="true" />
            Print page
          </button>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/20"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Open map
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default OfflineTrailPack;
