"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import TypingEffect from "@/components/TypingEffect";
import { getFilms } from "@/lib/firestore";
import { Film as FilmType, FilmCategory } from "@/types";

export default function FilmsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FilmCategory>("All");
  const [showContent, setShowContent] = useState(false);
  const [films, setFilms] = useState<FilmType[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchFilmsData = async () => {
      try {
        const filmsData = await getFilms(selectedCategory === "All" ? undefined : selectedCategory);
        setFilms(filmsData);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilmsData();
  }, [selectedCategory]);

  useEffect(() => {
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  const categories: FilmCategory[] = ["All", "Commercial", "Documentary"];
  const sliderImages = films.slice(0, 6).map(f => f.image);

  const getColorClass = (category: string) => {
    return category === "Commercial" 
      ? "from-amber-600 to-orange-700" 
      : "from-blue-600 to-indigo-700";
  };

  return (
    <>
      {isLoading && <LoadingAnimation isLoading={isLoading} onComplete={() => setIsLoading(false)} />}
      
      {showSlider && !isLoading && sliderImages.length > 0 && (
        <ImageRevealSlider 
          images={sliderImages}
          onComplete={() => setShowSlider(false)}
        />
      )}

      <main 
        className={"min-h-screen pt-16 md:pt-24 pb-12 md:pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 transition-opacity duration-300 " + (showContent ? 'opacity-100' : 'opacity-0')}
      >
        {/* Hero Header */}
        <section className="container mx-auto px-4 md:px-6 mb-8 md:mb-20">
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
              className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-6 px-3 py-1.5 md:px-6 md:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
            >
              <Film className="text-amber-400 md:w-7 md:h-7" size={16} />
              <span className="text-white font-semibold text-xs md:text-lg">FILM PRODUCTIONS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold text-white mb-3 md:mb-6 leading-tight"
            >
              <TypingEffect 
                text="STORIES THAT MOVE PEOPLE" 
                speed={80}
                className="block"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs md:text-base lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-12"
            >
              From commercials to documentaries — we create cinematic experiences that captivate and inspire.
            </motion.p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 md:px-6 mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-2 md:gap-4 flex-wrap"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 py-1 md:px-3 md:py-1.5 lg:px-6 lg:py-3 rounded-full text-[10px] md:text-xs lg:text-base font-semibold transition-all duration-300 ${
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
        <section className="container mx-auto px-4 md:px-6">
          {films.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg text-gray-300">
                No films available yet. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <AnimatePresence mode="popLayout">
                {films.map((film, index) => (
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
                      <div className={`absolute inset-0 bg-gradient-to-t ${getColorClass(film.category)} opacity-60 mix-blend-multiply`} />
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"
                      />

                      {/* Trailer Icon */}
                      {film.trailerUrl && (
                        <div className="absolute top-4 right-4">
                          <a
                            href={film.trailerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full text-xs font-semibold transition-all shadow-lg"
                          >
                            <Play size={14} fill="white" />
                            Watch Trailer
                          </a>
                        </div>
                      )}

                      {/* Play Button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        {film.trailerUrl ? (
                          <a href={film.trailerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/50 cursor-pointer"
                            >
                              <Play size={32} fill="white" color="white" />
                            </motion.div>
                          </a>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/50"
                          >
                            <Play size={32} fill="white" color="white" />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Hover Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute inset-x-0 bottom-0 p-6"
                      >
                        <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                          {film.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-3 md:p-6">
                      <div className={`inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r ${getColorClass(film.category)}/20 text-amber-400 text-[9px] md:text-xs font-bold rounded-full mb-2 md:mb-3 uppercase`}>
                        {film.category}
                      </div>
                      <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">
                        {film.title}
                      </h3>
                      <div className="space-y-0.5 md:space-y-1 text-[10px] md:text-sm text-gray-400">
                        <p>Director: <span className="text-gray-300">{film.director}</span></p>
                        <p>Producer: <span className="text-gray-300">{film.producer}</span></p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 mt-12 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-16 text-center bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-white/10 rounded-full blur-3xl"
            />
            <h2 className="text-xl md:text-3xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6 relative z-10">
              Ready to Tell Your Story?
            </h2>
            <p className="text-white/90 text-xs md:text-base lg:text-xl mb-4 md:mb-8 relative z-10">
              Let's create something extraordinary together
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-5 py-2.5 md:px-10 md:py-5 bg-white text-amber-600 font-bold text-sm md:text-lg rounded-full shadow-2xl relative z-10"
            >
              Start a Film Project
            </motion.a>
          </div>
        </motion.section>
      </main>
    </>
  );
}
