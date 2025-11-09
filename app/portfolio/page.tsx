"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Camera, Palette, Play, ExternalLink, Award } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";

const categories = [
  { 
    id: "all", 
    name: "All Work", 
    icon: Film,
    color: "from-amber-500 to-orange-600"
  },
  { 
    id: "film", 
    name: "Film", 
    icon: Film,
    color: "from-blue-500 to-indigo-600"
  },
  { 
    id: "creative", 
    name: "Creative Direction", 
    icon: Palette,
    color: "from-purple-500 to-pink-600"
  },
  { 
    id: "photo", 
    name: "Photography", 
    icon: Camera,
    color: "from-green-500 to-teal-600"
  },
];

const projects = [
  {
    id: 1,
    title: "ARRIBA MI PILSENER",
    category: "film",
    agency: "MULLEN LOWE DELTA",
    director: "JOAQUIN CAMBRE",
    client: "AB INBEV",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    description: "High-energy beer commercial celebrating community and passion for football",
    tags: ["Commercial", "Music Video", "Sports"],
    year: "2024",
    duration: "1:30",
    awards: ["Best Commercial 2024", "Gold Lion Cannes"],
  },
  {
    id: 2,
    title: "ECUADOR NOS MUEVE",
    category: "film",
    agency: "MOVISTAR",
    director: "JUAN CARLOS MANEGLIA",
    client: "TELEFONICA",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    description: "Documentary-style narrative showcasing Ecuador's vibrant culture and connectivity",
    tags: ["Documentary", "Narrative", "Cultural"],
    year: "2024",
    duration: "2:15",
    awards: ["Silver Clio"],
  },
  {
    id: 3,
    title: "SUMMER VIBES 2024",
    category: "creative",
    agency: "IN-HOUSE",
    director: "B4M CREATIVE TEAM",
    client: "VARIOUS",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80",
    description: "Creative direction for summer lifestyle brand campaign",
    tags: ["Lifestyle", "Fashion", "Beach"],
    year: "2024",
    duration: "0:45",
  },
  {
    id: 4,
    title: "GIRASOL - CORAZÓN VIBRANTE",
    category: "film",
    agency: "OGILVY ECUADOR",
    director: "MARÍA FERNANDA",
    client: "GIRASOL",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1200&q=80",
    description: "Uplifting music video featuring dance and celebration",
    tags: ["Music Video", "Dance", "Lifestyle"],
    year: "2024",
    duration: "3:20",
  },
  {
    id: 5,
    title: "TECH PRODUCT LAUNCH",
    category: "creative",
    agency: "B4M STUDIOS",
    director: "PABLO REYES",
    client: "TECH STARTUP",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1200&q=80",
    description: "Sleek product reveal with cutting-edge visual effects",
    tags: ["Tech", "Product", "3D Animation"],
    year: "2024",
    duration: "1:00",
    awards: ["Best Product Video"],
  },
  {
    id: 6,
    title: "FASHION EDITORIAL",
    category: "photo",
    agency: "VOGUE LATAM",
    director: "SOFIA MARTINEZ",
    client: "LUXURY BRAND",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
    description: "High-fashion editorial photography for international magazine",
    tags: ["Fashion", "Editorial", "Luxury"],
    year: "2024",
  },
  {
    id: 7,
    title: "URBAN PORTRAITS",
    category: "photo",
    agency: "B4M STUDIOS",
    director: "CARLOS MENDEZ",
    client: "URBAN CULTURE MAGAZINE",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80",
    description: "Street photography series capturing urban life and energy",
    tags: ["Street Photography", "Documentary", "Urban"],
    year: "2024",
  },
  {
    id: 8,
    title: "INDIE ARTIST SESSION",
    category: "film",
    agency: "INDEPENDENT",
    director: "B4M STUDIOS",
    client: "INDIE ARTIST",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    description: "Intimate live session music video with cinematic storytelling",
    tags: ["Music Video", "Live Session", "Indie"],
    year: "2023",
    duration: "4:15",
  },
  {
    id: 9,
    title: "AUTOMOTIVE EXCELLENCE",
    category: "creative",
    agency: "BBDO ECUADOR",
    director: "RICARDO LEON",
    client: "LUXURY AUTO BRAND",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80",
    description: "Cinematic car commercial showcasing luxury and performance",
    tags: ["Automotive", "Luxury", "Commercial"],
    year: "2023",
    duration: "0:60",
  },
  {
    id: 10,
    title: "NATURE SERIES",
    category: "photo",
    agency: "NATIONAL GEOGRAPHIC",
    director: "DIEGO VARGAS",
    client: "CONSERVATION PROJECT",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    description: "Breathtaking nature photography for conservation campaign",
    tags: ["Nature", "Conservation", "Documentary"],
    year: "2023",
  },
  {
    id: 11,
    title: "FESTIVAL COVERAGE",
    category: "film",
    agency: "EVENT PRODUCTION",
    director: "B4M TEAM",
    client: "MUSIC FESTIVAL",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    description: "High-energy festival recap capturing the best moments",
    tags: ["Festival", "Live Event", "Music"],
    year: "2023",
    duration: "5:30",
  },
  {
    id: 12,
    title: "CULINARY ARTISTRY",
    category: "photo",
    agency: "FOOD NETWORK",
    director: "ISABELLA TORRES",
    client: "GOURMET RESTAURANT",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    description: "Stunning food photography for high-end restaurant branding",
    tags: ["Food", "Commercial", "Lifestyle"],
    year: "2023",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Initial page load animation
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Loading Animation */}
      <LoadingAnimation 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
      />

      {/* Image Reveal Slider */}
      {showSlider && !isLoading && (
        <ImageRevealSlider 
          images={filteredProjects.slice(0, 6).map(p => p.image)}
        />
      )}

      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        {/* Header - Much smaller on mobile */}
        <section className="container mx-auto px-6 mb-8 md:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block"
            >
              <h1 className="text-3xl md:text-6xl lg:text-8xl font-display font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent bg-[length:200%_auto]">
                Our Portfolio
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs md:text-xl text-slate-700 mb-4 md:mb-8"
            >
              Showcasing excellence across film, creative direction, and photography
            </motion.p>
            
            {/* Animated stats - Smaller on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4 md:gap-8 flex-wrap"
            >
              {[
                { label: "Projects", value: "150+" },
                { label: "Awards", value: "25+" },
                { label: "Clients", value: "50+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-3xl font-bold text-amber-600">{stat.value}</div>
                  <div className="text-[10px] md:text-sm text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter - Much smaller on mobile */}
        <section className="container mx-auto px-6 mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 md:gap-4"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative flex items-center gap-1.5 md:gap-3 px-3 py-2 md:px-8 md:py-4 rounded-full md:rounded-2xl text-xs md:text-base font-semibold transition-all duration-500 overflow-hidden ${
                    activeCategory === category.id
                      ? "text-white shadow-lg md:shadow-2xl"
                      : "bg-white text-slate-700 hover:shadow-xl border border-slate-200 md:border-2"
                  }`}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      className={`absolute inset-0 bg-gradient-to-r ${category.color}`}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <Icon size={16} className="md:w-6 md:h-6 relative z-10" />
                  <span className="relative z-10">{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        {/* Projects Grid with Advanced Animations */}
        <section className="container mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {/* Image with Zoom Effect */}
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"
                    />

                    {/* Hover Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 p-6 flex flex-col justify-end"
                    >
                      <div className="text-amber-400 text-sm font-semibold mb-2">
                        {project.agency}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.awards && (
                        <div className="flex items-center gap-2 text-amber-400 text-xs">
                          <Award size={14} />
                          <span>{project.awards[0]}</span>
                        </div>
                      )}
                    </motion.div>

                    {/* Play Button */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl cursor-pointer"
                      >
                        <Play size={32} fill="white" color="white" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Director: {project.director}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ rotate: 45, scale: 1.2 }}
                        className="text-amber-500 hover:text-amber-600"
                      >
                        <ExternalLink size={20} />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Client: {project.client}</span>
                      {project.duration && <span>{project.duration}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CTA Section with Animation */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 rounded-3xl p-16 md:p-20"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />

            <div className="relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
              >
                Ready to Create{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Something Epic?
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto"
              >
                Let's bring your vision to life with stunning visuals that captivate and inspire
              </motion.p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/30"
              >
                Start Your Project
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
