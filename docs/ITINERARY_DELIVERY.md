# Itinerary email delivery and GoHighLevel handoff

Status: implementation foundation, not a live CRM integration. October 22, 2026.

## System ownership

Sage renders the canonical plan. Resend delivers the requested snapshot. Beehiiv owns Starter Pack and newsletter signup/welcome. GoHighLevel owns permitted trip follow-ups, AHA interest, and membership onboarding. Emailing a trip never grants marketing consent.

## Delivery contract

`POST /api/email-trip-pack` returns `{ accepted: true, messageId, planVersionId }` only after Resend returns a message ID. Accepted does not mean delivered. `planVersionId` is a SHA-256 fingerprint of the exact submitted snapshot and URL; it is not a durable trip ID or an authorization token. Identical snapshots can share a fingerprint. Every send has its own provider message ID.

`POST /api/resend-webhook` verifies Resend's Svix signature against the raw request body, including timestamp tolerance, before processing events. Only messages tagged `category=sage_itinerary` are forwarded. Set up these events: email.sent, email.delivered, email.delivery_delayed, email.bounced, email.failed, email.complained, email.suppressed.

The receiver URL and bearer token are server-only environment settings. Never set them to a guessed GHL webhook. Configure an authenticated, durable integration receiver after verifying the H&T/AHA location and existing fields/workflows. No itinerary text, child ages, food needs, or trip URL is forwarded. Recipient email is sent solely to match the correct CRM contact.

Receiver JSON: schemaVersion, source, eventId, event, occurredAt, messageId, planVersionId, recipient, status, purpose. The Idempotency-Key header contains the provider event ID. `purpose=transactional_itinerary` is not marketing permission.

The receiver MUST durably insert events using a unique eventId before responding 2xx, treat duplicates as successful no-ops, and retain message-specific state. Retry failures return non-2xx. Events can arrive out of order: retain history and do not let an older accepted/delayed event overwrite delivered, bounced, failed, complained, or suppressed state. A complaint may occur after delivery. Do not resubscribe a contact based on an older delivery event.

No in-memory deduplication or invented successful storage: absent sink configuration returns 503; sink errors return 502 so Resend can retry. The sender remains functional without tracking configuration. Provider retries are finite: monitor failures and replay after receiver recovery. Resend retains the authoritative provider history until durable integration is connected.

## GoHighLevel structure to implement after account inspection

Reuse the existing H&T/AHA location, contacts and consent settings. Keep MidSizeAI separate. Use one adult contact and distinct trip records (custom object if available); do not overwrite trip A with trip B in contact fields. The current code provides a plan version fingerprint and send ID, not a persistent Trip entity. That entity and association must be added before date-based automation.

Contact fields: newsletter status and source, marketing consent scope/time/source/copy version, AHA membership status. Never replace a recorded opt-out with an empty or inferred opt-in. Prefer existing equivalent fields over duplicates.

Trip fields: stable trip ID, contact association, destination, start/end dates and timezone, cancellation state, current plan version, plan link/access policy. Email-attempt records: message ID, plan version, requested/accepted time, latest delivery state and timestamp. Event ledger: event ID, message ID, type, provider time, ingestion time.

Workflow 01 tracks delivery only. It must not email the itinerary again, subscribe to Beehiiv, create a sales opportunity, or enroll in nurture. Failed/bounced/suppressed events create an internal support item; complaints update relevant suppression. Verify corresponding platform settings before enabling.

Workflow 02 is explicit Starter Pack signup, with immediate Beehiiv delivery and one welcome sequence. Workflow 03 is permitted preparation before a known upcoming trip. Workflow 04 requests feedback 1–2 days after trip end; unknown dates require asking whether the trip occurred. Workflow 05 invites only eligible, opted-in nonmembers to AHA. Workflow 06 starts from verified payment and validates membership access. Recheck permission, suppression, trip dates/cancellation and membership before each promotional send.

## Activation checks

1. Merge reviewed code and verify preview/production checks.
2. Provision and test durable receiver, correct location mapping and deduplication; set its HTTPS URL and server-only token (at least 32 characters).
3. Create the Resend webhook at `https://sage.healthandtravels.com/api/resend-webhook`; set its signing secret in RESEND_WEBHOOK_SECRET. Configure sender domain and webhook within the correct Resend account.
4. Test one requested itinerary to an authorized test inbox: inspect exact rendered plan, accepted message ID, signed delivered event, CRM record and suppression behavior. Do not claim inbox reading from delivered status.
5. Replay an event twice, reorder events, simulate a failed sink, and verify trip A / trip B separation. Test no consent, opt-out, cancellation and existing-member branches before publishing any nurture.

Do not announce automated follow-ups until these checks pass. Actual account fields, webhook and workflow publication are pending; no production configuration or customer messaging was changed by this implementation.

References: https://resend.com/docs/webhooks/verify-webhooks-requests ; https://resend.com/docs/webhooks/event-types ; https://resend.com/docs/api-reference/emails/send-email
