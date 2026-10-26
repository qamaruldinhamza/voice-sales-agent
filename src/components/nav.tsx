"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        solid ? "border-line bg-bg/95 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10"
      >
        <a href="#top" className="flex flex-col leading-none transition-opacity hover:opacity-80">
          <span className="font-heading text-lg tracking-wide text-fg">
            Voice Sales Agent<span className="text-accent">.</span>
          </span>
          <span className="mt-1 font-mono text-[0.55rem] tracking-widest text-fg-muted uppercase">
            by {site.author}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[0.7rem] tracking-widest text-fg-secondary uppercase transition-colors hover:text-accent focus-visible:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.7rem] tracking-widest text-fg-secondary uppercase transition-colors hover:text-accent focus-visible:text-accent"
          >
            Source
          </a>
          <a
            href={site.contactUrl}
            className="bg-accent px-4 py-2 font-mono text-[0.65rem] tracking-widest whitespace-nowrap text-bg uppercase transition-colors hover:bg-accent-dim"
          >
            Get one built
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 flex size-11 items-center justify-center text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-xs tracking-widest text-fg-secondary uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 font-mono text-xs tracking-widest text-fg-secondary uppercase"
              >
                Source
              </a>
            </li>
          </ul>
          <a
            href={site.contactUrl}
            className="mt-4 block bg-accent px-4 py-3 text-center font-mono text-xs tracking-widest text-bg uppercase"
          >
            Get one built
          </a>
        </div>
      )}
    </header>
  );
}
