import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

type Group = {
  title: string;
  note: string;
  items: { name: string; note: string }[];
};

const groups: Group[] = [
  {
    title: "In this demo",
    note: "What is connected to the agent you can talk to on this page.",
    items: [
      { name: "Vapi", note: "Speech recognition, the language model and the voice" },
      { name: "Airtable", note: "The private list where leads are saved" },
      { name: "Resend", note: "The email that tells me a new lead came in" },
    ],
  },
  {
    title: "Built for clients",
    note: "Available as a custom build. Not part of this demo.",
    items: [
      {
        name: "Shopify and WooCommerce",
        note: "Order tracking and product search against the store",
      },
      { name: "Phone lines", note: "Inbound calls through Twilio, next to the website widget" },
      { name: "Calendar and sheets", note: "Bookings and records in Google Calendar and Sheets" },
      { name: "Slack", note: "Instant alerts when a lead or a support request arrives" },
      {
        name: "Make and GoHighLevel",
        note: "Leads pushed into the client's existing CRM and automations",
      },
    ],
  },
];

export function Integrations() {
  return (
    <Section id="integrations" label="Integrations" title="What it connects to.">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {groups.map((group, g) => (
          <Reveal key={group.title} delay={g * 0.1}>
            <h3 className="text-2xl text-fg">{group.title}</h3>
            <p className="mt-2 text-sm text-fg-muted">{group.note}</p>
            <dl className="mt-6 flex flex-col">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-1 border-b border-line py-4 first:border-t sm:flex-row sm:gap-6"
                >
                  <dt className="font-mono text-xs tracking-widest text-fg uppercase sm:w-48 sm:shrink-0">
                    {item.name}
                  </dt>
                  <dd className="text-sm text-fg-secondary">{item.note}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
