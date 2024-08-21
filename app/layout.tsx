import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UIProvider from "@components/UIProvider";
import Dashboard from "@/components/ui/dashboard";

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
    <html lang="en" className="h-full overflow-y-auto">
      <body className={inter.className}>
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