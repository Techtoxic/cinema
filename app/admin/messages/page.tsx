"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthChange } from "@/lib/auth";
import { getContactMessages, markContactMessageAsRead, deleteContactMessage } from "@/lib/firestore";
import { ContactMessage } from "@/types";
import { User } from "firebase/auth";
import { Mail, Trash2, Eye, X, MessageSquare, CheckCircle } from "lucide-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import AdminThemeToggle from "@/components/admin/AdminThemeToggle";

export default function AdminMessages() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
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
      fetchMessages();
    }
  }, [user]);

  const fetchMessages = async () => {
    try {
      const messagesData = await getContactMessages();
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleView = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowModal(true);
    
    // Mark as read if not already read
    if (message.id && !message.read) {
      try {
        await markContactMessageAsRead(message.id);
        fetchMessages();
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteContactMessage(id);
        fetchMessages();
        if (selectedMessage?.id === id) {
          setShowModal(false);
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      }
    }
  };

  if (loading) {
    return <LoadingAnimation isLoading={true} onComplete={() => {}} />;
  }

  if (!user) {
    return null;
  }

  const unreadCount = messages.filter(m => !m.read).length;

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
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                Contact Messages
              </h1>
              {unreadCount > 0 && (
                <p className="text-sm" style={{ color: "var(--color-primary)" }}>
                  {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          <AdminThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" style={{ color: "var(--color-text-secondary)" }} />
            <p style={{ color: "var(--color-text-secondary)" }}>
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all ${
                  !message.read ? "border-l-4" : ""
                }`}
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: !message.read ? "var(--color-primary)" : "var(--color-border)",
                  border: message.read ? "1px solid var(--color-border)" : undefined,
                }}
                onClick={() => handleView(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg" style={{ color: "var(--color-text)" }}>
                        {message.name}
                      </h3>
                      {!message.read && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "var(--color-primary)" }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-1" style={{ color: "var(--color-text-secondary)" }}>
                      {message.email}
                    </p>
                    {message.phone && (
                      <p className="text-sm mb-2" style={{ color: "var(--color-text-secondary)" }}>
                        {message.phone}
                      </p>
                    )}
                    <p className="font-semibold mb-2" style={{ color: "var(--color-text)" }}>
                      {message.subject}
                    </p>
                    <p className="text-sm line-clamp-2 mb-2" style={{ color: "var(--color-text-secondary)" }}>
                      {message.message}
                    </p>
                    {message.createdAt && (
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                        {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      message.id && handleDelete(message.id);
                    }}
                    className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600 ml-4"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Message Modal */}
      <AnimatePresence>
        {showModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6"
              style={{ backgroundColor: "var(--color-bg)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
                  Message Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={24} style={{ color: "var(--color-text)" }} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    From
                  </label>
                  <p className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
                    {selectedMessage.name}
                  </p>
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {selectedMessage.email}
                  </p>
                  {selectedMessage.phone && (
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {selectedMessage.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    Subject
                  </label>
                  <p className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
                    {selectedMessage.subject}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                    Message
                  </label>
                  <p className="text-base whitespace-pre-wrap" style={{ color: "var(--color-text)" }}>
                    {selectedMessage.message}
                  </p>
                </div>

                {selectedMessage.createdAt && (
                  <div>
                    <label className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      Received
                    </label>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="px-6 py-2 rounded-lg font-medium text-white flex items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                    }}
                  >
                    <Mail size={16} />
                    Reply
                  </a>
                  <button
                    onClick={() => {
                      selectedMessage.id && handleDelete(selectedMessage.id);
                      setShowModal(false);
                    }}
                    className="px-6 py-2 rounded-lg font-medium border transition-all"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

