"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  style?: React.CSSProperties;
}

export default function TypingEffect({ 
  text, 
  speed = 100, 
  className = "",
  showCursor = true,
  style
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, text, speed]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0 }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

