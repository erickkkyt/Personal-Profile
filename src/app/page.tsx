'use client';

import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/home/HeroSection';
import {
  CapabilitiesSection,
  CaseStudiesSection,
} from '@/components/home/HomeNewSections';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { PainPointsSection } from '@/components/home/PainPointsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { FAQSection } from '@/components/home/FAQSection';
import Footer from '@/components/shared/Footer';
import Script from 'next/script';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-9TQ3NWGFC9"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9TQ3NWGFC9');
          `,
        }}
      />

      <Navbar />

      {/* 1. Hero: 价值主张 + 核心入口 */}
      <HeroSection id="home" />

      {/* 2. Social Proof: 信任背书 */}
      <SocialProofSection />

      {/* 3. Pain Points: 场景与痛点唤醒 */}
      <PainPointsSection />

      {/* 4. Capabilities: 专家能力 (Why me) */}
      <CapabilitiesSection />

      {/* 5. Case Studies: 真实案例 (Results) */}
      <CaseStudiesSection />

      {/* 6. Testimonials: 学员评价 (Trust) */}
      <TestimonialsSection />

      {/* 7. Pricing: 产品与价格 (Conversion) */}
      <PricingSection />

      {/* 8. FAQ: 疑难解答 (Objections) */}
      <FAQSection />



      <Footer />
    </main>
  );
}
