export const site = {
  name: "Voice Sales Agent",
  author: "Qamar Ul Din Hamza",
  assistantName: "Qamar's assistant",
  copyrightYear: 2026,
  repoUrl: "https://github.com/qamaruldinhamza/voice-sales-agent",
  authorUrl: "https://qamaruldin.com",
  contactUrl: "https://qamaruldin.com/contact",
  agencyUrl: "https://stackmesh.com",
  email: "hire@qamaruldin.com",
  // Profile links come from env vars so they are not hard-coded in the public repo.
  upworkUrl: process.env.NEXT_PUBLIC_UPWORK_URL,
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};

export const navLinks = [
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#stack", label: "Stack" },
];
