# Date-first booking

The flow is audience → experience → calendar → contact details and confirmation.

- Calendar opens the first available day; rounded-square day targets replace circles.
- Picking a time does not reserve it. The booking API still rechecks availability on confirmation.
- The chosen slot, time zone and demo status pass into confirmation; changing the time preserves entered contact details.
- Name and email remain required. Phone is optional on the client and server, with validation if supplied. Optional interests are disclosed on demand.
- Sticky actions follow the current stage. The existing branded success animation and final screen remain.
- API behavior remains unchanged for real bookings: idempotent requests, availability conflict handling and uncertain reservations.

Validation: 16 backend tests passed, TypeScript and ESLint passed. Browser-tested selecting a time before contact details, changing that time while preserving name/email, and completing demo confirmation without a phone number. The local preview does not send invitations or create meetings.

## Hosted preview for Bruna

When booking providers are not configured, availability returns clearly marked demo slots in all environments, including production. Bruna can choose a date, fill in details and view the confirmation animation and final preview. Demo confirmation sends no email and creates no Zoom meeting. The real booking POST still requires provider configuration. Once configured, real availability is used; provider failures never fall back to demo slots. Set `BOOKING_PREVIEW_ENABLED=false` to disable the unconfigured-provider preview fallback.
