"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaStar } from "react-icons/fa";

type Proof = {
  type: "consultation" | "testimonial";
  name: string;
  business: string;
  message: string;
  time: string;
};

const proofs: Proof[] = [
  {
    type: "consultation",
    name: "Rina",
    business: "Kafe Kopi Senja",
    message: "baru saja konsultasi website katalog",
    time: "2 menit lalu",
  },
  {
    type: "testimonial",
    name: "Budi",
    business: "Toko Elektronik Maju",
    message: "Website sudah live, pelanggan jadi lebih mudah order!",
    time: "1 jam lalu",
  },
  {
    type: "consultation",
    name: "Sari",
    business: "Bakso Pak Kumis",
    message: "baru saja konsultasi paket Starter",
    time: "5 menit lalu",
  },
  {
    type: "testimonial",
    name: "Andi",
    business: "Jasa Fotografi Lensa",
    message: "Portfolio online membantu dapat client baru!",
    time: "3 jam lalu",
  },
  {
    type: "consultation",
    name: "Dewi",
    business: "Butik Fashion lokal",
    message: "baru saja konsultasi website + katalog produk",
    time: "8 menit lalu",
  },
  {
    type: "testimonial",
    name: "Rudi",
    business: "Bengkel Motor Cepat",
    message: "Sistem booking online sangat membantu!",
    time: "5 jam lalu",
  },
];

const SocialProofToast = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % proofs.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const proof = proofs[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 100, x: "-50%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 z-[999] w-[90%] max-w-md"
        >
          <div className="rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  proof.type === "consultation"
                    ? "bg-[#ED893E]/10 text-[#ED893E]"
                    : "bg-[#FFB36B]/10 text-[#FFB36B]"
                }`}
              >
                {proof.type === "consultation" ? (
                  <FaWhatsapp size={18} />
                ) : (
                  <FaStar size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#172033]">
                  {proof.name}{" "}
                  <span className="font-normal text-gray-500">• {proof.business}</span>
                </p>
                <p className="mt-1 text-sm text-gray-600">{proof.message}</p>
                <p className="mt-1 text-xs text-gray-400">{proof.time}</p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                aria-label="Tutup notifikasi"
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-gray-500 transition hover:bg-slate-200"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;
