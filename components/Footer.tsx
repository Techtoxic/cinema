"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ 
      backgroundColor: "var(--color-surface)", 
      borderColor: "var(--color-border)" 
    }}>
      <div className="container mx-auto px-6 py-8">
        {/* Compact Single Row Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
              >
                <span className="text-sm font-bold text-white">B4M</span>
              </div>
              <span className="text-base font-display font-bold" style={{ color: "var(--color-text)" }}>
                B4M STUDIOS
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--color-text-secondary)" }}>
              Ideas in Motion - Creating cinematic experiences.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Instagram, href: "#", label: "IG" },
                { Icon: Facebook, href: "#", label: "FB" },
                { Icon: Youtube, href: "#", label: "YT" },
                { Icon: Linkedin, href: "#", label: "LI" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ 
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)"
                  }}
                  aria-label={label}
                >
                  <Icon size={14} style={{ color: "var(--color-text-secondary)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>Quick Links</h3>
            <ul className="space-y-1.5">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/films", label: "Films" },
                { href: "/creative", label: "Creative" },
                { href: "/photography", label: "Photography" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors duration-300 hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>Services</h3>
            <ul className="space-y-1.5">
              {[
                "Film Production",
                "Creative Direction",
                "Photography",
                "Music Videos",
                "Post-Production",
                "Brand Strategy",
              ].map((service) => (
                <li key={service}>
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold mb-3" style={{ color: "var(--color-text)" }}>Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <a href="mailto:contact@b4mstudios.com" className="text-xs hover:underline" style={{ color: "var(--color-text-secondary)" }}>
                  contact@b4mstudios.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <a href="tel:+254703920951" className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  (+254) 703 920 951
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    Nairobi, Kenya<br />
                    Kiambu Road<br />
                    P.O Box 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p style={{ color: "var(--color-text-secondary)" }}>
            © {currentYear} B4M Studios. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors duration-300 hover:underline"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:underline"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
