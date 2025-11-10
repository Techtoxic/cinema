"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import TypingEffect from "@/components/TypingEffect";
import { getEvents } from "@/lib/firestore";
import { Event } from "@/types";

export default function EventsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    // Optimize for slow connections - shorter delay
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Fetch events from Firestore
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    // Show content after loaders complete
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  // Use first 6 events for slider images
  const sliderImages = events.slice(0, 6).map(e => e.image);
  const baseMainClasses = "min-h-screen pt-16 md:pt-24 pb-12 md:pb-20 transition-opacity duration-300";
  const opacityMainClass = showContent ? " opacity-100" : " opacity-0";
  const mainClassName = baseMainClasses + opacityMainClass;

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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImage}
              alt="Event"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={mainClassName} style={{ backgroundColor: "var(--color-surface)" }}>
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
              className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-6 px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <Calendar className="text-white" size={16} className="md:w-7 md:h-7" />
              <span className="text-white font-semibold text-xs md:text-lg">EVENTS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-3 md:mb-6 leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              <TypingEffect 
                text="CAPTURING LIVE MOMENTS" 
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
              className="text-xs md:text-base lg:text-xl max-w-3xl mx-auto mb-6 md:mb-12"
              style={{ color: "var(--color-text-secondary)" }}
            >
              From corporate gatherings to music festivals, we capture the energy and emotion of every live experience.
            </motion.p>
          </motion.div>
        </section>

        {/* Events Grid */}
        <section className="container mx-auto px-4 md:px-6">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg" style={{ color: "var(--color-text-secondary)" }}>
                No events available yet. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div 
              layout 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                    style={{ 
                      backgroundColor: "var(--color-bg)",
                      border: "1px solid var(--color-border)"
                    }}
                    onClick={() => setLightboxImage(event.image)}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <motion.img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
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
                        className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end"
                      >
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 line-clamp-2">
                          {event.description}
                        </p>
                        {event.location && (
                          <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm mb-2">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.date && (
                          <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
                            <Clock size={14} />
                            <span>{event.date}</span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Card Info */}
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                        {event.title}
                      </h3>
                      <p className="text-sm md:text-base mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {event.location && (
                          <div className="flex items-center gap-1 text-xs md:text-sm" style={{ color: "var(--color-text-secondary)" }}>
                            <MapPin size={12} />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.date && (
                          <div className="flex items-center gap-1 text-xs md:text-sm" style={{ color: "var(--color-text-secondary)" }}>
                            <Clock size={12} />
                            <span>{event.date}</span>
                          </div>
                        )}
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
          className="container mx-auto px-4 md:px-6 mt-16 md:mt-24"
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
                className="text-2xl md:text-4xl lg:text-6xl font-display font-bold text-white mb-4 md:mb-6"
              >
                Ready to Capture Your Event?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm md:text-base lg:text-xl mb-6 md:mb-10 max-w-2xl mx-auto"
              >
                Let's create stunning visuals that preserve the magic of your special moments
              </motion.p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 md:px-10 py-3 md:py-5 bg-white text-slate-900 font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-2xl"
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}

