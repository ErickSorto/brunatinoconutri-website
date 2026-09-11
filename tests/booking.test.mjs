import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { candidateSlots, localDate, monthRange, parseBooking, reserveConsultation, availability, rateLimit } from '../lib/booking.ts';

const realFetch = globalThis.fetch;
const oldEnv = { ...process.env };
let store, events, zoomMeetings, invitations, behavior;
const response = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

beforeEach(() => {
  Object.assign(process.env, { GOOGLE_CLIENT_ID: 'test', GOOGLE_CLIENT_SECRET: 'test', GOOGLE_REFRESH_TOKEN: 'test', GOOGLE_CALENDAR_ID: 'primary', GOOGLE_BUSY_CALENDAR_IDS: '', ZOOM_ACCOUNT_ID: 'test', ZOOM_CLIENT_ID: 'test', ZOOM_CLIENT_SECRET: 'test', ZOOM_USER_ID: 'test-host', UPSTASH_REDIS_REST_URL: 'https://test-redis.example', UPSTASH_REDIS_REST_TOKEN: 'test', BOOKING_TIMEZONE: 'America/New_York', BOOKING_START_HOUR: '8', BOOKING_END_HOUR: '18', BOOKING_LEAD_HOURS: '24' });
  store = new Map(); events = new Map(); zoomMeetings = 0; invitations = 0; behavior = {};
  globalThis.fetch = async (urlValue, init = {}) => {
    const url = new URL(urlValue);
    const body = typeof init.body === 'string' ? JSON.parse(init.body) : {};
    if (url.hostname === 'test-redis.example') {
      const [op, key, value, ...args] = body;
      if (op === 'GET') return response({ result: store.get(key) ?? null });
      if (op === 'SET') { if (args.includes('NX') && store.has(key)) return response({ result: null }); store.set(key, value); return response({ result: 'OK' }); }
      if (op === 'EVAL' && key.includes('INCR')) { const countKey = body[3]; store.set(countKey, (store.get(countKey) || 0) + 1); return response({ result: store.get(countKey) }); }
      if (op === 'EVAL') { if (store.get(body[3]) === body[4]) store.delete(body[3]); return response({ result: 1 }); }
    }
    if (url.hostname === 'oauth2.googleapis.com' || url.hostname === 'zoom.us') return response({ access_token: 'test-token' });
    if (url.pathname.endsWith('/freeBusy')) {
      const busy = [...events.values()].filter(event => event.status !== 'cancelled').map(event => ({ start: event.start.dateTime, end: event.end.dateTime }));
      return response({ calendars: { primary: behavior.freebusyError ? { errors: [{ reason: 'notFound' }] } : { busy: [...busy, ...(behavior.busy || [])] } } });
    }
    if (url.hostname === 'api.zoom.us') {
      if (init.method !== 'POST') return response({ type: behavior.unlicensed ? 1 : 2 });
      if (behavior.zoomFail) return response({}, 503);
      assert.equal(body.duration, 60); assert.equal(body.settings.waiting_room, true); assert.equal(body.settings.auto_recording, 'none');
      zoomMeetings++;
      return response({ id: zoomMeetings, join_url: 'https://us02web.zoom.us/j/123?pwd=test', start_url: 'https://zoom.us/private-host-secret' });
    }
    if (url.pathname.includes('/events')) {
      const id = url.pathname.split('/').at(-1);
      if (init.method === 'POST') {
        if (events.has(body.id)) return response({}, 409);
        events.set(body.id, structuredClone(body));
        if (behavior.insertLostResponse) { behavior.insertLostResponse = false; throw new Error('connection lost'); }
        return response(body);
      }
      if (init.method === 'PATCH') {
        const previous = events.get(id);
        const updated = { ...previous, ...body };
        events.set(id, updated);
        if (body.attendees) invitations++;
        if (body.attendees && behavior.patchLostResponse) { behavior.patchLostResponse = false; throw new Error('response lost after success'); }
        return response(updated);
      }
      return events.has(id) ? response(events.get(id)) : response({}, 404);
    }
    throw new Error(`Unexpected mocked request: ${url.origin}${url.pathname}`);
  };
});
afterEach(() => { globalThis.fetch = realFetch; for (const key of Object.keys(process.env)) if (!(key in oldEnv)) delete process.env[key]; Object.assign(process.env, oldEnv); });

function booking(overrides = {}) {
  const now = new Date();
  const slots = candidateSlots(now, new Date(now.getTime() + 10 * 86400000), []);
  return parseBooking({ name: 'Test Visitor', email: 'visitor@example.com', phone: '+1 (555) 123-4567', audience: 'international', language: 'en', goal: 1, startsAt: slots[0], timeZone: 'America/New_York', requestId: randomUUID(), ...overrides });
}

test('business hours follow Eastern daylight saving changes and exclude weekends', () => {
  const slots = candidateSlots(new Date('2026-10-30T00:00:00Z'), new Date('2026-11-03T00:00:00Z'), [], new Date('2026-10-01T00:00:00Z'));
  assert.ok(slots.includes('2026-10-30T12:00:00.000Z'));
  assert.ok(slots.includes('2026-11-02T13:00:00.000Z'));
  assert.ok(!slots.includes('2026-11-02T12:00:00.000Z'));
  assert.ok(!slots.some(slot => slot.startsWith('2026-10-31') || slot.startsWith('2026-11-01')));
  assert.equal(localDate(new Date('2026-10-30T02:00:00Z'), 'America/Los_Angeles'), '2026-10-29');
});

