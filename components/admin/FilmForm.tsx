"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Film } from "@/types";
import { addFilm, updateFilm } from "@/lib/firestore";
import { Save, Loader } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface FilmFormProps {
  film: Film | null;
  onClose: () => void;
}

export default function FilmForm({ film, onClose }: FilmFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    producer: "",
    director: "",
    image: "",
    description: "",
    trailerUrl: "",
    category: "Commercial" as "Commercial" | "Documentary",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (film) {
      setFormData({
        title: film.title || "",
        producer: film.producer || "",
        director: film.director || "",
        image: film.image || "",
        description: film.description || "",
        trailerUrl: film.trailerUrl || "",
        category: film.category || "Commercial",
      });
    }
  }, [film]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (film?.id) {
        await updateFilm(film.id, formData);
      } else {
        await addFilm(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save film");
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

      <div className="grid md:grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as "Commercial" | "Documentary" })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            <option value="Commercial">Commercial</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Producer *
          </label>
          <input
            type="text"
            value={formData.producer}
            onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Director *
          </label>
          <input
            type="text"
            value={formData.director}
            onChange={(e) => setFormData({ ...formData, director: e.target.value })}
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

      <ImageUpload
        currentImage={formData.image}
        onImageChange={(url) => setFormData({ ...formData, image: url })}
        storagePath="films/"
        label="Film Image"
      />

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
          Trailer URL (YouTube)
        </label>
        <input
          type="url"
          value={formData.trailerUrl}
          onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
          placeholder="https://www.youtube.com/watch?v=..."
        />
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
              Save Film
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

