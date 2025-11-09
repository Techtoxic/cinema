"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Aperture, Zap, Sun } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";

const photographyProjects = [
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
    photographer: "B4M TEAM",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Fashion", "Street", "Nature", "Food", "Architecture", "Lifestyle", "Sports", "Product"];
  
  const filteredPhotos = selectedCategory === "All" 
    ? photographyProjects 
    : photographyProjects.filter(p => p.category === selectedCategory);

  return (
    <>
      <LoadingAnimation isLoading={isLoading} onComplete={() => setIsLoading(false)} />
      
      {showSlider && !isLoading && (
        <ImageRevealSlider 
          images={photographyProjects.slice(0, 6).map(p => p.image)}
          onComplete={() => setShowSlider(false)}
        />
      )}

      {/* Lightbox */}
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

      <main className="min-h-screen pt-24 pb-20 bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
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
                y: [0, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-gray-900 to-slate-800 rounded-full shadow-lg"
            >
              <Camera className="text-amber-400" size={28} />
              <span className="text-white font-semibold text-lg">PHOTOGRAPHY</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-8xl font-display font-bold text-slate-900 mb-6 leading-tight"
            >
              Capturing
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Perfect Moments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-700 max-w-3xl mx-auto mb-12"
            >
              From fashion to nature, products to portraits — we create stunning imagery 
              that tells powerful stories and evokes emotion.
            </motion.p>

            {/* Specialty Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-8 flex-wrap"
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
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-3 shadow-lg`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">{feature.label}</div>
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
            className="flex justify-center gap-3 flex-wrap"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-slate-800 to-gray-900 text-white shadow-lg"
                    : "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Photography Grid - Pinterest Style */}
        <section className="container mx-auto px-6">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
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
                    className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-auto"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Category Badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 bg-gradient-to-r ${photo.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {photo.category}
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent p-6 flex flex-col justify-end"
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {photo.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">
                          {photo.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span>📷 {photo.photographer}</span>
                          <span>{photo.year}</span>
                        </div>
                        <div className="text-xs text-amber-400 mb-3">
                          {photo.equipment}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {photo.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Camera Icon Overlay */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                          <Camera size={28} className="text-slate-800" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="bg-white p-4">
                      <h3 className="font-bold text-slate-800 text-lg mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {photo.client}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Services Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <h2 className="text-5xl font-display font-bold text-center mb-16 text-slate-900">
            Photography Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-3xl p-16 text-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900"
          >
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <Camera size={64} className="text-amber-400 mx-auto mb-6" />
              <h2 className="text-5xl font-display font-bold text-white mb-6">
                Let's Capture Your Vision
              </h2>
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                Professional photography services tailored to your needs
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg rounded-full shadow-2xl shadow-amber-500/30"
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

