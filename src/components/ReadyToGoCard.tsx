import React, { useEffect, useState } from 'react';
import { buildReadyToGoDocument, papagoReadyToGo } from '../data/readyToGo';
import '../styles/ready-to-go.css';

const card = papagoReadyToGo;
const storageKey = 'sage-ready-to-go-papago-v1';

export default function ReadyToGoCard({ wantsShade = false, needsStrollerAccess = false }: { wantsShade?: boolean; needsStrollerAccess?: boolean }) {
  const [checked, setChecked] = useState<boolean[]>(() => card.checklist.map(() => false));
  const [status, setStatus] = useState('');
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (Array.isArray(saved)) setChecked(card.checklist.map((_, i) => saved[i] === true));
    } catch { setStatus('Checkmarks cannot be remembered in this browser. You can still download or print your card.'); }
  }, []);
  useEffect(() => {
    if (window.location.hash === '#ready-to-go') document.getElementById('ready-to-go')?.scrollIntoView();
  }, []);

  function toggle(index: number) {
    const next = checked.map((value, i) => i === index ? !value : value);
    setChecked(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { setStatus('Your checkmarks work for this visit but could not be saved on this device.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([buildReadyToGoDocument(card, checked)], { type: 'text/html;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'papago-park-ready-to-go.html';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    setStatus('Download requested. Open papago-park-ready-to-go.html from your downloads to confirm it saved. The card reads offline; linked maps and conditions need internet.');
  }
  function print() {
    const frame = document.createElement('iframe');
    frame.title = 'Printable Papago Park card';
    frame.style.cssText = 'position:fixed;width:1px;height:1px;bottom:0;left:0;border:0;';
    frame.onload = () => {
      try {
        if (!frame.contentWindow) throw new Error('Print unavailable');
        frame.contentWindow.focus();
        frame.contentWindow.print();
        setStatus('Choose your printer or Save as PDF in the print dialog.');
      } catch { setStatus('Printing is unavailable here. Download the card and print it from your browser.'); }
      window.setTimeout(() => frame.remove(), 60000);
    };
    frame.srcdoc = buildReadyToGoDocument(card, checked);
    document.body.appendChild(frame);
  }
  return <section id="ready-to-go" className="ready-to-go" aria-labelledby="ready-to-go-title">
    <p className="rtg-eyebrow">Your outing, in your pocket</p>
    <h2 id="ready-to-go-title">{card.title}</h2>
    <p>{card.summary}</p>
    <div className="rtg-actions"><button type="button" onClick={download}>Save offline card</button><button type="button" onClick={print}>Print / Save PDF</button></div>
    <p className="rtg-small">No account needed. Checkmarks stay in this browser on this device. The downloaded card works offline; maps and current conditions need internet. Save your personalized itinerary separately.</p>
    <p className="rtg-notice">{card.reminder}</p>
    {(wantsShade || needsStrollerAccess) && <p className="rtg-notice"><strong>Check the fit with your preferences.</strong> {wantsShade && 'You asked for shade; this exposed approach does not offer continuous shade. '}{needsStrollerAccess && 'You asked for stroller / step-free access; Hole-in-the-Rock has steps and uneven rock. '}Choose another outing if these needs are essential.</p>}
    <dl className="rtg-facts">{card.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <h3>Check before leaving</h3>
    <ul className="rtg-links">{card.links.map(link => <li key={link.url}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<span className="sr-only"> (opens in a new tab)</span> ↗</a></li>)}</ul>
    <h3>Pack &amp; prepare</h3>
    <p className="rtg-small">{checked.filter(Boolean).length} of {card.checklist.length} checked. A checklist is a reminder, not a safety assessment.</p>
    <div className="rtg-checklist">{card.checklist.map((item, i) => <label key={item}><input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} /><span>{item}</span></label>)}</div>
    <button type="button" className="rtg-reset" onClick={() => { setChecked(card.checklist.map(() => false)); try { localStorage.removeItem(storageKey); setStatus('Checklist cleared on this device.'); } catch { setStatus('Checklist cleared for this visit; saved browser data could not be removed.'); } }}>Reset checklist</button>
    <div className="rtg-backup"><h3>Plan B: an indoor reset</h3><p>{card.backup}</p><a href={card.backupUrl} target="_blank" rel="noopener noreferrer">Check official hours, tickets &amp; parking ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
    <p className="rtg-small">Sources checked online {card.reviewed}. No new field visit. Timing and family fit are planning judgments; facilities and fees are not confirmed for your visit. <a href="https://healthandtravels.com/papago-park-with-kids">Read the full family guide</a>.</p>
    <p role="status" className="rtg-status">{status}</p>
  </section>;
}
