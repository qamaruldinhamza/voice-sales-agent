"use client";

import { useEffect, useState } from "react";
import { Mic, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";
import { LiveDot } from "@/components/widget/live-dot";
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

const bubble = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: { duration: 0.25, ease: easeOutExpo },
};

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

  const handleStart = () => {
    setNudge(false);
    markNudgeSeen();
    void start();
  };

  return (
    <AnimatePresence>
      {status === "idle" && (
        <m.div
          key="floating-button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
          className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6"
        >
          <AnimatePresence>
            {error && (
              <m.div
                key="error"
                {...bubble}
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
              </m.div>
            )}
            {nudge && !error && (
              <m.div
                key="nudge"
                {...bubble}
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
              </m.div>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={handleStart}
            aria-label="Ask AI"
            className="relative flex size-14 animate-beacon items-center justify-center gap-2 rounded-full bg-accent text-bg transition-colors hover:animate-none hover:bg-accent-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:animate-none sm:w-auto sm:px-6"
          >
            <Mic size={20} aria-hidden />
            <span className="hidden font-mono text-xs tracking-widest uppercase sm:inline">
              Ask AI
            </span>
            <LiveDot className="-top-1 -right-1" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
