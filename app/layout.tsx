/*
 * Created on Fri Sep 20 2024
 * Author: Ian Olmstead
 *
 * License: GNU Affero General Public License (AGPL-3.0)
 *
 *For details, see https://www.gnu.org/licenses/agpl-3.0-standalone.html
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU Affero General Public License as published
 *by the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 */

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