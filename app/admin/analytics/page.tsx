"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getAnalytics } from "@/lib/firestore";
import { User } from "firebase/auth";
import { Film, Palette, Camera, Calendar, BookOpen, MessageSquare, BarChart3, TrendingUp, Users, Eye } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

interface AnalyticsData {
  films: number;
  creative: number;
  photography: number;
  events: number;
  blogs: number;
  totalMessages: number;
  unreadMessages: number;
  totalContent: number;
}

export default function AdminAnalytics() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    films: 0,
    creative: 0,
    photography: 0,
    events: 0,
    blogs: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalContent: 0,
  });
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
      fetchAnalytics();
      // Refresh analytics every 30 seconds
      const interval = setInterval(fetchAnalytics, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      label: "Films",
      value: analytics.films,
      icon: Film,
      color: "from-blue-600 to-indigo-700",
      change: "+12%",
    },
    {
      label: "Creative",
      value: analytics.creative,
      icon: Palette,
      color: "from-purple-600 to-pink-600",
      change: "+8%",
    },
    {
      label: "Photography",
      value: analytics.photography,
      icon: Camera,
      color: "from-amber-600 to-orange-700",
      change: "+15%",
    },
    {
      label: "Events",
      value: analytics.events,
      icon: Calendar,
      color: "from-green-600 to-teal-700",
      change: "+5%",
    },
    {
      label: "Blogs",
      value: analytics.blogs,
      icon: BookOpen,
      color: "from-cyan-600 to-blue-700",
      change: "+3%",
    },
    {
      label: "Total Messages",
      value: analytics.totalMessages,
      icon: MessageSquare,
      color: "from-pink-600 to-rose-700",
      change: analytics.unreadMessages > 0 ? `${analytics.unreadMessages} new` : "0 new",
    },
  ];

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
              Analytics Dashboard
            </h1>
          </div>
          <AdminThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl shadow-lg"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                <BarChart3 className="text-white" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
              {analytics.totalContent}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Total Content Items
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl shadow-lg"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <MessageSquare className="text-white" size={24} />
              </div>
              {analytics.unreadMessages > 0 && (
                <span className="px-2 py-1 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "var(--color-primary)" }}>
                  {analytics.unreadMessages}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
              {analytics.totalMessages}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Total Messages
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-xl shadow-lg"
            style={{
              backgroundColor: "var(--color-bg)",
              border: "1px solid var(--color-border)"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-teal-600">
                <Eye className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
              {analytics.blogs}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Published Blogs
            </p>
          </motion.div>
        </div>

        {/* Content Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-xl shadow-lg transition-all"
                style={{
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border)"
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      color: "var(--color-text-secondary)"
                    }}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
                  {stat.value}
                </h3>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 rounded-xl shadow-lg"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)"
          }}
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
            Content Distribution
          </h3>
          <div className="space-y-4">
            {[
              { label: "Films", value: analytics.films, total: analytics.totalContent, color: "bg-blue-500" },
              { label: "Creative", value: analytics.creative, total: analytics.totalContent, color: "bg-purple-500" },
              { label: "Photography", value: analytics.photography, total: analytics.totalContent, color: "bg-amber-500" },
              { label: "Events", value: analytics.events, total: analytics.totalContent, color: "bg-green-500" },
              { label: "Blogs", value: analytics.blogs, total: analytics.totalContent, color: "bg-cyan-500" },
            ].map((item) => {
              const percentage = analytics.totalContent > 0 ? (item.value / analytics.totalContent) * 100 : 0;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                      {item.label}
                    </span>
                    <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>
                      {item.value} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

