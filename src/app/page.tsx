import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LiveAgent } from "@/components/sections/live-agent";
import { Source } from "@/components/sections/source";
import { Stack } from "@/components/sections/stack";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveAgent />
      <HowItWorks />
      <Stack />
      <Faq />
      <Source />
      <Cta />
    </>
  );
}
