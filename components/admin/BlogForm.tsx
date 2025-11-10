"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Blog } from "@/types";
import { addBlog, updateBlog } from "@/lib/firestore";
import { Save, Loader } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface BlogFormProps {
  blog: Blog | null;
  onClose: () => void;
}

export default function BlogForm({ blog, onClose }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    author: "",
    category: "",
    tags: [] as string[],
    published: false,
  });
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        content: blog.content || "",
        excerpt: blog.excerpt || "",
        featuredImage: blog.featuredImage || "",
        author: blog.author || "",
        category: blog.category || "",
        tags: blog.tags || [],
        published: blog.published || false,
      });
    }
  }, [blog]);

  useEffect(() => {
    // Auto-generate slug from title
    if (!blog) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, blog]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
      
      if (blog?.id) {
        await updateBlog(blog.id, dataToSave);
      } else {
        await addBlog(dataToSave);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="blog-post-url"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Author *
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Category *
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="Industry, Technology, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Published
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 rounded"
            />
            <span className="text-sm" style={{ color: "var(--color-text)" }}>
              Publish this blog post
            </span>
          </label>
        </div>
      </div>

      <ImageUpload
        currentImage={formData.featuredImage}
        onImageChange={(url) => setFormData({ ...formData, featuredImage: url })}
        storagePath="blogs/"
        label="Featured Image"
      />

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Excerpt *
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          required
          rows={3}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
          placeholder="Short description of the blog post"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Content *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={12}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all font-mono text-sm"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
          placeholder="Write your blog post content here (supports markdown)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)"
            }}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text)"
              }}
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 rounded-lg font-medium transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)"
          }}
        >
          Cancel
        </button>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2 disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
          }}
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Saving...
            </>
          ) : (
            <>
              <Save size={20} />
              Save Blog
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

