"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Vapi from "@vapi-ai/web";

export type CallStatus = "idle" | "connecting" | "connected";

type UseVapiOptions = {
  publicKey?: string;
  assistantId?: string;
};

const NOT_CONFIGURED = "The voice demo is not configured yet.";
const START_FAILED =
  "Could not start the call. Check that microphone access is allowed and try again.";

export function useVapi({
  publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
}: UseVapiOptions = {}) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const busyRef = useRef(false);
  const mountedRef = useRef(false);

  const reset = useCallback(() => {
    const vapi = vapiRef.current;
    if (vapi) {
      vapi.removeAllListeners();
      // EventEmitter throws on an unhandled "error" event.
      vapi.on("error", () => {});
    }
    vapiRef.current = null;
    busyRef.current = false;
    setStatus("idle");
    setIsMuted(false);
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      const vapi = vapiRef.current;
      vapiRef.current = null;
      busyRef.current = false;
      if (vapi) {
        vapi.removeAllListeners();
        vapi.on("error", () => {});
        void vapi.stop();
      }
    };
  }, []);

  const start = useCallback(async () => {
    if (!publicKey || !assistantId) {
      setError(NOT_CONFIGURED);
      return;
    }
    if (busyRef.current) return;

    busyRef.current = true;
    setError(null);
    setStatus("connecting");

    try {
      // Loaded on demand so the SDK stays out of the initial bundle.
      const { default: VapiClient } = await import("@vapi-ai/web");
      if (!mountedRef.current) return;

      const vapi = new VapiClient(publicKey);
      vapiRef.current = vapi;
      let connected = false;

      vapi.on("call-start", () => {
        connected = true;
        setStatus("connected");
      });
      vapi.on("call-end", reset);
      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));
      vapi.on("error", (err) => {
        // After the call is live, some errors are non-critical (audio
        // processing, recording). call-end fires if the call really drops.
        console.error("Vapi error:", err);
        if (!connected) {
          setError(START_FAILED);
          reset();
        }
      });

      await vapi.start(assistantId);
    } catch (err) {
      console.error("Vapi start failed:", err);
      if (!mountedRef.current) return;
      setError(START_FAILED);
      reset();
    }
  }, [publicKey, assistantId, reset]);

  const stop = useCallback(() => {
    // call-end resets the state once the connection is closed.
    void vapiRef.current?.stop();
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  const toggleMute = useCallback(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    const next = !vapi.isMuted();
    vapi.setMuted(next);
    setIsMuted(next);
  }, []);

  return {
    status,
    isMuted,
    isSpeaking,
    error,
    isConfigured: Boolean(publicKey && assistantId),
    start,
    stop,
    toggleMute,
    dismissError,
  };
}
