import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { PointerEvent, ReactNode, useState } from "react";
import { packages, processSteps, services, whatsappUrl } from "@/data/site";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) => (
  <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#B45309]">
      {eyebrow}
    </p>
    <h2 className={`text-3xl font-bold leading-tight md:text-5xl ${tone === "dark" ? "text-white" : "text-[#1f2937]"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-5 text-base leading-8 md:text-lg ${tone === "dark" ? "text-white/75" : "text-gray-600"}`}>
        {description}
      </p>
    )}
  </div>
);

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: ReactNode;
};

export const PageHero = ({
  eyebrow,
  title,
  description,
  primaryLabel = "Konsultasi Gratis",
  secondaryLabel = "Lihat Harga",
  secondaryHref = "/harga",
  children,
}: PageHeroProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#fee9d2,transparent_34%),linear-gradient(135deg,#fffaf4_0%,#f4fff9_100%)] px-5 py-16 md:px-10 md:py-24">
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, 28, -8, 0], y: [0, -18, 12, 0], scale: [1, 1.14, 0.96, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-8 top-20 h-24 w-24 rounded-full bg-[#28A16B]/20 blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [0, -34, 18, 0], y: [0, 18, -16, 0], scale: [1, 0.92, 1.18, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 h-36 w-36 rounded-full bg-[#ED893E]/30 blur-3xl"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(23,32,51,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(23,32,51,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-[#c86f25] shadow-sm">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.04] text-[#172033] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#ED893E] px-6 py-4 text-sm font-bold text-[#172033] shadow-lg shadow-orange-200 hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-xl border border-[#28A16B]/25 bg-white px-6 py-4 text-sm font-bold text-[#1d7f56] hover:bg-green-50 hover:text-[#1d7f56] hover:no-underline"
            >
              {secondaryLabel}
            </Link>
          </div>
        </motion.div>
        {children || <ThreeDShowcase />}
      </div>
    </section>
  );
};

