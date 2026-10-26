import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const stack = [
  { name: "Next.js 16", note: "App Router, one app for the page, the API and the widget bundle" },
  { name: "React 19 and TypeScript", note: "Strict types, Zod on the webhook boundary" },
  { name: "Tailwind CSS 4", note: "Design tokens in CSS, one theme preset per site" },
  { name: "Vapi Web SDK", note: "Loaded only when the visitor clicks the mic" },
  { name: "Airtable and Resend", note: "Leads and email, each behind a small client" },
  { name: "Vercel", note: "Deploys from main" },
];

const decisions = [
  "One embeddable script instead of a React-only package, so sites without React can use it.",
  "The widget lives in a Shadow DOM, so a host site's CSS cannot break it.",
  "The public key is visible in any browser, so abuse is limited by a domain allow-list, a call length cap and a billing alert.",
  "A failed Airtable or email call is logged, and the voice reply still goes out.",
];

export function Stack() {
  return (
    <Section id="stack" label="Stack and decisions" title="Plain tools, chosen on purpose.">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <dl className="flex flex-col">
          {stack.map((item, i) => (
            <Reveal
              key={item.name}
              delay={i * 0.06}
              className="flex flex-col gap-1 border-b border-line py-4 first:border-t sm:flex-row sm:gap-6"
            >
              <dt className="font-mono text-xs tracking-widest text-fg uppercase sm:w-48 sm:shrink-0">
                {item.name}
              </dt>
              <dd className="text-sm text-fg-secondary">{item.note}</dd>
            </Reveal>
          ))}
        </dl>

        <ul className="flex flex-col gap-5">
          {decisions.map((d, i) => (
            <li key={d}>
              <Reveal delay={i * 0.08} className="flex gap-4 text-fg-secondary">
                <span aria-hidden className="mt-3 h-px w-6 shrink-0 bg-accent" />
                {d}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
