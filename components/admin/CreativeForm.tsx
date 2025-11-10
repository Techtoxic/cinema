"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreativeDirection } from "@/types";
import { addCreativeDirection, updateCreativeDirection } from "@/lib/firestore";
import { Save, Loader } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface CreativeFormProps {
  creative: CreativeDirection | null;
  onClose: () => void;
}

export default function CreativeForm({ creative, onClose }: CreativeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (creative) {
      setFormData({
        name: creative.name || "",
        description: creative.description || "",
        image: creative.image || "",
      });
    }
  }, [creative]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (creative?.id) {
        await updateCreativeDirection(creative.id, formData);
      } else {
        await addCreativeDirection(formData);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save creative direction");
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
          Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
        />
      </div>

      <ImageUpload
        currentImage={formData.image}
        onImageChange={(url) => setFormData({ ...formData, image: url })}
        storagePath="creative/"
        label="Creative Direction Image"
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
              Save
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

