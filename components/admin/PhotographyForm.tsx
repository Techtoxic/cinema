"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Photography, PhotoCategory } from "@/types";
import { addPhotography, updatePhotography } from "@/lib/firestore";
import { Save, Loader } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface PhotographyFormProps {
  photo: Photography | null;
  onClose: () => void;
}

const categories: PhotoCategory[] = ["Fashion", "Street", "Nature", "Food", "Architecture", "Lifestyle", "Sports", "Product"];

export default function PhotographyForm({ photo, onClose }: PhotographyFormProps) {
  const [formData, setFormData] = useState({
    image: "",
    description: "",
    category: "Fashion" as PhotoCategory,
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (photo) {
      setFormData({
        image: photo.image || "",
        description: photo.description || "",
        category: (photo.category as PhotoCategory) || "Fashion",
        year: photo.year || "",
      });
    }
  }, [photo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        year: formData.year || undefined,
      };
      if (photo?.id) {
        await updatePhotography(photo.id, dataToSave);
      } else {
        await addPhotography(dataToSave);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save photo");
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

      <ImageUpload
        currentImage={formData.image}
        onImageChange={(url) => setFormData({ ...formData, image: url })}
        storagePath="photography/"
        label="Photo"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as PhotoCategory })}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Year (Optional)
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="2024"
          />
        </div>
      </div>

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
              Save Photo
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

