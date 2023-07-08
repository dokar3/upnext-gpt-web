import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UpNext GPT",
  description: "Your playlist powered by ChatGPT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
