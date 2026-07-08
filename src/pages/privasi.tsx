import { Seo, SiteLayout } from "@components";
import { PageHero, SectionHeading } from "@/modules/umkm-site/components";

const sections = [
  {
    title: "Informasi yang kami kumpulkan",
    content:
      "Kami dapat mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, email, nomor telepon, dan detail kebutuhan proyek melalui formulir kontak atau WhatsApp. Kami juga dapat mengumpulkan informasi teknis secara otomatis, seperti alamat IP, jenis peramban, dan data kunjungan melalui alat analitik.",
  },
  {
    title: "Cara kami menggunakan informasi",
    content:
      "Informasi yang dikumpulkan digunakan untuk merespons permintaan Anda, memberikan layanan yang diminta, meningkatkan kualitas website dan layanan kami, serta berkomunikasi terkait proyek atau penawaran yang relevan. Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan.",
  },
  {
    title: "Cookie dan teknologi pelacakan",
    content:
      "Website kami mungkin menggunakan cookie atau teknologi serupa untuk meningkatkan pengalaman pengguna dan mengumpulkan data analitik. Anda dapat mengatur preferensi cookie melalui pengaturan peramban Anda, namun menonaktifkan cookie dapat memengaruhi fungsi tertentu pada website.",
  },
  {
    title: "Keamanan data",
    content:
      "Kami mengambil langkah-langkah yang wajar untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi melalui internet yang sepenuhnya aman.",
  },
  {
    title: "Tautan ke situs lain",
    content:
      "Website kami mungkin mengandung tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas isi atau praktik privasi dari situs-situs tersebut. Kami menyarankan Anda untuk membaca kebijakan privasi dari setiap situs yang Anda kunjungi.",
  },
  {
    title: "Perubahan kebijakan",
    content:
      "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diumumkan di halaman ini beserta tanggal pembaruan terakhir.",
  },
  {
    title: "Hubungi kami",
    content:
      "Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui email di it.teknokreasi@gmail.com atau melalui WhatsApp di +62 851-5721-5288.",
  },
];

export default function PrivasiPage() {
  return (
    <>
      <Seo
        title="Kebijakan Privasi | Tekno Kreasi"
        description="Kebijakan privasi Tekno Kreasi mengenai pengumpulan, penggunaan, dan perlindungan data pribadi Anda."
        path="/privasi"
      />
      <SiteLayout>
        <PageHero
          eyebrow="Kebijakan Privasi"
          title="Kami menghargai dan melindungi data Anda."
          description="Kebijakan ini menjelaskan bagaimana Tekno Kreasi mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan website dan layanan kami."
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
