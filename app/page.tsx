import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { AnnouncementBar } from "./components/layout/announcement-bar";
import { HeroSection } from "./components/landing/hero-section";
import { AudienceSection } from "./components/landing/audience-section";
import { TrustSection } from "./components/landing/trust-section";
import { ResourcesSection } from "./components/landing/resources-section";
import { VideosSection } from "./components/landing/videos-section";
import { DealsSection } from "./components/landing/deals-section";
import { NewsletterSection } from "./components/landing/newsletter-section";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <AudienceSection />
        <TrustSection />
        <ResourcesSection />
        <VideosSection />
        <DealsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
