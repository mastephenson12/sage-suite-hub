import test from 'node:test';
import assert from 'node:assert/strict';
import {tripPlanFailureDetails} from '../api/_lib/trip-plan-diagnostics.mjs';

test('provider statuses identify authentication, quota and service failures without raw errors', () => {
  for (const status of [400, 401, 403, 404, 429, 500, 503]) {
    const details = tripPlanFailureDetails('provider', {status, message:'secret key and private trip', body:'private'});
    assert.deepEqual(details, {event:'sage_trip_plan_failed', stage:'provider', providerStatus:status});
  }
});
test('empty, malformed and invalid output remain distinct, with safe finish reasons', () => {
  for (const stage of ['configuration','empty_response','json','validation']) {
    assert.deepEqual(tripPlanFailureDetails(stage, null, {candidates:[{finishReason:'MAX_TOKENS'}], text:'private'}),
      {event:'sage_trip_plan_failed', stage, finishReason:'MAX_TOKENS'});
  }
  assert.equal(tripPlanFailureDetails('provider', {name:'TimeoutError'}).timeout, true);
});
test('arbitrary fields and strings cannot be reflected into diagnostic logs', () => {
  assert.deepEqual(tripPlanFailureDetails('private trip', {status:'secret', name:'secret', stack:'secret'}, {candidates:[{finishReason:'secret'}]}),
    {event:'sage_trip_plan_failed', stage:'provider'});
  for(const status of [0, 200, 600, 500.5, NaN]) assert.equal(tripPlanFailureDetails('provider', {status}).providerStatus, undefined);
});
