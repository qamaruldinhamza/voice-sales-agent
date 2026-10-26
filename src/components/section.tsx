import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RevealWords } from "@/components/motion/reveal-words";

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, label, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">{label}</p>
        </Reveal>
        <h2 className="mt-4 max-w-3xl text-subheadline text-fg">
          <RevealWords text={title} />
        </h2>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
