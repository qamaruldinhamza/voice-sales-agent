"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";
import { Reveal } from "@/components/motion/reveal";

export type FaqItem = { question: string; answer: string };

/** One item open at a time. Each question is a button that controls its answer region. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className="max-w-3xl">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <Reveal
            key={item.question}
            delay={i * 0.05}
            className="border-b border-line first:border-t"
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left text-xl text-fg transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:text-2xl"
              >
                {item.question}
                <Plus
                  size={20}
                  aria-hidden
                  className={`shrink-0 text-accent transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-fg-secondary">{item.answer}</p>
                </m.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}
