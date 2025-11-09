"use client";

import { motion } from "framer-motion";
import { Film, Tv, Music, Briefcase, Camera, Sparkles } from "lucide-react";

const services = [
  {
    icon: Tv,
    title: "Commercial Production",
    description: "High-impact commercials that elevate your brand",
    features: ["Brand Films", "Product Videos", "Campaigns"],
  },
  {
    icon: Film,
    title: "Narrative Films",
    description: "Compelling stories with cinematic artistry",
    features: ["Short Films", "Documentaries", "Narratives"],
  },
  {
    icon: Music,
    title: "Music Videos",
    description: "Visually stunning videos that amplify sound",
    features: ["Performance", "Concept", "Live Sessions"],
  },
  {
    icon: Briefcase,
    title: "Corporate Videos",
    description: "Professional content that communicates impact",
    features: ["Training", "Event Coverage", "Profiles"],
  },
  {
    icon: Camera,
    title: "Cinematography",
    description: "World-class cinematography services",
    features: ["Camera Ops", "Lighting", "Aerial Footage"],
  },
  {
    icon: Sparkles,
    title: "Post-Production",
    description: "Expert editing and finishing",
    features: ["Color Grading", "VFX", "Sound Design"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" 
      style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10"
        style={{ background: "linear-gradient(to left, var(--color-primary), transparent)" }} 
      />
      
      <div className="container mx-auto px-6 relative z-10">
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
            Our Services
          </h2>
          <p className="text-xs md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-text-secondary)" }}>
            Comprehensive video production services tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid - Smaller cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl md:rounded-2xl p-4 md:p-8 transition-all duration-500 border hover:shadow-xl"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                  <Icon className="text-white" size={20} />
                </div>
                
                <h3 className="text-base md:text-2xl font-display font-bold mb-2 md:mb-3"
                  style={{ color: "var(--color-text)" }}>
                  {service.title}
                </h3>
                
                <p className="text-[10px] md:text-base mb-3 md:mb-4"
                  style={{ color: "var(--color-text-secondary)" }}>
                  {service.description}
                </p>
                
                <ul className="space-y-1 md:space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm"
                      style={{ color: "var(--color-text-secondary)" }}>
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full" 
                        style={{ backgroundColor: "var(--color-primary)" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
