"use client";

import { useEffect, useRef } from "react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { site } from "@/lib/site";
import { useVoice } from "@/components/widget/voice-provider";

const statusText = {
  connecting: "Connecting...",
  listening: "Listening",
  speaking: "Speaking",
} as const;

export function CallOverlay() {
  const { status, isMuted, isSpeaking, stop, toggleMute } = useVoice();
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

  if (!active) return null;

  const label =
    status === "connecting"
      ? statusText.connecting
      : isSpeaking
        ? statusText.speaking
        : statusText.listening;
  const pulsing = status === "connecting" || isSpeaking;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Voice call"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-bg/95 px-6 backdrop-blur-sm"
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
        <span className="relative flex size-24 items-center justify-center rounded-full border border-accent bg-surface text-accent">
          {isMuted ? <MicOff size={32} aria-hidden /> : <Mic size={32} aria-hidden />}
        </span>
      </div>

      <div className="text-center">
        <p className="text-subheadline text-fg">{site.assistantName}</p>
        <p role="status" className="mt-3 font-mono text-xs tracking-widest text-fg-muted uppercase">
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
    </div>
  );
}
