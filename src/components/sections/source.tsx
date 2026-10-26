import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { site } from "@/lib/site";

export function Source() {
  return (
    <Section id="source" label="Source" title="Read the code.">
      <div className="max-w-2xl">
        <p className="text-fg-secondary">
          The repository is public so you can see how it is built, commit by commit. It is a
          portfolio project, not a starter template. The assistant configuration and deployment
          setup are not included, and the code is published for viewing only under an
          all-rights-reserved license.
        </p>
        <a
          href={site.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center gap-2 border border-line-light px-6 py-3 font-mono text-xs tracking-widest text-fg uppercase transition-colors hover:border-accent hover:text-accent"
        >
          View on GitHub
          <ArrowUpRight size={14} aria-hidden />
        </a>
      </div>
    </Section>
  );
}
