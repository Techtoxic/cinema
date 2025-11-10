"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Aperture, Zap, Sun } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import TypingEffect from "@/components/TypingEffect";
import { getPhotographies } from "@/lib/firestore";
import { Photography, PhotoCategory } from "@/types";

/*const photographyProjects = [
  {
    id: 1,
    title: "FASHION EDITORIAL",
    category: "Fashion",
    photographer: "SOFIA MARTINEZ",
    client: "VOGUE LATAM",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80",
    description: "High-fashion editorial photography for international magazine featuring luxury brands and cutting-edge styling.",
    tags: ["Editorial", "Luxury", "Studio"],
    year: "2024",
    equipment: "Canon R5, 85mm f/1.2",
    color: "from-rose-400 to-pink-600",
  },
  {
    id: 2,
    title: "URBAN PORTRAITS",
    category: "Street",
    photographer: "CARLOS MENDEZ",
    client: "URBAN CULTURE MAGAZINE",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80",
    description: "Street photography series capturing urban life, culture, and the essence of city living.",
    tags: ["Street", "Documentary", "Urban"],
    year: "2024",
    equipment: "Sony A7IV, 35mm f/1.4",
    color: "from-slate-500 to-gray-700",
  },
  {
    id: 3,
    title: "NATURE SERIES",
    category: "Nature",
    photographer: "DIEGO VARGAS",
    client: "NATIONAL GEOGRAPHIC",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80",
    description: "Breathtaking nature photography showcasing biodiversity and environmental conservation.",
    tags: ["Nature", "Conservation", "Landscape"],
    year: "2023",
    equipment: "Nikon Z9, 70-200mm f/2.8",
    color: "from-green-500 to-emerald-700",
  },
  {
    id: 4,
    title: "CULINARY ARTISTRY",
    category: "Food",
    photographer: "ISABELLA TORRES",
    client: "GOURMET MAGAZINE",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
    description: "Stunning food photography showcasing culinary masterpieces with artistic composition and lighting.",
    tags: ["Food", "Commercial", "Studio"],
    year: "2023",
    equipment: "Canon R6, 100mm Macro",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "ARCHITECTURAL VISION",
    category: "Architecture",
    photographer: "PABLO REYES",
    client: "ARCHITECTURE DIGEST",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
    description: "Modern architectural photography capturing design, structure, and spatial relationships.",
    tags: ["Architecture", "Interior", "Design"],
    year: "2024",
    equipment: "Sony A1, 16-35mm f/2.8",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 6,
    title: "LIFESTYLE MOMENTS",
    category: "Lifestyle",
    photographer: "MARIA SANTOS",
    client: "LIFESTYLE BRAND",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1400&q=80",
    description: "Authentic lifestyle photography capturing genuine moments and human connections.",
    tags: ["Lifestyle", "Portraits", "Natural Light"],
    year: "2024",
    equipment: "Fujifilm X-T5, 56mm f/1.2",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: 7,
    title: "SPORTS ACTION",
    category: "Sports",
    photographer: "RICARDO LEON",
    client: "SPORTS MAGAZINE",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1400&q=80",
    description: "Dynamic sports photography freezing peak action moments with precision timing.",
    tags: ["Sports", "Action", "Editorial"],
    year: "2023",
    equipment: "Nikon Z9, 400mm f/2.8",
    color: "from-red-500 to-orange-600",
  },
  {
    id: 8,
    title: "PRODUCT EXCELLENCE",
    category: "Product",
    photographer: "H4M TEAM",
    client: "LUXURY BRANDS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&q=80",
    description: "Premium product photography with meticulous attention to detail and lighting.",
    tags: ["Product", "Commercial", "Studio"],
    year: "2024",
    equipment: "Canon R5, 100mm Macro",
    color: "from-indigo-500 to-purple-600",
  },
];

export default function PhotographyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const [photography, setPhotography] = useState<Photography[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPhotography = async () => {
      try {
        const photographyData = await getPhotographies(selectedCategory === "All" ? undefined : selectedCategory);
        setPhotography(photographyData);
      } catch (error) {
        console.error("Error fetching photography:", error);
      }
    };
    fetchPhotography();
  }, [selectedCategory]);

  useEffect(() => {
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  const categories: PhotoCategory[] = ["All", "Fashion", "Street", "Nature", "Food", "Architecture", "Lifestyle", "Sports", "Product"];
  const sliderImages = photography.slice(0, 6).map(p => p.image);

  const getMainClassName = () => {
    const baseClasses = "min-h-screen pt-16 md:pt-24 pb-12 md:pb-20 transition-opacity duration-300";
    const opacityClass = showContent ? "opacity-100" : "opacity-0";
    return baseClasses + " " + opacityClass;
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

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              src={lightboxImage}
              alt="Lightbox"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={getMainClassName()} style={{ backgroundColor: "var(--color-surface)" }}>
        {/* Hero Header - Much smaller on mobile */}
        <section className="container mx-auto px-4 md:px-6 mb-8 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-6 px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <Camera className="text-white md:w-7 md:h-7" size={16} />
              <span className="text-white font-semibold text-xs md:text-lg">PHOTOGRAPHY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-3 md:mb-6 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              <TypingEffect 
                text="CAPTURING PERFECT MOMENTS" 
                speed={80}
                className="block"
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs md:text-base lg:text-xl max-w-3xl mx-auto mb-6 md:mb-12"
              style={{ color: "var(--color-text-secondary)" }}
            >
              From fashion to nature, products to portraits — we create stunning imagery 
              that tells powerful stories and evokes emotion.
            </motion.p>

            {/* Specialty Grid - Smaller on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-3 md:gap-8 flex-wrap"
            >
              {[
                { icon: Aperture, label: "Professional Equipment", color: "from-blue-500 to-cyan-600" },
                { icon: Zap, label: "Fast Turnaround", color: "from-amber-500 to-orange-600" },
                { icon: Sun, label: "Natural & Studio", color: "from-purple-500 to-pink-600" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.color} mb-1.5 md:mb-3 shadow-lg`}>
                    <feature.icon className="text-white md:w-7 md:h-7" size={16} />
                  </div>
                  <div className="text-[9px] md:text-sm font-semibold" style={{ color: "var(--color-text)" }}>{feature.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Category Filter - Smaller on mobile */}
        <section className="container mx-auto px-4 md:px-6 mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center gap-2 md:gap-3 flex-wrap"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 py-1 md:px-5 md:py-2 rounded-full font-semibold text-[10px] md:text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "text-white shadow-lg"
                    : "border-2"
                }`}
                style={
                  selectedCategory === cat
                    ? { background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }
                    : {
                        backgroundColor: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)"
                      }
                }
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Photography Grid - Pinterest Style */}
        <section className="container mx-auto px-4 md:px-6">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {photography.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p style={{ color: "var(--color-text-secondary)" }}>
                    No photos available yet. Check back soon!
                  </p>
                </div>
              ) : (
                photography.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setLightboxImage(photo.image)}
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={photo.image}
                        alt={photo.description || "Photography"}
                        className="w-full h-auto"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        loading="lazy"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 md:top-3 md:left-3 px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[9px] md:text-xs font-bold rounded-full shadow-lg">
                        {photo.category}
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 md:p-6 flex flex-col justify-end"
                      >
                        <p className="text-gray-300 text-[10px] md:text-sm mb-2 md:mb-3 line-clamp-3">
                          {photo.description}
                        </p>
                        {photo.year && (
                          <div className="flex items-center justify-between text-[9px] md:text-xs text-gray-400">
                            <span>{photo.year}</span>
                          </div>
                        )}
                      </motion.div>

                      {/* Camera Icon Overlay */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                          <Camera size={16} className="md:w-7 md:h-7" style={{ color: "var(--color-text)" }} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="p-2 md:p-4" style={{ backgroundColor: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
                      <p className="text-[9px] md:text-xs line-clamp-2 mb-1" style={{ color: "var(--color-text)" }}>
                        {photo.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] md:text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--color-surface)", color: "var(--color-text-secondary)" }}>
                          {photo.category}
                        </span>
                        {photo.year && (
                          <span className="text-[8px] md:text-xs" style={{ color: "var(--color-text-secondary)" }}>
                            {photo.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Services Section - Smaller */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 mt-12 md:mt-24"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-center mb-6 md:mb-16"
            style={{ color: "var(--color-text)" }}>
            Photography Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                title: "Commercial",
                desc: "Product, fashion, and advertising photography for brands",
                icon: "📸",
              },
              {
                title: "Editorial",
                desc: "Magazine spreads, lookbooks, and storytelling imagery",
                icon: "📰",
              },
              {
                title: "Event",
                desc: "Corporate events, concerts, and special occasions",
                icon: "🎉",
              },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all border"
                style={{ 
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)"
                }}
              >
                <div className="text-4xl md:text-6xl mb-2 md:mb-4">{service.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3" style={{ color: "var(--color-text)" }}>{service.title}</h3>
                <p className="text-xs md:text-base" style={{ color: "var(--color-text-secondary)" }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA - Smaller */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 md:px-6 mt-12 md:mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-2xl md:rounded-3xl p-8 md:p-16 text-center"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-96 h-48 md:h-96 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <Camera size={32} className="text-white mx-auto mb-3 md:mb-6 md:w-16 md:h-16" />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-6">
                Let's Capture Your Vision
              </h2>
              <p className="text-white/80 text-xs md:text-base lg:text-xl mb-4 md:mb-8 max-w-2xl mx-auto">
                Professional photography services tailored to your needs
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-5 py-2.5 md:px-10 md:py-5 bg-white text-xs md:text-base font-bold rounded-full shadow-2xl"
                style={{ color: "var(--color-primary)" }}
              >
                Book a Photo Session
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
