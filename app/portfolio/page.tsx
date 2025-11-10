"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Camera, Palette, Play, ExternalLink, Award, Calendar } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import { getFilms, getCreativeDirections, getPhotographies, getEvents } from "@/lib/firestore";

type PortfolioItem = {
  id: string;
  type: "film" | "creative" | "photo" | "event";
  title: string;
  image: string;
  description: string;
  [key: string]: any;
};

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
  { 
    id: "event", 
    name: "Events", 
    icon: Calendar,
    color: "from-emerald-500 to-cyan-600"
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const [films, creative, photography, events] = await Promise.all([
          getFilms(),
          getCreativeDirections(),
          getPhotographies(),
          getEvents(),
        ]);

        const items: PortfolioItem[] = [
          ...films.map((film) => ({
            id: film.id!,
            type: "film" as const,
            title: film.title,
            image: film.image,
            description: film.description,
            director: film.director,
            producer: film.producer,
            category: film.category,
            trailerUrl: film.trailerUrl,
          })),
          ...creative.map((item) => ({
            id: item.id!,
            type: "creative" as const,
            title: item.name,
            image: item.image,
            description: item.description,
          })),
          ...photography.map((photo) => ({
            id: photo.id!,
            type: "photo" as const,
            title: photo.description.substring(0, 50) || "Photography",
            image: photo.image,
            description: photo.description,
            category: photo.category,
            year: photo.year,
          })),
          ...events.map((event) => ({
            id: event.id!,
            type: "event" as const,
            title: event.title,
            image: event.image,
            description: event.description,
            location: event.location,
            date: event.date,
          })),
        ];

        setPortfolioItems(items);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolioData();
  }, []);

  useEffect(() => {
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.type === activeCategory);

  const sliderImages = filteredItems.slice(0, 6).map(item => item.image);

  const getCategoryColor = (type: string) => {
    const category = categories.find(cat => cat.id === type);
    return category?.color || "from-amber-500 to-orange-600";
  };

  return (
    <>
      <LoadingAnimation 
        isLoading={isLoading} 
        onComplete={() => setIsLoading(false)}
      />

      {showSlider && !isLoading && sliderImages.length > 0 && (
        <ImageRevealSlider 
          images={sliderImages}
          onComplete={() => setShowSlider(false)}
        />
      )}

      <main
        className={
          "min-h-screen pt-24 pb-20 transition-opacity duration-300 " +
          (showContent ? "opacity-100" : "opacity-0")
        }
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Header */}
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
              className="text-xs md:text-xl mb-4 md:mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Showcasing excellence across film, creative direction, photography, and events
            </motion.p>
            
            {/* Animated stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-4 md:gap-8 flex-wrap"
            >
              {[
                { label: "Projects", value: portfolioItems.length.toString() },
                { label: "Films", value: portfolioItems.filter(i => i.type === "film").length.toString() },
                { label: "Events", value: portfolioItems.filter(i => i.type === "event").length.toString() },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-xl md:text-3xl font-bold" style={{ color: "var(--color-primary)" }}>{stat.value}</div>
                  <div className="text-[10px] md:text-sm" style={{ color: "var(--color-text-secondary)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter */}
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
                      : "border"
                  }`}
                  style={
                    activeCategory === category.id
                      ? {}
                      : {
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-text)",
                        }
                  }
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

        {/* Projects Grid */}
        <section className="container mx-auto px-6">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
                No projects found in this category. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
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
                    className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      border: "1px solid var(--color-border)"
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 p-6 flex flex-col justify-end"
                      >
                        <div className={`inline-block px-2 py-1 bg-gradient-to-r ${getCategoryColor(item.type)} text-white text-xs font-bold rounded-full mb-2`}>
                          {item.type.toUpperCase()}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                        {item.director && (
                          <p className="text-gray-400 text-xs mb-1">
                            Director: {item.director}
                          </p>
                        )}
                        {item.location && (
                          <p className="text-gray-400 text-xs">
                            📍 {item.location}
                          </p>
                        )}
                      </motion.div>

                      {item.trailerUrl && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <a href={item.trailerUrl} target="_blank" rel="noopener noreferrer">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl cursor-pointer"
                            >
                              <Play size={32} fill="white" color="white" />
                            </motion.div>
                          </a>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold mb-1" style={{ color: "var(--color-text)" }}>
                            {item.title}
                          </h3>
                          {item.director && (
                            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                              {item.director}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2 mb-3" style={{ color: "var(--color-text-secondary)" }}>
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        {item.category && <span>{item.category}</span>}
                        {item.year && <span>{item.year}</span>}
                        {item.date && <span>{item.date}</span>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* CTA Section */}
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
            className="relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-16 lg:p-20"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            }}
          >
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
                className="inline-block px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-full transition-all duration-300 shadow-2xl"
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
