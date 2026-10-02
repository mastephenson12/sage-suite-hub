import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOJsonLd from '../components/SEOJsonLd';
import { getFamilyTripFacts } from '../data/familyTripFacts';
import { trackEvent } from '../utils/analytics';
import { origins, groups, lengths, interests, priorities, seasons, driveOptions, parsePlannerAnswers, plannerSearch, buildMatches, builderHref, guideFor, formatDrive, PlannerAnswers, PlannerMatch } from '../utils/adventurePlanner';

function MatchCard({ match, answers, index }: {match:PlannerMatch; answers:PlannerAnswers; index:number}) {
  const facts = getFamilyTripFacts(match.slug);
  const fact = (label:string) => facts?.facts.find(([key]) => key === label)?.[1];
  const fields = [
    ['Drive, one way', formatDrive(match.estimatedDriveMinutes)],
    ['Bathrooms', fact('Bathrooms') ?? (match.bathroomScore >= 7 ? 'Facilities noted; check access' : 'Limited or variable; check guide')],
    ['Shade', fact('Shade') ?? (match.shadeScore >= 7 ? 'Some shaded areas; route dependent' : 'Limited or variable')],
    ['Walking', fact('Terrain') ?? 'Choose a route in the full guide'],
  ];
  return <article className="journey-card"><div className="journey-card-body">
    <p className="journey-eyebrow">{index === 0 ? 'Start here' : `Another option · ${index + 1}`}</p>
    <h3>{match.name}</h3><p className="journey-tags">{match.region}</p>
    <dl className="journey-facts">{fields.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <strong>Why it made your shortlist</strong><ul className="journey-reasons">{match.reasons.slice(0,3).map(reason => <li key={reason}>{reason}</li>)}</ul>
    <div className="journey-caution"><strong>Before choosing</strong><p>{facts?.caution ?? match.caution}</p></div>
    {facts && <p className="journey-note">Guide facts reviewed {facts.reviewed}. Check the latest official notices before leaving.</p>}
    <div className="journey-actions"><Link className="journey-button" to={builderHref(match,answers)} onClick={() => trackEvent('adventure_planner_build_trip_click',{destination:match.slug,rank:index+1})}>Build this day <span aria-hidden="true">→</span></Link><a className="text-link" href={guideFor(match)}>{guideFor(match).endsWith('/arizona') ? 'Browse Arizona guides' : 'Read the full guide'}</a></div>
  </div></article>;
}

export default function PlanArizonaAdventure() {
  const [params,setParams] = useSearchParams();
  const [answers,setAnswers] = useState(() => parsePlannerAnswers(params));
  const [editing,setEditing] = useState(params.get('results') !== '1');
  const heading = useRef<HTMLHeadingElement>(null);
  const lastTracked = useRef('');
  const query = params.toString();
  const submitted = params.get('results') === '1';
  const confirmed = parsePlannerAnswers(params);
  const matches = submitted ? buildMatches(confirmed) : [];
  useEffect(() => {
    setAnswers(parsePlannerAnswers(new URLSearchParams(query)));
    setEditing(new URLSearchParams(query).get('results') !== '1');
  },[query]);
  useEffect(() => {
    if (submitted && lastTracked.current !== query) {
      lastTracked.current = query;
      trackEvent('adventure_planner_completed',{...confirmed,match_count:matches.length,top_match:matches[0]?.slug});
    }
  },[query,submitted]);
  const update = (key:keyof PlannerAnswers,value:string) => setAnswers(current => ({...current,[key]: key === 'drive' ? value === 'auto' ? null : Number(value) : value}));
  const select = (key:keyof PlannerAnswers,label:string,items:Array<{value:string;label:string}>) => <div className={`journey-field ${key === 'priority' ? 'wide' : ''}`}><label htmlFor={`planner-${key}`}>{label}</label><select id={`planner-${key}`} name={key} value={String(answers[key] ?? 'auto')} onChange={event => update(key,event.target.value)}>{items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>;
  function submit(event:React.FormEvent) {
    event.preventDefault();
    setParams(plannerSearch(answers));
    setEditing(false);
    window.setTimeout(() => {heading.current?.focus(); heading.current?.scrollIntoView({block:'start'});},0);
  }
  const originLabel = origins.find(item => item.value === confirmed.origin)?.label;
  return <main id="main" className="journey-main">
    <SEOJsonLd title="Plan Your Arizona Adventure | Health & Travels" description="Find Arizona adventures matched to your starting point, family, time and practical needs. Choose one and build a day you can save." url="https://sage.healthandtravels.com/plan" robots={submitted ? 'noindex, follow' : 'index, follow'} />
    <p className="journey-eyebrow">01 Find your fit <span aria-hidden="true"> / </span> 02 Build your day <span aria-hidden="true"> / </span> 03 Save &amp; go</p>
    <h1 ref={heading} tabIndex={-1}>{submitted ? 'Your next day out.' : 'Where should we go?'}</h1>
    <p className="journey-lead">{submitted ? 'Compare the details, choose your place, and make the day your own.' : 'A few choices. Up to three adventures that fit. No account needed.'}</p>
    {submitted && <div className="journey-summary"><div><strong>{groups.find(item=>item.value===confirmed.group)?.label} · {lengths.find(item=>item.value===confirmed.length)?.label}</strong><p className="journey-note">From {originLabel} · {confirmed.season} · {interests.find(item=>item.value===confirmed.interest)?.label} · {priorities.find(item=>item.value===confirmed.priority)?.label}</p></div><button className="journey-button secondary" aria-expanded={editing} aria-controls="planner-editor" onClick={()=>setEditing(!editing)}>{editing ? 'Close choices' : 'Edit choices'}</button></div>}
    <div id="planner-editor" hidden={!editing} className={submitted ? 'journey-editor' : 'journey-intro'}>
      <form className="journey-form" onSubmit={submit} aria-label="Arizona adventure questions"><div className="journey-fields">
        {select('origin','Starting from',origins)}{select('group',"Who's coming?",groups)}{select('length','Time for the whole outing',lengths)}{select('interest','In the mood for',interests)}{select('priority','What matters most?',priorities)}
      </div><details><summary>Season and drive limit</summary><div className="journey-fields">{select('season','When are you going?',seasons.map(value=>({value,label:value[0].toUpperCase()+value.slice(1)})))}{select('drive','Maximum drive, one way',[{value:'auto',label:'Fit it to my outing'},...driveOptions.map(value=>({value:String(value),label:formatDrive(value)}))])}</div></details><button className="journey-button" type="submit">{submitted ? 'Update my matches' : 'Find my adventures'} <span aria-hidden="true">→</span></button><p className="journey-note">Drive estimates are approximate. Seasonal matching does not check live weather, closures or availability.</p></form>
      {!submitted && <figure className="journey-photo"><img src="/images/payson-rim-overlook.avif" alt="View over the forested Mogollon Rim" width="1300" height="1733" /><figcaption><strong>A little room to explore.</strong>We'll keep your choices with you as you plan.</figcaption></figure>}
    </div>
    {submitted && <section className="journey-results" aria-label="Your adventure matches" aria-live="polite">
      <p className="journey-note">{matches.length} {matches.length === 1 ? 'option' : 'options'} within your drive and outing limits. Drive times are estimates from {originLabel}; check your exact route. Seasonal fit is not a live conditions check.</p>
      {matches.length ? <div className={`journey-grid journey-matches-${matches.length}`}>{matches.map((match,index)=><MatchCard key={match.slug} match={match} answers={confirmed} index={index}/>)}</div> : <div className="journey-empty"><h2>No close matches this time.</h2><p>Our current collection has no matches within these limits. Try a longer outing, a larger drive limit, or a different activity.</p><button className="journey-button secondary" onClick={()=>setEditing(true)}>Adjust my choices</button></div>}
    </section>}
    <div className="journey-trust"><div><h2>One place. A realistic day.</h2><p>Your next step keeps these choices and opens a starter plan you can adjust and save on this device.</p></div><div><h3>Know before you go.</h3><p>Check current weather, access and facilities with official sources. <a href="https://healthandtravels.com/arizona-family-hiking-safety-guide">Read our family hiking safety guide →</a></p></div></div>
  </main>;
}
