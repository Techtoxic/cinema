"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          style={{ 
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" 
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-white/20 rounded-full text-white border border-white/30 mb-3 md:mb-6"
            >
              <MessageCircle size={12} className="md:w-4 md:h-4" />
              <span className="text-[10px] md:text-sm font-semibold">Let's Collaborate</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6 leading-tight"
            >
              Ready to Bring Your
              <br />
              <span className="text-white/90">
                Vision to Life?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-[10px] md:text-base lg:text-xl text-white/90 mb-4 md:mb-10 max-w-2xl mx-auto"
            >
              Let's create something extraordinary together. Get in touch with us 
              to discuss your next project.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-8 md:py-4 bg-white text-xs md:text-base font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl min-w-[150px] md:min-w-[200px] justify-center"
                style={{ color: "var(--color-primary)" }}
              >
                Start Your Project
                <ArrowRight size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-8 md:py-4 bg-white/10 backdrop-blur-md text-white text-xs md:text-base font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/30 min-w-[150px] md:min-w-[200px] justify-center"
              >
                View Portfolio
              </a>
            </motion.div>

            {/* Decorative Elements - Smaller */}
            <div className="absolute top-4 md:top-8 left-4 md:left-8 w-10 h-10 md:w-20 md:h-20 border-2 border-white/30 rounded-full" />
            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-16 h-16 md:w-32 md:h-32 border-2 border-white/20 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
