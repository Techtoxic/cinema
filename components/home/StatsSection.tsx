"use client";

import { motion } from "framer-motion";
import { Award, Users, Video, Star } from "lucide-react";

const stats = [
  {
    icon: Video,
    value: "500+",
    label: "Projects",
  },
  {
    icon: Users,
    value: "200+",
    label: "Clients",
  },
  {
    icon: Award,
    value: "50+",
    label: "Awards",
  },
  {
    icon: Star,
    value: "10+",
    label: "Years",
  },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" 
      }}>
      {/* Background Pattern - Reduced opacity */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Smaller header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-display font-bold mb-2 text-white">
            Proven Excellence
          </h2>
          <p className="text-xs md:text-base text-white/80 max-w-2xl mx-auto">
            Numbers that reflect our commitment
          </p>
        </motion.div>

        {/* Smaller grid */}
        <div className="grid grid-cols-4 gap-3 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                {/* Smaller icons */}
                <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-lg md:rounded-xl mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={16} className="md:w-6 md:h-6 text-white" />
                </div>
                {/* Smaller numbers */}
                <div className="text-xl md:text-3xl lg:text-4xl font-display font-bold mb-1 text-white">
                  {stat.value}
                </div>
                {/* Smaller labels */}
                <p className="text-white/70 text-[10px] md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
