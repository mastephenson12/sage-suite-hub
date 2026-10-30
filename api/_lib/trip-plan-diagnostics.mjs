// Only fixed labels and numeric metadata may enter logs. Never log provider
// messages, response text, prompts, headers, keys, or traveler input.
const stages = new Set(['configuration', 'provider', 'empty_response', 'json', 'validation']);
const reasons = new Set(['STOP', 'MAX_TOKENS', 'SAFETY', 'RECITATION', 'OTHER', 'BLOCKLIST', 'PROHIBITED_CONTENT', 'SPII', 'MALFORMED_FUNCTION_CALL']);
export function tripPlanFailureDetails(stage, error, response) {
  const status = error?.status;
  const finishReason = response?.candidates?.[0]?.finishReason;
  return {
    event: 'sage_trip_plan_failed',
    stage: stages.has(stage) ? stage : 'provider',
    ...(Number.isInteger(status) && status >= 400 && status <= 599 ? {providerStatus: status} : {}),
    ...(['AbortError', 'TimeoutError'].includes(error?.name) ? {timeout: true} : {}),
    ...(reasons.has(finishReason) ? {finishReason} : {}),
  };
}
