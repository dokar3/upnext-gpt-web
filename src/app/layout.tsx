import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";

export const metadata: Metadata = {
  title: "UpNext GPT",
  description: "Your playlist powered by ChatGPT.",
};

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>{children}</body>
    </html>
  );
}
