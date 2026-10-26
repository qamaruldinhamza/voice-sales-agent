import { site } from "@/lib/site";

export type ContactChannel = "upwork" | "linkedin" | "email" | "contact_page";

export type ContactLink = {
  channel: ContactChannel;
  label: string;
  href: string;
};

const channels = ["upwork", "linkedin", "email", "contact_page"] as const;

// Every URL is fixed in code or env. The assistant only picks a channel name, never a URL.
export function getContactLinks(channel: ContactChannel | "all" = "all"): ContactLink[] {
  const all: (Omit<ContactLink, "href"> & { href?: string })[] = [
    { channel: "upwork", label: "Hire on Upwork", href: site.upworkUrl },
    { channel: "linkedin", label: "LinkedIn", href: site.linkedinUrl },
    { channel: "email", label: site.email, href: `mailto:${site.email}` },
    { channel: "contact_page", label: "Contact page", href: site.contactUrl },
  ];
  return all
    .filter((link): link is ContactLink => Boolean(link.href))
    .filter((link) => channel === "all" || link.channel === channel);
}

export function parseContactChannel(value: unknown): ContactChannel | "all" {
  return channels.find((c) => c === value) ?? "all";
}
