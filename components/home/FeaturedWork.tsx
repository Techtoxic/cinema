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
    <section className="py-24 bg-light-DEFAULT">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-dark-charcoal">
            Featured Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A showcase of our recent projects that define cinematic excellence
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift bg-white"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-semibold mb-3 uppercase">
                  {project.category}
                </span>
                <h3 className="text-2xl font-display font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>View Project</span>
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark-charcoal text-white font-semibold rounded-full hover:bg-dark-blue transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View Full Portfolio
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

