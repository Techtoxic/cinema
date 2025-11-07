"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-blue/40 via-dark-charcoal/60 to-dark-blue/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Placeholder for actual video */}
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-dark-blue/20">
          <div className="text-white/40 text-center">
            <div className="w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-0 h-0 border-l-[16px] border-l-white/50 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
            </div>
            <p className="text-sm font-medium">Demo Reel Placeholder</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cinematic Stories
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Beautifully Told
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
          >
            We craft premium visual experiences that captivate audiences
            and elevate brands through the art of cinematography
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/portfolio"
              className="px-8 py-4 bg-gradient-gold text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/30 min-w-[200px]"
            >
              View Our Work
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/30 min-w-[200px]"
            >
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/70 cursor-pointer hover:text-white transition-colors"
        >
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

