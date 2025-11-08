"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Award, Clock, Users } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";

const filmProjects = [
  {
    id: 1,
    title: "ARRIBA MI PILSENER",
    category: "Commercial",
    agency: "MULLEN LOWE DELTA",
    director: "JOAQUIN CAMBRE",
    client: "AB INBEV",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    description: "High-energy beer commercial celebrating community and passion for football. Shot on location with dynamic crowd scenes and emotional storytelling.",
    tags: ["Commercial", "Music Video", "Sports", "Lifestyle"],
    year: "2024",
    duration: "1:30",
    crew: "45+ crew members",
    awards: ["Best Commercial 2024", "Gold Lion Cannes", "Silver Clio"],
    color: "from-amber-600 to-orange-700",
  },
  {
    id: 2,
    title: "ECUADOR NOS MUEVE",
    category: "Documentary",
    agency: "MOVISTAR",
    director: "JUAN CARLOS MANEGLIA",
    client: "TELEFONICA",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
    description: "Documentary-style narrative showcasing Ecuador's vibrant culture and connectivity through personal stories.",
    tags: ["Documentary", "Narrative", "Cultural", "Branded Content"],
    year: "2024",
    duration: "2:15",
    crew: "30+ crew members",
    awards: ["Silver Clio", "Best Documentary Short"],
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: 3,
    title: "GIRASOL - CORAZÓN VIBRANTE",
    category: "Music Video",
    agency: "OGILVY ECUADOR",
    director: "MARÍA FERNANDA",
    client: "GIRASOL",
    image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=600&q=80",
    description: "Uplifting music video featuring dance and celebration with colorful choreography and vibrant production design.",
    tags: ["Music Video", "Dance", "Lifestyle", "Choreography"],
    year: "2024",
    duration: "3:20",
    crew: "50+ crew members",
    color: "from-pink-600 to-purple-700",
  },
  {
    id: 4,
    title: "INDIE ARTIST SESSION",
    category: "Music Video",
    agency: "INDEPENDENT",
    director: "B4M STUDIOS",
    client: "INDIE ARTIST",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
    description: "Intimate live session music video with cinematic storytelling and atmospheric lighting.",
    tags: ["Music Video", "Live Session", "Indie", "Performance"],
    year: "2023",
    duration: "4:15",
    crew: "15+ crew members",
    awards: ["Best Music Video - Indie Film Festival"],
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: 5,
    title: "AUTOMOTIVE EXCELLENCE",
    category: "Commercial",
    agency: "BBDO ECUADOR",
    director: "RICARDO LEON",
    client: "LUXURY AUTO BRAND",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80",
    description: "Cinematic car commercial showcasing luxury and performance with stunning cinematography.",
    tags: ["Automotive", "Luxury", "Commercial", "CGI"],
    year: "2023",
    duration: "0:60",
    crew: "40+ crew members",
    awards: ["Best Automotive Ad"],
    color: "from-slate-700 to-gray-900",
  },
  {
    id: 6,
    title: "FESTIVAL COVERAGE",
    category: "Event",
    agency: "EVENT PRODUCTION",
    director: "B4M TEAM",
    client: "MUSIC FESTIVAL",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=80",
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    description: "High-energy festival recap capturing the best moments, performances, and crowd energy.",
    tags: ["Festival", "Live Event", "Music", "Documentary"],
    year: "2023",
    duration: "5:30",
    crew: "25+ crew members",
    color: "from-violet-600 to-fuchsia-700",
  },
];

export default function FilmsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Commercial", "Music Video", "Documentary", "Event"];
  
  const filteredFilms = selectedCategory === "All" 
    ? filmProjects 
    : filmProjects.filter(f => f.category === selectedCategory);

  return (
    <>
      <LoadingAnimation isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      
      {showSlider && !isLoading && (
        <ImageRevealSlider images={filmProjects.slice(0, 6).map(p => p.thumbnail)} />
      )}

      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Hero Header */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <Film className="text-amber-400" size={28} />
              <span className="text-white font-semibold text-lg">FILM PRODUCTIONS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl font-display font-bold text-white mb-6 leading-tight"
            >
              Stories That
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-pulse-glow">
                Move People
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              From commercials to documentaries, music videos to narrative films — 
              we create cinematic experiences that captivate and inspire.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-12 flex-wrap"
            >
              {[
                { icon: Film, label: "Films Produced", value: "100+" },
                { icon: Award, label: "Awards Won", value: "25+" },
                { icon: Users, label: "Team Members", value: "50+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-3 group-hover:shadow-2xl group-hover:shadow-amber-500/50 transition-all">
                    <stat.icon className="text-white" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-4 flex-wrap"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/50"
                    : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Films Grid */}
        <section className="container mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFilms.map((film, index) => (
                <motion.div
                  key={film.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                  }}
                  className="group relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-md border border-white/10 hover:border-amber-500/50 transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <motion.img
                      src={film.image}
                      alt={film.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${film.color} opacity-60 mix-blend-multiply`} />
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
                    />

                    {/* Play Button */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/50 cursor-pointer"
                      >
                        <Play size={32} fill="white" color="white" />
                      </motion.div>
                    </motion.div>

                    {/* Hover Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-0 bottom-0 p-6"
                    >
                      <div className="flex items-center gap-4 text-xs text-gray-300 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {film.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {film.crew}
                        </span>
                      </div>
                      <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                        {film.description}
                      </p>
                      {film.awards && (
                        <div className="flex items-center gap-2 text-amber-400 text-xs">
                          <Award size={14} />
                          <span>{film.awards[0]}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full mb-3 uppercase">
                      {film.category}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {film.title}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>Director: <span className="text-gray-300">{film.director}</span></p>
                      <p>Agency: <span className="text-gray-300">{film.agency}</span></p>
                      <p>Client: <span className="text-gray-300">{film.client}</span></p>
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {film.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl p-16 text-center bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            />
            <h2 className="text-5xl font-display font-bold text-white mb-6 relative z-10">
              Ready to Tell Your Story?
            </h2>
            <p className="text-white/90 text-xl mb-8 relative z-10">
              Let's create something extraordinary together
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-5 bg-white text-amber-600 font-bold text-lg rounded-full shadow-2xl relative z-10"
            >
              Start a Film Project
            </motion.a>
          </div>
        </motion.section>
      </main>
    </>
  );
}

