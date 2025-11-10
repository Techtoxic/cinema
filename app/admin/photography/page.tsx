"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getPhotographies, deletePhotography } from "@/lib/firestore";
import { Photography, PhotoCategory } from "@/types";
import { User } from "firebase/auth";
import { Plus, Trash2, Edit, X, Camera } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import PhotographyForm from "@/components/admin/PhotographyForm";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminPhotography() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [photography, setPhotography] = useState<Photography[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photography | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<PhotoCategory>("All");
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
      fetchPhotography();
    }
  }, [user, filter]);

  const fetchPhotography = async () => {
    try {
      const photographyData = await getPhotographies(filter === "All" ? undefined : filter);
      setPhotography(photographyData);
    } catch (error) {
      console.error("Error fetching photography:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      try {
        await deletePhotography(id);
        fetchPhotography();
      } catch (error) {
        console.error("Error deleting photography:", error);
        alert("Failed to delete photography");
      }
    }
  };

  const handleEdit = (photo: Photography) => {
    setSelectedPhoto(photo);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedPhoto(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedPhoto(null);
    fetchPhotography();
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  const categories: PhotoCategory[] = ["All", "Fashion", "Street", "Nature", "Food", "Architecture", "Lifestyle", "Sports", "Product"];

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
              Manage Photography
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
              Add Photo
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-6 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "text-white"
                  : "border"
              }`}
              style={
                filter === cat
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
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photography.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: "var(--color-bg)",
                border: "1px solid var(--color-border)"
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={photo.image}
                  alt={photo.description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text)"
                    }}
                  >
                    {photo.category}
                  </span>
                  {photo.year && (
                    <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                      {photo.year}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                  {photo.description}
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(photo)}
                    className="p-2 rounded hover:bg-gray-100 transition-colors"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => photo.id && handleDelete(photo.id)}
                    className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {photography.length === 0 && (
          <div className="text-center py-12">
            <Camera size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No photos found. Click "Add Photo" to get started.
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
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-8"
              style={{ backgroundColor: "var(--color-bg)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                  {selectedPhoto ? "Edit Photo" : "Add Photo"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: "var(--color-text)" }} />
                </button>
              </div>
              <PhotographyForm photo={selectedPhoto} onClose={handleFormClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

