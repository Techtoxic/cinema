"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LogoLoaderProps {
  onComplete: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const text = "IDEAS IN MOTION • B4M STUDIOS • CINEMATIC EXCELLENCE •";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3500);

    return () => clearTimeout(timer);
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
            background: "linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface) 100%)"
          }}
        >
          {/* Logo */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* Logo Circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-2xl animate-pulse-glow">
                <span className="text-3xl font-bold text-white">B4M</span>
              </div>
            </motion.div>

            {/* Circular Typing Text */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
              style={{ top: "-38px", left: "-38px", width: "200px", height: "200px" }}
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] font-semibold uppercase tracking-wider"
                fill="var(--color-primary)"
              >
                <textPath href="#circlePath" className="typing-circle">
                  {text}
                </textPath>
              </motion.text>
            </svg>

            {/* Spinning outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{ top: "-38px", left: "-38px", width: "200px", height: "200px" }}
            >
              <div className="w-full h-full rounded-full border-2 border-dashed opacity-30"
                style={{ borderColor: "var(--color-primary)" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

