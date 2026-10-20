import test from 'node:test';
import assert from 'node:assert/strict';
import {readJsonRequest, trustedOrigins, isTrustedTripUrl, createLimiter} from '../api/_lib/request-security.mjs';
import {POST as emailTrip} from '../api/email-trip-pack.ts';
import {POST as chat} from '../api/chat.ts';

function request(body, headers = {}) {
  return new Request('https://sage.healthandtravels.com/api/test', {method:'POST', headers: {origin:'https://sage.healthandtravels.com','content-type':'application/json',...headers}, body:typeof body === 'string' ? body : JSON.stringify(body)});
}

test('exact origins reject unrelated Vercel sites, missing origins, credentials and non-HTTPS links', async () => {
  assert(!trustedOrigins().has('https://attacker.vercel.app'));
  for (const origin of ['', 'https://attacker.vercel.app','http://sage.healthandtravels.com']) {
    await assert.rejects(readJsonRequest(request({}, {origin}), 100), error => error.status === 403);
  }
  assert(isTrustedTripUrl('https://sage.healthandtravels.com/trip-builder?destination=Sedona'));
  assert(!isTrustedTripUrl('https://attacker.vercel.app/trip-builder'));
  assert(!isTrustedTripUrl('http://sage.healthandtravels.com/trip-builder'));
  assert(!isTrustedTripUrl('https://user:pass@sage.healthandtravels.com/trip-builder'));
  assert(!isTrustedTripUrl('https://sage.healthandtravels.com/redirect'));
});

test('JSON parsing enforces actual UTF-8 bytes without trusting content-length', async () => {
  assert.deepEqual(await readJsonRequest(request({ok:true}), 100), {ok:true});
  await assert.rejects(readJsonRequest(request('{}',{'content-type':'text/plain'}), 100), e=>e.status===415);
  for (const body of ['{','[]','null']) await assert.rejects(readJsonRequest(request(body),100),e=>e.status===400);
  await assert.rejects(readJsonRequest(request({text:'🌵'.repeat(25)}),100),e=>e.status===413);
  await assert.rejects(readJsonRequest(request({text:'x'.repeat(120)},{'content-length':'2'}),100),e=>e.status===413);
});

test('limiter caps memory, does not evict active clients, and expires windows', () => {
  const limited=createLimiter(2,1000,2);
  assert.equal(limited('a',0),false);assert.equal(limited('a',1),false);assert.equal(limited('a',2),true);
  assert.equal(limited('b',2),false);assert.equal(limited('c',3),true);
  assert.equal(limited('c',1001),false);
});

test('invalid email/chat requests never call a provider', async () => {
  const original=global.fetch;let calls=0;global.fetch=async()=>{calls++;throw Error('must not call provider');};
  try {
    assert.equal((await emailTrip(request({}, {origin:'https://attacker.vercel.app'}))).status,403);
    assert.equal((await chat(request('{}', {'content-type':'text/plain'}))).status,415);
    assert.equal((await emailTrip(request({email:'a@example.com',destination:'Sedona',planText:'Trip',tripUrl:'https://attacker.vercel.app/trip-builder'}))).status,400);
    assert.equal(calls,0);
  } finally {global.fetch=original;}
});

test('email uses a fixed subject, escaped HTML, recipient cooldown, and provider timeout', async () => {
  const original=global.fetch;const before={key:process.env.RESEND_API_KEY,from:process.env.TRIP_PACK_FROM_EMAIL};
  process.env.RESEND_API_KEY='test';process.env.TRIP_PACK_FROM_EMAIL='test@example.com';
  const body={email:'cooldown@example.com',destination:'Sedona',subject:'ATTACK SUBJECT',planText:'<img src=x onerror=alert(1)>',tripUrl:'https://sage.healthandtravels.com/trip-builder'};
  const sent=[];
  global.fetch=async(url,options)=>{sent.push(JSON.parse(options.body));assert(options.signal);return {ok:true};};
  try {
    assert.equal((await emailTrip(request(body))).status,200);
    assert.equal((await emailTrip(request(body))).status,200);
    assert.equal((await emailTrip(request(body))).status,429);
    assert.equal(sent.length,2);assert(!sent[0].subject.includes('ATTACK'));assert(sent[0].html.includes('&lt;img'));assert(!sent[0].html.includes('<img'));
  } finally {
    global.fetch=original;
    if(before.key===undefined)delete process.env.RESEND_API_KEY;else process.env.RESEND_API_KEY=before.key;
    if(before.from===undefined)delete process.env.TRIP_PACK_FROM_EMAIL;else process.env.TRIP_PACK_FROM_EMAIL=before.from;
  }
});

test('chat caps provider generation and accepts a mocked safe response', async () => {
  const before=process.env.GEMINI_API_KEY;const original=global.fetch;process.env.GEMINI_API_KEY='test';
  let sent;
  global.fetch=async(url,options)=>{
    sent=JSON.parse(options.body);
    return new Response(JSON.stringify({candidates:[{content:{role:'model',parts:[{text:'Mock Arizona plan'}]},finishReason:'STOP'}]}),{status:200,headers:{'content-type':'application/json'}});
  };
  try {
    const response=await chat(request({messages:[{role:'user',content:'A short Arizona outing'}]}));
    assert.equal(response.status,200);assert.equal((await response.json()).text,'Mock Arizona plan');
    assert.equal(sent.generationConfig.maxOutputTokens,2048);
  } finally {
    global.fetch=original;if(before===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=before;
  }
});
