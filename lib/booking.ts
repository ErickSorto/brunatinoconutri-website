import { createHash, randomUUID } from "node:crypto";

export type BusyRange = { start: string; end: string };
export type BookingInput = { name: string; email: string; phone: string; language: "pt" | "en"; audience: "brazil-us" | "brazil" | "international"; goals: number[]; startsAt: string; timeZone: string; requestId: string };
export type BookingResult = { status: "confirmed"; startsAt: string; endsAt: string; joinUrl: string; reference: string };
export class BookingError extends Error {
  status: number;
  code: string;
  constructor(code: string, status = 503) { super(code); this.name = "BookingError"; this.code = code; this.status = status; }
}

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const GOOGLE = "https://www.googleapis.com/calendar/v3";
const ZOOM = "https://api.zoom.us/v2";
const GOALS = ["Everyday eating routine", "Grocery choices", "Relationship with food", "Understanding the program"];

export function isTimeZone(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 80) return false;
  try { new Intl.DateTimeFormat("en", { timeZone: value }).format(); return true; } catch { return false; }
}

export function getSchedule() {
  const timeZone = process.env.BOOKING_TIMEZONE || "America/New_York";
  const startHour = Number(process.env.BOOKING_START_HOUR || 8);
  const endHour = Number(process.env.BOOKING_END_HOUR || 18);
  const leadHours = Number(process.env.BOOKING_LEAD_HOURS || 24);
  if (!isTimeZone(timeZone) || !Number.isInteger(startHour) || !Number.isInteger(endHour) || startHour < 0 || endHour > 24 || endHour <= startHour || !Number.isFinite(leadHours) || leadHours < 1 || leadHours > 720) throw new BookingError("configuration");
  return { timeZone, startHour, endHour, leadHours };
}

export function localDate(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => parts.find(part => part.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function monthRange(month: string, now = new Date()) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new BookingError("invalid_month", 400);
  const [year, m] = month.split("-").map(Number);
  const start = new Date(Date.UTC(year, m - 1, 1) - DAY);
  const end = new Date(Date.UTC(year, m, 1) + DAY);
  if (end.getTime() < now.getTime() || start.getTime() > now.getTime() + 92 * DAY) throw new BookingError("invalid_month", 400);
  return { start, end };
}

export function candidateSlots(start: Date, end: Date, busy: BusyRange[], now = new Date(), schedule = getSchedule()) {
  const results: string[] = [];
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: schedule.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const earliest = now.getTime() + schedule.leadHours * HOUR;
  const latest = now.getTime() + 90 * DAY;
  const ranges = busy.map(item => ({ start: Date.parse(item.start), end: Date.parse(item.end) }));
  if (ranges.some(item => !Number.isFinite(item.start) || !Number.isFinite(item.end) || item.end <= item.start)) throw new BookingError("availability_unavailable");
  // Iterate absolute instants, then inspect Bruna's local business hours. DST and
  // the visitor's time zone never change the appointment's actual instant.
  for (let time = Math.ceil(start.getTime() / (HOUR / 2)) * (HOUR / 2); time + HOUR <= end.getTime(); time += HOUR / 2) {
    if (time < earliest || time > latest) continue;
    const parts = fmt.formatToParts(new Date(time));
    const part = (type: string) => parts.find(p => p.type === type)?.value;
    const hour = Number(part("hour"));
    if (["Sat", "Sun"].includes(part("weekday") || "") || part("minute") !== "00" || hour < schedule.startHour || hour + 1 > schedule.endHour) continue;
    if (ranges.some(item => time < item.end && time + HOUR > item.start)) continue;
    results.push(new Date(time).toISOString());
  }
  return results;
}

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new BookingError("not_configured");
  return value;
}

export function assertConfigured() {
  ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN", "GOOGLE_CALENDAR_ID", "ZOOM_ACCOUNT_ID", "ZOOM_CLIENT_ID", "ZOOM_CLIENT_SECRET", "ZOOM_USER_ID", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"].forEach(required);
  const redisUrl = new URL(required("UPSTASH_REDIS_REST_URL"));
  if (redisUrl.protocol !== "https:") throw new BookingError("configuration");
  getSchedule();
}

