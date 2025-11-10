"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getFilms, deleteFilm } from "@/lib/firestore";
import { Film, FilmCategory } from "@/types";
import { User } from "firebase/auth";
import { Plus, Trash2, Edit, X, Film as FilmIcon, Play } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import FilmForm from "@/components/admin/FilmForm";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminFilms() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<FilmCategory>("All");
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
      fetchFilms();
    }
  }, [user, filter]);

  const fetchFilms = async () => {
    try {
      const filmsData = await getFilms(filter === "All" ? undefined : filter);
      setFilms(filmsData);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this film?")) {
      try {
        await deleteFilm(id);
        fetchFilms();
      } catch (error) {
        console.error("Error deleting film:", error);
        alert("Failed to delete film");
      }
    }
  };

  const handleEdit = (film: Film) => {
    setSelectedFilm(film);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedFilm(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedFilm(null);
    fetchFilms();
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  const categories: FilmCategory[] = ["All", "Commercial", "Documentary"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
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
              Manage Films
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
              Add Film
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filter */}
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

        {/* Films Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film) => (
            <motion.div
              key={film.id}
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
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover"
                />
                {film.trailerUrl && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
                      <Play size={12} />
                      Trailer
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1" style={{ color: "var(--color-text)" }}>
                      {film.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {film.director}
                    </p>
                  </div>
                </div>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                  {film.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text)"
                    }}
                  >
                    {film.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(film)}
                      className="p-2 rounded hover:bg-gray-100 transition-colors"
                      style={{ color: "var(--color-primary)" }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => film.id && handleDelete(film.id)}
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

        {films.length === 0 && (
          <div className="text-center py-12">
            <FilmIcon size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No films found. Click "Add Film" to get started.
            </p>
          </div>
        )}
      </main>

      {/* Form Modal */}
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
                  {selectedFilm ? "Edit Film" : "Add Film"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: "var(--color-text)" }} />
                </button>
              </div>
              <FilmForm film={selectedFilm} onClose={handleFormClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

