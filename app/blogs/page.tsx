"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, User, ArrowRight, Tag } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import ImageRevealSlider from "@/components/ImageRevealSlider";
import TypingEffect from "@/components/TypingEffect";
import { getBlogs, getBlogBySlug } from "@/lib/firestore";
import { Blog } from "@/types";
import Link from "next/link";

export default function BlogsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showSlider, setShowSlider] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs(true); // Only published blogs
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!isLoading && !showSlider) {
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading, showSlider]);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];
  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  const sliderImages = blogs.slice(0, 6).map(b => b.featuredImage).filter(Boolean);

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
        className={"min-h-screen pt-16 md:pt-24 pb-12 md:pb-20 transition-opacity duration-300 " + (showContent ? 'opacity-100' : 'opacity-0')}
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
              className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-6 px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-lg"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <BookOpen className="text-white md:w-7 md:h-7" size={16} />
              <span className="text-white font-semibold text-xs md:text-lg">BLOG & INSIGHTS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-6xl font-display font-bold mb-3 md:mb-6 leading-tight"
            >
              <TypingEffect
                text="STORIES FROM BEHIND THE SCENES"
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
              Discover insights, tutorials, and behind-the-scenes stories from our creative journey.
            </motion.p>
          </motion.div>
        </section>

        {/* Category Filter */}
        {categories.length > 1 && (
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
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </section>
        )}

        {/* Blogs Grid */}
        <section className="container mx-auto px-4 md:px-6">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
              <p style={{ color: "var(--color-text-secondary)" }}>
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                    }}
                    className="group relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      {/* Image Container */}
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <motion.img
                          src={blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-bold rounded-full uppercase">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {blog.author}
                          </span>
                          {blog.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(blog.publishedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-3 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-4 transition-all">
                          Read More
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
    </>
  );
}

