import { NextRequest, NextResponse } from "next/server";
import { assertConfigured, availability, candidateSlots, monthRange, localDate, isTimeZone, BookingError, rateLimit } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    assertConfigured();
    await rateLimit(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown", "read");
    return NextResponse.json(await availability(request.nextUrl.searchParams.get("month") || "", request.nextUrl.searchParams.get("timeZone") || ""), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    // Allow Bruna to test on the hosted site until providers are configured.
    // Set BOOKING_PREVIEW_ENABLED=false to disable this fallback; writes stay protected.
    if (process.env.BOOKING_PREVIEW_ENABLED !== "false" && error instanceof BookingError && error.code === "not_configured") {
      const month = request.nextUrl.searchParams.get("month") || "";
      const timeZone = request.nextUrl.searchParams.get("timeZone") || "";
      try {
        if (!isTimeZone(timeZone)) throw new Error("invalid_time_zone");
        const { start, end } = monthRange(month);
        const slots = candidateSlots(start, end, []).filter(slot => localDate(new Date(slot), timeZone).startsWith(month));
        return NextResponse.json({ slots, timeZone, durationMinutes: 60, demo: true }, { headers: { "Cache-Control": "no-store" } });
      } catch {
        return NextResponse.json({ error: "invalid_details" }, { status: 400 });
      }
    }
    return NextResponse.json({ error: error instanceof BookingError ? error.code : "provider_unavailable" }, { status: error instanceof BookingError ? error.status : 503, headers: { "Cache-Control": "no-store" } });
  }
}
