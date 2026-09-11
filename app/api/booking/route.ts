import { NextRequest, NextResponse } from "next/server";
import { assertConfigured, BookingError, parseBooking, rateLimit, reserveConsultation } from "@/lib/booking";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : request.nextUrl.origin;
    if (!origin || origin !== allowedOrigin) throw new BookingError("invalid_origin", 403);
    if (!request.headers.get("content-type")?.includes("application/json")) throw new BookingError("invalid_details", 400);
    if (Number(request.headers.get("content-length")) > 4096) throw new BookingError("invalid_details", 413);
    const raw = await request.text();
    if (raw.length > 4096) throw new BookingError("invalid_details", 413);
    let body: unknown;
    try { body = JSON.parse(raw); } catch { throw new BookingError("invalid_details", 400); }
    const input = parseBooking(body);
    assertConfigured();
    await rateLimit(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown", "write");
    return NextResponse.json(await reserveConsultation(input), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof BookingError ? error.code : "provider_unavailable" }, { status: error instanceof BookingError ? error.status : 503, headers: { "Cache-Control": "no-store" } });
  }
}
