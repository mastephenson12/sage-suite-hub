import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../api/process-itinerary-event.ts';

const workerToken='w'.repeat(64);
const location='location_test';
const base={schemaVersion:1,source:'sage_resend',purpose:'transactional_itinerary',eventId:'evt_delivered',event:'itinerary_email_delivered',occurredAt:'2026-10-23T12:00:00.000Z',messageId:'email_one',planVersionId:'a'.repeat(64),recipient:'test@example.com',status:'delivered'};
function request(event=base,token=workerToken){return new Request('https://sage.example/api/process-itinerary-event',{method:'POST',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify(event)});}
function configure(){process.env.ITINERARY_WORKER_TOKEN=workerToken;process.env.GHL_DELIVERY_TOKEN='fake-test-token';process.env.GHL_DELIVERY_LOCATION_ID=location;}
function fixture({contact=false,searchLag=false}={}){
 const records=new Map();const writes=[];let fail=false;let dnd=false;
 const fetch=async(url,options)=>{
  const u=new URL(url);const body=options.body?JSON.parse(options.body):null;
  assert.equal(u.origin,'https://services.leadconnectorhq.com');
  assert.equal(options.redirect,'error');
  if(fail)return Response.json({error:'unavailable'},{status:503});
  if(u.pathname.endsWith('/records/search'))return Response.json({records:searchLag?[]:[...records.values()].filter(r=>r.properties.message_id===body.query),total:searchLag?0:[...records.values()].filter(r=>r.properties.message_id===body.query).length});
  if(u.pathname==='/contacts/')return Response.json({contacts:contact?[{id:'contact_one',locationId:location,email:'test@example.com',dndSettings:{Email:{status:dnd?'active':'inactive'},SMS:{status:'active'}}}]:[],count:contact?1:0});
  if(u.pathname==='/contacts/contact_one'&&options.method==='PUT'){writes.push(body);assert.equal(body.dndSettings.SMS.status,'active');assert.equal(body.dndSettings.Email.status,'active');dnd=true;return Response.json({success:true});}
  if(u.pathname==='/contacts/contact_one')return Response.json({contact:{id:'contact_one',locationId:location,dndSettings:{Email:{status:dnd?'active':'inactive'}}}});
  if(u.pathname.endsWith('/records')&&options.method==='POST'){const existing=[...records.values()].find(r=>r.properties.message_identity===body.properties.message_identity);if(existing)return Response.json({errors:[{errorCode:'duplicate_record',fieldKey:'custom_objects.sage_email_attempts.message_identity',fieldValue:body.properties.message_identity,conflictingRecordId:existing.id}]},{status:400});const r={id:'record_'+(records.size+1),properties:body.properties};records.set(r.id,r);writes.push(body);return Response.json({record:r},{status:201});}
  const id=u.pathname.split('/').at(-1);
  if(options.method==='PUT'){records.get(id).properties=body.properties;writes.push(body);}
  return Response.json({record:records.get(id)});
 };
 return {fetch,records,writes,setFail(value){fail=value;},get suppressed(){return dnd;}};
}

test('delivery processor preserves separate sends, terminal state, suppression and retry safety',async()=>{
 configure();const original=global.fetch;const f=fixture({contact:true});global.fetch=f.fetch;
 try{
  assert.equal((await POST(request())).status,200);
  assert.equal((await POST(request())).status,200);
  assert.equal(f.records.size,1);
  const accepted={...base,status:'accepted',event:'itinerary_email_accepted',eventId:'evt_old',occurredAt:'2026-10-23T10:00:00.000Z'};
  assert.equal((await POST(request(accepted))).status,200);
  assert.equal([...f.records.values()][0].properties.delivery_status,'delivered');
  const other={...base,messageId:'email_two',eventId:'evt_two',planVersionId:'b'.repeat(64)};
  assert.equal((await POST(request(other))).status,200);
  assert.equal(f.records.size,2);
  const complaint={...base,status:'complained',event:'itinerary_email_complained',eventId:'evt_complaint',occurredAt:'2026-10-23T13:00:00.000Z'};
  assert.equal((await POST(request(complaint))).status,200);
  assert(f.suppressed);
  assert.equal((await POST(request({...base,eventId:'evt_late_delivery',occurredAt:'2026-10-23T14:00:00.000Z'}))).status,200);
  assert.equal([...f.records.values()][0].properties.delivery_status,'complained');
  assert.equal([...f.records.values()][1].properties.delivery_status,'delivered');
  assert.equal((await POST(request({...base,recipient:'different@example.com'}))).status,409);
  f.setFail(true);assert.equal((await POST(request(other))).status,502);
  f.setFail(false);assert.equal((await POST(request(other))).status,200);
  assert(f.writes.every(w=>!('tags'in w)&&!('source'in w)&&!('email'in w)&&!('dnd'in w)));
 }finally{global.fetch=original;}
});

test('invalid events and unauthenticated requests cannot call the CRM',async()=>{
 configure();const original=global.fetch;global.fetch=async()=>{throw new Error('Must not call CRM');};
 try{
  assert.equal((await POST(request(base,'wrong'))).status,401);
  for(const value of [{...base,purpose:'marketing'},{...base,status:'unknown'},{...base,event:'itinerary_email_accepted'},{...base,occurredAt:'invalid'},{...base,eventId:''},{...base,planVersionId:'not-a-fingerprint'}])assert.equal((await POST(request(value))).status,400);
  const large=request({...base,extra:'x'.repeat(17000)});assert.equal((await POST(large)).status,413);
  delete process.env.GHL_DELIVERY_TOKEN;assert.equal((await POST(request())).status,503);
 }finally{global.fetch=original;}
});

test('a stale CRM search index cannot create duplicates or regress delivered status',async()=>{
 configure();const original=global.fetch;const f=fixture({searchLag:true});global.fetch=f.fetch;
 try{
  const first=await (await POST(request())).json();
  const replay=await (await POST(request())).json();
  assert.equal(first.recordId,replay.recordId);
  assert.equal(f.records.size,1);
  const late={...base,status:'accepted',event:'itinerary_email_accepted',eventId:'evt_old',occurredAt:'2026-10-23T10:00:00.000Z'};
  assert.equal((await (await POST(request(late))).json()).status,'delivered');
 }finally{global.fetch=original;}
});
