"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LogoLoaderProps {
  onComplete: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const text = "IDEAS IN MOTION • B4M STUDIOS • CINEMATIC EXCELLENCE • ";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 4000);

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
          {/* Centered Logo Container */}
          <div className="relative flex items-center justify-center w-full h-full">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Logo Circle */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-2xl animate-pulse-glow">
                <span className="text-4xl font-bold text-white">B4M</span>
              </div>

              {/* Circular Animated Text */}
              <svg
                className="absolute"
                width="280"
                height="280"
                viewBox="0 0 280 280"
                style={{ 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)"
                }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 140, 140 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                  />
                </defs>
                
                {/* Animated rotating text */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformOrigin: "140px 140px" }}
                >
                  <text className="text-[14px] font-bold uppercase tracking-wider" fill="var(--color-primary)">
                    <textPath href="#circlePath" startOffset="0%">
                      {text}
                    </textPath>
                  </text>
                </motion.g>
              </svg>

              {/* Spinning outer ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute"
                style={{ 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)",
                  width: "280px",
                  height: "280px"
                }}
              >
                <div 
                  className="w-full h-full rounded-full border-2 border-dashed opacity-30"
                  style={{ borderColor: "var(--color-primary)" }}
                />
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-20 text-center"
            >
              <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                Loading Experience...
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
