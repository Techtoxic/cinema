"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface ImageRevealSliderProps {
  onComplete?: () => void;
  images?: string[];
}

export default function ImageRevealSlider({ onComplete, images }: ImageRevealSliderProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1920&h=1080&fit=crop&q=80",
  ];

  const displayImages = images || defaultImages;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= displayImages.length - 1) {
          setTimeout(() => onComplete?.(), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 200); // Fast transition every 200ms

    return () => clearInterval(interval);
  }, [displayImages.length, onComplete]);

  return (
    <div className="fixed inset-0 z-40 bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0"
        >
          <img
            src={displayImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.6) contrast(1.1)" }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
