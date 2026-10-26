"use client";

import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const word = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: easeOutExpo } },
};

/**
 * Slides each word up from behind a mask when the heading scrolls into view.
 * Render it inside the heading element. Screen readers get the plain text.
 */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        variants={container}
      >
        {words.map((w, i) => (
          <span key={i}>
            {/* The mask clips the slide; padding keeps descenders from being cut off. */}
            <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
              <m.span className="inline-block" variants={word}>
                {w}
              </m.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </>
  );
}
