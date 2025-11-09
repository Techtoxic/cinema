"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ImageRevealSliderProps {
  onComplete?: () => void;
  images?: string[];
}

export default function ImageRevealSlider({ onComplete, images }: ImageRevealSliderProps) {
  const defaultImages = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop&q=80",
  ];

  const displayImages = images || defaultImages;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full flex">
        {displayImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%" }}
            animate={{ y: "-120%" }}
            transition={{
              duration: 1.2,
              delay: i * 0.06,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="flex-1 relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.2,
                delay: i * 0.06,
                times: [0, 0.2, 0.8, 1],
              }}
              className="w-full h-full"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.7) contrast(1.2)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

