"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const videos = [
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
  "/video5.mp4",
];

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Rotate through videos every 6 seconds
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      setIsVideoLoaded(false);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Carousel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-blue-900/70 to-slate-800/60 z-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVideoIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.8) contrast(1.1)" }}
            >
              <source src={videos[currentVideoIndex]} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* Video indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {videos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentVideoIndex
                  ? "bg-amber-500 w-12"
                  : "bg-white/40 w-6 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
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
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(245, 166, 35, 0.5)",
                  "0 0 40px rgba(245, 166, 35, 0.7)",
                  "0 0 20px rgba(245, 166, 35, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              B4M STUDIOS
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Ideas in Motion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light"
          >
            Creating captivating visual stories that leave lasting impressions.
            <br />
            <span className="text-amber-400 font-medium">Film • Creative Direction • Photography</span>
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

