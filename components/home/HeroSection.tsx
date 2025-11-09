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
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Seamless crossfade every 8 seconds
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextVideoIndex((currentVideoIndex + 1) % videos.length);
      
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
      }, 1500); // Crossfade duration
    }, 8000);

    return () => clearInterval(interval);
  }, [currentVideoIndex]);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Video Background with Seamless Crossfade */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-[var(--color-primary)]/20 to-black/40 z-10" />
        
        {/* Current Video */}
        <video
          key={`current-${currentVideoIndex}`}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            filter: "brightness(0.7) contrast(1.1)",
            opacity: isTransitioning ? 0 : 1,
            transition: "opacity 1.5s ease-in-out"
          }}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>

        {/* Next Video (for crossfade) */}
        {isTransitioning && (
          <video
            key={`next-${nextVideoIndex}`}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              filter: "brightness(0.7) contrast(1.1)",
              opacity: 1,
              transition: "opacity 1.5s ease-in-out"
            }}
          >
            <source src={videos[nextVideoIndex]} type="video/mp4" />
          </video>
        )}

        {/* Video indicators - Smaller */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {videos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setNextVideoIndex(index);
                setTimeout(() => {
                  setCurrentVideoIndex(index);
                  setIsTransitioning(false);
                }, 1500);
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentVideoIndex
                  ? "w-8"
                  : "bg-white/40 w-4 hover:bg-white/60"
              }`}
              style={{
                backgroundColor: index === currentVideoIndex ? "var(--color-primary)" : undefined
              }}
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
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 15px var(--color-primary)",
                  "0 0 30px var(--color-primary)",
                  "0 0 15px var(--color-primary)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              B4M STUDIOS
            </motion.span>
            <br />
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] bg-clip-text text-transparent">
              Ideas in Motion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-200 mb-6 max-w-2xl mx-auto font-light"
          >
            Creating captivating visual stories that leave lasting impressions.
            <br />
            <span className="font-medium" style={{ color: "var(--color-primary)" }}>
              Film • Creative Direction • Photography
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <a
              href="/portfolio"
              className="px-6 py-2.5 text-sm font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg min-w-[160px] text-white"
              style={{ 
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
              }}
            >
              View Our Work
            </a>
            <a
              href="/contact"
              className="px-6 py-2.5 text-sm bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/30 min-w-[160px]"
            >
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Smaller */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/70 cursor-pointer hover:text-white transition-colors"
        >
          <span className="text-xs font-medium mb-1">Scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}

