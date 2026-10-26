import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:px-10 md:py-32">
        <h2 className="mx-auto max-w-3xl text-headline text-fg">Want one for your business?</h2>
        <p className="mx-auto mt-6 max-w-xl text-fg-secondary">
          I build voice agents for online stores, law firms and service businesses, tuned to your
          brand and connected to your systems.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
}
