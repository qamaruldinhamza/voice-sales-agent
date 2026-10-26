import { createHash, timingSafeEqual } from "node:crypto";
import { parseEvent } from "@/lib/vapi-report";

// Vapi sends the shared secret in this header (a custom credential with the Bearer prefix off).
const SECRET_HEADER = "x-vapi-secret";

function sameSecret(received: string | null, expected: string) {
  if (!received) return false;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(received), hash(expected));
}

export async function POST(request: Request) {
  const secret = process.env.VAPI_WEBHOOK_SECRET;
  if (!secret) {
    console.error("VAPI_WEBHOOK_SECRET is not set");
    return Response.json({ error: "not configured" }, { status: 503 });
  }
  if (!sameSecret(request.headers.get(SECRET_HEADER), secret)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const event = parseEvent(body);
  if (event.kind === "invalid") {
    return Response.json({ error: "invalid payload" }, { status: 400 });
  }
  // Other event types (status updates, transcripts) need no work and no reply body.
  if (event.kind === "ignored") return Response.json({ ok: true });

  // Saving and emailing the lead are added in the next PRs.
  console.info("call report received", {
    callId: event.record.callId,
    endedReason: event.record.endedReason,
    hasLead: Boolean(event.record.lead.email || event.record.lead.name),
  });
  return Response.json({ ok: true });
}
