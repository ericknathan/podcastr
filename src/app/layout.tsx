import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";

import "@/styles/globals.css";

import { Header, Player } from "@/components/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "Podcastr",
  description:
    "An web app for playing audio episodes of your favorite podcast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lexend.variable} flex flex-col xl:flex-row overflow-hidden`}>
        <main className="xl:flex-1 flex flex-col max-xl:overflow-y-scroll">
          <Header />
          <div className="xl:overflow-y-scroll h-full">
            {children}
          </div>
        </main>
        <Player />
      </body>
    </html>
  );
}
