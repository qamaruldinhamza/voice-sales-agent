"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";
import { ContactLinks } from "@/components/widget/contact-links";
import { useVoice } from "@/components/widget/voice-provider";

export function CallEndedDialog() {
  const { ended, dismissEnded } = useVoice();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ended) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissEnded();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ended, dismissEnded]);

  return (
    <AnimatePresence>
      {ended && (
        <m.div
          key="call-ended"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismissEnded}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-bg/90 px-6 py-8 backdrop-blur-sm"
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-ended-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-lg flex-col items-center gap-6 border border-line-light bg-surface p-8 text-center"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={dismissEnded}
              aria-label="Close"
              className="absolute top-2 right-2 flex size-11 items-center justify-center text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
            >
              <X size={18} aria-hidden />
            </button>
            <div>
              <h2 id="call-ended-title" className="text-subheadline text-fg">
                Thanks for trying the demo.
              </h2>
              <p className="mt-3 text-fg-secondary">
                Want to talk to Qamar directly? Reach him here.
              </p>
            </div>
            <ContactLinks />
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
