import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const steps = [
  {
    title: "Visitor speaks",
    body: "A mic button on the page starts the call. The widget is one script tag, so it works on React, Astro, WordPress and Shopify themes.",
  },
  {
    title: "Vapi handles the call",
    body: "Speech recognition, the language model and the voice run on Vapi. The visitor hears a reply in real time.",
  },
  {
    title: "Agent calls a tool",
    body: "Once it has a name, the need and contact details, the agent calls a tool. The webhook checks a shared secret and validates the payload.",
  },
  {
    title: "Lead saved and sent",
    body: "The lead goes to Airtable, tagged with the site it came from, and a summary is emailed to the business.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" label="How it works" title="From a spoken question to a saved lead.">
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="bg-bg">
            <Reveal delay={i * 0.1} className="flex h-full flex-col gap-4 p-8">
              <span className="font-mono text-xs tracking-widest text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-2xl text-fg">{step.title}</h3>
              <p className="text-sm text-fg-secondary">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
