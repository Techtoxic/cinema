"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LogoLoaderProps {
  onComplete: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const fullText = "IDEAS IN MOTION";

  useEffect(() => {
    // Typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Complete loading after typing finishes
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
          }}
        >
          {/* Centered Container */}
          <div className="flex flex-col items-center justify-center">
            {/* Logo - Using actual H4M logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative w-32 h-32 md:w-40 md:h-40"
            >
              <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl p-4">
                <Image
                  src="/H4M LOGO.jpg"
                  alt="H4M Studios"
                  fill
                  className="object-contain rounded-xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Typing Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p 
                className="text-xl md:text-2xl font-bold tracking-wider text-white"
              >
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block ml-1"
                >
                  |
                </motion.span>
              </p>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="mt-8"
            >
              <p className="text-xs font-medium text-white/70">
                Loading Experience...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
