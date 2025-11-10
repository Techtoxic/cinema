"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getCreativeDirections, deleteCreativeDirection } from "@/lib/firestore";
import { CreativeDirection } from "@/types";
import { User } from "firebase/auth";
import { Plus, Trash2, Edit, X, Palette } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import CreativeForm from "@/components/admin/CreativeForm";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminCreative() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [creative, setCreative] = useState<CreativeDirection[]>([]);
  const [selectedCreative, setSelectedCreative] = useState<CreativeDirection | null>(null);
  const [showForm, setShowForm] = useState(false);
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
      fetchCreative();
    }
  }, [user]);

  const fetchCreative = async () => {
    try {
      const creativeData = await getCreativeDirections();
      setCreative(creativeData);
    } catch (error) {
      console.error("Error fetching creative directions:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this creative direction?")) {
      try {
        await deleteCreativeDirection(id);
        fetchCreative();
      } catch (error) {
        console.error("Error deleting creative direction:", error);
        alert("Failed to delete creative direction");
      }
    }
  };

  const handleEdit = (item: CreativeDirection) => {
    setSelectedCreative(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedCreative(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCreative(null);
    fetchCreative();
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
              Manage Creative Direction
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
              Add Creative
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creative.map((item) => (
            <motion.div
              key={item.id}
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
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--color-text)" }}>
                  {item.name}
                </h3>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
                  {item.description}
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded hover:bg-gray-100 transition-colors"
                    style={{ color: "var(--color-primary)" }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => item.id && handleDelete(item.id)}
                    className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {creative.length === 0 && (
          <div className="text-center py-12">
            <Palette size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No creative directions found. Click "Add Creative" to get started.
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
                  {selectedCreative ? "Edit Creative Direction" : "Add Creative Direction"}
                </h2>
                <button
                  onClick={handleFormClose}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: "var(--color-text)" }} />
                </button>
              </div>
              <CreativeForm creative={selectedCreative} onClose={handleFormClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

