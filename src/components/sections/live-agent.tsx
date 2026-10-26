import { Mic } from "lucide-react";
import { Section } from "@/components/section";

const sampleQuestions = [
  "What services do you offer?",
  "Have you built voice agents for online stores?",
  "What is your tech stack?",
  "I run a Shopify store. Can you build one for me?",
];

export function LiveAgent() {
  return (
    <Section id="demo" label="Live agent" title="Ask it anything about the work.">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-start gap-5 border border-line bg-surface p-8">
          <button
            type="button"
            disabled
            aria-label="Start voice call (available soon)"
            className="flex size-16 items-center justify-center rounded-full border border-line-light text-fg-muted"
          >
            <Mic size={24} aria-hidden />
          </button>
          <p className="font-mono text-xs tracking-widest text-fg-muted uppercase">
            Voice demo opens here soon
          </p>
          <p className="text-fg-secondary">
            The demo is my own sales assistant. It answers questions about my services and
            background, then asks for your name and how to reach you so I can follow up.
          </p>
        </div>

        <div>
          <h3 className="text-2xl text-fg">Things to try</h3>
          <ul className="mt-5 flex flex-col">
            {sampleQuestions.map((q) => (
              <li key={q} className="border-b border-line py-4 text-fg-secondary first:border-t">
                &ldquo;{q}&rdquo;
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs leading-relaxed text-fg-muted">
            The live demo covers questions and lead capture. Order tracking, product search and
            store integrations are what I build for clients.
          </p>
        </div>
      </div>
    </Section>
  );
}
