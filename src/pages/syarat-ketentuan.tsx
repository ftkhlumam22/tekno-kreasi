import { Seo, SiteLayout } from "@components";
import { PageHero, SectionHeading } from "@/modules/umkm-site/components";

const sections = [
  {
    title: "Penerimaan ketentuan",
    content:
      "Dengan mengakses dan menggunakan website Tekno Kreasi, Anda dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju dengan salah satu ketentuan, mohon untuk tidak menggunakan website ini.",
  },
  {
    title: "Layanan kami",
    content:
      "Tekno Kreasi menyediakan jasa pembuatan website, katalog online, aplikasi operasional, sistem internal, branding, dan digital marketing untuk UMKM dan bisnis. Ruang lingkup pekerjaan, harga, dan waktu pengerjaan ditentukan berdasarkan kesepakatan bersama sebelum produksi dimulai.",
  },
  {
    title: "Hak kekayaan intelektual",
    content:
      "Seluruh konten yang tersedia di website ini, termasuk teks, gambar, logo, desain, dan kode, merupakan milik Tekno Kreasi atau pihak yang memberikan lisensi. Penggunaan tanpa izin tertulis dilarang. Setelah proyek selesai dan pembayaran lunas, hak atas konten spesifik klien akan diserahkan sesuai kesepakatan.",
  },
  {
    title: "Kewajiban klien",
    content:
      "Klien bertanggung jawab menyediakan materi, informasi, dan akses yang diperlukan untuk kelancaran proyek. Keterlambatan penyediaan materi dapat memengaruhi jadwal pengerjaan. Klien juga bertanggung jawab memastikan bahwa materi yang diberikan tidak melanggar hak pihak ketiga.",
  },
  {
    title: "Pembayaran dan pembatalan",
    content:
      "Struktur pembayaran akan dijelaskan di awal setiap proyek, umumnya terdiri dari uang muka dan pelunasan. Pembatalan proyek setelah produksi dimulai dapat dikenakan biaya sesuai pekerjaan yang telah diselesaikan. Detail lebih lanjut akan tertuang dalam kesepakatan tertulis.",
  },
  {
    title: "Garansi dan perawatan",
    content:
      "Setiap proyek yang diselesaikan disertai garansi perbaikan bug dalam periode yang disepakati. Perawatan berkala, penambahan fitur, atau perubahan besar setelah masa garansi akan dikenakan biaya terpisah. Kami tidak bertanggung jawab atas kerusakan yang disebabkan oleh pihak ketiga atau perubahan server di luar kendali kami.",
  },
  {
    title: "Batasan tanggung jawab",
    content:
      "Tekno Kreasi tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau kerusakan data yang timbul dari penggunaan website atau layanan kami. Tanggung jawab kami terbatas pada nilai pembayaran yang telah diterima untuk proyek terkait.",
  },
  {
    title: "Perubahan ketentuan",
    content:
      "Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan diumumkan di halaman ini. Penggunaan berkelanjutan atas website kami setelah perubahan berarti Anda menyetujui ketentuan yang diperbarui.",
  },
  {
    title: "Hubungi kami",
    content:
      "Untuk pertanyaan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui email di it.teknokreasi@gmail.com atau WhatsApp di +62 851-5721-5288.",
  },
];

export default function SyaratKetentuanPage() {
  return (
    <>
      <Seo
        title="Syarat & Ketentuan | Tekno Kreasi"
        description="Syarat dan ketentuan penggunaan layanan Tekno Kreasi untuk pembuatan website, aplikasi, dan digital marketing."
        path="/syarat-ketentuan"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Syarat & Ketentuan"
          title="Ketentuan penggunaan layanan kami."
          description="Halaman ini menjelaskan syarat dan ketentuan yang berlaku saat Anda menggunakan website dan jasa dari Tekno Kreasi."
          secondaryLabel="Hubungi Kami"
          secondaryHref="/kontak"
        />

        <section className="px-5 py-16 md:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-gray-500">
              Terakhir diperbarui: 8 Juli 2026
            </p>
            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-orange-100"
                >
                  <h2 className="text-xl font-bold text-[#172033]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-8 text-gray-600">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SiteLayout>
    </>
  );
}
