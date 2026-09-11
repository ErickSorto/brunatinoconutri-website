# Bruna's consultation booking

The dedicated `/booking` route is implemented. **Live bookings are not enabled until Bruna's accounts are authorized and the environment below is configured.** No credentials were supplied during implementation; no real calendar events, emails, or Zoom meetings have been created.

## Visitor experience

- Brazilian in the U.S.: Portuguese, familiar food, U.S. grocery guidance, patient app, and WhatsApp community.
- Brazilian in Brazil: Portuguese, local food and routines, patient app, and WhatsApp community.
- American / English: private, one-to-one English consultation and individual follow-up.
- All paths: free online consultation, 60 minutes, no package prices. Ongoing program resources are distinct from the free introductory call.
- Live calendar shows availability in the visitor's selected time zone. Details stay in component memory until the visitor confirms the booking. No marketing opt-in, health questionnaire, or browser storage is added.
- A real client video from the existing homepage is reused with an Instagram source link. Generated reviewer portraits and unverified written testimonials are not copied into this page.

## Connect Google Calendar

1. Enable the Google Calendar API in the Google Cloud project owned by Bruna or the business. Configure OAuth consent and a Web application OAuth client.
2. Register `http://localhost:3013/oauth/callback` as an authorized redirect URI for the local authorization helper. Add Bruna as a test user if the consent screen is in testing mode.
3. Copy `.env.example` to `.env.local`, and enter `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` locally. Do not paste secrets in chat or commit them.
4. Run `node --env-file=.env.local scripts/connect-google-calendar.mjs`. Open the printed authorization link and let **Bruna** authorize her account. The helper checks OAuth state and saves the refresh token directly to `.env.local`; it never prints the token.
5. Set `GOOGLE_CALENDAR_ID` to the calendar that should receive consultations (`primary` is supported). Add other calendars that should block appointments to `GOOGLE_BUSY_CALENDAR_IDS`, separated by commas.
6. For lasting access, finish the OAuth app's production configuration. Google test-mode authorizations can expire. The requested scopes are `calendar.events` and `calendar.freebusy`, not full account access.

Primary documentation: [Google OAuth web flow](https://developers.google.com/identity/protocols/oauth2/web-server), [free/busy](https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query), [event creation and invitation updates](https://developers.google.com/workspace/calendar/api/v3/reference/events/insert).

## Connect Zoom

Create and activate an internal Server-to-Server OAuth app in Bruna's Zoom account. Set `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, and `ZOOM_USER_ID` in the environment. Give it permission to create meetings for Bruna and read her user profile (the API documents these as `meeting:write:meeting:admin` and `user:read:user:admin`; use the matching scopes shown in the Zoom app console).

The host must have a **licensed** Zoom account supporting the advertised one-hour meeting. The integration checks that the host is licensed before reserving a slot. Each booking creates a unique scheduled meeting with a passcode and waiting room, no joining before the host, and no automatic recording. Only the participant `join_url` is returned, never the host's private `start_url`.

Primary documentation: [Zoom Server-to-Server OAuth](https://developers.zoom.us/docs/internal-apps/s2s-oauth/), [Zoom Meetings API](https://developers.zoom.us/docs/api/meetings/), [Zoom Users API](https://developers.zoom.us/docs/api/users/).

## Slot locking and deployment

Provision an Upstash Redis database and set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. Redis provides atomic slot locks across server instances, rate limiting, and idempotency for retried requests. Successful booking responses (including the participant link) are retained for seven days. Treat the database as private; it is never accessed directly from the browser.

Copy the configured environment values into the deployment's secret environment settings, set `NEXT_PUBLIC_SITE_URL` to the exact deployed origin, and redeploy. No secrets use the `NEXT_PUBLIC_` prefix. The POST endpoint checks the request origin. Use the canonical site origin for bookings, including its `www` choice.

Hours default to the previous site's Monday–Friday 08:00–18:00 in `America/New_York`, with the last one-hour start at 17:00. This implementation adds a configurable 24-hour lead time and a 90-day booking horizon. **Confirm those operational settings with Bruna before enabling live booking.** Adjust the environment values; block holidays, breaks, and days off in a connected Google calendar.

## Transaction and failure behavior

1. Validate contact fields, language, audience, slot, and time zone. Limit requests before contacting providers.
2. Acquire a distributed lock and recheck all connected Google calendars.
3. Create a private, opaque calendar hold; create a Zoom meeting; then add the attendee and send the Google Calendar invitation containing the Zoom link.
4. Show confirmation only after both providers have succeeded. A retry uses the same request ID and recovers an existing result instead of sending a second invitation.
5. If a response is ambiguous after the hold is created, read the Google event again. If it cannot be confirmed, retain the hold, label it `Booking needs attention`, and direct the visitor to Bruna. Never automatically release a potentially confirmed appointment. Logs contain an event ID and error code, not contact information or tokens.

If a hold needs attention, inspect the Google event and Zoom account, contact the visitor, and either finish the booking manually or remove the unconfirmed hold and any orphaned Zoom meeting. Remove the corresponding `bt:request:<requestId>` Redis entry only if deliberately retrying that same failed request. A fresh request for a freed slot gets a different event ID, so cancelled event tombstones do not block new bookings.

External edits to Google Calendar are outside the website's distributed lock. Bruna should avoid manually inserting a conflicting event during an in-progress booking. Rechecking availability and then creating an opaque hold narrows that window but cannot make separate providers transactional.

Rescheduling and cancellation are coordinated directly with Bruna via WhatsApp; self-service cancellation is not implemented. Invitations include this contact link. Google sends the invitation; delivery depends on the attendee's mail/calendar settings. The confirmation screen also offers a Zoom link and `.ics` download.

## Verification before enabling

Run `pnpm lint`, `pnpm exec tsc --noEmit`, `node --test tests/booking.test.mjs`, and `pnpm build`. Automated tests use fake providers and never send messages.

After connecting the accounts, make one explicitly approved test booking with a real test inbox. Confirm Google conflict blocking, Zoom's full 60-minute duration, invite delivery, visitor time-zone conversion, and a simultaneous second request for the same slot. Clean up that test event and meeting afterward. This final live-account check cannot be replaced by mocked tests.

Until configuration is complete, the page clearly says the agenda is being prepared and offers Bruna's existing WhatsApp as a contact fallback. It does not invent available slots or claim an appointment has been confirmed.

### Local calendar demo
When running `pnpm dev` without provider credentials, availability returns labeled demo slots using the configured business hours. Date, time, month and timezone controls work; confirming renders a client-only preview and never calls the booking POST endpoint. Production retains the unavailable state until providers are connected. Phone/WhatsApp is required and included in live invitation details.
