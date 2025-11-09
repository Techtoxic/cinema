"use client";

import { useState, useEffect } from "react";
import LogoLoader from "@/components/LogoLoader";
import HeroSection from "@/components/home/HeroSection";
import CategoriesShowcase from "@/components/home/CategoriesShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    
    if (!hasSeenLoader) {
      // First visit - show loader
      setIsLoading(true);
    } else {
      // Returning to home - show content immediately
      setShowContent(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
    setIsLoading(false);
    setShowContent(true);
  };

  return (
    <>
      {isLoading && <LogoLoader onComplete={handleLoaderComplete} />}
      
      <main className={`min-h-screen transition-opacity duration-300 ${showContent ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
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
