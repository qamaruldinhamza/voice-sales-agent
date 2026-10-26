import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-24 md:px-10 md:py-32">
      <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
        Voice AI for websites and online stores
      </p>
      <h1 className="mt-6 max-w-5xl text-display text-fg">Talk to the site.</h1>
      <p className="mt-8 max-w-2xl text-lg text-fg-secondary">
        A voice agent that answers a visitor&apos;s questions, finds out what they need, and sends
        the details to the business. No forms, no phone tree.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#demo"
          className="inline-flex min-h-11 items-center gap-2 bg-accent px-6 py-3 font-mono text-xs tracking-widest text-bg uppercase transition-colors hover:bg-accent-dim"
        >
          Talk to it
          <ArrowRight size={14} aria-hidden />
        </a>
        <a
          href={site.contactUrl}
          className="inline-flex min-h-11 items-center border border-line-light px-6 py-3 font-mono text-xs tracking-widest text-fg uppercase transition-colors hover:border-accent hover:text-accent"
        >
          Get one built
        </a>
      </div>
    </section>
  );
}
