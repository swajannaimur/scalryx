import type { Metadata } from "next";
import { createThemeInitializerScript } from "./components/theme/theme-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scalryx - Scale Smarter",
  description:
    "AI-powered SaaS stack audits that find bottlenecks, cut software waste, and reveal smarter tools.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