test('partial overlaps block the entire hour; adjacent appointments do not', () => {
  const slots = candidateSlots(new Date('2026-10-05T12:00:00Z'), new Date('2026-10-05T18:00:00Z'), [{ start: '2026-10-05T13:30:00Z', end: '2026-10-05T14:30:00Z' }], new Date('2026-10-01T00:00:00Z'));
  assert.deepEqual(slots, ['2026-10-05T12:00:00.000Z', '2026-10-05T15:00:00.000Z', '2026-10-05T16:00:00.000Z', '2026-10-05T17:00:00.000Z']);
});

test('lead time, horizon, month and input validation reject invalid requests', () => {
  assert.deepEqual(candidateSlots(new Date('2026-10-05T12:00:00Z'), new Date('2026-10-05T18:00:00Z'), [], new Date('2026-10-05T00:00:00Z')), []);
  assert.throws(() => monthRange('2026-13'), /invalid_month/);
  assert.throws(() => booking({ email: 'invalid' }), /invalid_details/);
  assert.throws(() => booking({ phone: 'abc' }), /invalid_details/);
  assert.throws(() => booking({ phone: '' }), /invalid_details/);
  assert.throws(() => booking({ name: '<script>test' }), /invalid_details/);
  assert.throws(() => booking({ goal: 4 }), /invalid_details/);
  assert.throws(() => booking({ timeZone: 'Mars/Test' }), /invalid_details/);
});

test('successful booking creates one Zoom meeting and one invitation; retries are idempotent', async () => {
  const input = booking();
  const first = await reserveConsultation(input);
  const second = await reserveConsultation(input);
  assert.equal(first.status, 'confirmed'); assert.deepEqual(first, second);
  assert.equal(zoomMeetings, 1); assert.equal(invitations, 1);
  assert.ok(!JSON.stringify(first).includes('private-host-secret'));
  assert.equal(Date.parse(first.endsAt) - Date.parse(first.startsAt), 3600000);
  assert.match([...events.values()][0].description, /English/);
});

test('simultaneous attempts for a single slot yield only one booking', async () => {
  const first = booking(); const second = { ...first, requestId: randomUUID(), email: 'second@example.com' };
  const results = await Promise.allSettled([reserveConsultation(first), reserveConsultation(second)]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  assert.equal(results.find(result => result.status === 'rejected').reason.code, 'slot_taken');
  assert.equal(zoomMeetings, 1); assert.equal(invitations, 1);
});

test('Google freebusy errors fail closed, with no meeting or invitation', async () => {
  behavior.freebusyError = true;
  await assert.rejects(reserveConsultation(booking()), /availability_unavailable/);
  assert.equal(events.size, 0); assert.equal(zoomMeetings, 0);
});

test('an unlicensed Zoom host cannot reserve a one-hour consultation', async () => {
  behavior.unlicensed = true;
  await assert.rejects(reserveConsultation(booking()), /zoom_license_required/);
  assert.equal(events.size, 0); assert.equal(invitations, 0);
});

test('a lost final response is recovered from Google without duplicate sends', async () => {
  behavior.patchLostResponse = true;
  const result = await reserveConsultation(booking());
  assert.equal(result.status, 'confirmed'); assert.equal(zoomMeetings, 1); assert.equal(invitations, 1);
});

test('Zoom failure retains an actionable hold and never claims success', async () => {
  behavior.zoomFail = true;
  const input = booking();
  await assert.rejects(reserveConsultation(input), /needs_attention/);
  await assert.rejects(reserveConsultation(input), /needs_attention/);
  assert.equal(events.size, 1); assert.equal(invitations, 0);
  assert.equal([...events.values()][0].extendedProperties.private.bookingStatus, 'needs_attention');
});

test('a lost insert response preserves the hold for review', async () => {
  behavior.insertLostResponse = true;
  await assert.rejects(reserveConsultation(booking()), /needs_attention/);
  assert.equal(events.size, 1); assert.equal(zoomMeetings, 0); assert.equal(invitations, 0);
});

test('a cancelled old event does not prevent a new visitor booking the freed slot', async () => {
  const first = booking(); await reserveConsultation(first);
  [...events.values()][0].status = 'cancelled';
  const result = await reserveConsultation({ ...first, requestId: randomUUID() });
  assert.equal(result.status, 'confirmed'); assert.equal(zoomMeetings, 2);
});

test('availability exposes only slots, and booking writes are rate limited', async () => {
  const input = booking();
  const result = await availability(input.startsAt.slice(0, 7), 'America/Sao_Paulo');
  assert.ok(result.slots.length); assert.deepEqual(Object.keys(result).sort(), ['durationMinutes', 'slots', 'timeZone']);
  for (let i = 0; i < 12; i++) await rateLimit('192.0.2.1', 'write');
  await assert.rejects(rateLimit('192.0.2.1', 'write'), /rate_limited/);
});

test('missing credentials cannot create a booking or expose fake availability', async () => {
  delete process.env.ZOOM_CLIENT_SECRET;
  await assert.rejects(reserveConsultation(booking()), /not_configured/);
  assert.equal(events.size, 0);
});

 test('multiple consultation interests are validated and included in the invitation', async () => {
  const input = booking({ goals: [0, 2] });
  assert.deepEqual(input.goals, [0, 2]);
  assert.deepEqual(booking({ goals: [] }).goals, []);
  for (const goals of [[0, 0], [4], [1.5], ['1'], 'food', null]) {
    assert.throws(() => booking({ goals }), /invalid_details/);
  }
  await reserveConsultation(input);
  assert.match([...events.values()][0].description, /Focus: Everyday eating routine; Relationship with food/);
});
