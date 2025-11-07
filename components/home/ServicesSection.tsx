"use client";

import { motion } from "framer-motion";
import { Film, Tv, Music, Briefcase, Camera, Sparkles } from "lucide-react";

const services = [
  {
    icon: Tv,
    title: "Commercial Production",
    description: "High-impact commercials that elevate your brand and drive results",
    features: ["Brand Films", "Product Videos", "Advertising Campaigns"],
  },
  {
    icon: Film,
    title: "Narrative Films",
    description: "Compelling stories brought to life with cinematic artistry",
    features: ["Short Films", "Documentaries", "Brand Narratives"],
  },
  {
    icon: Music,
    title: "Music Videos",
    description: "Visually stunning music videos that amplify your sound",
    features: ["Performance Videos", "Concept Videos", "Live Sessions"],
  },
  {
    icon: Briefcase,
    title: "Corporate Videos",
    description: "Professional corporate content that communicates with impact",
    features: ["Training Videos", "Event Coverage", "Company Profiles"],
  },
  {
    icon: Camera,
    title: "Cinematography",
    description: "World-class cinematography services for any production",
    features: ["Camera Operation", "Lighting Design", "Aerial Footage"],
  },
  {
    icon: Sparkles,
    title: "Post-Production",
    description: "Expert editing and finishing that brings your vision to perfection",
    features: ["Color Grading", "VFX", "Sound Design"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-light-blue to-transparent opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-dark-charcoal">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive video production services tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-light-gray rounded-2xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/20"
              >
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
                  <Icon className="text-white" size={28} />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 text-dark-charcoal">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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

