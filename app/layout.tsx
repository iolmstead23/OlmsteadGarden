import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UIProvider, { useSettingsDataContext } from "@components/UIProvider";
import Dashboard from "@/components/ui/dashboard";
import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olmstead Garden Software",
  description: "A garden management software for tracking and managing your garden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={inter.className}>
        <UIProvider>
          {/** <HydrationOverlay> */}
            {children}
          {/** </HydrationOverlay> */}
        </UIProvider>
      </body>
    </html>
);
}