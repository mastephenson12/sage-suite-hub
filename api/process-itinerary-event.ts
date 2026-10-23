import { timingSafeEqual } from 'node:crypto';

const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const objectKey = 'custom_objects.sage_email_attempts';
const rank: Record<string, number> = { accepted: 1, delayed: 2, delivered: 3, failed: 4, bounced: 5, suppressed: 6, complained: 7 };
type DeliveryEvent = { schemaVersion: number; source: string; purpose: string; eventId: string; event: string; occurredAt: string; messageId: string; planVersionId: string; recipient: string; status: string };
type Properties = Record<string, string>;
const sameProperties = (actual: any, expected: Properties) => !!actual && Object.entries(expected).every(([key, value]) => value === '' ? !actual[key] : actual[key] === value);

function response(status: number, body: object) { return Response.json(body, { status, headers }); }
export async function GET() { return response(405, { error: 'Method not allowed' }); }

// Terminal outcomes and suppression cannot be erased by late accepted/delayed events.
export function selectDeliveryState(previous: Properties | undefined, event: DeliveryEvent) {
  if (!previous) return { status: event.status, occurredAt: event.occurredAt, eventId: event.eventId };
  if (!Object.hasOwn(rank, previous.delivery_status) || !Number.isFinite(Date.parse(previous.status_occurred_at))) throw new Error('Invalid stored state');
  const newer = Date.parse(event.occurredAt) > Date.parse(previous.status_occurred_at);
  const replace = rank[event.status] > rank[previous.delivery_status] || (rank[event.status] === rank[previous.delivery_status] && newer);
  return replace ? { status: event.status, occurredAt: event.occurredAt, eventId: event.eventId }
    : { status: previous.delivery_status, occurredAt: previous.status_occurred_at, eventId: previous.last_event_id };
}

function validEvent(e: any): e is DeliveryEvent {
  return e && e.schemaVersion === 1 && e.source === 'sage_resend' && e.purpose === 'transactional_itinerary' &&
    typeof e.status === 'string' && Object.hasOwn(rank, e.status) && e.event === `itinerary_email_${e.status}` &&
    typeof e.eventId === 'string' && /^[a-zA-Z0-9_-]{1,160}$/.test(e.eventId) &&
    typeof e.messageId === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(e.messageId) &&
    typeof e.planVersionId === 'string' && /^[a-f0-9]{64}$/.test(e.planVersionId) &&
    typeof e.recipient === 'string' && e.recipient.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.recipient) &&
    typeof e.occurredAt === 'string' && Number.isFinite(Date.parse(e.occurredAt));
}

