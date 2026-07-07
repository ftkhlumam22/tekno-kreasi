export const siteUrl = "https://teknokreasi.com";

export const whatsappUrl =
  "https://api.whatsapp.com/send/?phone=%2B6285157215288&text=Halo%20Tekno%20Kreasi%2C%20saya%20ingin%20konsultasi%20website%20atau%20digitalisasi%20bisnis";

export const whatsappDisplay = "+62 851-5721-5288";

export const instagramUrl = "https://www.instagram.com/teknokreasi.digital/";

export const facebookUrl = "https://www.facebook.com/teknokreasidigital/";

export const companyStats = [
  { value: "20+", label: "client dan project digital" },
  { value: "3", label: "produk pemerintah dan bisnis" },
  { value: "7-14", label: "hari untuk website awal" },
];

export const services = [
  {
    slug: "website-umkm",
    title: "Website UMKM",
    tagline: "Website cepat, rapi, dan siap bantu calon pelanggan percaya.",
    description:
      "Landing page, company profile, katalog produk, dan halaman promosi untuk UMKM yang ingin terlihat profesional tanpa biaya berlebihan.",
    price: "Mulai Rp1,5 jutaan",
    timeline: "7-14 hari kerja",
    features: [
      "Desain responsif mobile dan desktop",
      "SEO dasar untuk Google",
      "Integrasi WhatsApp dan Google Maps",
      "Penulisan pesan penawaran utama",
    ],
  },
  {
    slug: "toko-online-katalog",
    title: "Katalog & Toko Online Ringan",
    tagline: "Jualan lebih mudah tanpa sistem yang terlalu mahal.",
    description:
      "Katalog produk, form pemesanan, dan proses order via WhatsApp untuk bisnis yang belum butuh marketplace kompleks.",
    price: "Mulai Rp2,5 jutaan",
    timeline: "10-21 hari kerja",
    features: [
      "Manajemen kategori produk",
      "Tombol order langsung ke WhatsApp",
      "Struktur halaman produk agar mudah dipahami Google",
      "Panduan update konten sederhana",
    ],
  },
  {
    slug: "aplikasi-operasional",
    title: "Aplikasi Operasional Sederhana",
    tagline: "Rapikan proses bisnis tanpa membangun sistem yang berlebihan.",
    description:
      "Aplikasi internal untuk pencatatan order, stok, jadwal, pelanggan, atau laporan sederhana sesuai prioritas bisnis.",
    price: "Estimasi bertahap",
    timeline: "Mulai 3-6 minggu",
    features: [
      "Pemetaan kebutuhan dan prioritas fitur",
      "Panel kerja sesuai alur bisnis",
      "Akses pemilik, admin, dan tim",
      "Pengembangan bertahap agar biaya terkendali",
    ],
  },
  {
    slug: "digital-marketing-branding",
    title: "Digital Marketing & Branding",
    tagline: "Konten dan identitas visual yang lebih konsisten.",
    description:
      "Branding dasar, desain konten, profil bisnis, dan optimasi channel digital agar usaha terlihat lebih meyakinkan.",
    price: "Paket bulanan fleksibel",
    timeline: "Mulai 1 bulan",
    features: [
      "Audit profil digital bisnis",
      "Arah visual dan pesan brand",
      "Desain konten promosi",
      "Optimasi tombol aksi dan halaman promosi",
    ],
  },
];

export const packages = [
  {
    name: "Starter UMKM",
    price: "Rp1,5 juta",
    note: "Untuk bisnis yang butuh tampil online dengan cepat.",
    idealFor: "Profil usaha, promosi layanan, dan validasi pasar awal.",
    timeline: "7-14 hari kerja",
    items: ["1 halaman promosi", "SEO dasar", "Tombol WhatsApp", "Revisi 2x"],
  },
  {
    name: "Growth UMKM",
    price: "Rp3-5 juta",
    note: "Untuk usaha yang butuh beberapa halaman dan katalog.",
    idealFor: "Bisnis yang sudah punya produk/jasa aktif dan ingin terlihat lebih meyakinkan.",
    timeline: "10-21 hari kerja",
    items: ["5-8 halaman", "Katalog produk", "Pesan penawaran utama", "Analytics dasar"],
    highlighted: true,
  },
  {
    name: "Custom Bertahap",
    price: "Sesuai kebutuhan",
    note: "Untuk sistem internal atau kebutuhan khusus.",
    idealFor: "Operasional, dashboard, POS, ecommerce, integrasi data, dan aplikasi internal.",
    timeline: "Mulai 3-6 minggu",
    items: ["Prioritas kebutuhan", "Tahapan kerja jelas", "Budget bertahap", "Dokumentasi penggunaan"],
  },
];