export const ThreeDShowcase = () => {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 18, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 18, mass: 0.35 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [13, -13]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [-9, 9]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[480px] [perspective:1200px]"
    >
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.55, 0.25], scale: [0.96, 1.08, 0.96] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-12 top-10 h-72 rounded-full bg-[conic-gradient(from_140deg,#ED893E,#28A16B,#278CE8,#ED893E)] blur-3xl"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, rotateX: 8, rotateY: -12, y: 28 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        style={reduceMotion ? undefined : { rotateX, rotateY }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-x-3 top-8 rounded-[2rem] border border-white/90 bg-white/95 p-4 shadow-2xl shadow-orange-200/80 backdrop-blur [transform-style:preserve-3d] md:inset-x-8 md:p-5"
      >
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0F172A] p-4 text-white ring-1 ring-white/10 md:p-5">
          <motion.div
            aria-hidden="true"
            animate={reduceMotion ? undefined : { x: ["-120%", "120%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent"
          />
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ED893E]" />
              <span className="h-3 w-3 rounded-full bg-[#28A16B]" />
              <span className="h-3 w-3 rounded-full bg-white/50" />
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0F172A] shadow-sm">
              UMKM Growth Panel
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Lead WhatsApp", "+38%", "bg-[#FFB36B]"],
              ["Produk tampil", "120+", "bg-[#5BE49B]"],
              ["Biaya awal", "hemat", "bg-[#60A5FA]"],
              ["SEO dasar", "aktif", "bg-[#C084FC]"],
            ].map(([label, value, color]) => (
              <motion.div
                key={label}
                whileHover={reduceMotion ? undefined : { y: -10, rotateX: 8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 360, damping: 18 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white p-4 shadow-xl [transform:translateZ(42px)]"
              >
                <span className={`mb-4 block h-2 w-12 rounded-full ${color}`} />
                <span className="block text-sm font-semibold text-[#334155]">{label}</span>
                <span className="mt-2 block text-3xl font-black tracking-tight text-[#0F172A]">
                  {value}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-[#5BE49B]/35 bg-[#052E1B] p-4 [transform:translateZ(55px)]">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#86EFAC]">
              Alur calon pelanggan
            </span>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={reduceMotion ? undefined : { width: ["28%", "82%", "56%", "92%"] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#ED893E] to-[#5BE49B]"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-0 rounded-2xl border border-orange-100 bg-white p-5 shadow-xl [transform:translateZ(70px)]"
      >
        <span className="block text-sm font-bold text-[#475569]">Paket mulai</span>
        <span className="mt-1 block text-3xl font-black text-[#B45309]">Rp1,5jt</span>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, 14, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-4 rounded-2xl border border-green-100 bg-white p-5 shadow-xl [transform:translateZ(90px)]"
      >
        <span className="block text-sm font-bold text-[#475569]">Cocok untuk</span>
        <span className="mt-1 block text-xl font-black text-[#166534]">Kuliner, retail, jasa</span>
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-2 rounded-full bg-[#172033] px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-200 [transform:translateZ(110px)]"
      >
        Siap ditemukan Google
      </motion.div>
    </div>
  );
};

export const ProductExperience = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const experiences = [
    {
      title: "Website UMKM",
      label: "Profil profesional",
      metric: "7-14 hari",
      description:
        "Halaman bisnis yang menjelaskan produk, lokasi, testimoni, dan tombol WhatsApp agar calon pelanggan cepat percaya.",
      highlights: ["Penawaran utama", "Profil usaha", "Tombol WhatsApp"],
      gradient: "from-[#ED893E] to-[#FFB36B]",
    },
    {
      title: "Katalog Online",
      label: "Produk mudah dilihat",
      metric: "Order cepat",
      description:
        "Produk ditata seperti katalog digital. Calon pelanggan bisa melihat detail lalu langsung order lewat WhatsApp tanpa alur rumit.",
      highlights: ["Kategori produk", "Detail harga", "Order WhatsApp"],
      gradient: "from-[#28A16B] to-[#5BE49B]",
    },
    {
      title: "Sistem Operasional",
      label: "Kerja lebih rapi",
      metric: "Bertahap",
      description:
        "Dashboard ringan untuk order, stok, pelanggan, atau laporan. Dibuat bertahap supaya biaya tetap masuk akal.",
      highlights: ["Order masuk", "Stok update", "Laporan ringkas"],
      gradient: "from-[#278CE8] to-[#C084FC]",
    },
  ];
  const selected = experiences[active];

  return (
    <section className="relative overflow-hidden bg-[#050814] px-5 py-20 text-white md:px-10 md:py-28">
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { scale: [1, 1.16, 1], opacity: [0.25, 0.42, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-28 top-8 h-80 w-80 rounded-full bg-[radial-gradient(circle,#ED893E,transparent_65%)] blur-3xl"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#FFB36B] backdrop-blur">
            Pilih solusi digital
          </p>
          <h2 className="text-4xl font-black leading-[1.04] text-white md:text-6xl">
            Pilih kebutuhan digital yang paling berdampak untuk bisnis Anda.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Mulai dari website profil, katalog online, sampai sistem operasional.
            Setiap solusi dibuat agar pelanggan lebih mudah paham, percaya, dan membeli.
          </p>
          <div className="mt-8 grid gap-3">
            {experiences.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`h-auto w-full rounded-2xl border px-5 py-4 text-left transition md:w-full ${
                  active === index
                    ? "border-white/30 bg-white text-[#0F172A] shadow-2xl shadow-white/10"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                <span className={active === index ? "text-sm font-black text-[#B45309]" : "text-sm font-black text-[#FFB36B]"}>
                  {item.label}
                </span>
                <span className="mt-1 block text-xl font-black">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="[perspective:1400px]">
          <motion.div
            key={selected.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotateX: 10, rotateY: -12, y: 36 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative overflow-hidden rounded-[2.4rem] border border-white/20 bg-white p-4 shadow-2xl shadow-black/40 [transform-style:preserve-3d] md:p-6"
          >
            <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${selected.gradient}`} />
            <div className="rounded-[1.8rem] bg-[#F8FAFC] p-5 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-[#64748B]">
                    Contoh hasil Tekno Kreasi
                  </span>
                  <h3 className="mt-3 text-3xl font-black text-[#0F172A] md:text-4xl">
                    {selected.title}
                  </h3>
                </div>
                <span className="rounded-full bg-[#0F172A] px-4 py-2 text-sm font-black text-white">
                  {selected.metric}
                </span>
              </div>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#475569]">
                {selected.description}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {selected.highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                  >
                    <span className={`mb-5 block h-2 w-12 rounded-full bg-gradient-to-r ${selected.gradient}`} />
                    <span className="text-sm font-black text-[#0F172A]">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 rounded-3xl bg-[#0F172A] p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white/60">Hasil yang ditargetkan</span>
                  <span className="rounded-full bg-[#5BE49B] px-3 py-1 text-xs font-black text-[#052E1B]">Siap tayang</span>
                </div>
                <motion.div
                  className="mt-5 h-3 rounded-full bg-gradient-to-r from-[#ED893E] via-[#28A16B] to-[#278CE8]"
                  initial={reduceMotion ? undefined : { scaleX: 0, transformOrigin: "left" }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const InteractivePricing = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F8FAFC] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Harga masuk akal"
          title="Paket jelas agar bisnis bisa mulai tanpa menebak biaya."
          description="Setiap paket menjelaskan estimasi harga, waktu pengerjaan, kebutuhan yang cocok, dan fitur utama. Jika kebutuhan belum pasti, kami bantu pilih cakupan paling prioritas dulu."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex min-h-full flex-col rounded-[2rem] p-7 shadow-sm ring-1 ${
                item.highlighted
                  ? "bg-[#0F172A] text-white ring-[#0F172A] shadow-2xl shadow-slate-300"
                  : "bg-white text-[#0F172A] ring-slate-200"
              }`}
            >
              {item.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-[#ED893E] px-3 py-1 text-xs font-black text-[#172033]">
                  Paling populer
                </span>
              )}
              <span className={`text-sm font-black uppercase tracking-[0.18em] ${item.highlighted ? "text-[#FFB36B]" : "text-[#B45309]"}`}>
                Paket {index + 1}
              </span>
              <h3 className={`mt-4 text-3xl font-black ${item.highlighted ? "text-white" : "text-[#0F172A]"}`}>
                {item.name}
              </h3>
              <p className={`mt-4 text-4xl font-black ${item.highlighted ? "text-[#172033]" : "text-[#B45309]"}`}>
                {item.price}
              </p>
              <p className={`mt-4 leading-7 ${item.highlighted ? "text-white/75" : "text-[#64748B]"}`}>
                {item.note}
              </p>
              <div className={`mt-6 rounded-2xl p-4 ${item.highlighted ? "bg-white/10" : "bg-orange-50"}`}>
                <p className={`text-xs font-black uppercase tracking-[0.18em] ${item.highlighted ? "text-[#FFB36B]" : "text-[#B45309]"}`}>
                  Cocok untuk
                </p>
                <p className={`mt-2 text-sm leading-6 ${item.highlighted ? "text-white/80" : "text-[#475569]"}`}>
                  {item.idealFor}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#0F172A] ring-1 ring-slate-200">
                <span>Estimasi</span>
                <span>{item.timeline}</span>
              </div>
              <ul className="mt-6 grid gap-3">
                {item.items.map((feature) => (
                  <li
                    key={feature}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                      item.highlighted ? "bg-white/10 text-white" : "bg-[#F8FAFC] text-[#172033]"
                    }`}
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex justify-center rounded-xl px-6 py-4 text-sm font-black hover:no-underline ${
                  item.highlighted
                    ? "bg-[#ED893E] text-[#172033] hover:bg-[#d17531] hover:text-[#172033]"
                    : "bg-[#172033] text-white hover:bg-[#0F172A] hover:text-white"
                }`}
              >
                Konsultasi paket ini
              </Link>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-[#64748B]">
          Harga final menyesuaikan jumlah halaman, konten, integrasi, dan kebutuhan fitur. Semua estimasi dijelaskan sebelum produksi dimulai.
        </p>
      </div>
    </section>
  );
};

export const ProcessTimeline = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Proses kerja"
          title="Dari konsultasi sampai tayang, setiap tahap punya hasil yang jelas."
          description="Digitalisasi UMKM tidak harus rumit. Kami susun tahapan kerja yang mudah dipahami, terukur, dan sesuai prioritas bisnis."
        />
        <div className="relative mt-12 grid gap-5 md:grid-cols-4">
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? undefined : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-0 top-8 hidden h-1 w-full origin-left rounded-full bg-gradient-to-r from-[#ED893E] via-[#28A16B] to-[#278CE8] md:block"
          />
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="relative rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-orange-100"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F172A] text-xl font-black text-white shadow-xl shadow-slate-200">
                0{index + 1}
              </span>
              <h3 className="mt-6 text-xl font-black text-[#0F172A]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#64748B]">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhatsappConversationCta = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.5rem] bg-[#0F172A] p-7 text-white shadow-2xl md:grid-cols-[0.95fr_1.05fr] md:p-12">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#FFB36B]">
            Mulai dari chat
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
            Konsultasi terasa natural, bukan form yang kaku.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/70">
            Tombol konsultasi diarahkan ke WhatsApp karena cepat, familiar,
            dan mudah dipakai untuk membahas kebutuhan, waktu, serta estimasi biaya.
          </p>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-xl bg-[#ED893E] px-7 py-4 text-sm font-black text-[#172033] hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
          >
            Chat Konsultasi
          </Link>
        </div>
        <div className="rounded-[2rem] bg-white p-4 text-[#0F172A] shadow-2xl">
          {[
            ["visitor", "Halo, saya punya bisnis kuliner dan butuh katalog online."],
            ["team", "Bisa. Kita mulai dari produk, harga, lokasi, dan tombol order WhatsApp."],
            ["visitor", "Budget saya terbatas, bisa bertahap?"],
            ["team", "Bisa. Mulai dari paket Starter atau Growth, lalu fitur ditambah saat bisnis siap."],
          ].map(([type, message], index) => (
            <motion.div
              key={message}
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.14 }}
              className={`mb-3 flex ${type === "visitor" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm font-semibold leading-6 ${type === "visitor" ? "bg-[#ED893E] text-[#172033]" : "bg-slate-100 text-[#0F172A]"}`}>
                {message}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CtaBand = () => (
  <section className="px-5 py-16 md:px-10">
    <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#172033] p-8 text-white shadow-2xl md:p-12">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#B45309]">
            Konsultasi tanpa ribet
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">
            Mulai dari kebutuhan paling penting dulu.
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Ceritakan bisnis, target pelanggan, dan budget. Kami bantu susun
            solusi digital yang realistis untuk UMKM.
          </p>
        </div>
        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center rounded-xl bg-[#ED893E] px-7 py-4 text-sm font-bold text-[#172033] hover:bg-[#d17531] hover:text-[#172033] hover:no-underline"
        >
          Chat Sekarang
        </Link>
      </div>
    </div>
  </section>
);
