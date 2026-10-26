"use client";

import { Mic, X } from "lucide-react";
import { useVoice } from "@/components/widget/voice-provider";

export function FloatingButton() {
  const { status, error, start, dismissError } = useVoice();
  if (status !== "idle") return null;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {error && (
        <div
          role="alert"
          className="flex max-w-72 items-start gap-3 border border-line-light bg-surface p-4 text-sm text-fg-secondary"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={dismissError}
            aria-label="Dismiss message"
            className="-m-2 flex size-11 shrink-0 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={start}
        aria-label="Talk to the assistant"
        className="flex size-14 animate-beacon items-center justify-center gap-2 rounded-full bg-accent text-bg transition-colors hover:animate-none hover:bg-accent-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:animate-none sm:w-auto sm:px-6"
      >
        <Mic size={20} aria-hidden />
        <span className="hidden font-mono text-xs tracking-widest uppercase sm:inline">
          Talk to it
        </span>
      </button>
    </div>
  );
}