async function jsonRequest(url: string, init: RequestInit = {}) {
  let response: Response;
  try { response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(12_000) }); }
  catch { throw new BookingError("provider_unavailable"); }
  if (!response.ok) throw new BookingError(response.status === 409 ? "slot_taken" : "provider_unavailable", response.status === 409 ? 409 : 503);
  if (response.status === 204) return {};
  try { return await response.json(); } catch { throw new BookingError("provider_unavailable"); }
}

async function googleToken(): Promise<string> {
  const data = await jsonRequest("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({ client_id: required("GOOGLE_CLIENT_ID"), client_secret: required("GOOGLE_CLIENT_SECRET"), refresh_token: required("GOOGLE_REFRESH_TOKEN"), grant_type: "refresh_token" }) });
  if (typeof data.access_token !== "string") throw new BookingError("provider_unavailable");
  return data.access_token;
}

async function zoomToken(): Promise<string> {
  const data = await jsonRequest("https://zoom.us/oauth/token", { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${required("ZOOM_CLIENT_ID")}:${required("ZOOM_CLIENT_SECRET")}`).toString("base64")}` }, body: new URLSearchParams({ grant_type: "account_credentials", account_id: required("ZOOM_ACCOUNT_ID") }) });
  if (typeof data.access_token !== "string") throw new BookingError("provider_unavailable");
  return data.access_token;
}

