import test from 'node:test';
import assert from 'node:assert/strict';
import {parsePlan,tripPlanSchema} from '../api/_lib/trip-plan-output.mjs';
const sample = () => ({title:'A family outing',summary:'A practical plan.',outdoorAnchor:{name:'Papago Park',description:'A short outing.',coordinates:{latitude:33.45,longitude:-111.95}},driveFromOrigin:'About 30 minutes; check navigation.',foodStop:{name:'Packed picnic',description:'Bring your lunch.'},facilities:{restrooms:'Verify availability.',shade:'Limited shade.'},backupPlan:'Choose an indoor alternative.',cautions:['Carry water.'],verificationNote:'Verify current conditions.'});

test('complete plans retain descriptive and safety text beyond former display limits',()=>{
 const plan=sample();
 plan.facilities.restrooms='Verify restroom access before leaving. '.repeat(12).trim();
 plan.backupPlan='Choose an indoor alternative if weather changes. '.repeat(16).trim();
 plan.verificationNote='Check the official park alert before departure. '.repeat(8).trim();
 plan.cautions=['Bring ample water and turn back if anyone feels unwell. '.repeat(6).trim()];
 assert.deepEqual(parsePlan(plan),plan);
});
test('missing, blank, wrong-type and excessively large content still fails closed',()=>{
 for(const field of ['title','summary','driveFromOrigin','backupPlan','verificationNote']){
  for(const invalid of [null,' ',{},'x'.repeat(4001)]){
   const plan=sample();plan[field]=invalid;assert.equal(parsePlan(plan),null);
  }
 }
 for(const bad of [null,[],{facilities:null}])assert.equal(parsePlan(bad),null);
 const plan=sample();plan.cautions=['x'.repeat(4001)];assert.equal(parsePlan(plan),null);
 plan.cautions=[''];assert.equal(parsePlan(plan),null);
});
test('unknown or invalid coordinates remain null rather than invented numbers',()=>{
 for(const coordinates of [null,{}, {latitude:'33',longitude:'-112'}, {latitude:90,longitude:0}]){
  const plan=sample();plan.outdoorAnchor.coordinates=coordinates;
  assert.equal(parsePlan(plan).outdoorAnchor.coordinates,null);
 }
});
test('schema requires every displayed plan field and constrains cautions',()=>{
 assert.deepEqual(tripPlanSchema.required,Object.keys(sample()));
 for(const field of ['outdoorAnchor','foodStop','facilities'])assert.deepEqual(tripPlanSchema.properties[field].required,Object.keys(sample()[field]));
 assert.equal(tripPlanSchema.properties.cautions.maxItems,5);
});
