import { FaqAccordion, type FaqItem } from "@/components/faq-accordion";
import { Section } from "@/components/section";

const items: FaqItem[] = [
  {
    question: "What does the live demo actually do?",
    answer:
      "It answers questions about my services and background, then asks for your name, what you need and how to reach you so I can follow up. Order tracking, product search and store integrations are what I build for clients, not what this demo does.",
  },
  {
    question: "Am I talking to a person?",
    answer:
      "No. It is an AI voice agent and it says so if you ask. It handles the first conversation so a visitor gets an answer straight away instead of filling in a form.",
  },
  {
    question: "What can a custom build do?",
    answer:
      "Customer support, sales conversations, order tracking and voice-based product search, connected to your own systems. I build it for Shopify, WooCommerce, Next.js and React sites, tuned to your brand.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is scoped individually after a conversation, so there is no fixed price on this page. Tell me what you want to build and I will come back with a proper assessment.",
  },
  {
    question: "Can I use the code?",
    answer:
      "The repository is public so you can read how it is built, but it is published for viewing only under an all-rights-reserved license. It is a portfolio project, not a starter template.",
  },
  {
    question: "What happens to my details after the call?",
    answer:
      "Calls run on Vapi, which processes the audio. The details you give are used to follow up on your enquiry and are saved to a private lead list that I review.",
  },
];

export function Faq() {
  return (
    <Section id="faq" label="FAQ" title="Questions people ask first.">
      <FaqAccordion items={items} />
    </Section>
  );
}
