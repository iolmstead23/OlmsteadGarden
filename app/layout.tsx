import type { Metadata } from "next";
import "./globals.css";
import UIProvider from "@components/UIProvider";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
// import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

export const metadata: Metadata = {
  title: "Olmstead Garden Software",
  description: "A garden management software for all things gardening.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <UIProvider>

          {/** <HydrationOverlay> */}
            {children}
          {/** </HydrationOverlay> */}
          <Analytics />
          <SpeedInsights />
      </UIProvider>
    </html>
  );
}