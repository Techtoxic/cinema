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
        {/* Compact Layout - 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
              >
                <span className="text-xs font-bold text-white">H4M</span>
              </div>
              <span className="text-sm font-display font-bold" style={{ color: "var(--color-text)" }}>
                H4M STUDIOS
              </span>
            </div>
            <p className="text-[10px] mb-3" style={{ color: "var(--color-text-secondary)" }}>
              Ideas in Motion
            </p>
            <div className="flex gap-1.5">
              {[
                { Icon: Instagram, href: "#", label: "IG" },
                { Icon: Facebook, href: "#", label: "FB" },
                { Icon: Youtube, href: "#", label: "YT" },
                { Icon: Linkedin, href: "#", label: "LI" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-7 h-7 rounded flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{ 
                    backgroundColor: "var(--color-bg)",
                    border: "1px solid var(--color-border)"
                  }}
                  aria-label={label}
                >
                  <Icon size={12} className="transition-colors duration-300" 
                    style={{ 
                      color: label === "IG" ? "#E4405F" : 
                             label === "FB" ? "#1877F2" :
                             label === "YT" ? "#FF0000" :
                             "#0A66C2"
                    }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold mb-2" style={{ color: "var(--color-text)" }}>Links</h3>
            <ul className="space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/films", label: "Films" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[10px] transition-colors duration-300 hover:underline"
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
            <h3 className="text-xs font-bold mb-2" style={{ color: "var(--color-text)" }}>Services</h3>
            <ul className="space-y-1">
              {[
                "Film",
                "Creative",
                "Photography",
                "Music Videos",
              ].map((service) => (
                <li key={service}>
                  <span className="text-[10px]" style={{ color: "var(--color-text-secondary)" }}>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Spans 2 cols on mobile */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-bold mb-2" style={{ color: "var(--color-text)" }}>Contact</h3>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-1.5">
                <Mail size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <a href="mailto:contact@h4mstudios.com" className="text-[10px] hover:underline break-all" style={{ color: "var(--color-text-secondary)" }}>
                  contact@h4mstudios.com
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <Phone size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <a href="tel:+254703920951" className="text-[10px]" style={{ color: "var(--color-text-secondary)" }}>
                  (+254) 703 920 951
                </a>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin size={12} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-[10px]" style={{ color: "var(--color-text-secondary)" }}>
                    Nairobi, Kenya
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="pt-3 border-t flex flex-col md:flex-row justify-between items-center gap-2 text-[10px]"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p style={{ color: "var(--color-text-secondary)" }}>
            © {currentYear} H4M Studios
          </p>
          <div className="flex gap-3">
            <a href="#" className="transition-colors duration-300 hover:underline"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Privacy
            </a>
            <a href="#" className="transition-colors duration-300 hover:underline"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
