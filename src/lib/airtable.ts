import type { CallRecord } from "@/lib/vapi-report";

// Airtable long text fields hold up to 100,000 characters.
const LONG_TEXT_LIMIT = 90_000;

function config() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "Leads";
  if (!apiKey || !baseId) throw new Error("Airtable env vars are not set");
  return { apiKey, baseId, table };
}

// Field names match the columns of the Leads table. Empty values are left out so Airtable keeps them blank.
export function toFields(record: CallRecord) {
  const { lead } = record;
  const fields: Record<string, string | number> = {
    "Call ID": record.callId,
    Status: lead.name || lead.email ? "New" : "No details",
  };
  const optional: Record<string, string | number | undefined> = {
    Name: lead.name,
    Email: lead.email,
    Company: lead.company,
    Problem: lead.problem,
    Budget: lead.budget,
    Summary: record.summary?.slice(0, LONG_TEXT_LIMIT),
    Transcript: record.transcript?.slice(0, LONG_TEXT_LIMIT),
    Duration: record.durationSeconds,
    "Ended reason": record.endedReason,
    "Recording URL": record.recordingUrl,
  };
  for (const [key, value] of Object.entries(optional)) {
    if (value !== undefined && value !== "") fields[key] = value;
  }
  return fields;
}

// Upserts on Call ID, so a retried webhook updates the same row instead of adding a duplicate.
export async function saveCall(record: CallRecord) {
  const { apiKey, baseId, table } = config();
  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        performUpsert: { fieldsToMergeOn: ["Call ID"] },
        typecast: true,
        records: [{ fields: toFields(record) }],
      }),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok) {
    // Only the error type is logged. The message can quote field values, which are the caller's details.
    const body = await response.json().catch(() => null);
    const type = typeof body?.error === "string" ? body.error : body?.error?.type;
    throw new Error(`Airtable returned ${response.status} ${type ?? ""}`.trim());
  }
}
