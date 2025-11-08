"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CategoriesShowcase from "@/components/home/CategoriesShowcase";
import FeaturedWork from "@/components/home/FeaturedWork";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <CategoriesShowcase />
      <FeaturedWork />
      <ServicesSection />
      <StatsSection />
      <CTASection />
    </main>
  );
}

