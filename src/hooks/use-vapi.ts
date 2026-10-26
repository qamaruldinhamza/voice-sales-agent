"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Vapi from "@vapi-ai/web";
import { parseContactChannel, type ContactChannel } from "@/lib/contact";

export type CallStatus = "idle" | "connecting" | "connected";

type UseVapiOptions = {
  publicKey?: string;
  assistantId?: string;
};

// Backstop for the max duration set in the Vapi dashboard, in case the server never ends the call.
const MAX_CALL_MS = 5 * 60 * 1000;

const NOT_CONFIGURED = "The voice demo is not configured yet.";
const MIC_BLOCKED =
  "Microphone access is blocked. Allow it in your browser settings and try again.";
const START_FAILED =
  "Could not start the call. Check that microphone access is allowed and try again.";

// Daily reports "Meeting has ended" as an error when the assistant ends the call, the max
// duration is reached or the server hangs up. That is a normal end, not a failure.
function isCallEnded(err: unknown) {
  const type = (err as { error?: { error?: { type?: string } } } | null)?.error?.error?.type;
  return type === "ejected";
}

// The assistant's client-side tool call. It names a channel only; the URLs live in lib/contact.ts.
function contactChannelFromMessage(message: unknown): ContactChannel | "all" | null {
  const msg = message as {
    type?: string;
    toolCallList?: { function?: { name?: string; arguments?: unknown } }[];
  } | null;
  if (msg?.type !== "tool-calls") return null;
  const call = msg.toolCallList?.find((c) => c.function?.name === "show_contact_links");
  if (!call) return null;
  let args = call.function?.arguments;
  if (typeof args === "string") {
    try {
      args = JSON.parse(args);
    } catch {
      args = null;
    }
  }
  return parseContactChannel((args as { channel?: unknown } | null)?.channel);
}

export function useVapi({
  publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
  assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID,
}: UseVapiOptions = {}) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactChannel, setContactChannel] = useState<ContactChannel | "all" | null>(null);
  const [ended, setEnded] = useState(false);

  const vapiRef = useRef<Vapi | null>(null);
  const busyRef = useRef(false);
  const mountedRef = useRef(false);
  const cancelRef = useRef(false);

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
    setContactChannel(null);
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
    cancelRef.current = false;
    setError(null);
    setEnded(false);
    setContactChannel(null);
    setStatus("connecting");

    try {
      // Loaded on demand so the SDK stays out of the initial bundle.
      const { default: VapiClient } = await import("@vapi-ai/web");
      if (!mountedRef.current) return;
      if (cancelRef.current) {
        reset();
        return;
      }

      const vapi = new VapiClient(publicKey);
      vapiRef.current = vapi;
      let connected = false;
      // A call that was live and then ended, for any reason, gets the thank-you dialog.
      const finish = () => {
        if (connected && mountedRef.current) setEnded(true);
        reset();
      };

      vapi.on("call-start", () => {
        connected = true;
        setStatus("connected");
      });
      vapi.on("call-end", finish);
      vapi.on("message", (message) => {
        const channel = contactChannelFromMessage(message);
        if (channel) setContactChannel(channel);
      });
      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));
      vapi.on("error", (err) => {
        if (isCallEnded(err)) {
          finish();
          return;
        }
        // After the call is live, some errors are non-critical (audio
        // processing, recording). call-end fires if the call really drops.
        const micBlocked = String(err?.type).startsWith("microphone-preflight");
        if (!micBlocked) console.error("Vapi error:", err);
        if (!connected) {
          setError(micBlocked ? MIC_BLOCKED : START_FAILED);
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
    // Stopped before the SDK finished loading: start() bails out on its own.
    cancelRef.current = true;
    // call-end resets the state once the connection is closed.
    void vapiRef.current?.stop();
  }, []);

  const dismissError = useCallback(() => setError(null), []);
  const dismissEnded = useCallback(() => setEnded(false), []);

  useEffect(() => {
    if (status !== "connected") return;
    const timer = setTimeout(stop, MAX_CALL_MS);
    return () => clearTimeout(timer);
  }, [status, stop]);

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
    contactChannel,
    ended,
    isConfigured: Boolean(publicKey && assistantId),
    start,
    stop,
    toggleMute,
    dismissError,
    dismissEnded,
  };
}
