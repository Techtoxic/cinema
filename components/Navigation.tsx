"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/films", label: "Films" },
  { href: "/creative", label: "Creative" },
  { href: "/photography", label: "Photo" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "shadow-lg" : ""
      }`}
      style={{
        backgroundColor: isScrolled ? "var(--color-bg)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Compact */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              }}
            >
              <span className="text-sm font-bold text-white">H4M</span>
            </div>
            <span
              className="text-lg font-display font-bold"
              style={{ color: "var(--color-text)" }}
            >
              STUDIOS
            </span>
          </Link>

          {/* Desktop Navigation - Compact */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-300 relative group"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-5 py-2 text-sm text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              }}
            >
              Let's Talk
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-300"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Compact */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t shadow-xl"
            style={{
              backgroundColor: "var(--color-bg)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium transition-colors duration-300 py-2"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-2.5 text-sm text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg mt-4"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                }}
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
