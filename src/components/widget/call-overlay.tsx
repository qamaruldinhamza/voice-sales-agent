"use client";

import { useEffect, useRef } from "react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";
import { ContactLinks } from "@/components/widget/contact-links";
import { site } from "@/lib/site";
import { useVoice } from "@/components/widget/voice-provider";

const statusText = {
  connecting: "Connecting...",
  listening: "Listening",
  speaking: "Speaking",
} as const;

export function CallOverlay() {
  const { status, isMuted, isSpeaking, contactChannel, stop, toggleMute } = useVoice();
  const endRef = useRef<HTMLButtonElement>(null);
  const active = status !== "idle";

  useEffect(() => {
    if (!active) return;
    endRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") stop();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, stop]);

  const label =
    status === "connecting"
      ? statusText.connecting
      : isSpeaking
        ? statusText.speaking
        : statusText.listening;
  const pulsing = status === "connecting" || isSpeaking;

  return (
    <AnimatePresence>
      {active && (
        <m.div
          key="call-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Voice call"
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 overflow-y-auto bg-bg/95 px-6 py-8 backdrop-blur-sm"
        >
          <div className="relative flex size-40 items-center justify-center">
            {pulsing &&
              [0, 0.8, 1.6].map((delay) => (
                <span
                  key={delay}
                  aria-hidden
                  className="absolute inset-0 animate-ring-out rounded-full border border-accent motion-reduce:animate-none"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            <m.span
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="relative flex size-24 items-center justify-center rounded-full border border-accent bg-surface text-accent"
            >
              {isMuted ? <MicOff size={32} aria-hidden /> : <Mic size={32} aria-hidden />}
            </m.span>
          </div>

          <div className="text-center">
            <p className="text-subheadline text-fg">{site.assistantName}</p>
            <p
              role="status"
              className="mt-3 font-mono text-xs tracking-widest text-fg-muted uppercase"
            >
              {label}
              {isMuted && status === "connected" ? " · Muted" : ""}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleMute}
              aria-pressed={isMuted}
              aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
              disabled={status !== "connected"}
              className="flex size-14 items-center justify-center rounded-full border border-line-light text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-40"
            >
              {isMuted ? <MicOff size={20} aria-hidden /> : <Mic size={20} aria-hidden />}
            </button>
            <button
              ref={endRef}
              type="button"
              onClick={stop}
              aria-label="End call"
              className="flex size-14 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <PhoneOff size={20} aria-hidden />
            </button>
          </div>

          <AnimatePresence>
            {contactChannel && (
              <m.div
                key="contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="flex flex-col items-center gap-4"
              >
                <p className="font-mono text-xs tracking-widest text-fg-muted uppercase">
                  Reach Qamar
                </p>
                <ContactLinks channel={contactChannel} />
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </AnimatePresence>
  );
}
