"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { easeOutExpo } from "@/components/motion/ease";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Fades a block up once, when it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  );
}
