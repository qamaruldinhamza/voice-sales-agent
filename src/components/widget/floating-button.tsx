"use client";

import { useEffect, useState } from "react";
import { Mic, X } from "lucide-react";
import { useVoice } from "@/components/widget/voice-provider";

const NUDGE_DELAY_MS = 8000;
const NUDGE_SEEN_KEY = "voice-nudge-seen";

function nudgeSeen() {
  try {
    return sessionStorage.getItem(NUDGE_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markNudgeSeen() {
  try {
    sessionStorage.setItem(NUDGE_SEEN_KEY, "1");
  } catch {
    // Storage can be blocked; the nudge then shows once per page load.
  }
}

export function FloatingButton() {
  const { status, error, isConfigured, start, dismissError } = useVoice();
  const [nudge, setNudge] = useState(false);

  // One gentle prompt per browser session, after the visitor has sat idle.
  useEffect(() => {
    if (!isConfigured || nudgeSeen()) return;
    const timer = setTimeout(() => {
      if (nudgeSeen()) return;
      markNudgeSeen();
      setNudge(true);
    }, NUDGE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isConfigured]);

  if (status !== "idle") return null;

  const handleStart = () => {
    setNudge(false);
    markNudgeSeen();
    void start();
  };

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
      {nudge && !error && (
        <div
          role="status"
          className="relative flex max-w-64 items-start gap-3 border border-line-light bg-surface p-4 text-sm text-fg-secondary shadow-lg"
        >
          <p>
            Have a question? <span className="text-fg">Click the mic</span> and talk to the
            assistant live.
          </p>
          <button
            type="button"
            onClick={() => setNudge(false)}
            aria-label="Dismiss prompt"
            className="-m-2 flex size-11 shrink-0 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X size={16} aria-hidden />
          </button>
          <span
            aria-hidden
            className="absolute right-6 -bottom-[5px] size-2.5 rotate-45 border-r border-b border-line-light bg-surface"
          />
        </div>
      )}
      <button
        type="button"
        onClick={handleStart}
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
