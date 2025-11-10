"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sparkles, TrendingUp, Lightbulb } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import TypingEffect from "@/components/TypingEffect";
import { getCreativeDirections } from "@/lib/firestore";
import { CreativeDirection } from "@/types";

/*const creativeProjects = [
  {
    id: 1,
    title: "SUMMER VIBES 2024",
    type: "Brand Campaign",
    client: "LIFESTYLE BRAND",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=80",
    description: "Complete creative direction for summer lifestyle brand campaign including concept development, art direction, and production oversight.",
    services: ["Concept Development", "Art Direction", "Brand Strategy", "Production Design"],
    year: "2024",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "TECH PRODUCT LAUNCH",
    type: "Product Launch",
    client: "TECH STARTUP",
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=1400&q=80",
    description: "Sleek product reveal with cutting-edge visual effects and comprehensive brand identity development.",
    services: ["Product Design", "3D Visualization", "Motion Graphics", "Brand Identity"],
    year: "2024",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: 3,
    title: "LUXURY FASHION EDITORIAL",
    type: "Editorial Direction",
    client: "HIGH-END FASHION BRAND",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&q=80",
    description: "Complete creative direction for luxury fashion editorial including styling, set design, and visual storytelling.",
    services: ["Fashion Styling", "Set Design", "Visual Storytelling", "Art Direction"],
    year: "2024",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    title: "RESTAURANT BRANDING",
    type: "Brand Identity",
    client: "GOURMET RESTAURANT",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80",
    description: "Complete brand identity development including logo design, menu design, interior concept, and marketing collateral.",
    services: ["Logo Design", "Brand Guidelines", "Interior Concept", "Marketing Collateral"],
    year: "2024",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "URBAN CULTURE MAGAZINE",
    type: "Editorial Design",
    client: "DIGITAL PUBLICATION",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1400&q=80",
    description: "Art direction and design for urban culture digital magazine featuring bold typography and dynamic layouts.",
    services: ["Editorial Design", "Typography", "Layout Design", "Digital Publishing"],
    year: "2023",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 6,
    title: "EVENT VISUAL IDENTITY",
    type: "Event Branding",
    client: "MUSIC FESTIVAL",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400&q=80",
    description: "Complete visual identity for major music festival including logo, stage design, promotional materials, and environmental graphics.",
    services: ["Logo Design", "Stage Design", "Environmental Graphics", "Merchandise Design"],
    year: "2023",
    color: "from-violet-500 to-purple-600",
  },
];

export default function CreativePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [creativeProjects, setCreativeProjects] = useState<CreativeDirection[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCreative = async () => {
      try {
        const creativeData = await getCreativeDirections();
        setCreativeProjects(creativeData);
      } catch (error) {
        console.error("Error fetching creative directions:", error);
      }
    };
    fetchCreative();
  }, []);

  useEffect(() => {
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  const mainClassName = "min-h-screen pt-16 md:pt-24 pb-12 md:pb-20 transition-opacity duration-300 " + (showContent ? "opacity-100" : "opacity-0");

  return (
    <>
      {isLoading && <LoadingAnimation isLoading={isLoading} onComplete={() => setIsLoading(false)} />}
      
      {showSlider && !isLoading && creativeProjects.length > 0 && (
        <ImageRevealSlider 
          images={creativeProjects.slice(0, 6).map(p => p.image)}
          onComplete={() => setShowSlider(false)}
        />
      )}

      <main
        className={mainClassName}
        style={{ backgroundColor: "var(--color-surface)" }}
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
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <Palette className="text-white" size={28} />
              <span className="text-white font-semibold text-lg">CREATIVE DIRECTION</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-3 md:mb-6 leading-tight"
            >
              <TypingEffect 
                text="IDEAS THAT TRANSFORM BRANDS" 
                speed={80}
                className="block"
                style={{ 
                  background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm md:text-base lg:text-xl max-w-3xl mx-auto mb-12"
              style={{ color: "var(--color-text-secondary)" }}
            >
              From concept to execution, we craft unique visual identities and creative strategies 
              that make brands stand out and connect with audiences.
            </motion.p>

            {/* Services Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Sparkles, label: "Brand Strategy", color: "from-purple-500 to-purple-600" },
                { icon: Palette, label: "Art Direction", color: "from-pink-500 to-pink-600" },
                { icon: Lightbulb, label: "Concept Development", color: "from-orange-500 to-orange-600" },
                { icon: TrendingUp, label: "Creative Consulting", color: "from-amber-500 to-amber-600" },
              ].map((service, i) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-slate-800">{service.label}</h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Masonry Grid */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            {creativeProjects.length === 0 ? (
              <div className="text-center py-12 col-span-full">
                <p style={{ color: "var(--color-text-secondary)" }}>
                  No creative direction projects available yet. Check back soon!
                </p>
              </div>
            ) : (
              creativeProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                }}
                className="break-inside-avoid group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Colored Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-40 mix-blend-multiply" />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 flex flex-col justify-end"
                    >
                      <p className="text-white text-sm line-clamp-3">
                        {project.description}
                      </p>
                    </motion.div>

                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                      {project.name}
                    </h3>
                    <p className="text-sm line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))
            )}
          </motion.div>
        </section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 mt-24"
        >
          <h2 className="text-5xl font-display font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Creative Process
            </span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your brand, goals, and target audience" },
              { step: "02", title: "Ideation", desc: "Brainstorming creative concepts and strategies" },
              { step: "03", title: "Creation", desc: "Bringing ideas to life with stunning visuals" },
              { step: "04", title: "Launch", desc: "Delivering exceptional results that exceed expectations" },
            ].map((phase, i) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-200 to-pink-200 mb-4">
                  {phase.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{phase.title}</h3>
                <p className="text-slate-600">{phase.desc}</p>
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
            className="relative overflow-hidden rounded-3xl p-16 text-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative z-10">
              <h2 className="text-5xl font-display font-bold text-white mb-6">
                Let's Create Something Unique
              </h2>
              <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
                Ready to elevate your brand with exceptional creative direction?
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-full shadow-2xl"
              >
                Start Your Creative Project
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}

