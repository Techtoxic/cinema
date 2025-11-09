"use client";

import { useState } from "react";
import LogoLoader from "@/components/LogoLoader";
import HeroSection from "@/components/home/HeroSection";
import CategoriesShowcase from "@/components/home/CategoriesShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LogoLoader onComplete={() => setIsLoading(false)} />}
      
      <main className={`min-h-screen transition-opacity duration-300 ${isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <HeroSection />
        <CategoriesShowcase />
        <FeaturedWork />
        <ServicesSection />
        <StatsSection />
        <CTASection />
      </main>
    </>
  );
}
