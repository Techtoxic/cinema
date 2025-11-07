"use client";

import { motion } from "framer-motion";
import { Camera, Award, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Camera,
    title: "Cinematic Excellence",
    description: "We push boundaries to create visually stunning content that stands the test of time",
  },
  {
    icon: Award,
    title: "Award-Winning",
    description: "Our work has been recognized at international film festivals and industry events",
  },
  {
    icon: Users,
    title: "Collaborative Spirit",
    description: "We work closely with clients to ensure their vision comes to life perfectly",
  },
  {
    icon: Zap,
    title: "Innovative Approach",
    description: "Using cutting-edge technology and creative techniques to deliver exceptional results",
  },
];

const equipment = [
  "RED Komodo 6K Cinema Camera",
  "Sony FX6 Full-Frame Camera",
  "DJI Ronin 2 Gimbal System",
  "ARRI SkyPanel LED Lighting",
  "DJI Inspire 3 Drone",
  "Blackmagic Design DaVinci Resolve Studio",
];

const team = [
  {
    name: "Creative Director",
    role: "Visionary Leader",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Director of Photography",
    role: "Visual Storyteller",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Lead Editor",
    role: "Post-Production Master",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Sound Designer",
    role: "Audio Specialist",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
  },
];

export default function About() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-dark-blue to-dark-charcoal bg-clip-text text-transparent">
            About H4M Studios
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            We are a passionate team of visual storytellers dedicated to creating 
            cinematic experiences that captivate, inspire, and leave lasting impressions.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6 text-dark-charcoal">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              At H4M Studios, we believe every project deserves a cinematic touch. 
              Our mission is to transform ideas into visual masterpieces that resonate 
              with audiences and exceed expectations.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From concept to final delivery, we bring technical expertise, creative 
              vision, and unwavering commitment to every frame we capture.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80"
              alt="Production"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="container mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-12 text-dark-charcoal"
        >
          What Drives Us
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-dark-charcoal">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Equipment Section */}
      <section className="container mx-auto px-6 mb-20">
        <div className="bg-gradient-to-br from-dark-blue to-dark-charcoal rounded-3xl p-12 md:p-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Professional Equipment
            </h2>
            <p className="text-gray-300 text-lg">
              We utilize industry-leading gear to ensure the highest quality production
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
              >
                <p className="text-white font-medium">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-display font-bold text-center mb-12 text-dark-charcoal"
        >
          Meet Our Talent
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-display font-bold text-dark-charcoal mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

