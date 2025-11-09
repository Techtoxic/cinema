"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "commercial",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for reaching out! We'll get back to you soon.");
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
                  <label htmlFor="projectType" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)"
                    }}
                  >
                    <option value="commercial">Commercial</option>
                    <option value="narrative">Narrative Film</option>
                    <option value="music">Music Video</option>
                    <option value="corporate">Corporate Video</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
                    Tell Us About Your Project *
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

                <button
                  type="submit"
                  className="w-full text-white font-semibold py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                >
                  <Send size={20} />
                  Send Message
                </button>
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
