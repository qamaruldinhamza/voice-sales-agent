"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useVapi } from "@/hooks/use-vapi";

type VoiceContextValue = ReturnType<typeof useVapi>;

const VoiceContext = createContext<VoiceContextValue | null>(null);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const voice = useVapi();
  return <VoiceContext value={voice}>{children}</VoiceContext>;
}

export function useVoice() {
  const voice = useContext(VoiceContext);
  if (!voice) throw new Error("useVoice must be used inside VoiceProvider");
  return voice;
}
