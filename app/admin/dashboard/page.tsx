"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { onAuthChange, signOut } from "@/lib/auth";
import { User } from "firebase/auth";
import { Film, Palette, Camera, Calendar, LogOut, Settings, BookOpen, MessageSquare, BarChart3 } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  const adminLinks = [
    {
      id: "films",
      title: "Films",
      description: "Manage film projects",
      icon: Film,
      href: "/admin/films",
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "creative",
      title: "Creative Direction",
      description: "Manage creative direction projects",
      icon: Palette,
      href: "/admin/creative",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "photography",
      title: "Photography",
      description: "Manage photography projects",
      icon: Camera,
      href: "/admin/photography",
      color: "from-amber-600 to-orange-700",
    },
    {
      id: "events",
      title: "Events",
      description: "Manage events",
      icon: Calendar,
      href: "/admin/events",
      color: "from-green-600 to-teal-700",
    },
    {
      id: "blogs",
      title: "Blogs",
      description: "Manage blog posts",
      icon: BookOpen,
      href: "/admin/blogs",
      color: "from-cyan-600 to-blue-700",
    },
    {
      id: "messages",
      title: "Messages",
      description: "View contact messages",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "from-pink-600 to-rose-700",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View site analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "from-violet-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-opacity-95 backdrop-blur-sm" style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)" }}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
              H4M Studios Admin
            </h1>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              {user.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              View Site
            </Link>
            <AdminThemeToggle />
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)"
              }}
            >
              <LogOut size={16} />
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
            Dashboard
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Manage your content and projects
          </p>
        </motion.div>

        {/* Admin Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      border: "1px solid var(--color-border)"
                    }}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${link.color}`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
                      {link.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {link.description}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

