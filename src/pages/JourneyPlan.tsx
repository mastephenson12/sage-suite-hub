import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';
import { arizonaFamilyDestinations } from '../data/sage/arizonaFamilyDestinations';
import { getFamilyTripFacts, formatFamilyTripFacts } from '../data/familyTripFacts';
import { estimatedDrive, formatDrive, guideFor, groups, lengths, origins, parsePlannerAnswers, plannerSearch } from '../utils/adventurePlanner';
import { downloadTextFile, saveTrip, SavedTripPackingItem } from '../utils/savedTrips';
import { trackEvent } from '../utils/analytics';

export default function JourneyPlan() {
  const [params] = useSearchParams();
  const answers = parsePlannerAnswers(params);
  const destination = arizonaFamilyDestinations.find(item => item.slug === params.get('location'));
  const [savedId,setSavedId] = useState('');
  const [status,setStatus] = useState('');
  const [packing,setPacking] = useState<SavedTripPackingItem[]>([
    {id:'water',label:'Water and familiar snacks',helper:'Bring enough for your group and unexpected delays.',packed:false},
    {id:'sun',label:'Sun protection and weather layers',helper:'Choose for the exact destination forecast.',packed:false},
    {id:'shoes',label:'Footwear for the route',helper:'Check the terrain and access in the guide.',packed:false},
    {id:'directions',label:'Directions and an offline copy',helper:'Save your plan before leaving cell coverage.',packed:false},
  ]);
  if (!destination) return <main id="main" className="journey-main"><h1>Let's choose a place first.</h1><p>That destination isn't in the current collection.</p><Link className="journey-button" to={`/plan?${plannerSearch(answers)}`}>Find an adventure</Link></main>;
  const facts = getFamilyTripFacts(destination.slug);
  const origin = origins.find(item => item.value === answers.origin)?.label ?? 'Phoenix metro';
  const drive = estimatedDrive(answers.origin,destination);
  const groupLabel = groups.find(item => item.value === answers.group)?.label ?? 'Family';
  const tripLength = lengths.find(item => item.value === answers.length)?.label ?? 'Day trip';
  const itinerary = [
    {title:'Before leaving',description:`Check current weather, access, opening hours and parking for ${destination.name}. Save directions from ${origin}.`},
    {title:'Your main stop',description:`${destination.name}. ${destination.parentTip}`},
    {title:'Food and a reset',description:`Pack a picnic or check food options in ${destination.nearbyFood.join(', ')}. Confirm hours and dietary needs directly before relying on a stop.`},
    {title:'Keep the finish flexible',description:`If time and energy allow, consider ${destination.backupPlans.join(', ')}. These are options to verify, not reservations or guaranteed indoor alternatives.`},
  ];
  const offlineText = [
    `${destination.name} — Health & Travels`, `${groupLabel} · ${tripLength} · ${answers.season}`,
    `Starting from: ${origin}`, `Estimated one-way drive: ${Number.isFinite(drive) ? formatDrive(drive) : 'Check your route'}`,
    '', ...itinerary.map(item=>`${item.title}\n${item.description}\n`),
    'BEFORE YOU GO',facts ? formatFamilyTripFacts(facts) : destination.caution,
    'These are planning notes, not live weather, closures or availability.',
    '', 'PACKING',...packing.map(item=>`${item.packed?'[x]':'[ ]'} ${item.label} — ${item.helper}`),
    '',`Full guide: ${guideFor(destination)}`,
  ].join('\n');
  const tripUrl = `${window.location.origin}/trip-builder?${params.toString()}`;
  function save() {
    try {
      const trip = saveTrip({destination:destination!.name,season:answers.season,tripLength,groupLabel:`${groupLabel} · From ${origin}`,confidenceScore:0,wantsShade:answers.priority==='shade',needsBathrooms:answers.priority==='bathrooms',tripUrl,offlineText,itinerary,packingItems:packing});
      setSavedId(trip.id);setStatus('Saved on this device. Download a copy to take with you.');
      trackEvent('adventure_plan_saved',{destination:destination!.slug,origin:answers.origin});
    } catch {setStatus('Your browser could not save this plan. Download a copy to keep it.');}
  }
  async function share() {
    try {
      if(navigator.share) await navigator.share({title:`${destination!.name} day plan`,text:offlineText,url:tripUrl});
      else if(navigator.clipboard?.writeText) {await navigator.clipboard.writeText(`${offlineText}\n${tripUrl}`);setStatus('Plan copied. Paste it into a message to your group.');}
      else setStatus('Sharing is unavailable here. Download the plan and send the file.');
    } catch(error) {if(!(error instanceof DOMException && error.name==='AbortError')) setStatus('Sharing did not complete. Download the plan to keep a copy.');}
  }
  return <main id="main" className="journey-main">
    <SEOJsonLd title={`${destination.name} Day Plan | Health & Travels`} description="Your Arizona day plan, with practical details, a flexible itinerary and a packing checklist." url="https://sage.healthandtravels.com/trip-builder" robots="noindex, follow"/>
    <p className="journey-eyebrow">Your place. Your pace.</p><h1>{destination.name}<br/>A day to make your own.</h1>
    <div className="journey-summary"><div><strong>{groupLabel} · {tripLength} · {answers.season}</strong><p className="journey-note">From {origin} · {Number.isFinite(drive)?formatDrive(drive):'Check drive time'} one way, estimated</p></div><Link className="journey-button secondary" to={`/plan?${plannerSearch(answers)}`}>Change my choices</Link></div>
    <div className="journey-plan-actions"><button className="journey-button" onClick={save}>{savedId?'Update saved plan':'Save my plan'}</button><button className="journey-button secondary" onClick={share}>Share</button><button className="journey-button secondary" onClick={()=>downloadTextFile(`${destination.slug}-day-plan.txt`,offlineText)}>Download</button><button className="journey-button secondary" onClick={()=>window.print()}>Print</button>{savedId&&<Link to={`/my-trips/${savedId}`}>Open saved plan →</Link>}</div>
    <p className="journey-note" role="status">{status || 'No account needed. Saves stay in this browser; download a copy for offline use.'}</p>
    <div className="journey-plan-layout">
      <section aria-labelledby="day-outline"><p className="journey-eyebrow">A flexible outline</p><h2 id="day-outline">One main stop. Room to breathe.</h2><p className="journey-note">{answers.length==='weekend'?'Use this as the first day of your weekend. Choose lodging and a second day separately.':'Set departure and return times around current opening hours, your drive and your group.'}</p><ol className="journey-timeline">{itinerary.map((item,index)=><li key={item.title}><span aria-hidden="true">0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol>
      <div className="journey-caution"><strong>What could change the plan</strong><p>{facts?.caution??destination.caution}</p><p>Check the exact forecast and official notices. A backup stop may also be outdoors; choose a suitable indoor alternative if conditions require it.</p></div>
      <a className="journey-button secondary" href={guideFor(destination)}>Read the destination guide →</a></section>
      <aside><section className="journey-plan-panel"><h2>The practical details</h2>{facts?<><dl className="journey-facts">{facts.facts.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p className="journey-note">{facts.reviewNote}</p><ul className="journey-reasons">{facts.sources.map(source=><li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul></>:<><p>Parking, exact walking distance, facility access and fees need checking in the destination guide and official notices.</p><p className="journey-note">This collection has planning suggestions for this place, but no detailed reviewed fact box yet.</p></>}</section>
      <section className="journey-plan-panel"><h2>Ready to head out?</h2><div className="journey-packing">{packing.map(item=><label key={item.id}><input type="checkbox" checked={item.packed} onChange={()=>{setPacking(current=>current.map(p=>p.id===item.id?{...p,packed:!p.packed}:p));if(savedId)setStatus('Checklist changed. Choose Update saved plan to keep your changes.');}}/><span><strong>{item.label}</strong><small>{item.helper}</small></span></label>)}</div><p className="journey-note">Check the guide for destination-specific supplies.</p></section></aside>
    </div>
  </main>;
}
