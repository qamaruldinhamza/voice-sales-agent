import { z } from "zod";

// Vapi sends many event types to the server URL. Only the end-of-call report matters here.
const envelope = z.object({
  message: z.object({ type: z.string() }),
});

const text = z.string().trim().min(1).optional().catch(undefined);

// What the "lead" structured output extracts after the call. Every field can be missing.
const leadResult = z.object({
  name: text,
  company: text,
  email: z.email().optional().catch(undefined),
  problem: text,
  budget: text,
});

const report = z.object({
  message: z.object({
    type: z.literal("end-of-call-report"),
    endedReason: z.string().optional(),
    durationSeconds: z.number().optional(),
    recordingUrl: z.string().optional(),
    call: z.object({
      id: z.string(),
      startedAt: z.string().optional(),
      endedAt: z.string().optional(),
    }),
    analysis: z.object({ summary: z.string().optional() }).optional(),
    artifact: z
      .object({
        transcript: z.string().optional(),
        recordingUrl: z.string().optional(),
        structuredOutputs: z
          .record(z.string(), z.object({ name: z.string(), result: z.unknown() }).nullable())
          .optional(),
      })
      .optional(),
  }),
});

export type Lead = z.infer<typeof leadResult>;

export type CallRecord = {
  callId: string;
  lead: Lead;
  summary?: string;
  transcript?: string;
  durationSeconds?: number;
  endedReason?: string;
  recordingUrl?: string;
};

// The structured output created in Vapi for this assistant is named "lead".
const LEAD_OUTPUT_NAME = "lead";

function durationOf(m: {
  durationSeconds?: number;
  call: { startedAt?: string; endedAt?: string };
}) {
  if (m.durationSeconds !== undefined) return Math.round(m.durationSeconds);
  const start = Date.parse(m.call.startedAt ?? "");
  const end = Date.parse(m.call.endedAt ?? "");
  return Number.isNaN(start) || Number.isNaN(end) ? undefined : Math.round((end - start) / 1000);
}

export type ParsedEvent =
  { kind: "ignored"; type: string } | { kind: "invalid" } | { kind: "report"; record: CallRecord };

export function parseEvent(body: unknown): ParsedEvent {
  const base = envelope.safeParse(body);
  if (!base.success) return { kind: "invalid" };

  const type = base.data.message.type;
  if (type !== "end-of-call-report") return { kind: "ignored", type };

  const parsed = report.safeParse(body);
  if (!parsed.success) return { kind: "invalid" };

  const m = parsed.data.message;
  const output = Object.values(m.artifact?.structuredOutputs ?? {}).find(
    (o) => o?.name === LEAD_OUTPUT_NAME,
  );
  // A null or failed extraction leaves every field empty rather than dropping the call.
  const lead = leadResult.safeParse(output?.result ?? {});

  return {
    kind: "report",
    record: {
      callId: m.call.id,
      lead: lead.success ? lead.data : {},
      summary: m.analysis?.summary,
      transcript: m.artifact?.transcript,
      durationSeconds: durationOf(m),
      endedReason: m.endedReason,
      recordingUrl: m.artifact?.recordingUrl ?? m.recordingUrl,
    },
  };
}
