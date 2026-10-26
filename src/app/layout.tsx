import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { VoiceProvider } from "@/components/widget/voice-provider";
import { VoiceWidget } from "@/components/widget/voice-widget";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Voice Sales Agent",
  description: "A voice AI agent for websites and online stores, by Qamar Ul Din Hamza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body id="top" className="grain flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-accent px-4 py-2 font-mono text-xs text-bg focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <VoiceProvider>
          <Nav />
          <main id="main" className="flex flex-1 flex-col pt-16">
            {children}
          </main>
          <Footer />
          <VoiceWidget />
        </VoiceProvider>
      </body>
    </html>
  );
}
