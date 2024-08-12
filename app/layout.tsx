import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Dashboard from "@components/ui/dashboard";
import "./globals.css";
import UIProvider from "@components/UIProvider";

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
      <body className={`${inter.className} h-full`}>
        <UIProvider>
          <div>
            <Dashboard />
          </div>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}