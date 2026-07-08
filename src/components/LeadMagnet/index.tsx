"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaCheck, FaFilePdf } from "react-icons/fa";

const checklistItems = [
  {
    title: "1. Tujuan website jelas",
    desc: "Tentukan satu tujuan utama: jualan, branding, atau info kontak. Website yang mencoba semua biasanya tidak efektif.",
  },
  {
    title: "2. Pesan utama di 3 detik",
    desc: "Pengunjung harus langsung paham: bisnis Anda apa, untuk siapa, dan kenapa harus pilih Anda. Tanpa scroll.",
  },
  {
    title: "3. Tombol aksi mudah ditemukan",
    desc: "WhatsApp, telepon, atau form kontak harus terlihat di setiap halaman. Jangan sembunyikan di footer saja.",
  },
  {
    title: "4. Mobile-first, bukan desktop-first",
    desc: "70%+ pengunjung UMKM buka dari HP. Pastikan website cepat, tombol besar, dan teks terbaca di layar kecil.",
  },
  {
    title: "5. SEO dasar sebelum launch",
    desc: "Title, meta description, dan struktur heading harus benar sejak awal. Memperbaiki setelah live jauh lebih sulit.",
  },
];

const downloadPdf = () => {
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) return;

  const html = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>5 Hal Sebelum Buat Website UMKM - Tekno Kreasi</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', sans-serif;
      color: #172033;
      padding: 40px 50px;
      background: #fff;
    }
    .header {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 3px solid #ED893E;
      margin-bottom: 32px;
    }
    .header h1 {
      font-size: 28px;
      font-weight: 900;
      color: #0F172A;
      line-height: 1.2;
    }
    .header .subtitle {
      font-size: 14px;
      color: #64748B;
      margin-top: 8px;
    }
    .header .brand {
      display: inline-block;
      margin-top: 12px;
      font-size: 12px;
      font-weight: 700;
      color: #ED893E;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    .item {
      margin-bottom: 24px;
      padding: 20px 24px;
      background: #F8FAFC;
      border-radius: 16px;
      border-left: 4px solid #ED893E;
    }
    .item h3 {
      font-size: 17px;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 8px;
    }
    .item p {
      font-size: 14px;
      line-height: 1.7;
      color: #475569;
    }
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #E2E8F0;
      text-align: center;
    }
    .footer p {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
    }
    .footer .cta {
      margin-top: 16px;
      font-size: 13px;
      font-weight: 700;
      color: #ED893E;
    }
    @media print {
      body { padding: 20px 30px; }
      .item { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>5 Hal Sebelum Buat Website UMKM</h1>
    <p class="subtitle">Checklist lengkap agar website bisnis Anda efektif menarik pelanggan</p>
    <span class="brand">Tekno Kreasi — Digital Product Studio</span>
  </div>
  ${checklistItems
    .map(
      (item) => `
  <div class="item">
    <h3>${item.title}</h3>
    <p>${item.desc}</p>
  </div>`
    )
    .join("")}
  <div class="footer">
    <p>Dibuat oleh Tekno Kreasi — Partner digital untuk bisnis Indonesia.<br>Cirebon, Jawa Barat | it.teknokreasi@gmail.com</p>
    <p class="cta">Konsultasi gratis: teknokreasi.com</p>
  </div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
};

const LeadMagnet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("leadMagnetDismissed");
    if (dismissed) {
      setHasDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem("leadMagnetDismissed", "true");
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
          email: email,
          _subject: "Lead Magnet: Download Checklist Website UMKM",
          _template: "table",
          _captcha: "false",
          message: `Lead baru dari checklist:\n\nEmail: ${email}\nWaktu: ${new Date().toLocaleString("id-ID")}\nSumber: Landing Page Tekno Kreasi`,
        }),
      });
    } catch {
      // silent
    }
    setStatus("success");
  };

  if (hasDismissed) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-[1001] flex w-full max-w-lg flex-col rounded-3xl bg-white shadow-2xl"
            style={{ maxHeight: "85vh" }}
          >
            <button
              onClick={handleClose}
              aria-label="Tutup"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-[#172033] transition hover:bg-orange-50 hover:text-[#ED893E]"
            >
              <FaTimes size={14} />
            </button>

            {status === "idle" ? (
              <div className="p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ED893E] to-[#FFB36B] text-white">
                  <FaDownload size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A]">
                  Gratis: 5 Hal Sebelum Buat Website UMKM
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Checklist lengkap agar website bisnis Anda efektif menarik pelanggan, bukan sekadar pajangan.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Anda"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#172033] placeholder:text-slate-400 focus:border-[#ED893E] focus:outline-none focus:ring-2 focus:ring-[#ED893E]/20"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-black text-[#172033] transition hover:bg-[#d17531] hover:text-[#172033]"
                  >
                    Download Gratis
                  </button>
                  <p className="text-center text-xs text-gray-500">
                    Kami tidak akan spam. Unsubscribe kapan saja.
                  </p>
                </form>
              </div>
            ) : (
              <div className="flex flex-col overflow-hidden">
                <div className="p-7 pb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 text-center"
                  >
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <FaCheck size={24} />
                    </div>
                    <h3 className="text-xl font-black text-[#0F172A]">Checklist Anda Siap!</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Baca di bawah atau download sebagai PDF.
                    </p>
                  </motion.div>
                </div>

                <div className="flex-1 overflow-y-auto px-7 pb-4" style={{ maxHeight: "45vh" }}>
                  <div className="space-y-3">
                    {checklistItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="rounded-2xl bg-[#F8FAFC] p-4 ring-1 ring-slate-200"
                      >
                        <h4 className="font-bold text-[#0F172A]">{item.title}</h4>
                        <p className="mt-1 text-sm leading-6 text-gray-600">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 p-7 pt-4">
                  <div className="flex gap-3">
                    <button
                      onClick={downloadPdf}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-black text-white transition hover:bg-[#172033]"
                    >
                      <FaFilePdf size={16} />
                      Download PDF
                    </button>
                    <a
                      href="https://api.whatsapp.com/send/?phone=6285157215288&text=Halo%20Tekno%20Kreasi%2C%20saya%20sudah%20download%20checklist%20dan%20ingin%20konsultasi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center rounded-xl bg-[#ED893E] px-4 py-3 text-sm font-black text-[#172033] transition hover:bg-[#d17531] hover:text-[#172033]"
                    >
                      Konsultasi
                    </a>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-3 w-full rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-[#172033] transition hover:bg-slate-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnet;
