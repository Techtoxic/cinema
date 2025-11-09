"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const featuredProjects = [
  {
    title: "Luxury Brand Campaign",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    description: "A stunning visual journey through haute couture",
  },
  {
    title: "Midnight Tales",
    category: "Narrative",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    description: "An atmospheric noir exploring urban solitude",
  },
  {
    title: "Electric Dreams",
    category: "Music Video",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    description: "Vibrant visuals meet electronic soundscapes",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container mx-auto px-6">
        {/* Section Header - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-2 md:mb-4"
            style={{ color: "var(--color-text)" }}>
            Featured Work
          </h2>
          <p className="text-xs md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}>
            A showcase of our recent projects that define cinematic excellence
          </p>
        </motion.div>

        {/* Featured Projects Grid - Smaller cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content - Smaller text */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 text-white">
                <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-xs font-semibold mb-1.5 md:mb-3 uppercase"
                  style={{ backgroundColor: "var(--color-primary)" }}>
                  {project.category}
                </span>
                <h3 className="text-base md:text-2xl font-display font-bold mb-1 md:mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-200 text-[10px] md:text-sm mb-2 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>
                <div className="flex items-center gap-1 md:gap-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-[10px] md:text-base"
                  style={{ color: "var(--color-primary)" }}>
                  <span>View Project</span>
                  <ArrowRight size={16} className="md:w-5 md:h-5" />
                </div>
              </div>

              {/* Play Button Overlay - Smaller */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[10px] md:border-l-[16px] border-l-white border-t-[8px] md:border-t-[12px] border-t-transparent border-b-[8px] md:border-b-[12px] border-b-transparent ml-0.5 md:ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Smaller */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-8 md:py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-xs md:text-base"
            style={{
              backgroundColor: "var(--color-text)",
              color: "var(--color-bg)",
            }}
          >
            View Full Portfolio
            <ArrowRight size={16} className="md:w-5 md:h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
