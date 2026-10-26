"use client";

import { Mic } from "lucide-react";
import { useVoice } from "@/components/widget/voice-provider";

export function CallButton() {
  const { status, start } = useVoice();
  const busy = status !== "idle";

  return (
    <>
      <button
        type="button"
        onClick={start}
        disabled={busy}
        aria-label="Start voice call"
        className="flex size-16 items-center justify-center rounded-full bg-accent text-bg transition-colors hover:animate-none hover:bg-accent-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent enabled:animate-beacon enabled:motion-reduce:animate-none disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Mic size={24} aria-hidden />
      </button>
      <p className="font-mono text-xs tracking-widest text-fg-muted uppercase">
        {busy ? "Call in progress" : "Click to talk"}
      </p>
    </>
  );
}
