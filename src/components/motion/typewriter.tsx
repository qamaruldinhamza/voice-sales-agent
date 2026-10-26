"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const START = 0.35;
const STEP = 0.055;

const char = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: START + i * STEP, duration: 0.01 },
  }),
};

// The caret sits on the character being typed, then moves on.
const caret = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    transition: { delay: START + i * STEP, duration: STEP, times: [0, 0.05, 0.95, 1] },
  }),
};

// The last caret blinks a few times and then goes away.
const finalCaret = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 0, 1, 0, 1, 0],
    transition: { delay: START + i * STEP, duration: 2.4 },
  }),
};

/**
 * Types the text out one character at a time with a moving caret.
 * Every character is in the DOM from the start, so the layout never shifts.
 */
export function Typewriter({ text }: { text: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;

  // Index of each character across the whole string, spaces included.
  let next = 0;
  const words = text.split(" ").map((w) => {
    const chars = [...w].map((c) => ({ c, i: next++ }));
    next++;
    return chars;
  });
  const last = text.length - 1;

  return (
    <>
      <span className="sr-only">{text}</span>
      <m.span aria-hidden initial="hidden" animate="visible">
        {words.map((chars, wi) => (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {chars.map(({ c, i }) => (
                <m.span key={i} custom={i} variants={char} className="relative inline-block">
                  {c}
                  <m.span
                    custom={i}
                    variants={i === last ? finalCaret : caret}
                    className="absolute top-[0.12em] -right-[0.04em] h-[0.75em] w-[0.04em] bg-accent"
                  />
                </m.span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </>
  );
}
