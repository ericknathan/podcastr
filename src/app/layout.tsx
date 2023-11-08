import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({ subsets: ["latin"] });

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
      <body className={`${inter.className} ${lexend.className}`}>
        {children}
      </body>
    </html>
  );
}
