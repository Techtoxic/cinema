"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Palette, Camera, ArrowRight, Calendar } from "lucide-react";

const categories = [
  {
    id: "films",
    title: "FILM",
    subtitle: "Moving Pictures",
    description: "From commercials to documentaries, music videos to narrative films",
    icon: Film,
    href: "/films",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    color: "from-blue-600 to-indigo-700",
    stats: { projects: "100+", awards: "25+" },
  },
  {
    id: "creative",
    title: "CREATIVE DIRECTION",
    subtitle: "Brand Strategy",
    description: "Concept development, art direction, and visual identity creation",
    icon: Palette,
    href: "/creative",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    color: "from-purple-600 to-pink-600",
    stats: { projects: "75+", brands: "40+" },
  },
  {
    id: "photo",
    title: "PHOTO",
    subtitle: "Captured Moments",
    description: "Fashion, editorial, product, and lifestyle photography",
    icon: Camera,
    href: "/photography",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    color: "from-amber-600 to-orange-700",
    stats: { shoots: "200+", clients: "50+" },
  },
  {
    id: "events",
    title: "EVENTS",
    subtitle: "Live Experiences",
    description: "Corporate events, concerts, festivals, and special occasions captured with excellence",
    icon: Calendar,
    href: "/events",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    color: "from-green-600 to-teal-700",
    stats: { events: "150+", clients: "60+" },
  },
];

export default function CategoriesShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-6">
        {/* Section Header - Smaller on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-3 md:mb-6"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-300 max-w-3xl mx-auto px-4"
          >
            Explore our four core disciplines, each crafted with precision and passion
          </motion.p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={category.href}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all duration-500 h-full"
                  >
                    {/* Image Background - Much smaller on mobile */}
                    <div className="aspect-[16/9] md:aspect-[4/3] overflow-hidden relative">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 mix-blend-multiply`} />
                      
                      {/* Dark Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

                      {/* Floating Icon - Smaller on mobile */}
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-3 right-3 md:top-6 md:right-6"
                      >
                        <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-2xl`}>
                          <Icon className="text-white" size={20} />
                        </div>
                      </motion.div>

                      {/* Hover Arrow - Hidden on mobile */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="hidden md:block absolute top-6 left-6"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ArrowRight className="text-white" size={24} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content - Much smaller on mobile */}
                    <div className="p-3 md:p-8">
                      <div className={`inline-block px-2 py-0.5 md:px-4 md:py-1.5 bg-gradient-to-r ${category.color} text-white text-[9px] md:text-xs font-bold rounded-full mb-1.5 md:mb-4 uppercase tracking-wider`}>
                        {category.subtitle}
                      </div>
                      
                      <h3 className="text-base md:text-3xl font-display font-bold text-white mb-1.5 md:mb-3 group-hover:text-amber-400 transition-colors">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-2 md:mb-6 leading-tight md:leading-relaxed text-[10px] md:text-base line-clamp-2 md:line-clamp-none">
                        {category.description}
                      </p>

                      {/* Stats - Much smaller on mobile */}
                      <div className="flex gap-2 md:gap-6 pt-2 md:pt-4 border-t border-white/10">
                        {Object.entries(category.stats).map(([key, value]) => (
                          <div key={key}>
                            <div className="text-sm md:text-2xl font-bold text-amber-400">{value}</div>
                            <div className="text-[8px] md:text-xs text-gray-400 uppercase tracking-wider">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* View More Link - Much smaller on mobile */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="mt-2 md:mt-6 flex items-center gap-1 md:gap-2 text-amber-400 text-[10px] md:text-base font-semibold group-hover:gap-4 transition-all"
                      >
                        <span className="hidden md:inline">Explore {category.title}</span>
                        <span className="md:hidden">View</span>
                        <ArrowRight size={12} className="md:w-5 md:h-5" />
                      </motion.div>
                    </div>

                    {/* Shine Effect on Hover */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-white/20 transition-all"
            >
              View All Work
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

