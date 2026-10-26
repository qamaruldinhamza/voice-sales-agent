import { site } from "@/lib/site";

const linkClass =
  "self-start font-mono text-sm text-fg-secondary transition-colors hover:text-accent focus-visible:text-accent";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div>
              <span className="block font-heading text-2xl text-fg">
                Voice Sales Agent<span className="text-accent">.</span>
              </span>
              <span className="font-mono text-[0.6rem] tracking-widest text-fg-muted uppercase">
                by {site.author}
              </span>
            </div>
            <p className="max-w-xs font-mono text-xs leading-relaxed text-fg-muted">
              A voice AI agent for websites and online stores. Support, sales, order tracking and
              lead capture.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="self-start font-mono text-xs tracking-widest text-accent uppercase transition-colors hover:text-accent-dim"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="mb-1 font-mono text-[0.6rem] tracking-widest text-fg-muted uppercase">
              This project
            </span>
            <a href="#demo" className={linkClass}>
              Demo
            </a>
            <a href="#how-it-works" className={linkClass}>
              How it works
            </a>
            <a href="#stack" className={linkClass}>
              Stack
            </a>
            <a href={site.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Source on GitHub
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="mb-1 font-mono text-[0.6rem] tracking-widest text-fg-muted uppercase">
              Find me
            </span>
            <a href={site.authorUrl} className={linkClass}>
              qamaruldin.com
            </a>
            <a href={site.agencyUrl} className={linkClass}>
              stackmesh.com
            </a>
            <a href={site.contactUrl} className={linkClass}>
              Get one built for your site
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 font-mono text-[0.65rem] text-fg-muted md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {site.copyrightYear} {site.author}. All rights reserved.
          </span>
          <span>Source is published for viewing only.</span>
        </div>
      </div>
    </footer>
  );
}
