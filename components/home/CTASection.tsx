"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-light-DEFAULT">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-dark-blue via-dark-charcoal to-dark-blue rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 py-16 md:py-24 px-8 md:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary border border-primary/30 mb-6"
            >
              <MessageCircle size={16} />
              <span className="text-sm font-semibold">Let's Collaborate</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight"
            >
              Ready to Bring Your
              <br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Vision to Life?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Let's create something extraordinary together. Get in touch with us 
              to discuss your next project and see how we can help you achieve your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/40 min-w-[200px] justify-center"
              >
                Start Your Project
                <ArrowRight size={20} />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/30 min-w-[200px] justify-center"
              >
                View Portfolio
              </a>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-20 h-20 border-2 border-primary/30 rounded-full" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border-2 border-primary/20 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

