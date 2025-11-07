"use client";

import { motion } from "framer-motion";
import { Award, Users, Video, Star } from "lucide-react";

const stats = [
  {
    icon: Video,
    value: "500+",
    label: "Projects Completed",
  },
  {
    icon: Users,
    value: "200+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "50+",
    label: "Awards Won",
  },
  {
    icon: Star,
    value: "10+",
    label: "Years Experience",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-dark-blue to-dark-charcoal text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Proven Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our commitment to outstanding results
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-primary/30">
                  <Icon size={32} />
                </div>
                <div className="text-5xl md:text-6xl font-display font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-400 text-lg">
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

