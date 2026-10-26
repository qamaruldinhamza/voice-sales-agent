import { Reveal } from "@/components/motion/reveal";
import { RevealWords } from "@/components/motion/reveal-words";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="mx-auto max-w-3xl text-headline text-fg">
          <RevealWords text="Want one for your business?" />
        </h2>
        <Reveal delay={0.3} className="mx-auto mt-6 max-w-xl">
          <p className="text-fg-secondary">
            I build voice agents for online stores, law firms and service businesses, tuned to your
            brand and connected to your systems.
          </p>
        </Reveal>
        <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.contactUrl}
            className="inline-flex min-h-11 items-center bg-accent px-6 py-3 font-mono text-xs tracking-widest text-bg uppercase transition-colors hover:bg-accent-dim"
          >
            Get in touch
          </a>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-xs tracking-widest text-fg-secondary uppercase transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
