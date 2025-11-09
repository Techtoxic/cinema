"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingAnimation({ isLoading, onComplete }: LoadingAnimationProps) {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Show slider after logo animation
      const timer = setTimeout(() => {
        setShowSlider(true);
      }, 1200);

      // Complete loading sequence
      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 2500);

      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        >
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 2, ease: "linear", repeat: Infinity },
                scale: { duration: 1.5, repeat: Infinity },
              }}
              className="relative"
            >
              {/* Logo Circle with Pulse */}
              <div className="w-32 h-32 rounded-full border-4 border-amber-500/50 flex items-center justify-center relative">
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 rounded-full border-4 border-amber-400"
                />
                <span className="text-5xl font-bold text-amber-500">H4M</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Slider Animation - Bottom to Top */}
          {showSlider && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "-100%", opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: "easeInOut",
                  }}
                  className="absolute w-full h-32"
                  style={{
                    left: `${(i % 4) * 25}%`,
                    width: "25%",
                  }}
                >
                  <div
                    className="w-full h-full opacity-30"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${
                        i % 2 === 0 ? "#f59e0b" : "#3b82f6"
                      }, transparent)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-20 left-0 right-0 text-center"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white text-lg font-light tracking-widest"
            >
              LOADING EXPERIENCE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

