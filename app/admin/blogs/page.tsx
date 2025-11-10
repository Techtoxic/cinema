"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getBlogs, deleteBlog } from "@/lib/firestore";
import { Blog } from "@/types";
import { User } from "firebase/auth";
import { Plus, Trash2, Edit, X, BookOpen, Eye, EyeOff } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";
import BlogForm from "@/components/admin/BlogForm";

export default function AdminBlogs() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (!currentUser) {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user, filter]);

  const fetchBlogs = async () => {
    try {
      const blogsData = await getBlogs(false);
      let filtered = blogsData;
      
      if (filter === "published") {
        filtered = blogsData.filter(b => b.published);
      } else if (filter === "draft") {
        filtered = blogsData.filter(b => !b.published);
      }
      
      setBlogs(filtered);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog");
      }
    }
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedBlog(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedBlog(null);
    fetchBlogs();
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      <header className="sticky top-0 z-40 border-b bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="text-sm" style={{ color: "var(--color-text-secondary)" }}
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              Manage Blogs
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AdminThemeToggle />
            <motion.button
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
              }}
            >
              <Plus size={20} />
              Add Blog
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {[
            { id: "all", label: "All" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Drafts" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.id
                  ? "text-white"
                  : "border"
              }`}
              style={
                filter === f.id
                  ? {
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                    }
                  : {
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)"
              }}
            >
              <div className="aspect-video relative">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                {!blog.published && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-600 text-white text-xs font-bold rounded">
                    DRAFT
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1" style={{ color: "var(--color-text)" }}>
                      {blog.title}
                    </h3>
                    <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                      {blog.author} • {blog.category}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text-secondary)"
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => blog.id && handleDelete(blog.id)}
                      className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No blogs found. Click "Add Blog" to get started.
            </p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                  {selectedBlog ? "Edit Blog" : "Add Blog"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: "var(--color-text)" }} />
                </button>
              </div>
              <BlogForm blog={selectedBlog} onClose={handleFormClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

