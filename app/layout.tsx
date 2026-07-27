import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scalryx - Scale Smarter",
  description:
    "AI-powered SaaS stack audits that find bottlenecks, cut software waste, and reveal smarter tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
