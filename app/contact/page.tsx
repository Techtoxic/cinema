"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { addContactMessage } from "@/lib/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await addContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject || "Contact Form Submission",
        message: formData.message,
      });
      
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold mb-6"
            style={{ 
              background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
            Let's Create Together
          </h1>
          <p className="text-sm md:text-lg" style={{ color: "var(--color-text-secondary)" }}>
            Have a project in mind? We'd love to hear about it. Get in touch with us today.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="rounded-3xl shadow-xl p-8 md:p-10"
              style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", border: "1px solid" }}>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6" style={{ color: "var(--color-text)" }}>
                Send Us a Message
              </h2>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-center gap-3"
                >
                  <CheckCircle className="text-green-600" size={20} />
                  <p className="text-sm text-green-600">Message sent successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3"
                >
                  <AlertCircle className="text-red-600" size={20} />
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                    placeholder="+254 700 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                    placeholder="Project inquiry, General question, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 resize-none"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                    placeholder="Share your vision with us..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full text-white font-semibold py-4 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:pt-0"
          >
            <div className="rounded-3xl p-8 md:p-10 text-white h-full"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">
                Get In Touch
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed text-sm md:text-base">
                Whether you have a question about our services, pricing, or anything else, 
                our team is ready to answer all your questions.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-white/80 text-sm">contact@h4mstudios.com</p>
                    <p className="text-white/80 text-sm">info@h4mstudios.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-white/80 text-sm">(+254)703920951</p>
                    <p className="text-white/80 text-sm">Mon-Fri, 9AM-6PM EAT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-white/80 text-sm">
                      Nairobi, Kenya<br />
                      Kiambu Road<br />
                      P.O Box 12345
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <h3 className="font-semibold mb-4">Follow Our Journey</h3>
                <div className="flex gap-4">
                  {["Instagram", "Vimeo", "YouTube", "LinkedIn"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <span className="text-xs font-medium">{platform[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