export const processSteps = [
  {
    title: "Konsultasi kebutuhan",
    description:
      "Kami pahami produk, target pelanggan, kendala operasional, dan budget agar solusi tidak berlebihan.",
  },
  {
    title: "Rekomendasi paket",
    description:
      "Anda mendapat opsi kebutuhan, estimasi waktu, dan harga yang masuk akal untuk tahap bisnis saat ini.",
  },
  {
    title: "Produksi dan review",
    description:
      "Desain, konten, dan fitur dikerjakan bertahap dengan titik pengecekan agar hasil sesuai kebutuhan.",
  },
  {
    title: "Live dan pendampingan",
    description:
      "Website atau sistem dibantu sampai tayang, termasuk arahan update konten dan perawatan dasar.",
  },
];

export const caseStudies = [
  {
    title: "Jaskipin",
    industry: "Ekspedisi Internasional",
    image: "/portofolio/porto_jaskipin.png",
    imageAlt: "Web internal Jaskipin untuk transaksi ekspedisi dan dashboard analitik",
    summary:
      "Web internal untuk mengelola operasional ekspedisi internasional dari transaksi, pelacakan kiriman, analitik bisnis, sampai kebutuhan human resource.",
    result:
      "Alur kerja lintas divisi menjadi lebih terpusat, data pengiriman lebih mudah dipantau, dan manajemen mendapat ringkasan performa operasional secara cepat.",
    features: ["Transaksi ekspedisi", "Tracking pengiriman", "Dashboard analytics", "Human resource"],
    metrics: ["Web internal", "Operasional lintas divisi", "Analitik performa"],
    accent: "from-[#1D4ED8] to-[#7C3AED]",
  },
  {
    title: "Sisa",
    industry: "Pemerintah Kabupaten Cirebon",
    image: "/portofolio/porto_sisa.png",
    imageAlt: "Aplikasi Sisa Kabupaten Cirebon untuk pengelolaan dan transaksi sampah warga",
    summary:
      "Aplikasi layanan publik untuk membantu warga dan pengelola mengatur penjemputan, pencatatan, serta transaksi sampah yang dapat dijual ke pengepul.",
    result:
      "Pengelolaan sampah menjadi lebih tertata, proses penjemputan lebih mudah diajukan, dan nilai transaksi sampah dapat dicatat secara transparan.",
    features: ["Manajemen sampah", "Permintaan jemput", "Tabungan warga", "Transaksi pengepul"],
    metrics: ["Mobile app", "Layanan publik", "Ekonomi sirkular"],
    accent: "from-[#0EA5E9] to-[#22C55E]",
  },
  {
    title: "Masagi",
    industry: "Pemerintah Kabupaten Kuningan",
    image: "/portofolio/porto_masagi.png",
    imageAlt: "Aplikasi Masagi Kabupaten Kuningan untuk POS dan ecommerce sembako",
    summary:
      "Aplikasi POS dan ecommerce sembako untuk mendukung penjualan bahan pokok di wilayah Kuningan, lengkap dengan sistem internal untuk produk, pesanan, dan informasi harga.",
    result:
      "Penjualan sembako dapat dikelola lebih modern, stok dan pesanan lebih mudah dipantau, serta informasi komoditas tersaji rapi untuk masyarakat.",
    features: ["POS sembako", "Ecommerce lokal", "Manajemen produk", "Sistem internal"],
    metrics: ["Mobile commerce", "POS", "Manajemen komoditas"],
    accent: "from-[#F97316] to-[#F59E0B]",
  },
];

export const testimonials = [
  {
    quote:
      "Tekno Kreasi membantu merapikan kebutuhan sistem dari transaksi sampai laporan. Komunikasinya jelas dan pengembangannya bisa mengikuti prioritas operasional.",
    name: "Tim Operasional Jaskipin",
    role: "Ekspedisi Internasional",
  },
  {
    quote:
      "Aplikasi dibuat dengan alur yang mudah dipahami. Proses pengelolaan data dan transaksi jadi lebih tertata untuk kebutuhan layanan masyarakat.",
    name: "Tim Pengelola Sisa",
    role: "Kabupaten Cirebon",
  },
  {
    quote:
      "Sistem membantu penjualan dan pencatatan produk berjalan lebih modern. Fitur internalnya memudahkan tim dalam melihat produk, pesanan, dan informasi harga.",
    name: "Tim Masagi",
    role: "Kabupaten Kuningan",
  },
];

export const faqs = [
  {
    question: "Apakah bisa mulai dari budget kecil?",
    answer:
      "Bisa. Kami bantu pilih kebutuhan paling penting dulu, lalu pengembangan dapat bertahap saat bisnis mulai membutuhkan fitur tambahan.",
  },
  {
    question: "Apakah harga sudah termasuk domain dan hosting?",
    answer:
      "Bisa dibuat termasuk atau terpisah. Kami jelaskan estimasinya di awal agar tidak ada biaya yang mengejutkan.",
  },
  {
    question: "Apakah website akan ramah SEO?",
    answer:
      "Ya, struktur heading, title, meta description, performa dasar, dan konten utama disiapkan agar lebih mudah dipahami mesin pencari.",
  },
];
