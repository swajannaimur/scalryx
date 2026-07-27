import { Header } from "./components/layout/header";
import { Footer } from "./components/layout/footer";
import { FeaturesSection } from "./components/landing/features-section";
import { HeroSection } from "./components/landing/hero-section";
import { HowItWorks } from "./components/landing/how-it-works";
import { PricingSection } from "./components/landing/pricing-section";
import { ProductShowcase } from "./components/landing/product-showcase";
import { StatsStrip } from "./components/landing/stats-strip";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsStrip />
        <FeaturesSection />
        <HowItWorks />
        <ProductShowcase />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
