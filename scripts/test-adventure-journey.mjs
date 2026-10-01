import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const output = join(tmpdir(), `ht-journey-${process.pid}-${Date.now()}.cjs`);
const result = await build({stdin:{contents:`export * from './src/utils/adventurePlanner'; export * from './src/utils/savedTrips'; export { arizonaFamilyDestinations } from './src/data/sage/arizonaFamilyDestinations';`,resolveDir:process.cwd(),loader:'ts'},bundle:true,platform:'node',format:'cjs',write:false});
await writeFile(output,result.outputFiles[0].contents);
try {
  const api = createRequire(import.meta.url)(output);
  const { parsePlannerAnswers, buildMatches, builderHref, plannerSearch, origins, groups, lengths, interests, priorities, seasons, estimatedDrive, driveLimit } = api;
  if (process.argv[2]) {
    const home = await readFile(process.argv[2], 'utf8');
    assert(home.includes('action="https://sage.healthandtravels.com/plan" method="get"'));
    assert(home.includes('name="results" value="1"'));
    for (const [key, choices] of Object.entries({origin:origins,group:groups,length:lengths,interest:interests,priority:priorities})) {
      const select = home.match(new RegExp(`<select[^>]+name="${key}"[^>]*>([\\s\\S]*?)</select>`))?.[1];
      assert(select, `Homepage needs ${key}`);
      const values = [...select.matchAll(/value="([^"]+)"/g)].map(match=>match[1]);
      assert.deepEqual(values.sort(),choices.map(item=>item.value).sort(),`Homepage and planner must agree on ${key}`);
    }
  }
  const answers = parsePlannerAnswers(new URLSearchParams('origin=tucson&group=mixed-family&length=half-day&interest=scenic&priority=bathrooms&season=winter&drive=60'));
  assert.equal(answers.origin,'tucson'); assert.equal(answers.group,'mixed-family');
  assert.deepEqual(parsePlannerAnswers(new URLSearchParams(plannerSearch(answers))),answers,'URL round-trip must preserve every choice');
  const tucson = buildMatches(answers);
  assert(tucson.length>0,'Tucson should have a nearby match');
  assert(tucson.every(match=>match.estimatedDriveMinutes<=60),'Never pad results with over-limit drives');
  assert(!tucson.some(match=>match.slug==='papago-park'),'Phoenix default drive must not leak into Tucson matches');
  const href = new URL(builderHref(tucson[0],answers),'https://sage.healthandtravels.com');
  assert.equal(href.searchParams.get('location'),tucson[0].slug);
  assert.equal(href.searchParams.get('source'),'unified-adventure');
  assert.equal(href.searchParams.get('kids'),'yes');
  assert.equal(href.searchParams.get('ages'),'mixed');
  assert.deepEqual(parsePlannerAnswers(href.searchParams),answers,'Builder must preserve the submitted preferences');
  const invalid = parsePlannerAnswers(new URLSearchParams('origin=unknown&group=<script>&drive=-20&season=unknown&length=forever'));
  assert.equal(invalid.origin,'phoenix');assert.equal(invalid.group,'young-family');assert.equal(invalid.drive,null);assert.equal(invalid.length,'full-day');
  assert(Number.isFinite(estimatedDrive('phoenix',{slug:'new-destination',driveMinutesFromPhoenix:10})));
  assert.equal(estimatedDrive('tucson',{slug:'new-destination',driveMinutesFromPhoenix:10}),Infinity,'Unknown non-Phoenix drives must not reuse Phoenix estimates');
  assert.equal(buildMatches({...answers,drive:30}).length,0,'A real empty state is preferable to an unsuitable recommendation');
  let scenarios=0;
  for(const origin of origins)for(const group of groups)for(const length of lengths)for(const interest of interests)for(const priority of priorities)for(const season of seasons){
    const input={origin:origin.value,group:group.value,length:length.value,interest:interest.value,priority:priority.value,season,drive:60};
    const matches=buildMatches(input);scenarios++;
    assert(matches.length<=3);assert.equal(new Set(matches.map(item=>item.slug)).size,matches.length);
    for(const match of matches){
      assert(match.estimatedDriveMinutes<=Math.min(60,driveLimit(input.length)));
      assert(!(season==='summer'&&interest.value==='hike'&&match.heatRiskScore>=8));
      if(origin.value!=='phoenix') assert(match.reasons.every(reason=>!reason.includes('from Phoenix')));
      const target=new URL(builderHref(match,input),'https://sage.healthandtravels.com');
      assert.equal(target.searchParams.get('origin'),origin.value);assert.equal(target.searchParams.get('season'),season);
    }
  }
  const storage = new Map();
  globalThis.window = {localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)},dispatchEvent:()=>true};
  const input={destination:'Papago Park',season:'winter',tripLength:'Day trip',groupLabel:'Family · From Phoenix metro',confidenceScore:0,wantsShade:false,needsBathrooms:true,tripUrl:'https://sage.healthandtravels.com/trip-builder?source=unified-adventure&location=papago-park',offlineText:'Papago plan',itinerary:[{title:'Main stop',description:'Papago Park'}],packingItems:[{id:'water',label:'Water',helper:'Bring water',packed:true}]};
  const saved = api.saveTrip(input);
  assert.equal(api.readSavedTrips()[0].id,saved.id);assert.equal(api.readSavedTrips()[0].packingItems[0].packed,true);
  api.saveTrip({...input,offlineText:'Updated plan'});assert.equal(api.readSavedTrips().length,1);assert.equal(api.readSavedTrips()[0].offlineText,'Updated plan');
  window.localStorage.setItem=()=>{throw new Error('Storage blocked')};assert.throws(()=>api.saveTrip(input));
  console.log(`PASS: ${scenarios} match scenarios, parameter handoff, invalid inputs, empty state and saved-plan persistence.`);
} finally {await unlink(output);}
