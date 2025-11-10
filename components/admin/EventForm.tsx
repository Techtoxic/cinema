"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Event } from "@/types";
import { addEvent, updateEvent } from "@/lib/firestore";
import { Save, Loader } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface EventFormProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventForm({ event, onClose }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        image: event.image || "",
        description: event.description || "",
        location: event.location || "",
        date: event.date || "",
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const dataToSave = {
        ...formData,
        location: formData.location || undefined,
        date: formData.date || undefined,
      };
      if (event?.id) {
        await updateEvent(event.id, dataToSave);
      } else {
        await addEvent(dataToSave);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save event");
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

      <ImageUpload
        currentImage={formData.image}
        onImageChange={(url) => setFormData({ ...formData, image: url })}
        storagePath="events/"
        label="Event Image"
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

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Location (Optional)
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="Nairobi, Kenya"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
            Date (Optional)
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            placeholder="December 2024"
          />
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
              Save Event
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
}

