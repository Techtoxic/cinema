"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Calendar, User, ArrowLeft, Tag } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { getBlogBySlug } from "@/lib/firestore";
import { Blog } from "@/types";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const slug = params.slug as string;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData);
        } else {
          router.push("/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        router.push("/blogs");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!blog) {
    return null;
  }

  return (
    <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium hover:gap-4 transition-all"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl overflow-hidden"
        >
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight" style={{ color: "var(--color-text)" }}>
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <User size={16} />
              <span>{blog.author}</span>
            </div>
            {blog.publishedAt && (
              <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                <Calendar size={16} />
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none mb-12"
            style={{ color: "var(--color-text)" }}
          >
            <div className="whitespace-pre-wrap leading-relaxed">
              {blog.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-white/90 mb-6">
              Let's bring your vision to life. Get in touch with us today.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.article>
      </div>
    </main>
  );
}

