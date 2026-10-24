import test from 'node:test';
import assert from 'node:assert/strict';
import {buildEstrellaVisit,ESTRELLA_ALERT} from '../src/utils/sage/estrellaVisit.ts';
import {getFamilyTripFacts,formatFamilyTripFacts} from '../src/data/familyTripFacts.ts';
import {saveTrip,readSavedTrips} from '../src/utils/savedTrips.ts';
import {savedTripLinks} from '../src/utils/savedTripLinks.ts';

const prefs={activity:'hike',season:'fall',length:'half-day',hasKids:true,kidAgeGroup:'elementary',wantsShade:false,needsBathrooms:false,needsStrollerAccess:false,estimatedDriveMinutes:35,maxDriveMinutes:60};

test('current Estrella facts agree on reopened areas without promising unverified toilets',()=>{
 const facts=getFamilyTripFacts('Estrella Mountain Regional Park');
 assert.equal(facts.reviewed,'2026-10-24');
 assert.match(facts.caution,/pathway and loop drive have reopened/);
 assert.match(facts.caution,/ramadas 7, 10 and 11 remain closed/);
 assert.match(facts.facts.find(([label])=>label==='Bathrooms')[1],/not confirmed/);
 assert.ok(facts.sources.some(source=>source.url===ESTRELLA_ALERT));
 assert.doesNotMatch(formatFamilyTripFacts(facts),/October 7|regular restrooms unavailable|path is closed/);
});

test('independent needs and a long drive produce explicit fit notes',()=>{
 const visit=buildEstrellaVisit({...prefs,wantsShade:true,needsBathrooms:true,needsStrollerAccess:true,estimatedDriveMinutes:125,maxDriveMinutes:90,length:'weekend'});
 const notes=visit.notes.join(' ');
 for(const pattern of [/Shade matters/,/Bathrooms matter/,/step-free/,/125 minutes/,/90-minute limit/,/not a full-day or weekend/])assert.match(notes,pattern);
 assert.match(visit.schedule[2].title,/pathway/);
});

test('relaxed visits do not prescribe a hike; toddlers get shorter pacing',()=>{
 const relaxed=buildEstrellaVisit({...prefs,activity:'relax'});
 assert.match(relaxed.schedule[2].title,/picnic/);
 assert.match(relaxed.schedule[2].description,/hiking is optional/);
 const toddlers=buildEstrellaVisit({...prefs,kidAgeGroup:'toddlers'});
 assert.match(toddlers.schedule[2].description,/brief out-and-back/);
 const adults=buildEstrellaVisit({...prefs,hasKids:false,kidAgeGroup:'toddlers'});
 assert.doesNotMatch(adults.schedule[2].description,/toddlers or preschoolers/);
});

test('summer returns an alternative, not the cool-season walking schedule',()=>{
 const visit=buildEstrellaVisit({...prefs,season:'summer'});
 assert.equal(visit.schedule.length,1);
 assert.match(visit.title,/summer alternative/);
 assert.match(visit.notes.join(' '),/not the summer plan/);
});

test('saved directions become safe links; credentials and active schemes stay text',()=>{
 const parts=savedTripLinks('Directions: https://www.google.com/maps/search/?api=1&query=Goodyear Alert: https://www.maricopacountyparks.net/park-updates/.');
 assert.equal(parts.filter(part=>part.href).length,2);
 assert.equal(parts.map(part=>part.text).join(''),'Directions: https://www.google.com/maps/search/?api=1&query=Goodyear Alert: https://www.maricopacountyparks.net/park-updates/.');
 assert.equal(savedTripLinks('javascript:alert(1) https://user:password@example.com').filter(part=>part.href).length,0);
});

test('a saved copy retains reviewed details, tradeoffs and selected origin without regeneration',()=>{
 const store=new Map();
 globalThis.window={localStorage:{getItem:key=>store.get(key)??null,setItem:(key,value)=>store.set(key,value)},dispatchEvent:()=>true};
 const visit=buildEstrellaVisit({...prefs,needsBathrooms:true});
 const input={destination:'Estrella Mountain',season:'Fall',tripLength:'Half day',groupLabel:'Elementary-age kids',confidenceScore:0,wantsShade:false,needsBathrooms:true,tripUrl:'https://sage.healthandtravels.com/trip-builder?location=estrella-mountain&origin=tucson&drive=90',offlineText:'Reviewed copy with directions',itinerary:[{title:'Fit',description:visit.notes.join(' ')},...visit.schedule.map(item=>({title:item.title,description:item.description}))],packingItems:[]};
 try{
  const saved=saveTrip(input);
  assert.equal(readSavedTrips()[0].id,saved.id);
  assert.equal(readSavedTrips()[0].tripUrl,input.tripUrl);
  assert.match(readSavedTrips()[0].itinerary[0].description,/Bathrooms matter/);
  assert.equal(saveTrip(input).id,saved.id);
  assert.equal(readSavedTrips().length,1);
  window.localStorage.setItem=()=>{throw new Error('QuotaExceededError');};
  assert.throws(()=>saveTrip(input),/QuotaExceededError/);
 }finally{delete globalThis.window;}
});
