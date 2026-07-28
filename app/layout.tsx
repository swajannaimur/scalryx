import type { Metadata } from "next";
import { NewsletterProvider } from "./components/newsletter/newsletter-provider";
import { createThemeInitializerScript } from "./components/theme/theme-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scalryx — Business Health Assessment",
  description:
    "Private business health assessments, practical growth guidance, and curated SaaS recommendations for founders and operators.",
};

const themeInitializer = createThemeInitializerScript();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="h-full antialiased"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className="min-h-full">
        <NewsletterProvider>{children}</NewsletterProvider>
      </body>
    </html>
  );
}
