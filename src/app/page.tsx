'use client';
import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/components/home/HeroSection';
import {
  ProductEntrySection,
  CapabilitiesSection,
  ScenariosSection,
  OfferingsSection,
  CaseStudiesSection,
  ContentSection,
  CommunitySection,
} from '@/components/home/HomeNewSections';
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

      {/* 个人自我介绍 */}
      <HeroSection id="home" />

      {/* 产品入口 */}
      <ProductEntrySection />

      {/* 能力与产品 */}
      <CapabilitiesSection />
      <ScenariosSection />
      <OfferingsSection />
      <CaseStudiesSection />
      <ContentSection />
      <CommunitySection />

      <Footer />
    </main>
  );
}