function google(token: string, path: string, method = "GET", body?: unknown) {
  return jsonRequest(`${GOOGLE}${path}`, { method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
}

async function busyRanges(token: string, start: Date, end: Date): Promise<BusyRange[]> {
  const calendarId = required("GOOGLE_CALENDAR_ID");
  const ids = [...new Set([calendarId, ...(process.env.GOOGLE_BUSY_CALENDAR_IDS || "").split(",").map(id => id.trim()).filter(Boolean)])];
  const data = await google(token, "/freeBusy", "POST", { timeMin: start.toISOString(), timeMax: end.toISOString(), items: ids.map(id => ({ id })) });
  const busy: BusyRange[] = [];
  for (const id of ids) {
    const calendar = data.calendars?.[id];
    // Fail closed when any connected calendar cannot be checked.
    if (!calendar || calendar.errors?.length || !Array.isArray(calendar.busy)) throw new BookingError("availability_unavailable");
    busy.push(...calendar.busy);
  }
  return busy;
}

export async function availability(month: string, timeZone: string) {
  if (!isTimeZone(timeZone)) throw new BookingError("invalid_timezone", 400);
  const { start, end } = monthRange(month);
  assertConfigured();
  const token = await googleToken();
  const slots = candidateSlots(start, end, await busyRanges(token, start, end));
  return { slots: slots.filter(slot => localDate(new Date(slot), timeZone).startsWith(month)), timeZone, durationMinutes: 60 };
}

export function parseBooking(value: unknown): BookingInput {
  if (!value || typeof value !== "object") throw new BookingError("invalid_details", 400);
  const data = value as Record<string, unknown>;
  const string = (key: string, max: number) => typeof data[key] === "string" && data[key].trim().length > 0 && data[key].length <= max && !/[\u0000-\u001f<>]/.test(data[key]) ? data[key].trim() : "";
  const name = string("name", 100), email = string("email", 254).toLowerCase(), phone = string("phone", 30), requestId = string("requestId", 36), startsAt = string("startsAt", 30);
  const goals = data.goals === undefined ? (data.goal == null ? [] : [data.goal]) : data.goals;
  if (!Array.isArray(goals) || goals.length > 4 || goals.some(goal => !Number.isInteger(goal) || goal < 0 || goal > 3) || new Set(goals).size !== goals.length) throw new BookingError("invalid_details", 400);
  if ((data.phone !== undefined && data.phone !== "" && (typeof data.phone !== "string" || !phone || !/^[+()\d\s.-]{7,30}$/.test(phone) || phone.replace(/\D/g, "").length < 7)) || !name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId) || !Number.isFinite(Date.parse(startsAt)) || !isTimeZone(data.timeZone) || !["pt", "en"].includes(data.language as string) || !["brazil-us", "brazil", "international"].includes(data.audience as string)) throw new BookingError("invalid_details", 400);
  return { name, email, phone, requestId, startsAt: new Date(startsAt).toISOString(), timeZone: data.timeZone, language: data.language as "pt" | "en", audience: data.audience as BookingInput["audience"], goals: goals as number[] };
}

async function redis(command: (string | number)[]) {
  const data = await jsonRequest(required("UPSTASH_REDIS_REST_URL"), { method: "POST", headers: { Authorization: `Bearer ${required("UPSTASH_REDIS_REST_TOKEN")}`, "Content-Type": "application/json" }, body: JSON.stringify(command) });
  if (data.error) throw new BookingError("provider_unavailable");
  return data.result;
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex");

export async function rateLimit(ip: string, kind: "read" | "write") {
  const key = `bt:rate:${kind}:${hash(ip)}:${Math.floor(Date.now() / HOUR)}`;
  const count = await redis(["EVAL", "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],3600) end; return n", 1, key]);
  if (count > (kind === "read" ? 120 : 12)) throw new BookingError("rate_limited", 429);
}

export async function reserveConsultation(input: BookingInput): Promise<BookingResult> {
  assertConfigured();
  const fingerprint = hash(JSON.stringify(input));
  const resultKey = `bt:request:${input.requestId}`;
  const cached = await redis(["GET", resultKey]);
  if (cached) {
    const previous = JSON.parse(cached);
    if (previous.fingerprint !== fingerprint) throw new BookingError("invalid_request", 409);
    if (previous.result) return previous.result;
    throw new BookingError("needs_attention", 503);
  }
  const start = new Date(input.startsAt), end = new Date(start.getTime() + HOUR);
  if (!candidateSlots(start, end, []).includes(input.startsAt)) throw new BookingError("slot_taken", 409);
  const lockKey = `bt:slot:${input.startsAt}`, lockToken = randomUUID();
  if (await redis(["SET", lockKey, lockToken, "NX", "EX", 180]) !== "OK") throw new BookingError("slot_taken", 409);
  let eventId = "", token = "";
  const eventsPath = `/calendars/${encodeURIComponent(required("GOOGLE_CALENDAR_ID"))}/events`;
  const save = async (result: BookingResult) => {
    await redis(["SET", resultKey, JSON.stringify({ fingerprint, result }), "EX", 604800]);
    return result;
  };
  const extractResult = (event: { start?: { dateTime?: string }; end?: { dateTime?: string }; location?: string; extendedProperties?: { private?: Record<string, string> } }): BookingResult | null => {
    const props = event.extendedProperties?.private;
    if (props?.requestId === input.requestId && props.fingerprint === fingerprint && props.bookingStatus === "confirmed" && event.location?.startsWith("https://") && event.start?.dateTime && event.end?.dateTime) return { status: "confirmed", startsAt: event.start.dateTime, endsAt: event.end.dateTime, joinUrl: event.location, reference: eventId.slice(-10).toUpperCase() };
    return null;
  };
  try {
    token = await googleToken();
    // Stable slot IDs also let a retry recover after a server restart or lost response.
    const intendedEventId = `bt${hash(`${input.startsAt}:${input.requestId}`).slice(0, 40)}`;
    const lookup = await fetch(`${GOOGLE}${eventsPath}/${intendedEventId}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store", signal: AbortSignal.timeout(12_000) });
    if (lookup.ok) {
      const event = await lookup.json();
      eventId = intendedEventId;
      const result = extractResult(event);
      if (result) return await save(result);
      const ownPending = event.extendedProperties?.private?.requestId === input.requestId;
      // Never mutate another request's event, including a cancelled tombstone.
      eventId = "";
      throw new BookingError(ownPending ? "needs_attention" : "slot_taken", ownPending ? 503 : 409);
    }
    if (lookup.status !== 404) { eventId = ""; throw new BookingError("provider_unavailable"); }
    const zoomAccess = await zoomToken();
    const host = encodeURIComponent(required("ZOOM_USER_ID"));
    const zoomHeaders = { Authorization: `Bearer ${zoomAccess}`, "Content-Type": "application/json" };
    const zoomUser = await jsonRequest(`${ZOOM}/users/${host}`, { headers: zoomHeaders });
    if (zoomUser.type !== 2) throw new BookingError("zoom_license_required");
    const busy = await busyRanges(token, start, end);
    if (!candidateSlots(start, end, busy).includes(input.startsAt)) { eventId = ""; throw new BookingError("slot_taken", 409); }
    // Distributed lock guards inserts from different server instances. Google is
    // checked again under that lock; an opaque hold blocks subsequent visitors.
    const holdId = intendedEventId;
    eventId = holdId;
    await google(token, eventsPath, "POST", { id: holdId, summary: "BT · Consultation being prepared", start: { dateTime: input.startsAt }, end: { dateTime: end.toISOString() }, visibility: "private", transparency: "opaque", extendedProperties: { private: { requestId: input.requestId, fingerprint, bookingStatus: "pending" } } });
    const meeting = await jsonRequest(`${ZOOM}/users/${host}/meetings`, { method: "POST", headers: zoomHeaders, body: JSON.stringify({ topic: input.language === "pt" ? "Consulta inicial | Bruna Tinoco" : "Initial consultation | Bruna Tinoco", type: 2, start_time: input.startsAt, duration: 60, timezone: input.timeZone, password: randomUUID().replaceAll("-", "").slice(0, 10), settings: { waiting_room: true, join_before_host: false, approval_type: 2, audio: "both", auto_recording: "none" } }) });
    const join = new URL(meeting.join_url);
    if (join.protocol !== "https:" || !(join.hostname === "zoom.us" || join.hostname.endsWith(".zoom.us"))) throw new BookingError("provider_unavailable");
    const pt = input.language === "pt";
    const description = [pt ? "Sua consulta inicial gratuita de 1 hora com Bruna Tinoco." : "Your free one-hour initial consultation with Bruna Tinoco.", `Zoom: ${join.toString()}`, `${pt ? "Nome" : "Name"}: ${input.name}`, ...(input.phone ? [`Phone / WhatsApp: ${input.phone}`] : []), `${pt ? "Idioma" : "Language"}: ${pt ? "Português" : "English"}`, `Audience: ${input.audience}`, ...(input.goals.length ? [`Focus: ${input.goals.map(goal => GOALS[goal]).join("; ")}`] : []), pt ? "Para remarcar ou cancelar: https://wa.me/5522999595715" : "To reschedule or cancel: https://wa.me/5522999595715"].join("\n");
    const event = await google(token, `${eventsPath}/${eventId}?sendUpdates=all`, "PATCH", { summary: pt ? "Consulta gratuita | Bruna Tinoco" : "Free consultation | Bruna Tinoco", description, location: join.toString(), attendees: [{ email: input.email, displayName: input.name }], guestsCanModify: false, guestsCanInviteOthers: false, guestsCanSeeOtherGuests: false, extendedProperties: { private: { requestId: input.requestId, fingerprint, bookingStatus: "confirmed", zoomMeetingId: String(meeting.id) } } });
    const result = extractResult(event);
    if (!result) throw new BookingError("provider_unavailable");
    return await save(result);
  } catch (error) {
    if (eventId && token) {
      // A provider timeout may have completed remotely. Read before deciding the
      // outcome; never send a second invitation or create a second Zoom meeting.
      try {
        const event = await google(token, `${eventsPath}/${eventId}`);
        const result = extractResult(event);
        if (result) { await save(result).catch(() => {}); return result; }
        if (event.extendedProperties?.private?.requestId === input.requestId) {
          await google(token, `${eventsPath}/${eventId}`, "PATCH", { summary: "BT · Booking needs attention — no confirmation", description: `Website booking interrupted. Contact: ${input.email}. Check Zoom before retrying. Request: ${input.requestId}`, extendedProperties: { private: { requestId: input.requestId, fingerprint, bookingStatus: "needs_attention" } } });
        }
      } catch { /* Preserve the hold: do not silently release an uncertain booking. */ }
      await redis(["SET", resultKey, JSON.stringify({ fingerprint, pending: true }), "EX", 604800]).catch(() => {});
      console.error("Booking requires review", { eventId, code: error instanceof BookingError ? error.code : "provider_unavailable" });
      throw new BookingError("needs_attention", 503);
    }
    if (error instanceof BookingError) throw error;
    throw new BookingError("provider_unavailable");
  } finally {
    await redis(["EVAL", "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end", 1, lockKey, lockToken]).catch(() => {});
  }
}
