import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const existingAdmin = await prisma.adminUser.findFirst();
  let adminId: string;

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const admin = await prisma.adminUser.create({
      data: {
        email: "admin@teknokreasi.com",
        password: hashedPassword,
        name: "Admin Tekno Kreasi",
        role: "admin",
      },
    });
    adminId = admin.id;
    console.log("Admin user created: admin@teknokreasi.com / admin123");
  } else {
    adminId = existingAdmin.id;
    console.log("Using existing admin user");
  }

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "tips-umkm" },
      update: {},
      create: { name: "Tips UMKM", slug: "tips-umkm" },
    }),
    prisma.category.upsert({
      where: { slug: "teknologi" },
      update: {},
      create: { name: "Teknologi", slug: "teknologi" },
    }),
    prisma.category.upsert({
      where: { slug: "digital-marketing" },
      update: {},
      create: { name: "Digital Marketing", slug: "digital-marketing" },
    }),
  ]);

  console.log("Categories created");

  const posts = [
    {
      title: "5 Alasan Mengapa UMKM Butuh Website Profesional",
      slug: "5-alasan-umkm-butuh-website-profesional",
      excerpt: "Website bukan sekadar pajangan online. Untuk UMKM, website adalah aset digital yang bisa meningkatkan kredibilitas, menjangkau lebih banyak pelanggan, dan mendukung pertumbuhan bisnis jangka panjang.",
      content: `
        <h2>1. Meningkatkan Kredibilitas Bisnis</h2>
        <p>Di era digital ini, pelanggan sering mencari informasi tentang bisnis sebelum melakukan pembelian. Website yang profesional memberikan kesan bahwa bisnis Anda serius dan terpercaya.</p>
        <p>Menurut survei, 75% konsumen menilai kredibilitas bisnis berdasarkan desain website mereka.</p>
        
        <h2>2. Menjangkau Pelanggan 24/7</h2>
        <p>Berbeda dengan toko fisik yang memiliki jam operasional, website bisa diakses kapan saja. Pelanggan bisa melihat produk, membaca informasi, atau bahkan melakukan pemesanan di tengah malam sekalipun.</p>
        
        <h2>3. Memudahkan Promosi dan Pemasaran</h2>
        <p>Dengan website, Anda bisa mengintegrasikan berbagai strategi digital marketing seperti SEO, Google Ads, dan media sosial. Semua channel promosi bisa mengarah ke satu tempat.</p>
        <ul>
          <li>SEO untuk muncul di pencarian Google</li>
          <li>Integrasi dengan media sosial</li>
          <li>Email marketing dan newsletter</li>
        </ul>
        
        <h2>4. Menghemat Biaya Operasional</h2>
        <p>Website bisa menggantikan fungsi brosur, katalog cetak, dan bahkan customer service dasar. Informasi yang sering ditanyakan bisa ditampilkan di FAQ, mengurangi beban pertanyaan berulang.</p>
        
        <h2>5. Data dan Analytics untuk Keputusan Bisnis</h2>
        <p>Dengan website, Anda bisa mendapatkan data tentang perilaku pelanggan: halaman apa yang sering dikunjungi, produk apa yang paling diminati, dan dari mana traffic berasal.</p>
        <p>Data ini sangat berharga untuk membuat keputusan bisnis yang lebih tepat.</p>
        
        <h2>Kesimpulan</h2>
        <p>Investasi dalam website profesional bukan pengeluaran, melainkan investasi jangka panjang untuk pertumbuhan bisnis UMKM Anda. Mulai dari yang sederhana, lalu kembangkan sesuai kebutuhan.</p>
      `,
      coverImage: "/blog-placeholder-1.svg",
      categoryId: categories[0].id,
    },
    {
      title: "Cara Membuat Katalog Online untuk Bisnis Kuliner",
      slug: "cara-membuat-katalog-online-bisnis-kuliner",
      excerpt: "Katalog online memudahkan pelanggan melihat menu, harga, dan foto produk Anda. Pelajari langkah-langkah praktis membuat katalog online yang efektif untuk bisnis kuliner.",
      content: `
        <h2>Mengapa Bisnis Kuliner Butuh Katalog Online?</h2>
        <p>Di masa pandemi dan pasca pandemi, kebiasaan konsumen berubah. Banyak orang lebih nyaman melihat menu terlebih dahulu sebelum memutuskan untuk memesan atau datang ke lokasi.</p>
        <p>Katalog online memberikan kemudahan ini dengan menampilkan:</p>
        <ul>
          <li>Foto produk yang menggugah selera</li>
          <li>Deskripsi detail setiap menu</li>
          <li>Harga yang jelas</li>
          <li>Informasi bahan/alergen</li>
        </ul>
        
        <h2>Langkah 1: Siapkan Foto Produk yang Menarik</h2>
        <p>Foto adalah elemen paling penting dalam katalog kuliner. Gunakan pencahayaan alami, latar belakang bersih, dan angle yang menunjukkan detail makanan.</p>
        <p>Tips praktis:</p>
        <ul>
          <li>Gunakan cahaya matahari pagi atau sore</li>
          <li>Background putih atau kayu natural</li>
          <li>Ambil foto dari berbagai angle</li>
          <li>Edit minimal untuk menjaga keaslian warna</li>
        </ul>
        
        <h2>Langkah 2: Tulis Deskripsi yang Menggoda</h2>
        <p>Jangan hanya menulis nama menu. Tambahkan deskripsi yang membuat pelanggan membayangkan rasanya. Sebutkan bahan utama, cara pembuatan, atau keunikan menu tersebut.</p>
        
        <h2>Langkah 3: Organisir dalam Kategori yang Jelas</h2>
        <p>Kelompokkan menu berdasarkan:</p>
        <ul>
          <li>Jenis makanan (makanan utama, snack, minuman)</li>
          <li>Waktu penyajian (sarapan, makan siang, makan malam)</li>
          <li>Spesial (menu baru, best seller, promo)</li>
        </ul>
        
        <h2>Langkah 4: Sertakan Tombol Order yang Mudah</h2>
        <p>Setiap item harus memiliki tombol order yang langsung terhubung ke WhatsApp atau sistem pemesanan Anda. Jangan biarkan pelanggan bingung cara memesan.</p>
        
        <h2>Langkah 5: Optimasi untuk Mobile</h2>
        <p>Sebagian besar pelanggan akan mengakses katalog dari smartphone. Pastikan tampilan responsif dan loading cepat.</p>
        
        <h2>Tekno Kreasi Bisa Membantu</h2>
        <p>Kami memiliki pengalaman membuat katalog online untuk berbagai bisnis kuliner. Dari cafe kecil hingga restoran, kami bisa membantu Anda menampilkan menu dengan cara yang paling menarik.</p>
      `,
      coverImage: "/blog-placeholder-2.svg",
      categoryId: categories[1].id,
    },
    {
      title: "Strategi Digital Marketing Murah untuk UMKM",
      slug: "strategi-digital-marketing-murah-umkm",
      excerpt: "Tidak perlu budget besar untuk memulai digital marketing. Pelajari strategi efektif yang bisa diterapkan UMKM dengan modal minimal namun hasil maksimal.",
      content: `
        <h2>Mitos Digital Marketing Mahal</h2>
        <p>Banyak UMKM berpikir bahwa digital marketing membutuhkan budget besar. Padahal, dengan strategi yang tepat, Anda bisa mendapatkan hasil signifikan dengan modal minimal.</p>
        
        <h2>1. Manfaatkan Media Sosial secara Konsisten</h2>
        <p>Platform seperti Instagram, Facebook, dan TikTok bisa diakses gratis. Kuncinya adalah konsistensi dan kualitas konten.</p>
        <p>Tips:</p>
        <ul>
          <li>Posting minimal 3-4 kali seminggu</li>
          <li>Gunakan variasi konten: foto, video, story, reels</li>
          <li>Interaksi dengan followers dan komunitas</li>
          <li>Gunakan hashtag yang relevan</li>
        </ul>
        
        <h2>2. SEO Lokal untuk Google Maps</h2>
        <p>Daftarkan bisnis Anda di Google My Business. Ini gratis dan sangat efektif untuk menarik pelanggan di sekitar lokasi Anda.</p>
        <p>Optimasi dengan:</p>
        <ul>
          <li>Lengkapi semua informasi bisnis</li>
          <li>Upload foto rutin</li>
          <li>Minta review dari pelanggan</li>
          <li>Balas semua review dengan profesional</li>
        </ul>
        
        <h2>3. Content Marketing Sederhana</h2>
        <p>Buat konten yang bermanfaat bagi target audience Anda. Tidak harus panjang, yang penting relevan dan membantu.</p>
        <p>Contoh konten untuk UMKM kuliner:</p>
        <ul>
          <li>Resep sederhana</li>
          <li>Tips memilih bahan berkualitas</li>
          <li>Behind the scene proses pembuatan</li>
          <li>Testimoni pelanggan</li>
        </ul>
        
        <h2>4. Email Marketing</h2>
        <p>Kumpulkan email pelanggan dan kirim newsletter rutin. Bisa berisi promo, menu baru, atau tips bermanfaat. Tools seperti Mailchimp memiliki paket gratis untuk pemula.</p>
        
        <h2>5. Kolaborasi dengan Micro-Influencer</h2>
        <p>Tidak perlu influencer besar. Micro-influencer dengan 1.000-10.000 followers sering memiliki engagement rate lebih tinggi dan biaya lebih terjangkau.</p>
        
        <h2>6. Website sebagai Hub Digital</h2>
        <p>Semua aktivitas digital marketing sebaiknya mengarah ke website Anda. Website menjadi pusat informasi yang bisa Anda kontrol sepenuhnya.</p>
        
        <h2>Mulai dari yang Sederhana</h2>
        <p>Tidak perlu melakukan semua sekaligus. Pilih 2-3 strategi yang paling sesuai dengan bisnis Anda, lakukan dengan konsisten, lalu evaluasi hasilnya.</p>
        <p>Tekno Kreasi bisa membantu Anda membuat website yang menjadi fondasi kuat untuk semua strategi digital marketing Anda.</p>
      `,
      coverImage: "/blog-placeholder-3.svg",
      categoryId: categories[2].id,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        status: "PUBLISHED",
        publishedAt: new Date(),
        authorId: adminId,
      },
    });
    console.log(`Created post: ${post.title}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
