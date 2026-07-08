"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch("https://formsubmit.co/ajax/it.teknokreasi@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          business: formData.business,
          _subject: `Konsultasi dari ${formData.name} - ${formData.business}`,
          _template: "table",
          _captcha: "false",
          message: `Nama: ${formData.name}\nEmail: ${formData.email}\nJenis Bisnis: ${formData.business}\n\nPesan:\n${formData.message}`,
        }),
      });
      setStatus("success");
      setFormData({ name: "", email: "", business: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm ring-2 ring-orange-100">
      <h2 className="text-2xl font-black text-[#0F172A]">Form Konsultasi</h2>
      <p className="mt-2 text-sm text-gray-600">
        Lebih nyaman via email? Isi form di bawah, kami akan balas dalam 1x24 jam.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#172033]">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#172033] placeholder:text-slate-400 focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-[#172033]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#172033] placeholder:text-slate-400 focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="business" className="block text-sm font-bold text-[#172033]">
            Jenis Bisnis
          </label>
          <select
            id="business"
            name="business"
            value={formData.business}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#172033] focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
          >
            <option value="">Pilih jenis bisnis</option>
            <option value="Kuliner">Kuliner & Cafe</option>
            <option value="Retail">Retail & Toko</option>
            <option value="Jasa">Jasa Profesional</option>
            <option value="Produk">Produk Digital/Fisik</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-[#172033]">
            Pesan / Kebutuhan
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#172033] placeholder:text-slate-400 focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
            placeholder="Ceritakan kebutuhan bisnis Anda..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-black text-[#172033] transition hover:bg-[#d17531] hover:text-[#172033] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </button>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700 ring-1 ring-green-200"
            >
              ✓ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 ring-1 ring-red-200"
            >
              ✗ Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default ContactForm;
