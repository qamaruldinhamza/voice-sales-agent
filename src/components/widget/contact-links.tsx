import { BriefcaseBusiness, Globe, Mail, UserRound, type LucideIcon } from "lucide-react";
import { getContactLinks, type ContactChannel } from "@/lib/contact";

const icons: Record<ContactChannel, LucideIcon> = {
  upwork: BriefcaseBusiness,
  linkedin: UserRound,
  email: Mail,
  contact_page: Globe,
};

export function ContactLinks({ channel = "all" }: { channel?: ContactChannel | "all" }) {
  const links = getContactLinks(channel);
  if (links.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center justify-center gap-3">
      {links.map(({ channel: key, label, href }) => {
        const Icon = icons[key];
        const external = href.startsWith("http");
        return (
          <li key={key}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex h-11 items-center gap-2 border border-line-light px-4 font-mono text-xs tracking-widest text-fg uppercase transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Icon size={16} aria-hidden />
              {label}
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
