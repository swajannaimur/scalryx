import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { NewsletterProvider } from "./components/newsletter/newsletter-provider";
import "./globals.css";

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Scalryx — Business Health Assessment",
  description:
    "Private business health assessments, practical growth guidance, and curated SaaS recommendations for founders and operators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${manrope.variable} h-full antialiased`} lang="en">
      <body className="min-h-full">
        <NewsletterProvider>{children}</NewsletterProvider>
      </body>
    </html>
  );
}