export async function POST(req: Request) {
  const workerKey = process.env.ITINERARY_WORKER_TOKEN;
  const token = process.env.GHL_DELIVERY_TOKEN;
  const locationId = process.env.GHL_DELIVERY_LOCATION_ID;
  if (!workerKey || workerKey.length < 32 || !token || !locationId) return response(503, { error: 'CRM delivery processing is not configured.' });
  const supplied = req.headers.get('authorization') || '';
  const expected = `Bearer ${workerKey}`;
  if (Buffer.byteLength(supplied) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))) return response(401, { error: 'Unauthorized' });
  const reader = req.body?.getReader();
  if (!reader) return response(400, { error: 'Missing event' });
  let size = 0;
  const chunks: Uint8Array[] = [];
  let event: DeliveryEvent;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16_000) { await reader.cancel(); return response(413, { error: 'Event too large' }); }
      chunks.push(value);
    }
    const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!validEvent(parsed)) return response(400, { error: 'Invalid delivery event' });
    event = { ...parsed, recipient: parsed.recipient.toLowerCase() };
  } catch { return response(400, { error: 'Invalid delivery event' }); }
  finally { reader.releaseLock(); }

  async function api(path: string, method = 'GET', body?: object): Promise<any> {
    const r = await fetch(`https://services.leadconnectorhq.com${path}`, {
      method, redirect: 'error', signal: AbortSignal.timeout(8_000),
      headers: { Authorization: `Bearer ${token}`, Version: '2021-07-28', 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!r.ok) {
      if (r.status === 400 && method === 'POST' && path.endsWith('/records')) {
        const result = await r.json();
        const conflict = result.errors?.find((e: any) => e.errorCode === 'duplicate_record' && e.fieldKey === `${objectKey}.message_identity` && e.fieldValue === event.messageId);
        if (typeof conflict?.conflictingRecordId === 'string' && /^[a-zA-Z0-9_-]{1,128}$/.test(conflict.conflictingRecordId)) throw Object.assign(new Error('Duplicate CRM message'), { conflictId: conflict.conflictingRecordId });
      }
      throw new Error('CRM request failed');
    }
    return r.json();
  }
  async function findAttempt() {
    const result = await api(`/objects/${objectKey}/records/search`, 'POST', { locationId, page: 1, pageLimit: 100, query: event.messageId, searchAfter: [] });
    if (!Array.isArray(result.records) || result.total > 100) throw new Error('Incomplete CRM search');
    const matches = result.records.filter((r: any) => r.properties?.message_id === event.messageId);
    if (matches.length > 1) throw new Error('Ambiguous message');
    return matches[0];
  }
  try {
    let previous = await findAttempt();
    if (!previous) {
      // Reserve the unique ID before projecting state. Search indexing can lag behind commits.
      try {
        previous = (await api(`/objects/${objectKey}/records`, 'POST', { locationId, properties: {
          message_id: event.messageId, message_identity: event.messageId, recipient_email: event.recipient, plan_version_id: event.planVersionId,
          delivery_status: event.status, status_occurred_at: event.occurredAt, last_event_id: event.eventId,
        } })).record;
      } catch (error: any) {
        if (!error.conflictId) throw error;
        previous = (await api(`/objects/${objectKey}/records/${encodeURIComponent(error.conflictId)}?locationId=${encodeURIComponent(locationId)}`)).record;
      }
    }
    if (!previous?.id || (previous.locationId && previous.locationId !== locationId)) throw new Error('Missing or mismatched CRM record');
    if (previous && (previous.properties.recipient_email !== event.recipient || previous.properties.plan_version_id !== event.planVersionId)) return response(409, { error: 'Message identity conflict' });
    // Look up existing adult contacts only. A delivery event never creates a new lead or changes consent.
    const query = new URLSearchParams({ locationId, query: event.recipient, limit: '100' });
    const contactsResult = await api(`/contacts/?${query}`);
    if (!Array.isArray(contactsResult.contacts) || contactsResult.count > 100) throw new Error('Incomplete contact search');
    const contacts = contactsResult.contacts.filter((c: any) => c.locationId === locationId && c.email?.toLowerCase() === event.recipient);
    if (contacts.length > 1) return response(409, { error: 'Ambiguous CRM contact' });
    const contact = contacts[0];
    const state = selectDeliveryState(previous?.properties, event);
    const suppress = state.status === 'complained' || state.status === 'suppressed';
    if (suppress && contact && !contact.dnd && contact.dndSettings?.Email?.status !== 'active') {
      await api(`/contacts/${encodeURIComponent(contact.id)}`, 'PUT', { dndSettings: { ...contact.dndSettings, Email: { status: 'active', message: 'Sage itinerary email complaint or suppression' } } });
      const checked = (await api(`/contacts/${encodeURIComponent(contact.id)}`)).contact;
      if (checked?.locationId !== locationId || (!checked.dnd && checked.dndSettings?.Email?.status !== 'active')) throw new Error('Suppression not confirmed');
    }
    const properties: Properties = {
      message_id: event.messageId, message_identity: event.messageId, recipient_email: event.recipient, plan_version_id: event.planVersionId,
      delivery_status: state.status, status_occurred_at: state.occurredAt, last_event_id: state.eventId,
      matched_contact_id: contact?.id || '', suppression_required: suppress ? 'yes' : 'no',
      support_required: ['failed', 'bounced', 'suppressed', 'complained'].includes(state.status) ? 'yes' : 'no',
    };
    await api(`/objects/${objectKey}/records/${encodeURIComponent(previous.id)}?locationId=${encodeURIComponent(locationId)}`, 'PUT', { properties });
    const saved = (await api(`/objects/${objectKey}/records/${encodeURIComponent(previous.id)}?locationId=${encodeURIComponent(locationId)}`)).record;
    if (!saved || !sameProperties(saved.properties, properties)) throw new Error('CRM write not confirmed');
    return response(200, { processed: true, eventId: event.eventId, messageId: event.messageId, recordId: previous.id, status: state.status });
  } catch {
    // Keep Make's ledger event pending. Do not log recipient information or provider payloads.
    return response(502, { error: 'CRM delivery processing was not confirmed.' });
  }
}
