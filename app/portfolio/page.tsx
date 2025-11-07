"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Tv, Music } from "lucide-react";

const categories = [
  { id: "all", name: "All Projects", icon: Film },
  { id: "commercial", name: "Commercial", icon: Tv },
  { id: "narrative", name: "Narrative", icon: Film },
  { id: "music", name: "Music Video", icon: Music },
];

const projects = [
  {
    id: 1,
    title: "Luxury Fashion Campaign",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    description: "High-end fashion commercial for international brand",
  },
  {
    id: 2,
    title: "Urban Dreams",
    category: "narrative",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    description: "Short narrative film exploring city life",
  },
  {
    id: 3,
    title: "Electronic Waves",
    category: "music",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    description: "Music video for emerging electronic artist",
  },
  {
    id: 4,
    title: "Tech Product Launch",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80",
    description: "Product reveal video for tech startup",
  },
  {
    id: 5,
    title: "Midnight Stories",
    category: "narrative",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    description: "Atmospheric short film with noir elements",
  },
  {
    id: 6,
    title: "Indie Rock Session",
    category: "music",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&q=80",
    description: "Live session music video with raw energy",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-dark-blue to-dark-charcoal bg-clip-text text-transparent">
            Our Work
          </h1>
          <p className="text-lg text-gray-600">
            Showcasing our finest productions across commercials, narratives, and music videos
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white text-gray-700 hover:bg-light-blue border border-gray-200"
                }`}
              >
                <Icon size={20} />
                {category.name}
              </button>
            );
          })}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 text-dark-charcoal">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-light-blue text-dark-blue text-xs font-medium rounded-full uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Play button overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-xl">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 mt-20 text-center"
      >
        <div className="bg-gradient-to-br from-dark-blue to-dark-charcoal rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and bring your vision to life
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
          >
            Start Your Project
          </a>
        </div>
      </motion.section>
    </main>
  );
}

