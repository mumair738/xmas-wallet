import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Xmas Wallet — Festive Base Mini App",
  description: "Celebrate the season on Base with Xmas Wallet. Connect, manage, and explore.",
  icons: [{ rel: "icon", url: "https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50 dark:bg-[#0d0d0f]`}
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
